function NameInput({ name, setName }: { name: string, setName: (name: string) => void }) {
  return (
      <label htmlFor="name">
        Full Name (First and Last name)
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
      </label>
  );
}

export default NameInput;
