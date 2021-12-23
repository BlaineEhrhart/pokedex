import {Link, useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPowerOff, faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from "react";
import upperFirst from "lodash.upperfirst";
import {getPokemon} from "./PokemonApi";

function Pokemon() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);

    let pokemonId = 0;
    if (params.id) {
        pokemonId = Number(params.id);
    }

    useEffect(() => {
        setIsLoading(true);

        getPokemon(pokemonId).then(async (response) => {
            setIsLoading(false);
            const data = await response.json();

            if (response.status !== 200 || !data) {
                return;
            }

            setName(upperFirst(data.name));
            setImage(data.sprites.front_default);
            setHeight(data.height);
            setWeight(data.weight);
        });

    }, [pokemonId]);

    return (
        <div className="wrapper">
            <div className="pokedex">
                <div className="pokedex-screen pokemon">
                    {isLoading ? <p>Loading...</p> : <div>
                        <p><img width="96" height="96" src={image} alt={name} className="pokemon-image" /></p>
                        <h2>{name} #{pokemonId}</h2>
                        <p>{height / 10} meters</p>
                        <p>{weight / 10} kilograms</p>
                    </div>}
                </div>
                <div className="pokedex-nav">
                    <div>
                        <Link to="/"><FontAwesomeIcon icon={faPowerOff}/></Link>
                    </div>
                    <div>
                        <Link to="/pokedex"><FontAwesomeIcon icon={faCaretLeft}/></Link>
                        <span className="button disabled"><FontAwesomeIcon icon={faCaretRight}/></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pokemon;
