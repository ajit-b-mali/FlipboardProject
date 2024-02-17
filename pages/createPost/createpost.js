let postValue = document.getElementById("textarea");
let progressDiv = document.getElementById("progressdiv");
let progressBar = document.getElementById("progressbar");
let currentUser = "";
let url = "";
let fileType = "";
let done = document.getElementById("done");
let uid;

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
    (error) => {},
    () => {
      uploadfile.snapshot.ref.getDownloadURL().then((downloadURL) => {
        url = downloadURL;
        done.style.display = "block";
        progressDiv.style.display = "none";
      });
    }
  );
};


var d = new Date().toLocaleDateString();


function createpost() {
  if (postValue.value !== " " || url !== " ") {
    firebase
      .firestore()
      .collection("posts")
      .add({
        postValue: postValue.value,
        uid: currentUser.uid,
        url: url,
        filetype: fileType,
        like: "",
        dislikes: "",
        comments: "",
        Date: `${d}`
      })
      .then((res) => {
        firebase
          .firestore()
          .collection("posts/")
          .doc(res.id)
          .update({
            id: res.id
          })
          .then(() => {
            done.style.display = "none"
            document.getElementById("uploadedmssage").style.display = "block";
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
      });
  }
}
