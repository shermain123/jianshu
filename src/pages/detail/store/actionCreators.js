import axios from 'axios'
import { fromJS } from "immutable";

const changeDetail = (title,content) => ({
    type: 'change_datile',
    title,
    content
})

export const getDetail = (id) => {
    return (dispatch)=>{
        axios.get('/api/detail.json?id='+id).then((res) => {
            const result = res.data.data;
            //console.log(result)
            dispatch(changeDetail(result.title,result.content))
        })
    }
}