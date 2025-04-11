export interface User {
    name: string    
    mail: string
    password: string
    id: string
    role?: 'admin' | 'user';
}
