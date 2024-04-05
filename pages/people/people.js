const cardDiv = document.querySelector("#profile-cards");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((users) => {
        cardDiv.innerHTML = "";
        users.forEach((user) => {
          let card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
          <a href="userdetail.html?uid=${user.data()["uid"]}">
          <h2 class="description">${
            user.data()["FirstName"]}</h2>
            <div class="image">
              <img src="${user.data()["ProfilePicture"]}" alt=" " />
            </div>
          </a>
          `;
          cardDiv.appendChild(card);
        });
      });
  }
});
