const recipelist = document.getElementById('recipeList');

function getRecipes() {
  const query = document.getElementById('searchInput').value.trim() || 'chicken';

  // Loading state
  recipelist.innerHTML = `
    <div class="loading-dots">
      <span></span><span></span><span></span>
    </div>`;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.meals) {
        recipelist.innerHTML = `
          <div class="state-msg">
            <span class="icon">🍽️</span>
            No recipes found for "<strong>${query}</strong>". Try something else!
          </div>`;
        return;
      }

      recipelist.innerHTML = '';

      data.meals.slice(0, 6).forEach(meal => {
        const link = meal.strSource || meal.strYoutube || '#';
        const linkLabel = meal.strYoutube ? '▶ Watch on YouTube' : '📖 View Full Recipe';

        recipelist.innerHTML += `
          <div class="recipe-card">
            <div class="img-wrap">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
              <div class="img-overlay"></div>
              <span class="img-badge">${meal.strCategory}</span>
            </div>
            <div class="card-content">
              <h4>${meal.strMeal}</h4>
              <div class="card-meta">
                <span class="meta-pill">🌍 ${meal.strArea}</span>
                <span class="meta-pill">🍴 ${meal.strCategory}</span>
              </div>
              <a href="${link}" target="_blank" class="card-link">${linkLabel} ↗</a>
            </div>
          </div>`;
      });
    })
    .catch(() => {
      recipelist.innerHTML = `<p class="error">⚠️ Something went wrong. Please check your connection and try again.</p>`;
    });
}