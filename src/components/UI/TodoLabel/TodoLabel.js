import React from 'react';

import classes from './TodoLabel.css';

const todoLabel = props => {
    return <div className={classes.TodoLabel}>{props.children}</div>
};

export default todoLabel