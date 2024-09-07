const express = require('express');
const router = express.Router();

const quizCtrl = require('../controllers/quiz');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

/*
- `GET /api/quizzes/` : Obtenir tous les quizzes
- `GET /api/quizzes/:id` : Obtenir un quiz par ID
- `POST /api/quizzes/` : Créer un nouveau quiz (admin/professeur)
- `PUT /api/quizzes/:id` : Mettre à jour un quiz par ID (admin/professeur)
- `DELETE /api/quizzes/:id` : Supprimer un quiz par ID (admin/professeur)
*/

// add auth and isAdmin here
router.get('/', quizCtrl.getAllQuiz);
router.get('/:id', quizCtrl.getOneQuiz);

router.post('/', quizCtrl.createQuiz);
router.put('/:id', quizCtrl.modifyQuiz);
router.delete('/:id', quizCtrl.deleteQuiz);


module.exports = router;