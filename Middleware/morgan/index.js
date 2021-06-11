const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'))

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log('req.method, req.path');
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log('i love dogs!!')
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    res.send('SORRY YOU NEED A PASSWORD!!!')
}



//app.use((req, res, next) => {
//    console.log('this is my first middleware!!')
//    return next();
//    console.log('this is my first middleware - after calling next()!!')
//})

//app.use((req, res, next) => {
//    return next();
//})

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!!!')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!!!')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('i dont like you')
})


app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

app.listen(3000, () => {
    console.log('App is running on localhost: 3000!')
})