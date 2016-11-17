function Cell(value) {
    "use strict";
    this.value = value || 0;
    this.lock = 0;
}

function Grid(length, width, target) {
    "use strict";
    this.target = 0;
    this.length = 0;
    this.width = 0;
    this.fail = 1;
    var i, j;
    if (parseInt(Math.log(target)/Math.log(2)) === Math.log(target)/Math.log(2) || !target) {
        this.target = target || 4;
        this.length = length || 4;
        this.width = width || 4;
        this.fail = 0;
    }
    this.cells = [];
    for (i = 0; i < this.length; i += 1) {
        this.cells.push([]);
        for (j = 0; j < this.length; j += 1) {
            this.cells[i].push(new Cell(0));
        }
    }
}

Grid.prototype.insert = function (n) {
    "use strict";
    var x, y, i;

    for (i = 0; i < n; i += 1) {
        x = parseInt(Math.random()*this.length);
        y = parseInt(Math.random()*this.width);
        if (!this.cells[x][y].value) {
            this.cells[x][y].value = [2, 2, 2, 2, 2, 2, 2, 4][parseInt(Math.random() * 8)];
        } else {
            i--;
        }
    }
};

Grid.prototype.setLock = function (v) {
    "use strict";
    var i, j;
    for (i = 0; i < this.length; i += 1) {
        for (j = 0; j < this.width; j += 1) {
            this.cells[i][j].lock = v;
        }
    }
};

Grid.prototype.moveRight = function () {
    "use strict";
    var i, j, x, c = 0;
    for (i = 0; i < this.length; i += 1) {
        for (j = this.width - 2; j >= 0; j -= 1) {
            if (this.cells[i][j].value) {
                x = j + 1;
                while (x < this.width && !this.cells[i][x].value) {
                    x += 1; 
                }
                if (x < this.width && this.cells[i][j].value === this.cells[i][x].value && !this.cells[i][x].lock) {
                    c = 1;
                    this.cells[i][x].lock = 1;
                    this.cells[i][x].value *= 2;
                    this.cells[i][j].value = 0;
                } else if (x - 1 !== j) {
                    c = 1;
                    this.cells[i][x - 1].value = this.cells[i][j].value;
                    this.cells[i][j].value = 0;
                }
            }
        }
    }
    if (c) {
        this.insert(1);
    }
    this.setLock(0);
};

Grid.prototype.moveLeft = function () {
    "use strict";
    var i, j, x, c = 0;
    for (i = 0; i < this.length; i += 1) {
        for (j = 1; j < this.width; j += 1) {
            if (this.cells[i][j].value) {
                x = j - 1;
                while (x >= 0 && !this.cells[i][x].value) {
                    x -= 1; 
                }
                if (x >= 0 && this.cells[i][j].value === this.cells[i][x].value && !this.cells[i][x].lock) {
                    c = 1;
                    this.cells[i][x].lock = 1;
                    this.cells[i][x].value *= 2;
                    this.cells[i][j].value = 0;
                } else if (x + 1 !== j){
                    c = 1;
                    this.cells[i][x + 1].value = this.cells[i][j].value;
                    this.cells[i][j].value = 0;
                }
            }
        }
    }
    if (c) {
        this.insert(1);
    }
    this.setLock(0);
};

Grid.prototype.moveDown = function () {
    "use strict";
    var i, j, x, c = 0;
    for (j = 0; j < this.width; j += 1) {
        for (i = this.length - 2; i >= 0; i -= 1) {
            if (this.cells[i][j].value) {
                x = i + 1;
                while (x < this.length && !this.cells[x][j].value) {
                    x += 1; 
                }
                if (x < this.length && this.cells[i][j].value === this.cells[x][j].value && !this.cells[x][j].lock) {
                    c = 1;
                    this.cells[x][j].lock = 1;
                    this.cells[x][j].value *= 2;
                    this.cells[i][j].value = 0;
                } else if (x - 1 !== i) {
                    c = 1;
                    this.cells[x - 1][j].value = this.cells[i][j].value;
                    this.cells[i][j].value = 0;
                }
            }
        }
    }
    if (c) {
        this.insert(1);
    }
    this.setLock(0);
};

Grid.prototype.moveUp = function () {
    "use strict";
    var i, j, x, c = 0;
    for (j = 0; j < this.width; j += 1) {
        for (i = 1; i < this.length; i += 1) {
            if (this.cells[i][j].value) {
                x = i - 1;
                while (x >= 0 && !this.cells[x][j].value) {
                    x -= 1; 
                }
                if (x >= 0 && this.cells[i][j].value === this.cells[x][j].value && !this.cells[x][j].lock) {
                    c = 1;
                    this.cells[x][j].lock = 1;
                    this.cells[i][j].value = 0;
                    this.cells[x][j].value *= 2;
                } else if (x + 1 !== i) {
                    c = 1;
                    this.cells[x + 1][j].value = this.cells[i][j].value;
                    this.cells[i][j].value = 0;
                }
            }
        }
    }
    if (c) {
        this.insert(1);
    }
    this.setLock(0);
};


Grid.prototype.neighbors = function (i, j) {
    "use strict";
    var neigh = [];
    if (j - 1 >= 0) {
        neigh.push(this.cells[i][j - 1]);
    }
    if (i - 1 >= 0) {
        neigh.push(this.cells[i - 1][j]);
    }
    if (i + 1 < this.length) {
        neigh.push(this.cells[i + 1][j]);
    }
    if (j + 1 < this.width) {
        neigh.push(this.cells[i][j + 1]);
    }
    return neigh;
};

Grid.prototype.check = function () {
    "use strict";
    var i, j, nb, k;

    for (i = 0; i < this.length; i += 1) {
        for (j = 0; j < this.width; j += 1) {
            if (!this.cells[i][j].value) {
                return 1;
            }
            if (this.cells[i][j].value === this.target) {
                return 2;
            }
        }
    }
    for (i = 0; i < this.length; i += 1) {
        for (j = 0; j < this.width; j += 1) {
            nb = this.neighbors(i, j);
            for (k = 0; k < nb.length; k += 1) {
                if (this.cells[i][j].value === nb[k].value) {
                    return 1;
                }
            }
        }
    }
    return 0;
};
