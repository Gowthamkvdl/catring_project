import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    // Fetch chats involving the token user
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1, // Only fetch the latest message
        },
      },
    });

    // Extract unique receiver IDs directly
    const receiverIds = [
      ...new Set(
        chats.map((chat) => chat.userIDs.find((id) => id !== tokenUserId))
      ),
    ];

    // Fetch all receiver details in a single query
    const receivers = await prisma.user.findMany({
      where: {
        userId: {
          in: receiverIds,
        },
      },
      select: {
        userId: true,
        username: true,
        avatar: true,
      },
    });

    // Map receivers by userId for quick access
    const receiversMap = receivers.reduce((acc, receiver) => {
      acc[receiver.userId] = receiver;
      return acc;
    }, {});

    // Attach receiver details to each chat
    chats.forEach((chat) => {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);
      chat.receiver = receiversMap[receiverId] || null;
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get chats" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        chatId: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        chatId: req.params.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const receiverId = req.body.receiverId;
  try {
    if (tokenUserId === receiverId) {
      return res
        .status(400)
        .json({ message: "You cannot message yourself!" });
    }

    // Fetch receiver details
    const receiver = await prisma.user.findUnique({
      where: {
        userId: tokenUserId,
      },
      select: {
        userId: true,
        username: true,
        avatar: true,
      },
    });

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found!" });
    }


    // Attempt to find an existing chat between the two users
    const chat = await prisma.chat.findFirst({
      where: {
        AND: [
          { userIDs: { has: tokenUserId } },
          { userIDs: { has: receiverId } },
        ],
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (chat) {
      return res.status(409).json({ message: "Chat already exists!" });
    }

    // If no chat exists, create a new one
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, receiverId],
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    res.status(201).json({
      ...newChat,
      receiver
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add chat!", error: error.message });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.update({
      where: {
        chatId: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};

export const deleteChat = async (req, res) => {
  const chatId = req.params.id;
  const tokenUserId = req.userId;

  try {
    // Check if the user is authorized to delete the chat
    const auth = await prisma.chat.findFirst({
      where: {
        chatId: chatId,
        userIDs: {
          has: tokenUserId,
        },
      },
    });

    if (!auth) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    // Delete related messages first
    await prisma.message.deleteMany({
      where: { chatId: chatId },
    });

    // Delete the chat
    await prisma.chat.delete({
      where: { chatId: chatId },
    });

    res
      .status(200)
      .json({ message: "Chat and related messages deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete Chat!" });
  }
};
