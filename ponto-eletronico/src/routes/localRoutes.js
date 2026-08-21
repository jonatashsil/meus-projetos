const router=require('express').Router(); const {criar,listar}=require('../controllers/localController'); const {auth,admin}=require('../middlewares/auth');
router.get('/api/locais',auth,admin,listar); router.post('/api/locais',auth,admin,criar); module.exports=router;
