var Operator = function Operator(apr, idx) {
    this.apr = apr;
    this.idx = idx;
    this.sort = function(a, b) {
        return a[idx] - b[idx];
    };
};

var input = {};

input.init = function() {
    var getInput = document.getElementById("input");
    this.str = getInput.value;

    var plus = new Operator("+", this.str.indexOf("+"));
    var minus = new Operator("-", this.str.indexOf("-"));
    var multiply = new Operator("*", this.str.indexOf("*"));
    var divide = new Operator("/", this.str.indexOf("/"));
};

input.classify = function() {
    this.valuelist = [];
    this.operatorlist = [];
    this.operatoridxlist = [];

    for (var keys in Operator) {
        var ops = Operator[keys];

        if (ops.idx == -1) {
            continue;
        }
        this.operatorlist.push(ops.apr);
        this.operatoridxlist.push(ops.idx);
    }

    for (i = 0; i <= this.operatorlist.length - 1; i++) {
        var temp = this.str().slice(0, opidx[i]);
        this.valuelist.push(temp);
        this.str.replace(temp, "");
        var first = number.slice(0, 1);
        this.str.replace(first, "");
    };
    this.valuelist.push(this.str);
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
        }
    }
}

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
    this.out.innerHTML = "최종 결과값은" + value + "입니다.";
};

function main() {
    input.init();
    Operator.sort();
    input.classify();
    while (input.operatorlist.length != 0) {
        calculator.order();
        output.print(calculator.calculate());
    }
}
main();