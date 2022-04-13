import { ApolloClient } from "apollo-boost";
import { gql, useQuery } from '@apollo/client';
import { client } from "../config/ApolloClient";
import PokemonContainer from "../containers/PokemonContainer";
import { getPokemons } from "../graphql/getPokemon";

// const GET_POKEMONS = gql`
//   query pokemons($limit: Int, $offset: Int) {
//     pokemons(limit: $limit, offset: $offset) {
//       count
//       next
//       previous
//       status
//       message
//       results {
//         url
//         name
//         image
//       }
//     }
//   }
// `;

// const gqlVariables = {
//   limit: 2,
//   offset: 1,
// };

const Pokemon = ({data}) => {

//     const { loading, error, data } = useQuery(GET_POKEMONS, {
//         variables: gqlVariables,
//     });

//     if (loading) return 'Loading...';
//     if (error) return `Error! ${error.message}`;

//   console.log('Response from server', data);

    // const gqlVariabels = {
    //     limit: 2,
    //     offset: 1
    // }
    
    // const { loading, error, data } = useQuery(getPokemons, {
    //     variables: gqlVariabels,
    // });

    // if(loading) return 'Loading...';
    // if(error) return `Error ${error.message}`

    // console.log(data);

    // const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
    //     pokemons(limit: $limit, offset: $offset) {
    //       count
    //       next
    //       previous
    //       status
    //       message
    //       results {
    //         url
    //         name
    //         image
    //       }
    //     }
    //   }`;
      
    //   const gqlVariables = {
    //     limit: 2,
    //     offset: 1,
    //   };
      
    //   fetch('https://graphql-pokeapi.graphcdn.app/', {
    //     credentials: 'omit',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       query: gqlQuery,
    //       variables: gqlVariables,
    //     }),
    //     method: 'POST',
    //   })
    //     .then((res) => res.json())
    //     .then((res) => console.log('Response from server', res));

    console.log(data);
   
    return (
        // <ApolloProvider client={client}>
        <div>
            <p>Hehe</p>
        </div>
        // </ApolloProvider>
    );
}
 
export default Pokemon;

export async function getServerSideProps(){
    const { data } = await client.query({
        query: gql`
        query pokemons($limit: Int, $offset: Int) {
          pokemons(limit: 20, offset: 1) {
            count
            next
            previous
            status
            message
            results {
              url
              name
              image
            }
          }
        }
      `
    });

    return {
        props: {
            data: data,
        }
    }
}