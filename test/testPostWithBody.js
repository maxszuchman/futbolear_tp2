const request = require('request-promise-native');

async function testPostWithBody(serverUrl) {

    const jugador = { nombre: "Santiago", mail: "s.abbracciavento@gmail.com" }

    const testPartidos = [
        {
            id : 7,
            admin: "Santiago_POST1",
            fecha : "19/06/2019",
            hora: "20:20",
            lugar : "Sarmiento"
        },
        {
            id: 4,
            admin: "Santiago_POST2",
            fecha : "19/06/2019",
            hora: "20:20",
            lugar : "Sarmiento"
        },
        {
            id: 6,
            admin: "Santiago_POST3",
            fecha : "19/06/2019",
            hora: "20:20",
            lugar : "Sarmiento"
        },
    ]

    let testResult = true

    for (const partido of testPartidos) {

        const options = {
            method: 'POST',
            uri: `${serverUrl}/partidos`,
            body: {partido, jugador},
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
            } else if (!result.hasOwnProperty('hora')) {
                console.log("post: el partido recibido no tiene hora")
            } else if (!result.hasOwnProperty('lugar')) {
                console.log("post: el partido recibido no tiene lugar")
            }
        } catch (err) {
            console.log(err.error)
            // if (err.statusCode == 400) {
            //     console.log("post: error - peticion mal formada")
            // } else if (err.statusCode == 500) {
            //     console.log("post: error - el servidor no pudo realizar lo pedido")
            // } else {
            //     console.log("post: error inesperado")
            // }
            testResult = false
        }
    }
    if (testResult) {
        console.log("post: ok")
    }
}

module.exports = testPostWithBody
