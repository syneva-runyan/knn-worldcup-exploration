// Use the test set to understand the accuracy of the classifier.

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


async function isPredictionRight(classifier, match, actualResult) {
     // test the accuracy.
     const result = await classifier.predictClass(match, 4);
     return parseInt(result.label) === actualResult;
}


async function testTheAccuracy(dataset, classifier) {
    let numberRight = 0;
    let totalCount = 0;

    await asyncForEach(dataset.features, async (match, idx) => {
        const isAccurate = await isPredictionRight(classifier, match, dataset.labels[idx]);
        if (isAccurate) {
            numberRight += 1;
        }
        
        totalCount += 1;
    });

    return (numberRight / totalCount) * 100;
}

const test = {
    description1: [
        "Using the previously reserved test set, we'll validate the accuracy of the model's predictions.",
    ],
    description2: [
        "When measuring accuracy, we create many models then average results to increase confidence in analysis.",
        "Here, we take the mean accuracy from 10 runs (10 chosen simply for presentation timing)",
        "I have previously determined that k=4 gives the best results for this problem."
    ],
    visualization: {
        type: 'img',
        src: '/assets/test.gif',
    },
    ctaText: "Test",
    onClick: async function(button, state) {
        if(!state.classifer) {
            alert("Ope! Make sure to load data and train classifier first.");
            return;
        }
        button.classList.add('button--loading');

        let cumulativeAccuracy = 0;
        let numOfRuns = 10;        
        for (let i = 0; i < numOfRuns; i++) {
           // console.log(`Shuffling data, run ${i}`);
            const { test, train } = await state.splitFn(state.dataset);
           // console.log("training classifier");
            const classifer = state.trainFn(train);
          //  console.log("measuring accuracy");
            const accuracy =  await testTheAccuracy(test, classifer);
            cumulativeAccuracy+= accuracy;
            console.log(`Accuracy of run ${i}: ${accuracy}`);
        }

        // let the user know the analysis was done
        const averageAccuracy = cumulativeAccuracy / numOfRuns;
        const confirmationText = document.createTextNode(`The model predicts match winners with ~${averageAccuracy}% accuracy`);
        button.replaceChild(confirmationText, button.childNodes[0]);
        button.disabled = true;
        button.classList.remove('button--loading');

    },
};

export default test;