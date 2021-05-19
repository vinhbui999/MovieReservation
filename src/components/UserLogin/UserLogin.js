import React, { Component } from 'react';
import '../UserLogin/UserLogin.scss';
import { connect, Provider } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import firebase from 'firebase'
import firebaseConfig from "../../firestore"

import toggleLogInStatus from '../../actions/authenticationActions/toggleLogInStatus';
class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: this.props.logInStatus,
      photo: null,
      displayName: null
    }
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseConfig
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler(user)
      }
    });
  }
  authHandler = async authData => {
    console.log('User', authData.user);
    const user = await authData.user;
    if (user !== undefined) {
      localStorage.setItem('displayName', user.displayName)
      localStorage.setItem('photo', user.photoURL)
      localStorage.setItem('uid', user.uid)
    }
    this.setState({
      isLogin: true,

    });
    if (this.state.isLogin === true) {
      const db = await firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      db.collection("user").doc(localStorage.getItem('uid')).set(
        {}
      )
      this.props.toggleLogInStatus({ status: 'APPROVE' })
      this.props.history.push({ pathname: '/profile', state: { isLogin: this.state.isLogin, photo: this.state.photo, displayName: this.state.displayName } })
    }
  };


  render() {
    return (
      <div className="user-log-in">

        <div className="user-log-in-container">
          <header className="user-log-in-container-header">
            <div style={{
              position: "absolute",
              left: "20px",
              top: "20px"
            }}
            >
              <NavLink to="" onClick={() => this.props.history.push('/')}>
                <svg
                  className="item-details-header-info-nav__icon wow fadeInLeft"
                  data-wow-delay=".2s"
                  data-wow-duration="2s"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  style={{
                    visibility: "visible",
                    animationDuration: "2s",
                    animationDelay: "0.2s",
                    animationName: "fadeInLeft"
                  }}
                >
                  <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
                </svg>
              </NavLink>
            </div>
            <img className="user-log-in-container-header__logo" src="http://www.demo.gloriathemes.com/wp/themovie/wp-content/themes/themovie/assets/img/logo-alternative.png" alt="logo" />
            <h1 className="user-log-in-container-header__title">Log In</h1>
          </header>

          <div className="user-log-in-container-content">
            <a href="#">
              {/* <button className="user-log-in-container-content__button" ><span className='login'>Log In</span> <span className='reply'>This feature we have not done yet</span></button> */}
              <button className="user-log-in-container-content__button" onClick={() => this.authenticate("Facebook")}>Log In</button>

            </a>
          </div>
        </div>

        <div className="user-log-in-side-image">
          <h2 className="user-log-in-side-image__title">Browse and rate your favorite shows</h2>
        </div>

      </div>
    )
  }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  toggleLogInStatus: status => dispatch(toggleLogInStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
