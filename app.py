from flask import Flask, render_template
from flask_socketio import SocketIO, emit

ROWS = 60
COLS = 100
grid = [[0 for _ in range(COLS)] for _ in range(ROWS)]

app = Flask(__name__)
app.config["SECRET_KEY"] = "collaborative-grid-lab1"
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")


def active_cells():
    return [{"row": r, "col": c} for r in range(ROWS) for c in range(COLS) if grid[r][c]]


@app.get("/")
def index():
    return render_template("index.html")


@socketio.on("connect")
def handle_connect():
    emit("state_init", {"rows": ROWS, "cols": COLS, "active": active_cells()})


@socketio.on("toggle_cell")
def handle_toggle_cell(payload):
    row = payload.get("row") if isinstance(payload, dict) else None
    col = payload.get("col") if isinstance(payload, dict) else None
    if not isinstance(row, int) or not isinstance(col, int):
        emit("server_error", {"message": "ÐšÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ð¸ Ð¼Ð°ÑŽÑ‚ÑŒ Ð±ÑƒÑ‚Ð¸ Ñ†Ñ–Ð»Ð¸Ð¼Ð¸ Ñ‡Ð¸ÑÐ»Ð°Ð¼Ð¸."})
        return
    if row < 0 or row >= ROWS or col < 0 or col >= COLS:
        emit("server_error", {"message": "ÐšÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ð¸ Ð²Ð¸Ñ…Ð¾Ð´ÑÑ‚ÑŒ Ð·Ð° Ð¼ÐµÐ¶Ñ– Ð¿Ð¾Ð»Ñ."})
        return
    grid[row][col] = 0 if grid[row][col] else 1
    emit("cell_updated", {"row": row, "col": col, "state": grid[row][col]}, broadcast=True)


if __name__ == "__main__":
    socketio.run(app, host="127.0.0.1", port=5000, debug=True, allow_unsafe_werkzeug=True)

