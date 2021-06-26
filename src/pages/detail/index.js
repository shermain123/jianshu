import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "./store/actionCreators";

import { 
    DetailWrapper,
    Header,
    Content
 } from "./style";

class Detail extends Component {
    render() {
        const { title,content } = this.props;
        //获取router 传来的参数
        //console.log(this.props.match.params.id)
        return (
            <DetailWrapper>
                <Header>{title}</Header>
                <Content dangerouslySetInnerHTML={{__html:content}} />
            </DetailWrapper>
        )
    }
    componentDidMount(){
        this.props.getDetail(this.props.match.params.id);
    }
}
const mapStateToProps = (state) => ({
    title: state.getIn(['detail','title']),
    content: state.getIn(['detail','content'])
})
const mapDispatch = (dispatch)=> ({
    getDetail(id){
        dispatch(actionCreators.getDetail(id))
    }
})
export default connect(mapStateToProps,mapDispatch)(Detail);