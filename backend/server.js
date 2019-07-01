const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const usersController = require('../backend/controllers/usersController')

var app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.set('port', 3000)

app.listen(app.get('port'), () => {console.log('Express server listening on port ' + app.get('port'))})

app.get('/users', usersController.getAll)
app.post('/users', usersController.createUser)
app.get('/users/:id', usersController.getUser)
app.put('/users/:id', usersController.updateUserById)
app.delete('/users/:id', usersController.deleteUserById)