import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {AppBar, FlatButton, IconMenu, MenuItem, Divider} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Camera from 'material-ui/svg-icons/image/camera-alt';
import PhotoUpload from 'material-ui/svg-icons/image/add-a-photo';
import { signOutAction } from '../../actions/auth';
import { openIconMenu } from '../../actions/index';

const styles = {
  AppBarStyle:{
    position:"fixed"
  },
  verticalAlign: {
    verticalAlign: "middle"
  },
  titleStyle: {
    fontWeight: 300
  }
}

class Navbar extends Component {
  submit = () => {
    this.props.signOutAction();
  }

  handleOpen = () => {
    this.props.openIconMenu();
  }

  render() {
    const Login = () => (
      <div>
        <FlatButton label="SIGN IN" containerElement={<Link to="/signin"/>}/>
        <FlatButton label="SIGN UP" containerElement={<Link to="/signup"/>}/>
      </div>
    )
    const Logged = () => (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><AccountCircle/></IconButton>}
          open={this.props.open}
          onRequestChange={this.handleOpen}
        >
          <MenuItem value="1" primaryText={localStorage.userName} leftIcon={<AccountBox/>} disabled={true}/>
          <Divider/>
          <NavLink to="/uploadphoto" style={{ textDecoration: 'none'}}>
            <MenuItem value="2" primaryText="Upload Photo" leftIcon={<PhotoUpload/>}/>
          </NavLink>
          <MenuItem value="3" primaryText="Sign Out" onClick={()=>{this.submit()}}/>
        </IconMenu>
        {/* <a>
          <AccountCircle style={styles.verticalAlign}/>
          <span style={styles.verticalAlign}>{localStorage.userName}</span>
        </a>

        <NavLink to="/uploadphoto">
        <FlatButton
          label="Upload Photo"
          icon={<PhotoUpload/>}
        />

        <FlatButton
          label="SIGN OUT"
          onTouchTap={()=>{
              this.submit()
          }}
        /> */}
      </div>
    )
    Login.muiName = 'FlatButton';
    Logged.muiName = 'IconMenu';
    // console.log(localStorage);
    console.log(this.props);
    return (
      <nav className="navbar">
        <AppBar
          style={styles.AppBarStyle}
          title={<Link to='/' style={{ textDecoration: 'none', color: 'white' }}>PhotoShare</Link>}
          titleStyle={styles.titleStyle}
          iconElementLeft={<IconButton><Camera /></IconButton>}
          iconElementRight={this.props.authenticated ? <Logged /> : <Login />}
          />
        <br/>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    board: state.board.open
  };
}

export default connect(mapStateToProps, {signOutAction, openIconMenu})(Navbar);
