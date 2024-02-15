let postValue = document.getElementById("textarea1");
let progressdiv = document.getElementById("progressdiv");
let progressbar = document.getElementById("progressbar");
let currentUser = "";
let url = "";
let fileType = "";
let done = document.getElementById("done");
let uid;

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       if (user.emailVerified) {
//         uid = user.uid;
//         console.log("Email is verified!");
//       } else {
//         window.location.assign("/index.html");
//       }
//     } else {
//       window.location.assign("/index.html");
//     }
//   });
  
//   firebase.auth().onAuthStateChanged((user) => {
//     currentUser = user;
//   });

let uploading = (event)=>{
    fileType = event.target.files[0].fileType
    var uploadTask = firebase.storage().ref().child(`posts/${event.target.files[0].name}`)

uploadTask.on('state_changed', 
  (snapshot) => {
   
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    var uploadpercentage = Math.round(progress)
    progressdiv.style.display = "block"
    progressbar.style.width = `${uploadpercentage}%`
    progressbar.innerHTML = `${uploadpercentage}%`
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
     url = downloadURL;
     done.style.display  = "block"
     progressdiv.style.display = "none"
    });
  }
);
}

