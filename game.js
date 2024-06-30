const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = []
let started = false
let level = 0
let player_index = 0


let all_divs = document.querySelectorAll('.container ')
let audio_green = document.getElementById('audio-green')
let audio_red = document.getElementById('audio-red')
let audio_yellow = document.getElementById('audio-yellow')
let audio_blue = document.getElementById('audio-blue')
let audio_wrong = document.getElementById('audio-wrong')

document.addEventListener('keypress', () => {

    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${level}`
        generateSequence();
        started = true
    }
    
})
function main(){
    for(let i = 0 ; i<all_divs.length ; i++ ){
        all_divs[i].addEventListener('click',function(event){
            let clicked_button = event.target
            color = clicked_button.id 
            clicked_button.classList.add('pressed')
            playAudio(color)
            console.log(color)
            setTimeout(function(){
                clicked_button.classList.remove('pressed')
            },100)
            check(color)
        })
        
    }
    
    

}
main()


function generateSequence(){
    let random_color = buttonColors[Math.floor(Math.random()*4)]
    gamePattern.push(random_color)
    glowSimonsSequence()
}



function check(color){
    userClickedPattern.push(color)
    if(color === gamePattern[player_index]){
        player_index++
        if (player_index === gamePattern.length){
            
            setTimeout(function() {
                userClickedPattern = [];
                level++;
                player_index = 0;
                document.querySelector("#level-title").textContent = `Level ${level}`;
                generateSequence();
            }, 1000);
        }
        
    }
    else{
        let color_audio = 'wrong'
        let body = document.body
        playAudio(color_audio)
        body.classList.add('game-over')
        setTimeout(function(){
            body.classList.remove('game-over')
            
        },100)
        resetGame()
    
    }
    
        
    
}

function glowSimonsSequence(){
    
    let i = gamePattern.length -1
        let color = gamePattern[i]
        let curr_div = document.querySelector(`#${color}`)
        curr_div.classList.add('pressed')
        setTimeout(function(){
            curr_div.classList.remove('pressed')
        },500)
       
    
}

function playAudio(color){

    if(color === 'red'){
        audio_red.play()
    }
    else if(color === 'green'){
        audio_green.play()
    }
    else if(color === 'blue'){
        audio_blue.play()
    }
    else if(color === 'yellow'){
        audio_yellow.play()
    }
    else if (color === 'wrong'){
        audio_wrong.play()
    }
}







function resetGame(){
    gamePattern = []
    userClickedPattern = []
    level = 0
    player_index = 0
    document.querySelector("#level-title").textContent = `Level ${level}`
    setTimeout(function(){
        generateSequence()
    },1000)
    

}