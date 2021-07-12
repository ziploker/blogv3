import React, {useEffect, useState, usePrevious} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import {CSSTransition} from 'react-transition-group';


import TimeAgo from 'javascript-time-ago'
TimeAgo.addDefaultLocale(en)
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en'
import CommentForm from './commentForm'
//import CommentReplyForm from './commentReplyForm'
import CommentReplyForm from './commentReplyForm'
import defaultAvatar from '../../assets/images/man3'

//import './article.styled.scss' 

//import '../../assets/stylesheets/comments.scss'


//import LookupSection from './lookupSection.jsx'

import {
    
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
  
} from "react-share";



import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



const ArticleSection = styled.div`


    
    
    /* display: grid;
    
    grid-template-columns: minmax(200px, 700px);
   
    justify-content: center;
    justify-items: center;
    margin: 50px auto 0px auto; */

    
    display: grid;
    grid-template-columns: minmax(651px, 1100px) 300px;
    justify-content: center;
    margin-top: 20px;
    margin-left: 14px;
    margin-right: 14px;
    grid-column-gap: 28px;

    @media only screen and (max-width: 600px){

        grid-template-columns: 1fr;


    }
        

        
    
`;






const NewsWrapper = styled.div`

    display: grid;
    grid-template-columns: 100%;
    justify-content: center;
    position: relative;
    grid-area: 2/1/3/2;
    max-width: 770px;

    grid-template-areas:

        
        "info"
        
        "image"
        
        "body"
        "comments";

`;

const StoryTitleWrapper = styled.div`

    grid-area: 1/1/2/3;
    margin: 16px;
    justify-self: start;


`;

const StoryTitle = styled.h1`

    color: #303030;
   
    font-size: 60px;
    font-weight: 700;
    line-height: 1.2em;


    color: #111111;
    
    @media only screen and (max-width: 800px){

        font-size: 50px;


    }
    @media only screen and (max-width: 600px){

        font-size: 30px;


    }




`;

const InfoBar = styled.div`


    display: grid;
    overflow: hidden;
    grid-area: 4/1/5/2;
    grid-template-columns: minmax(0px, min-content) 1fr minmax(0px, min-content);
    grid-auto-rows: 1fr minmax(0px, min-content);
    grid-template-areas:

        "flexbox    flexbox    social "
        "flexbox    flexbox    social ";

    margin-top: 25px;
    align-content: center;
    padding: 0px 20px;

    @media only screen and (max-width: 420px){


        grid-template-columns: minmax(100px, min-content) ;
        grid-auto-rows: 1fr 1fr;
        margin-top: 0px;
        grid-template-areas:

        "social social "
        "flexbox flexbox ";


    }

    

`;

const FlexBar = styled.div`
    display: flex;
    grid-area: flexbox;
    align-items: center;

    @media only screen and (max-width: 420px){

        justify-content: start;
        margin-top: 8px;

    }
    


`;

const StoryImageWrapper = styled.div`

    width:100%;
    height: 0px;
    //min-height: 90px;
    //max-height: 300px;
    
    padding-top: 60%;
    position: relative;
    
    
    
    grid-area: 2/1/3/2;
    
    
    
`;



const StoryImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;


`;

const Caption = styled.div`

    font-size: 13px;
    line-height: 1.7;
    font-style: italic;
    color: #999999;
    padding: 12px;
    margin: 0 20px;
    border-bottom: 1px solid #c0c0c0;
    grid-area: 3/1/4/2;

`;
const StoryShareButtons = styled.div`

    
    display: flex;
    justify-content: end;
    grid-area: social;
    align-self: center;

    @media only screen and (max-width: 420px){

        //justify-self: center;

    }

    button{

        width: 25px;
        height: 25px;
        margin-bottom: 3px;
    }
    


`;

const PWrapper = styled.div`

    //font-size: .9em;
    line-height: 1.9em;
    grid-area: 5/1/6/2;
    //text-indent: 45px;
    margin-top: 16px;
    padding: 0px 20px;
    font-family: 'IBM Plex Serif', serif;

    p{

        margin-bottom: 20px;
    }


`;

const Loading = styled.div`

    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
    h1{
        margin:0 auto;
        line-height:100vh;
        vertical-align:middle;

    }

