from django_components import component


@component.register("chart")
class Chart(component.Component):
    template_name = "chart/chart.html"

    # This component takes one parameter, a date string to show in the template
    def get_context_data(self):
        return {
            "data": "Not Found"
        }

    class Media:
        js = "chart/chart.js"
