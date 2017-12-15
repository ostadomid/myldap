
var port = 80;
var ad = require('./ldap-init');
var path = require('path');
var express= require('express');
var bodyParser = require('body-parser')
var publicPath = path.resolve(__dirname,'./assets');

var app = express();
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(publicPath));
console.log(publicPath);

app.get('/', (req,res)=>{
    res.render('index');
});

app.post('/user',(req,res)=>{
    var id = req.body['code_melli'];
    if(!id){
        res.redirect("/");
    }
    //res.set({ 'content-type': 'application/json; charset=utf-8' })
    try{
        ad.findUsers(`description=${id}`, function(err, users) {
            if (err) {
                res.render('error',{error:err});
            }
        
            if ((! users) || (users.length == 0)) {
                res.render('no-user',{pdfLink:'http://www.google.com'});
            }
            else {
                res.render('user-info',{
                    firstName:users[0].givenName,
                    lastName:users[0].sn,
                    userName : users[0].sAMAccountName
                });
                
            }
        });
    }
    catch(e){

    }
    
    
});
app.get('*',(req,res)=>{
    res.redirect("/");
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


