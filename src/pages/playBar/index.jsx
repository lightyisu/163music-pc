import { Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongDetailAction } from "../../common/actions";
import moment from "moment";
import "./index.styl";

const PlayBar = (props) => {
  let dispatch = useDispatch();
  let currentSong = useSelector((state) =>
    state.get("player").get("currentSong")
  );
  let audio = useRef();
  let [currentTime,setCurrentTime]=useState(0);
  let [isPlay, setPlay] = useState(false);
  let [sliderLength,setSliderLength]=useState(0);
  useEffect(() => {
    dispatch(getSongDetailAction(1804869019));
  }, []);
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
          <span>{currentSong.name} </span>
          <span className="bar-artist">{currentSong.ar[0].name}</span>
          <span className="play-duration">
            {moment.unix(currentTime).format("mm:ss")}/
            <span className="end-time">
              {moment.unix(currentSong.dt / 1000).format("mm:ss")}
            </span>
          </span>
          <Slider  className="bar-slider" value={sliderLength} />
        </div>
      </div>
      <div className="bar-operation">
        <i className="sprite-playbar volume-btn"></i>
        <i className="sprite-playbar order-btn"></i>
        <i className="sprite-playbar playlist-btn">
          <span className="playlist-num">3</span>
        </i>
      </div>
      <audio ref={audio} onTimeUpdate={(e)=>{
            let currentTime=Math.floor(audio.current.currentTime)
            setCurrentTime(currentTime)
          
         setSliderLength((currentTime/(currentSong.dt/1000))*100)
          
      }}></audio>
    </div>
  );
};
export default PlayBar;