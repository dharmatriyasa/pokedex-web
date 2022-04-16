/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PokemonCard from '../components/PokemonCard'
import { getAllPokemons, getPokemons } from '../services/pokemon'

export default function Home({initialPokemons}) {

  const [pokemons, setPokemons] = useState(initialPokemons);
  const [offset, setOffset] = useState(0);
  const [url, setUrl] = useState('');

  const fetchPokemon = (next) => {
    setTimeout(() => {
      setOffset(next ? offset + 20 : offset - 20);
      setUrl

    }, 800);
    
  }

  useEffect(() => {
    const fetchData = async() => {
      const response = await getAllPokemons(offset, 20);
      setPokemons(response);
    }
    fetchData();
  }, [offset])

  const breakpoints = [0, 576, 992];


  const mq = breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
  );

  const container = css({
    display: 'grid',
    padding: '100px 5px 25px 5px',
    [mq[0]] : {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    [mq[1]] : {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [mq[2]] : {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  });

  const paginationStyle = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  });

  const buttonStyle = css({
    padding: '5px 10px 100px 10px',
    margin: '0px 10px',
    border: 'none',
    backgroundColor: 'transparent',
  });

  const rotate = css({
    transform: 'rotate(180deg)'
  })

  return (
    <div>
    <Navbar
      page={'index'}
    />
    <div css={container}>
      {!!pokemons &&(
        pokemons.map((pokemon, index) => {
          return(
            <PokemonCard 
              key={index}
              id={index+offset}
              // paddedId={pokemon.paddedId}
              name={pokemon.name}
              // url={pokemon.url}
              // imageUrl={pokemon.imageUrl}
              pokemonType={pokemon.pokemonType}
            />
          )
        })
      )}
    </div>
    <div css={paginationStyle}>
      <button css={buttonStyle} onClick={() => fetchPokemon(false)}>
        <img width={`40em`} css={rotate} src="/assets/next.png" alt="" />
      </button>
      <button css={buttonStyle} onClick={() => fetchPokemon(true)}>
        <img width={`40em`} src="/assets/next.png" alt="" />
      </button>
    </div>
    </div>
  )
}

export async function getServerSideProps({req, query}){

  const initialPokemons = await getAllPokemons(`https://pokeapi.co/api/v2/pokemon`);
  console.log(initialPokemons);

  return {
    props: {
      initialPokemons
    }
  }
}