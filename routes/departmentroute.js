const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("GET WORKED FOR DEPARTMENT")
})


module.exports = router;