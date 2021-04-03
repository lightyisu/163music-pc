import { Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePlaySequenceAction, getSongDetailAction } from "../../common/actions";
import moment from "moment";
import "./index.styl";

const PlayBar = (props) => {
  let dispatch = useDispatch();
  let currentSong = useSelector((state) =>
    state.get("player").get("currentSong")
  );
  let currentSongIndex = useSelector((state) =>
    state.get("player").get("currentSongIndex")
  );
  let playSequence = useSelector((state) => (state.get('player').get('playSequence')));
  let audio = useRef();
  let slider = useRef();
  let prevIndex = useRef();
  let [currentTime, setCurrentTime] = useState(0);
  let [isPlay, setPlay] = useState(false);
  let [sliderLength, setSliderLength] = useState(0);
  let [isVolPanelOpen,setVolPanel]=useState(false)
  let [isDragging, setDragging] = useState(false);
  useEffect(() => {
    dispatch(getSongDetailAction(27203936));
  }, []);
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

  return (
    <div className="playBar sprite-playbar">
      <div className="bar-control">
        <i className="sprite-playbar previous-btn"></i>
        <i
          className={
            isPlay ? "pause-btn sprite-playbar" : "play-btn sprite-playbar"
          }
          onClick={() => {
            togglePlay();
          }}
        ></i>
        <i className="sprite-playbar next-btn"></i>
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






        <i className="sprite-playbar order-btn" onClick={() => {
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
          <span className="playlist-num">3</span>
        </i>
      </div>
      <audio
        ref={audio}
        src={`https://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`}
        onTimeUpdate={(e) => {
          if (!isDragging) {
            let currentTime = Math.floor(audio.current.currentTime);
            setCurrentTime(currentTime);
          }

          setSliderLength((currentTime / (currentSong.dt / 1000)) * 100);
          slider.current.state.value = sliderLength;
        }}
      ></audio>
    </div>
  );
};
export default PlayBar;
