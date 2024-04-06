let rName = document.getElementById("right-name");
let userprofileimg = document.getElementById("userprofileimg");
let usercoverimg = document.getElementById("usercoverimg");
let progressbar1 = document.getElementById("progressbar");
let progressbardiv = document.getElementById("progressbardiv");
let firstName = document.getElementById("firstname");
let mobilenumber = document.getElementById("mobileno");
let email = document.getElementById("emailaddress");
let description = document.getElementById("userdescription");
let uid; // Declare uid variable outside the onAuthStateChanged callback

const urlParams = new URLSearchParams(window.location.search);
let urlUid = urlParams.get("uid");


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = urlUid ? urlUid : user.uid;;
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((result) => {
        console.log(result.data());
        fileType = result.data().filetype;
        userprofileimg.src = result.data().ProfilePicture;
        usercoverimg.src = result.data().CoverPicture;
        rName.innerText = result.data().FirstName;
        firstName.value = result.data().FirstName;
        mobilenumber.value = result.data().mobileNumber;
        email.value = result.data().Email;
        email.disabled = true;
        description.value = result.data().Description;
      });
  }
});

// changecoverpicture
function changecoverpicture(event) {
  var uploadTask = firebase
    .storage()
    .ref()
    .child(`users/${uid}/coverpicture`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressbardiv.style.visibility = "visible";
      var uploadpercentage = Math.round(progress);
      progressbar1.style.width = `${uploadpercentage}%`;
      progressbar1.innerHTML = `${uploadpercentage}%`;
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((coverpicture) => {
        progressbardiv.style.visibility = "hidden";
        firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ CoverPicture: coverpicture });
      });
    }
  );
}

// changeprofilepicture
function changeprofilepicture(event) {
  var uploadTask = firebase
    .storage()
    .ref()
    .child(`users/${uid}/profilepicture`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressbardiv.style.visibility = "visible";
      var uploadpercentage = Math.round(progress);
      progressbar1.style.width = `${uploadpercentage}%`;
      progressbar1.innerHTML = `${uploadpercentage}%`;
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((profileimage) => {
        progressbardiv.style.visibility = "hidden";
        firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ ProfilePicture: profileimage });
      });
    }
  );
}

// update button
let update = () => {
  if (firstName.value === "") {
    message.innerHTML = "First Name Required";
    message.style.color = "red";
    firstName.focus();
  } else if (mobilenumber.value === "") {
    message.innerHTML = "Mobile Number Required";
    message.style.color = "red";
    mobilenumber.focus();
  } else {
    var data = {
      firstName: firstName.value,
      mobileNumber: mobilenumber.value,
      Description: description.value,
    };
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update(data)
      .then((res) => {
        console.log(res);
        message.innerHTML = "Successfully Updated";
        message.style.color = "green";
        setTimeout(() => {
          message.innerHTML = "";
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};


/*post section */


// // let uid;
// // let alluser = [];
// const postsDiv = document.querySelector(".pin_container");

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     uid = user.uid;
//     // uid = urlUid ? urlUid : user.uid;
//     showPosts();
//   } else {
//     // window.location.assign("./login.html");
//   }
// });

// function showPosts() {
//   firebase
//     .firestore()
//     .collection("posts")
//     .onSnapshot((posts) => {
//       postsDiv.innerHTML = "";
//       console.log(posts);
//       posts.forEach((post) => {
//         getPostCreater(post.data());
//       });
//     });

//   function getPostCreater(postData) {
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(postData.uid)
//       .onSnapshot((user) => {
//         console.log(user.data(), postData);
//         addPostCard(user.data(), postData);
//       });
//   }

//   function addPostCard(userData, postData) {
//     const imageType = ["card_small", "card_medium", "card_large"];

//     function random(max) {
//       return Math.floor(Math.random() * max);
//     }

//     let postCard = document.createElement("div");
//     postCard.classList.add("card", imageType[random(3)]);
//     postCard.addEventListener("click", () => {
//       expandPost(postData.id);
//     });

//     postCard.innerHTML = `
//       <img
//         src="${postData.url}"
//         alt="image"
//       />
//       <div class="username">
//         <img src="${userData.ProfilePicture}" alt="" />
//         <p>${userData.FirstName}</p>
//       </div>
//       <div class="reactions">
//         <div class="like">
//           <i class="ri-thumb-up-fill icon-2"></i><span>${postData.like.length}</span>
//         </div>
//         <div class="dislike">
//           <i class="ri-thumb-down-fill icon-2"></i><span>${postData.dislikes.length}</span>
//         </div>
//       </div>
//     `;

//     postsDiv.appendChild(postCard);
//   }
// }

// // function expandPost(id) {
// //   window.location = "../viewPost/index.html?id=" + id;
// // }

// // function share(urlString) {
// //   if (navigator.share) {
// //     navigator.share({
// //       title: "FlipBoard Image",
// //       text: "Find more on FlipBoard.",
// //       url: urlString,
// //     });
// //   }
// // }
