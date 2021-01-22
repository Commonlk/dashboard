import Head from "next/head";
import Header from "../components/header";
import Card from "../components/card";
import OrderPopup from "../components/order_popup";
import { compareValues, excelConverter } from "../js/excelData";

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page-container max-w-screen ">
        {/* <OrderPopup list={lista} /> */}
        <div className="content-wrap">
          <Header />
          <main className="flex w-full max-h-screen">
            <div className="flex-grow-0 border-r-4 w-96 flex flex-col items-center p-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                Comparar pedidos
              </h2>
              <div className="bg-gray-50 rounded-lg px-3 py-4 mx-1 my-5 shadow-inner">
                <p className="text-lg">
                  Informação: Compara duas tabelas em um arquivo excel fazendo a
                  busca por pedido e então faz a diferença para gerar uma lista
                  com os pedidos que possuem variação em valor maiores que
                  R$10,00.
                </p>
              </div>
              <button className="btn bg-green-300 text-white">Enviar arquivo</button>
              <p className="py-1 text-lg font-semibold">Ou</p>
              <button className="btn">Selecione arquivo</button>
            </div>
            <div className="flex-grow p-4">
              <h3 className="text-3xl font-medium text-gray-800">
                Resultado
              </h3>
              <div className="grid grid-cols-2 gap-6 my-8 overflow-y-scroll h-4/5">
                {compareValues(data).map((item, index) => {
                  return <Card key={item.id} id={item.id} />;
                })}
              </div>
            </div>
          </main>
        </div>
        <footer className="footer bg-green-400"></footer>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = excelConverter();
  return {
    props: {
      data,
    },
  };
}
