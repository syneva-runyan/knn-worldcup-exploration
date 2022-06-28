import * as tf from '@tensorflow/tfjs';



function updateRangeForFeatures(currentRange, featureSet) {
    for (let idx in featureSet) {
        if (!currentRange[idx]) {
            currentRange[idx] = [featureSet[idx], featureSet[idx]]
            continue;
        }
        if (currentRange[idx][0] > featureSet[idx]) {
                currentRange[idx][0] = featureSet[idx]
        }
        if (currentRange[idx][1] < featureSet[idx]) {
                currentRange[idx][1] = featureSet[idx]
        }
    }

    return currentRange
}

function normalizeSet(featureSet, ranges) {
    const normlizedSet = []
    for (let idx in featureSet) {
        const min = ranges[idx][0]
        const max = ranges[idx][1]
        const normalizedValue = ((featureSet[idx] - min) / (max - min)) * 100
        normlizedSet.push(normalizedValue)
    }

    return normlizedSet;
}


// @param dataset https://js.tensorflow.org/api/latest/#class:data.Dataset
async function splitsFeaturesAndLabels(dataset) {
    const labels = [];
    const features = [];
    let rangesForEachFeature = []
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
        rangesForEachFeature = updateRangeForFeatures(rangesForEachFeature, matchFeatures)
        features.push(matchFeatures);
    });

    // normalize features - TODO use Tensorflow.js normalization
    const normalizedFeaturesWithLabel = features.map((example, idx) => {
        const features = normalizeSet(example, rangesForEachFeature)
        return [...features, labels[idx]]
    })

    // const tensors = normalizedFeatures.map(obj => tf.tensor(obj))
    return tf.data.array(normalizedFeaturesWithLabel)
}

const normalizeAndSplit = {
    description1: [
        "Since we're dealing with distance in KNN classifiers, it's important to normalize the dataset's features",
        "Offensive SPI should not be more or less important than defensive SPI, etc.",
    ],
    description2: [
        "While there are various ways to accomplish normalization using tensorjs, the math can be relatively straight forward and our dataset is small",
        "For this example, I've coded a simplistic normalization, mapping each value between 0 and 100"
    ],
    visualization: {
        type: 'img',
        src: '/assets/normalize.gif',
    },
    ctaText: "Normalize the data",
    onClick: async (button, state) => {
        button.classList.add('button--loading');
        const normalizedDataset = await splitsFeaturesAndLabels(state.dataset);

        // save datasets in steps' scope.
        state.dataset = normalizedDataset;
        
        // let the user know data was loaded and split correctly.
        const confirmationText = document.createTextNode("Data normalized!")
        button.replaceChild(confirmationText, button.childNodes[0]);
        button.disabled = true;
        button.classList.remove('button--loading');
    },
};

export default normalizeAndSplit;