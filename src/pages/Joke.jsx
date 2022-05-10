import axios from "axios";
import { useState, useEffect } from "react";

export default function Joke() {
  const [jokeText, setJokeText] = useState("");
  const [jokeAvaliable, setJokeAvaliable] = useState(true);

  let getJoke = () => {
    console.log(jokeAvaliable);
    if (jokeAvaliable) {
      axios
        .get("https://icanhazdadjoke.com", {
          headers: { Accept: "text/plain" },
        })
        .then((res) => {
          setJokeText(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 429) {
            setJokeText("Too many jokes! Try waiting a minute.");
            setJokeAvaliable(false);
            setTimeout(setJokeAvaliable(true), 60000);
          }
        });
    }
  };

  useEffect(() => {
    getJoke();
  }, []);

  return (
    <>
      <p>{jokeText}</p>
      <button onClick={getJoke}>Get Joke</button>
    </>
  );
}
