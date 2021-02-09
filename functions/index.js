const functions = require('firebase-functions');

exports.getRandomNumber = functions.https.onRequest((req,res) =>{
    let myRandom = Math.round(Math.random() * 100);
    res.send(myRandom.toString());
});

exports.goToGoogle = functions.https.onRequest((req,res) =>{
    res.redirect('https://www.google.com');
});

exports.sayHello = functions.https.onCall((data,context) =>{
    if(!data.userName){
        return 'Please Provide a userName';
    }
    return `${data.userName} said hello to you`;
});