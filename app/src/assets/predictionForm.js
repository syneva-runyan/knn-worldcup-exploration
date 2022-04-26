const predictionForm = {
    html: `
        <form id="predition-form" onsubmit="defaultPredictionError(); return false;">
        <div class="input_block">
        <label for="home_team">Home Team</label>
        <input name="home_team" id="home_team" />
        </div>

        <div class="input_block">
        <label for="home_team_spi">Home Team SPI</label>
        <input name="spi" id="home_team_spi" />
        </div>

        <div class="input_block">
        <label for="home_team_o_spi">Home Team Offensive SPI</label>
        <input name="spi_offense" id="home_team_o_spi" />
        </div>

        <div class="input_block">
        <label for="home_team_d_spi">Home Team Defensive SPI</label>
        <input name="spi_defense" id="home_team_d_spi" />
        </div>

        <div class="input_block">
        <label for="visiting">Visiting Team</label>
        <input name="visiting_team" id="visiting_team" />
        </div>

        <div class="input_block">
        <label for="visiting_team_spi">Visiting Team SPI</label>
        <input name="opposing_spi" id="visiting_team_spi" />
        </div>

        <div class="input_block">
        <label for="visiting_team_o_spi">Visiting Team Offensive SPI</label>
        <input name="opposing_spi_offense" id="visiting_team_o_spi" />
        </div>

        <div class="input_block">
        <label for="visiting_team_d_spi">Visiting Team Defensive SPI</label>
        <input name="opposing_spi_defense" id="visiting_team_d_spi" />
        </div>

        <button type="submit" id="submit-predition-numbers">Predict Match</button>
    <form>
    <p id="prediction_results" />
    `
};

export default predictionForm;