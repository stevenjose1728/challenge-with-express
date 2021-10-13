import {User} from '../../models'
type Action = {
    payload: User | null,
    type: 'SET_PLAN' | 'REMOVE_PLAN'
}
export default function(state: User | null = null, action: Action): User | null {
	switch(action.type) {
		case 'SET_PLAN':
            return action.payload;
        case 'REMOVE_PLAN':
            return null;
        default:
        	return state;
	}
}