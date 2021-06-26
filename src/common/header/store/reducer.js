import { fromJS } from "immutable";
// 使用immutable使store里的值不能改变，使用immutable中提供的方法来管理store
// fromJS 将js对象转化成为immutable对象
const defaultState = fromJS({
    focused: false,
    mouseIn:false,
    list:[],
    page: 1,
    totalPage: 1
})
export default (state = defaultState, action) => {
    // immutable对象的set方法，会结合之前的immutable对象的值
    // 和设置的值，返回一个全新的对象
    switch (action.type) {
        case 'search_focus':
            return state.set('focused', true);
        case 'search_blur':
            return state.set('focused', false);
        case 'change_list':
            // immutable中merge方法可以同时改变多个store值
            return state.merge({
                list:action.data,
                totalPage: action.totalPage
            })
        case 'mouse_enter':
            return state.set('mouseIn',true)
        case 'mouse_leave':
            return state.set('mouseIn',false);
        case 'change_page':
            return state.set('page',action.page)
        default:
            return state;
    }
}