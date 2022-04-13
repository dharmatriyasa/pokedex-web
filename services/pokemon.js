import axios from "axios";

export async function getPokemons(offset, limit){
    const res = await axios.get(`
        https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );

    const pokemons = await Promise.all(res.data.results.map( async(result, index) => {

        const pokemonType = await getPokemonTypes(index+1).then(res => res);

        const paddedId = ('00'+ (index+1)).slice(-3);
        const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        
        return { ...result, indexId: index+1, paddedId, imageUrl, pokemonType };
    }));


    return pokemons;
}

export async function getPokemonTypes(number){
    const pokemon = await axios.get(`
        https://pokeapi.co/api/v2/pokemon/${Number(number)}
    `).then(res => res.data.types);

    // console.log(pokemon);

    return pokemon;
}

export async function getPokemon(number){
    const pokemon = await axios.get(`
        https://pokeapi.co/api/v2/pokemon/${Number(number)}
    `); 

    console.log(pokemon);

    return pokemon;
}