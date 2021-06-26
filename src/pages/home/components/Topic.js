import React, { Component, Fragment } from 'react';
import { TopicWrapper, TopicItem } from '../style'
import { connect } from "react-redux";

class Topic extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <TopicWrapper>
                {this.getTopicLilst()}
            </TopicWrapper>
        )
    }
    getTopicLilst = ()=>{
        const { topicList } = this.props;
        const newList = topicList.toJS();//将immutable类型数组转换成js数组
        return(
            topicList.map((item,index)=>(
                <TopicItem key={index}>
                    <img className="topic-pic" src={item.get('imgUrl')} alt='' />
                    {item.get('title')}
                </TopicItem>
            ))
        )
    }
}
//将store数据映射props
const mapStateToProps = (state) => {
    return {
        topicList:state.getIn(['home','topicList'])
    }
}
// 向store 发送action
const mapDispathToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispathToProps)(Topic);