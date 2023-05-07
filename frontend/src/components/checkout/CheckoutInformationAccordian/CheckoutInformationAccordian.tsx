import { useState } from 'react'
import styles from './checkout-information-accordian.module.scss'
import CheckoutShippingAddressForm from '../CheckoutShippingAddressForm/CheckoutShippingAddressForm'

function CheckoutInformationAccordian() {
  // shipping address form state
  const [shippingAddressFormState, setShippingAddressFormState] = useState({
    name: '',
    streetAddressLineOne: '',
    streetAddressLineTwo: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })

  return (
    <div className={styles.checkoutInformationAccordian}>
      <CheckoutShippingAddressForm
        shippingAddressFormState={shippingAddressFormState}
        setShippingAddressFormState={setShippingAddressFormState}
      />
    </div>
  )
}

export default CheckoutInformationAccordian
