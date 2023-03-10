export type User = {
    id: number | string,
    username: string,
    avatar?: string,
    wallet?: string | null,
}

export function getEmptyUser(): User {
    return {
        id: 0,
        username: "svetender",
        avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
    }
}
export default User;