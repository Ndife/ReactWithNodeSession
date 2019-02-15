import React, {Component} from 'react';

class SignUp extends Component{
    state ={
        isLoading: false,
        signUpError: '',
        signUpFirstName: '',
        signUpLastName: '',
        signUpEmail:'',
        signUpPassword:'',
    }

    onTextBoxChangeSignUp = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    onSignUp = () =>{
        // Grab the state
        const {
          signUpFirstName,
          signUpLastName,
          signUpEmail,
          signUpPassword
        } = this.state;
    
        this.setState({
          isLoading: true
        })
        // Post request to backend
        fetch('/users/addUser',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstname: signUpFirstName,
            lastname: signUpLastName,
            email: signUpEmail,
            password: signUpPassword
          }),
        })
        .then(res => res.json())
        .then(json => {
          if(json.success){
            this.setState({
              signUpError: json.success,
              isLoading: false,
              signUpFirstName: '',
              signUpLastName: '',
              signUpEmail: '',
              signUpPassword: ''
            })
          }else {
            this.setState({
              signUpError: json.message,
              isLoading: false
            })
          }
          
        })
      }

    render(){
        const {
            isLoading, 
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword,
            signUpError} = this.state;
            
          if (isLoading) {
            return <div><p>Loading....</p></div>
          }
          
            return (
                <div>
                    {
                    (signUpError)?(
                        <p>{signUpError}</p>
                    ): (null)
                    }
                    <p>Sign up</p>
                    <input 
                    type='text' 
                    placeholder='First Name' 
                    value={signUpFirstName}
                    name="signUpFirstName"
                    onChange = {this.onTextBoxChangeSignUp}
                    />
                    <br />
                    <input 
                    type='text' 
                    placeholder='Last Name'
                    value={signUpLastName}
                    name="signUpLastName"
                    onChange = {this.onTextBoxChangeSignUp}
                    />
                    <br />
                    <input 
                    type='email' 
                    placeholder='Email' 
                    value={signUpEmail}
                    name="signUpEmail"
                    onChange = {this.onTextBoxChangeSignUp}
                    />
                    <br />
                    <input 
                    type='password' 
                    placeholder='password' 
                    value={signUpPassword}
                    name="signUpPassword"
                    onChange = {this.onTextBoxChangeSignUp}
                    />
                    <br />
                    <button onClick={this.onSignUp}>Sign Up</button>
                </div>
            )
    }
}



export default SignUp;