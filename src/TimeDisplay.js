import { useEffect, useState } from "react";

export function TimeDisplay (props) {
  const { minutes, seconds } = props;
  // console.log(typeof minutes, typeof seconds)

  const [myMinute, setMyMinute] = useState(minutes);
  const [mySecond, setMySecond] = useState(seconds);

  useEffect(() => {
    const setSecond = setInterval(() => {
      // let newSecond = mySecond - 1;
      // let newMinute;
      // console.log(newSecond)
  
      // if (newSecond < 0) {
      //   newSecond = 59;
      //   newMinute = myMinute - 1;
      //   setMyMinute(newMinute)
      // }
      setMySecond((prevSecond) => prevSecond - 1);
    }, 1000)
    // const setSecond = setInterval(() => {
    //   console.log("TEST")
    // }, 100)

    return () => clearInterval(setSecond)

  }, [])

  
  return (<p>{`${myMinute}:${mySecond}`}</p>)
}