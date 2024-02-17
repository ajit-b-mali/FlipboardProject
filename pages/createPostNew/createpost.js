import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
import { getAuth, connectAuthEmulator } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import {
  connectStorageEmulator,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';

import {
  getFirestore,
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyC4Od-APlSrnyAO9vz7wPxYcDDMKcZAJZA",
  authDomain: "learnfirebase-660de.firebaseapp.com",
  projectId: "learnfirebase-660de",
  storageBucket: "learnfirebase-660de.appspot.com",
  messagingSenderId: "296838660557",
  appId: "1:296838660557:web:14de50e0a6b581d97bc484",
  measurementId: "G-7JJ2762X0P"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const fileInput = document.getElementById('image-file');
const linkBox = document.getElementById('preview');
const postMsg = document.getElementById('post-msg');
let postImageUrl = null;

// Locally, we use the firebase emulators.
if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
const storageRef = ref(storage);

function handleFileSelect(e) {
  e.stopPropagation();
  e.preventDefault();

  const target = e.target;
  const files = target?.files;
  if (!target || !files) {
    return;
  }

  const file = files[0];

  // Push to child path.
  uploadBytes(ref(storageRef, 'images/' + file.name), file)
    .then(function (snapshot) {
      console.log('Uploaded', snapshot.metadata.size, 'bytes.');
      console.log('File metadata:', snapshot.metadata);
      // Let's get a download URL for the file.
      getDownloadURL(snapshot.ref).then(function (url) {
        postImageUrl = url;
        console.log('File available at', url);
        linkBox.style.display = "block";
        linkBox.src = url;
      });
    })
    .catch(function (error) {
      console.error('Upload failed:', error);
    });
}

fileInput.addEventListener('change', handleFileSelect, false);
// fileInput.disabled = true;

document.getElementById("create-post").addEventListener("click", () => {
  let date = new Date().toLocaleDateString();
  if (postMsg.value && postImageUrl) {
    console.log(date);
  }
})

auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log('User Found', user);
    // fileInput.disabled = false;
  } else {
    console.log('User Not Found');
  }
});