/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/react";

const PokeballAnimation = () => {

    const animStyle = css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    })

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
        animation: `${pokeballEffect} 2s infinite`
    });
    return (  
        <div css={animStyle}>
            <img css={imagePokeballStyle} src="/assets/pokeballIcon.png" alt="" />
            <h6>Loading...</h6>
        </div>
    );
}
 
export default PokeballAnimation;