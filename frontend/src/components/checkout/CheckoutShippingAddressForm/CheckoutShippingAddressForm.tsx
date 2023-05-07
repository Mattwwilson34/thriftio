import styles from './checkout-shipping-address-form.module.scss'
import states from '@/utils/form-dropdown-data/us-states.json'
import { countries } from '@/utils/form-dropdown-data/countries'

function CheckoutShippingAddressForm() {
  return (
    <form className={styles.form}>
      <label htmlFor="name">
        Full Name (First and Last name)
        <input id="name" type="text" required></input>
      </label>
      <label htmlFor="streetAddressLineOne">
        Address
        <input
          id="streetAddressLineOne"
          type="text"
          placeholder="Street address or P.O Box"
          required
        ></input>
      </label>
      <label htmlFor="streetAddressLineTwo">
        Address
        <input
          id="streetAddressLineTwo"
          type="text"
          placeholder="Apt, suite, unit, building, floor, etc."
        ></input>
      </label>
      <label htmlFor="city">
        City
        <input id="city" type="text" required></input>
      </label>
      <label htmlFor="state">
        State
        <select id="state" required>
          <option value="" disabled>
            Select
          </option>
          {Object.values(states).map((state) => (
            <option value={state}>{state}</option>
          ))}
        </select>
      </label>
      <label htmlFor="zipCode">
        Zip Code
        <input
          id="zipCode"
          type="number"
          pattern="[0-9]{5}"
          placeholder="5-digit zip code"
          required
        ></input>
      </label>
      <label htmlFor="country">
        Country
        <select id="country" required>
          <option value="" disabled>
            Select
          </option>
          {countries.map((country) => (
            <option value={country.name}>{country.name}</option>
          ))}
        </select>
      </label>
      <label htmlFor="phone">
        Phone Number
        <input
          id="phone"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="999-999-9999"
          required
        ></input>
      </label>

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
