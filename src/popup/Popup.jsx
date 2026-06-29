import Modal from './_Modal';
import { POPUP_ALIGN } from './PopupTypes';

const Popup = (props) => {
  const isRight = props.type === POPUP_ALIGN.RIGHT;
  const dialogClass = [
    isRight ? 'gn-modal--right' : 'gn-modal--center',
    props.className,
  ].filter(Boolean).join(' ');

  const style = {
    ...(props.minWidth ? { minWidth: props.minWidth } : {}),
    ...(props.width    ? { width: props.width, maxWidth: props.width } : {}),
  };

  const header = props.isCustomTitle
    ? <div>{props.title}</div>
    : (
      <div className="gn-modal__header">
        <div className="gn-modal__header-info">
          <span className="gn-modal__title">{props.title}</span>
          {props.subtitle && <span className="gn-modal__subtitle">{props.subtitle}</span>}
        </div>
        <button className="gn-modal__close" onClick={() => props.close(0)}>×</button>
      </div>
    );

  return (
    <Modal isOpen={props.isOpen} toggle={() => props.close(0)} className={dialogClass} style={style}>
      {header}
      {props.component}
    </Modal>
  );
};

export default Popup;
