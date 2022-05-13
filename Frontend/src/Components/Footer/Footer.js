import React from 'react';
import { Link } from 'react-router-dom';
import FooterContact from './FooterContact';
import { AiFillHome } from 'react-icons/ai'
import { FaCogs, FaNewspaper, FaFacebook, FaGithub, FaLinkedin, FaSlack } from 'react-icons/fa'
import { MdPrivacyTip, MdFeedback } from 'react-icons/md'



const Footer = () => {
  return <section className="footer--section card shadow-lg">
    <div className="container">
      <article className='footer--head--text'>
        <h4>Eappointment</h4>
      </article>
      <div className="row">
        <article className="lists col-md-3">
          <Link to="/"><li> <AiFillHome /> Home</li></Link>
          <Link to="/services"><li> <FaCogs /> Services</li></Link>
          <Link to="/privacy-policy"><li> <MdPrivacyTip />  Privacy</li></Link>
          <Link to="/newsletter"><li> <FaNewspaper /> Newsletter</li></Link>
          <Link to="/feedback"><li> <MdFeedback /> Feedback</li></Link>
        </article>
        <article className="lists col-md-3">
          <Link to="/facebook"><li> <FaFacebook /> Facebook</li></Link>
          <Link to="/github"><li> <FaGithub /> Github</li></Link>
          <Link to="/linkedln"><li> <FaLinkedin /> Linkedln</li></Link>
          <Link to="/slack"><li> <FaSlack /> Slack</li></Link>
        </article>
        <section className="contact--section col-md-6">
          <FooterContact />
        </section>
      </div>
      <article className='address'>
        <h5>Address</h5>
        <p>Groundfloor 725, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat, voluptates.</p>
      </article>
    </div>

    <section className="copyright--section">
      2021-22 &copy; All right reserved @eappointment
    </section>
  </section>
}

export default Footer