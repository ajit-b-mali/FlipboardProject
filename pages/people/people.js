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
          <a href="userdetail.html?uid=${user.data()["uid"]}">
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





