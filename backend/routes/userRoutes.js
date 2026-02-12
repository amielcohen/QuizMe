const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/me', requireAuth, (req, res) => {
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
  });
});

module.exports = router;
