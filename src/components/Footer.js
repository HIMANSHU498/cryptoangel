import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icon">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
          alt="instagram"
          className="footer-img"
        />
        <img
          src="https://abre.bio/uploads/block_thumbnail_images/1a8c7f8948810ba621db5dd371017e28.png"
          alt="twitter"
          className="footer-img"
        />
        <img
          src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"
          alt="fb"
          className="footer-img"
        />
      </div>
    </div>
  );
};

export default Footer;
