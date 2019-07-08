webpackJsonp([1],{

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (!config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (!isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (!config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (!(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (!stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (i > pos || !tagName &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (options.outputSourceRange) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (slotScope) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (el.attrsMap['v-for']) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving the component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          value.trim().length === 0
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (el.children.length !== 1 || ast.type !== 1) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(4).setImmediate))

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(137)))

/***/ }),

/***/ 137:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(5);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

if (false) {
  module.exports = require('./vue.common.prod.js')
} else {
  module.exports = __webpack_require__(135)
}


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(136);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

/*! Buefy v0.7.8 | MIT License | github.com/buefy/buefy */ 
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(3));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["Buefy"] = factory(require("vue"));
	else
		root["Buefy"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_18__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(102);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setOptions; });
var config = {
    defaultContainerElement: null,
    defaultIconPack: 'mdi',
    defaultIconComponent: null,
    defaultDialogConfirmText: null,
    defaultDialogCancelText: null,
    defaultSnackbarDuration: 3500,
    defaultSnackbarPosition: null,
    defaultToastDuration: 2000,
    defaultToastPosition: null,
    defaultNotificationDuration: 2000,
    defaultNotificationPosition: null,
    defaultTooltipType: 'is-primary',
    defaultTooltipAnimated: false,
    defaultInputAutocomplete: 'on',
    defaultDateFormatter: null,
    defaultDateParser: null,
    defaultDateCreator: null,
    defaultDayNames: null,
    defaultMonthNames: null,
    defaultFirstDayOfWeek: null,
    defaultUnselectableDaysOfWeek: null,
    defaultTimeFormatter: null,
    defaultTimeParser: null,
    defaultModalCanCancel: ['escape', 'x', 'outside', 'button'],
    defaultModalScroll: null,
    defaultDatepickerMobileNative: true,
    defaultTimepickerMobileNative: true,
    defaultNoticeQueue: true,
    defaultInputHasCounter: true,
    defaultUseHtml5Validation: true,
    defaultDropdownMobileModal: true,
    defaultFielLabelPosition: null,
    defaultDatepickerYearsRange: [-100, 3],
    defaultDatepickerNearbyMonthDays: true,
    defaultDatepickerNearbySelectableMonthDays: false
};

/* harmony default export */ __webpack_exports__["a"] = (config);

var setOptions = function setOptions(options) {
    config = options;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(106),
  /* template */
  __webpack_require__(107),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(37)('wks');
var uid = __webpack_require__(26);
var Symbol = __webpack_require__(8).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getValueByPath;
/* harmony export (immutable) */ __webpack_exports__["b"] = indexOf;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isMobile; });
/* harmony export (immutable) */ __webpack_exports__["d"] = removeElement;
/* unused harmony export escapeRegExpChars */
/**
 * Get value of an object property/path even if it's nested
 */
function getValueByPath(obj, path) {
    var value = path.split('.').reduce(function (o, i) {
        return o[i];
    }, obj);
    return value;
}

/**
 * Extension of indexOf method by equality function if specified
 */
function indexOf(array, obj, fn) {
    if (!array) return -1;

    if (!fn || typeof fn !== 'function') return array.indexOf(obj);

    for (var i = 0; i < array.length; i++) {
        if (fn(array[i], obj)) {
            return i;
        }
    }

    return -1;
}

/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
var isMobile = {
    Android: function Android() {
        return typeof window !== 'undefined' && window.navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
        return typeof window !== 'undefined' && window.navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function iOS() {
        return typeof window !== 'undefined' && window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function Opera() {
        return typeof window !== 'undefined' && window.navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
        return typeof window !== 'undefined' && window.navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
};

function removeElement(el) {
    if (typeof el.remove !== 'undefined') {
        el.remove();
    } else if (typeof el.parentNode !== 'undefined') {
        el.parentNode.removeChild(el);
    }
}

/**
 * Escape regex characters
 * http://stackoverflow.com/a/6969486
 */
function escapeRegExpChars(value) {
    if (!value) return value;

    // eslint-disable-next-line
    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(47);
var toPrimitive = __webpack_require__(32);
var dP = Object.defineProperty;

exports.f = __webpack_require__(12) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);


/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        size: String,
        expanded: Boolean,
        loading: Boolean,
        rounded: Boolean,
        icon: String,
        iconPack: String,
        // Native options to use in HTML5 validation
        autocomplete: String,
        maxlength: [Number, String],
        useHtml5Validation: {
            type: Boolean,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultUseHtml5Validation;
            }
        },
        validationMessage: String
    },
    data: function data() {
        return {
            isValid: true,
            isFocused: false,
            newIconPack: this.iconPack || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultIconPack
        };
    },

    computed: {
        /**
         * Find parent Field, max 3 levels deep.
         */
        parentField: function parentField() {
            var parent = this.$parent;
            for (var i = 0; i < 3; i++) {
                if (parent && !parent.$data._isField) {
                    parent = parent.$parent;
                }
            }
            return parent;
        },


        /**
         * Get the type prop from parent if it's a Field.
         */
        statusType: function statusType() {
            if (!this.parentField) return;
            if (!this.parentField.newType) return;
            if (typeof this.parentField.newType === 'string') {
                return this.parentField.newType;
            } else {
                for (var key in this.parentField.newType) {
                    if (this.parentField.newType[key]) {
                        return key;
                    }
                }
            }
        },


        /**
         * Get the message prop from parent if it's a Field.
         */
        statusMessage: function statusMessage() {
            if (!this.parentField) return;

            return this.parentField.newMessage;
        },


        /**
         * Fix icon size for inputs, large was too big
         */
        iconSize: function iconSize() {
            switch (this.size) {
                case 'is-small':
                    return this.size;
                case 'is-medium':
                    return;
                case 'is-large':
                    return this.newIconPack === 'mdi' ? 'is-medium' : '';
            }
        }
    },
    methods: {
        /**
         * Focus method that work dynamically depending on the component.
         */
        focus: function focus() {
            var _this = this;

            if (this.$data._elementRef === undefined) return;

            this.$nextTick(function () {
                var el = _this.$el.querySelector(_this.$data._elementRef);
                if (el) el.focus();
            });
        },
        onBlur: function onBlur($event) {
            this.isFocused = false;
            this.$emit('blur', $event);
            this.checkHtml5Validity();
        },
        onFocus: function onFocus($event) {
            this.isFocused = true;
            this.$emit('focus', $event);
        },


        /**
         * Check HTML5 validation, set isValid property.
         * If validation fail, send 'is-danger' type,
         * and error message to parent if it's a Field.
         */
        checkHtml5Validity: function checkHtml5Validity() {
            var _this2 = this;

            if (!this.useHtml5Validation) return;

            if (this.$refs[this.$data._elementRef] === undefined) return;

            var el = this.$el.querySelector(this.$data._elementRef);

            var type = null;
            var message = null;
            var isValid = true;
            if (!el.checkValidity()) {
                type = 'is-danger';
                message = this.validationMessage || el.validationMessage;
                isValid = false;
            }
            this.isValid = isValid;

            this.$nextTick(function () {
                if (_this2.parentField) {
                    // Set type only if not defined
                    if (!_this2.parentField.type) {
                        _this2.parentField.newType = type;
                    }
                    // Set message only if not defined
                    if (!_this2.parentField.message) {
                        _this2.parentField.newMessage = message;
                    }
                }
            });

            return this.isValid;
        }
    }
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(21)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(22);
module.exports = __webpack_require__(12) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(20);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50);
var defined = __webpack_require__(34);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(105),
  /* template */
  __webpack_require__(108),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var core = __webpack_require__(6);
var ctx = __webpack_require__(46);
var hide = __webpack_require__(14);
var has = __webpack_require__(13);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
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


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(49);
var enumBugKeys = __webpack_require__(38);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(123),
  /* template */
  __webpack_require__(124),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(125),
  /* template */
  __webpack_require__(126),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(127),
  /* template */
  __webpack_require__(130),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(137),
  /* template */
  __webpack_require__(138),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(20);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(37)('keys');
var uid = __webpack_require__(26);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(6);
var global = __webpack_require__(8);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(25) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(34);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(81)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(54)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f;
var has = __webpack_require__(13);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(4);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var core = __webpack_require__(6);
var LIBRARY = __webpack_require__(25);
var wksExt = __webpack_require__(43);
var defineProperty = __webpack_require__(9).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(7);



/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        type: {
            type: String,
            default: 'is-dark'
        },
        message: String,
        duration: Number,
        queue: {
            type: Boolean,
            default: undefined
        },
        position: {
            type: String,
            default: 'is-top',
            validator: function validator(value) {
                return ['is-top-right', 'is-top', 'is-top-left', 'is-bottom-right', 'is-bottom', 'is-bottom-left'].indexOf(value) > -1;
            }
        },
        container: String
    },
    data: function data() {
        return {
            isActive: false,
            parentTop: null,
            parentBottom: null,
            newContainer: this.container || __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaultContainerElement
        };
    },

    computed: {
        correctParent: function correctParent() {
            switch (this.position) {
                case 'is-top-right':
                case 'is-top':
                case 'is-top-left':
                    return this.parentTop;

                case 'is-bottom-right':
                case 'is-bottom':
                case 'is-bottom-left':
                    return this.parentBottom;
            }
        },
        transition: function transition() {
            switch (this.position) {
                case 'is-top-right':
                case 'is-top':
                case 'is-top-left':
                    return {
                        enter: 'fadeInDown',
                        leave: 'fadeOut'
                    };
                case 'is-bottom-right':
                case 'is-bottom':
                case 'is-bottom-left':
                    return {
                        enter: 'fadeInUp',
                        leave: 'fadeOut'
                    };
            }
        }
    },
    methods: {
        shouldQueue: function shouldQueue() {
            var queue = this.queue !== undefined ? this.queue : __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaultNoticeQueue;

            if (!queue) return false;

            return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
        },
        close: function close() {
            var _this = this;

            clearTimeout(this.timer);
            this.isActive = false;

            // Timeout for the animation complete before destroying
            setTimeout(function () {
                _this.$destroy();
                Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* removeElement */])(_this.$el);
            }, 150);
        },
        showNotice: function showNotice() {
            var _this2 = this;

            if (this.shouldQueue()) {
                // Call recursively if should queue
                setTimeout(function () {
                    return _this2.showNotice();
                }, 250);
                return;
            }
            this.correctParent.insertAdjacentElement('afterbegin', this.$el);
            this.isActive = true;

            if (!this.indefinite) {
                this.timer = setTimeout(function () {
                    return _this2.close();
                }, this.newDuration);
            }
        },
        setupContainer: function setupContainer() {
            this.parentTop = document.querySelector('.notices.is-top');
            this.parentBottom = document.querySelector('.notices.is-bottom');

            if (this.parentTop && this.parentBottom) return;

            if (!this.parentTop) {
                this.parentTop = document.createElement('div');
                this.parentTop.className = 'notices is-top';
            }

            if (!this.parentBottom) {
                this.parentBottom = document.createElement('div');
                this.parentBottom.className = 'notices is-bottom';
            }

            var container = document.querySelector(this.newContainer) || document.body;

            container.appendChild(this.parentTop);
            container.appendChild(this.parentBottom);

            if (this.newContainer) {
                this.parentTop.classList.add('has-custom-container');
                this.parentBottom.classList.add('has-custom-container');
            }
        }
    },
    beforeMount: function beforeMount() {
        this.setupContainer();
    },
    mounted: function mounted() {
        this.showNotice();
    }
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(73);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(12) && !__webpack_require__(21)(function () {
  return Object.defineProperty(__webpack_require__(48)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(20);
var document = __webpack_require__(8).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(13);
var toIObject = __webpack_require__(16);
var arrayIndexOf = __webpack_require__(75)(false);
var IE_PROTO = __webpack_require__(36)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(33);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(35);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(78),
  /* template */
  __webpack_require__(109),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(79);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(5);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var $export = __webpack_require__(19);
var redefine = __webpack_require__(55);
var hide = __webpack_require__(14);
var Iterators = __webpack_require__(23);
var $iterCreate = __webpack_require__(82);
var setToStringTag = __webpack_require__(42);
var getPrototypeOf = __webpack_require__(85);
var ITERATOR = __webpack_require__(4)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(15);
var dPs = __webpack_require__(83);
var enumBugKeys = __webpack_require__(38);
var IE_PROTO = __webpack_require__(36)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(48)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(84).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
var global = __webpack_require__(8);
var hide = __webpack_require__(14);
var Iterators = __webpack_require__(23);
var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(49);
var hiddenKeys = __webpack_require__(38).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(101);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(23);
module.exports = __webpack_require__(6).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(113),
  /* template */
  __webpack_require__(114),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormElementMixin__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(2);
var _this = this;





var AM = 'AM';
var PM = 'PM';
var HOUR_FORMAT_24 = '24';
var HOUR_FORMAT_12 = '12';

var defaultTimeFormatter = function defaultTimeFormatter(date, vm) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var period = '';
    if (vm.hourFormat === HOUR_FORMAT_12) {
        period = ' ' + (hours < 12 ? AM : PM);
        if (hours > 12) {
            hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }
    }
    return vm.pad(hours) + ':' + vm.pad(minutes) + (vm.enableSeconds ? ':' + vm.pad(seconds) : '') + period;
};

var defaultTimeParser = function defaultTimeParser(timeString, vm) {
    if (timeString) {
        var am = false;
        if (vm.hourFormat === HOUR_FORMAT_12) {
            var dateString12 = timeString.split(' ');
            timeString = dateString12[0];
            am = dateString12[1] === AM;
        }
        var time = timeString.split(':');
        var hours = parseInt(time[0], 10);
        var minutes = parseInt(time[1], 10);
        var seconds = vm.enableSeconds ? parseInt(time[2], 10) : 0;
        if (isNaN(hours) || hours < 0 || hours > 23 || vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12) || isNaN(minutes) || minutes < 0 || minutes > 59) {
            return null;
        }
        var d = null;
        if (vm.computedValue && !isNaN(vm.computedValue)) {
            d = new Date(vm.computedValue);
        } else {
            d = new Date();
            d.setMilliseconds(0);
        }
        d.setSeconds(seconds);
        d.setMinutes(minutes);
        if (_this.hourFormat === HOUR_FORMAT_12) {
            if (am && hours === 12) {
                hours = 0;
            } else if (!am && hours !== 12) {
                hours += 12;
            }
        }
        d.setHours(hours);
        return new Date(d.geTime());
    }
    return null;
};

/* harmony default export */ __webpack_exports__["a"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_0__FormElementMixin__["a" /* default */]],
    inheritAttrs: false,
    props: {
        value: Date,
        inline: Boolean,
        minTime: Date,
        maxTime: Date,
        placeholder: String,
        editable: Boolean,
        disabled: Boolean,
        hourFormat: {
            type: String,
            default: HOUR_FORMAT_24,
            validator: function validator(value) {
                return value === HOUR_FORMAT_24 || value === HOUR_FORMAT_12;
            }
        },
        incrementMinutes: {
            type: Number,
            default: 1
        },
        incrementSeconds: {
            type: Number,
            default: 1
        },
        timeFormatter: {
            type: Function,
            default: function _default(date, vm) {
                if (typeof __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].defaultTimeFormatter === 'function') {
                    return __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].defaultTimeFormatter(date);
                } else {
                    return defaultTimeFormatter(date, vm);
                }
            }
        },
        timeParser: {
            type: Function,
            default: function _default(date, vm) {
                if (typeof __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].defaultTimeParser === 'function') {
                    return __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].defaultTimeParser(date);
                } else {
                    return defaultTimeParser(date, vm);
                }
            }
        },
        mobileNative: {
            type: Boolean,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].defaultTimepickerMobileNative;
            }
        },
        position: String,
        unselectableTimes: Array,
        openOnFocus: Boolean,
        enableSeconds: Boolean
    },
    data: function data() {
        return {
            dateSelected: this.value,
            hoursSelected: null,
            minutesSelected: null,
            secondsSelected: null,
            meridienSelected: null,
            _elementRef: 'input',
            AM: AM,
            PM: PM,
            HOUR_FORMAT_24: HOUR_FORMAT_24,
            HOUR_FORMAT_12: HOUR_FORMAT_12
        };
    },

    computed: {
        computedValue: {
            get: function get() {
                return this.dateSelected;
            },
            set: function set(value) {
                this.dateSelected = value;
                this.$emit('input', value);
            }
        },
        hours: function hours() {
            var hours = [];
            var numberOfHours = this.isHourFormat24 ? 24 : 12;
            for (var i = 0; i < numberOfHours; i++) {
                var value = i;
                var label = value;
                if (!this.isHourFormat24) {
                    value = i + 1;
                    label = value;
                    if (this.meridienSelected === this.AM) {
                        if (value === 12) {
                            value = 0;
                        }
                    } else if (this.meridienSelected === this.PM) {
                        if (value !== 12) {
                            value += 12;
                        }
                    }
                }
                hours.push({
                    label: this.formatNumber(label),
                    value: value
                });
            }
            return hours;
        },
        minutes: function minutes() {
            var minutes = [];
            for (var i = 0; i < 60; i += this.incrementMinutes) {
                minutes.push({
                    label: this.formatNumber(i),
                    value: i
                });
            }
            return minutes;
        },
        seconds: function seconds() {
            var seconds = [];
            for (var i = 0; i < 60; i += this.incrementSeconds) {
                seconds.push({
                    label: this.formatNumber(i),
                    value: i
                });
            }
            return seconds;
        },
        meridiens: function meridiens() {
            return [AM, PM];
        },
        isMobile: function isMobile() {
            return this.mobileNative && __WEBPACK_IMPORTED_MODULE_1__helpers__["c" /* isMobile */].any();
        },
        isHourFormat24: function isHourFormat24() {
            return this.hourFormat === HOUR_FORMAT_24;
        }
    },
    watch: {
        hourFormat: function hourFormat() {
            if (this.hoursSelected !== null) {
                this.meridienSelected = this.hoursSelected >= 12 ? PM : AM;
            }
        },

        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        value: {
            handler: function handler(value) {
                this.updateInternalState(value);
                !this.isValid && this.$refs.input.checkHtml5Validity();
            },

            immediate: true
        }
    },
    methods: {
        onMeridienChange: function onMeridienChange(value) {
            if (this.hoursSelected !== null) {
                if (value === PM) {
                    this.hoursSelected += 12;
                } else if (value === AM) {
                    this.hoursSelected -= 12;
                }
            }
            this.updateDateSelected(this.hoursSelected, this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, value);
        },
        onHoursChange: function onHoursChange(value) {
            this.updateDateSelected(parseInt(value, 10), this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
        },
        onMinutesChange: function onMinutesChange(value) {
            this.updateDateSelected(this.hoursSelected, parseInt(value, 10), this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
        },
        onSecondsChange: function onSecondsChange(value) {
            this.updateDateSelected(this.hoursSelected, this.minutesSelected, parseInt(value, 10), this.meridienSelected);
        },
        updateDateSelected: function updateDateSelected(hours, minutes, seconds, meridiens) {
            if (hours != null && minutes != null && (!this.isHourFormat24 && meridiens !== null || this.isHourFormat24)) {
                var time = null;
                if (this.computedValue && !isNaN(this.computedValue)) {
                    time = new Date(this.computedValue);
                } else {
                    time = new Date();
                    time.setMilliseconds(0);
                }
                time.setHours(hours);
                time.setMinutes(minutes);
                time.setSeconds(seconds);
                this.computedValue = new Date(time.getTime());
            }
        },
        updateInternalState: function updateInternalState(value) {
            if (value) {
                this.hoursSelected = value.getHours();
                this.minutesSelected = value.getMinutes();
                this.secondsSelected = value.getSeconds();
                this.meridienSelected = value.getHours() >= 12 ? PM : AM;
            } else {
                this.hoursSelected = null;
                this.minutesSelected = null;
                this.secondsSelected = null;
                this.meridienSelected = AM;
            }
            this.dateSelected = value;
        },
        isHourDisabled: function isHourDisabled(hour) {
            var _this2 = this;

            var disabled = false;
            if (this.minTime) {
                var minHours = this.minTime.getHours();
                disabled = hour < minHours;
            }
            if (this.maxTime) {
                if (!disabled) {
                    var maxHours = this.maxTime.getHours();
                    disabled = hour > maxHours;
                }
            }
            if (this.unselectableTimes) {
                if (!disabled) {
                    var unselectable = this.unselectableTimes.filter(function (time) {
                        if (_this2.enableSeconds && _this2.secondsSelected !== null) {
                            return time.getHours() === hour && time.getMinutes() === _this2.minutesSelected && time.getSeconds() === _this2.secondsSelected;
                        } else if (_this2.minutesSelected !== null) {
                            return time.getHours() === hour && time.getMinutes() === _this2.minutesSelected;
                        } else {
                            return time.getHours() === hour;
                        }
                    });
                    disabled = unselectable.length > 0;
                }
            }
            return disabled;
        },
        isMinuteDisabled: function isMinuteDisabled(minute) {
            var _this3 = this;

            var disabled = false;
            if (this.hoursSelected !== null) {
                if (this.isHourDisabled(this.hoursSelected)) {
                    disabled = true;
                } else {
                    if (this.minTime) {
                        var minHours = this.minTime.getHours();
                        var minMinutes = this.minTime.getMinutes();
                        disabled = this.hoursSelected === minHours && minute < minMinutes;
                    }
                    if (this.maxTime) {
                        if (!disabled) {
                            var maxHours = this.maxTime.getHours();
                            var maxMinutes = this.maxTime.getMinutes();
                            disabled = this.hoursSelected === maxHours && minute > maxMinutes;
                        }
                    }
                }
                if (this.unselectableTimes) {
                    if (!disabled) {
                        var unselectable = this.unselectableTimes.filter(function (time) {
                            if (_this3.enableSeconds && _this3.secondsSelected !== null) {
                                return time.getHours() === _this3.hoursSelected && time.getMinutes() === minute && time.getSeconds() === _this3.secondsSelected;
                            } else {
                                return time.getHours() === _this3.hoursSelected && time.getMinutes() === minute;
                            }
                        });
                        disabled = unselectable.length > 0;
                    }
                }
            }
            return disabled;
        },
        isSecondDisabled: function isSecondDisabled(second) {
            var _this4 = this;

            var disabled = false;
            if (this.minutesSelected !== null) {
                if (this.isMinuteDisabled(this.minutesSelected)) {
                    disabled = true;
                } else {
                    if (this.minTime) {
                        var minHours = this.minTime.getHours();
                        var minMinutes = this.minTime.getMinutes();
                        var minSeconds = this.minTime.getSeconds();
                        disabled = this.hoursSelected === minHours && this.minutesSelected === minMinutes && second < minSeconds;
                    }
                    if (this.maxTime) {
                        if (!disabled) {
                            var maxHours = this.maxTime.getHours();
                            var maxMinutes = this.maxTime.getMinutes();
                            var maxSeconds = this.maxTime.getSeconds();
                            disabled = this.hoursSelected === maxHours && this.minutesSelected === maxMinutes && second > maxSeconds;
                        }
                    }
                }
                if (this.unselectableTimes) {
                    if (!disabled) {
                        var unselectable = this.unselectableTimes.filter(function (time) {
                            return time.getHours() === _this4.hoursSelected && time.getMinutes() === _this4.minutesSelected && time.getSeconds() === second;
                        });
                        disabled = unselectable.length > 0;
                    }
                }
            }
            return disabled;
        },


        /*
        * Parse string into date
        */
        onChange: function onChange(value) {
            var date = this.timeParser(value, this);
            this.updateInternalState(date);
            if (date && !isNaN(date)) {
                this.computedValue = date;
            } else {
                // Force refresh input value when not valid date
                this.computedValue = null;
                this.$refs.input.newValue = this.computedValue;
            }
        },


        /*
        * Toggle timepicker
        */
        toggle: function toggle(active) {
            if (this.$refs.dropdown) {
                this.$refs.dropdown.isActive = typeof active === 'boolean' ? active : !this.$refs.dropdown.isActive;
            }
        },


        /*
        * Close timepicker
        */
        close: function close() {
            this.toggle(false);
        },


        /*
        * Call default onFocus method and show timepicker
        */
        handleOnFocus: function handleOnFocus() {
            this.onFocus();
            if (this.openOnFocus) {
                this.toggle(true);
            }
        },


        /*
        * Format date into string 'HH-MM-SS'
        */
        formatHHMMSS: function formatHHMMSS(value) {
            var date = new Date(value);
            if (value && !isNaN(date)) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                return this.formatNumber(hours) + ':' + this.formatNumber(minutes, true) + ':' + this.formatNumber(seconds, true);
            }
            return '';
        },


        /*
        * Parse time from string
        */
        onChangeNativePicker: function onChangeNativePicker(event) {
            var date = event.target.value;
            if (date) {
                var time = null;
                if (this.computedValue && !isNaN(this.computedValue)) {
                    time = new Date(this.computedValue);
                } else {
                    time = new Date();
                    time.setMilliseconds(0);
                }
                var t = date.split(':');
                time.setHours(parseInt(t[0], 10));
                time.setMinutes(parseInt(t[1], 10));
                time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
                this.computedValue = new Date(time.getTime());
            } else {
                this.computedValue = null;
            }
        },
        formatNumber: function formatNumber(value, isMinute) {
            return this.isHourFormat24 || isMinute ? this.pad(value) : value;
        },
        pad: function pad(value) {
            return (value < 10 ? '0' : '') + value;
        },


        /*
        * Format date into string
        */
        formatValue: function formatValue(date) {
            if (date && !isNaN(date)) {
                return this.timeFormatter(date, this);
            } else {
                return null;
            }
        },

        /**
         * Keypress event that is bound to the document.
         */
        keyPress: function keyPress(event) {
            // Esc key
            if (this.$refs.dropdown && this.$refs.dropdown.isActive && event.keyCode === 27) {
                this.toggle(false);
            }
        }
    },
    created: function created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
        }
    },
    beforeDestroy: function beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
        }
    }
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(151),
  /* template */
  __webpack_require__(152),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isSSR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HTMLElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return File; });
// Polyfills for SSR

var isSSR = typeof window === 'undefined';

var HTMLElement = isSSR ? Object : window.HTMLElement;
var File = isSSR ? Object : window.File;

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_icon_Icon__);



/* harmony default export */ __webpack_exports__["a"] = ({
    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon___default.a),
    props: {
        active: {
            type: Boolean,
            default: true
        },
        title: String,
        closable: {
            type: Boolean,
            default: true
        },
        message: String,
        type: String,
        hasIcon: Boolean,
        size: String,
        iconPack: String,
        iconSize: String,
        autoClose: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 2000
        }
    },
    data: function data() {
        return {
            isActive: this.active
        };
    },

    watch: {
        active: function active(value) {
            this.isActive = value;
        },
        isActive: function isActive(value) {
            if (value) {
                this.setAutoClose();
            } else {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            }
        }
    },
    computed: {
        /**
         * Icon name (MDI) based on type.
         */
        icon: function icon() {
            switch (this.type) {
                case 'is-info':
                    return 'information';
                case 'is-success':
                    return 'check-circle';
                case 'is-warning':
                    return 'alert';
                case 'is-danger':
                    return 'alert-circle';
                default:
                    return null;
            }
        }
    },
    methods: {
        /**
         * Close the Message and emit events.
         */
        close: function close() {
            this.isActive = false;
            this.$emit('close');
            this.$emit('update:active', false);
        },

        /**
         * Set timer to auto close message
         */
        setAutoClose: function setAutoClose() {
            var _this = this;

            if (this.autoClose) {
                this.timer = setTimeout(function () {
                    if (_this.isActive) {
                        _this.close();
                    }
                }, this.duration);
            }
        }
    },
    mounted: function mounted() {
        this.setAutoClose();
    }
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(169),
  /* template */
  __webpack_require__(170),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'BSlotComponent',
    props: {
        component: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            default: 'default'
        },
        tag: {
            type: String,
            default: 'div'
        },
        event: {
            type: String,
            default: 'hook:updated'
        }
    },
    methods: {
        refresh: function refresh() {
            this.$forceUpdate();
        },
        isVueComponent: function isVueComponent() {
            return this.component && this.component._isVue;
        }
    },
    created: function created() {
        if (this.isVueComponent()) {
            this.component.$on(this.event, this.refresh);
        }
    },
    beforeDestroy: function beforeDestroy() {
        if (this.isVueComponent()) {
            this.component.$off(this.event, this.refresh);
        }
    },
    render: function render(h) {
        if (this.isVueComponent()) {
            var slots = this.component.$slots[this.name];
            return h(this.tag, {}, slots);
        }
    }
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(201),
  /* template */
  __webpack_require__(202),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(209),
  /* template */
  __webpack_require__(210),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var components_namespaceObject = {};
__webpack_require__.d(components_namespaceObject, "Autocomplete", function() { return autocomplete; });
__webpack_require__.d(components_namespaceObject, "Button", function() { return components_button; });
__webpack_require__.d(components_namespaceObject, "Checkbox", function() { return components_checkbox; });
__webpack_require__.d(components_namespaceObject, "Clockpicker", function() { return clockpicker; });
__webpack_require__.d(components_namespaceObject, "Collapse", function() { return collapse; });
__webpack_require__.d(components_namespaceObject, "Datepicker", function() { return datepicker; });
__webpack_require__.d(components_namespaceObject, "Dialog", function() { return dialog; });
__webpack_require__.d(components_namespaceObject, "Dropdown", function() { return dropdown; });
__webpack_require__.d(components_namespaceObject, "Field", function() { return field; });
__webpack_require__.d(components_namespaceObject, "Icon", function() { return icon; });
__webpack_require__.d(components_namespaceObject, "Input", function() { return input; });
__webpack_require__.d(components_namespaceObject, "Loading", function() { return loading; });
__webpack_require__.d(components_namespaceObject, "Message", function() { return components_message; });
__webpack_require__.d(components_namespaceObject, "Modal", function() { return modal; });
__webpack_require__.d(components_namespaceObject, "Notification", function() { return notification; });
__webpack_require__.d(components_namespaceObject, "Numberinput", function() { return numberinput; });
__webpack_require__.d(components_namespaceObject, "Pagination", function() { return pagination; });
__webpack_require__.d(components_namespaceObject, "Radio", function() { return components_radio; });
__webpack_require__.d(components_namespaceObject, "Select", function() { return components_select; });
__webpack_require__.d(components_namespaceObject, "Snackbar", function() { return snackbar; });
__webpack_require__.d(components_namespaceObject, "Steps", function() { return steps; });
__webpack_require__.d(components_namespaceObject, "Switch", function() { return components_switch; });
__webpack_require__.d(components_namespaceObject, "Table", function() { return table; });
__webpack_require__.d(components_namespaceObject, "Tabs", function() { return tabs; });
__webpack_require__.d(components_namespaceObject, "Tag", function() { return tag; });
__webpack_require__.d(components_namespaceObject, "Taginput", function() { return taginput; });
__webpack_require__.d(components_namespaceObject, "Timepicker", function() { return timepicker; });
__webpack_require__.d(components_namespaceObject, "Toast", function() { return toast; });
__webpack_require__.d(components_namespaceObject, "Tooltip", function() { return tooltip; });
__webpack_require__.d(components_namespaceObject, "Upload", function() { return upload; });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__(11);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./src/scss/buefy-build.scss
var buefy_build = __webpack_require__(77);
var buefy_build_default = /*#__PURE__*/__webpack_require__.n(buefy_build);

