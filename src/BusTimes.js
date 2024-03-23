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
  if (seconds < 10 && seconds > -1) {
    seconds = "0" + Math.abs(seconds);
  }
  const differenceInMinutes = Math.floor(differenceInSeconds / 60)
  const minutes = differenceInMinutes % 60

  return [minutes, seconds]

}

export function BusTimes() {
  const { isError, isLoading, data, error } = useQuery({queryKey: ["stopTimes"], queryFn: () => fetchPosts("0815")})

  if (isLoading) return "loading"

  if (isError) return `Errori ${error.message}`
  
// console.log(data.body["0815"][0].call)

  const [minutes, seconds] = getDifference(data.body["0815"][0].call.expectedArrivalTime)

  return (
    <div className="schedule-container">
      {/* {data.body && data.body["0815"].map((test, index) => { */}
      {data.body && 
        <TimeDisplay minutes={minutes} seconds={seconds} />

      
      }

      
      
        // (
        //   <>
        //   {/* <div>Arriving in</div>
        //   <div>{getDifference(test.call.expectedArrivalTime)}</div> */}

          
        //   </>
        // )
    </div>
  )
}