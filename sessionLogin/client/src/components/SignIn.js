import React, {Component} from 'react';
import { setInStorage } from '../utils/storage';
class SignIn extends Component{
    state ={
        isLoading: false,
        token: '',
        signInEmail: '',
        signInPassword: '',
        signInError: '',
    }

    onTextBoxChangeSignIn = event =>{
        this.setState({[event.target.name]: event.target.value})
    }

      onSignIn = ()=>{
        // Grab the state
        const { 
          signInEmail,
          signInPassword,
          } = this.state;
          this.setState({
            isLoading: true
          })
        // Post request to backend
        fetch('/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: signInEmail,
            password: signInPassword,
          })
        })
        .then(res => res.json())
        .then(json => {
          if(json.success){
            setInStorage('the_main_app', {token:json.token})
            this.setState({
              signInEmail: '',
              signInPassword: '',
              token: json.token,
              signInError: json.success,
              isLoading: false,
            })
            this.props.onTokenUpdate(json.token)
           
          }else {
            this.setState({
              signInError: json.message,
              isLoading: false,
            })
    
          }
        })
      }

    render(){
        const {isLoading,signInError,signInEmail,signInPassword} = this.state
        if (isLoading) {
            return <div><p>Loading....</p></div>
          }
            return(
                <form onSubmit={this.onSignIn}>
                    {
                    (signInError)?(
                        <p>{signInError}</p>
                    ): (null)
                    }
                    <p>Sign In</p>
                        <input 
                        type='email' 
                        placeholder='Email' 
                        value={signInEmail}
                        name="signInEmail"
                        onChange = {this.onTextBoxChangeSignIn}
                    />
                    <br />
                    <input 
                        type='password' 
                        placeholder='password' 
                        value={signInPassword}
                        name="signInPassword"
                        onChange = {this.onTextBoxChangeSignIn}
                    />
                    <br />
                    <button>Sign In</button>
                    <br /><br />
                </form>
            )
    }
}



export default SignIn;