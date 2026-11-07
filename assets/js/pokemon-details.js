const urlPage = new URLSearchParams(window.location.search);
const pokemonId = urlPage.get("id");
const pokemonPerfil = document.getElementById("pokemonPerfil");

if (pokemonId) {
  loadRecordsOfThePokemonById(pokemonId);
} else {
  backForStart();
}

function backForStart() {
  window.location.href = "/";
}

function convertPokemonToItemHtml(pokemonDetails) {
  return `
  <div class="top-information ${pokemonDetails.type}">
    <header class='header-panel'>
      <nav class='navbar'>
        <button onclick="backForStart()">
          <span class="material-symbols-outlined">
            arrow_back
          </span>
        </button>
      </nav>
    </header>
    <div class="pokemon-initial-data">
      <!-- Pokemon Initial Data -->
      <h2 class = 'name'>${pokemonDetails.name}</h2>
      <span class = 'number'>#${pokemonDetails.number}</span>

      <div class="detail">
        <ol class="types">
          ${pokemonDetails.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
        </ol>

        <img
          src="${pokemonDetails.photo}"
          alt="${pokemonDetails.name}"
        />
      </div>
    </div>
  </div>

  <div class="nav_tabs">
    <input role="tab" type="radio" name="tabs" class="rd_tab" id="about-${pokemonDetails.number}" checked/>
    <label for="about-${pokemonDetails.number}" class="tab_label" style="--tipo-cor: var(--${pokemonDetails.type})">About</label>
    <div class="tab">
      <p>Specie: ${pokemonDetails.about.specie}</p>
      <p>Height: ${pokemonDetails.about.height} m</p>
      <p>Weight: ${pokemonDetails.about.weight} Kg</p>
      <p>Abilities: ${pokemonDetails.about.abilities}</p>

      <h3>Breeding</h3>
      <p>Genders:</p>
      <div class="genders-pokemon">
        <p>Male: ${pokemonDetails.about.genders["male"]}</p>
        <p>Female: ${pokemonDetails.about.genders["female"]}</p>
      </div>
        <p>Egg Groups: ${pokemonDetails.about.egg_groups}</p>
    </div>

    <input role="tab" type="radio" name="tabs" class="rd_tab" id="base_stats-${pokemonDetails.number}" />
    <label for="base_stats-${pokemonDetails.number}" class="tab_label" style="--tipo-cor: var(--${pokemonDetails.type})">Base Stats</label>
    <div class="tab base_stats-content">
      ${pokemonDetails.base_stats.map((stat) => `<p>${stat.statName}: ${stat.base_stat}</p>`).join("")}
    </div>

    <input role="tab" type="radio" name="tabs" class="rd_tab" id="evolution-${pokemonDetails.number}" />
    <label for="evolution-${pokemonDetails.number}" class="tab_label" style="--tipo-cor: var(--${pokemonDetails.type})">Evolution</label>
    <div class="tab evolution-content">
      ${pokemonDetails.evolution.map((name) => `<p>${name}</p>`).join("")}
    </div>

    <input role="tab" type="radio" name="tabs" class="rd_tab" id="moves-${pokemonDetails.number}" />
    <label for="moves-${pokemonDetails.number}" class="tab_label" style="--tipo-cor: var(--${pokemonDetails.type})">Moves</label>
    <div class="tab moves-content">
      ${pokemonDetails.moves.map((move) => `<p>${move}</p>`).join("")}
    </div>
  </div>
  `;
}

function loadRecordsOfThePokemonById(id) {
  pokemonPerfil.innerHTML = `<div class="loading">Carregando detalhes do Pokémon...</div>`;
  pokeAPI
    .getPokemon(id)
    .then((pokemon) => {
      const newHtml = convertPokemonToItemHtml(pokemon);
      pokemonPerfil.innerHTML += newHtml;
    })
    .finally(() => document.querySelector(".loading").remove());
}
