
var width  = 1360;
var height = 800;
var margin = 20;
var pad = margin / 2;
var color = d3.scale.category20c();
// Generates a tooltip for a SVG circle element based on its ID
function addTooltip(circle) {
    var x = parseFloat(circle.attr("cx"));
    var y = parseFloat(circle.attr("cy"));
    var r = parseFloat(circle.attr("r"));
    var text = circle.attr("id");
    var tooltip = d3.select("#plot")
        .append("text")
        .text(text)
        .attr("x", x)
        .attr("y", y)
        .attr("dy", -r * 2)
        .attr("id", "tooltip");
    var offset = tooltip.node().getBBox().width / 2;
    if ((x - offset) < 0) {
        tooltip.attr("text-anchor", "start");
        tooltip.attr("dx", -r);
    }
    else if ((x + offset) > (width - margin)) {
        tooltip.attr("text-anchor", "end");
        tooltip.attr("dx", r);
    }
    else {
        tooltip.attr("text-anchor", "middle");
        tooltip.attr("dx", 0);
    }
}




var w = 1360,
    h = 800,
    toggle = 0;


function drawGraph(graph) {

var svg = d3.select("#force").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("background-color", "#ffffff") 
    .attr("width", w)
    .attr("height", h)
    .attr("pointer-events", "all")
  .append('svg:g')
    // .call(d3.behavior.zoom().on("zoom", redraw))
  .append('svg:g');

svg.append('rect')
    .attr('width', w)
    .attr('height', h)
    .attr('fill', '#ffffff');

// function redraw() {
  
//   svg.attr("transform",
//       "translate(" + d3.event.translate + ")"
//       + " scale(" + d3.event.scale + ")");
// };


window.addEventListener('resize', resize); 

function resize() {
    var width = window.innerWidth, height = window.innerHeight;
    svg.attr("width", width).attr("height", height);
    layout.size([width, height]).resume();
}



    // draw plot background
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "#262a3b");
    // create an area within svg for plotting graph



    var plot = svg.append("g")
        .attr("id", "plot")
        .attr("transform", "translate(" + pad + ", " + pad + ")");
    // https://github.com/mbostock/d3/wiki/Force-Layout#wiki-force
    var layout = d3.layout.force()
        .size([width - margin/6, height - margin/6])
        .charge(-300)
        .chargeDistance(76)
        .linkDistance(function(d, i) {
            return (d.source.group == d.target.group) ? 10 : 10;
        })
        .nodes(graph.nodes)
        .links(graph.links)
        .start();
    drawLinks(graph.links);
    drawNodes(graph.nodes);
    // add ability to drag and update layout
    // https://github.com/mbostock/d3/wiki/Force-Layout#wiki-drag
    d3.selectAll(".node").call(layout.drag);
    d3.selectAll(".node").on('click', connectedNodes);
    // https://github.com/mbostock/d3/wiki/Force-Layout#wiki-on
    layout.on("tick", function() {
        d3.selectAll(".link")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        d3.selectAll(".node")
        .attr("cx", function(d) { return d.x = Math.max(0, Math.min(width, d.x)); }) 
            .attr("cy", function(d) { return d.y = Math.max(0,Math.min(height, d.y)); });
    });


/*uncomment below for fisheye*/
var fisheye = d3.fisheye.circular()
      .radius(100);
svg.on("mousemove", function() {
      layout.stop();
      fisheye.focus(d3.mouse(this));
      d3.selectAll("circle").each(function(d) { d.fisheye = fisheye(d); })
          .attr("cx", function(d) { return d.fisheye.x; })
          .attr("cy", function(d) { return d.fisheye.y; })
          .attr("r", function(d) { return d.fisheye.z * 2; });
      d3.selectAll(".link").attr("x1", function(d) { return d.source.fisheye.x; })
          .attr("y1", function(d) { return d.source.fisheye.y; })
          .attr("x2", function(d) { return d.target.fisheye.x; })
          .attr("y2", function(d) { return d.target.fisheye.y; });
    });


var linkedByIndex = {};
for (i = 0; i < graph.nodes.length; i++) {
    
    linkedByIndex[i + "," + i] = 1;
};
graph.links.forEach(function (d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;

});

