import { useState } from "react";
import { quickSearch, productSelector } from "../js/excelData";

const OrderPopup = ({ data, handleClick, id }) => {
  const sheet1 = data.sheet1;
  const sheet2 = data.sheet2;

  const resultA = quickSearch(id, productSelector(sheet1));
  const resultB = quickSearch(id, productSelector(sheet2));

  return (
    <>
      <div className="fixed w-full h-full top-0 left-0 bg-black opacity-50 z-10"></div>
      <div className="popup-list grid grid-cols-1">
        <button
          onClick={() => handleClick()}
          className="absolute top-0 right-0 text-2xl w-16 h-12 bg-green-400 rounded-tr-xl rounded-bl-xl text-white"
        >
          X
        </button>
        <h4 className="text-lg font-medium mb-3">
          Informações do Pedido: {id}
        </h4>
        <table className="table-auto">
          <thead className="popup-table">
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor Liq. Unitário A</th>
              <th>Valor Liq. Unitário B</th>
              <th>Diferença</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {resultB.products.map((elemA, indexA) =>
              resultA.products.map((elemB, indexB) => {
                if (indexA === indexB) {
                  return (
                    <tr>
                      <td className="text-lg mr-3">{elemA.product}</td>
                      <td className="text-lg mr-3">{elemA.qty}</td>
                      <td className="text-lg mr-3">
                        R$ {parseFloat(elemA.liq).toFixed(2)}
                      </td>
                      <td className="text-lg mr-3">
                        R$ {parseFloat(elemB.liq).toFixed(2)}
                      </td>
                      <td className="text-lg">
                        R${" "}
                        {parseFloat(Math.abs(elemA.liq - elemB.liq)).toFixed(2)}
                      </td>
                    </tr>
                  );
                }
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default function Card(props) {
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };

  return (
    <div className="card bg-white w-full flex justify-between rounded-lg shadow-md">
      {isClicked ? (
        <OrderPopup data={props.data} id={props.id} handleClick={handleClick} />
      ) : null}
      <div key={props.id} className="px-4 py-3">
        <p>
          <span>Número do pedido:</span> {props.id}
        </p>
        <p>
          <span>Valor A:</span> R$ {props.priceA}
        </p>
        <p>
          <span>Valor B:</span> R$ {props.priceB}
        </p>
      </div>
      <div className="px-4 py-3">
        <p>
          <span>Diferença:</span> R$ {props.diff}
        </p>
      </div>
      <div>
        <button
          onClick={() => handleClick()}
          className="h-full bg-green-300 rounded-r-lg p-3 text-xl font-semibold text-white hover:bg-green-400 transition-all"
        >
          Verificar pedido
        </button>
      </div>
    </div>
  );
}
