import React, {useEffect, useState} from 'react';
import styled, { ThemeProvider } from 'styled-components'
//import { Parallax, Background } from 'react-parallax';





import { Link } from 'react-router-dom';

import redX from '../../assets/images/redX'
import userIcon from '../../assets/images/signup2'
import greenCheck from '../../assets/images/greenCheck'
import dummy_avatar from '../../assets/images/dummy_avatar'

import { Card, Logo, Form, Input, Button, ErrorMsg, RedX, LoginWrapper, 
  InputIcon, LogoWrapper, H2, FormItem, Label, ErrorWrapper} from './AuthForm';

import axios from 'axios'
import $ from 'jquery';

import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

var Spinner = require('react-spinkit');
//var randomColor = require('randomcolor');

const HomeWrapper = styled.div`

  padding: 45px 0px;
  //background-image: url(${crew});
  //background-size: cover;
    

`;







  
///////////////////////////////////  HANDLE_CHANGE /////////////////////////////
function handleChange(event){

  //const value = event.target.value;
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  //const value = target.type === 'checkbox' ? !event.target.checked : event.target.value;
  
  setState({
    ...state,
    [name]: value
  });

}

function handleImageChange(e){

  formData.append('user[avatar]', e.target.files[0]);
  
    setState({
      ...state,
      avatar: URL.createObjectURL(event.target.files[0])
    })
  
  //if (e.target.files[0]) setState({ ...state, avatar: e.target.files[0] });
}

  
const ProfilePicWrapper = styled.div`

    position: relative;


`;

const ProfilePic = styled.img`
  
  border-radius: 50px;
  border: 1px gray solid;
  position: relative;
  width: 70px;
  height: 70px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  


`;

const LabelForFile = styled.label`
    
  text-align: center;
  display: inline-block;
  font-size: 12px;
  position: absolute;
  right: -15px;
  bottom: -13px;
  z-index: 5;
  border-radius: 50px;
  //background-color: orange;
  padding: 5px;
  margin: 0 auto;

  //background-color: orange;
  cursor: pointer;
  
  &:hover{
    //background-color: #fce1b3;

  }
  
  
  `;

const Span = styled.h4`

  font-size: .5em;
  padding: 5px 12px;
  margin-right: 5px;
  
  //transition: opacity 2s ease-in;
  
            

`;

const StatusSpinner = styled.div`
  
  max-height: ${ props => props.showStatusSpinner.toString() == "true" ? "100%" : "0px"};
  opacity: ${ props => props.showStatusSpinner.toString() == "true" ? "1" : "0"};
  transition: opacity .4s;
  transition-timing-function: ease-out;

`;

const formData = new FormData();
///////////////////////////////////  SIGN_UP_PAGE //////////////////////////////



