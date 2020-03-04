import React from 'react';

import classes from './BigButton.css';

const bigButton = props => {
const btnClasses = [classes.BigButton];
if(props.btnType){
    btnClasses.push(classes[props.btnType]);
}
return <button style={props.style} className={btnClasses.join(' ')}>{props.children}</button>
};

export default bigButton