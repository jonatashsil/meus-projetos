require('dotenv').config();
const path=require('path'); const express=require('express'); const cors=require('cors');
const authRoutes=require('./routes/authRoutes'),usuarioRoutes=require('./routes/usuarioRoutes'),pontoRoutes=require('./routes/pontoRoutes'),localRoutes=require('./routes/localRoutes');
if(!process.env.JWT_SECRET){console.error('JWT_SECRET não configurado no .env');process.exit(1);}
const app=express(); app.use(cors()); app.use(express.json());
app.get('/api/health',(req,res)=>res.json({ok:true,servico:'Ponto Eletrônico MVP'}));
app.use(authRoutes);app.use(usuarioRoutes);app.use(pontoRoutes);app.use(localRoutes);
app.use(express.static(path.join(__dirname,'..','public')));
app.get(/^(?!\/api).*/,(req,res)=>res.sendFile(path.join(__dirname,'..','public','index.html')));
const PORT=Number(process.env.PORT)||3000; app.listen(PORT,'0.0.0.0',()=>console.log(`Ponto Eletrônico rodando em http://localhost:${PORT}`));
