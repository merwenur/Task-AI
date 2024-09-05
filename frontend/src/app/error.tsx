"use client";
type Props = {
  error :Error,
  reset :Function
};

const Error = ({
  error,
  reset
}: Props) => {
  return ( 
    <div>
      <h1>Error</h1>
      <pre>{error.message}</pre>
      <button onClick={
        () => {
          reset();
        }
      }>Reset</button>
    </div>
  );
  
};

export default Error;
