import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    // Transform data to match frontend expectations
    const transformedPosts = posts.map(post => ({
      id: post._id,
      content: post.content,
      created_at: post.createdAt,
      user_id: post.user._id,
      users: {
        id: post.user._id,
        name: post.user.name,
        email: post.user.email
      }
    }));

    res.json(transformedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Create a post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const post = new Post({
      content: content.trim(),
      user: userId
    });

    await post.save();
    await post.populate('user', 'name email');

    // Transform data to match frontend expectations
    const transformedPost = {
      id: post._id,
      content: post.content,
      created_at: post.createdAt,
      user_id: post.user._id,
      users: {
        id: post.user._id,
        name: post.user.name,
        email: post.user.email
      }
    };

    res.status(201).json(transformedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Get posts by user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ user: userId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    // Transform data to match frontend expectations
    const transformedPosts = posts.map(post => ({
      id: post._id,
      content: post.content,
      created_at: post.createdAt,
      user_id: post.user._id,
      users: {
        id: post.user._id,
        name: post.user.name,
        email: post.user.email
      }
    }));

    res.json(transformedPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Error fetching user posts' });
  }
});
export default router;