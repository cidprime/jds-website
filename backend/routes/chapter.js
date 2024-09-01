const express = require('express');
const router = express.Router();

const chapterCtrl = require('../controllers/chapter');

router.get('/', chapterCtrl.getAllChapter);
router.get('/:id', chapterCtrl.getOneChapter);

router.post('/', chapterCtrl.createChapter);
router.put('/:id', chapterCtrl.modifyChapter);
router.delete('/:id', chapterCtrl.deleteChapter);



module.exports = router;