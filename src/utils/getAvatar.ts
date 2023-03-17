const getAvatar = async (userId: number) => {
  const token = import.meta.env.VITE_BOT_ACCESS_TOKEN
  const response = await fetch(`https://api.telegram.org/bot${token}/getUserProfilePhotos?user_id=${userId}&limit=1`)
  const data = await response.json()
  const photo = data.result.photos[0]
  const fileId = photo[photo.length - 1].file_id
  const response2 = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`)
  const data2 = await response2.json()
  return `https://api.telegram.org/file/bot${token}/${data2.result.file_path}`
}

export default getAvatar
