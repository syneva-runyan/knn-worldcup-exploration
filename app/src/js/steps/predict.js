import * as tf from '@tensorflow/tfjs';
import predictionForm from '@/assets/predictionForm';

// Allow user to enter SPI features, the use the classifier to predict match outcome.

function initForm(classifer) {
    const form = document.getElementById('predition-form');
    // remove default error.
    window.defaultPredictionError = () => {}
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const inputs = e.target.getElementsByTagName('input');
        predictWinner(inputs, classifer);
    })
}

async function predictWinner(inputs, classifier) {
    const inputObj = {};
    for (let i = 0; i < inputs.length; i++) {
        inputObj[inputs[i].name] = inputs[i].value;
    }

    const matchFeatures = [
        Number.parseFloat(inputObj["spi"]),
        Number.parseFloat(inputObj["opposing_spi"]),
        Number.parseFloat(inputObj["spi_offense"]),
        Number.parseFloat(inputObj["opposing_spi_offense"]),
        Number.parseFloat(inputObj["spi_defense"]),
        Number.parseFloat(inputObj["opposing_spi_defense"]),
    ];

    // Predict value!
    const result = await classifier.predictClass(tf.tensor(matchFeatures), 4);

    let englishResults;

    switch(result.label) {
        case '-1':
            englishResults = "loose to";
            break;
        case "0":
            englishResults = "tie";
            break;
        case "1":
            englishResults = "beat";
            break;
    }

    // display result
    const node = document.getElementById('prediction_results');
    node.textContent = `Prediction: ${inputObj['home_team']} will ${englishResults} ${inputObj["visiting_team"]}`;
}

const splitTheData = {
    description1: [
        "Now that we have a trained classifer, enter data to see a prediction.",
    ],
    visualization: {
        type: 'code',
        id: 'predict',
        content: predictionForm.html
    },
    initForm,
};

export default splitTheData;