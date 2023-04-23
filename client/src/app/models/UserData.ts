export interface UserData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}
export interface LoginData {
    username: string;
    password:string;
}

export interface UserToken {
    accessToken: string;
}

export interface User {
    exp: number;
    iat: number;
    sub: string;
    token?: string;
}