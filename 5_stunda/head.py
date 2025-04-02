from flask import Flask, render_template, request, jsonify, Response
import sqlite3
import os

app = Flask(__name__)

txt_files = [f for f in os.listdir() if f.endswith(".txt")]
startupCmd = ""
for file in txt_files:
    with open(file, "r") as f:
        startupCmd += f.read() + "\n"
conn = sqlite3.connect("main.db")
cursor = conn.cursor()
cursor.executescript(" ".join(startupCmd.splitlines()))
conn.commit()
conn.close()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/call", methods=["POST"])
def api_call():
    request.data = request.get_json()
    command = request.data["command"]

    conn = sqlite3.connect("main.db")
    cursor = conn.cursor()
    try:
        cursor.execute(command)
        conn.commit()
        result = cursor.fetchall()
        output = ""

        for row in result:
            output += str(row) + "<br>"
        if not output:
            output = "No rows found."

        conn.close()
        return Response(
            response=output,
            status=200,
            mimetype="application/json",
        )
    except sqlite3.Error as e:
        conn.close()
        return Response(
            response=str(e),
            status=400,
            mimetype="application/text",
        )


if __name__ == "__main__":
    app.run(debug=True)
