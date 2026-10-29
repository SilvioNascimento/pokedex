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
    <ul>
      <li>
        <input type="radio" name="tabs" class="rd_tab" id="about" checked/>
        <label for="about" class="tab_label" style="border-bottom: 2px solid var(--${pokemonDetails.type})">About</label>
        <div class="pokemon-other-data">
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
      </li>

      <li>
        <input type="radio" name="tabs" class="rd_tab" id="base_stats" />
        <label for="base_stats" class="tab_label" style="border-bottom: 2px solid var(--${pokemonDetails.type})">Base Stats</label>
        <div class="pokemon-other-data">
          ${pokemonDetails.base_stats.map((stat) => `<p>${stat.statName}: ${stat.base_stat}</p>`).join("")}
        </div>
      </li>
    </ul>
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
