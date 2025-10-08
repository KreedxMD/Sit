// Função para carregar repositórios do GitHub
async function loadRepos() {
  const username = 'ericknovae'; // Troque para seu username GitHub (ex.: 'ericknovae5' se for esse)
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`; // 6 repositórios mais recentes

  try {
    const response = await fetch(apiUrl);
    const repos = await response.json();

    const container = document.getElementById('repos-container');
    container.innerHTML = ''; // Limpa o "Carregando..."

    if (repos.length === 0) {
      container.innerHTML = '<p>Nenhum repositório público encontrado. Crie um no GitHub!</p>';
      return;
    }

    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'repo-card';
      card.innerHTML = `
        <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
        <p class="repo-desc">${repo.description || 'Sem descrição'}</p>
        <div class="repo-lang">${repo.language || 'Não especificada'}</div>
        <div class="repo-stats">
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="repo-link">Ver no GitHub</a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao carregar repositórios:', error);
    document.getElementById('repos-container').innerHTML = '<p>Erro ao carregar. Verifique sua conexão ou username.</p>';
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('github-modal');
  const btn = document.getElementById('github-btn');
  const close = document.querySelector('.close');

  btn.addEventListener('click', () => {
    modal.style.display = 'block';
    loadRepos(); // Carrega os repositórios ao abrir a modal
  });

  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
