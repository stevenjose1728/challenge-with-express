import { Team } from './team';
import { User } from './user';
export type Movement = {
    userId: number,
    user?: User,
    since: string,
    until: string,
    teamId: number,
    team: Team
}