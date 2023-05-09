import { useState } from 'react'
import styles from './checkout-information-accordian.module.scss'
import CheckoutShippingAddressForm from '../CheckoutShippingAddressForm/CheckoutShippingAddressForm'
import {
  NameInput,
  AddressInput,
  CityInput,
  StateInput,
  ZipCodeInput,
  CountryInput,
} from '@/components/form-inputs'

function CheckoutInformationAccordian() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [country, setCountry] = useState('')

  return (
    <div className={styles.checkoutInformationAccordian}>
      <CheckoutShippingAddressForm>
        <NameInput name={name} setName={setName} />
        <AddressInput
          address={address}
          setAddress={setAddress}
          label="Street Address"
          required
        />
        <div>
          <CityInput city={city} setCity={setCity} required />
          <StateInput state={state} setState={setState} required />
          <ZipCodeInput zipCode={zipCode} setZipCode={setZipCode} required />
        </div>
        <CountryInput country={country} setCountry={setCountry} required />
        <input type="submit" value="Continue to payment" />
      </CheckoutShippingAddressForm>
    </div>
  )
}

export default CheckoutInformationAccordian
