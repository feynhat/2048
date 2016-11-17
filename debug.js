function pg(x) {
    for (y in x.cells) {
        s = y + ": ";
        for (z in x.cells[y]) {
            s += x.cells[y][z].value + " ";
        }
        console.log(s);
    }
}
