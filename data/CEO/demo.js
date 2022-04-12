function flipWords() {
    d3.selectAll("span")
        .style("color", "#0A22A6")
        .style("animation", "spin_words 16s infinite")
};

function appearWords() {
    d3.select("#s1")
        .style("animation", "appear 1s")
        .style("animation-delay", "0s")
        .style("animation-fill-mode", "forwards")
    d3.select("#s2")
        .style("animation", "appear 1s")
        .style("animation-delay", "1s")
        .style("animation-fill-mode", "forwards")
    d3.select("#s3")
        .style("animation", "appear 1s")
        .style("animation-delay", "2s")
        .style("animation-fill-mode", "forwards")
    d3.select("#s4")
        .style("animation", "appear 1s")
        .style("animation-delay", "3s")
        .style("animation-fill-mode", "forwards")
    d3.select("#s5")
        .style("animation", "appear 1s")
        .style("animation-delay", "4s")
        .style("animation-fill-mode", "forwards")
    d3.select("#s6")
        .style("animation", "appear 1s")
        .style("animation-delay", "5s")
        .style("animation-fill-mode", "forwards")
    d3.select("#s7")
        .style("animation", "appear 1s")
        .style("animation-delay", "6s")
        .style("animation-fill-mode", "forwards")
    d3.select("#s8")
        .style("animation", "appear 1s")
        .style("animation-delay", "7s")
        .style("animation-fill-mode", "forwards")
    d3.select("#s9")
        .style("animation", "appear 1s")
        .style("animation-delay", "8s")
        .style("animation-fill-mode", "forwards")
    d3.select("#s10")
        .style("animation", "appear 1s")
        .style("animation-delay", "9s")
        .style("animation-fill-mode", "forwards")
    d3.select("#s11")
        .style("animation", "appear 1s")
        .style("animation-delay", "10s")
        .style("animation-fill-mode", "forwards")
    d3.select("#s12")
        .style("animation", "appear 1s")
        .style("animation-delay", "11s")
        .style("animation-fill-mode", "forwards")
};

function drawBars() {
    // remove previous graph
    d3.selectAll("svg").remove()

    // data
    const text = '{ "degrees" : [' +
                '{ "degree":"Associates", "count":56 },' +
                '{ "degree":"Bachelors", "count":838 },' +
                '{ "degree":"Masters", "count":513 },' +
                '{ "degree":"Doctorate", "count":34 } ]}'
    

    const textParsed = JSON.parse(text)

    const data = textParsed.degrees

    // set the dimensions and margins of the graph
    const margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#chart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("transform", `translate(40, 0)`)
    const bounds = svg.append("g")
            .attr("transform", `translate(40,${margin.top})`);

    // x-scale and y-scale
    const x = d3.scaleBand()
        .range([ 0, width - margin.left - margin.right ])
        .domain(["Associates", "Bachelors", "Masters", "Doctorate"])
        .paddingInner(0.5);
    
    const y = d3.scaleLinear()
        .domain([0, 900])
        .range([ height, 0]);

    // Bars
    const barsGroup = bounds.append("g")

    const barGroups = barsGroup.selectAll("g")
        .data(data)
        .join("g")

    const barRects = barGroups.append("rect")
        .attr("x", d => x(d.degree))
        .attr("y", d => y(0))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(0))
        .attr("fill", "#7B051F")

    const barText = barGroups.filter(d => d.count)
        .append("text")
          .attr("x", d => x(d.degree) + 45)
          .attr("y", y(0))
          .text(d => d.count)
          .style("text-anchor", "middle")
          .attr("fill", "black")
          .style("font-size", "24px")
          .style("font-family", "sans-serif")
            
    // X axis
    bounds.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("fill", "black")
        .style("font-size", "20px")
        .style("font-weight", "600")

    // Animation
    barGroups.selectAll("rect")
        .transition()
        .duration(1000)
        .attr("y", d => y(d.count))
        .attr("height", d => height - y(d.count))
        .delay((d,i) => {console.log(i); return i*100})

    barGroups.selectAll("text")
        .transition()
        .duration(1000)
        .attr("y", d => y(d.count + 10))
        .delay((d,i) => {console.log(i); return i*100})
  };


