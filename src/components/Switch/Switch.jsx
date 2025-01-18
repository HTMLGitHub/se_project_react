import './Switch.css';

export default function Switch({isOn, handleToggle}) {
  return (
    <div className="switch">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch__checkbox"
        id={`switch__new`}
        type="checkbox"
      />
      <label className="switch__label" htmlFor={`switch__new`}>
        <span className={`switch__button`} />
      </label>
    </div>
  );
}