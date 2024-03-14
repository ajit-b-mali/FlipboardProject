// // Top section
// let uid;
// let allusers=[]
// let fileType =""

// let userimg = document.getElementById("userimage")
// firebase.auth().onAuthStateChange((user)=>{
//   if(user.emailVerified){
//     uid =user.uid;
//     var createpostinput = document.getElementById("a")
//     firebase.firestore().collection("users/").onSnapshot((result)=>{
//       result.forEach((users)=>{
//         allusers.push(users.data())
//         fileType = users.data().fileType
//         if(users.data().uid === user.uid){
//           createpostinput.setAttribute("placeholder",
//           `what's in your mind ${" " + users.data().name}`
//           )
//           if(users.data().ProfilePicture !== ""){
//             userimg.setAttribute("src",users.data().ProfilePicture)
//           }
//         }
//       });
//     });
//   }else{
//     window.location.assign("./pages/home/index.html")
//   }
// });

let uid;
let alluser = [];
let userimg = document.getElementById("userimage");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      console.log("emailVerified true");
      var createpostinput = document.getElementById("a");
      firebase
        .firestore()
        .collection("users/")
        .onSnapshot((result) => {
          result.forEach((users) => {
            alluser.push(users.data());
            Filetype = users.data().FileType;
            if (users.data().uid === user.uid) {
              createpostinput.setAttribute(
                "placeholder",
                `What's on your mind,${
                  " " + users.data().FirstName + " " + users.data().LastName
                }?`
              );

              if (users.data().ProfilePicture !== "") {
                userimg.setAttribute("src", users.data().ProfilePicture);
              }
            }
          });
        });
    } else {
      window.location.assign("./email.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});