export interface RegistrationData {
    username: string;
    email?: string;
    password: string;
    phonenumber?: string;
}

export interface SendVerifyCodeData {
    email?: string;
    phonenumber?: string;
}

export interface VerifyData {
    email?: string;
    phonenumber?: string;
    code: number;
}

export interface LoginData {
    email?: string;
    phonenumber?: string;
    password: string;
}

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export interface CreateDownloadData {
    title: string;
    format: string;
    size: number;
    url: string;
}

export interface GetDownloadsData {
    page: number;
    limit: number;
}

export interface DeleteDownloadData {
    id: string;
}

export interface SearchDownloadData {
    term: string
}