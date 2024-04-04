const settingsMenu = document.querySelector(".setting-menu");

function settingsMenuToggle() {
  settingsMenu.classList.toggle("settings-menu-height");
}

const headerNavDP = document.querySelector("#header-nav-dp");
const settingMenuDP = document.querySelector("#setting-menu-dp");
const settingMenuUsername = document.querySelector("#setting-menu-username");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    updateNav(user.uid);
  } else {
    // window.location.assign("../index.html");
  }
});

function updateNav(uid) {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .onSnapshot((data) => {
      headerNavDP.src = data.data()["ProfilePicture"];
      settingMenuDP.src = data.data()["ProfilePicture"];
      settingMenuUsername.innerHTML = `${data.data().FirstName} `;
    });
}

