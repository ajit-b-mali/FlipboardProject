var commentsDiv = document.querySelector(".comments-div");

function expandComments() {
  commentsDiv.classList.toggle("active");
}

const urlParams = new URLSearchParams(window.location.search);
let postID = urlParams.get("id");
let uid;
let postData;
let userData;

const postUserDp = document.querySelector(".right .top-bar img");
const postUserName = document.querySelector(".right .top-bar h4");
const postCategory = document.querySelector(".post .category");
const postImg = document.querySelector("#post-img");
const likeCount = document.querySelector(".like span");
const likeBtn = document.querySelector(".interact-bar .like");
const dislikeCount = document.querySelector(".dislike span");
const dislikeBtn = document.querySelector(".dislike");
const commentCount = document.querySelector("#comment-count");
const postTitle = document.querySelector(".post-title");
const commentInput = document.querySelector(".comment-input input");
const sendCommentBtn = document.querySelector(".comment-input .send");
const allComments = document.querySelector(".all-comments");

const postsDiv = document.querySelector(".posts");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    firebase
      .firestore()
      .collection("posts")
      .doc(postID)
      .onSnapshot((data) => {
        postData = data.data();
        firebase
          .firestore()
          .collection("users")
          .doc(postData.uid)
          .onSnapshot((data) => {
            userData = data.data();
            fillPostData(postData, userData);
          });
        // showPosts(postData["category"]);
      });
  } else {
    // window.location.assign("../index.html");
  }
});

function fillPostData(postData, userData) {
  postUserDp.src = userData["ProfilePicture"];
  postUserName.innerHTML = `${userData["FirstName"]}`;

  // postCategory.innerHTML = postData["category"];
  postImg.src = postData["url"];

  likeCount.innerText = postData["like"].length;

  for (let likeIndex = 0; likeIndex < postData["like"].length; likeIndex++) {
    if (postData["like"][likeIndex] === uid) {
      likeBtn.classList.add("liked");
    }
  }

  likeBtn.addEventListener("click", () => {
    let like = false;
    for (let likeIndex = 0; likeIndex < postData["like"].length; likeIndex++) {
      if (postData["like"][likeIndex] === uid) {
        like = true;
        postData["like"].splice(likeIndex, 1);
        likeBtn.classList.remove("liked");
      }
    }
    if (!like) {
      postData["like"].push(uid);
    }
    firebase.firestore().collection("posts").doc(postID).update({
      like: postData["like"],
    });
  });

  dislikeCount.innerText = postData["dislikes"].length;

  for (
    let dislikesIndex = 0;
    dislikesIndex < postData["dislikes"].length;
    dislikesIndex++
  ) {
    if (postData["dislikes"][dislikesIndex] === uid) {
      likeBtn.classList.add("liked");
    }
  }

  dislikeBtn.addEventListener("click", () => {
    let dislikes = false;
    for (
      let dislikesIndex = 0;
      dislikesIndex < postData["dislikes"].length;
      dislikesIndex++
    ) {
      if (postData["dislikes"][dislikesIndex] === uid) {
        dislikes = true;
        postData["dislikes"].splice(dislikesIndex, 1);
        likeBtn.classList.remove("liked");
      }
    }
    if (!dislikes) {
      postData["dislikes"].push(uid);
    }
    firebase.firestore().collection("posts").doc(postID).update({
      dislikes: postData["dislikes"],
    });
  });

  commentCount.innerText = postData["comments"].length;

  postTitle.innerText = postData["postvalue"];

  fillComments(postData["comments"]);
}

function fillComments(commentarry) {
  if (commentarry.length !== 0) {
    allComments.innerHTML = "";
    for (
      let commentindex = 0;
      commentindex < commentarry.length;
      commentindex++
    ) {
      //user data
      firebase
        .firestore()
        .collection("users")
        .doc(commentarry[commentindex].uid)
        .get()
        .then((user) => {
          userData = user.data();
          let commentCard = document.createElement("div");
          commentCard.classList.add("comment-card");
          commentCard.innerHTML = `
            <div class="user">
                  <img src="${userData["ProfilePicture"]}" alt="" />
                  <small>${userData["FirstName"]}</small>
                </div>
                <div class="text">${commentarry[commentindex]["commentText"]}</div>
          `;
          allComments.appendChild(commentCard);
        });
    }
  }
}

sendCommentBtn.addEventListener("click", () => {
  if (commentInput.value == "") {
    alert("Please write something...!");
  } else {
    let commentdata = {
      commentText: commentInput.value,
      uid: uid,
    };
    postData["comments"].push(commentdata);
    firebase
      .firestore()
      .collection("posts")
      .doc(postID)
      .update({
        comments: postData["comments"],
      })
      .then(() => {
        commentInput.value = "";
      });
  }
});
