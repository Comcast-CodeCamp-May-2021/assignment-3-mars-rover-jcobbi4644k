

const Message = require("./message.js")
const Command = require("./command.js")

let message = Message

class Rover {
  // Write code here!
  constructor(position){
    this.position = position
    this.mode = "NORMAL"
    this.generatorWatts = 110
  };
  receiveMessage(messageObject){
    let resultsArray = [];
    let newObject = {
      message: messageObject.name,
      results: resultsArray
    };
    for (let i = 0; i<messageObject.commands.length; i++){
      let commandObject = (messageObject.commands[i]);
      if (commandObject.commandType === "STATUS_CHECK"){
        let status = {
          completed: "true",
          roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
        }
        resultsArray.push(status);        
      }else if (commandObject.commandType === "MODE_CHANGE"){
        this.mode = commandObject.value;
        let status = {
          completed: "true",
        }
        resultsArray.push(status);
      }else if(commandObject.commandType === "MOVE"){
        if (this.mode === "LOW_POWER"){
          let status = {
            completed: "false"
          }
          resultsArray.push(status);
        }else {
          this.position = messageObject.commands[i].value
          let status = {
            completed: "true"
          }
          resultsArray.push(status);
        }
      }
    }
    return newObject
  }
}

module.exports = Rover;