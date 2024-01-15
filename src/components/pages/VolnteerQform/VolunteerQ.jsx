import React from 'react';
import './VolunteerQ.css';
import { useState } from 'react';
import Swal from 'sweetalert2';

function VoluteerQ() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
    const countYes = Array.from(radioButtons).filter((radio) => radio.value === 'Yes').length;
    const countNo = Array.from(radioButtons).filter((radio) => radio.value === 'No').length;
    const answeredQuestions = countYes + countNo;

    if (answeredQuestions !== 10) {
      Swal.fire({
        title: 'Incomplete!',
        text: 'Please answer all questions',
        icon: 'warning',
        confirmButtonText: 'Okay',
      });
      return;
    }

    if (countNo >= 3) {
      Swal.fire({
        title: 'Error!',
        text: 'You have not reached the requirements',
        icon: 'error',
        confirmButtonText: 'Try again',
      });
      return;
    }

    Swal.fire({
      title: 'Congratulations!',
      text: 'You are selected',
      icon: 'success',
      confirmButtonText: 'Cool',
    });
  };

  return (
    <div>
      <form className='form' onSubmit={handleFormSubmit}>
        <h2 className="container-one">Hey Volunteer</h2>
        <p className="para-one">If you're interested in volunteering with us, we're thrilled to have you join our team! Our volunteer opportunities are an essential part of our organization's success, and your dedication can make a meaningful impact. As a prospective volunteer, you may have a few simple questions before you get started</p>
        <br/><br/>

        <label htmlFor="q1">I have relevant background and experience for this volunteer position.
          <label><input type="radio" className="interviewq" name="q1" value="Yes" /> Yes</label>
          <label><input type="radio" className="interviewq" name="q1" value="No" /> No</label>
        </label><br/><br/>
        <label htmlFor="q2">I am specifically interested in volunteering with your organization.
          <label><input type="radio" className="interviewq" name="q2" value="Yes" /> Yes</label>
          <label><input type="radio" className="interviewq" name="q2" value="No" /> No</label>
        </label><br/><br/>
        <label htmlFor="q3">My skills and experience align with the responsibilities of this role.
          <label><input type="radio" className="interviewq" name="q3" value="Yes" /> Yes</label>
          <label><input type="radio" className="interviewq" name="q3" value="No" /> No</label>
        </label><br/><br/>
        <label htmlFor="q4">I have previous volunteer experiences from which I've learned.
          <label><input type="radio" className="interviewq" name="q4" value="Yes" /> Yes</label>
          <label><input type="radio" className="interviewq" name="q4" value="No" /> No</label>
        </label><br/><br/>
        <label htmlFor="q5">I hope to gain something specific through my volunteer work with your organization.
          <label><input type="radio" className="interviewq" name="q5" value="Yes" /> Yes</label>
          <label><input type="radio" className="interviewq" name="q5" value="No" /> No</label>
        </label><br/><br/>
        <label htmlFor="q6">I am available to commit to the required hours and schedule for this volunteer role.
          <label><input type="radio" className="interviewq" name="q6" value="Yes" /> Yes</label>
          <label><input type="radio" className="interviewq" name="q6" value="No" /> No</label>
        </label><br/><br/>
        <label htmlFor="q7">I can identify potential challenges in this role and know how to overcome them.
          <label><input type="radio" className="interviewq" name="q7" value="Yes" /> Yes</label>
          <label><input type="radio" className="interviewq" name="q7" value="No" /> No</label>
        </label><br/><br/>
        <label htmlFor="q8">I work well in a team and have had successful teamwork experiences.
          <label><input type="radio" className="interviewq" name="q8" value="Yes" /> Yes</label>
          <label><input type="radio" className="interviewq" name="q8" value="No" /> No</label>
        </label><br/><br/>
        <label htmlFor="q9">I can effectively manage my time and prioritize tasks.
          <label><input type="radio" className="interviewq" name="q9" value="Yes" /> Yes</label>
          <label><input type="radio" className="interviewq" name="q9" value="No" /> No</label>
        </label><br/><br/>
        <label htmlFor="q10">I can resolve difficult situations when volunteering or working with others.
          <label><input type="radio" className="interviewq" name="q10" value="Yes" /> Yes</label>
          <label><input type="radio" className="interviewq" name="q10" value="No" /> No</label>
        </label><br/><br/>

        <button type="submit" className="btn-one">Submit</button>
      </form>
    </div>
  );
}

export default VoluteerQ;