const domElement = d3.select("body");
const imagePath = 'scenario_image_01.png';
domElement.append('img').attr('src', imagePath)
                    .attr('width',1000)
                    .attr('height',1000)
                    .attr("transform","translate(100,700)");
                    // .attr("x", 100) //window.innerWidth / 2)
                    // .attr("y", 100) //window.innerHeight / 2)

d3.xml('scenario_image_01.png', function(data){
    document.body.append(data.documentElement)
})

var circles = domElement.append('circle')
            .attr("cx", 500)
            .attr("cy", 500)
            .attr("r", 8);


// .append("g").selectAll("circle")
//             circles.enter().append("circle")
//             .attr("cx", 500)
//             .attr("cy", 500)
            // .attr("r", 8);

