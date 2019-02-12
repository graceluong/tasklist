const graphql = require('graphql');
const Task = require('../models/task');
//http://localhost:4000/graphql

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        complete: { type: GraphQLBoolean },
        due_date: { type: GraphQLString },
        category: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        task: {
            type: TaskType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Task.findById(args.id);

            }
        },
        taskAll: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        taskCreate: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                due_date: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let task = new Task({
                    title: args.title,
                    complete: false,
                    due_date: args.due_date,
                    category: args.category
                });
                return task.save();
            }
        },

        taskRemove: {
            type: TaskType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) { 
                return await Task.findOneAndDelete(args.id);
            }
        },
        
        taskUpdateComplete: {
            type: TaskType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                let task = await Task.findById(args.id);
                task.complete = !task.complete;
                return task.save();
            }
        },

        taskUpdateDueDate: {
            type: TaskType,
            args: {
                id: { type: GraphQLID },
                due_date: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let task = await Task.findById(args.id);
                task.due_date = args.due_date;
                return task.save();
            }
        },

        taskUpdateCategory: {
            type: TaskType,
            args: {
                id: { type: GraphQLID },
                category: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let task = await Task.findById(args.id);
                task.category = args.category;
                return task.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})