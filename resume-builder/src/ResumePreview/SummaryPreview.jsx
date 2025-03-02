import React from "react";

function SummaryPreview({resumeInfo}) {
  return <p className="text-xs font-bold">{resumeInfo?.summery}</p>;
}

export default SummaryPreview;
