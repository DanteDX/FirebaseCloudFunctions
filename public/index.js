document.querySelector("#sayHello").addEventListener("click", async (e) => {
  // calling firebase callable cloud function
  const sayHello = functions.httpsCallable("sayHello");
  try {
    const res = await sayHello({ userName: "Shadman Martin Piyal" });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
});

document.querySelector("#addNewBook").addEventListener("click", async (e) => {
  const addNewBook = functions.httpsCallable("addNewBook");
  try {
    const res = await addNewBook({
      bookName: "An Introduction to Mechanics",
      bookAuthor: "Daniel Kleppner",
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});

document.querySelector("#fileUploadButton").addEventListener("change", function (e) {
    let file = e.target.files[0];
    let ref = storage.ref("photos/" + file.name);
    let task = ref.put(file);
    task.on(
      "state_changed",
      function progress(snapshot) {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
      },
      function error(err) {
        console.log(err);
      },
      function complete() {
        console.log("File Uploading Completed!");
      }
    );
  });

document.querySelector("#downloadButton").addEventListener("click", async (e) => {
  let photoRef = storage.ref("photos/Piyal.jpg");
  try{
      const url = await photoRef.getDownloadURL();
      document.querySelector("#downloadLink").setAttribute('src',url);
  }catch(err){
      console.log(err);
  }
});
