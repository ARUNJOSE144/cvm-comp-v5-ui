import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_SIZE, BUTTON_ALIGN, COLOR } from './ButtonTypes';

export const CustomButton = ({
  type, style, size, icon, label, onClick, align,
  isButtonGroup, isMarginRequired, width, color,
  disabled = false, css, stt, className,
  bgColor, textColor,
}) => {
  const getStyleClass = () => {
    switch (style) {
      case BUTTON_STYLE.BRICK:    return 'btn-block-c';
      case BUTTON_STYLE.ROUNDED:  return 'btn-round';
      default:                    return 'btn';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case BUTTON_TYPE.PRIMARY:          return 'custom-btn-primary';
      case BUTTON_TYPE.SECONDARY:        return 'custom-btn-secondary';
      case BUTTON_TYPE.ALERT_PRIMARY:    return 'btn-alert-primary';
      case BUTTON_TYPE.ALERT_SECONDARY:  return 'btn-alert-secondary';
      case BUTTON_TYPE.TERTIARY:         return 'custom-btn-tertiary';
      case BUTTON_TYPE.TEXT_PRIMARY:     return 'btn-text-primary';
      case BUTTON_TYPE.TEXT_DANGER:      return 'btn-text-danger';
      case BUTTON_TYPE.SUCCESS_PRIMARY:  return 'btn-success-primary';
      case BUTTON_TYPE.SUCCESS_SECONDARY:return 'btn-success-secondary';
      default:                           return '';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case BUTTON_SIZE.SMALL:        return 'btn-sm';
      case BUTTON_SIZE.MEDIUM:       return 'btn-md';
      case BUTTON_SIZE.LARGE:        return 'btn-lg';
      case BUTTON_SIZE.MEDIUM_LARGE: return 'btn-md-lg';
      default:                       return '';
    }
  };

  const getButtonWidth = () =>
    width === BUTTON_ALIGN.INHERIT ? 'btn-width-inherit' : '';

  const getColor = () => {
    switch (color) {
      case COLOR.PRIMARY:   return 'color-primary';
      case COLOR.SECONDARY: return 'color-secondary';
      default:              return '';
    }
  };

  const alignClass = align
    ? `float-${align}${isButtonGroup ? ` margin-${align === 'left' ? 'right' : 'left'}` : ''}`
    : '';

  const classes = [
    'custom-btn',
    className,
    getStyleClass(),
    getTypeClass(),
    getColor(),
    getSizeClass(),
    alignClass,
    isMarginRequired ? 'addMargin' : '',
    getButtonWidth(),
    disabled ? 'btn-disabled' : '',
  ].filter(Boolean).join(' ');

  const inlineStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    ...(css || {}),
    ...(bgColor ? { background: bgColor } : {}),
    ...(textColor ? { color: textColor } : {}),
  };

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      stt={stt}
      className={classes}
      style={inlineStyle}
    >
      {icon && (
        typeof icon === 'string'
          ? <i className={`fa ${icon}`} />
          : <span className="custom-btn-icon" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>
      )}
      {label || ''}
    </div>
  );
};
