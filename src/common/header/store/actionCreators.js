import axios from "axios";
import { fromJS } from "immutable";

export const searchFocus = () => ({
    type: 'search_focus'
});
export const searchBlur = () => ({
    type: 'search_blur'
})
export const mouseEnter = () => ({
    type: 'mouse_enter'
})
export const mouseLeave = () => ({
    type: 'mouse_leave'
})
export const changePage = (page) => ({
    type: 'change_page',
    page:page
})
export const getList = ()=>{
    //使用redux-thun可以返回一个函数
    return (dispatch) => {
        axios.get('/api/headerList.json').then((res) => {
            const data = res.data;
            const action = {
                type: 'change_list',
                data: fromJS(data.data),// 应为store里存的是immutable类型 所以将数组类型转换成immutable类型
                totalPage: Math.ceil(data.data.length / 10)
            }
            // 将数据派发给store
            dispatch(action)
        }).catch(() => {
            console.log('error')
        })
    }
}
