import "./App.css";
import { db } from "./firebase.js";
import { useEffect, useState } from "react";
import Header from "./Header";
import Post from "./Post";

function App() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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
        return <Post info={val.info} id={val.id}></Post>;
      })}
    </div>
  );
}

export default App;
