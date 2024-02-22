import app from "./firebase.config.js";
import { uploadImage, getImageUrl} from "./handleImageUpload.js";
import handleCreatePost from "./handleCreatePost.js";

import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.uid);
  } else {
    console.log("User Not Found");
  }
});

function getPostDescription() {
    const postMsg = document.getElementById("post-msg");
    if(!postMsg.value) {
        alert("please add description");
        return '';
    }
    return postMsg.value;
}

document.getElementById("image-file").addEventListener("change", uploadImage);
document.getElementById("create-post").addEventListener("click", () => {
    let uid = auth.currentUser.uid;
    let imageUrl = getImageUrl();
    let postDescription = getPostDescription();
    handleCreatePost(uid, imageUrl, postDescription);
})
