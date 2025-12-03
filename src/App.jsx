import { useContext } from "react";
import "./App.css";
import { CiMicrophoneOn } from "react-icons/ci";
import { DataContext } from "./context";
import ModelImg from "/src/assets/model3.jpg";
import LoadingImg from "/src/assets/loading-img.png";
import ResponseImg from "/src/assets/responseGif2.gif";

function App() {
  let { recognization, speaking, setSpeaking, prompt, response } =useContext(DataContext);

  return (
    <>
      <div className="main">
        <img src={ModelImg} alt="" />
        <span className="span"> Hi, I am JACKSON your virtual assistant</span>
        {!speaking ? (
          <button
            onClick={() => {
              setSpeaking(true); // here it shows that speaking is start
              recognization.start();
            }}
          >
            Click Here <CiMicrophoneOn />
          </button>
        ) : (
          <div className="answer">
            {!response ? (
              <img className="loadingImg" src={LoadingImg} alt="" />
            ) : (
              <img className="loadingImg" src={ResponseImg} />
            )}
            <p>{prompt}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
