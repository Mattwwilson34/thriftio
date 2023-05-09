interface Props {
  address: string;
  setAddress: (address: string) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
}
function AddressInput({ address, setAddress, placeholder, required, label }: Props) {
  return (
      <label htmlFor="address">
        {label ? label : ''}
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={placeholder ? placeholder : ''}
          required={required ? required : false}
        ></input>
      </label>
  );
}

export default AddressInput;
