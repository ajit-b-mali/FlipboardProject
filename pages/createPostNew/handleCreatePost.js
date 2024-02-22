import app from "./firebase.config.js";

import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const db = getFirestore(app);
const postsCollection = collection(db, 'posts');

export default function handleCreatePost(uid, imageUrl, postDescription) {
  console.log("inside handleCreatePost");
  if(uid && imageUrl && postDescription) {
    addDoc(postsCollection, {
      id: uid,
      imageUrl: imageUrl,
      postDescription: postDescription
    }).then(() => {
      alert("post added successfully");
    }).catch((error) => {
      console.log(error.message);
    });
  } else {
    alert("incomplete Data");
  }
}