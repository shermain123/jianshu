import React, { Component,Fragment } from 'react';
import { Link } from "react-router-dom";
import { ListItem,ListInfo,LoadMore } from "../style";
import { connect } from 'react-redux'
import * as actionCreators from '../store/actionCreators'

class List extends Component {

    render() {
        const { list,getMoreList,page } = this.props;
        return (
            <Fragment>
                {
                    list.map((item,index)=>(
                        <Link key={index} to={'/detail/' + item.get('id')}>
                            <ListItem key={index}>
                                <img className='pic' src={item.get('imgUrl')} alt='' />
                                <ListInfo>
                                    <h3 className='title'>{item.get('title')}</h3>
                                    <p className='desc'>{item.get('desc')}</p>
                                </ListInfo>
                            </ListItem>
                        </Link>
                    ))
                }
                <LoadMore onClick={() => getMoreList(page)}>更多文字</LoadMore>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    list: state.getIn(['home','articleList']),
    page: state.getIn(['home','articlePage'])
})
const mapDispatch = (dispatch) => ({
    getMoreList(page){
        dispatch(actionCreators.getMoreList(page))
    }
})
export default connect(mapStateToProps, mapDispatch)(List);