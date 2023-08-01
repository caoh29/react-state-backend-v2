const express = require('express');
const cors = require('cors');
const router = express.Router();
const FileStorage = require('../services/FileStorage');

router.use(cors({ origin: 'http://localhost:3000' }));

/* POST /subscribe */
router.post('/subscribe', async function (req, res) {
  try {
    if (!req.body || !req.body.email) {
      return res.status(400).json({ error: "Wrong payload" });
    }

    if (req.body.email === 'forbidden@email.com') {
      return res.status(422).json({ error: "Email is already in use" });
    }

    const data = {email: req.body.email};
    await FileStorage.writeFile('user.json', data);
    res.json({success: true})
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal error');
  }
});

/* GET /unsubscribe */
router.post('/unsubscribe', async function (req, res) {
  try {
    await FileStorage.deleteFile('user.json');
    await FileStorage.writeFile('user-analytics.json', []);
    await FileStorage.writeFile('performance-analytics.json', []);
    res.json({success: true})
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal error');
  }
});

module.exports = router;
