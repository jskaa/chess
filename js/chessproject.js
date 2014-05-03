var PIECES = { BISHOP : "bishop", KNIGHT : "knight", ROOK : "rook", KING : "king", QUEEN : "queen", PAWN : "pawn" };
var COLUMN_INDEX = "abcdefgh";
var BLACK = "black";
var WHITE = "white";
var BLACK_SQUARE_COLOR = "#80681F";
var WHITE_SQUARE_COLOR = "#D6AD33";

/**
 * Creates a new Chessboard
 */
function Chessboard(cols, rows) {
	this.board = new Array(rows);
	this.blackPieces = new Array(16);
	this.whitePieces = new Array(16);
	
	this.pieceSelected = null;	
	this.turn = WHITE;
		
	var color = BLACK_SQUARE_COLOR;
	
	// Initialize the board:
	for(var i = 0; i < rows; i++) {
		this.board[i] = new Array(cols);
		
		for(var j = 0; j < cols; j++) {
			this.board[i][j] = new ChessSquare(color, i, j);
			
			// Toggle color
			color = (color == BLACK_SQUARE_COLOR) ? WHITE_SQUARE_COLOR : BLACK_SQUARE_COLOR;
		}
		
		// Toggle color
		color = color == BLACK_SQUARE_COLOR ? WHITE_SQUARE_COLOR : BLACK_SQUARE_COLOR;
	}
	
	// Initialize the pieces (2 rooks, 2 knights, 2 bishops, 1 king, 1 queen, 8 pawns)
	this.blackPieces[0] = new ChessPiece(BLACK, PIECES.ROOK, this.board[7][0]);
	this.blackPieces[1] = new ChessPiece(BLACK, PIECES.ROOK, this.board[7][7]);
	this.blackPieces[2] = new ChessPiece(BLACK, PIECES.KNIGHT, this.board[7][1]);
	this.blackPieces[3] = new ChessPiece(BLACK, PIECES.KNIGHT, this.board[7][6]);
	this.blackPieces[4] = new ChessPiece(BLACK, PIECES.BISHOP, this.board[7][2]);
	this.blackPieces[5] = new ChessPiece(BLACK, PIECES.BISHOP, this.board[7][5]);
	this.blackPieces[6] = new ChessPiece(BLACK, PIECES.KING, this.board[7][3]);
	this.blackPieces[7] = new ChessPiece(BLACK, PIECES.QUEEN, this.board[7][4]);
	this.blackPieces[8] = new ChessPiece(BLACK, PIECES.PAWN, this.board[6][0]);
	this.blackPieces[9] = new ChessPiece(BLACK, PIECES.PAWN, this.board[6][1]);
	this.blackPieces[10] = new ChessPiece(BLACK, PIECES.PAWN, this.board[6][2]);
	this.blackPieces[11] = new ChessPiece(BLACK, PIECES.PAWN, this.board[6][3]);
	this.blackPieces[12] = new ChessPiece(BLACK, PIECES.PAWN, this.board[6][4]);
	this.blackPieces[13] = new ChessPiece(BLACK, PIECES.PAWN, this.board[6][5]);
	this.blackPieces[14] = new ChessPiece(BLACK, PIECES.PAWN, this.board[6][6]);
	this.blackPieces[15] = new ChessPiece(BLACK, PIECES.PAWN, this.board[6][7]);
	
	this.whitePieces[0] = new ChessPiece(WHITE, PIECES.ROOK, this.board[0][0]);
	this.whitePieces[1] = new ChessPiece(WHITE, PIECES.ROOK, this.board[0][7]);
	this.whitePieces[2] = new ChessPiece(WHITE, PIECES.KNIGHT, this.board[0][1]);
	this.whitePieces[3] = new ChessPiece(WHITE, PIECES.KNIGHT, this.board[0][6]);
	this.whitePieces[4] = new ChessPiece(WHITE, PIECES.BISHOP, this.board[0][2]);
	this.whitePieces[5] = new ChessPiece(WHITE, PIECES.BISHOP, this.board[0][5]);
	this.whitePieces[6] = new ChessPiece(WHITE, PIECES.KING, this.board[0][3]);
	this.whitePieces[7] = new ChessPiece(WHITE, PIECES.QUEEN, this.board[0][4]);
	this.whitePieces[8] = new ChessPiece(WHITE, PIECES.PAWN, this.board[1][0]);
	this.whitePieces[9] = new ChessPiece(WHITE, PIECES.PAWN, this.board[1][1]);
	this.whitePieces[10] = new ChessPiece(WHITE, PIECES.PAWN, this.board[1][2]);
	this.whitePieces[11] = new ChessPiece(WHITE, PIECES.PAWN, this.board[1][3]);
	this.whitePieces[12] = new ChessPiece(WHITE, PIECES.PAWN, this.board[1][4]);
	this.whitePieces[13] = new ChessPiece(WHITE, PIECES.PAWN, this.board[1][5]);
	this.whitePieces[14] = new ChessPiece(WHITE, PIECES.PAWN, this.board[1][6]);
	this.whitePieces[15] = new ChessPiece(WHITE, PIECES.PAWN, this.board[1][7]);
	
	this.selectPiece = function(cellId) {
		var row = cellId.substring(0, 1);
		var col = cellId.substring(1);
		
		var square = this.board[row-1][col-1];
		if(square.piece.color == this.turn) {
			console.log("Selecting " + square.piece.color + " " + square.piece.type);
			
			square.selected = true;
			this.pieceSelected = square.piece;
		}
		
		// Update view
		this.updateView();
	}
	
	this.movePiece = function(cellId) {
		console.log("Moving " + this.pieceSelected.color + " " + this.pieceSelected.type + " to: " + cellId);
		
		var row = cellId.substring(0, 1);
		var col = cellId.substring(1);
		
		var square = this.board[row-1][col-1];
		
		// Move the piece:
		if(this.pieceSelected.isValidMove(square, this.board)) {
			this.pieceSelected.square.selected = false;
			this.pieceSelected.square.piece = null;
			this.pieceSelected.square = square;
			square.piece = this.pieceSelected;
			
			this.pieceSelected = null;
			this.turn = this.turn == WHITE ? BLACK : WHITE;
		} else {
			alert("This is not a valid move");
			
			// Reset selection
			this.pieceSelected.square.selected = false;
			this.pieceSelected = null;			
		}
				
		// Update view:
		this.updateView();
	}
		
	// HTML of the board:
	this.toHTML = function() {
		var table = document.createElement("table");
		table.cellSpacing = "0";
		table.cellPadding = "0";
		
		for(var i = this.board.length; i >= 1; i--) {
			var row = document.createElement("tr");
			for(var j = 1; j <= this.board[i-1].length ; j++) {
				var square = this.board[i-1][j-1];
				
				var cell = document.createElement("td");
				cell.id = i + "" + j;
				cell.style.backgroundColor = square.selected ? "#39a7d4" : square.color;
				cell.style.width = cell.style.height = "50px";
				cell.style.cursor = "pointer";
				cell.style.textAlign = "center";
				
											
				// Set the listener:
				if(this.pieceSelected == null && square.piece != null) {
					cell.onclick = function(chessboard, id) { return function() { chessboard.selectPiece(id); } }(this, cell.id);
				} else if(this.pieceSelected != null){
					cell.onclick = function(chessboard, id) { return function() { chessboard.movePiece(id); } }(this, cell.id);
				}
				
				if (square.piece != null){
					var pieceImage = document.createElement("img");
					pieceImage.src = square.piece.background;
					cell.appendChild(pieceImage);
				}
				
				row.appendChild(cell);
			}		
			
			table.appendChild(row);
		}
		
		return table;
	}
	
	this.updateView = function() {		
		console.log("Refreshing view.");
		
		// Show the board
		var chessboard = document.getElementById("chessboard");
		
		// Clear the previous board
		while(chessboard.firstChild) {
			chessboard.removeChild(chessboard.firstChild);
		}
		
		// Show the current board:
		chessboard.appendChild(this.toHTML());
	}
}

