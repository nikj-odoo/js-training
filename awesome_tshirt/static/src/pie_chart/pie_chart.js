/* @odoo-module **/

import { Component, useEffect, onWillStart, useRef, onMounted } from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChart extends Component{
    setup() {

        onWillStart(() => {
            return loadJS(["/web/static/lib/Chart/Chart.js"]);
        });

        useEffect(() => this.renderChart());

        onMounted(() => {
            this.renderChart();
        });

        this.canvasRef= useRef("canvas");

        this.labels = Object.keys(this.props.data);
        this.data = Object.values(this.props.data);

    }
    // ex-6
    onPieClick(ev, chartElem) {
        const clickedIndex = chartElem[0]._index;
        this.props.onPieClick(this.labels[clickedIndex]);
    }
    // ex-5 pie chart rendering
    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.canvasRef.el, {
            type: "pie",
            data: {

                labels: this.labels,
                datasets: [
                    {
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.7)",
                            "rgba(54, 162, 235, 0.7)",
                            "rgba(255, 206, 86, 0.7)",
                            "rgba(75, 192, 192, 0.7)",
                        ],
                        data: this.data,
                    },
                ],
            },
            // ex-6
            options: {
                onClick :  (ev, response) => {
                    if(response.length){
                        this.props.onPieClick(this.labels[response[0]._index]);
                    }
                },
            },

        });
        
    }
}
PieChart.template = "awesome_tshirt.piechart";