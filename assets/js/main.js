// assets/js/main.js
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('tool-search');
  if (!searchInput) return;
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const text = card.innerText.toLowerCase();
      card.parentElement.style.display = text.includes(query) ? '' : 'none';
    });
  });
}); 