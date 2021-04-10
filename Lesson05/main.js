var uuid = require('uuid-v4');
var admin = require("firebase-admin");
var serviceAccount = require("./myfirebase-fabd1-firebase-adminsdk-oubef-09839ee16c.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://myfirebase-fabd1.appspot.com/"
});
var bucket = admin.storage().bucket();

// 文件上传
async function uploadFile(filename) {
    await bucket.upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        // destination: 'thisisaimage.jpg',
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: uuid()
            },
            // contentType: 'image/png',
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
    });
    // await bucket.file('portrait_brock.png').makePublic();
    console.log(`${filename} uploaded.`);
}
uploadFile('./bea.png').catch(console.error);

// 文件下载
async function downloadFile(srcFilename, destFilename) {
    const options = {
        // The path to which the file should be downloaded, e.g. "./file.txt"
        destination: destFilename,
    };
    // Downloads the file
    await bucket.file(srcFilename).download(options);
    console.log(
        `${srcFilename} downloaded to ${destFilename}.`
    );
}
downloadFile('bea.png', 'dl.png').catch(console.error);

// 文件列表
async function listFiles() {
    // Lists files in the bucket
    const [files] = await bucket.getFiles();
    console.log('Files:');
    files.forEach(file => {
        console.log(file.name);
    });
}
listFiles().catch(console.error);

// 文件删除
async function deleteFile(filename) {
    // Deletes the file from the bucket
    await bucket.file(filename).delete();

    console.log(`${filename} deleted.`);
}
deleteFile('bea.png').catch(console.error);