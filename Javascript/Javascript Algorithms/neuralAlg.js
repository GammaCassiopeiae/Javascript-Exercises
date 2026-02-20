class Neuron {
  constructor() {
    this.weights = Array(1).fill().map(() => Math.random() * 2 - 1); // Random weights between -1 and 1
  }

  activate(value) {
    return sigmoid(value);
  }

  calculateOutput(inputs, weightMatrix) {
    let sum = 0;
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * weightMatrix[i][this.weights.length - 1];
    }
    return this.activate(sum);
  }
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork {
  constructor(inputNodes, hiddenLayers) {
    this.inputLayer = new Array(inputNodes).fill().map(() => new Neuron());
    this.hiddenLayers = [];
    
    for (let i = 0; i < hiddenLayers - 1; i++) {
      const layer = new Array(inputNodes).fill().map(() => new Neuron());
      this.hiddenLayers.push(layer);
    }
  }

  // For simplicity, we'll assume a single output node here
  feedForward(inputs) {
    let result = [];
    
    for (let i = 0; i < inputs.length; i++) {
      result[i] = this.inputLayer[i].calculateOutput(inputs[i], this.calculateWeights(this.inputLayer));
    }
    
    // For each hidden layer, calculate the output
    for (const hiddenLayer of this.hiddenLayers) {
      const weightsMatrix = this.calculateWeights(hiddenLayer);
      
      let newResult = [];
      for (let i = 0; i < result.length; i++) {
        newResult[i] = hiddenLayer.map(neuron => neuron.calculateOutput(result[i], weightsMatrix[i]));
      }
      
      result = newResult;
    }

    return result;
  }

  // Helper function to calculate the weight matrix for a given layer
  calculateWeights(layer) {
    const weightsMatrix = [];
    for (let i = 0; i < this.inputLayer.length; i++) {
      weightsMatrix[i] = layer.map(neuron => neuron.weights);
    }
    return weightsMatrix;
  }

  // Placeholder for backpropagation and learning - in a real application, you would implement these
  train(inputs, expectedOutputs) {}
}

// Example usage:
const nn = new NeuralNetwork(3, 40); // 3 input nodes, 40 hidden layers
console.log(nn.feedForward([0.5, 0.4, 0.7])); // Example feedforward output for inputs [0.5, 0.4, 0.7]
