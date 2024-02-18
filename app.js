
                        // bar chart 


document.addEventListener('DOMContentLoaded', function () {
  // Load CSV data
  d3.csv('trends.csv').then(function (data) {
    // Extract unique categories
    const categories = Array.from(new Set(data.map(d => d.category)));

    // Set up the SVG dimensions
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Select the .bar-chart div and append an SVG to it
    const svg = d3.select('.bar-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Set up scales
    const xScale = d3.scaleBand()
      .domain(categories)
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => +d.rank)])
      .range([height, 0]);

    // Create bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.category))
      .attr('y', d => yScale(d.rank))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.rank))
      .attr('fill', 'steelblue');

    // Add x-axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '13px'); // Adjust the font size here

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add axis labels
    svg.append('text')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.top + 20) + ')')
      .style('text-anchor', 'middle')
      .text('Category');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Rank');
  });
});

                           // scatter-plot

document.addEventListener('DOMContentLoaded', function () {
  // Load CSV data
  d3.csv('trends.csv').then(function (data) {
    // Specify the category for the scatter plot
    const selectedCategory = 'Fitness';

    // Filter data for the selected category
    const filteredData = data.filter(d => d.category === selectedCategory);

    // Extract unique countries
    const countries = Array.from(new Set(filteredData.map(d => d.location)));

    // Set up the SVG dimensions
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Select the .scatter-plot div and append an SVG to it
    const svg = d3.select('.scatter-plot')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Set up scales
    const xScale = d3.scaleBand()
      .domain(countries)
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => +d.rank)])
      .range([height, 0]);

    // Create circles for each country
    svg.selectAll('circle')
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.location))
      .attr('cy', d => yScale(+d.rank))
      .attr('r', 5) // Adjust the radius as needed
      .attr('fill', 'steelblue')
      .attr('opacity', 0.7);

    // Add x-axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add axis labels
    svg.append('text')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.top + 20) + ')')
      .style('text-anchor', 'middle')
      .text('Country');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Rank');
  });
});

        // table 

// app.js

