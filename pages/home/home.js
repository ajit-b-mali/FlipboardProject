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
const postsDiv = document.querySelector(".pin_container");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    showPosts();
  } else {
    window.location.assign("./login.html");
  }
});

function showPosts() {
  firebase
    .firestore()
    .collection("posts")
    .onSnapshot((posts) => {
      postsDiv.innerHTML = "";
      console.log(posts);
      posts.forEach((post) => {
        getPostCreater(post.data());
      });
    });

  function getPostCreater(postData) {
    firebase
      .firestore()
      .collection("users")
      .doc(postData.uid)
      .onSnapshot((user) => {
        addPostCard(user.data(), postData);
      });
  }

  function addPostCard(userData, postData) {
    const imageType = ["card_small", "card_medium", "card_large"];

    function random(max) {
      return Math.floor(Math.random() * max);
    }

    let postCard = document.createElement("div");
    postCard.classList.add("card", imageType[random(3)]);

    let isLiked = false;
    for (let likeIndex = 0; likeIndex < postData["like"].length; likeIndex++) {
      if (postData["like"][likeIndex] === uid) {
        isLiked = true;
      }
    }

    postCard.innerHTML = `
      <img src="${postData.url}" onclick="expandPost('${postData.id}')" alt="image">
      <button class="hide">Save</button>
      <div class="iconn">
          <i class="ri-arrow-down-circle-fill icon-2"></i>
          <button onclick="share('${postData.url}')"><i class="ri-more-fill icon-2"></i></button>
      </div>
    `;

    postsDiv.appendChild(postCard);
  }
}

function expandPost(id) {
  window.location = "./view-post.html?id=" + id;
}

function share(urlString) {
  if (navigator.share) {
    navigator.share({
      title: "FlipBoard Image",
      text: "Find more on FlipBoard.",
      url: urlString,
    });
  }
}