// EXTERNAL MODULE: ./src/components/autocomplete/Autocomplete.vue
var Autocomplete = __webpack_require__(52);
var Autocomplete_default = /*#__PURE__*/__webpack_require__.n(Autocomplete);

// CONCATENATED MODULE: ./src/utils/plugins.js

var use = function use(plugin) {
    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin);
    }
};

var registerComponent = function registerComponent(Vue, component) {
    Vue.component(component.name, component);
};

var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
    Vue.prototype[property] = component;
};
// CONCATENATED MODULE: ./src/components/autocomplete/index.js




var Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Autocomplete_default.a);
    }
};

use(Plugin);

/* harmony default export */ var autocomplete = (Plugin);


// EXTERNAL MODULE: ./src/components/button/Button.vue
var Button = __webpack_require__(110);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button);

// CONCATENATED MODULE: ./src/components/button/index.js




var button_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Button_default.a);
    }
};

use(button_Plugin);

/* harmony default export */ var components_button = (button_Plugin);


// EXTERNAL MODULE: ./src/components/checkbox/Checkbox.vue
var Checkbox = __webpack_require__(61);
var Checkbox_default = /*#__PURE__*/__webpack_require__.n(Checkbox);

// EXTERNAL MODULE: ./src/components/checkbox/CheckboxButton.vue
var CheckboxButton = __webpack_require__(115);
var CheckboxButton_default = /*#__PURE__*/__webpack_require__.n(CheckboxButton);

// CONCATENATED MODULE: ./src/components/checkbox/index.js





var checkbox_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Checkbox_default.a);
        registerComponent(Vue, CheckboxButton_default.a);
    }
};

use(checkbox_Plugin);

/* harmony default export */ var components_checkbox = (checkbox_Plugin);


// EXTERNAL MODULE: ./src/components/collapse/Collapse.vue
var Collapse = __webpack_require__(118);
var Collapse_default = /*#__PURE__*/__webpack_require__.n(Collapse);

// CONCATENATED MODULE: ./src/components/collapse/index.js




var collapse_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Collapse_default.a);
    }
};

use(collapse_Plugin);

/* harmony default export */ var collapse = (collapse_Plugin);


// EXTERNAL MODULE: ./src/components/clockpicker/Clockpicker.vue
var Clockpicker = __webpack_require__(121);
var Clockpicker_default = /*#__PURE__*/__webpack_require__.n(Clockpicker);

// CONCATENATED MODULE: ./src/components/clockpicker/index.js




var clockpicker_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Clockpicker_default.a);
    }
};

use(clockpicker_Plugin);

/* harmony default export */ var clockpicker = (clockpicker_Plugin);


// EXTERNAL MODULE: ./src/components/datepicker/Datepicker.vue
var Datepicker = __webpack_require__(135);
var Datepicker_default = /*#__PURE__*/__webpack_require__.n(Datepicker);

// CONCATENATED MODULE: ./src/components/datepicker/index.js




var datepicker_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Datepicker_default.a);
    }
};

use(datepicker_Plugin);

/* harmony default export */ var datepicker = (datepicker_Plugin);


// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","amd":"vue","root":"Vue"}
var external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue__ = __webpack_require__(18);
var external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default = /*#__PURE__*/__webpack_require__.n(external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue__);

// EXTERNAL MODULE: ./src/components/dialog/Dialog.vue
var Dialog = __webpack_require__(149);
var Dialog_default = /*#__PURE__*/__webpack_require__.n(Dialog);

// CONCATENATED MODULE: ./src/components/dialog/index.js






function dialog_open(propsData) {
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
    var DialogComponent = vm.extend(Dialog_default.a);
    return new DialogComponent({
        el: document.createElement('div'),
        propsData: propsData
    });
}

var DialogProgrammatic = {
    alert: function alert(params) {
        var message = void 0;
        if (typeof params === 'string') message = params;
        var defaultParam = {
            canCancel: false,
            message: message
        };
        var propsData = assign_default()(defaultParam, params);
        return dialog_open(propsData);
    },
    confirm: function confirm(params) {
        var defaultParam = {};
        var propsData = assign_default()(defaultParam, params);
        return dialog_open(propsData);
    },
    prompt: function prompt(params) {
        var defaultParam = {
            hasInput: true,
            confirmText: 'Done'
        };
        var propsData = assign_default()(defaultParam, params);
        return dialog_open(propsData);
    }
};

var dialog_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Dialog_default.a);
        registerComponentProgrammatic(Vue, '$dialog', DialogProgrammatic);
    }
};

use(dialog_Plugin);

/* harmony default export */ var dialog = (dialog_Plugin);


// EXTERNAL MODULE: ./src/components/dropdown/Dropdown.vue
var Dropdown = __webpack_require__(28);
var Dropdown_default = /*#__PURE__*/__webpack_require__.n(Dropdown);

// EXTERNAL MODULE: ./src/components/dropdown/DropdownItem.vue
var DropdownItem = __webpack_require__(29);
var DropdownItem_default = /*#__PURE__*/__webpack_require__.n(DropdownItem);

// CONCATENATED MODULE: ./src/components/dropdown/index.js





var dropdown_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Dropdown_default.a);
        registerComponent(Vue, DropdownItem_default.a);
    }
};

use(dropdown_Plugin);

/* harmony default export */ var dropdown = (dropdown_Plugin);


// EXTERNAL MODULE: ./src/components/field/Field.vue
var Field = __webpack_require__(30);
var Field_default = /*#__PURE__*/__webpack_require__.n(Field);

// CONCATENATED MODULE: ./src/components/field/index.js




var field_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Field_default.a);
    }
};

use(field_Plugin);

/* harmony default export */ var field = (field_Plugin);


// EXTERNAL MODULE: ./src/components/icon/Icon.vue
var Icon = __webpack_require__(3);
var Icon_default = /*#__PURE__*/__webpack_require__.n(Icon);

// CONCATENATED MODULE: ./src/components/icon/index.js




var icon_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Icon_default.a);
    }
};

use(icon_Plugin);

/* harmony default export */ var icon = (icon_Plugin);


// EXTERNAL MODULE: ./src/components/input/Input.vue
var Input = __webpack_require__(17);
var Input_default = /*#__PURE__*/__webpack_require__.n(Input);

// CONCATENATED MODULE: ./src/components/input/index.js




var input_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Input_default.a);
    }
};

use(input_Plugin);

/* harmony default export */ var input = (input_Plugin);


// EXTERNAL MODULE: ./src/components/loading/Loading.vue
var Loading = __webpack_require__(154);
var Loading_default = /*#__PURE__*/__webpack_require__.n(Loading);

// CONCATENATED MODULE: ./src/components/loading/index.js






var LoadingProgrammatic = {
    open: function open(params) {
        var defaultParam = {
            programmatic: true
        };
        var propsData = assign_default()(defaultParam, params);

        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
        var LoadingComponent = vm.extend(Loading_default.a);
        return new LoadingComponent({
            el: document.createElement('div'),
            propsData: propsData
        });
    }
};

var loading_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Loading_default.a);
        registerComponentProgrammatic(Vue, '$loading', LoadingProgrammatic);
    }
};

use(loading_Plugin);

/* harmony default export */ var loading = (loading_Plugin);


// EXTERNAL MODULE: ./src/components/message/Message.vue
var Message = __webpack_require__(157);
var Message_default = /*#__PURE__*/__webpack_require__.n(Message);

// CONCATENATED MODULE: ./src/components/message/index.js




var message_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Message_default.a);
    }
};

use(message_Plugin);

/* harmony default export */ var components_message = (message_Plugin);


// EXTERNAL MODULE: ./src/components/modal/Modal.vue
var Modal = __webpack_require__(63);
var Modal_default = /*#__PURE__*/__webpack_require__.n(Modal);

// CONCATENATED MODULE: ./src/components/modal/index.js






var ModalProgrammatic = {
    open: function open(params) {
        var content = void 0;
        var parent = void 0;
        if (typeof params === 'string') content = params;

        var defaultParam = {
            programmatic: true,
            content: content
        };
        if (params.parent) {
            parent = params.parent;
            delete params.parent;
        }
        var propsData = assign_default()(defaultParam, params);

        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
        var ModalComponent = vm.extend(Modal_default.a);
        return new ModalComponent({
            parent: parent,
            el: document.createElement('div'),
            propsData: propsData
        });
    }
};

var modal_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Modal_default.a);
        registerComponentProgrammatic(Vue, '$modal', ModalProgrammatic);
    }
};

use(modal_Plugin);

/* harmony default export */ var modal = (modal_Plugin);


// EXTERNAL MODULE: ./src/components/notification/Notification.vue
var Notification = __webpack_require__(160);
var Notification_default = /*#__PURE__*/__webpack_require__.n(Notification);

// EXTERNAL MODULE: ./src/components/notification/NotificationNotice.vue
var NotificationNotice = __webpack_require__(163);
var NotificationNotice_default = /*#__PURE__*/__webpack_require__.n(NotificationNotice);

// EXTERNAL MODULE: ./src/utils/config.js
var config = __webpack_require__(2);

// CONCATENATED MODULE: ./src/components/notification/index.js








var NotificationProgrammatic = {
    open: function open(params) {
        var message = void 0;
        var parent = void 0;
        if (typeof params === 'string') message = params;

        var defaultParam = {
            message: message,
            position: config["a" /* default */].defaultNotificationPosition || 'is-top-right'
        };
        if (params.parent) {
            parent = params.parent;
            delete params.parent;
        }
        var propsData = assign_default()(defaultParam, typeof params === 'string' ? {} : params);

        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
        var NotificationNoticeComponent = vm.extend(NotificationNotice_default.a);
        return new NotificationNoticeComponent({
            parent: parent,
            el: document.createElement('div'),
            propsData: propsData
        });
    }
};

var notification_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Notification_default.a);
        registerComponentProgrammatic(Vue, '$notification', NotificationProgrammatic);
    }
};

use(notification_Plugin);

/* harmony default export */ var notification = (notification_Plugin);


// EXTERNAL MODULE: ./src/components/numberinput/Numberinput.vue
var Numberinput = __webpack_require__(166);
var Numberinput_default = /*#__PURE__*/__webpack_require__.n(Numberinput);

// CONCATENATED MODULE: ./src/components/numberinput/index.js




var numberinput_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Numberinput_default.a);
    }
};

use(numberinput_Plugin);

/* harmony default export */ var numberinput = (numberinput_Plugin);


// EXTERNAL MODULE: ./src/components/pagination/Pagination.vue
var Pagination = __webpack_require__(66);
var Pagination_default = /*#__PURE__*/__webpack_require__.n(Pagination);

// CONCATENATED MODULE: ./src/components/pagination/index.js




var pagination_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Pagination_default.a);
    }
};

use(pagination_Plugin);

/* harmony default export */ var pagination = (pagination_Plugin);


// EXTERNAL MODULE: ./src/components/radio/Radio.vue
var Radio = __webpack_require__(171);
var Radio_default = /*#__PURE__*/__webpack_require__.n(Radio);

// EXTERNAL MODULE: ./src/components/radio/RadioButton.vue
var RadioButton = __webpack_require__(174);
var RadioButton_default = /*#__PURE__*/__webpack_require__.n(RadioButton);

// CONCATENATED MODULE: ./src/components/radio/index.js





var radio_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Radio_default.a);
        registerComponent(Vue, RadioButton_default.a);
    }
};

use(radio_Plugin);

/* harmony default export */ var components_radio = (radio_Plugin);


// EXTERNAL MODULE: ./src/components/select/Select.vue
var Select = __webpack_require__(31);
var Select_default = /*#__PURE__*/__webpack_require__.n(Select);

// CONCATENATED MODULE: ./src/components/select/index.js




var select_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Select_default.a);
    }
};

use(select_Plugin);

/* harmony default export */ var components_select = (select_Plugin);


// EXTERNAL MODULE: ./src/components/snackbar/Snackbar.vue
var Snackbar = __webpack_require__(177);
var Snackbar_default = /*#__PURE__*/__webpack_require__.n(Snackbar);

// CONCATENATED MODULE: ./src/components/snackbar/index.js







var SnackbarProgrammatic = {
    open: function open(params) {
        var message = void 0;
        var parent = void 0;
        if (typeof params === 'string') message = params;

        var defaultParam = {
            type: 'is-success',
            position: config["a" /* default */].defaultSnackbarPosition || 'is-bottom-right',
            message: message
        };
        if (params.parent) {
            parent = params.parent;
            delete params.parent;
        }
        var propsData = assign_default()(defaultParam, params);

        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
        var SnackbarComponent = vm.extend(Snackbar_default.a);
        return new SnackbarComponent({
            parent: parent,
            el: document.createElement('div'),
            propsData: propsData
        });
    }
};

var snackbar_Plugin = {
    install: function install(Vue) {
        registerComponentProgrammatic(Vue, '$snackbar', SnackbarProgrammatic);
    }
};

use(snackbar_Plugin);

/* harmony default export */ var snackbar = (snackbar_Plugin);


// EXTERNAL MODULE: ./src/components/steps/Steps.vue
var Steps = __webpack_require__(180);
var Steps_default = /*#__PURE__*/__webpack_require__.n(Steps);

// EXTERNAL MODULE: ./src/components/steps/StepItem.vue
var StepItem = __webpack_require__(183);
var StepItem_default = /*#__PURE__*/__webpack_require__.n(StepItem);

// CONCATENATED MODULE: ./src/components/steps/index.js





var steps_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Steps_default.a);
        registerComponent(Vue, StepItem_default.a);
    }
};

use(steps_Plugin);

/* harmony default export */ var steps = (steps_Plugin);


// EXTERNAL MODULE: ./src/components/switch/Switch.vue
var Switch = __webpack_require__(185);
var Switch_default = /*#__PURE__*/__webpack_require__.n(Switch);

// CONCATENATED MODULE: ./src/components/switch/index.js




var switch_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Switch_default.a);
    }
};

use(switch_Plugin);

/* harmony default export */ var components_switch = (switch_Plugin);


// EXTERNAL MODULE: ./src/components/table/Table.vue
var Table = __webpack_require__(188);
var Table_default = /*#__PURE__*/__webpack_require__.n(Table);

// EXTERNAL MODULE: ./src/components/table/TableColumn.vue
var TableColumn = __webpack_require__(68);
var TableColumn_default = /*#__PURE__*/__webpack_require__.n(TableColumn);

// CONCATENATED MODULE: ./src/components/table/index.js





var table_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Table_default.a);
        registerComponent(Vue, TableColumn_default.a);
    }
};

use(table_Plugin);

/* harmony default export */ var table = (table_Plugin);


// EXTERNAL MODULE: ./src/components/tabs/Tabs.vue
var Tabs = __webpack_require__(204);
var Tabs_default = /*#__PURE__*/__webpack_require__.n(Tabs);

// EXTERNAL MODULE: ./src/components/tabs/TabItem.vue
var TabItem = __webpack_require__(207);
var TabItem_default = /*#__PURE__*/__webpack_require__.n(TabItem);

// CONCATENATED MODULE: ./src/components/tabs/index.js





var tabs_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Tabs_default.a);
        registerComponent(Vue, TabItem_default.a);
    }
};

use(tabs_Plugin);

/* harmony default export */ var tabs = (tabs_Plugin);


// EXTERNAL MODULE: ./src/components/tag/Tag.vue
var Tag = __webpack_require__(69);
var Tag_default = /*#__PURE__*/__webpack_require__.n(Tag);

// EXTERNAL MODULE: ./src/components/tag/Taglist.vue
var Taglist = __webpack_require__(211);
var Taglist_default = /*#__PURE__*/__webpack_require__.n(Taglist);

// CONCATENATED MODULE: ./src/components/tag/index.js





var tag_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Tag_default.a);
        registerComponent(Vue, Taglist_default.a);
    }
};

use(tag_Plugin);

/* harmony default export */ var tag = (tag_Plugin);


// EXTERNAL MODULE: ./src/components/taginput/Taginput.vue
var Taginput = __webpack_require__(214);
var Taginput_default = /*#__PURE__*/__webpack_require__.n(Taginput);

// CONCATENATED MODULE: ./src/components/taginput/index.js




var taginput_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Taginput_default.a);
    }
};

use(taginput_Plugin);

/* harmony default export */ var taginput = (taginput_Plugin);


// EXTERNAL MODULE: ./src/components/timepicker/Timepicker.vue
var Timepicker = __webpack_require__(217);
var Timepicker_default = /*#__PURE__*/__webpack_require__.n(Timepicker);

// CONCATENATED MODULE: ./src/components/timepicker/index.js




var timepicker_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Timepicker_default.a);
    }
};

use(timepicker_Plugin);

/* harmony default export */ var timepicker = (timepicker_Plugin);


// EXTERNAL MODULE: ./src/components/toast/Toast.vue
var Toast = __webpack_require__(220);
var Toast_default = /*#__PURE__*/__webpack_require__.n(Toast);

// CONCATENATED MODULE: ./src/components/toast/index.js







var ToastProgrammatic = {
    open: function open(params) {
        var message = void 0;
        var parent = void 0;
        if (typeof params === 'string') message = params;

        var defaultParam = {
            message: message,
            position: config["a" /* default */].defaultToastPosition || 'is-top'
        };
        if (params.parent) {
            parent = params.parent;
            delete params.parent;
        }
        var propsData = assign_default()(defaultParam, params);

        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
        var ToastComponent = vm.extend(Toast_default.a);
        return new ToastComponent({
            parent: parent,
            el: document.createElement('div'),
            propsData: propsData
        });
    }
};

var toast_Plugin = {
    install: function install(Vue) {
        registerComponentProgrammatic(Vue, '$toast', ToastProgrammatic);
    }
};

use(toast_Plugin);

/* harmony default export */ var toast = (toast_Plugin);


// EXTERNAL MODULE: ./src/components/tooltip/Tooltip.vue
var Tooltip = __webpack_require__(223);
var Tooltip_default = /*#__PURE__*/__webpack_require__.n(Tooltip);

// CONCATENATED MODULE: ./src/components/tooltip/index.js




var tooltip_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Tooltip_default.a);
    }
};

use(tooltip_Plugin);

/* harmony default export */ var tooltip = (tooltip_Plugin);


// EXTERNAL MODULE: ./src/components/upload/Upload.vue
var Upload = __webpack_require__(226);
var Upload_default = /*#__PURE__*/__webpack_require__.n(Upload);

// CONCATENATED MODULE: ./src/components/upload/index.js




var upload_Plugin = {
    install: function install(Vue) {
        registerComponent(Vue, Upload_default.a);
    }
};

use(upload_Plugin);

/* harmony default export */ var upload = (upload_Plugin);


// CONCATENATED MODULE: ./src/components/index.js
































// CONCATENATED MODULE: ./src/index.js









var Buefy = {
    install: function install(Vue) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        // Options
        Object(config["b" /* setOptions */])(assign_default()(config["a" /* default */], options));
        // Components
        for (var componentKey in components_namespaceObject) {
            Vue.use(components_namespaceObject[componentKey]);
        }
        // Config component
        var BuefyProgrammatic = {
            setOptions: function setOptions(options) {
                Object(config["b" /* setOptions */])(assign_default()(config["a" /* default */], options));
            }
        };
        registerComponentProgrammatic(Vue, '$buefy', BuefyProgrammatic);
    }
};

use(Buefy);

/* harmony default export */ var src = __webpack_exports__["default"] = (Buefy);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);
module.exports = __webpack_require__(6).Object.assign;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(19);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(74) });


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(24);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(27);
var toObject = __webpack_require__(40);
var IObject = __webpack_require__(50);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(21)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(51);
var toAbsoluteIndex = __webpack_require__(76);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_helpers__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_FormElementMixin__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__input_Input__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__input_Input__);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BAutocomplete',
    components: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_5__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_5__input_Input___default.a),
    mixins: [__WEBPACK_IMPORTED_MODULE_4__utils_FormElementMixin__["a" /* default */]],
    inheritAttrs: false,
    props: {
        value: [Number, String],
        data: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        field: {
            type: String,
            default: 'value'
        },
        keepFirst: Boolean,
        clearOnSelect: Boolean,
        openOnFocus: Boolean,
        customFormatter: Function
    },
    data: function data() {
        return {
            selected: null,
            hovered: null,
            isActive: false,
            newValue: this.value,
            newAutocomplete: this.autocomplete || 'off',
            isListInViewportVertically: true,
            hasFocus: false,
            _isAutocomplete: true,
            _elementRef: 'input'
        };
    },

    computed: {
        /**
         * White-listed items to not close when clicked.
         * Add input, dropdown and all children.
         */
        whiteList: function whiteList() {
            var whiteList = [];
            whiteList.push(this.$refs.input.$el.querySelector('input'));
            whiteList.push(this.$refs.dropdown);
            // Add all chidren from dropdown
            if (this.$refs.dropdown !== undefined) {
                var children = this.$refs.dropdown.querySelectorAll('*');
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var child = _step.value;

                        whiteList.push(child);
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
            }

            return whiteList;
        },


        /**
         * Check if exists default slot
         */
        hasDefaultSlot: function hasDefaultSlot() {
            return !!this.$scopedSlots.default;
        },


        /**
         * Check if exists "empty" slot
         */
        hasEmptySlot: function hasEmptySlot() {
            return !!this.$slots.empty;
        },


        /**
         * Check if exists "header" slot
         */
        hasHeaderSlot: function hasHeaderSlot() {
            return !!this.$slots.header;
        },


        /**
         * Check if exists "footer" slot
         */
        hasFooterSlot: function hasFooterSlot() {
            return !!this.$slots.footer;
        }
    },
    watch: {
        /**
         * When dropdown is toggled, check the visibility to know when
         * to open upwards.
         */
        isActive: function isActive(active) {
            var _this = this;

            if (active) {
                this.calcDropdownInViewportVertical();
            } else {
                this.$nextTick(function () {
                    return _this.setHovered(null);
                });
                // Timeout to wait for the animation to finish before recalculating
                setTimeout(function () {
                    _this.calcDropdownInViewportVertical();
                }, 100);
            }
        },


        /**
         * When updating input's value
         *   1. Emit changes
         *   2. If value isn't the same as selected, set null
         *   3. Close dropdown if value is clear or else open it
         */
        newValue: function newValue(value) {
            this.$emit('input', value);
            // Check if selected is invalid
            var currentValue = this.getValue(this.selected);
            if (currentValue && currentValue !== value) {
                this.setSelected(null, false);
            }
            // Close dropdown if input is clear or else open it
            if (this.hasFocus && (!this.openOnFocus || value)) {
                this.isActive = !!value;
            }
        },


        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        value: function value(_value) {
            this.newValue = _value;
            !this.isValid && this.$refs.input.checkHtml5Validity();
        },


        /**
         * Select first option if "keep-first
         */
        data: function data(value) {
            // Keep first option always pre-selected
            if (this.keepFirst) {
                this.selectFirstOption(value);
            }
        }
    },
    methods: {
        /**
         * Set which option is currently hovered.
         */
        setHovered: function setHovered(option) {
            if (option === undefined) return;

            this.hovered = option;
        },


        /**
         * Set which option is currently selected, update v-model,
         * update input value and close dropdown.
         */
        setSelected: function setSelected(option) {
            var _this2 = this;

            var closeDropdown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (option === undefined) return;

            this.selected = option;
            this.$emit('select', this.selected);
            if (this.selected !== null) {
                this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected);
            }
            closeDropdown && this.$nextTick(function () {
                _this2.isActive = false;
            });
        },


        /**
         * Select first option
         */
        selectFirstOption: function selectFirstOption(options) {
            var _this3 = this;

            this.$nextTick(function () {
                if (options.length) {
                    // If has visible data or open on focus, keep updating the hovered
                    if (_this3.openOnFocus || _this3.newValue !== '' && _this3.hovered !== options[0]) {
                        _this3.setHovered(options[0]);
                    }
                } else {
                    _this3.setHovered(null);
                }
            });
        },


        /**
         * Enter key listener.
         * Select the hovered option.
         */
        enterPressed: function enterPressed() {
            if (this.hovered === null) return;
            this.setSelected(this.hovered);
        },


        /**
         * Tab key listener.
         * Select hovered option if it exists, close dropdown, then allow
         * native handling to move to next tabbable element.
         */
        tabPressed: function tabPressed() {
            if (this.hovered === null) {
                this.isActive = false;
                return;
            }
            this.setSelected(this.hovered);
        },


        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside: function clickedOutside(event) {
            if (this.whiteList.indexOf(event.target) < 0) this.isActive = false;
        },


        /**
         * Return display text for the input.
         * If object, get value from path, or else just the value.
         */
        getValue: function getValue(option) {
            if (!option) return;

            if (typeof this.customFormatter !== 'undefined') {
                return this.customFormatter(option);
            }
            return (typeof option === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(option)) === 'object' ? Object(__WEBPACK_IMPORTED_MODULE_3__utils_helpers__["a" /* getValueByPath */])(option, this.field) : option;
        },


        /**
         * Calculate if the dropdown is vertically visible when activated,
         * otherwise it is openened upwards.
         */
        calcDropdownInViewportVertical: function calcDropdownInViewportVertical() {
            var _this4 = this;

            this.$nextTick(function () {
                /**
                 * this.$refs.dropdown may be undefined
                 * when Autocomplete is conditional rendered
                 */
                if (_this4.$refs.dropdown === undefined) return;

                var rect = _this4.$refs.dropdown.getBoundingClientRect();

                _this4.isListInViewportVertically = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
            });
        },


        /**
         * Arrows keys listener.
         * If dropdown is active, set hovered option, or else just open.
         */
        keyArrows: function keyArrows(direction) {
            var sum = direction === 'down' ? 1 : -1;
            if (this.isActive) {
                var index = this.data.indexOf(this.hovered) + sum;
                index = index > this.data.length - 1 ? this.data.length : index;
                index = index < 0 ? 0 : index;

                this.setHovered(this.data[index]);

                var list = this.$refs.dropdown.querySelector('.dropdown-content');
                var element = list.querySelectorAll('a.dropdown-item:not(.is-disabled)')[index];

                if (!element) return;

                var visMin = list.scrollTop;
                var visMax = list.scrollTop + list.clientHeight - element.clientHeight;

                if (element.offsetTop < visMin) {
                    list.scrollTop = element.offsetTop;
                } else if (element.offsetTop >= visMax) {
                    list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
                }
            } else {
                this.isActive = true;
            }
        },


        /**
         * Focus listener.
         * If value is the same as selected, select all text.
         */
        focused: function focused(event) {
            if (this.getValue(this.selected) === this.newValue) {
                this.$el.querySelector('input').select();
            }
            if (this.openOnFocus) {
                this.isActive = true;
                if (this.keepFirst) {
                    this.selectFirstOption(this.data);
                }
            }
            this.hasFocus = true;
            this.$emit('focus', event);
        },


        /**
         * Blur listener.
        */
        onBlur: function onBlur(event) {
            this.hasFocus = false;
            this.$emit('blur', event);
        },
        onInput: function onInput(event) {
            var currentValue = this.getValue(this.selected);
            if (currentValue && currentValue === this.newValue) return;
            this.$emit('typing', this.newValue);
        }
    },
    created: function created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside);
            window.addEventListener('resize', this.calcDropdownInViewportVertical);
        }
    },
    beforeDestroy: function beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside);
            window.removeEventListener('resize', this.calcDropdownInViewportVertical);
        }
    }
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(57);
module.exports = __webpack_require__(43).f('iterator');


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var defined = __webpack_require__(34);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(56);
var descriptor = __webpack_require__(22);
var setToStringTag = __webpack_require__(42);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(14)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var anObject = __webpack_require__(15);
var getKeys = __webpack_require__(24);

