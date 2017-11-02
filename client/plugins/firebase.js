import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCxdIvNBynJ-q9ijYILaYwKylCWstHy7C4",
  authDomain: "cube-canvas.firebaseapp.com",
  databaseURL: "https://cube-canvas.firebaseio.com",
  projectId: "cube-canvas",
  storageBucket: "cube-canvas.appspot.com",
  messagingSenderId: "1096991223405"
}
firebase.initializeApp(config)

const storage = firebase.storage()
const storageRef = storage.ref()
const imagesRef = storageRef.child('images')

export async function upload(file){
  // const file = document.getElementById('img-upload').files[0]
  const metadata = {
    contentType: 'image/jpeg'
  }
  return await storageRef.child('images/' + file.name).put(file, metadata)

  // uploadTask.on('state_changed',
  //   function(snapshot) {
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     console.log('Upload is ' + progress + '% done')
  //     switch (snapshot.state) {
  //       case firebase.storage.TaskState.PAUSED: // or 'paused'
  //         console.log('Upload is paused')
  //         break
  //       case firebase.storage.TaskState.RUNNING: // or 'running'
  //         console.log('Upload is running')
  //         break
  //     }
  //   }, function(error) {
  //   // A full list of error codes is available at
  //   // https://firebase.google.com/docs/storage/web/handle-errors
  //   switch (error.code) {
  //     case 'storage/unauthorized':
  //       // User doesn't have permission to access the object
  //       break
  //     case 'storage/canceled':
  //       // User canceled the upload
  //       break
  //     case 'storage/unknown':
  //       // Unknown error occurred, inspect error.serverResponse
  //       break
  //   }
  // }, function() {
  //   // Upload completed successfully, now we can get the download URL
  //   const downloadURL = uploadTask.snapshot.downloadURL
  // })
}
