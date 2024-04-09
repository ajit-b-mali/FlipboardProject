const cardDiv = document.querySelector(".container");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((users) => {
        cardDiv.innerHTML = "";
        users.forEach((user) => {
          let box = document.createElement("div");
          box.classList.add("box");
          box.innerHTML = `
          <div class="top-bar"></div>
        <a href="http://">
        <div class="content">
            <img src="${user.data()["ProfilePicture"]}" alt="">
            <h2 class="description">${user.data()["FirstName"]}</h2>
        </div></a>
        <div class="btn">
            <button id="followBtn">Follow </button>
            <button>Message</button>
        </div>
        `;
           cardDiv.appendChild(box);
        //    document.getElementById(`followBtn${FirstName.id}`).addEventListener('click', () => {
        //     toggleFollow(FirstName.id, document.getElementById(`followBtn${FirstName.id}`));
        //    });
         });
     });
   }
 });

 const usersCollection = firebase.firestore().collection('users');

 function toggleFollow(userId, followBtn) {
    usersCollection.doc(userId).get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data();
                const isFollowing = data.followers.includes(firebase.auth().currentUser.uid);

                if (isFollowing) {
                    // Unfollow
                    usersCollection.doc(userId).update({
                        followers: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)
                    }).then(() => {
                        followBtn.textContent = 'Follow';
                    }).catch(error => {
                        console.error('Error unfollowing user:', error);
                    });
                } else {
                    // Follow
                    usersCollection.doc(userId).update({
                        followers: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
                    }).then(() => {
                        followBtn.textContent = 'Unfollow';
                    }).catch(error => {
                        console.error('Error following user:', error);
                    });
                }
            } else {
                console.log('User data not found');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}




