const express = require('express');
const cors = require('cors');
const router = express.Router();
const {randomNumber} = require('../utils');
const FileStorage = require('../services/FileStorage');

router.use(cors({ origin: 'http://localhost:3000' }));

/* GET /community */
router.get('/', async function(req, res) {
  try {
    const result = await FileStorage.readJsonFile(`community/${randomNumber(1, 3)}.json`);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal error');
  }
});

router.get('/:id', async function(req, res) {
  try {
    const community = await Promise.all([
      FileStorage.readJsonFile(`community/1.json`),
      FileStorage.readJsonFile(`community/2.json`),
      FileStorage.readJsonFile(`community/3.json`)
    ]);
    const { id } = req.params;
    const user = community.flat().find(user => user.id === id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal error');
  }
});

module.exports = router;
