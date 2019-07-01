const Ajv = require('ajv')
const ajv = new Ajv()
const conn = require('../../bd/connection')

function getAll(req, res) {
    const query = 'SELECT id, username, names, surnames, age, email FROM user'
    conn.query(query, (error, result, fields) => {

        if (error) return res.status(500).json(returnJson(500, '', error))
        res.status(200).json(returnJson(200, result, ''))
    })
}

function getUser(req, res) {
    const id = req.params.id

    if (!id) return res.status(422).json(returnJson(422, '', 'User ID is missing'))
    if (isNaN(id)) return res.status(422).json(returnJson(422, '', 'User ID must be a number'))

    const query = `SELECT id, username, names, surnames, age, email
                   FROM user 
                   WHERE id=${id}`

    conn.query(query, (error, result, fields) => {

        if (error) return res.status(500).json(returnJson(500, '', error))
        if (result.length == 0) return res.status(422).json(returnJson(422, '', `No user with id: ${id}`))

        res.status(200).json(returnJson(200, result, ''))
    })
}

function createUser(req, res) {
    const userData = req.body
    const userSchema = getUserSchema();
    
    const valid = ajv.validate(userSchema, userData)
    if (!valid) return res.status(412).json(returnJson(412, '', `${ajv.errors[0].dataPath} - ${ajv.errors[0].data}`))

    const query = 'INSERT INTO user (username, password, names, surnames, age, email) VALUES (?,?,?,?,?,?)'
    const params = [userData.username, userData.password, userData.names, userData.surnames, userData.age, userData.email]

    conn.query(query, params, (error, result, fields) => {

        if (error) return res.status(500).json(returnJson(500, '', error))
        res.status(200).json(returnJson(200, '', 'User created successful'))
    })
}

function updateUserById(req, res) {
    const id = req.params.id
    const userData = req.body
    
    if (!id) return res.status(422).json(returnJson(422, '', 'User ID is missing'))

    if (isNaN(id)) return res.status(422).json(returnJson(422, '', 'User ID must be a number'))

    const query = 'UPDATE user SET username=?, password=?, names=?, surnames=?, age=?, email=? WHERE id=?'
    const params = [userData.username, userData.password, userData.names, userData.surnames, userData.age, userData.email, id]

    conn.query(query, params, (error, result, fields) => {

        if (error) return res.status(500).json(returnJson(500, '', error))
        res.status(200).json(returnJson(200, '', 'User updated succesful'))
    })
}

function deleteUserById(req, res) {
    const id = req.params.id

    if (!id) return res.status(422).json(returnJson(422, '', 'User ID is missing'))
    if (isNaN(id)) return res.status(422).json(returnJson(422, '', 'User ID must be a number'))

    const query = `DELETE FROM user WHERE id=${id}`
    conn.query(query, (error, result, fields) => {

        if (error) return res.status(500).json(returnJson(500, '', error))
        res.status(200).json(returnJson(200, '', 'User removed succesful'))
    })
}

function getUserSchema() {
    return {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: {type: 'string', maxLength: 50},
            password: {type: 'string', maxLength: 50},
            names: {type: 'string', maxLength: 70},
            surnames: {type: 'string', maxLength: 70},
            age: {type: 'integer', maxLength: 3},
            email: {type: 'string', maxLength: 50},
        },
        additionalProperties: false
    }
}

function returnJson(result, data, message) {
    return {result, data, message}
}

module.exports = { 
    getAll,
    getUser,
    createUser,
    updateUserById,
    deleteUserById
}