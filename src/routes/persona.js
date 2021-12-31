const { Router } = require('express');
const { personasGet, personaGet, personaPost, personaPut, personaDelete } = require('../controllers/personas');
const router =Router();


router.get('/', personasGet);

router.get('/:id', personaGet);

router.post('/', personaPost);

router.put('/:id', personaPut );

router.delete('/:id', personaDelete);

module.exports = router;


