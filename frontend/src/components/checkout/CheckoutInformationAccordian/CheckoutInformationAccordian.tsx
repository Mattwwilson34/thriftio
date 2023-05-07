import styles from './checkout-information-accordian.module.scss'
import CheckoutShippingAddressForm from '../CheckoutShippingAddressForm/CheckoutShippingAddressForm'

function CheckoutInformationAccordian() {
  return (
    <div className={styles.checkoutInformationAccordian}>
      <CheckoutShippingAddressForm />
    </div>
  )
}

export default CheckoutInformationAccordian
