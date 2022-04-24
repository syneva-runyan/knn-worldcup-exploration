import visualizationHTML from '../../assets/visualizationHTML';

function visualize(trainArray) {
    const dataNotLoaded = document.getElementById('dataNotLoaded');
    dataNotLoaded.parentElement.removeChild(dataNotLoaded);
    const displayWidth = document.getElementById('trainVisualization').offsetWidth;
    const displayHeight = 400;
    const options = {
        rootNode: '#trainVisualization',
        width: displayWidth,
        height: displayHeight,
        backgroundColor: 'black',
        circleFill: '#3fe4h2',
        circleStroke: 'white' 
    };
    const types = ['loss', 'tie', 'win'];

    const data = trainArray.map(d => {
      let type = 'loss';
      if (d.win == 0) {
          type = 'tie';
      } else if (d.win == 1) {
          type = 'win'
      }
    
      const { spi, opposing_spi} = d;
      return {x: spi * 3 , y: opposing_spi * 3, type };
    });

    const k = 4;
    const vis = new d3ml.KNNVisualization(data, options, types, k);
    vis.draw(); 
}

const visualizeModel = {
    description1: [
        "The below visualization(modified from the <a target=\"blank\" href=\"https://github.com/StefanieStoppel/d3ML\">d3ML library by Stefanie Stoppel</a>) helps demostrates what KNN Classification does.",
        "Click to predict the outcome of a new game based on home and visitor teams' SPIs",
    ],
    visualization: {
        type: 'code',
        content: visualizationHTML.html,
    },
    visualizationFn: async function(dataset) {
        const data = await dataset.toArray();
        visualize(data);
    }
};

export default visualizeModel;