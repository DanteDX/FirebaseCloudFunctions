const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


// HTTPS functions
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

// Auth Triggers
exports.newUserSignUp = functions.auth.user().onCreate(async(user) =>{
    console.log('From Auth Trigger New User Create');
    console.log(user.email,user.uid);
    try{
        await admin.firestore().collection('users').doc(user.uid).set({
            email:user.email,
            password:user.password
        });
        return 'onCreate Auth Trigger success!';
    }catch(err){
        return err.message;
    }
    
});

exports.UserDelete = functions.auth.user().onDelete(async(user) =>{
    console.log('From Auth Trigger');
    console.log(user.email,user.uid);
    try{
        await admin.firestore().collection('users').doc(user.uid).delete();
        return 'onDelete Auth Trigger success!';
    }catch(err){
        return err.message;
    }
});

