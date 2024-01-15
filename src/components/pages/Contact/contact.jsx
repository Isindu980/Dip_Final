import React, { useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import './contact.css';

function Contact() {
  const formRef = useRef();
  const textCenterRef = useRef();
  const titleRef = useRef();
  const subRef = useRef();

  useEffect(() => {
    const animateElements = () => {
      textCenterRef.current.classList.add('show');
      titleRef.current.classList.add('show');
      subRef.current.classList.add('show');
    };

    animateElements();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_ozfducn", "template_eeeoziq", formRef.current, "1U-758fZPOJ7Wxn2o")
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    e.target.reset();
  };

  return (
    <section>
      <div className="cservice-top">
        <h2 ref={textCenterRef} className='ctext-center'>Contact Us</h2>
        <div ref={titleRef} className="ctitle">Get In Touch</div>
        <div ref={subRef} className="csub">Questions? Feedback? We're all ears! Our team is here and ready to assist. </div>
        <form ref={formRef} onSubmit={sendEmail} className='--form-control --card--flex-center --dir-column'>
          <input type="text" placeholder='Full Name' name='user_name' required />
          <input type="email" placeholder='Email' name='user_email' required />
          <input type="text" placeholder='Subject' name='subject' required />
          <textarea name="message" cols="30" rows="10" placeholder='Type your Message here'></textarea>
          <button type='submit' className='btn-conprimary'>Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
