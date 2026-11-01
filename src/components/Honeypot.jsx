// Invisible spam trap. Humans never see it; bots that fill every field get filtered out.
export default function Honeypot({ value, onChange }) {
  return (
    <div className="hp-field" aria-hidden="true">
      <label htmlFor="website">Leave this field empty</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
