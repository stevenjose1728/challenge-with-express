import { ROLES } from 'utils';
export type User = {
    name: string,
    email: string,
    id?: number,
    role: typeof ROLES.admin | typeof ROLES.user,
    isAdmin?: boolean
}