module.exports = __webpack_require__(12) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(8).document;
module.exports = document && document.documentElement;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(13);
var toObject = __webpack_require__(40);
var IE_PROTO = __webpack_require__(36)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(87);
var step = __webpack_require__(88);
var Iterators = __webpack_require__(23);
var toIObject = __webpack_require__(16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(54)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
__webpack_require__(96);
__webpack_require__(97);
__webpack_require__(98);
module.exports = __webpack_require__(6).Symbol;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(8);
var has = __webpack_require__(13);
var DESCRIPTORS = __webpack_require__(12);
var $export = __webpack_require__(19);
var redefine = __webpack_require__(55);
var META = __webpack_require__(91).KEY;
var $fails = __webpack_require__(21);
var shared = __webpack_require__(37);
var setToStringTag = __webpack_require__(42);
var uid = __webpack_require__(26);
var wks = __webpack_require__(4);
var wksExt = __webpack_require__(43);
var wksDefine = __webpack_require__(44);
var enumKeys = __webpack_require__(92);
var isArray = __webpack_require__(93);
var anObject = __webpack_require__(15);
var isObject = __webpack_require__(20);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(32);
var createDesc = __webpack_require__(22);
var _create = __webpack_require__(56);
var gOPNExt = __webpack_require__(94);
var $GOPD = __webpack_require__(95);
var $DP = __webpack_require__(9);
var $keys = __webpack_require__(24);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(58).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(27).f = $propertyIsEnumerable;
  __webpack_require__(39).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(25)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
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
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(26)('meta');
var isObject = __webpack_require__(20);
var has = __webpack_require__(13);
var setDesc = __webpack_require__(9).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(21)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(24);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(27);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(33);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(16);
var gOPN = __webpack_require__(58).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(27);
var createDesc = __webpack_require__(22);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(32);
var has = __webpack_require__(13);
var IE8_DOM_DEFINE = __webpack_require__(47);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(12) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 96 */
/***/ (function(module, exports) {



/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44)('asyncIterator');


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44)('observable');


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57);
__webpack_require__(41);
module.exports = __webpack_require__(100);


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var get = __webpack_require__(60);
module.exports = __webpack_require__(6).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(33);
var TAG = __webpack_require__(4)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
var $Object = __webpack_require__(6).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(19);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(12), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__ = __webpack_require__(10);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BInput',
    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
    mixins: [__WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__["a" /* default */]],
    inheritAttrs: false,
    props: {
        value: [Number, String],
        type: {
            type: String,
            default: 'text'
        },
        passwordReveal: Boolean,
        hasCounter: {
            type: Boolean,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_2__utils_config__["a" /* default */].defaultInputHasCounter;
            }
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    data: function data() {
        return {
            newValue: this.value,
            newType: this.type,
            newAutocomplete: this.autocomplete || __WEBPACK_IMPORTED_MODULE_2__utils_config__["a" /* default */].defaultInputAutocomplete,
            isPasswordVisible: false,
            _elementRef: this.type === 'textarea' ? 'textarea' : 'input'
        };
    },

    computed: {
        computedValue: {
            get: function get() {
                return this.newValue;
            },
            set: function set(value) {
                this.newValue = value;
                this.$emit('input', value);
                !this.isValid && this.checkHtml5Validity();
            }
        },
        rootClasses: function rootClasses() {
            return [this.iconPosition, this.size, {
                'is-expanded': this.expanded,
                'is-loading': this.loading,
                'is-clearfix': !this.hasMessage
            }];
        },
        inputClasses: function inputClasses() {
            return [this.statusType, this.size, { 'is-rounded': this.rounded }];
        },
        hasIconRight: function hasIconRight() {
            return this.passwordReveal || this.loading || this.statusType;
        },


        /**
         * Position of the icon or if it's both sides.
         */
        iconPosition: function iconPosition() {
            if (this.icon && this.hasIconRight) {
                return 'has-icons-left has-icons-right';
            } else if (!this.icon && this.hasIconRight) {
                return 'has-icons-right';
            } else if (this.icon) {
                return 'has-icons-left';
            }
        },


        /**
         * Icon name (MDI) based on the type.
         */
        statusTypeIcon: function statusTypeIcon() {
            switch (this.statusType) {
                case 'is-success':
                    return 'check';
                case 'is-danger':
                    return 'alert-circle';
                case 'is-info':
                    return 'information';
                case 'is-warning':
                    return 'alert';
            }
        },


        /**
         * Check if have any message prop from parent if it's a Field.
         */
        hasMessage: function hasMessage() {
            return !!this.statusMessage;
        },


        /**
         * Current password-reveal icon name.
         */
        passwordVisibleIcon: function passwordVisibleIcon() {
            return !this.isPasswordVisible ? 'eye' : 'eye-off';
        },

        /**
         * Get value length
         */
        valueLength: function valueLength() {
            if (typeof this.computedValue === 'string') {
                return this.computedValue.length;
            } else if (typeof this.computedValue === 'number') {
                return this.computedValue.toString().length;
            }
            return 0;
        }
    },
    watch: {
        /**
         * When v-model is changed:
         *   1. Set internal value.
         */
        value: function value(_value) {
            this.newValue = _value;
        }
    },
    methods: {
        /**
         * Toggle the visibility of a password-reveal input
         * by changing the type and focus the input right away.
         */
        togglePasswordVisibility: function togglePasswordVisibility() {
            var _this = this;

            this.isPasswordVisible = !this.isPasswordVisible;
            this.newType = this.isPasswordVisible ? 'text' : 'password';

            this.$nextTick(function () {
                _this.$refs.input.focus();
            });
        },


        /**
         * Input's 'input' event listener, 'nextTick' is used to prevent event firing
         * before ui update, helps when using masks (Cleavejs and potentially others).
         */
        onInput: function onInput(event) {
            var _this2 = this;

            this.$nextTick(function () {
                if (event.target) {
                    _this2.computedValue = event.target.value;
                }
            });
        }
    }
});

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BIcon',
    props: {
        type: [String, Object],
        pack: String,
        icon: String,
        size: String,
        customSize: String,
        customClass: String,
        both: Boolean // This is used internally to show both MDI and FA icon
    },
    computed: {
        /**
         * Internal icon name based on the pack.
         * If pack is 'fa', gets the equivalent FA icon name of the MDI,
         * internal icons are always MDI.
         */
        newIcon: function newIcon() {
            return this.newPack === 'mdi' ? this.newPack + '-' + this.icon : this.addFAPrefix(this.getEquivalentIconOf(this.icon));
        },
        newPack: function newPack() {
            return this.pack || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultIconPack;
        },
        newType: function newType() {
            if (!this.type) return;

            var splitType = [];
            if (typeof this.type === 'string') {
                splitType = this.type.split('-');
            } else {
                for (var key in this.type) {
                    if (this.type[key]) {
                        splitType = key.split('-');
                        break;
                    }
                }
            }
            if (splitType.length <= 1) return;

            return 'has-text-' + splitType[1];
        },
        newCustomSize: function newCustomSize() {
            return this.customSize || this.customSizeByPack;
        },
        customSizeByPack: function customSizeByPack() {
            var defaultSize = this.newPack === 'mdi' ? 'mdi-24px' : this.addFAPrefix('lg');
            var mediumSize = this.newPack === 'mdi' ? 'mdi-36px' : this.addFAPrefix('2x');
            var largeSize = this.newPack === 'mdi' ? 'mdi-48px' : this.addFAPrefix('3x');
            switch (this.size) {
                case 'is-small':
                    return;
                case 'is-medium':
                    return mediumSize;
                case 'is-large':
                    return largeSize;
                default:
                    return defaultSize;
            }
        },
        useIconComponent: function useIconComponent() {
            return __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultIconComponent;
        }
    },
    methods: {
        addFAPrefix: function addFAPrefix(value) {
            if (this.useIconComponent) {
                return value;
            }
            return 'fa-' + value;
        },


        /**
         * Equivalent FA icon name of the MDI.
         */
        getEquivalentIconOf: function getEquivalentIconOf(value) {
            // Only transform the class if the both prop is set to true
            if (!this.both) {
                return value;
            }

            switch (value) {
                case 'check':
                    return 'check';
                case 'information':
                    return 'info-circle';
                case 'check-circle':
                    return 'check-circle';
                case 'alert':
                    return 'exclamation-triangle';
                case 'alert-circle':
                    return 'exclamation-circle';
                case 'arrow-up':
                    return 'arrow-up';
                case 'chevron-right':
                    return 'angle-right';
                case 'chevron-left':
                    return 'angle-left';
                case 'chevron-down':
                    return 'angle-down';
                case 'eye':
                    return 'eye';
                case 'eye-off':
                    return 'eye-slash';
                case 'menu-down':
                    return 'caret-down';
                case 'menu-up':
                    return 'caret-up';
                default:
                    return value;
            }
        }
    }
});

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon",
    class: [_vm.newType, _vm.size]
  }, [(!_vm.useIconComponent) ? _c('i', {
    class: [_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]
  }) : _c(_vm.useIconComponent, {
    tag: "component",
    class: [_vm.customClass],
    attrs: {
      "icon": [_vm.newPack, _vm.newIcon],
      "size": _vm.newCustomSize
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "control",
    class: _vm.rootClasses
  }, [(_vm.type !== 'textarea') ? _c('input', _vm._b({
    ref: "input",
    staticClass: "input",
    class: [_vm.inputClasses, _vm.customClass],
    attrs: {
      "type": _vm.newType,
      "autocomplete": _vm.newAutocomplete,
      "maxlength": _vm.maxlength
    },
    domProps: {
      "value": _vm.computedValue
    },
    on: {
      "input": _vm.onInput,
      "blur": _vm.onBlur,
      "focus": _vm.onFocus
    }
  }, 'input', _vm.$attrs, false)) : _c('textarea', _vm._b({
    ref: "textarea",
    staticClass: "textarea",
    class: [_vm.inputClasses, _vm.customClass],
    attrs: {
      "maxlength": _vm.maxlength
    },
    domProps: {
      "value": _vm.computedValue
    },
    on: {
      "input": _vm.onInput,
      "blur": _vm.onBlur,
      "focus": _vm.onFocus
    }
  }, 'textarea', _vm.$attrs, false)), _vm._v(" "), (_vm.icon) ? _c('b-icon', {
    staticClass: "is-left",
    attrs: {
      "icon": _vm.icon,
      "pack": _vm.iconPack,
      "size": _vm.iconSize
    }
  }) : _vm._e(), _vm._v(" "), (!_vm.loading && (_vm.passwordReveal || _vm.statusType)) ? _c('b-icon', {
    staticClass: "is-right",
    class: {
      'is-clickable': _vm.passwordReveal
    },
    attrs: {
      "icon": _vm.passwordReveal ? _vm.passwordVisibleIcon : _vm.statusTypeIcon,
      "pack": _vm.iconPack,
      "size": _vm.iconSize,
      "type": !_vm.passwordReveal ? _vm.statusType : 'is-primary',
      "both": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.togglePasswordVisibility($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.maxlength && _vm.hasCounter && _vm.type !== 'number') ? _c('small', {
    staticClass: "help counter",
    class: {
      'is-invisible': !_vm.isFocused
    }
  }, [_vm._v("\n        " + _vm._s(_vm.valueLength) + " / " + _vm._s(_vm.maxlength) + "\n    ")]) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "autocomplete control",
    class: {
      'is-expanded': _vm.expanded
    }
  }, [_c('b-input', _vm._b({
    ref: "input",
    attrs: {
      "type": "text",
      "size": _vm.size,
      "loading": _vm.loading,
      "rounded": _vm.rounded,
      "icon": _vm.icon,
      "icon-pack": _vm.iconPack,
      "maxlength": _vm.maxlength,
      "autocomplete": _vm.newAutocomplete,
      "use-html5-validation": _vm.useHtml5Validation
    },
    on: {
      "input": _vm.onInput,
      "focus": _vm.focused,
      "blur": _vm.onBlur
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key)) { return null; }
        $event.preventDefault();
        _vm.isActive = false
      },
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "tab", 9, $event.key)) { return null; }
        _vm.tabPressed($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        $event.preventDefault();
        _vm.enterPressed($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) { return null; }
        $event.preventDefault();
        _vm.keyArrows('up')
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) { return null; }
        $event.preventDefault();
        _vm.keyArrows('down')
      }]
    },
    model: {
      value: (_vm.newValue),
      callback: function($$v) {
        _vm.newValue = $$v
      },
      expression: "newValue"
    }
  }, 'b-input', _vm.$attrs, false)), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isActive && (_vm.data.length > 0 || _vm.hasEmptySlot || _vm.hasHeaderSlot)),
      expression: "isActive && (data.length > 0 || hasEmptySlot || hasHeaderSlot)"
    }],
    ref: "dropdown",
    staticClass: "dropdown-menu",
    class: {
      'is-opened-top': !_vm.isListInViewportVertically
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isActive),
      expression: "isActive"
    }],
    staticClass: "dropdown-content"
  }, [(_vm.hasHeaderSlot) ? _c('div', {
    staticClass: "dropdown-item"
  }, [_vm._t("header")], 2) : _vm._e(), _vm._v(" "), _vm._l((_vm.data), function(option, index) {
    return _c('a', {
      key: index,
      staticClass: "dropdown-item",
      class: {
        'is-hovered': option === _vm.hovered
      },
      on: {
        "click": function($event) {
          _vm.setSelected(option)
        }
      }
    }, [(_vm.hasDefaultSlot) ? _vm._t("default", null, {
      option: option,
      index: index
    }) : _c('span', [_vm._v("\n                        " + _vm._s(_vm.getValue(option, true)) + "\n                    ")])], 2)
  }), _vm._v(" "), (_vm.data.length === 0 && _vm.hasEmptySlot) ? _c('div', {
    staticClass: "dropdown-item is-disabled"
  }, [_vm._t("empty")], 2) : _vm._e(), _vm._v(" "), (_vm.hasFooterSlot) ? _c('div', {
    staticClass: "dropdown-item"
  }, [_vm._t("footer")], 2) : _vm._e()], 2)])])], 1)
},staticRenderFns: []}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(111),
  /* template */
  __webpack_require__(112),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BButton',
    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
    props: {
        type: [String, Object],
        size: String,
        label: String,
        iconPack: String,
        iconLeft: String,
        iconRight: String,
        rounded: Boolean,
        loading: Boolean,
        outlined: Boolean,
        inverted: Boolean,
        focused: Boolean,
        active: Boolean,
        hovered: Boolean,
        selected: Boolean,
        nativeType: {
            type: String,
            default: 'button',
            validator: function validator(value) {
                return ['button', 'submit', 'reset'].indexOf(value) >= 0;
            }
        },
        tag: {
            type: String,
            default: 'button',
            validator: function validator(value) {
                return ['button', 'a', 'input', 'router-link', 'nuxt-link', 'n-link', 'NuxtLink', 'NLink'].indexOf(value) >= 0;
            }
        }
    },
    computed: {
        iconSize: function iconSize() {
            if (!this.size || this.size === 'is-medium') {
                return 'is-small';
            } else if (this.size === 'is-large') {
                return 'is-medium';
            }
            return this.size;
        }
    }
});

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.tag, _vm._b({
    tag: "component",
    staticClass: "button",
    class: [_vm.size, _vm.type, {
      'is-rounded': _vm.rounded,
      'is-loading': _vm.loading,
      'is-outlined': _vm.outlined,
      'is-inverted': _vm.inverted,
      'is-focused': _vm.focused,
      'is-active': _vm.active,
      'is-hovered': _vm.hovered,
      'is-selected': _vm.selected
    }],
    attrs: {
      "type": _vm.nativeType
    },
    on: {
      "click": function($event) {
        _vm.$emit('click', $event)
      }
    }
  }, 'component', _vm.$attrs, false), [(_vm.iconLeft) ? _c('b-icon', {
    attrs: {
      "pack": _vm.iconPack,
      "icon": _vm.iconLeft,
      "size": _vm.iconSize
    }
  }) : _vm._e(), _vm._v(" "), (_vm.label) ? _c('span', [_vm._v(_vm._s(_vm.label))]) : (_vm.$slots.default) ? _c('span', [_vm._t("default")], 2) : _vm._e(), _vm._v(" "), (_vm.iconRight) ? _c('b-icon', {
    attrs: {
      "pack": _vm.iconPack,
      "icon": _vm.iconRight,
      "size": _vm.iconSize
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BCheckbox',
    props: {
        value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
        nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
        indeterminate: Boolean,
        type: String,
        disabled: Boolean,
        required: Boolean,
        name: String,
        size: String,
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
            default: false
        }
    },
    data: function data() {
        return {
            newValue: this.value
        };
    },

    computed: {
        computedValue: {
            get: function get() {
                return this.newValue;
            },
            set: function set(value) {
                this.newValue = value;
                this.$emit('input', value);
            }
        }
    },
    watch: {
        /**
         * When v-model change, set internal value.
         */
        value: function value(_value) {
            this.newValue = _value;
        }
    }
});

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    ref: "label",
    staticClass: "b-checkbox checkbox",
    class: [_vm.size, {
      'is-disabled': _vm.disabled
    }],
    attrs: {
      "disabled": _vm.disabled
    },
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        $event.preventDefault();
        _vm.$refs.label.click()
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.computedValue),
      expression: "computedValue"
    }],
    attrs: {
      "type": "checkbox",
      "disabled": _vm.disabled,
      "required": _vm.required,
      "name": _vm.name,
      "true-value": _vm.trueValue,
      "false-value": _vm.falseValue
    },
    domProps: {
      "indeterminate": _vm.indeterminate,
      "value": _vm.nativeValue,
      "checked": Array.isArray(_vm.computedValue) ? _vm._i(_vm.computedValue, _vm.nativeValue) > -1 : _vm._q(_vm.computedValue, _vm.trueValue)
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
      },
      "change": function($event) {
        var $$a = _vm.computedValue,
          $$el = $event.target,
          $$c = $$el.checked ? (_vm.trueValue) : (_vm.falseValue);
        if (Array.isArray($$a)) {
          var $$v = _vm.nativeValue,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.computedValue = $$a.concat([$$v]))
          } else {
            $$i > -1 && (_vm.computedValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.computedValue = $$c
        }
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "check",
    class: _vm.type
  }), _vm._v(" "), _c('span', {
    staticClass: "control-label"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(116),
  /* template */
  __webpack_require__(117),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BCheckboxButton',
    props: {
        value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
        nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
        disabled: Boolean,
        required: Boolean,
        name: String,
        size: String,
        type: {
            type: String,
            default: 'is-primary'
        }
    },
    data: function data() {
        return {
            newValue: this.value,
            isFocused: false
        };
    },

    computed: {
        computedValue: {
            get: function get() {
                return this.newValue;
            },
            set: function set(value) {
                this.newValue = value;
                this.$emit('input', value);
            }
        },
        checked: function checked() {
            if (Array.isArray(this.newValue)) {
                return this.newValue.indexOf(this.nativeValue) >= 0;
            }
            return this.newValue === this.nativeValue;
        }
    },
    watch: {
        /**
         * When v-model change, set internal value.
         */
        value: function value(_value) {
            this.newValue = _value;
        }
    }
});

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "control"
  }, [_c('label', {
    ref: "label",
    staticClass: "b-checkbox checkbox button",
    class: [_vm.checked ? _vm.type : null, _vm.size, {
      'is-disabled': _vm.disabled,
      'is-focused': _vm.isFocused
    }],
    attrs: {
      "disabled": _vm.disabled
    },
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        $event.preventDefault();
        _vm.$refs.label.click()
      }
    }
  }, [_vm._t("default"), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.computedValue),
      expression: "computedValue"
    }],
    attrs: {
      "type": "checkbox",
      "disabled": _vm.disabled,
      "required": _vm.required,
      "name": _vm.name
    },
    domProps: {
      "value": _vm.nativeValue,
      "checked": Array.isArray(_vm.computedValue) ? _vm._i(_vm.computedValue, _vm.nativeValue) > -1 : (_vm.computedValue)
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
      },
      "focus": function($event) {
        _vm.isFocused = true
      },
      "blur": function($event) {
        _vm.isFocused = false
      },
      "change": function($event) {
        var $$a = _vm.computedValue,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = _vm.nativeValue,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.computedValue = $$a.concat([$$v]))
          } else {
            $$i > -1 && (_vm.computedValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.computedValue = $$c
        }
      }
    }
  })], 2)])
},staticRenderFns: []}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(119),
  /* template */
  __webpack_require__(120),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BCollapse',
    props: {
        open: {
            type: Boolean,
            default: true
        },
        animation: {
            type: String,
            default: 'fade'
        },
        ariaId: {
            type: String,
            default: ''
        }
    },
    data: function data() {
        return {
            isOpen: this.open
        };
    },

    watch: {
        open: function open(value) {
            this.isOpen = value;
        }
    },
    methods: {
        /**
         * Toggle and emit events
         */
        toggle: function toggle() {
            this.isOpen = !this.isOpen;
            this.$emit('update:open', this.isOpen);
            this.$emit(this.isOpen ? 'open' : 'close');
        }
    }
});

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "collapse"
  }, [_c('div', {
    staticClass: "collapse-trigger",
    on: {
      "click": _vm.toggle
    }
  }, [_vm._t("trigger", null, {
    open: _vm.isOpen
  })], 2), _vm._v(" "), _c('transition', {
    attrs: {
      "name": _vm.animation
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isOpen),
      expression: "isOpen"
    }],
    staticClass: "collapse-content",
    attrs: {
      "id": _vm.ariaId,
      "aria-expanded": _vm.isOpen
    }
  }, [_vm._t("default")], 2)])], 1)
},staticRenderFns: []}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(122),
  /* template */
  __webpack_require__(134),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_TimepickerMixin__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_Input__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__input_Input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__field_Field__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__field_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__field_Field__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__icon_Icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ClockpickerFace__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ClockpickerFace___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__ClockpickerFace__);


var _components;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









var outerPadding = 12;

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BClockpicker',
    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7__ClockpickerFace___default.a.name, __WEBPACK_IMPORTED_MODULE_7__ClockpickerFace___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_4__input_Input___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5__field_Field___default.a.name, __WEBPACK_IMPORTED_MODULE_5__field_Field___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_6__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default.a.name, __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default.a.name, __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default.a), _components),
    mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_TimepickerMixin__["a" /* default */]],
    props: {
        pickerSize: {
            type: Number,
            default: 290
        },
        hourFormat: {
            type: String,
            default: '12',
            validator: function validator(value) {
                return value === '24' || value === '12';
            }
        },
        incrementMinutes: {
            type: Number,
            default: 5
        },
        autoSwitch: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: 'is-primary'
        }
    },
    data: function data() {
        return {
            isSelectingHour: true,
            isDragging: false,
            _isClockpicker: true
        };
    },

    computed: {
        hoursDisplay: function hoursDisplay() {
            if (this.hoursSelected == null) return '--';
            if (this.isHourFormat24) return this.pad(this.hoursSelected);

            var display = this.hoursSelected;
            if (this.meridienSelected === this.PM) display -= 12;
            if (display === 0) display = 12;
            return display;
        },
        minutesDisplay: function minutesDisplay() {
            return this.minutesSelected == null ? '--' : this.pad(this.minutesSelected);
        },
        minFaceValue: function minFaceValue() {
            return this.isSelectingHour && !this.isHourFormat24 && this.meridienSelected === this.PM ? 12 : 0;
        },
        maxFaceValue: function maxFaceValue() {
            return this.isSelectingHour ? !this.isHourFormat24 && this.meridienSelected === this.AM ? 11 : 23 : 59;
        },
        faceFormatter: function faceFormatter() {
            return this.isSelectingHour && !this.isHourFormat24 ? function (val) {
                return val;
            } : this.formatNumber;
        },
        faceSize: function faceSize() {
            return this.pickerSize - outerPadding * 2;
        },
        faceDisabledValues: function faceDisabledValues() {
            return this.isSelectingHour ? this.isHourDisabled : this.isMinuteDisabled;
        }
    },
    methods: {
        onClockInput: function onClockInput(value) {
            if (this.isSelectingHour) {
                this.hoursSelected = value;
                this.onHoursChange(value);
            } else {
                this.minutesSelected = value;
                this.onMinutesChange(value);
            }
        },
        onClockChange: function onClockChange(value) {
            if (this.autoSwitch && this.isSelectingHour) {
                this.isSelectingHour = !this.isSelectingHour;
            }
        },
        onMeridienClick: function onMeridienClick(value) {
            if (this.meridienSelected !== value) {
                this.meridienSelected = value;
                this.onMeridienChange(value);
            }
        }
    }
});

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_config__ = __webpack_require__(2);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BDropdown',
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol___default.a, Function],
            default: null
        },
        disabled: Boolean,
        hoverable: Boolean,
        inline: Boolean,
        position: {
            type: String,
            validator: function validator(value) {
                return ['is-top-right', 'is-top-left', 'is-bottom-left'].indexOf(value) > -1;
            }
        },
        mobileModal: {
            type: Boolean,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_2__utils_config__["a" /* default */].defaultDropdownMobileModal;
            }
        },
        ariaRole: {
            type: String,
            default: ''
        },
        animation: {
            type: String,
            default: 'fade'
        },
        multiple: Boolean,
        closeOnClick: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            selected: this.value,
            isActive: false,
            isHoverable: this.hoverable,
            _isDropdown: true // Used internally by DropdownItem
        };
    },

    computed: {
        rootClasses: function rootClasses() {
            return [this.position, {
                'is-disabled': this.disabled,
                'is-hoverable': this.hoverable,
                'is-inline': this.inline,
                'is-active': this.isActive || this.inline,
                'is-mobile-modal': this.isMobileModal
            }];
        },
        isMobileModal: function isMobileModal() {
            return this.mobileModal && !this.inline && !this.hoverable;
        },
        ariaRoleMenu: function ariaRoleMenu() {
            return this.ariaRole === 'menu' || this.ariaRole === 'list' ? this.ariaRole : null;
        }
    },
    watch: {
        /**
         * When v-model is changed set the new selected item.
         */
        value: function value(_value) {
            this.selected = _value;
        },


        /**
         * Emit event when isActive value is changed.
         */
        isActive: function isActive(value) {
            this.$emit('active-change', value);
        }
    },
    methods: {
        /**
         * Click listener from DropdownItem.
         *   1. Set new selected item.
         *   2. Emit input event to update the user v-model.
         *   3. Close the dropdown.
         */
        selectItem: function selectItem(value) {
            if (this.multiple) {
                if (this.selected) {
                    var index = this.selected.indexOf(value);
                    if (index === -1) {
                        this.selected.push(value);
                    } else {
                        this.selected.splice(index, 1);
                    }
                } else {
                    this.selected = [value];
                }
                this.$emit('change', this.selected);
            } else {
                if (this.selected !== value) {
                    this.selected = value;
                    this.$emit('change', this.selected);
                }
            }
            this.$emit('input', this.selected);
            if (!this.multiple) {
                this.isActive = !this.closeOnClick;
                /*
                 * breaking change
                if (this.hoverable && this.closeOnClick) {
                    this.isHoverable = false
                    // Timeout for the animation complete before destroying
                    setTimeout(() => {
                        this.isHoverable = true
                    }, 250)
                }
                */
            }
        },


        /**
         * White-listed items to not close when clicked.
         */
        isInWhiteList: function isInWhiteList(el) {
            if (el === this.$refs.dropdownMenu) return true;
            if (el === this.$refs.trigger) return true;
            // All chidren from dropdown
            if (this.$refs.dropdownMenu !== undefined) {
                var children = this.$refs.dropdownMenu.querySelectorAll('*');
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var child = _step.value;

                        if (el === child) {
                            return true;
                        }
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
            }
            // All children from trigger
            if (this.$refs.trigger !== undefined) {
                var _children = this.$refs.trigger.querySelectorAll('*');
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(_children), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _child = _step2.value;

                        if (el === _child) {
                            return true;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }

            return false;
        },


        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside: function clickedOutside(event) {
            if (this.inline) return;

            if (!this.isInWhiteList(event.target)) this.isActive = false;
        },


        /**
         * Toggle dropdown if it's not disabled.
         */
        toggle: function toggle() {
            var _this = this;

            if (this.disabled) return;

            if (!this.isActive) {
                // if not active, toggle after clickOutside event
                // this fixes toggling programmatic
                this.$nextTick(function () {
                    _this.isActive = !_this.isActive;
                });
            } else {
                this.isActive = !this.isActive;
            }
        }
    },
    created: function created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside);
        }
    },
    beforeDestroy: function beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside);
        }
    }
});

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "dropdown",
    class: _vm.rootClasses
  }, [(!_vm.inline) ? _c('div', {
    ref: "trigger",
    staticClass: "dropdown-trigger",
    attrs: {
      "role": "button",
      "aria-haspopup": "true"
    },
    on: {
      "click": _vm.toggle
    }
  }, [_vm._t("trigger")], 2) : _vm._e(), _vm._v(" "), _c('transition', {
    attrs: {
      "name": _vm.animation
    }
  }, [(_vm.isMobileModal) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isActive),
      expression: "isActive"
    }],
    staticClass: "background",
    attrs: {
      "aria-hidden": !_vm.isActive
    }
  }) : _vm._e()]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": _vm.animation
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: ((!_vm.disabled && (_vm.isActive || _vm.isHoverable)) || _vm.inline),
      expression: "(!disabled && (isActive || isHoverable)) || inline"
    }],
    ref: "dropdownMenu",
    staticClass: "dropdown-menu",
    attrs: {
      "aria-hidden": !_vm.isActive
    }
  }, [_c('div', {
    staticClass: "dropdown-content",
    attrs: {
      "role": _vm.ariaRoleMenu
    }
  }, [_vm._t("default")], 2)])])], 1)
},staticRenderFns: []}

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BDropdownItem',
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a, Function],
            default: null
        },
        separator: Boolean,
        disabled: Boolean,
        custom: Boolean,
        paddingless: Boolean,
        hasLink: Boolean,
        ariaRole: {
            type: String,
            default: ''
        }
    },
    computed: {
        anchorClasses: function anchorClasses() {
            return {
                'is-disabled': this.$parent.disabled || this.disabled,
                'is-paddingless': this.paddingless,
                'is-active': this.isActive
            };
        },
        itemClasses: function itemClasses() {
            return {
                'dropdown-item': !this.hasLink,
                'is-disabled': this.disabled,
                'is-paddingless': this.paddingless,
                'is-active': this.isActive,
                'has-link': this.hasLink
            };
        },
        ariaRoleItem: function ariaRoleItem() {
            return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null;
        },

        /**
         * Check if item can be clickable.
         */
        isClickable: function isClickable() {
            return !this.$parent.disabled && !this.separator && !this.disabled && !this.custom;
        },
        isActive: function isActive() {
            if (this.$parent.selected === null) return false;
            if (this.$parent.multiple) return this.$parent.selected.indexOf(this.value) >= 0;
            return this.value === this.$parent.selected;
        }
    },
    methods: {
        /**
         * Click listener, select the item.
         */
        selectItem: function selectItem() {
            if (!this.isClickable) return;

            this.$parent.selectItem(this.value);
            this.$emit('click');
        }
    },
    created: function created() {
        if (!this.$parent.$data._isDropdown) {
            this.$destroy();
            throw new Error('You should wrap bDropdownItem on a bDropdown');
        }
    }
});

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.separator) ? _c('hr', {
    staticClass: "dropdown-divider"
  }) : (!_vm.custom && !_vm.hasLink) ? _c('a', {
    staticClass: "dropdown-item",
    class: _vm.anchorClasses,
    attrs: {
      "role": _vm.ariaRoleItem,
      "tabindex": "0"
    },
    on: {
      "click": _vm.selectItem
    }
  }, [_vm._t("default")], 2) : _c('div', {
    class: _vm.itemClasses,
    attrs: {
      "role": _vm.ariaRoleItem,
      "tabindex": "0"
    },
    on: {
      "click": _vm.selectItem
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FieldBody__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FieldBody___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__FieldBody__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BField',
    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_2__FieldBody___default.a.name, __WEBPACK_IMPORTED_MODULE_2__FieldBody___default.a),
    props: {
        type: [String, Object],
        label: String,
        labelFor: String,
        message: [String, Array, Object],
        grouped: Boolean,
        groupMultiline: Boolean,
        position: String,
        expanded: Boolean,
        horizontal: Boolean,
        addons: {
            type: Boolean,
            default: true
        },
        customClass: String,
        labelPosition: {
            type: String,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_1__utils_config__["a" /* default */].defaultFieldLabelPosition;
            }
        }
    },
    data: function data() {
        return {
            newType: this.type,
            newMessage: this.message,
            fieldLabelSize: null,
            _isField: true // Used internally by Input and Select
        };
    },

    computed: {
        rootClasses: function rootClasses() {
            return [this.newPosition, {
                'is-expanded': this.expanded,
                'is-grouped-multiline': this.groupMultiline,
                'is-horizontal': this.horizontal,
                'is-floating-in-label': this.hasLabel && !this.horizontal && this.labelPosition === 'inside',
                'is-floating-label': this.hasLabel && !this.horizontal && this.labelPosition === 'on-border'
            }];
        },

        /**
         * Correct Bulma class for the side of the addon or group.
         *
         * This is not kept like the others (is-small, etc.),
         * because since 'has-addons' is set automatically it
         * doesn't make sense to teach users what addons are exactly.
         */
        newPosition: function newPosition() {
            if (this.position === undefined) return;

            var position = this.position.split('-');
            if (position.length < 1) return;

            var prefix = this.grouped ? 'is-grouped-' : 'has-addons-';

            if (this.position) return prefix + position[1];
        },

        /**
         * Formatted message in case it's an array
         * (each element is separated by <br> tag)
         */
        formattedMessage: function formattedMessage() {
            if (typeof this.newMessage === 'string') {
                return this.newMessage;
            } else {
                var messages = [];
                if (Array.isArray(this.newMessage)) {
                    this.newMessage.forEach(function (message) {
                        if (typeof message === 'string') {
                            messages.push(message);
                        } else {
                            for (var key in message) {
                                if (message[key]) {
                                    messages.push(key);
                                }
                            }
                        }
                    });
                } else {
                    for (var key in this.newMessage) {
                        if (this.newMessage[key]) {
                            messages.push(key);
                        }
                    }
                }
                return messages.filter(function (m) {
                    if (m) return m;
                }).join(' <br> ');
            }
        },
        hasLabel: function hasLabel() {
            return this.label || this.$slots.label;
        }
    },
    watch: {
        /**
         * Set internal type when prop change.
         */
        type: function type(value) {
            this.newType = value;
        },


        /**
         * Set internal message when prop change.
         */
        message: function message(value) {
            this.newMessage = value;
        }
    },
    methods: {
        /**
         * Field has addons if there are more than one slot
         * (element / component) in the Field.
         * Or is grouped when prop is set.
         * Is a method to be called when component re-render.
         */
        fieldType: function fieldType() {
            if (this.grouped) return 'is-grouped';

            var renderedNode = 0;
            if (this.$slots.default) {
                renderedNode = this.$slots.default.reduce(function (i, node) {
                    return node.tag ? i + 1 : i;
                }, 0);
            }
            if (renderedNode > 1 && this.addons && !this.horizontal) {
                return 'has-addons';
            }
        }
    },
    mounted: function mounted() {
        if (this.horizontal) {
            // Bulma docs: .is-normal for any .input or .button
            var elements = this.$el.querySelectorAll('.input, .select, .button, .textarea');
            if (elements.length > 0) {
                this.fieldLabelSize = 'is-normal';
            }
        }
    }
});

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(129),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BFieldBody',
    props: {
        message: {
            type: String
        },
        type: {
            type: [String, Object]
        }
    },
    render: function render(createElement) {
        var _this = this;

        return createElement('div', { attrs: { 'class': 'field-body' } }, this.$slots.default.map(function (element) {
            // skip returns and comments
            if (!element.tag) {
                return element;
            }
            if (_this.message) {
                return createElement('b-field', { attrs: { message: _this.message, 'type': _this.type } }, [element]);
            }
            return createElement('b-field', { attrs: { 'type': _this.type } }, [element]);
        }));
    }
});

