const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('EMPLOYEE ROUTE WORKED')
})

module.exports = router;