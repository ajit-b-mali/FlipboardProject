const usersDiv = document.querySelector(".users");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((users) => {
        usersDiv.innerHTML = "";
        users.forEach((user) => {
          let card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
          <a href="userdetail.html?uid=${user.data()["uid"]}">
          <h2 class="description">${
            user.data()["FirstName"]}</h2>
            <div class="image">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU6ZCTU07uUDJrf8nBA__6JuNUtv8wDIXhhBSjNfwvVENcg3LChn1z83tP-VHm5p9X8JE&usqp=CAU" alt=" " />
            </div>
          </a>
          `;
          usersDiv.appendChild(card);
        });
      });
  }
});
