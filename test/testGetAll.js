const request = require('request-promise-native');

async function testGetAll(serverUrl) {

    const options = {
        uri: `${serverUrl}/partidos`,
        json: true
    }

    try {
        const partidos = await request(options)

        let testOK = true
        for (let i = 0; i < partidos.length && testOK; i++) {
            if (!partidos[i].hasOwnProperty('id')) {
                console.log("get all: el partido recibido no tiene id")
                testOK = false
            } else if (!partidos[i].hasOwnProperty('admin')) {
                console.log("get all: el partido recibido no tiene admin")
                testOK = false
            } else if (!partidos[i].hasOwnProperty('fecha')) {
                console.log("get all: el partido recibido no tiene fecha")
                testOK = false
            } else if (!partidos[i].hasOwnProperty('hora')) {
                console.log("get all: el partido recibido no tiene hora")
                testOK = false
            } else if (!partidos[i].hasOwnProperty('lugar')) {
                console.log("get all: el partido recibido no tiene lugar")
                testOK = false
            }
            
        }
        if (testOK) {
            console.log("get all: ok")
            console.log(partidos)
        }
    } catch (err) {
        console.log("get all: error en la respuesta del servidor")
    }
}

module.exports = testGetAll