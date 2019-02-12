import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getTasksQuery } from '../queries/queries'
import { taskUpdateComplete } from '../queries/queries'
import TodoDetails from './TodoDetails';
import checked from '../icons/checked.png'
import unchecked from '../icons/unchecked.png'


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }
    displayTasks() {
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading tasks...</div>);
        } else {
            return data.taskAll.map(task => {
                return (
                    <li key={task.id} onClick={(e) => { this.setState({ selected: task.id }) }}>{task.title}<img id="check" src={unchecked} /></li>
                )
            })
        }
    }
    render() {
        return (
            <div>
                <ul className="todo-list">
                    {this.displayTasks()}
                </ul>
                <TodoDetails taskId={this.state.selected}/>

            </div>
        );
    }
}

export default graphql(getTasksQuery)(TodoList);