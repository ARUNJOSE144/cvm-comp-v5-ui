import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import FIELD_TYPES from './FieldTypes';
import { expandSelectValue, sortOptionsByLabel } from './utils';

// Helper: compare two {value, label} option objects
const optionEq = (a, b) => a?.value === b?.value;

const FieldItem = (props) => {
  const onBlur = () => {};

  const getRadioButton = () => {
    const value = expandSelectValue(props.value, props.values);
    const getLabel = (isSelected, label) => {
      if (props.isWithoutLabel) return null;
      return (
        <div className={`gn-checkBoxRadio_label ${isSelected ? 'gn-checked_box' : 'gn-nc_box'}`}>
          {label}
        </div>
      );
    };
    if (!props.values) return null;
    return props.values.map((data, index) => (
      <div className={`gn-checkBoxRadio_container${props.isListedInput ? ' gn-cb-listed' : ' gn-cb-left'}`} key={index}>
        <label className="gn-checkBoxRadio gn-radio">
          <div className="gn-btn_container">
            <input
              type="radio"
              checked={!!(value && optionEq(value, data))}
              onChange={() => props.onChange(data)}
            />
            <span className="gn-checkmark" />
          </div>
          {getLabel(optionEq(value, data), data.label)}
        </label>
      </div>
    ));
  };

  const getCheckBox = () => {
    const getLabel = (isChecked, data) => {
      if (props.isWithoutLabel) return null;
      return (
        <div className={`gn-checkBoxRadio_label ${isChecked ? 'gn-checked_box' : 'gn-nc_box'}`}>
          {props.isWithoutValue ? data.label : `${data.label}(${data.value})`}
          {data.subLabel && <div>{data.subLabel}</div>}
        </div>
      );
    };
    if (!props.values) return null;
    return props.values.map((data, index) => {
      const isChecked = props.value && props.value.some(item => item.value === data.value);
      return (
        <div className={`gn-checkBoxRadio_container${props.isListedInput ? ' gn-cb-listed' : ' gn-cb-left'}`} key={index}>
          <label className="gn-checkBoxRadio gn-check">
            <div className="gn-btn_container">
              <input
                type="checkbox"
                checked={!!isChecked}
                onChange={() => props.onChange(data)}
              />
              <span className="gn-checkmark" />
            </div>
            {getLabel(isChecked, data)}
          </label>
        </div>
      );
    });
  };

  const className = `gn-custom-field${!props.getOnlyInput ? ' gn-form-group' : ''}${props.touched ? ' gn-has-danger' : ''}${props.className ? ' ' + props.className : ''}`;
  const dateFormat = 'yyyy-MM-dd';

  const getInput = () => {
    const options = props.multi
      ? [{ label: 'Select All', value: 'all' }, ...sortOptionsByLabel(props.values, props.isNoSort)]
      : props.values;
    const dropdownOptions = props.selectall && props.values?.length
      ? [{ label: 'Select All', value: '0' }, ...sortOptionsByLabel(props.values, props.isNoSort)]
      : sortOptionsByLabel(props.values, props.isNoSort);

    // When rendering into a portal, react-select's default inline zIndex is low.
    // Override it here so the menu always appears above all overlays/modals.
    const portalStyles = props.menuPortalTarget
      ? { menuPortal: base => ({ ...base, zIndex: 10000 }) }
      : undefined;

    switch (props.type) {
      case FIELD_TYPES.DROP_DOWN:
        return (
          <Select
            className="gn-select" classNamePrefix="GnSelect"
            placeholder={props.placeholder}
            value={expandSelectValue(props.value, props.values)}
            options={dropdownOptions}
            onChange={props.onChange}
            isDisabled={props.disabled}
            onBlur={onBlur}
            isClearable={props.isClearable ?? true}
            menuPortalTarget={props.menuPortalTarget}
            menuPosition={props.menuPosition}
            styles={portalStyles}
          />
        );

      case FIELD_TYPES.MUTLI_SELECT:
        return (
          <Select
            className="gn-select" classNamePrefix="GnSelect"
            placeholder={props.placeholder}
            value={expandSelectValue(props.value, props.values)}
            options={sortOptionsByLabel(props.values)}
            onChange={props.onChange}
            isMulti
            isDisabled={props.disabled}
            onBlur={onBlur}
            menuPortalTarget={props.menuPortalTarget}
            menuPosition={props.menuPosition}
            styles={portalStyles}
          />
        );

      case FIELD_TYPES.MUTLI_SELECT_ALL:
        return (
          <Select
            className="gn-select" classNamePrefix="GnSelect"
            placeholder={props.placeholder}
            value={expandSelectValue(props.value, props.values)}
            options={options}
            onChange={(selected) => {
              if (selected?.length && selected.find(o => o.value === 'all')) {
                props.onChange(options.slice(1));
              } else if (!props.multi) {
                props.onChange((selected && selected.value) || null);
              } else {
                props.onChange(selected);
              }
            }}
            isMulti={props.multi}
            isDisabled={props.disabled}
            onBlur={onBlur}
            menuPortalTarget={props.menuPortalTarget}
            menuPosition={props.menuPosition}
            styles={portalStyles}
          />
        );

      case FIELD_TYPES.DATE_PICKER:
        return (
          <DatePicker
            dateFormat={props.dateFormat || dateFormat}
            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
            isClearable selected={props.value}
            onChange={props.onChange} className="gn-form-control"
            todayButton="Today" minDate={props.minDate} maxDate={props.maxDate}
            excludeDates={props.excludeDates} placeholderText={props.placeholder}
            disabled={props.disabled} onBlur={onBlur}
            popperProps={{ strategy: 'fixed' }}
          />
        );

      case FIELD_TYPES.DATE_TIME_PICKER:
        return (
          <DatePicker
            dateFormat={`${props.dateFormat || dateFormat} HH:mm`}
            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
            isClearable selected={props.value}
            onChange={props.onChange} className="gn-form-control"
            todayButton="Today" showTimeSelect timeFormat="HH:mm"
            timeIntervals={props.interval} excludeTimes={props.excludeTimes}
            minTime={props.minTime} maxTime={props.maxTime}
            minDate={props.minDate} maxDate={props.maxDate}
            excludeDates={props.excludeDates} placeholderText={props.placeholder}
            disabled={props.disabled} onBlur={onBlur}
            popperProps={{ strategy: 'fixed' }}
          />
        );

      case FIELD_TYPES.START_DATE_PICKER:
        return (
          <DatePicker
            dateFormat={props.dateFormat || dateFormat}
            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
            isClearable selected={props.startDate}
            onChange={props.onChange} className="gn-form-control"
            todayButton="Today" minDate={props.minDate} maxDate={props.endDate}
            selectsStart startDate={props.startDate} endDate={props.endDate}
            placeholderText={props.placeholder} disabled={props.disabled} onBlur={onBlur}
            popperProps={{ strategy: 'fixed' }}
          />
        );

      case FIELD_TYPES.START_DATE_TIME_PICKER:
        return (
          <DatePicker
            dateFormat={`${props.dateFormat || dateFormat} HH:mm`}
            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
            isClearable selected={props.startDate}
            onChange={props.onChange} className="gn-form-control"
            todayButton="Today" showTimeSelect timeFormat="HH:mm"
            timeIntervals={props.interval} minTime={props.minTime} maxTime={props.maxTime}
            minDate={props.minDate} maxDate={props.maxDate}
            selectsStart startDate={props.startDate} endDate={props.endDate}
            placeholderText={props.placeholder} disabled={props.disabled} onBlur={onBlur}
            popperProps={{ strategy: 'fixed' }}
          />
        );

      case FIELD_TYPES.END_DATE_PICKER:
        return (
          <DatePicker
            dateFormat={props.dateFormat || dateFormat}
            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
            isClearable selected={props.endDate}
            onChange={props.onChange} className="gn-form-control"
            todayButton="Today" minDate={props.startDate} maxDate={props.maxDate}
            selectsEnd startDate={props.startDate} endDate={props.endDate}
            placeholderText={props.placeholder} disabled={props.disabled} onBlur={onBlur}
            popperPlacement="bottom-end" popperProps={{ strategy: 'fixed' }}
          />
        );

      case FIELD_TYPES.END_DATE_TIME_PICKER:
        return (
          <DatePicker
            dateFormat={`${props.dateFormat || dateFormat} HH:mm`}
            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
            isClearable selected={props.endDate}
            onChange={props.onChange} className="gn-form-control"
            todayButton="Today" showTimeSelect timeFormat="HH:mm"
            timeIntervals={props.interval} minTime={props.minTime} maxTime={props.maxTime}
            minDate={props.startDate} maxDate={props.maxDate}
            selectsEnd startDate={props.startDate} endDate={props.endDate}
            placeholderText={props.placeholder} disabled={props.disabled} onBlur={onBlur}
            popperProps={{ strategy: 'fixed' }}
          />
        );

      case FIELD_TYPES.ASYNC_DROP_DOWN:
        return (
          <AsyncSelect
            className="gn-select" classNamePrefix="GnSelect"
            value={props.value} onChange={props.onChange}
            loadOptions={props.loadOptions}
            placeholder={props.placeholder} isDisabled={props.disabled} onBlur={onBlur}
          />
        );

      case FIELD_TYPES.ASYNC_MUTLI_SELECT:
        return (
          <AsyncSelect
            className="gn-select" classNamePrefix="GnSelect"
            value={props.value} onChange={props.onChange}
            loadOptions={props.loadOptions} isMulti
            placeholder={props.placeholder} isDisabled={props.disabled} onBlur={onBlur}
          />
        );

      case FIELD_TYPES.TEXT_BOX_DISABLED:
        return (
          <input
            readOnly value={props.value} placeholder={props.placeholder}
            className="gn-form-control gn-disabled-input gn-disabled-text" type="text"
            onBlur={onBlur} title={props.value}
          />
        );

      case FIELD_TYPES.RADIO_BUTTON: {
        const radio = (
          <div className={`gn-checkBoxRadio_main${!props.isWithoutLabel ? ' gn-rc-mandatory' : ''}${props.isListedInput ? ' gn-rc-listed' : ''}`}>
            {getRadioButton()}
          </div>
        );
        return props.isListedInput
          ? <div className={props.listedClassName || ''}>{radio}</div>
          : radio;
      }

      case FIELD_TYPES.CHECK_BOX: {
        const cb = (
          <div className={`gn-checkBoxRadio_main${!props.isWithoutLabel ? ' gn-rc-mandatory' : ''}${props.isListedInput ? ' gn-rc-listed' : ''}`}>
            {getCheckBox()}
          </div>
        );
        return props.isListedInput
          ? <div className={props.listedClassName || ''}>{cb}</div>
          : cb;
      }

      case FIELD_TYPES.TEXT_AREA_DISABLED:
        return <textarea readOnly value={props.value} className="gn-form-control gn-disabled-text" />;

      case FIELD_TYPES.SEARCH_BOX_ICON:
        return (
          <div className="gn-select-modal">
            <span className="gn-select-modal-label">{props.fieldValue}</span>
            <div className="gn-icon-box" onClick={props.onClick}>
              <span className={`icon fa ${props.icon || 'fa-plus'}`} />
            </div>
          </div>
        );

      case FIELD_TYPES.TEXT_AREA:
        return (
          <textarea
            value={props.value} placeholder={props.placeholder}
            onChange={e => props.onChange ? props.onChange(e.target.value, {}, e) : null}
            className="gn-form-control" disabled={!!props.disabled} onBlur={onBlur}
          />
        );

      case FIELD_TYPES.NESTED_DROP_DOWN: {
        const buildNested = (option) => {
          const obj = Object.fromEntries(Object.entries(option).filter(([k]) => k !== 'children'));
          if (option.children) obj.options = option.children.map(buildNested);
          return obj;
        };
        return (
          <Select
            className="gn-select" classNamePrefix="GnSelect"
            placeholder={props.placeholder}
            value={expandSelectValue(props.value, props.values)}
            options={(props.values || []).map(buildNested)}
            onChange={props.onChange} isDisabled={props.disabled} onBlur={onBlur}
            menuPortalTarget={props.menuPortalTarget}
            menuPosition={props.menuPosition}
            styles={portalStyles}
          />
        );
      }

      case FIELD_TYPES.INPUT_WITH_BUTTON:
        return (
          <div className="gn-input-group">
            <input
              disabled={!!props.disabled} value={props.value}
              placeholder={props.placeholder} maxLength={props.maxLength}
              onChange={e => props.onChange ? props.onChange(e.target.value) : null}
              className="gn-form-control" type={props.inputType || 'text'} onBlur={onBlur}
            />
            <div className="gn-input-group-append">
              <button className="gn-btn-append" type="button" onClick={props.onButtonClick}>
                {props.buttonLabel}
              </button>
            </div>
          </div>
        );

      case FIELD_TYPES.VIEW_DETAILS_BOX:
        return (
          <div className="gn-form-control gn-disabled-input gn-disabled-text gn-disabled-input-div">
            {props.value}
          </div>
        );

      case FIELD_TYPES.FILE_UPLOAD:
        return null;

      default:
        return (
          <input
            value={props.value} maxLength={props.maxLength}
            placeholder={props.placeholder}
            onChange={e => props.onChange ? props.onChange(e.target.value) : null}
            className="gn-form-control" type={props.inputType || 'text'}
            readOnly={!!props.disabled} title={props.noTitle ? '' : props.value}
            onBlur={onBlur}
          />
        );
    }
  };

  const getInputContainer = () => (
    <div className={props.ismandatory ? `${className} gn-required` : className} stt={props.stt}>
      <label className={props.ismandatory ? 'gn-form-control-label gn-required' : 'gn-form-control-label'}>
        {props.label}
      </label>
      {getInput()}
      <div className="gn-text-help">
        {props.touched && props.error ? props.error : ''}
      </div>
    </div>
  );

  if (props.isListedInput) return getInput();

  if (props.getOnlyInput) {
    return (
      <div className={props.ismandatory ? `${className} gn-required gn-only-input-field` : `${className} gn-only-input-field`}>
        {getInput()}
        <div className="gn-text-help">{props.touched ? props.error : ''}</div>
      </div>
    );
  }

  return (
    <div className="gn-field-col">
      {getInputContainer()}
    </div>
  );
};

export default FieldItem;
