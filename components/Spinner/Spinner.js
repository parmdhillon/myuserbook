import React from 'react';
import classes from './Spinner.module.css';
const Spinner = () => {
  return (
    <div className="w-full flex justify-center">
      <div className={classes.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