/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "field",
    class: [_vm.rootClasses, _vm.fieldType()]
  }, [(_vm.horizontal) ? _c('div', {
    staticClass: "field-label",
    class: [_vm.customClass, _vm.fieldLabelSize]
  }, [(_vm.hasLabel) ? _c('label', {
    staticClass: "label",
    class: _vm.customClass,
    attrs: {
      "for": _vm.labelFor
    }
  }, [(_vm.$slots.label) ? _vm._t("label") : [_vm._v(_vm._s(_vm.label))]], 2) : _vm._e()]) : [(_vm.hasLabel) ? _c('label', {
    staticClass: "label",
    class: _vm.customClass,
    attrs: {
      "for": _vm.labelFor
    }
  }, [(_vm.$slots.label) ? _vm._t("label") : [_vm._v(_vm._s(_vm.label))]], 2) : _vm._e()], _vm._v(" "), (_vm.horizontal) ? _c('b-field-body', {
    attrs: {
      "message": _vm.newMessage ? _vm.formattedMessage : '',
      "type": _vm.newType
    }
  }, [_vm._t("default")], 2) : [_vm._t("default")], _vm._v(" "), (_vm.newMessage && !_vm.horizontal) ? _c('p', {
    staticClass: "help",
    class: _vm.newType,
    domProps: {
      "innerHTML": _vm._s(_vm.formattedMessage)
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(132),
  /* template */
  __webpack_require__(133),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// These should match the variables in clockpicker.scss
var indicatorSize = 40;
var paddingInner = 5;

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BClockpickerFace',
    props: {
        pickerSize: Number,
        min: Number,
        max: Number,
        double: Boolean,
        value: Number,
        faceNumbers: Array,
        disabledValues: Function
    },
    data: function data() {
        return {
            isDragging: false,
            inputValue: this.value,
            prevAngle: 720
        };
    },

    computed: {
        /**
         * How many number indicators are shown on the face
         */
        count: function count() {
            return this.max - this.min + 1;
        },

        /**
         * How many number indicators are shown per ring on the face
         */
        countPerRing: function countPerRing() {
            return this.double ? this.count / 2 : this.count;
        },

        /**
         * Radius of the clock face
         */
        radius: function radius() {
            return this.pickerSize / 2;
        },

        /**
         * Radius of the outer ring of number indicators
         */
        outerRadius: function outerRadius() {
            return this.radius - paddingInner - indicatorSize / 2;
        },

        /**
         * Radius of the inner ring of number indicators
         */
        innerRadius: function innerRadius() {
            return Math.max(this.outerRadius * 0.6, this.outerRadius - paddingInner - indicatorSize);
            // 48px gives enough room for the outer ring of numbers
        },

        /**
         * The angle for each selectable value
         * For hours this ends up being 30 degrees, for minutes 6 degrees
         */
        degreesPerUnit: function degreesPerUnit() {
            return 360 / this.countPerRing;
        },

        /**
         * Used for calculating x/y grid location based on degrees
         */
        degrees: function degrees() {
            return this.degreesPerUnit * Math.PI / 180;
        },

        /**
         * Calculates the angle the clock hand should be rotated for the
         * selected value
         */
        handRotateAngle: function handRotateAngle() {
            var currentAngle = this.prevAngle;
            while (currentAngle < 0) {
                currentAngle += 360;
            }var targetAngle = this.calcHandAngle(this.displayedValue);
            var degreesDiff = this.shortestDistanceDegrees(currentAngle, targetAngle);
            var angle = this.prevAngle + degreesDiff;
            return angle;
        },

        /**
         * Determines how long the selector hand is based on if the
         * selected value is located along the outer or inner ring
         */
        handScale: function handScale() {
            return this.calcHandScale(this.displayedValue);
        },
        handStyle: function handStyle() {
            return {
                transform: 'rotate(' + this.handRotateAngle + 'deg) scaleY(' + this.handScale + ')',
                transition: '.3s cubic-bezier(.25,.8,.50,1)'
            };
        },

        /**
         * The value the hand should be pointing at
         */
        displayedValue: function displayedValue() {
            return this.inputValue == null ? this.min : this.inputValue;
        }
    },
    watch: {
        value: function value(_value) {
            if (_value !== this.inputValue) {
                this.prevAngle = this.handRotateAngle;
            }
            this.inputValue = _value;
        }
    },
    methods: {
        isDisabled: function isDisabled(value) {
            return this.disabledValues && this.disabledValues(value);
        },

        /**
         * Calculates the distance between two points
         */
        euclidean: function euclidean(p0, p1) {
            var dx = p1.x - p0.x;
            var dy = p1.y - p0.y;

            return Math.sqrt(dx * dx + dy * dy);
        },
        shortestDistanceDegrees: function shortestDistanceDegrees(start, stop) {
            var modDiff = (stop - start) % 360;
            var shortestDistance = 180 - Math.abs(Math.abs(modDiff) - 180);
            return (modDiff + 360) % 360 < 180 ? shortestDistance * 1 : shortestDistance * -1;
        },

        /**
         * Calculates the angle of the line from the center point
         * to the given point.
         */
        coordToAngle: function coordToAngle(center, p1) {
            var value = 2 * Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x);
            return Math.abs(value * 180 / Math.PI);
        },

        /**
         * Generates the inline style translate() property for a
         * number indicator, which determines it's location on the
         * clock face
         */
        getNumberTranslate: function getNumberTranslate(value) {
            var _getNumberCoords = this.getNumberCoords(value),
                x = _getNumberCoords.x,
                y = _getNumberCoords.y;

            return 'translate(' + x + 'px, ' + y + 'px)';
        },

        /***
         * Calculates the coordinates on the clock face for a number
         * indicator value
         */
        getNumberCoords: function getNumberCoords(value) {
            var radius = this.isInnerRing(value) ? this.innerRadius : this.outerRadius;
            return {
                x: Math.round(radius * Math.sin((value - this.min) * this.degrees)),
                y: Math.round(-radius * Math.cos((value - this.min) * this.degrees))
            };
        },
        getFaceNumberClasses: function getFaceNumberClasses(num) {
            return {
                'active': num.value === this.displayedValue,
                'disabled': this.isDisabled(num.value)
            };
        },

        /**
         * Determines if a value resides on the inner ring
         */
        isInnerRing: function isInnerRing(value) {
            return this.double && value - this.min >= this.countPerRing;
        },
        calcHandAngle: function calcHandAngle(value) {
            var angle = this.degreesPerUnit * (value - this.min);
            if (this.isInnerRing(value)) angle -= 360;
            return angle;
        },
        calcHandScale: function calcHandScale(value) {
            return this.isInnerRing(value) ? this.innerRadius / this.outerRadius : 1;
        },
        onMouseDown: function onMouseDown(e) {
            e.preventDefault();
            this.isDragging = true;
            this.onDragMove(e);
        },
        onMouseUp: function onMouseUp() {
            this.isDragging = false;
            if (!this.isDisabled(this.inputValue)) {
                this.$emit('change', this.inputValue);
            }
        },
        onDragMove: function onDragMove(e) {
            e.preventDefault();
            if (!this.isDragging && e.type !== 'click') return;

            var _$refs$clock$getBound = this.$refs.clock.getBoundingClientRect(),
                width = _$refs$clock$getBound.width,
                top = _$refs$clock$getBound.top,
                left = _$refs$clock$getBound.left;

            var _ref = 'touches' in e ? e.touches[0] : e,
                clientX = _ref.clientX,
                clientY = _ref.clientY;

            var center = { x: width / 2, y: -width / 2 };
            var coords = { x: clientX - left, y: top - clientY };
            var handAngle = Math.round(this.coordToAngle(center, coords) + 360) % 360;
            var insideClick = this.double && this.euclidean(center, coords) < (this.outerRadius + this.innerRadius) / 2 - 16;

            var value = Math.round(handAngle / this.degreesPerUnit) + this.min + (insideClick ? this.countPerRing : 0);

            // Necessary to fix edge case when selecting left part of max value
            if (handAngle >= 360 - this.degreesPerUnit / 2) {
                value = insideClick ? this.max : this.min;
            }
            this.update(value);
        },
        update: function update(value) {
            if (this.inputValue !== value && !this.isDisabled(value)) {
                this.prevAngle = this.handRotateAngle;
                this.inputValue = value;
                this.$emit('input', value);
            }
        }
    }
});

/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-clockpicker-face",
    on: {
      "mousedown": _vm.onMouseDown,
      "mouseup": _vm.onMouseUp,
      "mousemove": _vm.onDragMove,
      "touchstart": _vm.onMouseDown,
      "touchend": _vm.onMouseUp,
      "touchmove": _vm.onDragMove
    }
  }, [_c('div', {
    ref: "clock",
    staticClass: "b-clockpicker-face-outer-ring"
  }, [_c('div', {
    staticClass: "b-clockpicker-face-hand",
    style: (_vm.handStyle)
  }), _vm._v(" "), _vm._l((_vm.faceNumbers), function(num, index) {
    return _c('span', {
      key: index,
      staticClass: "b-clockpicker-face-number",
      class: _vm.getFaceNumberClasses(num),
      style: ({
        transform: _vm.getNumberTranslate(num.value)
      })
    }, [_c('span', [_vm._v(_vm._s(num.label))])])
  })], 2)])
},staticRenderFns: []}

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-clockpicker control",
    class: [_vm.size, _vm.type, {
      'is-expanded': _vm.expanded
    }]
  }, [(!_vm.isMobile || _vm.inline) ? _c('b-dropdown', {
    ref: "dropdown",
    attrs: {
      "position": _vm.position,
      "disabled": _vm.disabled,
      "inline": _vm.inline
    }
  }, [(!_vm.inline) ? _c('b-input', _vm._b({
    ref: "input",
    attrs: {
      "slot": "trigger",
      "autocomplete": "off",
      "value": _vm.formatValue(_vm.computedValue),
      "placeholder": _vm.placeholder,
      "size": _vm.size,
      "icon": _vm.icon,
      "icon-pack": _vm.iconPack,
      "loading": _vm.loading,
      "disabled": _vm.disabled,
      "readonly": !_vm.editable,
      "rounded": _vm.rounded,
      "use-html5-validation": _vm.useHtml5Validation
    },
    on: {
      "focus": _vm.handleOnFocus,
      "blur": function($event) {
        _vm.onBlur() && _vm.checkHtml5Validity()
      }
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggle(true)
      },
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.toggle(true)
      },
      "change": function($event) {
        _vm.onChangeNativePicker($event)
      }
    },
    slot: "trigger"
  }, 'b-input', _vm.$attrs, false)) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "card",
    attrs: {
      "disabled": _vm.disabled,
      "custom": ""
    }
  }, [(_vm.inline) ? _c('header', {
    staticClass: "card-header"
  }, [_c('div', {
    staticClass: "b-clockpicker-header card-header-title"
  }, [_c('div', {
    staticClass: "b-clockpicker-time"
  }, [_c('span', {
    staticClass: "b-clockpicker-btn",
    class: {
      active: _vm.isSelectingHour
    },
    on: {
      "click": function($event) {
        _vm.isSelectingHour = true
      }
    }
  }, [_vm._v(_vm._s(_vm.hoursDisplay))]), _vm._v(" "), _c('span', [_vm._v(":")]), _vm._v(" "), _c('span', {
    staticClass: "b-clockpicker-btn",
    class: {
      active: !_vm.isSelectingHour
    },
    on: {
      "click": function($event) {
        _vm.isSelectingHour = false
      }
    }
  }, [_vm._v(_vm._s(_vm.minutesDisplay))])]), _vm._v(" "), (!_vm.isHourFormat24) ? _c('div', {
    staticClass: "b-clockpicker-period"
  }, [_c('div', {
    staticClass: "b-clockpicker-btn",
    class: {
      active: _vm.meridienSelected == _vm.AM
    },
    on: {
      "click": function($event) {
        _vm.onMeridienClick(_vm.AM)
      }
    }
  }, [_vm._v("am")]), _vm._v(" "), _c('div', {
    staticClass: "b-clockpicker-btn",
    class: {
      active: _vm.meridienSelected == _vm.PM
    },
    on: {
      "click": function($event) {
        _vm.onMeridienClick(_vm.PM)
      }
    }
  }, [_vm._v("pm")])]) : _vm._e()])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "card-content"
  }, [_c('div', {
    staticClass: "b-clockpicker-body",
    style: ({
      width: _vm.faceSize + 'px',
      height: _vm.faceSize + 'px'
    })
  }, [(!_vm.inline) ? _c('div', {
    staticClass: "b-clockpicker-time"
  }, [_c('div', {
    staticClass: "b-clockpicker-btn",
    class: {
      active: _vm.isSelectingHour
    },
    on: {
      "click": function($event) {
        _vm.isSelectingHour = true
      }
    }
  }, [_vm._v("Hours")]), _vm._v(" "), _c('span', {
    staticClass: "b-clockpicker-btn",
    class: {
      active: !_vm.isSelectingHour
    },
    on: {
      "click": function($event) {
        _vm.isSelectingHour = false
      }
    }
  }, [_vm._v("Min")])]) : _vm._e(), _vm._v(" "), (!_vm.isHourFormat24 && !_vm.inline) ? _c('div', {
    staticClass: "b-clockpicker-period"
  }, [_c('div', {
    staticClass: "b-clockpicker-btn",
    class: {
      active: _vm.meridienSelected == _vm.AM
    },
    on: {
      "click": function($event) {
        _vm.onMeridienClick(_vm.AM)
      }
    }
  }, [_vm._v(_vm._s(_vm.AM))]), _vm._v(" "), _c('div', {
    staticClass: "b-clockpicker-btn",
    class: {
      active: _vm.meridienSelected == _vm.PM
    },
    on: {
      "click": function($event) {
        _vm.onMeridienClick(_vm.PM)
      }
    }
  }, [_vm._v(_vm._s(_vm.PM))])]) : _vm._e(), _vm._v(" "), _c('b-clockpicker-face', {
    attrs: {
      "picker-size": _vm.faceSize,
      "min": _vm.minFaceValue,
      "max": _vm.maxFaceValue,
      "face-numbers": _vm.isSelectingHour ? _vm.hours : _vm.minutes,
      "disabled-values": _vm.faceDisabledValues,
      "double": _vm.isSelectingHour && _vm.isHourFormat24,
      "value": _vm.isSelectingHour ? _vm.hoursSelected : _vm.minutesSelected
    },
    on: {
      "input": _vm.onClockInput,
      "change": _vm.onClockChange
    }
  })], 1)]), _vm._v(" "), (_vm.$slots.default !== undefined && _vm.$slots.default.length) ? _c('footer', {
    staticClass: "b-clockpicker-footer card-footer"
  }, [_vm._t("default")], 2) : _vm._e()])], 1) : _c('b-input', _vm._b({
    ref: "input",
    attrs: {
      "type": "time",
      "autocomplete": "off",
      "value": _vm.formatHHMMSS(_vm.computedValue),
      "placeholder": _vm.placeholder,
      "size": _vm.size,
      "icon": _vm.icon,
      "icon-pack": _vm.iconPack,
      "loading": _vm.loading,
      "max": _vm.formatHHMMSS(_vm.maxTime),
      "min": _vm.formatHHMMSS(_vm.minTime),
      "disabled": _vm.disabled,
      "readonly": false,
      "use-html5-validation": _vm.useHtml5Validation
    },
    on: {
      "focus": _vm.handleOnFocus,
      "blur": function($event) {
        _vm.onBlur() && _vm.checkHtml5Validity()
      }
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggle(true)
      },
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.toggle(true)
      },
      "change": function($event) {
        _vm.onChangeNativePicker($event)
      }
    }
  }, 'b-input', _vm.$attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(136),
  /* template */
  __webpack_require__(148),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_FormElementMixin__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_helpers__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_Input__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__input_Input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__field_Field__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__field_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__field_Field__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__select_Select__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__select_Select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__select_Select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__icon_Icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__DatepickerTable__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__DatepickerTable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__DatepickerTable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__DatepickerMonth__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__DatepickerMonth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__DatepickerMonth__);


var _components;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//















var defaultDateFormatter = function defaultDateFormatter(date, vm) {
    var yyyyMMdd = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    var d = new Date(yyyyMMdd);
    return !vm.isTypeMonth ? d.toLocaleDateString() : d.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit' });
};

var defaultDateParser = function defaultDateParser(date, vm) {
    if (!vm.isTypeMonth) return new Date(Date.parse(date));
    if (date) {
        var s = date.split('/');
        var year = s[0].length === 4 ? s[0] : s[1];
        var month = s[0].length === 2 ? s[0] : s[1];
        if (year && month) {
            return new Date(parseInt(year, 10), parseInt(month - 1, 10), 1, 0, 0, 0, 0);
        }
    }
    return null;
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BDatepicker',
    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_10__DatepickerTable___default.a.name, __WEBPACK_IMPORTED_MODULE_10__DatepickerTable___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_11__DatepickerMonth___default.a.name, __WEBPACK_IMPORTED_MODULE_11__DatepickerMonth___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_6__input_Input___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7__field_Field___default.a.name, __WEBPACK_IMPORTED_MODULE_7__field_Field___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_8__select_Select___default.a.name, __WEBPACK_IMPORTED_MODULE_8__select_Select___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default.a.name, __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default.a.name, __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default.a), _components),
    mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_FormElementMixin__["a" /* default */]],
    inheritAttrs: false,
    props: {
        value: Date,
        dayNames: {
            type: Array,
            default: function _default() {
                if (Array.isArray(__WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDayNames)) {
                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDayNames;
                } else {
                    return ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'S'];
                }
            }
        },
        monthNames: {
            type: Array,
            default: function _default() {
                if (Array.isArray(__WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultMonthNames)) {
                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultMonthNames;
                } else {
                    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                }
            }
        },
        firstDayOfWeek: {
            type: Number,
            default: function _default() {
                if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultFirstDayOfWeek === 'number') {
                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultFirstDayOfWeek;
                } else {
                    return 0;
                }
            }
        },
        inline: Boolean,
        minDate: Date,
        maxDate: Date,
        focusedDate: Date,
        placeholder: String,
        editable: Boolean,
        disabled: Boolean,
        unselectableDates: Array,
        unselectableDaysOfWeek: {
            type: Array,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultUnselectableDaysOfWeek;
            }
        },
        selectableDates: Array,
        dateFormatter: {
            type: Function,
            default: function _default(date, vm) {
                if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateFormatter === 'function') {
                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateFormatter(date);
                } else {
                    return defaultDateFormatter(date, vm);
                }
            }
        },
        dateParser: {
            type: Function,
            default: function _default(date, vm) {
                if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateParser === 'function') {
                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateParser(date);
                } else {
                    return defaultDateParser(date, vm);
                }
            }
        },
        dateCreator: {
            type: Function,
            default: function _default() {
                if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateCreator === 'function') {
                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateCreator();
                } else {
                    return new Date();
                }
            }
        },
        mobileNative: {
            type: Boolean,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDatepickerMobileNative;
            }
        },
        position: String,
        events: Array,
        indicators: {
            type: String,
            default: 'dots'
        },
        openOnFocus: Boolean,
        yearsRange: {
            type: Array,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDatepickerYearsRange;
            }
        },
        type: {
            type: String,
            validator: function validator(value) {
                return ['month'].indexOf(value) >= 0;
            }
        },
        nearbyMonthDays: {
            type: Boolean,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDatepickerNearbyMonthDays;
            }
        },
        nearbySelectableMonthDays: {
            type: Boolean,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDatepickerNearbySelectableMonthDays;
            }
        }
    },
    data: function data() {
        var focusedDate = this.value || this.focusedDate || this.dateCreator();

        return {
            dateSelected: this.value,
            focusedDateData: {
                month: focusedDate.getMonth(),
                year: focusedDate.getFullYear()
            },
            _elementRef: 'input',
            _isDatepicker: true
        };
    },

    computed: {
        computedValue: {
            get: function get() {
                return this.dateSelected;
            },
            set: function set(value) {
                this.updateInternalState(value);
                this.togglePicker(false);
                this.$emit('input', value);
            }
        },
        /*
        * Returns an array of years for the year dropdown. If earliest/latest
        * dates are set by props, range of years will fall within those dates.
        */
        listOfYears: function listOfYears() {
            var latestYear = this.focusedDateData.year + this.yearsRange[1];
            if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
                latestYear = this.maxDate.getFullYear();
            }

            var earliestYear = this.focusedDateData.year + this.yearsRange[0];
            if (this.minDate && this.minDate.getFullYear() > earliestYear) {
                earliestYear = this.minDate.getFullYear();
            }

            var arrayOfYears = [];
            for (var i = earliestYear; i <= latestYear; i++) {
                arrayOfYears.push(i);
            }

            return arrayOfYears.reverse();
        },
        showPrev: function showPrev() {
            if (!this.minDate) return false;
            if (this.isTypeMonth) {
                return this.focusedDateData.year <= this.minDate.getFullYear();
            }
            var dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
            var date = new Date(this.minDate.getFullYear(), this.minDate.getMonth());
            return dateToCheck <= date;
        },
        showNext: function showNext() {
            if (!this.maxDate) return false;
            if (this.isTypeMonth) {
                return this.focusedDateData.year >= this.maxDate.getFullYear();
            }
            var dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
            var date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());
            return dateToCheck >= date;
        },
        isMobile: function isMobile() {
            return this.mobileNative && __WEBPACK_IMPORTED_MODULE_2__utils_helpers__["c" /* isMobile */].any();
        },
        isTypeMonth: function isTypeMonth() {
            return this.type === 'month';
        }
    },
    watch: {
        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        value: function value(_value) {
            this.updateInternalState(_value);
            this.togglePicker(false);
            !this.isValid && this.$refs.input.checkHtml5Validity();
        },
        focusedDate: function focusedDate(value) {
            if (value) {
                this.focusedDateData = {
                    month: value.getMonth(),
                    year: value.getFullYear()
                };
            }
        },


        /*
        * Emit input event on month and/or year change
        */
        'focusedDateData.month': function focusedDateDataMonth(value) {
            this.$emit('change-month', value);
        },
        'focusedDateData.year': function focusedDateDataYear(value) {
            this.$emit('change-year', value);
        }
    },
    methods: {
        /*
        * Parse string into date
        */
        onChange: function onChange(value) {
            var date = this.dateParser(value, this);
            if (date && !isNaN(date)) {
                this.computedValue = date;
            } else {
                // Force refresh input value when not valid date
                this.computedValue = null;
                this.$refs.input.newValue = this.computedValue;
            }
        },


        /*
        * Format date into string
        */
        formatValue: function formatValue(value) {
            if (value && !isNaN(value)) {
                return this.dateFormatter(value, this);
            } else {
                return null;
            }
        },


        /*
        * Either decrement month by 1 if not January or decrement year by 1
        * and set month to 11 (December) or decrement year when 'month'
        */
        prev: function prev() {
            if (this.disabled) return;

            if (this.isTypeMonth) {
                this.focusedDateData.year -= 1;
            } else {
                if (this.focusedDateData.month > 0) {
                    this.focusedDateData.month -= 1;
                } else {
                    this.focusedDateData.month = 11;
                    this.focusedDateData.year -= 1;
                }
            }
        },


        /*
        * Either increment month by 1 if not December or increment year by 1
        * and set month to 0 (January) or increment year when 'month'
        */
        next: function next() {
            if (this.disabled) return;

            if (this.isTypeMonth) {
                this.focusedDateData.year += 1;
            } else {
                if (this.focusedDateData.month < 11) {
                    this.focusedDateData.month += 1;
                } else {
                    this.focusedDateData.month = 0;
                    this.focusedDateData.year += 1;
                }
            }
        },
        formatNative: function formatNative(value) {
            return this.isTypeMonth ? this.formatYYYYMM(value) : this.formatYYYYMMDD(value);
        },


        /*
        * Format date into string 'YYYY-MM-DD'
        */
        formatYYYYMMDD: function formatYYYYMMDD(value) {
            var date = new Date(value);
            if (value && !isNaN(date)) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                return year + '-' + ((month < 10 ? '0' : '') + month) + '-' + ((day < 10 ? '0' : '') + day);
            }
            return '';
        },


        /*
        * Format date into string 'YYYY-MM'
        */
        formatYYYYMM: function formatYYYYMM(value) {
            var date = new Date(value);
            if (value && !isNaN(date)) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                return year + '-' + ((month < 10 ? '0' : '') + month);
            }
            return '';
        },


        /*
        * Parse date from string
        */
        onChangeNativePicker: function onChangeNativePicker(event) {
            var date = event.target.value;
            this.computedValue = date ? new Date(date.replace(/-/g, '/')) : null;
        },
        updateInternalState: function updateInternalState(value) {
            var currentDate = !value ? this.dateCreator() : value;
            this.focusedDateData = {
                month: currentDate.getMonth(),
                year: currentDate.getFullYear()
            };
            this.dateSelected = value;
        },


        /*
        * Toggle datepicker
        */
        togglePicker: function togglePicker(active) {
            if (this.$refs.dropdown) {
                this.$refs.dropdown.isActive = typeof active === 'boolean' ? active : !this.$refs.dropdown.isActive;
            }
        },


        /*
        * Call default onFocus method and show datepicker
        */
        handleOnFocus: function handleOnFocus(event) {
            this.onFocus(event);
            if (this.openOnFocus) {
                this.togglePicker(true);
            }
        },


        /*
        * Toggle dropdown
        */
        toggle: function toggle() {
            this.$refs.dropdown.toggle();
        },


        /*
        * Avoid dropdown toggle when is already visible
        */
        onInputClick: function onInputClick(event) {
            if (this.$refs.dropdown.isActive) {
                event.stopPropagation();
            }
        },


        /**
         * Keypress event that is bound to the document.
         */
        keyPress: function keyPress(event) {
            // Esc key
            if (this.$refs.dropdown && this.$refs.dropdown.isActive && event.keyCode === 27) {
                this.togglePicker(false);
            }
        }
    },
    created: function created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
        }
    },
    beforeDestroy: function beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
        }
    }
});

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__icon_Icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__ = __webpack_require__(10);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BSelect',
    components: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a),
    mixins: [__WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__["a" /* default */]],
    inheritAttrs: false,
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a, Function],
            default: null
        },
        placeholder: String,
        multiple: Boolean,
        nativeSize: [String, Number]
    },
    data: function data() {
        return {
            selected: this.value,
            _elementRef: 'select'
        };
    },

    computed: {
        computedValue: {
            get: function get() {
                return this.selected;
            },
            set: function set(value) {
                this.selected = value;
                this.$emit('input', value);
                !this.isValid && this.checkHtml5Validity();
            }
        },
        spanClasses: function spanClasses() {
            return [this.size, this.statusType, {
                'is-fullwidth': this.expanded,
                'is-loading': this.loading,
                'is-multiple': this.multiple,
                'is-rounded': this.rounded,
                'is-empty': this.selected === null
            }];
        }
    },
    watch: {
        /**
         * When v-model is changed:
         *   1. Set the selected option.
         *   2. If it's invalid, validate again.
         */
        value: function value(_value) {
            this.selected = _value;
            !this.isValid && this.checkHtml5Validity();
        }
    }
});

