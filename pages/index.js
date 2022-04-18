/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Navbar from "../components/Navbar";
import PokemonCard from '../components/PokemonCard';
import { generatePokeSummary, getAllPokemons, getPokemons } from '../services/pokemon';
import { Router } from "next/router";
import PokeballAnimation from "../components/PokeballAnimation";
import { getCachedValue } from "../services/localStorage";
import {KEY} from "../config/localStorage";
import { capitalizeFirstLetter } from "../services/general";


export default function Home({initialPokemons}) {

  const [pokemons, setPokemons] = useState(initialPokemons);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [myPokemons, setSummaryPokemons] = useState(null);
  const [summaryPokemons, setSummaryPokemons] = useState(null);
  
  


  const fetchPokemon = (next) => {
      setOffset(next ? offset + 20 : offset - 20);
  }

  useEffect(() => {
    const fetchData = async() => {
      const response = await getAllPokemons(offset, 20);
      setPokemons(response);
    }
    fetchData();
  }, [offset]);

  useEffect(() => {

    const start = () => {
        setIsLoading(true);
    }

    const end = () => {
        setIsLoading(false);
    }
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return() => {
        Router.events.off("routeChangeStart", start);
        Router.events.off("routeChangeComplete", end);
        Router.events.off("routeChangeError", end);
    }
    
  }, []);

  useEffect(() => {
    // setTimeout(() => {
      const mypokemons = getCachedValue(KEY);
      // console.log(mypokemons);

      
      setIsLoading(false);
      if(mypokemons == null){
        // console.log(mypokemons);
        return;
      }
      
      setSummaryPokemons(generatePokeSummary(mypokemons));
    // }, 2000);
  }, [])

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
    cursor: 'pointer'
  });

  const rotate = css({
    transform: 'rotate(180deg)'
  })

  return (
    <div>
    <Navbar
      page={'index'}
    />
    {isLoading ? (
      <PokeballAnimation />
    ) : (
    <Fragment>
    <div css={container}>
      {!!pokemons &&(
        pokemons.map((pokemon, index) => {
          return(
            <PokemonCard 
              key={index}
              id={pokemon.pokemonId}
              name={pokemon.name}
              pokemonType={pokemon.pokemonType}
              summaryPokemon={(summaryPokemons?.find(el => el.name === capitalizeFirstLetter(pokemon.name)) )}
            />
          )
        })
      )}
    </div>
    <div css={paginationStyle}>
      <button disabled={offset === 0} css={buttonStyle} onClick={() => fetchPokemon(false)}>
        <img width={`40em`} css={rotate} src="/assets/next.png" alt="" />
      </button>
      <button disabled={offset === 1120} css={buttonStyle} onClick={() => fetchPokemon(true)}>
        <img width={`40em`} src="/assets/next.png" alt="" />
      </button>
    </div>
    </Fragment>

    )}
    </div>
  )
}

export async function getServerSideProps({req, query}){

  const initialPokemons = await getAllPokemons(`https://pokeapi.co/api/v2/pokemon`);

  let myPokemonLists;

  // if(typeof window !== "undefined"){
  //   myPokemonLists = getCachedValue(KEY);
  // }

  return {
    props: {
      initialPokemons,
      // myPokemonLists
    }
  }
}