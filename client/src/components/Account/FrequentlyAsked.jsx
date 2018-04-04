import React from 'react';
import './Account.css';

const FrequentlyAsked = (props) => {
  return (
    <div className="faq-container">
      <div className="title-faq">FAQ</div>
      <b>Piece Movement:</b><br />
      <div className="faq-list">
        <div>
        The lance, bishop, and rook are ranging pieces: They can move any number of squares along a straight line limited only by intervening pieces and the edge of the board. If an opposing piece intervenes, it may be captured by removing it from the board and replacing it with the moving piece. If a friendly piece intervenes, the moving piece must stop short of that square; if the friendly piece is adjacent, the moving piece may not move in that direction at all.
        </div><br />
        <div>
        A <b>King</b> (玉/王) moves one square in any direction, orthogonal or diagonal.
        </div><br />
        <div>
        A <b>Rook</b> (飛) moves any number of squares in an orthogonal direction.
        </div><br />
        <div>
        A <b>Bishop</b> (角) moves any number of squares in a diagonal direction. Because they cannot move orthogonally, the players' unpromoted bishops can reach only half the squares of the board, unless one is captured and then dropped.
        </div><br />
        <div>
        A <b>Gold General</b> (金) moves one square orthogonally, or one square diagonally forward, giving it six possible destinations. It cannot move diagonally backwards.
        </div><br />
        <div>
        A <b>Silver General</b> (銀) moves one square diagonally, or one square straight forward, giving it five possible destinations. Because an unpromoted silver can retreat more easily than a promoted one, it is common to leave a silver unpromoted at the far side of the board. (See Promotion).
        </div><br />
        <div>
        A <b>Knight</b> (桂) jumps at an angle intermediate to orthogonal and diagonal, amounting to one square straight forward plus one square diagonally forward, in a single move. Thus the knight has two possible forward destinations. Unlike international chess knights, shogi knights cannot move to the sides or in a backwards direction. The knight is the only piece that ignores intervening pieces on the way to its destination. It is not blocked from moving if the square in front of it is occupied, but neither can it capture a piece on that square. It is often useful to leave a knight unpromoted at the far side of the board. A knight must promote, however, if it reaches either of the two furthest ranks. (See Promotion.)
        </div><br />
        <div>
        A <b>Lance</b> (香) moves just like the rook except it cannot move backwards or to the sides. It is often useful to leave a lance unpromoted at the far side of the board. A lance must promote, however, if it reaches the furthest rank. (See Promotion.)
        </div><br />
        <div>
        A <b>Pawn</b> (歩) moves one square straight forward. It cannot retreat. Unlike international chess pawns, shogi pawns capture the same as they move. A pawn must promote if it arrives at the furthest rank. (See Promotion.) In practice, however, a pawn is usually promoted whenever possible. There are two restrictions on where a pawn may be dropped. (See Drops.)
        </div><br />
      </div>
    </div>
  );
};

export default FrequentlyAsked;