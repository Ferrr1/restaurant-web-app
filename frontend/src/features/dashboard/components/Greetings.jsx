import { useEffect, useState } from "react";
import { formatTime } from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";

const Greetings = () => {
  const [dateTime, setdateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setdateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between text-text">
      <div>
        <h1 className="text-2xl font-bold">Greetings</h1>
        <p className="text-text-muted text-sm">
          Give the best services for our customers🤩
        </p>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{formatTime(dateTime)}</h1>
        <p className="text-text-muted text-sm">{formatDate(dateTime)}</p>
      </div>
    </div>
  );
};

export default Greetings;
