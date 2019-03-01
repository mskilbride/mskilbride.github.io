AFRAME.registerComponent('touch-listener', {
  init: function () {
    var targetEl = this.el;

    //Create the touchstart event
    document.querySelector('a-scene').addEventListener('touchstart', function () {
      targetEl.emit('starttouch')
    })

    document.querySelector('a-scene').addEventListener('mousedown', function () {
      targetEl.emit('starttouch')
    })

    document.body.addEventListener('keydown', function (e) {
      if (e.keyCode == 32) {
        console.log('space key pressed!');
        targetEl.emit('starttouch');
      }
    })

    //Create the touchend event
    document.querySelector('a-scene').addEventListener('touchend', function () {
      targetEl.emit('endtouch')
    })

    document.querySelector('a-scene').addEventListener('mouseup', function () {
      targetEl.emit('endtouch')
    })

    document.body.addEventListener('keyup', function (e) {
      if (e.keyCode == 32) {
        console.log('space key released!');
        targetEl.emit('endtouch');
      }
    })


  }
});

//set up these arrays outside the function so that init and tick can both access it
//use these arrays to hold previous quantities
rotationArray = []; //use y value
posArray = [];      //use x value as y value should remain constant
AFRAME.registerComponent('rotation-reader', {
    init: function () {
        //when the page loads do this
        firstRotation = document.querySelector('#Camera').getAttribute('rotation'); //initial value
        rotationArray.push(Number(firstRotation.y)); //get Number value of y and add to array (if you store the object it'll change)
        firstPos = document.querySelector('#Player').getAttribute('position'); //initial value
        posArray.push(Number(firstPos.x)); //add Number value of x to array (if you do it without Number() it'll change and always = current value
    },
    tick: function () {
        var currentRotation = document.querySelector('#Camera').getAttribute('rotation');
        var currentPos = document.querySelector('#Player').getAttribute('position');
        if (rotationArray[rotationArray.length -1] != Number(currentRotation.y)){
            //if the camera angle has changed log it in the array this way we keep the array smaller
            rotationArray.push(Number(currentRotation.y));
            //and maybe do something else
            //since there was camera movement check if there has been teleporting
            if (posArray[posArray.length -1] != Number(currentPos.x)) {
                //if the person x position has changed lot it in the array
                posArray.push(Number(currentPos.x));
                //and maybe try to dynamically set the teleport discs
            }
        }
        //use this with the chrome console to see what's going on as you move around
        console.log("Current camera y value is:   " + currentRotation.y);
        console.log("Initial camera y value was:  " + rotationArray[0]);
        console.log("Total camera y positions is: " + rotationArray.length);
        console.log("The camera array: " + rotationArray);
        console.log("The current person position: " + document.querySelector('#Player').getAttribute('position').x + ", " + document.querySelector('#Player').getAttribute('position').y + ", " + document.querySelector('#Player').getAttribute('position').z);
        console.log("Total person x positions is: " + posArray.length);
        console.log("The person array: " + posArray);
    }
});
