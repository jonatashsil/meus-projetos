const router=require('express').Router(); const {criarUsuario,listarUsuarios}=require('../controllers/usuarioController'); const {auth,admin}=require('../middlewares/auth');
router.get('/api/usuarios',auth,admin,listarUsuarios); router.post('/api/usuarios',auth,admin,criarUsuario); module.exports=router;
