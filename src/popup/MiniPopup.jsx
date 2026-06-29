import Modal from './_Modal';

const TYPE_META = {
  decimal:  { label: 'Decimal number', hint: 'e.g. 3.50',         step: '0.01', inputMode: 'decimal' },
  integer:  { label: 'Whole number',   hint: 'e.g. 12',           step: '1',    inputMode: 'numeric' },
  textarea: { label: 'Text',           hint: 'Enter description' },
  text:     { label: 'Text',           hint: 'Enter value' },
};

const MiniPopup = ({ isOpen, toggle, title, value, onChange, inputType = 'text' }) => {
  const meta = TYPE_META[inputType] || TYPE_META.text;

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="gn-mini-popup" size="md" centered>
      <div className="gn-modal__header">
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{title}</div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
            {meta.label} &mdash; {meta.hint}
          </div>
        </div>
        <button className="gn-modal__close" onClick={toggle}>×</button>
      </div>

      <div className="gn-modal__body">
        {inputType === 'textarea' ? (
          <textarea
            rows={6} value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={meta.hint}
            className="gn-input gn-input--textarea"
          />
        ) : inputType === 'decimal' || inputType === 'integer' ? (
          <input
            type="number" step={meta.step} inputMode={meta.inputMode}
            value={value} onChange={e => onChange(e.target.value)}
            placeholder={meta.hint} className="gn-input gn-input--number"
          />
        ) : (
          <input
            type="text" value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={meta.hint} className="gn-input"
          />
        )}
      </div>

      <div className="gn-modal__footer">
        <button className="gn-popup-btn gn-popup-btn--primary gn-popup-btn--sm" onClick={toggle}>Close</button>
      </div>
    </Modal>
  );
};

export default MiniPopup;
