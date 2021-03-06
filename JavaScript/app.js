"use strict"
//filename: app.js
//Author: Brian Twene
//Date: 14/09/21

//This file handles the timer operation
//work is still in progress to finish the progress bar, sound options and dark mode...

//store html elements in variables
const prefBtn = document.querySelector(".pref_btn");
const sideMenu = document.querySelector(".menu-background");
const userInput = document.querySelectorAll(".timer")
const start = document.querySelector(".start-pause");
const reset = document.querySelector(".reset");
const timerDisplay = document.querySelector(".timer-display");
const progress = document.querySelector(".progress");
const progress_contain = document.querySelector(".progress-container")
const body = document.querySelector("body");





// timer class
class Timer{

    //instance variables
    constructor(hrs, min, sec){
        this.hrs = hrs;
        this.min = min;
        this.sec = sec;
        this.start;
        this.reset;
        this.timeSet = this.calcuateTotalSec()
        this.timeLeft = this.timeSet;
        this.progress;
        progress.style.width = "100%"
    }

    //method for displaying errors
    errorAlert(){
        alert("Invalid Input");
    }

    //countdown method
    countdown(){
        
        this.progressBar();

        //check of the timer
        if(this.hrs === 0 && this.min === 0 && this.sec === 0){
            alert("timer fin");
            this.reset();
            
        }

        if(this.min === 0){
            if(this.hrs > 0 && this.sec === 0){
                this.hrs--;
                this.min = 60;
            }
        }

        if(this.sec === 0){
            if(this.min > 0){
                this.min--;
                this.sec = 60;
            }
        }

        if(this.sec > 0){
            this.sec--;
        }

        userInput[0].value = this.hrs;
        userInput[1].value = this.min;
        userInput[2].value = this.sec;
        

    }

    //method for actively displaying the progress - in development
    progressBar(){
        this.timeLeft;  
        this.timeLeft--;

        progress.style.width = `${parseFloat((this.timeLeft/this.timeSet)*100)}%`
    }

    //function for calculating the total time - in progress
    calcuateTotalSec(){
       let totalHrs = this.hrs*60*60;
       let totalMin = this.min*60;
       return this.sec + totalHrs + totalMin;
    }

    //start countdown method
    start(){
        progress_contain.classList.toggle("progress-active")
        this.start = setInterval(this.countdown.bind(this), 1000)
    }

    //reset timer method
    reset(){
        //resets the timer to the fault values
        this.reset = window.clearInterval(this.start);
        progress_contain.classList.toggle("progress-active")
        progress.style.width = "0%"
        userInput[0].value = null;
        userInput[1].value = null;
        userInput[2].value = null;
        this.hrs = null;
        this.min = null;
        this.sec = null;
        reset.classList.toggle("hidden")
        start.classList.toggle("hidden")
        for(let i = 0; i < userInput.length; i++){
            userInput[i].removeAttribute("readonly","");
            userInput[i].classList.toggle("active");
        }
    }


    
}


//event listener for if the user clicks the start button
start.addEventListener("click", function(){
    let timer1 = null;

    if( userInput[0].value === "" && userInput[1].value === "" && userInput[2].value === ""){
        alert("invalid input")
    }else{
        reset.classList.toggle("hidden")
        start.classList.toggle("hidden")

        for(let i = 0; i < userInput.length; i++){
            userInput[i].setAttribute("readonly","");
            userInput[i].classList.toggle("active");
        }

        let hrs = parseInt(userInput[0].value === "" ? 0 : userInput[0].value);
        let min = parseInt(userInput[1].value === "" ? 0 : userInput[1].value);
        let sec = parseInt(userInput[2].value === "" ? 0 : userInput[2].value);

        timer1 = new Timer(hrs,min,sec);
        timer1.start();
    }
    
    reset.addEventListener("click", function(){
        timer1.reset();
    })
   

})


//event listener for side menu
prefBtn.addEventListener("click", function(){
    sideMenu.classList.toggle("open");
})

//event listener for closing the side menu
sideMenu.addEventListener("click", function(e){    
    if(e.target === sideMenu){
        sideMenu.classList.toggle("open");
    }
})

//event listener for checking if the user has interacted with the input box
timerDisplay.addEventListener("input", function(e){
    if(e.target.tagName === "INPUT"){
        console.log(e.target);
        validateInput(e.target);
    }
})

//function for setting a limit.
const validateInput = function(input){
    if (input.value < 0) input.value = 0;
    if (input.value > 59) input.value = 59;
}



