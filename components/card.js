export default function Card(props) {
  return (
    <div className="card bg-white w-full flex justify-between rounded-lg shadow-md">
      <div key={props.id} className="px-4 py-3">
        <p>
          <span>Lote:</span> {props.lot}
        </p>
        <p>
          <span>Valor A:</span> R$ {props.priceA}
        </p>
        <p>
          <span>Diferença:</span> R$ {props.diff}
        </p>
      </div>
      <div className="px-4 py-3">
        <p>
          <span>Número do pedido:</span> {props.id}
        </p>
        <p>
          <span>Valor B:</span> R$ {props.priceB}
        </p>
      </div>
      <div>
        <button className="h-full bg-green-300 rounded-r-lg p-3 text-xl font-semibold text-white hover:bg-green-400 transition-all">
          Verificar pedido
        </button>
      </div>
    </div>
  );
}
