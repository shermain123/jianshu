import axios from 'axios';
import { fromJS } from "immutable";

const addHomeList = (list, nextPage) => ({
    type: 'add_article_list',
    list: fromJS(list),
    nextPage: fromJS(nextPage)
})

export const getMoreList = (page) => {
    return (dispatch) =>{
        axios.get('/api/homeList.json?page='+page).then((res) => {
            const result = res.data.data;
            //console.log(result)
            dispatch(addHomeList(result,page + 1))
        }).catch((error)=>{

        })
    }
}
//控制回到顶部按钮 显示隐藏
export const toggleToShow = (show) => ({
    type:'toggle_scroll_top',
    show
})