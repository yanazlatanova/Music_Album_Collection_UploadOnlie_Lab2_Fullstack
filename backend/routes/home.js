const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
   res.sendFile(path.resolve('frontend/index.html'))
   // sendFile needs an absolute path 
   // path.resolve gets the absolute path 
});

module.exports = router;