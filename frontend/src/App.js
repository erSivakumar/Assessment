import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { NotificationManager } from 'react-notifications';

class App extends Component {
  
    
    constructor(){
        super();
        this.state={
            value1:"",
            value2:"",
            userName :"" 

        }
        this.handleChange0=(event)=>{
          this.setState({
            userName:event.target.value
          })
        }

        this.handleChange1=(event)=>{
            this.setState({
                value1:event.target.value
            })
        }
        
        this.handleChange2=(event)=>{
            this.setState({
                value2:event.target.value
            })              
        }

        this.handleSubmit = async (event)=>{
          event.preventDefault();
          let userName = event.target.userName.value
          let Password = event.target.Password.value
          let ConfirmPassword = event.target.ConfirmPassword.value
          console.log("==this.value1 ",event.target.userName.value,Password);
          console.log("==this.value1 ",event.target.Password.value);
          console.log("==this.value2 ",event.target.ConfirmPassword.value);
          console.log("==this.value2 3",Password.match(/(\w)\1{2,}/),Password,Password.length);
          if(userName === "" || Password === "" || ConfirmPassword === "") {
            alert("Must fill all the values!")
            return;
          }
          if(Password.length < "6")
          {
            alert("At least 6 and at most 20 characters!")
            return;
          }
          if(Password.match(/(\w)\1{2,}/))
          {
            alert("It does not contain three repeating characters!")
            return;
          }
          
          if(!Password.match(new RegExp(/[A-Z]/)))
          {
            alert("At least 1 uppercase letter!")
            return;    
          }
          if(!Password.match(/[a-z]/))
          {
            alert("At least 1 lowercase letter!")
            return;   
          }
          if(!Password.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/))
          {
            alert("At least 1 number or special character!")
            return;  
          }
          if(Password.length > "20")
          {
            alert("At least 8 and at most 20 characters!")
            return;    
          }
          if(Password !== ConfirmPassword) {
            alert("Passwords is not match!")
            return;
          }
          let bodyData = {
            userName :userName,
            password : Password
          }
          let result = await fetch('http://localhost:5000/register', {
                method: "post",
                body: JSON.stringify(bodyData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json();
            if(result.status) {
              event.target.userName.value = ""
              event.target.Password.value = ""
              event.target.ConfirmPassword.value = ""
            }
            NotificationManager.info(result.message, 'Info!', 4000);
            console.log(result);

      }
        
    }
     
  render() {
      
      let colour1="red",colour0="orange",colour2="red",colour3="red",colour4="red",colour5="red";
      if(this.state.value1.length >= "6")
      {
          colour1="green";
      }
      if(this.state.value1.match(/(\w)\1{2,}/))
      {
        colour0="red";  
      }
      if(this.state.value1.match(/[A-Z]/))
      {
          colour2="green";    
      }
      if(this.state.value1.match(/[a-z]/))
      {
          colour3="green";    
      }
      if(this.state.value1.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/))
      {
          colour4="green";    
      }
      if(this.state.value1.length > "20")
      {
          colour1="red";    
      }
      if(this.state.value1 === this.state.value2 && this.state.value1!=="" )
      {
          colour5="green";    
      }
      
      
      const style={
          boxShadow:"2px 2px 3px 3px #ccc",
          border:"2px #eee",
          padding:"20px",
          marginTop:"25px"
      }
           
    return (
        
    <div className="container"> 
    <div className="row">
    <div className="col-md-3"></div>
    <div className="col-md-6">
    <div style={style}>
    <form onSubmit={this.handleSubmit}> 
          <h5><p style={{fontWeight:"bold"}}>Password must have:</p></h5>
          <p><i style={{color:colour1,fontSize:"20px"}} className="fa fa-check-circle" aria-hidden="true"></i> At least 6 and at most 20 characters</p>
          <p><i style={{color:colour2,fontSize:"20px"}} className="fa fa-check-circle" aria-hidden="true"></i> At least 1 uppercase letter</p>
          <p><i style={{color:colour0,fontSize:"20px"}} className="fa fa-check-circle" aria-hidden="true"></i> It does not contain three repeating char's</p>
          <p><i style={{color:colour3,fontSize:"20px"}} className="fa fa-check-circle" aria-hidden="true"></i> At least 1 lowercase letter</p>
          <p><i style={{color:colour4,fontSize:"20px"}} className="fa fa-check-circle" aria-hidden="true"></i> At least 1 number or special character</p>
          <p><i style={{color:colour5,fontSize:"20px"}} className="fa fa-check-circle" aria-hidden="true"></i> Password === Confirm Password</p>
          <div className="form-group">
            <label for="userName">UserName</label>
            <input type="text" className="form-control" name="userName" value={this.state.userName} onChange={this.handleChange0} placeholder="UserName"/>
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input type="text" className="form-control" name="Password" value={this.state.value1} onChange={this.handleChange1} placeholder="Password"/>
          </div>
          <div className="form-group">
            <label for="password">Confirm Password</label>
            <input type="text" className="form-control" name="ConfirmPassword" value={this.state.value2} onChange={this.handleChange2} placeholder="Confirm Password"/>
          </div> 
         {this.state.value2 === "" ? "" :
         (this.state.value1 === this.state.value2  ? <p style={{color:"green",fontWeight:"bold"}}> Passwords match </p> :
         <p style={{color:"red",fontWeight:"bold"}}> Passwords not match </p>
          )}
          <div><input type="submit" value="Submit" className="btn btn-success submit_btn"/></div>
    </form>
    </div>
    </div>
    <div className="col-md-4"></div>
    </div>
    <NotificationContainer />
    </div>
  
    );
  }
}

export default App;
