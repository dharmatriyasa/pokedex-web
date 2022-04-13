import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
// const link = new HttpLink({
//   uri: 'https://graphqlpokemon.favware.tech/'
// });

export const client = new ApolloClient({
  // Provide required constructor fields
  uri: 'https://graphqlpokemon.favware.tech/',
  cache: cache,

  // Provide some optional constructor fields
//   name: 'graphql-pokemon-client',
//   version: '1.0',
//   queryDeduplication: false,
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: 'cache-and-network'
//     }
//   }
});