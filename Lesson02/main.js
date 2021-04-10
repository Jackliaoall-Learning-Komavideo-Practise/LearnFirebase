var admin = require("firebase-admin");
var serviceAccount = require("./myfirebase-fabd1-firebase-adminsdk-oubef-09839ee16c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
// var defaultProjectManagement = admin.projectManagement();
// console.log(defaultProjectManagement)

let db = admin.firestore();
db.collection('users').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });