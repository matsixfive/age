import axios from "axios";
import { useState, useEffect } from "react";

export default function Joke() {
  const [jokeText, setJokeText] = useState("");

  let getJoke = () => {
    axios
      .get("https://icanhazdadjoke.com", { headers: { Accept: "text/plain" } })
      .then((res) => {
        setJokeText(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  useEffect(() => {
    getJoke();
  }, []);

  return (
    <>
      <p>{jokeText}</p>
    </>
  );
}
