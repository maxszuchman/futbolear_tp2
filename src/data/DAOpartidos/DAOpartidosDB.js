const knex = require('../../db/knex')

async function add(nuevo) {
    try {
        let insertionQuery = 'INSERT INTO partidos '
        insertionQuery += '(id, fecha, lugar, admin) '
        insertionQuery += `VALUES ('${nuevo.id}', '${nuevo.fecha}', '${nuevo.lugar}', '${nuevo.admin}')`
        await knex.raw(insertionQuery)
        return nuevo
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getAll() {
    try {
        const selectAllQuery = `SELECT * FROM partidos;`
        const result = await knex.raw(selectAllQuery)
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getByID(id) {
    try {
        const selectByDni = `SELECT TOP 1 * FROM estudiantes WHERE id='${id}';`
        const result = await knex.raw(selectByDni)
        return result[0]
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getByAdmin(admin) {
    try {
        const selectByDni = `SELECT TOP 1 * FROM estudiantes WHERE admin='${admin}';`
        const result = await knex.raw(selectByDni)
        return result[0]
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function deleteByID(id) {
    try {
        const deleteByDniQuery = `DELETE FROM estudiantes WHERE id=${id}`
        await knex.raw(deleteByDniQuery)
        return
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

module.exports = {
    add,
    getAll,
    getByID,
    getByAdmin,
    deleteByID,
}