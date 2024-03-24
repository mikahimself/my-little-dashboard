import { useEffect, useState, useRef } from "react";

const calculateNewSec = (second, minute) => {
  if (second - 1 < 0 && minute > 0) {
    return 59;
  }
  if (second -1 < 0 && minute === 0) {
    return 0;
  }
  return second - 1;
}

const calculateNewMin = (minute) => {
  if (minute - 1 < 0) return 0
  return minute - 1;
}

const formatSecond = (second) => {
  if (second < 10) return `0${second}`
  return second;
}

export function TimeDisplay (props) {
  const { minutes, seconds } = props;
  const interval = useRef(null)

  const [myMinute, setMyMinute] = useState(minutes);
  const [mySecond, setMySecond] = useState(seconds);

  useEffect(() => {
    interval.current = setInterval(() => {
      if (myMinute === 0 && mySecond === 0) return;
      setMySecond((prevSecond) => {
        const newSec = calculateNewSec(prevSecond, myMinute);
        if (newSec === 59) {
          setMyMinute(prevMin => calculateNewMin(prevMin))
        }
        return newSec
      });
    }, 1000)

    if (myMinute === 0 && mySecond === 0) clearInterval(interval.current)

    return () => clearInterval(interval.current)

  }, [])

  if (myMinute === 0 && mySecond === 0) { clearInterval(interval.current); return false};
  
  return (<p>{`${myMinute}:${formatSecond(mySecond)}`}</p>)
}