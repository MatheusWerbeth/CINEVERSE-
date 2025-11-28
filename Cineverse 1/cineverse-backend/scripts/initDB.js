const { Movie, User } = require('../models');

const initialMovies = [
  {
    title: "O Iluminado",
    year: 1980,
    director: "Stanley Kubrick",
    description: "Uma família se muda para um hotel isolado para o inverno, onde uma presença sinistra influencia o pai à violência.",
    image: "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    rating: 4.8,
    duration: "2h 26m",
    type: "movie",
    category: "Psicológico",
    trailer: "https://www.youtube.com/watch?v=5Cb3ik6zP2I",
    isActive: true
  },
  {
    title: "O Exorcista",
    year: 1973,
    director: "William Friedkin",
    description: "Quando uma menina é possuída por uma entidade demoníaca, sua mãe recorre a dois padres para salvar sua vida.",
    image: "https://i.ibb.co/0Q8L8Z9/exorcista.jpg",
    rating: 4.7,
    duration: "2h 2m",
    type: "movie",
    category: "Sobrenatural",
    trailer: "https://www.youtube.com/watch?v=YDGw1MTEe9k",
    isActive: true
  },
  {
    title: "Hereditário",
    year: 2018,
    director: "Ari Aster",
    description: "Uma família é atormentada após a morte de sua avó reclusa, revelando um legado aterrorizante.",
    image: "https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_.jpg",
    rating: 4.5,
    duration: "2h 7m",
    type: "movie",
    category: "Terror Familiar",
    trailer: "https://www.youtube.com/watch?v=3eGP6im8AZA",
    isActive: true
  },
  {
    title: "Invocação do Mal",
    year: 2013,
    director: "James Wan",
    description: "Paranólogos investigam uma casa assombrada no interior dos Estados Unidos.",
    image: "https://i.ibb.co/7y7qyJ3/invocacao.jpg",
    rating: 4.6,
    duration: "1h 52m",
    type: "movie",
    category: "Sobrenatural",
    trailer: "https://www.youtube.com/watch?v=k10ETZ41q5o",
    isActive: true
  },
  {
    title: "Corra!",
    year: 2017,
    director: "Jordan Peele",
    description: "Um jovem afro-americano visita a família de sua namorada branca, apenas para descobrir um segredo perturbador.",
    image: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_.jpg",
    rating: 4.8,
    duration: "1h 44m",
    type: "movie",
    category: "Suspense",
    trailer: "https://www.youtube.com/watch?v=DzfpyUB60YY",
    isActive: true
  },
  {
    title: "O Chamado",
    year: 2002,
    director: "Gore Verbinski",
    description: "Uma jornalista investiga uma fita amaldiçoada que mata quem a assiste em sete dias.",
    image: "https://m.media-amazon.com/images/M/MV5BNDcxMzk0MDY1M15BMl5BanBnXkFtZTYwODExMTM2._V1_.jpg",
    rating: 4.3,
    duration: "1h 55m",
    type: "movie",
    category: "Sobrenatural",
    trailer: "https://www.youtube.com/watch?v=yzKw4t3fyWg",
    isActive: true
  },
  {
    title: "O Massacre da Serra Elétrica",
    year: 1974,
    director: "Tobe Hooper",
    description: "Um grupo de amigos encontra uma família de canibais no Texas.",
    image: "https://i.ibb.co/0mY3Z3L/massacre.jpg",
    rating: 4.2,
    duration: "1h 23m",
    type: "movie",
    category: "Slasher",
    trailer: "https://www.youtube.com/watch?v=6McgQ4Y3uYc",
    isActive: true
  },
  {
    title: "Midsommar",
    year: 2019,
    director: "Ari Aster",
    description: "Um casal viaja para um festival de verão na Suécia que se transforma em um pesadelo.",
    image: "https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_.jpg",
    rating: 4.4,
    duration: "2h 28m",
    type: "movie",
    category: "Folk Horror",
    trailer: "https://www.youtube.com/watch?v=1Vnghdsjmd0",
    isActive: true
  },
  {
    title: "It: A Coisa",
    year: 2017,
    director: "Andy Muschietti",
    description: "Um grupo de crianças enfrenta um palhaço maligno que se alimente de seus medos.",
    image: "https://m.media-amazon.com/images/M/MV5BZDVkZmI0YzAtNzdjYi00ZjhhLWE1ODEtMWMzMWMzNDA0NmQ4XkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_.jpg",
    rating: 4.6,
    duration: "2h 15m",
    type: "movie",
    category: "Sobrenatural",
    trailer: "https://www.youtube.com/watch?v=FnCdOQsX5kc",
    isActive: true
  },
  {
    title: "O Bebê de Rosemary",
    year: 1968,
    director: "Roman Polanski",
    description: "Um casal se muda para um prédio em Nova York, onde eventos estranhos começam a acontecer.",
    image: "https://i.ibb.co/0jK8Q8L/rosemary.jpg",
    rating: 4.4,
    duration: "2h 17m",
    type: "movie",
    category: "Psicológico",
    trailer: "https://www.youtube.com/watch?v=iy62P2oK1s4",
    isActive: true
  },
  {
    title: "The Haunting of Hill House",
    year: 2018,
    director: "Mike Flanagan",
    description: "Irmãos que cresceram na mansão Hill House são forçados a enfrentar os fantasmas do passado.",
    image: "https://m.media-amazon.com/images/M/MV5BMTU4NzA4MDEwNF5BMl5BanBnXkFtZTgwMTQxODYzNjM@._V1_.jpg",
    rating: 4.9,
    duration: "1 temporada",
    type: "series",
    category: "Sobrenatural",
    trailer: "https://www.youtube.com/watch?v=3eqxXqJDcYI",
    isActive: true
  },
  {
    title: "American Horror Story",
    year: 2011,
    director: "Ryan Murphy",
    description: "Uma antologia de séries de terror, cada temporada com uma história e personagens diferentes.",
    image: "https://i.ibb.co/0Q8L8Z9/ahs.jpg",
    rating: 4.6,
    duration: "11 temporadas",
    type: "series",
    category: "Antologia",
    trailer: "https://www.youtube.com/watch?v=2GJsW59d9_4",
    isActive: true
  },
  {
    title: "The Walking Dead",
    year: 2010,
    director: "Frank Darabont",
    description: "Sobreviventes de um apocalipse zumbi tentam encontrar esperança em um mundo devastado.",
    image: "https://m.media-amazon.com/images/M/MV5BZmU5NTcwNjktODIwMi00ZmZkLTk4ZWUtYzVjZWQ5ZTZjN2RlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    rating: 4.5,
    duration: "11 temporadas",
    type: "series",
    category: "Zumbi",
    trailer: "https://www.youtube.com/watch?v=R1v0uFms68U",
    isActive: true
  },
  {
    title: "Stranger Things",
    year: 2016,
    director: "Irmãos Duffer",
    description: "Um grupo de crianças enfrenta forças sobrenaturais e experimentos secretos do governo.",
    image: "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    rating: 4.8,
    duration: "4 temporadas",
    type: "series",
    category: "Ficção Científica",
    trailer: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    isActive: true
  },
  {
    title: "The Last of Us",
    year: 2023,
    director: "Craig Mazin",
    description: "Um homem é contratado para escoltar uma adolescente através de um Estados Unidos pós-apocalíptico.",
    image: "https://m.media-amazon.com/images/M/MV5BZGUzYTI0M2YtMzhmMy00Yjc4LWE0Y2ItNGQ4ZTI2NDg0Mjk5XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
    rating: 4.9,
    duration: "1 temporada",
    type: "series",
    category: "Zumbi",
    trailer: "https://www.youtube.com/watch?v=uLtkt8BonwM",
    isActive: true
  },
  {
    title: "The X-Files",
    year: 1993,
    director: "Chris Carter",
    description: "Dois agentes do FBI investigam casos inexplicáveis envolvendo fenômenos paranormais.",
    image: "https://i.ibb.co/0mY3Z3L/xfiles.jpg",
    rating: 4.7,
    duration: "11 temporadas",
    type: "series",
    category: "Ficção Científica",
    trailer: "https://www.youtube.com/watch?v=KKziOmsJxzE",
    isActive: true
  },
  {
    title: "Midnight Mass",
    year: 2021,
    director: "Mike Flanagan",
    description: "Uma comunidade isolada experimenta eventos milagrosos e perturbadores com a chegada de um padre misterioso.",
    image: "https://i.ibb.co/7y7qyJ3/midnight.jpg",
    rating: 4.7,
    duration: "1 temporada",
    type: "series",
    category: "Sobrenatural",
    trailer: "https://www.youtube.com/watch?v=fkFma-p4j_c",
    isActive: true
  },
  {
    title: "The Terror",
    year: 2018,
    director: "David Kajganich",
    description: "Tripulação de um navio britânico fica presa no gelo enquanto é perseguida por uma criatura misteriosa.",
    image: "https://i.ibb.co/0jK8Q8L/terror.jpg",
    rating: 4.5,
    duration: "2 temporadas",
    type: "series",
    category: "Sobrenatural",
    trailer: "https://www.youtube.com/watch?v=ZqS0vICcNus",
    isActive: true
  }
];

const initDatabase = async () => {
  try {
    console.log('🗄️ Inicializando banco de dados...');

    // Inserir filmes
    await Movie.bulkCreate(initialMovies);
    console.log(`🎬 ${initialMovies.length} filmes/séries inseridos!`);

    // Criar usuários padrão
    await User.bulkCreate([
      {
        username: 'admin',
        email: 'admin@cineverse.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        username: 'user',
        email: 'user@cineverse.com',
        password: '123456',
        role: 'user'
      }
    ]);
    console.log('👤 Usuários padrão criados!');

    console.log('✅ Banco de dados inicializado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao inicializar banco:', error);
    throw error;
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('🎉 Setup completo!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Erro no setup:', error);
      process.exit(1);
    });
}

module.exports = initDatabase;