function Signup(props) {
  
    

  //const {section2ScrollToRef} = ref

  const [state, setState] = React.useState({
    full_name: "",
    full_nameFieldActive: false,
    
    email: "",
    emailFieldActive: false,
    
    password: "",
    passwordFieldActive: false,
  
    opt_in: false,
    
    status: "",

    showErrorBackground: false,
    
    errors: {},
    color: "#45B5644",
    isBtnDisabled: false,
    showStatusSpinner: false,
    waitMessage: ""
  })



  useEffect(() => {



    let homeWrapper = document.querySelectorAll(".homeWrapper");
    let formItem = document.querySelectorAll(".formItem");
    let formWrapper = document.querySelectorAll(".formWrapper");
    
    let tl = gsap.timeline({
         
      duration: ".1",
      scrollTrigger: {
        //markers: {startColor: "green", endColor: "red", fontSize: "12px"},
        trigger: homeWrapper,
        start: "25% 87%",
        end: "bottom bottom",
        toggleActions: "play none none none",
      }
    });

    tl.from(formWrapper, 
        
      {
        
        opacity: 0,
        
        
        
        
      });  

    tl.from(formItem, 
        
      {
        x: 100,
        opacity: 0,
        ease: "back",
        stagger: 0.1
        
        
      },"<.1");

      





  },[]);

  const validForm = () => {
    if (state.full_name ) {
      return true;
    } else {
      return true;
    }
  }

  const handleChange = (e) => {

    

    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    console.log("TARGET_CHECKED " + target.checked.toString())
    console.log("TARGET_VALUE " + target.value.toString())
    //const value = target.type === 'checkbox' ? !event.target.checked : event.target.value;
    setState({
      ...state,
      [name]: value
    });
  

}


    //const value = event.target.value;

    

  

  
  ////////////////////// Handlev Submit V2 //////////////////////////
const handleAdd = e => {
    
  e.preventDefault();

  setState({
    ...state,
    status: "",
    errors: {},
    showErrorBackground: true,
    waitMessage: "...one moment",
    showStatusSpinner: true,
    isBtnDisabled: true
  });
    
  if (validForm()) {


    
    
    formData.append('user[full_name]', state.full_name);
    
    formData.append('user[email]', state.email);
    formData.append('user[password]', state.password);
    formData.append('user[opt_in]', state.opt_in);
    
    

    console.log("formdata from handle add");
    console.log(formData);

    
    //get token for form submission
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");  
      
    $.ajax({
      
      url: '/registrations',
      headers: {
        
        'X-CSRF-Token': csrf
      },
      method: 'POST',
      data: 
        formData,
        contentType: false,
        processData: false
          
        
      ,
      success: function(response) {
        //props.handleAdd(data);


      if (response.status === "green"){

        setState({
          ...state,
          //focussed: (props.focussed) || false,
          full_name: "",
          full_nameFieldActive: false,
         
          email: "",
          emailFieldActive: false,
          password: "",
          passwordFieldActive: false,
          
          opt_in: false,
          showErrorBackground: true,
          status: response.status,
          
          errors: response.error
          
        });
          
          
      
          
          props.handleSuccessfulAuth(response)
          //props.history.push("/")
        
        }else{
          
          //update error state
          setState({
            ...state,
            showErrorBackground: true,
            status: response.status,
            errors: response.error
          });
        }
        
  
      },
      error: function(xhr, status, error) {
        //alert('Message did not reach server: ', error);
      }
    })
  } else {
    //alert('Please fill all fields.');
  }
}
  

      




       
  
  ///////////////////////////////////  SETUP ERRORMESSAGES //////////////////////
  let errorMessages = [];
      

  if (state.errors){

    if (state.errors.success) {
      errorMessages.push(<ErrorMsg> {state.errors.success[0]} </ErrorMsg>)
    }
      
    if (state.errors.auth) {
      errorMessages.push(<ErrorMsg> {state.errors.auth[0]} </ErrorMsg>)
    } 

    if (state.errors.password) {
      errorMessages.push(<ErrorMsg> {"Password " + state.errors.password[0]} </ErrorMsg>)
    } 

    if (state.errors.password_confirmation) {
      errorMessages.push(<ErrorMsg> {"Confirmation " + state.errors.password_confirmation[0]} </ErrorMsg>)
    } 

    if (state.errors.green) {
      errorMessages.push(<ErrorMsg> {state.errors.green} </ErrorMsg>)
    }
  }

  // to activate the input field while typing
  function activateField(e) {
    
    setState({
      ...state,
      [e.target.name+"FieldActive"]: true
    })
  }

  

  // to deactivate input only if it's empty
  function disableField(e) {
    if (e.target.value === "") {
      setState({
        ...state,
        [e.target.name+"FieldActive"]: false
      })
    }
  }
  
  
  


  return (
            
         
    <HomeWrapper className="homeWrapper" >
          
      <LoginWrapper>

        <div>

          <img style={{width: "50px"}} src={userIcon}/>
          <h1 style={{color: "#EDEAEA", marginBottom: "30px"}}>Sign Up!</h1>
          <sub style={{color: "#EDEAEA"}}>- Create a free account.</sub><br/>
          <sub style={{color: "#EDEAEA"}}>- Stay Informed with FloridaBlaze updates.</sub><br/>
          <sub style={{color: "#EDEAEA"}}>- Unlimited access to our "take action" tool.</sub>


        </div>
            
        <Card className="formWrapper" >

                
          <Form onSubmit = {handleAdd}>

            <FormItem className="formItem">
                <Label className={state.full_nameFieldActive ? "field-active" : ""}> full name </Label>
                <Input 
                name="full_name" 
                type="text" 
                
                value={state.full_name} 
                onChange={handleChange} 
                onFocus={activateField}
                onBlur={disableField}
                required/>
            </FormItem>

                    
            <FormItem className="formItem">
                <Label className={state.emailFieldActive ? "field-active" : ""}>email</Label>
                <Input 
                name="email" 
                type="email" 
                
                value={state.email} 
                onChange={handleChange} 
                onFocus={activateField}
                onBlur={disableField}
                required/>
            </FormItem>

            <FormItem className="formItem">
                <Label className={state.passwordFieldActive ? "field-active" : ""}>password</Label>
                <Input 
                name="password" 
                type="password" 
                autocomplete="off"
                value={state.password} 
                onChange={handleChange} 
                onFocus={activateField}
                onBlur={disableField}
                required/>
            </FormItem>

            

            
 

            
            <Button className="formItem" type="submit" disabled={state.isBtnDisabled}>Sign Up</Button>
            
            <div  style={{display: "flex", justifyContent: "center"}}>
                
                
                <input
                name="opt_in" 
                type="checkbox" 
                id="opt_in"
                checked={state.opt_in}
                 
                onChange={handleChange} 
                
                />
                
                <h3 style={{marginLeft: "5px", fontSize: ".6em", color: "white"}} htmlFor="opt_in" >Opt In to receive e-mails from FloridaBlaze </h3>
            </div>
          
          </Form>

          
          
          <ErrorWrapper showErrorBackground={state.showErrorBackground}>   
              <Span waitMessage={state.waitMessage}> {state.waitMessage}</Span>     
              <RedX status={state.status} src={state.status === "pink" ? redX : greenCheck}/>
              {errorMessages}

              <StatusSpinner showStatusSpinner={state.showStatusSpinner}>
                  <Spinner name='wave' color='#56c5cc' />
              </StatusSpinner>

          </ErrorWrapper>
        
        </Card>
            
      </LoginWrapper>

    </HomeWrapper>
      
  );  
}










//const Wtf = React.forwardRef(Section2);
export default Signup;

