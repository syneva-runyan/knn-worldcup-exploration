import * as tf from '@tensorflow/tfjs';

function loadData() {
   return tf.data.csv('/assets/combined_datasets.csv');
}

const splitTheData = {
    description1: [
        "Data is loaded into the application using <a href='https://www.tensorflow.org/js' target='blank' rel='no-rel'>Tensorflow.js</a>",
        "tf.data outputs a <a href=\"https://js.tensorflow.org/api/latest/#class:data.Dataset\">TensorFlow Dataset</a> lets us efficiently play with large amounts of data."
    ],
    visualization: {
        type: 'img',
        src: '/assets/loadData.png',
    },
    ctaText: "Load the data",
    onClick: async (button, state) => {
        button.classList.add('button--loading');
        const dataset = loadData();

        // save datasets in steps' scope.
        state.dataset = dataset;
        
        // let the user know data was loaded and split correctly.
        const confirmationText = document.createTextNode("Data loaded!")
        button.replaceChild(confirmationText, button.childNodes[0]);
        button.disabled = true;
        button.classList.remove('button--loading');
    },
};

export default splitTheData;