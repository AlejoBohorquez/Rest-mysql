const { Router } = require('express');
const { areasGet, areaGet, areaPost, areaPut, areaDelete } = require('../controllers/areas');



const router =Router();


router.get('/', areasGet);

router.get('/:id', areaGet);

router.post('/', areaPost);

router.put('/:id', areaPut );

router.delete('/:id', areaDelete);

module.exports = router;
