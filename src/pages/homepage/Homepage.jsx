import { useEffect, useState, useRef } from "react";

import AgeSection from "./AgeSection";

import styles from "./homepage.module.scss";

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

  const [showDateSelect, setShowDateSelect] = useState(false);
  const [targetAge, setTargetAge] = useState(18);

  const findDivisions = ms => {
    // console.log(ms)
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

  // 31/01/2006 03:02:00 in epoch time
  const myBirthday = 1138676554936;
  const [birthday, setBirthday] = useState({
    date: myBirthday,
    time: 0,
    dateTime: myBirthday,
  });

  const epochToDays = 86400000;
  const oneYearMs = 31557600000;

  const fps = 53; // odd number gives more random ms digits

  let birthdayRenderer = useRef();

  useEffect(() => {
    clearInterval(birthdayRenderer.current);
    setCanShow(true);

    birthdayRenderer.current = setInterval(() => {
      const epochAge = Date.now() - birthday.dateTime;

      const divisions = findDivisions(epochAge);
      setFormattedAge(divisions);

      const targetYears =
        divisions.years < 0
          ? 0
          : divisions.years < 18
          ? 18
          : Math.ceil(divisions.years / 10) * 10;
      setTargetAge(targetYears);

      // 18 years in days - current age in days
      // one year is 31557600000 ms
      setYearsLeft(
        (
          (oneYearMs * targetYears) / epochToDays -
          epochAge / epochToDays
        ).toFixed(6)
      );
    }, 1000 / fps);
  }, [birthday.dateTime]);
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {canShow ? (
        <main className={styles.container}>
          {`${birthday.dateTime === myBirthday ? "I'm" : "You're"} `}
          {birthday.dateTime > Date.now() ? (
            " not born yet..."
          ) : (
            <>
              <AgeSection
                age={formattedAge.years}
                timePeriod={"year"}
                styleName={styles.timeYear}
                singular
              />
              {", "}
              <AgeSection
                age={formattedAge.days}
                timePeriod={"day"}
                styleName={styles.timeDay}
                singular
              />
              {", "}
              <AgeSection
                age={formattedAge.hours}
                timePeriod={"hour"}
                styleName={styles.timeHour}
                singular
              />
              {", "}
              <AgeSection
                age={formattedAge.minutes}
                timePeriod={"minute"}
                styleName={styles.timeMinute}
                singular
              />
              {", "}
              <AgeSection
                age={formattedAge.seconds}
                timePeriod={"second"}
                styleName={styles.timeSecond}
                singular
                chars={2}
              />
              {", and "}
              <AgeSection
                age={formattedAge.milliseconds}
                timePeriod={"millisecond"}
                styleName={styles.timeMillisecond}
                chars={3}
              />
              {" old."}
            </>
          )}
          {" There are "}
          <span className={styles.timeLeft.concat(` ${styles.time}`)}>
            {yearsLeft}
          </span>
          {` days until ${
            birthday.dateTime === myBirthday ? "I'm" : "you're"
          } ${targetAge !== 0 ? targetAge + " years old" : " born"}.`}
        </main>
      ) : null}
      <div className={styles.footer}>
        {/* {showDateSelect ? ( */}
        <div
          className={styles.dateButtons}
          style={showDateSelect ? { display: "flex" } : { display: "none" }}>
          <input
            type="date"
            onChange={e => {
              console.log(Date.parse(e.target.valueAsDate));
              setBirthday({
                date: Date.parse(e.target.valueAsDate) || 0,
                time: birthday.time,
                dateTime: birthday.dateTime,
              });
            }}
          />
          <input
            type="time"
            onChange={e => {
              console.log(
                Date.parse(e.target.valueAsDate),
                new Date().getTimezoneOffset() * 1000
              );
              setBirthday({
                date: birthday.date,
                time: Date.parse(e.target.valueAsDate),
                dateTime: birthday.dateTime,
              });
            }}
          />
          <input
            type="button"
            value={"Apply"}
            onClick={() => {
              console.table(birthday);
              setBirthday({
                date: birthday.date,
                time: birthday.time,
                dateTime:
                  birthday.date +
                  birthday.time +
                  new Date().getTimezoneOffset() * 6e4,
              });
            }}
            className={styles.applyButton}
          />
        </div>
        {/* ) : null} */}
        <button
          className={styles.changeButton}
          onClick={() => setShowDateSelect(!showDateSelect)}>
          {showDateSelect ? "close" : "change"}
        </button>
      </div>
    </div>
  );
}
