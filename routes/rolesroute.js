const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('ROLES ROUTE WORKED')
})

module.exports = router;