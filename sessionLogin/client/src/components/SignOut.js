import React, { Component } from 'react';
import { getFromStorage,emptyStorage} from '../utils/storage';

class SignOut extends Component{
    state ={
        isLoading: false
    }
      
  onSignOut = () =>{
    this.setState({
      isLoading: true
    })
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token){
        const {token} = obj;
        fetch(`/users/signOut?token=${token}`)
        .then(res => res.json())
        .then(json => {
            if(json.success){
                emptyStorage('the_main_app')
                this.setState({
                    token: '',
                    isLoading: false
                });
                this.props.onTokenUpdate('')
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

  render(){
    return (
        <div>
          <p>Account</p>
          <button onClick={this.onSignOut}>Sign Out</button>
        </div>
      );
  }
}

export default SignOut;