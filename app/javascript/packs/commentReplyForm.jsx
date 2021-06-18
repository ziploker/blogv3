import React, {Component, useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import $ from 'jquery';
//import lilDownArrow from '../../../../'
//import '../components/fix.js'
import slugify from 'react-slugify'
import defaultManIcon from '../../assets/images/man3'
import TextareaAutosize from 'react-autosize-textarea';




const Section = styled.section`

    //background: rgb(136,189,188);
    //background: radial-gradient(circle, rgba(136,189,188,1) 0%, rgba(158,190,189,0.9612044646960347) 41%);
    //background: #F7C562;
    //height: 100vh;
    //min-height: 400px;
    position: relative;

`;


const Form = styled.form`

  display: grid;
  //grid-template-columns: 90%;
  grid-gap: 1.5rem;
  
  grid-area: main_comment_body;

  

`;


const FormWrapper = styled.div`

  display: ${props => props.rows[props.commentID] == "true" ? "grid" : "grid"};
  //display: grid;
  grid-template-columns: minmax(min-content, max-content) 1fr;
  grid-template-rows: minmax(50px, 1fr) minmax(min-content, max-content);
  grid-template-areas:

    "main_comment_img      main_comment_body  "
    "main_comment_img     main_comment_buttons";


  margin: 0px 50px 0px 90px;
  //min-height: 100px;
  
  z-index: ${props => props.rows[props.commentID] == "true" ? "1" : "-1"};

  opacity: ${props => props.rows[props.commentID] == "true" ? "1" : "0"};

  height: ${props => props.rows[props.commentID] == "true" ? "initial" : "0px"};
  min-height: ${props => props.rows[props.commentID] == "true" ? "100px" : "0px"};
  

  position: relative;
  top: ${props => props.rows[props.commentID] == "true" ? "7px" : "-100px"};
  left: 0;
  background-color: F4F4F4;
  //padding: 20px;
  //transition: all .2s ease 0s;

  img {
      width: 25px;
      height: 25px;
      grid-area: avatar;
      margin: 1px 10px 0px 0px;
      border-radius: 50%;
      border: 1px solid gray;


     grid-Area: main_comment_img;
      
  }
`;

const OptionWrapper = styled.div`


`;

const CommentInput = styled.input`

  width: 100%;
  height: 100%;
  border: 0;
  
  outline: 0;
  font-size: 1.3rem;
  
  background: white;
  transition: border-color 0.2s;
 

  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;

  word-break: break-word;
  vertical-align: top;


  text-align: start;


  
  


  color: #2a2e2e;
  cursor: text;
  resize: none;
 
  
  
  
  
  
  font-size: 14px;
  overflow-y: scroll;

  overflow-x: hidden;
  
  transition: all .15s ease-in-out;

  
  white-space: pre-line;


`;



const TextareaAutosizei = styled(TextareaAutosize)`


  width: 100%;
  height: 100% !important;
  padding: 10px;


`;


  


const formData = new FormData();



function CommentReplyForm(props) {


  const [state, setState] = React.useState({

    
    comment: '',
    error: ''
    
    //emailIsFocused: false,
    //company: '',
    //companyIsFocused: false,
    //zip: '',
    //zipIsFocused: false,
    //message: '',
    //messageIsFocused: false,
    //error: '',
    //activeIndex: null

  })
    
   
  
  const handleAdd = e => {
    
    e.preventDefault();

    if (validForm()) {

      
     
     
     formData.append('event[body]', state.comment);
     formData.append('event[story_id]', props.storyID);
    formData.append('event[comment_id]', props.commentID);
     formData.append('event[author_nick]', props.userData.nick);
     formData.append('event[author_avatar]', props.userData.avatar_url);
     
     
     

     console.log("formdata from handle add");
     console.log(formData);

      
      //get token for form submission
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");  
      
      $.ajax({
          
        url: '/comments',
        headers: {
          
          'X-CSRF-Token': csrf
        },
        method: 'POST',
        data: 
          formData,
          contentType: false,
          processData: false
            
          
        ,
        success: function(data) {
          //props.handleAdd(data);
          //setState({

            //focussed: (props.focussed) || false,
            //comment: ''
            
          //});

          //props.setState("done")
          
          props.setArtDataComments(data.comments)
          
          setState({...state,comment: ''})

         console.log("saved comment not remove reply box + " + props.commentID)

          props.setRows({...props.rows,[props.commentID]: "false"})
    
        },
        error: function(xhr, status, error) {
          alert('Comment did not reach server: ', error);
        }
      })
    } else {
      alert('Please type a comment.');
    }
  }

  
  const validForm = () => {

    console.log("in comment formmm state.comment = " + state.comment)
    if (state.comment ) {
      return true;
    } else {
      return false;
    }
  }

  
  const handleChange = event => {
    console.log("handle change from -----REPLY -----form")
    console.log(event)

    const v = event.target.value;

    const { id } = props;
    const value = event.target.value;
    console.log("nameeeeee = " + event.target.name)
    console.log("valluuee = " + event.target.value)
    console.log("focus = " + event.target.tagger)
    
    
    if (event.target.name == "title"){

      setState({ 
        ...state,
        slug: slugify(v),
        [event.target.name]: v,
        error: '' 
      });

    }else{
    
      setState({ 
        ...state,
        [event.target.name]: v,
        error: '' 
      });
      //return onChange(id, value);
    }

    console.log("cewest state is = " + state.comment)
  }
  
  
  const getClass = () =>{
      
    if(state.focus === true)
      return "field focussed";
    else
      return "field";

  }

  const handleImageChange = event => {

    console.log("chd");
    console.log(event.target);
    formData.append('event[image]', event.target.files[0]);
  }

  const { focussed, value, error, label } = state;
  const { id, type, locked } = props;
  //const fieldClassName = `field ${(locked ? focussed : focussed || value) && 'focussed'}`;
  //const fcn = state.nameIsFocused ? "xxxfocused" : "xxxNotfocused"
  
  return(

    <FormWrapper rows={props.rows} commentID={props.commentID}>
        

      <img src={props.userData ? props.userData.avatar_url == null ? defaultManIcon : props.userData.avatar_url : defaultManIcon}></img>

      <Form id={props.commentID} className="form-inline" onSubmit={handleAdd} enctype="multipart/form-data" >
        
        
        <div style={{width: "100%", height: "100%"}} className="field" >
        
          {/* <CommentInput type="textarea"
            index={1}
            
            className="form-control"
            name="comment"
            maxLength="11"        
            placeholder="add a public comment.."
            
            value={state.comment}
            onChange={handleChange} 

            onKeyPress={e => {
              if(e.key === 'Enter')
                 e.preventDefault()
              }}
          /> */}

          {/* <CommentInputDiv contenteditable="true" onClick={self.focus()}>sdfsdf</CommentInputDiv> */}

          <TextareaAutosizei 
           onResize={(e) => {}}
           
           value={state.comment}
            
           onChange={handleChange} 
            
           index={1}
            
           placeholder={"...reply to " + props.commentAuthor}
            
            
           name="comment"

           
           onKeyPress={e => {
            if(e.key === 'Enter')
               e.preventDefault()
            }}/>
        </div>

       
        
        
          

        
        
      </Form>
      <button form={props.commentID} style={{marginTop: "3px", gridArea: "main_comment_buttons"}} type="submit" className="btn btn-primary">reply</button>
    </FormWrapper>
  )
}


//const ReCaptcha = styled.div``;







export default props => <CommentReplyForm {...props} />;