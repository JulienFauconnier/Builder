(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("regenerator-runtime/runtime");

require("core-js/fn/regexp/escape");

/* eslint max-len: 0 */

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

// Should be removed in the next major release:

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"core-js/fn/regexp/escape":2,"core-js/shim":296,"regenerator-runtime/runtime":298}],2:[function(require,module,exports){
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;
},{"../../modules/_core":23,"../../modules/core.regexp.escape":120}],3:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],4:[function(require,module,exports){
var cof = require('./_cof');
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};
},{"./_cof":18}],5:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./_hide":40,"./_wks":117}],6:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],7:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":49}],8:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"./_to-index":105,"./_to-length":108,"./_to-object":109}],9:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"./_to-index":105,"./_to-length":108,"./_to-object":109}],10:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":37}],11:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":105,"./_to-iobject":107,"./_to-length":108}],12:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./_ctx')
  , IObject  = require('./_iobject')
  , toObject = require('./_to-object')
  , toLength = require('./_to-length')
  , asc      = require('./_array-species-create');
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./_array-species-create":15,"./_ctx":25,"./_iobject":45,"./_to-length":108,"./_to-object":109}],13:[function(require,module,exports){
var aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , IObject   = require('./_iobject')
  , toLength  = require('./_to-length');

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};
},{"./_a-function":3,"./_iobject":45,"./_to-length":108,"./_to-object":109}],14:[function(require,module,exports){
var isObject = require('./_is-object')
  , isArray  = require('./_is-array')
  , SPECIES  = require('./_wks')('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};
},{"./_is-array":47,"./_is-object":49,"./_wks":117}],15:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};
},{"./_array-species-constructor":14}],16:[function(require,module,exports){
'use strict';
var aFunction  = require('./_a-function')
  , isObject   = require('./_is-object')
  , invoke     = require('./_invoke')
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};
},{"./_a-function":3,"./_invoke":44,"./_is-object":49}],17:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":18,"./_wks":117}],18:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],19:[function(require,module,exports){
'use strict';
var dP          = require('./_object-dp').f
  , create      = require('./_object-create')
  , hide        = require('./_hide')
  , redefineAll = require('./_redefine-all')
  , ctx         = require('./_ctx')
  , anInstance  = require('./_an-instance')
  , defined     = require('./_defined')
  , forOf       = require('./_for-of')
  , $iterDefine = require('./_iter-define')
  , step        = require('./_iter-step')
  , setSpecies  = require('./_set-species')
  , DESCRIPTORS = require('./_descriptors')
  , fastKey     = require('./_meta').fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./_an-instance":6,"./_ctx":25,"./_defined":27,"./_descriptors":28,"./_for-of":37,"./_hide":40,"./_iter-define":53,"./_iter-step":55,"./_meta":62,"./_object-create":66,"./_object-dp":67,"./_redefine-all":86,"./_set-species":91}],20:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof')
  , from    = require('./_array-from-iterable');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"./_array-from-iterable":10,"./_classof":17}],21:[function(require,module,exports){
'use strict';
var redefineAll       = require('./_redefine-all')
  , getWeak           = require('./_meta').getWeak
  , anObject          = require('./_an-object')
  , isObject          = require('./_is-object')
  , anInstance        = require('./_an-instance')
  , forOf             = require('./_for-of')
  , createArrayMethod = require('./_array-methods')
  , $has              = require('./_has')
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"./_an-instance":6,"./_an-object":7,"./_array-methods":12,"./_for-of":37,"./_has":39,"./_is-object":49,"./_meta":62,"./_redefine-all":86}],22:[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , $export           = require('./_export')
  , redefine          = require('./_redefine')
  , redefineAll       = require('./_redefine-all')
  , meta              = require('./_meta')
  , forOf             = require('./_for-of')
  , anInstance        = require('./_an-instance')
  , isObject          = require('./_is-object')
  , fails             = require('./_fails')
  , $iterDetect       = require('./_iter-detect')
  , setToStringTag    = require('./_set-to-string-tag')
  , inheritIfRequired = require('./_inherit-if-required');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./_an-instance":6,"./_export":32,"./_fails":34,"./_for-of":37,"./_global":38,"./_inherit-if-required":43,"./_is-object":49,"./_iter-detect":54,"./_meta":62,"./_redefine":87,"./_redefine-all":86,"./_set-to-string-tag":92}],23:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],24:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp')
  , createDesc      = require('./_property-desc');

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"./_object-dp":67,"./_property-desc":85}],25:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":3}],26:[function(require,module,exports){
'use strict';
var anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive')
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};
},{"./_an-object":7,"./_to-primitive":110}],27:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],28:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":34}],29:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":38,"./_is-object":49}],30:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],31:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":73,"./_object-keys":76,"./_object-pie":77}],32:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , hide      = require('./_hide')
  , redefine  = require('./_redefine')
  , ctx       = require('./_ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":23,"./_ctx":25,"./_global":38,"./_hide":40,"./_redefine":87}],33:[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"./_wks":117}],34:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],35:[function(require,module,exports){
'use strict';
var hide     = require('./_hide')
  , redefine = require('./_redefine')
  , fails    = require('./_fails')
  , defined  = require('./_defined')
  , wks      = require('./_wks');

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};
},{"./_defined":27,"./_fails":34,"./_hide":40,"./_redefine":87,"./_wks":117}],36:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"./_an-object":7}],37:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":7,"./_ctx":25,"./_is-array-iter":46,"./_iter-call":51,"./_to-length":108,"./core.get-iterator-method":118}],38:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],39:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],40:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":28,"./_object-dp":67,"./_property-desc":85}],41:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":38}],42:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":28,"./_dom-create":29,"./_fails":34}],43:[function(require,module,exports){
var isObject       = require('./_is-object')
  , setPrototypeOf = require('./_set-proto').set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};
},{"./_is-object":49,"./_set-proto":90}],44:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],45:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":18}],46:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":56,"./_wks":117}],47:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":18}],48:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./_is-object":49}],49:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],50:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object')
  , cof      = require('./_cof')
  , MATCH    = require('./_wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./_cof":18,"./_is-object":49,"./_wks":117}],51:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":7}],52:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":40,"./_object-create":66,"./_property-desc":85,"./_set-to-string-tag":92,"./_wks":117}],53:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":32,"./_has":39,"./_hide":40,"./_iter-create":52,"./_iterators":56,"./_library":58,"./_object-gpo":74,"./_redefine":87,"./_set-to-string-tag":92,"./_wks":117}],54:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":117}],55:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],56:[function(require,module,exports){
module.exports = {};
},{}],57:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":76,"./_to-iobject":107}],58:[function(require,module,exports){
module.exports = false;
},{}],59:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;
},{}],60:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],61:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],62:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":34,"./_has":39,"./_is-object":49,"./_object-dp":67,"./_uid":114}],63:[function(require,module,exports){
var Map     = require('./es6.map')
  , $export = require('./_export')
  , shared  = require('./_shared')('metadata')
  , store   = shared.store || (shared.store = new (require('./es6.weak-map')));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};
},{"./_export":32,"./_shared":94,"./es6.map":150,"./es6.weak-map":256}],64:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":18,"./_global":38,"./_task":104}],65:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":34,"./_iobject":45,"./_object-gops":73,"./_object-keys":76,"./_object-pie":77,"./_to-object":109}],66:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};
},{"./_an-object":7,"./_dom-create":29,"./_enum-bug-keys":30,"./_html":41,"./_object-dps":68,"./_shared-key":93}],67:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":7,"./_descriptors":28,"./_ie8-dom-define":42,"./_to-primitive":110}],68:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":7,"./_descriptors":28,"./_object-dp":67,"./_object-keys":76}],69:[function(require,module,exports){
// Forced replacement prototype accessors methods
module.exports = require('./_library')|| !require('./_fails')(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete require('./_global')[K];
});
},{"./_fails":34,"./_global":38,"./_library":58}],70:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":28,"./_has":39,"./_ie8-dom-define":42,"./_object-pie":77,"./_property-desc":85,"./_to-iobject":107,"./_to-primitive":110}],71:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":72,"./_to-iobject":107}],72:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":30,"./_object-keys-internal":75}],73:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],74:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":39,"./_shared-key":93,"./_to-object":109}],75:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":11,"./_has":39,"./_shared-key":93,"./_to-iobject":107}],76:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":30,"./_object-keys-internal":75}],77:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],78:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":23,"./_export":32,"./_fails":34}],79:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject')
  , isEnum    = require('./_object-pie').f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./_object-keys":76,"./_object-pie":77,"./_to-iobject":107}],80:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN     = require('./_object-gopn')
  , gOPS     = require('./_object-gops')
  , anObject = require('./_an-object')
  , Reflect  = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./_an-object":7,"./_global":38,"./_object-gopn":72,"./_object-gops":73}],81:[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat
  , $trim       = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
},{"./_global":38,"./_string-trim":102,"./_string-ws":103}],82:[function(require,module,exports){
var $parseInt = require('./_global').parseInt
  , $trim     = require('./_string-trim').trim
  , ws        = require('./_string-ws')
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;
},{"./_global":38,"./_string-trim":102,"./_string-ws":103}],83:[function(require,module,exports){
'use strict';
var path      = require('./_path')
  , invoke    = require('./_invoke')
  , aFunction = require('./_a-function');
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"./_a-function":3,"./_invoke":44,"./_path":84}],84:[function(require,module,exports){
module.exports = require('./_global');
},{"./_global":38}],85:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],86:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};
},{"./_redefine":87}],87:[function(require,module,exports){
var global    = require('./_global')
  , hide      = require('./_hide')
  , has       = require('./_has')
  , SRC       = require('./_uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./_core":23,"./_global":38,"./_has":39,"./_hide":40,"./_uid":114}],88:[function(require,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],89:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],90:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":7,"./_ctx":25,"./_is-object":49,"./_object-gopd":70}],91:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_descriptors":28,"./_global":38,"./_object-dp":67,"./_wks":117}],92:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":39,"./_object-dp":67,"./_wks":117}],93:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":94,"./_uid":114}],94:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":38}],95:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":3,"./_an-object":7,"./_wks":117}],96:[function(require,module,exports){
var fails = require('./_fails');

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};
},{"./_fails":34}],97:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":27,"./_to-integer":106}],98:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp')
  , defined  = require('./_defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./_defined":27,"./_is-regexp":50}],99:[function(require,module,exports){
var $export = require('./_export')
  , fails   = require('./_fails')
  , defined = require('./_defined')
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};
},{"./_defined":27,"./_export":32,"./_fails":34}],100:[function(require,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length')
  , repeat   = require('./_string-repeat')
  , defined  = require('./_defined');

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_defined":27,"./_string-repeat":101,"./_to-length":108}],101:[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./_defined":27,"./_to-integer":106}],102:[function(require,module,exports){
var $export = require('./_export')
  , defined = require('./_defined')
  , fails   = require('./_fails')
  , spaces  = require('./_string-ws')
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./_defined":27,"./_export":32,"./_fails":34,"./_string-ws":103}],103:[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
},{}],104:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":18,"./_ctx":25,"./_dom-create":29,"./_global":38,"./_html":41,"./_invoke":44}],105:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":106}],106:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],107:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":27,"./_iobject":45}],108:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":106}],109:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":27}],110:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":49}],111:[function(require,module,exports){
'use strict';
if(require('./_descriptors')){
  var LIBRARY             = require('./_library')
    , global              = require('./_global')
    , fails               = require('./_fails')
    , $export             = require('./_export')
    , $typed              = require('./_typed')
    , $buffer             = require('./_typed-buffer')
    , ctx                 = require('./_ctx')
    , anInstance          = require('./_an-instance')
    , propertyDesc        = require('./_property-desc')
    , hide                = require('./_hide')
    , redefineAll         = require('./_redefine-all')
    , isInteger           = require('./_is-integer')
    , toInteger           = require('./_to-integer')
    , toLength            = require('./_to-length')
    , toIndex             = require('./_to-index')
    , toPrimitive         = require('./_to-primitive')
    , has                 = require('./_has')
    , same                = require('./_same-value')
    , classof             = require('./_classof')
    , isObject            = require('./_is-object')
    , toObject            = require('./_to-object')
    , isArrayIter         = require('./_is-array-iter')
    , create              = require('./_object-create')
    , getPrototypeOf      = require('./_object-gpo')
    , gOPN                = require('./_object-gopn').f
    , isIterable          = require('./core.is-iterable')
    , getIterFn           = require('./core.get-iterator-method')
    , uid                 = require('./_uid')
    , wks                 = require('./_wks')
    , createArrayMethod   = require('./_array-methods')
    , createArrayIncludes = require('./_array-includes')
    , speciesConstructor  = require('./_species-constructor')
    , ArrayIterators      = require('./es6.array.iterator')
    , Iterators           = require('./_iterators')
    , $iterDetect         = require('./_iter-detect')
    , setSpecies          = require('./_set-species')
    , arrayFill           = require('./_array-fill')
    , arrayCopyWithin     = require('./_array-copy-within')
    , $DP                 = require('./_object-dp')
    , $GOPD               = require('./_object-gopd')
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };
},{"./_an-instance":6,"./_array-copy-within":8,"./_array-fill":9,"./_array-includes":11,"./_array-methods":12,"./_classof":17,"./_ctx":25,"./_descriptors":28,"./_export":32,"./_fails":34,"./_global":38,"./_has":39,"./_hide":40,"./_is-array-iter":46,"./_is-integer":48,"./_is-object":49,"./_iter-detect":54,"./_iterators":56,"./_library":58,"./_object-create":66,"./_object-dp":67,"./_object-gopd":70,"./_object-gopn":72,"./_object-gpo":74,"./_property-desc":85,"./_redefine-all":86,"./_same-value":89,"./_set-species":91,"./_species-constructor":95,"./_to-index":105,"./_to-integer":106,"./_to-length":108,"./_to-object":109,"./_to-primitive":110,"./_typed":113,"./_typed-buffer":112,"./_uid":114,"./_wks":117,"./core.get-iterator-method":118,"./core.is-iterable":119,"./es6.array.iterator":131}],112:[function(require,module,exports){
'use strict';
var global         = require('./_global')
  , DESCRIPTORS    = require('./_descriptors')
  , LIBRARY        = require('./_library')
  , $typed         = require('./_typed')
  , hide           = require('./_hide')
  , redefineAll    = require('./_redefine-all')
  , fails          = require('./_fails')
  , anInstance     = require('./_an-instance')
  , toInteger      = require('./_to-integer')
  , toLength       = require('./_to-length')
  , gOPN           = require('./_object-gopn').f
  , dP             = require('./_object-dp').f
  , arrayFill      = require('./_array-fill')
  , setToStringTag = require('./_set-to-string-tag')
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , parseInt       = global.parseInt
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , min            = Math.min
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
},{"./_an-instance":6,"./_array-fill":9,"./_descriptors":28,"./_fails":34,"./_global":38,"./_hide":40,"./_library":58,"./_object-dp":67,"./_object-gopn":72,"./_redefine-all":86,"./_set-to-string-tag":92,"./_to-integer":106,"./_to-length":108,"./_typed":113}],113:[function(require,module,exports){
var global = require('./_global')
  , hide   = require('./_hide')
  , uid    = require('./_uid')
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};
},{"./_global":38,"./_hide":40,"./_uid":114}],114:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],115:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":23,"./_global":38,"./_library":58,"./_object-dp":67,"./_wks-ext":116}],116:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":117}],117:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":38,"./_shared":94,"./_uid":114}],118:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":17,"./_core":23,"./_iterators":56,"./_wks":117}],119:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./_classof":17,"./_core":23,"./_iterators":56,"./_wks":117}],120:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export')
  , $re     = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"./_export":32,"./_replacer":88}],121:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {copyWithin: require('./_array-copy-within')});

require('./_add-to-unscopables')('copyWithin');
},{"./_add-to-unscopables":5,"./_array-copy-within":8,"./_export":32}],122:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $every  = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":32,"./_strict-method":96}],123:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {fill: require('./_array-fill')});

require('./_add-to-unscopables')('fill');
},{"./_add-to-unscopables":5,"./_array-fill":9,"./_export":32}],124:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":32,"./_strict-method":96}],125:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":5,"./_array-methods":12,"./_export":32}],126:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":5,"./_array-methods":12,"./_export":32}],127:[function(require,module,exports){
'use strict';
var $export  = require('./_export')
  , $forEach = require('./_array-methods')(0)
  , STRICT   = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":32,"./_strict-method":96}],128:[function(require,module,exports){
'use strict';
var ctx            = require('./_ctx')
  , $export        = require('./_export')
  , toObject       = require('./_to-object')
  , call           = require('./_iter-call')
  , isArrayIter    = require('./_is-array-iter')
  , toLength       = require('./_to-length')
  , createProperty = require('./_create-property')
  , getIterFn      = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":24,"./_ctx":25,"./_export":32,"./_is-array-iter":46,"./_iter-call":51,"./_iter-detect":54,"./_to-length":108,"./_to-object":109,"./core.get-iterator-method":118}],129:[function(require,module,exports){
'use strict';
var $export       = require('./_export')
  , $indexOf      = require('./_array-includes')(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});
},{"./_array-includes":11,"./_export":32,"./_strict-method":96}],130:[function(require,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', {isArray: require('./_is-array')});
},{"./_export":32,"./_is-array":47}],131:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":5,"./_iter-define":53,"./_iter-step":55,"./_iterators":56,"./_to-iobject":107}],132:[function(require,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});
},{"./_export":32,"./_iobject":45,"./_strict-method":96,"./_to-iobject":107}],133:[function(require,module,exports){
'use strict';
var $export       = require('./_export')
  , toIObject     = require('./_to-iobject')
  , toInteger     = require('./_to-integer')
  , toLength      = require('./_to-length')
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});
},{"./_export":32,"./_strict-method":96,"./_to-integer":106,"./_to-iobject":107,"./_to-length":108}],134:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $map    = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":32,"./_strict-method":96}],135:[function(require,module,exports){
'use strict';
var $export        = require('./_export')
  , createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});
},{"./_create-property":24,"./_export":32,"./_fails":34}],136:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});
},{"./_array-reduce":13,"./_export":32,"./_strict-method":96}],137:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});
},{"./_array-reduce":13,"./_export":32,"./_strict-method":96}],138:[function(require,module,exports){
'use strict';
var $export    = require('./_export')
  , html       = require('./_html')
  , cof        = require('./_cof')
  , toIndex    = require('./_to-index')
  , toLength   = require('./_to-length')
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
},{"./_cof":18,"./_export":32,"./_fails":34,"./_html":41,"./_to-index":105,"./_to-length":108}],139:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $some   = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":32,"./_strict-method":96}],140:[function(require,module,exports){
'use strict';
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , fails     = require('./_fails')
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});
},{"./_a-function":3,"./_export":32,"./_fails":34,"./_strict-method":96,"./_to-object":109}],141:[function(require,module,exports){
require('./_set-species')('Array');
},{"./_set-species":91}],142:[function(require,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});
},{"./_export":32}],143:[function(require,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export')
  , fails   = require('./_fails')
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"./_export":32,"./_fails":34}],144:[function(require,module,exports){
'use strict';
var $export     = require('./_export')
  , toObject    = require('./_to-object')
  , toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});
},{"./_export":32,"./_fails":34,"./_to-object":109,"./_to-primitive":110}],145:[function(require,module,exports){
var TO_PRIMITIVE = require('./_wks')('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));
},{"./_date-to-primitive":26,"./_hide":40,"./_wks":117}],146:[function(require,module,exports){
var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  require('./_redefine')(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}
},{"./_redefine":87}],147:[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', {bind: require('./_bind')});
},{"./_bind":16,"./_export":32}],148:[function(require,module,exports){
'use strict';
var isObject       = require('./_is-object')
  , getPrototypeOf = require('./_object-gpo')
  , HAS_INSTANCE   = require('./_wks')('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))require('./_object-dp').f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});
},{"./_is-object":49,"./_object-dp":67,"./_object-gpo":74,"./_wks":117}],149:[function(require,module,exports){
var dP         = require('./_object-dp').f
  , createDesc = require('./_property-desc')
  , has        = require('./_has')
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});
},{"./_descriptors":28,"./_has":39,"./_object-dp":67,"./_property-desc":85}],150:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.1 Map Objects
module.exports = require('./_collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./_collection":22,"./_collection-strong":19}],151:[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export')
  , log1p   = require('./_math-log1p')
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"./_export":32,"./_math-log1p":60}],152:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export')
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});
},{"./_export":32}],153:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export')
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./_export":32}],154:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export')
  , sign    = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./_export":32,"./_math-sign":61}],155:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./_export":32}],156:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./_export":32}],157:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export')
  , $expm1  = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});
},{"./_export":32,"./_math-expm1":59}],158:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = require('./_export')
  , sign      = require('./_math-sign')
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"./_export":32,"./_math-sign":61}],159:[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export')
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"./_export":32}],160:[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export')
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"./_export":32,"./_fails":34}],161:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./_export":32}],162:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', {log1p: require('./_math-log1p')});
},{"./_export":32,"./_math-log1p":60}],163:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./_export":32}],164:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', {sign: require('./_math-sign')});
},{"./_export":32,"./_math-sign":61}],165:[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"./_export":32,"./_fails":34,"./_math-expm1":59}],166:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./_export":32,"./_math-expm1":59}],167:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./_export":32}],168:[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , has               = require('./_has')
  , cof               = require('./_cof')
  , inheritIfRequired = require('./_inherit-if-required')
  , toPrimitive       = require('./_to-primitive')
  , fails             = require('./_fails')
  , gOPN              = require('./_object-gopn').f
  , gOPD              = require('./_object-gopd').f
  , dP                = require('./_object-dp').f
  , $trim             = require('./_string-trim').trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(require('./_object-create')(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}
},{"./_cof":18,"./_descriptors":28,"./_fails":34,"./_global":38,"./_has":39,"./_inherit-if-required":43,"./_object-create":66,"./_object-dp":67,"./_object-gopd":70,"./_object-gopn":72,"./_redefine":87,"./_string-trim":102,"./_to-primitive":110}],169:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./_export":32}],170:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export')
  , _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./_export":32,"./_global":38}],171:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', {isInteger: require('./_is-integer')});
},{"./_export":32,"./_is-integer":48}],172:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./_export":32}],173:[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = require('./_export')
  , isInteger = require('./_is-integer')
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"./_export":32,"./_is-integer":48}],174:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./_export":32}],175:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./_export":32}],176:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
},{"./_export":32,"./_parse-float":81}],177:[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});
},{"./_export":32,"./_parse-int":82}],178:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , anInstance   = require('./_an-instance')
  , toInteger    = require('./_to-integer')
  , aNumberValue = require('./_a-number-value')
  , repeat       = require('./_string-repeat')
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});
},{"./_a-number-value":4,"./_an-instance":6,"./_export":32,"./_fails":34,"./_string-repeat":101,"./_to-integer":106}],179:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $fails       = require('./_fails')
  , aNumberValue = require('./_a-number-value')
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});
},{"./_a-number-value":4,"./_export":32,"./_fails":34}],180:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":32,"./_object-assign":65}],181:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":32,"./_object-create":66}],182:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperties: require('./_object-dps')});
},{"./_descriptors":28,"./_export":32,"./_object-dps":68}],183:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":28,"./_export":32,"./_object-dp":67}],184:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});
},{"./_is-object":49,"./_meta":62,"./_object-sap":78}],185:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":70,"./_object-sap":78,"./_to-iobject":107}],186:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function(){
  return require('./_object-gopn-ext').f;
});
},{"./_object-gopn-ext":71,"./_object-sap":78}],187:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":74,"./_object-sap":78,"./_to-object":109}],188:[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"./_is-object":49,"./_object-sap":78}],189:[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./_is-object":49,"./_object-sap":78}],190:[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"./_is-object":49,"./_object-sap":78}],191:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', {is: require('./_same-value')});
},{"./_export":32,"./_same-value":89}],192:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":76,"./_object-sap":78,"./_to-object":109}],193:[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});
},{"./_is-object":49,"./_meta":62,"./_object-sap":78}],194:[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});
},{"./_is-object":49,"./_meta":62,"./_object-sap":78}],195:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":32,"./_set-proto":90}],196:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof')
  , test    = {};
test[require('./_wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./_redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./_classof":17,"./_redefine":87,"./_wks":117}],197:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});
},{"./_export":32,"./_parse-float":81}],198:[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});
},{"./_export":32,"./_parse-int":82}],199:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , anObject           = require('./_an-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , setProto           = require('./_set-proto').set
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":3,"./_an-instance":6,"./_an-object":7,"./_classof":17,"./_core":23,"./_ctx":25,"./_export":32,"./_for-of":37,"./_global":38,"./_is-object":49,"./_iter-detect":54,"./_library":58,"./_microtask":64,"./_redefine-all":86,"./_set-proto":90,"./_set-species":91,"./_set-to-string-tag":92,"./_species-constructor":95,"./_task":104,"./_wks":117}],200:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , anObject  = require('./_an-object')
  , _apply    = Function.apply;

$export($export.S, 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(aFunction(target), thisArgument, anObject(argumentsList));
  }
});
},{"./_a-function":3,"./_an-object":7,"./_export":32}],201:[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export   = require('./_export')
  , create    = require('./_object-create')
  , aFunction = require('./_a-function')
  , anObject  = require('./_an-object')
  , isObject  = require('./_is-object')
  , bind      = require('./_bind');

// MS Edge supports only 2 arguments
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
$export($export.S + $export.F * require('./_fails')(function(){
  function F(){}
  return !(Reflect.construct(function(){}, [], F) instanceof F);
}), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"./_a-function":3,"./_an-object":7,"./_bind":16,"./_export":32,"./_fails":34,"./_is-object":49,"./_object-create":66}],202:[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = require('./_object-dp')
  , $export     = require('./_export')
  , anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":7,"./_export":32,"./_fails":34,"./_object-dp":67,"./_to-primitive":110}],203:[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = require('./_export')
  , gOPD     = require('./_object-gopd').f
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"./_an-object":7,"./_export":32,"./_object-gopd":70}],204:[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = require('./_export')
  , anObject = require('./_an-object');
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"./_an-object":7,"./_export":32,"./_iter-create":52}],205:[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = require('./_object-gopd')
  , $export  = require('./_export')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});
},{"./_an-object":7,"./_export":32,"./_object-gopd":70}],206:[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = require('./_export')
  , getProto = require('./_object-gpo')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"./_an-object":7,"./_export":32,"./_object-gpo":74}],207:[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , isObject       = require('./_is-object')
  , anObject       = require('./_an-object');

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"./_an-object":7,"./_export":32,"./_has":39,"./_is-object":49,"./_object-gopd":70,"./_object-gpo":74}],208:[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"./_export":32}],209:[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = require('./_export')
  , anObject      = require('./_an-object')
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"./_an-object":7,"./_export":32}],210:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', {ownKeys: require('./_own-keys')});
},{"./_export":32,"./_own-keys":80}],211:[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = require('./_export')
  , anObject           = require('./_an-object')
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":7,"./_export":32}],212:[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = require('./_export')
  , setProto = require('./_set-proto');

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_export":32,"./_set-proto":90}],213:[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = require('./_object-dp')
  , gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , createDesc     = require('./_property-desc')
  , anObject       = require('./_an-object')
  , isObject       = require('./_is-object');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"./_an-object":7,"./_export":32,"./_has":39,"./_is-object":49,"./_object-dp":67,"./_object-gopd":70,"./_object-gpo":74,"./_property-desc":85}],214:[function(require,module,exports){
var global            = require('./_global')
  , inheritIfRequired = require('./_inherit-if-required')
  , dP                = require('./_object-dp').f
  , gOPN              = require('./_object-gopn').f
  , isRegExp          = require('./_is-regexp')
  , $flags            = require('./_flags')
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function(){
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');
},{"./_descriptors":28,"./_fails":34,"./_flags":36,"./_global":38,"./_inherit-if-required":43,"./_is-regexp":50,"./_object-dp":67,"./_object-gopn":72,"./_redefine":87,"./_set-species":91,"./_wks":117}],215:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if(require('./_descriptors') && /./g.flags != 'g')require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});
},{"./_descriptors":28,"./_flags":36,"./_object-dp":67}],216:[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});
},{"./_fix-re-wks":35}],217:[function(require,module,exports){
// @@replace logic
require('./_fix-re-wks')('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});
},{"./_fix-re-wks":35}],218:[function(require,module,exports){
// @@search logic
require('./_fix-re-wks')('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});
},{"./_fix-re-wks":35}],219:[function(require,module,exports){
// @@split logic
require('./_fix-re-wks')('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = require('./_is-regexp')
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});
},{"./_fix-re-wks":35,"./_is-regexp":50}],220:[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject    = require('./_an-object')
  , $flags      = require('./_flags')
  , DESCRIPTORS = require('./_descriptors')
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(require('./_fails')(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}
},{"./_an-object":7,"./_descriptors":28,"./_fails":34,"./_flags":36,"./_redefine":87,"./es6.regexp.flags":215}],221:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.2 Set Objects
module.exports = require('./_collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./_collection":22,"./_collection-strong":19}],222:[function(require,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});
},{"./_string-html":99}],223:[function(require,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});
},{"./_string-html":99}],224:[function(require,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});
},{"./_string-html":99}],225:[function(require,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});
},{"./_string-html":99}],226:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $at     = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./_export":32,"./_string-at":97}],227:[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = require('./_export')
  , toLength  = require('./_to-length')
  , context   = require('./_string-context')
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"./_export":32,"./_fails-is-regexp":33,"./_string-context":98,"./_to-length":108}],228:[function(require,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});
},{"./_string-html":99}],229:[function(require,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});
},{"./_string-html":99}],230:[function(require,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});
},{"./_string-html":99}],231:[function(require,module,exports){
var $export        = require('./_export')
  , toIndex        = require('./_to-index')
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./_export":32,"./_to-index":105}],232:[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = require('./_export')
  , context  = require('./_string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./_export":32,"./_fails-is-regexp":33,"./_string-context":98}],233:[function(require,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});
},{"./_string-html":99}],234:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":53,"./_string-at":97}],235:[function(require,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});
},{"./_string-html":99}],236:[function(require,module,exports){
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"./_export":32,"./_to-iobject":107,"./_to-length":108}],237:[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});
},{"./_export":32,"./_string-repeat":101}],238:[function(require,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});
},{"./_string-html":99}],239:[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = require('./_export')
  , toLength    = require('./_to-length')
  , context     = require('./_string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./_export":32,"./_fails-is-regexp":33,"./_string-context":98,"./_to-length":108}],240:[function(require,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});
},{"./_string-html":99}],241:[function(require,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});
},{"./_string-html":99}],242:[function(require,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});
},{"./_string-html":99}],243:[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"./_string-trim":102}],244:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":7,"./_descriptors":28,"./_enum-keys":31,"./_export":32,"./_fails":34,"./_global":38,"./_has":39,"./_hide":40,"./_is-array":47,"./_keyof":57,"./_library":58,"./_meta":62,"./_object-create":66,"./_object-dp":67,"./_object-gopd":70,"./_object-gopn":72,"./_object-gopn-ext":71,"./_object-gops":73,"./_object-keys":76,"./_object-pie":77,"./_property-desc":85,"./_redefine":87,"./_set-to-string-tag":92,"./_shared":94,"./_to-iobject":107,"./_to-primitive":110,"./_uid":114,"./_wks":117,"./_wks-define":115,"./_wks-ext":116}],245:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $typed       = require('./_typed')
  , buffer       = require('./_typed-buffer')
  , anObject     = require('./_an-object')
  , toIndex      = require('./_to-index')
  , toLength     = require('./_to-length')
  , isObject     = require('./_is-object')
  , TYPED_ARRAY  = require('./_wks')('typed_array')
  , ArrayBuffer  = require('./_global').ArrayBuffer
  , speciesConstructor = require('./_species-constructor')
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);
},{"./_an-object":7,"./_export":32,"./_fails":34,"./_global":38,"./_is-object":49,"./_set-species":91,"./_species-constructor":95,"./_to-index":105,"./_to-length":108,"./_typed":113,"./_typed-buffer":112,"./_wks":117}],246:[function(require,module,exports){
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});
},{"./_export":32,"./_typed":113,"./_typed-buffer":112}],247:[function(require,module,exports){
require('./_typed-array')('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],248:[function(require,module,exports){
require('./_typed-array')('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],249:[function(require,module,exports){
require('./_typed-array')('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],250:[function(require,module,exports){
require('./_typed-array')('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],251:[function(require,module,exports){
require('./_typed-array')('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],252:[function(require,module,exports){
require('./_typed-array')('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],253:[function(require,module,exports){
require('./_typed-array')('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],254:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],255:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);
},{"./_typed-array":111}],256:[function(require,module,exports){
'use strict';
var each         = require('./_array-methods')(0)
  , redefine     = require('./_redefine')
  , meta         = require('./_meta')
  , assign       = require('./_object-assign')
  , weak         = require('./_collection-weak')
  , isObject     = require('./_is-object')
  , has          = require('./_has')
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./_array-methods":12,"./_collection":22,"./_collection-weak":21,"./_has":39,"./_is-object":49,"./_meta":62,"./_object-assign":65,"./_redefine":87}],257:[function(require,module,exports){
'use strict';
var weak = require('./_collection-weak');

// 23.4 WeakSet Objects
require('./_collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./_collection":22,"./_collection-weak":21}],258:[function(require,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export   = require('./_export')
  , $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');
},{"./_add-to-unscopables":5,"./_array-includes":11,"./_export":32}],259:[function(require,module,exports){
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = require('./_export')
  , microtask = require('./_microtask')()
  , process   = require('./_global').process
  , isNode    = require('./_cof')(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});
},{"./_cof":18,"./_export":32,"./_global":38,"./_microtask":64}],260:[function(require,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export')
  , cof     = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});
},{"./_cof":18,"./_export":32}],261:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Map', {toJSON: require('./_collection-to-json')('Map')});
},{"./_collection-to-json":20,"./_export":32}],262:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});
},{"./_export":32}],263:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});
},{"./_export":32}],264:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});
},{"./_export":32}],265:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});
},{"./_export":32}],266:[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":3,"./_descriptors":28,"./_export":32,"./_object-dp":67,"./_object-forced-pam":69,"./_to-object":109}],267:[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":3,"./_descriptors":28,"./_export":32,"./_object-dp":67,"./_object-forced-pam":69,"./_to-object":109}],268:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export  = require('./_export')
  , $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./_export":32,"./_object-to-array":79}],269:[function(require,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = require('./_export')
  , ownKeys        = require('./_own-keys')
  , toIObject      = require('./_to-iobject')
  , gOPD           = require('./_object-gopd')
  , createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key, D;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});
},{"./_create-property":24,"./_export":32,"./_object-gopd":70,"./_own-keys":80,"./_to-iobject":107}],270:[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":28,"./_export":32,"./_object-forced-pam":69,"./_object-gopd":70,"./_object-gpo":74,"./_to-object":109,"./_to-primitive":110}],271:[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":28,"./_export":32,"./_object-forced-pam":69,"./_object-gopd":70,"./_object-gpo":74,"./_to-object":109,"./_to-primitive":110}],272:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export')
  , $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./_export":32,"./_object-to-array":79}],273:[function(require,module,exports){
'use strict';
// https://github.com/zenparsing/es-observable
var $export     = require('./_export')
  , global      = require('./_global')
  , core        = require('./_core')
  , microtask   = require('./_microtask')()
  , OBSERVABLE  = require('./_wks')('observable')
  , aFunction   = require('./_a-function')
  , anObject    = require('./_an-object')
  , anInstance  = require('./_an-instance')
  , redefineAll = require('./_redefine-all')
  , hide        = require('./_hide')
  , forOf       = require('./_for-of')
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

require('./_set-species')('Observable');
},{"./_a-function":3,"./_an-instance":6,"./_an-object":7,"./_core":23,"./_export":32,"./_for-of":37,"./_global":38,"./_hide":40,"./_microtask":64,"./_redefine-all":86,"./_set-species":91,"./_wks":117}],274:[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});
},{"./_an-object":7,"./_metadata":63}],275:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});
},{"./_an-object":7,"./_metadata":63}],276:[function(require,module,exports){
var Set                     = require('./es6.set')
  , from                    = require('./_array-from-iterable')
  , metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , getPrototypeOf          = require('./_object-gpo')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":7,"./_array-from-iterable":10,"./_metadata":63,"./_object-gpo":74,"./es6.set":221}],277:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":63,"./_object-gpo":74}],278:[function(require,module,exports){
var metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":7,"./_metadata":63}],279:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":63}],280:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":63,"./_object-gpo":74}],281:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":63}],282:[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , aFunction                 = require('./_a-function')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});
},{"./_a-function":3,"./_an-object":7,"./_metadata":63}],283:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Set', {toJSON: require('./_collection-to-json')('Set')});
},{"./_collection-to-json":20,"./_export":32}],284:[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export')
  , $at     = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./_export":32,"./_string-at":97}],285:[function(require,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export     = require('./_export')
  , defined     = require('./_defined')
  , toLength    = require('./_to-length')
  , isRegExp    = require('./_is-regexp')
  , getFlags    = require('./_flags')
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});
},{"./_defined":27,"./_export":32,"./_flags":36,"./_is-regexp":50,"./_iter-create":52,"./_to-length":108}],286:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"./_export":32,"./_string-pad":100}],287:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"./_export":32,"./_string-pad":100}],288:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');
},{"./_string-trim":102}],289:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');
},{"./_string-trim":102}],290:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":115}],291:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":115}],292:[function(require,module,exports){
// https://github.com/ljharb/proposal-global
var $export = require('./_export');

$export($export.S, 'System', {global: require('./_global')});
},{"./_export":32,"./_global":38}],293:[function(require,module,exports){
var $iterators    = require('./es6.array.iterator')
  , redefine      = require('./_redefine')
  , global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , wks           = require('./_wks')
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}
},{"./_global":38,"./_hide":40,"./_iterators":56,"./_redefine":87,"./_wks":117,"./es6.array.iterator":131}],294:[function(require,module,exports){
var $export = require('./_export')
  , $task   = require('./_task');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./_export":32,"./_task":104}],295:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = require('./_global')
  , $export    = require('./_export')
  , invoke     = require('./_invoke')
  , partial    = require('./_partial')
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"./_export":32,"./_global":38,"./_invoke":44,"./_partial":83}],296:[function(require,module,exports){
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.umulh');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');
},{"./modules/_core":23,"./modules/es6.array.copy-within":121,"./modules/es6.array.every":122,"./modules/es6.array.fill":123,"./modules/es6.array.filter":124,"./modules/es6.array.find":126,"./modules/es6.array.find-index":125,"./modules/es6.array.for-each":127,"./modules/es6.array.from":128,"./modules/es6.array.index-of":129,"./modules/es6.array.is-array":130,"./modules/es6.array.iterator":131,"./modules/es6.array.join":132,"./modules/es6.array.last-index-of":133,"./modules/es6.array.map":134,"./modules/es6.array.of":135,"./modules/es6.array.reduce":137,"./modules/es6.array.reduce-right":136,"./modules/es6.array.slice":138,"./modules/es6.array.some":139,"./modules/es6.array.sort":140,"./modules/es6.array.species":141,"./modules/es6.date.now":142,"./modules/es6.date.to-iso-string":143,"./modules/es6.date.to-json":144,"./modules/es6.date.to-primitive":145,"./modules/es6.date.to-string":146,"./modules/es6.function.bind":147,"./modules/es6.function.has-instance":148,"./modules/es6.function.name":149,"./modules/es6.map":150,"./modules/es6.math.acosh":151,"./modules/es6.math.asinh":152,"./modules/es6.math.atanh":153,"./modules/es6.math.cbrt":154,"./modules/es6.math.clz32":155,"./modules/es6.math.cosh":156,"./modules/es6.math.expm1":157,"./modules/es6.math.fround":158,"./modules/es6.math.hypot":159,"./modules/es6.math.imul":160,"./modules/es6.math.log10":161,"./modules/es6.math.log1p":162,"./modules/es6.math.log2":163,"./modules/es6.math.sign":164,"./modules/es6.math.sinh":165,"./modules/es6.math.tanh":166,"./modules/es6.math.trunc":167,"./modules/es6.number.constructor":168,"./modules/es6.number.epsilon":169,"./modules/es6.number.is-finite":170,"./modules/es6.number.is-integer":171,"./modules/es6.number.is-nan":172,"./modules/es6.number.is-safe-integer":173,"./modules/es6.number.max-safe-integer":174,"./modules/es6.number.min-safe-integer":175,"./modules/es6.number.parse-float":176,"./modules/es6.number.parse-int":177,"./modules/es6.number.to-fixed":178,"./modules/es6.number.to-precision":179,"./modules/es6.object.assign":180,"./modules/es6.object.create":181,"./modules/es6.object.define-properties":182,"./modules/es6.object.define-property":183,"./modules/es6.object.freeze":184,"./modules/es6.object.get-own-property-descriptor":185,"./modules/es6.object.get-own-property-names":186,"./modules/es6.object.get-prototype-of":187,"./modules/es6.object.is":191,"./modules/es6.object.is-extensible":188,"./modules/es6.object.is-frozen":189,"./modules/es6.object.is-sealed":190,"./modules/es6.object.keys":192,"./modules/es6.object.prevent-extensions":193,"./modules/es6.object.seal":194,"./modules/es6.object.set-prototype-of":195,"./modules/es6.object.to-string":196,"./modules/es6.parse-float":197,"./modules/es6.parse-int":198,"./modules/es6.promise":199,"./modules/es6.reflect.apply":200,"./modules/es6.reflect.construct":201,"./modules/es6.reflect.define-property":202,"./modules/es6.reflect.delete-property":203,"./modules/es6.reflect.enumerate":204,"./modules/es6.reflect.get":207,"./modules/es6.reflect.get-own-property-descriptor":205,"./modules/es6.reflect.get-prototype-of":206,"./modules/es6.reflect.has":208,"./modules/es6.reflect.is-extensible":209,"./modules/es6.reflect.own-keys":210,"./modules/es6.reflect.prevent-extensions":211,"./modules/es6.reflect.set":213,"./modules/es6.reflect.set-prototype-of":212,"./modules/es6.regexp.constructor":214,"./modules/es6.regexp.flags":215,"./modules/es6.regexp.match":216,"./modules/es6.regexp.replace":217,"./modules/es6.regexp.search":218,"./modules/es6.regexp.split":219,"./modules/es6.regexp.to-string":220,"./modules/es6.set":221,"./modules/es6.string.anchor":222,"./modules/es6.string.big":223,"./modules/es6.string.blink":224,"./modules/es6.string.bold":225,"./modules/es6.string.code-point-at":226,"./modules/es6.string.ends-with":227,"./modules/es6.string.fixed":228,"./modules/es6.string.fontcolor":229,"./modules/es6.string.fontsize":230,"./modules/es6.string.from-code-point":231,"./modules/es6.string.includes":232,"./modules/es6.string.italics":233,"./modules/es6.string.iterator":234,"./modules/es6.string.link":235,"./modules/es6.string.raw":236,"./modules/es6.string.repeat":237,"./modules/es6.string.small":238,"./modules/es6.string.starts-with":239,"./modules/es6.string.strike":240,"./modules/es6.string.sub":241,"./modules/es6.string.sup":242,"./modules/es6.string.trim":243,"./modules/es6.symbol":244,"./modules/es6.typed.array-buffer":245,"./modules/es6.typed.data-view":246,"./modules/es6.typed.float32-array":247,"./modules/es6.typed.float64-array":248,"./modules/es6.typed.int16-array":249,"./modules/es6.typed.int32-array":250,"./modules/es6.typed.int8-array":251,"./modules/es6.typed.uint16-array":252,"./modules/es6.typed.uint32-array":253,"./modules/es6.typed.uint8-array":254,"./modules/es6.typed.uint8-clamped-array":255,"./modules/es6.weak-map":256,"./modules/es6.weak-set":257,"./modules/es7.array.includes":258,"./modules/es7.asap":259,"./modules/es7.error.is-error":260,"./modules/es7.map.to-json":261,"./modules/es7.math.iaddh":262,"./modules/es7.math.imulh":263,"./modules/es7.math.isubh":264,"./modules/es7.math.umulh":265,"./modules/es7.object.define-getter":266,"./modules/es7.object.define-setter":267,"./modules/es7.object.entries":268,"./modules/es7.object.get-own-property-descriptors":269,"./modules/es7.object.lookup-getter":270,"./modules/es7.object.lookup-setter":271,"./modules/es7.object.values":272,"./modules/es7.observable":273,"./modules/es7.reflect.define-metadata":274,"./modules/es7.reflect.delete-metadata":275,"./modules/es7.reflect.get-metadata":277,"./modules/es7.reflect.get-metadata-keys":276,"./modules/es7.reflect.get-own-metadata":279,"./modules/es7.reflect.get-own-metadata-keys":278,"./modules/es7.reflect.has-metadata":280,"./modules/es7.reflect.has-own-metadata":281,"./modules/es7.reflect.metadata":282,"./modules/es7.set.to-json":283,"./modules/es7.string.at":284,"./modules/es7.string.match-all":285,"./modules/es7.string.pad-end":286,"./modules/es7.string.pad-start":287,"./modules/es7.string.trim-left":288,"./modules/es7.string.trim-right":289,"./modules/es7.symbol.async-iterator":290,"./modules/es7.symbol.observable":291,"./modules/es7.system.global":292,"./modules/web.dom.iterable":293,"./modules/web.immediate":294,"./modules/web.timers":295}],297:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],298:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return Promise.resolve(value.arg).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":297}],299:[function(require,module,exports){
"use strict";

require("babel-polyfill");

var _content = require("./modules/content");

var _content2 = _interopRequireDefault(_content);

var _toolbox = require("./modules/toolbox");

var _toolbox2 = _interopRequireDefault(_toolbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).foundation();
var editableArea = $("#editable-area");
var tools = $("#toolbox");

(0, _content2.default)(editableArea);
(0, _toolbox2.default)(tools);

// TODO: Add tags: tables, lists, forms, videos, audio, objects

},{"./modules/content":305,"./modules/toolbox":317,"babel-polyfill":1}],300:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by uneek on 08/06/16.
 */

var instance = null;

var Layout = function () {
  function Layout(row, column) {
    _classCallCheck(this, Layout);

    if (!instance) {
      instance = this;
    }

    this._m_row = row;
    this._m_column = column;
    this._m_time = new Date();

    return instance;
  }

  _createClass(Layout, [{
    key: "row",
    get: function get() {
      return this._m_row;
    },
    set: function set(value) {
      this._m_row = value;
    }
  }, {
    key: "column",
    get: function get() {
      return this._m_column;
    },
    set: function set(value) {
      this._m_column = value;
    }
  }, {
    key: "time",
    get: function get() {
      return this._m_time;
    }
  }]);

  return Layout;
}();

exports.default = Layout;

},{}],301:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require("./base");

Object.keys(_base).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _base[key];
    }
  });
});

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by uneek on 08/06/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var instance = null;

var Bootstrap3 = function (_Base) {
  _inherits(Bootstrap3, _Base);

  function Bootstrap3(row, column) {
    var _ret;

    _classCallCheck(this, Bootstrap3);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bootstrap3).call(this, row, column));

    if (!instance) {
      instance = _this;
    }

    return _ret = instance, _possibleConstructorReturn(_this, _ret);
  }

  return Bootstrap3;
}(_base2.default);

exports.default = Bootstrap3;

},{"./base":300}],302:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by uneek on 08/06/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var instance = null;

var Foundation6 = function (_Base) {
  _inherits(Foundation6, _Base);

  function Foundation6(row, column) {
    var _ret;

    _classCallCheck(this, Foundation6);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Foundation6).call(this, row, column));

    if (!instance) {
      instance = _this;
    }

    return _ret = instance, _possibleConstructorReturn(_this, _ret);
  }

  return Foundation6;
}(_base2.default);

exports.default = Foundation6;

},{"./base":300}],303:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component(name, tag, attributes) {
    _classCallCheck(this, Component);

    this._m_name = name;
    this._m_tag = tag;
    this._m_attributes = attributes;
  }

  _createClass(Component, [{
    key: "toHTML",
    value: function toHTML() {
      return $("<" + this.tag + ">", this.attributes);
    }
  }, {
    key: "name",
    get: function get() {
      return this._m_name;
    },
    set: function set(value) {
      this._m_name = value;
    }
  }, {
    key: "tag",
    get: function get() {
      return this._m_tag;
    },
    set: function set(value) {
      this._m_tag = value;
    }
  }, {
    key: "attributes",
    get: function get() {
      return this._m_attributes;
    },
    set: function set(value) {
      this._m_attributes = value;
    }
  }]);

  return Component;
}();

exports.default = Component;

},{}],304:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Composite = function () {
  function Composite(name) {
    _classCallCheck(this, Composite);

    this._m_name = name;
  }

  _createClass(Composite, [{
    key: "name",
    get: function get() {
      return this._m_name;
    },
    set: function set(value) {
      this._m_name = value;
    }
  }]);

  return Composite;
}();

exports.default = Composite;

},{}],305:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _layout = require("./layout");

var layout = _interopRequireWildcard(_layout);

var _droppable = require("./droppable");

var droppable = _interopRequireWildcard(_droppable);

var _settings = require("./settings");

var settings = _interopRequireWildcard(_settings);

var _bootstrap = require("./base/bootstrap3");

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _foundation = require("./base/foundation6");

var _foundation2 = _interopRequireDefault(_foundation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function init(div) {
  $.widget('plb.content', {
    options: {
      debug: false,
      base: "bootstrap3"
    },
    draggables: null,
    editing: false,
    dragging: false,
    base: null,
    customizable: settings.getCustomizables(),
    _create: function _create() {
      if (this.options.debug) {
        this.element.addClass("debug");
      }
      this.updateDraggables();
    },


    /**
     *
     */
    updateDraggables: function updateDraggables() {
      this.draggables = this.element.find(".draggable");
      this.initDraggables(this.draggables);
      this.createHandles(this.draggables);
    },


    /**
     *
     */
    initDroppables: function initDroppables() {
      if (this.element.children(".draggables-container, .droppables-container").length < 1) {
        droppable.firstDroppable(this.element);
      } else {
        droppable.createDroppables(this.element);
      }

      var that = this,
          droppables = $(".droppable");

      droppables.droppable({
        hoverClass: "drop-hover",
        tolerance: "pointer",
        drop: function drop(event, ui) {
          var parent = ui.draggable.parent();
          var content = ui.draggable.data("data");

          if (parent.is("ul")) {
            ui.draggable = $("<div>", { class: "columns draggable" }).append(content.clone());
            //that.initDraggables(ui.draggable);
          }

          if ($(this).is('[class*="new-row"]')) {
            layout.newRow($(this), ui);
          } else if ($(this).is('[class*="new-column"]')) {
            layout.newColumn($(this), ui);
          } else if ($(this).is('[class*="new-inside"]')) {
            layout.newInside($(this), ui);
          } else if ($(this).is('[class*="new-nested"]')) {
            layout.newNested($(this), ui);
          }

          that.updateDraggables();

          that.initSelectables();
        }
      });
    },


    /**
     *
     * @param draggables
     * @returns {*|jQuery}
     */
    initDraggables: function initDraggables(draggables) {
      var that = this;

      draggables.draggable({
        helper: function helper() {
          var width = 100;
          var height = width * (parseInt($(this).css("height")) / parseInt($(this).css("width")));

          return $("<div>", { class: "draggable-clone" }).css({ height: height + "px", width: width + "px" });
        },

        handle: ".draggable-move",
        cursorAt: { left: 0, top: 0 },
        start: function start() {
          that.dragging = true;
          if ($(this).resizable("instance")) {
            $(this).resizable("destroy");
          }
          $(this).addClass('drag-active');
          that.initDroppables();
        },
        stop: function stop() {
          that.element.find(".droppables-container").remove();
          that.element.find(".droppables-container-nested").remove();
          $(this).removeClass('drag-active');
          that.dragging = false;
        }
      });
    },


    /**
     *
     */
    initSelectables: function initSelectables() {
      var that = this;
      div.selectable({
        cancel: ".draggable-del .draggable-move, .draggable-edit, .ui-resizable-handle",
        filter: $('.draggables-container').children('.draggable'),
        selected: function selected(event, ui) {
          var _this = this;

          $(".nSetting").empty();

          // TODO: Other possibility -> Add elements to list, then generate options
          var elements = ui.selected.children;

          jQuery.each(elements, function (index, value) {
            if (that.customizable[value.tagName] !== undefined) {
              var list = $("<ul>", { text: value.tagName });

              for (var i = 0; i < that.customizable[value.tagName].length; i++) {
                var option = $("<li>");
                var label = $("<label>", { text: that.customizable[value.tagName][i] });
                var input = void 0;

                if (that.customizable[value.tagName][i] === "text-align" || that.customizable[value.tagName][i] === "text-transform" || that.customizable[value.tagName][i] === "font-weight") {
                  input = $("<select>");
                  //let option = settings.optionList(that.customizable[value.tagName][i]);
                  //option.appendTo(input);
                } else if (that.customizable[value.tagName][i] === "background") {
                    input = $("<input>");
                  } else {
                    input = $("<input>", {
                      value: $(value).css(that.customizable[value.tagName][i]),
                      placeholder: $(value).css(that.customizable[value.tagName][i]) });
                  }

                input.appendTo(label);
                label.appendTo(option);
                option.data("parameter", that.customizable[value.tagName][i]);
                option.appendTo(list);
              }

              //let option = getOptions();
              //option.appendTo(list);
              list.data("function", $(_this).css);
              list.data("target", value);
              list.appendTo($(".nSetting"));
            }
          });

          $('#panel2 input, select, textarea').on("change input", function () {
            var fun = $(this).parent().parent().parent().data("function");
            var target = $(this).parent().parent().parent().data("target");
            var parameter = $(this).parent().parent().data("parameter");
            var paramValue = $(this).val();
            fun.apply($(target), [parameter, paramValue]);
          });
        },
        unselected: function unselected(event, ui) {
          $(".nSetting").empty();
          // FIXME: Remove when column delete
          // FIXME: Remove when row delete
        }
      });
    },


    /**
     *
     * @param draggables
     */
    createHandles: function createHandles(draggables) {
      var that = this;

      draggables.hover(function () {

        if (!that.editing && !that.dragging) {
          var dragHandle = $("<div>", { class: "draggable-move icon-arrows" });
          var delHandle = $("<div>", { class: "draggable-del icon-trash" });
          var editHandle = $("<div>", { class: "draggable-edit icon-pencil" });

          $(this).append(dragHandle);
          $(this).append(delHandle);
          $(this).append(editHandle);

          $(".draggable-del").on("click", function () {

            var parentRow = $(this).parent().parent();
            var update = parentRow.children().length > 1;

            $(this).parent().remove();

            if (update) {
              layout.updateRow(parentRow);
            } else {
              layout.removeDiv(parentRow).remove();
            }
          });

          $(".draggable-edit").on("click", function () {
            var edit = $(this).parent().children(":first");

            if (edit.hasClass("tiny-mce") && !that.editing) {
              that.editing = true;
              edit.tinymce({
                script_url: './lib/tinymce/tinymce.jquery.min.js',
                inline: true,
                setup: function setup(editor) {
                  editor.on('focus', function () {
                    div.selectable("destroy");
                    that.editing = true;
                  });

                  editor.on('blur', function () {
                    that.editing = false;
                    tinymce.remove();
                    that.initSelectables();
                  });
                }
              });

              setTimeout(function () {
                edit.focus();
              }, 10);
            }
          });

          if (!$(this).is(':last-child')) {
            that.createHorizontalResizable($(this));
            $(this).next().addClass("resizable-reverse");
          }
        }
      }, function () {
        $(".draggable-move").remove();
        $(".draggable-del").remove();
        $(".draggable-edit").remove();
        $(this).next().removeClass("resizable-reverse");
      });
    },


    /**
     *
     * @param column
     */
    createHorizontalResizable: function createHorizontalResizable(column) {
      var that = this;
      var next = void 0,
          oldSize = void 0,
          newSize = void 0,
          oldNextSize = void 0,
          newNextSize = void 0;

      if (!that.dragging) {
        column.resizable({
          handles: 'e',
          distance: 10,
          //alsoResizeReverse: 'resizable-reverse',
          helper: "resizable-helper",
          ghost: true,
          create: function create() {
            var instance = $(this).resizable("instance"),
                o = instance.options;
            o.grid = [parseInt($(this).parent().css("width")) / 12, 0];
          },
          start: function start() {
            that.dragging = true;

            next = $(this).next();
            oldSize = layout.getColumnSize($(this)).medium;
            oldSize = parseInt(oldSize.slice(7, oldSize.length));
            oldNextSize = layout.getColumnSize(next).medium;
            oldNextSize = parseInt(oldNextSize.slice(7, oldNextSize.length));

            var instance = $(this).resizable("instance"),
                o = instance.options;

            o.minWidth = o.grid[0];
            o.maxWidth = (oldSize + oldNextSize - 1) * o.minWidth;
          },
          stop: function stop() {
            var instance = $(this).resizable("instance"),
                o = instance.options;
            next = $(this).next();

            newSize = parseInt(instance.helper.width() / parseFloat(o.grid[0]));
            newNextSize = oldNextSize + (oldSize - newSize);

            layout.setColumnSize($(this), { "medium": newSize, "large": newSize });
            layout.setColumnSize(next, { "medium": newNextSize, "large": newNextSize });

            $(this).css("width", "");
            $(this).css("height", "");

            next.css("width", "");
            next.css("height", "");

            that.dragging = false;
          }
        });
      }
    },


    /**
     *
     */
    newPLB: function newPLB() {
      if (this.options.base === "bootstrap3") {
        this.base = new _bootstrap2.default("row", "");
      } else {
        this.base = new _foundation2.default("row", "column");
      }
    }
  });

  div.content({ debug: false });
  div.content("newPLB");
}

},{"./base/bootstrap3":301,"./base/foundation6":302,"./droppable":307,"./layout":309,"./settings":312}],306:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getParameters;
var DROPPABLE_SIZE = 10;

// TODO: Find a way to delete this b*******

/**
 *
 * @param elementPosition
 * @param element
 * @returns {*}
 */
function getParameters(elementPosition, element) {
  var parameters = void 0;
  var elementWidth = parseInt(element.css("width"));
  var elementHeight = parseInt(element.css("height"));
  var elementParentHeight = parseInt(element.parent().css("height"));
  var elementTop = element.offset().top;
  var elementLeft = element.offset().left;

  switch (elementPosition) {
    case "newRow":
      parameters = {
        top: elementTop,
        left: elementLeft,
        width: element.css("width"),
        height: element.css("height")
      };
      break;
    case "newNestedBefore1":
      parameters = {
        top: elementTop - DROPPABLE_SIZE / 2 + 20,
        left: elementLeft,
        width: element.css("width")
      };
      break;
    case "newNestedBefore2":
      parameters = {
        top: elementTop - DROPPABLE_SIZE / 2,
        left: elementLeft,
        width: element.css("width")
      };
      break;
    case "newNestedAfter":
      parameters = {
        top: elementTop + +elementHeight - DROPPABLE_SIZE / 2 - 20,
        left: elementLeft,
        width: element.css("width")
      };
      break;
    case "newRowBefore":
      parameters = {
        top: elementTop - DROPPABLE_SIZE / 2,
        left: elementLeft,
        width: element.css("width")
      };
      break;
    case "newRowAfter":
      parameters = {
        top: elementTop + +elementHeight - DROPPABLE_SIZE / 2,
        left: elementLeft,
        width: element.css("width")
      };
      break;
    case "newColumnBefore":
      parameters = {
        top: elementTop + DROPPABLE_SIZE / 2,
        left: elementLeft - DROPPABLE_SIZE,
        height: elementParentHeight - DROPPABLE_SIZE + "px"
      };
      break;
    case "newColumnAfter":
      parameters = {
        top: elementTop + DROPPABLE_SIZE / 2,
        left: elementLeft + (+elementWidth - DROPPABLE_SIZE),
        height: elementParentHeight - DROPPABLE_SIZE + "px"
      };
      break;
    case "newInsideAbove":
      parameters = {
        top: elementTop + DROPPABLE_SIZE / 2,
        left: elementLeft + DROPPABLE_SIZE,
        width: elementWidth - DROPPABLE_SIZE * 2 + "px",
        height: elementParentHeight / 2.5 + "px"
      };
      break;
    case "newInsideBelow":
      parameters = {
        top: elementTop - elementParentHeight / 3 + +(elementParentHeight * 0.9),
        left: elementLeft + DROPPABLE_SIZE,
        width: elementWidth - DROPPABLE_SIZE * 2 + "px",
        height: elementParentHeight / 2.5 + "px"
      };
      break;
    case "handleBefore":
      parameters = {
        top: elementTop + DROPPABLE_SIZE / 2,
        left: elementLeft - DROPPABLE_SIZE,
        height: elementHeight - DROPPABLE_SIZE + "px"
      };
      break;
    case "handleAfter":
      parameters = {
        top: elementTop + DROPPABLE_SIZE / 2,
        left: elementLeft + (+elementWidth - DROPPABLE_SIZE),
        height: elementHeight - DROPPABLE_SIZE + "px"
      };
      break;
  }
  return parameters;
}

},{}],307:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstDroppable = exports.createDroppables = undefined;

var _shared = require("./shared");

var shared = _interopRequireWildcard(_shared);

var _requirement = require("./requirement");

var _requirement2 = _interopRequireDefault(_requirement);

var _css = require("./css");

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.createDroppables = createDroppables;
exports.firstDroppable = firstDroppable;

/**
 *
 * @param nestedDroppablesContainer
 */

function createAddToNestedDroppables(nestedDroppablesContainer) {
  $(".columns.nested-container").each(function () {
    $(this).children().each(function () {
      if ($(this).is(":first-child")) {
        var droppableRowBefore = $("<div>", {
          class: "droppable new-nested-before"
        }).css((0, _css2.default)("newNestedBefore1", $(this)));
        droppableRowBefore.data("row", $(this));
        droppableRowBefore.data("insertFunction", $(this).insertBefore);
        nestedDroppablesContainer.append(droppableRowBefore);
      } else {
        var _droppableRowBefore = $("<div>", {
          class: "droppable new-nested-before"
        }).css((0, _css2.default)("newNestedBefore2", $(this)));
        _droppableRowBefore.data("row", $(this));
        _droppableRowBefore.data("insertFunction", $(this).insertBefore);
        nestedDroppablesContainer.append(_droppableRowBefore);
      }

      if ($(this).is(":last-child")) {
        var droppableRowAfter = $("<div>", {
          class: "droppable new-nested-after"
        }).css((0, _css2.default)("newNestedAfter", $(this)));
        droppableRowAfter.data("row", $(this));
        droppableRowAfter.data("insertFunction", $(this).insertAfter);
        nestedDroppablesContainer.append(droppableRowAfter);
      }
    });
  });
}

/**
 *
 * @param droppablesContainer
 */
function createRowDroppables(droppablesContainer) {
  var draggablesContainer = $(".row.draggables-container");

  jQuery.each(draggablesContainer, function (index, draggableContainer) {
    if (shared.hasOneChildOnly($(draggableContainer)) || _requirement2.default.checkColumnLevel($(draggableContainer))) {
      // Jump to next iteration: because we move a single element
      return true;
    }

    if (!shared.hasOneChildOnly($(draggableContainer).prev(".row.draggables-container"))) {
      var droppableRowBefore = $("<div>", {
        class: "droppable new-row-before"
      }).css((0, _css2.default)("newRowBefore", $(draggableContainer)));
      droppableRowBefore.data("row", $(draggableContainer));
      droppableRowBefore.data("insertFunction", $(draggableContainer).insertBefore);
      droppablesContainer.append(droppableRowBefore);
    }

    if ($(draggableContainer).next(".row.draggables-container").length === 0) {
      var droppableRowAfter = $("<div>", {
        class: "droppable new-row-after"
      }).css((0, _css2.default)("newRowAfter", $(draggableContainer)));
      droppableRowAfter.data("row", $(draggableContainer));
      droppableRowAfter.data("insertFunction", $(draggableContainer).insertAfter);
      droppablesContainer.append(droppableRowAfter);
    }
  });
}

/**
 *
 * @param droppablesContainer
 */
function createColumnsDroppables(droppablesContainer) {
  var draggables = $(".draggable").not(".drag-active, .ui-draggable-dragging");

  jQuery.each(draggables, function (index, draggable) {
    if (!_requirement2.default.checkColumnLevel($(draggable)) && !_requirement2.default.checkMaximumColumnsByRow($(draggable).parent())) {
      if ($(draggable).is(':first-child')) {
        var droppableColumnBefore = $("<div>", {
          class: "droppable new-column-before"
        }).css((0, _css2.default)("newColumnBefore", $(draggable)));
        droppableColumnBefore.data("column", $(draggable));
        droppableColumnBefore.data("insertFunction", $(draggable).insertBefore);
        droppablesContainer.append(droppableColumnBefore);
      }

      if (!$(draggable).next().hasClass('drag-active')) {
        var droppableColumnAfter = $("<div>", {
          class: "droppable new-column-after"
        }).css((0, _css2.default)("newColumnAfter", $(draggable)));
        droppableColumnAfter.data("column", $(draggable));
        droppableColumnAfter.data("insertFunction", $(draggable).insertAfter);
        droppablesContainer.append(droppableColumnAfter);
      }
    }
  });
}

/**
 /**
 *
 * @param droppablesContainer
 */
function createNestingDroppables(droppablesContainer) {
  var draggables = $(".draggable").not(".drag-active, .ui-draggable-dragging");

  jQuery.each(draggables, function (index, draggable) {
    if ($(draggable).siblings().length > 0 && !_requirement2.default.checkColumnLevel($(draggable)) && !_requirement2.default.isColumnContainingRow($(draggable))) {
      var droppableRowAbove = $("<div>", {
        class: "droppable new-inside-above"
      }).css((0, _css2.default)("newInsideAbove", $(draggable)));
      droppableRowAbove.data("column", $(draggable));
      droppableRowAbove.data("insertFunction", $(draggable).prepend);
      droppablesContainer.append(droppableRowAbove);

      var droppableRowBelow = $("<div>", {
        class: "droppable new-inside-below"
      }).css((0, _css2.default)("newInsideBelow", $(draggable)));
      droppableRowBelow.data("column", $(draggable));
      droppableRowBelow.data("insertFunction", $(draggable).append);
      droppablesContainer.append(droppableRowBelow);
    }
  });
}

/**
 *
 * @param editable
 */
function createDroppables(editable) {
  var droppablesContainer = $("<div>", { class: "droppables-container" }),
      nestedDroppablesContainer = $("<div>", { class: "droppables-container-nested" });

  editable.append(droppablesContainer);
  editable.append(nestedDroppablesContainer);

  createRowDroppables(droppablesContainer);
  createColumnsDroppables(droppablesContainer);
  createNestingDroppables(droppablesContainer);
  createAddToNestedDroppables(nestedDroppablesContainer);
}

/**
 *
 * @param editable
 */
function firstDroppable(editable) {
  var droppablesContainer = $("<div>", { class: "droppables-container" });

  var droppableRow = $("<div>", {
    class: "droppable new-row"
  }).css((0, _css2.default)("newRow", editable));

  droppableRow.data("row", editable);
  droppableRow.data("insertFunction", $(this).appendTo);
  droppablesContainer.append(droppableRow);

  droppablesContainer.appendTo(editable);
}

},{"./css":306,"./requirement":310,"./shared":313}],308:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _composite = require("./composite");

var _composite2 = _interopRequireDefault(_composite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Group = function (_Composite) {
  _inherits(Group, _Composite);

  function Group(name, elements) {
    _classCallCheck(this, Group);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Group).call(this, name));

    _this._m_elements = elements;
    return _this;
  }

  _createClass(Group, [{
    key: "toHTML",
    value: function toHTML() {
      var content = $("<div>", { class: "row" });
      var container = void 0;

      jQuery.each(this.elements, function (key, element) {
        container = $("<div>", {
          class: "columns medium-" + element.layout.medium + " large-" + element.layout.large
        });
        container.append(element.content.toHTML());
        content.append(container);
      });

      return content;
    }
  }, {
    key: "elements",
    get: function get() {
      return this._m_elements;
    },
    set: function set(value) {
      this._m_elements = value;
    }
  }]);

  return Group;
}(_composite2.default);

exports.default = Group;

},{"./composite":304}],309:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newNested = exports.newInside = exports.newColumn = exports.newRow = exports.updateRow = exports.removeDiv = undefined;

var _responsive = require("./responsive");

Object.keys(_responsive).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _responsive[key];
    }
  });
});

var _shared = require("./shared");

var shared = _interopRequireWildcard(_shared);

var resp = _interopRequireWildcard(_responsive);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.removeDiv = removeDiv;
exports.updateRow = updateRow;
exports.newRow = newRow;
exports.newColumn = newColumn;
exports.newInside = newInside;
exports.newNested = newNested;


/**
 * A simple (but awesome) recursive function to delete 'future-empty' after nesting
 * FIXME: Fix when removing by moving to another existing row
 * @param element
 * @returns {*}
 */
function removeDiv(element) {
  var eParent = element.parent();

  if (eParent.children().length < 2) element = removeDiv(eParent);

  return element;
}

/**
 *
 * @param row
 */
function updateRow(row) {
  var childrenCount = row.children().not(".ui-draggable-dragging").length,
      columns = row.children();

  jQuery.each(columns, function (index, column) {
    resp.setColumnSize($(column), childrenCount);
  });
}

/**
 *
 * @param containers
 * @param type
 * @returns {Array}
 */
function prepareContainersOperations(containers, type) {
  var origin = containers[0],
      target = containers[1],
      functionsList = [];

  if (shared.hasOneChildOnly(origin)) {
    functionsList.push(origin.remove);
  }

  if (type === "column" && origin[0] !== target[0]) {
    if (functionsList.length !== 1) {
      functionsList.push(function () {
        updateRow(origin);
      });
    }

    functionsList.push(function () {
      updateRow(target);
    });
  }

  if (!shared.hasOneChildOnly(origin) && type === "row") {
    functionsList.push(function () {
      updateRow(origin);
    });
  }
  return functionsList;
}

/**
 *
 * @param droppable
 * @param ui
 */
function newRow(droppable, ui) {
  var containers = [ui.draggable.parent(), droppable.data("row").parent()],
      updateList = prepareContainersOperations(containers, "row"),
      draggablesContainer = $("<div>", { class: "row draggables-container" });

  var draggable = ui.draggable.detach();

  draggablesContainer.append(draggable);
  droppable.data("insertFunction").apply(draggablesContainer, droppable.data("row"));
  updateRow(draggablesContainer);

  jQuery.each(updateList, function (index, update) {
    update.call(containers[index]);
  });
}

/**
 *
 * @param droppable
 * @param ui
 */
function newColumn(droppable, ui) {
  var containers = [ui.draggable.parent(), droppable.data("column").parent()],
      updateList = prepareContainersOperations(containers, "column");

  var draggable = ui.draggable.detach();

  droppable.data("insertFunction").apply(draggable, droppable.data("column"));

  jQuery.each(updateList, function (index, update) {
    update.call(containers[index]);
  });
}

/**
 *
 * @param droppable
 * @param draggable
 * @returns {*[]}
 */
function wrappingRowIntoColumn(droppable, draggable) {
  var oldColumn = droppable.data("column"),
      newRow1 = $("<div>", { class: "row" }),
      newRow2 = $("<div>", { class: "row" }),
      replacementColumn = $("<div>", { class: oldColumn.attr("class") });

  replacementColumn.addClass("nested-container");
  resp.setColumnSize(oldColumn, 1);
  resp.setColumnSize(draggable, 1);
  newRow2.append(draggable);
  oldColumn.wrap(replacementColumn);
  oldColumn.wrap(newRow1);

  return [oldColumn, newRow2];
}

/**
 *
 * @param droppable
 * @param ui
 */
function newInside(droppable, ui) {
  var containers = [ui.draggable.parent(), droppable.data("column").parent()],
      updateList = prepareContainersOperations(containers, "column");

  var draggable = ui.draggable.detach();

  var wrapped = wrappingRowIntoColumn(droppable, draggable);

  droppable.data("insertFunction").apply(wrapped[0].parent().parent(), wrapped[1]);

  jQuery.each(updateList, function (index, update) {
    update.call(containers[index]);
  });
}

/**
 *
 * @param droppable
 * @param ui
 */
function newNested(droppable, ui) {
  var containers = [ui.draggable.parent(), droppable.data("row").parent()],
      updateList = prepareContainersOperations(containers, "row"),
      draggablesContainer = $("<div>", { class: "row" });

  var draggable = ui.draggable.detach();

  draggablesContainer.append(draggable);
  droppable.data("insertFunction").apply(draggablesContainer, droppable.data("row"));
  updateRow(draggablesContainer);

  jQuery.each(updateList, function (index, update) {
    update.call(containers[index]);
  });
}

},{"./responsive":311,"./shared":313}],310:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Requirement = function () {
  function Requirement() {
    _classCallCheck(this, Requirement);
  }

  _createClass(Requirement, null, [{
    key: 'defineColumnsPriority',

    /**
     * This function is supposed to set (or return) columns "small" size
     * using content height.
     * If column's size greater than XXXpx -> small-12
     * Else:
     * @param row
     */
    value: function defineColumnsPriority(row) {}

    /**
     *
     * @param column
     * @returns {boolean}
     */

  }, {
    key: 'checkColumnLevel',
    value: function checkColumnLevel(column) {
      return column.parent('.row').length > 1;
    }

    /**
     *
     * @param row
     * @returns {boolean}
     */

  }, {
    key: 'checkMaximumColumnsByRow',
    value: function checkMaximumColumnsByRow(row) {
      return row.children().not(".ui-draggable-dragging, .drag-active").length > 3;
    }

    /**
     *
     * @param column
     * @returns {boolean}
     */

  }, {
    key: 'isColumnContainingRow',
    value: function isColumnContainingRow(column) {
      return column.children('.row').length > 0;
    }
  }]);

  return Requirement;
}();

exports.default = Requirement;

},{}],311:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnSize = getColumnSize;
exports.setColumnSize = setColumnSize;

/**
 *
 * @param count
 * @returns {{small: number, medium: number, large: number}}
 */

function getDefaultValues(count) {
  var values = void 0;

  switch (count) {
    case 1:
      values = { "small": 12, "medium": 12, "large": 12 };
      break;
    case 2:
      values = { "small": 6, "medium": 6, "large": 6 };
      break;
    case 3:
      values = { "small": 12, "medium": 4, "large": 4 };
      break;
    case 4:
      values = { "small": 12, "medium": 3, "large": 3 };
      break;
    default:
      break;
  }
  console.log();
  return values;
}

/**
 *
 * @param column
 * @param sizesList
 * @returns {*}
 */
function getColumnSize(column, sizesList) {
  var size = {};
  var cls = column.attr('class').split(' ');

  for (var i = 0; i < cls.length; i++) {
    if (cls[i].indexOf("small-") > -1) {
      size.small = cls[i];
    }
    if (cls[i].indexOf("medium-") > -1) {
      size.medium = cls[i];
    }
    if (cls[i].indexOf("large-") > -1) {
      size.large = cls[i];
    }
  }
  return size;
}

/**
 *
 * @param column
 * @param count
 * @param sizesList
 */
function setColumnSize(column, count, sizesList) {
  var size = void 0;

  if (Number.isInteger(count)) size = getDefaultValues(count);else size = count;

  if (size.small === undefined) {
    size.small = getColumnSize(column).small;
    size.small = size.small.slice(6, size.small.length);
  }

  column.removeClass(function (index, css) {
    return (css.match(/(^|\s)small-\S+/g) || []).join(' ');
  });
  column.removeClass(function (index, css) {
    return (css.match(/(^|\s)medium-\S+/g) || []).join(' ');
  });
  column.removeClass(function (index, css) {
    return (css.match(/(^|\s)large-\S+/g) || []).join(' ');
  });
  column.addClass("small-" + size.small + " medium-" + size.medium + " large-" + size.large);
}

},{}],312:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCustomizables = getCustomizables;
exports.optionList = optionList;
/*
 * Paramètres des Types et Classes éditables
 */

var paramList = {
  'P': ["color", "font-size", "margin", "padding", "letter-spacing", "line-height", "text-align", "text-transform", "text-shadow", "font-weight"],
  'A': ["background-color", "border", "border-radius", "color", "margin", "padding", "letter-spacing", "line-height", "text-align", "text-transform", "text-shadow", "font-weight"],
  'H1': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height", "text-align", "text-transform", "text-shadow", "font-weight"],
  'H2': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height", "text-align", "text-transform", "text-shadow", "font-weight"],
  'H3': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height", "text-align", "text-transform", "text-shadow", "font-weight"],
  'H4': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height", "text-align", "text-transform", "text-shadow", "font-weight"],
  'H5': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height", "text-align", "text-transform", "text-shadow", "font-weight"],
  'H6': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height", "text-align", "text-transform", "text-shadow", "font-weight"],
  'DIV': ["background", "margin", "padding", "border-style", "border-width", "border-color", "border-radius", "box-shadow"],
  'IMG': ["margin", "border-radius", "opacity", "width"],
  'LABEL': ["color", "font-size", "text-shadow", "text-transform"],
  'INPUT': ["background-color", "color", "font-size", "border", "border-radius", "box-shadow", "font-size", "margin", "padding", "text-align"],
  'SELECT': ["background-color", "border", "border-radius", "box-shadow", "font-size", "margin", "padding", "text-align"],
  'TEXTAREA': ["background-color", "border", "border-radius", "box-shadow", "font-size", "height", "margin", "padding", "text-align"],
  'OPTION': ["background-color", "color", "font-size", "text-transform"],
  'BUTTON': ["background-color", "color", "font-size", "margin", "padding", "border", "border-radius", "box-shadow", "font-weight", "text-transform", "text-shadow", "opacity"]
};

/**
 *
 * @returns {{P: string[], A: string[], H1: string[], H2: string[], H3: string[], H4: string[], H5: string[], H6: string[], DIV: string[], IMG: string[], LABEL: string[], INPUT: string[], SELECT: string[], TEXTAREA: string[], OPTION: string[], BUTTON: string[]}}
 */
function getCustomizables() {
  return paramList;
}

var optList = {
  'font-weight': ["normal", "bold", "bolder", "lighter", "initial", "inherit"],
  'text-align': ["left", "right", "center", "justify", "initial", "inherit"],
  'text-transform': ["none", "capitalize", "uppercase", "lowercase", "initial", "inherit"]
};

/*
 * Liste des Options
 */
function optionList(select, default_option) {
  var options = "";
  for (var i = 0; i < optList[select].length; i++) {
    options += "<option value='" + optList[select][i] + "' ";
    if (default_option === optList[select][i]) {
      options += "selected";
    }
    options += ">" + optList[select][i] + "</option>";
  }
  return options;
}

/*
 * Liste des Outils
 */
/*
function toolList(target, typet) {
  var contenu = "";
  for (var i = 0; i < paramList[typet].length; i++) {
    if (paramList[typet][i] === "text-align" || paramList[typet][i] === "text-transform" || paramList[typet][i] === "font-weight") {
      contenu += "<label>" + paramList[typet][i] + "<select data-css='" + paramList[typet][i] + "'>" + optionList(paramList[typet][i], $("#result").contents().find(target).css(paramList[typet][i])) + "</select></label>";
    } else if (paramList[typet][i] === "background") {
      contenu += "<label>" + paramList[typet][i] + "<textarea data-css='" + paramList[typet][i] + "' placeholder='" + $("#result").contents().find(target).css(paramList[typet][i]) + "'>" + $("#result").contents().find(target).css(paramList[typet][i]) + "</textarea></label>";
    } else {
      contenu += "<label>" + paramList[typet][i] + "<input type='text' data-css='" + paramList[typet][i] + "' value='" + $("#result").contents().find(target).css(paramList[typet][i]) + "' placeholder='" + $("#result").contents().find(target).css(paramList[typet][i]) + "'></label>";
    }
  }
  return contenu;
}
 */

/*
 * Assignation des champs
 */
/*
 $("dl[id='toolbox'] input,select,textarea").on("change input", function () {
 var node = $(this).parent().parent().parent().attr("name");
 if (!data['children'].hasOwnProperty(node)) {
 data['children'][node] = {};
 }
 if (!data['children'][node].hasOwnProperty('attributes')) {
 data['children'][node]['attributes'] = {};
 }
 if (!data['children'][node]['attributes'].hasOwnProperty($(this).attr("data-css"))) {
 data['children'][node]['attributes'][$(this).attr("data-css")] = null;
 }
 data['children'][node]['attributes'][$(this).attr("data-css")] = $(this).val();
 if (data['children'][node]['attributes'][$(this).attr("data-css")] == "") {
 delete data['children'][node]['attributes'][$(this).attr("data-css")];
 }
 //reloadCSS();
 });
 */

},{}],313:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasOneChildOnly = hasOneChildOnly;

/**
 *
 * @param row
 * @returns {boolean}
 */

function hasOneChildOnly(row) {
  return row.children().not(".ui-draggable-dragging").length === 1 && row.children(".ui-draggable-dragging").length === 1;
}

},{}],314:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _composite = require("./composite");

var _composite2 = _interopRequireDefault(_composite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Structure = function (_Composite) {
  _inherits(Structure, _Composite);

  function Structure(name, parents, childrens) {
    _classCallCheck(this, Structure);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Structure).call(this, name));

    _this._m_parent = parents;
    _this._m_childrens = childrens;
    return _this;
  }

  _createClass(Structure, [{
    key: "toHTML",
    value: function toHTML() {
      var content = $("<" + this.parent.tag + ">", this.parent.attributes);

      jQuery.each(this.childrens, function (key, children) {
        content.append(children.toHTML());
      });

      return content;
    }
  }, {
    key: "parent",
    get: function get() {
      return this._m_parent;
    },
    set: function set(value) {
      this._m_parent = value;
    }
  }, {
    key: "childrens",
    get: function get() {
      return this._m_childrens;
    },
    set: function set(value) {
      this._m_childrens = value;
    }
  }]);

  return Structure;
}(_composite2.default);

exports.default = Structure;

},{"./composite":304}],315:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importTemplate = exports.exportTemplate = undefined;

var _responsive = require("./responsive");

var resp = _interopRequireWildcard(_responsive);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.exportTemplate = exportTemplate;
exports.importTemplate = importTemplate;


function exportTemplate(node) {
  /*
   jQuery.each(nodes, (index, node) => {
   window.console.log(node);
   });
   */

  //let test = toJSON(node);

  //let finalJSON = JSON.stringify(test, null, 2);

  window.console.log(JSON.stringify(toJSON(node)));
  //window.console.log(finalJSON);
}

function importTemplate() {
  alert("Test");
}

function toJSON(node) {
  node = node || this;

  var obj = {};
  var nodeType = void 0;
  var nodeSize = false;

  if ($(node).hasClass("editable")) {
    nodeType = "container";
  } else if ($(node).hasClass("row")) {
    nodeType = "row";
  } else if ($(node).hasClass("columns")) {
    nodeType = "columns";
    nodeSize = true;
  } else {
    nodeType = $(node).prop("tagName");
  }

  if (nodeSize) {
    var size = resp.getColumnSize($(node));
    obj["@small"] = parseInt(size.small.slice(6, size.small.length));
    obj["@large"] = parseInt(size.large.slice(6, size.large.length));
  }

  obj["@class"] = "Test"; //node.classList;

  var childNodes = $(node).children();

  if (childNodes.length > 0 && nodeType !== "P") {
    obj[nodeType] = [];
    jQuery.each(childNodes, function (index, childNode) {
      if ($(node).not(".js-off-canvas-exit")) obj[nodeType].push(toJSON(childNode));
    });
  } else {
    if (nodeType === "P") {
      obj[nodeType] = $(node).html();
    } else {
      obj[nodeType] = $(node).text();
    }
  }

  return obj;
}

function toDOM(obj) {
  if (typeof obj == 'string') {
    obj = JSON.parse(obj);
  }
  var node = void 0,
      nodeType = obj.nodeType;
  switch (nodeType) {
    case 1:
      //ELEMENT_NODE
      node = document.createElement(obj.tagName);
      var attributes = obj.attributes || [];
      for (var i = 0, len = attributes.length; i < len; i++) {
        var attr = attributes[i];
        node.setAttribute(attr[0], attr[1]);
      }
      break;
    case 3:
      //TEXT_NODE
      node = document.createTextNode(obj.nodeValue);
      break;
    case 8:
      //COMMENT_NODE
      node = document.createComment(obj.nodeValue);
      break;
    case 9:
      //DOCUMENT_NODE
      node = document.implementation.createDocument();
      break;
    case 10:
      //DOCUMENT_TYPE_NODE
      node = document.implementation.createDocumentType(obj.nodeName);
      break;
    case 11:
      //DOCUMENT_FRAGMENT_NODE
      node = document.createDocumentFragment();
      break;
    default:
      return node;
  }
  if (nodeType == 1 || nodeType == 11) {
    var childNodes = obj.childNodes || [];
    var _i = void 0;
    var _len = childNodes.length;
    for (_i = 0; _i < _len; _i++) {
      node.appendChild(toDOM(childNodes[_i]));
    }
  }
  return node;
}

/**
 *
 */
function reloadCSS() {
  var res = $("#result");
  res.contents().find("*").removeAttr("style");
  for (var init = 0; init < 3; init++) {
    for (var target in data['children']) {
      if (!target.match("^.") && !target.match("^#") && init == 0 || target.match("^.") && init == 1 || target.match("^#") && init == 2) for (var cssName in data['children'][target]['attributes']) {
        res.contents().find(target).css(cssName, data['children'][target]['attributes'][cssName]);
      }
    }
  }
}

/**
 *
 */
$("#export").on("click", function () {
  ddlTemplate();
});

function ddlTemplate() {
  var a = document.createElement('a');
  var now = new Date(Date.now());
  var options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  a.setAttribute('download', document.domain + '_' + now.toLocaleDateString('fr-FR', options) + '.json');
  a.href = 'data:application/json,' + exportTemplate();
  a.innerHTML = 'testing';
  a.style.display = 'none';
  document.body.appendChild(a);

  a.click();
}

/**
 *
 */
$("#import").on("click", function () {
  $("#fileInput").click();
  toDOM();
  reloadCSS();
});

},{"./responsive":311}],316:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require("./component");

var _component2 = _interopRequireDefault(_component);

var _structure = require("./structure");

var _structure2 = _interopRequireDefault(_structure);

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Improve this mess

var shortLoremIpsum = "Wingardium Leviosa",
    loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

var parametersComponents = [{ id: "header1", name: "Header 1", tag: "h1", attributes: { class: "tiny-mce", "text": shortLoremIpsum } }, { id: "header2", name: "Header 2", tag: "h2", attributes: { class: "tiny-mce", "text": shortLoremIpsum } }, { id: "header3", name: "Header 3", tag: "h3", attributes: { class: "tiny-mce", "text": shortLoremIpsum } }, { id: "header4", name: "Header 4", tag: "h4", attributes: { class: "tiny-mce", "text": shortLoremIpsum } }, { id: "header5", name: "Header 5", tag: "h5", attributes: { class: "tiny-mce", "text": shortLoremIpsum } }, { id: "header6", name: "Header 6", tag: "h6", attributes: { class: "tiny-mce", "text": shortLoremIpsum } }, { id: "p", name: "Paragraphe", tag: "p", attributes: { class: "tiny-mce", "text": shortLoremIpsum } }, {
  id: "rt", name: "Texte Riche", tag: "div", attributes: {
    class: "tiny-mce",
    "data-text": "Double-cliquez pour éditer",
    "text": loremIpsum
  }
}, {
  id: "img", name: "Image", tag: "img", attributes: {
    "src": "https://placeholdit.imgix.net/~text?txtsize=42&txt=Your+Picture+Here&w=250&h=150"
  }
}, {
  id: "btn", name: "Button", tag: "button", attributes: {
    class: "success button",
    "text": "Click me"
  }
}];

var Tool = {
  /**
   *
   * @returns {{}}
   */

  initComponents: function initComponents() {
    var components = {};

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = parametersComponents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var parameters = _step.value;

        components["" + parameters.id] = new _component2.default(parameters.name, parameters.tag, parameters.attributes);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return components;
  },


  /**
   *
   * @param components
   * @returns {{}}
   */
  initStructures: function initStructures(components) {
    var structures = {};

    var mediaObject = new _component2.default("MediaObject", "div", { class: "media-object" });

    var mediaObjectStack = new _component2.default("MediaObject", "div", { class: "media-object stack-for-small" });

    var mediaObjectSection = new _component2.default("MOS1", "div", { class: "media-object-section" });

    var headerImg = new _structure2.default("headerImg", mediaObjectSection, [new _component2.default("Little Img", "img", {
      "src": "https://placeholdit.imgix.net/~text?txtsize=42&txt=Your+Picture+Here&w=250&h=150",
      "style": "width: 20px; height: 20px"
    })]);

    var headerTitle = new _structure2.default("headerTitle", mediaObjectSection, [new _component2.default("Little Text", "h4", { class: "tiny-mce", "text": shortLoremIpsum })]);

    structures.header = new _structure2.default("Simple Header", mediaObject, [headerImg, headerTitle]);

    structures.textArea = new _structure2.default("Text Area", new _component2.default("Label", "label", { "text": "Text Area: " }), [new _component2.default("Text Area", "textarea", { "placeholder": "none" })]);

    structures.inputText = new _structure2.default("Input Text", new _component2.default("Label", "label", { "text": "Text: " }), [new _component2.default("Input", "input", { "type": "text" })]);

    structures.inputDate = new _structure2.default("Input Date", new _component2.default("Label", "label", { "text": "Date: " }), [new _component2.default("Input", "input", { "type": "date" })]);

    structures.inputDateTime = new _structure2.default("Input DateTime", new _component2.default("Label", "label", { "text": "Datetime: " }), [new _component2.default("Input", "input", { "type": "datetime" })]);

    structures.inputDTL = new _structure2.default("Input DateTime-Local", new _component2.default("Label", "label", { "text": "Datetime-Local: " }), [new _component2.default("Input", "input", { "type": "datetime-local" })]);

    structures.inputEmail = new _structure2.default("Input Email", new _component2.default("Label", "label", { "text": "Email: " }), [new _component2.default("Input", "input", { "type": "email" })]);

    structures.inputMonth = new _structure2.default("Input Month", new _component2.default("Label", "label", { "text": "Month: " }), [new _component2.default("Input", "input", { "type": "month" })]);

    structures.inputNumber = new _structure2.default("Input Number", new _component2.default("Label", "label", { "text": "Number: " }), [new _component2.default("Input", "input", { "type": "number" })]);

    structures.inputPassword = new _structure2.default("Input Password", new _component2.default("Label", "label", { "text": "Password: " }), [new _component2.default("Input", "input", { "type": "password" })]);

    structures.inputSearch = new _structure2.default("Input Search", new _component2.default("Label", "label", { "text": "Search: " }), [new _component2.default("Input", "input", { "type": "search" })]);

    structures.inputTel = new _structure2.default("Input Tel", new _component2.default("Label", "label", { "text": "Tel: " }), [new _component2.default("Input", "input", { "type": "tel" })]);

    structures.inputTime = new _structure2.default("Input Time", new _component2.default("Label", "label", { "text": "Time: " }), [new _component2.default("Input", "input", { "type": "time" })]);

    structures.inputURL = new _structure2.default("Input URL", new _component2.default("Label", "label", { "text": "URL: " }), [new _component2.default("Input", "input", { "type": "url" })]);

    structures.inputWeek = new _structure2.default("Input Week", new _component2.default("Label", "label", { "text": "Week: " }), [new _component2.default("Input", "input", { "type": "week" })]);

    var thumb = new _structure2.default("Thumb", new _component2.default("ImgContainer", "div", { class: "thumbnail" }), [components.img]);

    var img = new _structure2.default("ImgContainer", new _component2.default("ImgContainer", "div", { class: "text-center" }), [components.img]);

    var mos1 = new _structure2.default("MOS2", mediaObjectSection, [thumb]);

    var title = new _component2.default("Strong", "strong", {
      "contenteditable": "true",
      "text": "Lorem ipsum dolor sit amet, consectetur ai"
    });

    var text = new _component2.default("Span", "span", {
      "contenteditable": "true",
      "text": "Lorem ipsum dolor sit amet, consectetur ai"
    });

    var test = new _structure2.default("Test", new _component2.default("Span", "span", {}), [title]);

    var link = new _component2.default("Lien", "a", {
      "contenteditable": "true",
      "href": "#",
      "text": "Super lien, clique vite"
    });

    var mos2 = new _structure2.default("MOS2", mediaObjectSection, [test, new _component2.default("Span", "br", {}), text, new _component2.default("Span", "br", {}), link]);

    structures.figure = new _structure2.default("Figure", mediaObjectStack, [mos1, mos2]);

    structures.image = img;

    return structures;
  },


  /**
   *
   * @param components
   * @param structures
   * @returns {{}}
   */
  initGroups: function initGroups(components, structures) {
    var groups = {};

    groups.login = new _group2.default("Login", [{ layout: { "medium": 4, "large": 4 }, content: structures.inputEmail }, { layout: { "medium": 4, "large": 4 }, content: structures.inputPassword }, { layout: { "medium": 4, "large": 4 }, content: components.btn }]);

    groups.contact = new _group2.default("Contact", [{ layout: { "medium": 6, "large": 6 }, content: structures.inputEmail }, { layout: { "medium": 6, "large": 6 }, content: structures.inputTel }, { layout: { "medium": 12, "large": 12 }, content: structures.textArea }, { layout: { "medium": 12, "large": 12 }, content: components.btn }]);

    var details = new _group2.default("Details", [{ layout: { "medium": 12, "large": 12 }, content: structures.inputText }, { layout: { "medium": 12, "large": 12 }, content: structures.inputText }]);

    groups.profile = new _group2.default("Profile", [{ layout: { "medium": 3, "large": 3 }, content: components.img }, { layout: { "medium": 9, "large": 9 }, content: details }, { layout: { "medium": 12, "large": 12 }, content: components.btn }]);

    groups.address = new _group2.default("Address", [{ layout: { "medium": 12, "large": 12 }, content: structures.inputText }, { layout: { "medium": 12, "large": 12 }, content: structures.inputText }, { layout: { "medium": 12, "large": 12 }, content: structures.inputText }, { layout: { "medium": 12, "large": 12 }, content: structures.inputText }, { layout: { "medium": 12, "large": 12 }, content: structures.inputText }, { layout: { "medium": 12, "large": 12 }, content: structures.inputText }, { layout: { "medium": 12, "large": 12 }, content: structures.inputText }, { layout: { "medium": 12, "large": 12 }, content: components.btn }]);

    return groups;
  }
};

exports.default = Tool;


var namespace = {
  get singleton() {
    // BEGIN iife
    var singleton = void 0;
    return function () {
      if (!singleton) {
        singleton = {
          amethod: function amethod() {
            console.log("amethod");
          }
        };
      }
      return singleton;
    };
  } // END iife
};
// Invoke: namespace.singleton().amethod()

},{"./component":303,"./group":308,"./structure":314}],317:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _tool = require("./tool");

var _tool2 = _interopRequireDefault(_tool);

var _template = require("./template");

var template = _interopRequireWildcard(_template);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(div) {
  $.widget('plb.toolbox', {
    options: {
      debug: false
    },
    draggables: null,
    _create: function _create() {
      var that = this;
      if (this.options.debug) {
        this.element.addClass("debug");
      }

      var li = void 0;
      var span = void 0;

      var components = _tool2.default.initComponents();
      var structures = _tool2.default.initStructures(components);
      var groups = _tool2.default.initGroups(components, structures);

      jQuery.each(components, function (index, component) {
        li = $("<li>");
        li.data("data", component.toHTML());
        span = $("<span>", { class: "draggable-model" });
        span.text(component.name);
        li.append(span);
        $("#componentsContainer").append(li);
      });

      jQuery.each(structures, function (index, structure) {
        li = $("<li>");
        li.data("data", structure.toHTML());
        span = $("<span>", { class: "draggable-model" });
        span.text(structure.name);
        li.append(span);
        $("#structuresContainer").append(li);
      });

      jQuery.each(groups, function (index, group) {
        li = $("<li>");
        li.data("data", group.toHTML());
        span = $("<span>", { class: "draggable-model" });
        span.text(group.name);
        li.append(span);
        $("#groupsContainer").append(li);
      });

      that.draggables = $("#componentsContainer, #structuresContainer, #groupsContainer").children();
    },


    /**
     *
     */
    newPLB: function newPLB() {
      var editable = $("#editable-area");

      this.draggables.draggable({
        opacity: 0.5,
        appendTo: editable,
        containment: editable,
        helper: "clone",
        start: function start() {
          editable.content('initDroppables');
        },
        stop: function stop() {
          editable.find(".droppables-container").remove();
          editable.find(".droppables-container-nested").remove();
        }
      });

      $(".submit-template").on("click", function () {
        template.exportTemplate($("#editable-area"));
      });
    }
  });

  div.toolbox({ debug: false });
  div.toolbox("newPLB");
}

},{"./template":315,"./tool":316}]},{},[299])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvZm4vcmVnZXhwL2VzY2FwZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hLW51bWJlci12YWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktY29weS13aXRoaW4uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1maWxsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktbWV0aG9kcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LXJlZHVjZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2JpbmQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jbGFzc29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29sbGVjdGlvbi1zdHJvbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLXRvLWpzb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLXdlYWsuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RhdGUtdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy1pcy1yZWdleHAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZpeC1yZS13a3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mbGFncy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Zvci1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19odG1sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW52b2tlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1yZWdleHAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19rZXlvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19tYXRoLWV4cG0xLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWF0aC1sb2cxcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21hdGgtc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21ldGEuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19tZXRhZGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21pY3JvdGFzay5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1mb3JjZWQtcGFtLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC10by1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX293bi1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcGFyc2UtZmxvYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJzZS1pbnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJ0aWFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcGF0aC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlcGxhY2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2FtZS12YWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC1wcm90by5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmljdC1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctY29udGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1odG1sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLXBhZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1yZXBlYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctdHJpbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy13cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3Rhc2suanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdHlwZWQtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC1idWZmZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3VpZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL193a3MtZXh0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fd2tzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUucmVnZXhwLmVzY2FwZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmNvcHktd2l0aGluLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZXZlcnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maWxsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmlsdGVyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbmQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5mb3ItZWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5pbmRleC1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmlzLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5qb2luLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkubGFzdC1pbmRleC1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lm1hcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lm9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkucmVkdWNlLXJpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkucmVkdWNlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc2xpY2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5zb21lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc29ydC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNwZWNpZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5kYXRlLm5vdy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUudG8taXNvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUudG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUudG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZGF0ZS50by1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5iaW5kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24uaGFzLWluc3RhbmNlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYWNvc2guanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmFzaW5oLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5hdGFuaC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY2JydC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY2x6MzIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmNvc2guanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmV4cG0xLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5mcm91bmQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmh5cG90LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5pbXVsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5sb2cxMC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgubG9nMXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmxvZzIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLnNpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLnNpbmguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLnRhbmguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLnRydW5jLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmNvbnN0cnVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmVwc2lsb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuaXMtZmluaXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuaXMtbmFuLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLXNhZmUtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5tYXgtc2FmZS1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLm1pbi1zYWZlLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtZmxvYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtaW50LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnRvLWZpeGVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnRvLXByZWNpc2lvbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0aWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1leHRlbnNpYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmlzLWZyb3plbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1zZWFsZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5wcmV2ZW50LWV4dGVuc2lvbnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Quc2VhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnBhcnNlLWZsb2F0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucGFyc2UtaW50LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuYXBwbHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmNvbnN0cnVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5kZWxldGUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmVudW1lcmF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0Lmhhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuaXMtZXh0ZW5zaWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Qub3duLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LnByZXZlbnQtZXh0ZW5zaW9ucy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmNvbnN0cnVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmZsYWdzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLm1hdGNoLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnJlcGxhY2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuc2VhcmNoLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnNwbGl0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnNldC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5hbmNob3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuYmlnLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmJsaW5rLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmJvbGQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuY29kZS1wb2ludC1hdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5lbmRzLXdpdGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZml4ZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZm9udGNvbG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmZvbnRzaXplLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmZyb20tY29kZS1wb2ludC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGFsaWNzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmxpbmsuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmF3LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnJlcGVhdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zbWFsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdGFydHMtd2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdHJpa2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuc3ViLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnN1cC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy50cmltLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuYXJyYXktYnVmZmVyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuZGF0YS12aWV3LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuZmxvYXQzMi1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmZsb2F0NjQtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5pbnQxNi1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmludDMyLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuaW50OC1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQxNi1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQzMi1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQ4LWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQudWludDgtY2xhbXBlZC1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LndlYWstbWFwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYud2Vhay1zZXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5hcnJheS5pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LmFzYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5lcnJvci5pcy1lcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hcC50by1qc29uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWF0aC5pYWRkaC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hdGguaW11bGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5tYXRoLmlzdWJoLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWF0aC51bXVsaC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5kZWZpbmUtZ2V0dGVyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmRlZmluZS1zZXR0ZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0Lmxvb2t1cC1nZXR0ZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QubG9va3VwLXNldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5kZWZpbmUtbWV0YWRhdGEuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0LmRlbGV0ZS1tZXRhZGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuZ2V0LW1ldGFkYXRhLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0LmdldC1tZXRhZGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuZ2V0LW93bi1tZXRhZGF0YS1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtb3duLW1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5oYXMtbWV0YWRhdGEuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0Lmhhcy1vd24tbWV0YWRhdGEuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0Lm1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc2V0LnRvLWpzb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcuYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcubWF0Y2gtYWxsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnBhZC1lbmQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcucGFkLXN0YXJ0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnRyaW0tbGVmdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy50cmltLXJpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zeXN0ZW0uZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuaW1tZWRpYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudGltZXJzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvc2hpbS5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwicHVibGljL2phdmFzY3JpcHRzL0VTNi9hcHAuanMiLCJwdWJsaWMvamF2YXNjcmlwdHMvRVM2L21vZHVsZXMvYmFzZS9iYXNlLmpzIiwicHVibGljL2phdmFzY3JpcHRzL0VTNi9tb2R1bGVzL2Jhc2UvYm9vdHN0cmFwMy5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9FUzYvbW9kdWxlcy9iYXNlL2ZvdW5kYXRpb242LmpzIiwicHVibGljL2phdmFzY3JpcHRzL0VTNi9tb2R1bGVzL2NvbXBvbmVudC5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9FUzYvbW9kdWxlcy9jb21wb3NpdGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdHMvRVM2L21vZHVsZXMvY29udGVudC5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9FUzYvbW9kdWxlcy9jc3MuanMiLCJwdWJsaWMvamF2YXNjcmlwdHMvRVM2L21vZHVsZXMvZHJvcHBhYmxlLmpzIiwicHVibGljL2phdmFzY3JpcHRzL0VTNi9tb2R1bGVzL2dyb3VwLmpzIiwicHVibGljL2phdmFzY3JpcHRzL0VTNi9tb2R1bGVzL2xheW91dC5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9FUzYvbW9kdWxlcy9yZXF1aXJlbWVudC5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9FUzYvbW9kdWxlcy9yZXNwb25zaXZlLmpzIiwicHVibGljL2phdmFzY3JpcHRzL0VTNi9tb2R1bGVzL3NldHRpbmdzLmpzIiwicHVibGljL2phdmFzY3JpcHRzL0VTNi9tb2R1bGVzL3NoYXJlZC5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9FUzYvbW9kdWxlcy9zdHJ1Y3R1cmUuanMiLCJwdWJsaWMvamF2YXNjcmlwdHMvRVM2L21vZHVsZXMvdGVtcGxhdGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdHMvRVM2L21vZHVsZXMvdG9vbC5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9FUzYvbW9kdWxlcy90b29sYm94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMvQkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTs7QUNGQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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SyxVQUFMLEdBQWtCLEVBQUUsOERBQUYsRUFBa0UsUUFBbEUsRUFBbEI7QUFDRCxLQTlDcUI7Ozs7OztBQW1EdEIsVUFuRHNCLG9CQW1EYjtBQUNQLFVBQU0sV0FBVyxFQUFFLGdCQUFGLENBQWpCOztBQUVBLFdBQUssVUFBTCxDQUFnQixTQUFoQixDQUEwQjtBQUN4QixpQkFBUyxHQURlO0FBRXhCLGtCQUFVLFFBRmM7QUFHeEIscUJBQWEsUUFIVztBQUl4QixnQkFBUSxPQUpnQjtBQUt4QixhQUx3QixtQkFLaEI7QUFDTixtQkFBUyxPQUFULENBQWlCLGdCQUFqQjtBQUNELFNBUHVCO0FBUXhCLFlBUndCLGtCQVFqQjtBQUNMLG1CQUFTLElBQVQsQ0FBYyx1QkFBZCxFQUF1QyxNQUF2QztBQUNBLG1CQUFTLElBQVQsQ0FBYyw4QkFBZCxFQUE4QyxNQUE5QztBQUNEO0FBWHVCLE9BQTFCOztBQWNBLFFBQUUsa0JBQUYsRUFBc0IsRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsWUFBWTtBQUM1QyxpQkFBUyxjQUFULENBQXdCLEVBQUUsZ0JBQUYsQ0FBeEI7QUFDRCxPQUZEO0FBR0Q7QUF2RXFCLEdBQXhCOztBQTBFQSxNQUFJLE9BQUosQ0FBWSxFQUFDLE9BQU8sS0FBUixFQUFaO0FBQ0EsTUFBSSxPQUFKLENBQVksUUFBWjtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuXG5yZXF1aXJlKFwiY29yZS1qcy9zaGltXCIpO1xuXG5yZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCIpO1xuXG5yZXF1aXJlKFwiY29yZS1qcy9mbi9yZWdleHAvZXNjYXBlXCIpO1xuXG4vKiBlc2xpbnQgbWF4LWxlbjogMCAqL1xuXG5pZiAoZ2xvYmFsLl9iYWJlbFBvbHlmaWxsKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIm9ubHkgb25lIGluc3RhbmNlIG9mIGJhYmVsLXBvbHlmaWxsIGlzIGFsbG93ZWRcIik7XG59XG5nbG9iYWwuX2JhYmVsUG9seWZpbGwgPSB0cnVlO1xuXG4vLyBTaG91bGQgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlOlxuXG52YXIgREVGSU5FX1BST1BFUlRZID0gXCJkZWZpbmVQcm9wZXJ0eVwiO1xuZnVuY3Rpb24gZGVmaW5lKE8sIGtleSwgdmFsdWUpIHtcbiAgT1trZXldIHx8IE9iamVjdFtERUZJTkVfUFJPUEVSVFldKE8sIGtleSwge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfSk7XG59XG5cbmRlZmluZShTdHJpbmcucHJvdG90eXBlLCBcInBhZExlZnRcIiwgXCJcIi5wYWRTdGFydCk7XG5kZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgXCJwYWRSaWdodFwiLCBcIlwiLnBhZEVuZCk7XG5cblwicG9wLHJldmVyc2Usc2hpZnQsa2V5cyx2YWx1ZXMsZW50cmllcyxpbmRleE9mLGV2ZXJ5LHNvbWUsZm9yRWFjaCxtYXAsZmlsdGVyLGZpbmQsZmluZEluZGV4LGluY2x1ZGVzLGpvaW4sc2xpY2UsY29uY2F0LHB1c2gsc3BsaWNlLHVuc2hpZnQsc29ydCxsYXN0SW5kZXhPZixyZWR1Y2UscmVkdWNlUmlnaHQsY29weVdpdGhpbixmaWxsXCIuc3BsaXQoXCIsXCIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBbXVtrZXldICYmIGRlZmluZShBcnJheSwga2V5LCBGdW5jdGlvbi5jYWxsLmJpbmQoW11ba2V5XSkpO1xufSk7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9jb3JlLnJlZ2V4cC5lc2NhcGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlJlZ0V4cC5lc2NhcGU7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBtc2cpe1xyXG4gIGlmKHR5cGVvZiBpdCAhPSAnbnVtYmVyJyAmJiBjb2YoaXQpICE9ICdOdW1iZXInKXRocm93IFR5cGVFcnJvcihtc2cpO1xyXG4gIHJldHVybiAraXQ7XHJcbn07IiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyIFVOU0NPUEFCTEVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3Vuc2NvcGFibGVzJylcbiAgLCBBcnJheVByb3RvICA9IEFycmF5LnByb3RvdHlwZTtcbmlmKEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZClyZXF1aXJlKCcuL19oaWRlJykoQXJyYXlQcm90bywgVU5TQ09QQUJMRVMsIHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgQXJyYXlQcm90b1tVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKXtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gMjIuMS4zLjMgQXJyYXkucHJvdG90eXBlLmNvcHlXaXRoaW4odGFyZ2V0LCBzdGFydCwgZW5kID0gdGhpcy5sZW5ndGgpXG4ndXNlIHN0cmljdCc7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvSW5kZXggID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gW10uY29weVdpdGhpbiB8fCBmdW5jdGlvbiBjb3B5V2l0aGluKHRhcmdldC8qPSAwKi8sIHN0YXJ0Lyo9IDAsIGVuZCA9IEBsZW5ndGgqLyl7XG4gIHZhciBPICAgICA9IHRvT2JqZWN0KHRoaXMpXG4gICAgLCBsZW4gICA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICwgdG8gICAgPSB0b0luZGV4KHRhcmdldCwgbGVuKVxuICAgICwgZnJvbSAgPSB0b0luZGV4KHN0YXJ0LCBsZW4pXG4gICAgLCBlbmQgICA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkXG4gICAgLCBjb3VudCA9IE1hdGgubWluKChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IHRvSW5kZXgoZW5kLCBsZW4pKSAtIGZyb20sIGxlbiAtIHRvKVxuICAgICwgaW5jICAgPSAxO1xuICBpZihmcm9tIDwgdG8gJiYgdG8gPCBmcm9tICsgY291bnQpe1xuICAgIGluYyAgPSAtMTtcbiAgICBmcm9tICs9IGNvdW50IC0gMTtcbiAgICB0byAgICs9IGNvdW50IC0gMTtcbiAgfVxuICB3aGlsZShjb3VudC0tID4gMCl7XG4gICAgaWYoZnJvbSBpbiBPKU9bdG9dID0gT1tmcm9tXTtcbiAgICBlbHNlIGRlbGV0ZSBPW3RvXTtcbiAgICB0byAgICs9IGluYztcbiAgICBmcm9tICs9IGluYztcbiAgfSByZXR1cm4gTztcbn07IiwiLy8gMjIuMS4zLjYgQXJyYXkucHJvdG90eXBlLmZpbGwodmFsdWUsIHN0YXJ0ID0gMCwgZW5kID0gdGhpcy5sZW5ndGgpXG4ndXNlIHN0cmljdCc7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvSW5kZXggID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpbGwodmFsdWUgLyosIHN0YXJ0ID0gMCwgZW5kID0gQGxlbmd0aCAqLyl7XG4gIHZhciBPICAgICAgPSB0b09iamVjdCh0aGlzKVxuICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgLCBhTGVuICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSB0b0luZGV4KGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCBsZW5ndGgpXG4gICAgLCBlbmQgICAgPSBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZFxuICAgICwgZW5kUG9zID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0luZGV4KGVuZCwgbGVuZ3RoKTtcbiAgd2hpbGUoZW5kUG9zID4gaW5kZXgpT1tpbmRleCsrXSA9IHZhbHVlO1xuICByZXR1cm4gTztcbn07IiwidmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlciwgSVRFUkFUT1Ipe1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvck9mKGl0ZXIsIGZhbHNlLCByZXN1bHQucHVzaCwgcmVzdWx0LCBJVEVSQVRPUik7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59OyIsIi8vIDAgLT4gQXJyYXkjZm9yRWFjaFxuLy8gMSAtPiBBcnJheSNtYXBcbi8vIDIgLT4gQXJyYXkjZmlsdGVyXG4vLyAzIC0+IEFycmF5I3NvbWVcbi8vIDQgLT4gQXJyYXkjZXZlcnlcbi8vIDUgLT4gQXJyYXkjZmluZFxuLy8gNiAtPiBBcnJheSNmaW5kSW5kZXhcbnZhciBjdHggICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGFzYyAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVFlQRSwgJGNyZWF0ZSl7XG4gIHZhciBJU19NQVAgICAgICAgID0gVFlQRSA9PSAxXG4gICAgLCBJU19GSUxURVIgICAgID0gVFlQRSA9PSAyXG4gICAgLCBJU19TT01FICAgICAgID0gVFlQRSA9PSAzXG4gICAgLCBJU19FVkVSWSAgICAgID0gVFlQRSA9PSA0XG4gICAgLCBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2XG4gICAgLCBOT19IT0xFUyAgICAgID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVhcbiAgICAsIGNyZWF0ZSAgICAgICAgPSAkY3JlYXRlIHx8IGFzYztcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KXtcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3QoJHRoaXMpXG4gICAgICAsIHNlbGYgICA9IElPYmplY3QoTylcbiAgICAgICwgZiAgICAgID0gY3R4KGNhbGxiYWNrZm4sIHRoYXQsIDMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSAwXG4gICAgICAsIHJlc3VsdCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWRcbiAgICAgICwgdmFsLCByZXM7XG4gICAgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKXtcbiAgICAgIHZhbCA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzID0gZih2YWwsIGluZGV4LCBPKTtcbiAgICAgIGlmKFRZUEUpe1xuICAgICAgICBpZihJU19NQVApcmVzdWx0W2luZGV4XSA9IHJlczsgICAgICAgICAgICAvLyBtYXBcbiAgICAgICAgZWxzZSBpZihyZXMpc3dpdGNoKFRZUEUpe1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsOyAgICAgICAgICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiByZXN1bHQucHVzaCh2YWwpOyAgICAgICAgICAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYoSVNfRVZFUlkpcmV0dXJuIGZhbHNlOyAgICAgICAgICAvLyBldmVyeVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogcmVzdWx0O1xuICB9O1xufTsiLCJ2YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXHJcbiAgLCB0b09iamVjdCAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxyXG4gICwgSU9iamVjdCAgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXHJcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGhhdCwgY2FsbGJhY2tmbiwgYUxlbiwgbWVtbywgaXNSaWdodCl7XHJcbiAgYUZ1bmN0aW9uKGNhbGxiYWNrZm4pO1xyXG4gIHZhciBPICAgICAgPSB0b09iamVjdCh0aGF0KVxyXG4gICAgLCBzZWxmICAgPSBJT2JqZWN0KE8pXHJcbiAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxyXG4gICAgLCBpbmRleCAgPSBpc1JpZ2h0ID8gbGVuZ3RoIC0gMSA6IDBcclxuICAgICwgaSAgICAgID0gaXNSaWdodCA/IC0xIDogMTtcclxuICBpZihhTGVuIDwgMilmb3IoOzspe1xyXG4gICAgaWYoaW5kZXggaW4gc2VsZil7XHJcbiAgICAgIG1lbW8gPSBzZWxmW2luZGV4XTtcclxuICAgICAgaW5kZXggKz0gaTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBpbmRleCArPSBpO1xyXG4gICAgaWYoaXNSaWdodCA/IGluZGV4IDwgMCA6IGxlbmd0aCA8PSBpbmRleCl7XHJcbiAgICAgIHRocm93IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpO1xyXG4gICAgfVxyXG4gIH1cclxuICBmb3IoO2lzUmlnaHQgPyBpbmRleCA+PSAwIDogbGVuZ3RoID4gaW5kZXg7IGluZGV4ICs9IGkpaWYoaW5kZXggaW4gc2VsZil7XHJcbiAgICBtZW1vID0gY2FsbGJhY2tmbihtZW1vLCBzZWxmW2luZGV4XSwgaW5kZXgsIE8pO1xyXG4gIH1cclxuICByZXR1cm4gbWVtbztcclxufTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxyXG4gICwgaXNBcnJheSAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXHJcbiAgLCBTUEVDSUVTICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsKXtcclxuICB2YXIgQztcclxuICBpZihpc0FycmF5KG9yaWdpbmFsKSl7XHJcbiAgICBDID0gb3JpZ2luYWwuY29uc3RydWN0b3I7XHJcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xyXG4gICAgaWYodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKUMgPSB1bmRlZmluZWQ7XHJcbiAgICBpZihpc09iamVjdChDKSl7XHJcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xyXG4gICAgICBpZihDID09PSBudWxsKUMgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfSByZXR1cm4gQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDO1xyXG59OyIsIi8vIDkuNC4yLjMgQXJyYXlTcGVjaWVzQ3JlYXRlKG9yaWdpbmFsQXJyYXksIGxlbmd0aClcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWwsIGxlbmd0aCl7XG4gIHJldHVybiBuZXcgKHNwZWNpZXNDb25zdHJ1Y3RvcihvcmlnaW5hbCkpKGxlbmd0aCk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBhRnVuY3Rpb24gID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgaXNPYmplY3QgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaW52b2tlICAgICA9IHJlcXVpcmUoJy4vX2ludm9rZScpXG4gICwgYXJyYXlTbGljZSA9IFtdLnNsaWNlXG4gICwgZmFjdG9yaWVzICA9IHt9O1xuXG52YXIgY29uc3RydWN0ID0gZnVuY3Rpb24oRiwgbGVuLCBhcmdzKXtcbiAgaWYoIShsZW4gaW4gZmFjdG9yaWVzKSl7XG4gICAgZm9yKHZhciBuID0gW10sIGkgPSAwOyBpIDwgbGVuOyBpKyspbltpXSA9ICdhWycgKyBpICsgJ10nO1xuICAgIGZhY3Rvcmllc1tsZW5dID0gRnVuY3Rpb24oJ0YsYScsICdyZXR1cm4gbmV3IEYoJyArIG4uam9pbignLCcpICsgJyknKTtcbiAgfSByZXR1cm4gZmFjdG9yaWVzW2xlbl0oRiwgYXJncyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLmJpbmQgfHwgZnVuY3Rpb24gYmluZCh0aGF0IC8qLCBhcmdzLi4uICovKXtcbiAgdmFyIGZuICAgICAgID0gYUZ1bmN0aW9uKHRoaXMpXG4gICAgLCBwYXJ0QXJncyA9IGFycmF5U2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICB2YXIgYm91bmQgPSBmdW5jdGlvbigvKiBhcmdzLi4uICovKXtcbiAgICB2YXIgYXJncyA9IHBhcnRBcmdzLmNvbmNhdChhcnJheVNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBib3VuZCA/IGNvbnN0cnVjdChmbiwgYXJncy5sZW5ndGgsIGFyZ3MpIDogaW52b2tlKGZuLCBhcmdzLCB0aGF0KTtcbiAgfTtcbiAgaWYoaXNPYmplY3QoZm4ucHJvdG90eXBlKSlib3VuZC5wcm90b3R5cGUgPSBmbi5wcm90b3R5cGU7XG4gIHJldHVybiBib3VuZDtcbn07IiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBjcmVhdGUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGhpZGUgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBhbkluc3RhbmNlICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBkZWZpbmVkICAgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxuICAsIGZvck9mICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCAkaXRlckRlZmluZSA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJylcbiAgLCBzdGVwICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgc2V0U3BlY2llcyAgPSByZXF1aXJlKCcuL19zZXQtc3BlY2llcycpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgZmFzdEtleSAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuZmFzdEtleVxuICAsIFNJWkUgICAgICAgID0gREVTQ1JJUFRPUlMgPyAnX3MnIDogJ3NpemUnO1xuXG52YXIgZ2V0RW50cnkgPSBmdW5jdGlvbih0aGF0LCBrZXkpe1xuICAvLyBmYXN0IGNhc2VcbiAgdmFyIGluZGV4ID0gZmFzdEtleShrZXkpLCBlbnRyeTtcbiAgaWYoaW5kZXggIT09ICdGJylyZXR1cm4gdGhhdC5faVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IoZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKXtcbiAgICBpZihlbnRyeS5rID09IGtleSlyZXR1cm4gZW50cnk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIGFuSW5zdGFuY2UodGhhdCwgQywgTkFNRSwgJ19pJyk7XG4gICAgICB0aGF0Ll9pID0gY3JlYXRlKG51bGwpOyAvLyBpbmRleFxuICAgICAgdGhhdC5fZiA9IHVuZGVmaW5lZDsgICAgLy8gZmlyc3QgZW50cnlcbiAgICAgIHRoYXQuX2wgPSB1bmRlZmluZWQ7ICAgIC8vIGxhc3QgZW50cnlcbiAgICAgIHRoYXRbU0laRV0gPSAwOyAgICAgICAgIC8vIHNpemVcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjEuMy4xIE1hcC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgLy8gMjMuMi4zLjIgU2V0LnByb3RvdHlwZS5jbGVhcigpXG4gICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKXtcbiAgICAgICAgZm9yKHZhciB0aGF0ID0gdGhpcywgZGF0YSA9IHRoYXQuX2ksIGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYoZW50cnkucCllbnRyeS5wID0gZW50cnkucC5uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmldO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuX2YgPSB0aGF0Ll9sID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGF0W1NJWkVdID0gMDtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuMyBNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy4yLjMuNCBTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICAgLCBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgICAgIGlmKGVudHJ5KXtcbiAgICAgICAgICB2YXIgbmV4dCA9IGVudHJ5Lm5cbiAgICAgICAgICAgICwgcHJldiA9IGVudHJ5LnA7XG4gICAgICAgICAgZGVsZXRlIHRoYXQuX2lbZW50cnkuaV07XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYocHJldilwcmV2Lm4gPSBuZXh0O1xuICAgICAgICAgIGlmKG5leHQpbmV4dC5wID0gcHJldjtcbiAgICAgICAgICBpZih0aGF0Ll9mID09IGVudHJ5KXRoYXQuX2YgPSBuZXh0O1xuICAgICAgICAgIGlmKHRoYXQuX2wgPT0gZW50cnkpdGhhdC5fbCA9IHByZXY7XG4gICAgICAgICAgdGhhdFtTSVpFXS0tO1xuICAgICAgICB9IHJldHVybiAhIWVudHJ5O1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjIuMy42IFNldC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgLy8gMjMuMS4zLjUgTWFwLnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgICAgICBhbkluc3RhbmNlKHRoaXMsIEMsICdmb3JFYWNoJyk7XG4gICAgICAgIHZhciBmID0gY3R4KGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCAzKVxuICAgICAgICAgICwgZW50cnk7XG4gICAgICAgIHdoaWxlKGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhpcy5fZil7XG4gICAgICAgICAgZihlbnRyeS52LCBlbnRyeS5rLCB0aGlzKTtcbiAgICAgICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy43IE1hcC5wcm90b3R5cGUuaGFzKGtleSlcbiAgICAgIC8vIDIzLjIuMy43IFNldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KXtcbiAgICAgICAgcmV0dXJuICEhZ2V0RW50cnkodGhpcywga2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZihERVNDUklQVE9SUylkUChDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZWZpbmVkKHRoaXNbU0laRV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSlcbiAgICAgICwgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYoZW50cnkpe1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5fbCA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXQuX2wsICAgICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYoIXRoYXQuX2YpdGhhdC5fZiA9IGVudHJ5O1xuICAgICAgaWYocHJldilwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYoaW5kZXggIT09ICdGJyl0aGF0Ll9pW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgc2V0U3Ryb25nOiBmdW5jdGlvbihDLCBOQU1FLCBJU19NQVApe1xuICAgIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxuICAgIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgICAkaXRlckRlZmluZShDLCBOQU1FLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gICAgICB0aGlzLl90ID0gaXRlcmF0ZWQ7ICAvLyB0YXJnZXRcbiAgICAgIHRoaXMuX2sgPSBraW5kOyAgICAgIC8vIGtpbmRcbiAgICAgIHRoaXMuX2wgPSB1bmRlZmluZWQ7IC8vIHByZXZpb3VzXG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB0aGF0ICA9IHRoaXNcbiAgICAgICAgLCBraW5kICA9IHRoYXQuX2tcbiAgICAgICAgLCBlbnRyeSA9IHRoYXQuX2w7XG4gICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgLy8gZ2V0IG5leHQgZW50cnlcbiAgICAgIGlmKCF0aGF0Ll90IHx8ICEodGhhdC5fbCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhhdC5fdC5fZikpe1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICB0aGF0Ll90ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gc3RlcCgxKTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgZW50cnkuayk7XG4gICAgICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIGVudHJ5LnYpO1xuICAgICAgcmV0dXJuIHN0ZXAoMCwgW2VudHJ5LmssIGVudHJ5LnZdKTtcbiAgICB9LCBJU19NQVAgPyAnZW50cmllcycgOiAndmFsdWVzJyAsICFJU19NQVAsIHRydWUpO1xuXG4gICAgLy8gYWRkIFtAQHNwZWNpZXNdLCAyMy4xLjIuMiwgMjMuMi4yLjJcbiAgICBzZXRTcGVjaWVzKE5BTUUpO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgZnJvbSAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZyb20taXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSl7XG4gIHJldHVybiBmdW5jdGlvbiB0b0pTT04oKXtcbiAgICBpZihjbGFzc29mKHRoaXMpICE9IE5BTUUpdGhyb3cgVHlwZUVycm9yKE5BTUUgKyBcIiN0b0pTT04gaXNuJ3QgZ2VuZXJpY1wiKTtcbiAgICByZXR1cm4gZnJvbSh0aGlzKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlZGVmaW5lQWxsICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBnZXRXZWFrICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5nZXRXZWFrXG4gICwgYW5PYmplY3QgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGlzT2JqZWN0ICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbkluc3RhbmNlICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBmb3JPZiAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgY3JlYXRlQXJyYXlNZXRob2QgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJylcbiAgLCAkaGFzICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgYXJyYXlGaW5kICAgICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCg1KVxuICAsIGFycmF5RmluZEluZGV4ICAgID0gY3JlYXRlQXJyYXlNZXRob2QoNilcbiAgLCBpZCAgICAgICAgICAgICAgICA9IDA7XG5cbi8vIGZhbGxiYWNrIGZvciB1bmNhdWdodCBmcm96ZW4ga2V5c1xudmFyIHVuY2F1Z2h0RnJvemVuU3RvcmUgPSBmdW5jdGlvbih0aGF0KXtcbiAgcmV0dXJuIHRoYXQuX2wgfHwgKHRoYXQuX2wgPSBuZXcgVW5jYXVnaHRGcm96ZW5TdG9yZSk7XG59O1xudmFyIFVuY2F1Z2h0RnJvemVuU3RvcmUgPSBmdW5jdGlvbigpe1xuICB0aGlzLmEgPSBbXTtcbn07XG52YXIgZmluZFVuY2F1Z2h0RnJvemVuID0gZnVuY3Rpb24oc3RvcmUsIGtleSl7XG4gIHJldHVybiBhcnJheUZpbmQoc3RvcmUuYSwgZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiBpdFswXSA9PT0ga2V5O1xuICB9KTtcbn07XG5VbmNhdWdodEZyb3plblN0b3JlLnByb3RvdHlwZSA9IHtcbiAgZ2V0OiBmdW5jdGlvbihrZXkpe1xuICAgIHZhciBlbnRyeSA9IGZpbmRVbmNhdWdodEZyb3plbih0aGlzLCBrZXkpO1xuICAgIGlmKGVudHJ5KXJldHVybiBlbnRyeVsxXTtcbiAgfSxcbiAgaGFzOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiAhIWZpbmRVbmNhdWdodEZyb3plbih0aGlzLCBrZXkpO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGZpbmRVbmNhdWdodEZyb3plbih0aGlzLCBrZXkpO1xuICAgIGlmKGVudHJ5KWVudHJ5WzFdID0gdmFsdWU7XG4gICAgZWxzZSB0aGlzLmEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9LFxuICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICB2YXIgaW5kZXggPSBhcnJheUZpbmRJbmRleCh0aGlzLmEsIGZ1bmN0aW9uKGl0KXtcbiAgICAgIHJldHVybiBpdFswXSA9PT0ga2V5O1xuICAgIH0pO1xuICAgIGlmKH5pbmRleCl0aGlzLmEuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gISF+aW5kZXg7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIGFuSW5zdGFuY2UodGhhdCwgQywgTkFNRSwgJ19pJyk7XG4gICAgICB0aGF0Ll9pID0gaWQrKzsgICAgICAvLyBjb2xsZWN0aW9uIGlkXG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAvLyBsZWFrIHN0b3JlIGZvciB1bmNhdWdodCBmcm96ZW4gb2JqZWN0c1xuICAgICAgaWYoaXRlcmFibGUgIT0gdW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoYXRbQURERVJdLCB0aGF0KTtcbiAgICB9KTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwge1xuICAgICAgLy8gMjMuMy4zLjIgV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcbiAgICAgIC8vIDIzLjQuMy4zIFdlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgICAgICBpZighaXNPYmplY3Qoa2V5KSlyZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBkYXRhID0gZ2V0V2VhayhrZXkpO1xuICAgICAgICBpZihkYXRhID09PSB0cnVlKXJldHVybiB1bmNhdWdodEZyb3plblN0b3JlKHRoaXMpWydkZWxldGUnXShrZXkpO1xuICAgICAgICByZXR1cm4gZGF0YSAmJiAkaGFzKGRhdGEsIHRoaXMuX2kpICYmIGRlbGV0ZSBkYXRhW3RoaXMuX2ldO1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjMuMy40IFdlYWtNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy40LjMuNCBXZWFrU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xuICAgICAgICBpZighaXNPYmplY3Qoa2V5KSlyZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBkYXRhID0gZ2V0V2VhayhrZXkpO1xuICAgICAgICBpZihkYXRhID09PSB0cnVlKXJldHVybiB1bmNhdWdodEZyb3plblN0b3JlKHRoaXMpLmhhcyhrZXkpO1xuICAgICAgICByZXR1cm4gZGF0YSAmJiAkaGFzKGRhdGEsIHRoaXMuX2kpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBkYXRhID0gZ2V0V2Vhayhhbk9iamVjdChrZXkpLCB0cnVlKTtcbiAgICBpZihkYXRhID09PSB0cnVlKXVuY2F1Z2h0RnJvemVuU3RvcmUodGhhdCkuc2V0KGtleSwgdmFsdWUpO1xuICAgIGVsc2UgZGF0YVt0aGF0Ll9pXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGF0O1xuICB9LFxuICB1ZnN0b3JlOiB1bmNhdWdodEZyb3plblN0b3JlXG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgJGV4cG9ydCAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIHJlZGVmaW5lQWxsICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBtZXRhICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKVxuICAsIGZvck9mICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBhbkluc3RhbmNlICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBpc09iamVjdCAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZmFpbHMgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgJGl0ZXJEZXRlY3QgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgICAgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuL19pbmhlcml0LWlmLXJlcXVpcmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspe1xuICB2YXIgQmFzZSAgPSBnbG9iYWxbTkFNRV1cbiAgICAsIEMgICAgID0gQmFzZVxuICAgICwgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcbiAgICAsIE8gICAgID0ge307XG4gIHZhciBmaXhNZXRob2QgPSBmdW5jdGlvbihLRVkpe1xuICAgIHZhciBmbiA9IHByb3RvW0tFWV07XG4gICAgcmVkZWZpbmUocHJvdG8sIEtFWSxcbiAgICAgIEtFWSA9PSAnZGVsZXRlJyA/IGZ1bmN0aW9uKGEpe1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyBmYWxzZSA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2hhcycgPyBmdW5jdGlvbiBoYXMoYSl7XG4gICAgICAgIHJldHVybiBJU19XRUFLICYmICFpc09iamVjdChhKSA/IGZhbHNlIDogZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpO1xuICAgICAgfSA6IEtFWSA9PSAnZ2V0JyA/IGZ1bmN0aW9uIGdldChhKXtcbiAgICAgICAgcmV0dXJuIElTX1dFQUsgJiYgIWlzT2JqZWN0KGEpID8gdW5kZWZpbmVkIDogZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpO1xuICAgICAgfSA6IEtFWSA9PSAnYWRkJyA/IGZ1bmN0aW9uIGFkZChhKXsgZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpOyByZXR1cm4gdGhpczsgfVxuICAgICAgICA6IGZ1bmN0aW9uIHNldChhLCBiKXsgZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEsIGIpOyByZXR1cm4gdGhpczsgfVxuICAgICk7XG4gIH07XG4gIGlmKHR5cGVvZiBDICE9ICdmdW5jdGlvbicgfHwgIShJU19XRUFLIHx8IHByb3RvLmZvckVhY2ggJiYgIWZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgbmV3IEMoKS5lbnRyaWVzKCkubmV4dCgpO1xuICB9KSkpe1xuICAgIC8vIGNyZWF0ZSBjb2xsZWN0aW9uIGNvbnN0cnVjdG9yXG4gICAgQyA9IGNvbW1vbi5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwgbWV0aG9kcyk7XG4gICAgbWV0YS5ORUVEID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaW5zdGFuY2UgICAgICAgICAgICAgPSBuZXcgQ1xuICAgICAgLy8gZWFybHkgaW1wbGVtZW50YXRpb25zIG5vdCBzdXBwb3J0cyBjaGFpbmluZ1xuICAgICAgLCBIQVNOVF9DSEFJTklORyAgICAgICA9IGluc3RhbmNlW0FEREVSXShJU19XRUFLID8ge30gOiAtMCwgMSkgIT0gaW5zdGFuY2VcbiAgICAgIC8vIFY4IH4gIENocm9taXVtIDQwLSB3ZWFrLWNvbGxlY3Rpb25zIHRocm93cyBvbiBwcmltaXRpdmVzLCBidXQgc2hvdWxkIHJldHVybiBmYWxzZVxuICAgICAgLCBUSFJPV1NfT05fUFJJTUlUSVZFUyA9IGZhaWxzKGZ1bmN0aW9uKCl7IGluc3RhbmNlLmhhcygxKTsgfSlcbiAgICAgIC8vIG1vc3QgZWFybHkgaW1wbGVtZW50YXRpb25zIGRvZXNuJ3Qgc3VwcG9ydHMgaXRlcmFibGVzLCBtb3N0IG1vZGVybiAtIG5vdCBjbG9zZSBpdCBjb3JyZWN0bHlcbiAgICAgICwgQUNDRVBUX0lURVJBQkxFUyAgICAgPSAkaXRlckRldGVjdChmdW5jdGlvbihpdGVyKXsgbmV3IEMoaXRlcik7IH0pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgICAvLyBmb3IgZWFybHkgaW1wbGVtZW50YXRpb25zIC0wIGFuZCArMCBub3QgdGhlIHNhbWVcbiAgICAgICwgQlVHR1lfWkVSTyA9ICFJU19XRUFLICYmIGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIFY4IH4gQ2hyb21pdW0gNDItIGZhaWxzIG9ubHkgd2l0aCA1KyBlbGVtZW50c1xuICAgICAgICB2YXIgJGluc3RhbmNlID0gbmV3IEMoKVxuICAgICAgICAgICwgaW5kZXggICAgID0gNTtcbiAgICAgICAgd2hpbGUoaW5kZXgtLSkkaW5zdGFuY2VbQURERVJdKGluZGV4LCBpbmRleCk7XG4gICAgICAgIHJldHVybiAhJGluc3RhbmNlLmhhcygtMCk7XG4gICAgICB9KTtcbiAgICBpZighQUNDRVBUX0lURVJBQkxFUyl7IFxuICAgICAgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGFyZ2V0LCBpdGVyYWJsZSl7XG4gICAgICAgIGFuSW5zdGFuY2UodGFyZ2V0LCBDLCBOQU1FKTtcbiAgICAgICAgdmFyIHRoYXQgPSBpbmhlcml0SWZSZXF1aXJlZChuZXcgQmFzZSwgdGFyZ2V0LCBDKTtcbiAgICAgICAgaWYoaXRlcmFibGUgIT0gdW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoYXRbQURERVJdLCB0aGF0KTtcbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgICB9KTtcbiAgICAgIEMucHJvdG90eXBlID0gcHJvdG87XG4gICAgICBwcm90by5jb25zdHJ1Y3RvciA9IEM7XG4gICAgfVxuICAgIGlmKFRIUk9XU19PTl9QUklNSVRJVkVTIHx8IEJVR0dZX1pFUk8pe1xuICAgICAgZml4TWV0aG9kKCdkZWxldGUnKTtcbiAgICAgIGZpeE1ldGhvZCgnaGFzJyk7XG4gICAgICBJU19NQVAgJiYgZml4TWV0aG9kKCdnZXQnKTtcbiAgICB9XG4gICAgaWYoQlVHR1lfWkVSTyB8fCBIQVNOVF9DSEFJTklORylmaXhNZXRob2QoQURERVIpO1xuICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgc2hvdWxkIG5vdCBjb250YWlucyAuY2xlYXIgbWV0aG9kXG4gICAgaWYoSVNfV0VBSyAmJiBwcm90by5jbGVhcilkZWxldGUgcHJvdG8uY2xlYXI7XG4gIH1cblxuICBzZXRUb1N0cmluZ1RhZyhDLCBOQU1FKTtcblxuICBPW05BTUVdID0gQztcbiAgJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAoQyAhPSBCYXNlKSwgTyk7XG5cbiAgaWYoIUlTX1dFQUspY29tbW9uLnNldFN0cm9uZyhDLCBOQU1FLCBJU19NQVApO1xuXG4gIHJldHVybiBDO1xufTsiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcclxuICAsIGNyZWF0ZURlc2MgICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBpbmRleCwgdmFsdWUpe1xyXG4gIGlmKGluZGV4IGluIG9iamVjdCkkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XHJcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XHJcbn07IiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXHJcbiAgLCB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXHJcbiAgLCBOVU1CRVIgICAgICA9ICdudW1iZXInO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihoaW50KXtcclxuICBpZihoaW50ICE9PSAnc3RyaW5nJyAmJiBoaW50ICE9PSBOVU1CRVIgJiYgaGludCAhPT0gJ2RlZmF1bHQnKXRocm93IFR5cGVFcnJvcignSW5jb3JyZWN0IGhpbnQnKTtcclxuICByZXR1cm4gdG9QcmltaXRpdmUoYW5PYmplY3QodGhpcyksIGhpbnQgIT0gTlVNQkVSKTtcclxufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcclxubW9kdWxlLmV4cG9ydHMgPSAoXHJcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcclxuKS5zcGxpdCgnLCcpOyIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIHJlZGVmaW5lICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gfHwgKGdsb2JhbFtuYW1lXSA9IHt9KSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KVxuICAgICwga2V5LCBvd24sIG91dCwgZXhwO1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmKHRhcmdldClyZWRlZmluZSh0YXJnZXQsIGtleSwgb3V0LCB0eXBlICYgJGV4cG9ydC5VKTtcbiAgICAvLyBleHBvcnRcbiAgICBpZihleHBvcnRzW2tleV0gIT0gb3V0KWhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmKElTX1BST1RPICYmIGV4cFByb3RvW2tleV0gIT0gb3V0KWV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsInZhciBNQVRDSCA9IHJlcXVpcmUoJy4vX3drcycpKCdtYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgcmUgPSAvLi87XG4gIHRyeSB7XG4gICAgJy8uLydbS0VZXShyZSk7XG4gIH0gY2F0Y2goZSl7XG4gICAgdHJ5IHtcbiAgICAgIHJlW01BVENIXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuICEnLy4vJ1tLRVldKHJlKTtcbiAgICB9IGNhdGNoKGYpeyAvKiBlbXB0eSAqLyB9XG4gIH0gcmV0dXJuIHRydWU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBoaWRlICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGZhaWxzICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGRlZmluZWQgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpXG4gICwgd2tzICAgICAgPSByZXF1aXJlKCcuL193a3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGxlbmd0aCwgZXhlYyl7XG4gIHZhciBTWU1CT0wgICA9IHdrcyhLRVkpXG4gICAgLCBmbnMgICAgICA9IGV4ZWMoZGVmaW5lZCwgU1lNQk9MLCAnJ1tLRVldKVxuICAgICwgc3RyZm4gICAgPSBmbnNbMF1cbiAgICAsIHJ4Zm4gICAgID0gZm5zWzFdO1xuICBpZihmYWlscyhmdW5jdGlvbigpe1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH07XG4gICAgcmV0dXJuICcnW0tFWV0oTykgIT0gNztcbiAgfSkpe1xuICAgIHJlZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIEtFWSwgc3RyZm4pO1xuICAgIGhpZGUoUmVnRXhwLnByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24oc3RyaW5nLCBhcmcpeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcywgYXJnKTsgfVxuICAgICAgLy8gMjEuMi41LjYgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXShzdHJpbmcpXG4gICAgICAvLyAyMS4yLjUuOSBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXShzdHJpbmcpXG4gICAgICA6IGZ1bmN0aW9uKHN0cmluZyl7IHJldHVybiByeGZuLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjEuMi41LjMgZ2V0IFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCAgID0gYW5PYmplY3QodGhpcylcbiAgICAsIHJlc3VsdCA9ICcnO1xuICBpZih0aGF0Lmdsb2JhbCkgICAgIHJlc3VsdCArPSAnZyc7XG4gIGlmKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYodGhhdC5tdWx0aWxpbmUpICByZXN1bHQgKz0gJ20nO1xuICBpZih0aGF0LnVuaWNvZGUpICAgIHJlc3VsdCArPSAndSc7XG4gIGlmKHRoYXQuc3RpY2t5KSAgICAgcmVzdWx0ICs9ICd5JztcbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwidmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKVxuICAsIEJSRUFLICAgICAgID0ge31cbiAgLCBSRVRVUk4gICAgICA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1Ipe1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbigpeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYoaXNBcnJheUl0ZXIoaXRlckZuKSlmb3IobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZihyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKXJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZihyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKXJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLICA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59OyIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xyXG59KTsiLCJ2YXIgaXNPYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxyXG4gICwgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXQ7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGhhdCwgdGFyZ2V0LCBDKXtcclxuICB2YXIgUCwgUyA9IHRhcmdldC5jb25zdHJ1Y3RvcjtcclxuICBpZihTICE9PSBDICYmIHR5cGVvZiBTID09ICdmdW5jdGlvbicgJiYgKFAgPSBTLnByb3RvdHlwZSkgIT09IEMucHJvdG90eXBlICYmIGlzT2JqZWN0KFApICYmIHNldFByb3RvdHlwZU9mKXtcclxuICAgIHNldFByb3RvdHlwZU9mKHRoYXQsIFApO1xyXG4gIH0gcmV0dXJuIHRoYXQ7XHJcbn07IiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCBhcmdzLCB0aGF0KXtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncyk7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59OyIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07IiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTsiLCIvLyAyMC4xLjIuMyBOdW1iZXIuaXNJbnRlZ2VyKG51bWJlcilcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZmxvb3IgICAgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0ludGVnZXIoaXQpe1xuICByZXR1cm4gIWlzT2JqZWN0KGl0KSAmJiBpc0Zpbml0ZShpdCkgJiYgZmxvb3IoaXQpID09PSBpdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59OyIsIi8vIDcuMi44IElzUmVnRXhwKGFyZ3VtZW50KVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBjb2YgICAgICA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgTUFUQ0ggICAgPSByZXF1aXJlKCcuL193a3MnKSgnbWF0Y2gnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgaXNSZWdFeHA7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKChpc1JlZ0V4cCA9IGl0W01BVENIXSkgIT09IHVuZGVmaW5lZCA/ICEhaXNSZWdFeHAgOiBjb2YoaXQpID09ICdSZWdFeHAnKTtcbn07IiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59OyIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHt9OyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlOyIsIi8vIDIwLjIuMi4xNCBNYXRoLmV4cG0xKHgpXG52YXIgJGV4cG0xID0gTWF0aC5leHBtMTtcbm1vZHVsZS5leHBvcnRzID0gKCEkZXhwbTFcbiAgLy8gT2xkIEZGIGJ1Z1xuICB8fCAkZXhwbTEoMTApID4gMjIwMjUuNDY1Nzk0ODA2NzE5IHx8ICRleHBtMSgxMCkgPCAyMjAyNS40NjU3OTQ4MDY3MTY1MTY4XG4gIC8vIFRvciBCcm93c2VyIGJ1Z1xuICB8fCAkZXhwbTEoLTJlLTE3KSAhPSAtMmUtMTdcbikgPyBmdW5jdGlvbiBleHBtMSh4KXtcbiAgcmV0dXJuICh4ID0gK3gpID09IDAgPyB4IDogeCA+IC0xZS02ICYmIHggPCAxZS02ID8geCArIHggKiB4IC8gMiA6IE1hdGguZXhwKHgpIC0gMTtcbn0gOiAkZXhwbTE7IiwiLy8gMjAuMi4yLjIwIE1hdGgubG9nMXAoeClcbm1vZHVsZS5leHBvcnRzID0gTWF0aC5sb2cxcCB8fCBmdW5jdGlvbiBsb2cxcCh4KXtcbiAgcmV0dXJuICh4ID0gK3gpID4gLTFlLTggJiYgeCA8IDFlLTggPyB4IC0geCAqIHggLyAyIDogTWF0aC5sb2coMSArIHgpO1xufTsiLCIvLyAyMC4yLjIuMjggTWF0aC5zaWduKHgpXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGguc2lnbiB8fCBmdW5jdGlvbiBzaWduKHgpe1xuICByZXR1cm4gKHggPSAreCkgPT0gMCB8fCB4ICE9IHggPyB4IDogeCA8IDAgPyAtMSA6IDE7XG59OyIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59OyIsInZhciBNYXAgICAgID0gcmVxdWlyZSgnLi9lczYubWFwJylcbiAgLCAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBzaGFyZWQgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ21ldGFkYXRhJylcbiAgLCBzdG9yZSAgID0gc2hhcmVkLnN0b3JlIHx8IChzaGFyZWQuc3RvcmUgPSBuZXcgKHJlcXVpcmUoJy4vZXM2LndlYWstbWFwJykpKTtcblxudmFyIGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAgPSBmdW5jdGlvbih0YXJnZXQsIHRhcmdldEtleSwgY3JlYXRlKXtcbiAgdmFyIHRhcmdldE1ldGFkYXRhID0gc3RvcmUuZ2V0KHRhcmdldCk7XG4gIGlmKCF0YXJnZXRNZXRhZGF0YSl7XG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gdW5kZWZpbmVkO1xuICAgIHN0b3JlLnNldCh0YXJnZXQsIHRhcmdldE1ldGFkYXRhID0gbmV3IE1hcCk7XG4gIH1cbiAgdmFyIGtleU1ldGFkYXRhID0gdGFyZ2V0TWV0YWRhdGEuZ2V0KHRhcmdldEtleSk7XG4gIGlmKCFrZXlNZXRhZGF0YSl7XG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gdW5kZWZpbmVkO1xuICAgIHRhcmdldE1ldGFkYXRhLnNldCh0YXJnZXRLZXksIGtleU1ldGFkYXRhID0gbmV3IE1hcCk7XG4gIH0gcmV0dXJuIGtleU1ldGFkYXRhO1xufTtcbnZhciBvcmRpbmFyeUhhc093bk1ldGFkYXRhID0gZnVuY3Rpb24oTWV0YWRhdGFLZXksIE8sIFApe1xuICB2YXIgbWV0YWRhdGFNYXAgPSBnZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIGZhbHNlKTtcbiAgcmV0dXJuIG1ldGFkYXRhTWFwID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IG1ldGFkYXRhTWFwLmhhcyhNZXRhZGF0YUtleSk7XG59O1xudmFyIG9yZGluYXJ5R2V0T3duTWV0YWRhdGEgPSBmdW5jdGlvbihNZXRhZGF0YUtleSwgTywgUCl7XG4gIHZhciBtZXRhZGF0YU1hcCA9IGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgZmFsc2UpO1xuICByZXR1cm4gbWV0YWRhdGFNYXAgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IG1ldGFkYXRhTWFwLmdldChNZXRhZGF0YUtleSk7XG59O1xudmFyIG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEgPSBmdW5jdGlvbihNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSwgTywgUCl7XG4gIGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgdHJ1ZSkuc2V0KE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlKTtcbn07XG52YXIgb3JkaW5hcnlPd25NZXRhZGF0YUtleXMgPSBmdW5jdGlvbih0YXJnZXQsIHRhcmdldEtleSl7XG4gIHZhciBtZXRhZGF0YU1hcCA9IGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAodGFyZ2V0LCB0YXJnZXRLZXksIGZhbHNlKVxuICAgICwga2V5cyAgICAgICAgPSBbXTtcbiAgaWYobWV0YWRhdGFNYXApbWV0YWRhdGFNYXAuZm9yRWFjaChmdW5jdGlvbihfLCBrZXkpeyBrZXlzLnB1c2goa2V5KTsgfSk7XG4gIHJldHVybiBrZXlzO1xufTtcbnZhciB0b01ldGFLZXkgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogU3RyaW5nKGl0KTtcbn07XG52YXIgZXhwID0gZnVuY3Rpb24oTyl7XG4gICRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIE8pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN0b3JlOiBzdG9yZSxcbiAgbWFwOiBnZXRPckNyZWF0ZU1ldGFkYXRhTWFwLFxuICBoYXM6IG9yZGluYXJ5SGFzT3duTWV0YWRhdGEsXG4gIGdldDogb3JkaW5hcnlHZXRPd25NZXRhZGF0YSxcbiAgc2V0OiBvcmRpbmFyeURlZmluZU93bk1ldGFkYXRhLFxuICBrZXlzOiBvcmRpbmFyeU93bk1ldGFkYXRhS2V5cyxcbiAga2V5OiB0b01ldGFLZXksXG4gIGV4cDogZXhwXG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXRcbiAgLCBPYnNlcnZlciAgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlclxuICAsIHByb2Nlc3MgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgUHJvbWlzZSAgID0gZ2xvYmFsLlByb21pc2VcbiAgLCBpc05vZGUgICAgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbigpe1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKXBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUoaGVhZCl7XG4gICAgICBmbiAgID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgaWYoaGVhZClub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZihwYXJlbnQpcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZihpc05vZGUpe1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXJcbiAgfSBlbHNlIGlmKE9ic2VydmVyKXtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZVxuICAgICAgLCBub2RlICAgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKXtcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihmbil7XG4gICAgdmFyIHRhc2sgPSB7Zm46IGZuLCBuZXh0OiB1bmRlZmluZWR9O1xuICAgIGlmKGxhc3QpbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZighaGVhZCl7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247IiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXHJcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXHJcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxyXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcclxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXHJcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cclxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XHJcblxyXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXHJcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcclxuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xyXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXHJcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxyXG4gICAgLCBndCAgICAgPSAnPidcclxuICAgICwgaWZyYW1lRG9jdW1lbnQ7XHJcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XHJcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxyXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XHJcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xyXG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XHJcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xyXG4gIGlmcmFtZURvY3VtZW50LndyaXRlKCc8c2NyaXB0PmRvY3VtZW50LkY9T2JqZWN0PC9zY3JpcHQnICsgZ3QpO1xyXG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XHJcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XHJcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xyXG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xyXG4gIHZhciByZXN1bHQ7XHJcbiAgaWYoTyAhPT0gbnVsbCl7XHJcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XHJcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XHJcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcclxuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcclxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xyXG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XHJcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xyXG59OyIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07IiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcclxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcclxuICAsIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcclxuICBhbk9iamVjdChPKTtcclxuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxyXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxyXG4gICAgLCBpID0gMFxyXG4gICAgLCBQO1xyXG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcclxuICByZXR1cm4gTztcclxufTsiLCIvLyBGb3JjZWQgcmVwbGFjZW1lbnQgcHJvdG90eXBlIGFjY2Vzc29ycyBtZXRob2RzXHJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fbGlicmFyeScpfHwgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcclxuICB2YXIgSyA9IE1hdGgucmFuZG9tKCk7XHJcbiAgLy8gSW4gRkYgdGhyb3dzIG9ubHkgZGVmaW5lIG1ldGhvZHNcclxuICBfX2RlZmluZVNldHRlcl9fLmNhbGwobnVsbCwgSywgZnVuY3Rpb24oKXsgLyogZW1wdHkgKi99KTtcclxuICBkZWxldGUgcmVxdWlyZSgnLi9fZ2xvYmFsJylbS107XHJcbn0pOyIsInZhciBwSUUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxyXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcclxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXHJcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXHJcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXHJcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcclxuICAsIGdPUEQgICAgICAgICAgID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcclxuXHJcbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApe1xyXG4gIE8gPSB0b0lPYmplY3QoTyk7XHJcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xyXG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XHJcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcclxuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XHJcbiAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcclxufTsiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxyXG52YXIgJGtleXMgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcclxuICAsIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XHJcblxyXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pe1xyXG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcclxufTsiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzOyIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXHJcbnZhciBoYXMgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXHJcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXHJcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxyXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XHJcbiAgTyA9IHRvT2JqZWN0KE8pO1xyXG4gIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xyXG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xyXG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xyXG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XHJcbn07IiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXHJcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcclxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXHJcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xyXG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxyXG4gICAgLCBpICAgICAgPSAwXHJcbiAgICAsIHJlc3VsdCA9IFtdXHJcbiAgICAsIGtleTtcclxuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xyXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcclxuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXHJcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcclxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xyXG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XHJcbn07IiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7IiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29yZSAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgZm4gID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTsiLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGlzRW51bSAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc0VudHJpZXMpe1xuICByZXR1cm4gZnVuY3Rpb24oaXQpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoaXQpXG4gICAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaSAgICAgID0gMFxuICAgICAgLCByZXN1bHQgPSBbXVxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChPLCBrZXkgPSBrZXlzW2krK10pKXtcbiAgICAgIHJlc3VsdC5wdXNoKGlzRW50cmllcyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07IiwiLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xudmFyIGdPUE4gICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKVxuICAsIGdPUFMgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBSZWZsZWN0ICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlJlZmxlY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IFJlZmxlY3QgJiYgUmVmbGVjdC5vd25LZXlzIHx8IGZ1bmN0aW9uIG93bktleXMoaXQpe1xuICB2YXIga2V5cyAgICAgICA9IGdPUE4uZihhbk9iamVjdChpdCkpXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICByZXR1cm4gZ2V0U3ltYm9scyA/IGtleXMuY29uY2F0KGdldFN5bWJvbHMoaXQpKSA6IGtleXM7XG59OyIsInZhciAkcGFyc2VGbG9hdCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLnBhcnNlRmxvYXRcbiAgLCAkdHJpbSAgICAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy10cmltJykudHJpbTtcblxubW9kdWxlLmV4cG9ydHMgPSAxIC8gJHBhcnNlRmxvYXQocmVxdWlyZSgnLi9fc3RyaW5nLXdzJykgKyAnLTAnKSAhPT0gLUluZmluaXR5ID8gZnVuY3Rpb24gcGFyc2VGbG9hdChzdHIpe1xuICB2YXIgc3RyaW5nID0gJHRyaW0oU3RyaW5nKHN0ciksIDMpXG4gICAgLCByZXN1bHQgPSAkcGFyc2VGbG9hdChzdHJpbmcpO1xuICByZXR1cm4gcmVzdWx0ID09PSAwICYmIHN0cmluZy5jaGFyQXQoMCkgPT0gJy0nID8gLTAgOiByZXN1bHQ7XG59IDogJHBhcnNlRmxvYXQ7IiwidmFyICRwYXJzZUludCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLnBhcnNlSW50XG4gICwgJHRyaW0gICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKS50cmltXG4gICwgd3MgICAgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXdzJylcbiAgLCBoZXggICAgICAgPSAvXltcXC0rXT8wW3hYXS87XG5cbm1vZHVsZS5leHBvcnRzID0gJHBhcnNlSW50KHdzICsgJzA4JykgIT09IDggfHwgJHBhcnNlSW50KHdzICsgJzB4MTYnKSAhPT0gMjIgPyBmdW5jdGlvbiBwYXJzZUludChzdHIsIHJhZGl4KXtcbiAgdmFyIHN0cmluZyA9ICR0cmltKFN0cmluZyhzdHIpLCAzKTtcbiAgcmV0dXJuICRwYXJzZUludChzdHJpbmcsIChyYWRpeCA+Pj4gMCkgfHwgKGhleC50ZXN0KHN0cmluZykgPyAxNiA6IDEwKSk7XG59IDogJHBhcnNlSW50OyIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXRoICAgICAgPSByZXF1aXJlKCcuL19wYXRoJylcbiAgLCBpbnZva2UgICAgPSByZXF1aXJlKCcuL19pbnZva2UnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oLyogLi4ucGFyZ3MgKi8pe1xuICB2YXIgZm4gICAgID0gYUZ1bmN0aW9uKHRoaXMpXG4gICAgLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBwYXJncyAgPSBBcnJheShsZW5ndGgpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBfICAgICAgPSBwYXRoLl9cbiAgICAsIGhvbGRlciA9IGZhbHNlO1xuICB3aGlsZShsZW5ndGggPiBpKWlmKChwYXJnc1tpXSA9IGFyZ3VtZW50c1tpKytdKSA9PT0gXylob2xkZXIgPSB0cnVlO1xuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAsIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIGogPSAwLCBrID0gMCwgYXJncztcbiAgICBpZighaG9sZGVyICYmICFhTGVuKXJldHVybiBpbnZva2UoZm4sIHBhcmdzLCB0aGF0KTtcbiAgICBhcmdzID0gcGFyZ3Muc2xpY2UoKTtcbiAgICBpZihob2xkZXIpZm9yKDtsZW5ndGggPiBqOyBqKyspaWYoYXJnc1tqXSA9PT0gXylhcmdzW2pdID0gYXJndW1lbnRzW2srK107XG4gICAgd2hpbGUoYUxlbiA+IGspYXJncy5wdXNoKGFyZ3VtZW50c1trKytdKTtcbiAgICByZXR1cm4gaW52b2tlKGZuLCBhcmdzLCB0aGF0KTtcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwidmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMsIHNhZmUpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldLCBzYWZlKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBTUkMgICAgICAgPSByZXF1aXJlKCcuL191aWQnKSgnc3JjJylcbiAgLCBUT19TVFJJTkcgPSAndG9TdHJpbmcnXG4gICwgJHRvU3RyaW5nID0gRnVuY3Rpb25bVE9fU1RSSU5HXVxuICAsIFRQTCAgICAgICA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi9fY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiAkdG9TdHJpbmcuY2FsbChpdCk7XG59O1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihPLCBrZXksIHZhbCwgc2FmZSl7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nO1xuICBpZihpc0Z1bmN0aW9uKWhhcyh2YWwsICduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgaWYoT1trZXldID09PSB2YWwpcmV0dXJuO1xuICBpZihpc0Z1bmN0aW9uKWhhcyh2YWwsIFNSQykgfHwgaGlkZSh2YWwsIFNSQywgT1trZXldID8gJycgKyBPW2tleV0gOiBUUEwuam9pbihTdHJpbmcoa2V5KSkpO1xuICBpZihPID09PSBnbG9iYWwpe1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICBpZighc2FmZSl7XG4gICAgICBkZWxldGUgT1trZXldO1xuICAgICAgaGlkZShPLCBrZXksIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKE9ba2V5XSlPW2tleV0gPSB2YWw7XG4gICAgICBlbHNlIGhpZGUoTywga2V5LCB2YWwpO1xuICAgIH1cbiAgfVxuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyZWdFeHAsIHJlcGxhY2Upe1xuICB2YXIgcmVwbGFjZXIgPSByZXBsYWNlID09PSBPYmplY3QocmVwbGFjZSkgPyBmdW5jdGlvbihwYXJ0KXtcbiAgICByZXR1cm4gcmVwbGFjZVtwYXJ0XTtcbiAgfSA6IHJlcGxhY2U7XG4gIHJldHVybiBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIFN0cmluZyhpdCkucmVwbGFjZShyZWdFeHAsIHJlcGxhY2VyKTtcbiAgfTtcbn07IiwiLy8gNy4yLjkgU2FtZVZhbHVlKHgsIHkpXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5pcyB8fCBmdW5jdGlvbiBpcyh4LCB5KXtcbiAgcmV0dXJuIHggPT09IHkgPyB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSA6IHggIT0geCAmJiB5ICE9IHk7XG59OyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGRQICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCBTUEVDSUVTICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZKXtcbiAgdmFyIEMgPSBnbG9iYWxbS0VZXTtcbiAgaWYoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSlkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07IiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBoYXMgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59OyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXHJcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xyXG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XHJcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIFNQRUNJRVMgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIEQpe1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yLCBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59OyIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1ldGhvZCwgYXJnKXtcclxuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24oKXtcclxuICAgIGFyZyA/IG1ldGhvZC5jYWxsKG51bGwsIGZ1bmN0aW9uKCl7fSwgMSkgOiBtZXRob2QuY2FsbChudWxsKTtcclxuICB9KTtcclxufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTsiLCIvLyBoZWxwZXIgZm9yIFN0cmluZyN7c3RhcnRzV2l0aCwgZW5kc1dpdGgsIGluY2x1ZGVzfVxudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi9faXMtcmVnZXhwJylcbiAgLCBkZWZpbmVkICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aGF0LCBzZWFyY2hTdHJpbmcsIE5BTUUpe1xuICBpZihpc1JlZ0V4cChzZWFyY2hTdHJpbmcpKXRocm93IFR5cGVFcnJvcignU3RyaW5nIycgKyBOQU1FICsgXCIgZG9lc24ndCBhY2NlcHQgcmVnZXghXCIpO1xuICByZXR1cm4gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xufTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZmFpbHMgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpXG4gICwgcXVvdCAgICA9IC9cIi9nO1xuLy8gQi4yLjMuMi4xIENyZWF0ZUhUTUwoc3RyaW5nLCB0YWcsIGF0dHJpYnV0ZSwgdmFsdWUpXG52YXIgY3JlYXRlSFRNTCA9IGZ1bmN0aW9uKHN0cmluZywgdGFnLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gIHZhciBTICA9IFN0cmluZyhkZWZpbmVkKHN0cmluZykpXG4gICAgLCBwMSA9ICc8JyArIHRhZztcbiAgaWYoYXR0cmlidXRlICE9PSAnJylwMSArPSAnICcgKyBhdHRyaWJ1dGUgKyAnPVwiJyArIFN0cmluZyh2YWx1ZSkucmVwbGFjZShxdW90LCAnJnF1b3Q7JykgKyAnXCInO1xuICByZXR1cm4gcDEgKyAnPicgKyBTICsgJzwvJyArIHRhZyArICc+Jztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUsIGV4ZWMpe1xuICB2YXIgTyA9IHt9O1xuICBPW05BTUVdID0gZXhlYyhjcmVhdGVIVE1MKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpe1xuICAgIHZhciB0ZXN0ID0gJydbTkFNRV0oJ1wiJyk7XG4gICAgcmV0dXJuIHRlc3QgIT09IHRlc3QudG9Mb3dlckNhc2UoKSB8fCB0ZXN0LnNwbGl0KCdcIicpLmxlbmd0aCA+IDM7XG4gIH0pLCAnU3RyaW5nJywgTyk7XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXN0cmluZy1wYWQtc3RhcnQtZW5kXG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHJlcGVhdCAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXJlcGVhdCcpXG4gICwgZGVmaW5lZCAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGhhdCwgbWF4TGVuZ3RoLCBmaWxsU3RyaW5nLCBsZWZ0KXtcbiAgdmFyIFMgICAgICAgICAgICA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICwgc3RyaW5nTGVuZ3RoID0gUy5sZW5ndGhcbiAgICAsIGZpbGxTdHIgICAgICA9IGZpbGxTdHJpbmcgPT09IHVuZGVmaW5lZCA/ICcgJyA6IFN0cmluZyhmaWxsU3RyaW5nKVxuICAgICwgaW50TWF4TGVuZ3RoID0gdG9MZW5ndGgobWF4TGVuZ3RoKTtcbiAgaWYoaW50TWF4TGVuZ3RoIDw9IHN0cmluZ0xlbmd0aCB8fCBmaWxsU3RyID09ICcnKXJldHVybiBTO1xuICB2YXIgZmlsbExlbiA9IGludE1heExlbmd0aCAtIHN0cmluZ0xlbmd0aFxuICAgICwgc3RyaW5nRmlsbGVyID0gcmVwZWF0LmNhbGwoZmlsbFN0ciwgTWF0aC5jZWlsKGZpbGxMZW4gLyBmaWxsU3RyLmxlbmd0aCkpO1xuICBpZihzdHJpbmdGaWxsZXIubGVuZ3RoID4gZmlsbExlbilzdHJpbmdGaWxsZXIgPSBzdHJpbmdGaWxsZXIuc2xpY2UoMCwgZmlsbExlbik7XG4gIHJldHVybiBsZWZ0ID8gc3RyaW5nRmlsbGVyICsgUyA6IFMgKyBzdHJpbmdGaWxsZXI7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXBlYXQoY291bnQpe1xuICB2YXIgc3RyID0gU3RyaW5nKGRlZmluZWQodGhpcykpXG4gICAgLCByZXMgPSAnJ1xuICAgICwgbiAgID0gdG9JbnRlZ2VyKGNvdW50KTtcbiAgaWYobiA8IDAgfHwgbiA9PSBJbmZpbml0eSl0aHJvdyBSYW5nZUVycm9yKFwiQ291bnQgY2FuJ3QgYmUgbmVnYXRpdmVcIik7XG4gIGZvcig7biA+IDA7IChuID4+Pj0gMSkgJiYgKHN0ciArPSBzdHIpKWlmKG4gJiAxKXJlcyArPSBzdHI7XG4gIHJldHVybiByZXM7XG59OyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpXG4gICwgZmFpbHMgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzcGFjZXMgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXdzJylcbiAgLCBzcGFjZSAgID0gJ1snICsgc3BhY2VzICsgJ10nXG4gICwgbm9uICAgICA9ICdcXHUyMDBiXFx1MDA4NSdcbiAgLCBsdHJpbSAgID0gUmVnRXhwKCdeJyArIHNwYWNlICsgc3BhY2UgKyAnKicpXG4gICwgcnRyaW0gICA9IFJlZ0V4cChzcGFjZSArIHNwYWNlICsgJyokJyk7XG5cbnZhciBleHBvcnRlciA9IGZ1bmN0aW9uKEtFWSwgZXhlYywgQUxJQVMpe1xuICB2YXIgZXhwICAgPSB7fTtcbiAgdmFyIEZPUkNFID0gZmFpbHMoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gISFzcGFjZXNbS0VZXSgpIHx8IG5vbltLRVldKCkgIT0gbm9uO1xuICB9KTtcbiAgdmFyIGZuID0gZXhwW0tFWV0gPSBGT1JDRSA/IGV4ZWModHJpbSkgOiBzcGFjZXNbS0VZXTtcbiAgaWYoQUxJQVMpZXhwW0FMSUFTXSA9IGZuO1xuICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIEZPUkNFLCAnU3RyaW5nJywgZXhwKTtcbn07XG5cbi8vIDEgLT4gU3RyaW5nI3RyaW1MZWZ0XG4vLyAyIC0+IFN0cmluZyN0cmltUmlnaHRcbi8vIDMgLT4gU3RyaW5nI3RyaW1cbnZhciB0cmltID0gZXhwb3J0ZXIudHJpbSA9IGZ1bmN0aW9uKHN0cmluZywgVFlQRSl7XG4gIHN0cmluZyA9IFN0cmluZyhkZWZpbmVkKHN0cmluZykpO1xuICBpZihUWVBFICYgMSlzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShsdHJpbSwgJycpO1xuICBpZihUWVBFICYgMilzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShydHJpbSwgJycpO1xuICByZXR1cm4gc3RyaW5nO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRlcjsiLCJtb2R1bGUuZXhwb3J0cyA9ICdcXHgwOVxceDBBXFx4MEJcXHgwQ1xceDBEXFx4MjBcXHhBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwMycgK1xyXG4gICdcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGJzsiLCJ2YXIgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBpbnZva2UgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pbnZva2UnKVxuICAsIGh0bWwgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2h0bWwnKVxuICAsIGNlbCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKXtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpe1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZighc2V0VGFzayB8fCAhY2xlYXJUYXNrKXtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbil7XG4gICAgdmFyIGFyZ3MgPSBbXSwgaSA9IDE7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24oKXtcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCl7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmKHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYoTWVzc2FnZUNoYW5uZWwpe1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWw7XG4gICAgcG9ydCAgICA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZihnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiAgIHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuaWYocmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSl7XG4gIHZhciBMSUJSQVJZICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICAgLCBnbG9iYWwgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgICAsIGZhaWxzICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICAgLCAkZXhwb3J0ICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgICAsICR0eXBlZCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190eXBlZCcpXG4gICAgLCAkYnVmZmVyICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdHlwZWQtYnVmZmVyJylcbiAgICAsIGN0eCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAgICwgYW5JbnN0YW5jZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgICAsIHByb3BlcnR5RGVzYyAgICAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgICAsIGhpZGUgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgICAsIHJlZGVmaW5lQWxsICAgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAgICwgaXNJbnRlZ2VyICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLWludGVnZXInKVxuICAgICwgdG9JbnRlZ2VyICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAgICwgdG9MZW5ndGggICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICAgLCB0b0luZGV4ICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxuICAgICwgdG9QcmltaXRpdmUgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICAgLCBoYXMgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgICAsIHNhbWUgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19zYW1lLXZhbHVlJylcbiAgICAsIGNsYXNzb2YgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgICAsIGlzT2JqZWN0ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAgICwgdG9PYmplY3QgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICAgLCBpc0FycmF5SXRlciAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICAgLCBjcmVhdGUgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICAgLCBnZXRQcm90b3R5cGVPZiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICAgLCBnT1BOICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICAgLCBpc0l0ZXJhYmxlICAgICAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmlzLWl0ZXJhYmxlJylcbiAgICAsIGdldEl0ZXJGbiAgICAgICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpXG4gICAgLCB1aWQgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgICAsIHdrcyAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAgICwgY3JlYXRlQXJyYXlNZXRob2QgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKVxuICAgICwgY3JlYXRlQXJyYXlJbmNsdWRlcyA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJylcbiAgICAsIHNwZWNpZXNDb25zdHJ1Y3RvciAgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJylcbiAgICAsIEFycmF5SXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpXG4gICAgLCBJdGVyYXRvcnMgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgICAsICRpdGVyRGV0ZWN0ICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpXG4gICAgLCBzZXRTcGVjaWVzICAgICAgICAgID0gcmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKVxuICAgICwgYXJyYXlGaWxsICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZpbGwnKVxuICAgICwgYXJyYXlDb3B5V2l0aGluICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWNvcHktd2l0aGluJylcbiAgICAsICREUCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAgICwgJEdPUEQgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgICAsIGRQICAgICAgICAgICAgICAgICAgPSAkRFAuZlxuICAgICwgZ09QRCAgICAgICAgICAgICAgICA9ICRHT1BELmZcbiAgICAsIFJhbmdlRXJyb3IgICAgICAgICAgPSBnbG9iYWwuUmFuZ2VFcnJvclxuICAgICwgVHlwZUVycm9yICAgICAgICAgICA9IGdsb2JhbC5UeXBlRXJyb3JcbiAgICAsIFVpbnQ4QXJyYXkgICAgICAgICAgPSBnbG9iYWwuVWludDhBcnJheVxuICAgICwgQVJSQVlfQlVGRkVSICAgICAgICA9ICdBcnJheUJ1ZmZlcidcbiAgICAsIFNIQVJFRF9CVUZGRVIgICAgICAgPSAnU2hhcmVkJyArIEFSUkFZX0JVRkZFUlxuICAgICwgQllURVNfUEVSX0VMRU1FTlQgICA9ICdCWVRFU19QRVJfRUxFTUVOVCdcbiAgICAsIFBST1RPVFlQRSAgICAgICAgICAgPSAncHJvdG90eXBlJ1xuICAgICwgQXJyYXlQcm90byAgICAgICAgICA9IEFycmF5W1BST1RPVFlQRV1cbiAgICAsICRBcnJheUJ1ZmZlciAgICAgICAgPSAkYnVmZmVyLkFycmF5QnVmZmVyXG4gICAgLCAkRGF0YVZpZXcgICAgICAgICAgID0gJGJ1ZmZlci5EYXRhVmlld1xuICAgICwgYXJyYXlGb3JFYWNoICAgICAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDApXG4gICAgLCBhcnJheUZpbHRlciAgICAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoMilcbiAgICAsIGFycmF5U29tZSAgICAgICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCgzKVxuICAgICwgYXJyYXlFdmVyeSAgICAgICAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDQpXG4gICAgLCBhcnJheUZpbmQgICAgICAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoNSlcbiAgICAsIGFycmF5RmluZEluZGV4ICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCg2KVxuICAgICwgYXJyYXlJbmNsdWRlcyAgICAgICA9IGNyZWF0ZUFycmF5SW5jbHVkZXModHJ1ZSlcbiAgICAsIGFycmF5SW5kZXhPZiAgICAgICAgPSBjcmVhdGVBcnJheUluY2x1ZGVzKGZhbHNlKVxuICAgICwgYXJyYXlWYWx1ZXMgICAgICAgICA9IEFycmF5SXRlcmF0b3JzLnZhbHVlc1xuICAgICwgYXJyYXlLZXlzICAgICAgICAgICA9IEFycmF5SXRlcmF0b3JzLmtleXNcbiAgICAsIGFycmF5RW50cmllcyAgICAgICAgPSBBcnJheUl0ZXJhdG9ycy5lbnRyaWVzXG4gICAgLCBhcnJheUxhc3RJbmRleE9mICAgID0gQXJyYXlQcm90by5sYXN0SW5kZXhPZlxuICAgICwgYXJyYXlSZWR1Y2UgICAgICAgICA9IEFycmF5UHJvdG8ucmVkdWNlXG4gICAgLCBhcnJheVJlZHVjZVJpZ2h0ICAgID0gQXJyYXlQcm90by5yZWR1Y2VSaWdodFxuICAgICwgYXJyYXlKb2luICAgICAgICAgICA9IEFycmF5UHJvdG8uam9pblxuICAgICwgYXJyYXlTb3J0ICAgICAgICAgICA9IEFycmF5UHJvdG8uc29ydFxuICAgICwgYXJyYXlTbGljZSAgICAgICAgICA9IEFycmF5UHJvdG8uc2xpY2VcbiAgICAsIGFycmF5VG9TdHJpbmcgICAgICAgPSBBcnJheVByb3RvLnRvU3RyaW5nXG4gICAgLCBhcnJheVRvTG9jYWxlU3RyaW5nID0gQXJyYXlQcm90by50b0xvY2FsZVN0cmluZ1xuICAgICwgSVRFUkFUT1IgICAgICAgICAgICA9IHdrcygnaXRlcmF0b3InKVxuICAgICwgVEFHICAgICAgICAgICAgICAgICA9IHdrcygndG9TdHJpbmdUYWcnKVxuICAgICwgVFlQRURfQ09OU1RSVUNUT1IgICA9IHVpZCgndHlwZWRfY29uc3RydWN0b3InKVxuICAgICwgREVGX0NPTlNUUlVDVE9SICAgICA9IHVpZCgnZGVmX2NvbnN0cnVjdG9yJylcbiAgICAsIEFMTF9DT05TVFJVQ1RPUlMgICAgPSAkdHlwZWQuQ09OU1RSXG4gICAgLCBUWVBFRF9BUlJBWSAgICAgICAgID0gJHR5cGVkLlRZUEVEXG4gICAgLCBWSUVXICAgICAgICAgICAgICAgID0gJHR5cGVkLlZJRVdcbiAgICAsIFdST05HX0xFTkdUSCAgICAgICAgPSAnV3JvbmcgbGVuZ3RoISc7XG5cbiAgdmFyICRtYXAgPSBjcmVhdGVBcnJheU1ldGhvZCgxLCBmdW5jdGlvbihPLCBsZW5ndGgpe1xuICAgIHJldHVybiBhbGxvY2F0ZShzcGVjaWVzQ29uc3RydWN0b3IoTywgT1tERUZfQ09OU1RSVUNUT1JdKSwgbGVuZ3RoKTtcbiAgfSk7XG5cbiAgdmFyIExJVFRMRV9FTkRJQU4gPSBmYWlscyhmdW5jdGlvbigpe1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShuZXcgVWludDE2QXJyYXkoWzFdKS5idWZmZXIpWzBdID09PSAxO1xuICB9KTtcblxuICB2YXIgRk9SQ0VEX1NFVCA9ICEhVWludDhBcnJheSAmJiAhIVVpbnQ4QXJyYXlbUFJPVE9UWVBFXS5zZXQgJiYgZmFpbHMoZnVuY3Rpb24oKXtcbiAgICBuZXcgVWludDhBcnJheSgxKS5zZXQoe30pO1xuICB9KTtcblxuICB2YXIgc3RyaWN0VG9MZW5ndGggPSBmdW5jdGlvbihpdCwgU0FNRSl7XG4gICAgaWYoaXQgPT09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICB2YXIgbnVtYmVyID0gK2l0XG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKGl0KTtcbiAgICBpZihTQU1FICYmICFzYW1lKG51bWJlciwgbGVuZ3RoKSl0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgcmV0dXJuIGxlbmd0aDtcbiAgfTtcblxuICB2YXIgdG9PZmZzZXQgPSBmdW5jdGlvbihpdCwgQllURVMpe1xuICAgIHZhciBvZmZzZXQgPSB0b0ludGVnZXIoaXQpO1xuICAgIGlmKG9mZnNldCA8IDAgfHwgb2Zmc2V0ICUgQllURVMpdGhyb3cgUmFuZ2VFcnJvcignV3Jvbmcgb2Zmc2V0IScpO1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH07XG5cbiAgdmFyIHZhbGlkYXRlID0gZnVuY3Rpb24oaXQpe1xuICAgIGlmKGlzT2JqZWN0KGl0KSAmJiBUWVBFRF9BUlJBWSBpbiBpdClyZXR1cm4gaXQ7XG4gICAgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSB0eXBlZCBhcnJheSEnKTtcbiAgfTtcblxuICB2YXIgYWxsb2NhdGUgPSBmdW5jdGlvbihDLCBsZW5ndGgpe1xuICAgIGlmKCEoaXNPYmplY3QoQykgJiYgVFlQRURfQ09OU1RSVUNUT1IgaW4gQykpe1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJdCBpcyBub3QgYSB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvciEnKTtcbiAgICB9IHJldHVybiBuZXcgQyhsZW5ndGgpO1xuICB9O1xuXG4gIHZhciBzcGVjaWVzRnJvbUxpc3QgPSBmdW5jdGlvbihPLCBsaXN0KXtcbiAgICByZXR1cm4gZnJvbUxpc3Qoc3BlY2llc0NvbnN0cnVjdG9yKE8sIE9bREVGX0NPTlNUUlVDVE9SXSksIGxpc3QpO1xuICB9O1xuXG4gIHZhciBmcm9tTGlzdCA9IGZ1bmN0aW9uKEMsIGxpc3Qpe1xuICAgIHZhciBpbmRleCAgPSAwXG4gICAgICAsIGxlbmd0aCA9IGxpc3QubGVuZ3RoXG4gICAgICAsIHJlc3VsdCA9IGFsbG9jYXRlKEMsIGxlbmd0aCk7XG4gICAgd2hpbGUobGVuZ3RoID4gaW5kZXgpcmVzdWx0W2luZGV4XSA9IGxpc3RbaW5kZXgrK107XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB2YXIgYWRkR2V0dGVyID0gZnVuY3Rpb24oaXQsIGtleSwgaW50ZXJuYWwpe1xuICAgIGRQKGl0LCBrZXksIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLl9kW2ludGVybmFsXTsgfX0pO1xuICB9O1xuXG4gIHZhciAkZnJvbSA9IGZ1bmN0aW9uIGZyb20oc291cmNlIC8qLCBtYXBmbiwgdGhpc0FyZyAqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChzb3VyY2UpXG4gICAgICAsIGFMZW4gICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIG1hcGZuICAgPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGksIGxlbmd0aCwgdmFsdWVzLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIWlzQXJyYXlJdGVyKGl0ZXJGbikpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHZhbHVlcyA9IFtdLCBpID0gMDsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpKyspe1xuICAgICAgICB2YWx1ZXMucHVzaChzdGVwLnZhbHVlKTtcbiAgICAgIH0gTyA9IHZhbHVlcztcbiAgICB9XG4gICAgaWYobWFwcGluZyAmJiBhTGVuID4gMiltYXBmbiA9IGN0eChtYXBmbiwgYXJndW1lbnRzWzJdLCAyKTtcbiAgICBmb3IoaSA9IDAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKSwgcmVzdWx0ID0gYWxsb2NhdGUodGhpcywgbGVuZ3RoKTsgbGVuZ3RoID4gaTsgaSsrKXtcbiAgICAgIHJlc3VsdFtpXSA9IG1hcHBpbmcgPyBtYXBmbihPW2ldLCBpKSA6IE9baV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdmFyICRvZiA9IGZ1bmN0aW9uIG9mKC8qLi4uaXRlbXMqLyl7XG4gICAgdmFyIGluZGV4ICA9IDBcbiAgICAgICwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCByZXN1bHQgPSBhbGxvY2F0ZSh0aGlzLCBsZW5ndGgpO1xuICAgIHdoaWxlKGxlbmd0aCA+IGluZGV4KXJlc3VsdFtpbmRleF0gPSBhcmd1bWVudHNbaW5kZXgrK107XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBpT1MgU2FmYXJpIDYueCBmYWlscyBoZXJlXG4gIHZhciBUT19MT0NBTEVfQlVHID0gISFVaW50OEFycmF5ICYmIGZhaWxzKGZ1bmN0aW9uKCl7IGFycmF5VG9Mb2NhbGVTdHJpbmcuY2FsbChuZXcgVWludDhBcnJheSgxKSk7IH0pO1xuXG4gIHZhciAkdG9Mb2NhbGVTdHJpbmcgPSBmdW5jdGlvbiB0b0xvY2FsZVN0cmluZygpe1xuICAgIHJldHVybiBhcnJheVRvTG9jYWxlU3RyaW5nLmFwcGx5KFRPX0xPQ0FMRV9CVUcgPyBhcnJheVNsaWNlLmNhbGwodmFsaWRhdGUodGhpcykpIDogdmFsaWRhdGUodGhpcyksIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgdmFyIHByb3RvID0ge1xuICAgIGNvcHlXaXRoaW46IGZ1bmN0aW9uIGNvcHlXaXRoaW4odGFyZ2V0LCBzdGFydCAvKiwgZW5kICovKXtcbiAgICAgIHJldHVybiBhcnJheUNvcHlXaXRoaW4uY2FsbCh2YWxpZGF0ZSh0aGlzKSwgdGFyZ2V0LCBzdGFydCwgYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KGNhbGxiYWNrZm4gLyosIHRoaXNBcmcgKi8pe1xuICAgICAgcmV0dXJuIGFycmF5RXZlcnkodmFsaWRhdGUodGhpcyksIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGZpbGw6IGZ1bmN0aW9uIGZpbGwodmFsdWUgLyosIHN0YXJ0LCBlbmQgKi8peyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gYXJyYXlGaWxsLmFwcGx5KHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2tmbiAvKiwgdGhpc0FyZyAqLyl7XG4gICAgICByZXR1cm4gc3BlY2llc0Zyb21MaXN0KHRoaXMsIGFycmF5RmlsdGVyKHZhbGlkYXRlKHRoaXMpLCBjYWxsYmFja2ZuLFxuICAgICAgICBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCkpO1xuICAgIH0sXG4gICAgZmluZDogZnVuY3Rpb24gZmluZChwcmVkaWNhdGUgLyosIHRoaXNBcmcgKi8pe1xuICAgICAgcmV0dXJuIGFycmF5RmluZCh2YWxpZGF0ZSh0aGlzKSwgcHJlZGljYXRlLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBmaW5kSW5kZXg6IGZ1bmN0aW9uIGZpbmRJbmRleChwcmVkaWNhdGUgLyosIHRoaXNBcmcgKi8pe1xuICAgICAgcmV0dXJuIGFycmF5RmluZEluZGV4KHZhbGlkYXRlKHRoaXMpLCBwcmVkaWNhdGUsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiwgdGhpc0FyZyAqLyl7XG4gICAgICBhcnJheUZvckVhY2godmFsaWRhdGUodGhpcyksIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiwgZnJvbUluZGV4ICovKXtcbiAgICAgIHJldHVybiBhcnJheUluZGV4T2YodmFsaWRhdGUodGhpcyksIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhzZWFyY2hFbGVtZW50IC8qLCBmcm9tSW5kZXggKi8pe1xuICAgICAgcmV0dXJuIGFycmF5SW5jbHVkZXModmFsaWRhdGUodGhpcyksIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGpvaW46IGZ1bmN0aW9uIGpvaW4oc2VwYXJhdG9yKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgcmV0dXJuIGFycmF5Sm9pbi5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIGxhc3RJbmRleE9mOiBmdW5jdGlvbiBsYXN0SW5kZXhPZihzZWFyY2hFbGVtZW50IC8qLCBmcm9tSW5kZXggKi8peyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gYXJyYXlMYXN0SW5kZXhPZi5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIG1hcDogZnVuY3Rpb24gbWFwKG1hcGZuIC8qLCB0aGlzQXJnICovKXtcbiAgICAgIHJldHVybiAkbWFwKHZhbGlkYXRlKHRoaXMpLCBtYXBmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiwgaW5pdGlhbFZhbHVlICovKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgcmV0dXJuIGFycmF5UmVkdWNlLmFwcGx5KHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgcmVkdWNlUmlnaHQ6IGZ1bmN0aW9uIHJlZHVjZVJpZ2h0KGNhbGxiYWNrZm4gLyosIGluaXRpYWxWYWx1ZSAqLyl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHJldHVybiBhcnJheVJlZHVjZVJpZ2h0LmFwcGx5KHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24gcmV2ZXJzZSgpe1xuICAgICAgdmFyIHRoYXQgICA9IHRoaXNcbiAgICAgICAgLCBsZW5ndGggPSB2YWxpZGF0ZSh0aGF0KS5sZW5ndGhcbiAgICAgICAgLCBtaWRkbGUgPSBNYXRoLmZsb29yKGxlbmd0aCAvIDIpXG4gICAgICAgICwgaW5kZXggID0gMFxuICAgICAgICAsIHZhbHVlO1xuICAgICAgd2hpbGUoaW5kZXggPCBtaWRkbGUpe1xuICAgICAgICB2YWx1ZSAgICAgICAgID0gdGhhdFtpbmRleF07XG4gICAgICAgIHRoYXRbaW5kZXgrK10gPSB0aGF0Wy0tbGVuZ3RoXTtcbiAgICAgICAgdGhhdFtsZW5ndGhdICA9IHZhbHVlO1xuICAgICAgfSByZXR1cm4gdGhhdDtcbiAgICB9LFxuICAgIHNvbWU6IGZ1bmN0aW9uIHNvbWUoY2FsbGJhY2tmbiAvKiwgdGhpc0FyZyAqLyl7XG4gICAgICByZXR1cm4gYXJyYXlTb21lKHZhbGlkYXRlKHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBzb3J0OiBmdW5jdGlvbiBzb3J0KGNvbXBhcmVmbil7XG4gICAgICByZXR1cm4gYXJyYXlTb3J0LmNhbGwodmFsaWRhdGUodGhpcyksIGNvbXBhcmVmbik7XG4gICAgfSxcbiAgICBzdWJhcnJheTogZnVuY3Rpb24gc3ViYXJyYXkoYmVnaW4sIGVuZCl7XG4gICAgICB2YXIgTyAgICAgID0gdmFsaWRhdGUodGhpcylcbiAgICAgICAgLCBsZW5ndGggPSBPLmxlbmd0aFxuICAgICAgICAsICRiZWdpbiA9IHRvSW5kZXgoYmVnaW4sIGxlbmd0aCk7XG4gICAgICByZXR1cm4gbmV3IChzcGVjaWVzQ29uc3RydWN0b3IoTywgT1tERUZfQ09OU1RSVUNUT1JdKSkoXG4gICAgICAgIE8uYnVmZmVyLFxuICAgICAgICBPLmJ5dGVPZmZzZXQgKyAkYmVnaW4gKiBPLkJZVEVTX1BFUl9FTEVNRU5ULFxuICAgICAgICB0b0xlbmd0aCgoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0luZGV4KGVuZCwgbGVuZ3RoKSkgLSAkYmVnaW4pXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICB2YXIgJHNsaWNlID0gZnVuY3Rpb24gc2xpY2Uoc3RhcnQsIGVuZCl7XG4gICAgcmV0dXJuIHNwZWNpZXNGcm9tTGlzdCh0aGlzLCBhcnJheVNsaWNlLmNhbGwodmFsaWRhdGUodGhpcyksIHN0YXJ0LCBlbmQpKTtcbiAgfTtcblxuICB2YXIgJHNldCA9IGZ1bmN0aW9uIHNldChhcnJheUxpa2UgLyosIG9mZnNldCAqLyl7XG4gICAgdmFsaWRhdGUodGhpcyk7XG4gICAgdmFyIG9mZnNldCA9IHRvT2Zmc2V0KGFyZ3VtZW50c1sxXSwgMSlcbiAgICAgICwgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICAgICwgc3JjICAgID0gdG9PYmplY3QoYXJyYXlMaWtlKVxuICAgICAgLCBsZW4gICAgPSB0b0xlbmd0aChzcmMubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSAwO1xuICAgIGlmKGxlbiArIG9mZnNldCA+IGxlbmd0aCl0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgd2hpbGUoaW5kZXggPCBsZW4pdGhpc1tvZmZzZXQgKyBpbmRleF0gPSBzcmNbaW5kZXgrK107XG4gIH07XG5cbiAgdmFyICRpdGVyYXRvcnMgPSB7XG4gICAgZW50cmllczogZnVuY3Rpb24gZW50cmllcygpe1xuICAgICAgcmV0dXJuIGFycmF5RW50cmllcy5jYWxsKHZhbGlkYXRlKHRoaXMpKTtcbiAgICB9LFxuICAgIGtleXM6IGZ1bmN0aW9uIGtleXMoKXtcbiAgICAgIHJldHVybiBhcnJheUtleXMuY2FsbCh2YWxpZGF0ZSh0aGlzKSk7XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uIHZhbHVlcygpe1xuICAgICAgcmV0dXJuIGFycmF5VmFsdWVzLmNhbGwodmFsaWRhdGUodGhpcykpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgaXNUQUluZGV4ID0gZnVuY3Rpb24odGFyZ2V0LCBrZXkpe1xuICAgIHJldHVybiBpc09iamVjdCh0YXJnZXQpXG4gICAgICAmJiB0YXJnZXRbVFlQRURfQVJSQVldXG4gICAgICAmJiB0eXBlb2Yga2V5ICE9ICdzeW1ib2wnXG4gICAgICAmJiBrZXkgaW4gdGFyZ2V0XG4gICAgICAmJiBTdHJpbmcoK2tleSkgPT0gU3RyaW5nKGtleSk7XG4gIH07XG4gIHZhciAkZ2V0RGVzYyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSl7XG4gICAgcmV0dXJuIGlzVEFJbmRleCh0YXJnZXQsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpXG4gICAgICA/IHByb3BlcnR5RGVzYygyLCB0YXJnZXRba2V5XSlcbiAgICAgIDogZ09QRCh0YXJnZXQsIGtleSk7XG4gIH07XG4gIHZhciAkc2V0RGVzYyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBkZXNjKXtcbiAgICBpZihpc1RBSW5kZXgodGFyZ2V0LCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKVxuICAgICAgJiYgaXNPYmplY3QoZGVzYylcbiAgICAgICYmIGhhcyhkZXNjLCAndmFsdWUnKVxuICAgICAgJiYgIWhhcyhkZXNjLCAnZ2V0JylcbiAgICAgICYmICFoYXMoZGVzYywgJ3NldCcpXG4gICAgICAvLyBUT0RPOiBhZGQgdmFsaWRhdGlvbiBkZXNjcmlwdG9yIHcvbyBjYWxsaW5nIGFjY2Vzc29yc1xuICAgICAgJiYgIWRlc2MuY29uZmlndXJhYmxlXG4gICAgICAmJiAoIWhhcyhkZXNjLCAnd3JpdGFibGUnKSB8fCBkZXNjLndyaXRhYmxlKVxuICAgICAgJiYgKCFoYXMoZGVzYywgJ2VudW1lcmFibGUnKSB8fCBkZXNjLmVudW1lcmFibGUpXG4gICAgKXtcbiAgICAgIHRhcmdldFtrZXldID0gZGVzYy52YWx1ZTtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSBlbHNlIHJldHVybiBkUCh0YXJnZXQsIGtleSwgZGVzYyk7XG4gIH07XG5cbiAgaWYoIUFMTF9DT05TVFJVQ1RPUlMpe1xuICAgICRHT1BELmYgPSAkZ2V0RGVzYztcbiAgICAkRFAuZiAgID0gJHNldERlc2M7XG4gIH1cblxuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFBTExfQ09OU1RSVUNUT1JTLCAnT2JqZWN0Jywge1xuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldERlc2MsXG4gICAgZGVmaW5lUHJvcGVydHk6ICAgICAgICAgICAkc2V0RGVzY1xuICB9KTtcblxuICBpZihmYWlscyhmdW5jdGlvbigpeyBhcnJheVRvU3RyaW5nLmNhbGwoe30pOyB9KSl7XG4gICAgYXJyYXlUb1N0cmluZyA9IGFycmF5VG9Mb2NhbGVTdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgICAgcmV0dXJuIGFycmF5Sm9pbi5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHZhciAkVHlwZWRBcnJheVByb3RvdHlwZSQgPSByZWRlZmluZUFsbCh7fSwgcHJvdG8pO1xuICByZWRlZmluZUFsbCgkVHlwZWRBcnJheVByb3RvdHlwZSQsICRpdGVyYXRvcnMpO1xuICBoaWRlKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgSVRFUkFUT1IsICRpdGVyYXRvcnMudmFsdWVzKTtcbiAgcmVkZWZpbmVBbGwoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCB7XG4gICAgc2xpY2U6ICAgICAgICAgICRzbGljZSxcbiAgICBzZXQ6ICAgICAgICAgICAgJHNldCxcbiAgICBjb25zdHJ1Y3RvcjogICAgZnVuY3Rpb24oKXsgLyogbm9vcCAqLyB9LFxuICAgIHRvU3RyaW5nOiAgICAgICBhcnJheVRvU3RyaW5nLFxuICAgIHRvTG9jYWxlU3RyaW5nOiAkdG9Mb2NhbGVTdHJpbmdcbiAgfSk7XG4gIGFkZEdldHRlcigkVHlwZWRBcnJheVByb3RvdHlwZSQsICdidWZmZXInLCAnYicpO1xuICBhZGRHZXR0ZXIoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCAnYnl0ZU9mZnNldCcsICdvJyk7XG4gIGFkZEdldHRlcigkVHlwZWRBcnJheVByb3RvdHlwZSQsICdieXRlTGVuZ3RoJywgJ2wnKTtcbiAgYWRkR2V0dGVyKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgJ2xlbmd0aCcsICdlJyk7XG4gIGRQKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgVEFHLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpc1tUWVBFRF9BUlJBWV07IH1cbiAgfSk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIEJZVEVTLCB3cmFwcGVyLCBDTEFNUEVEKXtcbiAgICBDTEFNUEVEID0gISFDTEFNUEVEO1xuICAgIHZhciBOQU1FICAgICAgID0gS0VZICsgKENMQU1QRUQgPyAnQ2xhbXBlZCcgOiAnJykgKyAnQXJyYXknXG4gICAgICAsIElTTlRfVUlOVDggPSBOQU1FICE9ICdVaW50OEFycmF5J1xuICAgICAgLCBHRVRURVIgICAgID0gJ2dldCcgKyBLRVlcbiAgICAgICwgU0VUVEVSICAgICA9ICdzZXQnICsgS0VZXG4gICAgICAsIFR5cGVkQXJyYXkgPSBnbG9iYWxbTkFNRV1cbiAgICAgICwgQmFzZSAgICAgICA9IFR5cGVkQXJyYXkgfHwge31cbiAgICAgICwgVEFDICAgICAgICA9IFR5cGVkQXJyYXkgJiYgZ2V0UHJvdG90eXBlT2YoVHlwZWRBcnJheSlcbiAgICAgICwgRk9SQ0VEICAgICA9ICFUeXBlZEFycmF5IHx8ICEkdHlwZWQuQUJWXG4gICAgICAsIE8gICAgICAgICAgPSB7fVxuICAgICAgLCBUeXBlZEFycmF5UHJvdG90eXBlID0gVHlwZWRBcnJheSAmJiBUeXBlZEFycmF5W1BST1RPVFlQRV07XG4gICAgdmFyIGdldHRlciA9IGZ1bmN0aW9uKHRoYXQsIGluZGV4KXtcbiAgICAgIHZhciBkYXRhID0gdGhhdC5fZDtcbiAgICAgIHJldHVybiBkYXRhLnZbR0VUVEVSXShpbmRleCAqIEJZVEVTICsgZGF0YS5vLCBMSVRUTEVfRU5ESUFOKTtcbiAgICB9O1xuICAgIHZhciBzZXR0ZXIgPSBmdW5jdGlvbih0aGF0LCBpbmRleCwgdmFsdWUpe1xuICAgICAgdmFyIGRhdGEgPSB0aGF0Ll9kO1xuICAgICAgaWYoQ0xBTVBFRCl2YWx1ZSA9ICh2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUpKSA8IDAgPyAwIDogdmFsdWUgPiAweGZmID8gMHhmZiA6IHZhbHVlICYgMHhmZjtcbiAgICAgIGRhdGEudltTRVRURVJdKGluZGV4ICogQllURVMgKyBkYXRhLm8sIHZhbHVlLCBMSVRUTEVfRU5ESUFOKTtcbiAgICB9O1xuICAgIHZhciBhZGRFbGVtZW50ID0gZnVuY3Rpb24odGhhdCwgaW5kZXgpe1xuICAgICAgZFAodGhhdCwgaW5kZXgsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICAgIHJldHVybiBnZXR0ZXIodGhpcywgaW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICByZXR1cm4gc2V0dGVyKHRoaXMsIGluZGV4LCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKXtcbiAgICAgIFR5cGVkQXJyYXkgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGRhdGEsICRvZmZzZXQsICRsZW5ndGgpe1xuICAgICAgICBhbkluc3RhbmNlKHRoYXQsIFR5cGVkQXJyYXksIE5BTUUsICdfZCcpO1xuICAgICAgICB2YXIgaW5kZXggID0gMFxuICAgICAgICAgICwgb2Zmc2V0ID0gMFxuICAgICAgICAgICwgYnVmZmVyLCBieXRlTGVuZ3RoLCBsZW5ndGgsIGtsYXNzO1xuICAgICAgICBpZighaXNPYmplY3QoZGF0YSkpe1xuICAgICAgICAgIGxlbmd0aCAgICAgPSBzdHJpY3RUb0xlbmd0aChkYXRhLCB0cnVlKVxuICAgICAgICAgIGJ5dGVMZW5ndGggPSBsZW5ndGggKiBCWVRFUztcbiAgICAgICAgICBidWZmZXIgICAgID0gbmV3ICRBcnJheUJ1ZmZlcihieXRlTGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIGlmKGRhdGEgaW5zdGFuY2VvZiAkQXJyYXlCdWZmZXIgfHwgKGtsYXNzID0gY2xhc3NvZihkYXRhKSkgPT0gQVJSQVlfQlVGRkVSIHx8IGtsYXNzID09IFNIQVJFRF9CVUZGRVIpe1xuICAgICAgICAgIGJ1ZmZlciA9IGRhdGE7XG4gICAgICAgICAgb2Zmc2V0ID0gdG9PZmZzZXQoJG9mZnNldCwgQllURVMpO1xuICAgICAgICAgIHZhciAkbGVuID0gZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICAgIGlmKCRsZW5ndGggPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBpZigkbGVuICUgQllURVMpdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgICAgICAgICAgYnl0ZUxlbmd0aCA9ICRsZW4gLSBvZmZzZXQ7XG4gICAgICAgICAgICBpZihieXRlTGVuZ3RoIDwgMCl0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ5dGVMZW5ndGggPSB0b0xlbmd0aCgkbGVuZ3RoKSAqIEJZVEVTO1xuICAgICAgICAgICAgaWYoYnl0ZUxlbmd0aCArIG9mZnNldCA+ICRsZW4pdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZW5ndGggPSBieXRlTGVuZ3RoIC8gQllURVM7XG4gICAgICAgIH0gZWxzZSBpZihUWVBFRF9BUlJBWSBpbiBkYXRhKXtcbiAgICAgICAgICByZXR1cm4gZnJvbUxpc3QoVHlwZWRBcnJheSwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICRmcm9tLmNhbGwoVHlwZWRBcnJheSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaGlkZSh0aGF0LCAnX2QnLCB7XG4gICAgICAgICAgYjogYnVmZmVyLFxuICAgICAgICAgIG86IG9mZnNldCxcbiAgICAgICAgICBsOiBieXRlTGVuZ3RoLFxuICAgICAgICAgIGU6IGxlbmd0aCxcbiAgICAgICAgICB2OiBuZXcgJERhdGFWaWV3KGJ1ZmZlcilcbiAgICAgICAgfSk7XG4gICAgICAgIHdoaWxlKGluZGV4IDwgbGVuZ3RoKWFkZEVsZW1lbnQodGhhdCwgaW5kZXgrKyk7XG4gICAgICB9KTtcbiAgICAgIFR5cGVkQXJyYXlQcm90b3R5cGUgPSBUeXBlZEFycmF5W1BST1RPVFlQRV0gPSBjcmVhdGUoJFR5cGVkQXJyYXlQcm90b3R5cGUkKTtcbiAgICAgIGhpZGUoVHlwZWRBcnJheVByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgVHlwZWRBcnJheSk7XG4gICAgfSBlbHNlIGlmKCEkaXRlckRldGVjdChmdW5jdGlvbihpdGVyKXtcbiAgICAgIC8vIFY4IHdvcmtzIHdpdGggaXRlcmF0b3JzLCBidXQgZmFpbHMgaW4gbWFueSBvdGhlciBjYXNlc1xuICAgICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQ1NTJcbiAgICAgIG5ldyBUeXBlZEFycmF5KG51bGwpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgICAgbmV3IFR5cGVkQXJyYXkoaXRlcik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgfSwgdHJ1ZSkpe1xuICAgICAgVHlwZWRBcnJheSA9IHdyYXBwZXIoZnVuY3Rpb24odGhhdCwgZGF0YSwgJG9mZnNldCwgJGxlbmd0aCl7XG4gICAgICAgIGFuSW5zdGFuY2UodGhhdCwgVHlwZWRBcnJheSwgTkFNRSk7XG4gICAgICAgIHZhciBrbGFzcztcbiAgICAgICAgLy8gYHdzYCBtb2R1bGUgYnVnLCB0ZW1wb3JhcmlseSByZW1vdmUgdmFsaWRhdGlvbiBsZW5ndGggZm9yIFVpbnQ4QXJyYXlcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnNvY2tldHMvd3MvcHVsbC82NDVcbiAgICAgICAgaWYoIWlzT2JqZWN0KGRhdGEpKXJldHVybiBuZXcgQmFzZShzdHJpY3RUb0xlbmd0aChkYXRhLCBJU05UX1VJTlQ4KSk7XG4gICAgICAgIGlmKGRhdGEgaW5zdGFuY2VvZiAkQXJyYXlCdWZmZXIgfHwgKGtsYXNzID0gY2xhc3NvZihkYXRhKSkgPT0gQVJSQVlfQlVGRkVSIHx8IGtsYXNzID09IFNIQVJFRF9CVUZGRVIpe1xuICAgICAgICAgIHJldHVybiAkbGVuZ3RoICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gbmV3IEJhc2UoZGF0YSwgdG9PZmZzZXQoJG9mZnNldCwgQllURVMpLCAkbGVuZ3RoKVxuICAgICAgICAgICAgOiAkb2Zmc2V0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyBuZXcgQmFzZShkYXRhLCB0b09mZnNldCgkb2Zmc2V0LCBCWVRFUykpXG4gICAgICAgICAgICAgIDogbmV3IEJhc2UoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoVFlQRURfQVJSQVkgaW4gZGF0YSlyZXR1cm4gZnJvbUxpc3QoVHlwZWRBcnJheSwgZGF0YSk7XG4gICAgICAgIHJldHVybiAkZnJvbS5jYWxsKFR5cGVkQXJyYXksIGRhdGEpO1xuICAgICAgfSk7XG4gICAgICBhcnJheUZvckVhY2goVEFDICE9PSBGdW5jdGlvbi5wcm90b3R5cGUgPyBnT1BOKEJhc2UpLmNvbmNhdChnT1BOKFRBQykpIDogZ09QTihCYXNlKSwgZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgaWYoIShrZXkgaW4gVHlwZWRBcnJheSkpaGlkZShUeXBlZEFycmF5LCBrZXksIEJhc2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICAgIFR5cGVkQXJyYXlbUFJPVE9UWVBFXSA9IFR5cGVkQXJyYXlQcm90b3R5cGU7XG4gICAgICBpZighTElCUkFSWSlUeXBlZEFycmF5UHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVHlwZWRBcnJheTtcbiAgICB9XG4gICAgdmFyICRuYXRpdmVJdGVyYXRvciAgID0gVHlwZWRBcnJheVByb3RvdHlwZVtJVEVSQVRPUl1cbiAgICAgICwgQ09SUkVDVF9JVEVSX05BTUUgPSAhISRuYXRpdmVJdGVyYXRvciAmJiAoJG5hdGl2ZUl0ZXJhdG9yLm5hbWUgPT0gJ3ZhbHVlcycgfHwgJG5hdGl2ZUl0ZXJhdG9yLm5hbWUgPT0gdW5kZWZpbmVkKVxuICAgICAgLCAkaXRlcmF0b3IgICAgICAgICA9ICRpdGVyYXRvcnMudmFsdWVzO1xuICAgIGhpZGUoVHlwZWRBcnJheSwgVFlQRURfQ09OU1RSVUNUT1IsIHRydWUpO1xuICAgIGhpZGUoVHlwZWRBcnJheVByb3RvdHlwZSwgVFlQRURfQVJSQVksIE5BTUUpO1xuICAgIGhpZGUoVHlwZWRBcnJheVByb3RvdHlwZSwgVklFVywgdHJ1ZSk7XG4gICAgaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCBERUZfQ09OU1RSVUNUT1IsIFR5cGVkQXJyYXkpO1xuXG4gICAgaWYoQ0xBTVBFRCA/IG5ldyBUeXBlZEFycmF5KDEpW1RBR10gIT0gTkFNRSA6ICEoVEFHIGluIFR5cGVkQXJyYXlQcm90b3R5cGUpKXtcbiAgICAgIGRQKFR5cGVkQXJyYXlQcm90b3R5cGUsIFRBRywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBOQU1FOyB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBPW05BTUVdID0gVHlwZWRBcnJheTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogKFR5cGVkQXJyYXkgIT0gQmFzZSksIE8pO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlMsIE5BTUUsIHtcbiAgICAgIEJZVEVTX1BFUl9FTEVNRU5UOiBCWVRFUyxcbiAgICAgIGZyb206ICRmcm9tLFxuICAgICAgb2Y6ICRvZlxuICAgIH0pO1xuXG4gICAgaWYoIShCWVRFU19QRVJfRUxFTUVOVCBpbiBUeXBlZEFycmF5UHJvdG90eXBlKSloaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsIEJZVEVTX1BFUl9FTEVNRU5ULCBCWVRFUyk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUCwgTkFNRSwgcHJvdG8pO1xuXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogRk9SQ0VEX1NFVCwgTkFNRSwge3NldDogJHNldH0pO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhQ09SUkVDVF9JVEVSX05BTUUsIE5BTUUsICRpdGVyYXRvcnMpO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoVHlwZWRBcnJheVByb3RvdHlwZS50b1N0cmluZyAhPSBhcnJheVRvU3RyaW5nKSwgTkFNRSwge3RvU3RyaW5nOiBhcnJheVRvU3RyaW5nfSk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgICBuZXcgVHlwZWRBcnJheSgxKS5zbGljZSgpO1xuICAgIH0pLCBOQU1FLCB7c2xpY2U6ICRzbGljZX0pO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoZmFpbHMoZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBbMSwgMl0udG9Mb2NhbGVTdHJpbmcoKSAhPSBuZXcgVHlwZWRBcnJheShbMSwgMl0pLnRvTG9jYWxlU3RyaW5nKClcbiAgICB9KSB8fCAhZmFpbHMoZnVuY3Rpb24oKXtcbiAgICAgIFR5cGVkQXJyYXlQcm90b3R5cGUudG9Mb2NhbGVTdHJpbmcuY2FsbChbMSwgMl0pO1xuICAgIH0pKSwgTkFNRSwge3RvTG9jYWxlU3RyaW5nOiAkdG9Mb2NhbGVTdHJpbmd9KTtcblxuICAgIEl0ZXJhdG9yc1tOQU1FXSA9IENPUlJFQ1RfSVRFUl9OQU1FID8gJG5hdGl2ZUl0ZXJhdG9yIDogJGl0ZXJhdG9yO1xuICAgIGlmKCFMSUJSQVJZICYmICFDT1JSRUNUX0lURVJfTkFNRSloaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsIElURVJBVE9SLCAkaXRlcmF0b3IpO1xuICB9O1xufSBlbHNlIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJHR5cGVkICAgICAgICAgPSByZXF1aXJlKCcuL190eXBlZCcpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZUFsbCAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICwgZmFpbHMgICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgYW5JbnN0YW5jZSAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgdG9JbnRlZ2VyICAgICAgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCB0b0xlbmd0aCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgZ09QTiAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCBkUCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBhcnJheUZpbGwgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZpbGwnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEFSUkFZX0JVRkZFUiAgID0gJ0FycmF5QnVmZmVyJ1xuICAsIERBVEFfVklFVyAgICAgID0gJ0RhdGFWaWV3J1xuICAsIFBST1RPVFlQRSAgICAgID0gJ3Byb3RvdHlwZSdcbiAgLCBXUk9OR19MRU5HVEggICA9ICdXcm9uZyBsZW5ndGghJ1xuICAsIFdST05HX0lOREVYICAgID0gJ1dyb25nIGluZGV4ISdcbiAgLCAkQXJyYXlCdWZmZXIgICA9IGdsb2JhbFtBUlJBWV9CVUZGRVJdXG4gICwgJERhdGFWaWV3ICAgICAgPSBnbG9iYWxbREFUQV9WSUVXXVxuICAsIE1hdGggICAgICAgICAgID0gZ2xvYmFsLk1hdGhcbiAgLCBwYXJzZUludCAgICAgICA9IGdsb2JhbC5wYXJzZUludFxuICAsIFJhbmdlRXJyb3IgICAgID0gZ2xvYmFsLlJhbmdlRXJyb3JcbiAgLCBJbmZpbml0eSAgICAgICA9IGdsb2JhbC5JbmZpbml0eVxuICAsIEJhc2VCdWZmZXIgICAgID0gJEFycmF5QnVmZmVyXG4gICwgYWJzICAgICAgICAgICAgPSBNYXRoLmFic1xuICAsIHBvdyAgICAgICAgICAgID0gTWF0aC5wb3dcbiAgLCBtaW4gICAgICAgICAgICA9IE1hdGgubWluXG4gICwgZmxvb3IgICAgICAgICAgPSBNYXRoLmZsb29yXG4gICwgbG9nICAgICAgICAgICAgPSBNYXRoLmxvZ1xuICAsIExOMiAgICAgICAgICAgID0gTWF0aC5MTjJcbiAgLCBCVUZGRVIgICAgICAgICA9ICdidWZmZXInXG4gICwgQllURV9MRU5HVEggICAgPSAnYnl0ZUxlbmd0aCdcbiAgLCBCWVRFX09GRlNFVCAgICA9ICdieXRlT2Zmc2V0J1xuICAsICRCVUZGRVIgICAgICAgID0gREVTQ1JJUFRPUlMgPyAnX2InIDogQlVGRkVSXG4gICwgJExFTkdUSCAgICAgICAgPSBERVNDUklQVE9SUyA/ICdfbCcgOiBCWVRFX0xFTkdUSFxuICAsICRPRkZTRVQgICAgICAgID0gREVTQ1JJUFRPUlMgPyAnX28nIDogQllURV9PRkZTRVQ7XG5cbi8vIElFRUU3NTQgY29udmVyc2lvbnMgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9pZWVlNzU0XG52YXIgcGFja0lFRUU3NTQgPSBmdW5jdGlvbih2YWx1ZSwgbUxlbiwgbkJ5dGVzKXtcbiAgdmFyIGJ1ZmZlciA9IEFycmF5KG5CeXRlcylcbiAgICAsIGVMZW4gICA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICAgICwgZU1heCAgID0gKDEgPDwgZUxlbikgLSAxXG4gICAgLCBlQmlhcyAgPSBlTWF4ID4+IDFcbiAgICAsIHJ0ICAgICA9IG1MZW4gPT09IDIzID8gcG93KDIsIC0yNCkgLSBwb3coMiwgLTc3KSA6IDBcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHMgICAgICA9IHZhbHVlIDwgMCB8fCB2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwID8gMSA6IDBcbiAgICAsIGUsIG0sIGM7XG4gIHZhbHVlID0gYWJzKHZhbHVlKVxuICBpZih2YWx1ZSAhPSB2YWx1ZSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpe1xuICAgIG0gPSB2YWx1ZSAhPSB2YWx1ZSA/IDEgOiAwO1xuICAgIGUgPSBlTWF4O1xuICB9IGVsc2Uge1xuICAgIGUgPSBmbG9vcihsb2codmFsdWUpIC8gTE4yKTtcbiAgICBpZih2YWx1ZSAqIChjID0gcG93KDIsIC1lKSkgPCAxKXtcbiAgICAgIGUtLTtcbiAgICAgIGMgKj0gMjtcbiAgICB9XG4gICAgaWYoZSArIGVCaWFzID49IDEpe1xuICAgICAgdmFsdWUgKz0gcnQgLyBjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIHBvdygyLCAxIC0gZUJpYXMpO1xuICAgIH1cbiAgICBpZih2YWx1ZSAqIGMgPj0gMil7XG4gICAgICBlKys7XG4gICAgICBjIC89IDI7XG4gICAgfVxuICAgIGlmKGUgKyBlQmlhcyA+PSBlTWF4KXtcbiAgICAgIG0gPSAwO1xuICAgICAgZSA9IGVNYXg7XG4gICAgfSBlbHNlIGlmKGUgKyBlQmlhcyA+PSAxKXtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBwb3coMiwgbUxlbik7XG4gICAgICBlID0gZSArIGVCaWFzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBwb3coMiwgZUJpYXMgLSAxKSAqIHBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSAwO1xuICAgIH1cbiAgfVxuICBmb3IoOyBtTGVuID49IDg7IGJ1ZmZlcltpKytdID0gbSAmIDI1NSwgbSAvPSAyNTYsIG1MZW4gLT0gOCk7XG4gIGUgPSBlIDw8IG1MZW4gfCBtO1xuICBlTGVuICs9IG1MZW47XG4gIGZvcig7IGVMZW4gPiAwOyBidWZmZXJbaSsrXSA9IGUgJiAyNTUsIGUgLz0gMjU2LCBlTGVuIC09IDgpO1xuICBidWZmZXJbLS1pXSB8PSBzICogMTI4O1xuICByZXR1cm4gYnVmZmVyO1xufTtcbnZhciB1bnBhY2tJRUVFNzU0ID0gZnVuY3Rpb24oYnVmZmVyLCBtTGVuLCBuQnl0ZXMpe1xuICB2YXIgZUxlbiAgPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgICAsIGVNYXggID0gKDEgPDwgZUxlbikgLSAxXG4gICAgLCBlQmlhcyA9IGVNYXggPj4gMVxuICAgICwgbkJpdHMgPSBlTGVuIC0gN1xuICAgICwgaSAgICAgPSBuQnl0ZXMgLSAxXG4gICAgLCBzICAgICA9IGJ1ZmZlcltpLS1dXG4gICAgLCBlICAgICA9IHMgJiAxMjdcbiAgICAsIG07XG4gIHMgPj49IDc7XG4gIGZvcig7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbaV0sIGktLSwgbkJpdHMgLT0gOCk7XG4gIG0gPSBlICYgKDEgPDwgLW5CaXRzKSAtIDE7XG4gIGUgPj49IC1uQml0cztcbiAgbkJpdHMgKz0gbUxlbjtcbiAgZm9yKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltpXSwgaS0tLCBuQml0cyAtPSA4KTtcbiAgaWYoZSA9PT0gMCl7XG4gICAgZSA9IDEgLSBlQmlhcztcbiAgfSBlbHNlIGlmKGUgPT09IGVNYXgpe1xuICAgIHJldHVybiBtID8gTmFOIDogcyA/IC1JbmZpbml0eSA6IEluZmluaXR5O1xuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgcG93KDIsIG1MZW4pO1xuICAgIGUgPSBlIC0gZUJpYXM7XG4gIH0gcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBwb3coMiwgZSAtIG1MZW4pO1xufTtcblxudmFyIHVucGFja0kzMiA9IGZ1bmN0aW9uKGJ5dGVzKXtcbiAgcmV0dXJuIGJ5dGVzWzNdIDw8IDI0IHwgYnl0ZXNbMl0gPDwgMTYgfCBieXRlc1sxXSA8PCA4IHwgYnl0ZXNbMF07XG59O1xudmFyIHBhY2tJOCA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIFtpdCAmIDB4ZmZdO1xufTtcbnZhciBwYWNrSTE2ID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gW2l0ICYgMHhmZiwgaXQgPj4gOCAmIDB4ZmZdO1xufTtcbnZhciBwYWNrSTMyID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gW2l0ICYgMHhmZiwgaXQgPj4gOCAmIDB4ZmYsIGl0ID4+IDE2ICYgMHhmZiwgaXQgPj4gMjQgJiAweGZmXTtcbn07XG52YXIgcGFja0Y2NCA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHBhY2tJRUVFNzU0KGl0LCA1MiwgOCk7XG59O1xudmFyIHBhY2tGMzIgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBwYWNrSUVFRTc1NChpdCwgMjMsIDQpO1xufTtcblxudmFyIGFkZEdldHRlciA9IGZ1bmN0aW9uKEMsIGtleSwgaW50ZXJuYWwpe1xuICBkUChDW1BST1RPVFlQRV0sIGtleSwge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXNbaW50ZXJuYWxdOyB9fSk7XG59O1xuXG52YXIgZ2V0ID0gZnVuY3Rpb24odmlldywgYnl0ZXMsIGluZGV4LCBpc0xpdHRsZUVuZGlhbil7XG4gIHZhciBudW1JbmRleCA9ICtpbmRleFxuICAgICwgaW50SW5kZXggPSB0b0ludGVnZXIobnVtSW5kZXgpO1xuICBpZihudW1JbmRleCAhPSBpbnRJbmRleCB8fCBpbnRJbmRleCA8IDAgfHwgaW50SW5kZXggKyBieXRlcyA+IHZpZXdbJExFTkdUSF0pdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19JTkRFWCk7XG4gIHZhciBzdG9yZSA9IHZpZXdbJEJVRkZFUl0uX2JcbiAgICAsIHN0YXJ0ID0gaW50SW5kZXggKyB2aWV3WyRPRkZTRVRdXG4gICAgLCBwYWNrICA9IHN0b3JlLnNsaWNlKHN0YXJ0LCBzdGFydCArIGJ5dGVzKTtcbiAgcmV0dXJuIGlzTGl0dGxlRW5kaWFuID8gcGFjayA6IHBhY2sucmV2ZXJzZSgpO1xufTtcbnZhciBzZXQgPSBmdW5jdGlvbih2aWV3LCBieXRlcywgaW5kZXgsIGNvbnZlcnNpb24sIHZhbHVlLCBpc0xpdHRsZUVuZGlhbil7XG4gIHZhciBudW1JbmRleCA9ICtpbmRleFxuICAgICwgaW50SW5kZXggPSB0b0ludGVnZXIobnVtSW5kZXgpO1xuICBpZihudW1JbmRleCAhPSBpbnRJbmRleCB8fCBpbnRJbmRleCA8IDAgfHwgaW50SW5kZXggKyBieXRlcyA+IHZpZXdbJExFTkdUSF0pdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19JTkRFWCk7XG4gIHZhciBzdG9yZSA9IHZpZXdbJEJVRkZFUl0uX2JcbiAgICAsIHN0YXJ0ID0gaW50SW5kZXggKyB2aWV3WyRPRkZTRVRdXG4gICAgLCBwYWNrICA9IGNvbnZlcnNpb24oK3ZhbHVlKTtcbiAgZm9yKHZhciBpID0gMDsgaSA8IGJ5dGVzOyBpKyspc3RvcmVbc3RhcnQgKyBpXSA9IHBhY2tbaXNMaXR0bGVFbmRpYW4gPyBpIDogYnl0ZXMgLSBpIC0gMV07XG59O1xuXG52YXIgdmFsaWRhdGVBcnJheUJ1ZmZlckFyZ3VtZW50cyA9IGZ1bmN0aW9uKHRoYXQsIGxlbmd0aCl7XG4gIGFuSW5zdGFuY2UodGhhdCwgJEFycmF5QnVmZmVyLCBBUlJBWV9CVUZGRVIpO1xuICB2YXIgbnVtYmVyTGVuZ3RoID0gK2xlbmd0aFxuICAgICwgYnl0ZUxlbmd0aCAgID0gdG9MZW5ndGgobnVtYmVyTGVuZ3RoKTtcbiAgaWYobnVtYmVyTGVuZ3RoICE9IGJ5dGVMZW5ndGgpdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICByZXR1cm4gYnl0ZUxlbmd0aDtcbn07XG5cbmlmKCEkdHlwZWQuQUJWKXtcbiAgJEFycmF5QnVmZmVyID0gZnVuY3Rpb24gQXJyYXlCdWZmZXIobGVuZ3RoKXtcbiAgICB2YXIgYnl0ZUxlbmd0aCA9IHZhbGlkYXRlQXJyYXlCdWZmZXJBcmd1bWVudHModGhpcywgbGVuZ3RoKTtcbiAgICB0aGlzLl9iICAgICAgID0gYXJyYXlGaWxsLmNhbGwoQXJyYXkoYnl0ZUxlbmd0aCksIDApO1xuICAgIHRoaXNbJExFTkdUSF0gPSBieXRlTGVuZ3RoO1xuICB9O1xuXG4gICREYXRhVmlldyA9IGZ1bmN0aW9uIERhdGFWaWV3KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCl7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkRGF0YVZpZXcsIERBVEFfVklFVyk7XG4gICAgYW5JbnN0YW5jZShidWZmZXIsICRBcnJheUJ1ZmZlciwgREFUQV9WSUVXKTtcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gYnVmZmVyWyRMRU5HVEhdXG4gICAgICAsIG9mZnNldCAgICAgICA9IHRvSW50ZWdlcihieXRlT2Zmc2V0KTtcbiAgICBpZihvZmZzZXQgPCAwIHx8IG9mZnNldCA+IGJ1ZmZlckxlbmd0aCl0aHJvdyBSYW5nZUVycm9yKCdXcm9uZyBvZmZzZXQhJyk7XG4gICAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPT09IHVuZGVmaW5lZCA/IGJ1ZmZlckxlbmd0aCAtIG9mZnNldCA6IHRvTGVuZ3RoKGJ5dGVMZW5ndGgpO1xuICAgIGlmKG9mZnNldCArIGJ5dGVMZW5ndGggPiBidWZmZXJMZW5ndGgpdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgIHRoaXNbJEJVRkZFUl0gPSBidWZmZXI7XG4gICAgdGhpc1skT0ZGU0VUXSA9IG9mZnNldDtcbiAgICB0aGlzWyRMRU5HVEhdID0gYnl0ZUxlbmd0aDtcbiAgfTtcblxuICBpZihERVNDUklQVE9SUyl7XG4gICAgYWRkR2V0dGVyKCRBcnJheUJ1ZmZlciwgQllURV9MRU5HVEgsICdfbCcpO1xuICAgIGFkZEdldHRlcigkRGF0YVZpZXcsIEJVRkZFUiwgJ19iJyk7XG4gICAgYWRkR2V0dGVyKCREYXRhVmlldywgQllURV9MRU5HVEgsICdfbCcpO1xuICAgIGFkZEdldHRlcigkRGF0YVZpZXcsIEJZVEVfT0ZGU0VULCAnX28nKTtcbiAgfVxuXG4gIHJlZGVmaW5lQWxsKCREYXRhVmlld1tQUk9UT1RZUEVdLCB7XG4gICAgZ2V0SW50ODogZnVuY3Rpb24gZ2V0SW50OChieXRlT2Zmc2V0KXtcbiAgICAgIHJldHVybiBnZXQodGhpcywgMSwgYnl0ZU9mZnNldClbMF0gPDwgMjQgPj4gMjQ7XG4gICAgfSxcbiAgICBnZXRVaW50ODogZnVuY3Rpb24gZ2V0VWludDgoYnl0ZU9mZnNldCl7XG4gICAgICByZXR1cm4gZ2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQpWzBdO1xuICAgIH0sXG4gICAgZ2V0SW50MTY6IGZ1bmN0aW9uIGdldEludDE2KGJ5dGVPZmZzZXQgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICB2YXIgYnl0ZXMgPSBnZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKTtcbiAgICAgIHJldHVybiAoYnl0ZXNbMV0gPDwgOCB8IGJ5dGVzWzBdKSA8PCAxNiA+PiAxNjtcbiAgICB9LFxuICAgIGdldFVpbnQxNjogZnVuY3Rpb24gZ2V0VWludDE2KGJ5dGVPZmZzZXQgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICB2YXIgYnl0ZXMgPSBnZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKTtcbiAgICAgIHJldHVybiBieXRlc1sxXSA8PCA4IHwgYnl0ZXNbMF07XG4gICAgfSxcbiAgICBnZXRJbnQzMjogZnVuY3Rpb24gZ2V0SW50MzIoYnl0ZU9mZnNldCAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHJldHVybiB1bnBhY2tJMzIoZ2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSkpO1xuICAgIH0sXG4gICAgZ2V0VWludDMyOiBmdW5jdGlvbiBnZXRVaW50MzIoYnl0ZU9mZnNldCAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHJldHVybiB1bnBhY2tJMzIoZ2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSkpID4+PiAwO1xuICAgIH0sXG4gICAgZ2V0RmxvYXQzMjogZnVuY3Rpb24gZ2V0RmxvYXQzMihieXRlT2Zmc2V0IC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgcmV0dXJuIHVucGFja0lFRUU3NTQoZ2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSksIDIzLCA0KTtcbiAgICB9LFxuICAgIGdldEZsb2F0NjQ6IGZ1bmN0aW9uIGdldEZsb2F0NjQoYnl0ZU9mZnNldCAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHJldHVybiB1bnBhY2tJRUVFNzU0KGdldCh0aGlzLCA4LCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pLCA1MiwgOCk7XG4gICAgfSxcbiAgICBzZXRJbnQ4OiBmdW5jdGlvbiBzZXRJbnQ4KGJ5dGVPZmZzZXQsIHZhbHVlKXtcbiAgICAgIHNldCh0aGlzLCAxLCBieXRlT2Zmc2V0LCBwYWNrSTgsIHZhbHVlKTtcbiAgICB9LFxuICAgIHNldFVpbnQ4OiBmdW5jdGlvbiBzZXRVaW50OChieXRlT2Zmc2V0LCB2YWx1ZSl7XG4gICAgICBzZXQodGhpcywgMSwgYnl0ZU9mZnNldCwgcGFja0k4LCB2YWx1ZSk7XG4gICAgfSxcbiAgICBzZXRJbnQxNjogZnVuY3Rpb24gc2V0SW50MTYoYnl0ZU9mZnNldCwgdmFsdWUgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICBzZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgcGFja0kxNiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRVaW50MTY6IGZ1bmN0aW9uIHNldFVpbnQxNihieXRlT2Zmc2V0LCB2YWx1ZSAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHNldCh0aGlzLCAyLCBieXRlT2Zmc2V0LCBwYWNrSTE2LCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9LFxuICAgIHNldEludDMyOiBmdW5jdGlvbiBzZXRJbnQzMihieXRlT2Zmc2V0LCB2YWx1ZSAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHNldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBwYWNrSTMyLCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9LFxuICAgIHNldFVpbnQzMjogZnVuY3Rpb24gc2V0VWludDMyKGJ5dGVPZmZzZXQsIHZhbHVlIC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgc2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIHBhY2tJMzIsIHZhbHVlLCBhcmd1bWVudHNbMl0pO1xuICAgIH0sXG4gICAgc2V0RmxvYXQzMjogZnVuY3Rpb24gc2V0RmxvYXQzMihieXRlT2Zmc2V0LCB2YWx1ZSAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHNldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBwYWNrRjMyLCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9LFxuICAgIHNldEZsb2F0NjQ6IGZ1bmN0aW9uIHNldEZsb2F0NjQoYnl0ZU9mZnNldCwgdmFsdWUgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICBzZXQodGhpcywgOCwgYnl0ZU9mZnNldCwgcGFja0Y2NCwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIGlmKCFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyAkQXJyYXlCdWZmZXI7ICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICB9KSB8fCAhZmFpbHMoZnVuY3Rpb24oKXtcbiAgICBuZXcgJEFycmF5QnVmZmVyKC41KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgfSkpe1xuICAgICRBcnJheUJ1ZmZlciA9IGZ1bmN0aW9uIEFycmF5QnVmZmVyKGxlbmd0aCl7XG4gICAgICByZXR1cm4gbmV3IEJhc2VCdWZmZXIodmFsaWRhdGVBcnJheUJ1ZmZlckFyZ3VtZW50cyh0aGlzLCBsZW5ndGgpKTtcbiAgICB9O1xuICAgIHZhciBBcnJheUJ1ZmZlclByb3RvID0gJEFycmF5QnVmZmVyW1BST1RPVFlQRV0gPSBCYXNlQnVmZmVyW1BST1RPVFlQRV07XG4gICAgZm9yKHZhciBrZXlzID0gZ09QTihCYXNlQnVmZmVyKSwgaiA9IDAsIGtleTsga2V5cy5sZW5ndGggPiBqOyApe1xuICAgICAgaWYoISgoa2V5ID0ga2V5c1tqKytdKSBpbiAkQXJyYXlCdWZmZXIpKWhpZGUoJEFycmF5QnVmZmVyLCBrZXksIEJhc2VCdWZmZXJba2V5XSk7XG4gICAgfTtcbiAgICBpZighTElCUkFSWSlBcnJheUJ1ZmZlclByb3RvLmNvbnN0cnVjdG9yID0gJEFycmF5QnVmZmVyO1xuICB9XG4gIC8vIGlPUyBTYWZhcmkgNy54IGJ1Z1xuICB2YXIgdmlldyA9IG5ldyAkRGF0YVZpZXcobmV3ICRBcnJheUJ1ZmZlcigyKSlcbiAgICAsICRzZXRJbnQ4ID0gJERhdGFWaWV3W1BST1RPVFlQRV0uc2V0SW50ODtcbiAgdmlldy5zZXRJbnQ4KDAsIDIxNDc0ODM2NDgpO1xuICB2aWV3LnNldEludDgoMSwgMjE0NzQ4MzY0OSk7XG4gIGlmKHZpZXcuZ2V0SW50OCgwKSB8fCAhdmlldy5nZXRJbnQ4KDEpKXJlZGVmaW5lQWxsKCREYXRhVmlld1tQUk9UT1RZUEVdLCB7XG4gICAgc2V0SW50ODogZnVuY3Rpb24gc2V0SW50OChieXRlT2Zmc2V0LCB2YWx1ZSl7XG4gICAgICAkc2V0SW50OC5jYWxsKHRoaXMsIGJ5dGVPZmZzZXQsIHZhbHVlIDw8IDI0ID4+IDI0KTtcbiAgICB9LFxuICAgIHNldFVpbnQ4OiBmdW5jdGlvbiBzZXRVaW50OChieXRlT2Zmc2V0LCB2YWx1ZSl7XG4gICAgICAkc2V0SW50OC5jYWxsKHRoaXMsIGJ5dGVPZmZzZXQsIHZhbHVlIDw8IDI0ID4+IDI0KTtcbiAgICB9XG4gIH0sIHRydWUpO1xufVxuc2V0VG9TdHJpbmdUYWcoJEFycmF5QnVmZmVyLCBBUlJBWV9CVUZGRVIpO1xuc2V0VG9TdHJpbmdUYWcoJERhdGFWaWV3LCBEQVRBX1ZJRVcpO1xuaGlkZSgkRGF0YVZpZXdbUFJPVE9UWVBFXSwgJHR5cGVkLlZJRVcsIHRydWUpO1xuZXhwb3J0c1tBUlJBWV9CVUZGRVJdID0gJEFycmF5QnVmZmVyO1xuZXhwb3J0c1tEQVRBX1ZJRVddID0gJERhdGFWaWV3OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgVFlQRUQgID0gdWlkKCd0eXBlZF9hcnJheScpXG4gICwgVklFVyAgID0gdWlkKCd2aWV3JylcbiAgLCBBQlYgICAgPSAhIShnbG9iYWwuQXJyYXlCdWZmZXIgJiYgZ2xvYmFsLkRhdGFWaWV3KVxuICAsIENPTlNUUiA9IEFCVlxuICAsIGkgPSAwLCBsID0gOSwgVHlwZWQ7XG5cbnZhciBUeXBlZEFycmF5Q29uc3RydWN0b3JzID0gKFxuICAnSW50OEFycmF5LFVpbnQ4QXJyYXksVWludDhDbGFtcGVkQXJyYXksSW50MTZBcnJheSxVaW50MTZBcnJheSxJbnQzMkFycmF5LFVpbnQzMkFycmF5LEZsb2F0MzJBcnJheSxGbG9hdDY0QXJyYXknXG4pLnNwbGl0KCcsJyk7XG5cbndoaWxlKGkgPCBsKXtcbiAgaWYoVHlwZWQgPSBnbG9iYWxbVHlwZWRBcnJheUNvbnN0cnVjdG9yc1tpKytdXSl7XG4gICAgaGlkZShUeXBlZC5wcm90b3R5cGUsIFRZUEVELCB0cnVlKTtcbiAgICBoaWRlKFR5cGVkLnByb3RvdHlwZSwgVklFVywgdHJ1ZSk7XG4gIH0gZWxzZSBDT05TVFIgPSBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEFCVjogICAgQUJWLFxuICBDT05TVFI6IENPTlNUUixcbiAgVFlQRUQ6ICBUWVBFRCxcbiAgVklFVzogICBWSUVXXG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXHJcbiAgLCBjb3JlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxyXG4gICwgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcclxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXHJcbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcclxuICBpZihuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKWRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHt2YWx1ZTogd2tzRXh0LmYobmFtZSl9KTtcclxufTsiLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTsiLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmlzSXRlcmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2JlbmphbWluZ3IvUmV4RXhwLmVzY2FwZVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRyZSAgICAgPSByZXF1aXJlKCcuL19yZXBsYWNlcicpKC9bXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZ0V4cCcsIHtlc2NhcGU6IGZ1bmN0aW9uIGVzY2FwZShpdCl7IHJldHVybiAkcmUoaXQpOyB9fSk7XG4iLCIvLyAyMi4xLjMuMyBBcnJheS5wcm90b3R5cGUuY29weVdpdGhpbih0YXJnZXQsIHN0YXJ0LCBlbmQgPSB0aGlzLmxlbmd0aClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnQXJyYXknLCB7Y29weVdpdGhpbjogcmVxdWlyZSgnLi9fYXJyYXktY29weS13aXRoaW4nKX0pO1xuXG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKSgnY29weVdpdGhpbicpOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgJGV2ZXJ5ICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSg0KTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5ldmVyeSwgdHJ1ZSksICdBcnJheScsIHtcclxuICAvLyAyMi4xLjMuNSAvIDE1LjQuNC4xNiBBcnJheS5wcm90b3R5cGUuZXZlcnkoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcclxuICBldmVyeTogZnVuY3Rpb24gZXZlcnkoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pe1xyXG4gICAgcmV0dXJuICRldmVyeSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xyXG4gIH1cclxufSk7IiwiLy8gMjIuMS4zLjYgQXJyYXkucHJvdG90eXBlLmZpbGwodmFsdWUsIHN0YXJ0ID0gMCwgZW5kID0gdGhpcy5sZW5ndGgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5Jywge2ZpbGw6IHJlcXVpcmUoJy4vX2FycmF5LWZpbGwnKX0pO1xuXG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKSgnZmlsbCcpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkZmlsdGVyID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDIpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10uZmlsdGVyLCB0cnVlKSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuNyAvIDE1LjQuNC4yMCBBcnJheS5wcm90b3R5cGUuZmlsdGVyKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKXtcbiAgICByZXR1cm4gJGZpbHRlcih0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyAyMi4xLjMuOSBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4KHByZWRpY2F0ZSwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkZmluZCAgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDYpXG4gICwgS0VZICAgICA9ICdmaW5kSW5kZXgnXG4gICwgZm9yY2VkICA9IHRydWU7XG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYoS0VZIGluIFtdKUFycmF5KDEpW0tFWV0oZnVuY3Rpb24oKXsgZm9yY2VkID0gZmFsc2U7IH0pO1xuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiBmb3JjZWQsICdBcnJheScsIHtcbiAgZmluZEluZGV4OiBmdW5jdGlvbiBmaW5kSW5kZXgoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZpbmQodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbnJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpKEtFWSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjIuMS4zLjggQXJyYXkucHJvdG90eXBlLmZpbmQocHJlZGljYXRlLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRmaW5kICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoNSlcbiAgLCBLRVkgICAgID0gJ2ZpbmQnXG4gICwgZm9yY2VkICA9IHRydWU7XG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYoS0VZIGluIFtdKUFycmF5KDEpW0tFWV0oZnVuY3Rpb24oKXsgZm9yY2VkID0gZmFsc2U7IH0pO1xuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiBmb3JjZWQsICdBcnJheScsIHtcbiAgZmluZDogZnVuY3Rpb24gZmluZChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xucmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJykoS0VZKTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCAkZm9yRWFjaCA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgwKVxyXG4gICwgU1RSSUNUICAgPSByZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10uZm9yRWFjaCwgdHJ1ZSk7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFTVFJJQ1QsICdBcnJheScsIHtcclxuICAvLyAyMi4xLjMuMTAgLyAxNS40LjQuMTggQXJyYXkucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcclxuICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKXtcclxuICAgIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIGNhbGwgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIHRvTGVuZ3RoICAgICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpXG4gICwgZ2V0SXRlckZuICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3QoYXJyYXlMaWtlKVxuICAgICAgLCBDICAgICAgID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheVxuICAgICAgLCBhTGVuICAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYobWFwcGluZyltYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCAkaW5kZXhPZiAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcclxuICAsICRuYXRpdmUgICAgICAgPSBbXS5pbmRleE9mXHJcbiAgLCBORUdBVElWRV9aRVJPID0gISEkbmF0aXZlICYmIDEgLyBbMV0uaW5kZXhPZigxLCAtMCkgPCAwO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoTkVHQVRJVkVfWkVSTyB8fCAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKCRuYXRpdmUpKSwgJ0FycmF5Jywge1xyXG4gIC8vIDIyLjEuMy4xMSAvIDE1LjQuNC4xNCBBcnJheS5wcm90b3R5cGUuaW5kZXhPZihzZWFyY2hFbGVtZW50IFssIGZyb21JbmRleF0pXHJcbiAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qLCBmcm9tSW5kZXggPSAwICovKXtcclxuICAgIHJldHVybiBORUdBVElWRV9aRVJPXHJcbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcclxuICAgICAgPyAkbmF0aXZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgMFxyXG4gICAgICA6ICRpbmRleE9mKHRoaXMsIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50c1sxXSk7XHJcbiAgfVxyXG59KTsiLCIvLyAyMi4xLjIuMiAvIDE1LjQuMy4yIEFycmF5LmlzQXJyYXkoYXJnKVxyXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlMsICdBcnJheScsIHtpc0FycmF5OiByZXF1aXJlKCcuL19pcy1hcnJheScpfSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTsiLCIndXNlIHN0cmljdCc7XHJcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUuam9pbihzZXBhcmF0b3IpXHJcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXHJcbiAgLCBhcnJheUpvaW4gPSBbXS5qb2luO1xyXG5cclxuLy8gZmFsbGJhY2sgZm9yIG5vdCBhcnJheS1saWtlIHN0cmluZ3NcclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAocmVxdWlyZSgnLi9faW9iamVjdCcpICE9IE9iamVjdCB8fCAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKGFycmF5Sm9pbikpLCAnQXJyYXknLCB7XHJcbiAgam9pbjogZnVuY3Rpb24gam9pbihzZXBhcmF0b3Ipe1xyXG4gICAgcmV0dXJuIGFycmF5Sm9pbi5jYWxsKHRvSU9iamVjdCh0aGlzKSwgc2VwYXJhdG9yID09PSB1bmRlZmluZWQgPyAnLCcgOiBzZXBhcmF0b3IpO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCB0b0lPYmplY3QgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXHJcbiAgLCB0b0ludGVnZXIgICAgID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXHJcbiAgLCB0b0xlbmd0aCAgICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcclxuICAsICRuYXRpdmUgICAgICAgPSBbXS5sYXN0SW5kZXhPZlxyXG4gICwgTkVHQVRJVkVfWkVSTyA9ICEhJG5hdGl2ZSAmJiAxIC8gWzFdLmxhc3RJbmRleE9mKDEsIC0wKSA8IDA7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChORUdBVElWRV9aRVJPIHx8ICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoJG5hdGl2ZSkpLCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4zLjE0IC8gMTUuNC40LjE1IEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZihzZWFyY2hFbGVtZW50IFssIGZyb21JbmRleF0pXHJcbiAgbGFzdEluZGV4T2Y6IGZ1bmN0aW9uIGxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgLyosIGZyb21JbmRleCA9IEBbKi0xXSAqLyl7XHJcbiAgICAvLyBjb252ZXJ0IC0wIHRvICswXHJcbiAgICBpZihORUdBVElWRV9aRVJPKXJldHVybiAkbmF0aXZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgMDtcclxuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QodGhpcylcclxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcclxuICAgICAgLCBpbmRleCAgPSBsZW5ndGggLSAxO1xyXG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpaW5kZXggPSBNYXRoLm1pbihpbmRleCwgdG9JbnRlZ2VyKGFyZ3VtZW50c1sxXSkpO1xyXG4gICAgaWYoaW5kZXggPCAwKWluZGV4ID0gbGVuZ3RoICsgaW5kZXg7XHJcbiAgICBmb3IoO2luZGV4ID49IDA7IGluZGV4LS0paWYoaW5kZXggaW4gTylpZihPW2luZGV4XSA9PT0gc2VhcmNoRWxlbWVudClyZXR1cm4gaW5kZXggfHwgMDtcclxuICAgIHJldHVybiAtMTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgJG1hcCAgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgxKTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5tYXAsIHRydWUpLCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4zLjE1IC8gMTUuNC40LjE5IEFycmF5LnByb3RvdHlwZS5tYXAoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcclxuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLyl7XHJcbiAgICByZXR1cm4gJG1hcCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xuXG4vLyBXZWJLaXQgQXJyYXkub2YgaXNuJ3QgZ2VuZXJpY1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIGZ1bmN0aW9uIEYoKXt9XG4gIHJldHVybiAhKEFycmF5Lm9mLmNhbGwoRikgaW5zdGFuY2VvZiBGKTtcbn0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4zIEFycmF5Lm9mKCAuLi5pdGVtcylcbiAgb2Y6IGZ1bmN0aW9uIG9mKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHZhciBpbmRleCAgPSAwXG4gICAgICAsIGFMZW4gICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgcmVzdWx0ID0gbmV3ICh0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5KShhTGVuKTtcbiAgICB3aGlsZShhTGVuID4gaW5kZXgpY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICByZXN1bHQubGVuZ3RoID0gYUxlbjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsICRyZWR1Y2UgPSByZXF1aXJlKCcuL19hcnJheS1yZWR1Y2UnKTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5yZWR1Y2VSaWdodCwgdHJ1ZSksICdBcnJheScsIHtcclxuICAvLyAyMi4xLjMuMTkgLyAxNS40LjQuMjIgQXJyYXkucHJvdG90eXBlLnJlZHVjZVJpZ2h0KGNhbGxiYWNrZm4gWywgaW5pdGlhbFZhbHVlXSlcclxuICByZWR1Y2VSaWdodDogZnVuY3Rpb24gcmVkdWNlUmlnaHQoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLyl7XHJcbiAgICByZXR1cm4gJHJlZHVjZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoLCBhcmd1bWVudHNbMV0sIHRydWUpO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCAkcmVkdWNlID0gcmVxdWlyZSgnLi9fYXJyYXktcmVkdWNlJyk7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10ucmVkdWNlLCB0cnVlKSwgJ0FycmF5Jywge1xyXG4gIC8vIDIyLjEuMy4xOCAvIDE1LjQuNC4yMSBBcnJheS5wcm90b3R5cGUucmVkdWNlKGNhbGxiYWNrZm4gWywgaW5pdGlhbFZhbHVlXSlcclxuICByZWR1Y2U6IGZ1bmN0aW9uIHJlZHVjZShjYWxsYmFja2ZuIC8qICwgaW5pdGlhbFZhbHVlICovKXtcclxuICAgIHJldHVybiAkcmVkdWNlKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3VtZW50c1sxXSwgZmFsc2UpO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCBodG1sICAgICAgID0gcmVxdWlyZSgnLi9faHRtbCcpXHJcbiAgLCBjb2YgICAgICAgID0gcmVxdWlyZSgnLi9fY29mJylcclxuICAsIHRvSW5kZXggICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpXHJcbiAgLCB0b0xlbmd0aCAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcclxuICAsIGFycmF5U2xpY2UgPSBbXS5zbGljZTtcclxuXHJcbi8vIGZhbGxiYWNrIGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5ncyBhbmQgRE9NIG9iamVjdHNcclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XHJcbiAgaWYoaHRtbClhcnJheVNsaWNlLmNhbGwoaHRtbCk7XHJcbn0pLCAnQXJyYXknLCB7XHJcbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKGJlZ2luLCBlbmQpe1xyXG4gICAgdmFyIGxlbiAgID0gdG9MZW5ndGgodGhpcy5sZW5ndGgpXHJcbiAgICAgICwga2xhc3MgPSBjb2YodGhpcyk7XHJcbiAgICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IGVuZDtcclxuICAgIGlmKGtsYXNzID09ICdBcnJheScpcmV0dXJuIGFycmF5U2xpY2UuY2FsbCh0aGlzLCBiZWdpbiwgZW5kKTtcclxuICAgIHZhciBzdGFydCAgPSB0b0luZGV4KGJlZ2luLCBsZW4pXHJcbiAgICAgICwgdXBUbyAgID0gdG9JbmRleChlbmQsIGxlbilcclxuICAgICAgLCBzaXplICAgPSB0b0xlbmd0aCh1cFRvIC0gc3RhcnQpXHJcbiAgICAgICwgY2xvbmVkID0gQXJyYXkoc2l6ZSlcclxuICAgICAgLCBpICAgICAgPSAwO1xyXG4gICAgZm9yKDsgaSA8IHNpemU7IGkrKyljbG9uZWRbaV0gPSBrbGFzcyA9PSAnU3RyaW5nJ1xyXG4gICAgICA/IHRoaXMuY2hhckF0KHN0YXJ0ICsgaSlcclxuICAgICAgOiB0aGlzW3N0YXJ0ICsgaV07XHJcbiAgICByZXR1cm4gY2xvbmVkO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCAkc29tZSAgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDMpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLnNvbWUsIHRydWUpLCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4zLjIzIC8gMTUuNC40LjE3IEFycmF5LnByb3RvdHlwZS5zb21lKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXHJcbiAgc29tZTogZnVuY3Rpb24gc29tZShjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLyl7XHJcbiAgICByZXR1cm4gJHNvbWUodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcclxuICAsIHRvT2JqZWN0ICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXHJcbiAgLCBmYWlscyAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXHJcbiAgLCAkc29ydCAgICAgPSBbXS5zb3J0XHJcbiAgLCB0ZXN0ICAgICAgPSBbMSwgMiwgM107XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChmYWlscyhmdW5jdGlvbigpe1xyXG4gIC8vIElFOC1cclxuICB0ZXN0LnNvcnQodW5kZWZpbmVkKTtcclxufSkgfHwgIWZhaWxzKGZ1bmN0aW9uKCl7XHJcbiAgLy8gVjggYnVnXHJcbiAgdGVzdC5zb3J0KG51bGwpO1xyXG4gIC8vIE9sZCBXZWJLaXRcclxufSkgfHwgIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKSgkc29ydCkpLCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4zLjI1IEFycmF5LnByb3RvdHlwZS5zb3J0KGNvbXBhcmVmbilcclxuICBzb3J0OiBmdW5jdGlvbiBzb3J0KGNvbXBhcmVmbil7XHJcbiAgICByZXR1cm4gY29tcGFyZWZuID09PSB1bmRlZmluZWRcclxuICAgICAgPyAkc29ydC5jYWxsKHRvT2JqZWN0KHRoaXMpKVxyXG4gICAgICA6ICRzb3J0LmNhbGwodG9PYmplY3QodGhpcyksIGFGdW5jdGlvbihjb21wYXJlZm4pKTtcclxuICB9XHJcbn0pOyIsInJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoJ0FycmF5Jyk7IiwiLy8gMjAuMy4zLjEgLyAxNS45LjQuNCBEYXRlLm5vdygpXHJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUywgJ0RhdGUnLCB7bm93OiBmdW5jdGlvbigpeyByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7IH19KTsiLCIndXNlIHN0cmljdCc7XHJcbi8vIDIwLjMuNC4zNiAvIDE1LjkuNS40MyBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZygpXHJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpXHJcbiAgLCBnZXRUaW1lID0gRGF0ZS5wcm90b3R5cGUuZ2V0VGltZTtcclxuXHJcbnZhciBseiA9IGZ1bmN0aW9uKG51bSl7XHJcbiAgcmV0dXJuIG51bSA+IDkgPyBudW0gOiAnMCcgKyBudW07XHJcbn07XHJcblxyXG4vLyBQaGFudG9tSlMgLyBvbGQgV2ViS2l0IGhhcyBhIGJyb2tlbiBpbXBsZW1lbnRhdGlvbnNcclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoZmFpbHMoZnVuY3Rpb24oKXtcclxuICByZXR1cm4gbmV3IERhdGUoLTVlMTMgLSAxKS50b0lTT1N0cmluZygpICE9ICcwMzg1LTA3LTI1VDA3OjA2OjM5Ljk5OVonO1xyXG59KSB8fCAhZmFpbHMoZnVuY3Rpb24oKXtcclxuICBuZXcgRGF0ZShOYU4pLnRvSVNPU3RyaW5nKCk7XHJcbn0pKSwgJ0RhdGUnLCB7XHJcbiAgdG9JU09TdHJpbmc6IGZ1bmN0aW9uIHRvSVNPU3RyaW5nKCl7XHJcbiAgICBpZighaXNGaW5pdGUoZ2V0VGltZS5jYWxsKHRoaXMpKSl0aHJvdyBSYW5nZUVycm9yKCdJbnZhbGlkIHRpbWUgdmFsdWUnKTtcclxuICAgIHZhciBkID0gdGhpc1xyXG4gICAgICAsIHkgPSBkLmdldFVUQ0Z1bGxZZWFyKClcclxuICAgICAgLCBtID0gZC5nZXRVVENNaWxsaXNlY29uZHMoKVxyXG4gICAgICAsIHMgPSB5IDwgMCA/ICctJyA6IHkgPiA5OTk5ID8gJysnIDogJyc7XHJcbiAgICByZXR1cm4gcyArICgnMDAwMDAnICsgTWF0aC5hYnMoeSkpLnNsaWNlKHMgPyAtNiA6IC00KSArXHJcbiAgICAgICctJyArIGx6KGQuZ2V0VVRDTW9udGgoKSArIDEpICsgJy0nICsgbHooZC5nZXRVVENEYXRlKCkpICtcclxuICAgICAgJ1QnICsgbHooZC5nZXRVVENIb3VycygpKSArICc6JyArIGx6KGQuZ2V0VVRDTWludXRlcygpKSArXHJcbiAgICAgICc6JyArIGx6KGQuZ2V0VVRDU2Vjb25kcygpKSArICcuJyArIChtID4gOTkgPyBtIDogJzAnICsgbHoobSkpICsgJ1onO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBuZXcgRGF0ZShOYU4pLnRvSlNPTigpICE9PSBudWxsIHx8IERhdGUucHJvdG90eXBlLnRvSlNPTi5jYWxsKHt0b0lTT1N0cmluZzogZnVuY3Rpb24oKXsgcmV0dXJuIDE7IH19KSAhPT0gMTtcbn0pLCAnRGF0ZScsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oa2V5KXtcbiAgICB2YXIgTyAgPSB0b09iamVjdCh0aGlzKVxuICAgICAgLCBwdiA9IHRvUHJpbWl0aXZlKE8pO1xuICAgIHJldHVybiB0eXBlb2YgcHYgPT0gJ251bWJlcicgJiYgIWlzRmluaXRlKHB2KSA/IG51bGwgOiBPLnRvSVNPU3RyaW5nKCk7XG4gIH1cbn0pOyIsInZhciBUT19QUklNSVRJVkUgPSByZXF1aXJlKCcuL193a3MnKSgndG9QcmltaXRpdmUnKVxyXG4gICwgcHJvdG8gICAgICAgID0gRGF0ZS5wcm90b3R5cGU7XHJcblxyXG5pZighKFRPX1BSSU1JVElWRSBpbiBwcm90bykpcmVxdWlyZSgnLi9faGlkZScpKHByb3RvLCBUT19QUklNSVRJVkUsIHJlcXVpcmUoJy4vX2RhdGUtdG8tcHJpbWl0aXZlJykpOyIsInZhciBEYXRlUHJvdG8gICAgPSBEYXRlLnByb3RvdHlwZVxuICAsIElOVkFMSURfREFURSA9ICdJbnZhbGlkIERhdGUnXG4gICwgVE9fU1RSSU5HICAgID0gJ3RvU3RyaW5nJ1xuICAsICR0b1N0cmluZyAgICA9IERhdGVQcm90b1tUT19TVFJJTkddXG4gICwgZ2V0VGltZSAgICAgID0gRGF0ZVByb3RvLmdldFRpbWU7XG5pZihuZXcgRGF0ZShOYU4pICsgJycgIT0gSU5WQUxJRF9EQVRFKXtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShEYXRlUHJvdG8sIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICB2YXIgdmFsdWUgPSBnZXRUaW1lLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/ICR0b1N0cmluZy5jYWxsKHRoaXMpIDogSU5WQUxJRF9EQVRFO1xuICB9KTtcbn0iLCIvLyAxOS4yLjMuMiAvIDE1LjMuNC41IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKHRoaXNBcmcsIGFyZ3MuLi4pXHJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0Z1bmN0aW9uJywge2JpbmQ6IHJlcXVpcmUoJy4vX2JpbmQnKX0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBIQVNfSU5TVEFOQ0UgICA9IHJlcXVpcmUoJy4vX3drcycpKCdoYXNJbnN0YW5jZScpXG4gICwgRnVuY3Rpb25Qcm90byAgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4vLyAxOS4yLjMuNiBGdW5jdGlvbi5wcm90b3R5cGVbQEBoYXNJbnN0YW5jZV0oVilcbmlmKCEoSEFTX0lOU1RBTkNFIGluIEZ1bmN0aW9uUHJvdG8pKXJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYoRnVuY3Rpb25Qcm90bywgSEFTX0lOU1RBTkNFLCB7dmFsdWU6IGZ1bmN0aW9uKE8pe1xuICBpZih0eXBlb2YgdGhpcyAhPSAnZnVuY3Rpb24nIHx8ICFpc09iamVjdChPKSlyZXR1cm4gZmFsc2U7XG4gIGlmKCFpc09iamVjdCh0aGlzLnByb3RvdHlwZSkpcmV0dXJuIE8gaW5zdGFuY2VvZiB0aGlzO1xuICAvLyBmb3IgZW52aXJvbm1lbnQgdy9vIG5hdGl2ZSBgQEBoYXNJbnN0YW5jZWAgbG9naWMgZW5vdWdoIGBpbnN0YW5jZW9mYCwgYnV0IGFkZCB0aGlzOlxuICB3aGlsZShPID0gZ2V0UHJvdG90eXBlT2YoTykpaWYodGhpcy5wcm90b3R5cGUgPT09IE8pcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn19KTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgaGFzICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgRlByb3RvICAgICA9IEZ1bmN0aW9uLnByb3RvdHlwZVxuICAsIG5hbWVSRSAgICAgPSAvXlxccypmdW5jdGlvbiAoW14gKF0qKS9cbiAgLCBOQU1FICAgICAgID0gJ25hbWUnO1xuXG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbigpe1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIDE5LjIuNC4yIG5hbWVcbk5BTUUgaW4gRlByb3RvIHx8IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgZFAoRlByb3RvLCBOQU1FLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpe1xuICAgIHRyeSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgLCBuYW1lID0gKCcnICsgdGhhdCkubWF0Y2gobmFtZVJFKVsxXTtcbiAgICAgIGhhcyh0aGF0LCBOQU1FKSB8fCAhaXNFeHRlbnNpYmxlKHRoYXQpIHx8IGRQKHRoYXQsIE5BTUUsIGNyZWF0ZURlc2MoNSwgbmFtZSkpO1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciBzdHJvbmcgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXN0cm9uZycpO1xuXG4vLyAyMy4xIE1hcCBPYmplY3RzXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24nKSgnTWFwJywgZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIE1hcCgpeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuMS4zLjYgTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpe1xuICAgIHZhciBlbnRyeSA9IHN0cm9uZy5nZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS52O1xuICB9LFxuICAvLyAyMy4xLjMuOSBNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gc3Ryb25nLmRlZih0aGlzLCBrZXkgPT09IDAgPyAwIDoga2V5LCB2YWx1ZSk7XG4gIH1cbn0sIHN0cm9uZywgdHJ1ZSk7IiwiLy8gMjAuMi4yLjMgTWF0aC5hY29zaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGxvZzFwICAgPSByZXF1aXJlKCcuL19tYXRoLWxvZzFwJylcbiAgLCBzcXJ0ICAgID0gTWF0aC5zcXJ0XG4gICwgJGFjb3NoICA9IE1hdGguYWNvc2g7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISgkYWNvc2hcbiAgLy8gVjggYnVnOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzUwOVxuICAmJiBNYXRoLmZsb29yKCRhY29zaChOdW1iZXIuTUFYX1ZBTFVFKSkgPT0gNzEwXG4gIC8vIFRvciBCcm93c2VyIGJ1ZzogTWF0aC5hY29zaChJbmZpbml0eSkgLT4gTmFOIFxuICAmJiAkYWNvc2goSW5maW5pdHkpID09IEluZmluaXR5XG4pLCAnTWF0aCcsIHtcbiAgYWNvc2g6IGZ1bmN0aW9uIGFjb3NoKHgpe1xuICAgIHJldHVybiAoeCA9ICt4KSA8IDEgPyBOYU4gOiB4ID4gOTQ5MDYyNjUuNjI0MjUxNTZcbiAgICAgID8gTWF0aC5sb2coeCkgKyBNYXRoLkxOMlxuICAgICAgOiBsb2cxcCh4IC0gMSArIHNxcnQoeCAtIDEpICogc3FydCh4ICsgMSkpO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuNSBNYXRoLmFzaW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGFzaW5oICA9IE1hdGguYXNpbmg7XG5cbmZ1bmN0aW9uIGFzaW5oKHgpe1xuICByZXR1cm4gIWlzRmluaXRlKHggPSAreCkgfHwgeCA9PSAwID8geCA6IHggPCAwID8gLWFzaW5oKC14KSA6IE1hdGgubG9nKHggKyBNYXRoLnNxcnQoeCAqIHggKyAxKSk7XG59XG5cbi8vIFRvciBCcm93c2VyIGJ1ZzogTWF0aC5hc2luaCgwKSAtPiAtMCBcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISgkYXNpbmggJiYgMSAvICRhc2luaCgwKSA+IDApLCAnTWF0aCcsIHthc2luaDogYXNpbmh9KTsiLCIvLyAyMC4yLjIuNyBNYXRoLmF0YW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGF0YW5oICA9IE1hdGguYXRhbmg7XG5cbi8vIFRvciBCcm93c2VyIGJ1ZzogTWF0aC5hdGFuaCgtMCkgLT4gMCBcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISgkYXRhbmggJiYgMSAvICRhdGFuaCgtMCkgPCAwKSwgJ01hdGgnLCB7XG4gIGF0YW5oOiBmdW5jdGlvbiBhdGFuaCh4KXtcbiAgICByZXR1cm4gKHggPSAreCkgPT0gMCA/IHggOiBNYXRoLmxvZygoMSArIHgpIC8gKDEgLSB4KSkgLyAyO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuOSBNYXRoLmNicnQoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBzaWduICAgID0gcmVxdWlyZSgnLi9fbWF0aC1zaWduJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgY2JydDogZnVuY3Rpb24gY2JydCh4KXtcbiAgICByZXR1cm4gc2lnbih4ID0gK3gpICogTWF0aC5wb3coTWF0aC5hYnMoeCksIDEgLyAzKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjExIE1hdGguY2x6MzIoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgY2x6MzI6IGZ1bmN0aW9uIGNsejMyKHgpe1xuICAgIHJldHVybiAoeCA+Pj49IDApID8gMzEgLSBNYXRoLmZsb29yKE1hdGgubG9nKHggKyAwLjUpICogTWF0aC5MT0cyRSkgOiAzMjtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjEyIE1hdGguY29zaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGV4cCAgICAgPSBNYXRoLmV4cDtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBjb3NoOiBmdW5jdGlvbiBjb3NoKHgpe1xuICAgIHJldHVybiAoZXhwKHggPSAreCkgKyBleHAoLXgpKSAvIDI7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xNCBNYXRoLmV4cG0xKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGV4cG0xICA9IHJlcXVpcmUoJy4vX21hdGgtZXhwbTEnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoJGV4cG0xICE9IE1hdGguZXhwbTEpLCAnTWF0aCcsIHtleHBtMTogJGV4cG0xfSk7IiwiLy8gMjAuMi4yLjE2IE1hdGguZnJvdW5kKHgpXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBzaWduICAgICAgPSByZXF1aXJlKCcuL19tYXRoLXNpZ24nKVxuICAsIHBvdyAgICAgICA9IE1hdGgucG93XG4gICwgRVBTSUxPTiAgID0gcG93KDIsIC01MilcbiAgLCBFUFNJTE9OMzIgPSBwb3coMiwgLTIzKVxuICAsIE1BWDMyICAgICA9IHBvdygyLCAxMjcpICogKDIgLSBFUFNJTE9OMzIpXG4gICwgTUlOMzIgICAgID0gcG93KDIsIC0xMjYpO1xuXG52YXIgcm91bmRUaWVzVG9FdmVuID0gZnVuY3Rpb24obil7XG4gIHJldHVybiBuICsgMSAvIEVQU0lMT04gLSAxIC8gRVBTSUxPTjtcbn07XG5cblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBmcm91bmQ6IGZ1bmN0aW9uIGZyb3VuZCh4KXtcbiAgICB2YXIgJGFicyAgPSBNYXRoLmFicyh4KVxuICAgICAgLCAkc2lnbiA9IHNpZ24oeClcbiAgICAgICwgYSwgcmVzdWx0O1xuICAgIGlmKCRhYnMgPCBNSU4zMilyZXR1cm4gJHNpZ24gKiByb3VuZFRpZXNUb0V2ZW4oJGFicyAvIE1JTjMyIC8gRVBTSUxPTjMyKSAqIE1JTjMyICogRVBTSUxPTjMyO1xuICAgIGEgPSAoMSArIEVQU0lMT04zMiAvIEVQU0lMT04pICogJGFicztcbiAgICByZXN1bHQgPSBhIC0gKGEgLSAkYWJzKTtcbiAgICBpZihyZXN1bHQgPiBNQVgzMiB8fCByZXN1bHQgIT0gcmVzdWx0KXJldHVybiAkc2lnbiAqIEluZmluaXR5O1xuICAgIHJldHVybiAkc2lnbiAqIHJlc3VsdDtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjE3IE1hdGguaHlwb3QoW3ZhbHVlMVssIHZhbHVlMlssIOKApiBdXV0pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYWJzICAgICA9IE1hdGguYWJzO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGh5cG90OiBmdW5jdGlvbiBoeXBvdCh2YWx1ZTEsIHZhbHVlMil7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB2YXIgc3VtICA9IDBcbiAgICAgICwgaSAgICA9IDBcbiAgICAgICwgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbGFyZyA9IDBcbiAgICAgICwgYXJnLCBkaXY7XG4gICAgd2hpbGUoaSA8IGFMZW4pe1xuICAgICAgYXJnID0gYWJzKGFyZ3VtZW50c1tpKytdKTtcbiAgICAgIGlmKGxhcmcgPCBhcmcpe1xuICAgICAgICBkaXYgID0gbGFyZyAvIGFyZztcbiAgICAgICAgc3VtICA9IHN1bSAqIGRpdiAqIGRpdiArIDE7XG4gICAgICAgIGxhcmcgPSBhcmc7XG4gICAgICB9IGVsc2UgaWYoYXJnID4gMCl7XG4gICAgICAgIGRpdiAgPSBhcmcgLyBsYXJnO1xuICAgICAgICBzdW0gKz0gZGl2ICogZGl2O1xuICAgICAgfSBlbHNlIHN1bSArPSBhcmc7XG4gICAgfVxuICAgIHJldHVybiBsYXJnID09PSBJbmZpbml0eSA/IEluZmluaXR5IDogbGFyZyAqIE1hdGguc3FydChzdW0pO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMTggTWF0aC5pbXVsKHgsIHkpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGltdWwgICA9IE1hdGguaW11bDtcblxuLy8gc29tZSBXZWJLaXQgdmVyc2lvbnMgZmFpbHMgd2l0aCBiaWcgbnVtYmVycywgc29tZSBoYXMgd3JvbmcgYXJpdHlcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gJGltdWwoMHhmZmZmZmZmZiwgNSkgIT0gLTUgfHwgJGltdWwubGVuZ3RoICE9IDI7XG59KSwgJ01hdGgnLCB7XG4gIGltdWw6IGZ1bmN0aW9uIGltdWwoeCwgeSl7XG4gICAgdmFyIFVJTlQxNiA9IDB4ZmZmZlxuICAgICAgLCB4biA9ICt4XG4gICAgICAsIHluID0gK3lcbiAgICAgICwgeGwgPSBVSU5UMTYgJiB4blxuICAgICAgLCB5bCA9IFVJTlQxNiAmIHluO1xuICAgIHJldHVybiAwIHwgeGwgKiB5bCArICgoVUlOVDE2ICYgeG4gPj4+IDE2KSAqIHlsICsgeGwgKiAoVUlOVDE2ICYgeW4gPj4+IDE2KSA8PCAxNiA+Pj4gMCk7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4yMSBNYXRoLmxvZzEwKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGxvZzEwOiBmdW5jdGlvbiBsb2cxMCh4KXtcbiAgICByZXR1cm4gTWF0aC5sb2coeCkgLyBNYXRoLkxOMTA7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4yMCBNYXRoLmxvZzFwKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7bG9nMXA6IHJlcXVpcmUoJy4vX21hdGgtbG9nMXAnKX0pOyIsIi8vIDIwLjIuMi4yMiBNYXRoLmxvZzIoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgbG9nMjogZnVuY3Rpb24gbG9nMih4KXtcbiAgICByZXR1cm4gTWF0aC5sb2coeCkgLyBNYXRoLkxOMjtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjI4IE1hdGguc2lnbih4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge3NpZ246IHJlcXVpcmUoJy4vX21hdGgtc2lnbicpfSk7IiwiLy8gMjAuMi4yLjMwIE1hdGguc2luaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGV4cG0xICAgPSByZXF1aXJlKCcuL19tYXRoLWV4cG0xJylcbiAgLCBleHAgICAgID0gTWF0aC5leHA7XG5cbi8vIFY4IG5lYXIgQ2hyb21pdW0gMzggaGFzIGEgcHJvYmxlbSB3aXRoIHZlcnkgc21hbGwgbnVtYmVyc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiAhTWF0aC5zaW5oKC0yZS0xNykgIT0gLTJlLTE3O1xufSksICdNYXRoJywge1xuICBzaW5oOiBmdW5jdGlvbiBzaW5oKHgpe1xuICAgIHJldHVybiBNYXRoLmFicyh4ID0gK3gpIDwgMVxuICAgICAgPyAoZXhwbTEoeCkgLSBleHBtMSgteCkpIC8gMlxuICAgICAgOiAoZXhwKHggLSAxKSAtIGV4cCgteCAtIDEpKSAqIChNYXRoLkUgLyAyKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjMzIE1hdGgudGFuaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGV4cG0xICAgPSByZXF1aXJlKCcuL19tYXRoLWV4cG0xJylcbiAgLCBleHAgICAgID0gTWF0aC5leHA7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgdGFuaDogZnVuY3Rpb24gdGFuaCh4KXtcbiAgICB2YXIgYSA9IGV4cG0xKHggPSAreClcbiAgICAgICwgYiA9IGV4cG0xKC14KTtcbiAgICByZXR1cm4gYSA9PSBJbmZpbml0eSA/IDEgOiBiID09IEluZmluaXR5ID8gLTEgOiAoYSAtIGIpIC8gKGV4cCh4KSArIGV4cCgteCkpO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMzQgTWF0aC50cnVuYyh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICB0cnVuYzogZnVuY3Rpb24gdHJ1bmMoaXQpe1xuICAgIHJldHVybiAoaXQgPiAwID8gTWF0aC5mbG9vciA6IE1hdGguY2VpbCkoaXQpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhhcyAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBjb2YgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuL19pbmhlcml0LWlmLXJlcXVpcmVkJylcbiAgLCB0b1ByaW1pdGl2ZSAgICAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZmFpbHMgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgZ09QTiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCBnT1BEICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZlxuICAsIGRQICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsICR0cmltICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKS50cmltXG4gICwgTlVNQkVSICAgICAgICAgICAgPSAnTnVtYmVyJ1xuICAsICROdW1iZXIgICAgICAgICAgID0gZ2xvYmFsW05VTUJFUl1cbiAgLCBCYXNlICAgICAgICAgICAgICA9ICROdW1iZXJcbiAgLCBwcm90byAgICAgICAgICAgICA9ICROdW1iZXIucHJvdG90eXBlXG4gIC8vIE9wZXJhIH4xMiBoYXMgYnJva2VuIE9iamVjdCN0b1N0cmluZ1xuICAsIEJST0tFTl9DT0YgICAgICAgID0gY29mKHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKShwcm90bykpID09IE5VTUJFUlxuICAsIFRSSU0gICAgICAgICAgICAgID0gJ3RyaW0nIGluIFN0cmluZy5wcm90b3R5cGU7XG5cbi8vIDcuMS4zIFRvTnVtYmVyKGFyZ3VtZW50KVxudmFyIHRvTnVtYmVyID0gZnVuY3Rpb24oYXJndW1lbnQpe1xuICB2YXIgaXQgPSB0b1ByaW1pdGl2ZShhcmd1bWVudCwgZmFsc2UpO1xuICBpZih0eXBlb2YgaXQgPT0gJ3N0cmluZycgJiYgaXQubGVuZ3RoID4gMil7XG4gICAgaXQgPSBUUklNID8gaXQudHJpbSgpIDogJHRyaW0oaXQsIDMpO1xuICAgIHZhciBmaXJzdCA9IGl0LmNoYXJDb2RlQXQoMClcbiAgICAgICwgdGhpcmQsIHJhZGl4LCBtYXhDb2RlO1xuICAgIGlmKGZpcnN0ID09PSA0MyB8fCBmaXJzdCA9PT0gNDUpe1xuICAgICAgdGhpcmQgPSBpdC5jaGFyQ29kZUF0KDIpO1xuICAgICAgaWYodGhpcmQgPT09IDg4IHx8IHRoaXJkID09PSAxMjApcmV0dXJuIE5hTjsgLy8gTnVtYmVyKCcrMHgxJykgc2hvdWxkIGJlIE5hTiwgb2xkIFY4IGZpeFxuICAgIH0gZWxzZSBpZihmaXJzdCA9PT0gNDgpe1xuICAgICAgc3dpdGNoKGl0LmNoYXJDb2RlQXQoMSkpe1xuICAgICAgICBjYXNlIDY2IDogY2FzZSA5OCAgOiByYWRpeCA9IDI7IG1heENvZGUgPSA0OTsgYnJlYWs7IC8vIGZhc3QgZXF1YWwgL14wYlswMV0rJC9pXG4gICAgICAgIGNhc2UgNzkgOiBjYXNlIDExMSA6IHJhZGl4ID0gODsgbWF4Q29kZSA9IDU1OyBicmVhazsgLy8gZmFzdCBlcXVhbCAvXjBvWzAtN10rJC9pXG4gICAgICAgIGRlZmF1bHQgOiByZXR1cm4gK2l0O1xuICAgICAgfVxuICAgICAgZm9yKHZhciBkaWdpdHMgPSBpdC5zbGljZSgyKSwgaSA9IDAsIGwgPSBkaWdpdHMubGVuZ3RoLCBjb2RlOyBpIDwgbDsgaSsrKXtcbiAgICAgICAgY29kZSA9IGRpZ2l0cy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAvLyBwYXJzZUludCBwYXJzZXMgYSBzdHJpbmcgdG8gYSBmaXJzdCB1bmF2YWlsYWJsZSBzeW1ib2xcbiAgICAgICAgLy8gYnV0IFRvTnVtYmVyIHNob3VsZCByZXR1cm4gTmFOIGlmIGEgc3RyaW5nIGNvbnRhaW5zIHVuYXZhaWxhYmxlIHN5bWJvbHNcbiAgICAgICAgaWYoY29kZSA8IDQ4IHx8IGNvZGUgPiBtYXhDb2RlKXJldHVybiBOYU47XG4gICAgICB9IHJldHVybiBwYXJzZUludChkaWdpdHMsIHJhZGl4KTtcbiAgICB9XG4gIH0gcmV0dXJuICtpdDtcbn07XG5cbmlmKCEkTnVtYmVyKCcgMG8xJykgfHwgISROdW1iZXIoJzBiMScpIHx8ICROdW1iZXIoJysweDEnKSl7XG4gICROdW1iZXIgPSBmdW5jdGlvbiBOdW1iZXIodmFsdWUpe1xuICAgIHZhciBpdCA9IGFyZ3VtZW50cy5sZW5ndGggPCAxID8gMCA6IHZhbHVlXG4gICAgICAsIHRoYXQgPSB0aGlzO1xuICAgIHJldHVybiB0aGF0IGluc3RhbmNlb2YgJE51bWJlclxuICAgICAgLy8gY2hlY2sgb24gMS4uY29uc3RydWN0b3IoZm9vKSBjYXNlXG4gICAgICAmJiAoQlJPS0VOX0NPRiA/IGZhaWxzKGZ1bmN0aW9uKCl7IHByb3RvLnZhbHVlT2YuY2FsbCh0aGF0KTsgfSkgOiBjb2YodGhhdCkgIT0gTlVNQkVSKVxuICAgICAgICA/IGluaGVyaXRJZlJlcXVpcmVkKG5ldyBCYXNlKHRvTnVtYmVyKGl0KSksIHRoYXQsICROdW1iZXIpIDogdG9OdW1iZXIoaXQpO1xuICB9O1xuICBmb3IodmFyIGtleXMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QTihCYXNlKSA6IChcbiAgICAvLyBFUzM6XG4gICAgJ01BWF9WQUxVRSxNSU5fVkFMVUUsTmFOLE5FR0FUSVZFX0lORklOSVRZLFBPU0lUSVZFX0lORklOSVRZLCcgK1xuICAgIC8vIEVTNiAoaW4gY2FzZSwgaWYgbW9kdWxlcyB3aXRoIEVTNiBOdW1iZXIgc3RhdGljcyByZXF1aXJlZCBiZWZvcmUpOlxuICAgICdFUFNJTE9OLGlzRmluaXRlLGlzSW50ZWdlcixpc05hTixpc1NhZmVJbnRlZ2VyLE1BWF9TQUZFX0lOVEVHRVIsJyArXG4gICAgJ01JTl9TQUZFX0lOVEVHRVIscGFyc2VGbG9hdCxwYXJzZUludCxpc0ludGVnZXInXG4gICkuc3BsaXQoJywnKSwgaiA9IDAsIGtleTsga2V5cy5sZW5ndGggPiBqOyBqKyspe1xuICAgIGlmKGhhcyhCYXNlLCBrZXkgPSBrZXlzW2pdKSAmJiAhaGFzKCROdW1iZXIsIGtleSkpe1xuICAgICAgZFAoJE51bWJlciwga2V5LCBnT1BEKEJhc2UsIGtleSkpO1xuICAgIH1cbiAgfVxuICAkTnVtYmVyLnByb3RvdHlwZSA9IHByb3RvO1xuICBwcm90by5jb25zdHJ1Y3RvciA9ICROdW1iZXI7XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoZ2xvYmFsLCBOVU1CRVIsICROdW1iZXIpO1xufSIsIi8vIDIwLjEuMi4xIE51bWJlci5FUFNJTE9OXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtFUFNJTE9OOiBNYXRoLnBvdygyLCAtNTIpfSk7IiwiLy8gMjAuMS4yLjIgTnVtYmVyLmlzRmluaXRlKG51bWJlcilcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIF9pc0Zpbml0ZSA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmlzRmluaXRlO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNGaW5pdGU6IGZ1bmN0aW9uIGlzRmluaXRlKGl0KXtcbiAgICByZXR1cm4gdHlwZW9mIGl0ID09ICdudW1iZXInICYmIF9pc0Zpbml0ZShpdCk7XG4gIH1cbn0pOyIsIi8vIDIwLjEuMi4zIE51bWJlci5pc0ludGVnZXIobnVtYmVyKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7aXNJbnRlZ2VyOiByZXF1aXJlKCcuL19pcy1pbnRlZ2VyJyl9KTsiLCIvLyAyMC4xLjIuNCBOdW1iZXIuaXNOYU4obnVtYmVyKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7XG4gIGlzTmFOOiBmdW5jdGlvbiBpc05hTihudW1iZXIpe1xuICAgIHJldHVybiBudW1iZXIgIT0gbnVtYmVyO1xuICB9XG59KTsiLCIvLyAyMC4xLjIuNSBOdW1iZXIuaXNTYWZlSW50ZWdlcihudW1iZXIpXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBpc0ludGVnZXIgPSByZXF1aXJlKCcuL19pcy1pbnRlZ2VyJylcbiAgLCBhYnMgICAgICAgPSBNYXRoLmFicztcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7XG4gIGlzU2FmZUludGVnZXI6IGZ1bmN0aW9uIGlzU2FmZUludGVnZXIobnVtYmVyKXtcbiAgICByZXR1cm4gaXNJbnRlZ2VyKG51bWJlcikgJiYgYWJzKG51bWJlcikgPD0gMHgxZmZmZmZmZmZmZmZmZjtcbiAgfVxufSk7IiwiLy8gMjAuMS4yLjYgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge01BWF9TQUZFX0lOVEVHRVI6IDB4MWZmZmZmZmZmZmZmZmZ9KTsiLCIvLyAyMC4xLjIuMTAgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge01JTl9TQUZFX0lOVEVHRVI6IC0weDFmZmZmZmZmZmZmZmZmfSk7IiwidmFyICRleHBvcnQgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkcGFyc2VGbG9hdCA9IHJlcXVpcmUoJy4vX3BhcnNlLWZsb2F0Jyk7XG4vLyAyMC4xLjIuMTIgTnVtYmVyLnBhcnNlRmxvYXQoc3RyaW5nKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTnVtYmVyLnBhcnNlRmxvYXQgIT0gJHBhcnNlRmxvYXQpLCAnTnVtYmVyJywge3BhcnNlRmxvYXQ6ICRwYXJzZUZsb2F0fSk7IiwidmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHBhcnNlSW50ID0gcmVxdWlyZSgnLi9fcGFyc2UtaW50Jyk7XG4vLyAyMC4xLjIuMTMgTnVtYmVyLnBhcnNlSW50KHN0cmluZywgcmFkaXgpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChOdW1iZXIucGFyc2VJbnQgIT0gJHBhcnNlSW50KSwgJ051bWJlcicsIHtwYXJzZUludDogJHBhcnNlSW50fSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsIGFuSW5zdGFuY2UgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcclxuICAsIHRvSW50ZWdlciAgICA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxyXG4gICwgYU51bWJlclZhbHVlID0gcmVxdWlyZSgnLi9fYS1udW1iZXItdmFsdWUnKVxyXG4gICwgcmVwZWF0ICAgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXJlcGVhdCcpXHJcbiAgLCAkdG9GaXhlZCAgICAgPSAxLi50b0ZpeGVkXHJcbiAgLCBmbG9vciAgICAgICAgPSBNYXRoLmZsb29yXHJcbiAgLCBkYXRhICAgICAgICAgPSBbMCwgMCwgMCwgMCwgMCwgMF1cclxuICAsIEVSUk9SICAgICAgICA9ICdOdW1iZXIudG9GaXhlZDogaW5jb3JyZWN0IGludm9jYXRpb24hJ1xyXG4gICwgWkVSTyAgICAgICAgID0gJzAnO1xyXG5cclxudmFyIG11bHRpcGx5ID0gZnVuY3Rpb24obiwgYyl7XHJcbiAgdmFyIGkgID0gLTFcclxuICAgICwgYzIgPSBjO1xyXG4gIHdoaWxlKCsraSA8IDYpe1xyXG4gICAgYzIgKz0gbiAqIGRhdGFbaV07XHJcbiAgICBkYXRhW2ldID0gYzIgJSAxZTc7XHJcbiAgICBjMiA9IGZsb29yKGMyIC8gMWU3KTtcclxuICB9XHJcbn07XHJcbnZhciBkaXZpZGUgPSBmdW5jdGlvbihuKXtcclxuICB2YXIgaSA9IDZcclxuICAgICwgYyA9IDA7XHJcbiAgd2hpbGUoLS1pID49IDApe1xyXG4gICAgYyArPSBkYXRhW2ldO1xyXG4gICAgZGF0YVtpXSA9IGZsb29yKGMgLyBuKTtcclxuICAgIGMgPSAoYyAlIG4pICogMWU3O1xyXG4gIH1cclxufTtcclxudmFyIG51bVRvU3RyaW5nID0gZnVuY3Rpb24oKXtcclxuICB2YXIgaSA9IDZcclxuICAgICwgcyA9ICcnO1xyXG4gIHdoaWxlKC0taSA+PSAwKXtcclxuICAgIGlmKHMgIT09ICcnIHx8IGkgPT09IDAgfHwgZGF0YVtpXSAhPT0gMCl7XHJcbiAgICAgIHZhciB0ID0gU3RyaW5nKGRhdGFbaV0pO1xyXG4gICAgICBzID0gcyA9PT0gJycgPyB0IDogcyArIHJlcGVhdC5jYWxsKFpFUk8sIDcgLSB0Lmxlbmd0aCkgKyB0O1xyXG4gICAgfVxyXG4gIH0gcmV0dXJuIHM7XHJcbn07XHJcbnZhciBwb3cgPSBmdW5jdGlvbih4LCBuLCBhY2Mpe1xyXG4gIHJldHVybiBuID09PSAwID8gYWNjIDogbiAlIDIgPT09IDEgPyBwb3coeCwgbiAtIDEsIGFjYyAqIHgpIDogcG93KHggKiB4LCBuIC8gMiwgYWNjKTtcclxufTtcclxudmFyIGxvZyA9IGZ1bmN0aW9uKHgpe1xyXG4gIHZhciBuICA9IDBcclxuICAgICwgeDIgPSB4O1xyXG4gIHdoaWxlKHgyID49IDQwOTYpe1xyXG4gICAgbiArPSAxMjtcclxuICAgIHgyIC89IDQwOTY7XHJcbiAgfVxyXG4gIHdoaWxlKHgyID49IDIpe1xyXG4gICAgbiAgKz0gMTtcclxuICAgIHgyIC89IDI7XHJcbiAgfSByZXR1cm4gbjtcclxufTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKCEhJHRvRml4ZWQgJiYgKFxyXG4gIDAuMDAwMDgudG9GaXhlZCgzKSAhPT0gJzAuMDAwJyB8fFxyXG4gIDAuOS50b0ZpeGVkKDApICE9PSAnMScgfHxcclxuICAxLjI1NS50b0ZpeGVkKDIpICE9PSAnMS4yNScgfHxcclxuICAxMDAwMDAwMDAwMDAwMDAwMTI4Li50b0ZpeGVkKDApICE9PSAnMTAwMDAwMDAwMDAwMDAwMDEyOCdcclxuKSB8fCAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xyXG4gIC8vIFY4IH4gQW5kcm9pZCA0LjMtXHJcbiAgJHRvRml4ZWQuY2FsbCh7fSk7XHJcbn0pKSwgJ051bWJlcicsIHtcclxuICB0b0ZpeGVkOiBmdW5jdGlvbiB0b0ZpeGVkKGZyYWN0aW9uRGlnaXRzKXtcclxuICAgIHZhciB4ID0gYU51bWJlclZhbHVlKHRoaXMsIEVSUk9SKVxyXG4gICAgICAsIGYgPSB0b0ludGVnZXIoZnJhY3Rpb25EaWdpdHMpXHJcbiAgICAgICwgcyA9ICcnXHJcbiAgICAgICwgbSA9IFpFUk9cclxuICAgICAgLCBlLCB6LCBqLCBrO1xyXG4gICAgaWYoZiA8IDAgfHwgZiA+IDIwKXRocm93IFJhbmdlRXJyb3IoRVJST1IpO1xyXG4gICAgaWYoeCAhPSB4KXJldHVybiAnTmFOJztcclxuICAgIGlmKHggPD0gLTFlMjEgfHwgeCA+PSAxZTIxKXJldHVybiBTdHJpbmcoeCk7XHJcbiAgICBpZih4IDwgMCl7XHJcbiAgICAgIHMgPSAnLSc7XHJcbiAgICAgIHggPSAteDtcclxuICAgIH1cclxuICAgIGlmKHggPiAxZS0yMSl7XHJcbiAgICAgIGUgPSBsb2coeCAqIHBvdygyLCA2OSwgMSkpIC0gNjk7XHJcbiAgICAgIHogPSBlIDwgMCA/IHggKiBwb3coMiwgLWUsIDEpIDogeCAvIHBvdygyLCBlLCAxKTtcclxuICAgICAgeiAqPSAweDEwMDAwMDAwMDAwMDAwO1xyXG4gICAgICBlID0gNTIgLSBlO1xyXG4gICAgICBpZihlID4gMCl7XHJcbiAgICAgICAgbXVsdGlwbHkoMCwgeik7XHJcbiAgICAgICAgaiA9IGY7XHJcbiAgICAgICAgd2hpbGUoaiA+PSA3KXtcclxuICAgICAgICAgIG11bHRpcGx5KDFlNywgMCk7XHJcbiAgICAgICAgICBqIC09IDc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG11bHRpcGx5KHBvdygxMCwgaiwgMSksIDApO1xyXG4gICAgICAgIGogPSBlIC0gMTtcclxuICAgICAgICB3aGlsZShqID49IDIzKXtcclxuICAgICAgICAgIGRpdmlkZSgxIDw8IDIzKTtcclxuICAgICAgICAgIGogLT0gMjM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpdmlkZSgxIDw8IGopO1xyXG4gICAgICAgIG11bHRpcGx5KDEsIDEpO1xyXG4gICAgICAgIGRpdmlkZSgyKTtcclxuICAgICAgICBtID0gbnVtVG9TdHJpbmcoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBtdWx0aXBseSgwLCB6KTtcclxuICAgICAgICBtdWx0aXBseSgxIDw8IC1lLCAwKTtcclxuICAgICAgICBtID0gbnVtVG9TdHJpbmcoKSArIHJlcGVhdC5jYWxsKFpFUk8sIGYpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZihmID4gMCl7XHJcbiAgICAgIGsgPSBtLmxlbmd0aDtcclxuICAgICAgbSA9IHMgKyAoayA8PSBmID8gJzAuJyArIHJlcGVhdC5jYWxsKFpFUk8sIGYgLSBrKSArIG0gOiBtLnNsaWNlKDAsIGsgLSBmKSArICcuJyArIG0uc2xpY2UoayAtIGYpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG0gPSBzICsgbTtcclxuICAgIH0gcmV0dXJuIG07XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgJGZhaWxzICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxyXG4gICwgYU51bWJlclZhbHVlID0gcmVxdWlyZSgnLi9fYS1udW1iZXItdmFsdWUnKVxyXG4gICwgJHRvUHJlY2lzaW9uID0gMS4udG9QcmVjaXNpb247XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICgkZmFpbHMoZnVuY3Rpb24oKXtcclxuICAvLyBJRTctXHJcbiAgcmV0dXJuICR0b1ByZWNpc2lvbi5jYWxsKDEsIHVuZGVmaW5lZCkgIT09ICcxJztcclxufSkgfHwgISRmYWlscyhmdW5jdGlvbigpe1xyXG4gIC8vIFY4IH4gQW5kcm9pZCA0LjMtXHJcbiAgJHRvUHJlY2lzaW9uLmNhbGwoe30pO1xyXG59KSksICdOdW1iZXInLCB7XHJcbiAgdG9QcmVjaXNpb246IGZ1bmN0aW9uIHRvUHJlY2lzaW9uKHByZWNpc2lvbil7XHJcbiAgICB2YXIgdGhhdCA9IGFOdW1iZXJWYWx1ZSh0aGlzLCAnTnVtYmVyI3RvUHJlY2lzaW9uOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcclxuICAgIHJldHVybiBwcmVjaXNpb24gPT09IHVuZGVmaW5lZCA/ICR0b1ByZWNpc2lvbi5jYWxsKHRoYXQpIDogJHRvUHJlY2lzaW9uLmNhbGwodGhhdCwgcHJlY2lzaW9uKTsgXHJcbiAgfVxyXG59KTsiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJyl9KTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxyXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKX0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XHJcbi8vIDE5LjEuMi4zIC8gMTUuMi4zLjcgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcclxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0aWVzOiByZXF1aXJlKCcuL19vYmplY3QtZHBzJyl9KTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xyXG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxyXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7IiwiLy8gMTkuMS4yLjUgT2JqZWN0LmZyZWV6ZShPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBtZXRhICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5vbkZyZWV6ZTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdmcmVlemUnLCBmdW5jdGlvbigkZnJlZXplKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZyZWV6ZShpdCl7XG4gICAgcmV0dXJuICRmcmVlemUgJiYgaXNPYmplY3QoaXQpID8gJGZyZWV6ZShtZXRhKGl0KSkgOiBpdDtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbnZhciB0b0lPYmplY3QgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZjtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRvSU9iamVjdChpdCksIGtleSk7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRPd25Qcm9wZXJ0eU5hbWVzJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpLmY7XG59KTsiLCIvLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRQcm90b3R5cGVPZicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XG4gICAgcmV0dXJuICRnZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjExIE9iamVjdC5pc0V4dGVuc2libGUoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2lzRXh0ZW5zaWJsZScsIGZ1bmN0aW9uKCRpc0V4dGVuc2libGUpe1xuICByZXR1cm4gZnVuY3Rpb24gaXNFeHRlbnNpYmxlKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gJGlzRXh0ZW5zaWJsZSA/ICRpc0V4dGVuc2libGUoaXQpIDogdHJ1ZSA6IGZhbHNlO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjEyIE9iamVjdC5pc0Zyb3plbihPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnaXNGcm96ZW4nLCBmdW5jdGlvbigkaXNGcm96ZW4pe1xuICByZXR1cm4gZnVuY3Rpb24gaXNGcm96ZW4oaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyAkaXNGcm96ZW4gPyAkaXNGcm96ZW4oaXQpIDogZmFsc2UgOiB0cnVlO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjEzIE9iamVjdC5pc1NlYWxlZChPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnaXNTZWFsZWQnLCBmdW5jdGlvbigkaXNTZWFsZWQpe1xuICByZXR1cm4gZnVuY3Rpb24gaXNTZWFsZWQoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyAkaXNTZWFsZWQgPyAkaXNTZWFsZWQoaXQpIDogZmFsc2UgOiB0cnVlO1xuICB9O1xufSk7IiwiLy8gMTkuMS4zLjEwIE9iamVjdC5pcyh2YWx1ZTEsIHZhbHVlMilcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtpczogcmVxdWlyZSgnLi9fc2FtZS12YWx1ZScpfSk7IiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRrZXlzICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjE1IE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyhPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBtZXRhICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5vbkZyZWV6ZTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdwcmV2ZW50RXh0ZW5zaW9ucycsIGZ1bmN0aW9uKCRwcmV2ZW50RXh0ZW5zaW9ucyl7XG4gIHJldHVybiBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucyhpdCl7XG4gICAgcmV0dXJuICRwcmV2ZW50RXh0ZW5zaW9ucyAmJiBpc09iamVjdChpdCkgPyAkcHJldmVudEV4dGVuc2lvbnMobWV0YShpdCkpIDogaXQ7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuMTcgT2JqZWN0LnNlYWwoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgbWV0YSAgICAgPSByZXF1aXJlKCcuL19tZXRhJykub25GcmVlemU7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnc2VhbCcsIGZ1bmN0aW9uKCRzZWFsKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlYWwoaXQpe1xuICAgIHJldHVybiAkc2VhbCAmJiBpc09iamVjdChpdCkgPyAkc2VhbChtZXRhKGl0KSkgOiBpdDtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldH0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCB0ZXN0ICAgID0ge307XG50ZXN0W3JlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpXSA9ICd6JztcbmlmKHRlc3QgKyAnJyAhPSAnW29iamVjdCB6XScpe1xuICByZXF1aXJlKCcuL19yZWRlZmluZScpKE9iamVjdC5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xuICB9LCB0cnVlKTtcbn0iLCJ2YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgJHBhcnNlRmxvYXQgPSByZXF1aXJlKCcuL19wYXJzZS1mbG9hdCcpO1xyXG4vLyAxOC4yLjQgcGFyc2VGbG9hdChzdHJpbmcpXHJcbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5GICogKHBhcnNlRmxvYXQgIT0gJHBhcnNlRmxvYXQpLCB7cGFyc2VGbG9hdDogJHBhcnNlRmxvYXR9KTsiLCJ2YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsICRwYXJzZUludCA9IHJlcXVpcmUoJy4vX3BhcnNlLWludCcpO1xyXG4vLyAxOC4yLjUgcGFyc2VJbnQoc3RyaW5nLCByYWRpeClcclxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LkYgKiAocGFyc2VJbnQgIT0gJHBhcnNlSW50KSwge3BhcnNlSW50OiAkcGFyc2VJbnR9KTsiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNsYXNzb2YgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsICRleHBvcnQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgaXNPYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGFuSW5zdGFuY2UgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBmb3JPZiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIHNldFByb3RvICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldFxuICAsIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKVxuICAsIHRhc2sgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXRcbiAgLCBtaWNyb3Rhc2sgICAgICAgICAgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpXG4gICwgUFJPTUlTRSAgICAgICAgICAgID0gJ1Byb21pc2UnXG4gICwgVHlwZUVycm9yICAgICAgICAgID0gZ2xvYmFsLlR5cGVFcnJvclxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgJFByb21pc2UgICAgICAgICAgID0gZ2xvYmFsW1BST01JU0VdXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBpc05vZGUgICAgICAgICAgICAgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGVtcHR5ICAgICAgICAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBJbnRlcm5hbCwgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24oKXtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSAgICAgPSAkUHJvbWlzZS5yZXNvbHZlKDEpXG4gICAgICAsIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbihleGVjKXsgZXhlYyhlbXB0eSwgZW1wdHkpOyB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgc2FtZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24oYSwgYil7XG4gIC8vIHdpdGggbGlicmFyeSB3cmFwcGVyIHNwZWNpYWwgY2FzZVxuICByZXR1cm4gYSA9PT0gYiB8fCBhID09PSAkUHJvbWlzZSAmJiBiID09PSBXcmFwcGVyO1xufTtcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICByZXR1cm4gc2FtZUNvbnN0cnVjdG9yKCRQcm9taXNlLCBDKVxuICAgID8gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgOiBuZXcgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbnZhciBQcm9taXNlQ2FwYWJpbGl0eSA9IEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbigkJHJlc29sdmUsICQkcmVqZWN0KXtcbiAgICBpZihyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ICA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCAgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn07XG52YXIgcGVyZm9ybSA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIGV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4ge2Vycm9yOiBlfTtcbiAgfVxufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbihwcm9taXNlLCBpc1JlamVjdCl7XG4gIGlmKHByb21pc2UuX24pcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdlxuICAgICAgLCBvayAgICA9IHByb21pc2UuX3MgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0aW9uKXtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWxcbiAgICAgICAgLCByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZVxuICAgICAgICAsIHJlamVjdCAgPSByZWFjdGlvbi5yZWplY3RcbiAgICAgICAgLCBkb21haW4gID0gcmVhY3Rpb24uZG9tYWluXG4gICAgICAgICwgcmVzdWx0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoaGFuZGxlcil7XG4gICAgICAgICAgaWYoIW9rKXtcbiAgICAgICAgICAgIGlmKHByb21pc2UuX2ggPT0gMilvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihoYW5kbGVyID09PSB0cnVlKXJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYoZG9tYWluKWRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICAgICAgICBpZihkb21haW4pZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKXtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpe1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3ZcbiAgICAgICwgYWJydXB0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmKGlzVW5oYW5kbGVkKHByb21pc2UpKXtcbiAgICAgIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoaXNOb2RlKXtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pe1xuICAgICAgICAgIGhhbmRsZXIoe3Byb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWV9KTtcbiAgICAgICAgfSBlbHNlIGlmKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3Ipe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZihhYnJ1cHQpdGhyb3cgYWJydXB0LmVycm9yO1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgaWYocHJvbWlzZS5faCA9PSAxKXJldHVybiBmYWxzZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jXG4gICAgLCBpICAgICA9IDBcbiAgICAsIHJlYWN0aW9uO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdGlvbiA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3Rpb24uZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3Rpb24ucHJvbWlzZSkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmKGlzTm9kZSl7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpe1xuICAgICAgaGFuZGxlcih7cHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92fSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZihwcm9taXNlLl9kKXJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZighcHJvbWlzZS5fYSlwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcHJvbWlzZSA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHByb21pc2UuX2QpcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYocHJvbWlzZSA9PT0gdmFsdWUpdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtfdzogcHJvbWlzZSwgX2Q6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoKGUpe1xuICAgICRyZWplY3QuY2FsbCh7X3c6IHByb21pc2UsIF9kOiBmYWxzZX0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZighVVNFX05BVElWRSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpe1xuICAgICAgdmFyIHJlYWN0aW9uICAgID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayAgICAgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgICA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX2EpdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX3Mpbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHByb21pc2UgID0gbmV3IEludGVybmFsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCAgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtQcm9taXNlOiAkUHJvbWlzZX0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKXtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpXG4gICAgICAsICQkcmVqZWN0ICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIC8vIGluc3RhbmNlb2YgaW5zdGVhZCBvZiBpbnRlcm5hbCBzbG90IGNoZWNrIGJlY2F1c2Ugd2Ugc2hvdWxkIGZpeCBpdCB3aXRob3V0IHJlcGxhY2VtZW50IG5hdGl2ZSBQcm9taXNlIGNvcmVcbiAgICBpZih4IGluc3RhbmNlb2YgJFByb21pc2UgJiYgc2FtZUNvbnN0cnVjdG9yKHguY29uc3RydWN0b3IsIHRoaXMpKXJldHVybiB4O1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZXNvbHZlICA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICAkJHJlc29sdmUoeCk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpe1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICAgICAgPSB0aGlzXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZXNvbHZlICAgID0gY2FwYWJpbGl0eS5yZXNvbHZlXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgdmFyIHZhbHVlcyAgICA9IFtdXG4gICAgICAgICwgaW5kZXggICAgID0gMFxuICAgICAgICAsIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICB2YXIgJGluZGV4ICAgICAgICA9IGluZGV4KytcbiAgICAgICAgICAsIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICBpZihhbHJlYWR5Q2FsbGVkKXJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkICA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IHRoaXNcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYoYWJydXB0KXJlamVjdChhYnJ1cHQuZXJyb3IpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pOyIsIi8vIDI2LjEuMSBSZWZsZWN0LmFwcGx5KHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KVxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgYW5PYmplY3QgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBfYXBwbHkgICAgPSBGdW5jdGlvbi5hcHBseTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBhcHBseTogZnVuY3Rpb24gYXBwbHkodGFyZ2V0LCB0aGlzQXJndW1lbnQsIGFyZ3VtZW50c0xpc3Qpe1xuICAgIHJldHVybiBfYXBwbHkuY2FsbChhRnVuY3Rpb24odGFyZ2V0KSwgdGhpc0FyZ3VtZW50LCBhbk9iamVjdChhcmd1bWVudHNMaXN0KSk7XG4gIH1cbn0pOyIsIi8vIDI2LjEuMiBSZWZsZWN0LmNvbnN0cnVjdCh0YXJnZXQsIGFyZ3VtZW50c0xpc3QgWywgbmV3VGFyZ2V0XSlcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGFuT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgaXNPYmplY3QgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBiaW5kICAgICAgPSByZXF1aXJlKCcuL19iaW5kJyk7XG5cbi8vIE1TIEVkZ2Ugc3VwcG9ydHMgb25seSAyIGFyZ3VtZW50c1xuLy8gRkYgTmlnaHRseSBzZXRzIHRoaXJkIGFyZ3VtZW50IGFzIGBuZXcudGFyZ2V0YCwgYnV0IGRvZXMgbm90IGNyZWF0ZSBgdGhpc2AgZnJvbSBpdFxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIGZ1bmN0aW9uIEYoKXt9XG4gIHJldHVybiAhKFJlZmxlY3QuY29uc3RydWN0KGZ1bmN0aW9uKCl7fSwgW10sIEYpIGluc3RhbmNlb2YgRik7XG59KSwgJ1JlZmxlY3QnLCB7XG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gY29uc3RydWN0KFRhcmdldCwgYXJncyAvKiwgbmV3VGFyZ2V0Ki8pe1xuICAgIGFGdW5jdGlvbihUYXJnZXQpO1xuICAgIGFuT2JqZWN0KGFyZ3MpO1xuICAgIHZhciBuZXdUYXJnZXQgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IFRhcmdldCA6IGFGdW5jdGlvbihhcmd1bWVudHNbMl0pO1xuICAgIGlmKFRhcmdldCA9PSBuZXdUYXJnZXQpe1xuICAgICAgLy8gdy9vIGFsdGVyZWQgbmV3VGFyZ2V0LCBvcHRpbWl6YXRpb24gZm9yIDAtNCBhcmd1bWVudHNcbiAgICAgIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBUYXJnZXQ7XG4gICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSk7XG4gICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgIGNhc2UgMzogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgIGNhc2UgNDogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gICAgICB9XG4gICAgICAvLyB3L28gYWx0ZXJlZCBuZXdUYXJnZXQsIGxvdCBvZiBhcmd1bWVudHMgY2FzZVxuICAgICAgdmFyICRhcmdzID0gW251bGxdO1xuICAgICAgJGFyZ3MucHVzaC5hcHBseSgkYXJncywgYXJncyk7XG4gICAgICByZXR1cm4gbmV3IChiaW5kLmFwcGx5KFRhcmdldCwgJGFyZ3MpKTtcbiAgICB9XG4gICAgLy8gd2l0aCBhbHRlcmVkIG5ld1RhcmdldCwgbm90IHN1cHBvcnQgYnVpbHQtaW4gY29uc3RydWN0b3JzXG4gICAgdmFyIHByb3RvICAgID0gbmV3VGFyZ2V0LnByb3RvdHlwZVxuICAgICAgLCBpbnN0YW5jZSA9IGNyZWF0ZShpc09iamVjdChwcm90bykgPyBwcm90byA6IE9iamVjdC5wcm90b3R5cGUpXG4gICAgICAsIHJlc3VsdCAgID0gRnVuY3Rpb24uYXBwbHkuY2FsbChUYXJnZXQsIGluc3RhbmNlLCBhcmdzKTtcbiAgICByZXR1cm4gaXNPYmplY3QocmVzdWx0KSA/IHJlc3VsdCA6IGluc3RhbmNlO1xuICB9XG59KTsiLCIvLyAyNi4xLjMgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKVxudmFyIGRQICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG5cbi8vIE1TIEVkZ2UgaGFzIGJyb2tlbiBSZWZsZWN0LmRlZmluZVByb3BlcnR5IC0gdGhyb3dpbmcgaW5zdGVhZCBvZiByZXR1cm5pbmcgZmFsc2VcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGRQLmYoe30sIDEsIHt2YWx1ZTogMX0pLCAxLCB7dmFsdWU6IDJ9KTtcbn0pLCAnUmVmbGVjdCcsIHtcbiAgZGVmaW5lUHJvcGVydHk6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpe1xuICAgIGFuT2JqZWN0KHRhcmdldCk7XG4gICAgcHJvcGVydHlLZXkgPSB0b1ByaW1pdGl2ZShwcm9wZXJ0eUtleSwgdHJ1ZSk7XG4gICAgYW5PYmplY3QoYXR0cmlidXRlcyk7XG4gICAgdHJ5IHtcbiAgICAgIGRQLmYodGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufSk7IiwiLy8gMjYuMS40IFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSlcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZ09QRCAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmZcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGRlbGV0ZVByb3BlcnR5OiBmdW5jdGlvbiBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5KXtcbiAgICB2YXIgZGVzYyA9IGdPUEQoYW5PYmplY3QodGFyZ2V0KSwgcHJvcGVydHlLZXkpO1xuICAgIHJldHVybiBkZXNjICYmICFkZXNjLmNvbmZpZ3VyYWJsZSA/IGZhbHNlIDogZGVsZXRlIHRhcmdldFtwcm9wZXJ0eUtleV07XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDI2LjEuNSBSZWZsZWN0LmVudW1lcmF0ZSh0YXJnZXQpXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgRW51bWVyYXRlID0gZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gYW5PYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB2YXIga2V5cyA9IHRoaXMuX2sgPSBbXSAgICAgICAvLyBrZXlzXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gaXRlcmF0ZWQpa2V5cy5wdXNoKGtleSk7XG59O1xucmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKShFbnVtZXJhdGUsICdPYmplY3QnLCBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXNcbiAgICAsIGtleXMgPSB0aGF0Ll9rXG4gICAgLCBrZXk7XG4gIGRvIHtcbiAgICBpZih0aGF0Ll9pID49IGtleXMubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIH0gd2hpbGUoISgoa2V5ID0ga2V5c1t0aGF0Ll9pKytdKSBpbiB0aGF0Ll90KSk7XG4gIHJldHVybiB7dmFsdWU6IGtleSwgZG9uZTogZmFsc2V9O1xufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZW51bWVyYXRlOiBmdW5jdGlvbiBlbnVtZXJhdGUodGFyZ2V0KXtcbiAgICByZXR1cm4gbmV3IEVudW1lcmF0ZSh0YXJnZXQpO1xuICB9XG59KTsiLCIvLyAyNi4xLjcgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSlcbnZhciBnT1BEICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KXtcbiAgICByZXR1cm4gZ09QRC5mKGFuT2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KTtcbiAgfVxufSk7IiwiLy8gMjYuMS44IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KVxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBnZXRQcm90byA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZ2V0UHJvdG90eXBlT2Y6IGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKHRhcmdldCl7XG4gICAgcmV0dXJuIGdldFByb3RvKGFuT2JqZWN0KHRhcmdldCkpO1xuICB9XG59KTsiLCIvLyAyNi4xLjYgUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSBbLCByZWNlaXZlcl0pXG52YXIgZ09QRCAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xuXG5mdW5jdGlvbiBnZXQodGFyZ2V0LCBwcm9wZXJ0eUtleS8qLCByZWNlaXZlciovKXtcbiAgdmFyIHJlY2VpdmVyID0gYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB0YXJnZXQgOiBhcmd1bWVudHNbMl1cbiAgICAsIGRlc2MsIHByb3RvO1xuICBpZihhbk9iamVjdCh0YXJnZXQpID09PSByZWNlaXZlcilyZXR1cm4gdGFyZ2V0W3Byb3BlcnR5S2V5XTtcbiAgaWYoZGVzYyA9IGdPUEQuZih0YXJnZXQsIHByb3BlcnR5S2V5KSlyZXR1cm4gaGFzKGRlc2MsICd2YWx1ZScpXG4gICAgPyBkZXNjLnZhbHVlXG4gICAgOiBkZXNjLmdldCAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGRlc2MuZ2V0LmNhbGwocmVjZWl2ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgaWYoaXNPYmplY3QocHJvdG8gPSBnZXRQcm90b3R5cGVPZih0YXJnZXQpKSlyZXR1cm4gZ2V0KHByb3RvLCBwcm9wZXJ0eUtleSwgcmVjZWl2ZXIpO1xufVxuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7Z2V0OiBnZXR9KTsiLCIvLyAyNi4xLjkgUmVmbGVjdC5oYXModGFyZ2V0LCBwcm9wZXJ0eUtleSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgaGFzOiBmdW5jdGlvbiBoYXModGFyZ2V0LCBwcm9wZXJ0eUtleSl7XG4gICAgcmV0dXJuIHByb3BlcnR5S2V5IGluIHRhcmdldDtcbiAgfVxufSk7IiwiLy8gMjYuMS4xMCBSZWZsZWN0LmlzRXh0ZW5zaWJsZSh0YXJnZXQpXG52YXIgJGV4cG9ydCAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYW5PYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgJGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgaXNFeHRlbnNpYmxlOiBmdW5jdGlvbiBpc0V4dGVuc2libGUodGFyZ2V0KXtcbiAgICBhbk9iamVjdCh0YXJnZXQpO1xuICAgIHJldHVybiAkaXNFeHRlbnNpYmxlID8gJGlzRXh0ZW5zaWJsZSh0YXJnZXQpIDogdHJ1ZTtcbiAgfVxufSk7IiwiLy8gMjYuMS4xMSBSZWZsZWN0Lm93bktleXModGFyZ2V0KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge293bktleXM6IHJlcXVpcmUoJy4vX293bi1rZXlzJyl9KTsiLCIvLyAyNi4xLjEyIFJlZmxlY3QucHJldmVudEV4dGVuc2lvbnModGFyZ2V0KVxudmFyICRleHBvcnQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYW5PYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCAkcHJldmVudEV4dGVuc2lvbnMgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnM7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKHRhcmdldCl7XG4gICAgYW5PYmplY3QodGFyZ2V0KTtcbiAgICB0cnkge1xuICAgICAgaWYoJHByZXZlbnRFeHRlbnNpb25zKSRwcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pOyIsIi8vIDI2LjEuMTQgUmVmbGVjdC5zZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKVxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBzZXRQcm90byA9IHJlcXVpcmUoJy4vX3NldC1wcm90bycpO1xuXG5pZihzZXRQcm90bykkZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIHNldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKXtcbiAgICBzZXRQcm90by5jaGVjayh0YXJnZXQsIHByb3RvKTtcbiAgICB0cnkge1xuICAgICAgc2V0UHJvdG8uc2V0KHRhcmdldCwgcHJvdG8pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pOyIsIi8vIDI2LjEuMTMgUmVmbGVjdC5zZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgViBbLCByZWNlaXZlcl0pXG52YXIgZFAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGdPUEQgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuXG5mdW5jdGlvbiBzZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgVi8qLCByZWNlaXZlciovKXtcbiAgdmFyIHJlY2VpdmVyID0gYXJndW1lbnRzLmxlbmd0aCA8IDQgPyB0YXJnZXQgOiBhcmd1bWVudHNbM11cbiAgICAsIG93bkRlc2MgID0gZ09QRC5mKGFuT2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KVxuICAgICwgZXhpc3RpbmdEZXNjcmlwdG9yLCBwcm90bztcbiAgaWYoIW93bkRlc2Mpe1xuICAgIGlmKGlzT2JqZWN0KHByb3RvID0gZ2V0UHJvdG90eXBlT2YodGFyZ2V0KSkpe1xuICAgICAgcmV0dXJuIHNldChwcm90bywgcHJvcGVydHlLZXksIFYsIHJlY2VpdmVyKTtcbiAgICB9XG4gICAgb3duRGVzYyA9IGNyZWF0ZURlc2MoMCk7XG4gIH1cbiAgaWYoaGFzKG93bkRlc2MsICd2YWx1ZScpKXtcbiAgICBpZihvd25EZXNjLndyaXRhYmxlID09PSBmYWxzZSB8fCAhaXNPYmplY3QocmVjZWl2ZXIpKXJldHVybiBmYWxzZTtcbiAgICBleGlzdGluZ0Rlc2NyaXB0b3IgPSBnT1BELmYocmVjZWl2ZXIsIHByb3BlcnR5S2V5KSB8fCBjcmVhdGVEZXNjKDApO1xuICAgIGV4aXN0aW5nRGVzY3JpcHRvci52YWx1ZSA9IFY7XG4gICAgZFAuZihyZWNlaXZlciwgcHJvcGVydHlLZXksIGV4aXN0aW5nRGVzY3JpcHRvcik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIG93bkRlc2Muc2V0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IChvd25EZXNjLnNldC5jYWxsKHJlY2VpdmVyLCBWKSwgdHJ1ZSk7XG59XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtzZXQ6IHNldH0pOyIsInZhciBnbG9iYWwgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuL19pbmhlcml0LWlmLXJlcXVpcmVkJylcbiAgLCBkUCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBnT1BOICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIGlzUmVnRXhwICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtcmVnZXhwJylcbiAgLCAkZmxhZ3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZsYWdzJylcbiAgLCAkUmVnRXhwICAgICAgICAgICA9IGdsb2JhbC5SZWdFeHBcbiAgLCBCYXNlICAgICAgICAgICAgICA9ICRSZWdFeHBcbiAgLCBwcm90byAgICAgICAgICAgICA9ICRSZWdFeHAucHJvdG90eXBlXG4gICwgcmUxICAgICAgICAgICAgICAgPSAvYS9nXG4gICwgcmUyICAgICAgICAgICAgICAgPSAvYS9nXG4gIC8vIFwibmV3XCIgY3JlYXRlcyBhIG5ldyBvYmplY3QsIG9sZCB3ZWJraXQgYnVnZ3kgaGVyZVxuICAsIENPUlJFQ1RfTkVXICAgICAgID0gbmV3ICRSZWdFeHAocmUxKSAhPT0gcmUxO1xuXG5pZihyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICghQ09SUkVDVF9ORVcgfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZTJbcmVxdWlyZSgnLi9fd2tzJykoJ21hdGNoJyldID0gZmFsc2U7XG4gIC8vIFJlZ0V4cCBjb25zdHJ1Y3RvciBjYW4gYWx0ZXIgZmxhZ3MgYW5kIElzUmVnRXhwIHdvcmtzIGNvcnJlY3Qgd2l0aCBAQG1hdGNoXG4gIHJldHVybiAkUmVnRXhwKHJlMSkgIT0gcmUxIHx8ICRSZWdFeHAocmUyKSA9PSByZTIgfHwgJFJlZ0V4cChyZTEsICdpJykgIT0gJy9hL2knO1xufSkpKXtcbiAgJFJlZ0V4cCA9IGZ1bmN0aW9uIFJlZ0V4cChwLCBmKXtcbiAgICB2YXIgdGlSRSA9IHRoaXMgaW5zdGFuY2VvZiAkUmVnRXhwXG4gICAgICAsIHBpUkUgPSBpc1JlZ0V4cChwKVxuICAgICAgLCBmaVUgID0gZiA9PT0gdW5kZWZpbmVkO1xuICAgIHJldHVybiAhdGlSRSAmJiBwaVJFICYmIHAuY29uc3RydWN0b3IgPT09ICRSZWdFeHAgJiYgZmlVID8gcFxuICAgICAgOiBpbmhlcml0SWZSZXF1aXJlZChDT1JSRUNUX05FV1xuICAgICAgICA/IG5ldyBCYXNlKHBpUkUgJiYgIWZpVSA/IHAuc291cmNlIDogcCwgZilcbiAgICAgICAgOiBCYXNlKChwaVJFID0gcCBpbnN0YW5jZW9mICRSZWdFeHApID8gcC5zb3VyY2UgOiBwLCBwaVJFICYmIGZpVSA/ICRmbGFncy5jYWxsKHApIDogZilcbiAgICAgICwgdGlSRSA/IHRoaXMgOiBwcm90bywgJFJlZ0V4cCk7XG4gIH07XG4gIHZhciBwcm94eSA9IGZ1bmN0aW9uKGtleSl7XG4gICAga2V5IGluICRSZWdFeHAgfHwgZFAoJFJlZ0V4cCwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBCYXNlW2tleV07IH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKGl0KXsgQmFzZVtrZXldID0gaXQ7IH1cbiAgICB9KTtcbiAgfTtcbiAgZm9yKHZhciBrZXlzID0gZ09QTihCYXNlKSwgaSA9IDA7IGtleXMubGVuZ3RoID4gaTsgKXByb3h5KGtleXNbaSsrXSk7XG4gIHByb3RvLmNvbnN0cnVjdG9yID0gJFJlZ0V4cDtcbiAgJFJlZ0V4cC5wcm90b3R5cGUgPSBwcm90bztcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShnbG9iYWwsICdSZWdFeHAnLCAkUmVnRXhwKTtcbn1cblxucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKSgnUmVnRXhwJyk7IiwiLy8gMjEuMi41LjMgZ2V0IFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3MoKVxuaWYocmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAvLi9nLmZsYWdzICE9ICdnJylyZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mKFJlZ0V4cC5wcm90b3R5cGUsICdmbGFncycsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IHJlcXVpcmUoJy4vX2ZsYWdzJylcbn0pOyIsIi8vIEBAbWF0Y2ggbG9naWNcbnJlcXVpcmUoJy4vX2ZpeC1yZS13a3MnKSgnbWF0Y2gnLCAxLCBmdW5jdGlvbihkZWZpbmVkLCBNQVRDSCwgJG1hdGNoKXtcbiAgLy8gMjEuMS4zLjExIFN0cmluZy5wcm90b3R5cGUubWF0Y2gocmVnZXhwKVxuICByZXR1cm4gW2Z1bmN0aW9uIG1hdGNoKHJlZ2V4cCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBPICA9IGRlZmluZWQodGhpcylcbiAgICAgICwgZm4gPSByZWdleHAgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogcmVnZXhwW01BVENIXTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IGZuLmNhbGwocmVnZXhwLCBPKSA6IG5ldyBSZWdFeHAocmVnZXhwKVtNQVRDSF0oU3RyaW5nKE8pKTtcbiAgfSwgJG1hdGNoXTtcbn0pOyIsIi8vIEBAcmVwbGFjZSBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdyZXBsYWNlJywgMiwgZnVuY3Rpb24oZGVmaW5lZCwgUkVQTEFDRSwgJHJlcGxhY2Upe1xuICAvLyAyMS4xLjMuMTQgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpXG4gIHJldHVybiBbZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKXtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIE8gID0gZGVmaW5lZCh0aGlzKVxuICAgICAgLCBmbiA9IHNlYXJjaFZhbHVlID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlYXJjaFZhbHVlW1JFUExBQ0VdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGZuLmNhbGwoc2VhcmNoVmFsdWUsIE8sIHJlcGxhY2VWYWx1ZSlcbiAgICAgIDogJHJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICB9LCAkcmVwbGFjZV07XG59KTsiLCIvLyBAQHNlYXJjaCBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdzZWFyY2gnLCAxLCBmdW5jdGlvbihkZWZpbmVkLCBTRUFSQ0gsICRzZWFyY2gpe1xuICAvLyAyMS4xLjMuMTUgU3RyaW5nLnByb3RvdHlwZS5zZWFyY2gocmVnZXhwKVxuICByZXR1cm4gW2Z1bmN0aW9uIHNlYXJjaChyZWdleHApe1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgTyAgPSBkZWZpbmVkKHRoaXMpXG4gICAgICAsIGZuID0gcmVnZXhwID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHJlZ2V4cFtTRUFSQ0hdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkID8gZm4uY2FsbChyZWdleHAsIE8pIDogbmV3IFJlZ0V4cChyZWdleHApW1NFQVJDSF0oU3RyaW5nKE8pKTtcbiAgfSwgJHNlYXJjaF07XG59KTsiLCIvLyBAQHNwbGl0IGxvZ2ljXG5yZXF1aXJlKCcuL19maXgtcmUtd2tzJykoJ3NwbGl0JywgMiwgZnVuY3Rpb24oZGVmaW5lZCwgU1BMSVQsICRzcGxpdCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGlzUmVnRXhwICAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKVxuICAgICwgX3NwbGl0ICAgICA9ICRzcGxpdFxuICAgICwgJHB1c2ggICAgICA9IFtdLnB1c2hcbiAgICAsICRTUExJVCAgICAgPSAnc3BsaXQnXG4gICAgLCBMRU5HVEggICAgID0gJ2xlbmd0aCdcbiAgICAsIExBU1RfSU5ERVggPSAnbGFzdEluZGV4JztcbiAgaWYoXG4gICAgJ2FiYmMnWyRTUExJVF0oLyhiKSovKVsxXSA9PSAnYycgfHxcbiAgICAndGVzdCdbJFNQTElUXSgvKD86KS8sIC0xKVtMRU5HVEhdICE9IDQgfHxcbiAgICAnYWInWyRTUExJVF0oLyg/OmFiKSovKVtMRU5HVEhdICE9IDIgfHxcbiAgICAnLidbJFNQTElUXSgvKC4/KSguPykvKVtMRU5HVEhdICE9IDQgfHxcbiAgICAnLidbJFNQTElUXSgvKCkoKS8pW0xFTkdUSF0gPiAxIHx8XG4gICAgJydbJFNQTElUXSgvLj8vKVtMRU5HVEhdXG4gICl7XG4gICAgdmFyIE5QQ0cgPSAvKCk/Py8uZXhlYygnJylbMV0gPT09IHVuZGVmaW5lZDsgLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXBcbiAgICAvLyBiYXNlZCBvbiBlczUtc2hpbSBpbXBsZW1lbnRhdGlvbiwgbmVlZCB0byByZXdvcmsgaXRcbiAgICAkc3BsaXQgPSBmdW5jdGlvbihzZXBhcmF0b3IsIGxpbWl0KXtcbiAgICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgICBpZihzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCAmJiBsaW1pdCA9PT0gMClyZXR1cm4gW107XG4gICAgICAvLyBJZiBgc2VwYXJhdG9yYCBpcyBub3QgYSByZWdleCwgdXNlIG5hdGl2ZSBzcGxpdFxuICAgICAgaWYoIWlzUmVnRXhwKHNlcGFyYXRvcikpcmV0dXJuIF9zcGxpdC5jYWxsKHN0cmluZywgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICB2YXIgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gJ3knIDogJycpO1xuICAgICAgdmFyIGxhc3RMYXN0SW5kZXggPSAwO1xuICAgICAgdmFyIHNwbGl0TGltaXQgPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gNDI5NDk2NzI5NSA6IGxpbWl0ID4+PiAwO1xuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHZhciBzZXBhcmF0b3JDb3B5ID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArICdnJyk7XG4gICAgICB2YXIgc2VwYXJhdG9yMiwgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aCwgaTtcbiAgICAgIC8vIERvZXNuJ3QgbmVlZCBmbGFncyBneSwgYnV0IHRoZXkgZG9uJ3QgaHVydFxuICAgICAgaWYoIU5QQ0cpc2VwYXJhdG9yMiA9IG5ldyBSZWdFeHAoJ14nICsgc2VwYXJhdG9yQ29weS5zb3VyY2UgKyAnJCg/IVxcXFxzKScsIGZsYWdzKTtcbiAgICAgIHdoaWxlKG1hdGNoID0gc2VwYXJhdG9yQ29weS5leGVjKHN0cmluZykpe1xuICAgICAgICAvLyBgc2VwYXJhdG9yQ29weS5sYXN0SW5kZXhgIGlzIG5vdCByZWxpYWJsZSBjcm9zcy1icm93c2VyXG4gICAgICAgIGxhc3RJbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF1bTEVOR1RIXTtcbiAgICAgICAgaWYobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCl7XG4gICAgICAgICAgb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgICAgLy8gRml4IGJyb3dzZXJzIHdob3NlIGBleGVjYCBtZXRob2RzIGRvbid0IGNvbnNpc3RlbnRseSByZXR1cm4gYHVuZGVmaW5lZGAgZm9yIE5QQ0dcbiAgICAgICAgICBpZighTlBDRyAmJiBtYXRjaFtMRU5HVEhdID4gMSltYXRjaFswXS5yZXBsYWNlKHNlcGFyYXRvcjIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBmb3IoaSA9IDE7IGkgPCBhcmd1bWVudHNbTEVOR1RIXSAtIDI7IGkrKylpZihhcmd1bWVudHNbaV0gPT09IHVuZGVmaW5lZCltYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZihtYXRjaFtMRU5HVEhdID4gMSAmJiBtYXRjaC5pbmRleCA8IHN0cmluZ1tMRU5HVEhdKSRwdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXVtMRU5HVEhdO1xuICAgICAgICAgIGxhc3RMYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgICAgaWYob3V0cHV0W0xFTkdUSF0gPj0gc3BsaXRMaW1pdClicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZihzZXBhcmF0b3JDb3B5W0xBU1RfSU5ERVhdID09PSBtYXRjaC5pbmRleClzZXBhcmF0b3JDb3B5W0xBU1RfSU5ERVhdKys7IC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3BcbiAgICAgIH1cbiAgICAgIGlmKGxhc3RMYXN0SW5kZXggPT09IHN0cmluZ1tMRU5HVEhdKXtcbiAgICAgICAgaWYobGFzdExlbmd0aCB8fCAhc2VwYXJhdG9yQ29weS50ZXN0KCcnKSlvdXRwdXQucHVzaCgnJyk7XG4gICAgICB9IGVsc2Ugb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICAgIHJldHVybiBvdXRwdXRbTEVOR1RIXSA+IHNwbGl0TGltaXQgPyBvdXRwdXQuc2xpY2UoMCwgc3BsaXRMaW1pdCkgOiBvdXRwdXQ7XG4gICAgfTtcbiAgLy8gQ2hha3JhLCBWOFxuICB9IGVsc2UgaWYoJzAnWyRTUExJVF0odW5kZWZpbmVkLCAwKVtMRU5HVEhdKXtcbiAgICAkc3BsaXQgPSBmdW5jdGlvbihzZXBhcmF0b3IsIGxpbWl0KXtcbiAgICAgIHJldHVybiBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCAmJiBsaW1pdCA9PT0gMCA/IFtdIDogX3NwbGl0LmNhbGwodGhpcywgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfTtcbiAgfVxuICAvLyAyMS4xLjMuMTcgU3RyaW5nLnByb3RvdHlwZS5zcGxpdChzZXBhcmF0b3IsIGxpbWl0KVxuICByZXR1cm4gW2Z1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpe1xuICAgIHZhciBPICA9IGRlZmluZWQodGhpcylcbiAgICAgICwgZm4gPSBzZXBhcmF0b3IgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogc2VwYXJhdG9yW1NQTElUXTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IGZuLmNhbGwoc2VwYXJhdG9yLCBPLCBsaW1pdCkgOiAkc3BsaXQuY2FsbChTdHJpbmcoTyksIHNlcGFyYXRvciwgbGltaXQpO1xuICB9LCAkc3BsaXRdO1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5yZXF1aXJlKCcuL2VzNi5yZWdleHAuZmxhZ3MnKTtcclxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcclxuICAsICRmbGFncyAgICAgID0gcmVxdWlyZSgnLi9fZmxhZ3MnKVxyXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXHJcbiAgLCBUT19TVFJJTkcgICA9ICd0b1N0cmluZydcclxuICAsICR0b1N0cmluZyAgID0gLy4vW1RPX1NUUklOR107XHJcblxyXG52YXIgZGVmaW5lID0gZnVuY3Rpb24oZm4pe1xyXG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoUmVnRXhwLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmbiwgdHJ1ZSk7XHJcbn07XHJcblxyXG4vLyAyMS4yLjUuMTQgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZygpXHJcbmlmKHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXsgcmV0dXJuICR0b1N0cmluZy5jYWxsKHtzb3VyY2U6ICdhJywgZmxhZ3M6ICdiJ30pICE9ICcvYS9iJzsgfSkpe1xyXG4gIGRlZmluZShmdW5jdGlvbiB0b1N0cmluZygpe1xyXG4gICAgdmFyIFIgPSBhbk9iamVjdCh0aGlzKTtcclxuICAgIHJldHVybiAnLycuY29uY2F0KFIuc291cmNlLCAnLycsXHJcbiAgICAgICdmbGFncycgaW4gUiA/IFIuZmxhZ3MgOiAhREVTQ1JJUFRPUlMgJiYgUiBpbnN0YW5jZW9mIFJlZ0V4cCA/ICRmbGFncy5jYWxsKFIpIDogdW5kZWZpbmVkKTtcclxuICB9KTtcclxuLy8gRkY0NC0gUmVnRXhwI3RvU3RyaW5nIGhhcyBhIHdyb25nIG5hbWVcclxufSBlbHNlIGlmKCR0b1N0cmluZy5uYW1lICE9IFRPX1NUUklORyl7XHJcbiAgZGVmaW5lKGZ1bmN0aW9uIHRvU3RyaW5nKCl7XHJcbiAgICByZXR1cm4gJHRvU3RyaW5nLmNhbGwodGhpcyk7XHJcbiAgfSk7XHJcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gMjMuMiBTZXQgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoJ1NldCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBTZXQoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjIuMy4xIFNldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywgdmFsdWUgPSB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjIgU3RyaW5nLnByb3RvdHlwZS5hbmNob3IobmFtZSlcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2FuY2hvcicsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gYW5jaG9yKG5hbWUpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdhJywgJ25hbWUnLCBuYW1lKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuMyBTdHJpbmcucHJvdG90eXBlLmJpZygpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdiaWcnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJpZygpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdiaWcnLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy40IFN0cmluZy5wcm90b3R5cGUuYmxpbmsoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnYmxpbmsnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJsaW5rKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2JsaW5rJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuNSBTdHJpbmcucHJvdG90eXBlLmJvbGQoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnYm9sZCcsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gYm9sZCgpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdiJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRhdCAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKShmYWxzZSk7XG4kZXhwb3J0KCRleHBvcnQuUCwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4zLjMgU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdChwb3MpXG4gIGNvZGVQb2ludEF0OiBmdW5jdGlvbiBjb2RlUG9pbnRBdChwb3Mpe1xuICAgIHJldHVybiAkYXQodGhpcywgcG9zKTtcbiAgfVxufSk7IiwiLy8gMjEuMS4zLjYgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aChzZWFyY2hTdHJpbmcgWywgZW5kUG9zaXRpb25dKVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBjb250ZXh0ICAgPSByZXF1aXJlKCcuL19zdHJpbmctY29udGV4dCcpXG4gICwgRU5EU19XSVRIID0gJ2VuZHNXaXRoJ1xuICAsICRlbmRzV2l0aCA9ICcnW0VORFNfV0lUSF07XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMtaXMtcmVnZXhwJykoRU5EU19XSVRIKSwgJ1N0cmluZycsIHtcbiAgZW5kc1dpdGg6IGZ1bmN0aW9uIGVuZHNXaXRoKHNlYXJjaFN0cmluZyAvKiwgZW5kUG9zaXRpb24gPSBAbGVuZ3RoICovKXtcbiAgICB2YXIgdGhhdCA9IGNvbnRleHQodGhpcywgc2VhcmNoU3RyaW5nLCBFTkRTX1dJVEgpXG4gICAgICAsIGVuZFBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbGVuICAgID0gdG9MZW5ndGgodGhhdC5sZW5ndGgpXG4gICAgICAsIGVuZCAgICA9IGVuZFBvc2l0aW9uID09PSB1bmRlZmluZWQgPyBsZW4gOiBNYXRoLm1pbih0b0xlbmd0aChlbmRQb3NpdGlvbiksIGxlbilcbiAgICAgICwgc2VhcmNoID0gU3RyaW5nKHNlYXJjaFN0cmluZyk7XG4gICAgcmV0dXJuICRlbmRzV2l0aFxuICAgICAgPyAkZW5kc1dpdGguY2FsbCh0aGF0LCBzZWFyY2gsIGVuZClcbiAgICAgIDogdGhhdC5zbGljZShlbmQgLSBzZWFyY2gubGVuZ3RoLCBlbmQpID09PSBzZWFyY2g7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjYgU3RyaW5nLnByb3RvdHlwZS5maXhlZCgpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdmaXhlZCcsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gZml4ZWQoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAndHQnLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy43IFN0cmluZy5wcm90b3R5cGUuZm9udGNvbG9yKGNvbG9yKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnZm9udGNvbG9yJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBmb250Y29sb3IoY29sb3Ipe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdmb250JywgJ2NvbG9yJywgY29sb3IpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy44IFN0cmluZy5wcm90b3R5cGUuZm9udHNpemUoc2l6ZSlcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2ZvbnRzaXplJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBmb250c2l6ZShzaXplKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnZm9udCcsICdzaXplJywgc2l6ZSk7XG4gIH1cbn0pOyIsInZhciAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9JbmRleCAgICAgICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpXG4gICwgZnJvbUNoYXJDb2RlICAgPSBTdHJpbmcuZnJvbUNoYXJDb2RlXG4gICwgJGZyb21Db2RlUG9pbnQgPSBTdHJpbmcuZnJvbUNvZGVQb2ludDtcblxuLy8gbGVuZ3RoIHNob3VsZCBiZSAxLCBvbGQgRkYgcHJvYmxlbVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoISEkZnJvbUNvZGVQb2ludCAmJiAkZnJvbUNvZGVQb2ludC5sZW5ndGggIT0gMSksICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMi4yIFN0cmluZy5mcm9tQ29kZVBvaW50KC4uLmNvZGVQb2ludHMpXG4gIGZyb21Db2RlUG9pbnQ6IGZ1bmN0aW9uIGZyb21Db2RlUG9pbnQoeCl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB2YXIgcmVzICA9IFtdXG4gICAgICAsIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIGkgICAgPSAwXG4gICAgICAsIGNvZGU7XG4gICAgd2hpbGUoYUxlbiA+IGkpe1xuICAgICAgY29kZSA9ICthcmd1bWVudHNbaSsrXTtcbiAgICAgIGlmKHRvSW5kZXgoY29kZSwgMHgxMGZmZmYpICE9PSBjb2RlKXRocm93IFJhbmdlRXJyb3IoY29kZSArICcgaXMgbm90IGEgdmFsaWQgY29kZSBwb2ludCcpO1xuICAgICAgcmVzLnB1c2goY29kZSA8IDB4MTAwMDBcbiAgICAgICAgPyBmcm9tQ2hhckNvZGUoY29kZSlcbiAgICAgICAgOiBmcm9tQ2hhckNvZGUoKChjb2RlIC09IDB4MTAwMDApID4+IDEwKSArIDB4ZDgwMCwgY29kZSAlIDB4NDAwICsgMHhkYzAwKVxuICAgICAgKTtcbiAgICB9IHJldHVybiByZXMuam9pbignJyk7XG4gIH1cbn0pOyIsIi8vIDIxLjEuMy43IFN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXMoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbiA9IDApXG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNvbnRleHQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWNvbnRleHQnKVxuICAsIElOQ0xVREVTID0gJ2luY2x1ZGVzJztcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscy1pcy1yZWdleHAnKShJTkNMVURFUyksICdTdHJpbmcnLCB7XG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhzZWFyY2hTdHJpbmcgLyosIHBvc2l0aW9uID0gMCAqLyl7XG4gICAgcmV0dXJuICEhfmNvbnRleHQodGhpcywgc2VhcmNoU3RyaW5nLCBJTkNMVURFUylcbiAgICAgIC5pbmRleE9mKHNlYXJjaFN0cmluZywgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy45IFN0cmluZy5wcm90b3R5cGUuaXRhbGljcygpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdpdGFsaWNzJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBpdGFsaWNzKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2knLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjEwIFN0cmluZy5wcm90b3R5cGUubGluayh1cmwpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdsaW5rJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBsaW5rKHVybCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2EnLCAnaHJlZicsIHVybCk7XG4gIH1cbn0pOyIsInZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4yLjQgU3RyaW5nLnJhdyhjYWxsU2l0ZSwgLi4uc3Vic3RpdHV0aW9ucylcbiAgcmF3OiBmdW5jdGlvbiByYXcoY2FsbFNpdGUpe1xuICAgIHZhciB0cGwgID0gdG9JT2JqZWN0KGNhbGxTaXRlLnJhdylcbiAgICAgICwgbGVuICA9IHRvTGVuZ3RoKHRwbC5sZW5ndGgpXG4gICAgICAsIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIHJlcyAgPSBbXVxuICAgICAgLCBpICAgID0gMDtcbiAgICB3aGlsZShsZW4gPiBpKXtcbiAgICAgIHJlcy5wdXNoKFN0cmluZyh0cGxbaSsrXSkpO1xuICAgICAgaWYoaSA8IGFMZW4pcmVzLnB1c2goU3RyaW5nKGFyZ3VtZW50c1tpXSkpO1xuICAgIH0gcmV0dXJuIHJlcy5qb2luKCcnKTtcbiAgfVxufSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4xMyBTdHJpbmcucHJvdG90eXBlLnJlcGVhdChjb3VudClcbiAgcmVwZWF0OiByZXF1aXJlKCcuL19zdHJpbmctcmVwZWF0Jylcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjExIFN0cmluZy5wcm90b3R5cGUuc21hbGwoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnc21hbGwnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNtYWxsKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3NtYWxsJywgJycsICcnKTtcbiAgfVxufSk7IiwiLy8gMjEuMS4zLjE4IFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aChzZWFyY2hTdHJpbmcgWywgcG9zaXRpb24gXSlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGNvbnRleHQgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWNvbnRleHQnKVxuICAsIFNUQVJUU19XSVRIID0gJ3N0YXJ0c1dpdGgnXG4gICwgJHN0YXJ0c1dpdGggPSAnJ1tTVEFSVFNfV0lUSF07XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMtaXMtcmVnZXhwJykoU1RBUlRTX1dJVEgpLCAnU3RyaW5nJywge1xuICBzdGFydHNXaXRoOiBmdW5jdGlvbiBzdGFydHNXaXRoKHNlYXJjaFN0cmluZyAvKiwgcG9zaXRpb24gPSAwICovKXtcbiAgICB2YXIgdGhhdCAgID0gY29udGV4dCh0aGlzLCBzZWFyY2hTdHJpbmcsIFNUQVJUU19XSVRIKVxuICAgICAgLCBpbmRleCAgPSB0b0xlbmd0aChNYXRoLm1pbihhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgdGhhdC5sZW5ndGgpKVxuICAgICAgLCBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoU3RyaW5nKTtcbiAgICByZXR1cm4gJHN0YXJ0c1dpdGhcbiAgICAgID8gJHN0YXJ0c1dpdGguY2FsbCh0aGF0LCBzZWFyY2gsIGluZGV4KVxuICAgICAgOiB0aGF0LnNsaWNlKGluZGV4LCBpbmRleCArIHNlYXJjaC5sZW5ndGgpID09PSBzZWFyY2g7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjEyIFN0cmluZy5wcm90b3R5cGUuc3RyaWtlKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ3N0cmlrZScsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gc3RyaWtlKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3N0cmlrZScsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjEzIFN0cmluZy5wcm90b3R5cGUuc3ViKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ3N1YicsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gc3ViKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3N1YicsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjE0IFN0cmluZy5wcm90b3R5cGUuc3VwKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ3N1cCcsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gc3VwKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3N1cCcsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDIxLjEuMy4yNSBTdHJpbmcucHJvdG90eXBlLnRyaW0oKVxucmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKSgndHJpbScsIGZ1bmN0aW9uKCR0cmltKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRyaW0oKXtcbiAgICByZXR1cm4gJHRyaW0odGhpcywgMyk7XG4gIH07XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgTUVUQSAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZXG4gICwgJGZhaWxzICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIHVpZCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCB3a3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCB3a3NEZWZpbmUgICAgICA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKVxuICAsIGtleU9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fa2V5b2YnKVxuICAsIGVudW1LZXlzICAgICAgID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJylcbiAgLCBpc0FycmF5ICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5JylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBfY3JlYXRlICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGdPUE5FeHQgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0JylcbiAgLCAkR09QRCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCAkRFAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgJGtleXMgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QRCAgICAgICAgICAgPSAkR09QRC5mXG4gICwgZFAgICAgICAgICAgICAgPSAkRFAuZlxuICAsIGdPUE4gICAgICAgICAgID0gZ09QTkV4dC5mXG4gICwgJFN5bWJvbCAgICAgICAgPSBnbG9iYWwuU3ltYm9sXG4gICwgJEpTT04gICAgICAgICAgPSBnbG9iYWwuSlNPTlxuICAsIF9zdHJpbmdpZnkgICAgID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5XG4gICwgUFJPVE9UWVBFICAgICAgPSAncHJvdG90eXBlJ1xuICAsIEhJRERFTiAgICAgICAgID0gd2tzKCdfaGlkZGVuJylcbiAgLCBUT19QUklNSVRJVkUgICA9IHdrcygndG9QcmltaXRpdmUnKVxuICAsIGlzRW51bSAgICAgICAgID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgT1BTeW1ib2xzICAgICAgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKVxuICAsIE9iamVjdFByb3RvICAgID0gT2JqZWN0W1BST1RPVFlQRV1cbiAgLCBVU0VfTkFUSVZFICAgICA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbidcbiAgLCBRT2JqZWN0ICAgICAgICA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8pJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSkkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpe1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZih0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgaXQgID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnT1BOKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZighaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIElTX09QICA9IGl0ID09PSBPYmplY3RQcm90b1xuICAgICwgbmFtZXMgID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighVVNFX05BVElWRSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZih0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKHRoaXMgPT09IE9iamVjdFByb3RvKSRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZihERVNDUklQVE9SUyAmJiBzZXR0ZXIpc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7Y29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXR9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiAgID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5Jykpe1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbihuYW1lKXtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuZm9yKHZhciBzeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3Moc3ltYm9sc1tpKytdKTtcblxuZm9yKHZhciBzeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrc0RlZmluZShzeW1ib2xzW2krK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIGlmKGlzU3ltYm9sKGtleSkpcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICAgIHRocm93IFR5cGVFcnJvcihrZXkgKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHthOiBTfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXtcbiAgICBpZihpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSlyZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICB2YXIgYXJncyA9IFtpdF1cbiAgICAgICwgaSAgICA9IDFcbiAgICAgICwgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZih0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICBpZigkcmVwbGFjZXIpdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmKCFpc1N5bWJvbCh2YWx1ZSkpcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkdHlwZWQgICAgICAgPSByZXF1aXJlKCcuL190eXBlZCcpXG4gICwgYnVmZmVyICAgICAgID0gcmVxdWlyZSgnLi9fdHlwZWQtYnVmZmVyJylcbiAgLCBhbk9iamVjdCAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvSW5kZXggICAgICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4JylcbiAgLCB0b0xlbmd0aCAgICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGlzT2JqZWN0ICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgVFlQRURfQVJSQVkgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3R5cGVkX2FycmF5JylcbiAgLCBBcnJheUJ1ZmZlciAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5BcnJheUJ1ZmZlclxuICAsIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKVxuICAsICRBcnJheUJ1ZmZlciA9IGJ1ZmZlci5BcnJheUJ1ZmZlclxuICAsICREYXRhVmlldyAgICA9IGJ1ZmZlci5EYXRhVmlld1xuICAsICRpc1ZpZXcgICAgICA9ICR0eXBlZC5BQlYgJiYgQXJyYXlCdWZmZXIuaXNWaWV3XG4gICwgJHNsaWNlICAgICAgID0gJEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZVxuICAsIFZJRVcgICAgICAgICA9ICR0eXBlZC5WSUVXXG4gICwgQVJSQVlfQlVGRkVSID0gJ0FycmF5QnVmZmVyJztcblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAoQXJyYXlCdWZmZXIgIT09ICRBcnJheUJ1ZmZlciksIHtBcnJheUJ1ZmZlcjogJEFycmF5QnVmZmVyfSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISR0eXBlZC5DT05TVFIsIEFSUkFZX0JVRkZFUiwge1xuICAvLyAyNC4xLjMuMSBBcnJheUJ1ZmZlci5pc1ZpZXcoYXJnKVxuICBpc1ZpZXc6IGZ1bmN0aW9uIGlzVmlldyhpdCl7XG4gICAgcmV0dXJuICRpc1ZpZXcgJiYgJGlzVmlldyhpdCkgfHwgaXNPYmplY3QoaXQpICYmIFZJRVcgaW4gaXQ7XG4gIH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuVSArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICFuZXcgJEFycmF5QnVmZmVyKDIpLnNsaWNlKDEsIHVuZGVmaW5lZCkuYnl0ZUxlbmd0aDtcbn0pLCBBUlJBWV9CVUZGRVIsIHtcbiAgLy8gMjQuMS40LjMgQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKXtcbiAgICBpZigkc2xpY2UgIT09IHVuZGVmaW5lZCAmJiBlbmQgPT09IHVuZGVmaW5lZClyZXR1cm4gJHNsaWNlLmNhbGwoYW5PYmplY3QodGhpcyksIHN0YXJ0KTsgLy8gRkYgZml4XG4gICAgdmFyIGxlbiAgICA9IGFuT2JqZWN0KHRoaXMpLmJ5dGVMZW5ndGhcbiAgICAgICwgZmlyc3QgID0gdG9JbmRleChzdGFydCwgbGVuKVxuICAgICAgLCBmaW5hbCAgPSB0b0luZGV4KGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogZW5kLCBsZW4pXG4gICAgICAsIHJlc3VsdCA9IG5ldyAoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRBcnJheUJ1ZmZlcikpKHRvTGVuZ3RoKGZpbmFsIC0gZmlyc3QpKVxuICAgICAgLCB2aWV3UyAgPSBuZXcgJERhdGFWaWV3KHRoaXMpXG4gICAgICAsIHZpZXdUICA9IG5ldyAkRGF0YVZpZXcocmVzdWx0KVxuICAgICAgLCBpbmRleCAgPSAwO1xuICAgIHdoaWxlKGZpcnN0IDwgZmluYWwpe1xuICAgICAgdmlld1Quc2V0VWludDgoaW5kZXgrKywgdmlld1MuZ2V0VWludDgoZmlyc3QrKykpO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoQVJSQVlfQlVGRkVSKTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fdHlwZWQnKS5BQlYsIHtcbiAgRGF0YVZpZXc6IHJlcXVpcmUoJy4vX3R5cGVkLWJ1ZmZlcicpLkRhdGFWaWV3XG59KTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdGbG9hdDMyJywgNCwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBGbG9hdDMyQXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnRmxvYXQ2NCcsIDgsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gRmxvYXQ2NEFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ0ludDE2JywgMiwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBJbnQxNkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ0ludDMyJywgNCwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBJbnQzMkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ0ludDgnLCAxLCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIEludDhBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpe1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59KTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdVaW50MTYnLCAyLCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQxNkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ1VpbnQzMicsIDQsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gVWludDMyQXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnVWludDgnLCAxLCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQ4QXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnVWludDgnLCAxLCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQ4Q2xhbXBlZEFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0sIHRydWUpOyIsIid1c2Ugc3RyaWN0JztcbnZhciBlYWNoICAgICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMClcbiAgLCByZWRlZmluZSAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgbWV0YSAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpXG4gICwgYXNzaWduICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpXG4gICwgd2VhayAgICAgICAgID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi13ZWFrJylcbiAgLCBpc09iamVjdCAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgZ2V0V2VhayAgICAgID0gbWV0YS5nZXRXZWFrXG4gICwgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZVxuICAsIHVuY2F1Z2h0RnJvemVuU3RvcmUgPSB3ZWFrLnVmc3RvcmVcbiAgLCB0bXAgICAgICAgICAgPSB7fVxuICAsIEludGVybmFsTWFwO1xuXG52YXIgd3JhcHBlciA9IGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBXZWFrTWFwKCl7XG4gICAgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gIH07XG59O1xuXG52YXIgbWV0aG9kcyA9IHtcbiAgLy8gMjMuMy4zLjMgV2Vha01hcC5wcm90b3R5cGUuZ2V0KGtleSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KXtcbiAgICBpZihpc09iamVjdChrZXkpKXtcbiAgICAgIHZhciBkYXRhID0gZ2V0V2VhayhrZXkpO1xuICAgICAgaWYoZGF0YSA9PT0gdHJ1ZSlyZXR1cm4gdW5jYXVnaHRGcm96ZW5TdG9yZSh0aGlzKS5nZXQoa2V5KTtcbiAgICAgIHJldHVybiBkYXRhID8gZGF0YVt0aGlzLl9pXSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0sXG4gIC8vIDIzLjMuMy41IFdlYWtNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywga2V5LCB2YWx1ZSk7XG4gIH1cbn07XG5cbi8vIDIzLjMgV2Vha01hcCBPYmplY3RzXG52YXIgJFdlYWtNYXAgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24nKSgnV2Vha01hcCcsIHdyYXBwZXIsIG1ldGhvZHMsIHdlYWssIHRydWUsIHRydWUpO1xuXG4vLyBJRTExIFdlYWtNYXAgZnJvemVuIGtleXMgZml4XG5pZihuZXcgJFdlYWtNYXAoKS5zZXQoKE9iamVjdC5mcmVlemUgfHwgT2JqZWN0KSh0bXApLCA3KS5nZXQodG1wKSAhPSA3KXtcbiAgSW50ZXJuYWxNYXAgPSB3ZWFrLmdldENvbnN0cnVjdG9yKHdyYXBwZXIpO1xuICBhc3NpZ24oSW50ZXJuYWxNYXAucHJvdG90eXBlLCBtZXRob2RzKTtcbiAgbWV0YS5ORUVEID0gdHJ1ZTtcbiAgZWFjaChbJ2RlbGV0ZScsICdoYXMnLCAnZ2V0JywgJ3NldCddLCBmdW5jdGlvbihrZXkpe1xuICAgIHZhciBwcm90byAgPSAkV2Vha01hcC5wcm90b3R5cGVcbiAgICAgICwgbWV0aG9kID0gcHJvdG9ba2V5XTtcbiAgICByZWRlZmluZShwcm90bywga2V5LCBmdW5jdGlvbihhLCBiKXtcbiAgICAgIC8vIHN0b3JlIGZyb3plbiBvYmplY3RzIG9uIGludGVybmFsIHdlYWttYXAgc2hpbVxuICAgICAgaWYoaXNPYmplY3QoYSkgJiYgIWlzRXh0ZW5zaWJsZShhKSl7XG4gICAgICAgIGlmKCF0aGlzLl9mKXRoaXMuX2YgPSBuZXcgSW50ZXJuYWxNYXA7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9mW2tleV0oYSwgYik7XG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NldCcgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgLy8gc3RvcmUgYWxsIHRoZSByZXN0IG9uIG5hdGl2ZSB3ZWFrbWFwXG4gICAgICB9IHJldHVybiBtZXRob2QuY2FsbCh0aGlzLCBhLCBiKTtcbiAgICB9KTtcbiAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlYWsgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXdlYWsnKTtcblxuLy8gMjMuNCBXZWFrU2V0IE9iamVjdHNcbnJlcXVpcmUoJy4vX2NvbGxlY3Rpb24nKSgnV2Vha1NldCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBXZWFrU2V0KCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy40LjMuMSBXZWFrU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywgdmFsdWUsIHRydWUpO1xuICB9XG59LCB3ZWFrLCBmYWxzZSwgdHJ1ZSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkaW5jbHVkZXMgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5Jywge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoZWwgLyosIGZyb21JbmRleCA9IDAgKi8pe1xuICAgIHJldHVybiAkaW5jbHVkZXModGhpcywgZWwsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5cbnJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpKCdpbmNsdWRlcycpOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yd2FsZHJvbi90YzM5LW5vdGVzL2Jsb2IvbWFzdGVyL2VzNi8yMDE0LTA5L3NlcHQtMjUubWQjNTEwLWdsb2JhbGFzYXAtZm9yLWVucXVldWluZy1hLW1pY3JvdGFza1xyXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKClcclxuICAsIHByb2Nlc3MgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLnByb2Nlc3NcclxuICAsIGlzTm9kZSAgICA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5HLCB7XHJcbiAgYXNhcDogZnVuY3Rpb24gYXNhcChmbil7XHJcbiAgICB2YXIgZG9tYWluID0gaXNOb2RlICYmIHByb2Nlc3MuZG9tYWluO1xyXG4gICAgbWljcm90YXNrKGRvbWFpbiA/IGRvbWFpbi5iaW5kKGZuKSA6IGZuKTtcclxuICB9XHJcbn0pOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvcHJvcG9zYWwtaXMtZXJyb3JcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjb2YgICAgID0gcmVxdWlyZSgnLi9fY29mJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnRXJyb3InLCB7XG4gIGlzRXJyb3I6IGZ1bmN0aW9uIGlzRXJyb3IoaXQpe1xuICAgIHJldHVybiBjb2YoaXQpID09PSAnRXJyb3InO1xuICB9XG59KTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdNYXAnLCB7dG9KU09OOiByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXRvLWpzb24nKSgnTWFwJyl9KTsiLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9CcmVuZGFuRWljaC80Mjk0ZDVjMjEyYTZkMjI1NDcwM1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBpYWRkaDogZnVuY3Rpb24gaWFkZGgoeDAsIHgxLCB5MCwgeTEpe1xuICAgIHZhciAkeDAgPSB4MCA+Pj4gMFxuICAgICAgLCAkeDEgPSB4MSA+Pj4gMFxuICAgICAgLCAkeTAgPSB5MCA+Pj4gMDtcbiAgICByZXR1cm4gJHgxICsgKHkxID4+PiAwKSArICgoJHgwICYgJHkwIHwgKCR4MCB8ICR5MCkgJiB+KCR4MCArICR5MCA+Pj4gMCkpID4+PiAzMSkgfCAwO1xuICB9XG59KTsiLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9CcmVuZGFuRWljaC80Mjk0ZDVjMjEyYTZkMjI1NDcwM1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBpbXVsaDogZnVuY3Rpb24gaW11bGgodSwgdil7XG4gICAgdmFyIFVJTlQxNiA9IDB4ZmZmZlxuICAgICAgLCAkdSA9ICt1XG4gICAgICAsICR2ID0gK3ZcbiAgICAgICwgdTAgPSAkdSAmIFVJTlQxNlxuICAgICAgLCB2MCA9ICR2ICYgVUlOVDE2XG4gICAgICAsIHUxID0gJHUgPj4gMTZcbiAgICAgICwgdjEgPSAkdiA+PiAxNlxuICAgICAgLCB0ICA9ICh1MSAqIHYwID4+PiAwKSArICh1MCAqIHYwID4+PiAxNik7XG4gICAgcmV0dXJuIHUxICogdjEgKyAodCA+PiAxNikgKyAoKHUwICogdjEgPj4+IDApICsgKHQgJiBVSU5UMTYpID4+IDE2KTtcbiAgfVxufSk7IiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vQnJlbmRhbkVpY2gvNDI5NGQ1YzIxMmE2ZDIyNTQ3MDNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgaXN1Ymg6IGZ1bmN0aW9uIGlzdWJoKHgwLCB4MSwgeTAsIHkxKXtcbiAgICB2YXIgJHgwID0geDAgPj4+IDBcbiAgICAgICwgJHgxID0geDEgPj4+IDBcbiAgICAgICwgJHkwID0geTAgPj4+IDA7XG4gICAgcmV0dXJuICR4MSAtICh5MSA+Pj4gMCkgLSAoKH4keDAgJiAkeTAgfCB+KCR4MCBeICR5MCkgJiAkeDAgLSAkeTAgPj4+IDApID4+PiAzMSkgfCAwO1xuICB9XG59KTsiLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9CcmVuZGFuRWljaC80Mjk0ZDVjMjEyYTZkMjI1NDcwM1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICB1bXVsaDogZnVuY3Rpb24gdW11bGgodSwgdil7XG4gICAgdmFyIFVJTlQxNiA9IDB4ZmZmZlxuICAgICAgLCAkdSA9ICt1XG4gICAgICAsICR2ID0gK3ZcbiAgICAgICwgdTAgPSAkdSAmIFVJTlQxNlxuICAgICAgLCB2MCA9ICR2ICYgVUlOVDE2XG4gICAgICAsIHUxID0gJHUgPj4+IDE2XG4gICAgICAsIHYxID0gJHYgPj4+IDE2XG4gICAgICAsIHQgID0gKHUxICogdjAgPj4+IDApICsgKHUwICogdjAgPj4+IDE2KTtcbiAgICByZXR1cm4gdTEgKiB2MSArICh0ID4+PiAxNikgKyAoKHUwICogdjEgPj4+IDApICsgKHQgJiBVSU5UMTYpID4+PiAxNik7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxyXG4gICwgYUZ1bmN0aW9uICAgICAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXHJcbiAgLCAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcclxuXHJcbi8vIEIuMi4yLjIgT2JqZWN0LnByb3RvdHlwZS5fX2RlZmluZUdldHRlcl9fKFAsIGdldHRlcilcclxucmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAkZXhwb3J0KCRleHBvcnQuUCArIHJlcXVpcmUoJy4vX29iamVjdC1mb3JjZWQtcGFtJyksICdPYmplY3QnLCB7XHJcbiAgX19kZWZpbmVHZXR0ZXJfXzogZnVuY3Rpb24gX19kZWZpbmVHZXR0ZXJfXyhQLCBnZXR0ZXIpe1xyXG4gICAgJGRlZmluZVByb3BlcnR5LmYodG9PYmplY3QodGhpcyksIFAsIHtnZXQ6IGFGdW5jdGlvbihnZXR0ZXIpLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9KTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxyXG4gICwgYUZ1bmN0aW9uICAgICAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXHJcbiAgLCAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcclxuXHJcbi8vIEIuMi4yLjMgT2JqZWN0LnByb3RvdHlwZS5fX2RlZmluZVNldHRlcl9fKFAsIHNldHRlcilcclxucmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAkZXhwb3J0KCRleHBvcnQuUCArIHJlcXVpcmUoJy4vX29iamVjdC1mb3JjZWQtcGFtJyksICdPYmplY3QnLCB7XHJcbiAgX19kZWZpbmVTZXR0ZXJfXzogZnVuY3Rpb24gX19kZWZpbmVTZXR0ZXJfXyhQLCBzZXR0ZXIpe1xyXG4gICAgJGRlZmluZVByb3BlcnR5LmYodG9PYmplY3QodGhpcyksIFAsIHtzZXQ6IGFGdW5jdGlvbihzZXR0ZXIpLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9KTtcclxuICB9XHJcbn0pOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC12YWx1ZXMtZW50cmllc1xudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkZW50cmllcyA9IHJlcXVpcmUoJy4vX29iamVjdC10by1hcnJheScpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcyhpdCl7XG4gICAgcmV0dXJuICRlbnRyaWVzKGl0KTtcbiAgfVxufSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvcnNcbnZhciAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgb3duS2V5cyAgICAgICAgPSByZXF1aXJlKCcuL19vd24ta2V5cycpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBnT1BEICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yczogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmplY3Qpe1xuICAgIHZhciBPICAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAgICwgZ2V0RGVzYyA9IGdPUEQuZlxuICAgICAgLCBrZXlzICAgID0gb3duS2V5cyhPKVxuICAgICAgLCByZXN1bHQgID0ge31cbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5LCBEO1xuICAgIHdoaWxlKGtleXMubGVuZ3RoID4gaSljcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGtleSA9IGtleXNbaSsrXSwgZ2V0RGVzYyhPLCBrZXkpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgdG9PYmplY3QgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcclxuICAsIHRvUHJpbWl0aXZlICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXHJcbiAgLCBnZXRQcm90b3R5cGVPZiAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcclxuICAsIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZjtcclxuXHJcbi8vIEIuMi4yLjQgT2JqZWN0LnByb3RvdHlwZS5fX2xvb2t1cEdldHRlcl9fKFApXHJcbnJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgJGV4cG9ydCgkZXhwb3J0LlAgKyByZXF1aXJlKCcuL19vYmplY3QtZm9yY2VkLXBhbScpLCAnT2JqZWN0Jywge1xyXG4gIF9fbG9va3VwR2V0dGVyX186IGZ1bmN0aW9uIF9fbG9va3VwR2V0dGVyX18oUCl7XHJcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpXHJcbiAgICAgICwgSyA9IHRvUHJpbWl0aXZlKFAsIHRydWUpXHJcbiAgICAgICwgRDtcclxuICAgIGRvIHtcclxuICAgICAgaWYoRCA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBLKSlyZXR1cm4gRC5nZXQ7XHJcbiAgICB9IHdoaWxlKE8gPSBnZXRQcm90b3R5cGVPZihPKSk7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgdG9PYmplY3QgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcclxuICAsIHRvUHJpbWl0aXZlICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXHJcbiAgLCBnZXRQcm90b3R5cGVPZiAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcclxuICAsIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZjtcclxuXHJcbi8vIEIuMi4yLjUgT2JqZWN0LnByb3RvdHlwZS5fX2xvb2t1cFNldHRlcl9fKFApXHJcbnJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgJGV4cG9ydCgkZXhwb3J0LlAgKyByZXF1aXJlKCcuL19vYmplY3QtZm9yY2VkLXBhbScpLCAnT2JqZWN0Jywge1xyXG4gIF9fbG9va3VwU2V0dGVyX186IGZ1bmN0aW9uIF9fbG9va3VwU2V0dGVyX18oUCl7XHJcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpXHJcbiAgICAgICwgSyA9IHRvUHJpbWl0aXZlKFAsIHRydWUpXHJcbiAgICAgICwgRDtcclxuICAgIGRvIHtcclxuICAgICAgaWYoRCA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBLKSlyZXR1cm4gRC5zZXQ7XHJcbiAgICB9IHdoaWxlKE8gPSBnZXRQcm90b3R5cGVPZihPKSk7XHJcbiAgfVxyXG59KTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkdmFsdWVzID0gcmVxdWlyZSgnLi9fb2JqZWN0LXRvLWFycmF5JykoZmFsc2UpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoaXQpe1xuICAgIHJldHVybiAkdmFsdWVzKGl0KTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemVucGFyc2luZy9lcy1vYnNlcnZhYmxlXHJcbnZhciAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXHJcbiAgLCBjb3JlICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxyXG4gICwgbWljcm90YXNrICAgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpXHJcbiAgLCBPQlNFUlZBQkxFICA9IHJlcXVpcmUoJy4vX3drcycpKCdvYnNlcnZhYmxlJylcclxuICAsIGFGdW5jdGlvbiAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXHJcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXHJcbiAgLCBhbkluc3RhbmNlICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcclxuICAsIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcclxuICAsIGhpZGUgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXHJcbiAgLCBmb3JPZiAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXHJcbiAgLCBSRVRVUk4gICAgICA9IGZvck9mLlJFVFVSTjtcclxuXHJcbnZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihmbil7XHJcbiAgcmV0dXJuIGZuID09IG51bGwgPyB1bmRlZmluZWQgOiBhRnVuY3Rpb24oZm4pO1xyXG59O1xyXG5cclxudmFyIGNsZWFudXBTdWJzY3JpcHRpb24gPSBmdW5jdGlvbihzdWJzY3JpcHRpb24pe1xyXG4gIHZhciBjbGVhbnVwID0gc3Vic2NyaXB0aW9uLl9jO1xyXG4gIGlmKGNsZWFudXApe1xyXG4gICAgc3Vic2NyaXB0aW9uLl9jID0gdW5kZWZpbmVkO1xyXG4gICAgY2xlYW51cCgpO1xyXG4gIH1cclxufTtcclxuXHJcbnZhciBzdWJzY3JpcHRpb25DbG9zZWQgPSBmdW5jdGlvbihzdWJzY3JpcHRpb24pe1xyXG4gIHJldHVybiBzdWJzY3JpcHRpb24uX28gPT09IHVuZGVmaW5lZDtcclxufTtcclxuXHJcbnZhciBjbG9zZVN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbil7XHJcbiAgaWYoIXN1YnNjcmlwdGlvbkNsb3NlZChzdWJzY3JpcHRpb24pKXtcclxuICAgIHN1YnNjcmlwdGlvbi5fbyA9IHVuZGVmaW5lZDtcclxuICAgIGNsZWFudXBTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtcclxuICB9XHJcbn07XHJcblxyXG52YXIgU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24ob2JzZXJ2ZXIsIHN1YnNjcmliZXIpe1xyXG4gIGFuT2JqZWN0KG9ic2VydmVyKTtcclxuICB0aGlzLl9jID0gdW5kZWZpbmVkO1xyXG4gIHRoaXMuX28gPSBvYnNlcnZlcjtcclxuICBvYnNlcnZlciA9IG5ldyBTdWJzY3JpcHRpb25PYnNlcnZlcih0aGlzKTtcclxuICB0cnkge1xyXG4gICAgdmFyIGNsZWFudXAgICAgICA9IHN1YnNjcmliZXIob2JzZXJ2ZXIpXHJcbiAgICAgICwgc3Vic2NyaXB0aW9uID0gY2xlYW51cDtcclxuICAgIGlmKGNsZWFudXAgIT0gbnVsbCl7XHJcbiAgICAgIGlmKHR5cGVvZiBjbGVhbnVwLnVuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nKWNsZWFudXAgPSBmdW5jdGlvbigpeyBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTsgfTtcclxuICAgICAgZWxzZSBhRnVuY3Rpb24oY2xlYW51cCk7XHJcbiAgICAgIHRoaXMuX2MgPSBjbGVhbnVwO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2goZSl7XHJcbiAgICBvYnNlcnZlci5lcnJvcihlKTtcclxuICAgIHJldHVybjtcclxuICB9IGlmKHN1YnNjcmlwdGlvbkNsb3NlZCh0aGlzKSljbGVhbnVwU3Vic2NyaXB0aW9uKHRoaXMpO1xyXG59O1xyXG5cclxuU3Vic2NyaXB0aW9uLnByb3RvdHlwZSA9IHJlZGVmaW5lQWxsKHt9LCB7XHJcbiAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCl7IGNsb3NlU3Vic2NyaXB0aW9uKHRoaXMpOyB9XHJcbn0pO1xyXG5cclxudmFyIFN1YnNjcmlwdGlvbk9ic2VydmVyID0gZnVuY3Rpb24oc3Vic2NyaXB0aW9uKXtcclxuICB0aGlzLl9zID0gc3Vic2NyaXB0aW9uO1xyXG59O1xyXG5cclxuU3Vic2NyaXB0aW9uT2JzZXJ2ZXIucHJvdG90eXBlID0gcmVkZWZpbmVBbGwoe30sIHtcclxuICBuZXh0OiBmdW5jdGlvbiBuZXh0KHZhbHVlKXtcclxuICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLl9zO1xyXG4gICAgaWYoIXN1YnNjcmlwdGlvbkNsb3NlZChzdWJzY3JpcHRpb24pKXtcclxuICAgICAgdmFyIG9ic2VydmVyID0gc3Vic2NyaXB0aW9uLl9vO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhciBtID0gZ2V0TWV0aG9kKG9ic2VydmVyLm5leHQpO1xyXG4gICAgICAgIGlmKG0pcmV0dXJuIG0uY2FsbChvYnNlcnZlciwgdmFsdWUpO1xyXG4gICAgICB9IGNhdGNoKGUpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjbG9zZVN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKHZhbHVlKXtcclxuICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLl9zO1xyXG4gICAgaWYoc3Vic2NyaXB0aW9uQ2xvc2VkKHN1YnNjcmlwdGlvbikpdGhyb3cgdmFsdWU7XHJcbiAgICB2YXIgb2JzZXJ2ZXIgPSBzdWJzY3JpcHRpb24uX287XHJcbiAgICBzdWJzY3JpcHRpb24uX28gPSB1bmRlZmluZWQ7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgbSA9IGdldE1ldGhvZChvYnNlcnZlci5lcnJvcik7XHJcbiAgICAgIGlmKCFtKXRocm93IHZhbHVlO1xyXG4gICAgICB2YWx1ZSA9IG0uY2FsbChvYnNlcnZlciwgdmFsdWUpO1xyXG4gICAgfSBjYXRjaChlKXtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjbGVhbnVwU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbik7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfSBjbGVhbnVwU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbik7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfSxcclxuICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUodmFsdWUpe1xyXG4gICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRoaXMuX3M7XHJcbiAgICBpZighc3Vic2NyaXB0aW9uQ2xvc2VkKHN1YnNjcmlwdGlvbikpe1xyXG4gICAgICB2YXIgb2JzZXJ2ZXIgPSBzdWJzY3JpcHRpb24uX287XHJcbiAgICAgIHN1YnNjcmlwdGlvbi5fbyA9IHVuZGVmaW5lZDtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgbSA9IGdldE1ldGhvZChvYnNlcnZlci5jb21wbGV0ZSk7XHJcbiAgICAgICAgdmFsdWUgPSBtID8gbS5jYWxsKG9ic2VydmVyLCB2YWx1ZSkgOiB1bmRlZmluZWQ7XHJcbiAgICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNsZWFudXBTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2xlYW51cFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pO1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbnZhciAkT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIE9ic2VydmFibGUoc3Vic2NyaWJlcil7XHJcbiAgYW5JbnN0YW5jZSh0aGlzLCAkT2JzZXJ2YWJsZSwgJ09ic2VydmFibGUnLCAnX2YnKS5fZiA9IGFGdW5jdGlvbihzdWJzY3JpYmVyKTtcclxufTtcclxuXHJcbnJlZGVmaW5lQWxsKCRPYnNlcnZhYmxlLnByb3RvdHlwZSwge1xyXG4gIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKXtcclxuICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uKG9ic2VydmVyLCB0aGlzLl9mKTtcclxuICB9LFxyXG4gIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goZm4pe1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyAoY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICBhRnVuY3Rpb24oZm4pO1xyXG4gICAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGhhdC5zdWJzY3JpYmUoe1xyXG4gICAgICAgIG5leHQgOiBmdW5jdGlvbih2YWx1ZSl7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm4odmFsdWUpO1xyXG4gICAgICAgICAgfSBjYXRjaChlKXtcclxuICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiByZWplY3QsXHJcbiAgICAgICAgY29tcGxldGU6IHJlc29sdmVcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxucmVkZWZpbmVBbGwoJE9ic2VydmFibGUsIHtcclxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKHgpe1xyXG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiAkT2JzZXJ2YWJsZTtcclxuICAgIHZhciBtZXRob2QgPSBnZXRNZXRob2QoYW5PYmplY3QoeClbT0JTRVJWQUJMRV0pO1xyXG4gICAgaWYobWV0aG9kKXtcclxuICAgICAgdmFyIG9ic2VydmFibGUgPSBhbk9iamVjdChtZXRob2QuY2FsbCh4KSk7XHJcbiAgICAgIHJldHVybiBvYnNlcnZhYmxlLmNvbnN0cnVjdG9yID09PSBDID8gb2JzZXJ2YWJsZSA6IG5ldyBDKGZ1bmN0aW9uKG9ic2VydmVyKXtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbihvYnNlcnZlcil7XHJcbiAgICAgIHZhciBkb25lID0gZmFsc2U7XHJcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCFkb25lKXtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmKGZvck9mKHgsIGZhbHNlLCBmdW5jdGlvbihpdCl7XHJcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChpdCk7XHJcbiAgICAgICAgICAgICAgaWYoZG9uZSlyZXR1cm4gUkVUVVJOO1xyXG4gICAgICAgICAgICB9KSA9PT0gUkVUVVJOKXJldHVybjtcclxuICAgICAgICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGlmKGRvbmUpdGhyb3cgZTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH0gb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKXsgZG9uZSA9IHRydWU7IH07XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9mOiBmdW5jdGlvbiBvZigpe1xyXG4gICAgZm9yKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGgsIGl0ZW1zID0gQXJyYXkobCk7IGkgPCBsOylpdGVtc1tpXSA9IGFyZ3VtZW50c1tpKytdO1xyXG4gICAgcmV0dXJuIG5ldyAodHlwZW9mIHRoaXMgPT09ICdmdW5jdGlvbicgPyB0aGlzIDogJE9ic2VydmFibGUpKGZ1bmN0aW9uKG9ic2VydmVyKXtcclxuICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcclxuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoIWRvbmUpe1xyXG4gICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKXtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChpdGVtc1tpXSk7XHJcbiAgICAgICAgICAgIGlmKGRvbmUpcmV0dXJuO1xyXG4gICAgICAgICAgfSBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbigpeyBkb25lID0gdHJ1ZTsgfTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5oaWRlKCRPYnNlcnZhYmxlLnByb3RvdHlwZSwgT0JTRVJWQUJMRSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LkcsIHtPYnNlcnZhYmxlOiAkT2JzZXJ2YWJsZX0pO1xyXG5cclxucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKSgnT2JzZXJ2YWJsZScpOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXlcbiAgLCBvcmRpbmFyeURlZmluZU93bk1ldGFkYXRhID0gbWV0YWRhdGEuc2V0O1xuXG5tZXRhZGF0YS5leHAoe2RlZmluZU1ldGFkYXRhOiBmdW5jdGlvbiBkZWZpbmVNZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCB0YXJnZXRLZXkpe1xuICBvcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCBhbk9iamVjdCh0YXJnZXQpLCB0b01ldGFLZXkodGFyZ2V0S2V5KSk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleVxuICAsIGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAgPSBtZXRhZGF0YS5tYXBcbiAgLCBzdG9yZSAgICAgICAgICAgICAgICAgID0gbWV0YWRhdGEuc3RvcmU7XG5cbm1ldGFkYXRhLmV4cCh7ZGVsZXRlTWV0YWRhdGE6IGZ1bmN0aW9uIGRlbGV0ZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHZhciB0YXJnZXRLZXkgICA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdW5kZWZpbmVkIDogdG9NZXRhS2V5KGFyZ3VtZW50c1syXSlcbiAgICAsIG1ldGFkYXRhTWFwID0gZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcChhbk9iamVjdCh0YXJnZXQpLCB0YXJnZXRLZXksIGZhbHNlKTtcbiAgaWYobWV0YWRhdGFNYXAgPT09IHVuZGVmaW5lZCB8fCAhbWV0YWRhdGFNYXBbJ2RlbGV0ZSddKG1ldGFkYXRhS2V5KSlyZXR1cm4gZmFsc2U7XG4gIGlmKG1ldGFkYXRhTWFwLnNpemUpcmV0dXJuIHRydWU7XG4gIHZhciB0YXJnZXRNZXRhZGF0YSA9IHN0b3JlLmdldCh0YXJnZXQpO1xuICB0YXJnZXRNZXRhZGF0YVsnZGVsZXRlJ10odGFyZ2V0S2V5KTtcbiAgcmV0dXJuICEhdGFyZ2V0TWV0YWRhdGEuc2l6ZSB8fCBzdG9yZVsnZGVsZXRlJ10odGFyZ2V0KTtcbn19KTsiLCJ2YXIgU2V0ICAgICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2VzNi5zZXQnKVxuICAsIGZyb20gICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktZnJvbS1pdGVyYWJsZScpXG4gICwgbWV0YWRhdGEgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldFByb3RvdHlwZU9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgb3JkaW5hcnlPd25NZXRhZGF0YUtleXMgPSBtZXRhZGF0YS5rZXlzXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbnZhciBvcmRpbmFyeU1ldGFkYXRhS2V5cyA9IGZ1bmN0aW9uKE8sIFApe1xuICB2YXIgb0tleXMgID0gb3JkaW5hcnlPd25NZXRhZGF0YUtleXMoTywgUClcbiAgICAsIHBhcmVudCA9IGdldFByb3RvdHlwZU9mKE8pO1xuICBpZihwYXJlbnQgPT09IG51bGwpcmV0dXJuIG9LZXlzO1xuICB2YXIgcEtleXMgID0gb3JkaW5hcnlNZXRhZGF0YUtleXMocGFyZW50LCBQKTtcbiAgcmV0dXJuIHBLZXlzLmxlbmd0aCA/IG9LZXlzLmxlbmd0aCA/IGZyb20obmV3IFNldChvS2V5cy5jb25jYXQocEtleXMpKSkgOiBwS2V5cyA6IG9LZXlzO1xufTtcblxubWV0YWRhdGEuZXhwKHtnZXRNZXRhZGF0YUtleXM6IGZ1bmN0aW9uIGdldE1ldGFkYXRhS2V5cyh0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHJldHVybiBvcmRpbmFyeU1ldGFkYXRhS2V5cyhhbk9iamVjdCh0YXJnZXQpLCBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMV0pKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRQcm90b3R5cGVPZiAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgb3JkaW5hcnlIYXNPd25NZXRhZGF0YSA9IG1ldGFkYXRhLmhhc1xuICAsIG9yZGluYXJ5R2V0T3duTWV0YWRhdGEgPSBtZXRhZGF0YS5nZXRcbiAgLCB0b01ldGFLZXkgICAgICAgICAgICAgID0gbWV0YWRhdGEua2V5O1xuXG52YXIgb3JkaW5hcnlHZXRNZXRhZGF0YSA9IGZ1bmN0aW9uKE1ldGFkYXRhS2V5LCBPLCBQKXtcbiAgdmFyIGhhc093biA9IG9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xuICBpZihoYXNPd24pcmV0dXJuIG9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xuICB2YXIgcGFyZW50ID0gZ2V0UHJvdG90eXBlT2YoTyk7XG4gIHJldHVybiBwYXJlbnQgIT09IG51bGwgPyBvcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBwYXJlbnQsIFApIDogdW5kZWZpbmVkO1xufTtcblxubWV0YWRhdGEuZXhwKHtnZXRNZXRhZGF0YTogZnVuY3Rpb24gZ2V0TWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCAvKiwgdGFyZ2V0S2V5ICovKXtcbiAgcmV0dXJuIG9yZGluYXJ5R2V0TWV0YWRhdGEobWV0YWRhdGFLZXksIGFuT2JqZWN0KHRhcmdldCksIGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdW5kZWZpbmVkIDogdG9NZXRhS2V5KGFyZ3VtZW50c1syXSkpO1xufX0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgb3JkaW5hcnlPd25NZXRhZGF0YUtleXMgPSBtZXRhZGF0YS5rZXlzXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbm1ldGFkYXRhLmV4cCh7Z2V0T3duTWV0YWRhdGFLZXlzOiBmdW5jdGlvbiBnZXRPd25NZXRhZGF0YUtleXModGFyZ2V0IC8qLCB0YXJnZXRLZXkgKi8pe1xuICByZXR1cm4gb3JkaW5hcnlPd25NZXRhZGF0YUtleXMoYW5PYmplY3QodGFyZ2V0KSwgYXJndW1lbnRzLmxlbmd0aCA8IDIgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzFdKSk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgb3JkaW5hcnlHZXRPd25NZXRhZGF0YSA9IG1ldGFkYXRhLmdldFxuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbm1ldGFkYXRhLmV4cCh7Z2V0T3duTWV0YWRhdGE6IGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHJldHVybiBvcmRpbmFyeUdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBhbk9iamVjdCh0YXJnZXQpXG4gICAgLCBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMl0pKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRQcm90b3R5cGVPZiAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgb3JkaW5hcnlIYXNPd25NZXRhZGF0YSA9IG1ldGFkYXRhLmhhc1xuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbnZhciBvcmRpbmFyeUhhc01ldGFkYXRhID0gZnVuY3Rpb24oTWV0YWRhdGFLZXksIE8sIFApe1xuICB2YXIgaGFzT3duID0gb3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XG4gIGlmKGhhc093bilyZXR1cm4gdHJ1ZTtcbiAgdmFyIHBhcmVudCA9IGdldFByb3RvdHlwZU9mKE8pO1xuICByZXR1cm4gcGFyZW50ICE9PSBudWxsID8gb3JkaW5hcnlIYXNNZXRhZGF0YShNZXRhZGF0YUtleSwgcGFyZW50LCBQKSA6IGZhbHNlO1xufTtcblxubWV0YWRhdGEuZXhwKHtoYXNNZXRhZGF0YTogZnVuY3Rpb24gaGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCAvKiwgdGFyZ2V0S2V5ICovKXtcbiAgcmV0dXJuIG9yZGluYXJ5SGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIGFuT2JqZWN0KHRhcmdldCksIGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdW5kZWZpbmVkIDogdG9NZXRhS2V5KGFyZ3VtZW50c1syXSkpO1xufX0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIG9yZGluYXJ5SGFzT3duTWV0YWRhdGEgPSBtZXRhZGF0YS5oYXNcbiAgLCB0b01ldGFLZXkgICAgICAgICAgICAgID0gbWV0YWRhdGEua2V5O1xuXG5tZXRhZGF0YS5leHAoe2hhc093bk1ldGFkYXRhOiBmdW5jdGlvbiBoYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0IC8qLCB0YXJnZXRLZXkgKi8pe1xuICByZXR1cm4gb3JkaW5hcnlIYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgYW5PYmplY3QodGFyZ2V0KVxuICAgICwgYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzJdKSk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXlcbiAgLCBvcmRpbmFyeURlZmluZU93bk1ldGFkYXRhID0gbWV0YWRhdGEuc2V0O1xuXG5tZXRhZGF0YS5leHAoe21ldGFkYXRhOiBmdW5jdGlvbiBtZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSl7XG4gIHJldHVybiBmdW5jdGlvbiBkZWNvcmF0b3IodGFyZ2V0LCB0YXJnZXRLZXkpe1xuICAgIG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEoXG4gICAgICBtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSxcbiAgICAgICh0YXJnZXRLZXkgIT09IHVuZGVmaW5lZCA/IGFuT2JqZWN0IDogYUZ1bmN0aW9uKSh0YXJnZXQpLFxuICAgICAgdG9NZXRhS2V5KHRhcmdldEtleSlcbiAgICApO1xuICB9O1xufX0pOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1NldCcsIHt0b0pTT046IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tdG8tanNvbicpKCdTZXQnKX0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkYXQgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICBhdDogZnVuY3Rpb24gYXQocG9zKXtcbiAgICByZXR1cm4gJGF0KHRoaXMsIHBvcyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9TdHJpbmcucHJvdG90eXBlLm1hdGNoQWxsL1xyXG52YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgZGVmaW5lZCAgICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcclxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcclxuICAsIGlzUmVnRXhwICAgID0gcmVxdWlyZSgnLi9faXMtcmVnZXhwJylcclxuICAsIGdldEZsYWdzICAgID0gcmVxdWlyZSgnLi9fZmxhZ3MnKVxyXG4gICwgUmVnRXhwUHJvdG8gPSBSZWdFeHAucHJvdG90eXBlO1xyXG5cclxudmFyICRSZWdFeHBTdHJpbmdJdGVyYXRvciA9IGZ1bmN0aW9uKHJlZ2V4cCwgc3RyaW5nKXtcclxuICB0aGlzLl9yID0gcmVnZXhwO1xyXG4gIHRoaXMuX3MgPSBzdHJpbmc7XHJcbn07XHJcblxyXG5yZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpKCRSZWdFeHBTdHJpbmdJdGVyYXRvciwgJ1JlZ0V4cCBTdHJpbmcnLCBmdW5jdGlvbiBuZXh0KCl7XHJcbiAgdmFyIG1hdGNoID0gdGhpcy5fci5leGVjKHRoaXMuX3MpO1xyXG4gIHJldHVybiB7dmFsdWU6IG1hdGNoLCBkb25lOiBtYXRjaCA9PT0gbnVsbH07XHJcbn0pO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XHJcbiAgbWF0Y2hBbGw6IGZ1bmN0aW9uIG1hdGNoQWxsKHJlZ2V4cCl7XHJcbiAgICBkZWZpbmVkKHRoaXMpO1xyXG4gICAgaWYoIWlzUmVnRXhwKHJlZ2V4cCkpdGhyb3cgVHlwZUVycm9yKHJlZ2V4cCArICcgaXMgbm90IGEgcmVnZXhwIScpO1xyXG4gICAgdmFyIFMgICAgID0gU3RyaW5nKHRoaXMpXHJcbiAgICAgICwgZmxhZ3MgPSAnZmxhZ3MnIGluIFJlZ0V4cFByb3RvID8gU3RyaW5nKHJlZ2V4cC5mbGFncykgOiBnZXRGbGFncy5jYWxsKHJlZ2V4cClcclxuICAgICAgLCByeCAgICA9IG5ldyBSZWdFeHAocmVnZXhwLnNvdXJjZSwgfmZsYWdzLmluZGV4T2YoJ2cnKSA/IGZsYWdzIDogJ2cnICsgZmxhZ3MpO1xyXG4gICAgcngubGFzdEluZGV4ID0gdG9MZW5ndGgocmVnZXhwLmxhc3RJbmRleCk7XHJcbiAgICByZXR1cm4gbmV3ICRSZWdFeHBTdHJpbmdJdGVyYXRvcihyeCwgUyk7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1zdHJpbmctcGFkLXN0YXJ0LWVuZFxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRwYWQgICAgPSByZXF1aXJlKCcuL19zdHJpbmctcGFkJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICBwYWRFbmQ6IGZ1bmN0aW9uIHBhZEVuZChtYXhMZW5ndGggLyosIGZpbGxTdHJpbmcgPSAnICcgKi8pe1xuICAgIHJldHVybiAkcGFkKHRoaXMsIG1heExlbmd0aCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIGZhbHNlKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtc3RyaW5nLXBhZC1zdGFydC1lbmRcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkcGFkICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXBhZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ1N0cmluZycsIHtcbiAgcGFkU3RhcnQ6IGZ1bmN0aW9uIHBhZFN0YXJ0KG1heExlbmd0aCAvKiwgZmlsbFN0cmluZyA9ICcgJyAqLyl7XG4gICAgcmV0dXJuICRwYWQodGhpcywgbWF4TGVuZ3RoLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zZWJtYXJrYmFnZS9lY21hc2NyaXB0LXN0cmluZy1sZWZ0LXJpZ2h0LXRyaW1cbnJlcXVpcmUoJy4vX3N0cmluZy10cmltJykoJ3RyaW1MZWZ0JywgZnVuY3Rpb24oJHRyaW0pe1xuICByZXR1cm4gZnVuY3Rpb24gdHJpbUxlZnQoKXtcbiAgICByZXR1cm4gJHRyaW0odGhpcywgMSk7XG4gIH07XG59LCAndHJpbVN0YXJ0Jyk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NlYm1hcmtiYWdlL2VjbWFzY3JpcHQtc3RyaW5nLWxlZnQtcmlnaHQtdHJpbVxucmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKSgndHJpbVJpZ2h0JywgZnVuY3Rpb24oJHRyaW0pe1xuICByZXR1cm4gZnVuY3Rpb24gdHJpbVJpZ2h0KCl7XG4gICAgcmV0dXJuICR0cmltKHRoaXMsIDIpO1xuICB9O1xufSwgJ3RyaW1FbmQnKTsiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTsiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ29ic2VydmFibGUnKTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL3Byb3Bvc2FsLWdsb2JhbFxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdTeXN0ZW0nLCB7Z2xvYmFsOiByZXF1aXJlKCcuL19nbG9iYWwnKX0pOyIsInZhciAkaXRlcmF0b3JzICAgID0gcmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKVxuICAsIHJlZGVmaW5lICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHdrcyAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAsIElURVJBVE9SICAgICAgPSB3a3MoJ2l0ZXJhdG9yJylcbiAgLCBUT19TVFJJTkdfVEFHID0gd2tzKCd0b1N0cmluZ1RhZycpXG4gICwgQXJyYXlWYWx1ZXMgICA9IEl0ZXJhdG9ycy5BcnJheTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlXG4gICAgLCBrZXk7XG4gIGlmKHByb3RvKXtcbiAgICBpZighcHJvdG9bSVRFUkFUT1JdKWhpZGUocHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gICAgaWYoIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICAgIEl0ZXJhdG9yc1tOQU1FXSA9IEFycmF5VmFsdWVzO1xuICAgIGZvcihrZXkgaW4gJGl0ZXJhdG9ycylpZighcHJvdG9ba2V5XSlyZWRlZmluZShwcm90bywga2V5LCAkaXRlcmF0b3JzW2tleV0sIHRydWUpO1xuICB9XG59IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICR0YXNrICAgPSByZXF1aXJlKCcuL190YXNrJyk7XG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuQiwge1xuICBzZXRJbW1lZGlhdGU6ICAgJHRhc2suc2V0LFxuICBjbGVhckltbWVkaWF0ZTogJHRhc2suY2xlYXJcbn0pOyIsIi8vIGllOS0gc2V0VGltZW91dCAmIHNldEludGVydmFsIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmaXhcbnZhciBnbG9iYWwgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCAkZXhwb3J0ICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBpbnZva2UgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBwYXJ0aWFsICAgID0gcmVxdWlyZSgnLi9fcGFydGlhbCcpXG4gICwgbmF2aWdhdG9yICA9IGdsb2JhbC5uYXZpZ2F0b3JcbiAgLCBNU0lFICAgICAgID0gISFuYXZpZ2F0b3IgJiYgL01TSUUgLlxcLi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTsgLy8gPC0gZGlydHkgaWU5LSBjaGVja1xudmFyIHdyYXAgPSBmdW5jdGlvbihzZXQpe1xuICByZXR1cm4gTVNJRSA/IGZ1bmN0aW9uKGZuLCB0aW1lIC8qLCAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gc2V0KGludm9rZShcbiAgICAgIHBhcnRpYWwsXG4gICAgICBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksXG4gICAgICB0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pXG4gICAgKSwgdGltZSk7XG4gIH0gOiBzZXQ7XG59O1xuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LkIgKyAkZXhwb3J0LkYgKiBNU0lFLCB7XG4gIHNldFRpbWVvdXQ6ICB3cmFwKGdsb2JhbC5zZXRUaW1lb3V0KSxcbiAgc2V0SW50ZXJ2YWw6IHdyYXAoZ2xvYmFsLnNldEludGVydmFsKVxufSk7IiwicmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydGllcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnNlYWwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnByZXZlbnQtZXh0ZW5zaW9ucycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuaXMtZnJvemVuJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1zZWFsZWQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmlzLWV4dGVuc2libGUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuaXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5mdW5jdGlvbi5iaW5kJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmZ1bmN0aW9uLm5hbWUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZnVuY3Rpb24uaGFzLWluc3RhbmNlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnBhcnNlLWludCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5wYXJzZS1mbG9hdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuY29uc3RydWN0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLnRvLWZpeGVkJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci50by1wcmVjaXNpb24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLmVwc2lsb24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLmlzLWZpbml0ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuaXMtaW50ZWdlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuaXMtbmFuJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5pcy1zYWZlLWludGVnZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLm1heC1zYWZlLWludGVnZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLm1pbi1zYWZlLWludGVnZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLnBhcnNlLWZsb2F0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5wYXJzZS1pbnQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5hY29zaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmFzaW5oJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguYXRhbmgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5jYnJ0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguY2x6MzInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5jb3NoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguZXhwbTEnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5mcm91bmQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5oeXBvdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmltdWwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5sb2cxMCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmxvZzFwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGgubG9nMicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLnNpZ24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5zaW5oJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGgudGFuaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLnRydW5jJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnJhdycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcudHJpbScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmNvZGUtcG9pbnQtYXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmVuZHMtd2l0aCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuaW5jbHVkZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnJlcGVhdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuc3RhcnRzLXdpdGgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmFuY2hvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuYmlnJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5ibGluaycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuYm9sZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuZml4ZWQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmZvbnRjb2xvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuZm9udHNpemUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLml0YWxpY3MnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmxpbmsnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnNtYWxsJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5zdHJpa2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnN1YicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuc3VwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmRhdGUubm93Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmRhdGUudG8tanNvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5kYXRlLnRvLWlzby1zdHJpbmcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZGF0ZS50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZGF0ZS50by1wcmltaXRpdmUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuaXMtYXJyYXknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5vZicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5qb2luJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnNsaWNlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnNvcnQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZm9yLWVhY2gnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkubWFwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZpbHRlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5zb21lJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmV2ZXJ5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnJlZHVjZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5yZWR1Y2UtcmlnaHQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuaW5kZXgtb2YnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkubGFzdC1pbmRleC1vZicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5jb3B5LXdpdGhpbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5maWxsJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZpbmQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5zcGVjaWVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZ2V4cC5jb25zdHJ1Y3RvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZ2V4cC5mbGFncycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAubWF0Y2gnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwLnJlcGxhY2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwLnNlYXJjaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAuc3BsaXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc2V0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LndlYWstbWFwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LndlYWstc2V0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLmFycmF5LWJ1ZmZlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC5kYXRhLXZpZXcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYudHlwZWQuaW50OC1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC51aW50OC1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC51aW50OC1jbGFtcGVkLWFycmF5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLmludDE2LWFycmF5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQxNi1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC5pbnQzMi1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC51aW50MzItYXJyYXknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYudHlwZWQuZmxvYXQzMi1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC5mbG9hdDY0LWFycmF5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QuYXBwbHknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5jb25zdHJ1Y3QnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5kZWxldGUtcHJvcGVydHknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5lbnVtZXJhdGUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5nZXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QuaGFzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QuaXMtZXh0ZW5zaWJsZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0Lm93bi1rZXlzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QucHJldmVudC1leHRlbnNpb25zJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LXByb3RvdHlwZS1vZicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5hcnJheS5pbmNsdWRlcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcuYXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc3RyaW5nLnBhZC1zdGFydCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcucGFkLWVuZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcudHJpbS1sZWZ0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy50cmltLXJpZ2h0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy5tYXRjaC1hbGwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JqZWN0LmVudHJpZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JqZWN0LmRlZmluZS1nZXR0ZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JqZWN0LmRlZmluZS1zZXR0ZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JqZWN0Lmxvb2t1cC1nZXR0ZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JqZWN0Lmxvb2t1cC1zZXR0ZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcubWFwLnRvLWpzb24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc2V0LnRvLWpzb24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc3lzdGVtLmdsb2JhbCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5lcnJvci5pcy1lcnJvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5tYXRoLmlhZGRoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm1hdGguaXN1YmgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcubWF0aC5pbXVsaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5tYXRoLnVtdWxoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnJlZmxlY3QuZGVmaW5lLW1ldGFkYXRhJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnJlZmxlY3QuZGVsZXRlLW1ldGFkYXRhJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnJlZmxlY3QuZ2V0LW1ldGFkYXRhJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnJlZmxlY3QuZ2V0LW1ldGFkYXRhLWtleXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtb3duLW1ldGFkYXRhJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnJlZmxlY3QuZ2V0LW93bi1tZXRhZGF0YS1rZXlzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnJlZmxlY3QuaGFzLW1ldGFkYXRhJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnJlZmxlY3QuaGFzLW93bi1tZXRhZGF0YScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWZsZWN0Lm1ldGFkYXRhJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LmFzYXAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JzZXJ2YWJsZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL3dlYi50aW1lcnMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy93ZWIuaW1tZWRpYXRlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL21vZHVsZXMvX2NvcmUnKTsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvbWFzdGVyL0xJQ0VOU0UgZmlsZS4gQW5cbiAqIGFkZGl0aW9uYWwgZ3JhbnQgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpblxuICogdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKChvdXRlckZuIHx8IEdlbmVyYXRvcikucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBydW50aW1lLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGB2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnRgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLiBTb21lIG1heSBjb25zaWRlciB0aGUgbmFtZSBvZiB0aGlzIG1ldGhvZCB0b29cbiAgLy8gY3V0ZXN5LCBidXQgdGhleSBhcmUgY3VybXVkZ2VvbnMuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gbmV3IEF3YWl0QXJndW1lbnQoYXJnKTtcbiAgfTtcblxuICBmdW5jdGlvbiBBd2FpdEFyZ3VtZW50KGFyZykge1xuICAgIHRoaXMuYXJnID0gYXJnO1xuICB9XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBd2FpdEFyZ3VtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5hcmcpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgICAvLyByZXN1bHQgZm9yIHRoaXMgaXRlcmF0aW9uIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgc2FtZVxuICAgICAgICAgIC8vIHJlYXNvbi4gTm90ZSB0aGF0IHJlamVjdGlvbnMgb2YgeWllbGRlZCBQcm9taXNlcyBhcmUgbm90XG4gICAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAgIC8vIHdoZW4gYW4gYXdhaXRlZCBQcm9taXNlIGlzIHJlamVjdGVkLiBUaGlzIGRpZmZlcmVuY2UgaW5cbiAgICAgICAgICAvLyBiZWhhdmlvciBiZXR3ZWVuIHlpZWxkIGFuZCBhd2FpdCBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaXRcbiAgICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgICAvLyByZWplY3Rpb24gKHN3YWxsb3cgaXQgYW5kIGNvbnRpbnVlLCBtYW51YWxseSAudGhyb3cgaXQgYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGdlbmVyYXRvciwgYWJhbmRvbiBpdGVyYXRpb24sIHdoYXRldmVyKS4gV2l0aFxuICAgICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgICAvLyByZWplY3Rpb24gcmVhc29uIG91dHNpZGUgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgc28gdGhlXG4gICAgICAgICAgLy8gb25seSBvcHRpb24gaXMgdG8gdGhyb3cgaXQgZnJvbSB0aGUgYXdhaXQgZXhwcmVzc2lvbiwgYW5kXG4gICAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgIGludm9rZSA9IHByb2Nlc3MuZG9tYWluLmJpbmQoaW52b2tlKTtcbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIiB8fFxuICAgICAgICAgICAgICAobWV0aG9kID09PSBcInRocm93XCIgJiYgZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgLy8gQSByZXR1cm4gb3IgdGhyb3cgKHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyB0aHJvd1xuICAgICAgICAgICAgLy8gbWV0aG9kKSBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgICAgdmFyIHJldHVybk1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdO1xuICAgICAgICAgICAgaWYgKHJldHVybk1ldGhvZCkge1xuICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gocmV0dXJuTWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgYXJnKTtcbiAgICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmV0dXJuIG1ldGhvZCB0aHJldyBhbiBleGNlcHRpb24sIGxldCB0aGF0XG4gICAgICAgICAgICAgICAgLy8gZXhjZXB0aW9uIHByZXZhaWwgb3ZlciB0aGUgb3JpZ2luYWwgcmV0dXJuIG9yIHRocm93LlxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICAgICAgLy8gQ29udGludWUgd2l0aCB0aGUgb3V0ZXIgcmV0dXJuLCBub3cgdGhhdCB0aGUgZGVsZWdhdGVcbiAgICAgICAgICAgICAgLy8gaXRlcmF0b3IgaGFzIGJlZW4gdGVybWluYXRlZC5cbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSxcbiAgICAgICAgICAgIGRlbGVnYXRlLml0ZXJhdG9yLFxuICAgICAgICAgICAgYXJnXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTGlrZSByZXR1cm5pbmcgZ2VuZXJhdG9yLnRocm93KHVuY2F1Z2h0KSwgYnV0IHdpdGhvdXQgdGhlXG4gICAgICAgICAgICAvLyBvdmVyaGVhZCBvZiBhbiBleHRyYSBmdW5jdGlvbiBjYWxsLlxuICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERlbGVnYXRlIGdlbmVyYXRvciByYW4gYW5kIGhhbmRsZWQgaXRzIG93biBleGNlcHRpb25zIHNvXG4gICAgICAgICAgLy8gcmVnYXJkbGVzcyBvZiB3aGF0IHRoZSBtZXRob2Qgd2FzLCB3ZSBjb250aW51ZSBhcyBpZiBpdCBpc1xuICAgICAgICAgIC8vIFwibmV4dFwiIHdpdGggYW4gdW5kZWZpbmVkIGFyZy5cbiAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG4gICAgICAgICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBhcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIHZhciBpbmZvID0ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LmRlbGVnYXRlICYmIG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gQW1vbmcgdGhlIHZhcmlvdXMgdHJpY2tzIGZvciBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbFxuICAvLyBvYmplY3QsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIG1vc3QgcmVsaWFibGUgdGVjaG5pcXVlIHRoYXQgZG9lcyBub3RcbiAgLy8gdXNlIGluZGlyZWN0IGV2YWwgKHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5KS5cbiAgdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6XG4gIHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgPyB3aW5kb3cgOlxuICB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiA/IHNlbGYgOiB0aGlzXG4pO1xuIiwiaW1wb3J0IFwiYmFiZWwtcG9seWZpbGxcIjtcbmltcG9ydCBDb250ZW50IGZyb20gXCIuL21vZHVsZXMvY29udGVudFwiO1xuaW1wb3J0IFRvb2xib3ggZnJvbSBcIi4vbW9kdWxlcy90b29sYm94XCI7XG5cbiQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcbmNvbnN0IGVkaXRhYmxlQXJlYSA9ICQoXCIjZWRpdGFibGUtYXJlYVwiKTtcbmNvbnN0IHRvb2xzID0gJChcIiN0b29sYm94XCIpO1xuXG5Db250ZW50KGVkaXRhYmxlQXJlYSk7XG5Ub29sYm94KHRvb2xzKTtcblxuLy8gVE9ETzogQWRkIHRhZ3M6IHRhYmxlcywgbGlzdHMsIGZvcm1zLCB2aWRlb3MsIGF1ZGlvLCBvYmplY3RzXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgdW5lZWsgb24gMDgvMDYvMTYuXG4gKi9cblxubGV0IGluc3RhbmNlID0gbnVsbDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5b3V0IHtcbiAgY29uc3RydWN0b3Iocm93LCBjb2x1bW4pIHtcbiAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICBpbnN0YW5jZSA9IHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5fbV9yb3cgPSByb3c7XG4gICAgdGhpcy5fbV9jb2x1bW4gPSBjb2x1bW47XG4gICAgdGhpcy5fbV90aW1lID0gbmV3IERhdGUoKTtcblxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIGdldCByb3coKSB7XG4gICAgcmV0dXJuIHRoaXMuX21fcm93O1xuICB9XG5cbiAgc2V0IHJvdyh2YWx1ZSkge1xuICAgIHRoaXMuX21fcm93ID0gdmFsdWU7XG4gIH1cblxuICBnZXQgY29sdW1uKCkge1xuICAgIHJldHVybiB0aGlzLl9tX2NvbHVtbjtcbiAgfVxuXG4gIHNldCBjb2x1bW4odmFsdWUpIHtcbiAgICB0aGlzLl9tX2NvbHVtbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21fdGltZTtcbiAgfVxufSIsIi8qKlxuICogQ3JlYXRlZCBieSB1bmVlayBvbiAwOC8wNi8xNi5cbiAqL1xuXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCAqIGZyb20gXCIuL2Jhc2VcIjtcblxubGV0IGluc3RhbmNlID0gbnVsbDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdHN0cmFwMyBleHRlbmRzIEJhc2Uge1xuICBjb25zdHJ1Y3Rvcihyb3csIGNvbHVtbikge1xuICAgIHN1cGVyKHJvdywgY29sdW1uKTtcblxuICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgIGluc3RhbmNlID0gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgdW5lZWsgb24gMDgvMDYvMTYuXG4gKi9cblxuaW1wb3J0IEJhc2UgZnJvbSBcIi4vYmFzZVwiO1xuXG5sZXQgaW5zdGFuY2UgPSBudWxsO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3VuZGF0aW9uNiBleHRlbmRzIEJhc2Uge1xuICBjb25zdHJ1Y3Rvcihyb3csIGNvbHVtbikge1xuICAgIHN1cGVyKHJvdywgY29sdW1uKTtcblxuICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgIGluc3RhbmNlID0gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0YWcsIGF0dHJpYnV0ZXMpIHtcbiAgICB0aGlzLl9tX25hbWUgPSBuYW1lO1xuICAgIHRoaXMuX21fdGFnID0gdGFnO1xuICAgIHRoaXMuX21fYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbV9uYW1lO1xuICB9XG5cbiAgc2V0IG5hbWUodmFsdWUpIHtcbiAgICB0aGlzLl9tX25hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB0YWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21fdGFnO1xuICB9XG5cbiAgc2V0IHRhZyh2YWx1ZSkge1xuICAgIHRoaXMuX21fdGFnID0gdmFsdWU7XG4gIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbV9hdHRyaWJ1dGVzO1xuICB9XG5cbiAgc2V0IGF0dHJpYnV0ZXModmFsdWUpIHtcbiAgICB0aGlzLl9tX2F0dHJpYnV0ZXMgPSB2YWx1ZTtcbiAgfVxuXG4gIHRvSFRNTCgpIHtcbiAgICByZXR1cm4gJChgPCR7dGhpcy50YWd9PmAsIHRoaXMuYXR0cmlidXRlcyk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvc2l0ZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLl9tX25hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21fbmFtZTtcbiAgfVxuXG4gIHNldCBuYW1lKHZhbHVlKSB7XG4gICAgdGhpcy5fbV9uYW1lID0gdmFsdWU7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGxheW91dCBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCAqIGFzIGRyb3BwYWJsZSBmcm9tIFwiLi9kcm9wcGFibGVcIjtcbmltcG9ydCAqIGFzIHNldHRpbmdzIGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgQm9vdHN0cmFwMyBmcm9tIFwiLi9iYXNlL2Jvb3RzdHJhcDNcIjtcbmltcG9ydCBGb3VuZGF0aW9uNiBmcm9tIFwiLi9iYXNlL2ZvdW5kYXRpb242XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZGl2KSB7XG4gICQud2lkZ2V0KCdwbGIuY29udGVudCcsIHtcbiAgICBvcHRpb25zOiB7XG4gICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICBiYXNlOiBcImJvb3RzdHJhcDNcIlxuICAgIH0sXG4gICAgZHJhZ2dhYmxlczogbnVsbCxcbiAgICBlZGl0aW5nOiBmYWxzZSxcbiAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgYmFzZTogbnVsbCxcbiAgICBjdXN0b21pemFibGU6IHNldHRpbmdzLmdldEN1c3RvbWl6YWJsZXMoKSxcbiAgICBfY3JlYXRlKCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoXCJkZWJ1Z1wiKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlRHJhZ2dhYmxlcygpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHVwZGF0ZURyYWdnYWJsZXMoKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZXMgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5kcmFnZ2FibGVcIik7XG4gICAgICB0aGlzLmluaXREcmFnZ2FibGVzKHRoaXMuZHJhZ2dhYmxlcyk7XG4gICAgICB0aGlzLmNyZWF0ZUhhbmRsZXModGhpcy5kcmFnZ2FibGVzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0RHJvcHBhYmxlcygpIHtcbiAgICAgIGlmICh0aGlzLmVsZW1lbnQuY2hpbGRyZW4oXCIuZHJhZ2dhYmxlcy1jb250YWluZXIsIC5kcm9wcGFibGVzLWNvbnRhaW5lclwiKS5sZW5ndGggPCAxKSB7XG4gICAgICAgIGRyb3BwYWJsZS5maXJzdERyb3BwYWJsZSh0aGlzLmVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHJvcHBhYmxlLmNyZWF0ZURyb3BwYWJsZXModGhpcy5lbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGhhdCA9IHRoaXMsIGRyb3BwYWJsZXMgPSAkKFwiLmRyb3BwYWJsZVwiKTtcblxuICAgICAgZHJvcHBhYmxlcy5kcm9wcGFibGUoe1xuICAgICAgICBob3ZlckNsYXNzOiBcImRyb3AtaG92ZXJcIixcbiAgICAgICAgdG9sZXJhbmNlOiBcInBvaW50ZXJcIixcbiAgICAgICAgZHJvcChldmVudCwgdWkpIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnQgPSB1aS5kcmFnZ2FibGUucGFyZW50KCk7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IHVpLmRyYWdnYWJsZS5kYXRhKFwiZGF0YVwiKTtcblxuICAgICAgICAgIGlmIChwYXJlbnQuaXMoXCJ1bFwiKSkge1xuICAgICAgICAgICAgdWkuZHJhZ2dhYmxlID0gJChcIjxkaXY+XCIsIHtjbGFzczogXCJjb2x1bW5zIGRyYWdnYWJsZVwifSkuYXBwZW5kKGNvbnRlbnQuY2xvbmUoKSk7XG4gICAgICAgICAgICAvL3RoYXQuaW5pdERyYWdnYWJsZXModWkuZHJhZ2dhYmxlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnW2NsYXNzKj1cIm5ldy1yb3dcIl0nKSkge1xuICAgICAgICAgICAgbGF5b3V0Lm5ld1JvdygkKHRoaXMpLCB1aSk7XG4gICAgICAgICAgfSBlbHNlIGlmICgkKHRoaXMpLmlzKCdbY2xhc3MqPVwibmV3LWNvbHVtblwiXScpKSB7XG4gICAgICAgICAgICBsYXlvdXQubmV3Q29sdW1uKCQodGhpcyksIHVpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCQodGhpcykuaXMoJ1tjbGFzcyo9XCJuZXctaW5zaWRlXCJdJykpIHtcbiAgICAgICAgICAgIGxheW91dC5uZXdJbnNpZGUoJCh0aGlzKSwgdWkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5pcygnW2NsYXNzKj1cIm5ldy1uZXN0ZWRcIl0nKSkge1xuICAgICAgICAgICAgbGF5b3V0Lm5ld05lc3RlZCgkKHRoaXMpLCB1aSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhhdC51cGRhdGVEcmFnZ2FibGVzKCk7XG5cbiAgICAgICAgICB0aGF0LmluaXRTZWxlY3RhYmxlcygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZHJhZ2dhYmxlc1xuICAgICAqIEByZXR1cm5zIHsqfGpRdWVyeX1cbiAgICAgKi9cbiAgICBpbml0RHJhZ2dhYmxlcyhkcmFnZ2FibGVzKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgICAgZHJhZ2dhYmxlcy5kcmFnZ2FibGUoe1xuICAgICAgICBoZWxwZXIoKSB7XG4gICAgICAgICAgY29uc3Qgd2lkdGggPSAxMDA7XG4gICAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2lkdGggKiAocGFyc2VJbnQoJCh0aGlzKS5jc3MoXCJoZWlnaHRcIikpIC8gcGFyc2VJbnQoJCh0aGlzKS5jc3MoXCJ3aWR0aFwiKSkpO1xuXG4gICAgICAgICAgcmV0dXJuICQoXCI8ZGl2PlwiLCB7Y2xhc3M6IFwiZHJhZ2dhYmxlLWNsb25lXCJ9KS5jc3Moe2hlaWdodDogYCR7aGVpZ2h0fXB4YCwgd2lkdGg6IGAke3dpZHRofXB4YH0pO1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGU6IFwiLmRyYWdnYWJsZS1tb3ZlXCIsXG4gICAgICAgIGN1cnNvckF0OiB7bGVmdDogMCwgdG9wOiAwfSxcbiAgICAgICAgc3RhcnQoKSB7XG4gICAgICAgICAgdGhhdC5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgaWYgKCQodGhpcykucmVzaXphYmxlKFwiaW5zdGFuY2VcIikpIHtcbiAgICAgICAgICAgICQodGhpcykucmVzaXphYmxlKFwiZGVzdHJveVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZHJhZy1hY3RpdmUnKTtcbiAgICAgICAgICB0aGF0LmluaXREcm9wcGFibGVzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHN0b3AoKSB7XG4gICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmQoXCIuZHJvcHBhYmxlcy1jb250YWluZXJcIikucmVtb3ZlKCk7XG4gICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmQoXCIuZHJvcHBhYmxlcy1jb250YWluZXItbmVzdGVkXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2RyYWctYWN0aXZlJyk7XG4gICAgICAgICAgdGhhdC5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0U2VsZWN0YWJsZXMoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgIGRpdi5zZWxlY3RhYmxlKHtcbiAgICAgICAgY2FuY2VsOiBcIi5kcmFnZ2FibGUtZGVsIC5kcmFnZ2FibGUtbW92ZSwgLmRyYWdnYWJsZS1lZGl0LCAudWktcmVzaXphYmxlLWhhbmRsZVwiLFxuICAgICAgICBmaWx0ZXI6ICQoJy5kcmFnZ2FibGVzLWNvbnRhaW5lcicpLmNoaWxkcmVuKCcuZHJhZ2dhYmxlJyksXG4gICAgICAgIHNlbGVjdGVkKGV2ZW50LCB1aSkge1xuICAgICAgICAgICQoXCIublNldHRpbmdcIikuZW1wdHkoKTtcblxuICAgICAgICAgIC8vIFRPRE86IE90aGVyIHBvc3NpYmlsaXR5IC0+IEFkZCBlbGVtZW50cyB0byBsaXN0LCB0aGVuIGdlbmVyYXRlIG9wdGlvbnNcbiAgICAgICAgICBsZXQgZWxlbWVudHMgPSB1aS5zZWxlY3RlZC5jaGlsZHJlbjtcblxuICAgICAgICAgIGpRdWVyeS5lYWNoKGVsZW1lbnRzLCAoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhhdC5jdXN0b21pemFibGVbdmFsdWUudGFnTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBsZXQgbGlzdCA9ICQoXCI8dWw+XCIsIHt0ZXh0OiB2YWx1ZS50YWdOYW1lfSk7XG5cbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0LmN1c3RvbWl6YWJsZVt2YWx1ZS50YWdOYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSAkKFwiPGxpPlwiKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSAkKFwiPGxhYmVsPlwiLCB7dGV4dDogdGhhdC5jdXN0b21pemFibGVbdmFsdWUudGFnTmFtZV1baV19KTtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQ7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhhdC5jdXN0b21pemFibGVbdmFsdWUudGFnTmFtZV1baV0gPT09IFwidGV4dC1hbGlnblwiXG4gICAgICAgICAgICAgICAgICB8fCB0aGF0LmN1c3RvbWl6YWJsZVt2YWx1ZS50YWdOYW1lXVtpXSA9PT0gXCJ0ZXh0LXRyYW5zZm9ybVwiXG4gICAgICAgICAgICAgICAgICB8fCB0aGF0LmN1c3RvbWl6YWJsZVt2YWx1ZS50YWdOYW1lXVtpXSA9PT0gXCJmb250LXdlaWdodFwiKSB7XG4gICAgICAgICAgICAgICAgICBpbnB1dCA9ICQoXCI8c2VsZWN0PlwiKTtcbiAgICAgICAgICAgICAgICAgIC8vbGV0IG9wdGlvbiA9IHNldHRpbmdzLm9wdGlvbkxpc3QodGhhdC5jdXN0b21pemFibGVbdmFsdWUudGFnTmFtZV1baV0pO1xuICAgICAgICAgICAgICAgICAgLy9vcHRpb24uYXBwZW5kVG8oaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5jdXN0b21pemFibGVbdmFsdWUudGFnTmFtZV1baV0gPT09IFwiYmFja2dyb3VuZFwiKSB7XG4gICAgICAgICAgICAgICAgICBpbnB1dCA9ICQoXCI8aW5wdXQ+XCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpbnB1dCA9ICQoXCI8aW5wdXQ+XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICQodmFsdWUpLmNzcyh0aGF0LmN1c3RvbWl6YWJsZVt2YWx1ZS50YWdOYW1lXVtpXSksXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHZhbHVlKS5jc3ModGhhdC5jdXN0b21pemFibGVbdmFsdWUudGFnTmFtZV1baV0pfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW5wdXQuYXBwZW5kVG8obGFiZWwpO1xuICAgICAgICAgICAgICAgIGxhYmVsLmFwcGVuZFRvKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgb3B0aW9uLmRhdGEoXCJwYXJhbWV0ZXJcIiwgdGhhdC5jdXN0b21pemFibGVbdmFsdWUudGFnTmFtZV1baV0pO1xuICAgICAgICAgICAgICAgIG9wdGlvbi5hcHBlbmRUbyhsaXN0KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vbGV0IG9wdGlvbiA9IGdldE9wdGlvbnMoKTtcbiAgICAgICAgICAgICAgLy9vcHRpb24uYXBwZW5kVG8obGlzdCk7XG4gICAgICAgICAgICAgIGxpc3QuZGF0YShcImZ1bmN0aW9uXCIsICQodGhpcykuY3NzKTtcbiAgICAgICAgICAgICAgbGlzdC5kYXRhKFwidGFyZ2V0XCIsIHZhbHVlKTtcbiAgICAgICAgICAgICAgbGlzdC5hcHBlbmRUbygkKFwiLm5TZXR0aW5nXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQoJyNwYW5lbDIgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKS5vbihcImNoYW5nZSBpbnB1dFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgZnVuID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5kYXRhKFwiZnVuY3Rpb25cIik7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5kYXRhKFwidGFyZ2V0XCIpO1xuICAgICAgICAgICAgbGV0IHBhcmFtZXRlciA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZGF0YShcInBhcmFtZXRlclwiKTtcbiAgICAgICAgICAgIGxldCBwYXJhbVZhbHVlID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGZ1bi5hcHBseSgkKHRhcmdldCksIFtwYXJhbWV0ZXIsIHBhcmFtVmFsdWVdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5zZWxlY3RlZChldmVudCwgdWkpIHtcbiAgICAgICAgICAkKFwiLm5TZXR0aW5nXCIpLmVtcHR5KCk7XG4gICAgICAgICAgLy8gRklYTUU6IFJlbW92ZSB3aGVuIGNvbHVtbiBkZWxldGVcbiAgICAgICAgICAvLyBGSVhNRTogUmVtb3ZlIHdoZW4gcm93IGRlbGV0ZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZHJhZ2dhYmxlc1xuICAgICAqL1xuICAgIGNyZWF0ZUhhbmRsZXMoZHJhZ2dhYmxlcykge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGRyYWdnYWJsZXMuaG92ZXIoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghdGhhdC5lZGl0aW5nICYmICF0aGF0LmRyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc3QgZHJhZ0hhbmRsZSA9ICQoXCI8ZGl2PlwiLCB7Y2xhc3M6IFwiZHJhZ2dhYmxlLW1vdmUgaWNvbi1hcnJvd3NcIn0pO1xuICAgICAgICAgIGNvbnN0IGRlbEhhbmRsZSA9ICQoXCI8ZGl2PlwiLCB7Y2xhc3M6IFwiZHJhZ2dhYmxlLWRlbCBpY29uLXRyYXNoXCJ9KTtcbiAgICAgICAgICBjb25zdCBlZGl0SGFuZGxlID0gJChcIjxkaXY+XCIsIHtjbGFzczogXCJkcmFnZ2FibGUtZWRpdCBpY29uLXBlbmNpbFwifSk7XG5cbiAgICAgICAgICAkKHRoaXMpLmFwcGVuZChkcmFnSGFuZGxlKTtcbiAgICAgICAgICAkKHRoaXMpLmFwcGVuZChkZWxIYW5kbGUpO1xuICAgICAgICAgICQodGhpcykuYXBwZW5kKGVkaXRIYW5kbGUpO1xuXG4gICAgICAgICAgJChcIi5kcmFnZ2FibGUtZGVsXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBwYXJlbnRSb3cgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlID0gcGFyZW50Um93LmNoaWxkcmVuKCkubGVuZ3RoID4gMTtcblxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgICBsYXlvdXQudXBkYXRlUm93KHBhcmVudFJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgbGF5b3V0LnJlbW92ZURpdihwYXJlbnRSb3cpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJChcIi5kcmFnZ2FibGUtZWRpdFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGVkaXQgPSAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiOmZpcnN0XCIpO1xuXG4gICAgICAgICAgICBpZiAoZWRpdC5oYXNDbGFzcyhcInRpbnktbWNlXCIpICYmICF0aGF0LmVkaXRpbmcpIHtcbiAgICAgICAgICAgICAgdGhhdC5lZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgZWRpdC50aW55bWNlKHtcbiAgICAgICAgICAgICAgICBzY3JpcHRfdXJsOiAnLi9saWIvdGlueW1jZS90aW55bWNlLmpxdWVyeS5taW4uanMnLFxuICAgICAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXR1cChlZGl0b3IpIHtcbiAgICAgICAgICAgICAgICAgIGVkaXRvci5vbignZm9jdXMnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpdi5zZWxlY3RhYmxlKFwiZGVzdHJveVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBlZGl0b3Iub24oJ2JsdXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZWRpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aW55bWNlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmluaXRTZWxlY3RhYmxlcygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBlZGl0LmZvY3VzKCk7XG4gICAgICAgICAgICAgIH0sIDEwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKCEkKHRoaXMpLmlzKCc6bGFzdC1jaGlsZCcpKSB7XG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUhvcml6b250YWxSZXNpemFibGUoJCh0aGlzKSk7XG4gICAgICAgICAgICAkKHRoaXMpLm5leHQoKS5hZGRDbGFzcyhcInJlc2l6YWJsZS1yZXZlcnNlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiLmRyYWdnYWJsZS1tb3ZlXCIpLnJlbW92ZSgpO1xuICAgICAgICAkKFwiLmRyYWdnYWJsZS1kZWxcIikucmVtb3ZlKCk7XG4gICAgICAgICQoXCIuZHJhZ2dhYmxlLWVkaXRcIikucmVtb3ZlKCk7XG4gICAgICAgICQodGhpcykubmV4dCgpLnJlbW92ZUNsYXNzKFwicmVzaXphYmxlLXJldmVyc2VcIik7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uXG4gICAgICovXG4gICAgY3JlYXRlSG9yaXpvbnRhbFJlc2l6YWJsZShjb2x1bW4pIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgbGV0IG5leHQsXG4gICAgICAgIG9sZFNpemUsXG4gICAgICAgIG5ld1NpemUsXG4gICAgICAgIG9sZE5leHRTaXplLFxuICAgICAgICBuZXdOZXh0U2l6ZTtcblxuICAgICAgaWYgKCF0aGF0LmRyYWdnaW5nKSB7XG4gICAgICAgIGNvbHVtbi5yZXNpemFibGUoe1xuICAgICAgICAgIGhhbmRsZXM6ICdlJyxcbiAgICAgICAgICBkaXN0YW5jZTogMTAsXG4gICAgICAgICAgLy9hbHNvUmVzaXplUmV2ZXJzZTogJ3Jlc2l6YWJsZS1yZXZlcnNlJyxcbiAgICAgICAgICBoZWxwZXI6IFwicmVzaXphYmxlLWhlbHBlclwiLFxuICAgICAgICAgIGdob3N0OiB0cnVlLFxuICAgICAgICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gJCh0aGlzKS5yZXNpemFibGUoXCJpbnN0YW5jZVwiKSwgbyA9IGluc3RhbmNlLm9wdGlvbnM7XG4gICAgICAgICAgICBvLmdyaWQgPSBbKHBhcnNlSW50KCQodGhpcykucGFyZW50KCkuY3NzKFwid2lkdGhcIikpIC8gMTIpLCAwXTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0YXJ0KCkge1xuICAgICAgICAgICAgdGhhdC5kcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgIG5leHQgPSAkKHRoaXMpLm5leHQoKTtcbiAgICAgICAgICAgIG9sZFNpemUgPSBsYXlvdXQuZ2V0Q29sdW1uU2l6ZSgkKHRoaXMpKS5tZWRpdW07XG4gICAgICAgICAgICBvbGRTaXplID0gcGFyc2VJbnQob2xkU2l6ZS5zbGljZSg3LCBvbGRTaXplLmxlbmd0aCkpO1xuICAgICAgICAgICAgb2xkTmV4dFNpemUgPSBsYXlvdXQuZ2V0Q29sdW1uU2l6ZShuZXh0KS5tZWRpdW07XG4gICAgICAgICAgICBvbGROZXh0U2l6ZSA9IHBhcnNlSW50KG9sZE5leHRTaXplLnNsaWNlKDcsIG9sZE5leHRTaXplLmxlbmd0aCkpO1xuXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9ICQodGhpcykucmVzaXphYmxlKFwiaW5zdGFuY2VcIiksIG8gPSBpbnN0YW5jZS5vcHRpb25zO1xuXG4gICAgICAgICAgICBvLm1pbldpZHRoID0gby5ncmlkWzBdO1xuICAgICAgICAgICAgby5tYXhXaWR0aCA9IChvbGRTaXplICsgb2xkTmV4dFNpemUgLSAxKSAqIG8ubWluV2lkdGg7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdG9wKCkge1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSAkKHRoaXMpLnJlc2l6YWJsZShcImluc3RhbmNlXCIpLCBvID0gaW5zdGFuY2Uub3B0aW9ucztcbiAgICAgICAgICAgIG5leHQgPSAkKHRoaXMpLm5leHQoKTtcblxuICAgICAgICAgICAgbmV3U2l6ZSA9IHBhcnNlSW50KGluc3RhbmNlLmhlbHBlci53aWR0aCgpIC8gcGFyc2VGbG9hdChvLmdyaWRbMF0pKTtcbiAgICAgICAgICAgIG5ld05leHRTaXplID0gb2xkTmV4dFNpemUgKyAob2xkU2l6ZSAtIG5ld1NpemUpO1xuXG4gICAgICAgICAgICBsYXlvdXQuc2V0Q29sdW1uU2l6ZSgkKHRoaXMpLCB7XCJtZWRpdW1cIjogbmV3U2l6ZSwgXCJsYXJnZVwiOiBuZXdTaXplfSk7XG4gICAgICAgICAgICBsYXlvdXQuc2V0Q29sdW1uU2l6ZShuZXh0LCB7XCJtZWRpdW1cIjogbmV3TmV4dFNpemUsIFwibGFyZ2VcIjogbmV3TmV4dFNpemV9KTtcblxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoXCJ3aWR0aFwiLCBcIlwiKTtcbiAgICAgICAgICAgICQodGhpcykuY3NzKFwiaGVpZ2h0XCIsIFwiXCIpO1xuXG4gICAgICAgICAgICBuZXh0LmNzcyhcIndpZHRoXCIsIFwiXCIpO1xuICAgICAgICAgICAgbmV4dC5jc3MoXCJoZWlnaHRcIiwgXCJcIik7XG5cbiAgICAgICAgICAgIHRoYXQuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG5ld1BMQigpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFzZSA9PT0gXCJib290c3RyYXAzXCIpIHtcbiAgICAgICAgdGhpcy5iYXNlID0gbmV3IEJvb3RzdHJhcDMoXCJyb3dcIiwgXCJcIik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5iYXNlID0gbmV3IEZvdW5kYXRpb242KFwicm93XCIsIFwiY29sdW1uXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZGl2LmNvbnRlbnQoe2RlYnVnOiBmYWxzZX0pO1xuICBkaXYuY29udGVudChcIm5ld1BMQlwiKTtcbn1cbiIsImNvbnN0IERST1BQQUJMRV9TSVpFID0gMTA7XG5cbi8vIFRPRE86IEZpbmQgYSB3YXkgdG8gZGVsZXRlIHRoaXMgYioqKioqKipcblxuLyoqXG4gKlxuICogQHBhcmFtIGVsZW1lbnRQb3NpdGlvblxuICogQHBhcmFtIGVsZW1lbnRcbiAqIEByZXR1cm5zIHsqfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRQYXJhbWV0ZXJzKGVsZW1lbnRQb3NpdGlvbiwgZWxlbWVudCkge1xuICBsZXQgcGFyYW1ldGVycztcbiAgY29uc3QgZWxlbWVudFdpZHRoID0gcGFyc2VJbnQoZWxlbWVudC5jc3MoXCJ3aWR0aFwiKSk7XG4gIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSBwYXJzZUludChlbGVtZW50LmNzcyhcImhlaWdodFwiKSk7XG4gIGNvbnN0IGVsZW1lbnRQYXJlbnRIZWlnaHQgPSBwYXJzZUludChlbGVtZW50LnBhcmVudCgpLmNzcyhcImhlaWdodFwiKSk7XG4gIGNvbnN0IGVsZW1lbnRUb3AgPSBlbGVtZW50Lm9mZnNldCgpLnRvcDtcbiAgY29uc3QgZWxlbWVudExlZnQgPSBlbGVtZW50Lm9mZnNldCgpLmxlZnQ7XG5cbiAgc3dpdGNoIChlbGVtZW50UG9zaXRpb24pIHtcbiAgICBjYXNlIFwibmV3Um93XCI6XG4gICAgICBwYXJhbWV0ZXJzID0ge1xuICAgICAgICB0b3A6IGVsZW1lbnRUb3AsXG4gICAgICAgIGxlZnQ6IGVsZW1lbnRMZWZ0LFxuICAgICAgICB3aWR0aDogZWxlbWVudC5jc3MoXCJ3aWR0aFwiKSxcbiAgICAgICAgaGVpZ2h0OiBlbGVtZW50LmNzcyhcImhlaWdodFwiKVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJuZXdOZXN0ZWRCZWZvcmUxXCI6XG4gICAgICBwYXJhbWV0ZXJzID0ge1xuICAgICAgICB0b3A6IGVsZW1lbnRUb3AgLSAoRFJPUFBBQkxFX1NJWkUgLyAyKSArIDIwLFxuICAgICAgICBsZWZ0OiBlbGVtZW50TGVmdCxcbiAgICAgICAgd2lkdGg6IGVsZW1lbnQuY3NzKFwid2lkdGhcIilcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibmV3TmVzdGVkQmVmb3JlMlwiOlxuICAgICAgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgdG9wOiBlbGVtZW50VG9wIC0gKERST1BQQUJMRV9TSVpFIC8gMiksXG4gICAgICAgIGxlZnQ6IGVsZW1lbnRMZWZ0LFxuICAgICAgICB3aWR0aDogZWxlbWVudC5jc3MoXCJ3aWR0aFwiKVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJuZXdOZXN0ZWRBZnRlclwiOlxuICAgICAgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgdG9wOiBlbGVtZW50VG9wICsgKCsoZWxlbWVudEhlaWdodCkpIC0gKERST1BQQUJMRV9TSVpFIC8gMikgLSAyMCxcbiAgICAgICAgbGVmdDogZWxlbWVudExlZnQsXG4gICAgICAgIHdpZHRoOiBlbGVtZW50LmNzcyhcIndpZHRoXCIpXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm5ld1Jvd0JlZm9yZVwiOlxuICAgICAgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgdG9wOiBlbGVtZW50VG9wIC0gKERST1BQQUJMRV9TSVpFIC8gMiksXG4gICAgICAgIGxlZnQ6IGVsZW1lbnRMZWZ0LFxuICAgICAgICB3aWR0aDogZWxlbWVudC5jc3MoXCJ3aWR0aFwiKVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJuZXdSb3dBZnRlclwiOlxuICAgICAgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgdG9wOiBlbGVtZW50VG9wICsgKCsoZWxlbWVudEhlaWdodCkpIC0gKERST1BQQUJMRV9TSVpFIC8gMiksXG4gICAgICAgIGxlZnQ6IGVsZW1lbnRMZWZ0LFxuICAgICAgICB3aWR0aDogZWxlbWVudC5jc3MoXCJ3aWR0aFwiKVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJuZXdDb2x1bW5CZWZvcmVcIjpcbiAgICAgIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgIHRvcDogZWxlbWVudFRvcCArIChEUk9QUEFCTEVfU0laRSAvIDIpLFxuICAgICAgICBsZWZ0OiBlbGVtZW50TGVmdCAtIChEUk9QUEFCTEVfU0laRSksXG4gICAgICAgIGhlaWdodDogYCR7ZWxlbWVudFBhcmVudEhlaWdodCAtIERST1BQQUJMRV9TSVpFfXB4YFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJuZXdDb2x1bW5BZnRlclwiOlxuICAgICAgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgdG9wOiBlbGVtZW50VG9wICsgKERST1BQQUJMRV9TSVpFIC8gMiksXG4gICAgICAgIGxlZnQ6IGVsZW1lbnRMZWZ0ICsgKCsoZWxlbWVudFdpZHRoKSAtIChEUk9QUEFCTEVfU0laRSkpLFxuICAgICAgICBoZWlnaHQ6IGAke2VsZW1lbnRQYXJlbnRIZWlnaHQgLSBEUk9QUEFCTEVfU0laRX1weGBcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibmV3SW5zaWRlQWJvdmVcIjpcbiAgICAgIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgIHRvcDogZWxlbWVudFRvcCArIChEUk9QUEFCTEVfU0laRSAvIDIpLFxuICAgICAgICBsZWZ0OiBlbGVtZW50TGVmdCArIERST1BQQUJMRV9TSVpFLFxuICAgICAgICB3aWR0aDogYCR7ZWxlbWVudFdpZHRoIC0gKERST1BQQUJMRV9TSVpFICogMil9cHhgLFxuICAgICAgICBoZWlnaHQ6IGAke2VsZW1lbnRQYXJlbnRIZWlnaHQgLyAyLjV9cHhgXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm5ld0luc2lkZUJlbG93XCI6XG4gICAgICBwYXJhbWV0ZXJzID0ge1xuICAgICAgICB0b3A6IGVsZW1lbnRUb3AgLSAoZWxlbWVudFBhcmVudEhlaWdodCAvIDMpICsgKCsoZWxlbWVudFBhcmVudEhlaWdodCAqIDAuOSkpLFxuICAgICAgICBsZWZ0OiBlbGVtZW50TGVmdCArIERST1BQQUJMRV9TSVpFLFxuICAgICAgICB3aWR0aDogYCR7ZWxlbWVudFdpZHRoIC0gKERST1BQQUJMRV9TSVpFICogMil9cHhgLFxuICAgICAgICBoZWlnaHQ6IGAke2VsZW1lbnRQYXJlbnRIZWlnaHQgLyAyLjV9cHhgXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImhhbmRsZUJlZm9yZVwiOlxuICAgICAgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgdG9wOiBlbGVtZW50VG9wICsgKERST1BQQUJMRV9TSVpFIC8gMiksXG4gICAgICAgIGxlZnQ6IGVsZW1lbnRMZWZ0IC0gKERST1BQQUJMRV9TSVpFKSxcbiAgICAgICAgaGVpZ2h0OiBgJHtlbGVtZW50SGVpZ2h0IC0gRFJPUFBBQkxFX1NJWkV9cHhgXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImhhbmRsZUFmdGVyXCI6XG4gICAgICBwYXJhbWV0ZXJzID0ge1xuICAgICAgICB0b3A6IGVsZW1lbnRUb3AgKyAoRFJPUFBBQkxFX1NJWkUgLyAyKSxcbiAgICAgICAgbGVmdDogZWxlbWVudExlZnQgKyAoKyhlbGVtZW50V2lkdGgpIC0gKERST1BQQUJMRV9TSVpFKSksXG4gICAgICAgIGhlaWdodDogYCR7ZWxlbWVudEhlaWdodCAtIERST1BQQUJMRV9TSVpFfXB4YFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiBwYXJhbWV0ZXJzO1xufSIsImltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi9zaGFyZWRcIjtcbmltcG9ydCBycSBmcm9tIFwiLi9yZXF1aXJlbWVudFwiO1xuaW1wb3J0IGdldENTU1ZhbHVlcyBmcm9tIFwiLi9jc3NcIjtcblxuZXhwb3J0IHtjcmVhdGVEcm9wcGFibGVzLCBmaXJzdERyb3BwYWJsZX07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBuZXN0ZWREcm9wcGFibGVzQ29udGFpbmVyXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFkZFRvTmVzdGVkRHJvcHBhYmxlcyhuZXN0ZWREcm9wcGFibGVzQ29udGFpbmVyKSB7XG4gICQoXCIuY29sdW1ucy5uZXN0ZWQtY29udGFpbmVyXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmZpcnN0LWNoaWxkXCIpKSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVSb3dCZWZvcmUgPSAkKFwiPGRpdj5cIiwge1xuICAgICAgICAgIGNsYXNzOiBcImRyb3BwYWJsZSBuZXctbmVzdGVkLWJlZm9yZVwiXG4gICAgICAgIH0pLmNzcyhnZXRDU1NWYWx1ZXMoXCJuZXdOZXN0ZWRCZWZvcmUxXCIsICQodGhpcykpKTtcbiAgICAgICAgZHJvcHBhYmxlUm93QmVmb3JlLmRhdGEoXCJyb3dcIiwgJCh0aGlzKSk7XG4gICAgICAgIGRyb3BwYWJsZVJvd0JlZm9yZS5kYXRhKFwiaW5zZXJ0RnVuY3Rpb25cIiwgJCh0aGlzKS5pbnNlcnRCZWZvcmUpO1xuICAgICAgICBuZXN0ZWREcm9wcGFibGVzQ29udGFpbmVyLmFwcGVuZChkcm9wcGFibGVSb3dCZWZvcmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGRyb3BwYWJsZVJvd0JlZm9yZSA9ICQoXCI8ZGl2PlwiLCB7XG4gICAgICAgICAgY2xhc3M6IFwiZHJvcHBhYmxlIG5ldy1uZXN0ZWQtYmVmb3JlXCJcbiAgICAgICAgfSkuY3NzKGdldENTU1ZhbHVlcyhcIm5ld05lc3RlZEJlZm9yZTJcIiwgJCh0aGlzKSkpO1xuICAgICAgICBkcm9wcGFibGVSb3dCZWZvcmUuZGF0YShcInJvd1wiLCAkKHRoaXMpKTtcbiAgICAgICAgZHJvcHBhYmxlUm93QmVmb3JlLmRhdGEoXCJpbnNlcnRGdW5jdGlvblwiLCAkKHRoaXMpLmluc2VydEJlZm9yZSk7XG4gICAgICAgIG5lc3RlZERyb3BwYWJsZXNDb250YWluZXIuYXBwZW5kKGRyb3BwYWJsZVJvd0JlZm9yZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmxhc3QtY2hpbGRcIikpIHtcbiAgICAgICAgY29uc3QgZHJvcHBhYmxlUm93QWZ0ZXIgPSAkKFwiPGRpdj5cIiwge1xuICAgICAgICAgIGNsYXNzOiBcImRyb3BwYWJsZSBuZXctbmVzdGVkLWFmdGVyXCJcbiAgICAgICAgfSkuY3NzKGdldENTU1ZhbHVlcyhcIm5ld05lc3RlZEFmdGVyXCIsICQodGhpcykpKTtcbiAgICAgICAgZHJvcHBhYmxlUm93QWZ0ZXIuZGF0YShcInJvd1wiLCAkKHRoaXMpKTtcbiAgICAgICAgZHJvcHBhYmxlUm93QWZ0ZXIuZGF0YShcImluc2VydEZ1bmN0aW9uXCIsICQodGhpcykuaW5zZXJ0QWZ0ZXIpO1xuICAgICAgICBuZXN0ZWREcm9wcGFibGVzQ29udGFpbmVyLmFwcGVuZChkcm9wcGFibGVSb3dBZnRlcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gZHJvcHBhYmxlc0NvbnRhaW5lclxuICovXG5mdW5jdGlvbiBjcmVhdGVSb3dEcm9wcGFibGVzKGRyb3BwYWJsZXNDb250YWluZXIpIHtcbiAgY29uc3QgZHJhZ2dhYmxlc0NvbnRhaW5lciA9ICQoXCIucm93LmRyYWdnYWJsZXMtY29udGFpbmVyXCIpO1xuXG4gIGpRdWVyeS5lYWNoKGRyYWdnYWJsZXNDb250YWluZXIsIChpbmRleCwgZHJhZ2dhYmxlQ29udGFpbmVyKSA9PiB7XG4gICAgaWYgKHNoYXJlZC5oYXNPbmVDaGlsZE9ubHkoJChkcmFnZ2FibGVDb250YWluZXIpKSB8fCBycS5jaGVja0NvbHVtbkxldmVsKCQoZHJhZ2dhYmxlQ29udGFpbmVyKSkpIHtcbiAgICAgIC8vIEp1bXAgdG8gbmV4dCBpdGVyYXRpb246IGJlY2F1c2Ugd2UgbW92ZSBhIHNpbmdsZSBlbGVtZW50XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXNoYXJlZC5oYXNPbmVDaGlsZE9ubHkoJChkcmFnZ2FibGVDb250YWluZXIpLnByZXYoXCIucm93LmRyYWdnYWJsZXMtY29udGFpbmVyXCIpKSkge1xuICAgICAgY29uc3QgZHJvcHBhYmxlUm93QmVmb3JlID0gJChcIjxkaXY+XCIsIHtcbiAgICAgICAgY2xhc3M6IFwiZHJvcHBhYmxlIG5ldy1yb3ctYmVmb3JlXCJcbiAgICAgIH0pLmNzcyhnZXRDU1NWYWx1ZXMoXCJuZXdSb3dCZWZvcmVcIiwgJChkcmFnZ2FibGVDb250YWluZXIpKSk7XG4gICAgICBkcm9wcGFibGVSb3dCZWZvcmUuZGF0YShcInJvd1wiLCAkKGRyYWdnYWJsZUNvbnRhaW5lcikpO1xuICAgICAgZHJvcHBhYmxlUm93QmVmb3JlLmRhdGEoXCJpbnNlcnRGdW5jdGlvblwiLCAkKGRyYWdnYWJsZUNvbnRhaW5lcikuaW5zZXJ0QmVmb3JlKTtcbiAgICAgIGRyb3BwYWJsZXNDb250YWluZXIuYXBwZW5kKGRyb3BwYWJsZVJvd0JlZm9yZSk7XG4gICAgfVxuXG4gICAgaWYgKCQoZHJhZ2dhYmxlQ29udGFpbmVyKS5uZXh0KFwiLnJvdy5kcmFnZ2FibGVzLWNvbnRhaW5lclwiKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IGRyb3BwYWJsZVJvd0FmdGVyID0gJChcIjxkaXY+XCIsIHtcbiAgICAgICAgY2xhc3M6IFwiZHJvcHBhYmxlIG5ldy1yb3ctYWZ0ZXJcIlxuICAgICAgfSkuY3NzKGdldENTU1ZhbHVlcyhcIm5ld1Jvd0FmdGVyXCIsICQoZHJhZ2dhYmxlQ29udGFpbmVyKSkpO1xuICAgICAgZHJvcHBhYmxlUm93QWZ0ZXIuZGF0YShcInJvd1wiLCAkKGRyYWdnYWJsZUNvbnRhaW5lcikpO1xuICAgICAgZHJvcHBhYmxlUm93QWZ0ZXIuZGF0YShcImluc2VydEZ1bmN0aW9uXCIsICQoZHJhZ2dhYmxlQ29udGFpbmVyKS5pbnNlcnRBZnRlcik7XG4gICAgICBkcm9wcGFibGVzQ29udGFpbmVyLmFwcGVuZChkcm9wcGFibGVSb3dBZnRlcik7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIGRyb3BwYWJsZXNDb250YWluZXJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ29sdW1uc0Ryb3BwYWJsZXMoZHJvcHBhYmxlc0NvbnRhaW5lcikge1xuICBjb25zdCBkcmFnZ2FibGVzID0gJChcIi5kcmFnZ2FibGVcIikubm90KFwiLmRyYWctYWN0aXZlLCAudWktZHJhZ2dhYmxlLWRyYWdnaW5nXCIpO1xuXG4gIGpRdWVyeS5lYWNoKGRyYWdnYWJsZXMsIChpbmRleCwgZHJhZ2dhYmxlKSA9PiB7XG4gICAgaWYgKCFycS5jaGVja0NvbHVtbkxldmVsKCQoZHJhZ2dhYmxlKSkgJiYgIXJxLmNoZWNrTWF4aW11bUNvbHVtbnNCeVJvdygkKGRyYWdnYWJsZSkucGFyZW50KCkpKSB7XG4gICAgICBpZiAoJChkcmFnZ2FibGUpLmlzKCc6Zmlyc3QtY2hpbGQnKSkge1xuICAgICAgICBjb25zdCBkcm9wcGFibGVDb2x1bW5CZWZvcmUgPSAkKFwiPGRpdj5cIiwge1xuICAgICAgICAgIGNsYXNzOiBcImRyb3BwYWJsZSBuZXctY29sdW1uLWJlZm9yZVwiXG4gICAgICAgIH0pLmNzcyhnZXRDU1NWYWx1ZXMoXCJuZXdDb2x1bW5CZWZvcmVcIiwgJChkcmFnZ2FibGUpKSk7XG4gICAgICAgIGRyb3BwYWJsZUNvbHVtbkJlZm9yZS5kYXRhKFwiY29sdW1uXCIsICQoZHJhZ2dhYmxlKSk7XG4gICAgICAgIGRyb3BwYWJsZUNvbHVtbkJlZm9yZS5kYXRhKFwiaW5zZXJ0RnVuY3Rpb25cIiwgJChkcmFnZ2FibGUpLmluc2VydEJlZm9yZSk7XG4gICAgICAgIGRyb3BwYWJsZXNDb250YWluZXIuYXBwZW5kKGRyb3BwYWJsZUNvbHVtbkJlZm9yZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghKCQoZHJhZ2dhYmxlKS5uZXh0KCkuaGFzQ2xhc3MoJ2RyYWctYWN0aXZlJykpKSB7XG4gICAgICAgIGNvbnN0IGRyb3BwYWJsZUNvbHVtbkFmdGVyID0gJChcIjxkaXY+XCIsIHtcbiAgICAgICAgICBjbGFzczogXCJkcm9wcGFibGUgbmV3LWNvbHVtbi1hZnRlclwiXG4gICAgICAgIH0pLmNzcyhnZXRDU1NWYWx1ZXMoXCJuZXdDb2x1bW5BZnRlclwiLCAkKGRyYWdnYWJsZSkpKTtcbiAgICAgICAgZHJvcHBhYmxlQ29sdW1uQWZ0ZXIuZGF0YShcImNvbHVtblwiLCAkKGRyYWdnYWJsZSkpO1xuICAgICAgICBkcm9wcGFibGVDb2x1bW5BZnRlci5kYXRhKFwiaW5zZXJ0RnVuY3Rpb25cIiwgJChkcmFnZ2FibGUpLmluc2VydEFmdGVyKTtcbiAgICAgICAgZHJvcHBhYmxlc0NvbnRhaW5lci5hcHBlbmQoZHJvcHBhYmxlQ29sdW1uQWZ0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuIC8qKlxuICpcbiAqIEBwYXJhbSBkcm9wcGFibGVzQ29udGFpbmVyXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU5lc3RpbmdEcm9wcGFibGVzKGRyb3BwYWJsZXNDb250YWluZXIpIHtcbiAgY29uc3QgZHJhZ2dhYmxlcyA9ICQoXCIuZHJhZ2dhYmxlXCIpLm5vdChcIi5kcmFnLWFjdGl2ZSwgLnVpLWRyYWdnYWJsZS1kcmFnZ2luZ1wiKTtcblxuICBqUXVlcnkuZWFjaChkcmFnZ2FibGVzLCAoaW5kZXgsIGRyYWdnYWJsZSkgPT4ge1xuICAgIGlmICgkKGRyYWdnYWJsZSkuc2libGluZ3MoKS5sZW5ndGggPiAwICYmICFycS5jaGVja0NvbHVtbkxldmVsKCQoZHJhZ2dhYmxlKSkgJiYgIXJxLmlzQ29sdW1uQ29udGFpbmluZ1JvdygkKGRyYWdnYWJsZSkpKSB7XG4gICAgICBjb25zdCBkcm9wcGFibGVSb3dBYm92ZSA9ICQoXCI8ZGl2PlwiLCB7XG4gICAgICAgIGNsYXNzOiBcImRyb3BwYWJsZSBuZXctaW5zaWRlLWFib3ZlXCJcbiAgICAgIH0pLmNzcyhnZXRDU1NWYWx1ZXMoXCJuZXdJbnNpZGVBYm92ZVwiLCAkKGRyYWdnYWJsZSkpKTtcbiAgICAgIGRyb3BwYWJsZVJvd0Fib3ZlLmRhdGEoXCJjb2x1bW5cIiwgJChkcmFnZ2FibGUpKTtcbiAgICAgIGRyb3BwYWJsZVJvd0Fib3ZlLmRhdGEoXCJpbnNlcnRGdW5jdGlvblwiLCAkKGRyYWdnYWJsZSkucHJlcGVuZCk7XG4gICAgICBkcm9wcGFibGVzQ29udGFpbmVyLmFwcGVuZChkcm9wcGFibGVSb3dBYm92ZSk7XG5cbiAgICAgIGNvbnN0IGRyb3BwYWJsZVJvd0JlbG93ID0gJChcIjxkaXY+XCIsIHtcbiAgICAgICAgY2xhc3M6IFwiZHJvcHBhYmxlIG5ldy1pbnNpZGUtYmVsb3dcIlxuICAgICAgfSkuY3NzKGdldENTU1ZhbHVlcyhcIm5ld0luc2lkZUJlbG93XCIsICQoZHJhZ2dhYmxlKSkpO1xuICAgICAgZHJvcHBhYmxlUm93QmVsb3cuZGF0YShcImNvbHVtblwiLCAkKGRyYWdnYWJsZSkpO1xuICAgICAgZHJvcHBhYmxlUm93QmVsb3cuZGF0YShcImluc2VydEZ1bmN0aW9uXCIsICQoZHJhZ2dhYmxlKS5hcHBlbmQpO1xuICAgICAgZHJvcHBhYmxlc0NvbnRhaW5lci5hcHBlbmQoZHJvcHBhYmxlUm93QmVsb3cpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBlZGl0YWJsZVxuICovXG5mdW5jdGlvbiBjcmVhdGVEcm9wcGFibGVzKGVkaXRhYmxlKSB7XG4gIGNvbnN0IGRyb3BwYWJsZXNDb250YWluZXIgPSAkKFwiPGRpdj5cIiwge2NsYXNzOiBcImRyb3BwYWJsZXMtY29udGFpbmVyXCJ9KSxcbiAgICBuZXN0ZWREcm9wcGFibGVzQ29udGFpbmVyID0gJChcIjxkaXY+XCIsIHtjbGFzczogXCJkcm9wcGFibGVzLWNvbnRhaW5lci1uZXN0ZWRcIn0pO1xuXG4gIGVkaXRhYmxlLmFwcGVuZChkcm9wcGFibGVzQ29udGFpbmVyKTtcbiAgZWRpdGFibGUuYXBwZW5kKG5lc3RlZERyb3BwYWJsZXNDb250YWluZXIpO1xuXG4gIGNyZWF0ZVJvd0Ryb3BwYWJsZXMoZHJvcHBhYmxlc0NvbnRhaW5lcik7XG4gIGNyZWF0ZUNvbHVtbnNEcm9wcGFibGVzKGRyb3BwYWJsZXNDb250YWluZXIpO1xuICBjcmVhdGVOZXN0aW5nRHJvcHBhYmxlcyhkcm9wcGFibGVzQ29udGFpbmVyKTtcbiAgY3JlYXRlQWRkVG9OZXN0ZWREcm9wcGFibGVzKG5lc3RlZERyb3BwYWJsZXNDb250YWluZXIpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gZWRpdGFibGVcbiAqL1xuZnVuY3Rpb24gZmlyc3REcm9wcGFibGUoZWRpdGFibGUpIHtcbiAgY29uc3QgZHJvcHBhYmxlc0NvbnRhaW5lciA9ICQoXCI8ZGl2PlwiLCB7Y2xhc3M6IFwiZHJvcHBhYmxlcy1jb250YWluZXJcIn0pO1xuXG4gIGNvbnN0IGRyb3BwYWJsZVJvdyA9ICQoXCI8ZGl2PlwiLCB7XG4gICAgY2xhc3M6IFwiZHJvcHBhYmxlIG5ldy1yb3dcIlxuICB9KS5jc3MoZ2V0Q1NTVmFsdWVzKFwibmV3Um93XCIsIGVkaXRhYmxlKSk7XG5cbiAgZHJvcHBhYmxlUm93LmRhdGEoXCJyb3dcIiwgZWRpdGFibGUpO1xuICBkcm9wcGFibGVSb3cuZGF0YShcImluc2VydEZ1bmN0aW9uXCIsICQodGhpcykuYXBwZW5kVG8pO1xuICBkcm9wcGFibGVzQ29udGFpbmVyLmFwcGVuZChkcm9wcGFibGVSb3cpO1xuXG4gIGRyb3BwYWJsZXNDb250YWluZXIuYXBwZW5kVG8oZWRpdGFibGUpO1xufSIsImltcG9ydCBDb21wb3NpdGUgZnJvbSBcIi4vY29tcG9zaXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwIGV4dGVuZHMgQ29tcG9zaXRlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZWxlbWVudHMpIHtcbiAgICBzdXBlcihuYW1lKTtcbiAgICB0aGlzLl9tX2VsZW1lbnRzID0gZWxlbWVudHM7XG4gIH1cblxuICBnZXQgZWxlbWVudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21fZWxlbWVudHM7XG4gIH1cblxuICBzZXQgZWxlbWVudHModmFsdWUpIHtcbiAgICB0aGlzLl9tX2VsZW1lbnRzID0gdmFsdWU7XG4gIH1cblxuICB0b0hUTUwoKSB7XG4gICAgY29uc3QgY29udGVudCA9ICQoXCI8ZGl2PlwiLCB7Y2xhc3M6IFwicm93XCJ9KTtcbiAgICBsZXQgY29udGFpbmVyO1xuXG4gICAgalF1ZXJ5LmVhY2godGhpcy5lbGVtZW50cywgKGtleSwgZWxlbWVudCkgPT4ge1xuICAgICAgY29udGFpbmVyID0gJChcIjxkaXY+XCIsIHtcbiAgICAgICAgY2xhc3M6IGBjb2x1bW5zIG1lZGl1bS0ke2VsZW1lbnQubGF5b3V0Lm1lZGl1bX0gbGFyZ2UtJHtlbGVtZW50LmxheW91dC5sYXJnZX1gXG4gICAgICB9KTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmQoZWxlbWVudC5jb250ZW50LnRvSFRNTCgpKTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kKGNvbnRhaW5lcik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgc2hhcmVkIGZyb20gXCIuL3NoYXJlZFwiO1xuaW1wb3J0ICogYXMgcmVzcCBmcm9tIFwiLi9yZXNwb25zaXZlXCI7XG5cbmV4cG9ydCB7cmVtb3ZlRGl2LCB1cGRhdGVSb3csIG5ld1JvdywgbmV3Q29sdW1uLCBuZXdJbnNpZGUsIG5ld05lc3RlZH07XG5leHBvcnQgKiBmcm9tIFwiLi9yZXNwb25zaXZlXCJcblxuLyoqXG4gKiBBIHNpbXBsZSAoYnV0IGF3ZXNvbWUpIHJlY3Vyc2l2ZSBmdW5jdGlvbiB0byBkZWxldGUgJ2Z1dHVyZS1lbXB0eScgYWZ0ZXIgbmVzdGluZ1xuICogRklYTUU6IEZpeCB3aGVuIHJlbW92aW5nIGJ5IG1vdmluZyB0byBhbm90aGVyIGV4aXN0aW5nIHJvd1xuICogQHBhcmFtIGVsZW1lbnRcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiByZW1vdmVEaXYoZWxlbWVudCkge1xuICBsZXQgZVBhcmVudCA9IGVsZW1lbnQucGFyZW50KCk7XG5cbiAgaWYgKGVQYXJlbnQuY2hpbGRyZW4oKS5sZW5ndGggPCAyKVxuICAgIGVsZW1lbnQgPSByZW1vdmVEaXYoZVBhcmVudCk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSByb3dcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUm93KHJvdykge1xuICBjb25zdCBjaGlsZHJlbkNvdW50ID0gcm93LmNoaWxkcmVuKCkubm90KFwiLnVpLWRyYWdnYWJsZS1kcmFnZ2luZ1wiKS5sZW5ndGgsXG4gICAgY29sdW1ucyA9IHJvdy5jaGlsZHJlbigpO1xuXG4gIGpRdWVyeS5lYWNoKGNvbHVtbnMsIChpbmRleCwgY29sdW1uKSA9PiB7XG4gICAgcmVzcC5zZXRDb2x1bW5TaXplKCQoY29sdW1uKSwgY2hpbGRyZW5Db3VudCk7XG4gIH0pO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gY29udGFpbmVyc1xuICogQHBhcmFtIHR5cGVcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gcHJlcGFyZUNvbnRhaW5lcnNPcGVyYXRpb25zKGNvbnRhaW5lcnMsIHR5cGUpIHtcbiAgY29uc3Qgb3JpZ2luID0gY29udGFpbmVyc1swXSxcbiAgICB0YXJnZXQgPSBjb250YWluZXJzWzFdLFxuICAgIGZ1bmN0aW9uc0xpc3QgPSBbXTtcblxuICBpZiAoc2hhcmVkLmhhc09uZUNoaWxkT25seShvcmlnaW4pKSB7XG4gICAgZnVuY3Rpb25zTGlzdC5wdXNoKG9yaWdpbi5yZW1vdmUpO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09IFwiY29sdW1uXCIgJiYgb3JpZ2luWzBdICE9PSB0YXJnZXRbMF0pIHtcbiAgICBpZiAoZnVuY3Rpb25zTGlzdC5sZW5ndGggIT09IDEpIHtcbiAgICAgIGZ1bmN0aW9uc0xpc3QucHVzaCgoKSA9PiB7XG4gICAgICAgIHVwZGF0ZVJvdyhvcmlnaW4pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb25zTGlzdC5wdXNoKCgpID0+IHtcbiAgICAgIHVwZGF0ZVJvdyh0YXJnZXQpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCFzaGFyZWQuaGFzT25lQ2hpbGRPbmx5KG9yaWdpbikgJiYgdHlwZSA9PT0gXCJyb3dcIikge1xuICAgIGZ1bmN0aW9uc0xpc3QucHVzaCgoKSA9PiB7XG4gICAgICB1cGRhdGVSb3cob3JpZ2luKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb25zTGlzdDtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIGRyb3BwYWJsZVxuICogQHBhcmFtIHVpXG4gKi9cbmZ1bmN0aW9uIG5ld1Jvdyhkcm9wcGFibGUsIHVpKSB7XG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBbdWkuZHJhZ2dhYmxlLnBhcmVudCgpLCBkcm9wcGFibGUuZGF0YShcInJvd1wiKS5wYXJlbnQoKV0sXG4gICAgdXBkYXRlTGlzdCA9IHByZXBhcmVDb250YWluZXJzT3BlcmF0aW9ucyhjb250YWluZXJzLCBcInJvd1wiKSxcbiAgICBkcmFnZ2FibGVzQ29udGFpbmVyID0gJChcIjxkaXY+XCIsIHtjbGFzczogXCJyb3cgZHJhZ2dhYmxlcy1jb250YWluZXJcIn0pO1xuXG4gIGNvbnN0IGRyYWdnYWJsZSA9IHVpLmRyYWdnYWJsZS5kZXRhY2goKTtcblxuICBkcmFnZ2FibGVzQ29udGFpbmVyLmFwcGVuZChkcmFnZ2FibGUpO1xuICBkcm9wcGFibGUuZGF0YShcImluc2VydEZ1bmN0aW9uXCIpLmFwcGx5KGRyYWdnYWJsZXNDb250YWluZXIsIGRyb3BwYWJsZS5kYXRhKFwicm93XCIpKTtcbiAgdXBkYXRlUm93KGRyYWdnYWJsZXNDb250YWluZXIpO1xuXG4gIGpRdWVyeS5lYWNoKHVwZGF0ZUxpc3QsIChpbmRleCwgdXBkYXRlKSA9PiB7XG4gICAgdXBkYXRlLmNhbGwoY29udGFpbmVyc1tpbmRleF0pO1xuICB9KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIGRyb3BwYWJsZVxuICogQHBhcmFtIHVpXG4gKi9cbmZ1bmN0aW9uIG5ld0NvbHVtbihkcm9wcGFibGUsIHVpKSB7XG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBbdWkuZHJhZ2dhYmxlLnBhcmVudCgpLCBkcm9wcGFibGUuZGF0YShcImNvbHVtblwiKS5wYXJlbnQoKV0sXG4gICAgdXBkYXRlTGlzdCA9IHByZXBhcmVDb250YWluZXJzT3BlcmF0aW9ucyhjb250YWluZXJzLCBcImNvbHVtblwiKTtcblxuICBjb25zdCBkcmFnZ2FibGUgPSB1aS5kcmFnZ2FibGUuZGV0YWNoKCk7XG5cbiAgZHJvcHBhYmxlLmRhdGEoXCJpbnNlcnRGdW5jdGlvblwiKS5hcHBseShkcmFnZ2FibGUsIGRyb3BwYWJsZS5kYXRhKFwiY29sdW1uXCIpKTtcblxuICBqUXVlcnkuZWFjaCh1cGRhdGVMaXN0LCAoaW5kZXgsIHVwZGF0ZSkgPT4ge1xuICAgIHVwZGF0ZS5jYWxsKGNvbnRhaW5lcnNbaW5kZXhdKTtcbiAgfSk7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBkcm9wcGFibGVcbiAqIEBwYXJhbSBkcmFnZ2FibGVcbiAqIEByZXR1cm5zIHsqW119XG4gKi9cbmZ1bmN0aW9uIHdyYXBwaW5nUm93SW50b0NvbHVtbihkcm9wcGFibGUsIGRyYWdnYWJsZSkge1xuICBjb25zdCBvbGRDb2x1bW4gPSBkcm9wcGFibGUuZGF0YShcImNvbHVtblwiKSxcbiAgICBuZXdSb3cxID0gJChcIjxkaXY+XCIsIHtjbGFzczogXCJyb3dcIn0pLFxuICAgIG5ld1JvdzIgPSAkKFwiPGRpdj5cIiwge2NsYXNzOiBcInJvd1wifSksXG4gICAgcmVwbGFjZW1lbnRDb2x1bW4gPSAkKFwiPGRpdj5cIiwge2NsYXNzOiBvbGRDb2x1bW4uYXR0cihcImNsYXNzXCIpfSk7XG5cbiAgcmVwbGFjZW1lbnRDb2x1bW4uYWRkQ2xhc3MoXCJuZXN0ZWQtY29udGFpbmVyXCIpO1xuICByZXNwLnNldENvbHVtblNpemUob2xkQ29sdW1uLCAxKTtcbiAgcmVzcC5zZXRDb2x1bW5TaXplKGRyYWdnYWJsZSwgMSk7XG4gIG5ld1JvdzIuYXBwZW5kKGRyYWdnYWJsZSk7XG4gIG9sZENvbHVtbi53cmFwKHJlcGxhY2VtZW50Q29sdW1uKTtcbiAgb2xkQ29sdW1uLndyYXAobmV3Um93MSk7XG5cbiAgcmV0dXJuIFtvbGRDb2x1bW4sIG5ld1JvdzJdO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gZHJvcHBhYmxlXG4gKiBAcGFyYW0gdWlcbiAqL1xuZnVuY3Rpb24gbmV3SW5zaWRlKGRyb3BwYWJsZSwgdWkpIHtcbiAgY29uc3QgY29udGFpbmVycyA9IFt1aS5kcmFnZ2FibGUucGFyZW50KCksIGRyb3BwYWJsZS5kYXRhKFwiY29sdW1uXCIpLnBhcmVudCgpXSxcbiAgICB1cGRhdGVMaXN0ID0gcHJlcGFyZUNvbnRhaW5lcnNPcGVyYXRpb25zKGNvbnRhaW5lcnMsIFwiY29sdW1uXCIpO1xuXG4gIGNvbnN0IGRyYWdnYWJsZSA9IHVpLmRyYWdnYWJsZS5kZXRhY2goKTtcblxuICBjb25zdCB3cmFwcGVkID0gd3JhcHBpbmdSb3dJbnRvQ29sdW1uKGRyb3BwYWJsZSwgZHJhZ2dhYmxlKTtcblxuICBkcm9wcGFibGUuZGF0YShcImluc2VydEZ1bmN0aW9uXCIpLmFwcGx5KHdyYXBwZWRbMF0ucGFyZW50KCkucGFyZW50KCksIHdyYXBwZWRbMV0pO1xuXG4gIGpRdWVyeS5lYWNoKHVwZGF0ZUxpc3QsIChpbmRleCwgdXBkYXRlKSA9PiB7XG4gICAgdXBkYXRlLmNhbGwoY29udGFpbmVyc1tpbmRleF0pO1xuICB9KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIGRyb3BwYWJsZVxuICogQHBhcmFtIHVpXG4gKi9cbmZ1bmN0aW9uIG5ld05lc3RlZChkcm9wcGFibGUsIHVpKSB7XG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBbdWkuZHJhZ2dhYmxlLnBhcmVudCgpLCBkcm9wcGFibGUuZGF0YShcInJvd1wiKS5wYXJlbnQoKV0sXG4gICAgdXBkYXRlTGlzdCA9IHByZXBhcmVDb250YWluZXJzT3BlcmF0aW9ucyhjb250YWluZXJzLCBcInJvd1wiKSxcbiAgICBkcmFnZ2FibGVzQ29udGFpbmVyID0gJChcIjxkaXY+XCIsIHtjbGFzczogXCJyb3dcIn0pO1xuXG4gIGNvbnN0IGRyYWdnYWJsZSA9IHVpLmRyYWdnYWJsZS5kZXRhY2goKTtcblxuICBkcmFnZ2FibGVzQ29udGFpbmVyLmFwcGVuZChkcmFnZ2FibGUpO1xuICBkcm9wcGFibGUuZGF0YShcImluc2VydEZ1bmN0aW9uXCIpLmFwcGx5KGRyYWdnYWJsZXNDb250YWluZXIsIGRyb3BwYWJsZS5kYXRhKFwicm93XCIpKTtcbiAgdXBkYXRlUm93KGRyYWdnYWJsZXNDb250YWluZXIpO1xuXG4gIGpRdWVyeS5lYWNoKHVwZGF0ZUxpc3QsIChpbmRleCwgdXBkYXRlKSA9PiB7XG4gICAgdXBkYXRlLmNhbGwoY29udGFpbmVyc1tpbmRleF0pO1xuICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVpcmVtZW50IHtcbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgc3VwcG9zZWQgdG8gc2V0IChvciByZXR1cm4pIGNvbHVtbnMgXCJzbWFsbFwiIHNpemVcbiAgICogdXNpbmcgY29udGVudCBoZWlnaHQuXG4gICAqIElmIGNvbHVtbidzIHNpemUgZ3JlYXRlciB0aGFuIFhYWHB4IC0+IHNtYWxsLTEyXG4gICAqIEVsc2U6XG4gICAqIEBwYXJhbSByb3dcbiAgICovXG4gIHN0YXRpYyBkZWZpbmVDb2x1bW5zUHJpb3JpdHkocm93KSB7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGNvbHVtblxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBjaGVja0NvbHVtbkxldmVsKGNvbHVtbikge1xuICAgIHJldHVybiAoY29sdW1uLnBhcmVudCgnLnJvdycpLmxlbmd0aCA+IDEpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSByb3dcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgY2hlY2tNYXhpbXVtQ29sdW1uc0J5Um93KHJvdykge1xuICAgIHJldHVybiAocm93LmNoaWxkcmVuKCkubm90KFwiLnVpLWRyYWdnYWJsZS1kcmFnZ2luZywgLmRyYWctYWN0aXZlXCIpLmxlbmd0aCA+IDMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBjb2x1bW5cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNDb2x1bW5Db250YWluaW5nUm93KGNvbHVtbikge1xuICAgIHJldHVybiAoY29sdW1uLmNoaWxkcmVuKCcucm93JykubGVuZ3RoID4gMCk7XG4gIH1cbn0iLCJleHBvcnQge2dldENvbHVtblNpemUsIHNldENvbHVtblNpemV9O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gY291bnRcbiAqIEByZXR1cm5zIHt7c21hbGw6IG51bWJlciwgbWVkaXVtOiBudW1iZXIsIGxhcmdlOiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWVzKGNvdW50KSB7XG4gIGxldCB2YWx1ZXM7XG5cbiAgc3dpdGNoIChjb3VudCkge1xuICAgIGNhc2UgMTpcbiAgICAgIHZhbHVlcyA9IHtcInNtYWxsXCI6IDEyLCBcIm1lZGl1bVwiOiAxMiwgXCJsYXJnZVwiOiAxMn07XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICB2YWx1ZXMgPSB7XCJzbWFsbFwiOiA2LCBcIm1lZGl1bVwiOiA2LCBcImxhcmdlXCI6IDZ9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgdmFsdWVzID0ge1wic21hbGxcIjogMTIsIFwibWVkaXVtXCI6IDQsIFwibGFyZ2VcIjogNH07XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICB2YWx1ZXMgPSB7XCJzbWFsbFwiOiAxMiwgXCJtZWRpdW1cIjogMywgXCJsYXJnZVwiOiAzfTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuICBjb25zb2xlLmxvZygpO1xuICByZXR1cm4gdmFsdWVzO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gY29sdW1uXG4gKiBAcGFyYW0gc2l6ZXNMaXN0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29sdW1uU2l6ZShjb2x1bW4sIHNpemVzTGlzdCkge1xuICBjb25zdCBzaXplID0ge307XG4gIGNvbnN0IGNscyA9IGNvbHVtbi5hdHRyKCdjbGFzcycpLnNwbGl0KCcgJyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoY2xzW2ldLmluZGV4T2YoXCJzbWFsbC1cIikgPiAtMSkge1xuICAgICAgc2l6ZS5zbWFsbCA9IGNsc1tpXTtcbiAgICB9XG4gICAgaWYgKGNsc1tpXS5pbmRleE9mKFwibWVkaXVtLVwiKSA+IC0xKSB7XG4gICAgICBzaXplLm1lZGl1bSA9IGNsc1tpXTtcbiAgICB9XG4gICAgaWYgKGNsc1tpXS5pbmRleE9mKFwibGFyZ2UtXCIpID4gLTEpIHtcbiAgICAgIHNpemUubGFyZ2UgPSBjbHNbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBzaXplO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gY29sdW1uXG4gKiBAcGFyYW0gY291bnRcbiAqIEBwYXJhbSBzaXplc0xpc3RcbiAqL1xuZnVuY3Rpb24gc2V0Q29sdW1uU2l6ZShjb2x1bW4sIGNvdW50LCBzaXplc0xpc3QpIHtcbiAgbGV0IHNpemU7XG5cbiAgaWYgKE51bWJlci5pc0ludGVnZXIoY291bnQpKVxuICAgIHNpemUgPSBnZXREZWZhdWx0VmFsdWVzKGNvdW50KTtcbiAgZWxzZVxuICAgIHNpemUgPSBjb3VudDtcblxuICBpZiAoc2l6ZS5zbWFsbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc2l6ZS5zbWFsbCA9IGdldENvbHVtblNpemUoY29sdW1uKS5zbWFsbDtcbiAgICBzaXplLnNtYWxsID0gc2l6ZS5zbWFsbC5zbGljZSg2LCBzaXplLnNtYWxsLmxlbmd0aCk7XG4gIH1cblxuICBjb2x1bW4ucmVtb3ZlQ2xhc3MoKGluZGV4LCBjc3MpID0+IChjc3MubWF0Y2goLyhefFxccylzbWFsbC1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJykpO1xuICBjb2x1bW4ucmVtb3ZlQ2xhc3MoKGluZGV4LCBjc3MpID0+IChjc3MubWF0Y2goLyhefFxccyltZWRpdW0tXFxTKy9nKSB8fCBbXSkuam9pbignICcpKTtcbiAgY29sdW1uLnJlbW92ZUNsYXNzKChpbmRleCwgY3NzKSA9PiAoY3NzLm1hdGNoKC8oXnxcXHMpbGFyZ2UtXFxTKy9nKSB8fCBbXSkuam9pbignICcpKTtcbiAgY29sdW1uLmFkZENsYXNzKGBzbWFsbC0ke3NpemUuc21hbGx9IG1lZGl1bS0ke3NpemUubWVkaXVtfSBsYXJnZS0ke3NpemUubGFyZ2V9YCk7XG59XG4iLCIvKlxuICogUGFyYW3DqHRyZXMgZGVzIFR5cGVzIGV0IENsYXNzZXMgw6lkaXRhYmxlc1xuICovXG5cbmxldCBwYXJhbUxpc3QgPSB7XG4gICdQJzogW1wiY29sb3JcIiwgXCJmb250LXNpemVcIiwgXCJtYXJnaW5cIiwgXCJwYWRkaW5nXCIsIFwibGV0dGVyLXNwYWNpbmdcIiwgXCJsaW5lLWhlaWdodFwiLCBcInRleHQtYWxpZ25cIixcbiAgICBcInRleHQtdHJhbnNmb3JtXCIsIFwidGV4dC1zaGFkb3dcIiwgXCJmb250LXdlaWdodFwiXSxcbiAgJ0EnOiBbXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiYm9yZGVyXCIsIFwiYm9yZGVyLXJhZGl1c1wiLCBcImNvbG9yXCIsIFwibWFyZ2luXCIsIFwicGFkZGluZ1wiLCBcImxldHRlci1zcGFjaW5nXCIsXG4gICAgXCJsaW5lLWhlaWdodFwiLCBcInRleHQtYWxpZ25cIiwgXCJ0ZXh0LXRyYW5zZm9ybVwiLCBcInRleHQtc2hhZG93XCIsIFwiZm9udC13ZWlnaHRcIl0sXG4gICdIMSc6IFtcImNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiLCBcImZvbnQtc2l6ZVwiLCBcIm1hcmdpblwiLCBcInBhZGRpbmdcIiwgXCJsZXR0ZXItc3BhY2luZ1wiLCBcImxpbmUtaGVpZ2h0XCIsXG4gICAgXCJ0ZXh0LWFsaWduXCIsIFwidGV4dC10cmFuc2Zvcm1cIiwgXCJ0ZXh0LXNoYWRvd1wiLCBcImZvbnQtd2VpZ2h0XCJdLFxuICAnSDInOiBbXCJjb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIiwgXCJmb250LXNpemVcIiwgXCJtYXJnaW5cIiwgXCJwYWRkaW5nXCIsIFwibGV0dGVyLXNwYWNpbmdcIiwgXCJsaW5lLWhlaWdodFwiLFxuICAgIFwidGV4dC1hbGlnblwiLCBcInRleHQtdHJhbnNmb3JtXCIsIFwidGV4dC1zaGFkb3dcIiwgXCJmb250LXdlaWdodFwiXSxcbiAgJ0gzJzogW1wiY29sb3JcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiZm9udC1zaXplXCIsIFwibWFyZ2luXCIsIFwicGFkZGluZ1wiLCBcImxldHRlci1zcGFjaW5nXCIsIFwibGluZS1oZWlnaHRcIixcbiAgICBcInRleHQtYWxpZ25cIiwgXCJ0ZXh0LXRyYW5zZm9ybVwiLCBcInRleHQtc2hhZG93XCIsIFwiZm9udC13ZWlnaHRcIl0sXG4gICdINCc6IFtcImNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiLCBcImZvbnQtc2l6ZVwiLCBcIm1hcmdpblwiLCBcInBhZGRpbmdcIiwgXCJsZXR0ZXItc3BhY2luZ1wiLCBcImxpbmUtaGVpZ2h0XCIsXG4gICAgXCJ0ZXh0LWFsaWduXCIsIFwidGV4dC10cmFuc2Zvcm1cIiwgXCJ0ZXh0LXNoYWRvd1wiLCBcImZvbnQtd2VpZ2h0XCJdLFxuICAnSDUnOiBbXCJjb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIiwgXCJmb250LXNpemVcIiwgXCJtYXJnaW5cIiwgXCJwYWRkaW5nXCIsIFwibGV0dGVyLXNwYWNpbmdcIiwgXCJsaW5lLWhlaWdodFwiLFxuICAgIFwidGV4dC1hbGlnblwiLCBcInRleHQtdHJhbnNmb3JtXCIsIFwidGV4dC1zaGFkb3dcIiwgXCJmb250LXdlaWdodFwiXSxcbiAgJ0g2JzogW1wiY29sb3JcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiZm9udC1zaXplXCIsIFwibWFyZ2luXCIsIFwicGFkZGluZ1wiLCBcImxldHRlci1zcGFjaW5nXCIsIFwibGluZS1oZWlnaHRcIixcbiAgICBcInRleHQtYWxpZ25cIiwgXCJ0ZXh0LXRyYW5zZm9ybVwiLCBcInRleHQtc2hhZG93XCIsIFwiZm9udC13ZWlnaHRcIl0sXG4gICdESVYnOiBbXCJiYWNrZ3JvdW5kXCIsIFwibWFyZ2luXCIsIFwicGFkZGluZ1wiLCBcImJvcmRlci1zdHlsZVwiLCBcImJvcmRlci13aWR0aFwiLCBcImJvcmRlci1jb2xvclwiLCBcImJvcmRlci1yYWRpdXNcIiwgXCJib3gtc2hhZG93XCJdLFxuICAnSU1HJzogW1wibWFyZ2luXCIsIFwiYm9yZGVyLXJhZGl1c1wiLCBcIm9wYWNpdHlcIiwgXCJ3aWR0aFwiXSxcbiAgJ0xBQkVMJzogW1wiY29sb3JcIiwgXCJmb250LXNpemVcIiwgXCJ0ZXh0LXNoYWRvd1wiLCBcInRleHQtdHJhbnNmb3JtXCJdLFxuICAnSU5QVVQnOiBbXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiY29sb3JcIiwgXCJmb250LXNpemVcIiwgXCJib3JkZXJcIiwgXCJib3JkZXItcmFkaXVzXCIsIFwiYm94LXNoYWRvd1wiLCBcImZvbnQtc2l6ZVwiLFxuICAgIFwibWFyZ2luXCIsIFwicGFkZGluZ1wiLCBcInRleHQtYWxpZ25cIl0sXG4gICdTRUxFQ1QnOiBbXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiYm9yZGVyXCIsIFwiYm9yZGVyLXJhZGl1c1wiLCBcImJveC1zaGFkb3dcIiwgXCJmb250LXNpemVcIiwgXCJtYXJnaW5cIiwgXCJwYWRkaW5nXCIsXG4gICAgXCJ0ZXh0LWFsaWduXCJdLFxuICAnVEVYVEFSRUEnOiBbXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiYm9yZGVyXCIsIFwiYm9yZGVyLXJhZGl1c1wiLCBcImJveC1zaGFkb3dcIiwgXCJmb250LXNpemVcIiwgXCJoZWlnaHRcIiwgXCJtYXJnaW5cIixcbiAgICBcInBhZGRpbmdcIiwgXCJ0ZXh0LWFsaWduXCJdLFxuICAnT1BUSU9OJzogW1wiYmFja2dyb3VuZC1jb2xvclwiLCBcImNvbG9yXCIsIFwiZm9udC1zaXplXCIsIFwidGV4dC10cmFuc2Zvcm1cIl0sXG4gICdCVVRUT04nOiBbXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiY29sb3JcIiwgXCJmb250LXNpemVcIiwgXCJtYXJnaW5cIiwgXCJwYWRkaW5nXCIsIFwiYm9yZGVyXCIsIFwiYm9yZGVyLXJhZGl1c1wiLFxuICAgIFwiYm94LXNoYWRvd1wiLCBcImZvbnQtd2VpZ2h0XCIsIFwidGV4dC10cmFuc2Zvcm1cIiwgXCJ0ZXh0LXNoYWRvd1wiLCBcIm9wYWNpdHlcIl1cbn07XG5cbi8qKlxuICpcbiAqIEByZXR1cm5zIHt7UDogc3RyaW5nW10sIEE6IHN0cmluZ1tdLCBIMTogc3RyaW5nW10sIEgyOiBzdHJpbmdbXSwgSDM6IHN0cmluZ1tdLCBINDogc3RyaW5nW10sIEg1OiBzdHJpbmdbXSwgSDY6IHN0cmluZ1tdLCBESVY6IHN0cmluZ1tdLCBJTUc6IHN0cmluZ1tdLCBMQUJFTDogc3RyaW5nW10sIElOUFVUOiBzdHJpbmdbXSwgU0VMRUNUOiBzdHJpbmdbXSwgVEVYVEFSRUE6IHN0cmluZ1tdLCBPUFRJT046IHN0cmluZ1tdLCBCVVRUT046IHN0cmluZ1tdfX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1c3RvbWl6YWJsZXMoKSB7XG4gIHJldHVybiBwYXJhbUxpc3Q7XG59XG5cbmxldCBvcHRMaXN0ID0ge1xuICAnZm9udC13ZWlnaHQnOiBbXCJub3JtYWxcIiwgXCJib2xkXCIsIFwiYm9sZGVyXCIsIFwibGlnaHRlclwiLCBcImluaXRpYWxcIiwgXCJpbmhlcml0XCJdLFxuICAndGV4dC1hbGlnbic6IFtcImxlZnRcIiwgXCJyaWdodFwiLCBcImNlbnRlclwiLCBcImp1c3RpZnlcIiwgXCJpbml0aWFsXCIsIFwiaW5oZXJpdFwiXSxcbiAgJ3RleHQtdHJhbnNmb3JtJzogW1wibm9uZVwiLCBcImNhcGl0YWxpemVcIiwgXCJ1cHBlcmNhc2VcIiwgXCJsb3dlcmNhc2VcIiwgXCJpbml0aWFsXCIsIFwiaW5oZXJpdFwiXVxufTtcblxuLypcbiAqIExpc3RlIGRlcyBPcHRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvcHRpb25MaXN0KHNlbGVjdCwgZGVmYXVsdF9vcHRpb24pIHtcbiAgdmFyIG9wdGlvbnMgPSBcIlwiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdExpc3Rbc2VsZWN0XS5sZW5ndGg7IGkrKykge1xuICAgIG9wdGlvbnMgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIiArIG9wdExpc3Rbc2VsZWN0XVtpXSArIFwiJyBcIjtcbiAgICBpZiAoZGVmYXVsdF9vcHRpb24gPT09IG9wdExpc3Rbc2VsZWN0XVtpXSkge1xuICAgICAgb3B0aW9ucyArPSBcInNlbGVjdGVkXCJcbiAgICB9XG4gICAgb3B0aW9ucyArPSBcIj5cIiArIG9wdExpc3Rbc2VsZWN0XVtpXSArIFwiPC9vcHRpb24+XCI7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8qXG4gKiBMaXN0ZSBkZXMgT3V0aWxzXG4gKi9cbi8qXG5mdW5jdGlvbiB0b29sTGlzdCh0YXJnZXQsIHR5cGV0KSB7XG4gIHZhciBjb250ZW51ID0gXCJcIjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbUxpc3RbdHlwZXRdLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHBhcmFtTGlzdFt0eXBldF1baV0gPT09IFwidGV4dC1hbGlnblwiIHx8IHBhcmFtTGlzdFt0eXBldF1baV0gPT09IFwidGV4dC10cmFuc2Zvcm1cIiB8fCBwYXJhbUxpc3RbdHlwZXRdW2ldID09PSBcImZvbnQtd2VpZ2h0XCIpIHtcbiAgICAgIGNvbnRlbnUgKz0gXCI8bGFiZWw+XCIgKyBwYXJhbUxpc3RbdHlwZXRdW2ldICsgXCI8c2VsZWN0IGRhdGEtY3NzPSdcIiArIHBhcmFtTGlzdFt0eXBldF1baV0gKyBcIic+XCIgKyBvcHRpb25MaXN0KHBhcmFtTGlzdFt0eXBldF1baV0sICQoXCIjcmVzdWx0XCIpLmNvbnRlbnRzKCkuZmluZCh0YXJnZXQpLmNzcyhwYXJhbUxpc3RbdHlwZXRdW2ldKSkgKyBcIjwvc2VsZWN0PjwvbGFiZWw+XCI7XG4gICAgfSBlbHNlIGlmIChwYXJhbUxpc3RbdHlwZXRdW2ldID09PSBcImJhY2tncm91bmRcIikge1xuICAgICAgY29udGVudSArPSBcIjxsYWJlbD5cIiArIHBhcmFtTGlzdFt0eXBldF1baV0gKyBcIjx0ZXh0YXJlYSBkYXRhLWNzcz0nXCIgKyBwYXJhbUxpc3RbdHlwZXRdW2ldICsgXCInIHBsYWNlaG9sZGVyPSdcIiArICQoXCIjcmVzdWx0XCIpLmNvbnRlbnRzKCkuZmluZCh0YXJnZXQpLmNzcyhwYXJhbUxpc3RbdHlwZXRdW2ldKSArIFwiJz5cIiArICQoXCIjcmVzdWx0XCIpLmNvbnRlbnRzKCkuZmluZCh0YXJnZXQpLmNzcyhwYXJhbUxpc3RbdHlwZXRdW2ldKSArIFwiPC90ZXh0YXJlYT48L2xhYmVsPlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW51ICs9IFwiPGxhYmVsPlwiICsgcGFyYW1MaXN0W3R5cGV0XVtpXSArIFwiPGlucHV0IHR5cGU9J3RleHQnIGRhdGEtY3NzPSdcIiArIHBhcmFtTGlzdFt0eXBldF1baV0gKyBcIicgdmFsdWU9J1wiICsgJChcIiNyZXN1bHRcIikuY29udGVudHMoKS5maW5kKHRhcmdldCkuY3NzKHBhcmFtTGlzdFt0eXBldF1baV0pICsgXCInIHBsYWNlaG9sZGVyPSdcIiArICQoXCIjcmVzdWx0XCIpLmNvbnRlbnRzKCkuZmluZCh0YXJnZXQpLmNzcyhwYXJhbUxpc3RbdHlwZXRdW2ldKSArIFwiJz48L2xhYmVsPlwiO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29udGVudTtcbn1cbiAqL1xuXG4vKlxuICogQXNzaWduYXRpb24gZGVzIGNoYW1wc1xuICovXG4vKlxuICQoXCJkbFtpZD0ndG9vbGJveCddIGlucHV0LHNlbGVjdCx0ZXh0YXJlYVwiKS5vbihcImNoYW5nZSBpbnB1dFwiLCBmdW5jdGlvbiAoKSB7XG4gdmFyIG5vZGUgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoXCJuYW1lXCIpO1xuIGlmICghZGF0YVsnY2hpbGRyZW4nXS5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuIGRhdGFbJ2NoaWxkcmVuJ11bbm9kZV0gPSB7fTtcbiB9XG4gaWYgKCFkYXRhWydjaGlsZHJlbiddW25vZGVdLmhhc093blByb3BlcnR5KCdhdHRyaWJ1dGVzJykpIHtcbiBkYXRhWydjaGlsZHJlbiddW25vZGVdWydhdHRyaWJ1dGVzJ10gPSB7fTtcbiB9XG4gaWYgKCFkYXRhWydjaGlsZHJlbiddW25vZGVdWydhdHRyaWJ1dGVzJ10uaGFzT3duUHJvcGVydHkoJCh0aGlzKS5hdHRyKFwiZGF0YS1jc3NcIikpKSB7XG4gZGF0YVsnY2hpbGRyZW4nXVtub2RlXVsnYXR0cmlidXRlcyddWyQodGhpcykuYXR0cihcImRhdGEtY3NzXCIpXSA9IG51bGw7XG4gfVxuIGRhdGFbJ2NoaWxkcmVuJ11bbm9kZV1bJ2F0dHJpYnV0ZXMnXVskKHRoaXMpLmF0dHIoXCJkYXRhLWNzc1wiKV0gPSAkKHRoaXMpLnZhbCgpO1xuIGlmIChkYXRhWydjaGlsZHJlbiddW25vZGVdWydhdHRyaWJ1dGVzJ11bJCh0aGlzKS5hdHRyKFwiZGF0YS1jc3NcIildID09IFwiXCIpIHtcbiBkZWxldGUgZGF0YVsnY2hpbGRyZW4nXVtub2RlXVsnYXR0cmlidXRlcyddWyQodGhpcykuYXR0cihcImRhdGEtY3NzXCIpXTtcbiB9XG4gLy9yZWxvYWRDU1MoKTtcbiB9KTtcbiAqLyIsImV4cG9ydCB7aGFzT25lQ2hpbGRPbmx5fTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHJvd1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGhhc09uZUNoaWxkT25seShyb3cpIHtcbiAgcmV0dXJuICgocm93LmNoaWxkcmVuKCkubm90KFwiLnVpLWRyYWdnYWJsZS1kcmFnZ2luZ1wiKS5sZW5ndGggPT09IDEpXG4gICYmIChyb3cuY2hpbGRyZW4oXCIudWktZHJhZ2dhYmxlLWRyYWdnaW5nXCIpLmxlbmd0aCA9PT0gMSkpO1xufVxuIiwiaW1wb3J0IENvbXBvc2l0ZSBmcm9tIFwiLi9jb21wb3NpdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RydWN0dXJlIGV4dGVuZHMgQ29tcG9zaXRlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgcGFyZW50cywgY2hpbGRyZW5zKSB7XG4gICAgc3VwZXIobmFtZSk7XG4gICAgdGhpcy5fbV9wYXJlbnQgPSBwYXJlbnRzO1xuICAgIHRoaXMuX21fY2hpbGRyZW5zID0gY2hpbGRyZW5zO1xuICB9XG5cbiAgZ2V0IHBhcmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbV9wYXJlbnQ7XG4gIH1cblxuICBzZXQgcGFyZW50KHZhbHVlKSB7XG4gICAgdGhpcy5fbV9wYXJlbnQgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBjaGlsZHJlbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21fY2hpbGRyZW5zO1xuICB9XG5cbiAgc2V0IGNoaWxkcmVucyh2YWx1ZSkge1xuICAgIHRoaXMuX21fY2hpbGRyZW5zID0gdmFsdWU7XG4gIH1cblxuICB0b0hUTUwoKSB7XG4gICAgY29uc3QgY29udGVudCA9ICQoYDwke3RoaXMucGFyZW50LnRhZ30+YCwgdGhpcy5wYXJlbnQuYXR0cmlidXRlcyk7XG5cbiAgICBqUXVlcnkuZWFjaCh0aGlzLmNoaWxkcmVucywgKGtleSwgY2hpbGRyZW4pID0+IHtcbiAgICAgIGNvbnRlbnQuYXBwZW5kKGNoaWxkcmVuLnRvSFRNTCgpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb250ZW50O1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyByZXNwIGZyb20gXCIuL3Jlc3BvbnNpdmVcIjtcblxuZXhwb3J0IHtleHBvcnRUZW1wbGF0ZSwgaW1wb3J0VGVtcGxhdGV9O1xuXG5mdW5jdGlvbiBleHBvcnRUZW1wbGF0ZShub2RlKSB7XG4gIC8qXG4gICBqUXVlcnkuZWFjaChub2RlcywgKGluZGV4LCBub2RlKSA9PiB7XG4gICB3aW5kb3cuY29uc29sZS5sb2cobm9kZSk7XG4gICB9KTtcbiAgICovXG5cbiAgLy9sZXQgdGVzdCA9IHRvSlNPTihub2RlKTtcblxuICAvL2xldCBmaW5hbEpTT04gPSBKU09OLnN0cmluZ2lmeSh0ZXN0LCBudWxsLCAyKTtcblxuICB3aW5kb3cuY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodG9KU09OKG5vZGUpKSk7XG4gIC8vd2luZG93LmNvbnNvbGUubG9nKGZpbmFsSlNPTik7XG59XG5cbmZ1bmN0aW9uIGltcG9ydFRlbXBsYXRlKCkge1xuICBhbGVydChcIlRlc3RcIik7XG59XG5cblxuZnVuY3Rpb24gdG9KU09OKG5vZGUpIHtcbiAgbm9kZSA9IG5vZGUgfHwgdGhpcztcblxuICBsZXQgb2JqID0ge307XG4gIGxldCBub2RlVHlwZTtcbiAgbGV0IG5vZGVTaXplID0gZmFsc2U7XG5cbiAgaWYgKCQobm9kZSkuaGFzQ2xhc3MoXCJlZGl0YWJsZVwiKSkge1xuICAgIG5vZGVUeXBlID0gXCJjb250YWluZXJcIjtcbiAgfVxuICBlbHNlIGlmICgkKG5vZGUpLmhhc0NsYXNzKFwicm93XCIpKSB7XG4gICAgbm9kZVR5cGUgPSBcInJvd1wiO1xuICB9XG4gIGVsc2UgaWYgKCQobm9kZSkuaGFzQ2xhc3MoXCJjb2x1bW5zXCIpKSB7XG4gICAgbm9kZVR5cGUgPSBcImNvbHVtbnNcIjtcbiAgICBub2RlU2l6ZSA9IHRydWU7XG4gIH1cbiAgZWxzZSB7XG4gICAgbm9kZVR5cGUgPSAkKG5vZGUpLnByb3AoXCJ0YWdOYW1lXCIpO1xuICB9XG5cblxuICBpZiAobm9kZVNpemUpIHtcbiAgICBsZXQgc2l6ZSA9IHJlc3AuZ2V0Q29sdW1uU2l6ZSgkKG5vZGUpKTtcbiAgICBvYmpbXCJAc21hbGxcIl0gPSBwYXJzZUludChzaXplLnNtYWxsLnNsaWNlKDYsIHNpemUuc21hbGwubGVuZ3RoKSk7XG4gICAgb2JqW1wiQGxhcmdlXCJdID0gcGFyc2VJbnQoc2l6ZS5sYXJnZS5zbGljZSg2LCBzaXplLmxhcmdlLmxlbmd0aCkpO1xuICB9XG5cbiAgb2JqW1wiQGNsYXNzXCJdID0gXCJUZXN0XCI7IC8vbm9kZS5jbGFzc0xpc3Q7XG5cbiAgbGV0IGNoaWxkTm9kZXMgPSAkKG5vZGUpLmNoaWxkcmVuKCk7XG5cbiAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoID4gMCAmJiBub2RlVHlwZSAhPT0gXCJQXCIpIHtcbiAgICBvYmpbbm9kZVR5cGVdID0gW107XG4gICAgalF1ZXJ5LmVhY2goY2hpbGROb2RlcywgKGluZGV4LCBjaGlsZE5vZGUpID0+IHtcbiAgICAgIGlmICgkKG5vZGUpLm5vdChcIi5qcy1vZmYtY2FudmFzLWV4aXRcIikpXG4gICAgICAgIG9ialtub2RlVHlwZV0ucHVzaCh0b0pTT04oY2hpbGROb2RlKSk7XG4gICAgfSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKG5vZGVUeXBlID09PSBcIlBcIikge1xuICAgICAgb2JqW25vZGVUeXBlXSA9ICQobm9kZSkuaHRtbCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG9ialtub2RlVHlwZV0gPSAkKG5vZGUpLnRleHQoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiB0b0RPTShvYmopIHtcbiAgaWYgKHR5cGVvZiBvYmogPT0gJ3N0cmluZycpIHtcbiAgICBvYmogPSBKU09OLnBhcnNlKG9iaik7XG4gIH1cbiAgbGV0IG5vZGUsIG5vZGVUeXBlID0gb2JqLm5vZGVUeXBlO1xuICBzd2l0Y2ggKG5vZGVUeXBlKSB7XG4gICAgY2FzZSAxOiAvL0VMRU1FTlRfTk9ERVxuICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQob2JqLnRhZ05hbWUpO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBvYmouYXR0cmlidXRlcyB8fCBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxldCBhdHRyID0gYXR0cmlidXRlc1tpXTtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0clswXSwgYXR0clsxXSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6IC8vVEVYVF9OT0RFXG4gICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUob2JqLm5vZGVWYWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDg6IC8vQ09NTUVOVF9OT0RFXG4gICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChvYmoubm9kZVZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgOTogLy9ET0NVTUVOVF9OT0RFXG4gICAgICBub2RlID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnQoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTA6IC8vRE9DVU1FTlRfVFlQRV9OT0RFXG4gICAgICBub2RlID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnRUeXBlKG9iai5ub2RlTmFtZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDExOiAvL0RPQ1VNRU5UX0ZSQUdNRU5UX05PREVcbiAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgaWYgKG5vZGVUeXBlID09IDEgfHwgbm9kZVR5cGUgPT0gMTEpIHtcbiAgICBsZXQgY2hpbGROb2RlcyA9IG9iai5jaGlsZE5vZGVzIHx8IFtdO1xuICAgIGxldCBpO1xuICAgIGxldCBsZW4gPSBjaGlsZE5vZGVzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodG9ET00oY2hpbGROb2Rlc1tpXSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKlxuICovXG5mdW5jdGlvbiByZWxvYWRDU1MoKSB7XG4gIGNvbnN0IHJlcyA9ICQoXCIjcmVzdWx0XCIpO1xuICByZXMuY29udGVudHMoKS5maW5kKFwiKlwiKS5yZW1vdmVBdHRyKFwic3R5bGVcIik7XG4gIGZvciAobGV0IGluaXQgPSAwOyBpbml0IDwgMzsgaW5pdCsrKSB7XG4gICAgZm9yIChsZXQgdGFyZ2V0IGluIGRhdGFbJ2NoaWxkcmVuJ10pIHtcbiAgICAgIGlmICgoIXRhcmdldC5tYXRjaChcIl4uXCIpICYmICF0YXJnZXQubWF0Y2goXCJeI1wiKSAmJiBpbml0ID09IDApXG4gICAgICAgIHx8ICh0YXJnZXQubWF0Y2goXCJeLlwiKSAmJiBpbml0ID09IDEpXG4gICAgICAgIHx8ICh0YXJnZXQubWF0Y2goXCJeI1wiKSAmJiBpbml0ID09IDIpKVxuICAgICAgICBmb3IgKGxldCBjc3NOYW1lIGluIGRhdGFbJ2NoaWxkcmVuJ11bdGFyZ2V0XVsnYXR0cmlidXRlcyddKVxuICAgICAgICAgIHJlcy5jb250ZW50cygpLmZpbmQodGFyZ2V0KS5jc3MoY3NzTmFtZSwgZGF0YVsnY2hpbGRyZW4nXVt0YXJnZXRdWydhdHRyaWJ1dGVzJ11bY3NzTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqXG4gKi9cbiQoXCIjZXhwb3J0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBkZGxUZW1wbGF0ZSgpO1xufSk7XG5cbmZ1bmN0aW9uIGRkbFRlbXBsYXRlKCkge1xuICBsZXQgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgbGV0IG5vdyA9IG5ldyBEYXRlKERhdGUubm93KCkpO1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgc2Vjb25kOiAnMi1kaWdpdCdcbiAgfTtcblxuICBhLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBkb2N1bWVudC5kb21haW4gKyAnXycgKyBub3cudG9Mb2NhbGVEYXRlU3RyaW5nKCdmci1GUicsIG9wdGlvbnMpICsgJy5qc29uJyk7XG4gIGEuaHJlZiA9ICdkYXRhOmFwcGxpY2F0aW9uL2pzb24sJyArIGV4cG9ydFRlbXBsYXRlKCk7XG4gIGEuaW5uZXJIVE1MID0gJ3Rlc3RpbmcnO1xuICBhLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG5cbiAgYS5jbGljaygpO1xufVxuXG4vKipcbiAqXG4gKi9cbiQoXCIjaW1wb3J0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAkKFwiI2ZpbGVJbnB1dFwiKS5jbGljaygpO1xuICB0b0RPTSgpO1xuICByZWxvYWRDU1MoKTtcbn0pO1xuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9jb21wb25lbnRcIjtcbmltcG9ydCBTdHJ1Y3R1cmUgZnJvbSBcIi4vc3RydWN0dXJlXCI7XG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIjtcblxuLy8gVE9ETzogSW1wcm92ZSB0aGlzIG1lc3NcblxuY29uc3Qgc2hvcnRMb3JlbUlwc3VtID0gXCJXaW5nYXJkaXVtIExldmlvc2FcIixcbiAgbG9yZW1JcHN1bSA9IGBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4gVXQgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2kgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC4gRHVpcyBhdXRlIGlydXJlIGRvbG9yIGluIHJlcHJlaGVuZGVyaXQgaW4gdm9sdXB0YXRlIHZlbGl0IGVzc2UgY2lsbHVtIGRvbG9yZSBldSBmdWdpYXQgbnVsbGEgcGFyaWF0dXIuIEV4Y2VwdGV1ciBzaW50IG9jY2FlY2F0IGN1cGlkYXRhdCBub24gcHJvaWRlbnQsIHN1bnQgaW4gY3VscGEgcXVpIG9mZmljaWEgZGVzZXJ1bnQgbW9sbGl0IGFuaW0gaWQgZXN0IGxhYm9ydW0uYDtcblxubGV0IHBhcmFtZXRlcnNDb21wb25lbnRzID0gW1xuICB7aWQ6IFwiaGVhZGVyMVwiLCBuYW1lOiBcIkhlYWRlciAxXCIsIHRhZzogXCJoMVwiLCBhdHRyaWJ1dGVzOiB7Y2xhc3M6IFwidGlueS1tY2VcIiwgXCJ0ZXh0XCI6IHNob3J0TG9yZW1JcHN1bX19LFxuICB7aWQ6IFwiaGVhZGVyMlwiLCBuYW1lOiBcIkhlYWRlciAyXCIsIHRhZzogXCJoMlwiLCBhdHRyaWJ1dGVzOiB7Y2xhc3M6IFwidGlueS1tY2VcIiwgXCJ0ZXh0XCI6IHNob3J0TG9yZW1JcHN1bX19LFxuICB7aWQ6IFwiaGVhZGVyM1wiLCBuYW1lOiBcIkhlYWRlciAzXCIsIHRhZzogXCJoM1wiLCBhdHRyaWJ1dGVzOiB7Y2xhc3M6IFwidGlueS1tY2VcIiwgXCJ0ZXh0XCI6IHNob3J0TG9yZW1JcHN1bX19LFxuICB7aWQ6IFwiaGVhZGVyNFwiLCBuYW1lOiBcIkhlYWRlciA0XCIsIHRhZzogXCJoNFwiLCBhdHRyaWJ1dGVzOiB7Y2xhc3M6IFwidGlueS1tY2VcIiwgXCJ0ZXh0XCI6IHNob3J0TG9yZW1JcHN1bX19LFxuICB7aWQ6IFwiaGVhZGVyNVwiLCBuYW1lOiBcIkhlYWRlciA1XCIsIHRhZzogXCJoNVwiLCBhdHRyaWJ1dGVzOiB7Y2xhc3M6IFwidGlueS1tY2VcIiwgXCJ0ZXh0XCI6IHNob3J0TG9yZW1JcHN1bX19LFxuICB7aWQ6IFwiaGVhZGVyNlwiLCBuYW1lOiBcIkhlYWRlciA2XCIsIHRhZzogXCJoNlwiLCBhdHRyaWJ1dGVzOiB7Y2xhc3M6IFwidGlueS1tY2VcIiwgXCJ0ZXh0XCI6IHNob3J0TG9yZW1JcHN1bX19LFxuICB7aWQ6IFwicFwiLCBuYW1lOiBcIlBhcmFncmFwaGVcIiwgdGFnOiBcInBcIiwgYXR0cmlidXRlczoge2NsYXNzOiBcInRpbnktbWNlXCIsIFwidGV4dFwiOiBzaG9ydExvcmVtSXBzdW19fSxcbiAge1xuICAgIGlkOiBcInJ0XCIsIG5hbWU6IFwiVGV4dGUgUmljaGVcIiwgdGFnOiBcImRpdlwiLCBhdHRyaWJ1dGVzOiB7XG4gICAgY2xhc3M6IFwidGlueS1tY2VcIixcbiAgICBcImRhdGEtdGV4dFwiOiBcIkRvdWJsZS1jbGlxdWV6IHBvdXIgw6lkaXRlclwiLFxuICAgIFwidGV4dFwiOiBsb3JlbUlwc3VtXG4gIH1cbiAgfSxcbiAge1xuICAgIGlkOiBcImltZ1wiLCBuYW1lOiBcIkltYWdlXCIsIHRhZzogXCJpbWdcIiwgYXR0cmlidXRlczoge1xuICAgIFwic3JjXCI6IFwiaHR0cHM6Ly9wbGFjZWhvbGRpdC5pbWdpeC5uZXQvfnRleHQ/dHh0c2l6ZT00MiZ0eHQ9WW91citQaWN0dXJlK0hlcmUmdz0yNTAmaD0xNTBcIlxuICB9XG4gIH0sXG4gIHtcbiAgICBpZDogXCJidG5cIiwgbmFtZTogXCJCdXR0b25cIiwgdGFnOiBcImJ1dHRvblwiLCBhdHRyaWJ1dGVzOiB7XG4gICAgY2xhc3M6IFwic3VjY2VzcyBidXR0b25cIixcbiAgICBcInRleHRcIjogXCJDbGljayBtZVwiXG4gIH1cbiAgfVxuXTtcblxubGV0IFRvb2wgPSB7XG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBpbml0Q29tcG9uZW50cygpIHtcbiAgICBsZXQgY29tcG9uZW50cyA9IHt9O1xuXG4gICAgZm9yIChsZXQgcGFyYW1ldGVycyBvZiBwYXJhbWV0ZXJzQ29tcG9uZW50cykge1xuICAgICAgY29tcG9uZW50c1tgJHtwYXJhbWV0ZXJzLmlkfWBdID0gbmV3IENvbXBvbmVudChwYXJhbWV0ZXJzLm5hbWUsIHBhcmFtZXRlcnMudGFnLCBwYXJhbWV0ZXJzLmF0dHJpYnV0ZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBjb21wb25lbnRzO1xuICB9LFxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gY29tcG9uZW50c1xuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBpbml0U3RydWN0dXJlcyhjb21wb25lbnRzKSB7XG4gICAgbGV0IHN0cnVjdHVyZXMgPSB7fTtcblxuICAgIGNvbnN0IG1lZGlhT2JqZWN0ID0gKG5ldyBDb21wb25lbnQoXCJNZWRpYU9iamVjdFwiLCBcImRpdlwiLCB7Y2xhc3M6IFwibWVkaWEtb2JqZWN0XCJ9KSk7XG5cbiAgICBjb25zdCBtZWRpYU9iamVjdFN0YWNrID0gKG5ldyBDb21wb25lbnQoXCJNZWRpYU9iamVjdFwiLCBcImRpdlwiLCB7Y2xhc3M6IFwibWVkaWEtb2JqZWN0IHN0YWNrLWZvci1zbWFsbFwifSkpO1xuXG4gICAgY29uc3QgbWVkaWFPYmplY3RTZWN0aW9uID0gKG5ldyBDb21wb25lbnQoXCJNT1MxXCIsIFwiZGl2XCIsIHtjbGFzczogXCJtZWRpYS1vYmplY3Qtc2VjdGlvblwifSkpO1xuXG4gICAgY29uc3QgaGVhZGVySW1nID0gKG5ldyBTdHJ1Y3R1cmUoXCJoZWFkZXJJbWdcIiwgbWVkaWFPYmplY3RTZWN0aW9uLFxuICAgICAgW25ldyBDb21wb25lbnQoXCJMaXR0bGUgSW1nXCIsIFwiaW1nXCIsIHtcbiAgICAgICAgICBcInNyY1wiOiBcImh0dHBzOi8vcGxhY2Vob2xkaXQuaW1naXgubmV0L350ZXh0P3R4dHNpemU9NDImdHh0PVlvdXIrUGljdHVyZStIZXJlJnc9MjUwJmg9MTUwXCIsXG4gICAgICAgICAgXCJzdHlsZVwiOiBcIndpZHRoOiAyMHB4OyBoZWlnaHQ6IDIwcHhcIlxuICAgICAgICB9XG4gICAgICApXVxuICAgICkpO1xuXG4gICAgY29uc3QgaGVhZGVyVGl0bGUgPSAobmV3IFN0cnVjdHVyZShcImhlYWRlclRpdGxlXCIsIG1lZGlhT2JqZWN0U2VjdGlvbixcbiAgICAgIFtuZXcgQ29tcG9uZW50KFwiTGl0dGxlIFRleHRcIiwgXCJoNFwiLCB7Y2xhc3M6IFwidGlueS1tY2VcIiwgXCJ0ZXh0XCI6IHNob3J0TG9yZW1JcHN1bX0pXVxuICAgICkpO1xuXG4gICAgc3RydWN0dXJlcy5oZWFkZXIgPSBuZXcgU3RydWN0dXJlKFwiU2ltcGxlIEhlYWRlclwiLCBtZWRpYU9iamVjdCxcbiAgICAgIFtoZWFkZXJJbWcsIGhlYWRlclRpdGxlXVxuICAgICk7XG5cblxuICAgIHN0cnVjdHVyZXMudGV4dEFyZWEgPSBuZXcgU3RydWN0dXJlKFwiVGV4dCBBcmVhXCIsIG5ldyBDb21wb25lbnQoXCJMYWJlbFwiLCBcImxhYmVsXCIsIHtcInRleHRcIjogXCJUZXh0IEFyZWE6IFwifSksXG4gICAgICBbbmV3IENvbXBvbmVudChcIlRleHQgQXJlYVwiLCBcInRleHRhcmVhXCIsIHtcInBsYWNlaG9sZGVyXCI6IFwibm9uZVwifSldXG4gICAgKTtcblxuICAgIHN0cnVjdHVyZXMuaW5wdXRUZXh0ID0gbmV3IFN0cnVjdHVyZShcIklucHV0IFRleHRcIiwgbmV3IENvbXBvbmVudChcIkxhYmVsXCIsIFwibGFiZWxcIiwge1widGV4dFwiOiBcIlRleHQ6IFwifSksXG4gICAgICBbbmV3IENvbXBvbmVudChcIklucHV0XCIsIFwiaW5wdXRcIiwge1widHlwZVwiOiBcInRleHRcIn0pXVxuICAgICk7XG5cbiAgICBzdHJ1Y3R1cmVzLmlucHV0RGF0ZSA9IG5ldyBTdHJ1Y3R1cmUoXCJJbnB1dCBEYXRlXCIsIG5ldyBDb21wb25lbnQoXCJMYWJlbFwiLCBcImxhYmVsXCIsIHtcInRleHRcIjogXCJEYXRlOiBcIn0pLFxuICAgICAgW25ldyBDb21wb25lbnQoXCJJbnB1dFwiLCBcImlucHV0XCIsIHtcInR5cGVcIjogXCJkYXRlXCJ9KV1cbiAgICApO1xuXG4gICAgc3RydWN0dXJlcy5pbnB1dERhdGVUaW1lID0gbmV3IFN0cnVjdHVyZShcIklucHV0IERhdGVUaW1lXCIsIG5ldyBDb21wb25lbnQoXCJMYWJlbFwiLCBcImxhYmVsXCIsIHtcInRleHRcIjogXCJEYXRldGltZTogXCJ9KSxcbiAgICAgIFtuZXcgQ29tcG9uZW50KFwiSW5wdXRcIiwgXCJpbnB1dFwiLCB7XCJ0eXBlXCI6IFwiZGF0ZXRpbWVcIn0pXVxuICAgICk7XG5cbiAgICBzdHJ1Y3R1cmVzLmlucHV0RFRMID0gbmV3IFN0cnVjdHVyZShcIklucHV0IERhdGVUaW1lLUxvY2FsXCIsIG5ldyBDb21wb25lbnQoXCJMYWJlbFwiLCBcImxhYmVsXCIsIHtcInRleHRcIjogXCJEYXRldGltZS1Mb2NhbDogXCJ9KSxcbiAgICAgIFtuZXcgQ29tcG9uZW50KFwiSW5wdXRcIiwgXCJpbnB1dFwiLCB7XCJ0eXBlXCI6IFwiZGF0ZXRpbWUtbG9jYWxcIn0pXVxuICAgICk7XG5cbiAgICBzdHJ1Y3R1cmVzLmlucHV0RW1haWwgPSBuZXcgU3RydWN0dXJlKFwiSW5wdXQgRW1haWxcIiwgbmV3IENvbXBvbmVudChcIkxhYmVsXCIsIFwibGFiZWxcIiwge1widGV4dFwiOiBcIkVtYWlsOiBcIn0pLFxuICAgICAgW25ldyBDb21wb25lbnQoXCJJbnB1dFwiLCBcImlucHV0XCIsIHtcInR5cGVcIjogXCJlbWFpbFwifSldXG4gICAgKTtcblxuICAgIHN0cnVjdHVyZXMuaW5wdXRNb250aCA9IG5ldyBTdHJ1Y3R1cmUoXCJJbnB1dCBNb250aFwiLCBuZXcgQ29tcG9uZW50KFwiTGFiZWxcIiwgXCJsYWJlbFwiLCB7XCJ0ZXh0XCI6IFwiTW9udGg6IFwifSksXG4gICAgICBbbmV3IENvbXBvbmVudChcIklucHV0XCIsIFwiaW5wdXRcIiwge1widHlwZVwiOiBcIm1vbnRoXCJ9KV1cbiAgICApO1xuXG4gICAgc3RydWN0dXJlcy5pbnB1dE51bWJlciA9IG5ldyBTdHJ1Y3R1cmUoXCJJbnB1dCBOdW1iZXJcIiwgbmV3IENvbXBvbmVudChcIkxhYmVsXCIsIFwibGFiZWxcIiwge1widGV4dFwiOiBcIk51bWJlcjogXCJ9KSxcbiAgICAgIFtuZXcgQ29tcG9uZW50KFwiSW5wdXRcIiwgXCJpbnB1dFwiLCB7XCJ0eXBlXCI6IFwibnVtYmVyXCJ9KV1cbiAgICApO1xuXG4gICAgc3RydWN0dXJlcy5pbnB1dFBhc3N3b3JkID0gbmV3IFN0cnVjdHVyZShcIklucHV0IFBhc3N3b3JkXCIsIG5ldyBDb21wb25lbnQoXCJMYWJlbFwiLCBcImxhYmVsXCIsIHtcInRleHRcIjogXCJQYXNzd29yZDogXCJ9KSxcbiAgICAgIFtuZXcgQ29tcG9uZW50KFwiSW5wdXRcIiwgXCJpbnB1dFwiLCB7XCJ0eXBlXCI6IFwicGFzc3dvcmRcIn0pXVxuICAgICk7XG5cbiAgICBzdHJ1Y3R1cmVzLmlucHV0U2VhcmNoID0gbmV3IFN0cnVjdHVyZShcIklucHV0IFNlYXJjaFwiLCBuZXcgQ29tcG9uZW50KFwiTGFiZWxcIiwgXCJsYWJlbFwiLCB7XCJ0ZXh0XCI6IFwiU2VhcmNoOiBcIn0pLFxuICAgICAgW25ldyBDb21wb25lbnQoXCJJbnB1dFwiLCBcImlucHV0XCIsIHtcInR5cGVcIjogXCJzZWFyY2hcIn0pXVxuICAgICk7XG5cbiAgICBzdHJ1Y3R1cmVzLmlucHV0VGVsID0gbmV3IFN0cnVjdHVyZShcIklucHV0IFRlbFwiLCBuZXcgQ29tcG9uZW50KFwiTGFiZWxcIiwgXCJsYWJlbFwiLCB7XCJ0ZXh0XCI6IFwiVGVsOiBcIn0pLFxuICAgICAgW25ldyBDb21wb25lbnQoXCJJbnB1dFwiLCBcImlucHV0XCIsIHtcInR5cGVcIjogXCJ0ZWxcIn0pXVxuICAgICk7XG5cbiAgICBzdHJ1Y3R1cmVzLmlucHV0VGltZSA9IG5ldyBTdHJ1Y3R1cmUoXCJJbnB1dCBUaW1lXCIsIG5ldyBDb21wb25lbnQoXCJMYWJlbFwiLCBcImxhYmVsXCIsIHtcInRleHRcIjogXCJUaW1lOiBcIn0pLFxuICAgICAgW25ldyBDb21wb25lbnQoXCJJbnB1dFwiLCBcImlucHV0XCIsIHtcInR5cGVcIjogXCJ0aW1lXCJ9KV1cbiAgICApO1xuXG4gICAgc3RydWN0dXJlcy5pbnB1dFVSTCA9IG5ldyBTdHJ1Y3R1cmUoXCJJbnB1dCBVUkxcIiwgbmV3IENvbXBvbmVudChcIkxhYmVsXCIsIFwibGFiZWxcIiwge1widGV4dFwiOiBcIlVSTDogXCJ9KSxcbiAgICAgIFtuZXcgQ29tcG9uZW50KFwiSW5wdXRcIiwgXCJpbnB1dFwiLCB7XCJ0eXBlXCI6IFwidXJsXCJ9KV1cbiAgICApO1xuXG4gICAgc3RydWN0dXJlcy5pbnB1dFdlZWsgPSBuZXcgU3RydWN0dXJlKFwiSW5wdXQgV2Vla1wiLCBuZXcgQ29tcG9uZW50KFwiTGFiZWxcIiwgXCJsYWJlbFwiLCB7XCJ0ZXh0XCI6IFwiV2VlazogXCJ9KSxcbiAgICAgIFtuZXcgQ29tcG9uZW50KFwiSW5wdXRcIiwgXCJpbnB1dFwiLCB7XCJ0eXBlXCI6IFwid2Vla1wifSldXG4gICAgKTtcblxuICAgIGNvbnN0IHRodW1iID0gKG5ldyBTdHJ1Y3R1cmUoXCJUaHVtYlwiLCBuZXcgQ29tcG9uZW50KFwiSW1nQ29udGFpbmVyXCIsIFwiZGl2XCIsIHtjbGFzczogXCJ0aHVtYm5haWxcIn0pLFxuICAgICAgW2NvbXBvbmVudHMuaW1nXVxuICAgICkpO1xuXG4gICAgY29uc3QgaW1nID0gKG5ldyBTdHJ1Y3R1cmUoXCJJbWdDb250YWluZXJcIiwgbmV3IENvbXBvbmVudChcIkltZ0NvbnRhaW5lclwiLCBcImRpdlwiLCB7Y2xhc3M6IFwidGV4dC1jZW50ZXJcIn0pLFxuICAgICAgW2NvbXBvbmVudHMuaW1nXVxuICAgICkpO1xuXG4gICAgY29uc3QgbW9zMSA9IChuZXcgU3RydWN0dXJlKFwiTU9TMlwiLCBtZWRpYU9iamVjdFNlY3Rpb24sXG4gICAgICBbdGh1bWJdXG4gICAgKSk7XG5cbiAgICBjb25zdCB0aXRsZSA9IChuZXcgQ29tcG9uZW50KFwiU3Ryb25nXCIsIFwic3Ryb25nXCIsIHtcbiAgICAgIFwiY29udGVudGVkaXRhYmxlXCI6IFwidHJ1ZVwiLFxuICAgICAgXCJ0ZXh0XCI6IFwiTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFpXCJcbiAgICB9KSk7XG5cbiAgICBjb25zdCB0ZXh0ID0gKG5ldyBDb21wb25lbnQoXCJTcGFuXCIsIFwic3BhblwiLCB7XG4gICAgICBcImNvbnRlbnRlZGl0YWJsZVwiOiBcInRydWVcIixcbiAgICAgIFwidGV4dFwiOiBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhaVwiXG4gICAgfSkpO1xuXG4gICAgY29uc3QgdGVzdCA9IChuZXcgU3RydWN0dXJlKFwiVGVzdFwiLCBuZXcgQ29tcG9uZW50KFwiU3BhblwiLCBcInNwYW5cIiwge30pLCBbdGl0bGVdKSk7XG5cbiAgICBjb25zdCBsaW5rID0gKG5ldyBDb21wb25lbnQoXCJMaWVuXCIsIFwiYVwiLCB7XG4gICAgICBcImNvbnRlbnRlZGl0YWJsZVwiOiBcInRydWVcIixcbiAgICAgIFwiaHJlZlwiOiBcIiNcIixcbiAgICAgIFwidGV4dFwiOiBcIlN1cGVyIGxpZW4sIGNsaXF1ZSB2aXRlXCJcbiAgICB9KSk7XG5cbiAgICBjb25zdCBtb3MyID0gKG5ldyBTdHJ1Y3R1cmUoXCJNT1MyXCIsIG1lZGlhT2JqZWN0U2VjdGlvbixcbiAgICAgIFt0ZXN0LCBuZXcgQ29tcG9uZW50KFwiU3BhblwiLCBcImJyXCIsIHt9KSwgdGV4dCwgbmV3IENvbXBvbmVudChcIlNwYW5cIiwgXCJiclwiLCB7fSksIGxpbmtdXG4gICAgKSk7XG5cbiAgICBzdHJ1Y3R1cmVzLmZpZ3VyZSA9IG5ldyBTdHJ1Y3R1cmUoXCJGaWd1cmVcIiwgbWVkaWFPYmplY3RTdGFjayxcbiAgICAgIFttb3MxLCBtb3MyXVxuICAgICk7XG5cbiAgICBzdHJ1Y3R1cmVzLmltYWdlID0gaW1nO1xuXG4gICAgcmV0dXJuIHN0cnVjdHVyZXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBjb21wb25lbnRzXG4gICAqIEBwYXJhbSBzdHJ1Y3R1cmVzXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGluaXRHcm91cHMoY29tcG9uZW50cywgc3RydWN0dXJlcykge1xuICAgIGxldCBncm91cHMgPSB7fTtcblxuICAgIGdyb3Vwcy5sb2dpbiA9IG5ldyBHcm91cChcIkxvZ2luXCIsXG4gICAgICBbe2xheW91dDoge1wibWVkaXVtXCI6IDQsIFwibGFyZ2VcIjogNH0sIGNvbnRlbnQ6IHN0cnVjdHVyZXMuaW5wdXRFbWFpbH0sXG4gICAgICAgIHtsYXlvdXQ6IHtcIm1lZGl1bVwiOiA0LCBcImxhcmdlXCI6IDR9LCBjb250ZW50OiBzdHJ1Y3R1cmVzLmlucHV0UGFzc3dvcmR9LFxuICAgICAgICB7bGF5b3V0OiB7XCJtZWRpdW1cIjogNCwgXCJsYXJnZVwiOiA0fSwgY29udGVudDogY29tcG9uZW50cy5idG59XVxuICAgICk7XG5cbiAgICBncm91cHMuY29udGFjdCA9IG5ldyBHcm91cChcIkNvbnRhY3RcIixcbiAgICAgIFt7bGF5b3V0OiB7XCJtZWRpdW1cIjogNiwgXCJsYXJnZVwiOiA2fSwgY29udGVudDogc3RydWN0dXJlcy5pbnB1dEVtYWlsfSxcbiAgICAgICAge2xheW91dDoge1wibWVkaXVtXCI6IDYsIFwibGFyZ2VcIjogNn0sIGNvbnRlbnQ6IHN0cnVjdHVyZXMuaW5wdXRUZWx9LFxuICAgICAgICB7bGF5b3V0OiB7XCJtZWRpdW1cIjogMTIsIFwibGFyZ2VcIjogMTJ9LCBjb250ZW50OiBzdHJ1Y3R1cmVzLnRleHRBcmVhfSxcbiAgICAgICAge2xheW91dDoge1wibWVkaXVtXCI6IDEyLCBcImxhcmdlXCI6IDEyfSwgY29udGVudDogY29tcG9uZW50cy5idG59XVxuICAgICk7XG5cbiAgICBjb25zdCBkZXRhaWxzID0gbmV3IEdyb3VwKFwiRGV0YWlsc1wiLFxuICAgICAgW3tsYXlvdXQ6IHtcIm1lZGl1bVwiOiAxMiwgXCJsYXJnZVwiOiAxMn0sIGNvbnRlbnQ6IHN0cnVjdHVyZXMuaW5wdXRUZXh0fSxcbiAgICAgICAge2xheW91dDoge1wibWVkaXVtXCI6IDEyLCBcImxhcmdlXCI6IDEyfSwgY29udGVudDogc3RydWN0dXJlcy5pbnB1dFRleHR9XVxuICAgICk7XG5cbiAgICBncm91cHMucHJvZmlsZSA9IG5ldyBHcm91cChcIlByb2ZpbGVcIixcbiAgICAgIFt7bGF5b3V0OiB7XCJtZWRpdW1cIjogMywgXCJsYXJnZVwiOiAzfSwgY29udGVudDogY29tcG9uZW50cy5pbWd9LFxuICAgICAgICB7bGF5b3V0OiB7XCJtZWRpdW1cIjogOSwgXCJsYXJnZVwiOiA5fSwgY29udGVudDogZGV0YWlsc30sXG4gICAgICAgIHtsYXlvdXQ6IHtcIm1lZGl1bVwiOiAxMiwgXCJsYXJnZVwiOiAxMn0sIGNvbnRlbnQ6IGNvbXBvbmVudHMuYnRufV1cbiAgICApO1xuXG4gICAgZ3JvdXBzLmFkZHJlc3MgPSBuZXcgR3JvdXAoXCJBZGRyZXNzXCIsXG4gICAgICBbe2xheW91dDoge1wibWVkaXVtXCI6IDEyLCBcImxhcmdlXCI6IDEyfSwgY29udGVudDogc3RydWN0dXJlcy5pbnB1dFRleHR9LFxuICAgICAgICB7bGF5b3V0OiB7XCJtZWRpdW1cIjogMTIsIFwibGFyZ2VcIjogMTJ9LCBjb250ZW50OiBzdHJ1Y3R1cmVzLmlucHV0VGV4dH0sXG4gICAgICAgIHtsYXlvdXQ6IHtcIm1lZGl1bVwiOiAxMiwgXCJsYXJnZVwiOiAxMn0sIGNvbnRlbnQ6IHN0cnVjdHVyZXMuaW5wdXRUZXh0fSxcbiAgICAgICAge2xheW91dDoge1wibWVkaXVtXCI6IDEyLCBcImxhcmdlXCI6IDEyfSwgY29udGVudDogc3RydWN0dXJlcy5pbnB1dFRleHR9LFxuICAgICAgICB7bGF5b3V0OiB7XCJtZWRpdW1cIjogMTIsIFwibGFyZ2VcIjogMTJ9LCBjb250ZW50OiBzdHJ1Y3R1cmVzLmlucHV0VGV4dH0sXG4gICAgICAgIHtsYXlvdXQ6IHtcIm1lZGl1bVwiOiAxMiwgXCJsYXJnZVwiOiAxMn0sIGNvbnRlbnQ6IHN0cnVjdHVyZXMuaW5wdXRUZXh0fSxcbiAgICAgICAge2xheW91dDoge1wibWVkaXVtXCI6IDEyLCBcImxhcmdlXCI6IDEyfSwgY29udGVudDogc3RydWN0dXJlcy5pbnB1dFRleHR9LFxuICAgICAgICB7bGF5b3V0OiB7XCJtZWRpdW1cIjogMTIsIFwibGFyZ2VcIjogMTJ9LCBjb250ZW50OiBjb21wb25lbnRzLmJ0bn1dXG4gICAgKTtcblxuICAgIHJldHVybiBncm91cHM7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvb2w7XG5cbmxldCBuYW1lc3BhY2UgPSB7XG4gIGdldCBzaW5nbGV0b24oKSB7IC8vIEJFR0lOIGlpZmVcbiAgICBsZXQgc2luZ2xldG9uO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXNpbmdsZXRvbikge1xuICAgICAgICBzaW5nbGV0b24gPSB7XG4gICAgICAgICAgYW1ldGhvZCgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYW1ldGhvZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzaW5nbGV0b247XG4gICAgfTtcbiAgfSAvLyBFTkQgaWlmZVxufTtcbi8vIEludm9rZTogbmFtZXNwYWNlLnNpbmdsZXRvbigpLmFtZXRob2QoKSIsImltcG9ydCBUb29sIGZyb20gXCIuL3Rvb2xcIjtcbmltcG9ydCAqIGFzIHRlbXBsYXRlIGZyb20gXCIuL3RlbXBsYXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZGl2KSB7XG4gICQud2lkZ2V0KCdwbGIudG9vbGJveCcsIHtcbiAgICBvcHRpb25zOiB7XG4gICAgICBkZWJ1ZzogZmFsc2VcbiAgICB9LFxuICAgIGRyYWdnYWJsZXM6IG51bGwsXG4gICAgX2NyZWF0ZSgpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoXCJkZWJ1Z1wiKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGxpO1xuICAgICAgbGV0IHNwYW47XG5cbiAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBUb29sLmluaXRDb21wb25lbnRzKCk7XG4gICAgICBjb25zdCBzdHJ1Y3R1cmVzID0gVG9vbC5pbml0U3RydWN0dXJlcyhjb21wb25lbnRzKTtcbiAgICAgIGNvbnN0IGdyb3VwcyA9IFRvb2wuaW5pdEdyb3Vwcyhjb21wb25lbnRzLCBzdHJ1Y3R1cmVzKTtcblxuICAgICAgalF1ZXJ5LmVhY2goY29tcG9uZW50cywgKGluZGV4LCBjb21wb25lbnQpID0+IHtcbiAgICAgICAgbGkgPSAkKFwiPGxpPlwiKTtcbiAgICAgICAgbGkuZGF0YShcImRhdGFcIiwgY29tcG9uZW50LnRvSFRNTCgpKTtcbiAgICAgICAgc3BhbiA9ICQoXCI8c3Bhbj5cIiwge2NsYXNzOiBcImRyYWdnYWJsZS1tb2RlbFwifSk7XG4gICAgICAgIHNwYW4udGV4dChjb21wb25lbnQubmFtZSk7XG4gICAgICAgIGxpLmFwcGVuZChzcGFuKTtcbiAgICAgICAgJChcIiNjb21wb25lbnRzQ29udGFpbmVyXCIpLmFwcGVuZChsaSk7XG4gICAgICB9KTtcblxuICAgICAgalF1ZXJ5LmVhY2goc3RydWN0dXJlcywgKGluZGV4LCBzdHJ1Y3R1cmUpID0+IHtcbiAgICAgICAgbGkgPSAkKFwiPGxpPlwiKTtcbiAgICAgICAgbGkuZGF0YShcImRhdGFcIiwgc3RydWN0dXJlLnRvSFRNTCgpKTtcbiAgICAgICAgc3BhbiA9ICQoXCI8c3Bhbj5cIiwge2NsYXNzOiBcImRyYWdnYWJsZS1tb2RlbFwifSk7XG4gICAgICAgIHNwYW4udGV4dChzdHJ1Y3R1cmUubmFtZSk7XG4gICAgICAgIGxpLmFwcGVuZChzcGFuKTtcbiAgICAgICAgJChcIiNzdHJ1Y3R1cmVzQ29udGFpbmVyXCIpLmFwcGVuZChsaSk7XG4gICAgICB9KTtcblxuICAgICAgalF1ZXJ5LmVhY2goZ3JvdXBzLCAoaW5kZXgsIGdyb3VwKSA9PiB7XG4gICAgICAgIGxpID0gJChcIjxsaT5cIik7XG4gICAgICAgIGxpLmRhdGEoXCJkYXRhXCIsIGdyb3VwLnRvSFRNTCgpKTtcbiAgICAgICAgc3BhbiA9ICQoXCI8c3Bhbj5cIiwge2NsYXNzOiBcImRyYWdnYWJsZS1tb2RlbFwifSk7XG4gICAgICAgIHNwYW4udGV4dChncm91cC5uYW1lKTtcbiAgICAgICAgbGkuYXBwZW5kKHNwYW4pO1xuICAgICAgICAkKFwiI2dyb3Vwc0NvbnRhaW5lclwiKS5hcHBlbmQobGkpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuZHJhZ2dhYmxlcyA9ICQoXCIjY29tcG9uZW50c0NvbnRhaW5lciwgI3N0cnVjdHVyZXNDb250YWluZXIsICNncm91cHNDb250YWluZXJcIikuY2hpbGRyZW4oKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBuZXdQTEIoKSB7XG4gICAgICBjb25zdCBlZGl0YWJsZSA9ICQoXCIjZWRpdGFibGUtYXJlYVwiKTtcblxuICAgICAgdGhpcy5kcmFnZ2FibGVzLmRyYWdnYWJsZSh7XG4gICAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgICAgYXBwZW5kVG86IGVkaXRhYmxlLFxuICAgICAgICBjb250YWlubWVudDogZWRpdGFibGUsXG4gICAgICAgIGhlbHBlcjogXCJjbG9uZVwiLFxuICAgICAgICBzdGFydCgpIHtcbiAgICAgICAgICBlZGl0YWJsZS5jb250ZW50KCdpbml0RHJvcHBhYmxlcycpO1xuICAgICAgICB9LFxuICAgICAgICBzdG9wKCkge1xuICAgICAgICAgIGVkaXRhYmxlLmZpbmQoXCIuZHJvcHBhYmxlcy1jb250YWluZXJcIikucmVtb3ZlKCk7XG4gICAgICAgICAgZWRpdGFibGUuZmluZChcIi5kcm9wcGFibGVzLWNvbnRhaW5lci1uZXN0ZWRcIikucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKFwiLnN1Ym1pdC10ZW1wbGF0ZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGVtcGxhdGUuZXhwb3J0VGVtcGxhdGUoJChcIiNlZGl0YWJsZS1hcmVhXCIpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgZGl2LnRvb2xib3goe2RlYnVnOiBmYWxzZX0pO1xuICBkaXYudG9vbGJveChcIm5ld1BMQlwiKTtcbn0iXX0=
