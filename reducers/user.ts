import {User} from '../models'
type Action = {
    payload: User | null,
    type: 'SET_USER' | 'REMOVE_USER'
}
function reducer(state: User | null = null, action: Action): User | null {
	switch(action.type) {
		case 'SET_USER':
            return action.payload;
        case 'REMOVE_USER':
            return null;
        default:
        	return state;
	}
}

export default reducer