function createClass(className, superClassList) {
    return myClass = {
        __proto__: null,
        className,
        superClassList,

        call: function (name, parameters) {
            for(let prop in this){
                if(prop === name)
                    return this[prop](parameters);
            }

            for(let classObj of this.superClassList){
                var result = classObj.call(name, parameters);
                if(result !== undefined) return result;
            }
        },

        new: function(){
            return {
                __proto__: this,
            };
        },
    }
}


//class tests below
var class0 = createClass("Class0", null);
class0.func = function (arg) {
    return "func0: " + arg;
};
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function (arg) {
    return "func2: " + arg;
};
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();

var result = obj3.call("func", ["hello"]);
//console.log(class3)
console.log("1: " + result)

//where ’result’is assigned’func0: hello’. Another example of method lookuptesting:
class0 = createClass("Class0", null);
class0.func = function (arg) {
    return "func0: " + arg;
};
class1 = createClass("Class1", [class0]);
class2 = createClass("Class2", []);
class3 = createClass("Class3", [class2, class1]);

obj3 = class3.new();
result = obj3.call("func", ["hello"]);
console.log("2: " + result)

//where’result’is assigned’func0: hello’. Another example of method lookup testing that the method will be foundin the object’s own class:
class0 = createClass("Class0", []);
class0.func = function (arg) {
    return "func0: " + arg;
};
var obj0 = class0.new();
result = obj0.call("func", ["hello"]);
console.log("3: " + result)
//where’result’is assigned’func0: hello


