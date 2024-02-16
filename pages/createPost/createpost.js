let postValue = document.getElementById("textarea");
let progressDiv = document.getElementById("progressdiv");
let progressBar = document.getElementById("progressbar");
let currentUser = "";
let url = "";
let fileType = "";
let done = document.getElementById("done");
let uid;

// let uploadimg = (event) => {
//   fileType = event.target.files[0].fileType;
//   var uploadTask = firebase.storage().ref().child(`posts/${event.target.files[0].name}`);
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       var uploadpercentage = Math.round(progress);
//       progressDiv.style.display = "block";
//       progressbar.style.width = `${uploadpercentage}%`;
//       progressbar.innerHTML = `${uploadpercentage}%`;
//     },
//     (error) => {
//       // Handle unsuccessful uploads
//     },
//     () => {

//       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//         url = downloadURL;
//         done.style.display = "block";
//         progressDiv.style.display = "none";
//       });
//     }
//   );
// }

let uploadimg = (event) => {
  fileType = event.target.files[0].type;
  var uploadfile = firebase
    .storage()
    .ref()
    .child(`postFiles/${event.target.files[0].name}`)
    .put(event.target.files[0]);
  uploadfile.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      var uploadpercentage = Math.round(progress);
      // console.log(uploadpercentage);
      progressDiv.style.display = "block";
      progressBar.style.width = `${uploadpercentage}%`;
      progressBar.innerHTML = `${uploadpercentage}%`;
    },
    (error) => { },
    () => {
      uploadfile.snapshot.ref.getDownloadURL().then((downloadURL) => {
        url = downloadURL;
        done.style.display = "block";
        progressDiv.style.display = "none";
      });
    }
  );
};
