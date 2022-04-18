/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState, useRef, useEffect, Fragment } from "react";
import Modal from "../components/Modal";
import MyPokemonCard from "../components/MyPokemonCard";
import Navbar from "../components/Navbar";
import { KEY } from "../config/localStorage";
import { getCachedValue, setCachedValue } from "../services/localStorage";
import { Router } from "next/router";
import PokeballAnimation from "../components/PokeballAnimation";



export default function MyPokemons(){
    const [isExist, setIsExist] = useState(false);
    const [isRelease, setIsRelease] = useState(false);
    const [nickname, setNickname] = useState('');
    const [myPokemonLists, setMyPokemonLists] = useState();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const mypokemons = getCachedValue(KEY); 

        if(mypokemons == null){
            return;
        }
        setMyPokemonLists(mypokemons);
        setIsExist(true);
    }, []);

    useEffect(() => {

        const start = () => {
            setIsLoading(true);
        }
    
        const end = () => {
            setIsLoading(false);
        }
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return() => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        }
        
      }, []);

    const isReleaseFunction = (bool, nickname) => {
        setIsRelease(bool);
        setNickname(nickname);
    }

    const releaseMyPokemon = (nickname) => {
        const updateMyPokemons = myPokemonLists.filter((pokemon) => pokemon.nickname !== nickname);
        setCachedValue(KEY, updateMyPokemons);
        setMyPokemonLists(getCachedValue(KEY));

        setTimeout(() => {
            setIsRelease(false);
        }, 1000);
    }

    const breakpoints = [0, 576, 992];



    const mq = breakpoints.map(
        bp => `@media (min-width: ${bp}px)`
    );

    const container = ({isExist}) => css({
        display: 'grid',
        padding: '100px 0px',
        justifyItems: 'center',
        [mq[0]] : {
        gridTemplateColumns: 'repeat(1, 1fr)',
        },
        [mq[1]] : {
        gridTemplateColumns: `${isExist ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}`,
        },
        [mq[2]] : {
        gridTemplateColumns: `${isExist ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)'}`,
        },
    });

    const notExistStyle = css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#f08386',
        marign: '100px 50px',
        // padding: '200px 0px',
        height: '100vh'
    });

    const boxStyle = css({
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 30px',
        textAlign: 'center',
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
    

    return(
        <Fragment>
            {isLoading ? (
                <PokeballAnimation />
            ): (
            <div>
                <Navbar 
                    page={'mypokemons'}
                />
                {isRelease && (
                    <Modal
                        isOpen={isRelease}
                        modalBg={`dark`}
                    >
                        <div css={boxStyle}>
                        <h3>Are you sure want to catch {nickname}?</h3>
                        <button 
                            css={buttonStyle}
                            onClick={() => releaseMyPokemon(nickname)}
                        >
                            Yes
                        </button>
                        <button 
                            css={buttonStyle}
                            onClick={() => setIsRelease(false)}
                        >
                            No
                        </button>
                        </div>
                    </Modal>
                )}
                {isExist ? (
                    <div css={container({isExist})}>
                        {myPokemonLists?.map((mypokemon, index) => {
                            return(
                                <MyPokemonCard
                                    key={index}
                                    name={mypokemon.name}
                                    nickname={mypokemon.nickname}
                                    imageUrl={mypokemon.imageUrl}
                                    isReleaseFunction={isReleaseFunction}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <div css={notExistStyle}>
                        <h1>You don&apos;t have any pokemons!</h1>
                    </div>
                )}
            </div>
            )}
        </Fragment>
    );
}