const admin = require('firebase-admin');
// 取得Key认证文件
var serviceAccount = require("./myfirebase-fabd1-firebase-adminsdk-oubef-09839ee16c.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
// 数据库对象
let db = admin.firestore();
// 服务器时间戳
const FieldValue = admin.firestore.FieldValue;

addData()
// 添加数据
async function addData() {
    for (i = 1; i <= 5; i++) {
        const res = await db.collection('users').add({
            name: '用户' + i,
            sex: i % 2 == 0 ? '男' : '女',
            regdate: FieldValue.serverTimestamp()
        });
        console.log('Added document with ID: ', res.id);
    }
}

getData()
// 读取数据
async function getData() {
    await db.collection('users').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
            });
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
}

// updData()
// 更新数据
async function updData() {
    const userRef = db.collection('users').doc('RNd4RyaDsHE8fsQr6DV1');
    const res = await userRef.update({
        age: 25,
        upddate: FieldValue.serverTimestamp()
    });
}

// delData()
// 删除数据
async function delData() {
    let deleteDoc = await db.collection('users').doc('RNd4RyaDsHE8fsQr6DV1').delete();
    console.log(deleteDoc)
}