import React from "react";
import {
    Link
} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft, faCaretRight, faPowerOff} from "@fortawesome/free-solid-svg-icons";

function Home() {
    return (
        <div className="wrapper">
            <div className="pokedex">
                <div className="pokedex-screen powered-off">
                </div>
                <div className="pokedex-nav">
                    <div>
                        <Link className="powered-off" to="/pokedex"><FontAwesomeIcon icon={faPowerOff}/></Link>
                    </div>
                    <div>
                        <span className="button disabled"><FontAwesomeIcon icon={faCaretLeft}/></span>
                        <span className="button disabled"><FontAwesomeIcon icon={faCaretRight}/></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
