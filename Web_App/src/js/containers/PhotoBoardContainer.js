import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhoto, deletePost, expandPost } from '../actions/index';
import PhotoBoard from '../components/PhotoBoard';
// import cardStyle from '../../style';
// import styled from 'styled-components';

class PhotoBoardContainer extends Component {
  constructor(props){
    super(props);
    this.props.getPhoto();
  }

  render() {
    console.log(this.props);
    return (
      <div className = "Aligner">
        <PhotoBoard
          imageData={this.props.imageData}
          onClick={(id) => {this.props.deletePost(id, this.props.history)}}
          onExpandClick={(id) => {this.props.expandPost(id)}}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { imageData: state.board.imageData };
}

export default connect(mapStateToProps, {getPhoto, deletePost, expandPost})(PhotoBoardContainer);
