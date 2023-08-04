from odoo import http
from odoo.http import request, route

class RockPaperScissor(http.Controller):
    @http.route(['/rock_paper_scissor/playground'], type='http', auth='public')
    def show_playground(self):
        """
        Renders the rock paper scissor page
        """
        return request.render('rock_paper_scissor.playground')



