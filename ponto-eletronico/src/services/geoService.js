const prisma=require('../lib/prisma');
function rad(g){return g*Math.PI/180;}
function distanciaMetros(lat1,lon1,lat2,lon2){const R=6371000,dLat=rad(lat2-lat1),dLon=rad(lon2-lon1);const a=Math.sin(dLat/2)**2+Math.cos(rad(lat1))*Math.cos(rad(lat2))*Math.sin(dLon/2)**2;return 2*R*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}
async function validarApiExterna(latitude,longitude,precisaoMetros){
 if(!process.env.GEO_API_URL)return null;
 const headers={'Content-Type':'application/json'}; if(process.env.GEO_API_KEY)headers.Authorization=`Bearer ${process.env.GEO_API_KEY}`;
 const resposta=await fetch(process.env.GEO_API_URL,{method:'POST',headers,body:JSON.stringify({latitude,longitude,precisaoMetros})});
 if(!resposta.ok)throw new Error(`API de geolocalização respondeu HTTP ${resposta.status}`);
 const dados=await resposta.json(),campo=process.env.GEO_API_AUTH_FIELD||'autorizado',autorizado=Boolean(dados[campo]);
 return {autorizado,endereco:dados.endereco||null,motivo:dados.motivo||(autorizado?'Local autorizado.':'Local recusado.')};
}
async function validarGeofence(latitude,longitude){
 const locais=await prisma.localTrabalho.findMany({where:{ativo:true}});
 if(!locais.length)return {autorizado:true,endereco:null,motivo:'Nenhuma geofence cadastrada. Liberação temporária do MVP.'};
 for(const local of locais){const d=distanciaMetros(latitude,longitude,local.latitude,local.longitude);if(d<=local.raioMetros)return {autorizado:true,endereco:local.nome,motivo:`Dentro da área permitida (${Math.round(d)} m).`};}
 return {autorizado:false,endereco:null,motivo:'Fora da área permitida.'};
}
async function validarLocalizacao(latitude,longitude,precisaoMetros){try{const externa=await validarApiExterna(latitude,longitude,precisaoMetros);if(externa)return externa;}catch(e){console.error('Falha na API externa:',e.message);}return validarGeofence(latitude,longitude);}
module.exports={validarLocalizacao,distanciaMetros};
