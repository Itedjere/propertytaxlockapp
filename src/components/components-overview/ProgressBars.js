import React from "react";
import { Progress } from "shards-react";

const ProgressBars = ({percentage}) => (
  <div className="mb-2">
    <Progress
      theme="success"
      className="mb-3"
      value={percentage}
    >
      {`${percentage}%`}
    </Progress>
  </div>
);

export default ProgressBars;
