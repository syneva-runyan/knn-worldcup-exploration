async function performSplit(dataset) {
    const arr = await dataset.toArray();
    const datasetSize = arr.length;
    // shuffle ALL data in set, randomize shuffle's seed with date
    const shuffledData = await dataset.shuffle(datasetSize, new Date());

    // Use 90% of data for training
    const train = shuffledData.take(Math.floor(datasetSize * .85));

    // Reserve 10% of data for testing
    const test = shuffledData.skip(Math.ceil(datasetSize * .85));

    return {
        train,
        test
    };
}

const splitTheData = {
    description1: [
        "Split into 'test' and 'training' sets.",
        "The training set is used to train the classifier. Afterwards, the test set helps validate accuracy",
    ],
    description2: [
        "The percentage of data to reserve for the testing set may be tweaked for optimization.",
        "For this example, I've previously determined that reserving 15% of data is a good split"
    ],
    visualization: {
        type: 'img',
        src: '/assets/loadAndSplit.gif',
    },
    ctaText: "Load & Split the data",
    splitFn: async (dataset) => {
        const { train, test } = await performSplit(dataset);
        return { test, train }
    },
    onClick: async (button, state) => {
        button.classList.add('button--loading');
        const { train, test } = await state.splitFn(state.dataset);

        // save datasets in steps' scope.
        state.train = train;
        state.test = test;

        // let the user know data was loaded and split correctly.
        const confirmationText = document.createTextNode("Data split!")
        button.replaceChild(confirmationText, button.childNodes[0]);
        button.disabled = true;
        button.classList.remove('button--loading');

        // now that data is loaded, prep visualization
        state.visualizationFn(train);

    },
};

export default splitTheData;