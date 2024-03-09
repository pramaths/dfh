// SpecialNodeComponent.js
import React from 'react';

const SpecialNodeComponent = ({ data }) => {
  return (
    <div
      style={{
        padding: '10px',
        border: '1px solid #777',
        borderRadius: '3px',
        backgroundColor: 'black',
        cursor: 'pointer',
        // border-radius: "1rem",
        whiteSpace: 'nowrap',
        color:'wheat'
      }}
    >
      {data.label}
    </div>
  );
};

export default SpecialNodeComponent;
