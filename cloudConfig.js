import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Very easy, syntax is available in the documentation. 
// Just import the cloudinary and cloudinary storage, then configure the cloudinary with your credentials 
// Create a new instance of CloudinaryStorage with the cloudinary instance and the folder name where you want to store your images.

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Kintsuji_DEV',
    },
});

export { cloudinary, storage };