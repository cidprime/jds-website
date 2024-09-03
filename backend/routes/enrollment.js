const express = require('express');
const router = express.Router();

const enrollmentCtrl = require('../controllers/enrollment');
/*
- `GET /api/enrollments/` : Obtenir toutes les inscriptions
- `GET /api/enrollments/:id` : Obtenir une inscription par ID
- `POST /api/enrollments/` : Créer une nouvelle inscription (utilisateur)
- `PUT /api/enrollments/:id` : Mettre à jour une inscription par ID (utilisateur/admin)
- `DELETE /api/enrollments/:id` : Supprimer une inscription par ID (admin)
*/

router.get('/', enrollmentCtrl.getAllEnrollments);
router.get('/:id', enrollmentCtrl.getOneEnrollment);

router.post('/', enrollmentCtrl.createEnrollment);
router.put('/:id', enrollmentCtrl.modifyEnrollment);
router.delete('/:id', enrollmentCtrl.deleteEnrollment);


module.exports = router;