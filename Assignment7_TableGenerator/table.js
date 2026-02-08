function table_generator(){
    const rows = document.getElementById('row').value
    const columns = document.getElementById('column').value
    
    // Clear previous content
    document.getElementById("table_heads").innerHTML = ""
    document.getElementById("table_body").innerHTML = ""
    
    // Create table structure
    let table = document.createElement("table")
    table.id = "generatedTable"
    let thead = document.createElement("thead")
    let tbody = document.createElement("tbody")
    tbody.id = "tableBody"
    
    // Create header row
    let headerRow = document.createElement("tr")
    for(let col = 0; col < columns; col++){
        let head = prompt("Enter table heading " + (col + 1))
        let th = document.createElement("th")
        th.textContent = head
        headerRow.appendChild(th)
    }
    thead.appendChild(headerRow)
    
    // Create data rows
    for(let row = 0; row < rows; row++){
        let row_element = document.createElement("tr")
        for(let col = 0; col < columns; col++){
            let cell = document.createElement("td")
            cell.textContent = prompt("Enter data for row " + (row + 1) + ", column " + (col + 1))
            row_element.appendChild(cell)
        }
        tbody.appendChild(row_element)
    }
    
    // Append table parts
    table.appendChild(thead)
    table.appendChild(tbody)
    document.getElementById("table_heads").appendChild(table)
    
    // Show control buttons
    document.getElementById("controls").style.display = "block"
    
    // Make cells editable on click
    makeTableEditable()
}

function makeTableEditable() {
    document.querySelectorAll("td").forEach(cell => {
        cell.addEventListener("click", function() {
            if (!this.isEditing) {
                this.isEditing = true;
                const currentText = this.textContent;
                this.innerHTML = '<input type="text" value="' + currentText + '" autofocus>';
                const input = this.querySelector("input");
                const cellElement = this;
                input.addEventListener("blur", function() {
                    cellElement.textContent = this.value;
                    cellElement.isEditing = false;
                });
            }
        });
    });
}

function addRow() {
    const tbody = document.getElementById("tableBody")
    if (!tbody) {
        alert("Please generate a table first!")
        return
    }
    
    const table = document.getElementById("generatedTable")
    const columnCount = table.querySelector("thead tr").children.length
    
    let newRow = document.createElement("tr")
    for (let i = 0; i < columnCount; i++) {
        let cell = document.createElement("td")
        let data = prompt("Enter data for column " + (i + 1))
        cell.textContent = data || ""
        newRow.appendChild(cell)
    }
    
    tbody.appendChild(newRow)
    makeTableEditable()
}

function deleteRow() {
    const tbody = document.getElementById("tableBody")
    if (!tbody) {
        alert("Please generate a table first!")
        return
    }
    
    const rows = tbody.getElementsByTagName("tr")
    if (rows.length === 0) {
        alert("No rows to delete!")
        return
    }
    
    const rowNumber = parseInt(prompt("Enter row number to delete (1 to " + rows.length + "):"))
    
    if (rowNumber && rowNumber > 0 && rowNumber <= rows.length) {
        tbody.deleteRow(rowNumber - 1)
        alert("Row " + rowNumber + " deleted successfully!")
    } else {
        alert("Invalid row number!")
    }
}

function highlightEvenRows() {
    const tbody = document.getElementById("tableBody")
    if (!tbody) {
        alert("Please generate a table first!")
        return
    }
    
    const rows = tbody.getElementsByTagName("tr")
    for (let i = 0; i < rows.length; i++) {
        if ((i + 1) % 2 === 0) {
            rows[i].style.backgroundColor = "#f0f0f0"
        } else {
            rows[i].style.backgroundColor = ""
        }
    }
}