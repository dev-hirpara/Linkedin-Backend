import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => { // After Login automatically fetching User Obj ID 
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Transform data to match frontend expectations
    const transformedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      created_at: user.createdAt
    };

    res.json(transformedUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, bio } = req.body;
    const userId = req.user.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, bio },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Transform data to match frontend expectations
    const transformedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      created_at: user.createdAt
    };

    res.json(transformedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

export default router;