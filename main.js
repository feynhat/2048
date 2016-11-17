var grid, gridTable;

function main() {
    "use strict";
    gridTable = document.querySelector("#grid");
    document.setting.onsubmit = function (e) {
        e.preventDefault();
        initGrid();
    };
    document.setting.up.onclick = function () {
        "use strict";
        var p, t;
        p = Math.log(parseInt(document.setting.target.value))/Math.log(2);
        p += 1;
        t = Math.pow(2, p);
        document.setting.target.value = t + "";
        if (grid && !grid.fail) {
            grid.target = t;
        }
    };
    document.setting.down.onclick = function () {
        "use strict";
        var p, t;
        p = Math.log(parseInt(document.setting.target.value))/Math.log(2);
        p -= 1;
        t = Math.pow(2, p);
        document.setting.target.value = t + "";
        if (grid && !grid.fail) {
            grid.target = t;
        }
    };
}

function enableKeys() {
    "use strict";
    window.onkeydown = function (e) {
        var res;
        switch (e.keyCode) {
            case 37:
                grid.moveLeft();
                break;
            case 38:
                grid.moveUp();
                break;
            case 39:
                grid.moveRight();
                break;
            case 40:
                grid.moveDown();
                break;
            default:
                return null;
        }
        update();
        done();
    };
}

function done() {
    "use strict";
    var res;
    res = grid.check();
    if (!res) {
        alert("Loser");
        disableKeys();
    } else if (res === 2) {
        alert("Winner!");
        disableKeys();
    }
}

function initGrid() {
    "use strict";
    var l, w, t;
    l = parseInt(document.setting.rows.value);
    w = parseInt(document.setting.columns.value);
    t = parseInt(document.setting.target.value);
    grid = new Grid(l, w, t);
    if (grid.fail) {
        alert("Enter a valid target. It should be a power of 2.");
        return;
    }
    grid.insert(2);
    update();
    enableKeys();
}

function update() {
    "use strict";
    var i, j;
    while (gridTable.hasChildNodes()) {
        gridTable.removeChild(gridTable.firstChild);
    }
    for (i = 0; i < grid.length; i += 1) {
        gridTable.insertRow(i);
        for (j = 0; j < grid.width; j += 1) {
            gridTable.rows[i].insertCell(j);
            gridTable.rows[i].cells[j].appendChild(document.createElement("span"));
            gridTable.rows[i].cells[j].firstChild.innerHTML = grid.cells[i][j].value || "";
        }
    }
}

function disableKeys() {
    "use strict";
    window.onkeydown = null;
}

addEventListener("load", main, false);
