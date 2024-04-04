let userprofileimg = document.getElementById("userprofileimg");
let usercoverimg = document.getElementById("usercoverimg");
let progressbar1 = document.getElementById("progressbar");
let progressbardiv = document.getElementById("progressbardiv");
let firstName = document.getElementById("firstname");
let mobilenumber = document.getElementById("mobileno");
let email = document.getElementById("emailaddress");
let description = document.getElementById("userdescription");
let uid; // Declare uid variable outside the onAuthStateChanged callback

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      var createpostinput = document.getElementById("a");
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((result) => {
          result.forEach((users) => {
            alluser.push(users.data());
            fileType = users.data().filetype;
            if (users.data().uid === user.uid) {
              createpostinput.setAttribute(
                "placeholder",
                `What's on your mind, ${users.data().FirstName}?`
              );
              firstName.value = users.data().FirstName;
              mobilenumber.value = users.data().MobileNumber;
              email.value = users.data().Email;
              email.disabled = true;
              description.value = users.data().Description;
            }
          });
        });
    }
  }
});

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
      Description: description.value
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
