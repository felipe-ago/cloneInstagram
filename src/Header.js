import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { auth, storage, db } from "./firebase.js";

function Header(props) {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);

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
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  //Logout no Firebase

  function deslogar(e) {
    e.preventDefault();
    auth.signOut().then(function (val) {
      props.setUser(null);
      window.location.href = "/";
    });
  }

  function abrirModalUpload(e) {
    e.preventDefault();
    let modal = document.querySelector(".modalUpload");

    modal.style.display = "block";
  }

  function fecharModalUpload() {
    let modal = document.querySelector(".modalUpload");

    modal.style.display = "none";
  }

  function uploadPost(e) {
    e.preventDefault();
    let legenda = document.getElementById("legendaUpload").value;
    let progressEl = document.getElementById("progressUpload");

    const uploadTask = storage.ref(`images/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      function (error) {},
      function () {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(function (url) {
            db.collection("posts").add({
              titulo: legenda,
              image: url,
              usuario: props.user,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setProgress(0);
            setFile(null);

            alert("Upload Realizado com Sucesso!");

            document.getElementById("form-upload").reset();

            fecharModalUpload();
          });
      }
    );
  }

  //Dark Mode

  /*const btn = document.getElementById("btnDarkMode");

  btn.addEventListener("change", (e) => {
    document.body.classList.toggle("dark", e.target.checked);
    document.head.classList.toggle("dark", e.target.checked);
  });
  
  
  Deve ser colocado no Return, Junto com o "Criar Conta"
  
  <div className="darkMode">
      <input type="checkbox" id="btnDarkMode" name="btnDakMode" />
      <label for="btnDarkMode">
        <i class="fa-solid fa-circle-half-stroke"></i>
      </label>
  </div>*/

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

      <div className="modalUpload">
        <div className="formUpload">
          <div onClick={() => fecharModalUpload()} className="closeModalUpload">
            X
          </div>
          <h2>Fazer Upload</h2>
          <form id="form-upload" onSubmit={(e) => uploadPost(e)}>
            <progress id="progressUpload" value={progress}></progress>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              name="file"
            />
            <input
              id="legendaUpload"
              type="text"
              placeholder="Legenda da Imagem..."
            />
            <input type="submit" value="Postar Arquivo" />
          </form>
        </div>
      </div>
      <div className="center">
        <div className="header_logo">
          <a href="localhost:3000/">
            <img src="./LogoSite.png" />
          </a>
        </div>
        {props.user ? (
          <div className="header_logadoInfo">
            <span>
              Olá, <b>{props.user}</b>
            </span>
            <a onClick={(e) => abrirModalUpload(e)} href="#">
              Postar!
            </a>
            <a onClick={(e) => deslogar(e)}>Sair</a>
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
