import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Card, CardHeader, ListItem, Divider } from 'material-ui';
import AccountIcon from 'material-ui/svg-icons/social/person';

const style = {margin: 5};
const Comments = (props) => (
  <div>
    {console.log(props)}
    {props.commentsData.map((d, index) =>
      <div key={`d-${index}`}>
        <Divider/>
        <CardHeader
          title={d.userName}
          subtitle={d.content}
          avatar={<AccountIcon/>}
        />
        {/* <ListItem
          disabled = {true}
          leftAvatar = {
            <Avatar
              icon ={<AccountIcon/>}
              size={30}
              style={style}
            />
          }
        >
          {d.userName}
        </ListItem>
        <p>{d.content}</p> */}
        {/* <Divider/> */}
      </div>
    )}
  </div>
)

export default  Comments;
