const router = require('express').Router();
const { addmessage, getmessage} = require('../Controllers/messageController.js');

router.post('/addmessage', addmessage);
router.post('/getmessage', getmessage);

module.exports = router;