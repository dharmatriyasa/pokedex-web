/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/react";

const catchingPokemon = ({isCatching}) => css({
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    zIndex: `${isCatching ? '30' : '-10'}`,
    opacity: `${isCatching ? '0.9' : '0'}`,
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

const fontStyle = css({
    color: "#FFF"
});

const imagePokemonStyle = css({
    position: 'absolute',
    zIndex: '40',
    width: '10.5em',
    top: '50px'
});

const pokeballEffect = keyframes`
    0 { transform: translate(0, 0) rotate(0); }
    20% { transform: translate(-10px, 0) rotate(-20deg); }
    30% { transform: translate(10px, 0) rotate(20deg); }
    50% { transform: translate(-10px, 0) rotate(-10deg); }
    60% { transform: translate(10px, 0) rotate(10deg); }
    100% { transform: translate(0, 0) rotate(0); }
`;

const imagePokeballStyle = css({
    zIndex: '40',
    width: '6.5em',
    position: 'absolute',
    bottom: '55px',
    animation: `${pokeballEffect} 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) 2`
});



const CatchingPokemon = ({isCatching, imageUrl}) => {

    // useEffect(() => {

    // },[isCatching])

    return isCatching ?(
        <div css={catchingPokemon({isCatching})}>
            <img css={imagePokemonStyle} src={imageUrl} alt="" />
            <h1 css={fontStyle}>Catching...</h1>
            <img css={imagePokeballStyle} src="/assets/pokeballIcon.png" alt="" />
        </div>
    ) : null;
}
 
export default CatchingPokemon;