import GameTile from "./GameTile.js";
import { isCheckOrMate, validDropLocations, isValidMove } from "./boardHelpers.js";

export const test = () => {
  let testBoard, testHands, testTile, testColor, testBoardBefore, testBoardAfter, result;
  const passed = () => console.log("<<<<<<<<<<<<<<<<<<<<Test Passed>>>>>>>>>>>>>>>>>>>>>>>>>>");
  const failed = data => console.log("********************Test Failed**************************", data);

  console.log('\ntests for check, checkmate, and lock\n');
  testBoard = [
    ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
    [" ", "R", " ", " ", " ", " ", " ", "B", " "],
    ["P", "P", "P", "P", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", "b", " ", " ", " ", " ", " ", "r", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testHands = { white: [], black: [] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log("should not find check or checkmate on a new board");
  if (!result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
    [" ", "R", " ", " ", " ", " ", " ", "B", " "],
    ["P", "P", "P", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", " ", "p", "p", "p", "p"],
    [" ", "b", " ", " ", "r", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testHands = { white: [], black: [] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log("should correctly recognize check");
  if (result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", "r", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "k"]
  ];
  testHands = { white: [], black: [] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log("should recognize check from a drop");
  if (result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["L", "N", "S", " ", "K", " ", "S", "N", "L"],
    [" ", " ", " ", " ", " ", " ", " ", "B", " "],
    ["P", "P", "P", " ", " ", " ", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", " ", "p", "p", "p", "p"],
    [" ", "b", " ", " ", "r", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testHands = { white: [], black: [] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log("should correctly recoginze the king can move out of check");
  if (result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["L", "N", "S", "G", "K", "G", " ", "N", "L"],
    [" ", "R", " ", "P", "R", "S", " ", "B", " "],
    ["P", "P", "P", "n", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", "b", " ", " ", " ", " ", " ", "r", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testHands = { white: [], black: [] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log("should correctly recoginze the capture to get out of check");
  if (result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    ["k", " ", " ", " ", " ", " ", " ", " ", " "]
  ];
  testHands = { white: [], black: ["B"] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log("should know that a dropped piece will get out of check");
  if (result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", " ", "P", " ", " ", " "],
    [" ", " ", " ", "P", "K", "P", " ", " ", " "],
    [" ", " ", " ", "P", " ", "P", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "k"]
  ];
  testHands = { white: [], black: [] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log(
    "should know moving away from a dynamic piece will not get out of check"
  );
  if (result[0] && result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "l", "r", "l", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "k"]
  ];
  testHands = { white: [], black: [] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log("should correctly recoginze checkmate");
  if (result[0] && result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", "g", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["k", " ", " ", " ", " ", " ", " ", " ", " "]
  ];
  testHands = { white: [], black: [] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log("should recognize the king cannot put himself in check to get out of check");
  if (result[0] && result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["L", "N", "S", "G", "K", "G", " ", "N", "L"],
    [" ", "R", " ", " ", " ", "S", " ", "B", " "],
    ["P", " ", "b", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "P", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", "p", " ", " ", " ", " ", " ", " "],
    ["p", "p", " ", "p", " ", "p", "p", "p", "p"],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testHands = { white: [], black: [] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log("should correctly recoginze fool's mate");
  if (result[0] && result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["K", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "r"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "r", " ", " ", "k", " ", " ", " ", " "]
  ];
  testHands = { white: [], black: [] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log("should recognize lock");
  if (!result[0] && !result[1] && result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["K", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "r"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "r", " ", " ", "k", " ", " ", " ", " "]
  ];
  testHands = { white: [], black: ["P"] };
  testColor = 'white';
  result = isCheckOrMate(
    {
      board: testBoard,
      white: testHands.white,
      black: testHands.black
    },
    testColor
  );
  console.log("should recognize not lock");
  if (!result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  console.log('\ntests for valid drop locations\n')
  testBoard = [
    [" ", " ", " ", "R", "K", "R", " ", " ", " "],
    [" ", " ", " ", "P", " ", "P", " ", " ", " "],
    [" ", " ", " ", " ", "s", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", "n", " ", " ", " ", " "],
    [" ", " ", " ", " ", "g", " ", " ", " ", " "],
    ["p", "p", "p", "p", "l", "p", "p", "p", "p"],
    [" ", " ", " ", " ", "g", " ", " ", " ", " "],
    [" ", " ", " ", " ", "k", " ", " ", " ", " "]
  ];
  testHands = { white: ["p"], black: [] };
  testTile = new GameTile("Pawn", "white", [10, 10]);
  result = validDropLocations(testBoard, testTile);
  console.log("should not try to drop pawn causing checkmate");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "k", " ", " ", " ", " "]
  ];
  testHands = { white: ["p"], black: [] };
  testTile = new GameTile("Pawn", "white", [10, 10]);
  result = validDropLocations(testBoard, testTile);
  console.log("should not try to drop pawn in column with another pawn");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "k", "l", "l", "l", "l"]
  ];
  testHands = { white: ["p"], black: [] };
  testTile = new GameTile("Pawn", "white", [10, 10]);
  result = validDropLocations(testBoard, testTile);
  console.log("should not try to drop pawn in last row");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "k", "l", "l", "l", "l"]
  ];
  testHands = { white: ["l"], black: [] };
  testTile = new GameTile("Lance", "white", [10, 10]);
  result = validDropLocations(testBoard, testTile);
  console.log("should not try to drop lance in last row");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "k", "l", "l", "l", "l"]
  ];
  testHands = { white: ["n"], black: [] };
  testTile = new GameTile("Knight", "white", [10, 10]);
  result = validDropLocations(testBoard, testTile);
  console.log("should not try to drop knight in last 2 rows");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  console.log('\ntests for determining move validity\n')

  testBoardBefore = [
    ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
    [" ", " ", " ", " ", "R", " ", " ", "B", " "],
    ["P", "P", "P", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", " ", "p", "p", "p", "p"],
    [" ", "b", " ", " ", " ", " ", " ", "r", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testBoardAfter = [
    ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
    [" ", " ", " ", " ", "R", " ", " ", "B", " "],
    ["P", "P", "P", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "p"],
    ["p", "p", "p", "p", " ", "p", "p", "p", " "],
    [" ", "b", " ", " ", "r", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testTile = new GameTile("Rook", "white", [7, 7]);
  testHands = { white: [], black: [] };
  result = isValidMove(
    { board: testBoardBefore, white: testHands.white, black: testHands.black },
    { board: testBoardAfter, white: testHands.white, black: testHands.black },
    testTile, [7, 4]);
  console.log('should recognize a valid move')
  if (result[0]) {
    passed();
  } else {
    failed(result);
  }

  testBoardBefore = [
    ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
    [" ", "R", " ", " ", "R", " ", " ", "B", " "],
    ["P", "P", "P", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", " ", "p", "p", "p", "p"],
    [" ", "b", " ", " ", "r", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testBoardAfter = [
    ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
    [" ", " ", " ", " ", "R", " ", " ", "B", " "],
    ["P", "P", "P", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "p"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", " ", "p", "p", "p", " "],
    [" ", "b", " ", " ", " ", "r", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testTile = new GameTile("Rook", "white", [7, 4]);
  testHands = { white: [], black: [] };
  result = isValidMove(
    { board: testBoardBefore, white: testHands.white, black: testHands.black },
    { board: testBoardAfter, white: testHands.white, black: testHands.black },
    testTile, [7, 5]);
  console.log('should recognize moving a piece that leaves king in check as invalid')
  if (!result[0]) {
    passed();
  } else {
    failed(result);
  }

  testBoardBefore = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", "g", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["k", " ", " ", " ", " ", " ", " ", " ", " "]
  ];
  testBoardAfter = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["k", " ", " ", " ", " ", " ", " ", " ", " "]
  ];
  testTile = new GameTile("King", "white", [0, 4]);
  testHands = { white: [], black: [] };
  result = isValidMove(
    { board: testBoardBefore, white: testHands.white, black: testHands.black },
    { board: testBoardAfter, white: testHands.white, black: testHands.black },
    testTile, [1, 4]);
  console.log('should recognize king putting itself in check as invalid');
  if (!result[0]) {
    passed();
  } else {
    failed(result);
  }

  testBoardBefore = [
    ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
    [" ", "R", " ", " ", "R", " ", " ", "B", " "],
    ["P", "P", "P", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", " ", "p", "p", "p", "p"],
    [" ", "b", " ", " ", "r", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testBoardAfter = [
    ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
    [" ", " ", " ", " ", "r", " ", " ", "B", " "],
    ["P", "P", "P", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "p"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", " ", "p", "p", "p", " "],
    [" ", "b", " ", " ", " ", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testTile = new GameTile("Rook", "white", [7, 4]);
  testHands = { white: [], black: [] };
  result = isValidMove(
    { board: testBoardBefore, white: testHands.white, black: testHands.black },
    { board: testBoardAfter, white: testHands.white, black: testHands.black },
    testTile, [1, 4]);
  console.log('should recognize valid capture as valid')
  if (result[0]) {
    passed();
  } else {
    failed(result);
  }

  testBoardBefore = [
    ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
    [" ", "R", " ", " ", "R", " ", " ", "B", " "],
    ["P", "P", "P", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", " ", "p", "p", "p", "p"],
    [" ", "b", " ", " ", " ", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testBoardAfter = [
    ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
    [" ", " ", " ", " ", "R", " ", " ", "B", " "],
    ["P", "P", "P", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "p"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", " ", "p", "p", "p", " "],
    [" ", "b", " ", " ", "r", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testTile = new GameTile("Rook", "white", [10, 10]);
  testHands = { white: ['r'], black: [] };
  result = isValidMove(
    { board: testBoardBefore, white: testHands.white, black: testHands.black },
    { board: testBoardAfter, white: testHands.white, black: testHands.black },
    testTile, [7, 5]);
  console.log('should recognize valid drop as valid')
  if (result[0]) {
    passed();
  } else {
    failed(result);
  }

};


