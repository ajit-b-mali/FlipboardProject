import app from "./firebase.config.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const previewBox = document.getElementById("preview");

const storage = getStorage(app);
const storageRef = ref(storage);
let imageUrl = null;

const uploadImage = (e) => {
  const target = e.target;
  const files = target?.files;

  if (!target || !files) {
    return;
  }

  const file = files[0];

  uploadBytes(ref(storageRef, "images/" + file.name), file)
    .then((snapshot) => {
      console.log("Uploaded", snapshot.metadata.size, "bytes.");
      console.log("File metadata:", snapshot.metadata);
      getDownloadURL(snapshot.ref).then((url) => {
        imageUrl = url;
        console.log("File available at", url);
        previewBox.style.display = "block";
        previewBox.src = url;
      });
    })
    .catch(function (error) {
      console.error("Upload failed:", error);
    });
}


function getImageUrl() {
  if(!imageUrl) {
    alert("please add image");
    return;
  }
  return imageUrl;
}

export {uploadImage, getImageUrl };
