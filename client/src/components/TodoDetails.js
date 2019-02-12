import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getTaskQuery } from '../queries/queries';
import { removeTaskMutation } from '../queries/queries';
import remove from '../icons/delete.png'

class TodoDetails extends Component {
    displayTodoDetails() {
        const { task } = this.props.data; //gets task prop from data
        if (task) {
            return (
                <div>
                    <div><h2 id="taskTitle">{task.title}</h2><img id="remove" src={remove} /></div>
                    <hr></hr>
                    <p>Category: {task.category}</p>
                    <p>Due Date: {task.due_date}</p>
                    <p>{task.complete}</p>
                    
                </div>
            )
        } else {
            return (
                <div className="none-selected">
                    <p>Make</p>
                    <p>Today</p>
                    <p>Great!</p>
                </div>)
        }
    }
    
    render() {
        return (
            <div id="todo-details" >
                {this.displayTodoDetails()}
            </div>
        );
    }
}

export default graphql(getTaskQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.taskId
            }
        }
    }
})(TodoDetails);