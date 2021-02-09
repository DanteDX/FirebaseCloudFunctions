document.querySelector('#sayHello').addEventListener('click',async (e) =>{
    // calling firebase callable cloud function
    const sayHello = functions.httpsCallable('sayHello');
    try{
        const res = await sayHello({userName:'Shadman Martin Piyal'});
        console.log(res.data);
    }catch(err){
        console.log(err);
    }
})

document.querySelector('#addNewBook').addEventListener('click',async (e) =>{
    const addNewBook = functions.httpsCallable('addNewBook');
    try{
        const res = await addNewBook({
            bookName: 'An Introduction to Mechanics',
            bookAuthor: "Daniel Kleppner"
        });
        console.log(res);
    }catch(err){
        console.log(err);
    }
})