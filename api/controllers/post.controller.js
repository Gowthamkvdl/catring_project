import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


export const getPosts = async (req, res) => {
  const query = req.query;
  const limit = parseInt(query.limit) || 5; // Set default limit to 5

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: {
          contains: query.location || undefined,
          mode: "insensitive",
        },
        disabled: false,
        salary: {
          gte: parseInt(query.minSalary) || 0,
        },
        workingDays: {
          lte: parseInt(query.maxWorkingDays) || 1000000,
        },
        startDate: query.date || undefined,
      },
      orderBy: {
        createdAt: "desc", // or 'desc' for descending order
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
      take: limit,
    });

    res.status(200).json({ postData: posts, total: posts.length });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const paramPostId = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        postId: paramPostId,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
            userId: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;
    
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (!err) {
          const saved = await prisma.savedPosts.findUnique({
            where: {
              userId_postId: {
                postId: paramPostId,
                userId: user.id,
              },
            },
          });
          return res.status(200).json({...post, isSaved: saved ? true: false})
        }
      });
    }else{
      return res.status(200).json({...post, isSaved: false})
    }

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to get Post" });
  }
};

export const addPost = async (req, res) => {
  const tokenUserId = req.userId;
  const postData = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId: tokenUserId,
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Add Post" });
  }
};
   
export const updatePost = async (req, res) => {
  const tokenUserId = req.userId;
  const paramPostId = req.params.id;
  const { ...newPostData } = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: {
        postId: paramPostId,
      },
    });

    if (post.userId !== tokenUserId) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        postId: paramPostId,
      },
      data: {
        ...newPostData,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Update Post" });
  }
};

export const updatePostStatus = async (req, res) => {
  const tokenUserId = req.userId
  const paramPostId = req.params.id
  
  try {
    const post = await prisma.post.findUnique({
      where: {
        postId: paramPostId,
      },
    });

    if (post.userId !== tokenUserId) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedPostStatus = await prisma.post.update({
      where: {
        postId: paramPostId,
      },
      data: {
        disabled: !post.disabled,
      },
    });

    res.status(200).json(updatedPostStatus);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: `Failed to change Post status` });
  }
}

export const deletePost = async (req, res) => {
  const tokenUserId = req.userId;
  const postId = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        postId,
      },
    });

    if (post.userId !== tokenUserId) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: {
        postId,
      },
    });

    res.status(200).json({ message: "Post Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Delete Post" });
  }
};

export const deletePosts = async (req, res) => {
  try {
    await prisma.post.deleteMany();
    res.status(200).json({ message: "Posts Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Delete Posts" });
  }
};

