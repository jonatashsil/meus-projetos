const router=require('express').Router(); const {login,me}=require('../controllers/authController'); const {auth}=require('../middlewares/auth');
router.post('/api/auth/login',login); router.get('/api/auth/me',auth,me); module.exports=router;
