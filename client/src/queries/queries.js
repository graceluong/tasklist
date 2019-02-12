import { gql } from 'apollo-boost';

const getTasksQuery = gql`
    {
        taskAll{
            id
            title
            complete
            due_date
            category
        }
    }
`

const getTaskQuery = gql`
    query($id:ID) {
        task(id:$id){
            id
            title
            complete
            due_date
            category
        }
    }
`
  

const createTaskMutation = gql`
    mutation($title:String!, $due_date:String!, $category:String!) {
        taskCreate(title:$title, due_date:$due_date, category:$category){
            id
            title
            complete
            category
            due_date
        }
    }
`

const removeTaskMutation = gql`
    mutation($id:ID) {
        taskRemove(id:$id){
            title
        }
    }
`

export { getTasksQuery, getTaskQuery, createTaskMutation, removeTaskMutation };