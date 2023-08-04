/**@odoo-module **/

import { Component,useState} from "@odoo/owl";
import { Todo } from "../todo/todo";
import { useAutofocus } from "../util";

export class TodoList extends Component {
    static template="owl_playground.TodoList";
    static components={Todo}
    
    setup()
    {
        this.id=0;
        this.todolist=useState([]);
        useAutofocus("input");
    }

    addTodo(entered_value)
    {
        if (entered_value.keyCode === 13 && entered_value.target.value != "")
        {
            this.todolist.push(
            {
                id:this.id++,description:entered_value.target.value,done:false
            });
            entered_value.target.value="";
        }
    }
    toggleState(todoId) 
    {
        const todo = this.todolist.find((todo) => todo.id === todoId);
        todo.done = !todo.done;

    }
    removeTodo(todoId)
    {
        const todo = this.todolist.findIndex((todo) => todo.id === todoId);
        if (todo >= 0)
        {
            this.todolist.splice(todo, 1);
        }
    }
}   