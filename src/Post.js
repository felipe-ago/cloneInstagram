function Post(props) {
  function comentar(id, e) {
    e.preventDefault();
    alert("Comentário Postado! " + id);
  }
  return (
    <div className="postSingle">
      <img src={props.info.image} />
      <p>
        <b>{props.info.usuario}</b>: {props.info.titulo}
      </p>
      <form onSubmit={(e) => comentar(props.id, e)} className="comentario">
        <textarea placeholder="Deixe aqui o seu comentário..."></textarea>
        <input type="submit" value="Comentar!" />
      </form>
    </div>
  );
}

export default Post;
