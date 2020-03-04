import React, { Component } from 'react';
import Checkbox from '../UI/Checkbox/Checkbox';
import TodoLabel from '../UI/TodoLabel/TodoLabel';
import classes from './List.css';


class List extends Component {
       state = {
        checked: false
    }

    onChangeHandler = (e) => {
        this.setState({checked: e.target.checked});
    };

    render() {
       
        const pClasses = [];
        if(this.state.checked){
            pClasses.push(classes.Completed)
        }
        return (
                <TodoLabel completed={this.state.checked}>
                    {this.props.label}
                    <Checkbox
                        changed={this.onChangeHandler}
                        checked={this.state.checked}
                    />
                    <p className={pClasses.join('')}>{this.props.labelVal}</p>
                </TodoLabel>
        );
    }

};

export default List;