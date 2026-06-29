import { AlertTriangle, HelpCircle, X } from 'lucide-react';
import Modal from './_Modal';
import { CustomButton } from '../buttons/CustomButton';
import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_SIZE } from '../buttons/ButtonTypes';

const BasicAlert = ({
  isOpen, title, content, CancelBtnLabel, confirmBtnLabel,
  rowId, close, onConfirmCallBack,
  danger = true,
  size = 'default',
  noIcon = false,
  headerIcon = null,
}) => {
  const dialogClass = [
    'bw-confirm-modal',
    size === 'wide' ? 'bw-confirm-modal--wide' : '',
  ].filter(Boolean).join(' ');

  return (
    <Modal isOpen={isOpen} toggle={() => close(0)} className={dialogClass} centered>
      <div className="bw-confirm__header">
        <div className="bw-confirm__header-left">
          {headerIcon && <div className="bw-confirm__header-icon">{headerIcon}</div>}
          <span className="bw-confirm__title">{title}</span>
        </div>
        <button className="bw-confirm__close" onClick={() => close(0)} aria-label="Close">
          <X size={15} strokeWidth={2} />
        </button>
      </div>

      <div className="bw-confirm__body">
        {!noIcon && (
          <div className={`bw-confirm__icon-wrap${danger ? ' bw-confirm__icon-wrap--danger' : ' bw-confirm__icon-wrap--info'}`}>
            {danger ? <AlertTriangle size={18} strokeWidth={2} /> : <HelpCircle size={18} strokeWidth={2} />}
          </div>
        )}
        <div className={`bw-confirm__content${noIcon ? ' bw-confirm__content--full' : ''}`}>
          {content}
        </div>
      </div>

      <div className="bw-confirm__footer">
        {CancelBtnLabel !== null && (
          <CustomButton
            style={BUTTON_STYLE.BRICK} type={BUTTON_TYPE.SECONDARY} size={BUTTON_SIZE.MEDIUM}
            label={CancelBtnLabel || 'Cancel'} isButtonGroup onClick={() => close(0)}
          />
        )}
        <CustomButton
          style={BUTTON_STYLE.BRICK}
          type={danger ? BUTTON_TYPE.ALERT_PRIMARY : BUTTON_TYPE.PRIMARY}
          size={BUTTON_SIZE.MEDIUM}
          label={confirmBtnLabel || 'Confirm'} isButtonGroup
          onClick={() => { close(0); onConfirmCallBack(rowId); }}
        />
      </div>
    </Modal>
  );
};

export default BasicAlert;
