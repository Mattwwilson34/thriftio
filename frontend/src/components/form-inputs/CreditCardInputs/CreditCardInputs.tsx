interface Props {
  cardNumber: string
  cardExpiration: string
  securityCode: string
  setCardNumber: (cardNumber: string) => void
  setCardExpiration: (cardExpiration: string) => void
  setSecurityCode: (securityCode: string) => void
}

function CreditCardInputs({
  cardNumber,
  cardExpiration,
  securityCode,
  setCardNumber,
  setCardExpiration,
  setSecurityCode,
}: Props) {
  return (
    <>
      <label htmlFor="cardNumber">
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </label>
      <label htmlFor="cardExpiration">
        <input
          type="text"
          id="cardExpiration"
          name="cardExpiration"
          placeholder="MM/YY"
          value={cardExpiration}
          onChange={(e) => setCardExpiration(e.target.value)}
        />
      </label>
      <label htmlFor="securityCode">
        <input
          type="text"
          id="securityCode"
          name="securityCode"
          placeholder="Security Code"
          value={securityCode}
          onChange={(e) => setSecurityCode(e.target.value)}
        />
      </label>
    </>
  )
}

export default CreditCardInputs