graph.links.forEach(function (d) {
    for(i = 0; i<graph.nodes.length;i++){
        // console.log(i);
    if(linkedByIndex[d.target.index + "," + i]==1 || linkedByIndex[i+ "," +d.target.index ]==1){
    linkedByIndex[d.source.index + "," + i] = 1;
    linkedByIndex[i+"," + d.source.index ] = 1;
}}

});


graph.links.forEach(function (d) {
    for(i = 0; i<graph.nodes.length;i++){
        // console.log(i);
    if(linkedByIndex[d.target.index + "," + i]==1 || linkedByIndex[i+ "," +d.target.index ]==1){
    linkedByIndex[d.source.index + "," + i] = 1;
    linkedByIndex[i+"," + d.source.index ] = 1;
}}

});
function neighboring(a, b) {

    return linkedByIndex[a.index + "," + b.index];
}
function connectedNodes() {
    var node  = svg.selectAll(".node");
    if (toggle == 0) {

        d = d3.select(this).node().__data__;
           
        node.style("opacity", function (o) {
            return neighboring(d, o) | neighboring(o, d) ? 1 : 0.15;
        });
        toggle = 1;
    } else {
        node.style("opacity", 1);;
        toggle = 0;
    }

}


function connectedChildNodes(child) {
    console.log("#"+child.name);
    var node  = svg.selectAll("#"+child.name);
    

        d = child;
        
        node.style("opacity", function (o) {
            
            // for (i =0; i<linkedByIndex.length;i++)
            return neighboring(d, o) | neighboring(o, d) ? 1 : 0.15;
        });
        
     

}

var optArray = [];
for (var i = 0; i < graph.nodes.length - 1; i++) {
    optArray.push(graph.nodes[i].name);
}
optArray = optArray.sort();
$(function () {
    $("#search").autocomplete({
        source: optArray
    });
});


}
    function tick(e) {
  // Push different nodes in different directions for clustering.
  var k = 6 * e.alpha;
  graph.nodes.forEach(function(o, i) {
    o.y += i & 1 ? k : -k;
    o.x += i & 2 ? k : -k;
  });
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}
// Draws nodes on plot
function drawNodes(nodes) {
    // used to assign nodes color by group
    var color = d3.scale.category20();
    // https://github.com/mbostock/d3/wiki/Force-Layout#wiki-nodes
    d3.select("#plot").selectAll(".node")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("id", function(d, i) { return d.name; })
        .attr("cx", function(d, i) { return d.x; })
        .attr("cy", function(d, i) { return d.y; })
        .attr("r",  function(d, i) { return 2; })
        .style("fill",   function(d, i) { return color(d.group); })
        .on("mouseover", function(d, i) { addTooltip(d3.select(this)); })
        .on("mouseout",  function(d, i) { d3.select("#tooltip").remove(); });
}
// Draws edges between nodes
function drawLinks(links) {
    var scale = d3.scale.linear()
        .domain(d3.extent(links, function(d, i) {
           return d.value;
        }))
        .range([1, 3]);
    // https://github.com/mbostock/d3/wiki/Force-Layout#wiki-links
    d3.select("#plot").selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .style("stroke-width", function(d, i) {
            return scale(d.value) + "px";
        });
        // .style("stroke-dasharray", function(d, i) {
        //     return (d.value <= 1) ? "2, 2" : "none";
        // });
}

function colorNode(name){
              //iterate through all the dom and get the DOM which has the data
              var node = d3.selectAll(".node")[0].filter(function(d){
                return d3.select(d).data()[0].name == name;
              });
              //for the matching node DOM set the fill to be red
              d3.selectAll(node).style("fill", "red");
            }

function colorLink(src,tgt){
              //iterate through all the links for src and target.
              var link = d3.selectAll(".link")[0].filter(function(d){
                return (d3.select(d).data()[0][0].name == src && d3.select(d).data()[0][2].name == tgt);
              });
              //for the filtered link make the stroke red.
              d3.selectAll(link).style("stroke", "red");
            }            



function searchNode() {
    //find the node
    var selectedVal = document.getElementById('search').value;
    var svg = d3.select("svg");
    var node = svg.selectAll(".node");
    if (selectedVal == "none") {
        node.style("stroke", "white").style("stroke-width", "1");
    } else {
        var selected = node.filter(function (d, i) {
            return d.name != selectedVal;
        });
        selected.style("opacity", "0");
        var link = svg.selectAll(".link")
        link.style("opacity", "0");
        d3.selectAll(".node, .link").transition()
            .duration(3000)
            .style("opacity", 1);
    }
}