// Function to create and render the table
function renderTable(data) {
  const tableContainer = document.getElementById('table-container');

  // Create a table element
  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered');

  // Create the table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  for (const key in data[0]) {
      const th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  const tbody = document.createElement('tbody');
  data.forEach((row) => {
      const tr = document.createElement('tr');
      for (const key in row) {
          const td = document.createElement('td');
          td.textContent = row[key];
          tr.appendChild(td);
      }
      tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  // Append the table to the container
  tableContainer.appendChild(table);
}

// Load data from the CSV file
d3.csv('trends.csv').then(function (data) {
  // Call the renderTable function with the loaded dataset
  renderTable(data);
});


              // line chart
// Load the data from trends.csv
d3.csv('trends.csv').then(function (data) {
  // Filter out rows where category is 'undefined'
  const filteredData = data.filter(d => d.category && ['Technology', 'Travel', 'Food', 'Fitness', 'Entertainment', 'People'].includes(d.category));

  // Filter the data for a specific location and category
  const location = 'Canada';
  const category = 'Food';
  const locationFilteredData = filteredData.filter(d => d.location === location && d.category === category);

  // Parse the year and rank as numbers
  locationFilteredData.forEach(d => {
      d.year = new Date(+d.year, 0, 1); // Assuming the year is in YYYY format
      d.rank = +d.rank;
  });

  // Set up the dimensions of the chart
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = 700 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Append the SVG element to the body
  const svg = d3.select(".line-chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Set up the x and y scales
  const x = d3.scaleTime().range([0, width]).domain(d3.extent(locationFilteredData, d => d.year));
  const y = d3.scaleLinear().range([height, 0]);

  // Define the line with a specific interpolation
  var line = d3.line()
      .x(function (d) { return x(d.year); })
      .y(function (d) { return y(d.rank); });

  // Scale the range of the data
  y.domain([0, d3.max(locationFilteredData, d => d.rank)]);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

  // Add axis labels
  svg.append('text')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.top + 20) + ')')
      .style('text-anchor', 'middle')
      .text('Years');

  svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Rank');

  // Add the line
  svg.append("path")
      .datum(locationFilteredData)
      .attr("class", "line")
      .attr("d", line)
      .attr("stroke", "steelblue")
      .style("stroke-width", 2)
      .style("fill", "none");

  // Dropdown change event handler
  d3.select("#selectButton").on("change", function () {
      var selectedOption = this.value;
      update(selectedOption);
  });

  // A function to update the chart based on the selected option
  function update(selectedGroup) {
      // Update the y domain based on the selected data
      y.domain([0, d3.max(locationFilteredData, d => d[selectedGroup])]);

      // Update the Y Axis
      svg.select("g.axisLeft")
          .transition()
          .call(d3.axisLeft(y));

      // Update the line
      svg.select(".line")
          .datum(locationFilteredData)
          .transition()
          .attr("d", line);
  }
});



//circle diagremme

document.addEventListener("DOMContentLoaded", function () {
  // Utilize Fetch to load the CSV file
  fetch('trends.csv')
      .then(response => response.text())
      .then(data => {
          // Transform the text into an array of objects
          var dataset = d3.csvParse(data);

          // Use d3.nest() to group data by 'category' and sum the ranks
          var nestedData = d3.nest()
              .key(d => d.category)
              .rollup(group => d3.sum(group, d => +d.rank))
              .entries(dataset);

          // Sort the nested data by the sum of ranks in descending order
          nestedData.sort((a, b) => d3.descending(a.value, b.value));

          // Create a circular diagram with D3.js
          var width = 400;
          var height = 400;
          var radius = Math.min(width, height) / 2;

          var svg = d3.select("#circular-container")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", `translate(${width / 2},${height / 2})`);

          // Use a single color scale
          var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

          // Create a function to generate the circular diagram
          var pie = d3.pie()
              .value(d => d.value); // Use the sum of ranks as the value

          // Create the arc for the sectors
          var arc = d3.arc()
              .innerRadius(0)
              .outerRadius(radius);

          // Generate data for the circular diagram
          var pieData = pie(nestedData);

          // Add sectors to the circular diagram
          var arcs = svg.selectAll("arc")
              .data(pieData)
              .enter()
              .append("g")
              .on("mouseover", function (event, d) {
                  d3.select(this).select("path")
                      .attr("fill", "#404040"); // Change the color of the hovered sector
                  // Add a tooltip with the category information
                  svg.append("text")
                      .attr("id", "category-label")
                      .attr("x", 0)
                      .attr("y", 0)
                      .attr("text-anchor", "middle")
                      .attr("alignment-baseline", "middle")
                      .attr("fill", "black")
                      .text(d.data.key);
              })
              .on("mouseout", function () {
                  d3.select(this).select("path")
                      .attr("fill", d => colorScale(d.index)); // Restore the original color
                  // Remove the tooltip
                  svg.select("#category-label").remove();
              });

          arcs.append("path")
              .attr("d", arc)
              .attr("fill", (d, i) => colorScale(i));

          // Add text labels within each sector
          arcs.append("text")
              .attr("transform", d => `translate(${arc.centroid(d)})`)
              .attr("dy", "0.35em")
              .attr("text-anchor", "middle")
              .style("fill", "white") // Set text color to white for visibility
              .text(d => d.data.key); // Display category name

          // Add a legend
          var legend = svg.selectAll(".legend")
              .data(colorScale.domain())
              .enter()
              .append("g")
              .attr("class", "legend")
              .attr("transform", (d, i) => `translate(0, ${i * 20})`);

          legend.append("rect")
              .attr("x", radius + 10)
              .attr("width", 18)
              .attr("height", 18)
              .attr("fill", colorScale);

          legend.append("text")
              .attr("x", radius + 35)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "start")
              .text(d => d); // Use the category as the legend text

      })
      .catch(error => console.error('An error occurred while loading the CSV file:', error));
});


//statistiques
document.addEventListener("DOMContentLoaded", function () {
  // Utilize Fetch to load the CSV file
  fetch('trends.csv')
      .then(response => response.text())
      .then(data => {
          // Transform the text into an array of objects
          var dataset = d3.csvParse(data);

          // Function to get unique values from an array
          function getUniqueValues(array, columnName) {
              return [...new Set(array.map(item => item[columnName]))];
          }

          // Get unique countries, categories, and queries
          var uniqueCountries = getUniqueValues(dataset, 'location');
          var uniqueCategories = getUniqueValues(dataset, 'category');
          var uniqueQueries = getUniqueValues(dataset, 'query');

          // Log the counts
          console.log('Number of unique countries:', uniqueCountries.length);
          document.getElementById('1').innerHTML = uniqueCountries.length;
          console.log('Number of unique categories:', uniqueCategories.length);
          document.getElementById('2').innerHTML = uniqueCategories.length;
          console.log('Number of unique queries:', uniqueQueries.length);
          document.getElementById('3').innerHTML = uniqueQueries.length;
      })
      .catch(error => console.error('An error occurred while loading the CSV file:', error));
});


// bubble map
