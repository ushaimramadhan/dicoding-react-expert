import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="sticky top-0 z-50">
      <LoadingBar updateTime={100} className="bg-blue-500 h-1" />
    </div>
  );
}

export default Loading;