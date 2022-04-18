/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Link from "next/link";
import { capitalizeFirstLetter } from "../services/general";
import Type from "./Type";

const cardStyle = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop:'12px',
    paddingBottom:'32px',
    paddingLeft: '32px',
    paddingRight: '32px',
    margin: '20px',
    background: '#fff',
    borderRadius: '25px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
});

const grayColor = css({
    color: '#A1A09F'
})


const imageStyle = css({
    width: '10.5em'
});


const PokemonCard = ({id, name, pokemonType, summaryPokemon}) => {
    // const paddedId = ('00'+ (id+1)).slice(-3);
    // const paddedIdCard = ('00'+ (id+1)).slice(-3);

    // console.log(paddedIdCard)


    let capitalName = capitalizeFirstLetter(name);
    return (
        <div css={cardStyle}>
            <div>
                <h4 css={grayColor}>#{id}</h4>
            </div>
            <div css={{ cursor: 'pointer' }}>
            <Link href={`/pokemon/${id}`}>
                <div>
                <h1 css={grayColor}>{capitalName}</h1>
                <img css={imageStyle} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="" />
                </div>
            </Link>
            </div>
            <div>
                {pokemonType.map((data, index) => {
                    return(
                    <Type
                        key={index}
                        type={data.type.name}
                    />
                    )
                })}
            </div>
            <div css={{ marginTop: '10px', color: '#A1A09F' }}>
                {!!summaryPokemon && (
                    <h5>Owned: {summaryPokemon.captured}</h5>
                )}
            </div>
        </div>
    );
}
 
export default PokemonCard;