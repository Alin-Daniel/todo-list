import React from 'react';

import classes from './Checkbox.css';

const checkbox = props => {
    const inputClasses = [classes.OptionInput];
    if (props.completed) {
        inputClasses.push(classes.active);
    }
    return <input
        type="checkbox"
        className={inputClasses.join(" ")}
        checked={props.checked}
        readOnly={props.readOnly}
        onChange={props.changed}
    />
};


export default checkbox;