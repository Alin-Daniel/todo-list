import React from "react";

import classes from "./Lists.css";
import CloseButton from "../../UI/CloseButton/CloseButton";
import List from "../List";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const lists = props => {   

  let todoLists = props.lists.map(list => {
    return (
      <div key={list.id} className={classes.ListsWrapper}>
        <div className={classes.Lists}>
          <List
            labelVal={list.todo}
          />
          <CloseButton clicked={() => props.remove(list.id)} />
        </div>
      </div>
    );
  });
  
  return (
    <Aux>
      {todoLists}
      <Button clicked={props.viewDetails} btnType="Success">
        {props.isAuth ? 'View All' : 'Sign Up for Saving'}
      </Button>
    </Aux>
  );
};



export default lists;
