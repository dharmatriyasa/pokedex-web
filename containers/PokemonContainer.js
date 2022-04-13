import { useQuery } from "@apollo/react-hooks";
import { getPokemons } from "../graphql/getPokemon";

const PokemonContainer = () => {
    const { data: { pokemons = [] } = {} } = useQuery(getPokemons, {
        variables:{
            first: 20
        }
    })

    // console.log(data);
    console.log(pokemons);
    
    return (
        <div className="pokemons">
            {pokemons && pokemons.map(pokemon => JSON.stringify(pokemon))}
        </div>
    );
}
 
export default PokemonContainer;