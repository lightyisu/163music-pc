import React from 'react';
import styled from 'styled-components';
import './AlbumCover.styl'
const AlbumWrapper=styled.div`
   
    width:100px;
    height:120px;
    display:inline-block;
    margin-right:25px;
    padding:10px;
    
`
const AlbumCover=({imgUrl,title,artist})=>{
    return (
        <AlbumWrapper >
            <div className='albumCover sprite-cover'>
            <img src={`${imgUrl}?param=100x100`}  alt='cover'/>
            </div>
            <p  className='albumCoverTitle' style={{lineHeight:'7px'}}>{convertCoverTitle(title)}</p>
            <p className='albumCoverArtist'>{artist}</p>    
        
        </AlbumWrapper>
    )
}
const convertCoverTitle=title=>{
    if(title.length>17){
        return title.slice(0,17)+'...'
    }
    else    
        return title
}
export default AlbumCover;