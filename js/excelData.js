let _ = require("lodash");
let excelToJson = require("convert-excel-to-json");

const excelConverter = () => {
  const data = excelToJson({
    sourceFile: `public/uploads/order.xlsx`,
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
          AA: "liq",
          AT: "itemcod",
        },
      },
      {
        name: "sheet2",
        header: {
          rows: 4,
        },
        columnToKey: {
          A: "id",
          G: "store",
          L: "price",
          AE: "itemcod",
          U: "description",
          V: "qty",
          Y: "liq",
        },
      },
    ],
  });
  return data;
};

const productSelector = (data) => {
  holder = {};
  data.forEach(function (d) {
    if (holder.hasOwnProperty(d.id)) {
      holder[d.id].push({
        product: d.description,
        qty: d.qty,
        liq: d.liq,
      });
    } else if (d.id !== undefined) {
      holder[d.id] = [
        {
          product: d.description,
          qty: d.qty,
          liq: d.liq,
        },
      ];
    }
  });
  let dataCompressed = [];
  for (var prop in holder) {
    dataCompressed.push({ id: prop, products: holder[prop] });
  }

  return dataCompressed;
};

const quickSearch = (search, obj) => {
  for (const elem of obj) {
    if (elem.id == search) {
      return elem;
    }
  }
};

const compareValues = (data) => {
  // Selects all the orders that exists on both sheets and push into a new array
  let originalData = [];
  for (let i = 0; i < data.sheet1.length; i++) {
    for (let j = 0; j < data.sheet2.length; j++) {
      let sheet1 = data.sheet1[i];
      let sheet2 = data.sheet2[j];
      if (sheet1.id == sheet2.id && sheet1.itemcod == sheet2.itemcod) {
        originalData.push({
          id: sheet1.id,
          description: sheet1.description,
          totalPrice: sheet1.liq * sheet1.qty,
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
  let removedDuplicates = [];
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

        removedDuplicates = dataFinal.filter(
          (elemA, index, arr) =>
            arr.findIndex((elemB) => elemB.id === elemA.id) === index
        );
      }
    }
  }

  return removedDuplicates;
};

exports.excelConverter = excelConverter;
exports.compareValues = compareValues;
exports.productSelector = productSelector;
exports.quickSearch = quickSearch;
