export interface UserSession{
    _id: string;
    online: boolean
    headerTokenKey: string
    requestTokenKey: string
    headerTokenValue: string
    requestTokenValue: string
    email: string
}