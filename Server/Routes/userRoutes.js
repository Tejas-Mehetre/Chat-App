const router = require('express').Router();
const { register, login , setAvatar, getAllUsers} = require('../Controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);
router.get('/allUsers/:id', getAllUsers);

module.exports = router;