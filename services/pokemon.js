import axios from "axios";

export async function getAllPokemons(offset, limit){
    const res = await axios.get(`
        https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );

    const pokemons = await Promise.all(res.data.results.map( async(result) => {
        const pokemonType = await getPokemonTypes(result.name).then(res => res);
        const pokemonId = await getPokemonId(result.name);

        // console.log(pokemonId);

        return {...result, pokemonId, pokemonType}
    }));

    return pokemons;
}

export async function getPokemons(offset, limit){
    const res = await axios.get(`
        https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );

    const pokemons = await Promise.all(res.data.results.map( async(result, index) => {

        console.log(result);
        const pokemonType = await getPokemonTypes(result.name).then(res => res);


        const paddedId = ('00'+ (index+1)).slice(-3);
        const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        
        return { ...result, indexId: index+1, paddedId, imageUrl, pokemonType };
    }));


    return pokemons;
}

export async function getPokemonTypes(name){
    const pokemon = await axios.get(`
        https://pokeapi.co/api/v2/pokemon/${name}
    `).then(res => res.data.types);

    // console.log(pokemon);

    return pokemon;
}

export async function getPokemonId(name){
    const pokemonId = await axios.get(`
        https://pokeapi.co/api/v2/pokemon/${name}
    `).then(res => res.data.id);


    return pokemonId;
}

export async function getPokemon(number){
    const pokemon = await axios.get(`
        https://pokeapi.co/api/v2/pokemon/${Number(number)}
    `); 

    return pokemon;
}

export function catchPokemon(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.random() > 0.5 ? true : false);
        }, 2002);
    })
}

export function generatePokeSummary(pokemons){
    let results = [];

    console.log(pokemons, 'services');

    pokemons.forEach((pokemon, index) => {
        let pokemonExists = false;

        if(index === 0){
            results.push({name: pokemon.name, captured: 1});
        } else {
            for(let result of results){
                if(result.name === pokemon.name) pokemonExists = true;
            }

            if(pokemonExists) {
                let pokemonIndex = results.findIndex((result) => result.name === pokemon.name);
                results[pokemonIndex].captured++;
            } else {
                results.push({name: pokemon.name, captured: 1});
            }
        }
    });

    return results;
}