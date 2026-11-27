(() => {
  const cards = document.querySelectorAll('[data-repo]');
  const cacheKey = 'guohai-project-stats-v1';
  const owner = 'guohai163';

  function update(projects) {
    const repositories = new Map(projects.map(repo => [repo.name, repo]));
    for (const card of cards) {
      const repo = repositories.get(card.dataset.repo);
      if (!repo || !Number.isInteger(repo.stars) || !Number.isInteger(repo.forks) ||
          typeof repo.updatedAt !== 'string' || Number.isNaN(Date.parse(repo.updatedAt))) continue;

      const time = card.querySelector('time');
      if (Date.parse(repo.updatedAt) < Date.parse(time.dateTime)) continue;

      card.querySelector('[data-stars]').textContent = repo.stars;
      card.querySelector('[data-forks]').textContent = repo.forks;
      time.dateTime = repo.updatedAt;
      time.textContent = repo.updatedAt.slice(0, 10);
    }
  }

  async function refresh() {
    let cached;
    try {
      cached = JSON.parse(localStorage.getItem(cacheKey));
    } catch {
      // Storage can be disabled.
    }
    if (Array.isArray(cached?.projects)) {
      update(cached.projects);
      if (Date.now() - cached.fetchedAt < 60 * 60 * 1000) return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${owner}/repos?per_page=100&sort=updated`);
      if (!response.ok) return;

      const names = new Set([...cards].map(card => card.dataset.repo));
      const repositories = await response.json();
      const projects = repositories.filter(repo => names.has(repo.name)).map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
      }));
      update(projects);
      localStorage.setItem(cacheKey, JSON.stringify({ fetchedAt: Date.now(), projects }));
    } catch {
      // The page already contains the last known statistics.
    }
  }

  refresh();
})();
