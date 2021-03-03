import React from 'react';
import './Songcover.styl';
const Songcover=({imageUrl,playNum,title,desc})=>{
    return (
        <div className='song-cover'>
            <div className='coverup'>
            <img src={`${imageUrl}?param=140x140`} alt='cover'/>
            <i className='sprite-cover bg-effect'>ef</i>
            <i className='sprite-cover cover-bottom'>coverbottom</i>
            <i className='sprite-icon listen-icon'>listen</i>
            <i className='sprite-icon play-icon'>play</i>
            <i className='play-num'>{convertPlayNum(playNum)}万</i>
            </div>
            <h4>{title.slice(0,9)}...</h4>
            <p style={{fontSize:'10px',color:'gray'}}>{convertString(desc)}</p>
        </div>
    )
}

const convertPlayNum=(num)=>{
    if(num>10000){
        return (num/10000).toFixed(2)
    }
    else
        return num
}


const convertString=(str)=>{
    console.log(str.length)
    if(str.length<9){
        return str
    }
    else{
        return str.slice(0,9)+'...'
    }
}
export default Songcover