const visualizationHTML = {
    html: `<div class="visualization_container">
        <h4>Match Outcome based on Home vs Visiting team SPIs</h4>
        <div id="trainVisualization">
            <p id="dataNotLoaded" style="background-color: #600000; padding: 50px;">Ope! To see the visualization, go back to step 0 and load the data!</p>
        </div>
        <div class="visualization_key">
            <h4>Key</h4>
            <p><span class="label" id="home_team_label"></span > visiting team win</p>
            <p><span class="label" id="visiting_team_label" ></span> home team win</p>
        </div>
        <p>Home team SPI</p>
        <p class="visiting_label">Visiting team SPI</p>
    <div />
    `
};

export default visualizationHTML;