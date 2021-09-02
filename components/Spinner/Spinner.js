import React from 'react';
import classes from './Spinner.module.css';
const Spinner = ({ margin }) => {
  return (
    <div className="w-full flex justify-center my-36 spinner">
      <div className={classes.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{`
        .spinner {
          margin: ${margin || '0 !important'};
        }
      `}</style>
    </div>
  );
};

export default Spinner;
