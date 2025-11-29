/* global fetch, document */
const grid = document.getElementById('list');
const player = document.getElementById('player');

// endpoint neutro que devolve lista genérica
const LIST_URL = 'https://hanime.tv/api/v8/browse';
const LIST_BODY = {
  search_text: '',
  tags: [],
  brands: [],
  blacklist: [],
  order_by: 'created_at_unix',
  ordering: 'desc',
  page: 0
};

/* monta visual */
function addCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<img src="${item.cover_url}" alt="${item.name}" loading="lazy">`;
  card.onclick = () => play(item);
  grid.appendChild(card);
}

/* roda o vídeo */
function play(item) {
  const url = item.videos_manifest.servers[0]?.streams[0]?.url;
  if (!url) return;
  player.src = url;
  player.style.display = 'block';
  player.scrollIntoView({behavior: 'smooth'});
}

/* busca a lista */
fetch(LIST_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(LIST_BODY)
})
  .then(r => r.json())
  .then(d => d.hentai_videos.forEach(addCard))
  .catch(console.error);
