import React, {Component, useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import $ from 'jquery';
//import lilDownArrow from '../../../../'
//import '../components/fix.js'
import slugify from 'react-slugify'
import defaultManIcon from '../../assets/images/man3'




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

`;


const FormWrapper = styled.div`

  display: grid;
  grid-template-columns: minmax(min-content, max-content) 1fr;
  grid-template-rows: minmax(min-content, max-content) minmax(min-content, max-content);
  grid-template-areas:

          "main_comment_img      main_comment_body      main_comment_body"
          "main_comment_img             .             main_comment_buttons";
`;

const OptionWrapper = styled.div`


`;

const CommentInput = styled.input`

  width: 100%;
  border: 0;
  border-bottom: 2px solid gray;
  outline: 0;
  font-size: 1.3rem;
  
  //padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
  margin-left: 10px;

  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;

  word-break: break-word;


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

    <FormWrapper>
        <span>"-----------------_"</span>

      <img style={{border: "1px solid gray", borderRadius: "50%", width: "50px", height: "50px", gridArea: "main_comment_img"}} src={props.userData ? props.userData.avatar_url == null ? defaultManIcon : props.userData.avatar_url : defaultManIcon}></img>

      <Form id="rform" className="form-inline" onSubmit={handleAdd} enctype="multipart/form-data" >
        
        
        <div className="field" >
        
          <CommentInput type="text"
            index={1}
            
            className="form-control"
            name="comment"
            
            placeholder="add a public comment.."
            
            value={state.comment}
            onChange={handleChange} 
          />
        </div>

       
        
        
          

        
        
      </Form>
      <button form="rform" style={{marginTop: "3px", gridArea: "main_comment_buttons"}} type="submit" className="btn btn-primary">reply</button>
    </FormWrapper>
  )
}


//const ReCaptcha = styled.div``;







export default props => <CommentReplyForm {...props} />;
