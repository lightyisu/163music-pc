import { Slider,message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentSongAction, changePlaySequenceAction, getSongDetailAction } from "../../common/actions";
import moment from "moment";
import "./index.styl";
import { CHANGE_PLAYLIST, CHANGE_SONG_INDEX } from "../../constants/actionType";

const PlayBar = (props) => {
  let dispatch = useDispatch();
  let currentSong = useSelector((state) =>
    state.get("player").get("currentSong")
  );
  let currentSongIndex = useSelector((state) =>
    state.get("player").get("currentSongIndex")
  );
  let playSequence = useSelector((state) => (state.get('player').get('playSequence')));
  let playList=useSelector((state)=>(state.get("player").get('playlist')));
  let lyrics=useSelector((state)=>(state.get('player').get('lyrics')))

  let audio = useRef();
  let slider = useRef();
  let prevIndex = useRef();
  let [currentTime, setCurrentTime] = useState(0);
  let [isPlay, setPlay] = useState(false);
  let [sliderLength, setSliderLength] = useState(0);
  let [isVolPanelOpen,setVolPanel]=useState(false)
  let [isDragging, setDragging] = useState(false);
  let [lyricContent,setLyricContent]=useState('');
  let [lyricsList,setLyricList]=useState([])
  useEffect(() => {
    dispatch(getSongDetailAction(27203936))
    
  }, []);
  useEffect(()=>{
    setLyricList(lyrics)
    
    console.log(lyricsList)
  },[lyrics])
  useEffect(() => {

    if (prevIndex.current || prevIndex.current === 0) {

      audio.current.autoplay = true;
      setPlay(true)
    }
    prevIndex.current = currentSongIndex;


  }, [currentSongIndex])
  if (!currentSong) {
    return <div></div>;
  }

  const togglePlay = () => {
    if (!isPlay) {
      setPlay(!isPlay);
      if (!audio.current.src) {
        audio.current.src = `https://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`;
      }
      audio.current.play();
    } else {
      setPlay(!isPlay);
      audio.current.pause();
    }
  };
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }
  return (
    <div className="playBar sprite-playbar">
      <div className="bar-control">
        <i className="sprite-playbar previous-btn"
            onClick={()=>{
              if(currentSongIndex!==playList.length-1){
                dispatch(changeCurrentSongAction(playList[currentSongIndex+1]))
                dispatch({type:CHANGE_SONG_INDEX,payload:currentSongIndex+1})
              }
            }}
        ></i>
        <i
          className={
            isPlay ? "pause-btn sprite-playbar" : "play-btn sprite-playbar"
          }
          onClick={() => {
            togglePlay();
           
          }}
        ></i>
        <i className="sprite-playbar next-btn" onClick={()=>{
          if(currentSongIndex!==0){
            dispatch(changeCurrentSongAction(playList[currentSongIndex-1]))
                dispatch({type:CHANGE_SONG_INDEX,payload:currentSongIndex-1})
          }
        }}></i>
      </div>
      <div className="bar-playinfo">
        <img
          className="bar-cover"
          src={`${currentSong.al.picUrl}?param=35x35`}
          alt="cover"
        />

        <div className="playinfo-right">
          <div className="playinfo-detail">
            <span>{currentSong.name} </span>
            <span className="bar-artist">{currentSong.ar[0].name}</span>
          </div>
          <span className="play-duration">
            {moment.unix(currentTime).format("mm:ss")}/
            <span className="end-time">
              {moment.unix(currentSong.dt / 1000).format("mm:ss")}
            </span>
          </span>
          <Slider
            className="bar-slider"
            ref={slider}
            defaultValue={0}
            onChange={(value) => {
              setDragging(true);
              setCurrentTime((value / 100) * (currentSong.dt / 1000));
            }}
            onAfterChange={() => {
              setDragging(false);
              audio.current.currentTime = currentTime;
            }}
          />
        </div>
      </div>
      <div className="bar-operation">
        <i className="sprite-playbar volume-btn" onClick={() => {
          setVolPanel(!isVolPanelOpen)
        }} >

          <div className='volume-panel sprite-playbar' style={isVolPanelOpen?{}:{display:'none'}}>
            <Slider style={{height:'90%'}} vertical defaultValue={30} onChange={(val)=>{
                audio.current.volume=val/100;
            }}/>
          </div>

        </i>





        {/**0:顺序播放 , 1:随机播放 ,2: 单曲循环 */}
        <i className={playSequence==0?'sprite-playbar sequential-play':(playSequence==1?'sprite-playbar random-play':'sprite-playbar single-cycle')} onClick={() => {
          //THE LOGIC OF SWITCH PLAYLIST ORDER(SEQUENCE)
          if (playSequence < 2) {
            dispatch(changePlaySequenceAction(playSequence + 1))
          }
          else {
            dispatch(changePlaySequenceAction(0))
          }

        }}>


        </i>
        <i className="sprite-playbar playlist-btn">
          <span className="playlist-num" style={{color:'lightgray'}}>{playList.length}</span>
        </i>
      </div>
      <audio
        ref={audio}
        src={`https://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`}
        onTimeUpdate={(e) => {
          let lyrics1=lyricsList;
          for(let i=0;i<lyrics1.length;i++){
            if(audio.current.currentTime*1000>lyrics1[i].totalTime){
              message.destroy()
              setLyricContent(lyrics1[i+1].textContent) 
              lyrics1.shift();
              setLyricList(lyrics1);      
              message.info(lyricContent,0)
              break;
            }
            break;
          }
         
          console.log(lyricContent)    

          
          
          if (!isDragging) {
            let currentTime = Math.floor(audio.current.currentTime);
            setCurrentTime(currentTime);
          }

          setSliderLength((currentTime / (currentSong.dt / 1000)) * 100);
          slider.current.state.value = sliderLength;
        }}
        onEnded={()=>{
          if(currentSongIndex!==0&&playSequence===0){
          let playlist_pop=playList;
          playlist_pop.pop();
          dispatch(changeCurrentSongAction(playList[currentSongIndex-1]))
          dispatch({type:CHANGE_SONG_INDEX,payload:currentSongIndex-1})
          dispatch({type:CHANGE_PLAYLIST,payload:playlist_pop})
          }
          else if(playSequence===2){
            audio.current.currentTime=0;
            audio.current.play()
          }
          else if(playSequence===1){
            let index=getRandomInt(0,playList.length)
            dispatch(changeCurrentSongAction(playList[index]));
            dispatch({type:CHANGE_SONG_INDEX,payload:index})
            audio.current.play()
          }
        }}
      ></audio>
    </div>
  );
};
export default PlayBar;
