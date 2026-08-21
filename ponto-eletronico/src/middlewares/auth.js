const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

async function auth(req,res,next){
  try {
    const header=req.headers.authorization;
    if(!header?.startsWith('Bearer ')) return res.status(401).json({erro:'Token não informado.'});
    const payload=jwt.verify(header.slice(7),process.env.JWT_SECRET);
    const usuario=await prisma.usuario.findUnique({where:{id:payload.id},select:{id:true,nome:true,email:true,cargo:true,perfil:true,ativo:true}});
    if(!usuario?.ativo) return res.status(401).json({erro:'Usuário inválido ou inativo.'});
    req.user=usuario; next();
  } catch { return res.status(401).json({erro:'Token inválido ou expirado.'}); }
}
function admin(req,res,next){
  if(req.user?.perfil!=='ADMIN') return res.status(403).json({erro:'Acesso restrito ao administrador.'});
  next();
}
module.exports={auth,admin};
