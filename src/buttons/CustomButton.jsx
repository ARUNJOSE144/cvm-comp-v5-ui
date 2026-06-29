import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_SIZE, BUTTON_ALIGN, COLOR } from './ButtonTypes';

export const CustomButton = ({
  type, style, size, icon, label, onClick, align,
  isButtonGroup, isMarginRequired, width, color,
  disabled = false, css, stt, className,
  bgColor, textColor,
}) => {
  const getStyleClass = () => {
    switch (style) {
      case BUTTON_STYLE.BRICK:   return 'gn-btn-block';
      case BUTTON_STYLE.ROUNDED: return 'gn-btn-round';
      default:                   return '';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case BUTTON_TYPE.PRIMARY:           return 'gn-btn-primary';
      case BUTTON_TYPE.SECONDARY:         return 'gn-btn-secondary';
      case BUTTON_TYPE.TERTIARY:          return 'gn-btn-tertiary';
      case BUTTON_TYPE.ALERT_PRIMARY:     return 'gn-btn-alert-primary';
      case BUTTON_TYPE.ALERT_SECONDARY:   return 'gn-btn-alert-secondary';
      case BUTTON_TYPE.SUCCESS_PRIMARY:   return 'gn-btn-success-primary';
      case BUTTON_TYPE.SUCCESS_SECONDARY: return 'gn-btn-success-secondary';
      case BUTTON_TYPE.TEXT_PRIMARY:      return 'gn-btn-text-primary';
      case BUTTON_TYPE.TEXT_DANGER:       return 'gn-btn-text-danger';
      default:                            return '';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case BUTTON_SIZE.SMALL:        return 'gn-btn-sm';
      case BUTTON_SIZE.MEDIUM:       return 'gn-btn-md';
      case BUTTON_SIZE.LARGE:        return 'gn-btn-lg';
      case BUTTON_SIZE.MEDIUM_LARGE: return 'gn-btn-md-lg';
      default:                       return '';
    }
  };

  const getButtonWidth = () =>
    width === BUTTON_ALIGN.INHERIT ? 'gn-btn-width-inherit' : '';

  const getColor = () => {
    switch (color) {
      case COLOR.PRIMARY:   return 'gn-btn-color-primary';
      case COLOR.SECONDARY: return 'gn-btn-color-secondary';
      default:              return '';
    }
  };

  const alignClass = align
    ? `gn-btn-float-${align}${isButtonGroup ? ` gn-btn-margin-${align === 'left' ? 'right' : 'left'}` : ''}`
    : '';

  const classes = [
    'gn-btn',
    className,
    getStyleClass(),
    getTypeClass(),
    getColor(),
    getSizeClass(),
    alignClass,
    isMarginRequired ? 'gn-btn-margin' : '',
    getButtonWidth(),
    disabled ? 'gn-btn-disabled' : '',
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
          : <span className="gn-btn-icon" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>
      )}
      {label || ''}
    </div>
  );
};
