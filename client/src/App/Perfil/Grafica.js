import React, { Component } from 'react';
import * as d3 from 'd3';
import { FormattedMessage } from 'react-intl';

import localesES from '../../locales/es';
import localesEN from '../../locales/en';

class Grafica extends Component {
    
    constructor(props) {
        super(props);

        this.width = 900;
        this.height = 500;
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
        return labels.map((e, i) => {
            return { label: e, value: values[i], }
        });
    }

    getLocales() {
        const navLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || "en-US";
        if(navLanguage.includes('es'))
            return localesES;
        else
            return localesEN;
    }

    drawPie(data) {
        const canvas = d3.select(this.refs.canvas);
        const svg = canvas.append("svg")
                .attr("width", this.width)
                .attr("height", this.height)
            .append("g")
                .attr("transform", `translate(${this.width / 2},${this.height / 2})`);

        const pie = d3.pie()
            .sort(null)
            .value( d => d.value);

        const arc = d3.arc()
            .innerRadius(this.radius * 0.3)
            .outerRadius(this.radius * 0.7);
        
        const outerArc = d3.arc()
            .innerRadius(this.radius * 0.8)
            .outerRadius(this.radius * 0.8);

        let locales = this.getLocales();
        
        let color = d3.scaleOrdinal()
            .domain([locales["grafica.tarjeta"], locales["grafica.efectivo"], locales["grafica.cuenta"]])
            .range(["#FFE900", "#7CEA9C", "#2E5EAA"]);
        
        let finalData = pie(this.setData(color, data));
        console.log(finalData);
        svg.selectAll('allSlices')
            .data(finalData)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d) => color(d.data.label))
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);

        svg.selectAll('allPolylines')
            .data(finalData)
            .enter()
            .append('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr('points', (d) => {
                let posA = arc.centroid(d);
                let posB = outerArc.centroid(d); 
                let posC = outerArc.centroid(d);
                let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                posC[0] = this.radius * 0.9 * (midangle < Math.PI ? 1 : -1);
                return [posA, posB, posC];
            });

        svg.selectAll('allLabels')
            .data(finalData)
            .enter()
            .append('text')
            .text( (d) => d.data.label )
            .attr('transform', (d) => {
                let pos = outerArc.centroid(d);
                let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                pos[0] = this.radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                return `translate(${pos})`;
            })
            .style('text-anchor', (d) => {
                let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            });
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