const prisma=require('../lib/prisma');
async function criar(req,res){try{const {nome,latitude,longitude,raioMetros=150}=req.body;const lat=Number(latitude),lon=Number(longitude),raio=Number(raioMetros);if(!nome||!Number.isFinite(lat)||!Number.isFinite(lon)||!Number.isFinite(raio)||raio<1)return res.status(400).json({erro:'Dados do local inválidos.'});const local=await prisma.localTrabalho.create({data:{nome:nome.trim(),latitude:lat,longitude:lon,raioMetros:Math.round(raio)}});res.status(201).json({local});}catch(e){console.error(e);res.status(500).json({erro:'Erro ao cadastrar local.'});}}
async function listar(req,res){const locais=await prisma.localTrabalho.findMany({orderBy:{nome:'asc'}});res.json({locais});}
module.exports={criar,listar};
