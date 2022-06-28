import loadTheData from "./steps/loadTheData";
import normalizeTheData from './steps/normalizeTheData';
import splitTheData from "./steps/splitTheData";
import train from "./steps/train";
import visualizeModel from './steps/visualizeModel';
import predict from './steps/predict';
import testTheAccuracy from './steps/test'
import soccerBall from '@/images/soccerBall.png'

// hold onto datasets & classifier in steps' scope.
const state = {
  splitFn: splitTheData.splitFn, // used in split & test steps
  trainFn: train.trainFn,  // used in train & test steps
  visualizationFn: visualizeModel.visualizationFn,
  initPredictionForm: predict.initForm
};

const steps = {
  "Load the dataset": loadTheData,
  "Normalize the dataset": normalizeTheData,
  "Split into test & train sets": splitTheData,
  "Create & train the model": train,
  "Visualize what's happening": visualizeModel,
  "Predict": predict,
  "Test the Accuracy": testTheAccuracy,
};

const createHeader = (headerText, stepNum) => {
  const container = document.createElement("div");
  const step = document.createElement("h2");
  step.textContent = `Step ${stepNum}`;
  const header = document.createElement("h3");
  header.textContent = headerText;

  container.append(step);
  container.append(header);

  return container;
}

const renderDescription = (descriptionTextArray) => {
  const container = document.createElement("div");
  for (let text of descriptionTextArray) {
    const el = document.createElement("p");
    el.innerHTML = text;
    container.append(el);
  }

  return container;
}

function createMainSlide() {
  const container = document.createElement("div");
  container.classList.add('slide');
  const logo = document.createElement('img')
  logo.src = soccerBall;

  const heading = document.createElement('h1')
  heading.textContent = "Creating a KNN Classifier with World Cup Data";


  container.append(heading);
  container.append(logo);
  return container;
}

function createSteps() {
  const container = document.createElement('div');
  container.classList.add('steps');
  container.append(createMainSlide());

  const stepKeys = Object.keys(steps);
  for (let i in stepKeys) {
      const stepName = stepKeys[i];
      const step = steps[stepKeys[i]];
      const stepContainer = document.createElement('div');
      stepContainer.classList.add('slide');
      stepContainer.classList.add('step');
      stepContainer.style.height = `${window.innerHeight + 100}px`;



      stepContainer.append(createHeader(stepName, i));
      stepContainer.append(renderDescription(step.description1));
      step.visualization && stepContainer.append(loadVisualization(step.visualization));
      step.description2 && stepContainer.append(renderDescription(step.description2));
      step.ctaText && stepContainer.append(createCTA(step.ctaText, step.onClick));

      container.append(stepContainer);
  }

  return container;
}

function createCTA(ctaText, onClick) {
  const button = document.createElement('button');
  button.textContent = ctaText;
  button.onclick = function(e) {
      onClick(e.target, state);
  };
  return button;
}

function loadVisualization({type, src, content}) {
  if (type == 'img') {
    const img = document.createElement('img');
    img.classList.add("visualization");
    img.src = src;
    return img;
  }

  const container = document.createElement('div');
  container.innerHTML = content;

  return container;
}


export default createSteps();
