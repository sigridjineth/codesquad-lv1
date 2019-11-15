//get input
var input = prompt('10개의 단어를 입력하세요. 단어 별 구분은 comma로 합니다.');

//get HTML elements
var word1 = document.getElementById('word1');
var word2 = document.getElementById('word2');
var check = document.getElementById('check');
var buttons = document.getElementById('buttons');

//declare game object
var game = {
    'current': 0,
    'maxPlay': 3
};

game.words = input.split(',');

//choose one word from input, and put characters into HTML
game.choose = function(){
    var index = Math.floor(Math.random() * this.words.length);
    this.answer = this.words[index];
    this.characters = this.answer.split('');
    word1.innerHTML = this.answer;
}

//align button by putting characters into HTML
game.alignbutton = function(){
    for (i=0; i<this.characters.length; i++){
        var newbutton = document.createElement('button');
        newbutton.innerHTML = this.characters[i];
        word2.appendChild(newbutton);
        //this.btns.push(newbutton);
    }
};

game.checkValid = function(){
    return this.answer === this.characters.join("");
};

game.updateValid = function(){
    if (this.checkValid()) {
        check.innerHTML = "일치합니다."
    } else {
        check.innerHTML = "일치하지 않습니다." 
    }
};

game.init = function(){
    this.choose();
    this.alignbutton();
    this.updateValid();
}

game.updatebutton = function(){
    word2.innerHTML = '';
    for (i = 0; i<this.characters.length; i++){
        var newbutton = document.createElement('button');
        newbutton.innerHTML = this.characters[i];
        word2.appendChild(newbutton);
        //this.btns[i].innerHTML = this.characters[i];
        //word2.appendChild(this.btns[i]);
    }
};

game.swap = function(){
    var temp = [];
    while (this.characters.length != 0){
        var s = this.characters.pop();
        temp.push(s);
    }
    this.characters = temp;
    game.updatebutton();
    game.updateValid();
};

game.lshift = function(){
    var s = this.characters.shift();
    this.characters.push(s);
    game.updatebutton();
    game.updateValid();
}

game.rshift = function(){
    var s = this.characters.pop();
    this.characters.unshift(s);
    game.updatebutton();
    game.updateValid();
}

game.shuffle = function(){
    var random = Math.floor(Math.random() * 10);
    if (random == 5){
        this.choose();
    } else if (random < 4) {
        this.lshift();
    } else {
        this.rshift();
    }
};

game.play = function(){
    if (this.checkValid){
        game.init();
        game.shuffle();

        var str = "";
        str += game.current;
        word3.innerHTML = str;

        for (i = 0; i < game.current; i++){
            var str = "";
            str += "O"
        }
        word3.innerHTML = str;
        game.current += 1;
    }

    if (this.current == this.maxPlay){
        alert('Thanks for your playing!');
        break;
    }
};


//main function
var lshift = function(){
    game.lshift();
};

var rshift = function(){
    game.rshift();
};

var swap = function(){
    game.swap();
};

var shuffle = function(){
    game.shuffle();
};


//main function
function main(){
    game.init();
    while (game.current != game.maxPlay){
        game.play();
    }
};

main();