import React from 'react';

export const Title = ({ title, dataDate }) => {
  return (
    <div>
      <div className='text-center'>
        <h2 className='fw-bold'>{title}</h2>
        <div className='my-4'>{dataDate}</div>
      </div>
    </div>
  );
};
