const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

router.get('/:postId', commentController.getComments);

router.post('/', commentController.createComment);

module.exports = router;