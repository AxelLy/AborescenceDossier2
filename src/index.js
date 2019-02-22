import m from "mithril"
import List from "./list.js"
import Chart from "./chart.js"
//import leform from "./modif_form"
var root = document.body

List.loadList()
Chart.loadList()


m.route(root,"",{
    /*"/liste" : m.mount(root,List),*/
    "/chart" : m.mount(document.head,Chart)
})
