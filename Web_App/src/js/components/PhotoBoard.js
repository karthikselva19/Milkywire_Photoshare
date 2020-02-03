import React from 'react';
import Comments from './Comments'
import {FlatButton, Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, TextField, Divider} from 'material-ui';
import ReactHtmlParser from 'react-html-parser';
import AccountIcon from 'material-ui/svg-icons/social/person';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const styles = {
  padding: {
    paddingTop: 50,
    paddingBottom: 50,
    width: "50%",
    height: "50%",
  },
  text: {
    width: "75%"
  }
}

const _arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  // console.log(window.btoa( binary ));
  return window.btoa( binary );
}
const deletePost = (post, props) => {
  if (post.userName === localStorage.userName) {
    return <FlatButton label="delete" onTouchTap={()=>{props.onClick(post.no);}}/>
  }
}
const rederComments = (comments) => {
  if(comments.length !== 0){
    return <Comments commentsData={comments}/>
  }
}
const PhotoBoard = (props) => (
  <div style={styles.padding}>
    {props.imageData.map((d) =>
      <div key={`d-${d.no}`}>
        <br></br>
        <Card expanded={d.open}>
          <CardHeader
            title={d.userName}
            subtitle={d.time}
            avatar={<AccountIcon/>}
          />
          <CardMedia>
            <img alt={"img"} src={`data:${d.img.contentType};base64,${_arrayBufferToBase64(d.img.data.data)}`}/>
          </CardMedia>
          <CardTitle title={d.title}/>
          <CardText>
            {ReactHtmlParser(d.info)}
          </CardText>
          <CardActions>
            {/* <FlatButton
              icon={<ChatBubble/>}
              label={d.comments.length}
              onTouchTap={()=>{props.onExpandClick(d.no)}}
            /> */}
            {deletePost(d, props)}
          </CardActions>
          {/* <CardActions expandable={true}>
            {rederComments(d.comments)}
          </CardActions>
          <Divider/>
          <CardActions>
            <TextField
              hintText="Add a comment"
              style={styles.text}
            />
            <FlatButton label="Post"/>
          </CardActions> */}
        </Card>
      </div>
    )}
  </div>
)

export default PhotoBoard;
