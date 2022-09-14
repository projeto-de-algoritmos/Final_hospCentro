import "./main.css";
import { Button, Header } from "../../Components";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { capitais, hospitais } from "../../Utils/capitais";
import Solution from "../../Utils/dijkstra";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import image from "../../Assets/coracao.png";
import mergeSort from "../../Utils/mergeSort";

const Main = () => {
  const options = [];
  const navigate = useNavigate();
  const [inicio, setInicio] = useState("");
  const [listaHospitais, setListaHospitais] = useState([]);

  useEffect(() => {
    const lista = JSON.parse(JSON.stringify(hospitais));
    setListaHospitais(mergeSort(lista))
  }, [])


  capitais.map((item) => {
    return options.push(item);
  });


  const infoHosp = listaHospitais.map((item, index) => {
    return (
      <div key={index} className="itensMain">
        <b>Hospital:</b> {item.nome}
        <br />
        <b>Local:</b> {item.capital}
      </div>
    );
  });

  const handleHospMaisProximo = () => {
    const result = Solution.menorDistancia(inicio);
    navigate("/resultado", {
      state: {
        nome: result.nome,
        capital: result.capital,
        distancia: result.distancia,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="title">
        <div className="titleText">Hospitais</div>
        <img
          alt="coracao"
          src={image}
          width="20px"
          height="20px"
          className="titleImg"
        />
      </div>
      <div className="textMain">
        Essas são as listas de hospitais em todo o Brasil
      </div>
      <div className="listMain">{infoHosp}</div>
      <div className="textMainCenter">
        Selecione a capital da qual você deseja partir, e assim, encontrar o
        hospital mais próximo de onde você mora.
      </div>
      <div className="buttonPosition">
        <Button
          text="Consultar"
          onClick={() => handleHospMaisProximo(options)}
        />
      </div>
      <div className="placesMain">
        <Dropdown
          options={options}
          onChange={(opion) => setInicio(opion.value)}
          placeholder="Selecione a capital"
        />
      </div>
    </>
  );
};

export default Main;
