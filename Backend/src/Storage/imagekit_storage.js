const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_PUBLIC_KEY,
  privateKey: process.env.IMAGE_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFiles(file,fileName){
    const upload=await imagekit.upload({
        file:file,
        fileName:fileName
    });
    return upload;
}

module.exports = {
    uploadFiles,
}
