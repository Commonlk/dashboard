function PopupItem(props) {
  return (
    <>
      <tr>
        <td className="text-lg">{props.product}</td>
        <td className="text-lg">{props.qty}</td>
        <td className="text-lg">R$ {parseFloat(props.liqValueA).toFixed(2)}</td>
        <td className="text-lg">R$ {parseFloat(props.liqValueB).toFixed(2)}</td>
        <td className="text-lg">
          R$ {Math.abs(props.liqValueA - props.liqValueB).toFixed(2)}
        </td>
      </tr>
    </>
  );
}

export default function OrderPopup(props) {
  return (
    <>
      <div className="fixed w-screen h-screen bg-black opacity-50 z-10"></div>
      <div className="popup-list grid grid-cols-1">
        <button className="absolute top-1 right-3 text-2xl">X</button>
        <h4 className="text-lg font-medium mb-3">
          Informações do Pedido: {props.id}
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
            <PopupItem
              product={props.product}
              qty={props.qty}
              liqValueA={props.liqValueA}
              liqValueB={props.liqValueB}
            />
          </tbody>
        </table>
      </div>
    </>
  );
}
