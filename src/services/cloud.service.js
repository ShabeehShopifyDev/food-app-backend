const ImageKit = require('imagekit'); // Fixed import to standard constructor

const client = new ImageKit({
  publicKey: process.env.IMG_KIT_PUBLIC_KEY,
  privateKey: process.env.IMG_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMG_KIT_URL_ENDPOINT
});

async function uploadVideo(buffer, name) {
  const response = await client.upload({
    file: buffer, 
    fileName: name,
  });

  return response;
}

module.exports = uploadVideo;
