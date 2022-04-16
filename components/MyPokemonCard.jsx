/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";


const MyPokemonCard = ({name, nickname, imageUrl, isReleaseFunction}) => {

    const isReleaseFunc = isReleaseFunction;


    const breakpoints = [0, 576];

    const mq = breakpoints.map(
        bp => `@media (min-width: ${bp}px)`
    );

    const cardStyle = css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '15px 40px',
        margin: '15px 25px',
        backgroundColor: '#3a799d',
        borderRadius: '20px',
        position: 'relative',
        width: '20em',
        // height: '20px'
    });

    const cardItemStyle = css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    })

    const pokemonImgStyle = css({
        position: 'relative',
        width: '8em',
        zIndex: '30'
    });

    const pokeballImgStyle = css({
        position: 'absolute',
        bottom: '-30px',
        right: '-20px',
        width: '8em',
        opacity: '0.05',
    });

    const closeStyle = css({
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: '20',
        cursor: 'pointer'
    });

    

    return (
        <div css={cardStyle}>
            <div css={cardItemStyle}>
                <div css={{ marginTop: '15px', color: '#fff'}}>
                    <h2>{name}</h2>
                </div>
                <div css={{ marginBottom: '15px', color: '#fff' }}>
                    <h2>{nickname}</h2>
                </div>
            </div>
            <div>
                <img css={pokeballImgStyle} src="/assets/pokeballIcon.svg" alt="Pokeball" />
                <img css={pokemonImgStyle} src={imageUrl} alt="Pokeball" />
            </div>
            <div 
                css={closeStyle}
                onClick={() => isReleaseFunc(true, nickname)}
            >
                <img css={{ width: '2em' }} src="/assets/close.png" alt="" />
            </div>
            
        </div>
    );
}
 
export default MyPokemonCard;