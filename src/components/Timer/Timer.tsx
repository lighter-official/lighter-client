interface TimerProps {
  time: string;
}

function Timer({ time }: TimerProps) {
  return <p className={'text-blue-500'}>{time}</p>;
}

export default Timer;
