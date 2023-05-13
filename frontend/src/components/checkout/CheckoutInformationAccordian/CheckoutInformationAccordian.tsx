import { useState } from 'react'
import styles from './checkout-information-accordian.module.scss'
import AccordianWrapper from '@/components/accordian-wrapper/AccordianWrapper'
import AddressPreview from '../AddressPreview/AddressPreview'
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
  const [creditCardFormOpen, setCreditCardFormOpen] = useState(true)
  const [addressFormOpen, setAddressFormOpen] = useState(true)
  const [name, setName] = useState('Matt Wilson')
  const [address, setAddress] = useState('2532 Ross Road')
  const [city, setCity] = useState('Durham')
  const [state, setState] = useState('NC')
  const [zipCode, setZipCode] = useState('27703')
  const [country, setCountry] = useState('United States')

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

        { !creditCardFormOpen && (
        <>
          <button onClick={toggleCreditForm}>Edit Payment Method</button>
        </>
        )}
        <AccordianWrapper open={creditCardFormOpen}>
      <form className={styles.creditCardForm} onSubmit={preventDefault}>
          <CreditCardInputs />
          <input type="submit" value="Continue to Order Review" onClick={toggleCreditForm}/>
      </form>
       </AccordianWrapper>
    </div>
  )
}

export default CheckoutInformationAccordian
