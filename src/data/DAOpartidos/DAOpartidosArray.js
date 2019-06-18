const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

const partidos = getPartidosJson()

async function getPartidosJson() {
    try {
        const p = await readFileAsync('./src/data/arr/partidos.json', 'utf8')
        const parsed = JSON.parse(p)
        //console.log(parsed)
        //console.log(Array.isArray(parsed))
        return parsed
    } catch(err) {
        console.log(err)
    }
}

function postPartidosJson(pArray) {
    const pJSON = JSON.stringify(pArray)
    writeFileAsync('./src/data/arr/partidos.json', pJSON)
}

async function getAll() {
    return partidos
}

async function getById(id) {
    try {
        // const p = undefined
        // partidos.forEach( function(partido, i) {
        //     if(partido.id === id) {
        //         partido = p
        //     }
        // });

        // return p
        console.log("dame partidos")
        console.log(partidos)
        const partido = partidos.find((p) => p.id === id)
        return partido
    } catch(err){
        console.log(err)
    }
}

async function add(partidoNuevo) {
    try {
        const partido = await getById(partidoNuevo.id)
        if (partido)
         throw { status: 400, descripcion: 'ya existe un partido con esa id' }

        partidos.push(partidoNuevo)
        // postPartidosJson(partidos)
        return partidoNuevo
    } catch (err){
        console.log(err)
    }
}

async function deleteById(id) {
    const i = partidos.findIndex(p => p.id == id)
    if (i == -1)
        throw { status: 404, description: 'partido no encontrado' }

    partidos.splice(i, 1)
}

async function updateById(id, partido) {
    const i = partidos.findIndex(p => p.id == id)
    if (i == -1)
        throw { status: 404, description: 'partido no encontrado' }

    partidos.splice(i, 1, partido)
    return partido
}

module.exports = {
    getAll,
    getById,
    add,
    deleteById,
    updateById
}
