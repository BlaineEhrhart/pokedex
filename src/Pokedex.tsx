import React, {useEffect, useState, useRef} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {getPokemonList} from "./PokemonApi";
import upperFirst from "lodash.upperfirst";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPowerOff, faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons';

interface IPokemon {
    name: string;
    url: string;
    id: string;
};

interface IApiPokemon {
    name: string;
    url: string;
};

function Pokedex() {
    // todo: Environment variables in .env file
    const maxPokemon = 152;
    const pageLimit = 50;
    const screenRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [nextPage, setNextPage] = useState(0);
    const [list, setList] = useState<IPokemon[]>([]);
    const [searchParams] = useSearchParams();
    let page = 1;
    if (searchParams.get("page")) {
        page = Number(searchParams.get("page"));
    }

    useEffect(() => {
        if (screenRef && screenRef.current) {
            screenRef.current.scroll(0, 0);
        }
        setIsLoading(true);

        // Calculate the next page since we want to limit the number of pokemon displayed
        let nextPage = page + 1;
        if (nextPage > Math.ceil(maxPokemon / pageLimit)) {
            nextPage = 0;
        }
        setNextPage(nextPage);

        getPokemonList(page, pageLimit, maxPokemon).then(async (response) => {
            setIsLoading(false);
            const data = await response.json();

            if (response.status !== 200 || !data) {
                setList([]);
                return;
            }

            const list = data.results.map((p: IApiPokemon) => {
                return {
                    name: p.name,
                    url: p.url,
                    id: p.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
                };
            })

            setList(list);
        })
    }, [page, pageLimit, maxPokemon]);

    return (
        <div className="wrapper">
            <div className="pokedex">
                <div className="pokedex-screen" ref={screenRef}>
                    {isLoading ? <p style={{textAlign: 'center'}}>Loading...</p> : <ul className="pokemon-list">
                        {list.map((pokemon, i) => <li key={i}><Link
                            to={`/pokemon/${pokemon.id}`}>{upperFirst(pokemon.name)} (#{pokemon.id})</Link></li>)}
                    </ul>}
                </div>
                <div className="pokedex-nav">
                    <div>
                        <Link to="/"><FontAwesomeIcon icon={faPowerOff}/></Link>
                    </div>
                    <div>
                        {(isLoading || page - 1 < 1) ?
                            <span className="button disabled"><FontAwesomeIcon icon={faCaretLeft}/></span>
                            : <Link to={`/pokedex?page=${page - 1}`}><FontAwesomeIcon icon={faCaretLeft}/></Link>
                        }
                        {(isLoading || nextPage === 0) ?
                            <span className="button disabled"><FontAwesomeIcon icon={faCaretRight}/></span>
                            : <Link to={`/pokedex?page=${nextPage}`}><FontAwesomeIcon icon={faCaretRight}/></Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pokedex;
