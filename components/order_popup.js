function PopupItem(item) {
  return (
    <div className="flex">
      <p className="text-lg mr-4">
        <span className="text-lg">Produto:</span>
        {item.product}
      </p>
      <p className="text-lg mr-4">
        <span className="text-lg">Quantidade:</span>
        {item.qty}
      </p>
      <p className="text-lg">
        <span className="text-lg">Valor Liquido:</span>
        {item.liqValue}
      </p>
    </div>
  );
}

export default function OrderPopup(props) {
  return (
    <>
      <div className="fixed w-screen h-screen bg-black opacity-50 z-10"></div>
      <div className="popup-list flex flex-col">
        <button className="absolute top-1 right-3 text-2xl">X</button>
        {props.list.forEach((item) => {
          <PopupItem props={item} />;
        })}
      </div>
    </>
  );
}
