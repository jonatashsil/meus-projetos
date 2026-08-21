const router=require('express').Router(); const {registrar,meuHistorico,listarTodos}=require('../controllers/pontoController'); const {auth,admin}=require('../middlewares/auth');
router.post('/api/pontos',auth,registrar); router.get('/api/pontos/meu-historico',auth,meuHistorico); router.get('/api/pontos',auth,admin,listarTodos); module.exports=router;
