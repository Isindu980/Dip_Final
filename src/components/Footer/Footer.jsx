import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="fcontainer">
          <div className="row">
            <div className="footer-col">
              <h4>company</h4>
              <ul>
                <li><a href="/about">about us</a></li>
                <li><a href="/service">our services</a></li>
                <li><a href="/privacy">privacy policy</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Who can Join</h4>
              <ul>
                <li><a href="/vlogin">Volunteers</a></li>
                <li><a href="/ologin">Organizations</a></li>
                <li><a href="/clogin">Customers</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <a href="#"><img src='fb.png' alt="Facebook" /></a>
                <a href="#"><img src='twit.png' alt="Twitter" /></a>
                <a href="#"><img src='insta.png' alt="Instagram" /></a>
                <a href="#"><img src='linked.png' alt="LinkedIn" /></a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="footer-c">
              <p>&copy; 2023 volunT. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
