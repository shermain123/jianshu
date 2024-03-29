import { fromJS } from "immutable";

const defaultState = fromJS({
   login:false
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'change_login':
            return state.set('login', action.value)
        case 'logout':
            return state.set('login', action.value)
        default:
            return state;
    }
}