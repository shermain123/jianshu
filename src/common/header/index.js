import React,{Component} from 'react';
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actionCreators from './store/actionCreators'
import * as loginCreators from "../../pages/login/store/actionCreators";
import { 
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    Addition,
    Button,
    SearchWrapper
    } from "./style.js";


class Header extends Component{
    constructor(props){
        super(props)
    }
    render (){
        return(
            <HeaderWrapper>
                <Link to='/'>
                    <Logo />
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    {
                        this.props.login ? <NavItem onClick={this.props.logout} className='right'>退出</NavItem> : <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
                    }
                    
                    <NavItem className='right'>
                        <span className="iconfont">&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>
                        {/* CSSTransition 动画效果 */}
                        <CSSTransition
                            in={this.props.focused || this.props.mouseIn}
                            timeout={200}
                            classNames="slide"
                        >
                            <NavSearch
                                className={this.props.focused || this.props.mouseIn ? 'focused' : ''}
                                onFocus={() => { this.props.handleInputFocus(this.props.list)}}
                                onBlur={this.props.handleInputBlur}
                            ></NavSearch>
                        </CSSTransition>
                        <i className={this.props.focused || this.props.mouseIn ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe6cf;</i>
                        {/* 热门搜索 */}
                        {this.getListArea(this.props.focused)}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Link to='/write' >
                        <Button className="writting"><span className="iconfont">&#xe6eb;</span>写文章</Button>
                    </Link>
                    <Button className='reg'>注册</Button>
                </Addition>
            </HeaderWrapper>
        )
    }
    //鼠标移动到搜索框显示热门搜索
    getListArea = () => {
        const { focused, mouseIn, list, page, totalPage } = this.props;
        const newList = list.toJS();//将immutable类型数组转换成js数组
        let pageList = [];
        if(newList.length){
            for (let i = ((page - 1) * 10); i < page * 10; i++) {
                pageList.push(<SearchInfoItem key={i}>{newList[i]}</SearchInfoItem>)
            }
        }
        
        if (focused || mouseIn) {
            {/* 热门搜索 */ }
            return (
                <SearchInfo 
                    onMouseEnter={this.props.handleMouse}
                    onMouseLeave={this.props.handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                    {/* <i className={'iconfont'}>&#xe648;</i> */}
                        <SearchInfoSwitch 
                            onClick={() => { this.props.handleChangePage(page, totalPage, this.spinIcon)}}
                        >
                            <i ref={(icon) => {this.spinIcon = icon}} className='iconfont spin'>&#xe648;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null;
        }
    }
}

//store里的数据映射到props
const mapStateToProps = (state)=>{
    
    return {
        //focused: state.get('header').get('focused')// 应为使用了redux-immutable所以获取数据通过state.get('header').get('focused')方法
        //两种写法上面那种写法也可以
        focused: state.getIn(['header','focused']),
        list: state.getIn(['header','list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        login: state.getIn(['login','login'])
    }
}
//发送 action 到store
const mapDispathToProps = (dispatch)=>{
    return {
        handleInputFocus(list){
            //redux的dispatch默认只能传一个对象参数,而redux-thunk的作用就是使dispatch支持传函数参数
            //这里要在redux中使用axios获取数据所以需要使用redux-thunk技术
            if(list.size === 0){//避免axios多余请求
                dispatch(actionCreators.getList())
            }
            dispatch(actionCreators.searchFocus())
            //没有使用redux-thunk之前
            //dispatch(actionCreators.searchFocus())
        },
        handleInputBlur(){
           
            dispatch(actionCreators.searchBlur())
        },
        handleMouse(){
            dispatch(actionCreators.mouseEnter())
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave())
        },
        handleChangePage(page,totalPage,spin){
            // 获取换一批图标原始角度
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'');
            if(originAngle){
                originAngle = parseInt(originAngle,10);
            }else{
                originAngle = 0;
            }
            // 旋转换一批图标
            spin.style.transform = 'rotate(' + (originAngle + 360 )+'deg)';
            // 当前页数小于总页数 每次换页时+1 否则页数重置为第一页1
            if(page < totalPage){
                dispatch(actionCreators.changePage(page + 1))
            }else{
                dispatch(actionCreators.changePage(1))
            }
        },
        //退出登录
        logout(){
            dispatch(loginCreators.logout())
        }
    }
}

export default connect(mapStateToProps,mapDispathToProps)(Header);