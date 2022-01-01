const { Router } = require('express');
const { empresasGet, empresaGet, empresaPost, empresaPut, empresaDelete } = require('../controllers/empresas');

const router =Router();


router.get('/', empresasGet);

router.get('/:id', empresaGet);

router.post('/', empresaPost);

router.put('/:id', empresaPut );

router.delete('/:id', empresaDelete);

module.exports = router;
