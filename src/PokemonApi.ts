async function getPokemonList(page = 1, limit = 20, maxPokemon = 151) {
    const offset = (page - 1) * limit;
    const maxLimit = maxPokemon - offset;
    if (maxLimit < limit) {
        limit = maxLimit;
    }

    await timeout(500);

    return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
}

async function getPokemon(id: Number) {
    await timeout(500);

    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

export { getPokemonList, getPokemon };


function timeout(durationMs: number, shouldReject = false) {
    return new Promise<void>((resolve, reject) =>
        setTimeout(() => {
            if (shouldReject) {
                reject('timeout expired');
            } else {
                resolve();
            }
        }, durationMs),
    );
}
