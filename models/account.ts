import { User } from './user';
export type Account = {
    id?: number,
    name: string,
    userId: number,
    user?: User,
    teamConsultation: string,
    responsableId: number,
    responsable?: User,
    createdAt: string | null,
    updatedAt: string | null,
    deletedAt: string | null
}