import { useEffect, useState } from "react";

import AgeSection from "./AgeSection";

import styles from "./homepage.module.css";

export default function Homepage() {
  const [canShow, setCanShow] = useState(false);
  const [formattedAge, setFormattedAge] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [yearsLeft, setYearsLeft] = useState();

  const findDivisions = (ms) => {
    let years = ms / 1000 / 60 / 60 / 24 / 365.25;
    let yearsRound = Math.floor(years);
    let remainder = (years - yearsRound) * 1000 * 60 * 60 * 24 * 365.25;

    let days = remainder / 1000 / 60 / 60 / 24;
    let daysRound = Math.floor(days);
    remainder = (days - daysRound) * 1000 * 60 * 60 * 24;

    let hours = remainder / 1000 / 60 / 60;
    let hoursRound = Math.floor(hours);
    remainder = (hours - hoursRound) * 1000 * 60 * 60;

    let minutes = remainder / 1000 / 60;
    let minutesRound = Math.floor(minutes);
    remainder = (minutes - minutesRound) * 1000 * 60;

    let seconds = remainder / 1000;
    let secondsRound = Math.floor(seconds);
    remainder = (seconds - secondsRound) * 1000;

    let milliseconds = remainder;
    let millisecondsRound = Math.floor(milliseconds);
    remainder = milliseconds - millisecondsRound;

    return {
      years: yearsRound,
      days: daysRound,
      hours: hoursRound,
      minutes: minutesRound,
      seconds: secondsRound,
      milliseconds: millisecondsRound,
    };
  };

  useEffect(() => {
    setCanShow(true);

    // 31/01/2006 03:02:00 in epoch time
    const birthday = 1138676554936;
    const epochToDays = 86400000;

    const fps = 53; // odd number gives more random ms digits
    setInterval(() => {
      let epochAge = Date.now() - birthday;
      // 18 years in days - current age in days
      setYearsLeft((6574.5 - epochAge / epochToDays).toFixed(6));
      setFormattedAge(findDivisions(epochAge));
    }, 1000 / fps);
  }, []);
  return (
    <>
      {canShow ? (
        <div className={styles.container}>
          {"I'm "}
          <AgeSection
            age={formattedAge.years}
            timePeriod={"year"}
            styleName={styles.timeYear}
            single
          />
          {", "}
          <AgeSection
            age={formattedAge.days}
            timePeriod={"day"}
            styleName={styles.timeDay}
            single
          />
          {", "}
          <AgeSection
            age={formattedAge.hours}
            timePeriod={"hour"}
            styleName={styles.timeHour}
            single
          />
          {", "}
          <AgeSection
            age={formattedAge.minutes}
            timePeriod={"minute"}
            styleName={styles.timeMinute}
            single
          />
          {", "}
          <AgeSection
            age={formattedAge.seconds}
            timePeriod={"second"}
            styleName={styles.timeSecond}
            single
            pad={2}
          />
          {", and "}
          <AgeSection
            age={formattedAge.milliseconds}
            timePeriod={"millisecond"}
            styleName={styles.timeMillisecond}
            pad={3}
          />
          {" old. There are "}
          <span className={styles.timeLeft.concat(` ${styles.time}`)}>
            {yearsLeft}
          </span>
          {" days until I'm 18 years old."}
        </div>
      ) : null}
    </>
  );
}
