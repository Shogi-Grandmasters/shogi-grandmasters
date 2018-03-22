import { boardIds, oppositeBoardSide } from './constants';
import { reverseBoard } from './boardHelpers';

const rowLabel = (x) => x + 1;
const columnLabel = (x) => Math.abs(x-8) + 1;
const logCoords = ([x, y]) => `${rowLabel(x)}${columnLabel(y)}`;

const reflectOrientation = (board, from, to) => {
  return {
    board: reverseBoard(board),
    from: reflectMove(from),
    to: reflectMove(to)
  }
}

export const moveToString = (move) => {
  let from = [...move.from];
  let to = [...move.to];
  if (move.color === 'white') {
    from = from[0] === 10 ? from : from.reverse();
    to = to.reverse();
  }
  let piece = move.piece.length > 1 ? `+${move.piece[0].toUpperCase()}` : move.piece.toUpperCase();
  let moveType = move.from[0] === 10 ? '*' : move.didCapture ? 'x' : '-';
  let moveString = piece;
  if (moveType !== '*') moveString += logCoords(from);
  moveString += moveType + logCoords(to);
  if (move.didPromote) moveString += '+';
  return moveString;
}