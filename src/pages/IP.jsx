import { useState, useEffect } from "react";
import axios from "axios";

export default function IP() {
  const [ip, setIP] = useState("");
  const getData = async () => {
    axios
      .get("https://geolocation-db.com/json/", {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        console.log(res.data);
        setIP(res.data);
      });
  };
  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
  return (
    <>
      <p>Your IP is: {ip.IPv4}</p>
      {
        ip.length === 0 ? null :
        <iframe
          title="map"
          width="600"
          height="450"
          style={{ border: "0" }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?q=${ip.country_code}&key=AIzaSyBJ5T6PtQLRPmcAfaho0xqf3xoxf25mwUU`}
        ></iframe>
      }{" "}
    </>
  );
}
