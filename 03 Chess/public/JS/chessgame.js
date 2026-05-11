const { Chess } = require("chess.js");

const socket = io();
const chess = new Chess();

const boardElemet = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;
