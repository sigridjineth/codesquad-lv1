var readInput = function(){
    var input = document.getElementById('input1');
    var c = input.value;
    var d = input.value.split("");
    console.log(d);
}

var btn2 = document.createElement('button');
btn2.innerHTML = "Button2"
btn2.onclick = readInput;
var test = document.getElementById('test');
test.appendChild(document.createElement('br'));
test.appendChild(btn2);