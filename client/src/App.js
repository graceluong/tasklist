import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//components
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

//Appollo Client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})
class App extends Component {
  render() {
      return (
          <ApolloProvider client={client}>
              <div id="main">
                  <h1>Todo List:</h1>
                  <TodoList />
                  <AddTodo/>
              </div>
          </ApolloProvider>
    );
  }
}

export default App;
