const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex  = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'kobi',
      password : '',
      database : 'smart-brain'
    }
  });


const app = express();
app.use(bodyParser.json());
app.use(cors());

//dependency injection
app.post('/signin', signin.hundleSignin(db, bcrypt))
app.post('/register' ,  register.hundleRegister(db, bcrypt))
app.get('/profile/:id',profile.profileHundler(db) );
app.put('/image',(req, res) =>{image.imageHundler(req, res, db)});
app.post('/imageurl',(req, res) =>{image.handleApiCall(req, res)});


// envariomental variables
//allow us to set the port from the terminal
//important so we can run our code on diffrent encarioments without touching the code base 
// const PORT = process.env.PORT;
// app.listen(PORT,()=>{
//   console.log('app is running');
// })

app.listen(3000,()=>{
    console.log('app is running');
})

// app.post('/signin', (req,res) => {
//     return db.select('email', 'hash').from('login')
//        .where('email','=', req.body.email)
//     .then(data =>{
//         const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
//         if (isValid) {
//             db.select('*').from('users').where('email','=',req.body.email)
//             .then(user=>{
//                 res.json(user[0])
//             }).catch(err=> res.status(400).json('unable to get user'))
//         }else{
//             res.status(400).json('wrong credentials')
//         }
//     })
//     .catch(err => res.status(400).json('wrong credentials'))
// })

// app.post('/register', (req,res) =>{
//     const {email, name, password} = req.body;
//     const saltRounds = 10;
//     var hash = bcrypt.hashSync(password, saltRounds);
//     db.transaction(trx => {
//         trx.insert({
//             hash: hash,
//             email : email
//         })
//         .into('login')
//         .returning('email')
//         .then(loginEmail => {
//             return trx('users')
//             .returning('*')
//             .insert({
//                 email : loginEmail[0],
//                 name : name,
//                 joined : new Date()
//             }).then(user => {
//                 res.json(user[0]);
//             })
//         })
//         .then(trx.commit)
//         .catch(trx.rollback)
//     })
//     .catch(err=>res.status(400).json('unable to register'))
// })


// app.get('/profile/:id', (req,res)=>{
//     const {id} =  req.params;
//     db.select('*').from('users').where({
//         id : id
//     }).then(user => {
//         if (user.length) {
//             res.json(user[0])
//         }else{
//             res.status(400).json('not found')
//         }
//     }).catch(err=> res.status(400).json('err getting user'))
// })

// app.put('/image', (req,res)=>{
//     const {id} =  req.body;
//     db('users').where('id','=', id)
//     .increment('entries', 1)
//     .returning('entries')
//     .then(entries => res.json(entries[0]))
//     .catch(err => res.status(400).json('enable to get entries'))
// })

