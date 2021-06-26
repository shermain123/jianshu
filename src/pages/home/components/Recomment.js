import React, { Component } from 'react';
import { connect } from "react-redux";
import { 
    RecommentWarpper,
    RecommentItem
 } from "../style";

class Recomment extends Component {

    render() {
        return (
            <RecommentWarpper>
                {
                    this.props.list.map((item) => (
                        <RecommentItem key={item.get('id')} imgUrl={item.get('imgUrl')} />
                    ))
                }
                
            </RecommentWarpper>
        )
    }
}

const mapStateToProps = (state) => ({
    list: state.getIn(['home','recommendList'])
})

export default connect(mapStateToProps,null)(Recomment);