function drawBubbles() {
    // remove previous graph
    d3.selectAll("svg").remove()
    d3.selectAll(".tooltip").remove()

    const data = d3.csv("https://raw.githubusercontent.com/moriahtaylor1/cucollaborate/main/data/CEO/test-data2.csv").then(function(data) {
        
        const svg = d3.select("#bubble")
            .append("svg")
                .attr("width", 1200)
                .attr("height", 700)
                .attr("transform", `translate(-80,10)`)

        const x = d3.scaleOrdinal()
            .domain(["Entry-Level", "Management", "Executive"])
            .range([50, 400, 750])

        const color = d3.scaleLinear()
            .domain([0,12])
            .range(["#FFD729", "#A41214"])

        const toolTip = d3.select("#tooltip")
            .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0)
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")
                .style("text-align", "center")
                .style("font-size", "20px")
            
        const mouseover = function(event, d){
            toolTip.style("opacity", 1)
            d3.select(this).style("stroke-width", "4")
            d3.select(this).style("fill-opacity", "1")
        }

        const mousemove = function(event, d){
            toolTip
                .html("<strong>" + d.title_clean + "</strong>&emsp;&emsp;" + "n = " + d.count + "&emsp;&emsp;" + "Avg: " + ((Math.round(d.avg_years*100))/100) + " years")
                .style("left", (350) + "px")
        }

        const mouseleave = function(event, d){
            toolTip.style("opacity", 0)
            d3.select(this).style("stroke-width", "1.5")
            d3.select(this).style("fill-opacity", "0.85")
        }

        const label1 = svg.append("text")
            .attr("x", 125)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .text("ENTRY-LEVEL")
            .style("font-weight", "600")

        const label2 = svg.append("text")
            .attr("x", 475)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .text("MANAGEMENT")
            .style("font-weight", "600")

        const label3 = svg.append("text")
            .attr("x", 825)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .text("EXECUTIVE")
            .style("font-weight", "600")

        const line1 = svg.append("line")
            .attr("x1", 300)
            .attr("x2", 300)
            .attr("y1", 0)
            .attr("y2", 700)
            .style("stroke", "black")
            .style("stroke-width", "3")
        
        const line2 = svg.append("line")
            .attr("x1", 650)
            .attr("x2", 650)
            .attr("y1", 0)
            .attr("y2", 700)
            .style("stroke", "black")
            .style("stroke-width", "3")

        const bounds = svg.append("g");

        const node = bounds.selectAll("circles")
            .data(data)
            .enter().append("circle")
                .attr("r", d => d.count/3)
                .attr("cx", d => x(d.category))
                .attr("cy", 400)
                .style("fill", d => color(d.avg_years))
                .style("fill-opacity", 0.85)
                .attr("stroke", "black")
                .style("stroke-width", 1.5)
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave)
                .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended));

        const simulation = d3.forceSimulation()
            .force("x", d3.forceX().strength(0.5).x(d => x(d.category)))
            .force("y", d3.forceY().strength(0.08).y(500))
            .force("center", d3.forceCenter().x(500).y(400)) // Attraction to the center of the svg area
            .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
            .force("collide", d3.forceCollide().strength(.15).radius(d => (d.count/3)+7).iterations(1)) // Force that avoids circle overlapping

        simulation
            .nodes(data)
            .on("tick", function(d){
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
            });

        // What happens when a circle is dragged?
        function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(.03).restart();
        d.fx = d.x;
        d.fy = d.y;
        }
        function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
        }
        function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(.03);
        d.fx = null;
        d.fy = null;
        }
        })

    
};