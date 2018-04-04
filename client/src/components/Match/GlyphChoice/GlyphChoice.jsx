import React, { Component } from 'react';
import Modal from '../../Global/Modals/Modal.jsx';
import Piece from '../../GameBoard/Pieces/Piece.jsx';
import Sets from '../../GameBoard/Pieces/sets/index';

import './GlyphChoice.css'

const GlyphOption = ({ set, selected, click }) => {
  let nameStyle = ['glyph__name'];
  if (selected) nameStyle.push('glyph__selected');
  return (
    <div onClick={() => click(set)} className="glyph__option">
      <Piece setId={set} piece="King" />
      <span className={nameStyle.join(' ')}>{set}</span>
    </div>
  )
}

class GlyphChoiceMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: localStorage.getItem('shogiSet') || 'Traditional',
    }
    this.setChoice = this.setChoice.bind(this);
  }

  setChoice = (choice) => {
    localStorage.setItem('shogiSet', choice);
    this.setState({ current: choice });
  }

  render() {
    let { callback } = this.props;
    return (
      <Modal>
        <div className="modal__backdrop">
          <div className="modal taller">
            <div className="modal__message">
              <div className="modal__headline">Choose a Token Style</div>
              <div className="modal__glyph-list">
                {Object.entries(Sets).map(([name, content]) => {
                  return <GlyphOption key={name} set={name} selected={this.state.current === name} click={this.setChoice} />;
                }
                )}
              </div>
              <button key="menu-modal-close" onClick={() => callback(this.state.current)}>Save</button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default GlyphChoiceMenu;
