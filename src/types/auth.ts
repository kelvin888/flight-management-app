export type LoginData = {
    email: string
    password: string
}

export type RegistrationData = {
    name: string,
    email: string,
    password: string
}

export type AuthData = {
    email: string
    id: string
    name: string
    refreshToken: string
    token: string
}

export type AuthResponse = {
    data: AuthData
}