import React, {useEffect, useState, usePrevious} from 'react';
import styled from 'styled-components';
import axios from 'axios';


import TimeAgo from 'javascript-time-ago'
TimeAgo.addDefaultLocale(en)
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en'
import CommentForm from './commentForm'
import CommentReplyForm from './commentReplyForm'
import ReplyReplyForm from './ReplyReplyForm'
import defaultAvatar from '../../assets/images/man3'

 




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

    display: grid;
    grid-template-columns: minmax(min-content, max-content) minmax(min-content, max-content) 1fr;
    grid-template-rows: minmax(min-content, max-content) 1fr 1fr minmax(min-content, max-content);
    grid-template-areas:

    "avatar nick date  "
    "avatar body body  "
    "  .    body body  "
    "  .    bottomBar bottomBar  ";
    margin: 20px 50px 0px 50px;

    img {
        width: 25px;
        height: 25px;
        grid-area: avatar;
        margin: 1px 10px 0px 0px;
        border-radius: 50%;
        border: 1px solid gray;
        
    }

`;



const CommentReply = styled.div`



`;

const CommentBody = styled.p`
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;

    word-break: break-word;



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

const BottomBarWrapper = styled.div`

    grid-area: bottomBar;
    display: flex;
    flex-direction: row;
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





function Article(props){

    const [userData, setUserData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [artData, setArtData] = useState({})
    const [artDataComments, setArtDataComments] = useState([])
    //const [state, setState] = useState("pending")
    const [avatarLoaded, setAvatarLoaded] = useState(false)
    const [rows, setRows] = useState({})

    const [areCommentsDoneLoading, setAreCommentsDoneLoading] = useState(false);

    

    

    //const prevRows = usePrevious(rows)


    let editLink = null;
    
    if(userData && userData.isAdmin)
    {
        editLink = <a href={`/ziploker/edit/${artData.id}`}>edit</a>;
    }

    //console.log("Article_PROPS", props)
    
    const slug = props.match.params.id


    const handleReplyButton = (x) => {

        
        //console.log("xxxxx is = " + x);
        

       if (rows[x] == "true"){
            setRows({...rows,[x]: "false"})

       }else{

        setRows({...rows,[x]: "true"})

       }

       

        
        
    }
            
    useEffect ((props) => {

        
        //const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
        axios.post("/blog/get_article_info", {
          
          data: { 
            slug: slug
            
          }
        },
        {withCredentials: true})
        .then(response => {
          

            //console.log("article info Response", response)

            setUserData(response.data.user)
            setArtData(response.data.article)
            setArtDataComments(response.data.comments)
            setLoading(false);

            let obj = {}
            response.data.comments.map((item,i) => {

               // console.log ("main Comment " + item.id) 
                obj[item.id] = "false"

                //console.log(JSON.stringify(obj))
                


                item.comments.map((item,i) => {
                    
                    //console.log ("Reply to comment " + item.id) 
                    obj[item.id] = "false"

                }).reverse()
            
            }).reverse()

            setRows(obj)
          
        }).catch(error => {
          
          //console.log("articleErrors", error)
        })
    },[])
    
        if (isLoading) {
            return <Loading><h1>Loading......</h1>


            </Loading>;
        }
    
    return (
    
        <>

            <AvatarTest src={artData.author_avatar}
                onLoad={() => setAvatarLoaded(true)}></AvatarTest>
            
            <ArticleSection>
                
            
                <StoryTitleWrapper>
                    <StoryTitle>{artData.title}</StoryTitle>
                </StoryTitleWrapper>

                <Caption>
                    {artData.caption}
                </Caption>
                
                
                
                <InfoBar>

                    <FlexBar>
                        <AuthorAvartar src={avatarLoaded ? artData.author_avatar : defaultAvatar } />
                        <h4 style={{fontSize: ".7rem", lineHeight: "normal"}}>by FloridaBlaze</h4>
                        <div style={{margin: "0px 5px"}}>|</div>
                        <h4 style={{fontFamily: "serif", color: "#777777", fontSize: ".7rem", lineHeight: "normal", marginRight: "8px"}}>{artData.date}</h4>
                    </FlexBar>
                    
                    <StoryShareButtons>
                        <FacebookShareButton children={<FacebookIcon size={25} round={false} borderRadius={17} />} url={"www.420.com"} style={{marginRight: "3px"}} />
                        <TwitterShareButton children={<TwitterIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} style={{marginRight: "3px"}}/>
                        <WhatsappShareButton children={<WhatsappIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} />
                    </StoryShareButtons>
                    
                    
                </InfoBar>

                    
                    
                <StoryImageWrapper>
                
                    <StoryImage src={artData.url}/>
                
                </StoryImageWrapper>
                
                    
                    

                <PWrapper dangerouslySetInnerHTML={{ __html: artData.body }}></PWrapper>

                    
                    
                <CommentFormWrapper>

                    <CommentForm setAreCommentsDoneLoading={setAreCommentsDoneLoading} userData={userData} storyID={artData.id} setArtDataComments={setArtDataComments}/>

                </CommentFormWrapper>

               
                    
               <Comments>
                        
                        
                        
                    {artDataComments.map((item,i) => 
                        <div key={item.id} data-id={ item.id }>
                            {/* {console.log(JSON.stringify(item, null, 4))} */}
                            <div style={{position: "relative"}} key={item.id} data-id={ item.id }>

                                
                                {/* Loop thru and display each first level comment */}
                                <CommentDisplay key={item.id + "CD"} data-id={ item.id + "CD"}>

                                    <img key={item.id + "img"} data-id={ item.id + "img"} src={item.author_avatar}/>
                                    <h3 key={item.id + "h3"} data-id={ item.id + "h3"}style={{alignSelf: "center", fontSize: ".6em", gridArea: "nick", marginRight: "8px"}}>{item.author_nick}</h3>
                                    <span key={item.id + "span"} data-id={ item.id + "span"} style={{alignSelf: "center", gridArea: "date", fontSize: ".6em", color: "gray"}}><ReactTimeAgo key={item.id + "rta"} data-id={ item.id + "rta"} date={item.created_at ? new Date(item.created_at) : null} locale="en-US" timeStyle="round-minute"/></span>
                                    <CommentBody key={item.id + "CB"} data-id={ item.id + "CB"} style={{gridArea: "body", fontSize: "15px"}}>{item.body}</CommentBody>
                                        
                                        
                                    <BottomBarWrapper key={item.id + "bbw"} data-id={ item.id + "bbw"}>

                                        <Reply key={item.id + "r"} data-id={ item.id + "r"} onClick={() => handleReplyButton(item.id)}>reply</Reply>
                                            <VoteUp key={item.id + "vu"} data-id={ item.id + "vu"}>
                                            <svg key={item.id + "svg1"} data-id={ item.id + "svg1"} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path key={item.id + "path1"} data-id={ item.id + "path1"} d="M10.74.04a2.013 2.013 0 00-1.58 1.88c-.11 2.795-.485 4.45-2.283 6.946a1.272 1.272 0 00-1.065-.58h-4.55C.573 8.287 0 8.84 0 9.507v8.773c0 .667.572 1.218 1.263 1.218h4.55c.435 0 .821-.22 1.049-.548.263.204.506.387.758.533.417.24.887.384 1.532.45 1.29.128 3.403.032 8.283.052a.53.53 0 00.317-.113c1.224-.667 4.255-5.775 4.248-10.534-.026-1.138-.542-1.78-1.532-1.78H13.96c.388-2.47.131-4.738-.735-6.208C12.76.555 12.078.111 11.403.018a2.035 2.035 0 00-.663.022m2.154 7.912c-.055.28.201.58.498.58h6.934c.356.035.67.091.67.913 0 1.047-.168 2.886-1.031 5.057-.865 2.172-2.155 4.531-2.603 4.455-1.215.08-7.014.109-8.108 0-.556-.056-.818-.135-1.113-.306-.266-.152-.59-.423-1.066-.791v-7.6c2.349-2.88 2.979-5.302 3.096-8.3.338-1.495 1.702-1.082 2.179-.13.697 2.402.879 4.442.544 6.122M1.263 9.262h4.55c.148 0 .251.1.251.244v8.773c0 .144-.103.243-.252.243h-4.55c-.148 0-.251-.099-.251-.243V9.506c0-.144.103-.244.252-.244"></path></svg>
                                        <span key={item.id + "s1"} data-id={ item.id + "s1"}>10</span>
                                        
                                        </VoteUp>

                                        <VoteDown key={item.id + "vd"} data-id={ item.id + "vd"}>
                                            <svg key={item.id + "svg2"} data-id={ item.id + "svg2"} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path key={item.id + "path2"} data-id={ item.id + "path2"} d="M11.26 19.96a2.013 2.013 0 001.58-1.881c.11-2.794.484-4.45 2.282-6.945.224.345.618.58 1.066.58h4.548c.692 0 1.264-.553 1.264-1.22V1.722c0-.668-.572-1.22-1.264-1.22h-4.548c-.436 0-.823.22-1.05.55a6.898 6.898 0 00-.759-.534c-.416-.24-.887-.384-1.531-.45C11.558-.06 9.445.037 4.564.017a.521.521 0 00-.316.114C3.023.796-.007 5.904 0 10.663c.025 1.138.541 1.78 1.532 1.78H8.04c-.39 2.47-.131 4.738.735 6.208.467.794 1.148 1.238 1.823 1.331a2.034 2.034 0 00.663-.022m-2.155-7.913c.056-.28-.202-.579-.497-.579H1.674c-.356-.035-.67-.091-.67-.913 0-1.047.166-2.886 1.031-5.057C2.9 3.326 4.19.967 4.638 1.044c1.214-.081 7.014-.109 8.108 0 .556.055.818.134 1.113.305.265.152.59.423 1.066.791v7.6c-2.349 2.88-2.979 5.302-3.096 8.3-.338 1.495-1.702 1.083-2.179.13-.697-2.402-.88-4.442-.545-6.123m11.631-1.309h-4.548c-.149 0-.252-.1-.252-.244V1.722c0-.144.103-.244.252-.244h4.548c.15 0 .253.1.253.244v8.772c0 .144-.103.244-.253.244"></path></svg>                                
                                            <span key={item.id + "s2"} data-id={ item.id + "s2"}>1</span>
                                        
                                        </VoteDown>
                                    
                                    </BottomBarWrapper>
                                        
                                        
                                </CommentDisplay>
                                    
                                    
                                {/* each comment has its own reply form hidden until user hits reply button*/}
                                <CommentReplyForm
                                    setAreCommentsDoneLoading={setAreCommentsDoneLoading}
                                    dataID={ item.id + "CRF" }
                                    key={ item.id + "CRF" }
                                    level={1}
                                    originalcommentAuthor={item.author_nick}
                                    rows={rows}
                                    setRows={setRows}
                                    userData={userData} 
                                    storyID={artData.id} 
                                    commentID={item.id} 
                                    setArtDataComments={setArtDataComments} 
                                    
                                />
                                    
                                    
                                    
                                <CommentReply key={item.id + "comrep"} data-id={item.id + "comrep"}>

                                    {item.comments?.map((item,i) => 
                                
                                        
                                        <div key={item.id} data-id={ item.id }>
                                            <CommentDisplay key={item.id + "CD"} data-id={ item.id + "CD"} style={{margin: "20px 50px 0px 85px"}}>

                                                <img key={item.id + "img"} data-id={ item.id + "img"} src={item.author_avatar}/>
                                                <h3 key={item.id + "h3"} data-id={ item.id + "h3"}style={{alignSelf: "center", fontSize: ".6em", gridArea: "nick", marginRight: "8px"}}>{item.author_nick}</h3>
                                                <span key={item.id + "span"} data-id={ item.id + "span"} style={{alignSelf: "center", gridArea: "date", fontSize: ".6em", color: "gray"}}><ReactTimeAgo key={item.id + "rta"} data-id={ item.id + "rta"} date={item.created_at ? new Date(item.created_at) : null} locale="en-US" timeStyle="round-minute"/></span>
                                                <CommentBody key={item.id + "CB"} data-id={ item.id + "CB"} style={{gridArea: "body", fontSize: "15px"}}>{item.body}</CommentBody>
                                                    
                                                    
                                                <BottomBarWrapper key={item.id + "bbw"} data-id={ item.id + "bbw"}>

                                                    <Reply key={item.id + "r"} data-id={ item.id + "r"} onClick={() => handleReplyButton(item.id)}>reply</Reply>
                                                    <VoteUp key={item.id + "vu"} data-id={ item.id + "vu"}>
                                                    <svg key={item.id + "svg1"} data-id={ item.id + "svg1"} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path key={item.id + "path1"} data-id={ item.id + "path1"} d="M10.74.04a2.013 2.013 0 00-1.58 1.88c-.11 2.795-.485 4.45-2.283 6.946a1.272 1.272 0 00-1.065-.58h-4.55C.573 8.287 0 8.84 0 9.507v8.773c0 .667.572 1.218 1.263 1.218h4.55c.435 0 .821-.22 1.049-.548.263.204.506.387.758.533.417.24.887.384 1.532.45 1.29.128 3.403.032 8.283.052a.53.53 0 00.317-.113c1.224-.667 4.255-5.775 4.248-10.534-.026-1.138-.542-1.78-1.532-1.78H13.96c.388-2.47.131-4.738-.735-6.208C12.76.555 12.078.111 11.403.018a2.035 2.035 0 00-.663.022m2.154 7.912c-.055.28.201.58.498.58h6.934c.356.035.67.091.67.913 0 1.047-.168 2.886-1.031 5.057-.865 2.172-2.155 4.531-2.603 4.455-1.215.08-7.014.109-8.108 0-.556-.056-.818-.135-1.113-.306-.266-.152-.59-.423-1.066-.791v-7.6c2.349-2.88 2.979-5.302 3.096-8.3.338-1.495 1.702-1.082 2.179-.13.697 2.402.879 4.442.544 6.122M1.263 9.262h4.55c.148 0 .251.1.251.244v8.773c0 .144-.103.243-.252.243h-4.55c-.148 0-.251-.099-.251-.243V9.506c0-.144.103-.244.252-.244"></path></svg>
                                                    <span key={item.id + "s1"} data-id={ item.id + "s1"}>10</span>
                                                    
                                                    </VoteUp>

                                                    <VoteDown key={item.id + "vd"} data-id={ item.id + "vd"}>
                                                    <svg key={item.id + "svg2"} data-id={ item.id + "svg2"} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path key={item.id + "path2"} data-id={ item.id + "path2"} d="M11.26 19.96a2.013 2.013 0 001.58-1.881c.11-2.794.484-4.45 2.282-6.945.224.345.618.58 1.066.58h4.548c.692 0 1.264-.553 1.264-1.22V1.722c0-.668-.572-1.22-1.264-1.22h-4.548c-.436 0-.823.22-1.05.55a6.898 6.898 0 00-.759-.534c-.416-.24-.887-.384-1.531-.45C11.558-.06 9.445.037 4.564.017a.521.521 0 00-.316.114C3.023.796-.007 5.904 0 10.663c.025 1.138.541 1.78 1.532 1.78H8.04c-.39 2.47-.131 4.738.735 6.208.467.794 1.148 1.238 1.823 1.331a2.034 2.034 0 00.663-.022m-2.155-7.913c.056-.28-.202-.579-.497-.579H1.674c-.356-.035-.67-.091-.67-.913 0-1.047.166-2.886 1.031-5.057C2.9 3.326 4.19.967 4.638 1.044c1.214-.081 7.014-.109 8.108 0 .556.055.818.134 1.113.305.265.152.59.423 1.066.791v7.6c-2.349 2.88-2.979 5.302-3.096 8.3-.338 1.495-1.702 1.083-2.179.13-.697-2.402-.88-4.442-.545-6.123m11.631-1.309h-4.548c-.149 0-.252-.1-.252-.244V1.722c0-.144.103-.244.252-.244h4.548c.15 0 .253.1.253.244v8.772c0 .144-.103.244-.253.244"></path></svg>                                
                                                    <span key={item.id + "s2"} data-id={ item.id + "s2"}>1</span>
                                                    
                                                    </VoteDown>

                                                </BottomBarWrapper>
                                                    
                                                    
                                            </CommentDisplay>

                                        
                                            <ReplyReplyForm
                                                setAreCommentsDoneLoading={setAreCommentsDoneLoading}
                                                dataID={ item.id + "RRF" }
                                                key={ item.id + "RRF" }
                                                level={1}
                                                originalcommentAuthor={item.author_nick}
                                                rows={rows}
                                                setRows={setRows}
                                                userData={userData} 
                                                storyID={artData.id} 
                                                commentID={item.id} 
                                                setArtDataComments={setArtDataComments} 
                                            />

                                            
                                            
                                            
                                            
                                            
                                            {item.comments?.map((item,i) => 
                                                
                                                <div key={item.id} data-id={ item.id }>
                                                    <CommentDisplay key={item.id + "CD"} data-id={ item.id + "CD"} style={{margin: "20px 50px 0px 120px"}}>

                                                        <img key={item.id + "img"} data-id={ item.id + "img"} src={item.author_avatar}/>
                                                        <h3 key={item.id + "h3"} data-id={ item.id + "h3"}style={{alignSelf: "center", fontSize: ".6em", gridArea: "nick", marginRight: "8px"}}>{item.author_nick}</h3>
                                                        <span key={item.id + "span"} data-id={ item.id + "span"} style={{alignSelf: "center", gridArea: "date", fontSize: ".6em", color: "gray"}}><ReactTimeAgo key={item.id + "rta"} data-id={ item.id + "rta"} date={item.created_at ? new Date(item.created_at) : null} locale="en-US" timeStyle="round-minute"/></span>
                                                        <CommentBody key={item.id + "CB"} data-id={ item.id + "CB"} style={{gridArea: "body", fontSize: "15px"}}>{item.body}</CommentBody>
                                                            
                                                            
                                                        <BottomBarWrapper key={item.id + "bbw"} data-id={ item.id + "bbw"}>

                                                            <Reply key={item.id + "r"} data-id={ item.id + "r"} onClick={() => handleReplyButton(item.id)}>reply</Reply>
                                                            <VoteUp key={item.id + "vu"} data-id={ item.id + "vu"}>
                                                            <svg key={item.id + "svg1"} data-id={ item.id + "svg1"} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path key={item.id + "path1"} data-id={ item.id + "path1"} d="M10.74.04a2.013 2.013 0 00-1.58 1.88c-.11 2.795-.485 4.45-2.283 6.946a1.272 1.272 0 00-1.065-.58h-4.55C.573 8.287 0 8.84 0 9.507v8.773c0 .667.572 1.218 1.263 1.218h4.55c.435 0 .821-.22 1.049-.548.263.204.506.387.758.533.417.24.887.384 1.532.45 1.29.128 3.403.032 8.283.052a.53.53 0 00.317-.113c1.224-.667 4.255-5.775 4.248-10.534-.026-1.138-.542-1.78-1.532-1.78H13.96c.388-2.47.131-4.738-.735-6.208C12.76.555 12.078.111 11.403.018a2.035 2.035 0 00-.663.022m2.154 7.912c-.055.28.201.58.498.58h6.934c.356.035.67.091.67.913 0 1.047-.168 2.886-1.031 5.057-.865 2.172-2.155 4.531-2.603 4.455-1.215.08-7.014.109-8.108 0-.556-.056-.818-.135-1.113-.306-.266-.152-.59-.423-1.066-.791v-7.6c2.349-2.88 2.979-5.302 3.096-8.3.338-1.495 1.702-1.082 2.179-.13.697 2.402.879 4.442.544 6.122M1.263 9.262h4.55c.148 0 .251.1.251.244v8.773c0 .144-.103.243-.252.243h-4.55c-.148 0-.251-.099-.251-.243V9.506c0-.144.103-.244.252-.244"></path></svg>
                                                            <span key={item.id + "s1"} data-id={ item.id + "s1"}>10</span>
                                                            
                                                            </VoteUp>

                                                            <VoteDown key={item.id + "vd"} data-id={ item.id + "vd"}>
                                                            <svg key={item.id + "svg2"} data-id={ item.id + "svg2"} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path key={item.id + "path2"} data-id={ item.id + "path2"} d="M11.26 19.96a2.013 2.013 0 001.58-1.881c.11-2.794.484-4.45 2.282-6.945.224.345.618.58 1.066.58h4.548c.692 0 1.264-.553 1.264-1.22V1.722c0-.668-.572-1.22-1.264-1.22h-4.548c-.436 0-.823.22-1.05.55a6.898 6.898 0 00-.759-.534c-.416-.24-.887-.384-1.531-.45C11.558-.06 9.445.037 4.564.017a.521.521 0 00-.316.114C3.023.796-.007 5.904 0 10.663c.025 1.138.541 1.78 1.532 1.78H8.04c-.39 2.47-.131 4.738.735 6.208.467.794 1.148 1.238 1.823 1.331a2.034 2.034 0 00.663-.022m-2.155-7.913c.056-.28-.202-.579-.497-.579H1.674c-.356-.035-.67-.091-.67-.913 0-1.047.166-2.886 1.031-5.057C2.9 3.326 4.19.967 4.638 1.044c1.214-.081 7.014-.109 8.108 0 .556.055.818.134 1.113.305.265.152.59.423 1.066.791v7.6c-2.349 2.88-2.979 5.302-3.096 8.3-.338 1.495-1.702 1.083-2.179.13-.697-2.402-.88-4.442-.545-6.123m11.631-1.309h-4.548c-.149 0-.252-.1-.252-.244V1.722c0-.144.103-.244.252-.244h4.548c.15 0 .253.1.253.244v8.772c0 .144-.103.244-.253.244"></path></svg>                                
                                                            <span key={item.id + "s2"} data-id={ item.id + "s2"}>1</span>
                                                            
                                                            </VoteDown>

                                                        </BottomBarWrapper>
                                                            
                                                            
                                                    </CommentDisplay>

                                            
                                                    <ReplyReplyForm
                                                        setAreCommentsDoneLoading={setAreCommentsDoneLoading}
                                                        dataID={ item.id + "RRFF" }
                                                        key={ item.id + "RRFF" }
                                                        level={1}
                                                        customMargin= "0px 50px 0px 155px"
                                                        originalcommentAuthor={item.author_nick}
                                                        rows={rows}
                                                        setRows={setRows}
                                                        userData={userData} 
                                                        storyID={artData.id} 
                                                        commentID={item.id} 
                                                        setArtDataComments={setArtDataComments} 
                                                    />



                                                    {item.comments?.map((item,i) => 
                                                
                                                        <div key={item.id} data-id={ item.id }>
                                                            <CommentDisplay key={item.id + "CD"} data-id={ item.id + "CD"} style={{margin: "20px 50px 0px 155px"}}>

                                                                <img key={item.id + "img"} data-id={ item.id + "img"} src={item.author_avatar}/>
                                                                <h3 key={item.id + "h3"} data-id={ item.id + "h3"}style={{alignSelf: "center", fontSize: ".6em", gridArea: "nick", marginRight: "8px"}}>{item.author_nick}</h3>
                                                                <span key={item.id + "span"} data-id={ item.id + "span"} style={{alignSelf: "center", gridArea: "date", fontSize: ".6em", color: "gray"}}><ReactTimeAgo key={item.id + "rta"} data-id={ item.id + "rta"} date={item.created_at ? new Date(item.created_at) : null} locale="en-US" timeStyle="round-minute"/></span>
                                                                <CommentBody key={item.id + "CB"} data-id={ item.id + "CB"} style={{gridArea: "body", fontSize: "15px"}}>{item.body}</CommentBody>
                                                                    
                                                                    
                                                                <BottomBarWrapper key={item.id + "bbw"} data-id={ item.id + "bbw"}>

                                                                    <Reply key={item.id + "r"} data-id={ item.id + "r"} onClick={() => handleReplyButton(item.id)}>reply</Reply>
                                                                    <VoteUp key={item.id + "vu"} data-id={ item.id + "vu"}>
                                                                    <svg key={item.id + "svg1"} data-id={ item.id + "svg1"} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path key={item.id + "path1"} data-id={ item.id + "path1"} d="M10.74.04a2.013 2.013 0 00-1.58 1.88c-.11 2.795-.485 4.45-2.283 6.946a1.272 1.272 0 00-1.065-.58h-4.55C.573 8.287 0 8.84 0 9.507v8.773c0 .667.572 1.218 1.263 1.218h4.55c.435 0 .821-.22 1.049-.548.263.204.506.387.758.533.417.24.887.384 1.532.45 1.29.128 3.403.032 8.283.052a.53.53 0 00.317-.113c1.224-.667 4.255-5.775 4.248-10.534-.026-1.138-.542-1.78-1.532-1.78H13.96c.388-2.47.131-4.738-.735-6.208C12.76.555 12.078.111 11.403.018a2.035 2.035 0 00-.663.022m2.154 7.912c-.055.28.201.58.498.58h6.934c.356.035.67.091.67.913 0 1.047-.168 2.886-1.031 5.057-.865 2.172-2.155 4.531-2.603 4.455-1.215.08-7.014.109-8.108 0-.556-.056-.818-.135-1.113-.306-.266-.152-.59-.423-1.066-.791v-7.6c2.349-2.88 2.979-5.302 3.096-8.3.338-1.495 1.702-1.082 2.179-.13.697 2.402.879 4.442.544 6.122M1.263 9.262h4.55c.148 0 .251.1.251.244v8.773c0 .144-.103.243-.252.243h-4.55c-.148 0-.251-.099-.251-.243V9.506c0-.144.103-.244.252-.244"></path></svg>
                                                                    <span key={item.id + "s1"} data-id={ item.id + "s1"}>10</span>
                                                                    
                                                                    </VoteUp>

                                                                    <VoteDown key={item.id + "vd"} data-id={ item.id + "vd"}>
                                                                    <svg key={item.id + "svg2"} data-id={ item.id + "svg2"} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path key={item.id + "path2"} data-id={ item.id + "path2"} d="M11.26 19.96a2.013 2.013 0 001.58-1.881c.11-2.794.484-4.45 2.282-6.945.224.345.618.58 1.066.58h4.548c.692 0 1.264-.553 1.264-1.22V1.722c0-.668-.572-1.22-1.264-1.22h-4.548c-.436 0-.823.22-1.05.55a6.898 6.898 0 00-.759-.534c-.416-.24-.887-.384-1.531-.45C11.558-.06 9.445.037 4.564.017a.521.521 0 00-.316.114C3.023.796-.007 5.904 0 10.663c.025 1.138.541 1.78 1.532 1.78H8.04c-.39 2.47-.131 4.738.735 6.208.467.794 1.148 1.238 1.823 1.331a2.034 2.034 0 00.663-.022m-2.155-7.913c.056-.28-.202-.579-.497-.579H1.674c-.356-.035-.67-.091-.67-.913 0-1.047.166-2.886 1.031-5.057C2.9 3.326 4.19.967 4.638 1.044c1.214-.081 7.014-.109 8.108 0 .556.055.818.134 1.113.305.265.152.59.423 1.066.791v7.6c-2.349 2.88-2.979 5.302-3.096 8.3-.338 1.495-1.702 1.083-2.179.13-.697-2.402-.88-4.442-.545-6.123m11.631-1.309h-4.548c-.149 0-.252-.1-.252-.244V1.722c0-.144.103-.244.252-.244h4.548c.15 0 .253.1.253.244v8.772c0 .144-.103.244-.253.244"></path></svg>                                
                                                                    <span key={item.id + "s2"} data-id={ item.id + "s2"}>1</span>
                                                                    
                                                                    </VoteDown>

                                                                </BottomBarWrapper>
                                                                    
                                                                    
                                                            </CommentDisplay>

                                                    
                                                            <ReplyReplyForm
                                                                setAreCommentsDoneLoading={setAreCommentsDoneLoading}
                                                                dataID={ item.id + "RRFF" }
                                                                key={ item.id + "RRFF" }
                                                                level={1}
                                                                customMargin= "0px 50px 0px 190px"
                                                                originalcommentAuthor={item.author_nick}
                                                                rows={rows}
                                                                setRows={setRows}
                                                                userData={userData} 
                                                                storyID={artData.id} 
                                                                commentID={item.id} 
                                                                setArtDataComments={setArtDataComments} 
                                                            />
                                                        </div>

                                                    )}


                                                </div>

                                            )}
                                        </div>
                                    
                                    
                                    
                                    )}


                                </CommentReply>
                                    
                            </div>

                        </div>
                            
                    ).reverse()}



                    
                    {editLink}



                        
                </Comments>
                
            </ArticleSection>
        </>
    );
}


export default Article;
