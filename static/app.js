const socket = io();
const gridEl = document.querySelector("#grid");
const statusEl = document.querySelector("#status");
const logEl = document.querySelector("#log");
let cells = [];
let activeCount = 0;

const text = {
  connected: "\u041f\u0456\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u043e",
  disconnected: "\u0412\u0456\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u043e",
  initial: "\u041e\u0442\u0440\u0438\u043c\u0430\u043d\u043e \u043f\u043e\u0447\u0430\u0442\u043a\u043e\u0432\u0438\u0439 \u0441\u0442\u0430\u043d",
  active: "\u0430\u043a\u0442\u0438\u0432\u043d\u0438\u0445 \u043a\u043b\u0456\u0442\u0438\u043d\u043e\u043a",
  updated: "\u0421\u0442\u0430\u043d \u043e\u043d\u043e\u0432\u043b\u0435\u043d\u043e",
};

function updateLog(prefix = text.updated) {
  logEl.textContent = `${prefix}: ${text.active} ${activeCount}.`;
}

function createGrid(rows, cols) {
  gridEl.innerHTML = "";
  cells = Array.from({ length: rows }, () => Array(cols));
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.title = `row ${row}, col ${col}`;
      cell.addEventListener("click", () => socket.emit("toggle_cell", { row, col }));
      cells[row][col] = cell;
      gridEl.appendChild(cell);
    }
  }
}

function applyCell(row, col, state) {
  const cell = cells[row]?.[col];
  if (cell) cell.classList.toggle("active", Boolean(state));
}

socket.on("connect", () => { statusEl.textContent = text.connected; });
socket.on("disconnect", () => { statusEl.textContent = text.disconnected; });

socket.on("state_init", (payload) => {
  createGrid(payload.rows, payload.cols);
  activeCount = payload.active.length;
  payload.active.forEach(({ row, col }) => applyCell(row, col, 1));
  updateLog(text.initial);
});

socket.on("cell_updated", ({ row, col, state }) => {
  const wasActive = cells[row]?.[col]?.classList.contains("active");
  applyCell(row, col, state);
  if (Boolean(state) !== wasActive) activeCount += state ? 1 : -1;
  updateLog();
});

socket.on("server_error", ({ message }) => { logEl.textContent = message; });
