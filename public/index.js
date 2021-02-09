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