// src/lib/ipfsUpload.js
import axios from 'axios';

const pinFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  
  // Prepare form data
  let data = new FormData();
  data.append('file', file);

  // Set Pinata API key and secret
  const pinataApiKey = 'bc96050224badc8160e8';
  const pinataSecretApiKey = '6e1ae01c8c5da567141a114d11c920c381a9eeca788d91f2f594ab07f75fe6c8';

  // Axios headers
  const headers = {
    pinata_api_key: pinataApiKey,
    pinata_secret_api_key: pinataSecretApiKey,
    "Content-Type": "multipart/form-data"
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data.IpfsHash;  // Return the IPFS hash
  } catch (error) {
    console.error("Error uploading file to IPFS: ", error);
    throw error;
  }
};

export default pinFileToIPFS;
