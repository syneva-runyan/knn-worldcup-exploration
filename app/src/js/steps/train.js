import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as tf from '@tensorflow/tfjs';

const splitFeaturesAndLabels = async (dataset) => {
    const labels = [];
    const features = [];
    await dataset.forEachAsync(match => {
        const labelIdx = match.length - 1;
        labels.push(match[labelIdx]);
        match.splice(labelIdx, 1);
        features.push(tf.tensor(match));
    });

    return {
        features,
        labels
    }
}

async function createAndTrain(trainingDataset) {

    // Create the classifier.
    const classifier = knnClassifier.create();

    // Train
    const { features, labels } = await splitFeaturesAndLabels(trainingDataset);
    for (const idx in labels) {
        classifier.addExample(features[idx], labels[idx]);
    }

    return classifier;
}

const train = {
    description1: [
        "Using tensorflow-models, we create a KNN Classifier and train the classifier with 2014 and 2018 world cup data",
    ],
    visualization: {
        type: 'img',
        src: '/assets/createAndTrain.png',
    },
    ctaText: "Create Classifier & Add Examples",
    trainFn: async(train) => {
        const classifer = await createAndTrain(train);
        return classifer
    },
    onClick: (button, state) => {
        if (!state.train) {
            alert("Ope! Go back a step and load the data first!");
            return;
        }
        button.classList.add('button--loading');
        setTimeout(async function() {
            const classifer = await state.trainFn(state.train);
            state.classifer = classifer;
    
            // let the user know classifier was trained properly
            const confirmationText = document.createTextNode("KNN Classifier Trained!")
            button.replaceChild(confirmationText, button.childNodes[0]);
            button.disabled = true;
            button.classList.remove('button--loading');

            // get the prediction form ready
            state.initPredictionForm(classifer);
        }, 25)
    }
};

export default train;