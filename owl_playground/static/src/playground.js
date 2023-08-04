/**@odoo-module **/

import { Component} from "@odoo/owl";
import { Counter } from "./counter/counter";
import { TodoList } from "./todolist/todolist";
import { Card } from "./card/card";

export class Playground extends Component {
    static template = "owl_playground.playground";
    static components = { Counter,TodoList,Card}
}


// /** @odoo-module **/

// import { Component , useState} from "@odoo/owl";

// export class Counter extends Component{
//     static template="owl_playground.counter";
//     state = useState({ value: 0 });
    
//     increment() { //increament method
//         this.state.value++;
//     }
//     decrement(){ //Decrement
//         this.state.value--;
//     }
// }
// export class Playground extends Component {
//     static template = "owl_playground.playground";
//     static components = { Counter }
// }
