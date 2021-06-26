import axios from "axios";
import { fromJS } from "immutable";

const changeLogin = () => ({
    type: 'change_login',
    value: true
})

export const logout = () => ({
    type: 'logout',
    value: false
})

export const login = (account,password)=>{
    return (dispatch) => {
        axios.get('/api/login.json?account=' + account +"&password=" + password).then((res)=>{
            const result = res.data.data;
            if(result){
                dispatch(changeLogin())
            }else{
                alert('登录失败!')
            }
        })
    }
}
