import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.id;
  const text = req.body.text;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        chatId: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    await prisma.chat.update({
      where: {
        chatId: chatId,
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: text,
        updatedAt: new Date(),
      },
    });

    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add message!" });
  }
};

export const deleteMessages = (req, res) => {
  try {
    prisma.message.deleteMany();
    res.status(200).json({ message: "Messages Deleted!" });
  } catch (error) {
    console.log(error)
  }
}