import React from 'react';
import Modal from './Modal.jsx';
import { FadeIn } from './Animation/Transitions.jsx';

import './ModalPrompt.css'

const ModalPrompt = ({ message, choices }) => {

  return (
    <Modal>
      <div className="modal__backdrop">
        <FadeIn>
          <div className="modal">
            <div className="modal__message">
              <div className="modal__prompt">{message}</div>
              <div className="modal__option-list">
                {choices.map((choice, ci) =>
                  <a key={`${ci}:${choice.cta}`} className="modal__option" onClick={() => choice.action(...choice.args)}>{choice.cta}</a>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </Modal>
  )
}

export default ModalPrompt;