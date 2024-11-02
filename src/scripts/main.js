const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi
        .getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHTML = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                        </ol>
                        <div class="image_container">
                            <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>
                    </div>
                </li>
        `).join("");
            pokemonList.innerHTML += newHTML;
        })
}
function test(){
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        loadPokemonItensLimited();
    }
}
function loadPokemonItensLimited(){
    offset += limit;
    const qtdRecordNextPage = offset + limit;
    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
        window.removeEventListener("scroll", test)
    } else {
        loadPokemonItens(offset, limit);
    }
}

loadPokemonItens(offset, limit);
loadMoreButton.addEventListener('click', loadPokemonItensLimited)

window.addEventListener('scroll', test);