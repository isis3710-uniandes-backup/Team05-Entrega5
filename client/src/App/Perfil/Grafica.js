import React, { Component } from 'react';
import * as d3 from 'd3';
import { catchClause } from '@babel/types';

class Grafica extends Component {
    
    constructor(props) {
        super(props);

        this.width = 700;
        this.height = 600;
        this.radius = Math.min(this.width, this.height) / 2;
    }

    componentDidMount() {
        this.drawPie(this.props.data);
    }

    setData(scale, data) {
        let labels = scale.domain();
        let values = [0, 0, 0];
        let total = 0;
        data.forEach( i => {
            total++;
            if(i.metodoPago.includes('Tarjeta'))
                values[0] += 1;
            else if(i.metodoPago.includes('Efectivo'))
                values[1] += 1;
            else
                values[2] += 1;
        });
        values = values.map( i => i / total );
        console.log(values);
        return labels.map((e, i) => {
            return { label: e, value: values[i] }
        });
    }

    drawPie(data) {
        const canvas = d3.select(this.refs.canvas);

        const svg = canvas.append("svg").append("g");
        svg.append("g")
            .attr("class", "slices");
        svg.append("g")
            .attr("class", "labels");
        svg.append("g")
    	    .attr("class", "lines");

        const pie = d3.pie()
            .sort(null)
            .value( d => d.value);

        const arc = d3.arc()
            .outerRadius(this.radius * 0.8)
            .innerRadius(this.radius * 0.4);
        
        const outerArc = d3.arc()
            .innerRadius(this.radius * 0.9)
            .outerRadius(this.radius * 0.9);

        svg.attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

        let color = d3.scaleOrdinal()
            .domain(["💳", "💵", "👝🏦"])
            .range(["#FFE900", "#7CEA9C", "#2E5EAA"]);
        
        let finalData = setData(color, data);
        let slice = svg.select(".slices").selectAll("path.slice")
		    .data(pie(finalData), (d) => d.data.label);

        slice.enter()
            .insert("path")
            .style("fill", d => color(d.data.label))
            .attr("class", "slice");

        slice.transition().duration(1000)
            .attrTween("d", (d) => {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return (t) => arc(interpolate(t));
            })

        slice.exit().remove();

        /* ------- TEXT LABELS -------*/

        var text = svg.select(".labels").selectAll("text")
            .data(pie(finalData), (d) => d.data.label);

        text.enter()
            .append("text")
            .attr("dy", ".55em")
            .text( d => d.data.label);
        
        let midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;

        text.transition().duration(1000)
            .attrTween("transform", (d) => {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                    return "translate("+ pos +")";
                };
            })
            .styleTween("text-anchor", (d) => {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return (t) => {
                    var d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start":"end";
                };
            });

        text.exit().remove();

        /* ------- SLICE TO TEXT POLYLINES -------*/

        var polyline = svg.select(".lines").selectAll("polyline")
            .data(pie(finalData), (d) => d.data.label);
        
        polyline.enter()
            .append("polyline");

        polyline.transition().duration(1000)
            .attrTween("points", (d) => {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return (t) => {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                    return [arc.centroid(d2), outerArc.centroid(d2), pos];
                };			
            });
        
        polyline.exit().remove();
    }

    render() { 
        return ( 
            <div className="mt-2 d-flex flex-column justify-content-center align-items-center">
                <h2 className="font-weight-bold ml-3"><FormattedMessage id="listarPagos.tituloGrafica" /></h2>
                <div ref="canvas"></div>
            </div>
        );
    }
}
 
export default Grafica;