//const client = require('twilio')();

const accountSid = 'ACec07fe5287f74a08c4807a8186ae368f'; 
const authToken = '903386eb7988c123f18b2282c22291da'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'pepe', 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+5491134861995' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();


//.catch(message => console.log(message))
