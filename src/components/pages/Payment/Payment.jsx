import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './Payment.css';

function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');

  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    amount: '',
  });

  const validateCardNumber = (value) => {
    return /^\d{16}$/.test(value);
  };

  const validateCardHolder = (value) => {
    return value.trim() !== '';
  };

  const validateExpiry = (value) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;
    const [month, year] = value.split('/');
    const currentYear = new Date().getFullYear() % 100;
    return parseInt(month) <= 12 && parseInt(month) >= 1 && parseInt(year) >= currentYear;
  };

  const validateCvv = (value) => {
    return /^\d{4}$/.test(value);
  };

  const validateAmount = (value) => {
    return /^\d+(\.\d{1,2})?$/.test(value);
  };

  const handleValidation = () => {
    const newErrors = {
      cardNumber: '',
      cardHolder: '',
      expiry: '',
      cvv: '',
      amount: '',
    };

    if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = 'Invalid card number (must be 16 digits)';
    }

    if (!validateCardHolder(cardHolder)) {
      newErrors.cardHolder = 'Cardholder name is required';
    }

    if (!validateExpiry(expiry)) {
      newErrors.expiry = 'Invalid expiry date (format: MM/YY)';
    }

    if (!validateCvv(cvv)) {
      newErrors.cvv = 'Invalid CVV (must be 4 digits)';
    }

    if (!validateAmount(amount)) {
      newErrors.amount = 'Invalid amount (must be a valid number)';
    }

    setErrors(newErrors);
  };

  return (
    <div className="credit-card-container">
      <Cards
        number={cardNumber}
        name={cardHolder}
        expiry={expiry}
        cvc={cvv}
      />
      <form className="card-form">
        <input
          className={`cred-input ${errors.cardNumber ? 'input-error' : ''}`}
          type="text"
          name="number"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
        <input
          className={`cred-input ${errors.cardHolder ? 'input-error' : ''}`}
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />
        {errors.cardHolder && <span className="error-message">{errors.cardHolder}</span>}
        <input
          className={`cred-input ${errors.expiry ? 'input-error' : ''}`}
          type="text"
          name="expiry"
          placeholder="MM/YY Expiration Date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        {errors.expiry && <span className="error-message">{errors.expiry}</span>}
        <input
          className={`cred-input ${errors.cvv ? 'input-error' : ''}`}
          type="text"
          name="cvc"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        {errors.cvv && <span className="error-message">{errors.cvv}</span>}
        <input
          className={`cred-input ${errors.amount ? 'input-error' : ''}`}
          type="text"
          name="amount"
          placeholder="Amount (LKR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && <span className="error-message">{errors.amount}</span>}
      </form>
      <button className="proceed-to-payment-button" onClick={handleValidation}>
  Proceed to Payment
</button>
    </div>
  );
}

export default CreditCardForm;
