const request = require('request-promise-native')

async function runTest(serverUrl, targetDni, expectedErrorCode){

    const options = {
        uri: `${serverUrl}/partidos/${targetDni}`,
        json: true
    }

    try {
        const result = await request(options)

        if (!result) {
            console.log("post: mensaje vacío (sin partido)")
        } else if (!result.hasOwnProperty('id')) {
            console.log("post: el partido recibido no tiene id")
        } else if (!result.hasOwnProperty('admin')) {
            console.log("post: el partido recibido no tiene admin")
        } else if (!result.hasOwnProperty('fecha')) {
            console.log("post: el partido recibido no tiene fecha")
        } else if (!result.hasOwnProperty('edad')) {
            console.log("post: el partido recibido no tiene edad")
        } else if (!result.hasOwnProperty('hora')) {
            console.log("post: el partido recibido no tiene hora")
        } else if (!result.hasOwnProperty('lugar')) {
            console.log("post: el partido recibido no tiene lugar")
        }
    } catch (err) {
        if (err.statusCode == expectedErrorCode) {
            console.log("get by id: ok (con error esperado)")
        } else {
            console.log("get by id: error inesperado")
        }
    }
}

async function testGetWithIdentifier(serverUrl) {
    runTest(serverUrl, 1)
    runTest(serverUrl, 123)
}

module.exports = testGetWithIdentifier
