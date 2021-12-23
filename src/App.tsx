import './App.scss';
import React from "react";
import {
    HashRouter,
    Route,
    Routes
} from "react-router-dom";
import Home from "./Home";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/pokemon/:id" element={<Pokemon />} />
                <Route path="/pokedex" element={<Pokedex />} />
                <Route path="/" element={<Home/>} />
            </Routes>
        </HashRouter>
    );
}
