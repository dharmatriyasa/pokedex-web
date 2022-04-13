/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { getPokemon } from "../../services/pokemon";
// import pokeball from '/assets/pokeball.svg';




export default function Pokemon({pokemonData}){
    
    const [isInfo, setIsInfo] = useState(true);
    const [isStats, setIsStats] = useState(false);
    const [isMoves, setIsMoves] = useState(false);
    
    const menubarItems = [
        {
            title: 'Info',
            isActive: isInfo,
            activeFunction: function(){
                setIsInfo(true);
                setIsStats(false);
                setIsMoves(false);
            }
        },
        {
            title: 'Base Stats',
            isActive: isStats,
            activeFunction: function(){
                setIsInfo(false);
                setIsStats(true);
                setIsMoves(false);
            }
        },
        {
            title: 'Moves',
            isActive: isMoves,
            activeFunction: function(){
                setIsInfo(false);
                setIsStats(false);
                setIsMoves(true);
            }
        },
    ];

    console.log(pokemonData);
    const sectionStyle = css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '20px,',
        paddingBottom: '20px,',
        paddingLeft: '32px',
        paddingRight: '32px',
        width: '100vw',
        backgroundColor: '#49D0B0',
        margin: '0',
    });

    const topSectionStyle = css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        width: '100vw',
    });

    const topImageSection = css({
        position: 'absolute',
        opacity: '0.05',
        width: '16em',
        transform: 'rotate(90deg)',
        top: '30px'
        // background: `url('/assets/pokeball.svg')`
    });

    const middleSectionStyle = css({
        backgroundColor: '#FFFFFF',
        height: '50vh',
        width: '100vw',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        // backgroundImage: `url(${pokeball})`
    })
    

    const imageStyle = css({
        zIndex: '10',
        width: '10.5em',
    });

    const numberStyle = css({
        color: '#FFFFFF',
        margin: '0px 0px 20px 0px',
        letterSpacing: '1px'

    })

    const titleStyle = css({
        color: '#FFFFFF',
        letterSpacing: '3px'
    });

    const tagSectionStyle = css({
        display: 'flex',
        flexDirection: 'row',
    });

    const tagStyle = css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#21816a',
        margin: '0px 10px',
        padding: '0px 12px',
        borderRadius: '20px',
        width: '100px',
        height: '30px'
    });

    const pStyle = css({
        color: '#FFFFFF',
        margin: '0'
    });

    const menubarSectionStyle = css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    });

    const menuItemStyle = css({
        color: 'AAB3C7',
        margin: '20px 25px'
    })
    
    return(
        <div css={sectionStyle}>
            <div css={topSectionStyle}>
                {/* <div css={topImageSection}></div> */}
                <img css={topImageSection} src="/assets/pokeball1.svg" alt="" />
                <img css={imageStyle} src={pokemonData.imageUrl} alt="" />
                <h1 css={titleStyle}>{pokemonData.name}</h1>
                <h3 css={numberStyle}>#{pokemonData.id}</h3>
                <div css={tagSectionStyle}>
                    {pokemonData.types.map((data, index) => {
                        return(
                        <div 
                            key={index}
                            css={tagStyle}
                        >
                            <h5 css={pStyle}>{data.type.name}</h5>
                        </div>
                        )
                    })}
                </div>
                {/* <div>
                    <h1 css={titleStyle}>{pokemonData.id}</h1>
                </div> */}
            </div> 
            <div css={middleSectionStyle}>
                <div css={menubarSectionStyle}>
                    {menubarItems.map((menuItem, index) => {
                        return(
                            <div css={{ 
                                color: `${menuItem.isActive ? '#000000' : '#AAB3C7'}`,
                                margin: '20px 15px',
                                width: '75px',
                                borderBottom: `${menuItem.isActive ? '2px solid #000000' : 'none'}`
                            }}
                            key={index} 
                            onClick={() => menuItem.activeFunction()}
                            >
                                <h5>{menuItem.title}</h5>
                            </div>
                        )
                    })}
                </div>
                {isInfo && (
                    <div></div>
                )}
                {isStats && (
                    <div>stats</div>
                )}
                {isMoves && (
                    <div>moves</div>
                )}
            </div> 
        </div>
    )
}

export async function getServerSideProps(context){
    const {req, params} = context;

    // console.log(req);
    // console.log(params.id);

    const res = await getPokemon(params.id);

    const paddedId = ('00'+ (params.id)).slice(-3);

    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;

    const pokemonData = {
        id: paddedId,
        abilities: res.data.abilities,
        moves: res.data.moves,
        name: capitalizeFirstLetter(res.data.name),
        stats: res.data.stats,
        types: res.data.types,
        weight: res.data.weight,
        imageUrl,
    };

    return {
        props: {
            pokemonData,
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}