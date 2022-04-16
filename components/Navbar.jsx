/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Link from "next/link";

const Navbar = ({page}) => {
    const breakpoints = [0, 576];

    const mq = breakpoints.map(
        bp => `@media (min-width: ${bp}px)`
    );

    const navbarStyle = css({
        position:'absolute',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px 25px',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 3px 2px',
        backgroundColor: '#fcc659',
        [mq[0]] : {
            flexDirection: 'column',
            textAlign: 'center'
        },
        [mq[1]] : {
            flexDirection: 'row',
        },

    });

    const pokemonList = css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '20px',
        color: '#FFF',
        fontWeight: 'bold',
        [mq[0]] : {
            flexDirection: 'column',
            position: ' fixed',
            bottom: '20px',
            right: '15px',
            zIndex: '60',
            backgroundColor: '#fcc659',
            padding: '15px',
            borderRadius: '30px'
        },
        [mq[1]] : {
            flexDirection: 'row',
            position: 'static',
            bottom: 'auto',
            right: 'auto',
            padding: '0'
        },
    })

    const imgStyle = css({
        width: '7em',
    })
    return (
        <nav css={navbarStyle}>
            <div>
                <Link href={'/'}>
                <img css={imgStyle} src='/assets/pokemon-logo.png' alt="" />
                </Link>
            </div>
            <div css={pokemonList}>
                {page === 'index' ? (
                    <Link href={'/mypokemons'}>
                        <p>My Pokemon</p>
                    </Link>
                ): (
                    <Link href={'/'}>
                        <p>Back Home</p>
                    </Link>
                )}
            </div>
        </nav>
    );
}
 
export default Navbar;