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
    return 'new user sign up done!';
    // try{
    //     await admin.firestore().collection('users').doc(user.uid).set({
    //         email:user.email,
    //         password:user.password
    //     });
    //     return 'onCreate Auth Trigger success!';
    // }catch(err){
    //     return err.message;
    // }
    
});

exports.UserDelete = functions.auth.user().onDelete(async(user) =>{
    console.log('From Auth Trigger');
    console.log(user.email,user.uid);
    return 'user has been deleted';
    // try{
    //     await admin.firestore().collection('users').doc(user.uid).delete();
    //     return 'onDelete Auth Trigger success!';
    // }catch(err){
    //     return err.message;
    // }
});

exports.addNewBook = functions.https.onCall(async (data,context) =>{
    // if(!context.auth){
    //     throw new functions.https.HttpsError('unauthenticated','Only Authenticated users are allowed');
    // }
    const {bookName,bookAuthor} = data;
    try{
        await admin.firestore().collection('books').add({bookName,bookAuthor});
        return 'New Book Added';
    }catch(err){
        return err;
    }
    
})

//Firestore trigger
exports.logActivities = functions.firestore.document('/{collection}/{id}')
	.onCreate((snap,context) =>{
		console.log(snap.data()); // of a single doc
		const collection = context.params.collection;
        const id = context.params.id; 	
        console.log(collection,id);
		const activities = admin.firestore().collection('samples');	
		if(collection === 'books'){
			return activities.add({text:'a new tut req'});
		}else{
            return 0;
        }					
	})

