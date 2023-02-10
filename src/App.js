import logo from "./logo.svg";
import "./App.css";
import { db } from "./firebase.js";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {}, []);
  return (
    <div className="App">
      <div className="header">
        <div className="center">
          <div className="header_logo">
            <a href="https://www.instagram.com/">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" />
            </a>
          </div>
          {
            (user)?
            <div>Testando</div>
            :
            <div className="header_loginForm">
            <form>
              <input type="text" placeholder="Login..." />
              <input type="password" placeholder="Senha..." />
              <input type="submit" name="acao" value="Logar" />
            </form>
          </div>
          }

        </div>
      </div>
    </div>
  );
}

export default App;
