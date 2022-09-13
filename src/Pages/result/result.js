import "./result.css";
import { Button, Header } from "../../Components";
import { useNavigate, useLocation } from "react-router-dom";
import image from "../../Assets/coracao.png";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
      {location.state.distancia === 0 ? (
        <div className="textResult">
          A cidade desejada está onde você se encontra
        </div>
      ) : (
        <div className="textResult">
          {location.state
            ? `O hospital mais próximo de voce é o ${location.state.nome} que está a uma distância de ${location.state.distancia} km, localizado em ${location.state.capital}.`
            : "Erro, aperte o botão de pesquisar novamente"}
        </div>
      )}
      <div className="buttonPosition">
        <Button
          text="Pesquisar novamente"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </>
  );
};

export default Result;
