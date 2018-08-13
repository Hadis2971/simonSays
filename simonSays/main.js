var red = document.getElementById("red"),
    blue = document.getElementById("blue"),
    green = document.getElementById("green"),
    yellow = document.getElementById("yellow");

var start_button = document.getElementById("start");
var onOff_btn = document.getElementsByClassName("slider")[0];
var on_off = false;
var strict_btn = document.getElementById("strict");
var strict = false;


var r = document.getElementById("r");

var app_data = {
    random_arr : [],
    brojac : 3,
    user_arr : [],
    result: 0
}

var init, init2, limiter = app_data.brojac, timeOut, glow_same_brojac = 0;


function stop_glow(){
            red.style.boxShadow = "none";
            red.style.backgroundColor = "#b30000";
            blue.style.boxShadow = "none";
            blue.style.backgroundColor = "#0000b3";
            green.style.boxShadow = "none";
            green.style.backgroundColor = "#008000";
            yellow.style.boxShadow = "none";
            yellow.style.backgroundColor = "#b3b300";
}


function get_glow(idx){
    if(on_off){
        switch(idx){
            case(0): red.style.backgroundColor = "red";break;
            case(1): blue.style.backgroundColor = "blue";break;
            case(2): green.style.backgroundColor = "#00cc00"; break;
            case(3): yellow.style.backgroundColor = "yellow"; break;
    }
    
        setTimeout(stop_glow,500);
    }else{return;}
    
}

function glow(){
    if(on_off){
        if(!limiter){
        app_data.brojac++;
            clearInterval(init);
        }else{
            var x = Math.floor(Math.random() * 4);
            app_data.random_arr.push(x);
           timeOut = setTimeout(function(){
                get_glow(x);
            },500);
           --limiter;
        }    
    }else{return;}
    
}

function glow_same(){
    if(!limiter){
        clearInterval(init2);
    }else{
       get_glow(app_data.random_arr[glow_same_brojac]);
       --limiter;
        glow_same_brojac++;
    }
}

function start_glow_same(){
    if(strict){
        app_data.random_arr = [];
        app_data.user_arr = [];
        glow_same_brojac = 0;
        app_data.brojac = 3;
        app_data.result = 0;
        r.textContent = "00";
        clearInterval(init);
        clearInterval(init2);
        return;
    }else{
        if(on_off){
            app_data.user_arr = [];
            glow_same_brojac = 0;
            limiter = app_data.random_arr.length;
            init2 = setInterval(glow_same,1000);
        }else{
            return;
        }
    }
    
    
}

function user_input(num){
    if(on_off){
       app_data.user_arr.push(num);
        if(app_data.user_arr.length === app_data.brojac-1){
            check_arr();
        } 
    }else{
        return;
    }
    
}

function check_arr(){
    var i, counter = 0;
    if(on_off){
        for(i = 0; i < app_data.random_arr.length; i++){
        if(app_data.random_arr[i] === app_data.user_arr[i]){
            counter++;
        }
    }
    
        if(counter === app_data.random_arr.length){
            app_data.random_arr = [];
            app_data.user_arr = [];
            glow_same_brojac = 0;
            app_data.result++;
            r.textContent = (app_data.result < 10)? "0" + app_data.result :
            app_data.result;
            start_glow();
        }else{
            start_glow_same();
        }
    }else{return;}
    
}

function change_on_off(){
    if(on_off){
        on_off = false;
    }else{
        on_off = true;
    }
}

function change_strict(){
    if(strict){
        strict = false;
    }else{
        strict = true;
    }
}

function start_glow(){
    if(on_off){
        limiter = app_data.brojac;
        init = setInterval(glow,1000);
    }else{
        return;
    }
    
}

function clear_intervals(){
    clearInterval(init);
    clearInterval(init2);
}

start_button.addEventListener("click",start_glow);


red.addEventListener("click",function(){
if(!limiter && on_off){
    user_input(0);
    get_glow(0);
}
});
blue.addEventListener("click",function(){
if(!limiter && on_off){
    user_input(1);
    get_glow(1);
}
});
green.addEventListener("click",function(){
if(!limiter && on_off){
    user_input(2);
    get_glow(2);
}
});
yellow.addEventListener("click",function(){
if(!limiter && on_off){
    user_input(3);
    get_glow(3);
}
});

onOff_btn.addEventListener("click",change_on_off);
strict_btn.addEventListener("click",change_strict);












