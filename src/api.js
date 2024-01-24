//Set up express
const serverless = require(`serverless-http`)
const express = require(`express`);
const {Router} = require(`express`)
const api = express();
const router = Router();
//Include the file system functions
const fs =require(`fs`);
//Include and set the hbs (handlebars) view engine
const hbs = require(`hbs`)
api.set(`view engine`,`hbs`)
//register the location of partial snippets for the view engine
hbs.registerPartials(__dirname + `/views/partials`,(err)=>{})
//Uses extended url capability
api.use(express.urlencoded({extended:true}));
//add the static asset folder
// app.use(express.static(`${__dirname}/public`));
//allow express json functionality
api.use(express.json())

//path to the data folder
const data = `./data`

//Route to the root directory. Displays "Hello World" in browser
api.get(`/`, (req,res)=>{
    res.render('root', {})
})



//Route used by form. Displays text input in the browser
api.post(`/junk`, (req,res)=>{
    res.send(req.body.name)
})



//Route with parameters.Reads JSON file and displays the selected id from the class.json file
/*app.get(`/:file/:id`, (req,res)=>{
    fs.readFile(
        `${data}/${req.params.file}.json`, 
        `utf8`, 
        (err, data)=>{
            if(err){
                throw err;
            }
            const id = req.params.id
            res.send({"name":JSON.parse(data)[id]});
        })
})*/

//Route to /class. Reads JSON file and displays data in the browser
api.get(`/class`, (req,res)=>{
    fs.readFile(
        `${data}/class.json`, 
        `utf8`, 
        (err, data)=>{
            if(err){
                throw err;
            }
            res.send(JSON.parse(data));
        })
})

//Route with parameters. Displays first and last name in browser
api.get(`/:last/:first`, (req,res)=>{
    res.render(`farts`,{first:req.params.first, last:req.params.last,rules:`rules`})
})

api.get('*', (req, res)=>{
    res.status(404).render('missing');
  });

//Runs the server when npm app.js is run in the terminal

let port = process.env.PORT || 81;
api.listen(port, ()=>{
    console.log(`Server Running at localhost:${port}`)
});

module.exports.handler = serverless(api);
