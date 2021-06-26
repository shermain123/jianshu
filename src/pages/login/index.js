import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreators from "./store/actionCreators";
import { 
    LoginWrapper,
    LoginBox,
    Input,
    Button,
 } from "./style";

class Login extends PureComponent{
    
    render(){
        const { loginStates} = this.props
        if (!loginStates){
            return (
                <LoginWrapper>
                    <LoginBox>
                        <Input placeholder="账号" innerRef={(input) => { this.account = input }} />
                        <Input placeholder="密码" innerRef={(input) => { this.password = input }} type="password" />
                        <Button onClick={() => this.props.login(this.account, this.password)}>登录</Button>
                    </LoginBox>
                </LoginWrapper>
            )
        }else{
            //重定向到首页
            return <Redirect to='/' />
        }
        
    }
}

const mapStateToProps = (state) => ({
    loginStates : state.getIn(['login','login'])
})

const mapDispatch = (dispatch) => ({
    login(accountElement,passwordElement){
        dispatch(actionCreators.login(accountElement.value, passwordElement.value))
    }
})

export default connect(mapStateToProps,mapDispatch)(Login)