import styles from './address-preview.module.scss'

interface Props {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

function AddressPreview({ name, address, city, state, zipCode }: Props): JSX.Element {
  return (
  <div className={styles.addressPreview}>
      <p>{name}</p>
      <p>{address}</p>
      <p>{city}, {state} {zipCode}</p>
  </div>
  )
}

export default AddressPreview
