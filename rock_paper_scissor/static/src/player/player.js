/** @odoo-module **/

import { Component,useState } from "@odoo/owl"; //hooks
// import { Result } from "../result/result";

export class Player extends Component {
    static template = "rock_paper_scissor.player";

    setup(){
        this.state = useState({player: "" , computer: "" , result:"" });
    }

    playerChoice(ev){
        this.state.player = ev.target.value;
        this.computerChoice();
    }
    computerChoice(){
        const randomNumber = Math.floor(Math.random() * 3) + 1;

        switch(randomNumber){
            case 1:
                this.state.computer = "rock";
                break;
            case 2:
                this.state.computer = "paper";
                break;    
            case 3:
                this.state.computer = "scissor";
                break;
            }
    }  
    get winner(){
        // console.log(this.state.player)
        if(this.state.player === this.state.computer){
            return "Draw!";
        }
        else if(this.state.computer === "rock"){
            return (this.state.player === "paper") ? "You Win!" : "You Lose!"
        }
        else if(this.state.computer === "paper"){
            return (this.player === "scissor") ? "You Win!" : "You Lose!"
        }
        else if(this.state.computer === "scissor"){
            return (this.state.player === "rock") ? "You Win!" : "You Lose!"
        }
    }
}