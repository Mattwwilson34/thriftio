import { useState } from 'react'
import styles from './checkout-shipping-address-form.module.scss'
import states from '@/utils/form-dropdown-data/us-states.json'
import { countries } from '@/utils/form-dropdown-data/countries'

type ShippingAddressFormState = {
  name: string
  streetAddressLineOne: string
  streetAddressLineTwo: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

type CheckoutShippingAddressFormProps = {
  shippingAddressFormState: ShippingAddressFormState
  setShippingAddressFormState: React.Dispatch<
    React.SetStateAction<ShippingAddressFormState>
  >
}

function CheckoutShippingAddressForm({
  shippingAddressFormState: formState,
  setShippingAddressFormState,
}: CheckoutShippingAddressFormProps) {
  //
  // handle input change
  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { id, value } = e.target
    if (e.target.tagName === 'SELECT') {
      // Handle select elements separately
      setShippingAddressFormState((prevState) => ({
        ...prevState,
        [id]: value,
      }))
    } else {
      // Handle input elements
      setShippingAddressFormState((prevState) => ({
        ...prevState,
        [id]: value,
      }))
    }
  }

  // handle form submission
  function handleFormSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(formState)
  }

  return (
    <form className={styles.form} onSubmit={handleFormSubmission}>
      {/* first and last name input */}
      <label htmlFor="name">
        Full Name (First and Last name)
        <input
          id="name"
          type="text"
          value={formState.name}
          onChange={handleInputChange}
          required
        ></input>
      </label>
      {/* street address line 1 */}
      <label htmlFor="streetAddressLineOne">
        Address
        <input
          id="streetAddressLineOne"
          type="text"
          value={formState.streetAddressLineOne}
          placeholder="Street address or P.O Box"
          onChange={handleInputChange}
          required
        ></input>
      </label>
      {/* street address line 2 */}
      <label htmlFor="streetAddressLineTwo">
        Address
        <input
          id="streetAddressLineTwo"
          type="text"
          value={formState.streetAddressLineTwo}
          onChange={handleInputChange}
          placeholder="Apt, suite, unit, building, floor, etc."
        ></input>
      </label>
      {/* city input */}
      <label htmlFor="city">
        City
        <input
          id="city"
          type="text"
          value={formState.city}
          onChange={handleInputChange}
          required
        ></input>
      </label>
      {/* state input */}
      <label htmlFor="state">
        State
        <select
          id="state"
          value={formState.state}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select
          </option>
          {Object.values(states).map((state) => (
            <option value={state}>{state}</option>
          ))}
        </select>
      </label>
      {/* zip code input */}
      <label htmlFor="zipCode">
        Zip Code
        <input
          id="zipCode"
          type="number"
          value={formState.zipCode}
          pattern="[0-9]{5}"
          placeholder="5-digit zip code"
          onChange={handleInputChange}
          required
        ></input>
      </label>
      {/* country input */}
      <label htmlFor="country">
        Country
        <select
          id="country"
          value={formState.country}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select
          </option>
          {countries.map((country) => (
            <option value={country.name}>{country.name}</option>
          ))}
        </select>
      </label>
      {/* phone number input */}
      <label htmlFor="phone">
        Phone Number
        <input
          id="phone"
          type="tel"
          value={formState.phone}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="999-999-9999"
          onChange={handleInputChange}
          required
        ></input>
      </label>
      {/* submit button */}
      <label htmlFor="continueToPayment">
        <input
          id="continueToPayment"
          type="submit"
          value="Continue to Payment"
        />
      </label>
    </form>
  )
}

export default CheckoutShippingAddressForm
