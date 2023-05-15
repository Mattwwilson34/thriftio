import styles from './credit-card-preview.module.scss'

interface Props {
  cardNumber: string
  cardExpiration: string
  securityCode: string
}

function hideCreditCardNumber(cardNumber: string): string {
  let cardNumberCopy = cardNumber
  for (let i = 0; i < cardNumberCopy.length - 4; i++) {
    if (cardNumberCopy[i] === '-') continue
    cardNumberCopy = cardNumberCopy.replace(cardNumberCopy[i], 'X')
  }
  return cardNumberCopy
}

function CreditCardPreview({
  cardNumber,
  cardExpiration,
  securityCode,
}: Props): JSX.Element {
  return (
    <div className={styles.creditCardPreview}>
      <p>Card Number: {hideCreditCardNumber(cardNumber)}</p>
      <p>Expiration: {cardExpiration}</p>
    </div>
  )
}

export default CreditCardPreview
