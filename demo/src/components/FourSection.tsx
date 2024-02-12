import * as React from 'react';

function FourSection() {
  return (
    <div
      className="four-section"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0 0',
      }}
    >
      <div
        className="outer"
        style={{
          width: '100%',
          backgroundColor: 'green',
          padding: '80px 0 0',
        }}
      >
        <div className="inner" style={{ padding: '60px 0' }}>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Third Section</p>
          <p>Last</p>
        </div>
      </div>
    </div>
  );
}

export default FourSection;
