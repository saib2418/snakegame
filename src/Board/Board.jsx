import React, { useState } from "react";
import "./Board.css";

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(value) {
    let node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}

let BOARD_SIZE = 10;

const Board = () => {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [snakeCells, setSnakeCells] = useState(new Set([44]));
  const [snake, setSnake] = useState(new SinglyLinkedList(44));
  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cell, cellIdx) => (
            <div
              key={cellIdx}
              className={`cell ${false ? "food-cell" : ""}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

const createBoard = (BOARD_SIZE) => {
  let count = 1;
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push(count++);
    }
    board.push(currentRow);
  }
  return board;
};
export default Board;
