import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Write extends PureComponent {

    render() {
        const { loginStates } = this.props
        if (loginStates) {
            return (
                <>
                    写文章
                </>
            )
        }else{
            return <Redirect to="/login" />
        }
        
    }
}

const mapStateToProps = (state) => ({
    loginStates: state.getIn(['login', 'login'])
})


export default connect(mapStateToProps, null)(Write)