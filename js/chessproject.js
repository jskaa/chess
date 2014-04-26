function createBoard(chessboard) {
	var colorToggle = true;
	var chessboardDiv = document.getElementById(chessboard);
	var chesstable = document.createElement("table");
	chesstable.cellSpacing = "0";
	chesstable.cellPadding = "0";
	for (var i = 0; i < 8; i++) {
		var chesstablerow = document.createElement("tr");
		for (var j = 0; j < 8; j++) {
			var chesstablecell = document.createElement("td");
			chesstablecell.style.width = "50px";
			chesstablecell.style.height = "50px"; 
			if (colorToggle) {
				chesstablecell.style.backgroundColor="#f4d8b1";
			} else {
				chesstablecell.style.backgroundColor="black";
			}
			colorToggle = !colorToggle;
			chesstablerow.appendChild(chesstablecell);	
		}
		colorToggle = !colorToggle;
		chesstable.appendChild(chesstablerow);
	}
	chessboardDiv.appendChild(chesstable);
}  