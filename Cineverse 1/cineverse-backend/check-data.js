const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'cineverse.db');

const db = new sqlite3.Database(dbPath, async (err) => {
  if (err) {
    console.error('❌ Erro ao abrir banco:', err.message);
    return;
  }
  
  console.log('📊 DADOS DO CINEVERSE -', new Date().toLocaleString());
  console.log('='.repeat(50));
  
  try {
    // Executar consultas em sequência para evitar bagunça
    const moviesCount = await getCount('SELECT COUNT(*) as total FROM movies');
    const usersCount = await getCount('SELECT COUNT(*) as total FROM users');
    const favoritesCount = await getCount('SELECT COUNT(*) as total FROM favorites');
    
    console.log(`🎬 Total de filmes/séries: ${moviesCount}`);
    console.log(`👤 Total de usuários: ${usersCount}`);
    console.log(`❤️ Total de favoritos: ${favoritesCount}`);
    
    await showCategories();
    await showRecentMovies();
    await showUsers();
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Verificação concluída!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    db.close();
  }
});

// Função auxiliar para contar
function getCount(sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, (err, row) => {
      if (err) reject(err);
      else resolve(row.total);
    });
  });
}

// Mostrar categorias
function showCategories() {
  return new Promise((resolve, reject) => {
    console.log('\n🏷️ Categorias disponíveis:');
    db.all('SELECT DISTINCT category FROM movies ORDER BY category', (err, rows) => {
      if (err) reject(err);
      else {
        rows.forEach((cat, index) => {
          console.log(`   ${index + 1}. ${cat.category}`);
        });
        resolve();
      }
    });
  });
}

// Mostrar filmes recentes
function showRecentMovies() {
  return new Promise((resolve, reject) => {
    console.log('\n🎭 Últimos filmes adicionados:');
    db.all('SELECT id, title, year, type, category FROM movies ORDER BY id DESC LIMIT 5', (err, rows) => {
      if (err) reject(err);
      else {
        rows.forEach(movie => {
          const type = movie.type === 'series' ? '📺 SÉRIE' : '🎬 FILME';
          console.log(`   ${movie.id}. ${movie.title} (${movie.year})`);
          console.log(`      ${type} | ${movie.category}`);
        });
        resolve();
      }
    });
  });
}

// Mostrar usuários
function showUsers() {
  return new Promise((resolve, reject) => {
    console.log('\n👥 Usuários do sistema:');
    db.all('SELECT id, username, email, role FROM users', (err, users) => {
      if (err) reject(err);
      else {
        users.forEach(user => {
          const role = user.role === 'admin' ? '👑 ADMIN' : '👤 USER';
          console.log(`   ${user.id}. ${user.username} (${user.email}) - ${role}`);
        });
        resolve();
      }
    });
  });
}