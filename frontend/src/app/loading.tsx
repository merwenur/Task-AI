import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-turquoise-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
