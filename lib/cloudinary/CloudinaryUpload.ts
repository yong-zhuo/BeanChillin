"use client"
import getid from "./getid";

export default async function cloudinaryUpload(file: File) {

  const form = new FormData();
  form.append('file', file);
  form.append('public_id', `${await getid()}`);
  form.append('upload_preset', 'profile_picture')
  const data = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: form,
    }
  ).then(res => res.json()).catch(e => console.log(e));
  return { imageUrl: data.secure_url, imgPublicId: data.publicId };
}
