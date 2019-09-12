const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const BlogPosts = require('../../models/BlogPost');
const User = require('../../models/User');

// @route    PUT api/comments/dislike/:id
// @desc     Add Dislike a post
// @access   Private
router.put('/dislike/:id', auth, async (req, res) => {
  try {
    const post = await BlogPosts.findById(req.params.id);

    // Check if the post has already been disliked
    if (
      post.dislikes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Post already disliked' });
    }

    post.dislikes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.dislikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/comments/un_dislike/:id
// @desc     Remove Dislike a post
// @access   Private
router.put('/un_dislike/:id', auth, async (req, res) => {
  try {
    const post = await BlogPosts.findById(req.params.id);

    // Check if the post has not been disliked
    if (
      post.dislikes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been disliked' });
    }

    const removeIndex = post.dislikes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.dislikes.splice(removeIndex, 1);

    await post.save();

    res.json(post.dislikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
