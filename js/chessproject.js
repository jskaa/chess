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
	
	
	
	// HTML of the board:
	this.toHTML = function() {
		var table = document.createElement("table");
		table.cellSpacing = "0";
		table.cellPadding = "0";
		
		for(var i = this.board.length; i >= 1; i--) {
			var row = document.createElement("tr");
			for(var j = 1; j <= this.board[i-1].length ; j++) {
				var cell = document.createElement("td");
				cell.style.backgroundColor = this.board[i-1][j-1].color;
				cell.style.width = cell.style.height = "50px";
				
				if (this.board[i-1][j-1].piece != null){
					var test = document.createElement("img");
					test.src = this.board[i-1][j-1].piece.background;
					cell.appendChild(test);
					cell.style.textAlign = "center";
				}
				
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

function ChessPiece(color, type, square) {
	this.color = color;
	this.type = type;
	this.square = square;
	this.background = "resources/images/" + color + "_" + type + ".png";
	
	this.square.piece = this;
}

function initChessmaster() {
	var board = new Chessboard(8, 8);
	
	// Append board to the chessboard id:
	document.getElementById("chessboard").appendChild(board.toHTML());
}