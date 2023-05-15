import { useState, useContext } from 'react'
import styles from './checkout-information-accordian.module.scss'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'
import AccordianWrapper from '@/components/accordian-wrapper/AccordianWrapper'
import AddressPreview from '../AddressPreview/AddressPreview'
import CreditCardPreview from '../CreditCardPreview/CreditCardPreview'
import ProductCheckoutCard from '../ProductCheckoutCard/ProductCheckoutCard'
import {
  NameInput,
  AddressInput,
  CityInput,
  StateInput,
  ZipCodeInput,
  CountryInput,
  CreditCardInputs,
} from '@/components/form-inputs'

function CheckoutInformationAccordian() {
  // checkout form state
  const [creditCardFormOpen, setCreditCardFormOpen] = useState(true)
  const [addressFormOpen, setAddressFormOpen] = useState(true)
  const [name, setName] = useState('Matt Wilson')
  const [address, setAddress] = useState('2532 Ross Road')
  const [city, setCity] = useState('Durham')
  const [state, setState] = useState('NC')
  const [zipCode, setZipCode] = useState('27703')
  const [country, setCountry] = useState('United States')
  const [cardNumber, setCardNumber] = useState('4266-5436-5698-9765')
  const [cardExpiration, setCardExpiration] = useState('03/17')
  const [securityCode, setSecurityCode] = useState('123')

  // shopping cart context
  const { state: shoppingCartState } = useContext(ShoppingCartContext)
  const { shoppingCart } = shoppingCartState

  function validateAddress() {
    if (!name || !address || !city || !state || !zipCode || !country) {
      return false
    }
    return true
  }

  // prevent default form submission
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault()

  const toggleAddressForm = () => setAddressFormOpen(!addressFormOpen)
  const toggleCreditForm = () => setCreditCardFormOpen(!creditCardFormOpen)

  let formIsValid = validateAddress()

  return (
    <div className={styles.checkoutInformationAccordian}>

      {/* shipping address */}
      <h2 className={styles.checkoutSectionHeader}>Shipping Address</h2>
      {!addressFormOpen && (
        <>
          <AddressPreview
            name={name}
            address={address}
            city={city}
            state={state}
            zipCode={zipCode}
          />
          <button onClick={toggleAddressForm}>Edit Shipping Address</button>
        </>
      )}
      <AccordianWrapper open={addressFormOpen}>
        <form className={styles.shippingAddressForm} onSubmit={preventDefault}>
          <NameInput name={name} setName={setName} />
          <AddressInput address={address} setAddress={setAddress} required />
          <div>
            <CityInput city={city} setCity={setCity} required />
            <StateInput state={state} setState={setState} required />
            <ZipCodeInput zipCode={zipCode} setZipCode={setZipCode} required />
          </div>
          <CountryInput country={country} setCountry={setCountry} required />
          <input
            type="submit"
            value="Continue to payment"
            onClick={() => setAddressFormOpen(!addressFormOpen)}
            disabled={!formIsValid}
          />
        </form>
      </AccordianWrapper>

      {/* payment method */}
      <h2 className={styles.checkoutSectionHeader}>Payment Method</h2>
      {!creditCardFormOpen && (
        <>
          <CreditCardPreview
            cardNumber={cardNumber}
            cardExpiration={cardExpiration}
            securityCode={securityCode}
          />
          <button onClick={toggleCreditForm}>Edit Payment Method</button>
        </>
      )}
      <AccordianWrapper open={creditCardFormOpen}>
        <form className={styles.creditCardForm} onSubmit={preventDefault}>
          <CreditCardInputs
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardExpiration={cardExpiration}
            setCardExpiration={setCardExpiration}
            securityCode={securityCode}
            setSecurityCode={setSecurityCode}
          />
          <input
            type="submit"
            value="Continue to Order Review"
            onClick={toggleCreditForm}
          />
        </form>
      </AccordianWrapper>

      {/* product preview */}
      <h2 className={styles.checkoutSectionHeader}>Order Review</h2>
      {shoppingCart.map((product) => {
        return <ProductCheckoutCard product={product} />
      })}
    </div>
  )
}

export default CheckoutInformationAccordian
