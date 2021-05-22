const express = require('express');
const router = express.Router();

router.get('/', (res, req) => {
  res.json({
    "apiTest": "Working"
  });
});

module.exports = router;