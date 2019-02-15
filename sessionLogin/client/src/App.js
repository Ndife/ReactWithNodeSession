import React, { Component } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import './App.css';

import {getFromStorage} from './utils/storage';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      token: '',
    }
  }

  storageCheck(){
    const obj = getFromStorage('the_main_app');
      if(obj && obj.token){
      const {token} = obj;
        // verify token 
        fetch(`/users/verify?token=${token}`)
        .then(res => res.json())
        .then(json => {
          if(json.success){
            this.setState({
              token,
              isLoading: false
            });
          }else {
            this.setState({
              isLoading: false,
            })
          }
        })
      }else {
        this.setState({ 
          isLoading: false
      })
    }
  }

  componentDidMount(){
    this.storageCheck();
  }

  render() {
    const {isLoading,token} = this.state;
    if (isLoading) {
      return <div><p>Loading....</p></div>
    }
    if(!token){
      return (
        <div>
          <SignIn onTokenUpdate = {token => this.setState({token})}/>
          <SignUp/>
        </div> 
      )
    }
    return (
      <div>
        <SignOut onTokenUpdate = {token => this.setState({token})}/>
      </div>
    );
  }
}

export default App;
