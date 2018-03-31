import React from 'react';
import Modal from '../Modal.jsx';

import './ModalMenu.css'

const ModalMenu = ({ headline, choices, close}) => {

  return (
    <Modal>
      <div className="modal__backdrop">
        <div className="modal__menu">
          <div className="modal__message">
            <div className="modal__headline">{headline}</div>
            <div className="modal__option-list menu">
              {choices.map((choice, ci) =>
                <button key={`${ci}:${choice.cta}`}  onClick={() => choice.action(...choice.args)}>{choice.cta}</button>
              )}
              <button key="menu-modal-close" onClick={() => close()}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalMenu;