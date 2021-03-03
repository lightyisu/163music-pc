import React from "react";
import styled from "styled-components";
import "./Footer.styl";
const FooterDiv = styled.footer`
  min-width:1200px;
  font-family: "Microsoft YaHei";
  font-size: 13px;
  text-align: center;
  justify-content: center;
  display: flex;
  background-color: rgb(242, 242, 242);
  border-top: 0.6px solid lightgray;
  padding: 10px;
`;
const FooterRight1 = styled.a`
  font-size: 0px;
  display:inline-block;
  background-position: -73px -125px;
  margin:10px;
  width: 60px;
  height: 58px;
  background-size: 130px;
  ${(props) =>
    props.primary &&
    `
        
        background-position:0px 0px;
    `}
  ${(props) =>
    props.primary2 &&
    `
        
        background-position:-75px -62px;
    `}
      ${(props) =>
    props.primary3 &&
    `
       
        background-position:0px -125px;
    `}
`;

const Footer = (props) => {
  return (
    <FooterDiv>
      <div className="footer-left">
        <ul>
          <li>
            <a href="#">服务条款</a>
          </li>
          <li>
            <a href="#">隐私政策</a>
          </li>
          <li>
            <a href="#">儿童隐私政策</a>
          </li>
          <li>
            <a href="#">版权投诉指引</a>
          </li>
          <li>
            <a href="#">意见反馈</a>
          </li>
        </ul>
        <p>
          网易公司版权所有©1997-2020
          杭州乐读科技有限公司运营：浙网文[2018]3506-263号
          <br />
          违法和不良信息举报电话：0571-89853516 举报邮箱：ncm5990@163.com
          <br />
          粤B2-20090191-18 工业和信息化部备案管理系统网站 浙公网安备
          33010902002564号
        </p>
      </div>
      <div className="footer-right">
        <FooterRight1 href="#" className="sprite-footer-02">
          用户认证
        </FooterRight1>
        <FooterRight1 href="#" primary className="sprite-footer-02">
          独立音乐人
        </FooterRight1>
        <FooterRight1 href="#" primary2 className="sprite-footer-02">
          赞赏
        </FooterRight1>
        <FooterRight1 href="#" primary3 className="sprite-footer-02">
        视频奖励
        </FooterRight1>
      </div>
    </FooterDiv>
  );
};
export default Footer;
