export default function ToggleSwitch({ value = false, onChange, disabled = false, label }) {
  return (
    <label className={`gn-toggle${disabled ? ' gn-toggle--disabled' : ''}`}>
      <input
        type="checkbox"
        className="gn-toggle__input"
        checked={!!value}
        onChange={e => !disabled && onChange && onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className="gn-toggle__track">
        <span className="gn-toggle__knob" />
      </span>
      {label && <span className="gn-toggle__label">{label}</span>}
    </label>
  );
}
