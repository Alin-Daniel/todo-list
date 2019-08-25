import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import classes from './List.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';


class List extends Component {

    state = {
        listsForm: {
            checkBox: {
                elementType: 'input',
                elementConfig: {
                    type: 'checkbox',
                    checked: false
                },
                value: '',
                validation: {},
                valid: true,
            }
        },
        checked: false
    }

    onCHangeHandler = (event, inputElement) => {
        this.setState({ checked: !this.state.checked });

        const updatedForm = { ...this.state.listsForm };
        const updatedElement = { ...updatedForm[inputElement] };
        const updatedElementValue = { ...updatedElement.elementConfig };
        updatedElementValue.checked = event.target.checked;
        updatedElement.elementConfig = updatedElementValue;
        updatedForm[inputElement].elementConfig = updatedElementValue;
        this.setState({ listsForm: updatedForm, checked: updatedElementValue.checked });
    };


    render() {
        const formElementsArray = [];
        for (let key in this.state.listsForm) {
            formElementsArray.push({
                id: key,
                config: this.state.listsForm[key]
            });
        }
        
        let listELement = formElementsArray.map(formElement => (
            <Aux key={formElement.id}>
                <Input
                    // listsClassname={this.props.lists}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.onCHangeHandler(event, formElement.id)}
                    label={this.props.labelVal}
                    completed={this.state.checked}
                />
                {/* <label
                    className={this.state.checked ? classes.ListLine : ' '}>
                    {this.props.labelVal}
                </label> */}
            </Aux>
        ));

        return (
             <div className={classes.List}>
                {listELement}
             </div>
        );
    }

};

export default List;