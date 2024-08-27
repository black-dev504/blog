const express = require('express');
const bodyparser = require('body-parser');


const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

const database = []

// home route == get
app.get('/',function (req,res) {

  res.render('home',{data:database})
})
// home route == post
app.post('/',function(req,res){
  const title = req.body.title;
  const content = req.body.content;
  const subtitle = content.substring(0,100) + "...";
  const id = database.length + 1;
  const data = {
    header: title,
    body: content,
    sub: subtitle,
    id: id
  } 
  database.push(data)

  res.redirect('/');
})

// add file route
app.get('/compose', function (req,res) {
  res.render('add.ejs')
})

// display content route
app.get('/display.ejs/:id',function (req,res) {
  const blogId = parseInt(req.params.id);
  res.render('display.ejs', {'blogId':blogId, data:database});
})



app.get('/about',function (req,res) {
  res.render('about.ejs')
})

app.get('/contact',function (req,res) {
  res.render('contact.ejs')
})
app.listen(3000, function () {
  console.log('active')
})
