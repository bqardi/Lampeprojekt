document.addEventListener("DOMContentLoaded", event => {
    // #region COMPRESSED CODE (COMPLICATED!!! NOT RONNY FRIENDLY!)

    // const lightChanges = document.querySelectorAll(".light-change");

    // const headerLamp = document.getElementById("header-lamp");

    // for (let i = 0; i < lightChanges.length; i++) {
    //     const lightChanger = lightChanges[i];
    //     lightChanger.addEventListener("click", function(evt){
    //         evt.preventDefault();
    //         removeClasses();
    //         addColor(lightChanger.dataset.color);
    //     });
    // }

    // function removeClasses(){
    //     for (let i = 0; i < lightChanges.length; i++) {
    //         headerLamp.classList.remove(lightChanges[i].dataset.color);
    //         bulbOn.classList.remove(lightChanges[i].dataset.color);
    //     }
    // }
    // function addColor(color){
    //     headerLamp.classList.add(color);
    //     bulbOn.classList.add(color);
    // }
    // #endregion

    //NONE COMPRESSED CODE (SIMPLE TO UNDERSTAND! RONNY FRIENDLY!):


/*      <!-- ********************************************* -->
        <!-- ********************************************* -->
        <!-- ************** Variabler/Constanter ********* -->
        <!-- ********************************************* -->
        <!-- ********************************************* -->       */ 

    // referencer til html elementer

    const lightChangeRed = document.getElementById("light-change-red");
    const lightChangeGreen = document.getElementById("light-change-green");
    const lightChangeBlue = document.getElementById("light-change-blue");
    const lightChangeBluePurple = document.getElementById("light-change-blue-purple");
    const lightChangePurple = document.getElementById("light-change-purple");
    const lightChangeYellow = document.getElementById("light-change-yellow");

    const headerLamp = document.getElementById("header-lamp");
    const lampBulbCircle = document.getElementById("bulb");
    const bulbOn = document.getElementById("bulb-intensity-on");
    const bulbOff = document.getElementById("bulb-intensity-off");
    const sliderBulbOn = document.querySelector("#bulb-intensity-on .light-bulb");

    const slider = document.querySelector("#slider-intensity-adjust input");

    const offButton = document.getElementById("off-button");
    const offButtonOverlay = document.getElementById("off-button-overlay");
    const shutdownOverlay = document.getElementById("shutdown-overlay");
    const headerButtons = document.querySelectorAll(".header-buttons-animation a")

    // 

    let sliderIntervalOn;
    let sliderIntervalOff;
    let sliderValue = 0;
    let sliderMinValue = parseInt(slider.min);
    let sliderMaxValue = parseInt(slider.max);

    // variable/constanter END 


    // IF STATMENT CHECK IF SLIDER IS EXISTING OR INPUTS NULL
    // If statement der checker om slider HTML +elementet eksisterer, ellers vil den være NULL
    // Med andre ord: checker om vi er på bedroom.html (ikke NULL), eller index.html (er NULL)
    // Hvis slider == NULL betyder det at vi IKKE er p¨bedroom.html

    if(slider != null){
        
        // Refactored code + bulbOff/bulbOn lavet mere kompakt og flyttet ud i en function (minMaxIntensity())

        bulbOff.addEventListener("click", function () {
            minMaxIntensity(true);
        } )

        bulbOn.addEventListener("click",function () {
            minMaxIntensity(false);
        })

        for (let i = 0; i < headerButtons.length; i++) {
            headerButtons[i].addEventListener("click",function () {
                headerButtons[i].classList.toggle("active");              
            })
        }


        // RONYY FRIENDLY! Prøvede at lave det om til ovenstënde

        // bulbOff.addEventListener("click", function (){
        //     if (sliderIntervalOn) {
        //         clearInterval(sliderIntervalOn);
        //     }
        //     if (sliderIntervalOff) {
        //         clearInterval(sliderIntervalOff);
        //     }
        //     sliderValue = parseInt(slider.value);
        //     sliderIntervalOff = setInterval(() => {
        //         sliderValue -= 2;
        //         if (sliderValue <= sliderMinValue) {
        //             slider.value = sliderMinValue;
        //             clearInterval(sliderIntervalOff);
        //         }
        //         slider.value = sliderValue;
        //         intensity();
        //     }, 50);
        // });

        // bulbOn.addEventListener("click", function () {
        //     if (sliderIntervalOff) {
        //         clearInterval(sliderIntervalOff);
        //     }
        //     if (sliderIntervalOn) {
        //         clearInterval(sliderIntervalOn);
        //     }
        //     sliderValue = parseInt(slider.value);
        //     sliderIntervalOn = setInterval(() => {
        //         sliderValue += 2;
        //         if (sliderValue >= sliderMaxValue) {
        //             slider.value = sliderMaxValue;
        //             clearInterval(sliderIntervalOn);
        //         }
        //         slider.value = sliderValue;
        //         intensity();
        //     }, 50);
        // })

        // Slideren (input elementet i HTML)
        slider.addEventListener("input", function(){
            if (sliderIntervalOff) {
                clearInterval(sliderIntervalOff);
            }
            if (sliderIntervalOn) {
                clearInterval(sliderIntervalOn);
            }
            intensity();
        });

        //Button for at vise overlay (lille tænd knap)
        offButton.addEventListener("click", function(){
            shutdownOverlay.classList.add("active");
            offButton.classList.remove("active");
        });
        //Overlay (tryk for at fjerne overlay) (STOR tænd knap)
        offButtonOverlay.addEventListener("click", function(){
            shutdownOverlay.classList.remove("active");
            offButton.classList.add("active");
        });

        //Circle buttons (styring af farven på lampen, slideren og bulbOn)
        lightChangeRed.addEventListener("click", function(evt){
            evt.preventDefault();
            removeClasses();
            addColor("red");
        });
        lightChangeGreen.addEventListener("click", function(evt){
            evt.preventDefault();
            removeClasses();
            addColor("green");
        });
        lightChangeBlue.addEventListener("click", function(evt){
            evt.preventDefault();
            removeClasses();
            addColor("blue");
        });
        lightChangeBluePurple.addEventListener("click", function(evt){
            evt.preventDefault();
            removeClasses();
            addColor("blue-purple");
        });
        lightChangePurple.addEventListener("click", function(evt){
            evt.preventDefault();
            removeClasses();
            addColor("purple");
        });
        lightChangeYellow.addEventListener("click", function(evt){
            evt.preventDefault();
            removeClasses();
            addColor("yellow");
        });
       
    }
/*      <!-- ********************************************* -->
        <!-- ********************************************* -->
        <!-- ************** FUNCTIONS  ******************* -->
        <!-- ********************************************* -->
        <!-- ********************************************* -->       */ 

    // funktion som fjerner classes på headerLamp, bulbOn og slider

    function removeClasses(){
        headerLamp.classList.remove("red");
        headerLamp.classList.remove("green");
        headerLamp.classList.remove("blue");
        headerLamp.classList.remove("blue-purple");
        headerLamp.classList.remove("purple");
        headerLamp.classList.remove("yellow");

        bulbOn.classList.remove("red");
        bulbOn.classList.remove("green");
        bulbOn.classList.remove("blue");
        bulbOn.classList.remove("blue-purple");
        bulbOn.classList.remove("purple");
        bulbOn.classList.remove("yellow");

        slider.classList.remove("red");
        slider.classList.remove("green");
        slider.classList.remove("blue");
        slider.classList.remove("blue-purple");
        slider.classList.remove("purple");
        slider.classList.remove("yellow");
    }

    // funktion som tilføjer den valgte class på headerLamp, bulbOn og slider

    function addColor(color){
        headerLamp.classList.add(color);
        bulbOn.classList.add(color);
        slider.classList.add(color);
    }

    //Funktion som sætter intensiteten på headerLamp, bulbOn og slider
    // lampBulbCircle er ID = bulb. ellers tjek variabler

    function intensity() {
        lampBulbCircle.style.opacity = slider.value / 100;
        sliderBulbOn.style.opacity = slider.value / 100;
        slider.style.opacity = slider.value / 100;

    }

    // javascript animation som bevæger slider handtaget den retning hvor der bliver klikket
    // bulbOn bevæger den til højre og bulbOff bevøger den til venstre

    function minMaxIntensity(sliderDirection) {
        if (sliderIntervalOn) {
            clearInterval(sliderIntervalOn);
        }
        if (sliderIntervalOff) {
            clearInterval(sliderIntervalOff);
        }
        sliderValue = parseInt(slider.value);
        sliderIntervalOff = setInterval(() => {
            if (sliderDirection == true) {
                sliderValue -= 2;
                if (sliderValue <= sliderMinValue) {
                    slider.value = sliderMinValue;
                    clearInterval(sliderIntervalOff);
                }
                
            } else {
                sliderValue += 2;
                if (sliderValue >= sliderMaxValue) {
                    slider.value = sliderMaxValue;
                    clearInterval(sliderIntervalOff);
                }
            }
            slider.value = sliderValue;
            intensity();
        }, 50);
    }

});



