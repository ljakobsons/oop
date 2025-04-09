const commandHistory = [];
let commandHistoryIndex = -1;

function updateTableList() {
    const tableList = document.getElementById("table-list");
    tableList.innerHTML = ""; // Clear the existing list

    fetch("/api/tables", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                console.log(data);
                data.forEach((table) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = table;
                    listItem.addEventListener("click", () => {
                        document.getElementById("input").value = `SELECT * FROM ${table};`;
                        executeCommand();
                    });
                    tableList.appendChild(listItem);
                });
            });
        } else {
            console.error("Failed to fetch tables:", response.statusText);
        }
    });
}

function executeCommand() {
    fetch("/api/call", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            command: document.getElementById("input").value
        })
    }).then((response) => {

        if (response.ok) {
            response.text().then((text) => {
                document.getElementById("output").innerHTML = `<h2>${document.getElementById("input").value}</h2><p>${text}</p>${document.getElementById("output").innerHTML}`;
                document.getElementById("input").value = "";
            });
        } else {
            response.text().then((text) => {
                document.getElementById("output").innerHTML = `<h2>${document.getElementById("input").value}</h2><p><span style="color: red;">${text}</span></p>${document.getElementById("output").innerHTML}`;
            });
        }

        commandHistory.push(document.getElementById("input").value);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (document.getElementById("input").value === "") {
                return;
            }
            if (event.shiftKey) {
                // Shift + Enter for new line
                return;
            }

            commandHistoryIndex = -1;
            event.preventDefault();

            executeCommand();
            updateTableList();

        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (commandHistoryIndex < commandHistory.length - 1) {
                commandHistoryIndex++;
                document.getElementById("input").value = commandHistory[commandHistory.length - 1 - commandHistoryIndex];
            }
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            if (commandHistoryIndex > 0) {
                commandHistoryIndex--;
                document.getElementById("input").value = commandHistory[commandHistory.length - 1 - commandHistoryIndex];
            } else if (commandHistoryIndex === 0) {
                commandHistoryIndex--;
                document.getElementById("input").value = "";
            }
        }
    });

    updateTableList();
});