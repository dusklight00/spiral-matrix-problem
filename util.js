function print2DArr(arr) {
  for (const i in arr) {
    const row = arr[i];
    let rowStr = "";
    for (const j in row) {
      const col = row[j];
      rowStr += col + "\t";
    }
    console.log(rowStr);
  }
}

module.exports = {
  print2DArr,
};
