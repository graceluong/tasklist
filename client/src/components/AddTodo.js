import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import DatePicker from "react-datepicker";
import { createTaskMutation, getTasksQuery } from '../queries/queries';
import { categoryList } from '../categories';

import "react-datepicker/dist/react-datepicker.css";

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            dueDate: new Date(),
            category: '',
            complete: null,
            showForm: false,

        };
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    showForm(event) {
        event.preventDefault();
        console.log(this.state);
        this.setState({ showForm: true }, () => {
            document.addEventListener('click', this.closeForm);
        });
    }

    closeForm(event) {
        if (!this.dropdownForm.contains(event.target)) {
            this.setState({ showForm: false }, () => {
                document.removeEventListener('click', this.closeForm);
            });
        }
    }

    handleChange(date) {
        this.setState({
            dueDate: date
        });
    }

    displayCategories() {
        return categoryList.map(category => {
            return (<option key={category.id}>{category.val}</option>);
        });
    }

    submitForm(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.mutate({
            variables: {
                title: this.state.title,
                due_date: this.state.dueDate,
                category: this.state.category
            },
            refetchQueries: [{ query: getTasksQuery }]
        });
    }

    render() {
        return (
            <div><ul className="todo-list"><li id="add-task" onClick={this.showForm}> New Task </li></ul>
                {
                    this.state.showForm
                        ?
                        (<ul className="todo-list"><form
                            id="add-todo"
                            ref={(element) => {
                                this.dropdownForm = element;
                            }}
                            onSubmit={this.submitForm.bind(this)}>
                            <div className="field">
                                <label>Task Title: </label>
                                <input type="text" onChange={(e) => this.setState({ title: e.target.value })} />
                            </div>

                            <div className="field">
                                <label>Category: </label>
                                <select onChange={(e) => this.setState({ category: e.target.value })} >
                                    <option>select category</option>
                                    {this.displayCategories()};
                                </select>
                            </div>

                            <div className="field">
                                <label>Due Date: </label>
                                <DatePicker
                                    selected={this.state.dueDate}
                                    onChange={this.handleChange}
                                    showTimeSelect
                                    timeIntervals={30}
                                    dateFormat="MMMM d, h:mm aa"
                                    timeCaption="time"
                                />
                            </div>
                            <button id="add">Add Task</button>
                        </form></ul>)
                        :
                        (null)}</div>
        );
    }
}

export default graphql(createTaskMutation)(AddTodo);