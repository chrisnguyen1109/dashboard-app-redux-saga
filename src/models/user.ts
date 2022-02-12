export interface User {
    id: string | number;
    displayName: string;
    accessToken?: string;
}

export interface UserRequest {
    email: string;
    password: string;
}