/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "control",
    class: {
      'is-expanded': _vm.expanded, 'has-icons-left': _vm.icon
    }
  }, [_c('span', {
    staticClass: "select",
    class: _vm.spanClasses
  }, [_c('select', _vm._b({
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.computedValue),
      expression: "computedValue"
    }],
    ref: "select",
    attrs: {
      "multiple": _vm.multiple,
      "size": _vm.nativeSize
    },
    on: {
      "blur": function($event) {
        _vm.$emit('blur', $event) && _vm.checkHtml5Validity()
      },
      "focus": function($event) {
        _vm.$emit('focus', $event)
      },
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.computedValue = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, 'select', _vm.$attrs, false), [(_vm.placeholder) ? [(_vm.computedValue == null) ? _c('option', {
    attrs: {
      "disabled": "",
      "hidden": ""
    },
    domProps: {
      "value": null
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.placeholder) + "\n                ")]) : _vm._e()] : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]), _vm._v(" "), (_vm.icon) ? _c('b-icon', {
    staticClass: "is-left",
    attrs: {
      "icon": _vm.icon,
      "pack": _vm.iconPack,
      "size": _vm.iconSize
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(140),
  /* template */
  __webpack_require__(144),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BDatepickerTable',
    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow___default.a.name, __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow___default.a),
    props: {
        value: Date,
        dayNames: Array,
        monthNames: Array,
        firstDayOfWeek: Number,
        events: Array,
        indicators: String,
        minDate: Date,
        maxDate: Date,
        focused: Object,
        disabled: Boolean,
        dateCreator: Function,
        unselectableDates: Array,
        unselectableDaysOfWeek: Array,
        selectableDates: Array,
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean
    },
    computed: {
        visibleDayNames: function visibleDayNames() {
            var visibleDayNames = [];
            var index = this.firstDayOfWeek;
            while (visibleDayNames.length < this.dayNames.length) {
                var currentDayName = this.dayNames[index % this.dayNames.length];
                visibleDayNames.push(currentDayName);
                index++;
            }
            return visibleDayNames;
        },
        hasEvents: function hasEvents() {
            return this.events && this.events.length;
        },


        /*
        * Return array of all events in the specified month
        */
        eventsInThisMonth: function eventsInThisMonth() {
            if (!this.events) return [];

            var monthEvents = [];

            for (var i = 0; i < this.events.length; i++) {
                var event = this.events[i];

                if (!event.hasOwnProperty('date')) {
                    event = { date: event };
                }
                if (!event.hasOwnProperty('type')) {
                    event.type = 'is-primary';
                }
                if (event.date.getMonth() === this.focused.month && event.date.getFullYear() === this.focused.year) {
                    monthEvents.push(event);
                }
            }

            return monthEvents;
        },

        /*
        * Return array of all weeks in the specified month
        */
        weeksInThisMonth: function weeksInThisMonth() {
            var month = this.focused.month;
            var year = this.focused.year;
            var weeksInThisMonth = [];
            var daysInThisMonth = new Date(year, month + 1, 0).getDate();

            var startingDay = 1;

            while (startingDay <= daysInThisMonth + 6) {
                var newWeek = this.weekBuilder(startingDay, month, year);
                var weekValid = false;

                newWeek.forEach(function (day) {
                    if (day.getMonth() === month) {
                        weekValid = true;
                    }
                });

                if (weekValid) {
                    weeksInThisMonth.push(newWeek);
                }

                startingDay += 7;
            }

            return weeksInThisMonth;
        }
    },
    methods: {
        /*
        * Emit input event with selected date as payload for v-model in parent
        */
        updateSelectedDate: function updateSelectedDate(date) {
            this.$emit('input', date);
        },


        /*
        * Return array of all days in the week that the startingDate is within
        */
        weekBuilder: function weekBuilder(startingDate, month, year) {
            var thisMonth = new Date(year, month);

            var thisWeek = [];

            var dayOfWeek = new Date(year, month, startingDate).getDay();

            var end = dayOfWeek >= this.firstDayOfWeek ? dayOfWeek - this.firstDayOfWeek : 7 - this.firstDayOfWeek + dayOfWeek;

            var daysAgo = 1;
            for (var i = 0; i < end; i++) {
                thisWeek.unshift(new Date(thisMonth.getFullYear(), thisMonth.getMonth(), startingDate - daysAgo));
                daysAgo++;
            }

            thisWeek.push(new Date(year, month, startingDate));

            var daysForward = 1;
            while (thisWeek.length < 7) {
                thisWeek.push(new Date(year, month, startingDate + daysForward));
                daysForward++;
            }

            return thisWeek;
        },
        eventsInThisWeek: function eventsInThisWeek(week) {
            return this.eventsInThisMonth.filter(function (event) {
                var stripped = new Date(Date.parse(event.date));
                stripped.setHours(0);
                stripped.setMinutes(0);
                stripped.setSeconds(0);
                stripped.setMilliseconds(0);
                var timed = stripped.getTime();

                return week.some(function (weekDate) {
                    return weekDate.getTime() === timed;
                });
            });
        }
    }
});

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(142),
  /* template */
  __webpack_require__(143),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BDatepickerTableRow',
    props: {
        selectedDate: Date,
        week: {
            type: Array,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        minDate: Date,
        maxDate: Date,
        disabled: Boolean,
        unselectableDates: Array,
        unselectableDaysOfWeek: Array,
        selectableDates: Array,
        events: Array,
        indicators: String,
        dateCreator: Function,
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean
    },
    methods: {
        /*
        * Check that selected day is within earliest/latest params and
        * is within this month
        */
        selectableDate: function selectableDate(day) {
            var validity = [];

            if (this.minDate) {
                validity.push(day >= this.minDate);
            }

            if (this.maxDate) {
                validity.push(day <= this.maxDate);
            }

            if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
                validity.push(day.getMonth() === this.month);
            }

            if (this.selectableDates) {
                for (var i = 0; i < this.selectableDates.length; i++) {
                    var enabledDate = this.selectableDates[i];
                    if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                        return true;
                    } else {
                        validity.push(false);
                    }
                }
            }

            if (this.unselectableDates) {
                for (var _i = 0; _i < this.unselectableDates.length; _i++) {
                    var disabledDate = this.unselectableDates[_i];
                    validity.push(day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
                }
            }

            if (this.unselectableDaysOfWeek) {
                for (var _i2 = 0; _i2 < this.unselectableDaysOfWeek.length; _i2++) {
                    var dayOfWeek = this.unselectableDaysOfWeek[_i2];
                    validity.push(day.getDay() !== dayOfWeek);
                }
            }

            return validity.indexOf(false) < 0;
        },


        /*
        * Emit select event with chosen date as payload
        */
        emitChosenDate: function emitChosenDate(day) {
            if (this.disabled) return;

            if (this.selectableDate(day)) {
                this.$emit('select', day);
            }
        },
        eventsDateMatch: function eventsDateMatch(day) {
            if (!this.events || !this.events.length) return false;

            var dayEvents = [];

            for (var i = 0; i < this.events.length; i++) {
                if (this.events[i].date.getDay() === day.getDay()) {
                    dayEvents.push(this.events[i]);
                }
            }

            if (!dayEvents.length) {
                return false;
            }

            return dayEvents;
        },


        /*
        * Build classObject for cell using validations
        */
        classObject: function classObject(day) {
            function dateMatch(dateOne, dateTwo) {
                // if either date is null or undefined, return false
                if (!dateOne || !dateTwo) {
                    return false;
                }

                return dateOne.getDate() === dateTwo.getDate() && dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
            }

            return {
                'is-selected': dateMatch(day, this.selectedDate),
                'is-today': dateMatch(day, this.dateCreator()),
                'is-selectable': this.selectableDate(day) && !this.disabled,
                'is-unselectable': !this.selectableDate(day) || this.disabled,
                'is-invisible': !this.nearbyMonthDays && day.getMonth() !== this.month,
                'is-nearby': this.nearbySelectableMonthDays && day.getMonth() !== this.month
            };
        }
    }
});

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "datepicker-row"
  }, [_vm._l((_vm.week), function(day, index) {
    return [(_vm.selectableDate(day) && !_vm.disabled) ? _c('a', {
      key: index,
      staticClass: "datepicker-cell",
      class: [_vm.classObject(day), {
        'has-event': _vm.eventsDateMatch(day)
      }, _vm.indicators],
      attrs: {
        "role": "button",
        "href": "#",
        "disabled": _vm.disabled
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.emitChosenDate(day)
        },
        "keydown": [function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
          $event.preventDefault();
          _vm.emitChosenDate(day)
        }, function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
          $event.preventDefault();
          _vm.emitChosenDate(day)
        }]
      }
    }, [_vm._v("\n            " + _vm._s(day.getDate()) + "\n            "), (_vm.eventsDateMatch(day)) ? _c('div', {
      staticClass: "events"
    }, _vm._l((_vm.eventsDateMatch(day)), function(event, index) {
      return _c('div', {
        key: index,
        staticClass: "event",
        class: event.type
      })
    })) : _vm._e()]) : _c('div', {
      key: index,
      staticClass: "datepicker-cell",
      class: _vm.classObject(day)
    }, [_vm._v("\n            " + _vm._s(day.getDate()) + "\n        ")])]
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "datepicker-table"
  }, [_c('header', {
    staticClass: "datepicker-header"
  }, _vm._l((_vm.visibleDayNames), function(day, index) {
    return _c('div', {
      key: index,
      staticClass: "datepicker-cell"
    }, [_vm._v("\n            " + _vm._s(day) + "\n        ")])
  })), _vm._v(" "), _c('div', {
    staticClass: "datepicker-body",
    class: {
      'has-events': _vm.hasEvents
    }
  }, _vm._l((_vm.weeksInThisMonth), function(week, index) {
    return _c('b-datepicker-table-row', {
      key: index,
      attrs: {
        "selected-date": _vm.value,
        "week": week,
        "month": _vm.focused.month,
        "min-date": _vm.minDate,
        "max-date": _vm.maxDate,
        "disabled": _vm.disabled,
        "unselectable-dates": _vm.unselectableDates,
        "unselectable-days-of-week": _vm.unselectableDaysOfWeek,
        "selectable-dates": _vm.selectableDates,
        "events": _vm.eventsInThisWeek(week),
        "indicators": _vm.indicators,
        "date-creator": _vm.dateCreator,
        "nearby-month-days": _vm.nearbyMonthDays,
        "nearby-selectable-month-days": _vm.nearbySelectableMonthDays
      },
      on: {
        "select": _vm.updateSelectedDate
      }
    })
  }))])
},staticRenderFns: []}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(146),
  /* template */
  __webpack_require__(147),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BDatepickerMonth',
    props: {
        value: Date,
        monthNames: Array,
        events: Array,
        indicators: String,
        minDate: Date,
        maxDate: Date,
        focused: Object,
        disabled: Boolean,
        dateCreator: Function,
        unselectableDates: Array,
        unselectableDaysOfWeek: Array,
        selectableDates: Array
    },
    computed: {
        hasEvents: function hasEvents() {
            return this.events && this.events.length;
        },


        /*
        * Return array of all events in the specified month
        */
        eventsInThisYear: function eventsInThisYear() {
            if (!this.events) return [];

            var yearEvents = [];

            for (var i = 0; i < this.events.length; i++) {
                var event = this.events[i];

                if (!event.hasOwnProperty('date')) {
                    event = { date: event };
                }
                if (!event.hasOwnProperty('type')) {
                    event.type = 'is-primary';
                }
                if (event.date.getFullYear() === this.focused.year) {
                    yearEvents.push(event);
                }
            }

            return yearEvents;
        },
        monthDates: function monthDates() {
            var year = this.focused.year;
            var months = [];
            for (var i = 0; i < 12; i++) {
                var d = new Date(year, i, 1);
                d.setHours(0, 0, 0, 0);
                months.push(d);
            }
            return months;
        }
    },
    methods: {
        selectableDate: function selectableDate(day) {
            var validity = [];

            if (this.minDate) {
                validity.push(day >= this.minDate);
            }

            if (this.maxDate) {
                validity.push(day <= this.maxDate);
            }

            validity.push(day.getFullYear() === this.focused.year);

            if (this.selectableDates) {
                for (var i = 0; i < this.selectableDates.length; i++) {
                    var enabledDate = this.selectableDates[i];
                    if (day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                        return true;
                    } else {
                        validity.push(false);
                    }
                }
            }

            if (this.unselectableDates) {
                for (var _i = 0; _i < this.unselectableDates.length; _i++) {
                    var disabledDate = this.unselectableDates[_i];
                    validity.push(day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
                }
            }

            if (this.unselectableDaysOfWeek) {
                for (var _i2 = 0; _i2 < this.unselectableDaysOfWeek.length; _i2++) {
                    var dayOfWeek = this.unselectableDaysOfWeek[_i2];
                    validity.push(day.getDay() !== dayOfWeek);
                }
            }

            return validity.indexOf(false) < 0;
        },
        eventsDateMatch: function eventsDateMatch(day) {
            if (!this.eventsInThisYear.length) return false;

            var monthEvents = [];

            for (var i = 0; i < this.eventsInThisYear.length; i++) {
                if (this.eventsInThisYear[i].date.getMonth() === day.getMonth()) {
                    monthEvents.push(this.events[i]);
                }
            }

            if (!monthEvents.length) {
                return false;
            }

            return monthEvents;
        },

        /*
        * Build classObject for cell using validations
        */
        classObject: function classObject(day) {
            function dateMatch(dateOne, dateTwo) {
                // if either date is null or undefined, return false
                if (!dateOne || !dateTwo) {
                    return false;
                }

                return dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
            }

            return {
                'is-selected': dateMatch(day, this.value),
                'is-today': dateMatch(day, this.dateCreator()),
                'is-selectable': this.selectableDate(day) && !this.disabled,
                'is-unselectable': !this.selectableDate(day) || this.disabled
            };
        },

        /*
        * Emit select event with chosen date as payload
        */
        emitChosenDate: function emitChosenDate(day) {
            if (this.disabled) return;

            if (this.selectableDate(day)) {
                this.$emit('input', day);
            }
        }
    }
});

/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "datepicker-table"
  }, [_c('div', {
    staticClass: "datepicker-body",
    class: {
      'has-events': _vm.hasEvents
    }
  }, [_c('div', {
    staticClass: "datepicker-months"
  }, [_vm._l((_vm.monthDates), function(date, index) {
    return [(_vm.selectableDate(date) && !_vm.disabled) ? _c('a', {
      key: index,
      staticClass: "datepicker-cell",
      class: [
        _vm.classObject(date),
        {
          'has-event': _vm.eventsDateMatch(date)
        },
        _vm.indicators
      ],
      attrs: {
        "role": "button",
        "href": "#",
        "disabled": _vm.disabled
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.emitChosenDate(date)
        },
        "keydown": [function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
          $event.preventDefault();
          _vm.emitChosenDate(date)
        }, function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
          $event.preventDefault();
          _vm.emitChosenDate(date)
        }]
      }
    }, [_vm._v("\n                    " + _vm._s(_vm.monthNames[date.getMonth()]) + "\n                    "), (_vm.eventsDateMatch(date)) ? _c('div', {
      staticClass: "events"
    }, _vm._l((_vm.eventsDateMatch(date)), function(event, index) {
      return _c('div', {
        key: index,
        staticClass: "event",
        class: event.type
      })
    })) : _vm._e()]) : _c('div', {
      key: index,
      staticClass: "datepicker-cell",
      class: _vm.classObject(date)
    }, [_vm._v("\n                    " + _vm._s(_vm.monthNames[date.getMonth()]) + "\n                ")])]
  })], 2)])])
},staticRenderFns: []}

/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "datepicker control",
    class: [_vm.size, {
      'is-expanded': _vm.expanded
    }]
  }, [(!_vm.isMobile || _vm.inline) ? _c('b-dropdown', {
    ref: "dropdown",
    attrs: {
      "position": _vm.position,
      "disabled": _vm.disabled,
      "inline": _vm.inline
    }
  }, [(!_vm.inline) ? _c('b-input', _vm._b({
    ref: "input",
    attrs: {
      "slot": "trigger",
      "autocomplete": "off",
      "value": _vm.formatValue(_vm.computedValue),
      "placeholder": _vm.placeholder,
      "size": _vm.size,
      "icon": _vm.icon,
      "icon-pack": _vm.iconPack,
      "rounded": _vm.rounded,
      "loading": _vm.loading,
      "disabled": _vm.disabled,
      "readonly": !_vm.editable,
      "use-html5-validation": _vm.useHtml5Validation
    },
    on: {
      "focus": _vm.handleOnFocus,
      "blur": _vm.onBlur
    },
    nativeOn: {
      "click": function($event) {
        _vm.onInputClick($event)
      },
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.togglePicker(true)
      },
      "change": function($event) {
        _vm.onChange($event.target.value)
      }
    },
    slot: "trigger"
  }, 'b-input', _vm.$attrs, false)) : _vm._e(), _vm._v(" "), _c('b-dropdown-item', {
    attrs: {
      "disabled": _vm.disabled,
      "custom": ""
    }
  }, [_c('header', {
    staticClass: "datepicker-header"
  }, [(_vm.$slots.header !== undefined && _vm.$slots.header.length) ? [_vm._t("header")] : _c('div', {
    staticClass: "pagination field is-centered",
    class: _vm.size
  }, [_c('a', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.showPrev && !_vm.disabled),
      expression: "!showPrev && !disabled"
    }],
    staticClass: "pagination-previous",
    attrs: {
      "role": "button",
      "href": "#",
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.prev($event)
      },
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        $event.preventDefault();
        _vm.prev($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
        $event.preventDefault();
        _vm.prev($event)
      }]
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "chevron-left",
      "pack": _vm.iconPack,
      "both": "",
      "type": "is-primary is-clickable"
    }
  })], 1), _vm._v(" "), _c('a', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.showNext && !_vm.disabled),
      expression: "!showNext && !disabled"
    }],
    staticClass: "pagination-next",
    attrs: {
      "role": "button",
      "href": "#",
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.next($event)
      },
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        $event.preventDefault();
        _vm.next($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
        $event.preventDefault();
        _vm.next($event)
      }]
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "chevron-right",
      "pack": _vm.iconPack,
      "both": "",
      "type": "is-primary is-clickable"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "pagination-list"
  }, [_c('b-field', [(!_vm.isTypeMonth) ? _c('b-select', {
    attrs: {
      "disabled": _vm.disabled,
      "size": _vm.size
    },
    model: {
      value: (_vm.focusedDateData.month),
      callback: function($$v) {
        _vm.$set(_vm.focusedDateData, "month", $$v)
      },
      expression: "focusedDateData.month"
    }
  }, _vm._l((_vm.monthNames), function(month, index) {
    return _c('option', {
      key: month,
      domProps: {
        "value": index
      }
    }, [_vm._v("\n                                    " + _vm._s(month) + "\n                                ")])
  })) : _vm._e(), _vm._v(" "), _c('b-select', {
    attrs: {
      "disabled": _vm.disabled,
      "size": _vm.size
    },
    model: {
      value: (_vm.focusedDateData.year),
      callback: function($$v) {
        _vm.$set(_vm.focusedDateData, "year", $$v)
      },
      expression: "focusedDateData.year"
    }
  }, _vm._l((_vm.listOfYears), function(year) {
    return _c('option', {
      key: year,
      domProps: {
        "value": year
      }
    }, [_vm._v("\n                                    " + _vm._s(year) + "\n                                ")])
  }))], 1)], 1)])], 2), _vm._v(" "), (!_vm.isTypeMonth) ? _c('div', {
    staticClass: "datepicker-content"
  }, [_c('b-datepicker-table', {
    attrs: {
      "day-names": _vm.dayNames,
      "month-names": _vm.monthNames,
      "first-day-of-week": _vm.firstDayOfWeek,
      "min-date": _vm.minDate,
      "max-date": _vm.maxDate,
      "focused": _vm.focusedDateData,
      "disabled": _vm.disabled,
      "unselectable-dates": _vm.unselectableDates,
      "unselectable-days-of-week": _vm.unselectableDaysOfWeek,
      "selectable-dates": _vm.selectableDates,
      "events": _vm.events,
      "indicators": _vm.indicators,
      "date-creator": _vm.dateCreator,
      "type-month": _vm.isTypeMonth,
      "nearby-month-days": _vm.nearbyMonthDays,
      "nearby-selectable-month-days": _vm.nearbySelectableMonthDays
    },
    on: {
      "close": function($event) {
        _vm.togglePicker(false)
      }
    },
    model: {
      value: (_vm.computedValue),
      callback: function($$v) {
        _vm.computedValue = $$v
      },
      expression: "computedValue"
    }
  })], 1) : _c('div', [_c('b-datepicker-month', {
    attrs: {
      "month-names": _vm.monthNames,
      "min-date": _vm.minDate,
      "max-date": _vm.maxDate,
      "focused": _vm.focusedDateData,
      "disabled": _vm.disabled,
      "unselectable-dates": _vm.unselectableDates,
      "unselectable-days-of-week": _vm.unselectableDaysOfWeek,
      "selectable-dates": _vm.selectableDates,
      "events": _vm.events,
      "indicators": _vm.indicators,
      "date-creator": _vm.dateCreator
    },
    on: {
      "close": function($event) {
        _vm.togglePicker(false)
      }
    },
    model: {
      value: (_vm.computedValue),
      callback: function($$v) {
        _vm.computedValue = $$v
      },
      expression: "computedValue"
    }
  })], 1), _vm._v(" "), (_vm.$slots.default !== undefined && _vm.$slots.default.length) ? _c('footer', {
    staticClass: "datepicker-footer"
  }, [_vm._t("default")], 2) : _vm._e()])], 1) : _c('b-input', _vm._b({
    ref: "input",
    attrs: {
      "type": !_vm.isTypeMonth ? 'date' : 'month',
      "autocomplete": "off",
      "value": _vm.formatNative(_vm.computedValue),
      "placeholder": _vm.placeholder,
      "size": _vm.size,
      "icon": _vm.icon,
      "icon-pack": _vm.iconPack,
      "loading": _vm.loading,
      "max": _vm.formatNative(_vm.maxDate),
      "min": _vm.formatNative(_vm.minDate),
      "disabled": _vm.disabled,
      "readonly": false,
      "use-html5-validation": _vm.useHtml5Validation
    },
    on: {
      "focus": _vm.handleOnFocus,
      "blur": _vm.onBlur
    },
    nativeOn: {
      "change": function($event) {
        _vm.onChangeNativePicker($event)
      }
    }
  }, 'b-input', _vm.$attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(150),
  /* template */
  __webpack_require__(153),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_Modal__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_Modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__modal_Modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_helpers__ = __webpack_require__(7);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BDialog',
    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
    extends: __WEBPACK_IMPORTED_MODULE_2__modal_Modal___default.a,
    props: {
        title: String,
        message: String,
        icon: String,
        iconPack: String,
        hasIcon: Boolean,
        type: {
            type: String,
            default: 'is-primary'
        },
        size: String,
        confirmText: {
            type: String,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDialogConfirmText ? __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDialogConfirmText : 'OK';
            }
        },
        cancelText: {
            type: String,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDialogCancelText ? __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDialogCancelText : 'Cancel';
            }
        },
        hasInput: Boolean, // Used internally to know if it's prompt
        inputAttrs: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        onConfirm: {
            type: Function,
            default: function _default() {}
        },
        focusOn: {
            type: String,
            default: 'confirm'
        }
    },
    data: function data() {
        var prompt = this.hasInput ? this.inputAttrs.value || '' : '';

        return {
            prompt: prompt,
            isActive: false,
            validationMessage: ''
        };
    },

    computed: {
        /**
         * Icon name (MDI) based on the type.
         */
        iconByType: function iconByType() {
            switch (this.type) {
                case 'is-info':
                    return 'information';
                case 'is-success':
                    return 'check-circle';
                case 'is-warning':
                    return 'alert';
                case 'is-danger':
                    return 'alert-circle';
                default:
                    return null;
            }
        },
        showCancel: function showCancel() {
            return this.cancelOptions.indexOf('button') >= 0;
        }
    },
    methods: {
        /**
         * If it's a prompt Dialog, validate the input.
         * Call the onConfirm prop (function) and close the Dialog.
         */
        confirm: function confirm() {
            var _this = this;

            if (this.$refs.input !== undefined) {
                if (!this.$refs.input.checkValidity()) {
                    this.validationMessage = this.$refs.input.validationMessage;
                    this.$nextTick(function () {
                        return _this.$refs.input.select();
                    });
                    return;
                }
            }

            this.onConfirm(this.prompt);
            this.close();
        },


        /**
         * Close the Dialog.
         */
        close: function close() {
            var _this2 = this;

            this.isActive = false;
            // Timeout for the animation complete before destroying
            setTimeout(function () {
                _this2.$destroy();
                Object(__WEBPACK_IMPORTED_MODULE_4__utils_helpers__["d" /* removeElement */])(_this2.$el);
            }, 150);
        }
    },
    beforeMount: function beforeMount() {
        var _this3 = this;

        // Insert the Dialog component in body tag
        this.$nextTick(function () {
            document.body.appendChild(_this3.$el);
        });
    },
    mounted: function mounted() {
        var _this4 = this;

        this.isActive = true;

        if (typeof this.inputAttrs.required === 'undefined') {
            this.$set(this.inputAttrs, 'required', true);
        }

        this.$nextTick(function () {
            // Handle which element receives focus
            if (_this4.hasInput) {
                _this4.$refs.input.focus();
            } else if (_this4.focusOn === 'cancel' && _this4.showCancel) {
                _this4.$refs.cancelButton.focus();
            } else {
                _this4.$refs.confirmButton.focus();
            }
        });
    }
});

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helpers__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_config__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BModal',
    props: {
        active: Boolean,
        component: [Object, Function],
        content: String,
        programmatic: Boolean,
        props: Object,
        events: Object,
        width: {
            type: [String, Number],
            default: 960
        },
        hasModalCard: Boolean,
        animation: {
            type: String,
            default: 'zoom-out'
        },
        canCancel: {
            type: [Array, Boolean],
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_1__utils_config__["a" /* default */].defaultModalCanCancel;
            }
        },
        onCancel: {
            type: Function,
            default: function _default() {}
        },
        scroll: {
            type: String,
            default: function _default() {
                return __WEBPACK_IMPORTED_MODULE_1__utils_config__["a" /* default */].defaultModalScroll ? __WEBPACK_IMPORTED_MODULE_1__utils_config__["a" /* default */].defaultModalScroll : 'clip';
            },
            validator: function validator(value) {
                return ['clip', 'keep'].indexOf(value) >= 0;
            }
        },
        fullScreen: Boolean
    },
    data: function data() {
        return {
            isActive: this.active || false,
            savedScrollTop: null,
            newWidth: typeof this.width === 'number' ? this.width + 'px' : this.width
        };
    },

    computed: {
        cancelOptions: function cancelOptions() {
            return typeof this.canCancel === 'boolean' ? this.canCancel ? __WEBPACK_IMPORTED_MODULE_1__utils_config__["a" /* default */].defaultModalCanCancel : [] : this.canCancel;
        },
        showX: function showX() {
            return this.cancelOptions.indexOf('x') >= 0;
        },
        customStlye: function customStlye() {
            if (!this.fullScreen) {
                return { maxWidth: this.newWidth };
            }
            return null;
        }
    },
    watch: {
        active: function active(value) {
            this.isActive = value;
        },
        isActive: function isActive() {
            this.handleScroll();
        }
    },
    methods: {
        handleScroll: function handleScroll() {
            if (typeof window === 'undefined') return;

            if (this.scroll === 'clip') {
                if (this.isActive) {
                    document.documentElement.classList.add('is-clipped');
                } else {
                    document.documentElement.classList.remove('is-clipped');
                }
                return;
            }

            this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;

            if (this.isActive) {
                document.body.classList.add('is-noscroll');
            } else {
                document.body.classList.remove('is-noscroll');
            }

            if (this.isActive) {
                document.body.style.top = '-' + this.savedScrollTop + 'px';
                return;
            }

            document.documentElement.scrollTop = this.savedScrollTop;
            document.body.style.top = null;
            this.savedScrollTop = null;
        },


        /**
         * Close the Modal if canCancel and call the onCancel prop (function).
         */
        cancel: function cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return;

            this.onCancel.apply(null, arguments);
            this.close();
        },


        /**
         * Call the onCancel prop (function).
         * Emit events, and destroy modal if it's programmatic.
         */
        close: function close() {
            var _this = this;

            this.$emit('close');
            this.$emit('update:active', false);

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                this.isActive = false;
                setTimeout(function () {
                    _this.$destroy();
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["d" /* removeElement */])(_this.$el);
                }, 150);
            }
        },


        /**
         * Keypress event that is bound to the document.
         */
        keyPress: function keyPress(event) {
            // Esc key
            if (this.isActive && event.keyCode === 27) this.cancel('escape');
        }
    },
    created: function created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
        }
    },
    beforeMount: function beforeMount() {
        // Insert the Modal component in body tag
        // only if it's programmatic
        this.programmatic && document.body.appendChild(this.$el);
    },
    mounted: function mounted() {
        if (this.programmatic) this.isActive = true;else if (this.isActive) this.handleScroll();
    },
    beforeDestroy: function beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
            // reset scroll
            document.documentElement.classList.remove('is-clipped');
            var savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
            document.body.classList.remove('is-noscroll');
            document.documentElement.scrollTop = savedScrollTop;
            document.body.style.top = null;
        }
    }
});

