import React from "react";
import ReactApexChart from "react-apexcharts";

function ProductSalesGraph(props) {
    const getSeries = () => {
        const graphData = {
            series: [],
            max: 0,
            min: Number.MAX_SAFE_INTEGER,
            text: "",
        };
        props.products.forEach((item) => {
            graphData.series.push({
                name: item.short_title,
                data: item.graphData.y_axis,
            });
            item.graphData.y_axis.forEach((val) => {
                graphData.max = Math.max(graphData.max, val);
                graphData.min = Math.min(graphData.min, val);
            });
            graphData.text += item.short_title + " VS ";
        });
        graphData.text = graphData.text.slice(0, -3);
        return graphData;
    };
    const graphData = getSeries();
    const state = {
        series: graphData.series,
        options: {
            chart: {
                height: 350,
                type: "line",
                dropShadow: {
                    enabled: true,
                    color: "#000",
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ["#ffc107", "#0d6efd", "#dc3545"].sort(() => 0.5 - Math.random()),
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: "smooth",
            },
            title: {
                text: graphData.text,
                align: "left",
            },
            grid: {
                borderColor: "#e7e7e7",
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: props.products[0].graphData.x_axis,
                title: {
                    text: "Month",
                },
            },
            yaxis: {
                title: {
                    text: "Number of Orders",
                },
                min: graphData.min,
                max: graphData.max + 1,
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5,
            },
        },
    };

    return (
        <div id="chart" className="bg bg-light">
            <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
        </div>
    );
}

export default ProductSalesGraph;
