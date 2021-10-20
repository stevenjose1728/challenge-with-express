import { User } from './user';
export type Account = {
    id?: number,
    name: string,
    userId: number,
    user?: User,
    teamConsultation: string,
    responsableId: number,
    responsable?: User,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null
}