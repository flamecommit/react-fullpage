import * as React from 'react';

function SecondSection() {
  const [addContents, setAddContents] = React.useState(false);

  return (
    <div
      className="second-section"
      style={{ width: '100%', backgroundColor: 'orange' }}
    >
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <div>Second Section</div>
      <button onClick={() => setAddContents(!addContents)}>Add Contents</button>
      {addContents && (
        <div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
          <div>Second Section</div>
        </div>
      )}
    </div>
  );
}

export default SecondSection;
