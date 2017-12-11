const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');


app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err)=>{
       if(err){
           console.log('Unable to append');
       }
    });
    next();
});

app.use((req,res,next)=>{
   res.render('maintenance.hbs');
});

hbs.registerHelper('currentYear',()=>{
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        title:'Home Page',
        welcomeMessage : 'Welcome to the home page'
});
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About Page',
        welcomeMessage : 'Welcome to the about page'
});
});

app.get('/bad',(req,res)=>{
    res.send('<strong>Bad Request</strong>');
});

app.listen(3000,()=>{
    console.log('Server running on port 3000 ...');
});