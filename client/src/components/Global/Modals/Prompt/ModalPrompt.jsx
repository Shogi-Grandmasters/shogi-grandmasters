import React from 'react';
import Modal from '../Modal.jsx';

import './ModalPrompt.css'

const ModalPrompt = ({ headline, subheadline, choices }) => {

  return (
    <Modal>
      <div className="modal__backdrop">
          <div className="modal">
            <div className="modal__message">
              <div className="modal__headline">{headline}</div>
              <div className="modal__subheadline">{subheadline}</div>
              <div className="modal__option-list">
                {choices.map((choice, ci) =>
                  <a key={`${ci}:${choice.cta}`} className="modal__option" onClick={() => choice.action(...choice.args)}>{choice.cta}</a>
                )}
              </div>
            </div>
          </div>
      </div>
    </Modal>
  )
}

export default ModalPrompt;