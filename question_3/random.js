//get input
var input = prompt('10개의 단어를 입력하세요. 단어 별 구분은 comma로 합니다.');

//get HTML elements
var word1 = document.getElementById('word1');
var word2 = document.getElementById('word2');
var check = document.getElementById('check');
var buttons = document.getElementById('buttons');
var time = document.getElementById('time');

//declare game object
var game = {
    'current': 0,
    'maxPlay': 3
};

//get time
game.startTime = Date.now();
var updateTime = function() {
    var now = Date.now() - game.startTime;
    time.innerHTML = (now / 1000) + "s";
}

//get word input
game.words = input.split(',');

//choose one word from input, and put characters into HTML
game.choose = function() {
    var index = Math.floor(Math.random() * this.words.length);
    this.answer = this.words[index];
    this.characters = this.answer.split('');
    word1.innerHTML = this.answer;
}

//align button by putting characters into HTML
game.alignbutton = function() {
    for (i = 0; i < this.characters.length; i++) {
        var newbutton = document.createElement('button');
        newbutton.innerHTML = this.characters[i];
        word2.appendChild(newbutton);
        //this.btns.push(newbutton);
    }
};

game.checkValid = function() {
    return this.answer === this.characters.join("");
};

game.updateValid = function() {
    if (this.checkValid()) {
        check.innerHTML = "일치합니다."
    } else {
        check.innerHTML = "일치하지 않습니다."
    }
};

game.init = function() {
    this.choose();
    this.alignbutton();
    this.updateValid();
}

game.updatebutton = function() {
    word2.innerHTML = '';
    for (i = 0; i < this.characters.length; i++) {
        var newbutton = document.createElement('button');
        newbutton.innerHTML = this.characters[i];
        word2.appendChild(newbutton);
        //this.btns[i].innerHTML = this.characters[i];
        //word2.appendChild(this.btns[i]);
    }
};

game.swap = function() {
    var temp = [];
    while (this.characters.length != 0) {
        var s = this.characters.pop();
        temp.push(s);
    }
    this.characters = temp;
    game.updatebutton();
    game.updateValid();
};

game.lshift = function() {
    var s = this.characters.shift();
    this.characters.push(s);
    game.updatebutton();
    game.updateValid();
}

game.rshift = function() {
    var s = this.characters.pop();
    this.characters.unshift(s);
    game.updatebutton();
    game.updateValid();
}

game.shuffle = function() {
    var random = Math.floor(Math.random() * 10);
    if (random == 5) {
        this.choose();
    } else if (random < 4) {
        this.lshift();
    } else {
        this.rshift();
    }
};

game.progress = function() {
    var str = "";
    game.current += 1;
    for (i = 0; i < game.current; i++) {
        str += "O"
    };
    word3.innerHTML = str;
};

game.play = function() {
    if (this.checkValid()) {
        game.progress();
        game.choose();
        game.shuffle();
        game.updatebutton();
    };

    if (game.current == game.maxPlay) {
        alert('Thanks for your playing!');
        var now = Date.now() - game.startTime;
        alert('Good, your record is' + now + ' ms');
        clearInterval(time);
    };
};


//main function
var lshift = function() {
    game.lshift();
    game.play();
};

var rshift = function() {
    game.rshift();
    game.play();
};

var swap = function() {
    game.swap();
    game.play();
};

var shuffle = function() {
    game.shuffle();
    game.play();
};


//main function
function main() {
    game.init();
    game.shuffle();
};
main();
setInterval(updateTime, 50);