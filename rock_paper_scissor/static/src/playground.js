/** @odoo-module **/

import { Component } from "@odoo/owl"; //hooks
import { Player } from "./player/player";


export class Playground extends Component {
    static template = "rock_paper_scissor.playground";
    static components = {Player};
}
