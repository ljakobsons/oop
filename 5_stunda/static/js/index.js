const commandHistory = [];
let commandHistoryIndex = -1;

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (document.getElementById("input").value === "") {
                return;
            }
            if (event.ctrlKey || event.metaKey) {
                // Shift + Enter for new line
                return;
            }

            commandHistoryIndex = -1;
            event.preventDefault();
            document.getElementById("output").innerText = "Loading...";

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
                        document.getElementById("output").innerHTML += `<h2>${document.getElementById("input").value}</h2>${text}`;
                        document.getElementById("input").value = "";
                    });
                } else {
                    response.text().then((text) => {
                        document.getElementById("output").innerHTML += `<h2>${document.getElementById("input").value}</h2><span style="color: red;">${text}</span>`;
                    });
                }

                commandHistory.push(document.getElementById("input").value);
            });

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
});