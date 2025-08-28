const express = require('express');
const router = express.Router();

// Dummy route
router.get('/', (req, res) => {
  res.send('Resume route working');
});

module.exports = router;
