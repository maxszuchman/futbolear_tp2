const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

const jugadores = [] // getJugadoresJson()

async function getJugadoresJson() {
    try {
        const j = await readFileAsync('./src/data/arr/jugadores.json', 'utf8');
        const parsed = JSON.parse(j)
        return parsed;
    } catch(err) {
        console.log(err)
    }
}

function postPartidosJson(jArray) {
    const jJSON = JSON.stringify(jArray)
    writeFileAsync('./src/data/arr/partidos.json', jJSON)
}

async function getAll() {
    return jugadores
}

async function getById(id) {
    try {
        const jugador = jugadores.find((j) => j.id === id)
        return jugador
    } catch(err){
        console.log(err)
    }
}

async function getByNombre(nombre) {
    try {
        const jugador = jugadores.find((j) => j.nombre === nombre)
        return jugador
    } catch(err){
        console.log(err)
    }
}

async function add(jugadorNuevo) {
    try {
        const jugador = await getById(jugadorNuevo.id)
        if (jugador)
         throw { status: 400, descripcion: 'ya existe un jugador con esa id' }

        jugadores.push(jugador)
        postPartidosJson(jugadores)
        return jugador
    } catch (err){
        console.log(err)
    }
}

async function deleteById(id) {
    const i = jugadores.findIndex((j) => j.id === id)
    if (i == -1)
        throw { status: 404, description: 'jugador no encontrado' }

    jugadores.splice(i, 1)
}

async function updateById(id, jugador) {
    const i = jugadores.findIndex((j) => j.id === id)
    if (i == -1)
        throw { status: 404, description: 'partido no encontrado' }

    jugadores.splice(i, 1, jugador)
    return jugador
}

module.exports = {
    getAll,
    getById,
    add,
    deleteById,
    updateById,
    getByNombre
}
