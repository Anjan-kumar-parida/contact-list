const express = require('express');
//const path = require('path');
const port = 8000;

const db = require('./config/mongoose')
const Contact = require('./models/contact')

const app = express();

app.set('view engine' , 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));

app.get('/', async function (req, res) {
    try {
      const contacts = await Contact.find({}).exec();
  
      res.render('home', {
        title: 'Contact list',
        contact_list: contacts
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.get('/practice', function(req,res){
    return res.render('practice', {
        title: 'play with ejs'
    })
});

app.post('/create-contact', async function(req, res){
    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone // Assuming 'phone' is the correct property name
        });
        console.log('******', newContact);
        return res.redirect('back');
    } catch (err) {
        console.error('Error in creating a contact:', err);
        return res.status(500).send('Error in creating a contact');
    }
});

app.get('/delete-contact', async (req, res) => {
    try {
        let id = req.query.id;
        
        await Contact.findByIdAndDelete(id);
        
        return res.redirect('back');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error deleting contact'); // You can customize the error response as needed
    }
});


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
  

  