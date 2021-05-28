const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


// Testt 7**
describe("Rover class", function() {
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let testRover = new Rover(98382)
    expect(testRover.position).toEqual(98382);
    expect(testRover.mode).toEqual("NORMAL");
    expect(testRover.generatorWatts).toEqual(110);
    });

  // Test 8**
 it("response returned by receiveMessage contains name of message", function(){
    let testRover = new Rover(98382); 
    let testCommandOne = new Command('STATUS_CHECK');
    let testCommandTwo = new Command('MODE_CHANGE', 'LOW_POWER');
    let testCommandThree = new Command("MOVE", 20);
    let commands = [testCommandOne, testCommandTwo];
    let newMessage = new Message("Test message with two commands", commands);
    let messageResponse = testRover.receiveMessage(newMessage);



   // 7 tests here!
    expect(messageResponse.message).toEqual(newMessage.name);
  });
 



 // Test 9**
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let testRover = new Rover(98382); 
    let testCommandOne = new Command('STATUS_CHECK');
    let testCommandTwo = new Command('MODE_CHANGE', 'LOW_POWER');
    let testCommandThree = new Command("MOVE", 20);
    let commands = [testCommandOne, testCommandTwo];
    let newMessage = new Message("Test message with two commands", [testCommandOne, testCommandTwo]);
    let messageResponse = testRover.receiveMessage(newMessage);
    expect(messageResponse.results.length).toEqual(commands.length);
  });


 // Test 10***
  
  it("responds correctly to status check command", function(){
    let testRover = new Rover(98382); 
    let testCommandOne = new Command('STATUS_CHECK');
    let newMessage = new Message("status check", [testCommandOne]);
    let messageResponse = testRover.receiveMessage(newMessage).results;

    expect(messageResponse).toEqual([
      {
        completed: 'true',
        roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 98382 }
      }
    ]);
  });
 

 //Test 11**
  it("responds correctly to mode change command", function() {
    let testRover = new Rover(98382); 
    let testCommandOne = new Command('STATUS_CHECK');
    let testCommandTwo = new Command('MODE_CHANGE', 'LOW_POWER');
    let testCommandThree = new Command("MOVE", 20);
    let commands = [testCommandOne, testCommandTwo];
    let newMessage = new Message("Change mode", [testCommandTwo]);
    let messageResponse = testRover.receiveMessage(newMessage).results;

    expect(messageResponse).toEqual([ { completed: 'true' } ]);
    expect(testRover.mode).toEqual("LOW_POWER");

  });
 

 // Test 12***
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let testRover = new Rover(98382); 
    let testCommandOne = new Command('STATUS_CHECK');
    let testCommandTwo = new Command('MODE_CHANGE', 'LOW_POWER');
    let testCommandThree = new Command("MOVE", 20);
    let commands = [testCommandOne, testCommandTwo];
    let newMessage = new Message("Change mode", [testCommandTwo, testCommandThree]);
    let messageResponse = testRover.receiveMessage(newMessage).results;

    expect(messageResponse[1]["completed"]).toEqual("false");

  });

  // Test 13**
   it("responds with position for move command", function() {
    let testRover = new Rover(98382); 
    let testCommandOne = new Command('STATUS_CHECK');
    let testCommandTwo = new Command('MODE_CHANGE', 'LOW_POWER');
    let testCommandThree = new Command("MOVE", 20);
    let commands = [testCommandOne, testCommandTwo];
    let newMessage = new Message("Move", [testCommandThree]);
    let messageResponse = testRover.receiveMessage(newMessage).results;

    expect(testRover.position).toEqual(20);

  });
});



