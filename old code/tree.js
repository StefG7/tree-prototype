var svg = d3.select("body").append("svg")
                    .attr("width",1920).attr("height",1080)
                    .append("g").attr("transform","translate(10,70)");
// var data = d3.json('scenario_data_01.json', (n) => {

// })
var data = [{"child":"Conduct Anti-Vax Campaign", "parent":"","type":"goal"},
            {"child":"Create User Account", "parent":"Establish Anti-Vax Persona","type":"mentalAction"},
            {"child":"Establish Anti-Vax Persona", "parent":"Conduct Anti-Vax Campaign","type":"goal"},
            {"child":"Boost Persona", "parent":"Conduct Anti-Vax Campaign"},
            {"child":"Create Social Media Site", "parent":"Establish Anti-Vax Social Media Group"},
            {"child":"Establish Anti-Vax Social Media Group", "parent":"Conduct Anti-Vax Campaign"},
            {"child":"Boost User Account", "parent":"Boost Persona"},
            {"child":"Boost Social Media Group", "parent":"Boost Persona"},
            {"child":"Create FB User Account", "parent":"Create User Account"},
            {"child":"Create Facebook User Account","parent":"Create FB User Account"},
            {"child":"Boost Num Likes (FB User)","parent":"Boost User Account"},
            {"child":"Boost Num Likes (FB Group)","parent":"Boost Social Media Group"},
            ];
var dataStructure = d3.stratify()
                        .id((d) => {return d.child;})
                        .parentId((d) => {return d.parent;})
                        (data);
var treeStucture = d3.tree().size([1420,900]);
var information = treeStucture(dataStructure);
// console.log(information.descendants());
// console.log(information.links());
var connections = svg.append("g").selectAll("path")
                    .data(information.links());
connections.enter().append("path")
    .attr("d", function(d){
        return "M" + d.source.x + "," + d.source.y + " C " + 
        d.source.x + "," + (d.source.y + d.target.y)/2 + " " + 
        d.target.x + "," + (d.source.y + d.target.y)/2 + " " +
        d.target.x + "," + d.target.y;
    });
var circles = svg.append("g").selectAll("circle")
                // .attr("id", "nodeTooltip")
                .data(information.descendants());
circles.enter().append("circle")
    .attr("id", "nodeTooltip")
    .attr("cx", function(d){return d.x;})
    .attr("cy", function(d){return d.y;})
    .attr("r", 8);
// connections used to be listed here
var names = svg.append("g").selectAll("text")
                .data(information.descendants());
names.enter().append("text")
            .text(function(d){return d.data.child.toUpperCase();})
            .attr("x", function(d){return d.x+20;})
            .attr("y", function(d){return d.y+4;})
            .style("fill", "white")
            .style("font-weight","700")
// console.log(data[0].type)
var tooltip = d3.select("body").append("div")//.selectAll("circle")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("font-family","Lucida Console")
            .text("I'm a "+ data[0].type);

d3.select("#nodeTooltip")
    .on("mouseover",function(){return tooltip.style("visibility","visible")})
    .on("mousemove", function(){return tooltip.style("top", d3.select(this).attr("cy") + 20 + "px").style("left", d3.select(this).attr("cx") - 25 + "px")})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});