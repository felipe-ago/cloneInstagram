import { useEffect, useState } from "react";
import { auth } from "./firebase.js";

function Header(props) {
  useEffect(() => {});

  function abrirModalCriarConta(e) {
    e.preventDefault();

    let modal = document.querySelector(".modalCriarConta");

    modal.style.display = "block";
  }

  function fecharModalCriar() {
    let modal = document.querySelector(".modalCriarConta");

    modal.style.display = "none";
  }

  function criarConta(e) {
    e.preventDefault();
    let email = document.getElementById("emailCadastro").value;
    let usuario = document.getElementById("usuarioCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;

    //Criar Conta Firebase

    auth
      .createUserWithEmailAndPassword(email, senha)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: usuario,
        });
        alert("Conta Criada com Sucesso");
        let modal = document.querySelector(".modalCriarConta");

        modal.style.display = "none";
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function logar(e) {
    e.preventDefault();
    let usuario = document.getElementById("usuarioLogin").value;
    let senha = document.getElementById("senhaLogin").value;

    //Login no Firebase

    auth
      .signInWithEmailAndPassword(usuario, senha)
      .then((auth) => {
        props.setUser(auth.user.displayName);
        alert("Logado com Sucesso");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div className="header">
      <div className="modalCriarConta">
        <div className="formCriarConta">
          <div onClick={() => fecharModalCriar()} className="closeModalCriar">
            X
          </div>
          <h2>Criar Conta</h2>
          <form onSubmit={(e) => criarConta(e)}>
            <input id="emailCadastro" type="text" placeholder="Seu E-mail..." />
            <input
              id="usuarioCadastro"
              type="text"
              placeholder="Seu User Name..."
            />
            <input
              id="senhaCadastro"
              type="password"
              placeholder="Sua Senha..."
            />
            <input type="submit" value="Cria Conta" />
          </form>
        </div>
      </div>
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
            <form onSubmit={(e) => logar(e)}>
              <input id="usuarioLogin" type="text" placeholder="Login..." />
              <input id="senhaLogin" type="password" placeholder="Senha..." />
              <input type="submit" name="acao" value="Logar" />
            </form>
            <div className="btn_criarConta">
              <a onClick={(e) => abrirModalCriarConta(e)} href="#">
                Criar Conta!
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
