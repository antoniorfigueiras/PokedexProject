let pokemons = [];
const poke_container = document.getElementById('poke_container');
const pokemons_number = 151;
const search = document.getElementById("search");
const form = document.getElementById("form");

const colors = {
    Fire: '#FDDFDF',
    Grass: '#DEFDE0',
    Electric: '#FCF7DE',
    Water: '#DEF3FD',
    Ground: '#f4e7da',
    Rock: '#d5d5d4',
    Fairy: '#fceaff',
    Poison: '#98d7a5',
    Bug: '#f8d5a3',
    Dragon: '#97b3e6',
    Psychic: '#eaeda1',
    Flying: '#F5F5F5',
    Fighting: '#E6E0D4',
    Normal: '#F5F5F5'
};

const main_types = Object.keys(colors);


const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++) {
        await getAllPokemon(i);
    }
    pokemons.forEach((pokemon) => createPokemonCard(pokemon));
}

const removePokemon = () => {
    const pokemonEls = document.getElementsByClassName("pokemon");
    let removablePokemons = [];
    for (let i = 0; i< pokemonEls.length;i++) {
        const pokemonEl = pokemonEls[i];
        removablePokemons= [...removablePokemons, pokemonEl];
    }
    removablePokemons.forEach((remPoke) => remPoke.remove());
}

const getPokemon = async (id) => {
    const searchPokemons = pokemons.filter((poke) => poke.name === id);
    removePokemon();
    searchPokemons.forEach((pokemon) => createPokemonCard(pokemon));
}

const getAllPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
    pokemons = [...pokemons,pokemon];
}

fetchPokemons();

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(el => el.type.name);
    if (poke_types[1]) {
        var type = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1) + " & " + pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1);
        }
    else {
        var type = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
    }
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const colorType = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
    const color = colors[colorType];

    pokemonEl.style.backgroundColor = color;
    const pokeInnerHTML = `
    <div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
    </div>
    <div class="info">
    <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
    </div>
    `;
    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value.toLowerCase();
    if (searchTerm) {
        getPokemon(searchTerm);
        search.value="";
    }else if(searchTerm === "") {
        pokemons = [];
        removePokemon();
        fetchPokemons();
    }
})