/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": _vm.animation
    }
  }, [(_vm.isActive) ? _c('div', {
    staticClass: "modal is-active",
    class: {
      'is-full-screen': _vm.fullScreen
    }
  }, [_c('div', {
    staticClass: "modal-background",
    on: {
      "click": function($event) {
        _vm.cancel('outside')
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "animation-content",
    class: {
      'modal-content': !_vm.hasModalCard
    },
    style: (_vm.customStlye)
  }, [(_vm.component) ? _c(_vm.component, _vm._g(_vm._b({
    tag: "component",
    on: {
      "close": _vm.close
    }
  }, 'component', _vm.props, false), _vm.events)) : (_vm.content) ? _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.content)
    }
  }) : _vm._t("default")], 2), _vm._v(" "), (_vm.showX) ? _c('button', {
    staticClass: "modal-close is-large",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.cancel('x')
      }
    }
  }) : _vm._e()]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": _vm.animation
    }
  }, [(_vm.isActive) ? _c('div', {
    staticClass: "dialog modal is-active",
    class: _vm.size
  }, [_c('div', {
    staticClass: "modal-background",
    on: {
      "click": function($event) {
        _vm.cancel('outside')
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "modal-card animation-content"
  }, [(_vm.title) ? _c('header', {
    staticClass: "modal-card-head"
  }, [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._v(_vm._s(_vm.title))])]) : _vm._e(), _vm._v(" "), _c('section', {
    staticClass: "modal-card-body",
    class: {
      'is-titleless': !_vm.title, 'is-flex': _vm.hasIcon
    }
  }, [_c('div', {
    staticClass: "media"
  }, [(_vm.hasIcon) ? _c('div', {
    staticClass: "media-left"
  }, [_c('b-icon', {
    attrs: {
      "icon": _vm.icon ? _vm.icon : _vm.iconByType,
      "pack": _vm.iconPack,
      "type": _vm.type,
      "both": !_vm.icon,
      "size": "is-large"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [_c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.message)
    }
  }), _vm._v(" "), (_vm.hasInput) ? _c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', _vm._b({
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.prompt),
      expression: "prompt"
    }],
    ref: "input",
    staticClass: "input",
    class: {
      'is-danger': _vm.validationMessage
    },
    domProps: {
      "value": (_vm.prompt)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.confirm($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.prompt = $event.target.value
      }
    }
  }, 'input', _vm.inputAttrs, false))]), _vm._v(" "), _c('p', {
    staticClass: "help is-danger"
  }, [_vm._v(_vm._s(_vm.validationMessage))])]) : _vm._e()])])]), _vm._v(" "), _c('footer', {
    staticClass: "modal-card-foot"
  }, [(_vm.showCancel) ? _c('button', {
    ref: "cancelButton",
    staticClass: "button",
    on: {
      "click": function($event) {
        _vm.cancel('button')
      }
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.cancelText) + "\n                ")]) : _vm._e(), _vm._v(" "), _c('button', {
    ref: "confirmButton",
    staticClass: "button",
    class: _vm.type,
    on: {
      "click": _vm.confirm
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.confirmText) + "\n                ")])])])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(155),
  /* template */
  __webpack_require__(156),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helpers__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ssr__ = __webpack_require__(64);
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BLoading',
    props: {
        active: Boolean,
        programmatic: Boolean,
        container: [Object, Function, __WEBPACK_IMPORTED_MODULE_1__utils_ssr__["b" /* HTMLElement */]],
        isFullPage: {
            type: Boolean,
            default: true
        },
        animation: {
            type: String,
            default: 'fade'
        },
        canCancel: {
            type: Boolean,
            default: false
        },
        onCancel: {
            type: Function,
            default: function _default() {}
        }
    },
    data: function data() {
        return {
            isActive: this.active || false
        };
    },

    watch: {
        active: function active(value) {
            this.isActive = value;
        }
    },
    methods: {
        /**
         * Close the Modal if canCancel.
         */
        cancel: function cancel() {
            if (!this.canCancel || !this.isActive) return;

            this.close();
        },

        /**
         * Emit events, and destroy modal if it's programmatic.
         */
        close: function close() {
            var _this = this;

            this.onCancel.apply(null, arguments);
            this.$emit('close');
            this.$emit('update:active', false);

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                this.isActive = false;
                setTimeout(function () {
                    _this.$destroy();
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["d" /* removeElement */])(_this.$el);
                }, 150);
            }
        },

        /**
         * Keypress event that is bound to the document.
         */
        keyPress: function keyPress(event) {
            // Esc key
            if (event.keyCode === 27) this.cancel();
        }
    },
    created: function created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
        }
    },
    beforeMount: function beforeMount() {
        // Insert the Loading component in body tag
        // only if it's programmatic
        if (this.programmatic) {
            if (!this.container) {
                document.body.appendChild(this.$el);
            } else {
                this.isFullPage = false;
                this.container.appendChild(this.$el);
            }
        }
    },
    mounted: function mounted() {
        if (this.programmatic) this.isActive = true;
    },
    beforeDestroy: function beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
        }
    }
});

/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": _vm.animation
    }
  }, [(_vm.isActive) ? _c('div', {
    staticClass: "loading-overlay is-active",
    class: {
      'is-full-page': _vm.isFullPage
    }
  }, [_c('div', {
    staticClass: "loading-background",
    on: {
      "click": _vm.cancel
    }
  }), _vm._v(" "), _vm._t("default", [_c('div', {
    staticClass: "loading-icon"
  })])], 2) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(158),
  /* template */
  __webpack_require__(159),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__ = __webpack_require__(65);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BMessage',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__["a" /* default */]],
    props: {
        ariaCloseLabel: String
    },
    data: function data() {
        return {
            newIconSize: this.iconSize || this.size || 'is-large'
        };
    }
});

/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [(_vm.isActive) ? _c('article', {
    staticClass: "message",
    class: [_vm.type, _vm.size]
  }, [(_vm.title) ? _c('header', {
    staticClass: "message-header"
  }, [_c('p', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.closable) ? _c('button', {
    staticClass: "delete",
    attrs: {
      "type": "button",
      "aria-label": _vm.ariaCloseLabel
    },
    on: {
      "click": _vm.close
    }
  }) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('section', {
    staticClass: "message-body"
  }, [_c('div', {
    staticClass: "media"
  }, [(_vm.icon && _vm.hasIcon) ? _c('div', {
    staticClass: "media-left"
  }, [_c('b-icon', {
    class: _vm.type,
    attrs: {
      "icon": _vm.icon,
      "pack": _vm.iconPack,
      "both": "",
      "size": _vm.newIconSize
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [_vm._t("default")], 2)])])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(161),
  /* template */
  __webpack_require__(162),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__ = __webpack_require__(65);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BNotification',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__["a" /* default */]],
    props: {
        position: String,
        ariaCloseLabel: String
    }
});

/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('article', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isActive),
      expression: "isActive"
    }],
    staticClass: "notification",
    class: [_vm.type, _vm.position]
  }, [(_vm.closable) ? _c('button', {
    staticClass: "delete",
    attrs: {
      "type": "button",
      "aria-label": _vm.ariaCloseLabel
    },
    on: {
      "click": _vm.close
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "media"
  }, [(_vm.icon && _vm.hasIcon) ? _c('div', {
    staticClass: "media-left"
  }, [_c('b-icon', {
    attrs: {
      "icon": _vm.icon,
      "pack": _vm.iconPack,
      "both": "",
      "size": "is-large",
      "aria-hidden": ""
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [(_vm.message) ? _c('p', {
    staticClass: "text",
    domProps: {
      "innerHTML": _vm._s(_vm.message)
    }
  }) : _vm._t("default")], 2)])])])
},staticRenderFns: []}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(164),
  /* template */
  __webpack_require__(165),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__ = __webpack_require__(45);
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BNotificationNotice',
    mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__["a" /* default */]],
    props: {
        indefinite: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            newDuration: this.duration || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultNotificationDuration
        };
    }
});

/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('b-notification', _vm._b({
    on: {
      "close": _vm.close
    }
  }, 'b-notification', _vm.$options.propsData, false))
},staticRenderFns: []}

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(167),
  /* template */
  __webpack_require__(168),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_Input__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__input_Input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__ = __webpack_require__(10);


var _components;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BNumberinput',
    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_2__input_Input___default.a), _components),
    mixins: [__WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__["a" /* default */]],
    inheritAttrs: false,
    props: {
        value: Number,
        min: [Number, String],
        max: [Number, String],
        step: [Number, String],
        disabled: Boolean,
        type: {
            type: String,
            default: 'is-primary'
        },
        editable: {
            type: Boolean,
            default: true
        },
        controlsRounded: {
            type: Boolean,
            default: false
        },
        controlsPosition: String
    },
    data: function data() {
        return {
            newValue: !isNaN(this.value) ? this.value : parseFloat(this.min) || 0,
            newStep: this.step || 1,
            _elementRef: 'input'
        };
    },

    computed: {
        computedValue: {
            get: function get() {
                return this.newValue;
            },
            set: function set(value) {
                var newValue = value;
                if (value === '') {
                    newValue = parseFloat(this.min) || 0;
                }
                this.newValue = newValue;
                this.$emit('input', newValue);
                !this.isValid && this.$refs.input.checkHtml5Validity();
            }
        },
        fieldClasses: function fieldClasses() {
            return [{ 'has-addons': this.controlsPosition === 'compact' }, { 'is-grouped': this.controlsPosition !== 'compact' }];
        },
        buttonClasses: function buttonClasses() {
            return [this.type, this.size, { 'is-rounded': this.controlsRounded }];
        },
        minNumber: function minNumber() {
            return typeof this.min === 'string' ? parseFloat(this.min) : this.min;
        },
        maxNumber: function maxNumber() {
            return typeof this.max === 'string' ? parseFloat(this.max) : this.max;
        },
        stepNumber: function stepNumber() {
            return typeof this.newStep === 'string' ? parseFloat(this.newStep) : this.newStep;
        },
        disabledMin: function disabledMin() {
            return this.computedValue - this.stepNumber < this.minNumber;
        },
        disabledMax: function disabledMax() {
            return this.computedValue + this.stepNumber > this.maxNumber;
        },
        stepDecimals: function stepDecimals() {
            var step = this.stepNumber.toString();
            var index = step.indexOf('.');
            if (index >= 0) {
                return step.substring(index + 1).length;
            }
            return 0;
        }
    },
    watch: {
        /**
         * When v-model is changed:
         *   1. Set internal value.
         */
        value: function value(_value) {
            this.newValue = _value;
        }
    },
    methods: {
        decrement: function decrement() {
            if (typeof this.minNumber === 'undefined' || this.computedValue - this.stepNumber >= this.minNumber) {
                var value = this.computedValue - this.stepNumber;
                this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
            }
        },
        increment: function increment() {
            if (typeof this.maxNumber === 'undefined' || this.computedValue + this.stepNumber <= this.maxNumber) {
                var value = this.computedValue + this.stepNumber;
                this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
            }
        },
        onControlClick: function onControlClick(event, inc) {
            // IE 11 -> filter click event
            if (event.detail !== 0 || event.type === 'click') return;
            if (inc) this.increment();else this.decrement();
        },
        onStartLongPress: function onStartLongPress(event, inc) {
            var _this = this;

            if (event.button !== 0 && event.type !== 'touchstart') return;
            this._$intervalTime = new Date();
            clearInterval(this._$intervalRef);
            this._$intervalRef = setInterval(function () {
                if (inc) _this.increment();else _this.decrement();
            }, 250);
        },
        onStopLongPress: function onStopLongPress(inc) {
            if (!this._$intervalRef) return;
            var d = new Date();
            if (d - this._$intervalTime < 250) {
                if (inc) this.increment();else this.decrement();
            }
            clearInterval(this._$intervalRef);
            this._$intervalRef = null;
        }
    }
});

/***/ }),
/* 168 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-numberinput field",
    class: _vm.fieldClasses
  }, [_c('p', {
    staticClass: "control",
    on: {
      "mouseup": function($event) {
        _vm.onStopLongPress(false)
      },
      "mouseleave": function($event) {
        _vm.onStopLongPress(false)
      },
      "touchend": function($event) {
        _vm.onStopLongPress(false)
      },
      "touchcancel": function($event) {
        _vm.onStopLongPress(false)
      }
    }
  }, [_c('button', {
    staticClass: "button",
    class: _vm.buttonClasses,
    attrs: {
      "type": "button",
      "disabled": _vm.disabled || _vm.disabledMin
    },
    on: {
      "mousedown": function($event) {
        _vm.onStartLongPress($event, false)
      },
      "touchstart": function($event) {
        $event.preventDefault();
        _vm.onStartLongPress($event, false)
      },
      "click": function($event) {
        _vm.onControlClick($event, false)
      }
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "minus",
      "pack": _vm.iconPack,
      "size": _vm.iconSize
    }
  })], 1)]), _vm._v(" "), _c('b-input', _vm._b({
    ref: "input",
    attrs: {
      "type": "number",
      "step": _vm.newStep,
      "max": _vm.max,
      "min": _vm.min,
      "size": _vm.size,
      "disabled": _vm.disabled,
      "readonly": !_vm.editable,
      "loading": _vm.loading,
      "rounded": _vm.rounded,
      "icon": _vm.icon,
      "icon-pack": _vm.iconPack,
      "autocomplete": _vm.autocomplete,
      "expanded": _vm.expanded,
      "use-html5-validation": _vm.useHtml5Validation
    },
    on: {
      "focus": function($event) {
        _vm.$emit('focus', $event)
      },
      "blur": function($event) {
        _vm.$emit('blur', $event)
      }
    },
    model: {
      value: (_vm.computedValue),
      callback: function($$v) {
        _vm.computedValue = _vm._n($$v)
      },
      expression: "computedValue"
    }
  }, 'b-input', _vm.$attrs, false)), _vm._v(" "), _c('p', {
    staticClass: "control",
    on: {
      "mouseup": function($event) {
        _vm.onStopLongPress(true)
      },
      "mouseleave": function($event) {
        _vm.onStopLongPress(true)
      },
      "touchend": function($event) {
        _vm.onStopLongPress(true)
      },
      "touchcancel": function($event) {
        _vm.onStopLongPress(true)
      }
    }
  }, [_c('button', {
    staticClass: "button",
    class: _vm.buttonClasses,
    attrs: {
      "type": "button",
      "disabled": _vm.disabled || _vm.disabledMax
    },
    on: {
      "mousedown": function($event) {
        _vm.onStartLongPress($event, true)
      },
      "touchstart": function($event) {
        $event.preventDefault();
        _vm.onStartLongPress($event, true)
      },
      "click": function($event) {
        _vm.onControlClick($event, true)
      }
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "plus",
      "pack": _vm.iconPack,
      "size": _vm.iconSize
    }
  })], 1)])], 1)
},staticRenderFns: []}

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BPagination',
    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
    props: {
        total: [Number, String],
        perPage: {
            type: [Number, String],
            default: 20
        },
        current: {
            type: [Number, String],
            default: 1
        },
        size: String,
        simple: Boolean,
        rounded: Boolean,
        order: String,
        iconPack: String,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String
    },
    computed: {
        rootClasses: function rootClasses() {
            return [this.order, this.size, {
                'is-simple': this.simple,
                'is-rounded': this.rounded
            }];
        },


        /**
         * Total page size (count).
         */
        pageCount: function pageCount() {
            return Math.ceil(this.total / this.perPage);
        },


        /**
         * First item of the page (count).
         */
        firstItem: function firstItem() {
            var firstItem = this.current * this.perPage - this.perPage + 1;
            return firstItem >= 0 ? firstItem : 0;
        },


        /**
         * Check if previous button is available.
         */
        hasPrev: function hasPrev() {
            return this.current > 1;
        },


        /**
         * Check if first page button should be visible.
         */
        hasFirst: function hasFirst() {
            return this.current >= 3;
        },


        /**
         * Check if first ellipsis should be visible.
         */
        hasFirstEllipsis: function hasFirstEllipsis() {
            return this.current >= 4;
        },


        /**
         * Check if last page button should be visible.
         */
        hasLast: function hasLast() {
            return this.current <= this.pageCount - 2;
        },


        /**
         * Check if last ellipsis should be visible.
         */
        hasLastEllipsis: function hasLastEllipsis() {
            return this.current < this.pageCount - 2 && this.current <= this.pageCount - 3;
        },


        /**
         * Check if next button is available.
         */
        hasNext: function hasNext() {
            return this.current < this.pageCount;
        },


        /**
         * Get near pages, 1 before and 1 after the current.
         * Also add the click event to the array.
         */
        pagesInRange: function pagesInRange() {
            var _this = this;

            if (this.simple) return;

            var left = Math.max(1, this.current - 1);
            var right = Math.min(this.current + 1, this.pageCount);

            var pages = [];

            var _loop = function _loop(i) {
                pages.push({
                    number: i,
                    isCurrent: _this.current === i,
                    click: function click(event) {
                        if (_this.current === i) return;
                        _this.$emit('change', i);
                        _this.$emit('update:current', i);

                        // Set focus on element to keep tab order
                        _this.$nextTick(function () {
                            return event.target.focus();
                        });
                    }
                });
            };

            for (var i = left; i <= right; i++) {
                _loop(i);
            }
            return pages;
        }
    },
    watch: {
        /**
         * If current page is trying to be greater than page count, set to last.
         */
        pageCount: function pageCount(value) {
            if (this.current > value) this.last();
        }
    },
    methods: {
        /**
         * Previous button click listener.
         */
        prev: function prev() {
            if (!this.hasPrev) return;
            this.$emit('change', this.current - 1);
            this.$emit('update:current', this.current - 1);
        },


        /**
         * First button click listener.
         */
        first: function first() {
            this.$emit('change', 1);
            this.$emit('update:current', 1);
        },


        /**
         * Last button click listener.
         */
        last: function last() {
            this.$emit('change', this.pageCount);
            this.$emit('update:current', this.pageCount);
        },


        /**
         * Next button click listener.
         */
        next: function next() {
            if (!this.hasNext) return;
            this.$emit('change', this.current + 1);
            this.$emit('update:current', this.current + 1);
        },


        /**
         * Get text for aria-label according to page number.
         */
        getAriaPageLabel: function getAriaPageLabel(pageNumber, isCurrent) {
            if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
                return this.ariaPageLabel + ' ' + pageNumber + '.';
            } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
                return this.ariaCurrentLabel + ', ' + this.ariaPageLabel + ' ' + pageNumber + '.';
            }
            return null;
        }
    }
});

/***/ }),
/* 170 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', {
    staticClass: "pagination",
    class: _vm.rootClasses
  }, [_c('a', {
    staticClass: "pagination-previous",
    attrs: {
      "role": "button",
      "href": "#",
      "disabled": !_vm.hasPrev,
      "aria-label": _vm.ariaPreviousLabel
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.prev($event)
      }
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "chevron-left",
      "pack": _vm.iconPack,
      "both": "",
      "aria-hidden": "true"
    }
  })], 1), _vm._v(" "), _c('a', {
    staticClass: "pagination-next",
    attrs: {
      "role": "button",
      "href": "#",
      "disabled": !_vm.hasNext,
      "aria-label": _vm.ariaNextLabel
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.next($event)
      }
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "chevron-right",
      "pack": _vm.iconPack,
      "both": "",
      "aria-hidden": "true"
    }
  })], 1), _vm._v(" "), (!_vm.simple) ? _c('ul', {
    staticClass: "pagination-list"
  }, [(_vm.hasFirst) ? _c('li', [_c('a', {
    staticClass: "pagination-link",
    attrs: {
      "role": "button",
      "href": "#",
      "aria-label": _vm.getAriaPageLabel(1, false)
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.first($event)
      }
    }
  }, [_vm._v("\n                1\n            ")])]) : _vm._e(), _vm._v(" "), (_vm.hasFirstEllipsis) ? _c('li', [_c('span', {
    staticClass: "pagination-ellipsis"
  }, [_vm._v("…")])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.pagesInRange), function(page) {
    return _c('li', {
      key: page.number
    }, [_c('a', {
      staticClass: "pagination-link",
      class: {
        'is-current': page.isCurrent
      },
      attrs: {
        "role": "button",
        "href": "#",
        "aria-label": _vm.getAriaPageLabel(page.number, page.isCurrent),
        "aria-current": page.isCurrent
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          page.click($event)
        }
      }
    }, [_vm._v("\n                " + _vm._s(page.number) + "\n            ")])])
  }), _vm._v(" "), (_vm.hasLastEllipsis) ? _c('li', [_c('span', {
    staticClass: "pagination-ellipsis"
  }, [_vm._v("…")])]) : _vm._e(), _vm._v(" "), (_vm.hasLast) ? _c('li', [_c('a', {
    staticClass: "pagination-link",
    attrs: {
      "role": "button",
      "href": "#",
      "aria-label": _vm.getAriaPageLabel(_vm.pageCount, false)
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.last($event)
      }
    }
  }, [_vm._v("\n                " + _vm._s(_vm.pageCount) + "\n            ")])]) : _vm._e()], 2) : _vm._e(), _vm._v(" "), (_vm.simple) ? _c('small', {
    staticClass: "info"
  }, [(_vm.perPage == 1) ? [_vm._v("\n            " + _vm._s(_vm.firstItem) + " / " + _vm._s(_vm.total) + "\n        ")] : [_vm._v("\n            " + _vm._s(_vm.firstItem) + "-" + _vm._s(Math.min(_vm.current * _vm.perPage, _vm.total)) + " / " + _vm._s(_vm.total) + "\n        ")]], 2) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(172),
  /* template */
  __webpack_require__(173),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BRadio',
    props: {
        value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
        nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
        type: String,
        disabled: Boolean,
        required: Boolean,
        name: String,
        size: String
    },
    data: function data() {
        return {
            newValue: this.value
        };
    },

    computed: {
        computedValue: {
            get: function get() {
                return this.newValue;
            },
            set: function set(value) {
                this.newValue = value;
                this.$emit('input', value);
            }
        }
    },
    watch: {
        /**
         * When v-model change, set internal value.
         */
        value: function value(_value) {
            this.newValue = _value;
        }
    }
});

/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    ref: "label",
    staticClass: "b-radio radio",
    class: [_vm.size, {
      'is-disabled': _vm.disabled
    }],
    attrs: {
      "disabled": _vm.disabled,
      "tabindex": _vm.disabled ? false : 0
    },
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
        $event.preventDefault();
        _vm.$refs.label.click()
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.computedValue),
      expression: "computedValue"
    }],
    attrs: {
      "tabindex": "-1",
      "type": "radio",
      "disabled": _vm.disabled,
      "required": _vm.required,
      "name": _vm.name
    },
    domProps: {
      "value": _vm.nativeValue,
      "checked": _vm._q(_vm.computedValue, _vm.nativeValue)
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
      },
      "change": function($event) {
        _vm.computedValue = _vm.nativeValue
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "check",
    class: _vm.type
  }), _vm._v(" "), _c('span', {
    staticClass: "control-label"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(175),
  /* template */
  __webpack_require__(176),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BRadioButton',
    props: {
        value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
        nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
        type: {
            type: String,
            default: 'is-primary'
        },
        disabled: Boolean,
        required: Boolean,
        name: String,
        size: String
    },
    data: function data() {
        return {
            newValue: this.value
        };
    },

    computed: {
        computedValue: {
            get: function get() {
                return this.newValue;
            },
            set: function set(value) {
                this.newValue = value;
                this.$emit('input', value);
            }
        }
    },
    watch: {
        /**
         * When v-model change, set internal value.
         */
        value: function value(_value) {
            this.newValue = _value;
        }
    }
});

/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "control"
  }, [_c('label', {
    ref: "label",
    staticClass: "b-radio radio button",
    class: [_vm.newValue === _vm.nativeValue ? _vm.type : null, _vm.size],
    attrs: {
      "disabled": _vm.disabled,
      "tabindex": _vm.disabled ? false : 0
    },
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
        $event.preventDefault();
        _vm.$refs.label.click()
      }
    }
  }, [_vm._t("default"), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.computedValue),
      expression: "computedValue"
    }],
    attrs: {
      "tabindex": "-1",
      "type": "radio",
      "disabled": _vm.disabled,
      "required": _vm.required,
      "name": _vm.name
    },
    domProps: {
      "value": _vm.nativeValue,
      "checked": _vm._q(_vm.computedValue, _vm.nativeValue)
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
      },
      "change": function($event) {
        _vm.computedValue = _vm.nativeValue
      }
    }
  })], 2)])
},staticRenderFns: []}

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(178),
  /* template */
  __webpack_require__(179),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__ = __webpack_require__(45);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BSnackbar',
    mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__["a" /* default */]],
    props: {
        actionText: {
            type: String,
            default: 'OK'
        },
        onAction: {
            type: Function,
            default: function _default() {}
        },
        indefinite: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            newDuration: this.duration || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultSnackbarDuration
        };
    },

    methods: {
        /**
         * Click listener.
         * Call action prop before closing (from Mixin).
         */
        action: function action() {
            this.onAction();
            this.close();
        }
    }
});

/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "enter-active-class": _vm.transition.enter,
      "leave-active-class": _vm.transition.leave
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isActive),
      expression: "isActive"
    }],
    staticClass: "snackbar",
    class: [_vm.type, _vm.position]
  }, [_c('div', {
    staticClass: "text",
    domProps: {
      "innerHTML": _vm._s(_vm.message)
    }
  }), _vm._v(" "), (_vm.actionText) ? _c('div', {
    staticClass: "action",
    class: _vm.type,
    on: {
      "click": _vm.action
    }
  }, [_c('button', {
    staticClass: "button"
  }, [_vm._v(_vm._s(_vm.actionText))])]) : _vm._e()])])
},staticRenderFns: []}

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(181),
  /* template */
  __webpack_require__(182),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__ = __webpack_require__(67);


var _components;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BSteps',
    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__["a" /* default */]), _components),
    props: {
        value: Number,
        type: String | Object,
        size: String,
        animated: {
            type: Boolean,
            default: true
        },
        destroyOnHide: {
            type: Boolean,
            default: false
        },
        iconPack: String,
        hasNavigation: {
            type: Boolean,
            default: true
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String
    },
    data: function data() {
        return {
            activeStep: this.value || 0,
            stepItems: [],
            contentHeight: 0,
            isTransitioning: false,
            _isSteps: true // Used internally by StepItem
        };
    },

    computed: {
        mainClasses: function mainClasses() {
            return [this.type, this.size];
        },
        reversedStepItems: function reversedStepItems() {
            return this.stepItems.slice().reverse();
        },


        /**
        * Check the first visible step index.
        */
        firstVisibleStepIndex: function firstVisibleStepIndex() {
            return this.stepItems.findIndex(function (step, idx) {
                return step.visible;
            });
        },


        /**
        * Check if previous button is available.
        */
        hasPrev: function hasPrev() {
            return this.firstVisibleStepIndex >= 0 && this.activeStep > this.firstVisibleStepIndex;
        },


        /**
        * Check the last visible step index.
        */
        lastVisibleStepIndex: function lastVisibleStepIndex() {
            var idx = this.reversedStepItems.findIndex(function (step, idx) {
                return step.visible;
            });
            if (idx >= 0) {
                return this.stepItems.length - 1 - idx;
            }
            return idx;
        },


        /**
        * Check if next button is available.
        */
        hasNext: function hasNext() {
            return this.lastVisibleStepIndex >= 0 && this.activeStep < this.lastVisibleStepIndex;
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active step.
         */
        value: function value(_value) {
            this.changeStep(_value);
        },


        /**
         * When step-items are updated, set active one.
         */
        stepItems: function stepItems() {
            if (this.activeStep < this.stepItems.length) {
                this.stepItems[this.activeStep].isActive = true;
            }
        }
    },
    methods: {
        /**
         * Change the active step and emit change event.
         */
        changeStep: function changeStep(newIndex) {
            if (this.activeStep === newIndex) return;

            if (this.activeStep < this.stepItems.length) {
                this.stepItems[this.activeStep].deactivate(this.activeStep, newIndex);
            }
            this.stepItems[newIndex].activate(this.activeStep, newIndex);
            this.activeStep = newIndex;
            this.$emit('change', newIndex);
        },


        /**
        * Return if the step should be clickable or not.
        */
        isItemClickable: function isItemClickable(stepItem) {
            if (stepItem.clickable === undefined) {
                return stepItem.completed;
            }
            return stepItem.clickable;
        },


        /**
         * Step click listener, emit input event and change active step.
         */
        stepClick: function stepClick(value) {
            this.$emit('input', value);
            this.changeStep(value);
        },


        /**
        * Previous button click listener.
        */
        prev: function prev() {
            var _this = this;

            if (!this.hasPrev) return;
            var prevItemIdx = this.reversedStepItems.findIndex(function (step, idx) {
                return _this.stepItems.length - 1 - idx < _this.activeStep && step.visible;
            });
            if (prevItemIdx >= 0) {
                prevItemIdx = this.stepItems.length - 1 - prevItemIdx;
            }
            this.changeStep(prevItemIdx);
        },


        /**
        * Previous button click listener.
        */
        next: function next() {
            var _this2 = this;

            if (!this.hasNext) return;
            var nextItemIdx = this.stepItems.findIndex(function (step, idx) {
                return idx > _this2.activeStep && step.visible;
            });
            this.changeStep(nextItemIdx);
        }
    },
    mounted: function mounted() {
        if (this.activeStep < this.stepItems.length) {
            this.stepItems[this.activeStep].isActive = true;
        }
    }
});

