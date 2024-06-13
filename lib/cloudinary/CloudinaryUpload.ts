"use client"

import postimage from "./postimage";

interface Info {
  email?: string,
  public_id?: string,
  groupName?: string
}

type groupUploadType = 'groupPicture' | 'banner'

export default async function cloudinaryUpload(file: File | undefined, info: Info) {

  if (file === undefined) {
    return;
  }
  const form = new FormData();
  form.append('file', file);
  form.append('public_id', `${info.public_id}`);
  form.append('upload_preset', 'profile_picture')
  const data = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: form,
    }
  ).then(res => res.json()).catch(e => console.log(e));

  await postimage({ imageUrl: data.secure_url, imagePublicId: data.public_id, email: info.email }, 'userImage')
}

export async function groupCloudUpload(file: File | undefined, groupName:string, groupUploadType: groupUploadType) {

  if (file === undefined) {
    return;
  }
  const form = new FormData();
  form.append('file', file);
  form.append('public_id', `${groupName + groupUploadType}`);
  form.append('upload_preset', 'group_picture')
  const data = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: form,
    }
  ).then(res => res.json()).catch(e => console.log(e));

  await postimage({ imageUrl: data.secure_url, groupName: groupName }, groupUploadType)
}
