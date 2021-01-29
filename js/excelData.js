import excelToJson from "convert-excel-to-json";
import fs from "fs";

const excelConverter = () => {
  const path = `public/uploads/order.xlsx`;

  if (fs.existsSync(path)) {
    const data = excelToJson({
      sourceFile: path,
      sheets: [
        {
          name: "planilha1",
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
          name: "planilha2",
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
  } else {
    return false;
  }
};

const productSelector = (data) => {
  const holder = {};
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
  for (let i = 0; i < data.planilha1.length; i++) {
    for (let j = 0; j < data.planilha2.length; j++) {
      let planilha1 = data.planilha1[i];
      let planilha2 = data.planilha2[j];
      if (
        planilha1.id == planilha2.id &&
        planilha1.itemcod == planilha2.itemcod
      ) {
        originalData.push({
          id: planilha1.id,
          description: planilha1.description,
          totalPrice: planilha1.liq * planilha1.qty,
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
  for (let i = 0; i < data.planilha2.length; i++) {
    for (let j = 0; j < dataSum.length; j++) {
      let planilha2 = data.planilha2[i];
      if (planilha2.id == dataSum[j].id) {
        let price = parseFloat(dataSum[j].totalPrice).toFixed(2);
        let dif = Math.abs(price - planilha2.price);

        dataFinal.push({
          id: dataSum[j].id,
          prices: {
            priceA: price,
            priceB: parseFloat(planilha2.price).toFixed(2),
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

export { excelConverter, compareValues, productSelector, quickSearch };
