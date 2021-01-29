import Head from "next/head";
import { useRef, useState } from "react";
import Header from "../components/header";
import Card from "../components/card";
import { compareValues, excelConverter } from "../js/excelData";

export default function Home({ data }) {
  const hiddenFileInput = useRef(null);
  const [uploaded, setUploaded] = useState(false);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = (file) => {
    const API_ENDPOINT = "/api/upload";
    const request = new XMLHttpRequest();
    const formData = new FormData();

    request.open("POST", API_ENDPOINT, true);
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log(request.responseText);
      }
    };
    formData.append("file", file);
    request.send(formData);

    setUploaded(true);
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page-container max-w-screen ">
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
              <div className="">
                {!uploaded ? (
                  <button
                    type="button"
                    onClick={handleClick}
                    className="btn bg-green-300 text-white"
                  >
                    Upload arquivo
                  </button>
                ) : null}

                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={(e) => uploadFile(e.target.files[0])}
                  className="hidden"
                ></input>
              </div>
            </div>
            <div className="flex-grow p-4">
              <h3 className="text-3xl font-medium text-gray-800">Resultado</h3>
              <div className="relative grid grid-cols-2 gap-6 my-8 overflow-y-scroll h-4/5">
                {uploaded ? (
                  compareValues(data).map((item) => {
                    if (item.difference >= 10) {
                      return (
                        <Card
                          key={item.id}
                          id={item.id}
                          priceA={item.prices.priceA}
                          priceB={item.prices.priceB}
                          diff={item.difference}
                          data={data}
                        />
                      );
                    }
                  })
                ) : (
                  <div className="absolute transform translate-x-1/2 translate-y-1/2 top-1/2 right-1/2 text-2xl text-green-700 animate-pulse">
                    Aguardando...
                  </div>
                )}
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
