let userprofileimg =document.getElementById("userprofileimg");
let usercoverimg =document.getElementById("usercoverimg");
let progressdiv =document.getElementById("progressbardiv");
let progressbar =document.getElementById("progressbar");

let fileType ="";
let uid;
let updateurl;
let allUsers = []

let changeCoverImage = (event) => {
    
    var uploadfile = firebase
      .storage()
      .ref()
      .child(`users/${uid}/coverpicture`)
      .put(event.target.files[0]);
    uploadfile.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var uploadpercentage = Math.round(progress);
        console.log(uploadpercentage);
        progressdiv.style.display = "block";
        progressbar.style.width = `${uploadpercentage}%`;
        progressbar.innerHTML = `${uploadpercentage}%`;
      },
      (error) => { },
      () => {
        uploadfile.snapshot.ref.getDownloadURL().then((downloadURL) => {
          progressdiv.style.display = "none";
          firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ CoverPicture: downloadURL });
        });
      }
    );
  };

  let changeProfileImage = (event) => {
    
    var uploadfile = firebase
      .storage()
      .ref()
      .child(`users/${uid}/profilepicture`)
      .put(event.target.files[0]);
    uploadfile.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var uploadpercentage = Math.round(progress);
        console.log(uploadpercentage);
        progressdiv.style.display = "block";
        progressbar.style.width = `${uploadpercentage}%`;
        progressbar.innerHTML = `${uploadpercentage}%`;
      },
      (error) => { },
      () => {
        uploadfile.snapshot.ref.getDownloadURL().then((downloadURL) => {
          progressdiv.style.display = "none";
          firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ ProfilePicture: downloadURL });
        });
      }
    );
  };




  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified) {
        uid = user.uid;
        firebase.firestore().collection("users/").onSnapshot((result)=>{
          result.forEach((user)=>{
            allUsers.push(user.data())
            fileType = user.data.fileType;
            if(user.data().uid === user.uid){
              if(user.data().ProfilePicture !=="" || user.data().CoverPicture !==""){
                userprofileimg.setAttribute("src", user.data().ProfilePicture || "https://nullchiropractic.com/wp-content/uploads/2017/11/profile-default-male-768x768.jpg")
                usercoverimg.setAttribute("src" , user.data().CoverPicture || "https://media.istockphoto.com/id/490726872/photo/man-at-the-sunrise.jpg?b=1&s=170667a&w=0&k=20&c=ftoG5oljywajspsDYs9N37LgtiYYRHyySxgGpQb9r0Y=")
              }
            }
          })
        })
      } else {
        window.location.assign("../../index.html");
      }
    } else {
      window.location.assign("../../index.html");
    }
  });

  
