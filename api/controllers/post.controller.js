import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to get Posts" });
  }
};

export const getPost = async (req, res) => {
	const paramPostId = req.params.id

	try {
		const post = await prisma.post.findUnique({
			where:{
				postId : paramPostId
			}
		})
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
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
  try {
    res.send("it works!");
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Update Post" });
  }
};

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
		await prisma.post.deleteMany()
    res.status(200).json({message:"Posts Deleted!"});
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Delete Posts" });
  }
};
