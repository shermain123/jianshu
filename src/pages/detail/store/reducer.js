import { fromJS } from "immutable";

const dafaultState = fromJS({
    title: '',
    content:''
})

export default (state = dafaultState,action) => {
    switch (action.type) {
        case 'change_datile':
            return state.merge({
                title:action.title,
                content:action.content
            })
    
        default:
            return state;
    }
}