var PIECES = { BISHOP : "bishop", KNIGHT : "knight", ROOK : "rook", KING : "king", QUEEN : "queen", PAWN : "pawn" };
var COLUMN_INDEX = "abcdefgh";
var BLACK = "#000000";
var WHITE = "#ffffff";

/**
 * Creates a new Chessboard
 */
function Chessboard(cols, rows) {
	this.board = new Array(cols);
	this.blackPieces = new Array(16);
	this.whitePieces = new Array(16);
	
	var color = BLACK;
	
	// Initialize the board:
	for(var i = 0; i < rows; i++) {
		this.board[i] = new Array(rows);
		
		for(var j = 0; j < cols; j++) {
			this.board[i][j] = new ChessSquare(color, i, COLUMN_INDEX.substring(cols - 1, 1));
			
			// Toggle color
			color = color == BLACK ? WHITE : BLACK;
		}
		
		// Toggle color
		color = color == BLACK ? WHITE : BLACK;
	}
	
	// Initialize the pieces (2 bishops, 2 knights, 2 rooks, 1 king, 1 queen, 8 pawns)
	this.blackPieces[0] = new ChessPiece(PIECES.ROOK, BLACK, 8, 1);
	this.blackPieces[1] = new ChessPiece(PIECES.ROOK, BLACK, 8, 8);
	
	// HTML of the board:
	this.toHTML = function() {
		var table = document.createElement("table");
		table.cellSpacing = "0";
		table.cellPadding = "0";
		
		for(var i = this.board.length; i >= 1; i--) {
			var row = document.createElement("tr");
			for(var j = this.board[i-1].length; j >= 1; j--) {
				var cell = document.createElement("td");
				cell.style.backgroundColor = this.board[i-1][j-1].color;
				cell.style.width = cell.style.height = "50px";
				
				row.appendChild(cell);
			}		
			
			table.appendChild(row);
		}
		
		return table;
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
	
	// Initialize with a null piece:
	this.piece = null;
}

function ChessPiece(color, type, row, column) {
	this.color = color;
	this.type = type;
	this.row = row;
	this.column = column;
}

function initChessmaster() {
	var board = new Chessboard(8, 8);
	
	// Append board to the chessboard id:
	document.getElementById("chessboard").appendChild(board.toHTML());
}