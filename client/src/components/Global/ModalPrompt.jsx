import React from 'react';
import Modal from './Modal.jsx';

import './ModalPrompt.css'

const ModalPrompt = ({ message, choices }) => {
  return (
    <Modal>
      <div className="modal">
        <div className="modal__prompt">{message}</div>
        {choices.map((choice, ci) =>
        <button key={`${ci}:${choice.cta}`} className="modal__option" onClick={() => choice.action(...choice.args)}>{choice.cta}</button>
        )}
      </div>
    </Modal>
  )
}

export default ModalPrompt;