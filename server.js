const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use(express.static(__dirname+'/public'));

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log+'\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log');
    }
  })
next();
})


// app.get('/', (req, res) => {
//   //res.setHeader("Content-Type", "text/html");
// //   res.send('<h1>Hello Express!</h1>');
//   res.send({
// name:'Piero',
// likes:[
//   'biking',
//   'cities'
// ]
//   });
//  });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (testo) => {
  return testo.toUpperCase();
})

 app.get('/', (req , res) => {
   res.render('home.hbs', {
     pageTitle:'About Page',
     welcome:'Welcome home!',
   })
 })


 app.get('/about', (req , res) => {
   res.render('about.hbs', {
     pageTitle:'About Page',
     welcome:'Welcome home!'
   })
 })

 app.get('/bad', (req , res) => {
   res.send(
     {
       errorMessage: 'Unable to handle request'
     }
   );
 })

app.listen(port, () =>{
console.log(`Server is up on port ${port}`);
});
