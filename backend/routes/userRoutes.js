const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
const User = require('../models/User');

router.get('/me', requireAuth, (req, res) => {
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
  });
});

router.post('/update-theme', requireAuth, async (req, res) => {
  try {
    const userId = req.user?.id;
    const { palette } = req.body;

    console.log('update-theme called');
    console.log('userId:', userId);
    console.log('palette:', palette);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: missing user id' });
    }

    if (!palette) {
      return res.status(400).json({ message: 'Palette is required' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { Color_Customization: palette } },
      { new: true, runValidators: true },
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ palette: user.Color_Customization });
  } catch (err) {
    console.error('Update theme error:', err);
    return res.status(500).json({
      message: 'Failed to update theme',
      error: err?.message || String(err),
    });
  }
});

module.exports = router;
