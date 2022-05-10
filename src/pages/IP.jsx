import { useState, useEffect } from "react";
import axios from "axios";

export default function IP() {
  const [ip, setIP] = useState("");
  const getData = async () => {
    axios.get("https://ifconfig.co/ip").then((res) => {
    console.log(res);
    setIP(res.data);
  })};
  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
  return <p>{ip}</p>;
}
