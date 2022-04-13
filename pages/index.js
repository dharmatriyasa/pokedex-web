import Head from 'next/head'
import Image from 'next/image'
import PokemonCard from '../components/PokemonCard'
import { getPokemons } from '../services/pokemon'
import styles from '../styles/Home.module.css'

export default function Home({pokemons}) {
  // console.log(pokemons);
  return (
    <div className={styles.container}>
      {pokemons.map((pokemon, index) => {
        return(
          <PokemonCard 
            key={index}
            id={pokemon.indexId}
            paddedId={pokemon.paddedId}
            name={pokemon.name}
            url={pokemon.url}
            imageUrl={pokemon.imageUrl}
            pokemonType={pokemon.pokemonType}
          />
        )
      })}
    </div>
  )
}

export async function getServerSideProps({req, query}){

  const pokemons = await getPokemons(0, 20);

  // const pokemons = res.results.map((result, index) => {
  //   const paddedId = ('00'+ (index+1)).slice(-3);
  //   const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
  //   return { ...result, paddedId, imageUrl };
  // })

  // const pokemons = await getPokemons(0, 20)
  // .then((res) => {
  //   console.log(res.data.id);
  //   const paddedId = ('00'+ (res.data.id+1)).slice(-3);
  //   const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
  //   return { ...res.data, image };
  // });

  // const pokemons = results.map((pokemon, index) => {
  //   const paddedId = ('00'+ (index+1)).slice(-3);

  //   const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
  //   return { ...pokemon, image };
  // })

  return {
    props: {
      pokemons
    }
  }
}