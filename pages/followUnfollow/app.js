const allUsersListEl = document.getElementById("all-users");

const db = firebase.firestore();
const users = db.collection("users");

function updateCurrentUserField(userName, followingCount, followersCount) {
  document.getElementById("current-user").innerHTML = `
    <h2>Current user - ${userName}</h2>
    <p>Following: <span>${followingCount}</span></p>
    <p>Followers: <span>${followersCount}</p></p>
  `;
}

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        users.doc(user.uid).onSnapshot(doc => {
          const userData = doc.data();
          updateCurrentUserField(userData.FirstName, userData.following.length, userData.followers.length);
        });
        resolve(user.uid);
      } else {
        reject("User Not Found");
      }
    });
  })
}

async function getAllUsers(currenUserUid) {
  users.doc(currenUserUid).onSnapshot(() => {
    allUsersListEl.innerHTML = "";
    users.get().then(doc => {
      doc.forEach(async (user) => {
        const currentUserDoc = await users.doc(currenUserUid).get();
        let following = currentUserDoc.data().following;

        let followers = currentUserDoc.data().followers;

        const userData = user.data();
        if (userData.uid == currenUserUid) return;

        const userEl = document.createElement("div");
        userEl.classList.add("user");
        const userName = document.createElement("h2");
        userName.innerHTML = userData.FirstName;
        userEl.append(userName);

        if (!following.includes(userData.uid) && followers.includes(userData.uid)) {
          const followBackBtn = document.createElement("button");
          followBackBtn.innerText = "follow back";
          
          followBackBtn.addEventListener("click", () => {
            users.doc(currenUserUid).set({
              following: [...following, userData.uid],
            }, { merge: true });

            const followers = userData.followers;
            users.doc(userData.uid).set({
              followers: [...followers, currenUserUid],
            }, { merge: true });
          });

          userEl.append(followBackBtn);

        }
        if (!following.includes(userData.uid) && !followers.includes(userData.uid)) {
          const followBtn = document.createElement("button");
          followBtn.innerText = "follow";

          followBtn.addEventListener("click", () => {
            users.doc(currenUserUid).set({
              following: [...following, userData.uid],
            }, { merge: true });

            const followers = userData.followers;
            users.doc(userData.uid).set({
              followers: [...followers, currenUserUid],
            }, { merge: true });
          });

          userEl.append(followBtn);
        }
        if (following.includes(userData.uid)) {
          const unFollowBtn = document.createElement("button");
          unFollowBtn.innerText = "unfollow";

          unFollowBtn.addEventListener("click", () => {
            following = following.filter(uid => uid != userData.uid);
            users.doc(currenUserUid).set({
              following: [...following],
            }, { merge: true });

            const followers = userData.followers.filter(uid => uid != currenUserUid);
            users.doc(userData.uid).set({
              followers: [...followers],
            }, { merge: true });
          });

          userEl.append(unFollowBtn);
        }
        allUsersListEl.append(userEl);
      });
    });
  });
}

async function init() {
  try {
    const currentUserUid = await getCurrentUser();
    getAllUsers(currentUserUid);
  } catch (error) {
    console.error("Error: ", error);
  }
}

init();