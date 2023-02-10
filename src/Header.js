import { useEffect, useState } from "react";

function Header(props) {
  //const [user, setUser] = useState("Felipe");

  return (
    <div className="header">
      <div className="center">
        <div className="header_logo">
          <a href="https://www.instagram.com/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" />
          </a>
        </div>
        {props.user ? (
          <div className="header_logadoInfo">
            <span>
              Olá, <b>{props.user}</b>
            </span>
            <a href="#">Postar!</a>
          </div>
        ) : (
          <div className="header_loginForm">
            <form>
              <input type="text" placeholder="Login..." />
              <input type="password" placeholder="Senha..." />
              <input type="submit" name="acao" value="Logar" />
            </form>
            <div className="btn_criarConta">
              <a href="#">Criar Conta!</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
