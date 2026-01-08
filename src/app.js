const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'templates/views')
const partialsPath = path.join(__dirname,'templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath) 
hbs.registerPartials(partialsPath)

//Setup static directory to save
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        name:'Keerthivel'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About me',
        name:'Keerthivel'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'help',
        name:'Keerthivel'
    })
})


app.post('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    res.send({
        forecast: 'It is snowing',
        address: req.query.address
    })
})


//request
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})



app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, '../files/report.pdf');
  res.download(filePath);
});

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Keerthivel',
    errorMessage:'Help articel Not Found'
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Keerthivel',
    errorMessage:'Page Not Found'
  })
})

app.listen(process.env.PORT || 3000,(error) =>{
    if (error) {
        console.error('Server failed to start');
        console.error(error.message);
        process.exit(1); // stop the app prevent runing the Broken server
    }
    console.log(`Server running on port ${process.env.PORT || 3000}`);
})