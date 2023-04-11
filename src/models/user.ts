export type User = {
  chatId: number | string
  username: string
  avatarURL?: string
  wallet?: string | null
}

export function getEmptyUser(): User {
  return {
    chatId: 260316435,
    username: "alefman",
    avatarURL: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
  }
}
export default User
