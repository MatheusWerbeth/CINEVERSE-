🎬 CineVerse - Sua Coleção de Filmes e Séries de Terror
Trabalho do Professor Igor, segundo periodo ADS A Manha

Um catálogo especializado com 18 títulos de terror (10 filmes e 8 séries) desenvolvido em React. O projeto utiliza diversos hooks, incluindo 3 custom hooks, e possui um backend integrado com SQLite para gerenciar lista de favoritos.

📋 Sobre o Projeto

O CineVerse é uma aplicação web que oferece uma curadoria selecionada de títulos de terror, permitindo aos usuários explorar, visualizar detalhes e salvar seus filmes e séries favoritos em uma lista pessoal.

Principais características:

· Catálogo com 18 títulos premium de terror
· Sistema de favoritos persistente
· Interface moderna e responsiva
· API RESTful completa

🛠️ Tecnologias Utilizadas

Frontend

· React com Vite
· Hooks: useState, useEffect, useContext, useReducer, useCallback + 3 Custom Hooks
· CSS Modules / Styled Components
· Axios para consumo de API

Backend

· Node.js com Express
· SQLite com DB Browser
· API REST com endpoints documentados

⚡ Como Executar o Projeto

Pré-requisitos

· Node.js 16+
· npm ou yarn

Instalação e Execução

Antes de se iniciar qualquer programado do react, é preciso executar um comando inicial:
npx create-react-app meu-app (Ou neste caso Cineverse.)

O projeto requer dois terminais rodando simultaneamente:

Terminal 1 - Frontend

```bash
cd cineverse (Acessar pasta do projeto)
npm install
npm start
```

O frontend estará disponível em: http://localhost:3000

Terminal 2 - Backend

```bash
cd cineverse-backend
npm install
npm start
```

O backend estará rodando em: http://localhost:5002

Verificando o Banco de Dados

Use o DB Browser for SQLite para visualizar os dados armazenados da lista de favoritos.
(Entre do DB Browser, acesse a pasta database no Back-end e entre em cineverse.db, assim que entrar será possivel ver em tempo real os filmes adicionado aos favoritos, é só adicionar e atualizar a tabela)

🌐 API Endpoints

Health Check

```http
GET http://localhost:5002/api/favoritos/health
```

Listar Favoritos

```http
GET http://localhost:5002/api/favoritos/listar?usuario_id=1
```

Status do Banco

```http
GET http://localhost:5002/api/favoritos/status-banco
```

Teste do Modelo

```http
GET http://localhost:5002/api/favoritos/teste-modelo
```

🎯 Funcionalidades

✅ Implementadas

· Catálogo completo de 18 títulos
· Sistema de favoritos com persistência
· 5+ Hooks do React (incluindo 3 custom hooks)
· API REST com SQLite
· Interface responsiva

🔄 Em Desenvolvimento

· [Se continuarmos o projeto depois iremos pensar no que adicionar..]

🏗️ Estrutura do Projeto

```
cineverse/
├── src/
│   ├── components/
|   ├──config/
|   ├── data/
│   ├── hooks/           # Custom hooks
|   ├── pages/
│   ├── styles/
│   └── App.jsx          # Ou no caso App.js
│
cineverse-backend/
├── config/
├── controllers/
├── database/            # SQLite files
├── middleware/
├── models/
├── node_modules
├── routes/ 
├── scripts/    
└── server.js
```

🎨 Custom Hooks Implementados

1. useFavoritos - Gerenciamento de favoritos
2. useLocalStorage - Persistência local
3. useApi - Comunicação com backend
-> Os demais hooks foram outros utilizados em:
Header.js: useState
ImageWithFallback.js: useState
MovieCard.js: useState
Navigation.js: useState
SearchBar.js: useState
Home.js: useState e useEffect
Categories: useState
Favorites: useFavoritos
Search: useState, useEffect, useRef
Series: useState, useEffect


📄 Licença

Distribuído sob licença MIT. Veja LICENSE para mais informações.

---

Identificação dos membros e componentes desenvolvidos por cada um;

Maria Eduarda Pereira Celestino (01811588)

Componente Essencial 1 — Header
Componente Essencial 2 — Navigation
Componente Não Funcional — ClassicMovieCard

Letícia Oliveira Santos (01807942)

Componente Essencial 3 — MovieCard
Componente Essencial 4 — MovieGrid
Componente Não Funcional — LoadingSpinner

Matheus Werbeth Sousa Lourenço (01817298)

Componente Essencial 5 — SearchBar
Componente Essencial 6 — TrailerModal
Componente Não Funcional — AutoScrollMovies

José Alejandro Teixeira da Silva (01796473)

Componente Essencial 7 — BotaoFavorito
Componente Essencial 8 — ImageWithFallback
Componente Não Funcional — ErrorBoundary

---


Desenvolvido com ❤️ e ☕ por Maria Eduarda, Leticia Oliveira, Jose Alejandro e Matheus Werbeth


"O medo nunca foi tão medonho BOOOOOOOO!" 🎃
