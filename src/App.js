import "./App.css";
import { db, auth } from "./firebase.js";
import { useEffect, useState } from "react";
import Header from "./Header";
import Post from "./Post";

function App() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(function (val) {
      if (val != null) {
        setUser(val.displayName);
      }
    });
    //Atauliza a página do Feed
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(function (snapshot) {
        setPosts(
          snapshot.docs.map(function (document) {
            return { id: document.id, info: document.data() };
          })
        );
      });
  }, []);

  return (
    <div className="App">
      <Header setUser={setUser} user={user}></Header>

      {posts.map(function (val) {
        return <Post user={user} info={val.info} id={val.id}></Post>;
      })}

      <div className="bodyLogoff">
        <h1>Seja Bem Vindo ao Clone-Instagram</h1>
        <h2>
          Caso tenha um cadastro acesse com seu e-mail e senha acima, caso
          contrário, clique em Criar Conta.
        </h2>
        <img src="./Home.png" />
      </div>
    </div>
  );
}

export default App;
