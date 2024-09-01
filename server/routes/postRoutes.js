const {Router} = require('express');

const {createPost, getPosts, getPost, getCategoryPosts, getUserPosts, editPost, deletePost} = require('../controllers/postControllers');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
const router = Router();

router.post('/create-post', authorizationMiddleware, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/categories/:category', getCategoryPosts);
router.get('/authors/:id', getUserPosts);
router.patch('/:id', authorizationMiddleware, editPost);
router.delete('/:id', authorizationMiddleware, deletePost);

module.exports = router;