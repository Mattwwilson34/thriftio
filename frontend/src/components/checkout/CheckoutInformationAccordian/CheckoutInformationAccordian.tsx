import { useState, useContext } from 'react'
import styles from './checkout-information-accordian.module.scss'
import { ShoppingCartProduct } from '@/types/types'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'
import OderDetails from '../OrderDetails/OrderDetails'
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
  const [stateSalesTax, setStateSalesTax] = useState(1.0)
  const [cardNumber, setCardNumber] = useState('4266-5436-5698-9765')
  const [cardExpiration, setCardExpiration] = useState('03/17')
  const [securityCode, setSecurityCode] = useState('123')

  // shopping cart context
  const { state: shoppingCartState } = useContext(ShoppingCartContext)
  // TODO: fix
  // need to figure out why when typing this to ShoppingCartProduct
  // I am unable to call reduce without throwing a TS error
  const shoppingCart: any[] = shoppingCartState.shoppingCart

  function validateAddress() {
    if (!name || !address || !city || !state || !zipCode || !country) {
      return false
    }
    return true
  }

  // calculate order total
  const totalCost = shoppingCart.reduce(
    (accum: number, product: ShoppingCartProduct) =>
      accum + product.price * product.quantity, 0
  ).toFixed(2)

  // prevent default form submission
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault()

  const toggleAddressForm = () => setAddressFormOpen(!addressFormOpen)
  const toggleCreditForm = () => setCreditCardFormOpen(!creditCardFormOpen)

  let formIsValid = validateAddress()

  // get sales tax from zipcode via API
  async function handleZipCodeBlur() {
    const result = await fetch(`https://api.api-ninjas.com/v1/salestax?zip_code=${zipCode}`, {
      method: 'GET',
      headers: {
        'x-api-key': 'SF6lG/NFT0e69KXOAT8o3w==5nAo7rnkepsATrYH'
      }
    })
    const [salesTaxData] = await result.json()
    const salesTaxRate = salesTaxData.total_rate
    setStateSalesTax(salesTaxRate)
  }

  return (
    <div className={styles.checkoutInformationAccordian}>
      {/* order details */}
      <OderDetails stateSalesTax={stateSalesTax}/>
      {/* shipping address */}
      <h2 className={styles.checkoutSectionHeader}>Shipping Address</h2>
      <AddressPreview
        name={name}
        address={address}
        city={city}
        state={state}
        zipCode={zipCode}
      />
      <button onClick={toggleAddressForm}>
        {addressFormOpen ? 'Proceed to payment' : 'Edit shipping details'}
      </button>

      <AccordianWrapper open={addressFormOpen}>
        <form className={styles.shippingAddressForm} onSubmit={preventDefault}>
          <NameInput name={name} setName={setName} />
          <AddressInput address={address} setAddress={setAddress} required />
          <div>
            <CityInput city={city} setCity={setCity} required />
            <StateInput state={state} setState={setState} required />
            <ZipCodeInput zipCode={zipCode} setZipCode={setZipCode} required handleBlur={handleZipCodeBlur}/>
          </div>
          <CountryInput country={country} setCountry={setCountry} required />
          <input
            type="submit"
            value="Proceed to payment"
            onClick={() => setAddressFormOpen(!addressFormOpen)}
            disabled={!formIsValid}
          />
        </form>
      </AccordianWrapper>

      <hr />

      {/* payment method */}
      <h2 className={styles.checkoutSectionHeader}>Payment Method</h2>
      <CreditCardPreview
        cardNumber={cardNumber}
        cardExpiration={cardExpiration}
        securityCode={securityCode}
      />
      <button onClick={toggleCreditForm}>
        {creditCardFormOpen
          ? 'Proceed to order review'
          : 'Edit payment details'}
      </button>
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
            value="Proceed to order review"
            onClick={toggleCreditForm}
          />
        </form>
      </AccordianWrapper>

      <hr />

      {/* product preview */}
      <h2 className={styles.checkoutSectionHeader}>Order Review</h2>
      {shoppingCart.map((product) => {
        return <ProductCheckoutCard product={product} />
      })}

      <hr />

      {/* order placment */}
      <div className={styles.orderPlacementContainer}>
        <button className={styles.orderPlacementButton}>Place Order</button>
        <h2 className={styles.orderPlacementTotal}>Order total: ${totalCost}</h2>
      </div>
    </div>
  )
}

export default CheckoutInformationAccordian