`;

const Comments = styled.div`


    grid-area: 6/1/7/2;

   


`;

const CommentFormWrapper = styled.div`

    margin: 30px 30px;
    grid-area: 7/1/8/2;

`;




const CommentDisplay = styled.div`
    //transform: scale(1);

    max-height: ${ props => props.showMore == "true" ? "0" : "100%"};
    transform: ${ props => props.showMore == "true" ? "scale(0)" : "scale(1)"};
    //transform-origin: left;
    //max-height: 100%;
    //transform: scale(1);
    transition: all 1s ease-out;
    //border-left: 1px solid grey;
    //grid-template-columns: minmax(min-cnoeontent, max-content) minmax(min-content, max-content) 1fr;
    //grid-template-rows: minmax(min-content, max-content) 1fr 1fr minmax(min-content, max-content);
    /* grid-template-areas:

    "avatar nick date  "
    "avatar body body  "
    "  .    body body  "
    "  .    bottomBar bottomBar  "; */
    //margin: 20px 50px 0px 50px;

    
    //display: inherit;
    position: relative;

    img {
        width: 25px;
        height: 25px;
        //grid-area: avatar;
        margin: 1px 10px 0px 0px;
        border-radius: 50%;
        border: 1px solid gray;
        
    }


    

`;

const BorderDiv = styled.div`


        
        

    position: absolute;
    border-left: 1px solid gray;

    height: calc(100% - 25px);
    width: 100%;

    margin-left: 12px;

    bottom: 0px;
    pointer-events: none;



`;








const CommentReply = styled.div`



`;

const CommentBody = styled.p`
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;

    word-break: break-word;
    padding-left: 35px;



`;

const AuthorAvartar = styled.img`

    width: 40px;
    height: 40px;
    align-self: end;
    grid-area: image; 
    border: 1px solid gray;
    border-radius: 50%;
    margin-right: 8px;

    

`;

const AvatarTest = styled.img`

    display: none;

`;

const Reply = styled.div`
    //grid-area: reply;
    color: rgba(7, 7, 7, 0.65);
    cursor: pointer;
    padding: 8px 8px 8px 0px;
    font-size: 14px;

    &:hover{

        color: black;
    }

`;

const TopBarWrapper = styled.div`

    display: flex;
    position: relative;
    z-index: -1;

`;

const BottomBarWrapper = styled.div`

    grid-area: bottomBar;
    display: flex;
    flex-direction: row;
    padding-left: 35px;
`;

const VoteUp = styled.div`
    
    cursor: pointer;
    padding: 8px;

    &:hover{

        background-color: #e5f4fb;
    }

    svg{
        width: 16px;
        height: 15px;
        margin-right: 4px;
    }

    span{

        font-size: 13px;
    }
`;


const VoteDown = styled.div`
    
    cursor: pointer;
    padding: 8px;

    &:hover{

        background-color: #e5f4fb;
    }

    svg{
        width: 16px;
        height: 15px;
        margin-right: 4px;
    }

    span{

        font-size: 13px;
    }
