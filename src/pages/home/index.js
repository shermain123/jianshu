import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Topic from './components/Topic'
import List from './components/List'
import Recomment from './components/Recomment'
import Writer from './components/Writer'
import * as actionCreators from './store/actionCreators'
import { 
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop,
 } from "./style";

class Home extends Component {
    
    // 回到顶部
    handleScrollTop(){
        window.scrollTo(0,0)
    }

    render(){
        return (
            <HomeWrapper>
                {/* 左侧 */}
                <HomeLeft>
                    <img alt='' className='banner-img' alt='' src="//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" />
                    <Topic/>
                    <List/>
                </HomeLeft>
                {/* 右侧 */}
                <HomeRight>
                    <Recomment/>
                    <Writer/>
                </HomeRight>
                {this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop> : null}
            </HomeWrapper>
        )
    }

    componentDidMount(){
        axios.get('/api/home.json').then((res) => {
            //console.log(res)
            const result = res.data.data;
            const action = {
                type: 'change_home_data',
                topicList: result.topicList,
                articleList: result.articleList,
                recommendList: result.recommendList
            }
            //调用 changeHomeData函数向store发送指令
            this.props.changeHomeData(action);
        }).catch((error) => {

        });
        //可以删除 上面axios方法直接调用changeHomeData 在changeHomeData里发送axios请求
        //this.props.changeHomeData();

        //滚动时显示隐藏回到顶部按钮
        this.bindEvents();
    }
    //组件销毁时解绑window事件
    componentWillUnmount(){
        window.removeEventListener('scroll', this.props.changeScrollToShow)
    }

    bindEvents(){
        window.addEventListener('scroll', this.props.changeScrollToShow)
    }
}

const mapStateToProps = (state) => ({
    showScroll: state.getIn(['home','showScroll'])
})

//向store 发送action 指令
const mapDispatch = (dispatch) => ({
    changeHomeData(action){
        //可以将上方的axios方法写到这里并删除上面的axios方法
        // axios.get('/api/home.json').then((res) => {
        //     //console.log(res)
        //     const result = res.data.data;
        //     const action = {
        //         type: 'change_home_data',
        //         topicList: result.topicList,
        //         articleList: result.articleList,
        //         recommendList: result.recommendList
        //     }
        //     //调用 changeHomeData函数向store发送指令
        //     dispatch(action);
        // }).catch((error) => {

        // });
        //向store 发送action
        dispatch(action);
    },

    //滚动时切换回到顶部是否显示
    changeScrollToShow(){
        console.log(document.documentElement.scrollTop)
        if(document.documentElement.scrollTop > 100){
            dispatch(actionCreators.toggleToShow(true))
        }else{
            dispatch(actionCreators.toggleToShow(false))
        }
    }
})
export default connect(mapStateToProps,mapDispatch)(Home);