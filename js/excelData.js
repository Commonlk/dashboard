let _ = require("lodash");
let excelToJson = require("convert-excel-to-json");

const excelConverter = () => {
  const data = excelToJson({
    sourceFile: `public/uploads/entry4.xlsx`,
    sheets: [
      {
        name: "sheet1",
        header: {
          rows: 1,
        },
        columnToKey: {
          AD: "id",
          Y: "description",
          Z: "qty",
          AA: "price",
          AT: "itemcod",
        },
      },
      {
        name: "sheet2",
        header: {
          rows: 1,
        },
        columnToKey: {
          A: "lot",
          B: "store",
          C: "id",
          E: "price",
          P: "itemcod",
        },
      },
    ],
  });
  return data;
};

const compareValues = (data) => {
  // Selects on the orders that exists on both sheets and push into a new array
  let originalData = [];
  for (let i = 0; i < data.sheet1.length; i++) {
    for (let j = 0; j < data.sheet2.length; j++) {
      let sheet1 = data.sheet1[i];
      let sheet2 = data.sheet2[j];
      if (sheet1.id == sheet2.id) {
        originalData.push({
          id: sheet1.id,
          description: sheet1.description,
          totalPrice: sheet1.price * sheet1.qty,
        });
      }
    }
  }

  // Adds up the values from the array items with the same id
  let holder = {};
  originalData.forEach(function (d) {
    if (holder.hasOwnProperty(d.id)) {
      holder[d.id] = holder[d.id] + d.totalPrice;
    } else {
      holder[d.id] = d.totalPrice;
    }
  });

  // Creates a new arrays with the add up values
  let dataSum = [];
  for (var prop in holder) {
    dataSum.push({ id: prop, totalPrice: holder[prop].toFixed(2) });
  }

  // Compares the summed up values
  let dataFinal = [];
  for (let i = 0; i < data.sheet2.length; i++) {
    for (let j = 0; j < dataSum.length; j++) {
      let sheet2 = data.sheet2[i];
      if (sheet2.id == dataSum[j].id) {
        let price = parseFloat(dataSum[j].totalPrice).toFixed(2);
        let dif = Math.abs(price - sheet2.price);

        dataFinal.push({
          id: dataSum[j].id,
          prices: {
            priceA: price,
            priceB: parseFloat(sheet2.price).toFixed(2),
          },
          difference: parseFloat(dif).toFixed(2),
        });
      }
    }
  }
  return dataFinal;
};

exports.excelConverter = excelConverter;
exports.compareValues = compareValues;
