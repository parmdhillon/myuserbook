import React from 'react';
import classes from './Spinner.module.css';
const Spinner = () => {
  return (
    <div className="w-full flex justify-center my-36">
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
