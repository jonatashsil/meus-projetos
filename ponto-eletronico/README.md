# Ponto Eletrônico MVP

MVP com Node.js, Express, PostgreSQL, Prisma 7, JWT, bcrypt, perfis ADMIN/FUNCIONARIO, registro de entrada/intervalo/saída, GPS, geofence, histórico e painel administrativo.

## Instalação no Windows

```powershell
npm install
Copy-Item .env.example .env
```

Edite o `.env` com os dados do PostgreSQL. Depois:

```powershell
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Abra `http://localhost:3000`.

## Segurança

O `.env` está no `.gitignore` e nunca deve ser enviado ao GitHub.

## API de geolocalização

Configure `GEO_API_URL`, `GEO_API_KEY` e `GEO_API_AUTH_FIELD` no `.env`. Se a sua API usar outro formato de requisição ou resposta, adapte `src/services/geoService.js`.
