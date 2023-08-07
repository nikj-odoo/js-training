/** @odoo-module **/

import { Component, useSubEnv ,onWillStart} from "@odoo/owl";
import { registry } from "@web/core/registry";
import { getDefaultConfig } from "@web/views/view";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./card/card";
import { PieChart } from "./pie_chart/pie_chart";
class AwesomeDashboard extends Component
{
    setup()
    {
        this.display =
        {
            controlPanel: { "top-right": false, "bottom-right": false } 
        } 
        useSubEnv(
        {
            config:
            {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        this.action = useService("action");

        //  ex-3 rpc services
        // this.rpc = useService("rpc");

        // ex-3
        // onWillStart(async () => {
        //     this.response = await this.rpc("/awesome_tshirt/statistics");
        // });

        //ex-3
        this.keytitle = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
        };

         // ex-4
        onWillStart(async ()=> {
            this.response = await this.tshirtService.loadStatistics();
        });
        //custom service (ex-4)
        this.tshirtService = useService("tshirtService");
    }

    openCustomerView()
    {
            this.action.doAction("base.action_partner_form");
    }

    openOrders(title, domain) 
    {
                this.action.doAction(
                {
                    type: "ir.actions.act_window",
                    name: title,
                    res_model: "awesome_tshirt.order",
                    domain: new Domain(domain).toList(),
                    views: [
                        [false, "list"],
                        [false, "form"],
                        ],
                });
    }

    
    openLast7DaysOrders()
    {
            const domain =
                "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
            this.openOrders("Last 7 days orders", domain);
    }

    openLast7DaysCancelledOrders() 
    {
            const domain =
                "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state','=', 'cancelled')]";
            this.openOrders("Last 7 days cancelled orders", domain);
    }

    //pie chart
    openSizeOrders(size) {
        const title = (this.env._t("Orders by %s size"), size);
        const domain = `[('size','=', '${size}')]`;
        this.openOrders(title, domain);
    }
}

AwesomeDashboard.components = {Layout,Card,PieChart};
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);