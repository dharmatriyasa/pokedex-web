/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const CaughtModal = ({imageUrl, pokemonName, isCaught}) => {


    const topImageSection = css({
        position: 'absolute',
        opacity: '0.05',
        transform: 'rotate(90deg)',
    });

    const textStyle = ({isCaught}) => css({
        fontSize: '24px',
        color: `${isCaught ? '#56F23B' : '#FFF'}`,
    })
    console.log(isCaught);

    return (

        <div>
            <img css={topImageSection} src="/assets/pokeball1.svg" alt="" />
            <img src={imageUrl} alt="" />
            <h4 css={textStyle({isCaught})}>
                {isCaught ? `You got ${pokemonName}!` : `Oh no! ${pokemonName} run away`}
            </h4>
        </div>
    );
}
 
export default CaughtModal;