`;








function CommentSection(props){


    console.log("========================== COOOOOMMENTS============================")

    // const [userData, setUserData] = useState({});
    // const [isLoading, setIsLoading] = useState(true);
    // const [artData, setArtData] = useState({})
    // const [artDataComments, setArtDataComments] = useState([])
    //const [state, setState] = useState("pending")
    //const [avatarLoaded, setAvatarLoaded] = useState(false)
    // const [rows, setRows] = useState({})

    

    //const [isCommentsLoading, setIsCommentsLoading] = useState(true);

    let obj = {};

    

    //const prevRows = usePrevious(rows)


    let editLink = null;
    
    if(props.userData && props.userData.isAdmin)
    {
        editLink = <a href={`/ziploker/edit/${props.artData.id}`}>edit</a>;
    }

    //console.log("Article_PROPS", props)
    
    //////////////////////////////////const slug = props.match.params.id


    // // const handleReplyButton = (id) => {

        
    // //     //console.log("xxxxx is = " + x);
        

    // //    if (rows[id] == "true"){
    // //         setRows({...rows, [id]: "false"})

    // //    }else{

    // //     setRows({...rows,[id]: "true"})

    // //    }

       

        
        
    // // }


   
            


    
    const returnFirstItemOfArray = (id) => {

        
        console.log("returnFirstItemOfArrayxxxxreturnFirstItemOfArray is = " + id);
        console.log("LengthnnnLengthnnnLengthnnnLength is = " + id.length.toString());
        
        if (id.length > 0){
            console.log("LengthnnnLengthnnnLengthnnnLength is = " + id[0].toString());
            return id[0]
        }

       
       

       

        
        
    }



    const getReplyArray = (childrenCommentArray) => {

        let tempArray = []

        childrenCommentArray.map( (x, i) => {
                            
                        
            x.id

            tempArray.push(x.id + ", ")
            

      
        })

        return tempArray

        //console.log("getReplyArraydfdfdfdfdfdfdfgetReplyArray = " + JSON.stringify(childrenCommentArray, null, 4))


          
      
      
      
    


    }
    
    
    // useEffect ((props) => {


        
    // },[])



    

    // function addAllCommentsToStateForReplyButtonToWork(c) {


    //     //{console.log("the addAllCommentsToStateForReplyButtonToWork Object about to be mapped is " + JSON.stringify(c, null, 4))}
        

        
       
    //     let newArray = [];
    //     let newState = {}

    //     function getAllId(arr, key) {
            
    //         console.log("================ in getAllId =======================")
    //         // console.log("array = " + JSON.stringify(arr, null, 4))
    //         // console.log("key = " + JSON.stringify(key, null, 4))
            
    //         arr.forEach(function(item) {
                
    //             console.log("================ in arr.forEach =======================")
    //             // console.log("item = " + JSON.stringify(item, null, 4))
    //             // console.log("key = " + JSON.stringify(key, null, 4))
                
    //             for (let keys in item) {
                    
    //                 console.log("================ in for loop =======================")
    //                 // console.log("keys = " + JSON.stringify(keys, null, 4))
    //                 // console.log("key = " + JSON.stringify(key, null, 4))
    //                 // console.log("item = " + JSON.stringify(item, null, 4))


    //                 if (keys === key) {
    //                     newArray.push(item[key])
    //                 } else if (Array.isArray(item[keys])) {
    //                     getAllId(item[keys], key)
    //                 }
    //             }

    //         })

    //         console.log("================ OUT getAllId =======================")
    //     }
        
    //     getAllId(c, 'id')
    //     console.log(newArray)

        
    //     newArray.forEach(function(item) {

    //         console.log("xxxitemx = " + item)
            
            
    //         newState[item] = "false"

            


    //     })




    //     console.log("newState = " + JSON.stringify(newState, null, 4))

    //     setRows(newState);

    // }  



    function addAllCommentsToStateForShowMoreButtonToWork(c) {


        //{console.log("the addAllCommentsToStateForReplyButtonToWork Object about to be mapped is " + JSON.stringify(c, null, 4))}
        

        
       
        let newArray = [];
        let newState = {}

        function getAllId(arr, key) {
            
            console.log("================ in getAllId =======================")
            // console.log("array = " + JSON.stringify(arr, null, 4))
            // console.log("key = " + JSON.stringify(key, null, 4))
            
            arr.forEach(function(item) {
                
                console.log("================ in arr.forEach =======================")
                // console.log("item = " + JSON.stringify(item, null, 4))
                // console.log("key = " + JSON.stringify(key, null, 4))
                
                for (let keys in item) {
                    
                    console.log("================ in for loop =======================")
                    // console.log("keys = " + JSON.stringify(keys, null, 4))
                    // console.log("key = " + JSON.stringify(key, null, 4))
                    // console.log("item = " + JSON.stringify(item, null, 4))


                    if (keys === key) {
                        newArray.push(item[key])
                    } else if (Array.isArray(item[keys])) {
                        getAllId(item[keys], key)
                    }
                }

            })

            console.log("================ OUT getAllId =======================")
        }
        
        getAllId(c, 'id')
        console.log(newArray)

        
        newArray.forEach(function(item) {

            console.log("xxxitemx = " + item)
            
            
            newState[item] = "false"

            


        })




        console.log("newState = " + JSON.stringify(newState, null, 4))

        props.setShowMore(newState);

    }

    


    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////// COMMENT FUNCTION //////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    
    // function Comment({ item, setIsCommentsLoading, userData, storyID, setArtDataComments, addAllCommentsToStateForReplyButtonToWork}) {
    
    
        function Comment({ item, rows, showMore, setRows, userData, storyID, setArtDataComments, handleShowMoreButton, handleReplyButton}) {

        
            const nestedComments = (item.comments || []).map(com => {
    
                // return <Comment style={{border: "2px solid blue"}} key={com.id} item={com} type="child" userData={userData} storyID={artData.id} setArtDataComments={setArtDataComments} addAllCommentsToStateForReplyButtonToWork={addAllCommentsToStateForReplyButtonToWork} setIsCommentsLoading={setIsCommentsLoading}/>
                return <Comment style={{border: "2px solid blue"}} key={com.id} item={com} type="child" userData={userData} storyID={storyID} setArtDataComments={setArtDataComments} handleShowMoreButton={handleShowMoreButton} handleReplyButton={handleReplyButton} rows={rows} setRows={setRows} showMore={showMore} />
    
            })
          
            
            
            return (
                
                <>
                {/* <CSSTransition
                    in={showMore[storyID]}
                    timeout={350}
                    classNames="display"
                    unmountOnExit
                    > */}
                
                    {/* <div item={item} id={item.id} childID={returnFirstItemOfArray(( */}
                    <CommentDisplay showMore={showMore} item={item} id={item.id} childID={returnFirstItemOfArray((

                                
                            
                            item.comments.map( (x, i) => (
                                
                            
                                  x.id
    
                            
                            ) 
                                
                            
                            
                            
                    )))} style={{margin: "10px 0px 0px 25px"}} >
    
                        <BorderDiv>
                        </BorderDiv>
                        
                        <TopBarWrapper>
                            <img key={item.id + "img"} data-id={ item.id + "img"} src={item.author_avatar}/>
                            <h3 key={item.id + "h3"} data-id={ item.id + "h3"}style={{alignSelf: "center", fontSize: ".6em", gridArea: "nick", marginRight: "8px"}}>{item.author_nick}</h3>
                            <span key={item.id + "span"} data-id={ item.id + "span"} style={{alignSelf: "center", gridArea: "date", fontSize: ".6em", color: "gray"}}><ReactTimeAgo key={item.id + "rta"} data-id={ item.id + "rta"} date={item.created_at ? new Date(item.created_at) : null} locale="en-US" timeStyle="round-minute"/></span>
                        </TopBarWrapper>
                        
                        <CommentBody key={item.id + "CB"} data-id={ item.id + "CB"} style={{gridArea: "body", fontSize: "15px"}}>{item.body} this comment ID is {item.id} and its children array is {getReplyArray(item.comments)}</CommentBody>
                            
                    
                        <BottomBarWrapper key={item.id + "bbw"} data-id={ item.id + "bbw"}>
                
                            <Reply key={item.id + "r"} data-id={ item.id + "r"} onClick={() => props.handleReplyButton(item.id)}>reply</Reply>
                            <VoteUp key={item.id + "vu"} data-id={ item.id + "vu"}>
                            <svg key={item.id + "svg1"} data-id={ item.id + "svg1"} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path key={item.id + "path1"} data-id={ item.id + "path1"} d="M10.74.04a2.013 2.013 0 00-1.58 1.88c-.11 2.795-.485 4.45-2.283 6.946a1.272 1.272 0 00-1.065-.58h-4.55C.573 8.287 0 8.84 0 9.507v8.773c0 .667.572 1.218 1.263 1.218h4.55c.435 0 .821-.22 1.049-.548.263.204.506.387.758.533.417.24.887.384 1.532.45 1.29.128 3.403.032 8.283.052a.53.53 0 00.317-.113c1.224-.667 4.255-5.775 4.248-10.534-.026-1.138-.542-1.78-1.532-1.78H13.96c.388-2.47.131-4.738-.735-6.208C12.76.555 12.078.111 11.403.018a2.035 2.035 0 00-.663.022m2.154 7.912c-.055.28.201.58.498.58h6.934c.356.035.67.091.67.913 0 1.047-.168 2.886-1.031 5.057-.865 2.172-2.155 4.531-2.603 4.455-1.215.08-7.014.109-8.108 0-.556-.056-.818-.135-1.113-.306-.266-.152-.59-.423-1.066-.791v-7.6c2.349-2.88 2.979-5.302 3.096-8.3.338-1.495 1.702-1.082 2.179-.13.697 2.402.879 4.442.544 6.122M1.263 9.262h4.55c.148 0 .251.1.251.244v8.773c0 .144-.103.243-.252.243h-4.55c-.148 0-.251-.099-.251-.243V9.506c0-.144.103-.244.252-.244"></path></svg>
                            <span key={item.id + "s1"} data-id={ item.id + "s1"}>10</span>
                            
                            </VoteUp>
                
                            <VoteDown key={item.id + "vd"} data-id={ item.id + "vd"}>
                            <svg key={item.id + "svg2"} data-id={ item.id + "svg2"} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path key={item.id + "path2"} data-id={ item.id + "path2"} d="M11.26 19.96a2.013 2.013 0 001.58-1.881c.11-2.794.484-4.45 2.282-6.945.224.345.618.58 1.066.58h4.548c.692 0 1.264-.553 1.264-1.22V1.722c0-.668-.572-1.22-1.264-1.22h-4.548c-.436 0-.823.22-1.05.55a6.898 6.898 0 00-.759-.534c-.416-.24-.887-.384-1.531-.45C11.558-.06 9.445.037 4.564.017a.521.521 0 00-.316.114C3.023.796-.007 5.904 0 10.663c.025 1.138.541 1.78 1.532 1.78H8.04c-.39 2.47-.131 4.738.735 6.208.467.794 1.148 1.238 1.823 1.331a2.034 2.034 0 00.663-.022m-2.155-7.913c.056-.28-.202-.579-.497-.579H1.674c-.356-.035-.67-.091-.67-.913 0-1.047.166-2.886 1.031-5.057C2.9 3.326 4.19.967 4.638 1.044c1.214-.081 7.014-.109 8.108 0 .556.055.818.134 1.113.305.265.152.59.423 1.066.791v7.6c-2.349 2.88-2.979 5.302-3.096 8.3-.338 1.495-1.702 1.083-2.179.13-.697-2.402-.88-4.442-.545-6.123m11.631-1.309h-4.548c-.149 0-.252-.1-.252-.244V1.722c0-.144.103-.244.252-.244h4.548c.15 0 .253.1.253.244v8.772c0 .144-.103.244-.253.244"></path></svg>                                
                            <span key={item.id + "s2"} data-id={ item.id + "s2"}>1</span>
    
                            
                            
                            </VoteDown>
                            
                            <span style={{marginLeft: "10px", fontSize: "10px", lineHeight: "40px"}} onClick={() => props.handleShowMoreButton(item.comments)}> show replies </span>
    
                        </BottomBarWrapper>
                            
                            
                        
                
                
                        <CommentReplyForm
                        
                            
                            
                            originalcommentAuthor={item.author_nick}
                            rows={rows}
                            setRows={setRows}
                            userData={userData} 
                            storyID={storyID} 
                            commentID={item.id} 
                            setArtDataComments={setArtDataComments} 
                            //setIsCommentsLoading={setIsCommentsLoading}
                            
                        />
                
                        
                        {nestedComments}
    
    
                    
                    </CommentDisplay>
                {/* </CSSTransition> */}
                </>
               
            )
        
            {console.log("END CommentFunction")}
        }

    
    
  
        
    
    return (
    
        
        <Comments>
                        
                                
            <div>
                <div style={{position: "relative"}}>

                    {
                        
                        
                        props.artDataComments.map( (c) => {

                            return (
                                
                             // <Comment key={c.id} item={c} setIsCommentsLoading={setIsCommentsLoading} userData={userData} storyID={artData.id} setArtDataComments={setArtDataComments} addAllCommentsToStateForReplyButtonToWork={addAllCommentsToStateForReplyButtonToWork} />
                                <Comment key={c.id} item={c} userData={props.userData} storyID={props.artData.id} setArtDataComments={props.setArtDataComments}  handleShowMoreButton={props.handleShowMoreButton} handleReplyButton={props.handleReplyButton} rows={props.rows} setRows={props.setRows} showMore={props.showMore} />

                                )
                        })
                    }
                    
                    {console.log("about to END map artDataComments")}
                </div>    
            </div>
        </Comments>
    );
}


export default CommentSection;

