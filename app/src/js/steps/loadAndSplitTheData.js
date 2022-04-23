import * as tf from '@tensorflow/tfjs';

function loadData() {
   return tf.data.csv('/assets/combined_datasets.csv');
}

// @param dataset https://js.tensorflow.org/api/latest/#class:data.Dataset
async function splitsFeaturesAndLabels(dataset) {
    const labels = [];
    const features = [];
    await dataset.forEachAsync(match => {
        labels.push(match["win"]);
        const matchFeatures = [
            Number.parseFloat(match["spi"]),
            Number.parseFloat(match["opposing_spi"]),
            Number.parseFloat(match["spi_offense"]),
            Number.parseFloat(match["opposing_spi_offense"]),
            Number.parseFloat(match["spi_defense"]),
            Number.parseFloat(match["opposing_spi_defense"]),
        ];
        features.push(tf.tensor(matchFeatures));
    });

    return {
        features,
        labels
    };
}

async function performSplit(dataset) {
    const arr = await dataset.toArray();
    const datasetSize = arr.length;
    // shuffle ALL data in set, randomize shuffle's seed with date
    const shuffledData = await dataset.shuffle(datasetSize, new Date());

    // Use 90% of data for training
    const train = shuffledData.take(Math.floor(datasetSize * .9));

    // Reserve 10% of data for testing
    const test = shuffledData.skip(Math.ceil(datasetSize * .9));


    // split features and labels.
    const { features: trainingFeatures, labels: trainingLabels } = await splitsFeaturesAndLabels(train);
    const { features: testFeatures, labels: testLabels } = await splitsFeaturesAndLabels(test);

    return { 
        train: {
            features: trainingFeatures,
            labels: trainingLabels,
            fullDataset: train,
        }, 
        test: {
            features: testFeatures,
            labels: testLabels,
            fullDataset: test,
        } 
    };
}

const splitTheData = {
    description1: [
        "Data is loaded and the split into 'test' and 'training' sets.",
        "The training set is used to train the classifier. Afterwards, the test set helps validate accuracy",
    ],
    description2: [
        "The percentage of data to reserve for the testing set should be tweaked for optimization.",
        "For this example, I've previously determined that reserving 10% of data is a good split"
    ],
    visualization: {
        type: 'img',
        src: '/assets/loadAndSplit.gif',
    },
    ctaText: "Load & Split the data",
    splitFn: async function(dataset) {
        const {train, test } = await performSplit(dataset);

        return {
            test, train,
        }
    },
    onClick: async (button, state) => {
        button.classList.add('button--loading');
        const dataset = loadData();
        const {train, test } = await state.splitFn(dataset);

        // save datasets in steps' scope.
        state.dataset = dataset;
        state.train = train;
        state.test = test;
        
        // let the user know data was loaded and split correctly.
        const confirmationText = document.createTextNode("Data loaded & split!")
        button.replaceChild(confirmationText, button.childNodes[0]);
        button.disabled = true;
        button.classList.remove('button--loading');

        // now that data is loaded, prep visualization
        state.visualizationFn(train.fullDataset);

    },
};

export default splitTheData;