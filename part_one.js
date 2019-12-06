let myObject = {
    create: function (prototypeList) {
        let newObj = Object.create(this);
        newObj.prototypeList = prototypeList;
        return newObj;
    },

    call: function (funcName, parameters) {
        if (this.hasOwnProperty(funcName))
            return this[funcName](parameters);

        for (let proto of this.prototypeList) {
            let result = proto.call(funcName, parameters);
            if (result !== undefined) return result;
        }
    },

    addPrototype: function (prototype) {
        if (prototype.hasPrototype(this) || this == prototype) {
            //console.log("Cyclical inheritance");
            throw new Error("Cyclical inheritance");
        } else {
            if (this.prototypeList === null) {
                this.prototypeList = [prototype];
            } else {
                this.prototypeList.push(prototype);
            }
        }

    },

    hasPrototype: function (prototype) {
        if (this.prototypeList === null)
            return false;
        for (let proto of this.prototypeList) {
            if (proto === prototype)
                return true;
            if (proto.hasPrototype(prototype))
                return true;
        }
        return false;
    },
};


obj0 = myObject.create(null);
obj0.func = function (arg) {
    return "func0: " + arg;
};
result = obj0.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

obj0 = myObject.create(null, 'obj0');
obj0.func = function (arg) {
    return "func0: " + arg;
};
obj1 = myObject.create([obj0], 'obj1');
obj2 = myObject.create([], 'obj2');
obj3 = myObject.create([obj2, obj1], 'obj3');
result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

var obj0 = myObject.create(null);
obj0.func = function (arg) {
    return "func0: " + arg;
};
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
obj2.func = function (arg) {
    return "func2: " + arg;
};
var obj3 = myObject.create([obj1, obj2]);
var result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

var obj0 = myObject.create(null);
var obj1 = myObject.create([obj0]);
obj0.addPrototype(obj1);