var Operator = function(apr, idx) {
    this.apr = apr;
    this.idx = idx;
};

var input = {};

input.init = function() {
    var getInput = document.getElementById("input");
    this.str = getInput.value;

    this.plus = new Operator("+", this.str.indexOf("+"));
    this.minus = new Operator("-", this.str.indexOf("-"));
    this.multiply = new Operator("*", this.str.indexOf("*"));
    this.divide = new Operator("/", this.str.indexOf("/"));

    this.operators = [this.plus, this.minus, this.multiply, this.divide];

};

input.classify = function() {
    this.valuelist = [];
    this.operatorlist = [];
    this.operatoridxlist = [];

    for (i = 0; i < this.operators.length; i++) {
        //classifying operators
        var ops = this.operators[i]["apr"];
        var opsidx = this.operators[i]["idx"];
        if (opsidx == -1) {
            continue;
        };
        this.operatorlist.push(ops);
        this.operatoridxlist.push(opsidx);

        //classifying valuelists
        var temp = this.str.splice(0, opsidx);
        console.log(temp);
        this.valuelist.push(temp);
        this.str.replace(temp, "");
    };

    //processing the last of first number
    var first = this.str.splice(0, 1);
    this.str.replace(first, "");
    this.valuelist.push(first);
};

var calculator = {};

calculator.order = function() {
    for (j = 1; j <= input.operatorlist.length; j++) {
        if (input.operatorlist[j] === "*" || input.operatorlist[j] === "/") {
            //reordering operator
            input.operatorlist.unshift(input.operatorlist[j]);
            input.operatorlist.splice(j + 1, 1);
            //reordering value 1
            input.valuelist.unshift(input.valuelist[j - 1]);
            input.operatorlist.splice(j + 1, 1);
            //reordering value 2
            input.valuelist.unshift(input.valuelist[j + 1]);
            input.operatorlist.splice(j + 2, 1);
        } else {
            continue;
        };
    };
};

calculator.calculate = function() {
    var ret;
    do {
        var op = input.operatorlist.shift();
        var value1 = input.valuelist.shift();
        var value2 = input.valuelist.shift();
        switch (op) {
            case "+":
                ret = value1 + value2;
                break;
            case "-":
                ret = value1 - value2;
                break;
            case "/":
                ret = value1 / value2;
                break;
            case "*":
                ret = value1 * value2;
                break;
            default:
                return NaN;
        }
        input.valuelist.unshift(ret);
    } while (input.operatorlist.length != 0);
    return ret;
}

var output = {};
output.out = document.getElementById('output');

output.print = function(value) {
    this.out.innerHTML = "계산 결과값은 " + value + " 입니다.";
};

function main() {
    input.init();
    //Operator.sort(Operator());
    input.classify();
    //while (input.operatorlist.length != 0) {
    //    calculator.order();
    //    output.print(calculator.calculate());
    //}
};
main();