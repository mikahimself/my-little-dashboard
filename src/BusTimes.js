import { useQuery } from "@tanstack/react-query";
import { TimeDisplay } from "./TimeDisplay";

async function fetchPosts(id) {
  const response = await fetch(`http://data.itsfactory.fi/journeys/api/1/stop-monitoring?stops=${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

const getDifference = (time) => {
  const currentTime = new Date()
  const arrivalTime = new Date(time);

  const differenceInMilliseconds = arrivalTime - currentTime
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  let seconds = differenceInSeconds % 60;
  
  const differenceInMinutes = Math.floor(differenceInSeconds / 60)
  const minutes = differenceInMinutes % 60
  return [minutes, seconds]
}

export function BusTimes() {
  const { isError, isLoading, data, error } = useQuery({queryKey: ["stopTimes"], queryFn: () => fetchPosts("0815")})

  if (isLoading) return "Loading"

  if (isError) return `Error: ${error.message}`
  
  return (
    <div className="schedule-container">
      {data.body && data.body["0815"].map((item) => {
        const [minutes, seconds] = getDifference(item.call.expectedArrivalTime);
        return <TimeDisplay minutes={minutes} seconds={seconds} key={item.vehicleRef}/>
      })
      }
    </div>
  )
}