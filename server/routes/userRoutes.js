const {Router} = require('express');

// Import all user controllers
const {registerUser, loginUser, getUser, getAuthors, changePFP, editUser} = require('../controllers/userControllers');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAuthors);
router.get('/:id', getUser);
router.post('/change-pfp', authorizationMiddleware, changePFP);
router.patch('/edit-user', authorizationMiddleware, editUser);

module.exports = router;