/***/ }),
/* 182 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-steps"
  }, [_c('nav', {
    staticClass: "steps",
    class: _vm.mainClasses
  }, [_c('ul', {
    staticClass: "step-items"
  }, _vm._l((_vm.stepItems), function(stepItem, index) {
    return _c('li', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (stepItem.visible),
        expression: "stepItem.visible"
      }],
      key: index,
      staticClass: "step-item",
      class: [stepItem.type || _vm.type, {
        'is-active': _vm.activeStep === index,
        'is-completed': stepItem.completed || _vm.activeStep > index
      }]
    }, [_c('a', {
      staticClass: "step-link",
      class: {
        'is-clickable': _vm.isItemClickable(stepItem)
      },
      on: {
        "click": function($event) {
          stepItem.clickable && _vm.stepClick(index)
        }
      }
    }, [_c('div', {
      staticClass: "step-marker"
    }, [(stepItem.icon) ? _c('b-icon', {
      attrs: {
        "icon": stepItem.icon,
        "pack": stepItem.iconPack,
        "size": _vm.size
      }
    }) : _vm._e()], 1), _vm._v(" "), _c('div', {
      staticClass: "step-details"
    }, [_c('span', {
      staticClass: "step-title"
    }, [_vm._v(_vm._s(stepItem.label))])])])])
  }))]), _vm._v(" "), _c('section', {
    staticClass: "step-content",
    class: {
      'is-transitioning': _vm.isTransitioning
    }
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.hasNavigation) ? _c('nav', {
    staticClass: "step-navigation"
  }, [_c('a', {
    staticClass: "pagination-previous",
    attrs: {
      "role": "button",
      "href": "#",
      "disabled": !_vm.hasPrev,
      "aria-label": _vm.ariaPreviousLabel
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.prev($event)
      }
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "chevron-left",
      "pack": _vm.iconPack,
      "both": "",
      "aria-hidden": "true"
    }
  })], 1), _vm._v(" "), _c('a', {
    staticClass: "pagination-next",
    attrs: {
      "role": "button",
      "href": "#",
      "disabled": !_vm.hasNext,
      "aria-label": _vm.ariaNextLabel
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.next($event)
      }
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "chevron-right",
      "pack": _vm.iconPack,
      "both": "",
      "aria-hidden": "true"
    }
  })], 1)]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(184),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BStepItem',
    props: {
        label: String,
        type: String | Object,
        icon: String,
        iconPack: String,
        clickable: Boolean,
        completed: {
            type: Boolean,
            default: false
        },
        visible: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            isActive: false,
            transitionName: null
        };
    },

    methods: {
        /**
         * Activate step, alter animation name based on the index.
         */
        activate: function activate(oldIndex, index) {
            this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
            this.isActive = true;
        },


        /**
         * Deactivate step, alter animation name based on the index.
         */
        deactivate: function deactivate(oldIndex, index) {
            this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
            this.isActive = false;
        }
    },
    created: function created() {
        if (!this.$parent.$data._isSteps) {
            this.$destroy();
            throw new Error('You should wrap bStepItem on a bSteps');
        }
        this.$parent.stepItems.push(this);
    },
    beforeDestroy: function beforeDestroy() {
        var index = this.$parent.stepItems.indexOf(this);
        if (index >= 0) {
            this.$parent.stepItems.splice(index, 1);
        }
    },
    render: function render(createElement) {
        var _this = this;

        // if destroy apply v-if
        if (this.$parent.destroyOnHide) {
            if (!this.isActive || !this.visible) {
                return;
            }
        }
        var vnode = createElement('div', {
            directives: [{
                name: 'show',
                value: this.isActive && this.visible
            }],
            attrs: { 'class': 'step-item' }
        }, this.$slots.default);
        // check animated prop
        if (this.$parent.animated) {
            return createElement('transition', {
                props: {
                    'name': this.transitionName
                },
                on: {
                    'before-enter': function beforeEnter() {
                        _this.$parent.isTransitioning = true;
                    },
                    'after-enter': function afterEnter() {
                        _this.$parent.isTransitioning = false;
                    }
                }
            }, [vnode]);
        }
        return vnode;
    }
});

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(186),
  /* template */
  __webpack_require__(187),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BSwitch',
    props: {
        value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
        nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
        disabled: Boolean,
        type: String,
        name: String,
        required: Boolean,
        size: String,
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
            default: false
        }
    },
    data: function data() {
        return {
            newValue: this.value,
            isMouseDown: false
        };
    },

    computed: {
        computedValue: {
            get: function get() {
                return this.newValue;
            },
            set: function set(value) {
                this.newValue = value;
                this.$emit('input', value);
            }
        }
    },
    watch: {
        /**
         * When v-model change, set internal value.
         */
        value: function value(_value) {
            this.newValue = _value;
        }
    }
});

/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    ref: "label",
    staticClass: "switch",
    class: [_vm.size, {
      'is-disabled': _vm.disabled
    }],
    attrs: {
      "disabled": _vm.disabled
    },
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        $event.preventDefault();
        _vm.$refs.label.click()
      },
      "mousedown": function($event) {
        _vm.isMouseDown = true
      },
      "mouseup": function($event) {
        _vm.isMouseDown = false
      },
      "mouseout": function($event) {
        _vm.isMouseDown = false
      },
      "blur": function($event) {
        _vm.isMouseDown = false
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.computedValue),
      expression: "computedValue"
    }],
    attrs: {
      "type": "checkbox",
      "disabled": _vm.disabled,
      "name": _vm.name,
      "required": _vm.required,
      "true-value": _vm.trueValue,
      "false-value": _vm.falseValue
    },
    domProps: {
      "value": _vm.nativeValue,
      "checked": Array.isArray(_vm.computedValue) ? _vm._i(_vm.computedValue, _vm.nativeValue) > -1 : _vm._q(_vm.computedValue, _vm.trueValue)
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
      },
      "change": function($event) {
        var $$a = _vm.computedValue,
          $$el = $event.target,
          $$c = $$el.checked ? (_vm.trueValue) : (_vm.falseValue);
        if (Array.isArray($$a)) {
          var $$v = _vm.nativeValue,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.computedValue = $$a.concat([$$v]))
          } else {
            $$i > -1 && (_vm.computedValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.computedValue = $$c
        }
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "check",
    class: [{
      'is-elastic': _vm.isMouseDown && !_vm.disabled
    }, _vm.type]
  }), _vm._v(" "), _c('span', {
    staticClass: "control-label"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(203),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_helpers__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__icon_Icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__pagination_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TableMobileSort__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TableMobileSort___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__TableMobileSort__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__TableColumn__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__TableColumn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__TableColumn__);



var _components;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BTable',
    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox___default.a.name, __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_4__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination___default.a.name, __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6__TableMobileSort___default.a.name, __WEBPACK_IMPORTED_MODULE_6__TableMobileSort___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7__TableColumn___default.a.name, __WEBPACK_IMPORTED_MODULE_7__TableColumn___default.a), _components),
    props: {
        data: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        columns: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        bordered: Boolean,
        striped: Boolean,
        narrowed: Boolean,
        hoverable: Boolean,
        loading: Boolean,
        detailed: Boolean,
        checkable: Boolean,
        headerCheckable: {
            type: Boolean,
            default: true
        },
        selected: Object,
        focusable: Boolean,
        customIsChecked: Function,
        isRowCheckable: {
            type: Function,
            default: function _default() {
                return true;
            }
        },
        checkedRows: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        mobileCards: {
            type: Boolean,
            default: true
        },
        defaultSort: [String, Array],
        defaultSortDirection: {
            type: String,
            default: 'asc'
        },
        paginated: Boolean,
        currentPage: {
            type: Number,
            default: 1
        },
        perPage: {
            type: [Number, String],
            default: 20
        },
        showDetailIcon: {
            type: Boolean,
            default: true
        },
        paginationSimple: Boolean,
        paginationSize: String,
        backendSorting: Boolean,
        rowClass: {
            type: Function,
            default: function _default() {
                return '';
            }
        },
        openedDetailed: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        hasDetailedVisible: {
            type: Function,
            default: function _default() {
                return true;
            }
        },
        detailKey: {
            type: String,
            default: ''
        },
        customDetailRow: {
            type: Boolean,
            default: false
        },
        backendPagination: Boolean,
        total: {
            type: [Number, String],
            default: 0
        },
        iconPack: String,
        mobileSortPlaceholder: String,
        customRowKey: String,
        draggable: {
            type: Boolean,
            defualt: false
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String
    },
    data: function data() {
        return {
            getValueByPath: __WEBPACK_IMPORTED_MODULE_2__utils_helpers__["a" /* getValueByPath */],
            newColumns: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.columns)),
            visibleDetailRows: this.openedDetailed,
            newData: this.data,
            newDataTotal: this.backendPagination ? this.total : this.data.length,
            newCheckedRows: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.checkedRows)),
            newCurrentPage: this.currentPage,
            currentSortColumn: {},
            isAsc: true,
            firstTimeSort: true, // Used by first time initSort
            _isTable: true // Used by TableColumn
        };
    },

    computed: {
        /**
         * return if detailed row tabled
         * will be with chevron column & icon or not
         */
        showDetailRowIcon: function showDetailRowIcon() {
            return this.detailed && this.showDetailIcon;
        },
        tableClasses: function tableClasses() {
            return {
                'is-bordered': this.bordered,
                'is-striped': this.striped,
                'is-narrow': this.narrowed,
                'has-mobile-cards': this.mobileCards,
                'is-hoverable': (this.hoverable || this.focusable) && this.visibleData.length
            };
        },


        /**
         * Splitted data based on the pagination.
         */
        visibleData: function visibleData() {
            if (!this.paginated) return this.newData;

            var currentPage = this.newCurrentPage;
            var perPage = this.perPage;

            if (this.newData.length <= perPage) {
                return this.newData;
            } else {
                var start = (currentPage - 1) * perPage;
                var end = parseInt(start, 10) + parseInt(perPage, 10);
                return this.newData.slice(start, end);
            }
        },
        visibleColumns: function visibleColumns() {
            if (!this.newColumns) return this.newColumns;
            return this.newColumns.filter(function (column) {
                return column.visible || column.visible === undefined;
            });
        },


        /**
         * Check if all rows in the page are checked.
         */
        isAllChecked: function isAllChecked() {
            var _this = this;

            var validVisibleData = this.visibleData.filter(function (row) {
                return _this.isRowCheckable(row);
            });
            if (validVisibleData.length === 0) return false;
            var isAllChecked = validVisibleData.some(function (currentVisibleRow) {
                return Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["b" /* indexOf */])(_this.newCheckedRows, currentVisibleRow, _this.customIsChecked) < 0;
            });
            return !isAllChecked;
        },


        /**
         * Check if all rows in the page are checkable.
         */
        isAllUncheckable: function isAllUncheckable() {
            var _this2 = this;

            var validVisibleData = this.visibleData.filter(function (row) {
                return _this2.isRowCheckable(row);
            });
            return validVisibleData.length === 0;
        },


        /**
         * Check if has any sortable column.
         */
        hasSortablenewColumns: function hasSortablenewColumns() {
            return this.newColumns.some(function (column) {
                return column.sortable;
            });
        },


        /**
         * Return total column count based if it's checkable or expanded
         */
        columnCount: function columnCount() {
            var count = this.newColumns.length;
            count += this.checkable ? 1 : 0;
            count += this.detailed ? 1 : 0;

            return count;
        }
    },
    watch: {
        /**
         * When data prop change:
         *   1. Update internal value.
         *   2. Reset newColumns (thead), in case it's on a v-for loop.
         *   3. Sort again if it's not backend-sort.
         *   4. Set new total if it's not backend-paginated.
         */
        data: function data(value) {
            var _this3 = this;

            // Save newColumns before resetting
            var newColumns = this.newColumns;

            this.newColumns = [];
            this.newData = value;

            // Prevent table from being headless, data could change and created hook
            // on column might not trigger
            this.$nextTick(function () {
                if (!_this3.newColumns.length) _this3.newColumns = newColumns;
            });

            if (!this.backendSorting) {
                this.sort(this.currentSortColumn, true);
            }
            if (!this.backendPagination) {
                this.newDataTotal = value.length;
            }
        },


        /**
         * When Pagination total change, update internal total
         * only if it's backend-paginated.
         */
        total: function total(newTotal) {
            if (!this.backendPagination) return;

            this.newDataTotal = newTotal;
        },


        /**
         * When checkedRows prop change, update internal value without
         * mutating original data.
         */
        checkedRows: function checkedRows(rows) {
            this.newCheckedRows = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(rows));
        },
        columns: function columns(value) {
            this.newColumns = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(value));
        },
        newColumns: function newColumns(value) {
            this.checkSort();
        },


        /**
        * When the user wants to control the detailed rows via props.
        * Or wants to open the details of certain row with the router for example.
        */
        openedDetailed: function openedDetailed(expandedRows) {
            this.visibleDetailRows = expandedRows;
        },
        currentPage: function currentPage(newVal) {
            this.newCurrentPage = newVal;
        }
    },
    methods: {
        /**
         * Sort an array by key without mutating original data.
         * Call the user sort function if it was passed.
         */
        sortBy: function sortBy(array, key, fn, isAsc) {
            var sorted = [];
            // Sorting without mutating original data
            if (fn && typeof fn === 'function') {
                sorted = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(array)).sort(function (a, b) {
                    return fn(a, b, isAsc);
                });
            } else {
                sorted = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(array)).sort(function (a, b) {
                    // Get nested values from objects
                    var newA = Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["a" /* getValueByPath */])(a, key);
                    var newB = Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["a" /* getValueByPath */])(b, key);

                    // sort boolean type
                    if (typeof newA === 'boolean' && typeof newB === 'boolean') {
                        return isAsc ? newA - newB : newB - newA;
                    }

                    if (!newA && newA !== 0) return 1;
                    if (!newB && newB !== 0) return -1;
                    if (newA === newB) return 0;

                    newA = typeof newA === 'string' ? newA.toUpperCase() : newA;
                    newB = typeof newB === 'string' ? newB.toUpperCase() : newB;

                    return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
                });
            }

            return sorted;
        },


        /**
         * Sort the column.
         * Toggle current direction on column if it's sortable
         * and not just updating the prop.
         */
        sort: function sort(column) {
            var updatingData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!column || !column.sortable) return;

            if (!updatingData) {
                this.isAsc = column === this.currentSortColumn ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== 'desc';
            }
            if (!this.firstTimeSort) {
                this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc');
            }
            if (!this.backendSorting) {
                this.newData = this.sortBy(this.newData, column.field, column.customSort, this.isAsc);
            }
            this.currentSortColumn = column;
        },


        /**
         * Check if the row is checked (is added to the array).
         */
        isRowChecked: function isRowChecked(row) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["b" /* indexOf */])(this.newCheckedRows, row, this.customIsChecked) >= 0;
        },


        /**
         * Remove a checked row from the array.
         */
        removeCheckedRow: function removeCheckedRow(row) {
            var index = Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["b" /* indexOf */])(this.newCheckedRows, row, this.customIsChecked);
            if (index >= 0) {
                this.newCheckedRows.splice(index, 1);
            }
        },


        /**
         * Header checkbox click listener.
         * Add or remove all rows in current page.
         */
        checkAll: function checkAll() {
            var _this4 = this;

            var isAllChecked = this.isAllChecked;
            this.visibleData.forEach(function (currentRow) {
                _this4.removeCheckedRow(currentRow);
                if (!isAllChecked) {
                    if (_this4.isRowCheckable(currentRow)) {
                        _this4.newCheckedRows.push(currentRow);
                    }
                }
            });

            this.$emit('check', this.newCheckedRows);
            this.$emit('check-all', this.newCheckedRows);

            // Emit checked rows to update user variable
            this.$emit('update:checkedRows', this.newCheckedRows);
        },


        /**
         * Row checkbox click listener.
         * Add or remove a single row.
         */
        checkRow: function checkRow(row) {
            if (!this.isRowChecked(row)) {
                this.newCheckedRows.push(row);
            } else {
                this.removeCheckedRow(row);
            }

            this.$emit('check', this.newCheckedRows, row);

            // Emit checked rows to update user variable
            this.$emit('update:checkedRows', this.newCheckedRows);
        },


        /**
         * Row click listener.
         * Emit all necessary events.
         */
        selectRow: function selectRow(row, index) {
            this.$emit('click', row);

            if (this.selected === row) return;

            // Emit new and old row
            this.$emit('select', row, this.selected);

            // Emit new row to update user variable
            this.$emit('update:selected', row);
        },


        /**
         * Paginator change listener.
         */
        pageChanged: function pageChanged(page) {
            this.newCurrentPage = page > 0 ? page : 1;
            this.$emit('page-change', this.newCurrentPage);
            this.$emit('update:currentPage', this.newCurrentPage);
        },


        /**
         * Toggle to show/hide details slot
         */
        toggleDetails: function toggleDetails(obj) {
            var found = this.isVisibleDetailRow(obj);

            if (found) {
                this.closeDetailRow(obj);
                this.$emit('details-close', obj);
            } else {
                this.openDetailRow(obj);
                this.$emit('details-open', obj);
            }

            // Syncs the detailed rows with the parent component
            this.$emit('update:openedDetailed', this.visibleDetailRows);
        },
        openDetailRow: function openDetailRow(obj) {
            var index = this.handleDetailKey(obj);
            this.visibleDetailRows.push(index);
        },
        closeDetailRow: function closeDetailRow(obj) {
            var index = this.handleDetailKey(obj);
            var i = this.visibleDetailRows.indexOf(index);
            this.visibleDetailRows.splice(i, 1);
        },
        isVisibleDetailRow: function isVisibleDetailRow(obj) {
            var index = this.handleDetailKey(obj);
            var result = this.visibleDetailRows.indexOf(index) >= 0;
            return result;
        },
        isActiveDetailRow: function isActiveDetailRow(row) {
            return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row);
        },
        isActiveCustomDetailRow: function isActiveCustomDetailRow(row) {
            return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row);
        },


        /**
        * When the detailKey is defined we use the object[detailKey] as index.
        * If not, use the object reference by default.
        */
        handleDetailKey: function handleDetailKey(index) {
            var key = this.detailKey;
            return !key.length ? index : index[key];
        },
        checkPredefinedDetailedRows: function checkPredefinedDetailedRows() {
            var defaultExpandedRowsDefined = this.openedDetailed.length > 0;
            if (defaultExpandedRowsDefined && !this.detailKey.length) {
                throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"');
            }
        },


        /**
         * Call initSort only first time (For example async data).
         */
        checkSort: function checkSort() {
            if (this.newColumns.length && this.firstTimeSort) {
                this.initSort();
                this.firstTimeSort = false;
            } else if (this.newColumns.length) {
                if (this.currentSortColumn.field) {
                    for (var i = 0; i < this.newColumns.length; i++) {
                        if (this.newColumns[i].field === this.currentSortColumn.field) {
                            this.currentSortColumn = this.newColumns[i];
                            break;
                        }
                    }
                }
            }
        },


        /**
         * Check if footer slot has custom content.
         */
        hasCustomFooterSlot: function hasCustomFooterSlot() {
            if (this.$slots.footer.length > 1) return true;

            var tag = this.$slots.footer[0].tag;
            if (tag !== 'th' && tag !== 'td') return false;

            return true;
        },


        /**
         * Check if bottom-left slot exists.
         */
        hasBottomLeftSlot: function hasBottomLeftSlot() {
            return typeof this.$slots['bottom-left'] !== 'undefined';
        },


        /**
         * Table arrow keys listener, change selection.
         */
        pressedArrow: function pressedArrow(pos) {
            if (!this.visibleData.length) return;

            var index = this.visibleData.indexOf(this.selected) + pos;

            // Prevent from going up from first and down from last
            index = index < 0 ? 0 : index > this.visibleData.length - 1 ? this.visibleData.length - 1 : index;

            this.selectRow(this.visibleData[index]);
        },


        /**
         * Focus table element if has selected prop.
         */
        focus: function focus() {
            if (!this.focusable) return;

            this.$el.querySelector('table').focus();
        },


        /**
         * Initial sorted column based on the default-sort prop.
         */
        initSort: function initSort() {
            var _this5 = this;

            if (!this.defaultSort) return;

            var sortField = '';
            var sortDirection = this.defaultSortDirection;

            if (Array.isArray(this.defaultSort)) {
                sortField = this.defaultSort[0];
                if (this.defaultSort[1]) {
                    sortDirection = this.defaultSort[1];
                }
            } else {
                sortField = this.defaultSort;
            }

            this.newColumns.forEach(function (column) {
                if (column.field === sortField) {
                    _this5.isAsc = sortDirection.toLowerCase() !== 'desc';
                    _this5.sort(column, true);
                }
            });
        },

        /**
         * Emits drag start event
         */
        handleDragStart: function handleDragStart(event, row, index) {
            this.$emit('dragstart', { event: event, row: row, index: index });
        },

        /**
         * Emits drop event
         */
        handleDrop: function handleDrop(event, row, index) {
            this.$emit('drop', { event: event, row: row, index: index });
        },

        /**
         * Emits drag over event
         */
        handleDragOver: function handleDragOver(event, row, index) {
            this.$emit('dragover', { event: event, row: row, index: index });
        },

        /**
         * Emits drag leave event
         */
        handleDragLeave: function handleDragLeave(event, row, index) {
            this.$emit('dragleave', { event: event, row: row, index: index });
        }
    },

    mounted: function mounted() {
        this.checkPredefinedDetailedRows();
        this.checkSort();
    }
});

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(191);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(192), __esModule: true };

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(193);
module.exports = __webpack_require__(6).Array.from;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(46);
var $export = __webpack_require__(19);
var toObject = __webpack_require__(40);
var call = __webpack_require__(194);
var isArrayIter = __webpack_require__(195);
var toLength = __webpack_require__(51);
var createProperty = __webpack_require__(196);
var getIterFn = __webpack_require__(60);

$export($export.S + $export.F * !__webpack_require__(197)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(15);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(23);
var ITERATOR = __webpack_require__(4)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(9);
var createDesc = __webpack_require__(22);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(4)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(199),
  /* template */
  __webpack_require__(200),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__select_Select__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__select_Select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__select_Select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__icon_Icon__);


var _components;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BTableMobileSort',
    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1__select_Select___default.a.name, __WEBPACK_IMPORTED_MODULE_1__select_Select___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a), _components),
    props: {
        currentSortColumn: Object,
        isAsc: Boolean,
        columns: Array,
        placeholder: String
    },
    data: function data() {
        return {
            mobileSort: this.currentSortColumn
        };
    },

    computed: {
        showPlaceholder: function showPlaceholder() {
            var _this = this;

            return !this.columns || !this.columns.some(function (column) {
                return column === _this.mobileSort;
            });
        }
    },
    watch: {
        mobileSort: function mobileSort(column) {
            if (this.currentSortColumn === column) return;

            this.$emit('sort', column);
        },
        currentSortColumn: function currentSortColumn(column) {
            this.mobileSort = column;
        }
    },
    methods: {
        sort: function sort() {
            this.$emit('sort', this.mobileSort);
        }
    }
});

/***/ }),
/* 200 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "field table-mobile-sort"
  }, [_c('div', {
    staticClass: "field has-addons"
  }, [_c('b-select', {
    attrs: {
      "expanded": ""
    },
    model: {
      value: (_vm.mobileSort),
      callback: function($$v) {
        _vm.mobileSort = $$v
      },
      expression: "mobileSort"
    }
  }, [(_vm.placeholder) ? [_c('option', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showPlaceholder),
      expression: "showPlaceholder"
    }],
    attrs: {
      "selected": "",
      "disabled": "",
      "hidden": ""
    },
    domProps: {
      "value": {}
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.placeholder) + "\n                ")])] : _vm._e(), _vm._v(" "), _vm._l((_vm.columns), function(column, index) {
    return (column.sortable) ? _c('option', {
      key: index,
      domProps: {
        "value": column
      }
    }, [_vm._v("\n                " + _vm._s(column.label) + "\n            ")]) : _vm._e()
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-primary",
    on: {
      "click": _vm.sort
    }
  }, [_c('b-icon', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentSortColumn === _vm.mobileSort),
      expression: "currentSortColumn === mobileSort"
    }],
    class: {
      'is-desc': !_vm.isAsc
    },
    attrs: {
      "icon": "arrow-up",
      "size": "is-small",
      "both": ""
    }
  })], 1)])], 1)])
},staticRenderFns: []}

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BTableColumn',
    props: {
        label: String,
        customKey: [String, Number],
        field: String,
        meta: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
        width: [Number, String],
        numeric: Boolean,
        centered: Boolean,
        sortable: Boolean,
        visible: {
            type: Boolean,
            default: true
        },
        customSort: Function,
        internal: Boolean // Used internally by Table
    },
    data: function data() {
        return {
            newKey: this.customKey || this.label
        };
    },

    computed: {
        rootClasses: function rootClasses() {
            return {
                'has-text-right': this.numeric && !this.centered,
                'has-text-centered': this.centered
            };
        }
    },
    methods: {
        addRefToTable: function addRefToTable() {
            var _this = this;

            if (!this.$parent.$data._isTable) {
                this.$destroy();
                throw new Error('You should wrap bTableColumn on a bTable');
            }

            if (this.internal) return;

            // Since we're using scoped prop the columns gonna be multiplied,
            // this finds when to stop based on the newKey property.
            var repeated = this.$parent.newColumns.some(function (column) {
                return column.newKey === _this.newKey;
            });
            !repeated && this.$parent.newColumns.push(this);
        }
    },
    beforeMount: function beforeMount() {
        this.addRefToTable();
    },
    beforeUpdate: function beforeUpdate() {
        this.addRefToTable();
    },
    beforeDestroy: function beforeDestroy() {
        var index = this.$parent.newColumns.map(function (column) {
            return column.newKey;
        }).indexOf(this.newKey);
        if (index >= 0) {
            this.$parent.newColumns.splice(index, 1);
        }
    }
});

/***/ }),
/* 202 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.visible) ? _c('td', {
    class: _vm.rootClasses,
    attrs: {
      "data-label": _vm.label
    }
  }, [_c('span', [_vm._t("default")], 2)]) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 203 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-table",
    class: {
      'is-loading': _vm.loading
    }
  }, [(_vm.mobileCards && _vm.hasSortablenewColumns) ? _c('b-table-mobile-sort', {
    attrs: {
      "current-sort-column": _vm.currentSortColumn,
      "is-asc": _vm.isAsc,
      "columns": _vm.newColumns,
      "placeholder": _vm.mobileSortPlaceholder
    },
    on: {
      "sort": function (column) { return _vm.sort(column); }
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "table-wrapper"
  }, [_c('table', {
    staticClass: "table",
    class: _vm.tableClasses,
    attrs: {
      "tabindex": !_vm.focusable ? false : 0
    },
    on: {
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) { return null; }
        if ($event.target !== $event.currentTarget) { return null; }
        $event.preventDefault();
        _vm.pressedArrow(-1)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) { return null; }
        if ($event.target !== $event.currentTarget) { return null; }
        $event.preventDefault();
        _vm.pressedArrow(1)
      }]
    }
  }, [(_vm.newColumns.length) ? _c('thead', [_c('tr', [(_vm.showDetailRowIcon) ? _c('th', {
    attrs: {
      "width": "40px"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.checkable) ? _c('th', {
    staticClass: "checkbox-cell"
  }, [(_vm.headerCheckable) ? [_c('b-checkbox', {
    attrs: {
      "value": _vm.isAllChecked,
      "disabled": _vm.isAllUncheckable
    },
    nativeOn: {
      "change": function($event) {
        _vm.checkAll($event)
      }
    }
  })] : _vm._e()], 2) : _vm._e(), _vm._v(" "), _vm._l((_vm.visibleColumns), function(column, index) {
    return _c('th', {
      key: index,
      class: {
        'is-current-sort': _vm.currentSortColumn === column,
          'is-sortable': column.sortable
      },
      style: ({
        width: column.width === undefined ? null : column.width + 'px'
      }),
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.sort(column)
        }
      }
    }, [_c('div', {
      staticClass: "th-wrap",
      class: {
        'is-numeric': column.numeric,
          'is-centered': column.centered
      }
    }, [(_vm.$scopedSlots.header) ? _vm._t("header", null, {
      column: column,
      index: index
    }) : [_vm._v(_vm._s(column.label))], _vm._v(" "), _c('b-icon', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.currentSortColumn === column),
        expression: "currentSortColumn === column"
      }],
      class: {
        'is-desc': !_vm.isAsc
      },
      attrs: {
        "icon": "arrow-up",
        "pack": _vm.iconPack,
        "both": "",
        "size": "is-small"
      }
    })], 2)])
  })], 2)]) : _vm._e(), _vm._v(" "), (_vm.visibleData.length) ? _c('tbody', [_vm._l((_vm.visibleData), function(row, index) {
    return [_c('tr', {
      key: _vm.customRowKey ? row[_vm.customRowKey] : index,
      class: [_vm.rowClass(row, index), {
        'is-selected': row === _vm.selected,
        'is-checked': _vm.isRowChecked(row),
      }],
      attrs: {
        "draggable": _vm.draggable
      },
      on: {
        "click": function($event) {
          _vm.selectRow(row)
        },
        "dblclick": function($event) {
          _vm.$emit('dblclick', row)
        },
        "contextmenu": function($event) {
          _vm.$emit('contextmenu', row, $event)
        },
        "dragstart": function($event) {
          _vm.handleDragStart($event, row, index)
        },
        "drop": function($event) {
          _vm.handleDrop($event, row, index)
        },
        "dragover": function($event) {
          _vm.handleDragOver($event, row, index)
        },
        "dragleave": function($event) {
          _vm.handleDragLeave($event, row, index)
        }
      }
    }, [(_vm.showDetailRowIcon) ? _c('td', {
      staticClass: "chevron-cell"
    }, [(_vm.hasDetailedVisible(row)) ? _c('a', {
      attrs: {
        "role": "button"
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.toggleDetails(row)
        }
      }
    }, [_c('b-icon', {
      class: {
        'is-expanded': _vm.isVisibleDetailRow(row)
      },
      attrs: {
        "icon": "chevron-right",
        "pack": _vm.iconPack,
        "both": ""
      }
    })], 1) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.checkable) ? _c('td', {
      staticClass: "checkbox-cell"
    }, [_c('b-checkbox', {
      attrs: {
        "disabled": !_vm.isRowCheckable(row),
        "value": _vm.isRowChecked(row)
      },
      nativeOn: {
        "change": function($event) {
          _vm.checkRow(row)
        },
        "click": function($event) {
          $event.stopPropagation();
        }
      }
    })], 1) : _vm._e(), _vm._v(" "), (_vm.$scopedSlots.default) ? _vm._t("default", null, {
      row: row,
      index: index
    }) : _vm._l((_vm.newColumns), function(column) {
      return _c('BTableColumn', _vm._b({
        key: column.field,
        attrs: {
          "internal": ""
        }
      }, 'BTableColumn', column, false), [(column.renderHtml) ? _c('span', {
        domProps: {
          "innerHTML": _vm._s(_vm.getValueByPath(row, column.field))
        }
      }) : [_vm._v("\n                                    " + _vm._s(_vm.getValueByPath(row, column.field)) + "\n                                ")]], 2)
    })], 2), _vm._v(" "), (_vm.isActiveDetailRow(row)) ? _c('tr', {
      staticClass: "detail"
    }, [_c('td', {
      attrs: {
        "colspan": _vm.columnCount
      }
    }, [_c('div', {
      staticClass: "detail-container"
    }, [_vm._t("detail", null, {
      row: row,
      index: index
    })], 2)])]) : _vm._e(), _vm._v(" "), (_vm.isActiveCustomDetailRow(row)) ? _vm._t("detail", null, {
      row: row,
      index: index
    }) : _vm._e()]
  })], 2) : _c('tbody', [_c('tr', {
    staticClass: "is-empty"
  }, [_c('td', {
    attrs: {
      "colspan": _vm.columnCount
    }
  }, [_vm._t("empty")], 2)])]), _vm._v(" "), (_vm.$slots.footer !== undefined) ? _c('tfoot', [_c('tr', {
    staticClass: "table-footer"
  }, [(_vm.hasCustomFooterSlot()) ? _vm._t("footer") : _c('th', {
    attrs: {
      "colspan": _vm.columnCount
    }
  }, [_vm._t("footer")], 2)], 2)]) : _vm._e()])]), _vm._v(" "), ((_vm.checkable && _vm.hasBottomLeftSlot()) || _vm.paginated) ? _c('div', {
    staticClass: "level"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_vm._t("bottom-left")], 2), _vm._v(" "), _c('div', {
    staticClass: "level-right"
  }, [(_vm.paginated) ? _c('div', {
    staticClass: "level-item"
  }, [_c('b-pagination', {
    attrs: {
      "icon-pack": _vm.iconPack,
      "total": _vm.newDataTotal,
      "per-page": _vm.perPage,
      "simple": _vm.paginationSimple,
      "size": _vm.paginationSize,
      "current": _vm.newCurrentPage,
      "aria-next-label": _vm.ariaNextLabel,
      "aria-previous-label": _vm.ariaPreviousLabel,
      "aria-page-label": _vm.ariaPageLabel,
      "aria-current-label": _vm.ariaCurrentLabel
    },
    on: {
      "change": _vm.pageChanged
    }
  })], 1) : _vm._e()])]) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(205),
  /* template */
  __webpack_require__(206),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__ = __webpack_require__(67);


