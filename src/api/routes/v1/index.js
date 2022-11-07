const express = require('express');


const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/auth',require('./auth.route'))
router.use('/user',require('./user.route'))
router.use('/select',require('./select.route'))
router.use('/invoice',require('./invoice.route'))
module.exports = router;