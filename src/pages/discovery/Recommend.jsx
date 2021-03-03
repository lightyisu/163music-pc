import React, { useCallback, useEffect, useRef } from "react";
import { Carousel } from "antd";
import "./Recommend.styl";
import { useDispatch, useSelector } from "react-redux";
import TopicHeader from "../../components/TopicHeader";
import { getHotRecommendAction, getHotStreamerAction, getNewAlbumAction, getSettleSingerAction, getToprankingAction } from "../../common/actions";
import Songcover from "../../components/Songcover";
import AlbumCover from "../../components/AlbumCover";
import Topranking from "../../components/Topranking";
import Singersettle from "../../components/Singersettle";
import Hotstreamer from "../../components/Hotstreamer";

let contentStyle = {
  height: "260px",
  color: "#fff",
  lineHeight: "170px",
  textAlign: "center",
  background: "#364d79",
  backgroundSize: "cover",
};
let albumStyle = {
  height: "130px",

  padding: "40px",

  margin: "0px",
};
const Recommend = (props) => {
  const bannersTop = useSelector((state) =>
    state.get("recommend").get("banners")
  );
  const albums = useSelector((state) => state.get("recommend").get("newAlbum"));
  let banners = null;
  if (bannersTop) {
    banners = bannersTop.banners;
  }
  let dispatch = useDispatch();
  let carousel = useRef();
  let topBanners = useRef();
  let albumCarousel = useRef();
  const changeBannerBackground = useCallback((from, to) => {
    topBanners.current.style.background = `url(${banners[to].imageUrl}?imageView&blur=40x20)`;
  });

  useEffect(() => {
    dispatch(getHotRecommendAction(8));
    console.log(recommends);
    dispatch(getNewAlbumAction());
    dispatch(getToprankingAction());
    dispatch(getSettleSingerAction());
    dispatch(getHotStreamerAction());
  }, []);
  let recommends = useSelector((state) =>
    state.get("recommend").get("hotRecommend")
  );
  let topRanking=useSelector((state)=>state.get('recommend').get('top_ranking'))
  let settleSingers=useSelector((state)=>state.get('recommend').get('settle_singer'))
  let hotStreamers=useSelector((state)=>state.get('recommend').get('hotStreamer'))
  if (!banners || !recommends||!albums||!topRanking||!settleSingers) {
    return (
      <div>
        <p>加载中</p>
      </div>
    );
  }

  return (
    <div className="recommendPage">
      <div
        className="top-banners"
        ref={topBanners}
        style={{
          background: `url(${banners[0].imageUrl}?imageView&blur=40x20)`,
        }}
      >
        <i
          className="banner-sprite left-btn"
          onClick={() => {
            carousel.current.prev();
          }}
        >
          prev
        </i>
        <div className="banners">
          <Carousel
            beforeChange={changeBannerBackground}
            ref={carousel}
            effect="fade"
            easing="linear"
            autoplay
          >
            {banners.map((banner, index) => {
              return (
                <div key={index}>
                  <h3
                    style={{
                      ...contentStyle,
                      background: `url(${banner.imageUrl})`,
                    }}
                  ></h3>
                </div>
              );
            })}
          </Carousel>
        </div>
        <a href="#" className="download">
          download
        </a>
        <i
          className="banner-sprite right-btn"
          onClick={() => {
            carousel.current.next();
          }}
        >
          next
        </i>
      </div>

      <div className="content">
        <div className="wrap">
          <div className="left-content">
            <TopicHeader
              title="热门推荐"
              keywords={["华语", "流行", "摇滚", "民谣", "电子"]}
            />
            <div className="recommendsHotCovers">
              {recommends.map((recommend, index) => {
                return (
                  <Songcover
                    key={index}
                    imageUrl={recommend.picUrl}
                    title={recommend.name}
                    desc={recommend.copywriter}
                    playNum={recommend.playCount}
                  />
                );
              })}
            </div>
            <TopicHeader title="新碟上架" />
            <div className="newAlbumContainer">
              <i
                onClick={() => {
                  albumCarousel.current.prev();
                }}
                className="sprite-02"
                id="album-left-btn"
              >
                prev
              </i>
              <div style={{ width: "95%", display: "inline-block" }}>
                <Carousel ref={albumCarousel} dots={false}>
                  {[0, 1].map((item) => {
                    return (
                      <div key={item}>
                        {albums
                          .slice(item * 5, (item + 1) * 5)
                          .map((nItem, index) => {
                            return (
                              <AlbumCover
                                key={index}
                                imgUrl={nItem.picUrl}
                                title={nItem.name}
                                artist={nItem.artist.name}
                              />
                            );
                          })}
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              <i
                onClick={() => {
                  albumCarousel.current.next();
                }}
                className="sprite-02"
                id="album-right-btn"
              >
                next
              </i>
            </div>
            <TopicHeader title="榜单" />
            <div className='recommend-top-bg'>
                {topRanking.map((top,index)=>{
                  return (
                    <Topranking key={index} imgUrl={top.coverImgUrl} title={top.name}
                    tracks={top.tracks.slice(0,10)}/>
                  )
                })}
            </div>
          </div>
          <div className="right-content">
            <div className='sprite-02 login-entrance'>
            登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
            <i className='sprite-02 login-btn'>用户登录</i>
            </div>
            <Singersettle singers={settleSingers}/>
            <Hotstreamer streamers={hotStreamers}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Recommend;
