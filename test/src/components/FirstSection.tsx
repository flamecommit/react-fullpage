import * as React from 'react';
import { Link } from 'react-router-dom';

function FirstSection() {
  return (
    <div
      className="first-section"
      style={{ width: '100%', backgroundColor: 'red' }}
    >
      <div>First Section</div>
      <Link to="/">Link to Home</Link>
    </div>
  );
}

export default FirstSection;
