"use server"
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


export async function createImageUpload() {
  const timestamp = new Date().getTime()
  const signature = await cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.CLOUD_API_SECRET
  )
  return { timestamp, signature }
}
