const express = require('express');
const router = express.Router();

const sectionCtrl = require('../controllers/section');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
/*
- `GET /` : Obtenir toutes les sections
- `GET /:id` : Obtenir une section par ID
- `POST /` : Créer une nouvelle section (admin/professeur)
- `PUT /:id` : Mettre à jour une section par ID (admin/professeur)
- `DELETE /:id` : Supprimer une section par ID (admin/professeur)
*/

// add auth and isAdmin later
router.get('/', sectionCtrl.getAllSections);
router.get('/:id', sectionCtrl.getOneSection);

router.post('/', sectionCtrl.createSection);
router.put('/:id', sectionCtrl.modifySection);
router.delete('/:id', sectionCtrl.deleteSection);


module.exports = router;