var _components;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BTabs',
    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__["a" /* default */]), _components),
    props: {
        value: Number,
        expanded: Boolean,
        type: String,
        size: String,
        position: String,
        animated: {
            type: Boolean,
            default: true
        },
        destroyOnHide: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            activeTab: this.value || 0,
            tabItems: [],
            contentHeight: 0,
            isTransitioning: false,
            _isTabs: true // Used internally by TabItem
        };
    },

    computed: {
        navClasses: function navClasses() {
            return [this.type, this.size, this.position, {
                'is-fullwidth': this.expanded,
                'is-toggle-rounded is-toggle': this.type === 'is-toggle-rounded'
            }];
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active tab.
         */
        value: function value(_value) {
            this.changeTab(_value);
        },


        /**
         * When tab-items are updated, set active one.
         */
        tabItems: function tabItems() {
            if (this.activeTab < this.tabItems.length) {
                this.tabItems[this.activeTab].isActive = true;
            }
        }
    },
    methods: {
        /**
         * Change the active tab and emit change event.
         */
        changeTab: function changeTab(newIndex) {
            if (this.activeTab === newIndex) return;

            if (this.activeTab < this.tabItems.length) {
                this.tabItems[this.activeTab].deactivate(this.activeTab, newIndex);
            }
            this.tabItems[newIndex].activate(this.activeTab, newIndex);
            this.activeTab = newIndex;
            this.$emit('change', newIndex);
        },


        /**
         * Tab click listener, emit input event and change active tab.
         */
        tabClick: function tabClick(value) {
            this.$emit('input', value);
            this.changeTab(value);
        }
    },
    mounted: function mounted() {
        if (this.activeTab < this.tabItems.length) {
            this.tabItems[this.activeTab].isActive = true;
        }
    }
});

/***/ }),
/* 206 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-tabs",
    class: {
      'is-fullwidth': _vm.expanded
    }
  }, [_c('nav', {
    staticClass: "tabs",
    class: _vm.navClasses
  }, [_c('ul', _vm._l((_vm.tabItems), function(tabItem, index) {
    return _c('li', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (tabItem.visible),
        expression: "tabItem.visible"
      }],
      key: index,
      class: {
        'is-active': _vm.activeTab === index, 'is-disabled': tabItem.disabled
      }
    }, [_c('a', {
      on: {
        "click": function($event) {
          _vm.tabClick(index)
        }
      }
    }, [(tabItem.$slots.header) ? [_c('b-slot-component', {
      attrs: {
        "component": tabItem,
        "name": "header",
        "tag": "span"
      }
    })] : [(tabItem.icon) ? _c('b-icon', {
      attrs: {
        "icon": tabItem.icon,
        "pack": tabItem.iconPack,
        "size": _vm.size
      }
    }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(tabItem.label))])]], 2)])
  }))]), _vm._v(" "), _c('section', {
    staticClass: "tab-content",
    class: {
      'is-transitioning': _vm.isTransitioning
    }
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(208),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BTabItem',
    props: {
        label: String,
        icon: String,
        iconPack: String,
        disabled: Boolean,
        visible: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            isActive: false,
            transitionName: null
        };
    },

    methods: {
        /**
         * Activate tab, alter animation name based on the index.
         */
        activate: function activate(oldIndex, index) {
            this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
            this.isActive = true;
        },


        /**
         * Deactivate tab, alter animation name based on the index.
         */
        deactivate: function deactivate(oldIndex, index) {
            this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
            this.isActive = false;
        }
    },
    created: function created() {
        if (!this.$parent.$data._isTabs) {
            this.$destroy();
            throw new Error('You should wrap bTabItem on a bTabs');
        }
        this.$parent.tabItems.push(this);
    },
    beforeDestroy: function beforeDestroy() {
        var index = this.$parent.tabItems.indexOf(this);
        if (index >= 0) {
            this.$parent.tabItems.splice(index, 1);
        }
    },
    render: function render(createElement) {
        var _this = this;

        // if destroy apply v-if
        if (this.$parent.destroyOnHide) {
            if (!this.isActive || !this.visible) {
                return;
            }
        }
        var vnode = createElement('div', {
            directives: [{
                name: 'show',
                value: this.isActive && this.visible
            }],
            attrs: { 'class': 'tab-item' }
        }, this.$slots.default);
        // check animated prop
        if (this.$parent.animated) {
            return createElement('transition', {
                props: {
                    'name': this.transitionName
                },
                on: {
                    'before-enter': function beforeEnter() {
                        _this.$parent.isTransitioning = true;
                    },
                    'after-enter': function afterEnter() {
                        _this.$parent.isTransitioning = false;
                    }
                }
            }, [vnode]);
        }
        return vnode;
    }
});

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BTag',
    props: {
        attached: Boolean,
        closable: Boolean,
        type: String,
        size: String,
        rounded: Boolean,
        disabled: Boolean,
        ellipsis: Boolean,
        tabstop: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        /**
         * Emit close event when delete button is clicked
         * or delete key is pressed.
         */
        close: function close() {
            if (this.disabled) return;

            this.$emit('close');
        }
    }
});

/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.attached && _vm.closable) ? _c('div', {
    staticClass: "tags has-addons"
  }, [_c('span', {
    staticClass: "tag",
    class: [_vm.type, _vm.size, {
      'is-rounded': _vm.rounded
    }]
  }, [_c('span', {
    class: {
      'has-ellipsis': _vm.ellipsis
    }
  }, [_vm._t("default")], 2)]), _vm._v(" "), _c('a', {
    staticClass: "tag is-delete",
    class: [_vm.size, {
      'is-rounded': _vm.rounded
    }],
    attrs: {
      "role": "button",
      "tabindex": _vm.tabstop ? 0 : false,
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        _vm.close()
      },
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46], $event.key)) { return null; }
        $event.preventDefault();
        _vm.close()
      }
    }
  })]) : _c('span', {
    staticClass: "tag",
    class: [_vm.type, _vm.size, {
      'is-rounded': _vm.rounded
    }]
  }, [_c('span', {
    class: {
      'has-ellipsis': _vm.ellipsis
    }
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.closable) ? _c('a', {
    staticClass: "delete is-small",
    attrs: {
      "role": "button",
      "disabled": _vm.disabled,
      "tabindex": _vm.tabstop ? 0 : false
    },
    on: {
      "click": function($event) {
        _vm.close()
      },
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46], $event.key)) { return null; }
        $event.preventDefault();
        _vm.close()
      }
    }
  }) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(212),
  /* template */
  __webpack_require__(213),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BTaglist',
    props: {
        attached: Boolean
    }
});

/***/ }),
/* 213 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tags",
    class: {
      'has-addons': _vm.attached
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(215),
  /* template */
  __webpack_require__(216),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_helpers__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tag_Tag__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tag_Tag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__tag_Tag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_FormElementMixin__ = __webpack_require__(10);



var _components;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BTaginput',
    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete___default.a.name, __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3__tag_Tag___default.a.name, __WEBPACK_IMPORTED_MODULE_3__tag_Tag___default.a), _components),
    mixins: [__WEBPACK_IMPORTED_MODULE_5__utils_FormElementMixin__["a" /* default */]],
    inheritAttrs: false,
    props: {
        value: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        data: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        type: String,
        rounded: {
            type: Boolean,
            default: false
        },
        attached: {
            type: Boolean,
            default: false
        },
        maxtags: {
            type: [Number, String],
            required: false
        },
        field: {
            type: String,
            default: 'value'
        },
        autocomplete: Boolean,
        nativeAutocomplete: String,
        disabled: Boolean,
        ellipsis: Boolean,
        closable: {
            type: Boolean,
            default: true
        },
        confirmKeyCodes: {
            type: Array,
            default: function _default() {
                return [13, 188];
            }
        },
        removeOnKeys: {
            type: Array,
            default: function _default() {
                return [8];
            }
        },
        allowNew: Boolean,
        onPasteSeparators: {
            type: Array,
            default: function _default() {
                return [','];
            }
        },
        beforeAdding: {
            type: Function,
            default: function _default() {
                return true;
            }
        },
        allowDuplicates: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            tags: this.value || [],
            newTag: '',
            _elementRef: 'input',
            _isTaginput: true
        };
    },

    computed: {
        rootClasses: function rootClasses() {
            return {
                'is-expanded': this.expanded
            };
        },
        containerClasses: function containerClasses() {
            return {
                'is-focused': this.isFocused,
                'is-focusable': this.hasInput
            };
        },
        valueLength: function valueLength() {
            return this.newTag.trim().length;
        },
        defaultSlotName: function defaultSlotName() {
            return this.hasDefaultSlot ? 'default' : 'dontrender';
        },
        emptySlotName: function emptySlotName() {
            return this.hasEmptySlot ? 'empty' : 'dontrender';
        },
        headerSlotName: function headerSlotName() {
            return this.hasHeaderSlot ? 'header' : 'dontrender';
        },
        footerSlotName: function footerSlotName() {
            return this.hasHeaderSlot ? 'footer' : 'dontrender';
        },
        hasDefaultSlot: function hasDefaultSlot() {
            return !!this.$scopedSlots.default;
        },
        hasEmptySlot: function hasEmptySlot() {
            return !!this.$slots.empty;
        },
        hasHeaderSlot: function hasHeaderSlot() {
            return !!this.$slots.header;
        },
        hasFooterSlot: function hasFooterSlot() {
            return !!this.$slots.footer;
        },


        /**
         * Show the input field if a maxtags hasn't been set or reached.
         */
        hasInput: function hasInput() {
            return this.maxtags == null || this.tagsLength < this.maxtags;
        },
        tagsLength: function tagsLength() {
            return this.tags.length;
        },


        /**
         * If Taginput has onPasteSeparators prop,
         * returning new RegExp used to split pasted string.
         */
        separatorsAsRegExp: function separatorsAsRegExp() {
            var sep = this.onPasteSeparators;

            return sep.length ? new RegExp(sep.map(function (s) {
                return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null;
            }).join('|'), 'g') : null;
        }
    },
    watch: {
        /**
         * When v-model is changed set internal value.
         */
        value: function value(_value) {
            this.tags = _value;
        },
        hasInput: function hasInput() {
            if (!this.hasInput) this.onBlur();
        }
    },
    methods: {
        addTag: function addTag(tag) {
            var tagToAdd = tag || this.newTag.trim();

            if (tagToAdd) {
                if (!this.autocomplete) {
                    var reg = this.separatorsAsRegExp;
                    if (reg && tagToAdd.match(reg)) {
                        tagToAdd.split(reg).map(function (t) {
                            return t.trim();
                        }).filter(function (t) {
                            return t.length !== 0;
                        }).map(this.addTag);
                        return;
                    }
                }

                // Add the tag input if it is not blank
                // or previously added (if not allowDuplicates).
                var add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true;
                if (add && this.beforeAdding(tagToAdd)) {
                    this.tags.push(tagToAdd);
                    this.$emit('input', this.tags);
                    this.$emit('add', tagToAdd);
                }
            }

            this.newTag = '';
        },
        getNormalizedTagText: function getNormalizedTagText(tag) {
            if ((typeof tag === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(tag)) === 'object') {
                return Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["a" /* getValueByPath */])(tag, this.field);
            }

            return tag;
        },
        customOnBlur: function customOnBlur($event) {
            // Add tag on-blur if not select only
            if (!this.autocomplete) this.addTag();

            this.onBlur($event);
        },
        onSelect: function onSelect(option) {
            var _this = this;

            if (!option) return;

            this.addTag(option);
            this.$nextTick(function () {
                _this.newTag = '';
            });
        },
        removeTag: function removeTag(index) {
            var tag = this.tags.splice(index, 1)[0];
            this.$emit('input', this.tags);
            this.$emit('remove', tag);
            return tag;
        },
        removeLastTag: function removeLastTag() {
            if (this.tagsLength > 0) {
                this.removeTag(this.tagsLength - 1);
            }
        },
        keydown: function keydown(event) {
            if (this.removeOnKeys.indexOf(event.keyCode) !== -1 && !this.newTag.length) {
                this.removeLastTag();
            }
            // Stop if is to accept select only
            if (this.autocomplete && !this.allowNew) return;

            if (this.confirmKeyCodes.indexOf(event.keyCode) >= 0) {
                event.preventDefault();
                this.addTag();
            }
        },
        onTyping: function onTyping($event) {
            this.$emit('typing', $event.trim());
        }
    }
});

/***/ }),
/* 216 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "taginput control",
    class: _vm.rootClasses
  }, [_c('div', {
    staticClass: "taginput-container",
    class: [_vm.statusType, _vm.size, _vm.containerClasses],
    attrs: {
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        _vm.hasInput && _vm.focus($event)
      }
    }
  }, [_vm._l((_vm.tags), function(tag, index) {
    return _c('b-tag', {
      key: index,
      attrs: {
        "type": _vm.type,
        "size": _vm.size,
        "rounded": _vm.rounded,
        "attached": _vm.attached,
        "tabstop": false,
        "disabled": _vm.disabled,
        "ellipsis": _vm.ellipsis,
        "closable": _vm.closable,
        "title": _vm.ellipsis && _vm.getNormalizedTagText(tag)
      },
      on: {
        "close": function($event) {
          _vm.removeTag(index)
        }
      }
    }, [_vm._v("\n            " + _vm._s(_vm.getNormalizedTagText(tag)) + "\n        ")])
  }), _vm._v(" "), (_vm.hasInput) ? _c('b-autocomplete', _vm._b({
    ref: "autocomplete",
    attrs: {
      "data": _vm.data,
      "field": _vm.field,
      "icon": _vm.icon,
      "icon-pack": _vm.iconPack,
      "maxlength": _vm.maxlength,
      "has-counter": false,
      "size": _vm.size,
      "disabled": _vm.disabled,
      "loading": _vm.loading,
      "autocomplete": _vm.nativeAutocomplete,
      "keep-first": !_vm.allowNew,
      "use-html5-validation": _vm.useHtml5Validation
    },
    on: {
      "typing": _vm.onTyping,
      "focus": _vm.onFocus,
      "blur": _vm.customOnBlur,
      "select": _vm.onSelect
    },
    nativeOn: {
      "keydown": function($event) {
        _vm.keydown($event)
      }
    },
    scopedSlots: _vm._u([{
      key: _vm.defaultSlotName,
      fn: function(props) {
        return [_vm._t("default", null, {
          option: props.option,
          index: props.index
        })]
      }
    }]),
    model: {
      value: (_vm.newTag),
      callback: function($$v) {
        _vm.newTag = $$v
      },
      expression: "newTag"
    }
  }, 'b-autocomplete', _vm.$attrs, false), [_c('template', {
    slot: _vm.headerSlotName
  }, [_vm._t("header")], 2), _vm._v(" "), _c('template', {
    slot: _vm.emptySlotName
  }, [_vm._t("empty")], 2), _vm._v(" "), _c('template', {
    slot: _vm.footerSlotName
  }, [_vm._t("footer")], 2)], 2) : _vm._e()], 2), _vm._v(" "), (_vm.maxtags || _vm.maxlength) ? _c('p', {
    staticClass: "help counter"
  }, [(_vm.maxlength && _vm.valueLength > 0) ? [_vm._v("\n            " + _vm._s(_vm.valueLength) + " / " + _vm._s(_vm.maxlength) + "\n        ")] : (_vm.maxtags) ? [_vm._v("\n            " + _vm._s(_vm.tagsLength) + " / " + _vm._s(_vm.maxtags) + "\n        ")] : _vm._e()], 2) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(218),
  /* template */
  __webpack_require__(219),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_TimepickerMixin__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_Input__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__input_Input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__field_Field__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__field_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__field_Field__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__select_Select__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__select_Select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__select_Select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__icon_Icon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__icon_Icon__);


var _components;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BTimepicker',
    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_4__input_Input___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5__field_Field___default.a.name, __WEBPACK_IMPORTED_MODULE_5__field_Field___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6__select_Select___default.a.name, __WEBPACK_IMPORTED_MODULE_6__select_Select___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_7__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default.a.name, __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default.a.name, __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default.a), _components),
    mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_TimepickerMixin__["a" /* default */]],
    inheritAttrs: false,
    data: function data() {
        return {
            _isTimepicker: true
        };
    }
});

/***/ }),
/* 219 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "timepicker control",
    class: [_vm.size, {
      'is-expanded': _vm.expanded
    }]
  }, [(!_vm.isMobile || _vm.inline) ? _c('b-dropdown', {
    ref: "dropdown",
    attrs: {
      "position": _vm.position,
      "disabled": _vm.disabled,
      "inline": _vm.inline
    }
  }, [(!_vm.inline) ? _c('b-input', _vm._b({
    ref: "input",
    attrs: {
      "slot": "trigger",
      "autocomplete": "off",
      "value": _vm.formatValue(_vm.computedValue),
      "placeholder": _vm.placeholder,
      "size": _vm.size,
      "icon": _vm.icon,
      "icon-pack": _vm.iconPack,
      "loading": _vm.loading,
      "disabled": _vm.disabled,
      "readonly": !_vm.editable,
      "rounded": _vm.rounded,
      "use-html5-validation": _vm.useHtml5Validation
    },
    on: {
      "focus": _vm.handleOnFocus,
      "blur": function($event) {
        _vm.onBlur() && _vm.checkHtml5Validity()
      }
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.toggle(true)
      },
      "change": function($event) {
        _vm.onChange($event.target.value)
      }
    },
    slot: "trigger"
  }, 'b-input', _vm.$attrs, false)) : _vm._e(), _vm._v(" "), _c('b-dropdown-item', {
    attrs: {
      "disabled": _vm.disabled,
      "custom": ""
    }
  }, [_c('b-field', {
    attrs: {
      "grouped": "",
      "position": "is-centered"
    }
  }, [_c('b-select', {
    attrs: {
      "disabled": _vm.disabled,
      "placeholder": "00"
    },
    nativeOn: {
      "change": function($event) {
        _vm.onHoursChange($event.target.value)
      }
    },
    model: {
      value: (_vm.hoursSelected),
      callback: function($$v) {
        _vm.hoursSelected = $$v
      },
      expression: "hoursSelected"
    }
  }, _vm._l((_vm.hours), function(hour) {
    return _c('option', {
      key: hour.value,
      attrs: {
        "disabled": _vm.isHourDisabled(hour.value)
      },
      domProps: {
        "value": hour.value
      }
    }, [_vm._v("\n                        " + _vm._s(hour.label) + "\n                    ")])
  })), _vm._v(" "), _c('span', {
    staticClass: "control is-colon"
  }, [_vm._v(":")]), _vm._v(" "), _c('b-select', {
    attrs: {
      "disabled": _vm.disabled,
      "placeholder": "00"
    },
    nativeOn: {
      "change": function($event) {
        _vm.onMinutesChange($event.target.value)
      }
    },
    model: {
      value: (_vm.minutesSelected),
      callback: function($$v) {
        _vm.minutesSelected = $$v
      },
      expression: "minutesSelected"
    }
  }, _vm._l((_vm.minutes), function(minute) {
    return _c('option', {
      key: minute.value,
      attrs: {
        "disabled": _vm.isMinuteDisabled(minute.value)
      },
      domProps: {
        "value": minute.value
      }
    }, [_vm._v("\n                        " + _vm._s(minute.label) + "\n                    ")])
  })), _vm._v(" "), (_vm.enableSeconds) ? [_c('span', {
    staticClass: "control is-colon"
  }, [_vm._v(":")]), _vm._v(" "), _c('b-select', {
    attrs: {
      "disabled": _vm.disabled,
      "placeholder": "00"
    },
    nativeOn: {
      "change": function($event) {
        _vm.onSecondsChange($event.target.value)
      }
    },
    model: {
      value: (_vm.secondsSelected),
      callback: function($$v) {
        _vm.secondsSelected = $$v
      },
      expression: "secondsSelected"
    }
  }, _vm._l((_vm.seconds), function(second) {
    return _c('option', {
      key: second.value,
      attrs: {
        "disabled": _vm.isSecondDisabled(second.value)
      },
      domProps: {
        "value": second.value
      }
    }, [_vm._v("\n                            " + _vm._s(second.label) + "\n                        ")])
  }))] : _vm._e(), _vm._v(" "), (!_vm.isHourFormat24) ? _c('b-select', {
    attrs: {
      "disabled": _vm.disabled
    },
    nativeOn: {
      "change": function($event) {
        _vm.onMeridienChange($event.target.value)
      }
    },
    model: {
      value: (_vm.meridienSelected),
      callback: function($$v) {
        _vm.meridienSelected = $$v
      },
      expression: "meridienSelected"
    }
  }, _vm._l((_vm.meridiens), function(meridien) {
    return _c('option', {
      key: meridien,
      domProps: {
        "value": meridien
      }
    }, [_vm._v("\n                        " + _vm._s(meridien) + "\n                    ")])
  })) : _vm._e()], 2), _vm._v(" "), (_vm.$slots.default !== undefined && _vm.$slots.default.length) ? _c('footer', {
    staticClass: "timepicker-footer"
  }, [_vm._t("default")], 2) : _vm._e()], 1)], 1) : _c('b-input', _vm._b({
    ref: "input",
    attrs: {
      "type": "time",
      "autocomplete": "off",
      "value": _vm.formatHHMMSS(_vm.computedValue),
      "placeholder": _vm.placeholder,
      "size": _vm.size,
      "icon": _vm.icon,
      "icon-pack": _vm.iconPack,
      "loading": _vm.loading,
      "max": _vm.formatHHMMSS(_vm.maxTime),
      "min": _vm.formatHHMMSS(_vm.minTime),
      "disabled": _vm.disabled,
      "readonly": false,
      "use-html5-validation": _vm.useHtml5Validation
    },
    on: {
      "focus": _vm.handleOnFocus,
      "blur": function($event) {
        _vm.onBlur() && _vm.checkHtml5Validity()
      }
    },
    nativeOn: {
      "change": function($event) {
        _vm.onChange($event.target.value)
      }
    }
  }, 'b-input', _vm.$attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(221),
  /* template */
  __webpack_require__(222),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__ = __webpack_require__(45);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BToast',
    mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__["a" /* default */]],
    data: function data() {
        return {
            newDuration: this.duration || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultToastDuration
        };
    }
});

/***/ }),
/* 222 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "enter-active-class": _vm.transition.enter,
      "leave-active-class": _vm.transition.leave
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isActive),
      expression: "isActive"
    }],
    staticClass: "toast",
    class: [_vm.type, _vm.position],
    attrs: {
      "aria-hidden": !_vm.isActive,
      "role": "alert"
    }
  }, [_c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.message)
    }
  })])])
},staticRenderFns: []}

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(224),
  /* template */
  __webpack_require__(225),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BTooltip',
    props: {
        active: {
            type: Boolean,
            default: true
        },
        type: String,
        label: String,
        position: {
            type: String,
            default: 'is-top',
            validator: function validator(value) {
                return ['is-top', 'is-bottom', 'is-left', 'is-right'].indexOf(value) > -1;
            }
        },
        always: Boolean,
        animated: Boolean,
        square: Boolean,
        dashed: Boolean,
        multilined: Boolean,
        size: {
            type: String,
            default: 'is-medium'
        }
    },
    computed: {
        newType: function newType() {
            return this.type || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultTooltipType;
        },
        newAnimated: function newAnimated() {
            return this.animated || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultTooltipAnimated;
        }
    }
});

/***/ }),
/* 225 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    class: [_vm.newType, _vm.position, _vm.size, {
      'b-tooltip': _vm.active,
      'is-square': _vm.square,
      'is-animated': _vm.newAnimated,
      'is-always': _vm.always,
      'is-multiline': _vm.multilined,
      'is-dashed': _vm.dashed
    }],
    attrs: {
      "data-label": _vm.label
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(227),
  /* template */
  __webpack_require__(228),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_FormElementMixin__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ssr__ = __webpack_require__(64);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'BUpload',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__utils_FormElementMixin__["a" /* default */]],
    inheritAttrs: false,
    props: {
        value: {
            type: [Object, Function, __WEBPACK_IMPORTED_MODULE_1__utils_ssr__["a" /* File */], Array]
        },
        multiple: Boolean,
        disabled: Boolean,
        accept: String,
        dragDrop: Boolean,
        type: {
            type: String,
            default: 'is-primary'
        },
        native: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            newValue: this.value,
            dragDropFocus: false,
            _elementRef: 'input'
        };
    },

    watch: {
        /**
         * When v-model is changed:
         *   1. Set internal value.
         *   2. Reset input value if array is empty
         *   3. If it's invalid, validate again.
         */
        value: function value(_value) {
            this.newValue = _value;
            if (!this.newValue || Array.isArray(this.newValue) && this.newValue.length === 0) {
                this.$refs.input.value = null;
            }
            !this.isValid && !this.dragDrop && this.checkHtml5Validity();
        }
    },
    methods: {

        /**
         * Listen change event on input type 'file',
         * emit 'input' event and validate
         */
        onFileChange: function onFileChange(event) {
            if (this.disabled || this.loading) return;
            if (this.dragDrop) {
                this.updateDragDropFocus(false);
            }
            var value = event.target.files || event.dataTransfer.files;
            if (value.length === 0) {
                if (!this.newValue) {
                    return;
                }
                this.newValue = null;
            } else if (!this.multiple) {
                // only one element in case drag drop mode and isn't multiple
                if (this.dragDrop && value.length !== 1) return;else {
                    var file = value[0];
                    if (this.checkType(file)) {
                        this.newValue = file;
                    } else if (this.newValue) {
                        this.newValue = null;
                    } else {
                        return;
                    }
                }
            } else {
                // always new values if native or undefined local
                var newValues = false;
                if (this.native || !this.newValue) {
                    this.newValue = [];
                    newValues = true;
                }
                for (var i = 0; i < value.length; i++) {
                    var _file = value[i];
                    if (this.checkType(_file)) {
                        this.newValue.push(_file);
                        newValues = true;
                    }
                }
                if (!newValues) {
                    return;
                }
            }
            this.$emit('input', this.newValue);
            !this.dragDrop && this.checkHtml5Validity();
        },


        /**
         * Listen drag-drop to update internal variable
         */
        updateDragDropFocus: function updateDragDropFocus(focus) {
            if (!this.disabled && !this.loading) {
                this.dragDropFocus = focus;
            }
        },


        /**
         * Check mime type of file
         */
        checkType: function checkType(file) {
            if (!this.accept) return true;
            var types = this.accept.split(',');
            if (types.length === 0) return true;
            var valid = false;
            for (var i = 0; i < types.length && !valid; i++) {
                var type = types[i].trim();
                if (type) {
                    if (type.substring(0, 1) === '.') {
                        // check extension
                        var extIndex = file.name.lastIndexOf('.');
                        var extension = extIndex >= 0 ? file.name.substring(extIndex) : '';
                        if (extension.toLowerCase() === type.toLowerCase()) {
                            valid = true;
                        }
                    } else {
                        // check mime type
                        if (file.type.match(type)) {
                            valid = true;
                        }
                    }
                }
            }
            return valid;
        }
    }
});

/***/ }),
/* 228 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    staticClass: "upload control"
  }, [(!_vm.dragDrop) ? [_vm._t("default")] : _c('div', {
    staticClass: "upload-draggable",
    class: [_vm.type, {
      'is-loading': _vm.loading,
      'is-disabled': _vm.disabled,
      'is-hovered': _vm.dragDropFocus
    }],
    on: {
      "dragover": function($event) {
        $event.preventDefault();
        _vm.updateDragDropFocus(true)
      },
      "dragleave": function($event) {
        $event.preventDefault();
        _vm.updateDragDropFocus(false)
      },
      "dragenter": function($event) {
        $event.preventDefault();
        _vm.updateDragDropFocus(true)
      },
      "drop": function($event) {
        $event.preventDefault();
        _vm.onFileChange($event)
      }
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _c('input', _vm._b({
    ref: "input",
    class: {
      'file-draggable': _vm.dragDrop
    },
    attrs: {
      "type": "file",
      "multiple": _vm.multiple,
      "accept": _vm.accept,
      "disabled": _vm.disabled,
      "use-html5-validation": _vm.useHtml5Validation
    },
    on: {
      "change": _vm.onFileChange
    }
  }, 'input', _vm.$attrs, false))], 2)
},staticRenderFns: []}

/***/ })
/******/ ]);
});

/***/ })

},[163]);