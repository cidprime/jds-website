const express = require('express');
const router = express.Router();

const progressCtrl = require('../controllers/progress');

/*
- `GET /api/progress/` : Obtenir toutes les progressions d'un utilisateur
- `GET /api/progress/:id` : Obtenir la progression par ID
- `POST /api/progress/` : Enregistrer une nouvelle progression
- `PUT /api/progress/:id` : Mettre à jour une progression par ID
*/

router.get('/', progressCtrl.getAllProgess);
router.get('/:id', progressCtrl.getOneProgess);
router.post('/', progressCtrl.createProgess);
router.put('/:id', progressCtrl.modifyProgess);


module.exports = router;