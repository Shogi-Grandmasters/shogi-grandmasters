import React from 'react';
import Modal from './Modal.jsx';
import { CSSTransition, transit } from 'react-css-transition';

import './ModalPrompt.css'

const ModalPrompt = ({ message, choices }) => {

  const transitionStyles = {
    defaultStyle: {
      opacity: 0,
    },
    enterStyle: {
      opacity: transit(1.0, 500, 'ease-in-out'),
    },
    leaveStyle: {
      opacity: transit(0, 500, 'ease-in-out'),
    },
    activeStyle: {
      opacity: 1,
    },
  };

  return (
    <Modal>
      <div className="modal__backdrop">
        {/* <CSSTransition {...transitionStyles} active={true}> */}
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
        {/* </CSSTransition> */}
      </div>
    </Modal>
  )
}

export default ModalPrompt;