/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Link from "next/link";

const NavbarPokemon = () => {
    const breakpoints = [0, 576];

    const mq = breakpoints.map(
        bp => `@media (min-width: ${bp}px)`
    );

    const navbarStyle = css({
        display: 'flex',
        justifyContent: 'space-between',
        width: '100vw',
        padding: '25px',
        position: 'absolute',
        top: '10px',
        [mq[1]] : {
            padding: '25px 75px',
        },
    });

    const imgStyle = css({
        width: '1.2em',
        cursor: 'pointer'
    });

    const mypokemonStyle = css({
        color: '#FFF',
        cursor: 'pointer'
    })
    return (
        <nav css={navbarStyle}>
            <Link href={'/'}>
            <div>
                <img css={imgStyle} src="/assets/back.png" alt="" />
            </div>
            </Link>
            <Link href={'/mypokemons'}>
            <div css={mypokemonStyle}>
                <h4>My Pokemon</h4>
            </div>
            </Link>
        </nav>
    );
}
 
export default NavbarPokemon;