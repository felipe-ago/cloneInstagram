import { db } from "./firebase.js";
import { useEffect, useState } from "react";

function Post(props) {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .doc(props.id)
      .collection("comentarios")
      .onSnapshot(function (snapshot) {
        setComentarios(
          snapshot.docs.map(function (document) {
            return { id: document.id, info: document.data() };
          })
        );
      });
  });
  function comentar(id, e) {
    e.preventDefault();

    let comentarioAtual = document.querySelector("#comentario-" + id).value;

    db.collection("posts").doc(id).collection("comentarios").add({
      nome: props.user,
      comentario: comentarioAtual,
    });

    alert("Comentário Postado! " + id);

    comentarioAtual = document.querySelector("#comentario-" + id).value = "";
  }
  return (
    <div className="postSingle">
      <img src={props.info.image} />
      <p>
        <b>{props.info.usuario}</b>: {props.info.titulo}
      </p>

      <div className="coments">
        {comentarios.map(function (val) {
          return (
            <div className="comentSingle">
              <p>
                <b>{val.info.nome}</b>: {val.info.comentario}
              </p>
            </div>
          );
        })}
      </div>

      <form onSubmit={(e) => comentar(props.id, e)} className="comentario">
        <textarea
          id={"comentario-" + props.id}
          placeholder="Deixe aqui o seu comentário..."
        ></textarea>
        <input type="submit" value="Comentar!" />
      </form>
    </div>
  );
}

export default Post;
