function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
    // Use `d3.json` to fetch the metadata for a sample
    d3.json("samples.json").then(function(data) {
        var metadata = data.metadata
        var result = metadata.filter(sampleobject => sampleobject.id == sample)[0];
        // Use d3 to select the panel with id of `#sample-metadata`
        var sample_metadata = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        sample_metadata.html("");
        console.log(result)
            // Use `Object.entries` to add each key and value pair to the panel
            // Hint: Inside the loop, you will need to use d3 to append new
            // tags for each key-value in the metadata.
        Object.entries(result).forEach(function([key, value]) {
            var row = sample_metadata.append("p");
            row.text(`${key}: ${value}`);
        });
    });
}

function buildCharts(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plot
    d3.json("samples.json").then(function(data) {
        var samples = data.samples
        var result = samples.filter(sampleobject => sampleobject.id == sample)[0];

        // @TODO: Build a Bubble Chart using the sample data
        var x_values_bubble = result.otu_ids;
        var y_values_bubble = result.sample_values;
        var m_size = result.sample_values;
        var m_colors = result.otu_ids;
        var t_values = result.otu_labels;

        //    Create a trace and declare is as the data variable
        var trace1 = {
            x: x_values_bubble,
            y: y_values_bubble,
            text: t_values,
            mode: 'markers',
            marker: {
                color: m_colors,
                size: m_size
            }
        };
        var data = [trace1];

        //      Add an xaxis label
        var layout = {
            xaxis: { title: "OTU ID" },
        };

        //    Create the bubble chart
        Plotly.newPlot('bubble', data, layout);



        //        Establish the variables for the pie chart
        var pie_values = result.sample_values.slice(0, 10);
        reverse
        var pie_labels = result.otu_ids.slice(0, 10);
        var pie_hover = result.otu_labels.slice(0, 10);

        //        Use the above values to create the data variable for the pie chart
        var data = [{
            values: bar_values,
            labels: bar_labels,
            hovertext: bar_hover,
            type: 'bar'
        }];

        // Establish the pie chart
        Plotly.newPlot('bar', data);
    });
}


function init() {

    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

function optionChanged(newSample) {

    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Initialize the dashboard
init();