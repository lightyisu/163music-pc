 import React from 'react';
 import styled from 'styled-components';
 import './Topranking.styl'
 const Li=styled.li`
    font-size:11px;
    margin-bottom:4px;
    width:140px;
    height:28px;
    overflow:hidden;
    &:hover{
        width:215px;

    }
  

 `

 const Topranking=({imgUrl,title,tracks})=>{
     return (
         <div style={{width:'232px'}}>
             <img style={{padding:'20px'}}  src={`${imgUrl}?param=80x80`}/>
           <div style={{display:'inline-block'}}>
               <h3 style={{margin:'0px',lineHeight:'15px',fontWeight:'bold'}}>云音乐{title}</h3>
               <i className='sprite-02 ranking-top-btn'>2</i>
           </div>
           <div>
               <ul style={{listStyle:'none',paddingLeft:'16px'}}>
                   {tracks.map((track,index)=>{
                       return (<Li key={index}>
                           <div className='rank-song-content'>
                           <span className={index<3?'top-highlight top-index':'top-index'}>{index+1} </span>
                           {convertName(track.name)}
                           </div>
                           
                           <a href='#' className='sprite-02 ranklist-play ranklist-btn'></a>
                           <a href='#' className='sprite-icon2 ranklist-add ranklist-btn'></a>
                           <a href='#' className='sprite-02 ranklist-collect ranklist-btn'></a>
                         
                           </Li>)
                   })}
             
               </ul>
           </div>
         </div>
     )
 }
 const convertName=name=>{
     if(name.length>24){
         return name.slice(0,24)+'...'
     }
     else 
        return name
 }
 export default Topranking;