export default function Tabs({ tabs = [], value, onChange }) {
  return (
    <div className="gn-tabs">
      {tabs.map((tab) => {
        const isActive   = tab.value === value;
        const isDisabled = !!tab.disabled;
        const cls = [
          'gn-tab',
          isActive   ? 'gn-tab--active'   : '',
          isDisabled ? 'gn-tab--disabled' : '',
        ].filter(Boolean).join(' ');

        return (
          <button
            key={tab.value}
            type="button"
            className={cls}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange && onChange(tab.value)}
          >
            {tab.icon && <span className="gn-tab__icon">{tab.icon}</span>}
            <span className="gn-tab__label">{tab.label}</span>
            {tab.count != null && <span className="gn-tab__count">{tab.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
