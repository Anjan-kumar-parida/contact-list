const express = require('express');
//const path = require('path');
const port = 8000;


const app = express();

app.set('view engine' , 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));

app.get('/', function(req,res){
    //res.send('<h1>It is running</h1>')
    return res.render('home', {
        title: 'Contact list',
        contact_list : contactList
    });
});

app.get('/practice', function(req,res){
    return res.render('practice', {
        title: 'play with ejs'
    })
});

app.post('/create-contact', function(req, res){
    //console.log(req.body);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    contactList.push(req.body);

    return res.redirect('back');
})

app.get('/delete-contact', (req, res) => {
    let phone = req.query.phone;
    
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if(contactIndex != 1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');
})


var contactList = [
    {
        name : "Anjan",
        phone: "1111111111"
    },
    {
        name: "Tony",
        phone: "2222222222"
    },
    {
        name: "Steve",
        phone: "3333333333"
    }
];

app.listen(port, function(err) {
    if(err){
        return err;
    }

    console.log(port);
  }); 
  

  