import styles from './checkout-shipping-address-form.module.scss'

interface Props {
  // Define any other props your component requires here
  children: React.ReactNode
}

function CheckoutShippingAddressForm({ children }: Props) {
  return <form className={styles.form}>{children}</form>
}

export default CheckoutShippingAddressForm
