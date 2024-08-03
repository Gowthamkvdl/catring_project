import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: id,
      },
      include: {
        posts: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get User!" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (userId !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    const upadtedUser = await prisma.user.update({
      where: { userId },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    res.status(200).json(upadtedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update User!" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const tokenUserId = req.userId;

  if (userId !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  try {
    await prisma.user.delete({
      where: {
        userId,
      },
    });
    res.status(200).json({ message: "User Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete User!" });
  }
};

export const savePost = async (req, res) => {
  const { postId } = req.body;
  const tokenUserId = req.userId;

  // Check if postId and tokenUserId are defined
  if (!postId || !tokenUserId) {
    return res.status(400).json({ message: "Invalid postId or userId" });
  }

  try {
    const savedPost = await prisma.savedPosts.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPosts.delete({
        where: {
          userId_postId: {
            userId: tokenUserId,
            postId,
          },
        },
      });
      return res.status(200).json({ message: "Post Unsaved" });
    } else {
      await prisma.savedPosts.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      return res.status(201).json({ message: "Post Saved" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const userPosts = await prisma.post.findMany({
      where: {
        userId: tokenUserId,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
            userId: true,
            phone: true,
            email: true,
            starRating: true,
          },
        },
      },
    });

    const saved = await prisma.savedPosts.findMany({
      where: {
        userId: tokenUserId,
      },
      include: {
        post: {
          include: {
            user: {
              select: {
                username: true,
                avatar: true,
                userId: true,
                phone: true,
                email: true,
                starRating: true,
              },
            },
          },
        },
      },
    });

    const savedPost = saved.map((item) => ({
      ...item.post,
      user: item.post.user,
    }));

    res.status(200).json({ userPosts, savedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get profile posts" });
  }
};


export const addUserRating = async (req, res) => {
  const tokenUserId = req.userId;
  const profileId = req.body.profileId;
  const starCount  = req.body.starCount;

  if (
    !profileId ||
    !Number.isInteger(starCount) ||
    starCount < 1 ||
    starCount > 5
  ) {
    return res.status(400).json({ message: "Invalid profileId or starCount." });
  }

  try {
    // Check if a rating from this user to the profile already exists
    const existingRating = await prisma.starRating.findFirst({
      where: {
        giverId: tokenUserId,
        userId: profileId,
      },
    });

    if (existingRating) {
      // If the rating already exists, update it instead of creating a new one
      await prisma.starRating.update({
        where: {
          starRatingId: existingRating.starRatingId,
        },
        data: {
          starCount,
        },
      });
    } else {
      // If no rating exists, create a new one
      await prisma.starRating.create({
        data: {
          giverId: tokenUserId,
          userId: profileId,
          starCount,
        },
      });
    }

    // Fetch all ratings for the profile to recalculate total and average ratings
    const ratings = await prisma.starRating.findMany({
      where: {
        userId: profileId,
      },
      select: {
        starCount: true,
      },
    });

    const totalRatings = ratings.length;
    const averageRating =
      totalRatings > 0
        ? ratings.reduce((acc, rating) => acc + rating.starCount, 0) /
          totalRatings
        : 0;

    // Round the average rating to the nearest 0.5
    const roundedAverageRating = Math.round(averageRating * 2) / 2;

    // Update the user's totalRatings and averageRating
    await prisma.user.update({
      where: {
        userId: profileId,
      },
      data: {
        totalRatings,
        averageRating: roundedAverageRating,
      },
    });

    res.status(200).json({
      message: existingRating
        ? "Rating updated successfully"
        : "Rating added successfully",
      totalRatings,
      averageRating: roundedAverageRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add or update rating" });
  }
};



export const getUserRating = async (req, res) => {
  const profileId = req.params.id;

  if (!profileId) {
    return res.status(400).json({ message: "Profile ID is required" });
  }

  try {
    // Fetch the ratings and calculate the total number and average
    const ratings = await prisma.user.findUnique({
      where: {
        userId: profileId,
      },
    });

    const totalRatings = ratings.totalRatings;
    const averageRating = ratings.averageRating;


    res.status(200).json({
      totalRatings,
      averageRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve ratings" });
  }
};
