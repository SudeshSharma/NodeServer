require('dotenv').config();
const express = require('express')
const router = express.Router()
const {Pool,Query} = require('pg')
const path = require('path')
const nodemailer = require('nodemailer');

var config=require('../../config.json')

//encryption decryption tech

var Cryptr = require('cryptr')
cryptr= new Cryptr('SecretKey');

var encryString = cryptr.encrypt(config.postgres.password)
// console.log(encryString)
var decryString = cryptr.decrypt(encryString)
// console.log(decryString)




// const connectionString = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+":"+config.postgres.port+"/"+config.postgres.database

const connectionString = "postgres://"+config.postgres.user+":"+decryString+"@"+config.postgres.host+":"+config.postgres.port+"/"+config.postgres.database
pool = new Pool({
  connectionString:connectionString
})
 router.post('/post/contactus',(req,res) =>{
   pool.connect((err,client,release) =>{
    // const data = req.body.name + req.body.email + req.body.commail + req.body.msg
 // const {name,email,commail,msg} = req.body;
    // let query= `INSERT INTO public.contactus (name,email,commail,msg) VALUES ('${data}')`;
     let query= `INSERT INTO public.contactus (name,email,commail,msg) VALUES ('${req.body.name}','${req.body.email}','${req.body.commail}','${req.body.msg}')`;
    console.log(query)
     client.query(query,(err,result) =>{
         if(err){
           throw err;
         }
        release();
       if(result && result.rows){
        // console.log(res.send(result))
         res.send(result)
         
       }
     })

      nodemailer.createTestAccount((err,account)=>{
        const bodyMsg = `
        <h3>New Contact Request</h3>
           <ul>
               <li>Name: ${req.body.name}</li>
               <li>Email: ${req.body.email}</li>
              
           </ul>
           <h3>Message</h3>
           <p>${req.body.msg}</p>
    
        `
        let transporter = nodemailer.createTransport({
         host: config.SMTP.host,
         port: config.SMTP.port,
         secure: false, 
         auth: {
             user: process.env.EMAIL,
             pass: process.env.PASSWORD
         },
         tls:{
           rejectUnauthorized:false
         }
       });
    
      //  setup email data with unicode symbols
       let mailOptions = {
           from: `"Contact us " ${config.SMTP.email}`, 
           to: process.env.TO, 
           subject: 'New report', 
           text: req.body.msg, 
           html: bodyMsg 
       };
    
       // send mail with defined transport object
       transporter.sendMail(mailOptions, (error, info) => {
           if (error) {
               return console.log(error);
           }
           console.log('Message sent: %s', info.messageId);   
           console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
           //res.render('contact', {msg:'Email has been sent'});
       });
      })
   })
        
     
 })

 router.get('/get/contactus', (req, res, next) => {
   const results = [];
 
  pool.connect((err, client) => {
     if(err) {
  
       console.log(err);
      return res.status(500).json({success: false, data: err});
     }
     const query = client.query(new Query('SELECT * FROM public.contactus'));
   
     query.on('row', (row) => {
       results.push(row);
     });
     query.on('end', () => {
     //res.json = (results) => results;
     return res.json(results);
     });
   });
 });

  

   router.get('/', (req, res, next) => {
     res.sendFile(path.join(
        __dirname, '..', 'public','index.html'));
    });

  module.exports = router;