import React from "react";

function SummaryPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      {/* Summary Section */}
      {resumeInfo?.summary && (
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold italic">{resumeInfo.summary}</p>
        </div>
      )}
    </div>
  );
}

export default SummaryPreview;
