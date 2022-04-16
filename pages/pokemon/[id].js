/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState, useRef, useEffect, Fragment } from "react";
import { catchPokemon, getPokemon } from "../../services/pokemon";
// import pokeball from '/assets/pokeball.svg';
import {capitalizeFirstLetter} from '../../services/general'
import Modal from "../../components/Modal";
import CatchingPokemon from "../../components/CatchingPokemon";
import CaughtModal from "../../components/CaughtModal";
import useLocalStorage from "../../hooks/useLocalStorage";
import { KEY } from "../../config/localStorage";
import { getCachedValue, setCachedValue } from "../../services/localStorage";
import { useRouter } from "next/router";
import { color } from "../../data/color";
import pokeball from '../../public/assets/pokeballIcon.png';
import NavbarPokemon from "../../components/NavbarPokemon";



export default function Pokemon({pokemonData}){

    console.log(pokeball);
    
    const [isInfo, setIsInfo] = useState(true);
    const [isStats, setIsStats] = useState(false);
    const [isMoves, setIsMoves] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isCatching, setIsCatching] = useState(false);
    const [isCaughtResult, setIsCaughtResult] = useState(false);
    const [isCaught, setIsCaught] = useState(false);
    const [isNotCaught, setIsNotCaught] = useState(false);
    const [modalBg, setModalBg] = useState('');
    const [pokemonNameModal, setPokemonNameModal] = useState(false);
    const [isAfterNickname, setIsAfterNickname] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isNicknameUnique, setIsNicknameUnique] = useState(true);
    

    const [myPokemonList, setMyPokemonList] = useLocalStorage(KEY, null);
    const nickname = useRef(null);
    const router = useRouter();

    const typeColor = pokemonData.types[0].type.name;
    console.log(typeColor);
    console.log(color[typeColor]);
    
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

    const handleCatchingModal = async() =>{
        setIsCatching(true);
        setIsOpen(false);
        const caught = await catchPokemon();
        setIsCatching(false);
        setIsCaughtResult(true);
        
        if(caught){
            setIsCaught(caught);
            setIsNotCaught(!caught);
            setModalBg('light');
        }
        else{
            setIsNotCaught(!caught);
            setIsCaught(caught);
            setModalBg('error');
        } 

        setTimeout(() => {
            setIsCaughtResult(false);
            caught && setPokemonNameModal(true)
        }, 4000)
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        const currentPokemonLists = getCachedValue(KEY);

        

        let isUnique = true;
        for(let currentPokemon of currentPokemonLists){
            if(currentPokemon.nickname === nickname.current.value){
                setIsNicknameUnique(false);
                isUnique = false;
                return;
            }else{
                !isNicknameUnique && setIsNicknameUnique(true);
                isUnique = true;
            }
        }

        if(isUnique){
            currentPokemonLists.push({
                name: capitalizeFirstLetter(pokemonData.name),
                nickname: nickname.current.value,
                imageUrl: pokemonData.imageUrl
            });
            setCachedValue(KEY, currentPokemonLists);
    
            setIsAfterNickname(true);
        }


    }

    const breakpoints = [0, 576];

    const mq = breakpoints.map(
        bp => `@media (min-width: ${bp}px)`
    );


    const sectionStyle = ({pokemonType}) => css({
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
        backgroundColor: `#49D0B0`,
        margin: '0',
        [mq[1]]: {
            flexDirection: 'row',
            paddingLeft: '0',
            paddingRight: '0',
        }
        
    });

    const topSectionStyle = css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        width: '100vw',
        [mq[1]]: {
            height: '100vh',
        }
    });

    const topImageSection = css({
        position: 'absolute',
        opacity: '0.05',
        width: '16em',
        transform: 'rotate(90deg)',
        top: '30px',
        [mq[1]]: {
            width: '30em',
            top: '90px',

        }
        // background: `url('/assets/pokeball.svg')`
    });

    const middleSectionStyle = css({
        backgroundColor: '#FFFFFF',
        height: '50vh',
        width: '100vw',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        [mq[1]]: {
            margin: '50px 40px 50px 0px',
            height: '50vh',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
        }
        // backgroundImage: `url(${pokeball})`
    });
    
    const imageStyle = css({
        zIndex: '10',
        width: '10.5em',
        [mq[1]]: {
            width: '18em',
        }
    });

    const numberStyle = css({
        color: '#FFFFFF',
        margin: '0px 0px 20px 0px',
        letterSpacing: '1px',
        [mq[1]]: {
            fontSize: '28px',
            margin: '0px 0px 30px 0px',
        }
    });

    const titleStyle = css({
        color: '#FFFFFF',
        letterSpacing: '3px',
        [mq[1]]: {
            fontSize: '40px'
        }
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
        height: '30px',
        [mq[1]]: {
            width: '150px',
            height: '45px',
            fontSize: '20px'
        }
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
        color: '#AAB3C7',
        margin: '20px 25px'
    });

    const sectionItems = css({
        display: 'flex',
        flexDirection: 'column',
        // border: '1px solid red'
    });

    const sectionItem = css({
        display: 'flex',
        flexDirection: 'row',
        // border: '1px solid red',
        margin: '12px 50px',
        textAlign: 'left',
        
    });

    const sectionItemTitle = css({
        // border: '1px solid red',
        flexBasis: '40%',
        color: '#878d91',
    });

    const sectionItemDesc = css({
        // border: '1px solid red',
        flexBasis: '60%',
        color: '#878d91',
    });

    const gridContainer = css({
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        margin: '0px 20px',
        [mq[1]]: {
            height: '40vh',
            overflow: 'auto',
        }

    });

    const gridItem = css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        margin: '12px 8px',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 5px 5px 2px',
        padding: '0px 5px',
        fontSize: '12px'
    });

    const catchSection = css({
        position: 'fixed',
        bottom: '20px',
        right: '35px',
        [mq[0]] : {
            display: 'inline'
        },
        [mq[1]] : {
            display: 'none'
        },
        // background: `url('assets/pokeballIcon.svg')`,
    });

    const catchButton = css({
        width: '70px',
        height: '70px',
        borderRadius: '100%',
        // background: `url(${pokeball})`,
        backgroundColor: '#FFF'

    });

    const boxStyle = css({
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 30px',
        color: '#000',
        background: '#FFF',
        width: '75vw',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '25px',
        color: '#878d91',
        opacity: '1',
        [mq[1]]: {
            width: '30vw',
        }
    });

    const buttonStyle = css({
        margin: '20px 5px 5px 5px',
        width: '25vw',
        height: '30px',
        color: '#878d91',
        [mq[1]]: {
            width: '15vw',
        }
    });

    const descNicknameStyle = css({
        // border: '2px solid #000',
        borderRadius: '10px',
        textAlign: 'left',
        padding: '10px 20px',
        margin: '10px 0px',
        backgroundColor: '#3a799d',
        color: '#FFF'
    });

    const flexColumn = css({
        display: 'flex',
        flexDirection: 'column',
    });

    const flexRowCenter = css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        [mq[1]] : {
            width: '20em'
        },
    });

    const inputStyle = css({
        padding: '10px 5px',
        borderRadius: '5px',
        margin: '10px 0px',
        fontSize: '16px',
        color: '#3a799d'

    });

    const buttonSubmitStyle = css({
        padding: '10px 15px',
        margin: '10px 0px',
        fontSize: '16px',
        backgroundColor: '#3a799d',
        color: '#FFF'
    });

    const descSavedStyle = css({
        borderRadius: '10px',
        textAlign: 'left',
        padding: '10px 20px',
        margin: '10px 0px',
        backgroundColor: '#FFF',
        color: '#000',
        border: '1px solid #000'
    })

    const buttonListStyle = css({
        margin: '20px 5px 5px 5px',
        width: '25vw',
        height: '40px',
        backgroundColor: '#3a799d',
        color: '#FFF',
        outline: 'none',
        
        borderRadius: '10px',
        cursor: 'pointer'
    });

    const buttonPokedexStyle = css({
        margin: '20px 5px 5px 5px',
        width: '25vw',
        height: '40px',
        backgroundColor: '#fbaa07',
        color: '#FFF',
        outline: 'none',
        
        borderRadius: '10px',
        cursor: 'pointer'
    });

    const divCatchStyle = css({
        position: 'absolute',
        bottom: '50px',
        [mq[0]]: {
            display: 'none'
        },
        [mq[1]]: {
            display: 'inline'
        }
    })

    const buttonCatchStyle = css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '150px',
        height: '40px',
        backgroundColor: '#FFF',
        border: '0.5px solid #ECECEC',
        cursor: 'pointer'
    });

    const imgCatchStyle = css({
        width: '2em'
    })

    useEffect(() => {
        // setTimeout(() => {
            setIsLoading(false);
            console.log('ehehe');

        // }, 5000)
    }, [pokemonData]);

    console.log(pokemonData);
    const a = '#49D0B0';
    return(
        <div>
        {!isLoading ? (
            <div css={sectionStyle({a})}>
                <Modal
                    isOpen={isOpen}
                    modalBg='dark'
                >
                <div css={boxStyle}>
                    <h3>Are you sure want to catch {pokemonData.name}?</h3>
                    <button 
                        css={buttonStyle}
                        onClick={() => handleCatchingModal()}
                    >
                        Yes
                    </button>
                    <button 
                        css={buttonStyle}
                        onClick={() => setIsOpen(false)}
                    >
                        No
                    </button>
                </div>
                </Modal>
                <CatchingPokemon
                    isCatching={isCatching}
                    imageUrl={pokemonData.imageUrl}
                />
                {isCaughtResult && (
                    <Modal
                        isOpen={isCaughtResult}
                        modalBg={modalBg}
                    >
                        <CaughtModal 
                            imageUrl={pokemonData.imageUrl}
                            pokemonName={pokemonData.name}
                            isCaught={isCaught}
                        />
                    </Modal>
                )}
                {pokemonNameModal && (
                    <Modal
                        isOpen={pokemonNameModal}
                        modalBg='light'
                    >
                        <div>
                            <img src={pokemonData.imageUrl} alt="" />
                        <div css={descNicknameStyle}>
                            {isNicknameUnique ? (
                                <Fragment>
                                <h5>Congratulations!</h5>
                                <h5>You caught a {pokemonData.name}</h5>
                                <br />
                                <h5>Please give {pokemonData.name} a nickname</h5>
                                </Fragment>
                            ):(
                                <Fragment>
                                <h5 css={{ 
                                    color: '#f08386'
                                 }}>Nickname is already taken!</h5>
                                <h5>Please write another nickname</h5>
                                </Fragment>
                            )}
                        </div>
                        <form css={flexColumn} onSubmit={onSubmitForm}>
                            <input 
                            css={inputStyle}
                            ref={nickname}
                            id="nickname"
                            type="text" 
                            placeholder="Enter a nickname"
                            />
                            <input css={buttonSubmitStyle} type="submit" value={`Save`}/>
                        </form>
                        </div>
                    </Modal>
                )}
                {isAfterNickname && (
                    <Modal
                        isOpen={isAfterNickname}
                        modalBg='light'
                    >
                        <div>
                            <img src={pokemonData.imageUrl} alt="" />
                        <div css={flexColumn}>
                            <div css={descSavedStyle}>
                                <h5>Yeay! Dharma is on your list!</h5>
                            </div>
                            <div css={flexRowCenter}>
                                <button 
                                    onClick={() => router.push('/mypokemons')}
                                    css={buttonListStyle}
                                >
                                    See List
                                </button>
                                <button 
                                    onClick={() => router.push('/')}
                                    css={buttonPokedexStyle}
                                >
                                    See Pokedex
                                </button>
                            </div>
                        </div>
                        </div>
                    </Modal>
                )}
                <NavbarPokemon />
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
                </div> 
                <div css={middleSectionStyle}>
                    <div css={menubarSectionStyle}>
                        {menubarItems.map((menuItem, index) => {
                            return(
                                <div css={{ 
                                    color: `${menuItem.isActive ? '#000000' : '#AAB3C7'}`,
                                    margin: '20px 25px',
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
                        <div css={sectionItems}>
                            <div css={sectionItem}>
                                <div css={sectionItemTitle}>Height</div>
                                <div css={sectionItemDesc}>{pokemonData.height}</div>
                            </div>
                            <div css={sectionItem}>
                                <div css={sectionItemTitle}>Weight</div>
                                <div css={sectionItemDesc}>{pokemonData.weight}</div>
                            </div>
                            <div css={sectionItem}>
                                <div css={sectionItemTitle}>Abilities</div>
                                <div css={sectionItemDesc}>
                                    {pokemonData.abilities.map((data, index) => {
                                        if(index === pokemonData.abilities.length - 1){
                                            return(`${capitalizeFirstLetter(data.ability.name)}`);
                                        }
                                        return(`${capitalizeFirstLetter(data.ability.name)}, `);
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                    {isStats && (
                        <div css={sectionItems}>
                        {pokemonData.stats.map((data, index) => {
                            return(
                            <div key={index} css={sectionItem}>
                                <div css={sectionItemTitle}>{capitalizeFirstLetter(data.stat.name)}</div>
                                <div css={{ 
                                    flexBasis: '60%',
                                    marginLeft: '30px',
                                    color: '#878d91'
                                 }}>{data.base_stat}</div>
                            </div>
                            )
                        })}
                        </div>
                    )}
                    {isMoves && (
                        <div css={gridContainer}>
                            {pokemonData.moves.map((data, index) => {
                                return(
                                    <div key={index} css={gridItem}>
                                        <p>
                                        {capitalizeFirstLetter(data.move.name)}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div> 
                {(isInfo || isStats) && (
                <div css={catchSection}>
                    <button 
                        css={catchButton}
                        onClick={() => setIsOpen(true)}
                    >
                        <img css={imgCatchStyle} src="/assets/pokeballIcon.png" alt="" />
                        <h4>Catch</h4>
                    </button>
                </div>
                )}
                <div css={divCatchStyle}>
                    <button
                        css={buttonCatchStyle}
                        onClick={() => setIsOpen(true)}
                    >
                        <img css={imgCatchStyle} src="/assets/pokeballIcon.png" alt="" />
                        <h4>Catch</h4>
                    </button>
                </div>
            </div>
        ):(
            <div css={{ 
                backgourndColor: '#000',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '50px'
             }}>
                 <h1>WAITING....</h1>
             </div>
        )}
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
        height: res.data.height,
        imageUrl,
    };

    return {
        props: {
            pokemonData,
        }
    }
}
