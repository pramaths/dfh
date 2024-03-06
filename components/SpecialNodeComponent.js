// SpecialNodeComponent.js
import React from 'react';

const SpecialNodeComponent = ({ data }) => {
  return (
    <div
      style={{
        padding: '10px',
        border: '1px solid #777',
        borderRadius: '3px',
        backgroundColor: 'white',
        cursor: 'pointer',
        // border-radius: "1rem",
        whiteSpace: 'nowrap',
      }}
    >
      {data.label}
    </div>
  );
};

export default SpecialNodeComponent;
