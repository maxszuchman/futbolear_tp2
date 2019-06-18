const express = require('express')
const _ = require('lodash')
const Joi = require('@hapi/joi')
const daoFactory = require('../data/DAOpartidos/daoFactory')
const jugadores = require('../data/DAOjugadores/daoFactory')
const nodemailer = require('../data/nodemailer')

const router = express.Router()

const baseURI = '/api/partidos'

router.get('/', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    if (_.isEmpty(req.query)) {
        _handleGetAll(req, res)
    } else {
        _handleGetWithQS(req, res)
    }
})

async function _handleGetAll(req, res) {
    try {
        const partidosDAO = daoFactory.getPartidosDAO()
        const result = await partidosDAO.getAll()
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}

async function _handleGetWithQS(req, res) {
    try {
        if (isNaN(req.query.id))
            throw { status: 400, descripcion: 'el id provisto no es numérico' }

        if (req.query.id < 0)
            throw { status: 400, descripcion: 'el id no puede ser negativo' }

        const partidosDAO = daoFactory.getPartidosDAO()
        const result = await partidosDAO.getById(req.query.id)
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}

async function buscarJugador(nombre) {
    try { const jugadoresDAO = jugadores.getJugadoresDAO()
        const jugador = jugadoresDAO.getByNombre(nombre)
        return jugador
    } catch(err) {
        console.log(err)
    }
}

router.get('/:id', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.id))
            throw { status: 400, descripcion: 'el id provisto no es un número o es inválido' }

        const partidosDAO = daoFactory.getPartidosDAO()
        const resultado = await partidosDAO.getById(req.params.id)

        if (!resultado)
            throw { status: 404, descripcion: 'partido no encontrado' }

        res.json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.post('/', async (req, res) => {
    console.log(`POSTING: ${baseURI}${req.url}`)

    try {
        const nuevo = req.body.partido
        console.log("llegue2")
        console.log(nuevo)

        // if (esJugadorInvalido(nuevo))
        //     throw { status: 400, descripcion: 'el jugador posee un formato json invalido o faltan datos' }

        const partidosDAO = daoFactory.getPartidosDAO()
        console.log("llegue3")
        console.log(partidosDAO)
        const pCreado = await partidosDAO.add(nuevo)
        console.log("llegue4")
        console.log(pCreado)
        // if(buscarJugador(req.body.jugador) === null) {
        //     console.log("Jugador no encontrado")
        // } else {
        //     nodemailer.enviarMail(req.body.jugador)
        // }

        res.status(201).json(pCreado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    console.log(`DELETING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.id))
            throw { status: 400, descripcion: 'el id provisto no es un número o es inválido' }

        const partidosDAO = daoFactory.getPartidosDAO()
        await partidosDAO.deleteById(req.params.id)
        res.status(204).send()
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.put('/:id', async (req, res) => {
    console.log(`REPLACING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.id))
            throw { status: 400, descripcion: 'el id provisto no es un número o es inválido' }

        const nuevo = req.body

        if (esPartidoInvalido(nuevo))
            throw { status: 400, descripcion: 'el partido posee un formato json invalido o faltan datos' }

        if (req.params.id != nuevo.id)
            throw { status: 400, descripcion: 'el id provisto no coincide entre el recurso buscado y el nuevo' }

        const partidosDAO = daoFactory.getPartidosDAO()
        const pActualizado = await partidosDAO.updateById(req.params.id, nuevo)
        res.json(pActualizado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

function esPartidoInvalido(partido) {
    const schema = {
        id: Joi.number().integer().min(0).max(99999999).required(),
        admin: Joi.string().alphanum().min(1).required(),
        fecha: Joi.string().alphanum().min(1).required(),
        hora: Joi.string().alphanum().min(1).required(),
        lugar: Joi.string().alphanum().min(1).required(),
        cantJugadores: Joi.number().integer().min(1).max(10).required()
    }
    const { error } = Joi.validate(partido, schema);
    return error
}

module.exports = router
