import { useEffect, useRef, useState } from "react";

function Timer(probs: any) {
  const [time, setTime] = useState<number>(30);
  const timeRef = useRef(time);
  useEffect(() => {
    setInterval(() => {
      console.log(1);
      if (timeRef.current == 0) {
        timeRef.current = 30;
        setTime(30);
      } else {
        timeRef.current--;
        setTime(timeRef.current - 1);
      }
    }, 1000);
  }, []);
  return (
    <div className="text-main-color">
      <span className="font-mono text-6xl countdown">{time}</span>
    </div>
  );
}

export default Timer;
