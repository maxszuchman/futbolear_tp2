const partidosDAO_Arr = require('./DAOpartidosArray')
const partidosDAO_DB = require('./DAOpartidosDB')
const { mode } = require('../../config')

function getPartidosDAO(){
    switch (mode) {
        case 'online': return partidosDAO_DB 
        case 'offline': return partidosDAO_Arr
        default: throw "invalid mode. check system config!"
    }
}

module.exports = {
    getPartidosDAO
}