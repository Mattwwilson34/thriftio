interface Props {
  address: string
  setAddress: (address: string) => void
  placeholder?: string
  required?: boolean
}

function AddressInput({ address, setAddress, placeholder, required }: Props) {
  return (
    <label htmlFor="address">
      Street Address
      <input
        id="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder={placeholder ? placeholder : ''}
        required={required ? required : false}
      ></input>
    </label>
  )
}

export default AddressInput
