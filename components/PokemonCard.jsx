/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Link from "next/link";
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
    marginTop: '20px',
    marginBottom: '20px',
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


const PokemonCard = ({id, paddedId,name, url, imageUrl, pokemonType}) => {
    // const hrefId = https://pokeapi.co/api/v2/pokemon/9/
    return (
        <div css={cardStyle}>
            <div>
                <h4 css={grayColor}>{paddedId}</h4>
            </div>
            <div>
            <Link href={`/pokemon/${id}`}>
                <div>
                <h1 css={grayColor}>{name}</h1>
                <img css={imageStyle} src={imageUrl} alt="" />
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
        </div>
    );
}
 
export default PokemonCard;