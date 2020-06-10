const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
@@ -12,135 +10,106 @@ const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = 0;
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = 0;

    if (false /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */) {
    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    } else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  rock.style.top = '0px';
  GAME.appendChild(rock);

  // Hmmm, why would we have used `var` here?
  var top = 0
  var top = 0;

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  function moveRock() {
    rock.style.top = `${top += 2}px`;

    if (checkCollision(rock)) {
      endGame();
    }

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
    if (top <= GAME_HEIGHT) {
      rock.remove();
    } else {
      window.requestAnimationFrame(moveRock);
    }
  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  document.removeEventListener('keydown', moveDodger);
  window.clearInterval(gameInterval);
  ROCKS.forEach(function(rock){
    rock.remove();
  });
  alert("YOU LOSE!");
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
//  var act = {37: moveDodgerLeft, 38: moveDodgerRight};

   if (e.which == 37 || e.which == 39) {
      e.preventDefault();
      e.stopPropagation();
      e.which == 37 ? moveDodgerLeft() : false;
      e.which == 39 ? moveDodgerRight() : false;
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var move = 5;

  function stepLeft() {
    if (positionToInteger(DODGER.style.left) > 0) {
      DODGER.style.left = `${positionToInteger(DODGER.style.left) - 1}px`;
    } else {
      return
    }

    move-- > 0 ? window.requestAnimationFrame(stepLeft) : false;
  }

  window.requestAnimationFrame(stepLeft);
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var move = 5;

  function stepRight() {
    if (positionToInteger(DODGER.style.left) < GAME_WIDTH - 40) {
      DODGER.style.left = `${positionToInteger(DODGER.style.left) + 1}px`;
    } else {
      return
    }

    move-- > 0 ? window.requestAnimationFrame(stepRight) : false;
  }

  window.requestAnimationFrame(stepRight);
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}
 1  javascript-rock-dodger-bootcamp-prep-000 
Viewed
 Submodule javascript-rock-dodger-bootcamp-prep-000 added at 233ae9
 4  package.json  100644 → 100755
Viewed
@@ -8,8 +8,8 @@
  },
  "main": "index.js",
  "scripts": {
    "test": "mocha -R mocha-multi --reporter-options nyan=-,json=.results.json"
  },
  "test": "mocha --timeout 10000 -R mocha-multi --reporter-options nyan=-,json=.results.json"
},
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/learn-co-curriculum/java-script-rock-dodger.git"
 28  test/index-test.js  100644 → 100755
Viewed
@@ -9,12 +9,14 @@ describe('Rock Dodger', () => {
     */
    describe('rock is <= 360px from the top of GAME', () => {
      it('does not collide', () => {
        const rock = document.createElement('div')
        let rock = document.createElement('div')
        rock.className = 'rock'
        rock.style.top = '2px'
        rock.style.left = '0px'

        expect(checkCollision(rock)).toNotBe(true)

        rock = null
      })
    })

@@ -27,6 +29,10 @@ describe('Rock Dodger', () => {
        rock.style.top = '362px'
      })

      afterEach(() => {
        rock = null
      })

      it('does not collide if not within DODGER\'s bounds', () => {
        rock.style.left = '0px'

@@ -54,20 +60,30 @@ describe('Rock Dodger', () => {
  })

  describe('createRock(x)', () => {
    let rock

    let rock, spy
    beforeEach(() => {
      window.requestAnimationFrame = expect.createSpy()
      // this slight hack lets us run the tests both
      // in the browser and in jsdom
      if (typeof window.requestAnimationFrame !== 'undefined') {
        spy = expect.spyOn(window, 'requestAnimationFrame')
      } else {
        spy = window.requestAnimationFrame = expect.createSpy()
      }

      rock = createRock(2)
    })

    afterEach(() => {
      rock = null
      spy = null
    })

    it('creates a rock with a given `style.left` value', () => {
      expect(rock.style.left).toEqual('2px')
    })

    it('calls window.requestAnimationFrame()', () => {
      expect(window.requestAnimationFrame).toHaveBeenCalled()
      expect(spy).toHaveBeenCalled()
    })

    describe('moveRock()', () => {
@@ -249,7 +265,7 @@ describe('Rock Dodger', () => {

        moveDodger(e)

        expect(spy).toHaveBeenCalled
        expect(spy).toHaveBeenCalled()
      })

      it('calls moveDodgerRight()', () => {/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = 0;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = 0;

    if (false /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge.
               */) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame().
     */

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM.
     */
  }

  // We should kick off the animation of the rock around here.

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  ROCKS.push(rock)

  // Finally, return the rock element you've created.
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
