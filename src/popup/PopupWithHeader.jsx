import Modal from './_Modal';
import { POPUP_ALIGN } from './PopupTypes';

const PopupWithHeader = (props) => {
  const isRight = props.type === POPUP_ALIGN.RIGHT;
  const dialogClass = [
    isRight ? 'gn-modal--right' : 'gn-modal--center',
    props.className,
  ].filter(Boolean).join(' ');

  const style = {
    ...(props.minWidth ? { minWidth: props.minWidth } : {}),
    ...(props.width    ? { width: props.width }        : {}),
  };

  return (
    <Modal isOpen={props.isOpen} toggle={() => props.close(0)} className={dialogClass} style={style}>
      {props.title}
      {props.component}
    </Modal>
  );
};

export default PopupWithHeader;