/**
 * Create a new Chessboard Square.
 * The properties of a square are its color, row and column.
 * A square is initialized with a null piece on it.
 */
function ChessSquare(color, row, column) {
	this.color = color;
	this.row = row;
	this.column = column;
	this.selected = false;
	
	// Initialize with a null piece:
	this.piece = null;
}

function ChessPiece(color, type, square) {
	this.color = color;
	this.type = type;
	this.square = square;
	this.background = "resources/images/" + color + "_" + type + ".png";
	
	this.square.piece = this;
	
	// Move function
	// The Move function checks if a move is valid by applying
	// the movement rules for the types of pieces. 
	// Some code is reused in multiple places and could be moved
	// to a separate function to prevent code repitition.
	// This can be a future goal as the main purpose now is to implement 
	// movement restrictions.
	this.isValidMove = function(moveTo, board) {	
		var y = Math.abs(moveTo.row - this.square.row);
		var x = Math.abs(moveTo.column - this.square.column);
		var toX = moveTo.column;
		var toY = moveTo.row;
		var fromX = this.square.column;
		var fromY = this.square.row;		
		
		if(this.type == PIECES.PAWN) {	
			// If the landing square has a piece in it, this has to be a striking move
			if(moveTo.piece != null && moveTo.piece.color != this.color && y == 1 && x == 1) return true;
			
			// If the landing square is empty and this was a forward move, it's allowed:
			if(moveTo.piece == null && y == 1 && x == 0) return true;
			
			// Any other move is false:
			return false;
		} else if(this.type == PIECES.BISHOP) {
			if (x == y) {
				var startX;
				var startY;
				var yModifier;
				var endX;

				// Set up the variables for the correct diagonal
				if (toX < fromX) {
					startX = toX + 1;
					endX = fromX;

					startY = toY > fromY ? toY - 1 : toY + 1;
					yModifier = toY > fromY ? -1 : 1;
				} else {
					startX = fromX + 1;
					endX = toX;
					startY = toY > fromY ? fromY + 1 : fromY - 1;
					yModifier = toY > fromY ? 1 : -1;
				}

				// Check the diagonal for obstructions
				for (var i = startX; i < endX; i++) {
					if(board[startY][i].piece != null) {
						return false;
					}

					startY += yModifier;
				}

				if (moveTo.piece == null || (moveTo.piece != null && moveTo.piece.color != this.color)) {
					return true;
				}
			}

			return false;		
		} else if(this.type == PIECES.KNIGHT) {
			if((x == 2 && y == 1) || (x == 1 && y == 2)) {
				return moveTo.piece == null || (moveTo.piece != null && moveTo.piece.color != this.color)
			}
			
			return false;
		} else if(this.type == PIECES.ROOK) {
			// Only straight moves allowed:
			if ((x != 0 && y == 0) || (y != 0 && x == 0)) {
				if (x == 0) {
					var startY = (fromY < toY ? fromY : toY) + 1;
					var endY = fromY < toY ? toY : fromY;

					for (var i = startY; i < endY; i++) {
						if (board[i][fromX].piece != null) {
							return false;
						}
					}
				} else {
					var startX = (fromX < toX ? fromX : toX) + 1;
					var endX = fromX < toX ? toX : fromX;

					for (var i = startX; i < endX; i++) {
						if (board[fromY][i].piece != null) {
							return false;
						}
					}
				}
				
				if (moveTo.piece == null || (moveTo.piece != null && moveTo.piece.color != this.color)) {
					return true;
				}
			}
			
			return false;
		} else if(this.type == PIECES.QUEEN) {
			// Straight & Diagonal moves allowed:
			if ((x != 0 && y == 0) || (y != 0 && x == 0) || x == y) {
				if (x == 0) {
					// Check the vertical line:
					var startY = (fromY < toY ? fromY : toY) + 1;
					var endY = fromY < toY ? toY : fromY;

					for (var i = startY; i < endY; i++) {
						if (board[i][fromX].piece != null) {
							return false;
						}
					}
				} else if(y == 0) {
					// Check the horizontal line
					var startX = (fromX < toX ? fromX : toX) + 1;
					var endX = fromX < toX ? toX : fromX;

					for (var i = startX; i < endX; i++) {
						if (board[fromY][i].piece != null) {
							return false;
						}
					}
				} else {
					// Check the diagonal
					var startX;	
					var startY;
					var yModifier;
					var endX;

					// Set up the variables for the correct diagonal
					if (toX < fromX) {
						startX = toX + 1;
						endX = fromX;

						startY = toY > fromY ? toY - 1 : toY + 1;
						yModifier = toY > fromY ? -1 : 1;
					} else {
						startX = fromX + 1;
						endX = toX;
						startY = toY > fromY ? fromY + 1 : fromY - 1;
						yModifier = toY > fromY ? 1 : -1;
					}

					// Check the diagonal for obstructions
					for (var i = startX; i < endX; i++) {
						if(board[startY][i].piece != null) {
							return false;
						}

						startY += yModifier;
					}					
				}
				
				if (moveTo.piece == null || (moveTo.piece != null && moveTo.piece.color != this.color)) {
					return true;
				}
			}
			
			return false;			
		} else if(this.type == PIECES.KING) {
			// Any 1 step move in any direction
			if(Math.abs(y) > 1 && x > 1) return false;
			
			if(moveTo.piece == null || (moveTo.piece != null && moveTo.piece.color != this.color)) return true;			
		}
		
		return false;
	}
}

function initChessmaster() {	
	// Create the board
	var board = new Chessboard(8, 8);
	board.updateView();
}