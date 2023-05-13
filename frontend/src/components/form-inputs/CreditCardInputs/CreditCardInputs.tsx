function CreditCardInputs() {
  return (
    <>
      <label htlmFor="cardNumber">
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="Card Number"
        />
      </label>
      <label htmlFor="cardExpiration">
        <input
          type="text"
          id="cardExpiration"
          name="cardExpiration"
          placeholder="MM/YY"
        />
      </label>
      <label htmlFor="cardCVC">
        <input type="text" id="cardCVC" name="cardCVC" placeholder="CVC" />
      </label>
    </>
  )
}

export default CreditCardInputs
