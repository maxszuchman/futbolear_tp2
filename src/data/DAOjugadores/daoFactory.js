const jugadoresDAO_Arr = require('./DAOjugadoresArray')
const jugadoresDAO_DB  = require('./DAOjugadoresDB')
const { mode } = require('../../config')

function getJugadoresDAO(){
    switch (mode) {
        case 'online': return jugadoresDAO_DB 
        case 'offline': return jugadoresDAO_Arr
        default: throw "invalid mode. check system config!"
    }
}

module.exports = {
    getJugadoresDAO
}