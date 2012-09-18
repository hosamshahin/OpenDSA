"use strict";
// Code to support InsertionInsertElement exercise
// TODO:
// * Need a RESET ability
var
  jsav,           // The JSAV object
  answerArr = [], // The (internal) array that stores the correct answer
  jsavArr,        // The array that the user manipulates (JSAV object)
  userInput,      // Boolean: Tells us if user ever did anything
  isSelected,     // Boolean: True iff user has already clicked an array element
  selected_index; // Position that has been selected by user for swap

// Click event handler on the array
var clickHandler = function (index, e) {
  if (selected_index === -1) { // if nothing currently selected
    jsavArr.css(index, {"font-size": "130%"});
    selected_index = index;
  }
  else {
    jsavArr.swap(selected_index, index);
    jsavArr.css(index, {"font-size": "100%"});
    jsavArr.css(selected_index, {"font-size": "100%"});
    selected_index = -1;  // Reset to nothing selected
  }
  userInput = true;
};

// swap two values in array
var swap = function (arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// Initialise JSAV library
var initJSAV = function (arr_size, sort_pos) {
  var i, j;
  userInput = false;
  selected_index = -1;

  answerArr.length = 0; // Out with the old
  // Give random numbers in range 0..999
  for (i = 0; i < arr_size; i++) {
    answerArr[i] = Math.floor(Math.random() * 1000);
  }

  // Do a partial insertion sort to set things up

  for (i = 0; i < sort_pos; i++) {
    for (j = i; (j > 0) && (answerArr[j] < answerArr[j - 1]); j--) {
      swap(answerArr, j, j - 1);
    }
  }

  jsav = new JSAV("jsav");
  jsav.recorded();
  jsavArr = jsav.ds.array(answerArr, {indexed: true, center: false});
  jsavArr.highlight(sort_pos);

  // Compute the correct Answer
  for (j = sort_pos; (j > 0) && (answerArr[j] < answerArr[j - 1]); j--) {
    swap(answerArr, j, j - 1);
  }

  // bind the clickHandler to handle click events on the array
  jsavArr.click(clickHandler);
};

// Check student's answer for correctness: User's array must match answer
var checkAnswer = function (arr_size) {
  var i;
  for (i = 0; i < arr_size; i++) {
    if (jsavArr.value(i) !== answerArr[i]) {
      return false;
    }
  }
  return true;
};