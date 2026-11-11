// ChatGPT Bulker — local chat selection tools.
var _ = function (exports) {
  "use strict";

  /**
  * @vue/shared v3.5.13
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function makeMap(str) {
    const map = /* @__PURE__ */Object.create(null);
    for (const key of str.split(",")) map[key] = 1;
    return val => val in map;
  }
  const EMPTY_OBJ = {},
    EMPTY_ARR = [],
    NOOP = () => {},
    NO = () => !1,
    isOn = key => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (
    // uppercase letter
    key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97),
    isModelListener = key => key.startsWith("onUpdate:"),
    extend = Object.assign,
    remove = (arr, el) => {
      const i = arr.indexOf(el);
      i > -1 && arr.splice(i, 1);
    },
    hasOwnProperty$2 = Object.prototype.hasOwnProperty,
    hasOwn$1 = (val, key) => hasOwnProperty$2.call(val, key),
    isArray$1 = Array.isArray,
    isMap = val => toTypeString$1(val) === "[object Map]",
    isSet = val => toTypeString$1(val) === "[object Set]",
    isDate$1 = val => toTypeString$1(val) === "[object Date]",
    isFunction$1 = val => typeof val == "function",
    isString$1 = val => typeof val == "string",
    isSymbol = val => typeof val == "symbol",
    isObject$1 = val => val !== null && typeof val == "object",
    isPromise$1 = val => (isObject$1(val) || isFunction$1(val)) && isFunction$1(val.then) && isFunction$1(val.catch),
    objectToString$1 = Object.prototype.toString,
    toTypeString$1 = value => objectToString$1.call(value),
    toRawType = value => toTypeString$1(value).slice(8, -1),
    isPlainObject$2 = val => toTypeString$1(val) === "[object Object]",
    isIntegerKey = key => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key,
    isReservedProp = /* @__PURE__ */makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    cacheStringFunction = fn => {
      const cache2 = /* @__PURE__ */Object.create(null);
      return str => cache2[str] || (cache2[str] = fn(str));
    },
    camelizeRE = /-(\w)/g,
    camelize = cacheStringFunction(str => str.replace(camelizeRE, (_2, c) => c ? c.toUpperCase() : "")),
    hyphenateRE = /\B([A-Z])/g,
    hyphenate = cacheStringFunction(str => str.replace(hyphenateRE, "-$1").toLowerCase()),
    capitalize$1 = cacheStringFunction(str => str.charAt(0).toUpperCase() + str.slice(1)),
    toHandlerKey = cacheStringFunction(str => str ? `on${capitalize$1(str)}` : ""),
    hasChanged = (value, oldValue) => !Object.is(value, oldValue),
    invokeArrayFns = (fns, ...arg) => {
      for (let i = 0; i < fns.length; i++) fns[i](...arg);
    },
    def = (obj, key, value, writable = !1) => {
      Object.defineProperty(obj, key, {
        configurable: !0,
        enumerable: !1,
        writable,
        value
      });
    },
    looseToNumber = val => {
      const n = parseFloat(val);
      return isNaN(n) ? val : n;
    };
  let _globalThis$1;
  const getGlobalThis$1 = () => _globalThis$1 || (_globalThis$1 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
  function normalizeStyle(value) {
    if (isArray$1(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i],
          normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) for (const key in normalized) res[key] = normalized[key];
      }
      return res;
    } else if (isString$1(value) || isObject$1(value)) return value;
  }
  const listDelimiterRE = /;(?![^(]*\))/g,
    propertyDelimiterRE = /:([^]+)/,
    styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    return cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach(item => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    }), ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString$1(value)) res = value;else if (isArray$1(value)) for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      normalized && (res += normalized + " ");
    } else if (isObject$1(value)) for (const name in value) value[name] && (res += name + " ");
    return res.trim();
  }
  const isSpecialBooleanAttr = /* @__PURE__ */makeMap("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function looseCompareArrays(a, b) {
    if (a.length !== b.length) return !1;
    let equal = !0;
    for (let i = 0; equal && i < a.length; i++) equal = looseEqual(a[i], b[i]);
    return equal;
  }
  function looseEqual(a, b) {
    if (a === b) return !0;
    let aValidType = isDate$1(a),
      bValidType = isDate$1(b);
    if (aValidType || bValidType) return aValidType && bValidType ? a.getTime() === b.getTime() : !1;
    if (aValidType = isSymbol(a), bValidType = isSymbol(b), aValidType || bValidType) return a === b;
    if (aValidType = isArray$1(a), bValidType = isArray$1(b), aValidType || bValidType) return aValidType && bValidType ? looseCompareArrays(a, b) : !1;
    if (aValidType = isObject$1(a), bValidType = isObject$1(b), aValidType || bValidType) {
      if (!aValidType || !bValidType) return !1;
      const aKeysCount = Object.keys(a).length,
        bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) return !1;
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key),
          bHasKey = b.hasOwnProperty(key);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) return !1;
      }
    }
    return String(a) === String(b);
  }
  const isRef$1 = val => !!(val && val.__v_isRef === !0),
    toDisplayString$1 = val => isString$1(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString$1 || !isFunction$1(val.toString)) ? isRef$1(val) ? toDisplayString$1(val.value) : JSON.stringify(val, replacer, 2) : String(val),
    replacer = (_key, val) => isRef$1(val) ? replacer(_key, val.value) : isMap(val) ? {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2], i) => (entries[stringifySymbol(key, i) + " =>"] = val2, entries), {})
    } : isSet(val) ? {
      [`Set(${val.size})`]: [...val.values()].map(v => stringifySymbol(v))
    } : isSymbol(val) ? stringifySymbol(val) : isObject$1(val) && !isArray$1(val) && !isPlainObject$2(val) ? String(val) : val,
    stringifySymbol = (v, i = "") => {
      var _a;
      return (
        // Symbol.description in es2019+ so we need to cast here to pass
        // the lib: es2016 check
        isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
      );
    };
  /**
  * @vue/reactivity v3.5.13
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let activeEffectScope;
  class EffectScope {
    constructor(detached = !1) {
      this.detached = detached, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = activeEffectScope, !detached && activeEffectScope && (this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1);
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = !0;
        let i, l;
        if (this.scopes) for (i = 0, l = this.scopes.length; i < l; i++) this.scopes[i].pause();
        for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].pause();
      }
    }
    /**
     * Resumes the effect scope, including all child scopes and effects.
     */
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = !1;
        let i, l;
        if (this.scopes) for (i = 0, l = this.scopes.length; i < l; i++) this.scopes[i].resume();
        for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].resume();
      }
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          return activeEffectScope = this, fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      activeEffectScope = this;
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      activeEffectScope = this.parent;
    }
    stop(fromParent) {
      if (this._active) {
        this._active = !1;
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].stop();
        for (this.effects.length = 0, i = 0, l = this.cleanups.length; i < l; i++) this.cleanups[i]();
        if (this.cleanups.length = 0, this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) this.scopes[i].stop(!0);
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          last && last !== this && (this.parent.scopes[this.index] = last, last.index = this.index);
        }
        this.parent = void 0;
      }
    }
  }
  function effectScope(detached) {
    return new EffectScope(detached);
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  function onScopeDispose(fn, failSilently = !1) {
    activeEffectScope && activeEffectScope.cleanups.push(fn);
  }
  let activeSub;
  const pausedQueueEffects = /* @__PURE__ */new WeakSet();
  class ReactiveEffect {
    constructor(fn) {
      this.fn = fn, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, activeEffectScope && activeEffectScope.active && activeEffectScope.effects.push(this);
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 && (this.flags &= -65, pausedQueueEffects.has(this) && (pausedQueueEffects.delete(this), this.trigger()));
    }
    /**
     * @internal
     */
    notify() {
      this.flags & 2 && !(this.flags & 32) || this.flags & 8 || batch(this);
    }
    run() {
      if (!(this.flags & 1)) return this.fn();
      this.flags |= 2, cleanupEffect(this), prepareDeps(this);
      const prevEffect = activeSub,
        prevShouldTrack = shouldTrack;
      activeSub = this, shouldTrack = !0;
      try {
        return this.fn();
      } finally {
        cleanupDeps(this), activeSub = prevEffect, shouldTrack = prevShouldTrack, this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let link = this.deps; link; link = link.nextDep) removeSub(link);
        this.deps = this.depsTail = void 0, cleanupEffect(this), this.onStop && this.onStop(), this.flags &= -2;
      }
    }
    trigger() {
      this.flags & 64 ? pausedQueueEffects.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    /**
     * @internal
     */
    runIfDirty() {
      isDirty(this) && this.run();
    }
    get dirty() {
      return isDirty(this);
    }
  }
  let batchDepth = 0,
    batchedSub,
    batchedComputed;
  function batch(sub, isComputed2 = !1) {
    if (sub.flags |= 8, isComputed2) {
      sub.next = batchedComputed, batchedComputed = sub;
      return;
    }
    sub.next = batchedSub, batchedSub = sub;
  }
  function startBatch() {
    batchDepth++;
  }
  function endBatch() {
    if (--batchDepth > 0) return;
    if (batchedComputed) {
      let e = batchedComputed;
      for (batchedComputed = void 0; e;) {
        const next = e.next;
        e.next = void 0, e.flags &= -9, e = next;
      }
    }
    let error;
    for (; batchedSub;) {
      let e = batchedSub;
      for (batchedSub = void 0; e;) {
        const next = e.next;
        if (e.next = void 0, e.flags &= -9, e.flags & 1) try {
          e.trigger();
        } catch (err) {
          error || (error = err);
        }
        e = next;
      }
    }
    if (error) throw error;
  }
  function prepareDeps(sub) {
    for (let link = sub.deps; link; link = link.nextDep) link.version = -1, link.prevActiveLink = link.dep.activeLink, link.dep.activeLink = link;
  }
  function cleanupDeps(sub) {
    let head,
      tail = sub.depsTail,
      link = tail;
    for (; link;) {
      const prev = link.prevDep;
      link.version === -1 ? (link === tail && (tail = prev), removeSub(link), removeDep(link)) : head = link, link.dep.activeLink = link.prevActiveLink, link.prevActiveLink = void 0, link = prev;
    }
    sub.deps = head, sub.depsTail = tail;
  }
  function isDirty(sub) {
    for (let link = sub.deps; link; link = link.nextDep) if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) return !0;
    return !!sub._dirty;
  }
  function refreshComputed(computed2) {
    if (computed2.flags & 4 && !(computed2.flags & 16) || (computed2.flags &= -17, computed2.globalVersion === globalVersion)) return;
    computed2.globalVersion = globalVersion;
    const dep = computed2.dep;
    if (computed2.flags |= 2, dep.version > 0 && !computed2.isSSR && computed2.deps && !isDirty(computed2)) {
      computed2.flags &= -3;
      return;
    }
    const prevSub = activeSub,
      prevShouldTrack = shouldTrack;
    activeSub = computed2, shouldTrack = !0;
    try {
      prepareDeps(computed2);
      const value = computed2.fn(computed2._value);
      (dep.version === 0 || hasChanged(value, computed2._value)) && (computed2._value = value, dep.version++);
    } catch (err) {
      throw dep.version++, err;
    } finally {
      activeSub = prevSub, shouldTrack = prevShouldTrack, cleanupDeps(computed2), computed2.flags &= -3;
    }
  }
  function removeSub(link, soft = !1) {
    const {
      dep,
      prevSub,
      nextSub
    } = link;
    if (prevSub && (prevSub.nextSub = nextSub, link.prevSub = void 0), nextSub && (nextSub.prevSub = prevSub, link.nextSub = void 0), dep.subs === link && (dep.subs = prevSub, !prevSub && dep.computed)) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) removeSub(l, !0);
    }
    !soft && ! --dep.sc && dep.map && dep.map.delete(dep.key);
  }
  function removeDep(link) {
    const {
      prevDep,
      nextDep
    } = link;
    prevDep && (prevDep.nextDep = nextDep, link.prevDep = void 0), nextDep && (nextDep.prevDep = prevDep, link.nextDep = void 0);
  }
  let shouldTrack = !0;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack), shouldTrack = !1;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? !0 : last;
  }
  function cleanupEffect(e) {
    const {
      cleanup
    } = e;
    if (e.cleanup = void 0, cleanup) {
      const prevSub = activeSub;
      activeSub = void 0;
      try {
        cleanup();
      } finally {
        activeSub = prevSub;
      }
    }
  }
  let globalVersion = 0;
  class Link {
    constructor(sub, dep) {
      this.sub = sub, this.dep = dep, this.version = dep.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  }
  class Dep {
    constructor(computed2) {
      this.computed = computed2, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
    }
    track(debugInfo) {
      if (!activeSub || !shouldTrack || activeSub === this.computed) return;
      let link = this.activeLink;
      if (link === void 0 || link.sub !== activeSub) link = this.activeLink = new Link(activeSub, this), activeSub.deps ? (link.prevDep = activeSub.depsTail, activeSub.depsTail.nextDep = link, activeSub.depsTail = link) : activeSub.deps = activeSub.depsTail = link, addSub(link);else if (link.version === -1 && (link.version = this.version, link.nextDep)) {
        const next = link.nextDep;
        next.prevDep = link.prevDep, link.prevDep && (link.prevDep.nextDep = next), link.prevDep = activeSub.depsTail, link.nextDep = void 0, activeSub.depsTail.nextDep = link, activeSub.depsTail = link, activeSub.deps === link && (activeSub.deps = next);
      }
      return link;
    }
    trigger(debugInfo) {
      this.version++, globalVersion++, this.notify(debugInfo);
    }
    notify(debugInfo) {
      startBatch();
      try {
        for (let link = this.subs; link; link = link.prevSub) link.sub.notify() && link.sub.dep.notify();
      } finally {
        endBatch();
      }
    }
  }
  function addSub(link) {
    if (link.dep.sc++, link.sub.flags & 4) {
      const computed2 = link.dep.computed;
      if (computed2 && !link.dep.subs) {
        computed2.flags |= 20;
        for (let l = computed2.deps; l; l = l.nextDep) addSub(l);
      }
      const currentTail = link.dep.subs;
      currentTail !== link && (link.prevSub = currentTail, currentTail && (currentTail.nextSub = link)), link.dep.subs = link;
    }
  }
  const targetMap = /* @__PURE__ */new WeakMap(),
    ITERATE_KEY = /* @__PURE__ */Symbol(""),
    MAP_KEY_ITERATE_KEY = /* @__PURE__ */Symbol(""),
    ARRAY_ITERATE_KEY = /* @__PURE__ */Symbol("");
  function track(target, type, key) {
    if (shouldTrack && activeSub) {
      let depsMap = targetMap.get(target);
      depsMap || targetMap.set(target, depsMap = /* @__PURE__ */new Map());
      let dep = depsMap.get(key);
      dep || (depsMap.set(key, dep = new Dep()), dep.map = depsMap, dep.key = key), dep.track();
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      globalVersion++;
      return;
    }
    const run = dep => {
      dep && dep.trigger();
    };
    if (startBatch(), type === "clear") depsMap.forEach(run);else {
      const targetIsArray = isArray$1(target),
        isArrayIndex = targetIsArray && isIntegerKey(key);
      if (targetIsArray && key === "length") {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key2) => {
          (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) && run(dep);
        });
      } else switch ((key !== void 0 || depsMap.has(void 0)) && run(depsMap.get(key)), isArrayIndex && run(depsMap.get(ARRAY_ITERATE_KEY)), type) {
        case "add":
          targetIsArray ? isArrayIndex && run(depsMap.get("length")) : (run(depsMap.get(ITERATE_KEY)), isMap(target) && run(depsMap.get(MAP_KEY_ITERATE_KEY)));
          break;
        case "delete":
          targetIsArray || (run(depsMap.get(ITERATE_KEY)), isMap(target) && run(depsMap.get(MAP_KEY_ITERATE_KEY)));
          break;
        case "set":
          isMap(target) && run(depsMap.get(ITERATE_KEY));
          break;
      }
    }
    endBatch();
  }
  function getDepFromReactive(object, key) {
    const depMap = targetMap.get(object);
    return depMap && depMap.get(key);
  }
  function reactiveReadArray(array) {
    const raw = toRaw(array);
    return raw === array ? raw : (track(raw, "iterate", ARRAY_ITERATE_KEY), isShallow(array) ? raw : raw.map(toReactive));
  }
  function shallowReadArray(arr) {
    return track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY), arr;
  }
  const arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, toReactive);
    },
    concat(...args) {
      return reactiveReadArray(this).concat(...args.map(x => isArray$1(x) ? reactiveReadArray(x) : x));
    },
    entries() {
      return iterator(this, "entries", value => (value[1] = toReactive(value[1]), value));
    },
    every(fn, thisArg) {
      return apply$1(this, "every", fn, thisArg, void 0, arguments);
    },
    filter(fn, thisArg) {
      return apply$1(this, "filter", fn, thisArg, v => v.map(toReactive), arguments);
    },
    find(fn, thisArg) {
      return apply$1(this, "find", fn, thisArg, toReactive, arguments);
    },
    findIndex(fn, thisArg) {
      return apply$1(this, "findIndex", fn, thisArg, void 0, arguments);
    },
    findLast(fn, thisArg) {
      return apply$1(this, "findLast", fn, thisArg, toReactive, arguments);
    },
    findLastIndex(fn, thisArg) {
      return apply$1(this, "findLastIndex", fn, thisArg, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(fn, thisArg) {
      return apply$1(this, "forEach", fn, thisArg, void 0, arguments);
    },
    includes(...args) {
      return searchProxy(this, "includes", args);
    },
    indexOf(...args) {
      return searchProxy(this, "indexOf", args);
    },
    join(separator) {
      return reactiveReadArray(this).join(separator);
    },
    // keys() iterator only reads `length`, no optimisation required
    lastIndexOf(...args) {
      return searchProxy(this, "lastIndexOf", args);
    },
    map(fn, thisArg) {
      return apply$1(this, "map", fn, thisArg, void 0, arguments);
    },
    pop() {
      return noTracking(this, "pop");
    },
    push(...args) {
      return noTracking(this, "push", args);
    },
    reduce(fn, ...args) {
      return reduce(this, "reduce", fn, args);
    },
    reduceRight(fn, ...args) {
      return reduce(this, "reduceRight", fn, args);
    },
    shift() {
      return noTracking(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(fn, thisArg) {
      return apply$1(this, "some", fn, thisArg, void 0, arguments);
    },
    splice(...args) {
      return noTracking(this, "splice", args);
    },
    toReversed() {
      return reactiveReadArray(this).toReversed();
    },
    toSorted(comparer) {
      return reactiveReadArray(this).toSorted(comparer);
    },
    toSpliced(...args) {
      return reactiveReadArray(this).toSpliced(...args);
    },
    unshift(...args) {
      return noTracking(this, "unshift", args);
    },
    values() {
      return iterator(this, "values", toReactive);
    }
  };
  function iterator(self2, method, wrapValue) {
    const arr = shallowReadArray(self2),
      iter = arr[method]();
    return arr !== self2 && !isShallow(self2) && (iter._next = iter.next, iter.next = () => {
      const result = iter._next();
      return result.value && (result.value = wrapValue(result.value)), result;
    }), iter;
  }
  const arrayProto = Array.prototype;
  function apply$1(self2, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self2),
      needsWrap = arr !== self2 && !isShallow(self2),
      methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
      const result2 = methodFn.apply(self2, args);
      return needsWrap ? toReactive(result2) : result2;
    }
    let wrappedFn = fn;
    arr !== self2 && (needsWrap ? wrappedFn = function (item, index) {
      return fn.call(this, toReactive(item), index, self2);
    } : fn.length > 2 && (wrappedFn = function (item, index) {
      return fn.call(this, item, index, self2);
    }));
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
  }
  function reduce(self2, method, fn, args) {
    const arr = shallowReadArray(self2);
    let wrappedFn = fn;
    return arr !== self2 && (isShallow(self2) ? fn.length > 3 && (wrappedFn = function (acc, item, index) {
      return fn.call(this, acc, item, index, self2);
    }) : wrappedFn = function (acc, item, index) {
      return fn.call(this, acc, toReactive(item), index, self2);
    }), arr[method](wrappedFn, ...args);
  }
  function searchProxy(self2, method, args) {
    const arr = toRaw(self2);
    track(arr, "iterate", ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    return (res === -1 || res === !1) && isProxy(args[0]) ? (args[0] = toRaw(args[0]), arr[method](...args)) : res;
  }
  function noTracking(self2, method, args = []) {
    pauseTracking(), startBatch();
    const res = toRaw(self2)[method].apply(self2, args);
    return endBatch(), resetTracking(), res;
  }
  const isNonTrackableKeys = /* @__PURE__ */makeMap("__proto__,__v_isRef,__isVue"),
    builtInSymbols = new Set(/* @__PURE__ */Object.getOwnPropertyNames(Symbol).filter(key => key !== "arguments" && key !== "caller").map(key => Symbol[key]).filter(isSymbol));
  function hasOwnProperty$1(key) {
    isSymbol(key) || (key = String(key));
    const obj = toRaw(this);
    return track(obj, "has", key), obj.hasOwnProperty(key);
  }
  class BaseReactiveHandler {
    constructor(_isReadonly = !1, _isShallow = !1) {
      this._isReadonly = _isReadonly, this._isShallow = _isShallow;
    }
    get(target, key, receiver) {
      if (key === "__v_skip") return target.__v_skip;
      const isReadonly2 = this._isReadonly,
        isShallow2 = this._isShallow;
      if (key === "__v_isReactive") return !isReadonly2;
      if (key === "__v_isReadonly") return isReadonly2;
      if (key === "__v_isShallow") return isShallow2;
      if (key === "__v_raw") return receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) ||
      // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver) ? target : void 0;
      const targetIsArray = isArray$1(target);
      if (!isReadonly2) {
        let fn;
        if (targetIsArray && (fn = arrayInstrumentations[key])) return fn;
        if (key === "hasOwnProperty") return hasOwnProperty$1;
      }
      const res = Reflect.get(target, key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(target) ? target : receiver);
      return (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) || (isReadonly2 || track(target, "get", key), isShallow2) ? res : isRef(res) ? targetIsArray && isIntegerKey(key) ? res : res.value : isObject$1(res) ? isReadonly2 ? readonly(res) : reactive(res) : res;
    }
  }
  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = !1) {
      super(!1, isShallow2);
    }
    set(target, key, value, receiver) {
      let oldValue = target[key];
      if (!this._isShallow) {
        const isOldValueReadonly = isReadonly(oldValue);
        if (!isShallow(value) && !isReadonly(value) && (oldValue = toRaw(oldValue), value = toRaw(value)), !isArray$1(target) && isRef(oldValue) && !isRef(value)) return isOldValueReadonly ? !1 : (oldValue.value = value, !0);
      }
      const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key),
        result = Reflect.set(target, key, value, isRef(target) ? target : receiver);
      return target === toRaw(receiver) && (hadKey ? hasChanged(value, oldValue) && trigger(target, "set", key, value) : trigger(target, "add", key, value)), result;
    }
    deleteProperty(target, key) {
      const hadKey = hasOwn$1(target, key);
      target[key];
      const result = Reflect.deleteProperty(target, key);
      return result && hadKey && trigger(target, "delete", key, void 0), result;
    }
    has(target, key) {
      const result = Reflect.has(target, key);
      return (!isSymbol(key) || !builtInSymbols.has(key)) && track(target, "has", key), result;
    }
    ownKeys(target) {
      return track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY), Reflect.ownKeys(target);
    }
  }
  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = !1) {
      super(!0, isShallow2);
    }
    set(target, key) {
      return !0;
    }
    deleteProperty(target, key) {
      return !0;
    }
  }
  const mutableHandlers = /* @__PURE__ */new MutableReactiveHandler(),
    readonlyHandlers = /* @__PURE__ */new ReadonlyReactiveHandler(),
    shallowReactiveHandlers = /* @__PURE__ */new MutableReactiveHandler(!0),
    shallowReadonlyHandlers = /* @__PURE__ */new ReadonlyReactiveHandler(!0),
    toShallow = value => value,
    getProto = v => Reflect.getPrototypeOf(v);
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function (...args) {
      const target = this.__v_raw,
        rawTarget = toRaw(target),
        targetIsMap = isMap(rawTarget),
        isPair = method === "entries" || method === Symbol.iterator && targetIsMap,
        isKeyOnly = method === "keys" && targetIsMap,
        innerIterator = target[method](...args),
        wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      return !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY), {
        // iterator protocol
        next() {
          const {
            value,
            done
          } = innerIterator.next();
          return done ? {
            value,
            done
          } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function (...args) {
      return type === "delete" ? !1 : type === "clear" ? void 0 : this;
    };
  }
  function createInstrumentations(readonly2, shallow) {
    const instrumentations = {
      get(key) {
        const target = this.__v_raw,
          rawTarget = toRaw(target),
          rawKey = toRaw(key);
        readonly2 || (hasChanged(key, rawKey) && track(rawTarget, "get", key), track(rawTarget, "get", rawKey));
        const {
            has
          } = getProto(rawTarget),
          wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) return wrap(target.get(key));
        if (has.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
        target !== rawTarget && target.get(key);
      },
      get size() {
        const target = this.__v_raw;
        return !readonly2 && track(toRaw(target), "iterate", ITERATE_KEY), Reflect.get(target, "size", target);
      },
      has(key) {
        const target = this.__v_raw,
          rawTarget = toRaw(target),
          rawKey = toRaw(key);
        return readonly2 || (hasChanged(key, rawKey) && track(rawTarget, "has", key), track(rawTarget, "has", rawKey)), key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
      },
      forEach(callback, thisArg) {
        const observed = this,
          target = observed.__v_raw,
          rawTarget = toRaw(target),
          wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        return !readonly2 && track(rawTarget, "iterate", ITERATE_KEY), target.forEach((value, key) => callback.call(thisArg, wrap(value), wrap(key), observed));
      }
    };
    return extend(instrumentations, readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        !shallow && !isShallow(value) && !isReadonly(value) && (value = toRaw(value));
        const target = toRaw(this);
        return getProto(target).has.call(target, value) || (target.add(value), trigger(target, "add", value, value)), this;
      },
      set(key, value) {
        !shallow && !isShallow(value) && !isReadonly(value) && (value = toRaw(value));
        const target = toRaw(this),
          {
            has,
            get: get2
          } = getProto(target);
        let hadKey = has.call(target, key);
        hadKey || (key = toRaw(key), hadKey = has.call(target, key));
        const oldValue = get2.call(target, key);
        return target.set(key, value), hadKey ? hasChanged(value, oldValue) && trigger(target, "set", key, value) : trigger(target, "add", key, value), this;
      },
      delete(key) {
        const target = toRaw(this),
          {
            has,
            get: get2
          } = getProto(target);
        let hadKey = has.call(target, key);
        hadKey || (key = toRaw(key), hadKey = has.call(target, key)), get2 && get2.call(target, key);
        const result = target.delete(key);
        return hadKey && trigger(target, "delete", key, void 0), result;
      },
      clear() {
        const target = toRaw(this),
          hadItems = target.size !== 0,
          result = target.clear();
        return hadItems && trigger(target, "clear", void 0, void 0), result;
      }
    }), ["keys", "values", "entries", Symbol.iterator].forEach(method => {
      instrumentations[method] = createIterableMethod(method, readonly2, shallow);
    }), instrumentations;
  }
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    return (target, key, receiver) => key === "__v_isReactive" ? !isReadonly2 : key === "__v_isReadonly" ? isReadonly2 : key === "__v_raw" ? target : Reflect.get(hasOwn$1(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  }
  const mutableCollectionHandlers = {
      get: /* @__PURE__ */createInstrumentationGetter(!1, !1)
    },
    shallowCollectionHandlers = {
      get: /* @__PURE__ */createInstrumentationGetter(!1, !0)
    },
    readonlyCollectionHandlers = {
      get: /* @__PURE__ */createInstrumentationGetter(!0, !1)
    },
    shallowReadonlyCollectionHandlers = {
      get: /* @__PURE__ */createInstrumentationGetter(!0, !0)
    },
    reactiveMap = /* @__PURE__ */new WeakMap(),
    shallowReactiveMap = /* @__PURE__ */new WeakMap(),
    readonlyMap = /* @__PURE__ */new WeakMap(),
    shallowReadonlyMap = /* @__PURE__ */new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value.__v_skip || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    return isReadonly(target) ? target : createReactiveObject(target, !1, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function shallowReactive(target) {
    return createReactiveObject(target, !1, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, !0, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function shallowReadonly(target) {
    return createReactiveObject(target, !0, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject$1(target) || target.__v_raw && !(isReadonly2 && target.__v_isReactive)) return target;
    const existingProxy = proxyMap.get(target);
    if (existingProxy) return existingProxy;
    const targetType = getTargetType(target);
    if (targetType === 0) return target;
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    return proxyMap.set(target, proxy), proxy;
  }
  function isReactive(value) {
    return isReadonly(value) ? isReactive(value.__v_raw) : !!(value && value.__v_isReactive);
  }
  function isReadonly(value) {
    return !!(value && value.__v_isReadonly);
  }
  function isShallow(value) {
    return !!(value && value.__v_isShallow);
  }
  function isProxy(value) {
    return value ? !!value.__v_raw : !1;
  }
  function toRaw(observed) {
    const raw = observed && observed.__v_raw;
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    return !hasOwn$1(value, "__v_skip") && Object.isExtensible(value) && def(value, "__v_skip", !0), value;
  }
  const toReactive = value => isObject$1(value) ? reactive(value) : value,
    toReadonly = value => isObject$1(value) ? readonly(value) : value;
  function isRef(r) {
    return r ? r.__v_isRef === !0 : !1;
  }
  function ref(value) {
    return createRef(value, !1);
  }
  function shallowRef(value) {
    return createRef(value, !0);
  }
  function createRef(rawValue, shallow) {
    return isRef(rawValue) ? rawValue : new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, isShallow2) {
      this.dep = new Dep(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = isShallow2 ? value : toRaw(value), this._value = isShallow2 ? value : toReactive(value), this.__v_isShallow = isShallow2;
    }
    get value() {
      return this.dep.track(), this._value;
    }
    set value(newValue) {
      const oldValue = this._rawValue,
        useDirectValue = this.__v_isShallow || isShallow(newValue) || isReadonly(newValue);
      newValue = useDirectValue ? newValue : toRaw(newValue), hasChanged(newValue, oldValue) && (this._rawValue = newValue, this._value = useDirectValue ? newValue : toReactive(newValue), this.dep.trigger());
    }
  }
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      return isRef(oldValue) && !isRef(value) ? (oldValue.value = value, !0) : Reflect.set(target, key, value, receiver);
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  function toRefs(object) {
    const ret = isArray$1(object) ? new Array(object.length) : {};
    for (const key in object) ret[key] = propertyToRef(object, key);
    return ret;
  }
  class ObjectRefImpl {
    constructor(_object, _key, _defaultValue) {
      this._object = _object, this._key = _key, this._defaultValue = _defaultValue, this.__v_isRef = !0, this._value = void 0;
    }
    get value() {
      const val = this._object[this._key];
      return this._value = val === void 0 ? this._defaultValue : val;
    }
    set value(newVal) {
      this._object[this._key] = newVal;
    }
    get dep() {
      return getDepFromReactive(toRaw(this._object), this._key);
    }
  }
  function propertyToRef(source, key, defaultValue) {
    const val = source[key];
    return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
  }
  class ComputedRefImpl {
    constructor(fn, setter, isSSR) {
      this.fn = fn, this.setter = setter, this._value = void 0, this.dep = new Dep(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = globalVersion - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !setter, this.isSSR = isSSR;
    }
    /**
     * @internal
     */
    notify() {
      if (this.flags |= 16, !(this.flags & 8) &&
      // avoid infinite self recursion
      activeSub !== this) return batch(this, !0), !0;
    }
    get value() {
      const link = this.dep.track();
      return refreshComputed(this), link && (link.version = this.dep.version), this._value;
    }
    set value(newValue) {
      this.setter && this.setter(newValue);
    }
  }
  function computed$1(getterOrOptions, debugOptions, isSSR = !1) {
    let getter, setter;
    return isFunction$1(getterOrOptions) ? getter = getterOrOptions : (getter = getterOrOptions.get, setter = getterOrOptions.set), new ComputedRefImpl(getter, setter, isSSR);
  }
  const INITIAL_WATCHER_VALUE = {},
    cleanupMap = /* @__PURE__ */new WeakMap();
  let activeWatcher;
  function onWatcherCleanup(cleanupFn, failSilently = !1, owner = activeWatcher) {
    if (owner) {
      let cleanups = cleanupMap.get(owner);
      cleanups || cleanupMap.set(owner, cleanups = []), cleanups.push(cleanupFn);
    }
  }
  function watch$1(source, cb, options = EMPTY_OBJ) {
    const {
        immediate,
        deep,
        once,
        scheduler,
        augmentJob,
        call
      } = options,
      reactiveGetter = source2 => deep ? source2 : isShallow(source2) || deep === !1 || deep === 0 ? traverse(source2, 1) : traverse(source2);
    let effect2,
      getter,
      cleanup,
      boundCleanup,
      forceTrigger = !1,
      isMultiSource = !1;
    if (isRef(source) ? (getter = () => source.value, forceTrigger = isShallow(source)) : isReactive(source) ? (getter = () => reactiveGetter(source), forceTrigger = !0) : isArray$1(source) ? (isMultiSource = !0, forceTrigger = source.some(s => isReactive(s) || isShallow(s)), getter = () => source.map(s => {
      if (isRef(s)) return s.value;
      if (isReactive(s)) return reactiveGetter(s);
      if (isFunction$1(s)) return call ? call(s, 2) : s();
    })) : isFunction$1(source) ? cb ? getter = call ? () => call(source, 2) : source : getter = () => {
      if (cleanup) {
        pauseTracking();
        try {
          cleanup();
        } finally {
          resetTracking();
        }
      }
      const currentEffect = activeWatcher;
      activeWatcher = effect2;
      try {
        return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
      } finally {
        activeWatcher = currentEffect;
      }
    } : getter = NOOP, cb && deep) {
      const baseGetter = getter,
        depth = deep === !0 ? 1 / 0 : deep;
      getter = () => traverse(baseGetter(), depth);
    }
    const scope = getCurrentScope(),
      watchHandle = () => {
        effect2.stop(), scope && scope.active && remove(scope.effects, effect2);
      };
    if (once && cb) {
      const _cb = cb;
      cb = (...args) => {
        _cb(...args), watchHandle();
      };
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = immediateFirstRun => {
      if (!(!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun)) if (cb) {
        const newValue = effect2.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
          cleanup && cleanup();
          const currentWatcher = activeWatcher;
          activeWatcher = effect2;
          try {
            const args = [newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue, boundCleanup];
            call ? call(cb, 3, args) :
            // @ts-expect-error
            cb(...args), oldValue = newValue;
          } finally {
            activeWatcher = currentWatcher;
          }
        }
      } else effect2.run();
    };
    return augmentJob && augmentJob(job), effect2 = new ReactiveEffect(getter), effect2.scheduler = scheduler ? () => scheduler(job, !1) : job, boundCleanup = fn => onWatcherCleanup(fn, !1, effect2), cleanup = effect2.onStop = () => {
      const cleanups = cleanupMap.get(effect2);
      if (cleanups) {
        if (call) call(cleanups, 4);else for (const cleanup2 of cleanups) cleanup2();
        cleanupMap.delete(effect2);
      }
    }, cb ? immediate ? job(!0) : oldValue = effect2.run() : scheduler ? scheduler(job.bind(null, !0), !0) : effect2.run(), watchHandle.pause = effect2.pause.bind(effect2), watchHandle.resume = effect2.resume.bind(effect2), watchHandle.stop = watchHandle, watchHandle;
  }
  function traverse(value, depth = 1 / 0, seen) {
    if (depth <= 0 || !isObject$1(value) || value.__v_skip || (seen = seen || /* @__PURE__ */new Set(), seen.has(value))) return value;
    if (seen.add(value), depth--, isRef(value)) traverse(value.value, depth, seen);else if (isArray$1(value)) for (let i = 0; i < value.length; i++) traverse(value[i], depth, seen);else if (isSet(value) || isMap(value)) value.forEach(v => {
      traverse(v, depth, seen);
    });else if (isPlainObject$2(value)) {
      for (const key in value) traverse(value[key], depth, seen);
      for (const key of Object.getOwnPropertySymbols(value)) Object.prototype.propertyIsEnumerable.call(value, key) && traverse(value[key], depth, seen);
    }
    return value;
  }
  /**
  * @vue/runtime-core v3.5.13
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  const stack = [];
  let isWarning = !1;
  function warn$1(msg, ...args) {
    if (isWarning) return;
    isWarning = !0, pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null,
      appWarnHandler = instance && instance.appContext.config.warnHandler,
      trace = getComponentTrace();
    if (appWarnHandler) callWithErrorHandling(appWarnHandler, instance, 11, [
    // eslint-disable-next-line no-restricted-syntax
    msg + args.map(a => {
      var _a, _b;
      return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
    }).join(""), instance && instance.proxy, trace.map(({
      vnode
    }) => `at <${formatComponentName(instance, vnode.type)}>`).join(`
`), trace]);else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      trace.length && warnArgs.push(`
`, ...formatTrace(trace)), console.warn(...warnArgs);
    }
    resetTracking(), isWarning = !1;
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) return [];
    const normalizedStack = [];
    for (; currentVNode;) {
      const last = normalizedStack[0];
      last && last.vnode === currentVNode ? last.recurseCount++ : normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    return trace.forEach((entry, i) => {
      logs.push(...(i === 0 ? [] : [`
`]), ...formatTraceEntry(entry));
    }), logs;
  }
  function formatTraceEntry({
    vnode,
    recurseCount
  }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : "",
      isRoot = vnode.component ? vnode.component.parent == null : !1,
      open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`,
      close = ">" + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props) {
    const res = [],
      keys = Object.keys(props);
    return keys.slice(0, 3).forEach(key => {
      res.push(...formatProp(key, props[key]));
    }), keys.length > 3 && res.push(" ..."), res;
  }
  function formatProp(key, value, raw) {
    return isString$1(value) ? (value = JSON.stringify(value), raw ? value : [`${key}=${value}`]) : typeof value == "number" || typeof value == "boolean" || value == null ? raw ? value : [`${key}=${value}`] : isRef(value) ? (value = formatProp(key, toRaw(value.value), !0), raw ? value : [`${key}=Ref<`, value, ">"]) : isFunction$1(value) ? [`${key}=fn${value.name ? `<${value.name}>` : ""}`] : (value = toRaw(value), raw ? value : [`${key}=`, value]);
  }
  function callWithErrorHandling(fn, instance, type, args) {
    try {
      return args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction$1(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      return res && isPromise$1(res) && res.catch(err => {
        handleError(err, instance, type);
      }), res;
    }
    if (isArray$1(fn)) {
      const values = [];
      for (let i = 0; i < fn.length; i++) values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      return values;
    }
  }
  function handleError(err, instance, type, throwInDev = !0) {
    const contextVNode = instance ? instance.vnode : null,
      {
        errorHandler,
        throwUnhandledErrorInProduction
      } = instance && instance.appContext.config || EMPTY_OBJ;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy,
        errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
      for (; cur;) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === !1) return;
        }
        cur = cur.parent;
      }
      if (errorHandler) {
        pauseTracking(), callWithErrorHandling(errorHandler, null, 10, [err, exposedInstance, errorInfo]), resetTracking();
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
  }
  function logError(err, type, contextVNode, throwInDev = !0, throwInProd = !1) {
    if (throwInProd) throw err;
    console.error(err);
  }
  const queue = [];
  let flushIndex = -1;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null,
    postFlushIndex = 0;
  const resolvedPromise = /* @__PURE__ */Promise.resolve();
  let currentFlushPromise = null;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id2) {
    let start2 = flushIndex + 1,
      end = queue.length;
    for (; start2 < end;) {
      const middle = start2 + end >>> 1,
        middleJob = queue[middle],
        middleJobId = getId(middleJob);
      middleJobId < id2 || middleJobId === id2 && middleJob.flags & 2 ? start2 = middle + 1 : end = middle;
    }
    return start2;
  }
  function queueJob(job) {
    if (!(job.flags & 1)) {
      const jobId = getId(job),
        lastJob = queue[queue.length - 1];
      !lastJob ||
      // fast path when the job id is larger than the tail
      !(job.flags & 2) && jobId >= getId(lastJob) ? queue.push(job) : queue.splice(findInsertionIndex(jobId), 0, job), job.flags |= 1, queueFlush();
    }
  }
  function queueFlush() {
    currentFlushPromise || (currentFlushPromise = resolvedPromise.then(flushJobs));
  }
  function queuePostFlushCb(cb) {
    isArray$1(cb) ? pendingPostFlushCbs.push(...cb) : activePostFlushCbs && cb.id === -1 ? activePostFlushCbs.splice(postFlushIndex + 1, 0, cb) : cb.flags & 1 || (pendingPostFlushCbs.push(cb), cb.flags |= 1), queueFlush();
  }
  function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
    for (; i < queue.length; i++) {
      const cb = queue[i];
      if (cb && cb.flags & 2) {
        if (instance && cb.id !== instance.uid) continue;
        queue.splice(i, 1), i--, cb.flags & 4 && (cb.flags &= -2), cb(), cb.flags & 4 || (cb.flags &= -2);
      }
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)].sort((a, b) => getId(a) - getId(b));
      if (pendingPostFlushCbs.length = 0, activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      for (activePostFlushCbs = deduped, postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        const cb = activePostFlushCbs[postFlushIndex];
        cb.flags & 4 && (cb.flags &= -2), cb.flags & 8 || cb(), cb.flags &= -2;
      }
      activePostFlushCbs = null, postFlushIndex = 0;
    }
  }
  const getId = job => job.id == null ? job.flags & 2 ? -1 : 1 / 0 : job.id;
  function flushJobs(seen) {
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        job && !(job.flags & 8) && (job.flags & 4 && (job.flags &= -2), callWithErrorHandling(job, job.i, job.i ? 15 : 14), job.flags & 4 || (job.flags &= -2));
      }
    } finally {
      for (; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        job && (job.flags &= -2);
      }
      flushIndex = -1, queue.length = 0, flushPostFlushCbs(), currentFlushPromise = null, (queue.length || pendingPostFlushCbs.length) && flushJobs();
    }
  }
  let currentRenderingInstance = null,
    currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    return currentRenderingInstance = instance, currentScopeId = instance && instance.type.__scopeId || null, prev;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx || fn._n) return fn;
    const renderFnWithContext = (...args) => {
      renderFnWithContext._d && setBlockTracking(-1);
      const prevInstance = setCurrentRenderingInstance(ctx);
      let res;
      try {
        res = fn(...args);
      } finally {
        setCurrentRenderingInstance(prevInstance), renderFnWithContext._d && setBlockTracking(1);
      }
      return res;
    };
    return renderFnWithContext._n = !0, renderFnWithContext._c = !0, renderFnWithContext._d = !0, renderFnWithContext;
  }
  function withDirectives(vnode, directives) {
    if (currentRenderingInstance === null) return vnode;
    const instance = getComponentPublicInstance(currentRenderingInstance),
      bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
      dir && (isFunction$1(dir) && (dir = {
        mounted: dir,
        updated: dir
      }), dir.deep && traverse(value), bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      }));
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs,
      oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
      const binding = bindings[i];
      oldBindings && (binding.oldValue = oldBindings[i].value);
      let hook = binding.dir[name];
      hook && (pauseTracking(), callWithAsyncErrorHandling(hook, instance, 8, [vnode.el, binding, vnode, prevVNode]), resetTracking());
    }
  }
  const TeleportEndKey = /* @__PURE__ */Symbol("_vte"),
    isTeleport = type => type.__isTeleport,
    isTeleportDisabled = props => props && (props.disabled || props.disabled === ""),
    isTeleportDeferred = props => props && (props.defer || props.defer === ""),
    isTargetSVG = target => typeof SVGElement < "u" && target instanceof SVGElement,
    isTargetMathML = target => typeof MathMLElement == "function" && target instanceof MathMLElement,
    resolveTarget = (props, select) => {
      const targetSelector = props && props.to;
      return isString$1(targetSelector) ? select ? select(targetSelector) : null : targetSelector;
    },
    TeleportImpl = {
      name: "Teleport",
      __isTeleport: !0,
      process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
        const {
            mc: mountChildren,
            pc: patchChildren,
            pbc: patchBlockChildren,
            o: {
              insert,
              querySelector,
              createText,
              createComment
            }
          } = internals,
          disabled = isTeleportDisabled(n2.props);
        let {
          shapeFlag,
          children,
          dynamicChildren
        } = n2;
        if (n1 == null) {
          const placeholder = n2.el = createText(""),
            mainAnchor = n2.anchor = createText("");
          insert(placeholder, container, anchor), insert(mainAnchor, container, anchor);
          const mount = (container2, anchor2) => {
              shapeFlag & 16 && (parentComponent && parentComponent.isCE && (parentComponent.ce._teleportTarget = container2), mountChildren(children, container2, anchor2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized));
            },
            mountToTarget = () => {
              const target = n2.target = resolveTarget(n2.props, querySelector),
                targetAnchor = prepareAnchor(target, n2, createText, insert);
              target && (namespace !== "svg" && isTargetSVG(target) ? namespace = "svg" : namespace !== "mathml" && isTargetMathML(target) && (namespace = "mathml"), disabled || (mount(target, targetAnchor), updateCssVars(n2, !1)));
            };
          disabled && (mount(container, mainAnchor), updateCssVars(n2, !0)), isTeleportDeferred(n2.props) ? queuePostRenderEffect(() => {
            mountToTarget(), n2.el.__isMounted = !0;
          }, parentSuspense) : mountToTarget();
        } else {
          if (isTeleportDeferred(n2.props) && !n1.el.__isMounted) {
            queuePostRenderEffect(() => {
              TeleportImpl.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals), delete n1.el.__isMounted;
            }, parentSuspense);
            return;
          }
          n2.el = n1.el, n2.targetStart = n1.targetStart;
          const mainAnchor = n2.anchor = n1.anchor,
            target = n2.target = n1.target,
            targetAnchor = n2.targetAnchor = n1.targetAnchor,
            wasDisabled = isTeleportDisabled(n1.props),
            currentContainer = wasDisabled ? container : target,
            currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
          if (namespace === "svg" || isTargetSVG(target) ? namespace = "svg" : (namespace === "mathml" || isTargetMathML(target)) && (namespace = "mathml"), dynamicChildren ? (patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, namespace, slotScopeIds), traverseStaticChildren(n1, n2, !0)) : optimized || patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, !1), disabled) wasDisabled ? n2.props && n1.props && n2.props.to !== n1.props.to && (n2.props.to = n1.props.to) : moveTeleport(n2, container, mainAnchor, internals, 1);else if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
            const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
            nextTarget && moveTeleport(n2, nextTarget, null, internals, 0);
          } else wasDisabled && moveTeleport(n2, target, targetAnchor, internals, 1);
          updateCssVars(n2, disabled);
        }
      },
      remove(vnode, parentComponent, parentSuspense, {
        um: unmount,
        o: {
          remove: hostRemove
        }
      }, doRemove) {
        const {
          shapeFlag,
          children,
          anchor,
          targetStart,
          targetAnchor,
          target,
          props
        } = vnode;
        if (target && (hostRemove(targetStart), hostRemove(targetAnchor)), doRemove && hostRemove(anchor), shapeFlag & 16) {
          const shouldRemove = doRemove || !isTeleportDisabled(props);
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            unmount(child, parentComponent, parentSuspense, shouldRemove, !!child.dynamicChildren);
          }
        }
      },
      move: moveTeleport,
      hydrate: hydrateTeleport
    };
  function moveTeleport(vnode, container, parentAnchor, {
    o: {
      insert
    },
    m: move
  }, moveType = 2) {
    moveType === 0 && insert(vnode.targetAnchor, container, parentAnchor);
    const {
        el,
        anchor,
        shapeFlag,
        children,
        props
      } = vnode,
      isReorder = moveType === 2;
    if (isReorder && insert(el, container, parentAnchor), (!isReorder || isTeleportDisabled(props)) && shapeFlag & 16) for (let i = 0; i < children.length; i++) move(children[i], container, parentAnchor, 2);
    isReorder && insert(anchor, container, parentAnchor);
  }
  function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
    o: {
      nextSibling,
      parentNode,
      querySelector,
      insert,
      createText
    }
  }, hydrateChildren) {
    const target = vnode.target = resolveTarget(vnode.props, querySelector);
    if (target) {
      const disabled = isTeleportDisabled(vnode.props),
        targetNode = target._lpa || target.firstChild;
      if (vnode.shapeFlag & 16) if (disabled) vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized), vnode.targetStart = targetNode, vnode.targetAnchor = targetNode && nextSibling(targetNode);else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        for (; targetAnchor;) {
          if (targetAnchor && targetAnchor.nodeType === 8) {
            if (targetAnchor.data === "teleport start anchor") vnode.targetStart = targetAnchor;else if (targetAnchor.data === "teleport anchor") {
              vnode.targetAnchor = targetAnchor, target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
              break;
            }
          }
          targetAnchor = nextSibling(targetAnchor);
        }
        vnode.targetAnchor || prepareAnchor(target, vnode, createText, insert), hydrateChildren(targetNode && nextSibling(targetNode), vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
      }
      updateCssVars(vnode, disabled);
    }
    return vnode.anchor && nextSibling(vnode.anchor);
  }
  const Teleport = TeleportImpl;
  function updateCssVars(vnode, isDisabled) {
    const ctx = vnode.ctx;
    if (ctx && ctx.ut) {
      let node, anchor;
      for (isDisabled ? (node = vnode.el, anchor = vnode.anchor) : (node = vnode.targetStart, anchor = vnode.targetAnchor); node && node !== anchor;) node.nodeType === 1 && node.setAttribute("data-v-owner", ctx.uid), node = node.nextSibling;
      ctx.ut();
    }
  }
  function prepareAnchor(target, vnode, createText, insert) {
    const targetStart = vnode.targetStart = createText(""),
      targetAnchor = vnode.targetAnchor = createText("");
    return targetStart[TeleportEndKey] = targetAnchor, target && (insert(targetStart, target), insert(targetAnchor, target)), targetAnchor;
  }
  function setTransitionHooks(vnode, hooks) {
    vnode.shapeFlag & 6 && vnode.component ? (vnode.transition = hooks, setTransitionHooks(vnode.component.subTree, hooks)) : vnode.shapeFlag & 128 ? (vnode.ssContent.transition = hooks.clone(vnode.ssContent), vnode.ssFallback.transition = hooks.clone(vnode.ssFallback)) : vnode.transition = hooks;
  }
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function defineComponent(options, extraOptions) {
    return isFunction$1(options) ?
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    extend({
      name: options.name
    }, extraOptions, {
      setup: options
    }) : options;
  }
  function markAsyncBoundary(instance) {
    instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
  }
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = !1) {
    if (isArray$1(rawRef)) {
      rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component && setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el,
      value = isUnmount ? null : refValue,
      {
        i: owner,
        r: ref3
      } = rawRef,
      oldRef = oldRawRef && oldRawRef.r,
      refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs,
      setupState = owner.setupState,
      rawSetupState = toRaw(setupState),
      canSetSetupRef = setupState === EMPTY_OBJ ? () => !1 : key => hasOwn$1(rawSetupState, key);
    if (oldRef != null && oldRef !== ref3 && (isString$1(oldRef) ? (refs[oldRef] = null, canSetSetupRef(oldRef) && (setupState[oldRef] = null)) : isRef(oldRef) && (oldRef.value = null)), isFunction$1(ref3)) callWithErrorHandling(ref3, owner, 12, [value, refs]);else {
      const _isString = isString$1(ref3),
        _isRef = isRef(ref3);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
            isUnmount ? isArray$1(existing) && remove(existing, refValue) : isArray$1(existing) ? existing.includes(refValue) || existing.push(refValue) : _isString ? (refs[ref3] = [refValue], canSetSetupRef(ref3) && (setupState[ref3] = refs[ref3])) : (ref3.value = [refValue], rawRef.k && (refs[rawRef.k] = ref3.value));
          } else _isString ? (refs[ref3] = value, canSetSetupRef(ref3) && (setupState[ref3] = value)) : _isRef && (ref3.value = value, rawRef.k && (refs[rawRef.k] = value));
        };
        value ? (doSet.id = -1, queuePostRenderEffect(doSet, parentSuspense)) : doSet();
      }
    }
  }
  getGlobalThis$1().requestIdleCallback, getGlobalThis$1().cancelIdleCallback;
  const isAsyncWrapper = i => !!i.type.__asyncLoader,
    isKeepAlive = vnode => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      for (; current;) {
        if (current.isDeactivated) return;
        current = current.parent;
      }
      return hook();
    });
    if (injectHook(type, wrappedHook, target), target) {
      let current = target.parent;
      for (; current && current.parent;) isKeepAlive(current.parent.vnode) && injectToKeepAliveRoot(wrappedHook, type, target, current), current = current.parent;
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(type, hook, keepAliveRoot, !0
    /* prepend */);
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = !1) {
    if (target) {
      const hooks = target[type] || (target[type] = []),
        wrappedHook = hook.__weh || (hook.__weh = (...args) => {
          pauseTracking();
          const reset = setCurrentInstance(target),
            res = callWithAsyncErrorHandling(hook, target, type, args);
          return reset(), resetTracking(), res;
        });
      return prepend ? hooks.unshift(wrappedHook) : hooks.push(wrappedHook), wrappedHook;
    }
  }
  const createHook = lifecycle => (hook, target = currentInstance) => {
      (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target);
    },
    onBeforeMount = createHook("bm"),
    onMounted = createHook("m"),
    onBeforeUpdate = createHook("bu"),
    onUpdated = createHook("u"),
    onBeforeUnmount = createHook("bum"),
    onUnmounted = createHook("um"),
    onServerPrefetch = createHook("sp"),
    onRenderTriggered = createHook("rtg"),
    onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  const NULL_DYNAMIC_COMPONENT = /* @__PURE__ */Symbol.for("v-ndc");
  function renderList(source, renderItem, cache2, index) {
    let ret;
    const cached = cache2 && cache2[index],
      sourceIsArray = isArray$1(source);
    if (sourceIsArray || isString$1(source)) {
      const sourceIsReactiveArray = sourceIsArray && isReactive(source);
      let needsWrap = !1;
      sourceIsReactiveArray && (needsWrap = !isShallow(source), source = shallowReadArray(source)), ret = new Array(source.length);
      for (let i = 0, l = source.length; i < l; i++) ret[i] = renderItem(needsWrap ? toReactive(source[i]) : source[i], i, void 0, cached && cached[i]);
    } else if (typeof source == "number") {
      ret = new Array(source);
      for (let i = 0; i < source; i++) ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    } else if (isObject$1(source)) {
      if (source[Symbol.iterator]) ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));else {
        const keys = Object.keys(source);
        ret = new Array(keys.length);
        for (let i = 0, l = keys.length; i < l; i++) {
          const key = keys[i];
          ret[i] = renderItem(source[key], key, i, cached && cached[i]);
        }
      }
    } else ret = [];
    return cache2 && (cache2[index] = ret), ret;
  }
  function renderSlot(slots, name, props = {}, fallback, noSlotted) {
    if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) return name !== "default" && (props.name = name), openBlock(), createBlock(Fragment, null, [createVNode("slot", props, fallback && fallback())], 64);
    let slot = slots[name];
    slot && slot._c && (slot._d = !1), openBlock();
    const validSlotContent = slot && ensureValidVNode(slot(props)),
      slotKey = props.key ||
      // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key,
      rendered = createBlock(Fragment, {
        key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + (
        // #7256 force differentiate fallback content from actual content
        !validSlotContent && fallback ? "_fb" : "")
      }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
    return !noSlotted && rendered.scopeId && (rendered.slotScopeIds = [rendered.scopeId + "-s"]), slot && slot._c && (slot._d = !0), rendered;
  }
  function ensureValidVNode(vnodes) {
    return vnodes.some(child => isVNode$1(child) ? !(child.type === Comment || child.type === Fragment && !ensureValidVNode(child.children)) : !0) ? vnodes : null;
  }
  const getPublicInstance = i => i ? isStatefulComponent(i) ? getComponentPublicInstance(i) : getPublicInstance(i.parent) : null,
    publicPropertiesMap =
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */
    extend(/* @__PURE__ */Object.create(null), {
      $: i => i,
      $el: i => i.vnode.el,
      $data: i => i.data,
      $props: i => i.props,
      $attrs: i => i.attrs,
      $slots: i => i.slots,
      $refs: i => i.refs,
      $parent: i => getPublicInstance(i.parent),
      $root: i => getPublicInstance(i.root),
      $host: i => i.ce,
      $emit: i => i.emit,
      $options: i => resolveMergedOptions(i),
      $forceUpdate: i => i.f || (i.f = () => {
        queueJob(i.update);
      }),
      $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy)),
      $watch: i => instanceWatch.bind(i)
    }),
    hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$1(state, key),
    PublicInstanceProxyHandlers = {
      get({
        _: instance
      }, key) {
        if (key === "__v_skip") return !0;
        const {
          ctx,
          setupState,
          data,
          props,
          accessCache,
          type,
          appContext
        } = instance;
        let normalizedProps;
        if (key[0] !== "$") {
          const n = accessCache[key];
          if (n !== void 0) switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          } else {
            if (hasSetupBinding(setupState, key)) return accessCache[key] = 1, setupState[key];
            if (data !== EMPTY_OBJ && hasOwn$1(data, key)) return accessCache[key] = 2, data[key];
            if (
            // only cache other properties when instance has declared (thus stable)
            // props
            (normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)) return accessCache[key] = 3, props[key];
            if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) return accessCache[key] = 4, ctx[key];
            shouldCacheAccess && (accessCache[key] = 0);
          }
        }
        const publicGetter = publicPropertiesMap[key];
        let cssModule, globalProperties;
        if (publicGetter) return key === "$attrs" && track(instance.attrs, "get", ""), publicGetter(instance);
        if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])) return cssModule;
        if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) return accessCache[key] = 4, ctx[key];
        if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)) return globalProperties[key];
      },
      set({
        _: instance
      }, key, value) {
        const {
          data,
          setupState,
          ctx
        } = instance;
        return hasSetupBinding(setupState, key) ? (setupState[key] = value, !0) : data !== EMPTY_OBJ && hasOwn$1(data, key) ? (data[key] = value, !0) : hasOwn$1(instance.props, key) || key[0] === "$" && key.slice(1) in instance ? !1 : (ctx[key] = value, !0);
      },
      has({
        _: {
          data,
          setupState,
          accessCache,
          ctx,
          appContext,
          propsOptions
        }
      }, key) {
        let normalizedProps;
        return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
      },
      defineProperty(target, key, descriptor) {
        return descriptor.get != null ? target._.accessCache[key] = 0 : hasOwn$1(descriptor, "value") && this.set(target, key, descriptor.value, null), Reflect.defineProperty(target, key, descriptor);
      }
    };
  function normalizePropsOrEmits(props) {
    return isArray$1(props) ? props.reduce((normalized, p2) => (normalized[p2] = null, normalized), {}) : props;
  }
  let shouldCacheAccess = !0;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance),
      publicThis = instance.proxy,
      ctx = instance.ctx;
    shouldCacheAccess = !1, options.beforeCreate && callHook(options.beforeCreate, instance, "bc");
    const {
      // state
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      // lifecycle
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      // public API
      expose,
      inheritAttrs,
      // assets
      components,
      directives,
      filters
    } = options;
    if (injectOptions && resolveInjections(injectOptions, ctx, null), methods) for (const key in methods) {
      const methodHandler = methods[key];
      isFunction$1(methodHandler) && (ctx[key] = methodHandler.bind(publicThis));
    }
    if (dataOptions) {
      const data = dataOptions.call(publicThis, publicThis);
      isObject$1(data) && (instance.data = reactive(data));
    }
    if (shouldCacheAccess = !0, computedOptions) for (const key in computedOptions) {
      const opt = computedOptions[key],
        get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP,
        set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP,
        c = computed({
          get: get2,
          set: set2
        });
      Object.defineProperty(ctx, key, {
        enumerable: !0,
        configurable: !0,
        get: () => c.value,
        set: v => c.value = v
      });
    }
    if (watchOptions) for (const key in watchOptions) createWatcher(watchOptions[key], ctx, publicThis, key);
    if (provideOptions) {
      const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach(key => {
        provide(key, provides[key]);
      });
    }
    created && callHook(created, instance, "c");
    function registerLifecycleHook(register, hook) {
      isArray$1(hook) ? hook.forEach(_hook => register(_hook.bind(publicThis))) : hook && register(hook.bind(publicThis));
    }
    if (registerLifecycleHook(onBeforeMount, beforeMount), registerLifecycleHook(onMounted, mounted), registerLifecycleHook(onBeforeUpdate, beforeUpdate), registerLifecycleHook(onUpdated, updated), registerLifecycleHook(onActivated, activated), registerLifecycleHook(onDeactivated, deactivated), registerLifecycleHook(onErrorCaptured, errorCaptured), registerLifecycleHook(onRenderTracked, renderTracked), registerLifecycleHook(onRenderTriggered, renderTriggered), registerLifecycleHook(onBeforeUnmount, beforeUnmount), registerLifecycleHook(onUnmounted, unmounted), registerLifecycleHook(onServerPrefetch, serverPrefetch), isArray$1(expose)) if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach(key => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: val => publicThis[key] = val
        });
      });
    } else instance.exposed || (instance.exposed = {});
    render && instance.render === NOOP && (instance.render = render), inheritAttrs != null && (instance.inheritAttrs = inheritAttrs), components && (instance.components = components), directives && (instance.directives = directives), serverPrefetch && markAsyncBoundary(instance);
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
    isArray$1(injectOptions) && (injectOptions = normalizeInject(injectOptions));
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      isObject$1(opt) ? "default" in opt ? injected = inject(opt.from || key, opt.default, !0) : injected = inject(opt.from || key) : injected = inject(opt), isRef(injected) ? Object.defineProperty(ctx, key, {
        enumerable: !0,
        configurable: !0,
        get: () => injected.value,
        set: v => injected.value = v
      }) : ctx[key] = injected;
    }
  }
  function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(isArray$1(hook) ? hook.map(h2 => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
  }
  function createWatcher(raw, ctx, publicThis, key) {
    let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString$1(raw)) {
      const handler = ctx[raw];
      isFunction$1(handler) && watch(getter, handler);
    } else if (isFunction$1(raw)) watch(getter, raw.bind(publicThis));else if (isObject$1(raw)) if (isArray$1(raw)) raw.forEach(r => createWatcher(r, ctx, publicThis, key));else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      isFunction$1(handler) && watch(getter, handler, raw);
    }
  }
  function resolveMergedOptions(instance) {
    const base = instance.type,
      {
        mixins,
        extends: extendsOptions
      } = base,
      {
        mixins: globalMixins,
        optionsCache: cache2,
        config: {
          optionMergeStrategies
        }
      } = instance.appContext,
      cached = cache2.get(base);
    let resolved;
    return cached ? resolved = cached : !globalMixins.length && !mixins && !extendsOptions ? resolved = base : (resolved = {}, globalMixins.length && globalMixins.forEach(m => mergeOptions(resolved, m, optionMergeStrategies, !0)), mergeOptions(resolved, base, optionMergeStrategies)), isObject$1(base) && cache2.set(base, resolved), resolved;
  }
  function mergeOptions(to, from, strats, asMixin = !1) {
    const {
      mixins,
      extends: extendsOptions
    } = from;
    extendsOptions && mergeOptions(to, extendsOptions, strats, !0), mixins && mixins.forEach(m => mergeOptions(to, m, strats, !0));
    for (const key in from) if (!(asMixin && key === "expose")) {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    return from ? to ? function () {
      return extend(isFunction$1(to) ? to.call(this, this) : to, isFunction$1(from) ? from.call(this, this) : from);
    } : from : to;
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray$1(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) res[raw[i]] = raw[i];
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(/* @__PURE__ */Object.create(null), to, from) : from;
  }
  function mergeEmitsOrPropsOptions(to, from) {
    return to ? isArray$1(to) && isArray$1(from) ? [... /* @__PURE__ */new Set([...to, ...from])] : extend(/* @__PURE__ */Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from ?? {})) : from;
  }
  function mergeWatchOptions(to, from) {
    if (!to) return from;
    if (!from) return to;
    const merged = extend(/* @__PURE__ */Object.create(null), to);
    for (const key in from) merged[key] = mergeAsArray(to[key], from[key]);
    return merged;
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: !1,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */Object.create(null),
      optionsCache: /* @__PURE__ */new WeakMap(),
      propsCache: /* @__PURE__ */new WeakMap(),
      emitsCache: /* @__PURE__ */new WeakMap()
    };
  }
  let uid$1 = 0;
  function createAppAPI(render, hydrate) {
    return function (rootComponent, rootProps = null) {
      isFunction$1(rootComponent) || (rootComponent = extend({}, rootComponent)), rootProps != null && !isObject$1(rootProps) && (rootProps = null);
      const context = createAppContext(),
        installedPlugins = /* @__PURE__ */new WeakSet(),
        pluginCleanupFns = [];
      let isMounted = !1;
      const app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {},
        use(plugin, ...options) {
          return installedPlugins.has(plugin) || (plugin && isFunction$1(plugin.install) ? (installedPlugins.add(plugin), plugin.install(app, ...options)) : isFunction$1(plugin) && (installedPlugins.add(plugin), plugin(app, ...options))), app;
        },
        mixin(mixin) {
          return context.mixins.includes(mixin) || context.mixins.push(mixin), app;
        },
        component(name, component) {
          return component ? (context.components[name] = component, app) : context.components[name];
        },
        directive(name, directive) {
          return directive ? (context.directives[name] = directive, app) : context.directives[name];
        },
        mount(rootContainer, isHydrate, namespace) {
          if (!isMounted) {
            const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
            return vnode.appContext = context, namespace === !0 ? namespace = "svg" : namespace === !1 && (namespace = void 0), render(vnode, rootContainer, namespace), isMounted = !0, app._container = rootContainer, rootContainer.__vue_app__ = app, getComponentPublicInstance(vnode.component);
          }
        },
        onUnmount(cleanupFn) {
          pluginCleanupFns.push(cleanupFn);
        },
        unmount() {
          isMounted && (callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16), render(null, app._container), delete app._container.__vue_app__);
        },
        provide(key, value) {
          return context.provides[key] = value, app;
        },
        runWithContext(fn) {
          const lastApp = currentApp;
          currentApp = app;
          try {
            return fn();
          } finally {
            currentApp = lastApp;
          }
        }
      };
      return app;
    };
  }
  let currentApp = null;
  function provide(key, value) {
    if (currentInstance) {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      parentProvides === provides && (provides = currentInstance.provides = Object.create(parentProvides)), provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = !1) {
    const instance = currentInstance || currentRenderingInstance;
    if (instance || currentApp) {
      const provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
      if (provides && key in provides) return provides[key];
      if (arguments.length > 1) return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    }
  }
  function hasInjectionContext() {
    return !!(currentInstance || currentRenderingInstance || currentApp);
  }
  const internalObjectProto = {},
    createInternalObject = () => Object.create(internalObjectProto),
    isInternalObject = obj => Object.getPrototypeOf(obj) === internalObjectProto;
  function initProps(instance, rawProps, isStateful, isSSR = !1) {
    const props = {},
      attrs = createInternalObject();
    instance.propsDefaults = /* @__PURE__ */Object.create(null), setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) key in props || (props[key] = void 0);
    isStateful ? instance.props = isSSR ? props : shallowReactive(props) : instance.type.props ? instance.props = props : instance.props = attrs, instance.attrs = attrs;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const {
        props,
        attrs,
        vnode: {
          patchFlag
        }
      } = instance,
      rawCurrentProps = toRaw(props),
      [options] = instance.propsOptions;
    let hasAttrsChanged = !1;
    if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0; i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          if (isEmitListener(instance.emitsOptions, key)) continue;
          const value = rawProps[key];
          if (options) {
            if (hasOwn$1(attrs, key)) value !== attrs[key] && (attrs[key] = value, hasAttrsChanged = !0);else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, !1);
            }
          } else value !== attrs[key] && (attrs[key] = value, hasAttrsChanged = !0);
        }
      }
    } else {
      setFullProps(instance, rawProps, props, attrs) && (hasAttrsChanged = !0);
      let kebabKey;
      for (const key in rawCurrentProps) (!rawProps ||
      // for camelCase
      !hasOwn$1(rawProps, key) && (
      // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      (kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) && (options ? rawPrevProps && (
      // for camelCase
      rawPrevProps[key] !== void 0 ||
      // for kebab-case
      rawPrevProps[kebabKey] !== void 0) && (props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, !0)) : delete props[key]);
      if (attrs !== rawCurrentProps) for (const key in attrs) (!rawProps || !hasOwn$1(rawProps, key)) && (delete attrs[key], hasAttrsChanged = !0);
    }
    hasAttrsChanged && trigger(instance.attrs, "set", "");
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = !1,
      rawCastValues;
    if (rawProps) for (let key in rawProps) {
      if (isReservedProp(key)) continue;
      const value = rawProps[key];
      let camelKey;
      options && hasOwn$1(options, camelKey = camelize(key)) ? !needCastKeys || !needCastKeys.includes(camelKey) ? props[camelKey] = value : (rawCastValues || (rawCastValues = {}))[camelKey] = value : isEmitListener(instance.emitsOptions, key) || (!(key in attrs) || value !== attrs[key]) && (attrs[key] = value, hasAttrsChanged = !0);
    }
    if (needCastKeys) {
      const rawCurrentProps = toRaw(props),
        castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0; i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$1(castValues, key));
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn$1(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction$1(defaultValue)) {
          const {
            propsDefaults
          } = instance;
          if (key in propsDefaults) value = propsDefaults[key];else {
            const reset = setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(null, props), reset();
          }
        } else value = defaultValue;
        instance.ce && instance.ce._setProp(key, value);
      }
      opt[0
      /* shouldCast */] && (isAbsent && !hasDefault ? value = !1 : opt[1
      /* shouldCastTrue */] && (value === "" || value === hyphenate(key)) && (value = !0));
    }
    return value;
  }
  const mixinPropsCache = /* @__PURE__ */new WeakMap();
  function normalizePropsOptions(comp, appContext, asMixin = !1) {
    const cache2 = asMixin ? mixinPropsCache : appContext.propsCache,
      cached = cache2.get(comp);
    if (cached) return cached;
    const raw = comp.props,
      normalized = {},
      needCastKeys = [];
    let hasExtends = !1;
    if (!isFunction$1(comp)) {
      const extendProps = raw2 => {
        hasExtends = !0;
        const [props, keys] = normalizePropsOptions(raw2, appContext, !0);
        extend(normalized, props), keys && needCastKeys.push(...keys);
      };
      !asMixin && appContext.mixins.length && appContext.mixins.forEach(extendProps), comp.extends && extendProps(comp.extends), comp.mixins && comp.mixins.forEach(extendProps);
    }
    if (!raw && !hasExtends) return isObject$1(comp) && cache2.set(comp, EMPTY_ARR), EMPTY_ARR;
    if (isArray$1(raw)) for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      validatePropName(normalizedKey) && (normalized[normalizedKey] = EMPTY_OBJ);
    } else if (raw) for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key],
          prop = normalized[normalizedKey] = isArray$1(opt) || isFunction$1(opt) ? {
            type: opt
          } : extend({}, opt),
          propType = prop.type;
        let shouldCast = !1,
          shouldCastTrue = !0;
        if (isArray$1(propType)) for (let index = 0; index < propType.length; ++index) {
          const type = propType[index],
            typeName = isFunction$1(type) && type.name;
          if (typeName === "Boolean") {
            shouldCast = !0;
            break;
          } else typeName === "String" && (shouldCastTrue = !1);
        } else shouldCast = isFunction$1(propType) && propType.name === "Boolean";
        prop[0
        /* shouldCast */] = shouldCast, prop[1
        /* shouldCastTrue */] = shouldCastTrue, (shouldCast || hasOwn$1(prop, "default")) && needCastKeys.push(normalizedKey);
      }
    }
    const res = [normalized, needCastKeys];
    return isObject$1(comp) && cache2.set(comp, res), res;
  }
  function validatePropName(key) {
    return key[0] !== "$" && !isReservedProp(key);
  }
  const isInternalKey = key => key[0] === "_" || key === "$stable",
    normalizeSlotValue = value => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)],
    normalizeSlot = (key, rawSlot, ctx) => {
      if (rawSlot._n) return rawSlot;
      const normalized = withCtx((...args) => normalizeSlotValue(rawSlot(...args)), ctx);
      return normalized._c = !1, normalized;
    },
    normalizeObjectSlots = (rawSlots, slots, instance) => {
      const ctx = rawSlots._ctx;
      for (const key in rawSlots) {
        if (isInternalKey(key)) continue;
        const value = rawSlots[key];
        if (isFunction$1(value)) slots[key] = normalizeSlot(key, value, ctx);else if (value != null) {
          const normalized = normalizeSlotValue(value);
          slots[key] = () => normalized;
        }
      }
    },
    normalizeVNodeSlots = (instance, children) => {
      const normalized = normalizeSlotValue(children);
      instance.slots.default = () => normalized;
    },
    assignSlots = (slots, children, optimized) => {
      for (const key in children) (optimized || key !== "_") && (slots[key] = children[key]);
    },
    initSlots = (instance, children, optimized) => {
      const slots = instance.slots = createInternalObject();
      if (instance.vnode.shapeFlag & 32) {
        const type = children._;
        type ? (assignSlots(slots, children, optimized), optimized && def(slots, "_", type, !0)) : normalizeObjectSlots(children, slots);
      } else children && normalizeVNodeSlots(instance, children);
    },
    updateSlots = (instance, children, optimized) => {
      const {
        vnode,
        slots
      } = instance;
      let needDeletionCheck = !0,
        deletionComparisonTarget = EMPTY_OBJ;
      if (vnode.shapeFlag & 32) {
        const type = children._;
        type ? optimized && type === 1 ? needDeletionCheck = !1 : assignSlots(slots, children, optimized) : (needDeletionCheck = !children.$stable, normalizeObjectSlots(children, slots)), deletionComparisonTarget = children;
      } else children && (normalizeVNodeSlots(instance, children), deletionComparisonTarget = {
        default: 1
      });
      if (needDeletionCheck) for (const key in slots) !isInternalKey(key) && deletionComparisonTarget[key] == null && delete slots[key];
    },
    queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    const target = getGlobalThis$1();
    target.__VUE__ = !0;
    const {
        insert: hostInsert,
        remove: hostRemove,
        patchProp: hostPatchProp,
        createElement: hostCreateElement,
        createText: hostCreateText,
        createComment: hostCreateComment,
        setText: hostSetText,
        setElementText: hostSetElementText,
        parentNode: hostParentNode,
        nextSibling: hostNextSibling,
        setScopeId: hostSetScopeId = NOOP,
        insertStaticContent: hostInsertStaticContent
      } = options,
      patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
        if (n1 === n2) return;
        n1 && !isSameVNodeType(n1, n2) && (anchor = getNextHostNode(n1), unmount(n1, parentComponent, parentSuspense, !0), n1 = null), n2.patchFlag === -2 && (optimized = !1, n2.dynamicChildren = null);
        const {
          type,
          ref: ref3,
          shapeFlag
        } = n2;
        switch (type) {
          case Text:
            processText(n1, n2, container, anchor);
            break;
          case Comment:
            processCommentNode(n1, n2, container, anchor);
            break;
          case Static:
            n1 == null && mountStaticNode(n2, container, anchor, namespace);
            break;
          case Fragment:
            processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            break;
          default:
            shapeFlag & 1 ? processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) : shapeFlag & 6 ? processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) : (shapeFlag & 64 || shapeFlag & 128) && type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
        }
        ref3 != null && parentComponent && setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      },
      processText = (n1, n2, container, anchor) => {
        if (n1 == null) hostInsert(n2.el = hostCreateText(n2.children), container, anchor);else {
          const el = n2.el = n1.el;
          n2.children !== n1.children && hostSetText(el, n2.children);
        }
      },
      processCommentNode = (n1, n2, container, anchor) => {
        n1 == null ? hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor) : n2.el = n1.el;
      },
      mountStaticNode = (n2, container, anchor, namespace) => {
        [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
      },
      moveStaticNode = ({
        el,
        anchor
      }, container, nextSibling) => {
        let next;
        for (; el && el !== anchor;) next = hostNextSibling(el), hostInsert(el, container, nextSibling), el = next;
        hostInsert(anchor, container, nextSibling);
      },
      removeStaticNode = ({
        el,
        anchor
      }) => {
        let next;
        for (; el && el !== anchor;) next = hostNextSibling(el), hostRemove(el), el = next;
        hostRemove(anchor);
      },
      processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        n2.type === "svg" ? namespace = "svg" : n2.type === "math" && (namespace = "mathml"), n1 == null ? mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) : patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      },
      mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        let el, vnodeHook;
        const {
          props,
          shapeFlag,
          transition,
          dirs
        } = vnode;
        if (el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props), shapeFlag & 8 ? hostSetElementText(el, vnode.children) : shapeFlag & 16 && mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized), dirs && invokeDirectiveHook(vnode, null, parentComponent, "created"), setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent), props) {
          for (const key in props) key !== "value" && !isReservedProp(key) && hostPatchProp(el, key, null, props[key], namespace, parentComponent);
          "value" in props && hostPatchProp(el, "value", null, props.value, namespace), (vnodeHook = props.onVnodeBeforeMount) && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
        const needCallTransitionHooks = needTransition(parentSuspense, transition);
        needCallTransitionHooks && transition.beforeEnter(el), hostInsert(el, container, anchor), ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) && queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode), needCallTransitionHooks && transition.enter(el), dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      },
      setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
        if (scopeId && hostSetScopeId(el, scopeId), slotScopeIds) for (let i = 0; i < slotScopeIds.length; i++) hostSetScopeId(el, slotScopeIds[i]);
        if (parentComponent) {
          let subTree = parentComponent.subTree;
          if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
            const parentVNode = parentComponent.vnode;
            setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
          }
        }
      },
      mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start2 = 0) => {
        for (let i = start2; i < children.length; i++) {
          const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
          patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        }
      },
      patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        const el = n2.el = n1.el;
        let {
          patchFlag,
          dynamicChildren,
          dirs
        } = n2;
        patchFlag |= n1.patchFlag & 16;
        const oldProps = n1.props || EMPTY_OBJ,
          newProps = n2.props || EMPTY_OBJ;
        let vnodeHook;
        if (parentComponent && toggleRecurse(parentComponent, !1), (vnodeHook = newProps.onVnodeBeforeUpdate) && invokeVNodeHook(vnodeHook, parentComponent, n2, n1), dirs && invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate"), parentComponent && toggleRecurse(parentComponent, !0), (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) && hostSetElementText(el, ""), dynamicChildren ? patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds) : optimized || patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, !1), patchFlag > 0) {
          if (patchFlag & 16) patchProps(el, oldProps, newProps, parentComponent, namespace);else if (patchFlag & 2 && oldProps.class !== newProps.class && hostPatchProp(el, "class", null, newProps.class, namespace), patchFlag & 4 && hostPatchProp(el, "style", oldProps.style, newProps.style, namespace), patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i],
                prev = oldProps[key],
                next = newProps[key];
              (next !== prev || key === "value") && hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
          patchFlag & 1 && n1.children !== n2.children && hostSetElementText(el, n2.children);
        } else !optimized && dynamicChildren == null && patchProps(el, oldProps, newProps, parentComponent, namespace);
        ((vnodeHook = newProps.onVnodeUpdated) || dirs) && queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1), dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      },
      patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
        for (let i = 0; i < newChildren.length; i++) {
          const oldVNode = oldChildren[i],
            newVNode = newChildren[i],
            container =
            // oldVNode may be an errored async setup() component inside Suspense
            // which will not have a mounted element
            oldVNode.el && (
            // - In the case of a Fragment, we need to provide the actual parent
            // of the Fragment itself so it can move its children.
            oldVNode.type === Fragment ||
            // - In the case of different nodes, there is going to be a replacement
            // which also requires the correct parent container
            !isSameVNodeType(oldVNode, newVNode) ||
            // - In the case of a component, it could contain anything.
            oldVNode.shapeFlag & 70) ? hostParentNode(oldVNode.el) :
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer;
          patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, !0);
        }
      },
      patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
        if (oldProps !== newProps) {
          if (oldProps !== EMPTY_OBJ) for (const key in oldProps) !isReservedProp(key) && !(key in newProps) && hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
          for (const key in newProps) {
            if (isReservedProp(key)) continue;
            const next = newProps[key],
              prev = oldProps[key];
            next !== prev && key !== "value" && hostPatchProp(el, key, prev, next, namespace, parentComponent);
          }
          "value" in newProps && hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
        }
      },
      processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText(""),
          fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
        let {
          patchFlag,
          dynamicChildren,
          slotScopeIds: fragmentSlotScopeIds
        } = n2;
        fragmentSlotScopeIds && (slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds), n1 == null ? (hostInsert(fragmentStartAnchor, container, anchor), hostInsert(fragmentEndAnchor, container, anchor), mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)) : patchFlag > 0 && patchFlag & 64 && dynamicChildren &&
        // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren ? (patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds),
        // #2080 if the stable fragment has a key, it's a <template v-for> that may
        //  get moved around. Make sure all root level vnodes inherit el.
        // #2134 or if it's a component root, it may also get moved around
        // as the component is being moved.
        (n2.key != null || parentComponent && n2 === parentComponent.subTree) && traverseStaticChildren(n1, n2, !0
        /* shallow */)) : patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      },
      processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        n2.slotScopeIds = slotScopeIds, n1 == null ? n2.shapeFlag & 512 ? parentComponent.ctx.activate(n2, container, anchor, namespace, optimized) : mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized) : updateComponent(n1, n2, optimized);
      },
      mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
        const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
        if (isKeepAlive(initialVNode) && (instance.ctx.renderer = internals), setupComponent(instance, !1, optimized), instance.asyncDep) {
          if (parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized), !initialVNode.el) {
            const placeholder = instance.subTree = createVNode(Comment);
            processCommentNode(null, placeholder, container, anchor);
          }
        } else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
      },
      updateComponent = (n1, n2, optimized) => {
        const instance = n2.component = n1.component;
        if (shouldUpdateComponent(n1, n2, optimized)) {
          if (instance.asyncDep && !instance.asyncResolved) {
            updateComponentPreRender(instance, n2, optimized);
            return;
          } else instance.next = n2, instance.update();
        } else n2.el = n1.el, instance.vnode = n2;
      },
      setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
        const componentUpdateFn = () => {
          if (instance.isMounted) {
            let {
              next,
              bu,
              u,
              parent,
              vnode
            } = instance;
            {
              const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
              if (nonHydratedAsyncRoot) {
                next && (next.el = vnode.el, updateComponentPreRender(instance, next, optimized)), nonHydratedAsyncRoot.asyncDep.then(() => {
                  instance.isUnmounted || componentUpdateFn();
                });
                return;
              }
            }
            let originNext = next,
              vnodeHook;
            toggleRecurse(instance, !1), next ? (next.el = vnode.el, updateComponentPreRender(instance, next, optimized)) : next = vnode, bu && invokeArrayFns(bu), (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) && invokeVNodeHook(vnodeHook, parent, next, vnode), toggleRecurse(instance, !0);
            const nextTree = renderComponentRoot(instance),
              prevTree = instance.subTree;
            instance.subTree = nextTree, patch(prevTree, nextTree,
            // parent may have changed if it's in a teleport
            hostParentNode(prevTree.el),
            // anchor may have changed if it's in a fragment
            getNextHostNode(prevTree), instance, parentSuspense, namespace), next.el = nextTree.el, originNext === null && updateHOCHostEl(instance, nextTree.el), u && queuePostRenderEffect(u, parentSuspense), (vnodeHook = next.props && next.props.onVnodeUpdated) && queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
          } else {
            let vnodeHook;
            const {
                el,
                props
              } = initialVNode,
              {
                bm,
                m,
                parent,
                root,
                type
              } = instance,
              isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
            toggleRecurse(instance, !1), bm && invokeArrayFns(bm), !isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount) && invokeVNodeHook(vnodeHook, parent, initialVNode), toggleRecurse(instance, !0);
            {
              root.ce && root.ce._injectChildStyle(type);
              const subTree = instance.subTree = renderComponentRoot(instance);
              patch(null, subTree, container, anchor, instance, parentSuspense, namespace), initialVNode.el = subTree.el;
            }
            if (m && queuePostRenderEffect(m, parentSuspense), !isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
              const scopedInitialVNode = initialVNode;
              queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
            }
            (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) && instance.a && queuePostRenderEffect(instance.a, parentSuspense), instance.isMounted = !0, initialVNode = container = anchor = null;
          }
        };
        instance.scope.on();
        const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
        instance.scope.off();
        const update = instance.update = effect2.run.bind(effect2),
          job = instance.job = effect2.runIfDirty.bind(effect2);
        job.i = instance, job.id = instance.uid, effect2.scheduler = () => queueJob(job), toggleRecurse(instance, !0), update();
      },
      updateComponentPreRender = (instance, nextVNode, optimized) => {
        nextVNode.component = instance;
        const prevProps = instance.vnode.props;
        instance.vnode = nextVNode, instance.next = null, updateProps(instance, nextVNode.props, prevProps, optimized), updateSlots(instance, nextVNode.children, optimized), pauseTracking(), flushPreFlushCbs(instance), resetTracking();
      },
      patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = !1) => {
        const c1 = n1 && n1.children,
          prevShapeFlag = n1 ? n1.shapeFlag : 0,
          c2 = n2.children,
          {
            patchFlag,
            shapeFlag
          } = n2;
        if (patchFlag > 0) {
          if (patchFlag & 128) {
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            return;
          } else if (patchFlag & 256) {
            patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            return;
          }
        }
        shapeFlag & 8 ? (prevShapeFlag & 16 && unmountChildren(c1, parentComponent, parentSuspense), c2 !== c1 && hostSetElementText(container, c2)) : prevShapeFlag & 16 ? shapeFlag & 16 ? patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) : unmountChildren(c1, parentComponent, parentSuspense, !0) : (prevShapeFlag & 8 && hostSetElementText(container, ""), shapeFlag & 16 && mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized));
      },
      patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        c1 = c1 || EMPTY_ARR, c2 = c2 || EMPTY_ARR;
        const oldLength = c1.length,
          newLength = c2.length,
          commonLength = Math.min(oldLength, newLength);
        let i;
        for (i = 0; i < commonLength; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        }
        oldLength > newLength ? unmountChildren(c1, parentComponent, parentSuspense, !0, !1, commonLength) : mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
      },
      patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1,
          e2 = l2 - 1;
        for (; i <= e1 && i <= e2;) {
          const n1 = c1[i],
            n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);else break;
          i++;
        }
        for (; i <= e1 && i <= e2;) {
          const n1 = c1[e1],
            n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
          if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);else break;
          e1--, e2--;
        }
        if (i > e1) {
          if (i <= e2) {
            const nextPos = e2 + 1,
              anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
            for (; i <= e2;) patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized), i++;
          }
        } else if (i > e2) for (; i <= e1;) unmount(c1[i], parentComponent, parentSuspense, !0), i++;else {
          const s1 = i,
            s2 = i,
            keyToNewIndexMap = /* @__PURE__ */new Map();
          for (i = s2; i <= e2; i++) {
            const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
            nextChild.key != null && keyToNewIndexMap.set(nextChild.key, i);
          }
          let j,
            patched = 0;
          const toBePatched = e2 - s2 + 1;
          let moved = !1,
            maxNewIndexSoFar = 0;
          const newIndexToOldIndexMap = new Array(toBePatched);
          for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
          for (i = s1; i <= e1; i++) {
            const prevChild = c1[i];
            if (patched >= toBePatched) {
              unmount(prevChild, parentComponent, parentSuspense, !0);
              continue;
            }
            let newIndex;
            if (prevChild.key != null) newIndex = keyToNewIndexMap.get(prevChild.key);else for (j = s2; j <= e2; j++) if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
            newIndex === void 0 ? unmount(prevChild, parentComponent, parentSuspense, !0) : (newIndexToOldIndexMap[newIndex - s2] = i + 1, newIndex >= maxNewIndexSoFar ? maxNewIndexSoFar = newIndex : moved = !0, patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized), patched++);
          }
          const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
          for (j = increasingNewIndexSequence.length - 1, i = toBePatched - 1; i >= 0; i--) {
            const nextIndex = s2 + i,
              nextChild = c2[nextIndex],
              anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
            newIndexToOldIndexMap[i] === 0 ? patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) : moved && (j < 0 || i !== increasingNewIndexSequence[j] ? move(nextChild, container, anchor, 2) : j--);
          }
        }
      },
      move = (vnode, container, anchor, moveType, parentSuspense = null) => {
        const {
          el,
          type,
          transition,
          children,
          shapeFlag
        } = vnode;
        if (shapeFlag & 6) {
          move(vnode.component.subTree, container, anchor, moveType);
          return;
        }
        if (shapeFlag & 128) {
          vnode.suspense.move(container, anchor, moveType);
          return;
        }
        if (shapeFlag & 64) {
          type.move(vnode, container, anchor, internals);
          return;
        }
        if (type === Fragment) {
          hostInsert(el, container, anchor);
          for (let i = 0; i < children.length; i++) move(children[i], container, anchor, moveType);
          hostInsert(vnode.anchor, container, anchor);
          return;
        }
        if (type === Static) {
          moveStaticNode(vnode, container, anchor);
          return;
        }
        if (moveType !== 2 && shapeFlag & 1 && transition) {
          if (moveType === 0) transition.beforeEnter(el), hostInsert(el, container, anchor), queuePostRenderEffect(() => transition.enter(el), parentSuspense);else {
            const {
                leave,
                delayLeave,
                afterLeave
              } = transition,
              remove22 = () => hostInsert(el, container, anchor),
              performLeave = () => {
                leave(el, () => {
                  remove22(), afterLeave && afterLeave();
                });
              };
            delayLeave ? delayLeave(el, remove22, performLeave) : performLeave();
          }
        } else hostInsert(el, container, anchor);
      },
      unmount = (vnode, parentComponent, parentSuspense, doRemove = !1, optimized = !1) => {
        const {
          type,
          props,
          ref: ref3,
          children,
          dynamicChildren,
          shapeFlag,
          patchFlag,
          dirs,
          cacheIndex
        } = vnode;
        if (patchFlag === -2 && (optimized = !1), ref3 != null && setRef(ref3, null, parentSuspense, vnode, !0), cacheIndex != null && (parentComponent.renderCache[cacheIndex] = void 0), shapeFlag & 256) {
          parentComponent.ctx.deactivate(vnode);
          return;
        }
        const shouldInvokeDirs = shapeFlag & 1 && dirs,
          shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
        let vnodeHook;
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount) && invokeVNodeHook(vnodeHook, parentComponent, vnode), shapeFlag & 6) unmountComponent(vnode.component, parentSuspense, doRemove);else {
          if (shapeFlag & 128) {
            vnode.suspense.unmount(parentSuspense, doRemove);
            return;
          }
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount"), shapeFlag & 64 ? vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove) : dynamicChildren &&
          // #5154
          // when v-once is used inside a block, setBlockTracking(-1) marks the
          // parent block with hasOnce: true
          // so that it doesn't take the fast path during unmount - otherwise
          // components nested in v-once are never unmounted.
          !dynamicChildren.hasOnce && (
          // #1153: fast path should not be taken for non-stable (v-for) fragments
          type !== Fragment || patchFlag > 0 && patchFlag & 64) ? unmountChildren(dynamicChildren, parentComponent, parentSuspense, !1, !0) : (type === Fragment && patchFlag & 384 || !optimized && shapeFlag & 16) && unmountChildren(children, parentComponent, parentSuspense), doRemove && remove2(vnode);
        }
        (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) && queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode), shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      },
      remove2 = vnode => {
        const {
          type,
          el,
          anchor,
          transition
        } = vnode;
        if (type === Fragment) {
          removeFragment(el, anchor);
          return;
        }
        if (type === Static) {
          removeStaticNode(vnode);
          return;
        }
        const performRemove = () => {
          hostRemove(el), transition && !transition.persisted && transition.afterLeave && transition.afterLeave();
        };
        if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
          const {
              leave,
              delayLeave
            } = transition,
            performLeave = () => leave(el, performRemove);
          delayLeave ? delayLeave(vnode.el, performRemove, performLeave) : performLeave();
        } else performRemove();
      },
      removeFragment = (cur, end) => {
        let next;
        for (; cur !== end;) next = hostNextSibling(cur), hostRemove(cur), cur = next;
        hostRemove(end);
      },
      unmountComponent = (instance, parentSuspense, doRemove) => {
        const {
          bum,
          scope,
          job,
          subTree,
          um,
          m,
          a
        } = instance;
        invalidateMount(m), invalidateMount(a), bum && invokeArrayFns(bum), scope.stop(), job && (job.flags |= 8, unmount(subTree, instance, parentSuspense, doRemove)), um && queuePostRenderEffect(um, parentSuspense), queuePostRenderEffect(() => {
          instance.isUnmounted = !0;
        }, parentSuspense), parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId && (parentSuspense.deps--, parentSuspense.deps === 0 && parentSuspense.resolve());
      },
      unmountChildren = (children, parentComponent, parentSuspense, doRemove = !1, optimized = !1, start2 = 0) => {
        for (let i = start2; i < children.length; i++) unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      },
      getNextHostNode = vnode => {
        if (vnode.shapeFlag & 6) return getNextHostNode(vnode.component.subTree);
        if (vnode.shapeFlag & 128) return vnode.suspense.next();
        const el = hostNextSibling(vnode.anchor || vnode.el),
          teleportEnd = el && el[TeleportEndKey];
        return teleportEnd ? hostNextSibling(teleportEnd) : el;
      };
    let isFlushing = !1;
    const render = (vnode, container, namespace) => {
        vnode == null ? container._vnode && unmount(container._vnode, null, null, !0) : patch(container._vnode || null, vnode, container, null, null, null, namespace), container._vnode = vnode, isFlushing || (isFlushing = !0, flushPreFlushCbs(), flushPostFlushCbs(), isFlushing = !1);
      },
      internals = {
        p: patch,
        um: unmount,
        m: move,
        r: remove2,
        mt: mountComponent,
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        n: getNextHostNode,
        o: options
      };
    return {
      render,
      hydrate: void 0,
      createApp: createAppAPI(render)
    };
  }
  function resolveChildrenNamespace({
    type,
    props
  }, currentNamespace) {
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
  }
  function toggleRecurse({
    effect: effect2,
    job
  }, allowed) {
    allowed ? (effect2.flags |= 32, job.flags |= 4) : (effect2.flags &= -33, job.flags &= -5);
  }
  function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
  }
  function traverseStaticChildren(n1, n2, shallow = !1) {
    const ch1 = n1.children,
      ch2 = n2.children;
    if (isArray$1(ch1) && isArray$1(ch2)) for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      c2.shapeFlag & 1 && !c2.dynamicChildren && ((c2.patchFlag <= 0 || c2.patchFlag === 32) && (c2 = ch2[i] = cloneIfMounted(ch2[i]), c2.el = c1.el), !shallow && c2.patchFlag !== -2 && traverseStaticChildren(c1, c2)), c2.type === Text && (c2.el = c1.el);
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice(),
      result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        if (j = result[result.length - 1], arr[j] < arrI) {
          p2[i] = j, result.push(i);
          continue;
        }
        for (u = 0, v = result.length - 1; u < v;) c = u + v >> 1, arr[result[c]] < arrI ? u = c + 1 : v = c;
        arrI < arr[result[u]] && (u > 0 && (p2[i] = result[u - 1]), result[u] = i);
      }
    }
    for (u = result.length, v = result[u - 1]; u-- > 0;) result[u] = v, v = p2[v];
    return result;
  }
  function locateNonHydratedAsyncRoot(instance) {
    const subComponent = instance.subTree.component;
    if (subComponent) return subComponent.asyncDep && !subComponent.asyncResolved ? subComponent : locateNonHydratedAsyncRoot(subComponent);
  }
  function invalidateMount(hooks) {
    if (hooks) for (let i = 0; i < hooks.length; i++) hooks[i].flags |= 8;
  }
  const ssrContextKey = /* @__PURE__ */Symbol.for("v-scx"),
    useSSRContext = () => inject(ssrContextKey);
  function watch(source, cb, options) {
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, options = EMPTY_OBJ) {
    const {
        immediate,
        deep,
        flush,
        once
      } = options,
      baseWatchOptions = extend({}, options),
      runsImmediately = cb && immediate || !cb && flush !== "post";
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else if (!runsImmediately) {
        const watchStopHandle = () => {};
        return watchStopHandle.stop = NOOP, watchStopHandle.resume = NOOP, watchStopHandle.pause = NOOP, watchStopHandle;
      }
    }
    const instance = currentInstance;
    baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
    let isPre = !1;
    flush === "post" ? baseWatchOptions.scheduler = job => {
      queuePostRenderEffect(job, instance && instance.suspense);
    } : flush !== "sync" && (isPre = !0, baseWatchOptions.scheduler = (job, isFirstRun) => {
      isFirstRun ? job() : queueJob(job);
    }), baseWatchOptions.augmentJob = job => {
      cb && (job.flags |= 4), isPre && (job.flags |= 2, instance && (job.id = instance.uid, job.i = instance));
    };
    const watchHandle = watch$1(source, cb, baseWatchOptions);
    return isInSSRComponentSetup && (ssrCleanup ? ssrCleanup.push(watchHandle) : runsImmediately && watchHandle()), watchHandle;
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy,
      getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    isFunction$1(value) ? cb = value : (cb = value.handler, options = value);
    const reset = setCurrentInstance(this),
      res = doWatch(getter, cb.bind(publicThis), options);
    return reset(), res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) cur = cur[segments[i]];
      return cur;
    };
  }
  const getModelModifiers = (props, modelName) => modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
  function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted) return;
    const props = instance.vnode.props || EMPTY_OBJ;
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:"),
      modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
    modifiers && (modifiers.trim && (args = rawArgs.map(a => isString$1(a) ? a.trim() : a)), modifiers.number && (args = rawArgs.map(looseToNumber)));
    let handlerName,
      handler = props[handlerName = toHandlerKey(event)] ||
      // also try camelCase event handler (#2249)
      props[handlerName = toHandlerKey(camelize(event))];
    !handler && isModelListener2 && (handler = props[handlerName = toHandlerKey(hyphenate(event))]), handler && callWithAsyncErrorHandling(handler, instance, 6, args);
    const onceHandler = props[handlerName + "Once"];
    if (onceHandler) {
      if (!instance.emitted) instance.emitted = {};else if (instance.emitted[handlerName]) return;
      instance.emitted[handlerName] = !0, callWithAsyncErrorHandling(onceHandler, instance, 6, args);
    }
  }
  function normalizeEmitsOptions(comp, appContext, asMixin = !1) {
    const cache2 = appContext.emitsCache,
      cached = cache2.get(comp);
    if (cached !== void 0) return cached;
    const raw = comp.emits;
    let normalized = {},
      hasExtends = !1;
    if (!isFunction$1(comp)) {
      const extendEmits = raw2 => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, !0);
        normalizedFromExtend && (hasExtends = !0, extend(normalized, normalizedFromExtend));
      };
      !asMixin && appContext.mixins.length && appContext.mixins.forEach(extendEmits), comp.extends && extendEmits(comp.extends), comp.mixins && comp.mixins.forEach(extendEmits);
    }
    return !raw && !hasExtends ? (isObject$1(comp) && cache2.set(comp, null), null) : (isArray$1(raw) ? raw.forEach(key => normalized[key] = null) : extend(normalized, raw), isObject$1(comp) && cache2.set(comp, normalized), normalized);
  }
  function isEmitListener(options, key) {
    return !options || !isOn(key) ? !1 : (key = key.slice(2).replace(/Once$/, ""), hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key));
  }
  function markAttrsAccessed() {}
  function renderComponentRoot(instance) {
    const {
        type: Component,
        vnode,
        proxy,
        withProxy,
        propsOptions: [propsOptions],
        slots,
        attrs,
        emit: emit2,
        render,
        renderCache,
        props,
        data,
        setupState,
        ctx,
        inheritAttrs
      } = instance,
      prev = setCurrentRenderingInstance(instance);
    let result, fallthroughAttrs;
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy,
          thisProxy = proxyToUse;
        result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx)), fallthroughAttrs = attrs;
      } else {
        const render2 = Component;
        result = normalizeVNode(render2.length > 1 ? render2(props, {
          attrs,
          slots,
          emit: emit2
        }) : render2(props, null)), fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0, handleError(err, instance, 1), result = createVNode(Comment);
    }
    let root = result;
    if (fallthroughAttrs && inheritAttrs !== !1) {
      const keys = Object.keys(fallthroughAttrs),
        {
          shapeFlag
        } = root;
      keys.length && shapeFlag & 7 && (propsOptions && keys.some(isModelListener) && (fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions)), root = cloneVNode(root, fallthroughAttrs, !1, !0));
    }
    return vnode.dirs && (root = cloneVNode(root, null, !1, !0), root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs), vnode.transition && setTransitionHooks(root, vnode.transition), result = root, setCurrentRenderingInstance(prev), result;
  }
  const getFunctionalFallthrough = attrs => {
      let res;
      for (const key in attrs) (key === "class" || key === "style" || isOn(key)) && ((res || (res = {}))[key] = attrs[key]);
      return res;
    },
    filterModelListeners = (attrs, props) => {
      const res = {};
      for (const key in attrs) (!isModelListener(key) || !(key.slice(9) in props)) && (res[key] = attrs[key]);
      return res;
    };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const {
        props: prevProps,
        children: prevChildren,
        component
      } = prevVNode,
      {
        props: nextProps,
        children: nextChildren,
        patchFlag
      } = nextVNode,
      emits = component.emitsOptions;
    if (nextVNode.dirs || nextVNode.transition) return !0;
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) return !0;
      if (patchFlag & 16) return prevProps ? hasPropsChanged(prevProps, nextProps, emits) : !!nextProps;
      if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) return !0;
        }
      }
    } else return (prevChildren || nextChildren) && (!nextChildren || !nextChildren.$stable) ? !0 : prevProps === nextProps ? !1 : prevProps ? nextProps ? hasPropsChanged(prevProps, nextProps, emits) : !0 : !!nextProps;
    return !1;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) return !0;
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) return !0;
    }
    return !1;
  }
  function updateHOCHostEl({
    vnode,
    parent
  }, el) {
    for (; parent;) {
      const root = parent.subTree;
      if (root.suspense && root.suspense.activeBranch === vnode && (root.el = vnode.el), root === vnode) (vnode = parent.vnode).el = el, parent = parent.parent;else break;
    }
  }
  const isSuspense = type => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    suspense && suspense.pendingBranch ? isArray$1(fn) ? suspense.effects.push(...fn) : suspense.effects.push(fn) : queuePostFlushCb(fn);
  }
  const Fragment = /* @__PURE__ */Symbol.for("v-fgt"),
    Text = /* @__PURE__ */Symbol.for("v-txt"),
    Comment = /* @__PURE__ */Symbol.for("v-cmt"),
    Static = /* @__PURE__ */Symbol.for("v-stc"),
    blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = !1) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop(), currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value, inVOnce = !1) {
    isBlockTreeEnabled += value, value < 0 && currentBlock && inVOnce && (currentBlock.hasOnce = !0);
  }
  function setupBlock(vnode) {
    return vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null, closeBlock(), isBlockTreeEnabled > 0 && currentBlock && currentBlock.push(vnode), vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, !0));
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, !0));
  }
  function isVNode$1(value) {
    return value ? value.__v_isVNode === !0 : !1;
  }
  function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key;
  }
  const normalizeKey = ({
      key
    }) => key ?? null,
    normalizeRef = ({
      ref: ref3,
      ref_key,
      ref_for
    }) => (typeof ref3 == "number" && (ref3 = "" + ref3), ref3 != null ? isString$1(ref3) || isRef(ref3) || isFunction$1(ref3) ? {
      i: currentRenderingInstance,
      r: ref3,
      k: ref_key,
      f: !!ref_for
    } : ref3 : null);
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = !1, needFullChildrenNormalization = !1) {
    const vnode = {
      __v_isVNode: !0,
      __v_skip: !0,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    return needFullChildrenNormalization ? (normalizeChildren(vnode, children), shapeFlag & 128 && type.normalize(vnode)) : children && (vnode.shapeFlag |= isString$1(children) ? 8 : 16), isBlockTreeEnabled > 0 &&
    // avoid a block node from tracking itself
    !isBlockNode &&
    // has current parent block
    currentBlock && (
    // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    vnode.patchFlag > 0 || shapeFlag & 6) &&
    // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32 && currentBlock.push(vnode), vnode;
  }
  const createVNode = _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = !1) {
    if ((!type || type === NULL_DYNAMIC_COMPONENT) && (type = Comment), isVNode$1(type)) {
      const cloned = cloneVNode(type, props, !0
      /* mergeRef: true */);
      return children && normalizeChildren(cloned, children), isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (cloned.shapeFlag & 6 ? currentBlock[currentBlock.indexOf(type)] = cloned : currentBlock.push(cloned)), cloned.patchFlag = -2, cloned;
    }
    if (isClassComponent(type) && (type = type.__vccOpts), props) {
      props = guardReactiveProps(props);
      let {
        class: klass,
        style
      } = props;
      klass && !isString$1(klass) && (props.class = normalizeClass(klass)), isObject$1(style) && (isProxy(style) && !isArray$1(style) && (style = extend({}, style)), props.style = normalizeStyle(style));
    }
    const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, !0);
  }
  function guardReactiveProps(props) {
    return props ? isProxy(props) || isInternalObject(props) ? extend({}, props) : props : null;
  }
  function cloneVNode(vnode, extraProps, mergeRef = !1, cloneTransition = !1) {
    const {
        props,
        ref: ref3,
        patchFlag,
        children,
        transition
      } = vnode,
      mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props,
      cloned = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: vnode.type,
        props: mergedProps,
        key: mergedProps && normalizeKey(mergedProps),
        ref: extraProps && extraProps.ref ?
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref3 ? isArray$1(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref3,
        scopeId: vnode.scopeId,
        slotScopeIds: vnode.slotScopeIds,
        children,
        target: vnode.target,
        targetStart: vnode.targetStart,
        targetAnchor: vnode.targetAnchor,
        staticCount: vnode.staticCount,
        shapeFlag: vnode.shapeFlag,
        // if the vnode is cloned with extra props, we can no longer assume its
        // existing patch flag to be reliable and need to add the FULL_PROPS flag.
        // note: preserve flag for fragments since they use the flag for children
        // fast paths only.
        patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
        dynamicProps: vnode.dynamicProps,
        dynamicChildren: vnode.dynamicChildren,
        appContext: vnode.appContext,
        dirs: vnode.dirs,
        transition,
        // These should technically only be non-null on mounted VNodes. However,
        // they *should* be copied for kept-alive vnodes. So we just always copy
        // them since them being non-null during a mount doesn't affect the logic as
        // they will simply be overwritten.
        component: vnode.component,
        suspense: vnode.suspense,
        ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
        ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
        el: vnode.el,
        anchor: vnode.anchor,
        ctx: vnode.ctx,
        ce: vnode.ce
      };
    return transition && cloneTransition && setTransitionHooks(cloned, transition.clone(cloned)), cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createCommentVNode(text = "", asBlock = !1) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
    return child == null || typeof child == "boolean" ? createVNode(Comment) : isArray$1(child) ? createVNode(Fragment, null,
    // #3666, avoid reference pollution when reusing vnode
    child.slice()) : isVNode$1(child) ? cloneIfMounted(child) : createVNode(Text, null, String(child));
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const {
      shapeFlag
    } = vnode;
    if (children == null) children = null;else if (isArray$1(children)) type = 16;else if (typeof children == "object") {
      if (shapeFlag & 65) {
        const slot = children.default;
        slot && (slot._c && (slot._d = !1), normalizeChildren(vnode, slot()), slot._c && (slot._d = !0));
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        !slotFlag && !isInternalObject(children) ? children._ctx = currentRenderingInstance : slotFlag === 3 && currentRenderingInstance && (currentRenderingInstance.slots._ === 1 ? children._ = 1 : (children._ = 2, vnode.patchFlag |= 1024));
      }
    } else isFunction$1(children) ? (children = {
      default: children,
      _ctx: currentRenderingInstance
    }, type = 32) : (children = String(children), shapeFlag & 64 ? (type = 16, children = [createTextVNode(children)]) : type = 8);
    vnode.children = children, vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) if (key === "class") ret.class !== toMerge.class && (ret.class = normalizeClass([ret.class, toMerge.class]));else if (key === "style") ret.style = normalizeStyle([ret.style, toMerge.style]);else if (isOn(key)) {
        const existing = ret[key],
          incoming = toMerge[key];
        incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming)) && (ret[key] = existing ? [].concat(existing, incoming) : incoming);
      } else key !== "" && (ret[key] = toMerge[key]);
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
  }
  const emptyAppContext = createAppContext();
  let uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type,
      appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext,
      instance = {
        uid: uid++,
        vnode,
        type,
        parent,
        appContext,
        root: null,
        // to be immediately set
        next: null,
        subTree: null,
        // will be set synchronously right after creation
        effect: null,
        update: null,
        // will be set synchronously right after creation
        job: null,
        scope: new EffectScope(!0
        /* detached */),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: parent ? parent.provides : Object.create(appContext.provides),
        ids: parent ? parent.ids : ["", 0, 0],
        accessCache: null,
        renderCache: [],
        // local resolved assets
        components: null,
        directives: null,
        // resolved props and emits options
        propsOptions: normalizePropsOptions(type, appContext),
        emitsOptions: normalizeEmitsOptions(type, appContext),
        // emit
        emit: null,
        // to be set immediately
        emitted: null,
        // props default value
        propsDefaults: EMPTY_OBJ,
        // inheritAttrs
        inheritAttrs: type.inheritAttrs,
        // state
        ctx: EMPTY_OBJ,
        data: EMPTY_OBJ,
        props: EMPTY_OBJ,
        attrs: EMPTY_OBJ,
        slots: EMPTY_OBJ,
        refs: EMPTY_OBJ,
        setupState: EMPTY_OBJ,
        setupContext: null,
        // suspense related
        suspense,
        suspenseId: suspense ? suspense.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        // lifecycle hooks
        // not using enums here because it results in computed properties
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
      };
    return instance.ctx = {
      _: instance
    }, instance.root = parent ? parent.root : instance, instance.emit = emit.bind(null, instance), vnode.ce && vnode.ce(instance), instance;
  }
  let currentInstance = null;
  const getCurrentInstance$1 = () => currentInstance || currentRenderingInstance;
  let internalSetCurrentInstance, setInSSRSetupState;
  {
    const g = getGlobalThis$1(),
      registerGlobalSetter = (key, setter) => {
        let setters;
        return (setters = g[key]) || (setters = g[key] = []), setters.push(setter), v => {
          setters.length > 1 ? setters.forEach(set2 => set2(v)) : setters[0](v);
        };
      };
    internalSetCurrentInstance = registerGlobalSetter("__VUE_INSTANCE_SETTERS__", v => currentInstance = v), setInSSRSetupState = registerGlobalSetter("__VUE_SSR_SETTERS__", v => isInSSRComponentSetup = v);
  }
  const setCurrentInstance = instance => {
      const prev = currentInstance;
      return internalSetCurrentInstance(instance), instance.scope.on(), () => {
        instance.scope.off(), internalSetCurrentInstance(prev);
      };
    },
    unsetCurrentInstance = () => {
      currentInstance && currentInstance.scope.off(), internalSetCurrentInstance(null);
    };
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = !1;
  function setupComponent(instance, isSSR = !1, optimized = !1) {
    isSSR && setInSSRSetupState(isSSR);
    const {
        props,
        children
      } = instance.vnode,
      isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR), initSlots(instance, children, optimized);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    return isSSR && setInSSRSetupState(!1), setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    instance.accessCache = /* @__PURE__ */Object.create(null), instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
    const {
      setup
    } = Component;
    if (setup) {
      pauseTracking();
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null,
        reset = setCurrentInstance(instance),
        setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]),
        isAsyncSetup = isPromise$1(setupResult);
      if (resetTracking(), reset(), (isAsyncSetup || instance.sp) && !isAsyncWrapper(instance) && markAsyncBoundary(instance), isAsyncSetup) {
        if (setupResult.then(unsetCurrentInstance, unsetCurrentInstance), isSSR) return setupResult.then(resolvedResult => {
          handleSetupResult(instance, resolvedResult);
        }).catch(e => {
          handleError(e, instance, 0);
        });
        instance.asyncDep = setupResult;
      } else handleSetupResult(instance, setupResult);
    } else finishComponentSetup(instance);
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    isFunction$1(setupResult) ? instance.type.__ssrInlineRender ? instance.ssrRender = setupResult : instance.render = setupResult : isObject$1(setupResult) && (instance.setupState = proxyRefs(setupResult)), finishComponentSetup(instance);
  }
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    instance.render || (instance.render = Component.render || NOOP);
    {
      const reset = setCurrentInstance(instance);
      pauseTracking();
      try {
        applyOptions(instance);
      } finally {
        resetTracking(), reset();
      }
    }
  }
  const attrsProxyHandlers = {
    get(target, key) {
      return track(target, "get", ""), target[key];
    }
  };
  function createSetupContext(instance) {
    const expose = exposed => {
      instance.exposed = exposed || {};
    };
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
  function getComponentPublicInstance(instance) {
    return instance.exposed ? instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) return target[key];
        if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    })) : instance.proxy;
  }
  const classifyRE = /(?:^|[-_])(\w)/g,
    classify = str => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = !0) {
    return isFunction$1(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component, isRoot = !1) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      match && (name = match[1]);
    }
    if (!name && instance && instance.parent) {
      const inferFromRegistry = registry => {
        for (const key in registry) if (registry[key] === Component) return key;
      };
      name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? "App" : "Anonymous";
  }
  function isClassComponent(value) {
    return isFunction$1(value) && "__vccOpts" in value;
  }
  const computed = (getterOrOptions, debugOptions) => computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  function h(type, propsOrChildren, children) {
    const l = arguments.length;
    return l === 2 ? isObject$1(propsOrChildren) && !isArray$1(propsOrChildren) ? isVNode$1(propsOrChildren) ? createVNode(type, null, [propsOrChildren]) : createVNode(type, propsOrChildren) : createVNode(type, null, propsOrChildren) : (l > 3 ? children = Array.prototype.slice.call(arguments, 2) : l === 3 && isVNode$1(children) && (children = [children]), createVNode(type, propsOrChildren, children));
  }
  const version = "3.5.13";
  /**
  * @vue/runtime-dom v3.5.13
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let policy;
  const tt = typeof window < "u" && window.trustedTypes;
  if (tt) try {
    policy = /* @__PURE__ */tt.createPolicy("vue", {
      createHTML: val => val
    });
  } catch {}
  const unsafeToTrustedHTML = policy ? val => policy.createHTML(val) : val => val,
    svgNS = "http://www.w3.org/2000/svg",
    mathmlNS = "http://www.w3.org/1998/Math/MathML",
    doc = typeof document < "u" ? document : null,
    templateContainer = doc && /* @__PURE__ */doc.createElement("template"),
    nodeOps = {
      insert: (child, parent, anchor) => {
        parent.insertBefore(child, anchor || null);
      },
      remove: child => {
        const parent = child.parentNode;
        parent && parent.removeChild(child);
      },
      createElement: (tag, namespace, is, props) => {
        const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, {
          is
        }) : doc.createElement(tag);
        return tag === "select" && props && props.multiple != null && el.setAttribute("multiple", props.multiple), el;
      },
      createText: text => doc.createTextNode(text),
      createComment: text => doc.createComment(text),
      setText: (node, text) => {
        node.nodeValue = text;
      },
      setElementText: (el, text) => {
        el.textContent = text;
      },
      parentNode: node => node.parentNode,
      nextSibling: node => node.nextSibling,
      querySelector: selector => doc.querySelector(selector),
      setScopeId(el, id2) {
        el.setAttribute(id2, "");
      },
      // __UNSAFE__
      // Reason: innerHTML.
      // Static content here can only come from compiled templates.
      // As long as the user only uses trusted templates, this is safe.
      insertStaticContent(content, parent, anchor, namespace, start2, end) {
        const before = anchor ? anchor.previousSibling : parent.lastChild;
        if (start2 && (start2 === end || start2.nextSibling)) for (; parent.insertBefore(start2.cloneNode(!0), anchor), !(start2 === end || !(start2 = start2.nextSibling)););else {
          templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
          const template = templateContainer.content;
          if (namespace === "svg" || namespace === "mathml") {
            const wrapper = template.firstChild;
            for (; wrapper.firstChild;) template.appendChild(wrapper.firstChild);
            template.removeChild(wrapper);
          }
          parent.insertBefore(template, anchor);
        }
        return [
        // first
        before ? before.nextSibling : parent.firstChild,
        // last
        anchor ? anchor.previousSibling : parent.lastChild];
      }
    },
    vtcKey = /* @__PURE__ */Symbol("_vtc");
  function patchClass(el, value, isSVG) {
    const transitionClasses = el[vtcKey];
    transitionClasses && (value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ")), value == null ? el.removeAttribute("class") : isSVG ? el.setAttribute("class", value) : el.className = value;
  }
  const vShowOriginalDisplay = /* @__PURE__ */Symbol("_vod"),
    vShowHidden = /* @__PURE__ */Symbol("_vsh"),
    CSS_VAR_TEXT = /* @__PURE__ */Symbol(""),
    displayRE = /(^|;)\s*display\s*:/;
  function patchStyle(el, prev, next) {
    const style = el.style,
      isCssString = isString$1(next);
    let hasControlledDisplay = !1;
    if (next && !isCssString) {
      if (prev) if (isString$1(prev)) for (const prevStyle of prev.split(";")) {
        const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
        next[key] == null && setStyle(style, key, "");
      } else for (const key in prev) next[key] == null && setStyle(style, key, "");
      for (const key in next) key === "display" && (hasControlledDisplay = !0), setStyle(style, key, next[key]);
    } else if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        cssVarText && (next += ";" + cssVarText), style.cssText = next, hasControlledDisplay = displayRE.test(next);
      }
    } else prev && el.removeAttribute("style");
    vShowOriginalDisplay in el && (el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "", el[vShowHidden] && (style.display = "none"));
  }
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray$1(val)) val.forEach(v => setStyle(style, name, v));else if (val == null && (val = ""), name.startsWith("--")) style.setProperty(name, val);else {
      const prefixed = autoPrefix(style, name);
      importantRE.test(val) ? style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important") : style[prefixed] = val;
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"],
    prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) return cached;
    let name = camelize(rawName);
    if (name !== "filter" && name in style) return prefixCache[rawName] = name;
    name = capitalize$1(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) return prefixCache[rawName] = prefixed;
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance, isBoolean2 = isSpecialBooleanAttr(key)) {
    isSVG && key.startsWith("xlink:") ? value == null ? el.removeAttributeNS(xlinkNS, key.slice(6, key.length)) : el.setAttributeNS(xlinkNS, key, value) : value == null || isBoolean2 && !includeBooleanAttr(value) ? el.removeAttribute(key) : el.setAttribute(key, isBoolean2 ? "" : isSymbol(value) ? String(value) : value);
  }
  function patchDOMProp(el, key, value, parentComponent, attrName) {
    if (key === "innerHTML" || key === "textContent") {
      value != null && (el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value);
      return;
    }
    const tag = el.tagName;
    if (key === "value" && tag !== "PROGRESS" &&
    // custom elements may use _value internally
    !tag.includes("-")) {
      const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value,
        newValue = value == null ?
        // #11647: value should be set as empty string for null and undefined,
        // but <input type="checkbox"> should be set as 'on'.
        el.type === "checkbox" ? "on" : "" : String(value);
      (oldValue !== newValue || !("_value" in el)) && (el.value = newValue), value == null && el.removeAttribute(key), el._value = value;
      return;
    }
    let needRemove = !1;
    if (value === "" || value == null) {
      const type = typeof el[key];
      type === "boolean" ? value = includeBooleanAttr(value) : value == null && type === "string" ? (value = "", needRemove = !0) : type === "number" && (value = 0, needRemove = !0);
    }
    try {
      el[key] = value;
    } catch {}
    needRemove && el.removeAttribute(attrName || key);
  }
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  const veiKey = /* @__PURE__ */Symbol("_vei");
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el[veiKey] || (el[veiKey] = {}),
      existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) existingInvoker.value = nextValue;else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(nextValue, instance);
        addEventListener(el, name, invoker, options);
      } else existingInvoker && (removeEventListener(el, name, existingInvoker, options), invokers[rawName] = void 0);
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      for (; m = name.match(optionsModifierRE);) name = name.slice(0, name.length - m[0].length), options[m[0].toLowerCase()] = !0;
    }
    return [name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2)), options];
  }
  let cachedNow = 0;
  const p = /* @__PURE__ */Promise.resolve(),
    getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker(initialValue, instance) {
    const invoker = e => {
      if (!e._vts) e._vts = Date.now();else if (e._vts <= invoker.attached) return;
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    };
    return invoker.value = initialValue, invoker.attached = getNow(), invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray$1(value)) {
      const originalStop = e.stopImmediatePropagation;
      return e.stopImmediatePropagation = () => {
        originalStop.call(e), e._stopped = !0;
      }, value.map(fn => e2 => !e2._stopped && fn && fn(e2));
    } else return value;
  }
  const isNativeOn = key => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 &&
    // lowercase letter
    key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123,
    patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
      const isSVG = namespace === "svg";
      key === "class" ? patchClass(el, nextValue, isSVG) : key === "style" ? patchStyle(el, prevValue, nextValue) : isOn(key) ? isModelListener(key) || patchEvent(el, key, prevValue, nextValue, parentComponent) : (key[0] === "." ? (key = key.slice(1), !0) : key[0] === "^" ? (key = key.slice(1), !1) : shouldSetAsProp(el, key, nextValue, isSVG)) ? (patchDOMProp(el, key, nextValue), !el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected") && patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value")) : /* #11081 force set props for possible async custom element */el._isVueCE && (/[A-Z]/.test(key) || !isString$1(nextValue)) ? patchDOMProp(el, camelize(key), nextValue, parentComponent, key) : (key === "true-value" ? el._trueValue = nextValue : key === "false-value" && (el._falseValue = nextValue), patchAttr(el, key, nextValue, isSVG));
    };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) return !!(key === "innerHTML" || key === "textContent" || key in el && isNativeOn(key) && isFunction$1(value));
    if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "form" || key === "list" && el.tagName === "INPUT" || key === "type" && el.tagName === "TEXTAREA") return !1;
    if (key === "width" || key === "height") {
      const tag = el.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") return !1;
    }
    return isNativeOn(key) && isString$1(value) ? !1 : key in el;
  }
  const getModelAssigner = vnode => {
    const fn = vnode.props["onUpdate:modelValue"] || !1;
    return isArray$1(fn) ? value => invokeArrayFns(fn, value) : fn;
  };
  function onCompositionStart(e) {
    e.target.composing = !0;
  }
  function onCompositionEnd(e) {
    const target = e.target;
    target.composing && (target.composing = !1, target.dispatchEvent(new Event("input")));
  }
  const assignKey = /* @__PURE__ */Symbol("_assign"),
    vModelText = {
      created(el, {
        modifiers: {
          lazy,
          trim,
          number: number2
        }
      }, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        const castToNumber = number2 || vnode.props && vnode.props.type === "number";
        addEventListener(el, lazy ? "change" : "input", e => {
          if (e.target.composing) return;
          let domValue = el.value;
          trim && (domValue = domValue.trim()), castToNumber && (domValue = looseToNumber(domValue)), el[assignKey](domValue);
        }), trim && addEventListener(el, "change", () => {
          el.value = el.value.trim();
        }), lazy || (addEventListener(el, "compositionstart", onCompositionStart), addEventListener(el, "compositionend", onCompositionEnd), addEventListener(el, "change", onCompositionEnd));
      },
      // set value on mounted so it's after min/max for type="range"
      mounted(el, {
        value
      }) {
        el.value = value ?? "";
      },
      beforeUpdate(el, {
        value,
        oldValue,
        modifiers: {
          lazy,
          trim,
          number: number2
        }
      }, vnode) {
        if (el[assignKey] = getModelAssigner(vnode), el.composing) return;
        const elValue = (number2 || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value,
          newValue = value ?? "";
        elValue !== newValue && (document.activeElement === el && el.type !== "range" && (lazy && value === oldValue || trim && el.value.trim() === newValue) || (el.value = newValue));
      }
    },
    vModelRadio = {
      created(el, {
        value
      }, vnode) {
        el.checked = looseEqual(value, vnode.props.value), el[assignKey] = getModelAssigner(vnode), addEventListener(el, "change", () => {
          el[assignKey](getValue(el));
        });
      },
      beforeUpdate(el, {
        value,
        oldValue
      }, vnode) {
        el[assignKey] = getModelAssigner(vnode), value !== oldValue && (el.checked = looseEqual(value, vnode.props.value));
      }
    };
  function getValue(el) {
    return "_value" in el ? el._value : el.value;
  }
  const systemModifiers = ["ctrl", "shift", "alt", "meta"],
    modifierGuards = {
      stop: e => e.stopPropagation(),
      prevent: e => e.preventDefault(),
      self: e => e.target !== e.currentTarget,
      ctrl: e => !e.ctrlKey,
      shift: e => !e.shiftKey,
      alt: e => !e.altKey,
      meta: e => !e.metaKey,
      left: e => "button" in e && e.button !== 0,
      middle: e => "button" in e && e.button !== 1,
      right: e => "button" in e && e.button !== 2,
      exact: (e, modifiers) => systemModifiers.some(m => e[`${m}Key`] && !modifiers.includes(m))
    },
    withModifiers = (fn, modifiers) => {
      const cache2 = fn._withMods || (fn._withMods = {}),
        cacheKey = modifiers.join(".");
      return cache2[cacheKey] || (cache2[cacheKey] = (event, ...args) => {
        for (let i = 0; i < modifiers.length; i++) {
          const guard = modifierGuards[modifiers[i]];
          if (guard && guard(event, modifiers)) return;
        }
        return fn(event, ...args);
      });
    },
    rendererOptions = /* @__PURE__ */extend({
      patchProp
    }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const createApp = (...args) => {
    const app = ensureRenderer().createApp(...args),
      {
        mount
      } = app;
    return app.mount = containerOrSelector => {
      const container = normalizeContainer(containerOrSelector);
      if (!container) return;
      const component = app._component;
      !isFunction$1(component) && !component.render && !component.template && (component.template = container.innerHTML), container.nodeType === 1 && (container.textContent = "");
      const proxy = mount(container, !1, resolveRootNamespace(container));
      return container instanceof Element && (container.removeAttribute("v-cloak"), container.setAttribute("data-v-app", "")), proxy;
    }, app;
  };
  function resolveRootNamespace(container) {
    if (container instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && container instanceof MathMLElement) return "mathml";
  }
  function normalizeContainer(container) {
    return isString$1(container) ? document.querySelector(container) : container;
  }
  /*!
   * pinia v2.3.1
   * (c) 2025 Eduardo San Martin Morote
   * @license MIT
   */
  let activePinia;
  const setActivePinia = pinia => activePinia = pinia,
    piniaSymbol = /* istanbul ignore next */
    /* @__PURE__ */Symbol();
  function isPlainObject$1(o) {
    return o && typeof o == "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON != "function";
  }
  var MutationType;
  (function (MutationType2) {
    MutationType2.direct = "direct", MutationType2.patchObject = "patch object", MutationType2.patchFunction = "patch function";
  })(MutationType || (MutationType = {}));
  function createPinia() {
    const scope = effectScope(!0),
      state = scope.run(() => ref({}));
    let _p = [],
      toBeInstalled = [];
    const pinia = markRaw({
      install(app) {
        setActivePinia(pinia), pinia._a = app, app.provide(piniaSymbol, pinia), app.config.globalProperties.$pinia = pinia, toBeInstalled.forEach(plugin => _p.push(plugin)), toBeInstalled = [];
      },
      use(plugin) {
        return this._a ? _p.push(plugin) : toBeInstalled.push(plugin), this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */new Map(),
      state
    });
    return pinia;
  }
  const noop = () => {};
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      idx > -1 && (subscriptions.splice(idx, 1), onCleanup());
    };
    return !detached && getCurrentScope() && onScopeDispose(removeSubscription), removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach(callback => {
      callback(...args);
    });
  }
  const fallbackRunWithContext = fn => fn(),
    ACTION_MARKER = /* @__PURE__ */Symbol(),
    ACTION_NAME = /* @__PURE__ */Symbol();
  function mergeReactiveObjects(target, patchToApply) {
    target instanceof Map && patchToApply instanceof Map ? patchToApply.forEach((value, key) => target.set(key, value)) : target instanceof Set && patchToApply instanceof Set && patchToApply.forEach(target.add, target);
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key)) continue;
      const subPatch = patchToApply[key],
        targetValue = target[key];
      isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch) ? target[key] = mergeReactiveObjects(targetValue, subPatch) : target[key] = subPatch;
    }
    return target;
  }
  const skipHydrateSymbol = /* istanbul ignore next */
  /* @__PURE__ */Symbol();
  function shouldHydrate(obj) {
    return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const {
    assign: assign$1
  } = Object;
  function isComputed(o) {
    return !!(isRef(o) && o.effect);
  }
  function createOptionsStore(id2, options, pinia, hot) {
    const {
        state,
        actions,
        getters
      } = options,
      initialState = pinia.state.value[id2];
    let store;
    function setup() {
      initialState || (pinia.state.value[id2] = state ? state() : {});
      const localState = toRefs(pinia.state.value[id2]);
      return assign$1(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => (computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id2);
        return getters[name].call(store2, store2);
      })), computedGetters), {}));
    }
    return store = createSetupStore(id2, setup, options, pinia, hot, !0), store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign$1({
        actions: {}
      }, options),
      $subscribeOptions = {
        deep: !0
      };
    let isListening,
      isSyncListening,
      subscriptions = [],
      actionSubscriptions = [],
      debuggerEvents;
    const initialState = pinia.state.value[$id];
    !isOptionsStore && !initialState && (pinia.state.value[$id] = {}), ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = !1, typeof partialStateOrMutator == "function" ? (partialStateOrMutator(pinia.state.value[$id]), subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      }) : (mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator), subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      });
      const myListenerId = activeListener = /* @__PURE__ */Symbol();
      nextTick().then(() => {
        activeListener === myListenerId && (isListening = !0);
      }), isSyncListening = !0, triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function () {
      const {
          state
        } = options,
        newState = state ? state() : {};
      this.$patch($state => {
        assign$1($state, newState);
      });
    } : (/* istanbul ignore next */
    noop);
    function $dispose() {
      scope.stop(), subscriptions = [], actionSubscriptions = [], pinia._s.delete($id);
    }
    const action = (fn, name = "") => {
        if (ACTION_MARKER in fn) return fn[ACTION_NAME] = name, fn;
        const wrappedAction = function () {
          setActivePinia(pinia);
          const args = Array.from(arguments),
            afterCallbackList = [],
            onErrorCallbackList = [];
          function after(callback) {
            afterCallbackList.push(callback);
          }
          function onError(callback) {
            onErrorCallbackList.push(callback);
          }
          triggerSubscriptions(actionSubscriptions, {
            args,
            name: wrappedAction[ACTION_NAME],
            store,
            after,
            onError
          });
          let ret;
          try {
            ret = fn.apply(this && this.$id === $id ? this : store, args);
          } catch (error) {
            throw triggerSubscriptions(onErrorCallbackList, error), error;
          }
          return ret instanceof Promise ? ret.then(value => (triggerSubscriptions(afterCallbackList, value), value)).catch(error => (triggerSubscriptions(onErrorCallbackList, error), Promise.reject(error))) : (triggerSubscriptions(afterCallbackList, ret), ret);
        };
        return wrappedAction[ACTION_MARKER] = !0, wrappedAction[ACTION_NAME] = name, wrappedAction;
      },
      partialStore = {
        _p: pinia,
        // _s: scope,
        $id,
        $onAction: addSubscription.bind(null, actionSubscriptions),
        $patch,
        $reset,
        $subscribe(callback, options2 = {}) {
          const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher()),
            stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], state => {
              (options2.flush === "sync" ? isSyncListening : isListening) && callback({
                storeId: $id,
                type: MutationType.direct,
                events: debuggerEvents
              }, state);
            }, assign$1({}, $subscribeOptions, options2)));
          return removeSubscription;
        },
        $dispose
      },
      store = reactive(partialStore);
    pinia._s.set($id, store);
    const setupStore = (pinia._a && pinia._a.runWithContext || fallbackRunWithContext)(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({
      action
    }))));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (isRef(prop) && !isComputed(prop) || isReactive(prop)) isOptionsStore || (initialState && shouldHydrate(prop) && (isRef(prop) ? prop.value = initialState[key] : mergeReactiveObjects(prop, initialState[key])), pinia.state.value[$id][key] = prop);else if (typeof prop == "function") {
        const actionValue = action(prop, key);
        setupStore[key] = actionValue, optionsForPlugin.actions[key] = prop;
      }
    }
    return assign$1(store, setupStore), assign$1(toRaw(store), setupStore), Object.defineProperty(store, "$state", {
      get: () => pinia.state.value[$id],
      set: state => {
        $patch($state => {
          assign$1($state, state);
        });
      }
    }), pinia._p.forEach(extender => {
      assign$1(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }), initialState && isOptionsStore && options.hydrate && options.hydrate(store.$state, initialState), isListening = !0, isSyncListening = !0, store;
  }
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function defineStore(idOrOptions, setup, setupOptions) {
    let id2, options;
    const isSetupStore = typeof setup == "function";
    typeof idOrOptions == "string" ? (id2 = idOrOptions, options = isSetupStore ? setupOptions : setup) : (options = idOrOptions, id2 = idOrOptions.id);
    function useStore(pinia, hot) {
      const hasContext = hasInjectionContext();
      return pinia =
      // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || (hasContext ? inject(piniaSymbol, null) : null), pinia && setActivePinia(pinia), pinia = activePinia, pinia._s.has(id2) || (isSetupStore ? createSetupStore(id2, setup, options, pinia) : createOptionsStore(id2, options, pinia)), pinia._s.get(id2);
    }
    return useStore.$id = id2, useStore;
  }
  const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
    suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
    JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
  function jsonParseTransform(key, value) {
    if (key === "__proto__" || key === "constructor" && value && typeof value == "object" && "prototype" in value) {
      warnKeyDropped(key);
      return;
    }
    return value;
  }
  function warnKeyDropped(key) {
    console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
  }
  function destr(value, options = {}) {
    if (typeof value != "string") return value;
    if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) return value.slice(1, -1);
    const _value = value.trim();
    if (_value.length <= 9) switch (_value.toLowerCase()) {
      case "true":
        return !0;
      case "false":
        return !1;
      case "undefined":
        return;
      case "null":
        return null;
      case "nan":
        return Number.NaN;
      case "infinity":
        return Number.POSITIVE_INFINITY;
      case "-infinity":
        return Number.NEGATIVE_INFINITY;
    }
    if (!JsonSigRx.test(value)) {
      if (options.strict) throw new SyntaxError("[destr] Invalid JSON");
      return value;
    }
    try {
      if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
        if (options.strict) throw new Error("[destr] Possible prototype pollution");
        return JSON.parse(value, jsonParseTransform);
      }
      return JSON.parse(value);
    } catch (error) {
      if (options.strict) throw error;
      return value;
    }
  }
  function get(obj, path) {
    if (obj == null) return;
    let value = obj;
    for (let i = 0; i < path.length; i++) {
      if (value == null || value[path[i]] == null) return;
      value = value[path[i]];
    }
    return value;
  }
  function set(obj, value, path) {
    if (path.length === 0) return value;
    const idx = path[0];
    return path.length > 1 && (value = set(typeof obj != "object" || obj === null || !Object.prototype.hasOwnProperty.call(obj, idx) ? Number.isInteger(Number(path[1])) ? [] : {} : obj[idx], value, Array.prototype.slice.call(path, 1))), Number.isInteger(Number(idx)) && Array.isArray(obj) ? obj.slice()[idx] : Object.assign({}, obj, {
      [idx]: value
    });
  }
  function unset(obj, path) {
    if (obj == null || path.length === 0) return obj;
    if (path.length === 1) {
      if (obj == null) return obj;
      if (Number.isInteger(path[0]) && Array.isArray(obj)) return Array.prototype.slice.call(obj, 0).splice(path[0], 1);
      const result = {};
      for (const p2 in obj) result[p2] = obj[p2];
      return delete result[path[0]], result;
    }
    if (obj[path[0]] == null) {
      if (Number.isInteger(path[0]) && Array.isArray(obj)) return Array.prototype.concat.call([], obj);
      const result = {};
      for (const p2 in obj) result[p2] = obj[p2];
      return result;
    }
    return set(obj, unset(obj[path[0]], Array.prototype.slice.call(path, 1)), [path[0]]);
  }
  function deepPickUnsafe(obj, paths) {
    return paths.map(p2 => p2.split(".")).map(p2 => [p2, get(obj, p2)]).filter(t => t[1] !== void 0).reduce((acc, cur) => set(acc, cur[1], cur[0]), {});
  }
  function deepOmitUnsafe(obj, paths) {
    return paths.map(p2 => p2.split(".")).reduce((acc, cur) => unset(acc, cur), obj);
  }
  function hydrateStore(store, {
    storage,
    serializer,
    key,
    debug,
    pick,
    omit,
    beforeHydrate,
    afterHydrate
  }, context, runHooks = !0) {
    try {
      runHooks && beforeHydrate?.(context);
      const fromStorage = storage.getItem(key);
      if (fromStorage) {
        const deserialized = serializer.deserialize(fromStorage),
          picked = pick ? deepPickUnsafe(deserialized, pick) : deserialized,
          omitted = omit ? deepOmitUnsafe(picked, omit) : picked;
        store.$patch(omitted);
      }
      runHooks && afterHydrate?.(context);
    } catch (error) {
      debug && console.error("[pinia-plugin-persistedstate]", error);
    }
  }
  function persistState(state, {
    storage,
    serializer,
    key,
    debug,
    pick,
    omit
  }) {
    try {
      const picked = pick ? deepPickUnsafe(state, pick) : state,
        omitted = omit ? deepOmitUnsafe(picked, omit) : picked,
        toStorage = serializer.serialize(omitted);
      storage.setItem(key, toStorage);
    } catch (error) {
      debug && console.error("[pinia-plugin-persistedstate]", error);
    }
  }
  function createPersistence(context, optionsParser, auto) {
    const {
      pinia,
      store,
      options: {
        persist = auto
      }
    } = context;
    if (!persist) return;
    if (!(store.$id in pinia.state.value)) {
      const originalStore = pinia._s.get(store.$id.replace("__hot:", ""));
      originalStore && Promise.resolve().then(() => originalStore.$persist());
      return;
    }
    const persistences = (Array.isArray(persist) ? persist : persist === !0 ? [{}] : [persist]).map(optionsParser);
    store.$hydrate = ({
      runHooks = !0
    } = {}) => {
      persistences.forEach(p2 => {
        hydrateStore(store, p2, context, runHooks);
      });
    }, store.$persist = () => {
      persistences.forEach(p2 => {
        persistState(store.$state, p2);
      });
    }, persistences.forEach(p2 => {
      hydrateStore(store, p2, context), store.$subscribe((_mutation, state) => persistState(state, p2), {
        detached: !0
      });
    });
  }
  function createPersistedState(options = {}) {
    return function (context) {
      createPersistence(context, p2 => ({
        key: (options.key ? options.key : x => x)(p2.key ?? context.store.$id),
        debug: p2.debug ?? options.debug ?? !1,
        serializer: p2.serializer ?? options.serializer ?? {
          serialize: data => JSON.stringify(data),
          deserialize: data => destr(data)
        },
        storage: p2.storage ?? options.storage ?? window.localStorage,
        beforeHydrate: p2.beforeHydrate,
        afterHydrate: p2.afterHydrate,
        pick: p2.pick,
        omit: p2.omit
      }), options.auto ?? !1);
    };
  }
  var src_default = createPersistedState();
  async function logAction() {}
  const ACTIONS = Object.freeze({
      ERROR: "error",
      DELETING: "deleting",
      ARCHIVING: "archiving"
    }),
    NOTIFICATION_TYPE = Object.freeze({
      SUCCESS: "success",
      ERROR: "error",
      NOTE: "note"
    }),
    BULK_STATUS = Object.freeze({
      IDLE: "idle",
      RUNNING: "running",
      COOLDOWN: "cooldown"
    }),
    ANNOUNCEMENT_PLACEMENT = Object.freeze({
      STRIP: "strip",
      // Окно по нажатию: у DAC — стена оценки или отзыва на «Удалить» и «Архив»
      CLICK: "click"
    }),
    STACK_FRAMES = 3,
    reported = /* @__PURE__ */new Set(),
    isNetworkError = error => error?.name === "TimeoutError" || error?.name === "AbortError" ? !0 : error?.name === "TypeError" && /^(Failed to fetch|NetworkError|Load failed)/.test(error.message ?? ""),
    isErrorLike = error => typeof error?.message == "string" && typeof error?.name == "string",
    getVersion$1 = () => {
      try {
        return chrome.runtime.getManifest().version;
      } catch {
        return null;
      }
    },
    isExtensionSource = filename => {
      try {
        return typeof filename == "string" && filename.startsWith(chrome.runtime.getURL(""));
      } catch {
        return !1;
      }
    },
    describeReason = reason => {
      var _a;
      return reason == null ? String(reason) : ((_a = reason.constructor) == null ? void 0 : _a.name) ?? typeof reason;
    },
    shortStack = error => typeof error?.stack == "string" ? error.stack.split(`
`).slice(1, STACK_FRAMES + 1).map(line => line.trim()).join(" | ") : null;
  function reportError(place, error) {
    console.warn("[DAC Free]", place, error ?? "");
  }
  function listenUncaughtErrors() {
    window.addEventListener("error", event => {
      isExtensionSource(event.filename) && reportError("uncaught.error", event.error ?? event.message, {
        source: `${event.filename}:${event.lineno}:${event.colno}`
      });
    }), window.addEventListener("unhandledrejection", event => {
      reportError("uncaught.rejection", event.reason, {
        // Причина бывает не Error, а пустой строкой или undefined — тогда только тип и подскажет источник
        reasonType: describeReason(event.reason)
      });
    });
  }
  function reportVueError(error, instance, info) {
    reportError("vue", error, {
      info
    }), console.error(error);
  }
  const useUserStore = /* @__PURE__ */defineStore("dac-user", () => ({
    initUser: async () => {}
  }));
  let idCounter = 0;
  const useNotificationsStore = /* @__PURE__ */defineStore("dac-notifications", () => {
    const notifications = ref([]),
      timers = /* @__PURE__ */new Map(),
      removeNotification = id2 => {
        var _a;
        clearTimeout((_a = timers.get(id2)) == null ? void 0 : _a.timeout), timers.delete(id2), notifications.value = notifications.value.filter(n => n.id !== id2);
      },
      syncTimer = notification2 => {
        const timer = timers.get(notification2.id);
        if (!timer) return;
        const shouldTick = !document.hidden && !notification2.isHovered;
        shouldTick && !timer.timeout ? (timer.startedAt = Date.now(), timer.timeout = setTimeout(() => removeNotification(notification2.id), timer.left)) : !shouldTick && timer.timeout && (clearTimeout(timer.timeout), timer.timeout = null, timer.left -= Date.now() - timer.startedAt), notification2.isTicking = shouldTick;
      };
    return document.addEventListener("visibilitychange", () => notifications.value.forEach(syncTimer)), {
      notifications,
      addNotification: (text, type = NOTIFICATION_TYPE.NOTE, ttl = 3e3, isClosable = !0) => {
        const id2 = ++idCounter;
        notifications.value.push({
          id: id2,
          text,
          type,
          isClosable,
          ttl,
          isHovered: !1,
          isTicking: !1
        }), ttl > 0 && (timers.set(id2, {
          timeout: null,
          left: ttl,
          startedAt: 0
        }), syncTimer(notifications.value.at(-1)));
      },
      removeNotification,
      setHovered: (notification2, isHovered) => {
        notification2.isHovered = isHovered, syncTimer(notification2);
      }
    };
  });
  /*!
    * shared v11.3.0
    * (c) 2026 kazuya kawaguchi
    * Released under the MIT License.
    */
  function warn(msg, err) {
    typeof console < "u" && (console.warn("[intlify] " + msg), err && console.warn(err.stack));
  }
  const inBrowser = typeof window < "u",
    makeSymbol = (name, shareable = !1) => shareable ? Symbol.for(name) : Symbol(name),
    generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({
      l: locale,
      k: key,
      s: source
    }),
    friendlyJSONstringify = json => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"),
    isNumber = val => typeof val == "number" && isFinite(val),
    isDate = val => toTypeString(val) === "[object Date]",
    isRegExp = val => toTypeString(val) === "[object RegExp]",
    isEmptyObject = val => isPlainObject(val) && Object.keys(val).length === 0,
    assign = Object.assign,
    _create = Object.create,
    create = (obj = null) => _create(obj);
  let _globalThis;
  const getGlobalThis = () => _globalThis || (_globalThis = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : create());
  function escapeHtml(rawText) {
    return rawText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
  }
  function escapeAttributeValue(value) {
    return value.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function sanitizeTranslatedHtml(html) {
    return html = html.replace(/(\w+)\s*=\s*"([^"]*)"/g, (_2, attrName, attrValue) => `${attrName}="${escapeAttributeValue(attrValue)}"`), html = html.replace(/(\w+)\s*=\s*'([^']*)'/g, (_2, attrName, attrValue) => `${attrName}='${escapeAttributeValue(attrValue)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(html) && (html = html.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi].forEach(pattern => {
      html = html.replace(pattern, "$1javascript&#58;");
    }), html;
  }
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  const isArray = Array.isArray,
    isFunction = val => typeof val == "function",
    isString = val => typeof val == "string",
    isBoolean = val => typeof val == "boolean",
    isObject = val => val !== null && typeof val == "object",
    isPromise = val => isObject(val) && isFunction(val.then) && isFunction(val.catch),
    objectToString = Object.prototype.toString,
    toTypeString = value => objectToString.call(value),
    isPlainObject = val => toTypeString(val) === "[object Object]",
    toDisplayString = val => val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
  function join(items, separator = "") {
    return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
  }
  const isNotObjectOrIsArray = val => !isObject(val) || isArray(val);
  function deepCopy(src, des) {
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) throw new Error("Invalid value");
    const stack2 = [{
      src,
      des
    }];
    for (; stack2.length;) {
      const {
        src: src2,
        des: des2
      } = stack2.pop();
      Object.keys(src2).forEach(key => {
        key !== "__proto__" && (isObject(src2[key]) && !isObject(des2[key]) && (des2[key] = Array.isArray(src2[key]) ? [] : create()), isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key]) ? des2[key] = src2[key] : stack2.push({
          src: src2[key],
          des: des2[key]
        }));
      });
    }
  }
  /*!
    * message-compiler v11.3.0
    * (c) 2026 kazuya kawaguchi
    * Released under the MIT License.
    */
  function createPosition(line, column, offset) {
    return {
      line,
      column,
      offset
    };
  }
  function createLocation(start2, end, source) {
    return {
      start: start2,
      end
    };
  }
  const CompileErrorCodes = {
      // tokenizer error codes
      EXPECTED_TOKEN: 1,
      INVALID_TOKEN_IN_PLACEHOLDER: 2,
      UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
      UNKNOWN_ESCAPE_SEQUENCE: 4,
      INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
      UNBALANCED_CLOSING_BRACE: 6,
      UNTERMINATED_CLOSING_BRACE: 7,
      EMPTY_PLACEHOLDER: 8,
      NOT_ALLOW_NEST_PLACEHOLDER: 9,
      INVALID_LINKED_FORMAT: 10,
      // parser error codes
      MUST_HAVE_MESSAGES_IN_PLURAL: 11,
      UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
      UNEXPECTED_EMPTY_LINKED_KEY: 13,
      UNEXPECTED_LEXICAL_ANALYSIS: 14
    },
    COMPILE_ERROR_CODES_EXTEND_POINT = 17;
  function createCompileError(code, loc, options = {}) {
    const {
        domain,
        messages,
        args
      } = options,
      msg = code,
      error = new SyntaxError(String(msg));
    return error.code = code, loc && (error.location = loc), error.domain = domain, error;
  }
  function defaultOnError(error) {
    throw error;
  }
  const CHAR_SP = " ",
    CHAR_CR = "\r",
    CHAR_LF = `
`,
    CHAR_LS = "\u2028",
    CHAR_PS = "\u2029";
  function createScanner(str) {
    const _buf = str;
    let _index = 0,
      _line = 1,
      _column = 1,
      _peekOffset = 0;
    const isCRLF = index2 => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF,
      isLF = index2 => _buf[index2] === CHAR_LF,
      isPS = index2 => _buf[index2] === CHAR_PS,
      isLS = index2 => _buf[index2] === CHAR_LS,
      isLineEnd = index2 => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2),
      index = () => _index,
      line = () => _line,
      column = () => _column,
      peekOffset = () => _peekOffset,
      charAt = offset => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset],
      currentChar = () => charAt(_index),
      currentPeek = () => charAt(_index + _peekOffset);
    function next() {
      return _peekOffset = 0, isLineEnd(_index) && (_line++, _column = 0), isCRLF(_index) && _index++, _index++, _column++, _buf[_index];
    }
    function peek() {
      return isCRLF(_index + _peekOffset) && _peekOffset++, _peekOffset++, _buf[_index + _peekOffset];
    }
    function reset() {
      _index = 0, _line = 1, _column = 1, _peekOffset = 0;
    }
    function resetPeek(offset = 0) {
      _peekOffset = offset;
    }
    function skipToPeek() {
      const target = _index + _peekOffset;
      for (; target !== _index;) next();
      _peekOffset = 0;
    }
    return {
      index,
      line,
      column,
      peekOffset,
      charAt,
      currentChar,
      currentPeek,
      next,
      peek,
      reset,
      resetPeek,
      skipToPeek
    };
  }
  const EOF = void 0,
    DOT = ".",
    LITERAL_DELIMITER = "'",
    ERROR_DOMAIN$3 = "tokenizer";
  function createTokenizer(source, options = {}) {
    const location2 = options.location !== !1,
      _scnr = createScanner(source),
      currentOffset = () => _scnr.index(),
      currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index()),
      _initLoc = currentPosition(),
      _initOffset = currentOffset(),
      _context = {
        currentType: 13,
        offset: _initOffset,
        startLoc: _initLoc,
        endLoc: _initLoc,
        lastType: 13,
        lastOffset: _initOffset,
        lastStartLoc: _initLoc,
        lastEndLoc: _initLoc,
        braceNest: 0,
        inLinked: !1,
        text: ""
      },
      context = () => _context,
      {
        onError
      } = options;
    function emitError(code, pos, offset, ...args) {
      const ctx = context();
      if (pos.column += offset, pos.offset += offset, onError) {
        const loc = location2 ? createLocation(ctx.startLoc, pos) : null,
          err = createCompileError(code, loc, {
            domain: ERROR_DOMAIN$3,
            args
          });
        onError(err);
      }
    }
    function getToken(context2, type, value) {
      context2.endLoc = currentPosition(), context2.currentType = type;
      const token = {
        type
      };
      return location2 && (token.loc = createLocation(context2.startLoc, context2.endLoc)), value != null && (token.value = value), token;
    }
    const getEndToken = context2 => getToken(context2, 13
    /* TokenTypes.EOF */);
    function eat(scnr, ch) {
      return scnr.currentChar() === ch ? (scnr.next(), ch) : (emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch), "");
    }
    function peekSpaces(scnr) {
      let buf = "";
      for (; scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF;) buf += scnr.currentPeek(), scnr.peek();
      return buf;
    }
    function skipSpaces(scnr) {
      const buf = peekSpaces(scnr);
      return scnr.skipToPeek(), buf;
    }
    function isIdentifierStart(ch) {
      if (ch === EOF) return !1;
      const cc = ch.charCodeAt(0);
      return cc >= 97 && cc <= 122 ||
      // a-z
      cc >= 65 && cc <= 90 ||
      // A-Z
      cc === 95;
    }
    function isNumberStart(ch) {
      if (ch === EOF) return !1;
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57;
    }
    function isNamedIdentifierStart(scnr, context2) {
      const {
        currentType
      } = context2;
      if (currentType !== 2) return !1;
      peekSpaces(scnr);
      const ret = isIdentifierStart(scnr.currentPeek());
      return scnr.resetPeek(), ret;
    }
    function isListIdentifierStart(scnr, context2) {
      const {
        currentType
      } = context2;
      if (currentType !== 2) return !1;
      peekSpaces(scnr);
      const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek(),
        ret = isNumberStart(ch);
      return scnr.resetPeek(), ret;
    }
    function isLiteralStart(scnr, context2) {
      const {
        currentType
      } = context2;
      if (currentType !== 2) return !1;
      peekSpaces(scnr);
      const ret = scnr.currentPeek() === LITERAL_DELIMITER;
      return scnr.resetPeek(), ret;
    }
    function isLinkedDotStart(scnr, context2) {
      const {
        currentType
      } = context2;
      if (currentType !== 7) return !1;
      peekSpaces(scnr);
      const ret = scnr.currentPeek() === ".";
      return scnr.resetPeek(), ret;
    }
    function isLinkedModifierStart(scnr, context2) {
      const {
        currentType
      } = context2;
      if (currentType !== 8) return !1;
      peekSpaces(scnr);
      const ret = isIdentifierStart(scnr.currentPeek());
      return scnr.resetPeek(), ret;
    }
    function isLinkedDelimiterStart(scnr, context2) {
      const {
        currentType
      } = context2;
      if (!(currentType === 7 || currentType === 11)) return !1;
      peekSpaces(scnr);
      const ret = scnr.currentPeek() === ":";
      return scnr.resetPeek(), ret;
    }
    function isLinkedReferStart(scnr, context2) {
      const {
        currentType
      } = context2;
      if (currentType !== 9) return !1;
      const fn = () => {
          const ch = scnr.currentPeek();
          return ch === "{" ? isIdentifierStart(scnr.peek()) : ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch ? !1 : ch === CHAR_LF ? (scnr.peek(), fn()) : isTextStart(scnr, !1);
        },
        ret = fn();
      return scnr.resetPeek(), ret;
    }
    function isPluralStart(scnr) {
      peekSpaces(scnr);
      const ret = scnr.currentPeek() === "|";
      return scnr.resetPeek(), ret;
    }
    function isTextStart(scnr, reset = !0) {
      const fn = (hasSpace = !1, prev = "") => {
          const ch = scnr.currentPeek();
          return ch === "{" || ch === "@" || !ch ? hasSpace : ch === "|" ? !(prev === CHAR_SP || prev === CHAR_LF) : ch === CHAR_SP ? (scnr.peek(), fn(!0, CHAR_SP)) : ch === CHAR_LF ? (scnr.peek(), fn(!0, CHAR_LF)) : !0;
        },
        ret = fn();
      return reset && scnr.resetPeek(), ret;
    }
    function takeChar(scnr, fn) {
      const ch = scnr.currentChar();
      return ch === EOF ? EOF : fn(ch) ? (scnr.next(), ch) : null;
    }
    function isIdentifier(ch) {
      const cc = ch.charCodeAt(0);
      return cc >= 97 && cc <= 122 ||
      // a-z
      cc >= 65 && cc <= 90 ||
      // A-Z
      cc >= 48 && cc <= 57 ||
      // 0-9
      cc === 95 ||
      // _
      cc === 36;
    }
    function takeIdentifierChar(scnr) {
      return takeChar(scnr, isIdentifier);
    }
    function isNamedIdentifier(ch) {
      const cc = ch.charCodeAt(0);
      return cc >= 97 && cc <= 122 ||
      // a-z
      cc >= 65 && cc <= 90 ||
      // A-Z
      cc >= 48 && cc <= 57 ||
      // 0-9
      cc === 95 ||
      // _
      cc === 36 ||
      // $
      cc === 45;
    }
    function takeNamedIdentifierChar(scnr) {
      return takeChar(scnr, isNamedIdentifier);
    }
    function isDigit(ch) {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57;
    }
    function takeDigit(scnr) {
      return takeChar(scnr, isDigit);
    }
    function isHexDigit(ch) {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57 ||
      // 0-9
      cc >= 65 && cc <= 70 ||
      // A-F
      cc >= 97 && cc <= 102;
    }
    function takeHexDigit(scnr) {
      return takeChar(scnr, isHexDigit);
    }
    function getDigits(scnr) {
      let ch = "",
        num = "";
      for (; ch = takeDigit(scnr);) num += ch;
      return num;
    }
    function readText(scnr) {
      let buf = "";
      for (;;) {
        const ch = scnr.currentChar();
        if (ch === "\\") {
          const nextCh = scnr.peek();
          nextCh === "{" || nextCh === "}" || nextCh === "@" || nextCh === "|" || nextCh === "\\" ? (buf += ch + nextCh, scnr.next(), scnr.next()) : (scnr.resetPeek(), buf += ch, scnr.next());
        } else {
          if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) break;
          if (ch === CHAR_SP || ch === CHAR_LF) {
            if (isTextStart(scnr)) buf += ch, scnr.next();else {
              if (isPluralStart(scnr)) break;
              buf += ch, scnr.next();
            }
          } else buf += ch, scnr.next();
        }
      }
      return buf;
    }
    function readNamedIdentifier(scnr) {
      skipSpaces(scnr);
      let ch = "",
        name = "";
      for (; ch = takeNamedIdentifierChar(scnr);) name += ch;
      const currentChar = scnr.currentChar();
      if (currentChar && currentChar !== "}" && currentChar !== EOF && currentChar !== CHAR_SP && currentChar !== CHAR_LF && currentChar !== "\u3000") {
        const invalidPart = readInvalidIdentifier(scnr);
        return emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, name + invalidPart), name + invalidPart;
      }
      return scnr.currentChar() === EOF && emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), name;
    }
    function readListIdentifier(scnr) {
      skipSpaces(scnr);
      let value = "";
      return scnr.currentChar() === "-" ? (scnr.next(), value += `-${getDigits(scnr)}`) : value += getDigits(scnr), scnr.currentChar() === EOF && emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), value;
    }
    function isLiteral2(ch) {
      return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
    }
    function readLiteral(scnr) {
      skipSpaces(scnr), eat(scnr, "'");
      let ch = "",
        literal = "";
      for (; ch = takeChar(scnr, isLiteral2);) ch === "\\" ? literal += readEscapeSequence(scnr) : literal += ch;
      const current = scnr.currentChar();
      return current === CHAR_LF || current === EOF ? (emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0), current === CHAR_LF && (scnr.next(), eat(scnr, "'")), literal) : (eat(scnr, "'"), literal);
    }
    function readEscapeSequence(scnr) {
      const ch = scnr.currentChar();
      switch (ch) {
        case "\\":
        case "'":
          return scnr.next(), `\\${ch}`;
        case "u":
          return readUnicodeEscapeSequence(scnr, ch, 4);
        case "U":
          return readUnicodeEscapeSequence(scnr, ch, 6);
        default:
          return emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch), "";
      }
    }
    function readUnicodeEscapeSequence(scnr, unicode, digits) {
      eat(scnr, unicode);
      let sequence = "";
      for (let i = 0; i < digits; i++) {
        const ch = takeHexDigit(scnr);
        if (!ch) {
          emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
          break;
        }
        sequence += ch;
      }
      return `\\${unicode}${sequence}`;
    }
    function isInvalidIdentifier(ch) {
      return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
    }
    function readInvalidIdentifier(scnr) {
      skipSpaces(scnr);
      let ch = "",
        identifiers = "";
      for (; ch = takeChar(scnr, isInvalidIdentifier);) identifiers += ch;
      return identifiers;
    }
    function readLinkedModifier(scnr) {
      let ch = "",
        name = "";
      for (; ch = takeIdentifierChar(scnr);) name += ch;
      return name;
    }
    function readLinkedRefer(scnr) {
      const fn = buf => {
        const ch = scnr.currentChar();
        return ch === "{" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch || ch === CHAR_SP ? buf : (buf += ch, scnr.next(), fn(buf));
      };
      return fn("");
    }
    function readPlural(scnr) {
      skipSpaces(scnr);
      const plural = eat(scnr, "|"
      /* TokenChars.Pipe */);
      return skipSpaces(scnr), plural;
    }
    function readTokenInPlaceholder(scnr, context2) {
      let token = null;
      switch (scnr.currentChar()) {
        case "{":
          return context2.braceNest >= 1 && emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0), scnr.next(), token = getToken(context2, 2, "{"
          /* TokenChars.BraceLeft */), skipSpaces(scnr), context2.braceNest++, token;
        case "}":
          return context2.braceNest > 0 && context2.currentType === 2 && emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0), scnr.next(), token = getToken(context2, 3, "}"
          /* TokenChars.BraceRight */), context2.braceNest--, context2.braceNest > 0 && skipSpaces(scnr), context2.inLinked && context2.braceNest === 0 && (context2.inLinked = !1), token;
        case "@":
          return context2.braceNest > 0 && emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), token = readTokenInLinked(scnr, context2) || getEndToken(context2), context2.braceNest = 0, token;
        default:
          {
            let validNamedIdentifier = !0,
              validListIdentifier = !0,
              validLiteral = !0;
            if (isPluralStart(scnr)) return context2.braceNest > 0 && emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), token = getToken(context2, 1, readPlural(scnr)), context2.braceNest = 0, context2.inLinked = !1, token;
            if (context2.braceNest > 0 && (context2.currentType === 4 || context2.currentType === 5 || context2.currentType === 6)) return emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), context2.braceNest = 0, readToken(scnr, context2);
            if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) return token = getToken(context2, 4, readNamedIdentifier(scnr)), skipSpaces(scnr), token;
            if (validListIdentifier = isListIdentifierStart(scnr, context2)) return token = getToken(context2, 5, readListIdentifier(scnr)), skipSpaces(scnr), token;
            if (validLiteral = isLiteralStart(scnr, context2)) return token = getToken(context2, 6, readLiteral(scnr)), skipSpaces(scnr), token;
            if (!validNamedIdentifier && !validListIdentifier && !validLiteral) return token = getToken(context2, 12, readInvalidIdentifier(scnr)), emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value), skipSpaces(scnr), token;
            break;
          }
      }
      return token;
    }
    function readTokenInLinked(scnr, context2) {
      const {
        currentType
      } = context2;
      let token = null;
      const ch = scnr.currentChar();
      switch ((currentType === 7 || currentType === 8 || currentType === 11 || currentType === 9) && (ch === CHAR_LF || ch === CHAR_SP) && emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0), ch) {
        case "@":
          return scnr.next(), token = getToken(context2, 7, "@"
          /* TokenChars.LinkedAlias */), context2.inLinked = !0, token;
        case ".":
          return skipSpaces(scnr), scnr.next(), getToken(context2, 8, "."
          /* TokenChars.LinkedDot */);
        case ":":
          return skipSpaces(scnr), scnr.next(), getToken(context2, 9, ":"
          /* TokenChars.LinkedDelimiter */);
        default:
          return isPluralStart(scnr) ? (token = getToken(context2, 1, readPlural(scnr)), context2.braceNest = 0, context2.inLinked = !1, token) : isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2) ? (skipSpaces(scnr), readTokenInLinked(scnr, context2)) : isLinkedModifierStart(scnr, context2) ? (skipSpaces(scnr), getToken(context2, 11, readLinkedModifier(scnr))) : isLinkedReferStart(scnr, context2) ? (skipSpaces(scnr), ch === "{" ? readTokenInPlaceholder(scnr, context2) || token : getToken(context2, 10, readLinkedRefer(scnr))) : (currentType === 7 && emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0), context2.braceNest = 0, context2.inLinked = !1, readToken(scnr, context2));
      }
    }
    function readToken(scnr, context2) {
      let token = {
        type: 13
        /* TokenTypes.EOF */
      };
      if (context2.braceNest > 0) return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      if (context2.inLinked) return readTokenInLinked(scnr, context2) || getEndToken(context2);
      switch (scnr.currentChar()) {
        case "{":
          return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
        case "}":
          return emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0), scnr.next(), getToken(context2, 3, "}"
          /* TokenChars.BraceRight */);
        case "@":
          return readTokenInLinked(scnr, context2) || getEndToken(context2);
        default:
          {
            if (isPluralStart(scnr)) return token = getToken(context2, 1, readPlural(scnr)), context2.braceNest = 0, context2.inLinked = !1, token;
            if (isTextStart(scnr)) return getToken(context2, 0, readText(scnr));
            break;
          }
      }
      return token;
    }
    function nextToken() {
      const {
        currentType,
        offset,
        startLoc,
        endLoc
      } = _context;
      return _context.lastType = currentType, _context.lastOffset = offset, _context.lastStartLoc = startLoc, _context.lastEndLoc = endLoc, _context.offset = currentOffset(), _context.startLoc = currentPosition(), _scnr.currentChar() === EOF ? getToken(_context, 13
      /* TokenTypes.EOF */) : readToken(_scnr, _context);
    }
    return {
      nextToken,
      currentOffset,
      currentPosition,
      context
    };
  }
  const ERROR_DOMAIN$2 = "parser",
    KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g,
    TEXT_ESCAPES = /\\([\\@{}|])/g;
  function fromTextEscapeSequence(_match, char) {
    return char;
  }
  function fromEscapeSequence(match, codePoint4, codePoint6) {
    switch (match) {
      case "\\\\":
        return "\\";
      // eslint-disable-next-line no-useless-escape
      case "\\'":
        return "'";
      default:
        {
          const codePoint = parseInt(codePoint4 || codePoint6, 16);
          return codePoint <= 55295 || codePoint >= 57344 ? String.fromCodePoint(codePoint) : "\uFFFD";
        }
    }
  }
  function createParser(options = {}) {
    const location2 = options.location !== !1,
      {
        onError
      } = options;
    function emitError(tokenzer, code, start2, offset, ...args) {
      const end = tokenzer.currentPosition();
      if (end.offset += offset, end.column += offset, onError) {
        const loc = location2 ? createLocation(start2, end) : null,
          err = createCompileError(code, loc, {
            domain: ERROR_DOMAIN$2,
            args
          });
        onError(err);
      }
    }
    function startNode(type, offset, loc) {
      const node = {
        type
      };
      return location2 && (node.start = offset, node.end = offset, node.loc = {
        start: loc,
        end: loc
      }), node;
    }
    function endNode(node, offset, pos, type) {
      location2 && (node.end = offset, node.loc && (node.loc.end = pos));
    }
    function parseText(tokenizer, value) {
      const context = tokenizer.context(),
        node = startNode(3, context.offset, context.startLoc);
      return node.value = value.replace(TEXT_ESCAPES, fromTextEscapeSequence), endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
    }
    function parseList(tokenizer, index) {
      const context = tokenizer.context(),
        {
          lastOffset: offset,
          lastStartLoc: loc
        } = context,
        node = startNode(5, offset, loc);
      return node.index = parseInt(index, 10), tokenizer.nextToken(), endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
    }
    function parseNamed(tokenizer, key) {
      const context = tokenizer.context(),
        {
          lastOffset: offset,
          lastStartLoc: loc
        } = context,
        node = startNode(4, offset, loc);
      return node.key = key, tokenizer.nextToken(), endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
    }
    function parseLiteral(tokenizer, value) {
      const context = tokenizer.context(),
        {
          lastOffset: offset,
          lastStartLoc: loc
        } = context,
        node = startNode(9, offset, loc);
      return node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence), tokenizer.nextToken(), endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
    }
    function parseLinkedModifier(tokenizer) {
      const token = tokenizer.nextToken(),
        context = tokenizer.context(),
        {
          lastOffset: offset,
          lastStartLoc: loc
        } = context,
        node = startNode(8, offset, loc);
      return token.type !== 11 ? (emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0), node.value = "", endNode(node, offset, loc), {
        nextConsumeToken: token,
        node
      }) : (token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), node.value = token.value || "", endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), {
        node
      });
    }
    function parseLinkedKey(tokenizer, value) {
      const context = tokenizer.context(),
        node = startNode(7, context.offset, context.startLoc);
      return node.value = value, endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
    }
    function parseLinked(tokenizer) {
      const context = tokenizer.context(),
        linkedNode = startNode(6, context.offset, context.startLoc);
      let token = tokenizer.nextToken();
      if (token.type === 8) {
        const parsed = parseLinkedModifier(tokenizer);
        linkedNode.modifier = parsed.node, token = parsed.nextConsumeToken || tokenizer.nextToken();
      }
      switch (token.type !== 9 && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), token = tokenizer.nextToken(), token.type === 2 && (token = tokenizer.nextToken()), token.type) {
        case 10:
          token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
          break;
        case 4:
          token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), linkedNode.key = parseNamed(tokenizer, token.value || "");
          break;
        case 5:
          token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), linkedNode.key = parseList(tokenizer, token.value || "");
          break;
        case 6:
          token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), linkedNode.key = parseLiteral(tokenizer, token.value || "");
          break;
        default:
          {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
            const nextContext = tokenizer.context(),
              emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
            return emptyLinkedKeyNode.value = "", endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc), linkedNode.key = emptyLinkedKeyNode, endNode(linkedNode, nextContext.offset, nextContext.startLoc), {
              nextConsumeToken: token,
              node: linkedNode
            };
          }
      }
      return endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition()), {
        node: linkedNode
      };
    }
    function parseMessage(tokenizer) {
      const context = tokenizer.context(),
        startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset,
        startLoc = context.currentType === 1 ? context.endLoc : context.startLoc,
        node = startNode(2, startOffset, startLoc);
      node.items = [];
      let nextToken = null;
      do {
        const token = nextToken || tokenizer.nextToken();
        switch (nextToken = null, token.type) {
          case 0:
            token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), node.items.push(parseText(tokenizer, token.value || ""));
            break;
          case 5:
            token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), node.items.push(parseList(tokenizer, token.value || ""));
            break;
          case 4:
            token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), node.items.push(parseNamed(tokenizer, token.value || ""));
            break;
          case 6:
            token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), node.items.push(parseLiteral(tokenizer, token.value || ""));
            break;
          case 7:
            {
              const parsed = parseLinked(tokenizer);
              node.items.push(parsed.node), nextToken = parsed.nextConsumeToken || null;
              break;
            }
        }
      } while (context.currentType !== 13 && context.currentType !== 1);
      const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset(),
        endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
      return endNode(node, endOffset, endLoc), node;
    }
    function parsePlural(tokenizer, offset, loc, msgNode) {
      const context = tokenizer.context();
      let hasEmptyMessage = msgNode.items.length === 0;
      const node = startNode(1, offset, loc);
      node.cases = [], node.cases.push(msgNode);
      do {
        const msg = parseMessage(tokenizer);
        hasEmptyMessage || (hasEmptyMessage = msg.items.length === 0), node.cases.push(msg);
      } while (context.currentType !== 13);
      return hasEmptyMessage && emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0), endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
    }
    function parseResource(tokenizer) {
      const context = tokenizer.context(),
        {
          offset,
          startLoc
        } = context,
        msgNode = parseMessage(tokenizer);
      return context.currentType === 13 ? msgNode : parsePlural(tokenizer, offset, startLoc, msgNode);
    }
    function parse2(source) {
      const tokenizer = createTokenizer(source, assign({}, options)),
        context = tokenizer.context(),
        node = startNode(0, context.offset, context.startLoc);
      return location2 && node.loc && (node.loc.source = source), node.body = parseResource(tokenizer), options.onCacheKey && (node.cacheKey = options.onCacheKey(source)), context.currentType !== 13 && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || ""), endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
    }
    return {
      parse: parse2
    };
  }
  function getTokenCaption(token) {
    if (token.type === 13) return "EOF";
    const name = (token.value || "").replace(/\r?\n/gu, "\\n");
    return name.length > 10 ? name.slice(0, 9) + "\u2026" : name;
  }
  function createTransformer(ast, options = {}) {
    const _context = {
      ast,
      helpers: /* @__PURE__ */new Set()
    };
    return {
      context: () => _context,
      helper: name => (_context.helpers.add(name), name)
    };
  }
  function traverseNodes(nodes, transformer) {
    for (let i = 0; i < nodes.length; i++) traverseNode(nodes[i], transformer);
  }
  function traverseNode(node, transformer) {
    switch (node.type) {
      case 1:
        traverseNodes(node.cases, transformer), transformer.helper("plural"
        /* HelperNameMap.PLURAL */);
        break;
      case 2:
        traverseNodes(node.items, transformer);
        break;
      case 6:
        {
          traverseNode(node.key, transformer), transformer.helper("linked"
          /* HelperNameMap.LINKED */), transformer.helper("type"
          /* HelperNameMap.TYPE */);
          break;
        }
      case 5:
        transformer.helper("interpolate"
        /* HelperNameMap.INTERPOLATE */), transformer.helper("list"
        /* HelperNameMap.LIST */);
        break;
      case 4:
        transformer.helper("interpolate"
        /* HelperNameMap.INTERPOLATE */), transformer.helper("named"
        /* HelperNameMap.NAMED */);
        break;
    }
  }
  function transform(ast, options = {}) {
    const transformer = createTransformer(ast);
    transformer.helper("normalize"
    /* HelperNameMap.NORMALIZE */), ast.body && traverseNode(ast.body, transformer);
    const context = transformer.context();
    ast.helpers = Array.from(context.helpers);
  }
  function optimize(ast) {
    const body = ast.body;
    return body.type === 2 ? optimizeMessageNode(body) : body.cases.forEach(c => optimizeMessageNode(c)), ast;
  }
  function optimizeMessageNode(message) {
    if (message.items.length === 1) {
      const item = message.items[0];
      (item.type === 3 || item.type === 9) && (message.static = item.value, delete item.value);
    } else {
      const values = [];
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (!(item.type === 3 || item.type === 9) || item.value == null) break;
        values.push(item.value);
      }
      if (values.length === message.items.length) {
        message.static = join(values);
        for (let i = 0; i < message.items.length; i++) {
          const item = message.items[i];
          (item.type === 3 || item.type === 9) && delete item.value;
        }
      }
    }
  }
  function minify(node) {
    switch (node.t = node.type, node.type) {
      case 0:
        {
          const resource = node;
          minify(resource.body), resource.b = resource.body, delete resource.body;
          break;
        }
      case 1:
        {
          const plural = node,
            cases = plural.cases;
          for (let i = 0; i < cases.length; i++) minify(cases[i]);
          plural.c = cases, delete plural.cases;
          break;
        }
      case 2:
        {
          const message = node,
            items = message.items;
          for (let i = 0; i < items.length; i++) minify(items[i]);
          message.i = items, delete message.items, message.static && (message.s = message.static, delete message.static);
          break;
        }
      case 3:
      case 9:
      case 8:
      case 7:
        {
          const valueNode = node;
          valueNode.value && (valueNode.v = valueNode.value, delete valueNode.value);
          break;
        }
      case 6:
        {
          const linked = node;
          minify(linked.key), linked.k = linked.key, delete linked.key, linked.modifier && (minify(linked.modifier), linked.m = linked.modifier, delete linked.modifier);
          break;
        }
      case 5:
        {
          const list = node;
          list.i = list.index, delete list.index;
          break;
        }
      case 4:
        {
          const named = node;
          named.k = named.key, delete named.key;
          break;
        }
    }
    delete node.type;
  }
  function createCodeGenerator(ast, options) {
    const {
        filename,
        breakLineCode,
        needIndent: _needIndent
      } = options,
      location2 = options.location !== !1,
      _context = {
        filename,
        code: "",
        column: 1,
        line: 1,
        offset: 0,
        map: void 0,
        breakLineCode,
        needIndent: _needIndent,
        indentLevel: 0
      };
    location2 && ast.loc && (_context.source = ast.loc.source);
    const context = () => _context;
    function push(code, node) {
      _context.code += code;
    }
    function _newline(n, withBreakLine = !0) {
      const _breakLineCode = withBreakLine ? breakLineCode : "";
      push(_needIndent ? _breakLineCode + "  ".repeat(n) : _breakLineCode);
    }
    function indent(withNewLine = !0) {
      const level = ++_context.indentLevel;
      withNewLine && _newline(level);
    }
    function deindent(withNewLine = !0) {
      const level = --_context.indentLevel;
      withNewLine && _newline(level);
    }
    function newline() {
      _newline(_context.indentLevel);
    }
    return {
      context,
      push,
      indent,
      deindent,
      newline,
      helper: key => `_${key}`,
      needIndent: () => _context.needIndent
    };
  }
  function generateLinkedNode(generator, node) {
    const {
      helper
    } = generator;
    generator.push(`${helper("linked"
    /* HelperNameMap.LINKED */)}(`), generateNode(generator, node.key), node.modifier ? (generator.push(", "), generateNode(generator, node.modifier), generator.push(", _type")) : generator.push(", undefined, _type"), generator.push(")");
  }
  function generateMessageNode(generator, node) {
    const {
      helper,
      needIndent
    } = generator;
    generator.push(`${helper("normalize"
    /* HelperNameMap.NORMALIZE */)}([`), generator.indent(needIndent());
    const length = node.items.length;
    for (let i = 0; i < length && (generateNode(generator, node.items[i]), i !== length - 1); i++) generator.push(", ");
    generator.deindent(needIndent()), generator.push("])");
  }
  function generatePluralNode(generator, node) {
    const {
      helper,
      needIndent
    } = generator;
    if (node.cases.length > 1) {
      generator.push(`${helper("plural"
      /* HelperNameMap.PLURAL */)}([`), generator.indent(needIndent());
      const length = node.cases.length;
      for (let i = 0; i < length && (generateNode(generator, node.cases[i]), i !== length - 1); i++) generator.push(", ");
      generator.deindent(needIndent()), generator.push("])");
    }
  }
  function generateResource(generator, node) {
    node.body ? generateNode(generator, node.body) : generator.push("null");
  }
  function generateNode(generator, node) {
    const {
      helper
    } = generator;
    switch (node.type) {
      case 0:
        generateResource(generator, node);
        break;
      case 1:
        generatePluralNode(generator, node);
        break;
      case 2:
        generateMessageNode(generator, node);
        break;
      case 6:
        generateLinkedNode(generator, node);
        break;
      case 8:
        generator.push(JSON.stringify(node.value), node);
        break;
      case 7:
        generator.push(JSON.stringify(node.value), node);
        break;
      case 5:
        generator.push(`${helper("interpolate"
        /* HelperNameMap.INTERPOLATE */)}(${helper("list"
        /* HelperNameMap.LIST */)}(${node.index}))`, node);
        break;
      case 4:
        generator.push(`${helper("interpolate"
        /* HelperNameMap.INTERPOLATE */)}(${helper("named"
        /* HelperNameMap.NAMED */)}(${JSON.stringify(node.key)}))`, node);
        break;
      case 9:
        generator.push(JSON.stringify(node.value), node);
        break;
      case 3:
        generator.push(JSON.stringify(node.value), node);
        break;
    }
  }
  const generate = (ast, options = {}) => {
    const mode = isString(options.mode) ? options.mode : "normal",
      filename = isString(options.filename) ? options.filename : "message.intl";
    options.sourceMap;
    const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : `
`,
      needIndent = options.needIndent ? options.needIndent : mode !== "arrow",
      helpers = ast.helpers || [],
      generator = createCodeGenerator(ast, {
        filename,
        breakLineCode,
        needIndent
      });
    generator.push(mode === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), generator.indent(needIndent), helpers.length > 0 && (generator.push(`const { ${join(helpers.map(s => `${s}: _${s}`), ", ")} } = ctx`), generator.newline()), generator.push("return "), generateNode(generator, ast), generator.deindent(needIndent), generator.push("}"), delete ast.helpers;
    const {
      code,
      map
    } = generator.context();
    return {
      ast,
      code,
      map: map ? map.toJSON() : void 0
      // eslint-disable-line @typescript-eslint/no-explicit-any
    };
  };
  function baseCompile$1(source, options = {}) {
    const assignedOptions = assign({}, options),
      jit = !!assignedOptions.jit,
      enalbeMinify = !!assignedOptions.minify,
      enambeOptimize = assignedOptions.optimize == null ? !0 : assignedOptions.optimize,
      ast = createParser(assignedOptions).parse(source);
    return jit ? (enambeOptimize && optimize(ast), enalbeMinify && minify(ast), {
      ast,
      code: ""
    }) : (transform(ast, assignedOptions), generate(ast, assignedOptions));
  }
  /*!
    * core-base v11.3.0
    * (c) 2026 kazuya kawaguchi
    * Released under the MIT License.
    */
  function initFeatureFlags$1() {
    typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
  }
  function isMessageAST(val) {
    return isObject(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
  }
  const PROPS_BODY = ["b", "body"];
  function resolveBody(node) {
    return resolveProps(node, PROPS_BODY);
  }
  const PROPS_CASES = ["c", "cases"];
  function resolveCases(node) {
    return resolveProps(node, PROPS_CASES, []);
  }
  const PROPS_STATIC = ["s", "static"];
  function resolveStatic(node) {
    return resolveProps(node, PROPS_STATIC);
  }
  const PROPS_ITEMS = ["i", "items"];
  function resolveItems(node) {
    return resolveProps(node, PROPS_ITEMS, []);
  }
  const PROPS_TYPE = ["t", "type"];
  function resolveType(node) {
    return resolveProps(node, PROPS_TYPE);
  }
  const PROPS_VALUE = ["v", "value"];
  function resolveValue$1(node, type) {
    const resolved = resolveProps(node, PROPS_VALUE);
    if (resolved != null) return resolved;
    throw createUnhandleNodeError(type);
  }
  const PROPS_MODIFIER = ["m", "modifier"];
  function resolveLinkedModifier(node) {
    return resolveProps(node, PROPS_MODIFIER);
  }
  const PROPS_KEY = ["k", "key"];
  function resolveLinkedKey(node) {
    const resolved = resolveProps(node, PROPS_KEY);
    if (resolved) return resolved;
    throw createUnhandleNodeError(6
    /* NodeTypes.Linked */);
  }
  function resolveProps(node, props, defaultValue) {
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (hasOwn(node, prop) && node[prop] != null) return node[prop];
    }
    return defaultValue;
  }
  const AST_NODE_PROPS_KEYS = [...PROPS_BODY, ...PROPS_CASES, ...PROPS_STATIC, ...PROPS_ITEMS, ...PROPS_KEY, ...PROPS_MODIFIER, ...PROPS_VALUE, ...PROPS_TYPE];
  function createUnhandleNodeError(type) {
    return new Error(`unhandled node type: ${type}`);
  }
  function format(ast) {
    return ctx => formatParts(ctx, ast);
  }
  function formatParts(ctx, ast) {
    const body = resolveBody(ast);
    if (body == null) throw createUnhandleNodeError(0
    /* NodeTypes.Resource */);
    if (resolveType(body) === 1) {
      const cases = resolveCases(body);
      return ctx.plural(cases.reduce((messages, c) => [...messages, formatMessageParts(ctx, c)], []));
    } else return formatMessageParts(ctx, body);
  }
  function formatMessageParts(ctx, node) {
    const static_ = resolveStatic(node);
    if (static_ != null) return ctx.type === "text" ? static_ : ctx.normalize([static_]);
    {
      const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
      return ctx.normalize(messages);
    }
  }
  function formatMessagePart(ctx, node) {
    const type = resolveType(node);
    switch (type) {
      case 3:
        return resolveValue$1(node, type);
      case 9:
        return resolveValue$1(node, type);
      case 4:
        {
          const named = node;
          if (hasOwn(named, "k") && named.k) return ctx.interpolate(ctx.named(named.k));
          if (hasOwn(named, "key") && named.key) return ctx.interpolate(ctx.named(named.key));
          throw createUnhandleNodeError(type);
        }
      case 5:
        {
          const list = node;
          if (hasOwn(list, "i") && isNumber(list.i)) return ctx.interpolate(ctx.list(list.i));
          if (hasOwn(list, "index") && isNumber(list.index)) return ctx.interpolate(ctx.list(list.index));
          throw createUnhandleNodeError(type);
        }
      case 6:
        {
          const linked = node,
            modifier = resolveLinkedModifier(linked),
            key = resolveLinkedKey(linked);
          return ctx.linked(formatMessagePart(ctx, key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
        }
      case 7:
        return resolveValue$1(node, type);
      case 8:
        return resolveValue$1(node, type);
      default:
        throw new Error(`unhandled node on format message part: ${type}`);
    }
  }
  const defaultOnCacheKey = message => message;
  let compileCache = create();
  function baseCompile(message, options = {}) {
    let detectError = !1;
    const onError = options.onError || defaultOnError;
    return options.onError = err => {
      detectError = !0, onError(err);
    }, {
      ...baseCompile$1(message, options),
      detectError
    };
  }
  // @__NO_SIDE_EFFECTS__
  function compile(message, context) {
    if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && isString(message)) {
      isBoolean(context.warnHtmlMessage) && context.warnHtmlMessage;
      const cacheKey = (context.onCacheKey || defaultOnCacheKey)(message),
        cached = compileCache[cacheKey];
      if (cached) return cached;
      const {
          ast,
          detectError
        } = baseCompile(message, {
          ...context,
          location: !1,
          jit: !0
        }),
        msg = format(ast);
      return detectError ? msg : compileCache[cacheKey] = msg;
    } else {
      const cacheKey = message.cacheKey;
      if (cacheKey) {
        const cached = compileCache[cacheKey];
        return cached || (compileCache[cacheKey] = format(message));
      } else return format(message);
    }
  }
  let devtools = null;
  function setDevToolsHook(hook) {
    devtools = hook;
  }
  function initI18nDevTools(i18n2, version2, meta) {
    devtools && devtools.emit("i18n:init", {
      timestamp: Date.now(),
      i18n: i18n2,
      version: version2,
      meta
    });
  }
  const translateDevTools = /* @__PURE__ */createDevToolsHook("function:translate");
  function createDevToolsHook(hook) {
    return payloads => devtools && devtools.emit(hook, payloads);
  }
  const CoreErrorCodes = {
      INVALID_ARGUMENT: COMPILE_ERROR_CODES_EXTEND_POINT,
      // 17
      INVALID_DATE_ARGUMENT: 18,
      INVALID_ISO_DATE_ARGUMENT: 19,
      NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
      NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
      NOT_SUPPORT_LOCALE_TYPE: 23
    },
    CORE_ERROR_CODES_EXTEND_POINT = 24;
  function createCoreError(code) {
    return createCompileError(code, null, void 0);
  }
  function getLocale(context, options) {
    return options.locale != null ? resolveLocale$1(options.locale) : resolveLocale$1(context.locale);
  }
  let _resolveLocale;
  function resolveLocale$1(locale) {
    if (isString(locale)) return locale;
    if (isFunction(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) return _resolveLocale;
      if (locale.constructor.name === "Function") {
        const resolve = locale();
        if (isPromise(resolve)) throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        return _resolveLocale = resolve;
      } else throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
    } else throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
  }
  function fallbackWithSimple(ctx, fallback, start2) {
    return [... /* @__PURE__ */new Set([start2, ...(isArray(fallback) ? fallback : isObject(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start2])])];
  }
  function fallbackWithLocaleChain(ctx, fallback, start2) {
    const startLocale = isString(start2) ? start2 : DEFAULT_LOCALE,
      context = ctx;
    context.__localeChainCache || (context.__localeChainCache = /* @__PURE__ */new Map());
    let chain = context.__localeChainCache.get(startLocale);
    if (!chain) {
      chain = [];
      let block = [start2];
      for (; isArray(block);) block = appendBlockToChain(chain, block, fallback);
      const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback.default ? fallback.default : null;
      block = isString(defaults) ? [defaults] : defaults, isArray(block) && appendBlockToChain(chain, block, !1), context.__localeChainCache.set(startLocale, chain);
    }
    return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
    let follow = !0;
    for (let i = 0; i < block.length && isBoolean(follow); i++) {
      const locale = block[i];
      isString(locale) && (follow = appendLocaleToChain(chain, block[i], blocks));
    }
    return follow;
  }
  function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split("-");
    do {
      const target = tokens.join("-");
      follow = appendItemToChain(chain, target, blocks), tokens.splice(-1, 1);
    } while (tokens.length && follow === !0);
    return follow;
  }
  function appendItemToChain(chain, target, blocks) {
    let follow = !1;
    if (!chain.includes(target) && (follow = !0, target)) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale), (isArray(blocks) || isPlainObject(blocks)) && blocks[locale] && (follow = blocks[locale]);
    }
    return follow;
  }
  const pathStateMachine = [];
  pathStateMachine[0
  /* States.BEFORE_PATH */] = {
    w: [0
    /* States.BEFORE_PATH */],
    i: [3, 0
    /* Actions.APPEND */],
    "[": [4
    /* States.IN_SUB_PATH */],
    o: [7
    /* States.AFTER_PATH */]
  }, pathStateMachine[1
  /* States.IN_PATH */] = {
    w: [1
    /* States.IN_PATH */],
    ".": [2
    /* States.BEFORE_IDENT */],
    "[": [4
    /* States.IN_SUB_PATH */],
    o: [7
    /* States.AFTER_PATH */]
  }, pathStateMachine[2
  /* States.BEFORE_IDENT */] = {
    w: [2
    /* States.BEFORE_IDENT */],
    i: [3, 0
    /* Actions.APPEND */],
    0: [3, 0
    /* Actions.APPEND */]
  }, pathStateMachine[3
  /* States.IN_IDENT */] = {
    i: [3, 0
    /* Actions.APPEND */],
    0: [3, 0
    /* Actions.APPEND */],
    w: [1, 1
    /* Actions.PUSH */],
    ".": [2, 1
    /* Actions.PUSH */],
    "[": [4, 1
    /* Actions.PUSH */],
    o: [7, 1
    /* Actions.PUSH */]
  }, pathStateMachine[4
  /* States.IN_SUB_PATH */] = {
    "'": [5, 0
    /* Actions.APPEND */],
    '"': [6, 0
    /* Actions.APPEND */],
    "[": [4, 2
    /* Actions.INC_SUB_PATH_DEPTH */],
    "]": [1, 3
    /* Actions.PUSH_SUB_PATH */],
    o: 8,
    l: [4, 0
    /* Actions.APPEND */]
  }, pathStateMachine[5
  /* States.IN_SINGLE_QUOTE */] = {
    "'": [4, 0
    /* Actions.APPEND */],
    o: 8,
    l: [5, 0
    /* Actions.APPEND */]
  }, pathStateMachine[6
  /* States.IN_DOUBLE_QUOTE */] = {
    '"': [4, 0
    /* Actions.APPEND */],
    o: 8,
    l: [6, 0
    /* Actions.APPEND */]
  };
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }
  function stripQuotes(str) {
    const a = str.charCodeAt(0),
      b = str.charCodeAt(str.length - 1);
    return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
  }
  function getPathCharType(ch) {
    if (ch == null) return "o";
    switch (ch.charCodeAt(0)) {
      case 91:
      // [
      case 93:
      // ]
      case 46:
      // .
      case 34:
      // "
      case 39:
        return ch;
      case 95:
      // _
      case 36:
      // $
      case 45:
        return "i";
      case 9:
      // Tab (HT)
      case 10:
      // Newline (LF)
      case 13:
      // Return (CR)
      case 160:
      // No-break space (NBSP)
      case 65279:
      // Byte Order Mark (BOM)
      case 8232:
      // Line Separator (LS)
      case 8233:
        return "w";
    }
    return "i";
  }
  function formatSubPath(path) {
    const trimmed = path.trim();
    return path.charAt(0) === "0" && isNaN(parseInt(path)) ? !1 : isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
  }
  function parse(path) {
    const keys = [];
    let index = -1,
      mode = 0,
      subPathDepth = 0,
      c,
      key,
      newChar,
      type,
      transition,
      action,
      typeMap;
    const actions = [];
    actions[0
    /* Actions.APPEND */] = () => {
      key === void 0 ? key = newChar : key += newChar;
    }, actions[1
    /* Actions.PUSH */] = () => {
      key !== void 0 && (keys.push(key), key = void 0);
    }, actions[2
    /* Actions.INC_SUB_PATH_DEPTH */] = () => {
      actions[0
      /* Actions.APPEND */](), subPathDepth++;
    }, actions[3
    /* Actions.PUSH_SUB_PATH */] = () => {
      if (subPathDepth > 0) subPathDepth--, mode = 4, actions[0
      /* Actions.APPEND */]();else {
        if (subPathDepth = 0, key === void 0 || (key = formatSubPath(key), key === !1)) return !1;
        actions[1
        /* Actions.PUSH */]();
      }
    };
    function maybeUnescapeQuote() {
      const nextChar = path[index + 1];
      if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') return index++, newChar = "\\" + nextChar, actions[0
      /* Actions.APPEND */](), !0;
    }
    for (; mode !== null;) if (index++, c = path[index], !(c === "\\" && maybeUnescapeQuote())) {
      if (type = getPathCharType(c), typeMap = pathStateMachine[mode], transition = typeMap[type] || typeMap.l || 8, transition === 8 || (mode = transition[0], transition[1] !== void 0 && (action = actions[transition[1]], action && (newChar = c, action() === !1)))) return;
      if (mode === 7) return keys;
    }
  }
  const cache = /* @__PURE__ */new Map();
  function resolveWithKeyValue(obj, path) {
    return isObject(obj) ? obj[path] : null;
  }
  function resolveValue(obj, path) {
    if (!isObject(obj)) return null;
    let hit = cache.get(path);
    if (hit || (hit = parse(path), hit && cache.set(path, hit)), !hit) return null;
    const len = hit.length;
    let last = obj,
      i = 0;
    for (; i < len;) {
      const key = hit[i];
      if (AST_NODE_PROPS_KEYS.includes(key) && isMessageAST(last) || !isObject(last) || !hasOwn(last, key)) return null;
      const val = last[key];
      if (val === void 0 || isFunction(last)) return null;
      last = val, i++;
    }
    return last;
  }
  const VERSION$1 = "11.3.0",
    NOT_REOSLVED = -1,
    DEFAULT_LOCALE = "en-US",
    MISSING_RESOLVE_VALUE = "",
    capitalize = str => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
  function getDefaultLinkedModifiers() {
    return {
      upper: (val, type) => type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val,
      lower: (val, type) => type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val,
      capitalize: (val, type) => type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject(val) && "__v_isVNode" in val ? capitalize(val.children) : val
    };
  }
  let _compiler;
  function registerMessageCompiler(compiler) {
    _compiler = compiler;
  }
  let _resolver;
  function registerMessageResolver(resolver) {
    _resolver = resolver;
  }
  let _fallbacker;
  function registerLocaleFallbacker(fallbacker) {
    _fallbacker = fallbacker;
  }
  let _additionalMeta = null;
  const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */meta => {
      _additionalMeta = meta;
    },
    getAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */() => _additionalMeta;
  let _fallbackContext = null;
  const setFallbackContext = context => {
      _fallbackContext = context;
    },
    getFallbackContext = () => _fallbackContext;
  let _cid = 0;
  function createCoreContext(options = {}) {
    const onWarn = isFunction(options.onWarn) ? options.onWarn : warn,
      version2 = isString(options.version) ? options.version : VERSION$1,
      locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE,
      _locale = isFunction(locale) ? DEFAULT_LOCALE : locale,
      fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === !1 ? options.fallbackLocale : _locale,
      messages = isPlainObject(options.messages) ? options.messages : createResources(_locale),
      datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale),
      numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : createResources(_locale),
      modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers()),
      pluralRules = options.pluralRules || create(),
      missing = isFunction(options.missing) ? options.missing : null,
      missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : !0,
      fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : !0,
      fallbackFormat = !!options.fallbackFormat,
      unresolving = !!options.unresolving,
      postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null,
      processor = isPlainObject(options.processor) ? options.processor : null,
      warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : !0,
      escapeParameter = !!options.escapeParameter,
      messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler,
      messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue,
      localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple,
      fallbackContext = isObject(options.fallbackContext) ? options.fallbackContext : void 0,
      internalOptions = options,
      __datetimeFormatters = isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */new Map(),
      __numberFormatters = isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */new Map(),
      __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
    _cid++;
    const context = {
      version: version2,
      cid: _cid,
      locale,
      fallbackLocale,
      messages,
      modifiers,
      pluralRules,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackFormat,
      unresolving,
      postTranslation,
      processor,
      warnHtmlMessage,
      escapeParameter,
      messageCompiler,
      messageResolver,
      localeFallbacker,
      fallbackContext,
      onWarn,
      __meta
    };
    return context.datetimeFormats = datetimeFormats, context.numberFormats = numberFormats, context.__datetimeFormatters = __datetimeFormatters, context.__numberFormatters = __numberFormatters, __INTLIFY_PROD_DEVTOOLS__ && initI18nDevTools(context, version2, __meta), context;
  }
  const createResources = locale => ({
    [locale]: create()
  });
  function handleMissing(context, key, locale, missingWarn, type) {
    const {
      missing,
      onWarn
    } = context;
    if (missing !== null) {
      const ret = missing(context, locale, key, type);
      return isString(ret) ? ret : key;
    } else return key;
  }
  function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = /* @__PURE__ */new Map(), ctx.localeFallbacker(ctx, fallback, locale);
  }
  function isAlmostSameLocale(locale, compareLocale) {
    return locale === compareLocale ? !1 : locale.split("-")[0] === compareLocale.split("-")[0];
  }
  function isImplicitFallback(targetLocale, locales) {
    const index = locales.indexOf(targetLocale);
    if (index === -1) return !1;
    for (let i = index + 1; i < locales.length; i++) if (isAlmostSameLocale(targetLocale, locales[i])) return !0;
    return !1;
  }
  function datetime(context, ...args) {
    const {
        datetimeFormats,
        unresolving,
        fallbackLocale,
        onWarn,
        localeFallbacker
      } = context,
      {
        __datetimeFormatters
      } = context;
    if (!isString(args[0]) && !isDate(args[0]) && !isNumber(args[0])) return MISSING_RESOLVE_VALUE;
    const [key, value, options, overrides] = parseDateTimeArgs(...args),
      missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part,
      locale = getLocale(context, options),
      locales = localeFallbacker(context,
      // eslint-disable-line @typescript-eslint/no-explicit-any
      fallbackLocale, locale);
    if (!isString(key) || key === "") return new Intl.DateTimeFormat(locale.replace(/!/g, ""), overrides).format(value);
    let datetimeFormat = {},
      targetLocale,
      format2 = null;
    const type = "datetime format";
    for (let i = 0; i < locales.length && (targetLocale = locales[i], datetimeFormat = datetimeFormats[targetLocale] || {}, format2 = datetimeFormat[key], !isPlainObject(format2)); i++) handleMissing(context, key, targetLocale, missingWarn, type);
    if (!isPlainObject(format2) || !isString(targetLocale)) return unresolving ? NOT_REOSLVED : key;
    let id2 = `${targetLocale}__${key}`;
    isEmptyObject(overrides) || (id2 = `${id2}__${JSON.stringify(overrides)}`);
    let formatter = __datetimeFormatters.get(id2);
    return formatter || (formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides)), __datetimeFormatters.set(id2, formatter)), part ? formatter.formatToParts(value) : formatter.format(value);
  }
  const DATETIME_FORMAT_OPTIONS_KEYS = ["localeMatcher", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "formatMatcher", "hour12", "timeZone", "dateStyle", "timeStyle", "calendar", "dayPeriod", "numberingSystem", "hourCycle", "fractionalSecondDigits"];
  function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args,
      options = create();
    let overrides = create(),
      value;
    if (isString(arg1)) {
      const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
      if (!matches) throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
      const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
      value = new Date(dateTime);
      try {
        value.toISOString();
      } catch {
        throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
      }
    } else if (isDate(arg1)) {
      if (isNaN(arg1.getTime())) throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
      value = arg1;
    } else if (isNumber(arg1)) value = arg1;else throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
    return isString(arg2) ? options.key = arg2 : isPlainObject(arg2) && Object.keys(arg2).forEach(key => {
      DATETIME_FORMAT_OPTIONS_KEYS.includes(key) ? overrides[key] = arg2[key] : options[key] = arg2[key];
    }), isString(arg3) ? options.locale = arg3 : isPlainObject(arg3) && (overrides = arg3), isPlainObject(arg4) && (overrides = arg4), [options.key || "", value, options, overrides];
  }
  function clearDateTimeFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id2 = `${locale}__${key}`;
      context.__datetimeFormatters.has(id2) && context.__datetimeFormatters.delete(id2);
    }
  }
  function number(context, ...args) {
    const {
        numberFormats,
        unresolving,
        fallbackLocale,
        onWarn,
        localeFallbacker
      } = context,
      {
        __numberFormatters
      } = context;
    if (!isNumber(args[0])) return MISSING_RESOLVE_VALUE;
    const [key, value, options, overrides] = parseNumberArgs(...args),
      missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part,
      locale = getLocale(context, options),
      locales = localeFallbacker(context,
      // eslint-disable-line @typescript-eslint/no-explicit-any
      fallbackLocale, locale);
    if (!isString(key) || key === "") return new Intl.NumberFormat(locale.replace(/!/g, ""), overrides).format(value);
    let numberFormat = {},
      targetLocale,
      format2 = null;
    const type = "number format";
    for (let i = 0; i < locales.length && (targetLocale = locales[i], numberFormat = numberFormats[targetLocale] || {}, format2 = numberFormat[key], !isPlainObject(format2)); i++) handleMissing(context, key, targetLocale, missingWarn, type);
    if (!isPlainObject(format2) || !isString(targetLocale)) return unresolving ? NOT_REOSLVED : key;
    let id2 = `${targetLocale}__${key}`;
    isEmptyObject(overrides) || (id2 = `${id2}__${JSON.stringify(overrides)}`);
    let formatter = __numberFormatters.get(id2);
    return formatter || (formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides)), __numberFormatters.set(id2, formatter)), part ? formatter.formatToParts(value) : formatter.format(value);
  }
  const NUMBER_FORMAT_OPTIONS_KEYS = ["localeMatcher", "style", "currency", "currencyDisplay", "currencySign", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "compactDisplay", "notation", "signDisplay", "unit", "unitDisplay", "roundingMode", "roundingPriority", "roundingIncrement", "trailingZeroDisplay"];
  function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args,
      options = create();
    let overrides = create();
    if (!isNumber(arg1)) throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
    const value = arg1;
    return isString(arg2) ? options.key = arg2 : isPlainObject(arg2) && Object.keys(arg2).forEach(key => {
      NUMBER_FORMAT_OPTIONS_KEYS.includes(key) ? overrides[key] = arg2[key] : options[key] = arg2[key];
    }), isString(arg3) ? options.locale = arg3 : isPlainObject(arg3) && (overrides = arg3), isPlainObject(arg4) && (overrides = arg4), [options.key || "", value, options, overrides];
  }
  function clearNumberFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id2 = `${locale}__${key}`;
      context.__numberFormatters.has(id2) && context.__numberFormatters.delete(id2);
    }
  }
  const DEFAULT_MODIFIER = str => str,
    DEFAULT_MESSAGE = ctx => "",
    DEFAULT_MESSAGE_DATA_TYPE = "text",
    DEFAULT_NORMALIZE = values => values.length === 0 ? "" : join(values),
    DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
    return choice = Math.abs(choice), choicesLength === 2 ? choice === 1 ? 0 : 1 : Math.min(choice, 2);
  }
  function getPluralIndex(options) {
    var _a, _b;
    const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
    return isNumber((_a = options.named) == null ? void 0 : _a.count) ? options.named.count : isNumber((_b = options.named) == null ? void 0 : _b.n) ? options.named.n : index;
  }
  function createMessageContext(options = {}) {
    var _a, _b, _c, _d;
    const locale = options.locale,
      pluralIndex = getPluralIndex(options),
      pluralRule = isString(locale) && isFunction((_a = options.pluralRules) == null ? void 0 : _a[locale]) ? options.pluralRules[locale] : pluralDefault,
      orgPluralRule = pluralRule === pluralDefault ? void 0 : pluralDefault,
      plural = messages => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)],
      _list = options.list || [],
      list = index => _list[index],
      _named = options.named || create();
    isNumber(options.pluralIndex) && (_named.count || (_named.count = options.pluralIndex), _named.n || (_named.n = options.pluralIndex));
    const named = key => _named[key];
    function message(key, useLinked) {
      const msg = isFunction(options.messages) ? options.messages(key, !!useLinked) : isObject(options.messages) ? options.messages[key] : !1;
      return msg || (options.parent ? options.parent.message(key) : DEFAULT_MESSAGE);
    }
    const _modifier = name => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER,
      normalize = isFunction((_b = options.processor) == null ? void 0 : _b.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE,
      interpolate = isFunction((_c = options.processor) == null ? void 0 : _c.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE,
      type = isString((_d = options.processor) == null ? void 0 : _d.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE,
      ctx = {
        list,
        named,
        plural,
        linked: (key, ...args) => {
          const [arg1, arg2] = args;
          let type2 = "text",
            modifier = "";
          args.length === 1 ? isObject(arg1) ? (modifier = arg1.modifier || modifier, type2 = arg1.type || type2) : isString(arg1) && (modifier = arg1 || modifier) : args.length === 2 && (isString(arg1) && (modifier = arg1 || modifier), isString(arg2) && (type2 = arg2 || type2));
          const ret = message(key, !0)(ctx),
            resolved = ret === "" || ret === void 0 ? key : ret,
            msg =
            // The message in vnode resolved with linked are returned as an array by processor.nomalize
            type2 === "vnode" && isArray(resolved) && modifier ? resolved[0] : resolved;
          return modifier ? _modifier(modifier)(msg, type2) : msg;
        },
        message,
        type,
        interpolate,
        normalize,
        values: assign(create(), _list, _named)
      };
    return ctx;
  }
  const NOOP_MESSAGE_FUNCTION = () => "",
    isMessageFunction = val => isFunction(val);
  function translate(context, ...args) {
    const {
        fallbackFormat,
        postTranslation,
        unresolving,
        messageCompiler,
        fallbackLocale,
        messages
      } = context,
      [key, options] = parseTranslateArgs(...args),
      missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn,
      fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn,
      escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter,
      resolvedMessage = !!options.resolvedMessage,
      defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? isBoolean(options.default) ? messageCompiler ? key : () => key : options.default : fallbackFormat ? messageCompiler ? key : () => key : null,
      enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString(defaultMsgOrKey) || isFunction(defaultMsgOrKey)),
      locale = getLocale(context, options);
    escapeParameter && escapeParams(options);
    let [formatScope, targetLocale, message] = resolvedMessage ? [key, locale, messages[locale] || create()] : resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn),
      format2 = formatScope,
      cacheBaseKey = key;
    if (!resolvedMessage && !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) && enableDefaultMsg && (format2 = defaultMsgOrKey, cacheBaseKey = format2), !resolvedMessage && (!(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString(targetLocale))) return unresolving ? NOT_REOSLVED : key;
    let occurred = !1;
    const onError = () => {
        occurred = !0;
      },
      msg = isMessageFunction(format2) ? format2 : compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError);
    if (occurred) return format2;
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options),
      msgContext = createMessageContext(ctxOptions),
      messaged = evaluateMessage(context, msg, msgContext);
    let ret = postTranslation ? postTranslation(messaged, key) : messaged;
    if (escapeParameter && isString(ret) && (ret = sanitizeTranslatedHtml(ret)), __INTLIFY_PROD_DEVTOOLS__) {
      const payloads = {
        timestamp: Date.now(),
        key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
        locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
        format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
        message: ret
      };
      payloads.meta = assign({}, context.__meta, /* @__PURE__ */getAdditionalMeta() || {}), translateDevTools(payloads);
    }
    return ret;
  }
  function escapeParams(options) {
    isArray(options.list) ? options.list = options.list.map(item => isString(item) ? escapeHtml(item) : item) : isObject(options.named) && Object.keys(options.named).forEach(key => {
      isString(options.named[key]) && (options.named[key] = escapeHtml(options.named[key]));
    });
  }
  function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const {
        messages,
        onWarn,
        messageResolver: resolveValue2,
        localeFallbacker
      } = context,
      locales = localeFallbacker(context, fallbackLocale, locale);
    let message = create(),
      targetLocale,
      format2 = null;
    const type = "translate";
    for (let i = 0; i < locales.length && (targetLocale = locales[i], message = messages[targetLocale] || create(), (format2 = resolveValue2(message, key)) === null && (format2 = message[key]), !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2))); i++) if (!isImplicitFallback(targetLocale, locales)) {
      const missingRet = handleMissing(context,
      // eslint-disable-line @typescript-eslint/no-explicit-any
      key, targetLocale, missingWarn, type);
      missingRet !== key && (format2 = missingRet);
    }
    return [format2, targetLocale, message];
  }
  function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
    const {
      messageCompiler,
      warnHtmlMessage
    } = context;
    if (isMessageFunction(format2)) {
      const msg2 = format2;
      return msg2.locale = msg2.locale || targetLocale, msg2.key = msg2.key || key, msg2;
    }
    if (messageCompiler == null) {
      const msg2 = () => format2;
      return msg2.locale = targetLocale, msg2.key = key, msg2;
    }
    const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
    return msg.locale = targetLocale, msg.key = key, msg.source = format2, msg;
  }
  function evaluateMessage(context, msg, msgCtx) {
    return msg(msgCtx);
  }
  function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args,
      options = create();
    if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
    const key = isNumber(arg1) ? String(arg1) : (isMessageFunction(arg1), arg1);
    return isNumber(arg2) ? options.plural = arg2 : isString(arg2) ? options.default = arg2 : isPlainObject(arg2) && !isEmptyObject(arg2) ? options.named = arg2 : isArray(arg2) && (options.list = arg2), isNumber(arg3) ? options.plural = arg3 : isString(arg3) ? options.default = arg3 : isPlainObject(arg3) && assign(options, arg3), [key, options];
  }
  function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
    return {
      locale,
      key,
      warnHtmlMessage,
      onError: err => {
        throw onError && onError(err), err;
      },
      onCacheKey: source2 => generateFormatCacheKey(locale, key, source2)
    };
  }
  function getMessageContextOptions(context, locale, message, options) {
    const {
        modifiers,
        pluralRules,
        messageResolver: resolveValue2,
        fallbackLocale,
        fallbackWarn,
        missingWarn,
        fallbackContext
      } = context,
      ctxOptions = {
        locale,
        modifiers,
        pluralRules,
        messages: (key, useLinked) => {
          let val = resolveValue2(message, key);
          if (val == null && (fallbackContext || useLinked)) {
            const [,, message2] = resolveMessageFormat(fallbackContext || context,
            // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
            key, locale, fallbackLocale, fallbackWarn, missingWarn);
            val = resolveValue2(message2, key);
          }
          if (isString(val) || isMessageAST(val)) {
            let occurred = !1;
            const msg = compileMessageFormat(context, key, locale, val, key, () => {
              occurred = !0;
            });
            return occurred ? NOOP_MESSAGE_FUNCTION : msg;
          } else return isMessageFunction(val) ? val : NOOP_MESSAGE_FUNCTION;
        }
      };
    return context.processor && (ctxOptions.processor = context.processor), options.list && (ctxOptions.list = options.list), options.named && (ctxOptions.named = options.named), isNumber(options.plural) && (ctxOptions.pluralIndex = options.plural), ctxOptions;
  }
  initFeatureFlags$1();
  /*!
    * vue-i18n v11.3.0
    * (c) 2026 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VERSION = "11.3.0";
  function initFeatureFlags() {
    typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (getGlobalThis().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (getGlobalThis().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = !1);
  }
  const I18nErrorCodes = {
    // composer module errors
    UNEXPECTED_RETURN_TYPE: CORE_ERROR_CODES_EXTEND_POINT,
    // 24
    // legacy module errors
    INVALID_ARGUMENT: 25,
    // i18n module errors
    MUST_BE_CALL_SETUP_TOP: 26,
    NOT_INSTALLED: 27,
    // directive module errors
    REQUIRED_VALUE: 28,
    INVALID_VALUE: 29,
    NOT_INSTALLED_WITH_PROVIDE: 31,
    // unexpected error
    UNEXPECTED_ERROR: 32
  };
  function createI18nError(code, ...args) {
    return createCompileError(code, null, void 0);
  }
  const TranslateVNodeSymbol = /* @__PURE__ */makeSymbol("__translateVNode"),
    DatetimePartsSymbol = /* @__PURE__ */makeSymbol("__datetimeParts"),
    NumberPartsSymbol = /* @__PURE__ */makeSymbol("__numberParts"),
    SetPluralRulesSymbol = makeSymbol("__setPluralRules"),
    InejctWithOptionSymbol = /* @__PURE__ */makeSymbol("__injectWithOption"),
    DisposeSymbol = /* @__PURE__ */makeSymbol("__dispose");
  function handleFlatJson(obj) {
    if (!isObject(obj) || isMessageAST(obj)) return obj;
    for (const key in obj) if (hasOwn(obj, key)) if (!key.includes(".")) isObject(obj[key]) && handleFlatJson(obj[key]);else {
      const subKeys = key.split("."),
        lastIndex = subKeys.length - 1;
      let currentObj = obj,
        hasStringValue = !1;
      for (let i = 0; i < lastIndex; i++) {
        if (subKeys[i] === "__proto__") throw new Error(`unsafe key: ${subKeys[i]}`);
        if (subKeys[i] in currentObj || (currentObj[subKeys[i]] = create()), !isObject(currentObj[subKeys[i]])) {
          hasStringValue = !0;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (hasStringValue || (isMessageAST(currentObj) ? AST_NODE_PROPS_KEYS.includes(subKeys[lastIndex]) || delete obj[key] : (currentObj[subKeys[lastIndex]] = obj[key], delete obj[key])), !isMessageAST(currentObj)) {
        const target = currentObj[subKeys[lastIndex]];
        isObject(target) && handleFlatJson(target);
      }
    }
    return obj;
  }
  function getLocaleMessages(locale, options) {
    const {
        messages,
        __i18n,
        messageResolver,
        flatJson
      } = options,
      ret = isPlainObject(messages) ? messages : isArray(__i18n) ? create() : {
        [locale]: create()
      };
    if (isArray(__i18n) && __i18n.forEach(custom => {
      if ("locale" in custom && "resource" in custom) {
        const {
          locale: locale2,
          resource
        } = custom;
        locale2 ? (ret[locale2] = ret[locale2] || create(), deepCopy(resource, ret[locale2])) : deepCopy(resource, ret);
      } else isString(custom) && deepCopy(JSON.parse(custom), ret);
    }), messageResolver == null && flatJson) for (const key in ret) hasOwn(ret, key) && handleFlatJson(ret[key]);
    return ret;
  }
  function getComponentOptions(instance) {
    return instance.type;
  }
  function adjustI18nResources(gl, options, componentOptions) {
    let messages = isObject(options.messages) ? options.messages : create();
    "__i18nGlobal" in componentOptions && (messages = getLocaleMessages(gl.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    }));
    const locales = Object.keys(messages);
    locales.length && locales.forEach(locale => {
      gl.mergeLocaleMessage(locale, messages[locale]);
    });
    {
      if (isObject(options.datetimeFormats)) {
        const locales2 = Object.keys(options.datetimeFormats);
        locales2.length && locales2.forEach(locale => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
      if (isObject(options.numberFormats)) {
        const locales2 = Object.keys(options.numberFormats);
        locales2.length && locales2.forEach(locale => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
  function createTextNode(key) {
    return createVNode(Text, null, key, 0);
  }
  function getCurrentInstance() {
    return getCurrentInstance$1();
  }
  const DEVTOOLS_META = "__INTLIFY_META__",
    NOOP_RETURN_ARRAY = () => [],
    NOOP_RETURN_FALSE = () => !1;
  let composerID = 0;
  function defineCoreMissingHandler(missing) {
    return (ctx, locale, key, type) => missing(locale, key, getCurrentInstance() || void 0, type);
  }
  const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */() => {
    const instance = getCurrentInstance();
    let meta = null;
    return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? {
      [DEVTOOLS_META]: meta
    } : null;
  };
  function createComposer(options = {}) {
    const {
        __root,
        __injectWithOption
      } = options,
      _isGlobal = __root === void 0,
      flatJson = options.flatJson,
      _ref = inBrowser ? ref : shallowRef;
    let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : !0;
    const _locale = _ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE),
      _fallbackLocale = _ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === !1 ? options.fallbackLocale : _locale.value),
      _messages = _ref(getLocaleMessages(_locale.value, options)),
      _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : {
        [_locale.value]: {}
      }),
      _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : {
        [_locale.value]: {}
      });
    let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : !0,
      _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : !0,
      _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : !0,
      _fallbackFormat = !!options.fallbackFormat,
      _missing = isFunction(options.missing) ? options.missing : null,
      _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null,
      _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null,
      _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : !0,
      _escapeParameter = !!options.escapeParameter;
    const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
    let _pluralRules = options.pluralRules || __root && __root.pluralRules,
      _context;
    _context = (() => {
      _isGlobal && setFallbackContext(null);
      const ctxOptions = {
        version: VERSION,
        locale: _locale.value,
        fallbackLocale: _fallbackLocale.value,
        messages: _messages.value,
        modifiers: _modifiers,
        pluralRules: _pluralRules,
        missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
        missingWarn: _missingWarn,
        fallbackWarn: _fallbackWarn,
        fallbackFormat: _fallbackFormat,
        unresolving: !0,
        postTranslation: _postTranslation === null ? void 0 : _postTranslation,
        warnHtmlMessage: _warnHtmlMessage,
        escapeParameter: _escapeParameter,
        messageResolver: options.messageResolver,
        messageCompiler: options.messageCompiler,
        __meta: {
          framework: "vue"
        }
      };
      ctxOptions.datetimeFormats = _datetimeFormats.value, ctxOptions.numberFormats = _numberFormats.value, ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0, ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
      const ctx = createCoreContext(ctxOptions);
      return _isGlobal && setFallbackContext(ctx), ctx;
    })(), updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    function trackReactivityValues() {
      return [_locale.value, _fallbackLocale.value, _messages.value, _datetimeFormats.value, _numberFormats.value];
    }
    const locale = computed({
        get: () => _locale.value,
        set: val => {
          _context.locale = val, _locale.value = val;
        }
      }),
      fallbackLocale = computed({
        get: () => _fallbackLocale.value,
        set: val => {
          _context.fallbackLocale = val, _fallbackLocale.value = val, updateFallbackLocale(_context, _locale.value, val);
        }
      }),
      messages = computed(() => _messages.value),
      datetimeFormats = /* @__PURE__ */computed(() => _datetimeFormats.value),
      numberFormats = /* @__PURE__ */computed(() => _numberFormats.value);
    function getPostTranslationHandler() {
      return isFunction(_postTranslation) ? _postTranslation : null;
    }
    function setPostTranslationHandler(handler) {
      _postTranslation = handler, _context.postTranslation = handler;
    }
    function getMissingHandler() {
      return _missing;
    }
    function setMissingHandler(handler) {
      handler !== null && (_runtimeMissing = defineCoreMissingHandler(handler)), _missing = handler, _context.missing = _runtimeMissing;
    }
    const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
      trackReactivityValues();
      let ret;
      try {
        __INTLIFY_PROD_DEVTOOLS__, _isGlobal || (_context.fallbackContext = __root ? getFallbackContext() : void 0), ret = fn(_context);
      } finally {
        __INTLIFY_PROD_DEVTOOLS__, _isGlobal || (_context.fallbackContext = void 0);
      }
      if (warnType !== "translate exists" &&
      // for not `te` (e.g `t`)
      isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
        const [key, arg2] = argumentParser();
        return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
      } else {
        if (successCondition(ret)) return ret;
        throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
      }
    };
    function t(...args) {
      return wrapWithDeps(context => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", root => Reflect.apply(root.t, root, [...args]), key => key, val => isString(val));
    }
    function rt(...args) {
      const [arg1, arg2, arg3] = args;
      if (arg3 && !isObject(arg3)) throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
      return t(arg1, arg2, assign({
        resolvedMessage: !0
      }, arg3 || {}));
    }
    function d(...args) {
      return wrapWithDeps(context => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", root => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, val => isString(val) || isArray(val));
    }
    function n(...args) {
      return wrapWithDeps(context => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", root => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, val => isString(val) || isArray(val));
    }
    function normalize(values) {
      return values.map(val => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
    }
    const processor = {
      normalize,
      interpolate: val => val,
      type: "vnode"
    };
    function translateVNode(...args) {
      return wrapWithDeps(context => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor, ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      }, () => parseTranslateArgs(...args), "translate", root => root[TranslateVNodeSymbol](...args), key => [createTextNode(key)], val => isArray(val));
    }
    function numberParts(...args) {
      return wrapWithDeps(context => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", root => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, val => isString(val) || isArray(val));
    }
    function datetimeParts(...args) {
      return wrapWithDeps(context => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", root => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, val => isString(val) || isArray(val));
    }
    function setPluralRules(rules) {
      _pluralRules = rules, _context.pluralRules = _pluralRules;
    }
    function te(key, locale2) {
      return wrapWithDeps(() => {
        if (!key) return !1;
        const targetLocale = isString(locale2) ? locale2 : _locale.value,
          locales = isString(locale2) ? [targetLocale] : fallbackWithLocaleChain(_context, _fallbackLocale.value, targetLocale);
        for (let i = 0; i < locales.length; i++) {
          const message = getLocaleMessage(locales[i]);
          let resolved = _context.messageResolver(message, key);
          if (resolved === null && (resolved = message[key]), isMessageAST(resolved) || isMessageFunction(resolved) || isString(resolved)) return !0;
        }
        return !1;
      }, () => [key], "translate exists", root => Reflect.apply(root.te, root, [key, locale2]), NOOP_RETURN_FALSE, val => isBoolean(val));
    }
    function resolveMessages(key) {
      let messages2 = null;
      const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
      for (let i = 0; i < locales.length; i++) {
        const targetLocaleMessages = _messages.value[locales[i]] || {},
          messageValue = _context.messageResolver(targetLocaleMessages, key);
        if (messageValue != null) {
          messages2 = messageValue;
          break;
        }
      }
      return messages2;
    }
    function tm(key) {
      const messages2 = resolveMessages(key);
      return messages2 ?? (__root ? __root.tm(key) || {} : {});
    }
    function getLocaleMessage(locale2) {
      return _messages.value[locale2] || {};
    }
    function setLocaleMessage(locale2, message) {
      if (flatJson) {
        const _message = {
          [locale2]: message
        };
        for (const key in _message) hasOwn(_message, key) && handleFlatJson(_message[key]);
        message = _message[locale2];
      }
      _messages.value[locale2] = message, _context.messages = _messages.value;
    }
    function mergeLocaleMessage(locale2, message) {
      _messages.value[locale2] = _messages.value[locale2] || {};
      const _message = {
        [locale2]: message
      };
      if (flatJson) for (const key in _message) hasOwn(_message, key) && handleFlatJson(_message[key]);
      message = _message[locale2], deepCopy(message, _messages.value[locale2]), _context.messages = _messages.value;
    }
    function getDateTimeFormat(locale2) {
      return _datetimeFormats.value[locale2] || {};
    }
    function setDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = format2, _context.datetimeFormats = _datetimeFormats.value, clearDateTimeFormat(_context, locale2, format2);
    }
    function mergeDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2), _context.datetimeFormats = _datetimeFormats.value, clearDateTimeFormat(_context, locale2, format2);
    }
    function getNumberFormat(locale2) {
      return _numberFormats.value[locale2] || {};
    }
    function setNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = format2, _context.numberFormats = _numberFormats.value, clearNumberFormat(_context, locale2, format2);
    }
    function mergeNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2), _context.numberFormats = _numberFormats.value, clearNumberFormat(_context, locale2, format2);
    }
    composerID++, __root && inBrowser && (watch(__root.locale, val => {
      _inheritLocale && (_locale.value = val, _context.locale = val, updateFallbackLocale(_context, _locale.value, _fallbackLocale.value));
    }), watch(__root.fallbackLocale, val => {
      _inheritLocale && (_fallbackLocale.value = val, _context.fallbackLocale = val, updateFallbackLocale(_context, _locale.value, _fallbackLocale.value));
    }));
    const composer = {
      id: composerID,
      locale,
      fallbackLocale,
      get inheritLocale() {
        return _inheritLocale;
      },
      set inheritLocale(val) {
        _inheritLocale = val, val && __root && (_locale.value = __root.locale.value, _fallbackLocale.value = __root.fallbackLocale.value, updateFallbackLocale(_context, _locale.value, _fallbackLocale.value));
      },
      get availableLocales() {
        return Object.keys(_messages.value).sort();
      },
      messages,
      get modifiers() {
        return _modifiers;
      },
      get pluralRules() {
        return _pluralRules || {};
      },
      get isGlobal() {
        return _isGlobal;
      },
      get missingWarn() {
        return _missingWarn;
      },
      set missingWarn(val) {
        _missingWarn = val, _context.missingWarn = _missingWarn;
      },
      get fallbackWarn() {
        return _fallbackWarn;
      },
      set fallbackWarn(val) {
        _fallbackWarn = val, _context.fallbackWarn = _fallbackWarn;
      },
      get fallbackRoot() {
        return _fallbackRoot;
      },
      set fallbackRoot(val) {
        _fallbackRoot = val;
      },
      get fallbackFormat() {
        return _fallbackFormat;
      },
      set fallbackFormat(val) {
        _fallbackFormat = val, _context.fallbackFormat = _fallbackFormat;
      },
      get warnHtmlMessage() {
        return _warnHtmlMessage;
      },
      set warnHtmlMessage(val) {
        _warnHtmlMessage = val, _context.warnHtmlMessage = val;
      },
      get escapeParameter() {
        return _escapeParameter;
      },
      set escapeParameter(val) {
        _escapeParameter = val, _context.escapeParameter = val;
      },
      t,
      getLocaleMessage,
      setLocaleMessage,
      mergeLocaleMessage,
      getPostTranslationHandler,
      setPostTranslationHandler,
      getMissingHandler,
      setMissingHandler,
      [SetPluralRulesSymbol]: setPluralRules
    };
    return composer.datetimeFormats = datetimeFormats, composer.numberFormats = numberFormats, composer.rt = rt, composer.te = te, composer.tm = tm, composer.d = d, composer.n = n, composer.getDateTimeFormat = getDateTimeFormat, composer.setDateTimeFormat = setDateTimeFormat, composer.mergeDateTimeFormat = mergeDateTimeFormat, composer.getNumberFormat = getNumberFormat, composer.setNumberFormat = setNumberFormat, composer.mergeNumberFormat = mergeNumberFormat, composer[InejctWithOptionSymbol] = __injectWithOption, composer[TranslateVNodeSymbol] = translateVNode, composer[DatetimePartsSymbol] = datetimeParts, composer[NumberPartsSymbol] = numberParts, composer;
  }
  function convertComposerOptions(options) {
    const locale = isString(options.locale) ? options.locale : DEFAULT_LOCALE,
      fallbackLocale = isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === !1 ? options.fallbackLocale : locale,
      missing = isFunction(options.missing) ? options.missing : void 0,
      missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : !0,
      fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : !0,
      fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : !0,
      fallbackFormat = !!options.formatFallbackMessages,
      modifiers = isPlainObject(options.modifiers) ? options.modifiers : {},
      pluralizationRules = options.pluralizationRules,
      postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0,
      warnHtmlMessage = isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : !0,
      escapeParameter = !!options.escapeParameterHtml,
      inheritLocale = isBoolean(options.sync) ? options.sync : !0;
    let messages = options.messages;
    if (isPlainObject(options.sharedMessages)) {
      const sharedMessages = options.sharedMessages;
      messages = Object.keys(sharedMessages).reduce((messages2, locale2) => {
        const message = messages2[locale2] || (messages2[locale2] = {});
        return assign(message, sharedMessages[locale2]), messages2;
      }, messages || {});
    }
    const {
        __i18n,
        __root,
        __injectWithOption
      } = options,
      datetimeFormats = options.datetimeFormats,
      numberFormats = options.numberFormats,
      flatJson = options.flatJson;
    return {
      locale,
      fallbackLocale,
      messages,
      flatJson,
      datetimeFormats,
      numberFormats,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackRoot,
      fallbackFormat,
      modifiers,
      pluralRules: pluralizationRules,
      postTranslation,
      warnHtmlMessage,
      escapeParameter,
      messageResolver: options.messageResolver,
      inheritLocale,
      __i18n,
      __root,
      __injectWithOption
    };
  }
  function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options)),
      {
        __extender
      } = options,
      vueI18n = {
        // id
        id: composer.id,
        // locale
        get locale() {
          return composer.locale.value;
        },
        set locale(val) {
          composer.locale.value = val;
        },
        // fallbackLocale
        get fallbackLocale() {
          return composer.fallbackLocale.value;
        },
        set fallbackLocale(val) {
          composer.fallbackLocale.value = val;
        },
        // messages
        get messages() {
          return composer.messages.value;
        },
        // datetimeFormats
        get datetimeFormats() {
          return composer.datetimeFormats.value;
        },
        // numberFormats
        get numberFormats() {
          return composer.numberFormats.value;
        },
        // availableLocales
        get availableLocales() {
          return composer.availableLocales;
        },
        // missing
        get missing() {
          return composer.getMissingHandler();
        },
        set missing(handler) {
          composer.setMissingHandler(handler);
        },
        // silentTranslationWarn
        get silentTranslationWarn() {
          return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
        },
        set silentTranslationWarn(val) {
          composer.missingWarn = isBoolean(val) ? !val : val;
        },
        // silentFallbackWarn
        get silentFallbackWarn() {
          return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
        },
        set silentFallbackWarn(val) {
          composer.fallbackWarn = isBoolean(val) ? !val : val;
        },
        // modifiers
        get modifiers() {
          return composer.modifiers;
        },
        // formatFallbackMessages
        get formatFallbackMessages() {
          return composer.fallbackFormat;
        },
        set formatFallbackMessages(val) {
          composer.fallbackFormat = val;
        },
        // postTranslation
        get postTranslation() {
          return composer.getPostTranslationHandler();
        },
        set postTranslation(handler) {
          composer.setPostTranslationHandler(handler);
        },
        // sync
        get sync() {
          return composer.inheritLocale;
        },
        set sync(val) {
          composer.inheritLocale = val;
        },
        // warnInHtmlMessage
        get warnHtmlInMessage() {
          return composer.warnHtmlMessage ? "warn" : "off";
        },
        set warnHtmlInMessage(val) {
          composer.warnHtmlMessage = val !== "off";
        },
        // escapeParameterHtml
        get escapeParameterHtml() {
          return composer.escapeParameter;
        },
        set escapeParameterHtml(val) {
          composer.escapeParameter = val;
        },
        // pluralizationRules
        get pluralizationRules() {
          return composer.pluralRules || {};
        },
        // for internal
        __composer: composer,
        // t
        t(...args) {
          return Reflect.apply(composer.t, composer, [...args]);
        },
        // rt
        rt(...args) {
          return Reflect.apply(composer.rt, composer, [...args]);
        },
        // te
        te(key, locale) {
          return composer.te(key, locale);
        },
        // tm
        tm(key) {
          return composer.tm(key);
        },
        // getLocaleMessage
        getLocaleMessage(locale) {
          return composer.getLocaleMessage(locale);
        },
        // setLocaleMessage
        setLocaleMessage(locale, message) {
          composer.setLocaleMessage(locale, message);
        },
        // mergeLocaleMessage
        mergeLocaleMessage(locale, message) {
          composer.mergeLocaleMessage(locale, message);
        },
        // d
        d(...args) {
          return Reflect.apply(composer.d, composer, [...args]);
        },
        // getDateTimeFormat
        getDateTimeFormat(locale) {
          return composer.getDateTimeFormat(locale);
        },
        // setDateTimeFormat
        setDateTimeFormat(locale, format2) {
          composer.setDateTimeFormat(locale, format2);
        },
        // mergeDateTimeFormat
        mergeDateTimeFormat(locale, format2) {
          composer.mergeDateTimeFormat(locale, format2);
        },
        // n
        n(...args) {
          return Reflect.apply(composer.n, composer, [...args]);
        },
        // getNumberFormat
        getNumberFormat(locale) {
          return composer.getNumberFormat(locale);
        },
        // setNumberFormat
        setNumberFormat(locale, format2) {
          composer.setNumberFormat(locale, format2);
        },
        // mergeNumberFormat
        mergeNumberFormat(locale, format2) {
          composer.mergeNumberFormat(locale, format2);
        }
      };
    return vueI18n.__extender = __extender, vueI18n;
  }
  function defineMixin(vuei18n, composer, i18n2) {
    return {
      beforeCreate() {
        const instance = getCurrentInstance();
        if (!instance) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
        const options = this.$options;
        if (options.i18n) {
          const optionsI18n = options.i18n;
          if (options.__i18n && (optionsI18n.__i18n = options.__i18n), optionsI18n.__root = composer, this === this.$root) this.$i18n = mergeToGlobal(vuei18n, optionsI18n);else {
            optionsI18n.__injectWithOption = !0, optionsI18n.__extender = i18n2.__vueI18nExtend, this.$i18n = createVueI18n(optionsI18n);
            const _vueI18n = this.$i18n;
            _vueI18n.__extender && (_vueI18n.__disposer = _vueI18n.__extender(this.$i18n));
          }
        } else if (options.__i18n) {
          if (this === this.$root) this.$i18n = mergeToGlobal(vuei18n, options);else {
            this.$i18n = createVueI18n({
              __i18n: options.__i18n,
              __injectWithOption: !0,
              __extender: i18n2.__vueI18nExtend,
              __root: composer
            });
            const _vueI18n = this.$i18n;
            _vueI18n.__extender && (_vueI18n.__disposer = _vueI18n.__extender(this.$i18n));
          }
        } else this.$i18n = vuei18n;
        options.__i18nGlobal && adjustI18nResources(composer, options, options), this.$t = (...args) => this.$i18n.t(...args), this.$rt = (...args) => this.$i18n.rt(...args), this.$te = (key, locale) => this.$i18n.te(key, locale), this.$d = (...args) => this.$i18n.d(...args), this.$n = (...args) => this.$i18n.n(...args), this.$tm = key => this.$i18n.tm(key), i18n2.__setInstance(instance, this.$i18n);
      },
      mounted() {},
      unmounted() {
        const instance = getCurrentInstance();
        if (!instance) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
        const _vueI18n = this.$i18n;
        delete this.$t, delete this.$rt, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, _vueI18n.__disposer && (_vueI18n.__disposer(), delete _vueI18n.__disposer, delete _vueI18n.__extender), i18n2.__deleteInstance(instance), delete this.$i18n;
      }
    };
  }
  function mergeToGlobal(g, options) {
    g.locale = options.locale || g.locale, g.fallbackLocale = options.fallbackLocale || g.fallbackLocale, g.missing = options.missing || g.missing, g.silentTranslationWarn = options.silentTranslationWarn || g.silentFallbackWarn, g.silentFallbackWarn = options.silentFallbackWarn || g.silentFallbackWarn, g.formatFallbackMessages = options.formatFallbackMessages || g.formatFallbackMessages, g.postTranslation = options.postTranslation || g.postTranslation, g.warnHtmlInMessage = options.warnHtmlInMessage || g.warnHtmlInMessage, g.escapeParameterHtml = options.escapeParameterHtml || g.escapeParameterHtml, g.sync = options.sync || g.sync, g.__composer[SetPluralRulesSymbol](options.pluralizationRules || g.pluralizationRules);
    const messages = getLocaleMessages(g.locale, {
      messages: options.messages,
      __i18n: options.__i18n
    });
    return Object.keys(messages).forEach(locale => g.mergeLocaleMessage(locale, messages[locale])), options.datetimeFormats && Object.keys(options.datetimeFormats).forEach(locale => g.mergeDateTimeFormat(locale, options.datetimeFormats[locale])), options.numberFormats && Object.keys(options.numberFormats).forEach(locale => g.mergeNumberFormat(locale, options.numberFormats[locale])), g;
  }
  const baseFormatProps = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
      validator: val => val === "parent" || val === "global",
      default: "parent"
      /* ComponentI18nScope */
    },
    i18n: {
      type: Object
    }
  };
  function getInterpolateArg({
    slots
  }, keys) {
    return keys.length === 1 && keys[0] === "default" ? (slots.default ? slots.default() : []).reduce((slot, current) => [...slot,
    // prettier-ignore
    ...(current.type === Fragment ? current.children : [current])], []) : keys.reduce((arg, key) => {
      const slot = slots[key];
      return slot && (arg[key] = slot()), arg;
    }, create());
  }
  function getFragmentableTag() {
    return Fragment;
  }
  const Translation = /* @__PURE__ */defineComponent({
    /* eslint-disable */
    name: "i18n-t",
    props: assign({
      keypath: {
        type: String,
        required: !0
      },
      plural: {
        type: [Number, String],
        validator: val => isNumber(val) || !isNaN(val)
      }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const {
          slots,
          attrs
        } = context,
        i18n2 = props.i18n || useI18n({
          useScope: props.scope,
          __useComponent: !0
        });
      return () => {
        const keys = Object.keys(slots).filter(key => key[0] !== "_"),
          options = create();
        props.locale && (options.locale = props.locale), props.plural !== void 0 && (options.plural = isString(props.plural) ? +props.plural : props.plural);
        const arg = getInterpolateArg(context, keys),
          children = i18n2[TranslateVNodeSymbol](props.keypath, arg, options),
          assignedAttrs = assign(create(), attrs),
          tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
        return h(tag, assignedAttrs, children);
      };
    }
  });
  function isVNode(target) {
    return isArray(target) && !isString(target[0]);
  }
  function renderFormatter(props, context, slotKeys, partFormatter) {
    const {
      slots,
      attrs
    } = context;
    return () => {
      const options = {
        part: !0
      };
      let overrides = create();
      props.locale && (options.locale = props.locale), isString(props.format) ? options.key = props.format : isObject(props.format) && (isString(props.format.key) && (options.key = props.format.key), overrides = Object.keys(props.format).reduce((options2, prop) => slotKeys.includes(prop) ? assign(create(), options2, {
        [prop]: props.format[prop]
      }) : options2, create()));
      const parts = partFormatter(props.value, options, overrides);
      let children = [options.key];
      isArray(parts) ? children = parts.map((part, index) => {
        const slot = slots[part.type],
          node = slot ? slot({
            [part.type]: part.value,
            index,
            parts
          }) : [part.value];
        return isVNode(node) && (node[0].key = `${part.type}-${index}`), node;
      }) : isString(parts) && (children = [parts]);
      const assignedAttrs = assign(create(), attrs),
        tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
  const NumberFormat = /* @__PURE__ */defineComponent({
    /* eslint-disable */
    name: "i18n-n",
    props: assign({
      value: {
        type: Number,
        required: !0
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: !0
      });
      return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n2[NumberPartsSymbol](...args));
    }
  });
  function getComposer$1(i18n2, instance) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") return i18nInternal.__getInstance(instance) || i18n2.global;
    {
      const vueI18n = i18nInternal.__getInstance(instance);
      return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
    }
  }
  function vTDirective(i18n2) {
    const _process = binding => {
      const {
        instance,
        value
      } = binding;
      if (!instance || !instance.$) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      const composer = getComposer$1(i18n2, instance.$),
        parsedValue = parseValue(value);
      return [Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]), composer];
    };
    return {
      created: (el, binding) => {
        const [textContent, composer] = _process(binding);
        inBrowser && (el.__i18nWatcher = watch(composer.locale, () => {
          binding.instance && binding.instance.$forceUpdate();
        })), el.__composer = composer, el.textContent = textContent;
      },
      unmounted: el => {
        inBrowser && el.__i18nWatcher && (el.__i18nWatcher(), el.__i18nWatcher = void 0, delete el.__i18nWatcher), el.__composer && (el.__composer = void 0, delete el.__composer);
      },
      beforeUpdate: (el, {
        value
      }) => {
        if (el.__composer) {
          const composer = el.__composer,
            parsedValue = parseValue(value);
          el.textContent = Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]);
        }
      },
      getSSRProps: binding => {
        const [textContent] = _process(binding);
        return {
          textContent
        };
      }
    };
  }
  function parseValue(value) {
    if (isString(value)) return {
      path: value
    };
    if (isPlainObject(value)) {
      if (!("path" in value)) throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
      return value;
    } else throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
  function makeParams(value) {
    const {
        path,
        locale,
        args,
        choice,
        plural
      } = value,
      options = {},
      named = args || {};
    return isString(locale) && (options.locale = locale), isNumber(choice) && (options.plural = choice), isNumber(plural) && (options.plural = plural), [path, named, options];
  }
  function apply(app, i18n2, ...options) {
    const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
    (!isBoolean(pluginOptions.globalInstall) || pluginOptions.globalInstall) && ([Translation.name, "I18nT"].forEach(name => app.component(name, Translation)), [NumberFormat.name, "I18nN"].forEach(name => app.component(name, NumberFormat)), [DatetimeFormat.name, "I18nD"].forEach(name => app.component(name, DatetimeFormat))), app.directive("t", vTDirective(i18n2));
  }
  const I18nInjectionKey = /* @__PURE__ */makeSymbol("global-vue-i18n");
  function createI18n(options = {}) {
    const __legacyMode = __VUE_I18N_LEGACY_API__ && isBoolean(options.legacy) ? options.legacy : __VUE_I18N_LEGACY_API__,
      __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : !0,
      __instances = /* @__PURE__ */new Map(),
      [globalScope, __global] = createGlobal(options, __legacyMode),
      symbol = /* @__PURE__ */makeSymbol("");
    function __getInstance(component) {
      return __instances.get(component) || null;
    }
    function __setInstance(component, instance) {
      __instances.set(component, instance);
    }
    function __deleteInstance(component) {
      __instances.delete(component);
    }
    const i18n2 = {
      // mode
      get mode() {
        return __VUE_I18N_LEGACY_API__ && __legacyMode ? "legacy" : "composition";
      },
      // install plugin
      async install(app, ...options2) {
        if (app.__VUE_I18N_SYMBOL__ = symbol, app.provide(app.__VUE_I18N_SYMBOL__, i18n2), isPlainObject(options2[0])) {
          const opts = options2[0];
          i18n2.__composerExtend = opts.__composerExtend, i18n2.__vueI18nExtend = opts.__vueI18nExtend;
        }
        let globalReleaseHandler = null;
        !__legacyMode && __globalInjection && (globalReleaseHandler = injectGlobalFields(app, i18n2.global)), __VUE_I18N_FULL_INSTALL__ && apply(app, i18n2, ...options2), __VUE_I18N_LEGACY_API__ && __legacyMode && app.mixin(defineMixin(__global, __global.__composer, i18n2));
        const unmountApp = app.unmount;
        app.unmount = () => {
          globalReleaseHandler && globalReleaseHandler(), i18n2.dispose(), unmountApp();
        };
      },
      // global accessor
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      // @internal
      __instances,
      // @internal
      __getInstance,
      // @internal
      __setInstance,
      // @internal
      __deleteInstance
    };
    return i18n2;
  }
  function useI18n(options = {}) {
    const instance = getCurrentInstance();
    if (instance == null) throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
    if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
    const i18n2 = getI18nInstance(instance),
      gl = getGlobalComposer(i18n2),
      componentOptions = getComponentOptions(instance),
      scope = getScope(options, componentOptions);
    if (scope === "global") return adjustI18nResources(gl, options, componentOptions), gl;
    if (scope === "parent") {
      let composer2 = getComposer(i18n2, instance, options.__useComponent);
      return composer2 == null && (composer2 = gl), composer2;
    }
    const i18nInternal = i18n2;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
      const composerOptions = assign({}, options);
      "__i18n" in componentOptions && (composerOptions.__i18n = componentOptions.__i18n), gl && (composerOptions.__root = gl), composer = createComposer(composerOptions), i18nInternal.__composerExtend && (composer[DisposeSymbol] = i18nInternal.__composerExtend(composer)), setupLifeCycle(i18nInternal, instance, composer), i18nInternal.__setInstance(instance, composer);
    }
    return composer;
  }
  function createGlobal(options, legacyMode) {
    const scope = effectScope(),
      obj = __VUE_I18N_LEGACY_API__ && legacyMode ? scope.run(() => createVueI18n(options)) : scope.run(() => createComposer(options));
    if (obj == null) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    return [scope, obj];
  }
  function getI18nInstance(instance) {
    const i18n2 = inject(instance.isCE ? I18nInjectionKey : instance.appContext.app.__VUE_I18N_SYMBOL__);
    if (!i18n2) throw createI18nError(instance.isCE ? I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE : I18nErrorCodes.UNEXPECTED_ERROR);
    return i18n2;
  }
  function getScope(options, componentOptions) {
    return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : options.useScope ? options.useScope : "local";
  }
  function getGlobalComposer(i18n2) {
    return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  }
  function getComposer(i18n2, target, useComponent = !1) {
    let composer = null;
    const root = target.root;
    let current = getParentComponentInstance(target, useComponent);
    for (; current != null;) {
      const i18nInternal = i18n2;
      if (i18n2.mode === "composition") composer = i18nInternal.__getInstance(current);else if (__VUE_I18N_LEGACY_API__) {
        const vueI18n = i18nInternal.__getInstance(current);
        vueI18n != null && (composer = vueI18n.__composer, useComponent && composer && !composer[InejctWithOptionSymbol] && (composer = null));
      }
      if (composer != null || root === current) break;
      current = current.parent;
    }
    return composer;
  }
  function getParentComponentInstance(target, useComponent = !1) {
    return target == null ? null : useComponent && target.vnode.ctx || target.parent;
  }
  function setupLifeCycle(i18n2, target, composer) {
    onMounted(() => {}, target), onUnmounted(() => {
      const _composer = composer;
      i18n2.__deleteInstance(target);
      const dispose = _composer[DisposeSymbol];
      dispose && (dispose(), delete _composer[DisposeSymbol]);
    }, target);
  }
  const globalExportProps = ["locale", "fallbackLocale", "availableLocales"],
    globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
  function injectGlobalFields(app, composer) {
    const i18n2 = /* @__PURE__ */Object.create(null);
    return globalExportProps.forEach(prop => {
      const desc = Object.getOwnPropertyDescriptor(composer, prop);
      if (!desc) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      const wrap = isRef(desc.value) ? {
        get() {
          return desc.value.value;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set(val) {
          desc.value.value = val;
        }
      } : {
        get() {
          return desc.get && desc.get();
        }
      };
      Object.defineProperty(i18n2, prop, wrap);
    }), app.config.globalProperties.$i18n = i18n2, globalExportMethods.forEach(method => {
      const desc = Object.getOwnPropertyDescriptor(composer, method);
      if (!desc || !desc.value) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
    }), () => {
      delete app.config.globalProperties.$i18n, globalExportMethods.forEach(method => {
        delete app.config.globalProperties[`$${method}`];
      });
    };
  }
  const DatetimeFormat = /* @__PURE__ */defineComponent({
    /* eslint-disable */
    name: "i18n-d",
    props: assign({
      value: {
        type: [Number, Date],
        required: !0
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: !0
      });
      return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n2[DatetimePartsSymbol](...args));
    }
  });
  if (initFeatureFlags(), registerMessageCompiler(compile), registerMessageResolver(resolveValue), registerLocaleFallbacker(fallbackWithLocaleChain), __INTLIFY_PROD_DEVTOOLS__) {
    const target = getGlobalThis();
    target.__INTLIFY__ = !0, setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
  }
  const useStateStore = /* @__PURE__ */defineStore("dac-state", () => {
    const i18n2 = useI18n(),
      interfaceLanguage = ref("en"),
      hasRun = ref(!1);
    return watch(interfaceLanguage, async newValue => {
      i18n2.availableLocales.includes(newValue) && (i18n2.locale.value = newValue);
    }), {
      interfaceLanguage,
      hasRun
    };
  }, {
    persist: !0
  });
  const useConfigStore = /* @__PURE__ */defineStore("dac-config", () => {
    const state = useStateStore();
    let tabId = null;
    return {
      initConfig: async () => {
        const lang = (document.documentElement.lang || navigator.language || "en").split("-")[0];
        state.interfaceLanguage = Object.hasOwn(i18n.global.messages.value, lang) ? lang : "en", chrome.runtime.sendMessage({
          type: "GET_TAB_ID"
        }, reply => {
          chrome.runtime.lastError, tabId = reply?.tabId ?? null;
        });
      },
      incrementUsage: () => {},
      hasUsedActions: () => !1,
      activateTab: async () => {
        tabId && (await chrome.runtime.sendMessage({
          type: "ACTIVATE_TAB",
          tabId
        }));
      }
    };
  });
  async function sleep$1(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const CHANNEL = "dac-bridge",
    TIMEOUT = 3e4,
    INSTANCE = Math.random().toString(36).slice(2, 10),
    pending = /* @__PURE__ */new Map(),
    expired = /* @__PURE__ */new Set();
  let counter = 0,
    hasBridgeResponded = !1,
    hasForeignBridge = !1;
  const isForeignBridgeSeen = () => hasForeignBridge;
  window.addEventListener("message", event => {
    var _a, _b;
    if (event.source !== window || ((_a = event.data) == null ? void 0 : _a.channel) !== CHANNEL || ((_b = event.data) == null ? void 0 : _b.type) !== "response") return;
    const {
        requestId,
        result
      } = event.data,
      isOwnRequest = typeof requestId == "string" && requestId.startsWith(`dac-${INSTANCE}-`);
    if (result?.error === "unknown-action") {
      hasForeignBridge || (hasForeignBridge = isOwnRequest);
      return;
    }
    const resolve = pending.get(requestId);
    if (!resolve) {
      hasForeignBridge || (hasForeignBridge = isOwnRequest && !expired.has(requestId));
      return;
    }
    pending.delete(requestId), hasBridgeResponded = !0, resolve(result);
  });
  const send = (action, payload) => new Promise(resolve => {
    const requestId = `dac-${INSTANCE}-${++counter}`;
    pending.set(requestId, resolve), window.postMessage({
      channel: CHANNEL,
      type: "request",
      requestId,
      action,
      payload
    }, "*"), setTimeout(() => {
      if (pending.has(requestId)) {
        if (pending.delete(requestId), expired.add(requestId), hasBridgeResponded) {
          resolve({
            ok: !1,
            status: 0,
            error: "slow"
          });
          return;
        }
        reportError("bridge.timeout", null, {
          bridgeAction: action
        }), resolve({
          ok: !1,
          status: 0,
          error: "timeout"
        });
      }
    }, TIMEOUT);
  });
  function deleteConversation(conversationId) {
    return send("delete-conversation", {
      id: conversationId
    });
  }
  function archiveConversation(conversationId) {
    return send("archive-conversation", {
      id: conversationId
    });
  }
  function getAccountInfo() {
    return send("account-info");
  }
  const STORAGE_KEY = "dacBulkQueue",
    STOP_KEY = "dacBulkStop",
    QUEUE_TTL = 1440 * 60 * 1e3;
  function createQueue(action, keys) {
    return {
      action,
      pending: [...keys],
      total: keys.length,
      done: 0,
      failed: 0,
      // Ключ последнего удалённого (архивированного) чата: открыт в другой вкладке — она уйдёт на новый чат
      lastDone: null,
      startedAt: Date.now()
    };
  }
  async function loadQueue() {
    try {
      const stored = await chrome.storage.local.get(STORAGE_KEY),
        queue2 = stored?.[STORAGE_KEY];
      return !queue2 || !Array.isArray(queue2.pending) || queue2.pending.length === 0 ? null : Date.now() - (queue2.startedAt ?? 0) > QUEUE_TTL ? (await clearQueue(), null) : queue2;
    } catch (e) {
      return reportError("queue.load", e), null;
    }
  }
  async function saveQueue(queue2) {
    try {
      await chrome.storage.local.set({
        [STORAGE_KEY]: queue2
      });
    } catch (e) {
      reportError("queue.save", e);
    }
  }
  async function clearQueue() {
    try {
      await chrome.storage.local.remove([STORAGE_KEY, STOP_KEY]);
    } catch (e) {
      reportError("queue.clear", e);
    }
  }
  async function requestStop(startedAt) {
    try {
      await chrome.storage.local.set({
        [STOP_KEY]: startedAt
      });
    } catch (e) {
      reportError("queue.stop", e);
    }
  }
  function listenQueue({
    onQueue,
    onStop
  }) {
    chrome.storage.onChanged.addListener((changes, area) => {
      var _a;
      area === "local" && (STORAGE_KEY in changes && onQueue(changes[STORAGE_KEY].newValue ?? null), (_a = changes[STOP_KEY]) != null && _a.newValue && onStop(changes[STOP_KEY].newValue));
    });
  }
  const DONE_MARK = "\u2705 ";
  function markTabDone() {
    if (!document.hidden || document.title.startsWith(DONE_MARK)) return;
    document.title = DONE_MARK + document.title;
    const unmark = () => {
      document.hidden || (document.removeEventListener("visibilitychange", unmark), document.title.startsWith(DONE_MARK) && (document.title = document.title.slice(DONE_MARK.length)));
    };
    document.addEventListener("visibilitychange", unmark);
  }
  const getOpenConversationId = () => {
      var _a;
      return ((_a = /\/c\/([^/?#]+)/.exec(location.pathname)) == null ? void 0 : _a[1]) ?? null;
    },
    openNewChat = () => {
      var _a;
      history.pushState({
        usr: null,
        key: Math.random().toString(36).slice(2, 10),
        idx: (((_a = history.state) == null ? void 0 : _a.idx) ?? -1) + 1
      }, "", "/"), window.dispatchEvent(new PopStateEvent("popstate", {
        state: history.state
      }));
    };
  function leaveConversation(conversationId) {
    conversationId && getOpenConversationId() === conversationId && openNewChat();
  }
  const ENTRY_MOUNT_ID = "dac-sidebar-entry",
    RAIL_ENTRY_MOUNT_ID = "dac-rail-entry",
    CHAT_LINK = 'a[href*="/c/"]',
    SECTION_HEADER = '[class~="group/sidebar-expando-section-header"]',
    SECTION = '[class~="group/sidebar-expando-section"]',
    RAIL = "#stage-sidebar-tiny-bar",
    SHELL_SECTION = "section[data-app-action-sidebar-section]",
    SHELL_CHATS_SECTION = `${SHELL_SECTION}[data-app-action-sidebar-section-heading="Recents"]`,
    SHELL_SECTION_HEADER = '[class~="group/nav-section-title"]',
    SHELL_SECTION_TOGGLE = "[data-app-action-sidebar-section-toggle]",
    SHELL_RAIL = "nav[data-app-navigation-rail]",
    SHELL_PINNED_SECTION = `${SHELL_SECTION}[data-app-action-sidebar-section-heading="Pinned"]`,
    SHELL_PROJECTS_SECTION = `${SHELL_SECTION}[data-app-action-sidebar-section-heading="Projects"]`,
    SHELL_CHAT_ROW = "[data-sidebar-chatgpt-conversation-key]",
    SHELL_PROJECT_ROW = "[data-app-action-sidebar-project-row]",
    findSectionList = section => {
      const links = section?.querySelectorAll(CHAT_LINK) ?? [];
      if (links.length === 0) return null;
      const roleList = section.querySelector(`[role="list"]:has(${CHAT_LINK})`);
      if (roleList) return roleList;
      let container = links[0].parentElement;
      for (; container !== section && container.querySelectorAll(CHAT_LINK).length < links.length;) container = container.parentElement;
      return container;
    },
    findHistory = () => {
      var _a;
      return document.getElementById("history") ?? ((_a = document.querySelector(SHELL_CHAT_ROW)) == null ? void 0 : _a.closest('[role="list"]')) ?? findSectionList(document.querySelector(SHELL_CHATS_SECTION)) ?? null;
    },
    describeChatRows = () => {
      var _a;
      const recents = document.querySelector(SHELL_CHATS_SECTION),
        link = recents?.querySelector(CHAT_LINK) ?? Array.from(document.querySelectorAll(CHAT_LINK)).find(item => !item.closest("main")),
        names = /* @__PURE__ */new Set();
      for (let current = link, depth = 0; current && depth < 10 && !current.matches(SHELL_SECTION); current = current.parentElement, depth++) Object.keys(current.dataset).forEach(name => names.add(name));
      return {
        chatRowAttrs: link ? Array.from(names).sort().join(",") : null,
        chatRowSection: ((_a = link?.closest(SHELL_SECTION)) == null ? void 0 : _a.dataset.appActionSidebarSectionHeading) ?? null,
        recentsChats: recents?.querySelectorAll(CHAT_LINK).length ?? null,
        recentsKeyRows: recents?.querySelectorAll(SHELL_CHAT_ROW).length ?? null,
        recentsRoleList: recents ? !!recents.querySelector('[role="list"]') : null
      };
    },
    countHistoryChatLinks = () => Array.from(document.querySelectorAll(CHAT_LINK)).filter(link => !link.closest(`main, [role="dialog"], ${SHELL_PINNED_SECTION}, ${SHELL_PROJECTS_SECTION}`)).length,
    findPinnedList = () => document.querySelector(`${SHELL_PINNED_SECTION} [role="list"]`),
    findClassicSectionLists = () => Array.from(document.querySelectorAll(SECTION)).filter(section => !section.querySelector("#history")).map(section => section.querySelector(":scope > ul")).filter(list => list?.querySelector(CHAT_LINK)),
    isProjectPage = () => /^\/g\/g-p-[^/]+\/project\/?$/.test(location.pathname),
    findProjectPageList = () => isProjectPage() ? document.querySelector(`main ol:has(${CHAT_LINK})`) : null,
    findProjectPageHeader = () => {
      var _a;
      return isProjectPage() ? ((_a = document.querySelector("main h1")) == null ? void 0 : _a.parentElement) ?? null : null;
    },
    findProjectRow = projectId => document.querySelector(`${SHELL_PROJECT_ROW}[data-app-action-sidebar-project-id="${CSS.escape(projectId)}"]`),
    PROJECT_CONTAINER = "[data-sidebar-project-container-id]",
    findProjectList = projectRow => {
      var _a;
      return ((_a = projectRow.closest(PROJECT_CONTAINER) ?? projectRow.parentElement) == null ? void 0 : _a.querySelector('[role="list"]')) ?? null;
    },
    findShowMore = list => list.querySelector(':scope > [role="listitem"]:not(:has(a)) > button'),
    findChatLists = () => [findHistory(), findPinnedList(), ...findClassicSectionLists(), ...Array.from(document.querySelectorAll(SHELL_PROJECT_ROW), findProjectList), findProjectPageList()].filter(Boolean),
    findChatRow = link => link.closest(`${SHELL_SECTION} [role="listitem"], main li`) ?? link,
    findCheckboxSlot = link => link.closest("main") ? link.firstElementChild ?? link : link,
    findShellChatsSection = () => {
      var _a;
      return ((_a = document.querySelector(SHELL_CHAT_ROW)) == null ? void 0 : _a.closest(SHELL_SECTION)) ?? document.querySelector(SHELL_CHATS_SECTION);
    },
    findHeader = () => {
      var _a, _b, _c, _d;
      return ((_b = (_a = document.getElementById("history")) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.querySelector(`:scope > ${SECTION_HEADER}`)) ?? ((_c = document.querySelector(`${SECTION_HEADER} a[data-trailing-button][href="/"]`)) == null ? void 0 : _c.closest(SECTION_HEADER)) ?? ((_d = findShellChatsSection()) == null ? void 0 : _d.querySelector(SHELL_SECTION_HEADER)) ?? null;
    },
    findSectionToggle = header => header?.querySelector(`:scope > button[aria-expanded], ${SHELL_SECTION_TOGGLE}`) ?? null,
    isChatsCollapsed = header => {
      var _a;
      return ((_a = findSectionToggle(header)) == null ? void 0 : _a.getAttribute("aria-expanded")) === "false";
    },
    hasChats = () => findChatLists().some(list => list.querySelector(CHAT_LINK)),
    getPageKind = () => location.pathname.split("/")[1] || "home",
    expandChats = () => {
      const toggle = findSectionToggle(findHeader());
      toggle?.getAttribute("aria-expanded") === "false" && toggle.click();
    },
    findRail = () => document.querySelector(`${RAIL}, ${SHELL_RAIL}`),
    findRailGroup = () => {
      var _a, _b;
      return ((_b = (_a = document.querySelector(`${RAIL} [data-testid="create-new-chat-button"]`)) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.parentElement) ?? document.querySelector(`${SHELL_RAIL} > [class~="group/nav-list"]`) ?? null;
    },
    openSidebar = () => {
      var _a;
      (_a = document.querySelector(`${RAIL} button[aria-controls="stage-slideover-sidebar"], ${SHELL_RAIL} button[data-app-shell-sidebar-trigger]`)) == null || _a.click();
    },
    isVisible = element => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && element.checkVisibility({
        checkOpacity: !0,
        checkVisibilityCSS: !0,
        opacityProperty: !0,
        visibilityProperty: !0
      });
    },
    MAX_ATTEMPTS = 5,
    PARALLEL = 2,
    ESTIMATE_PER_CHAT = 7e3,
    QUEUE_LOCK = "dac-bulk-queue",
    TAB_ID = crypto.randomUUID(),
    BACKGROUND_NOTICE_TTL = 5e3,
    RESULT_TTL = 4e3,
    RETRY_DELAYS = [5e3, 15e3, 3e4, 6e4, 12e4],
    MARKUP_CHECK_DELAY = 1e4,
    HISTORY_SYNC_DELAY = 200,
    PROJECT_LOAD_TIMEOUT = 8e3,
    PROJECT_LOAD_POLL = 100,
    CHAT_RESULT = Object.freeze({
      SUCCESS: "success",
      FAILED: "failed",
      FATAL: "fatal",
      STOPPED: "stopped",
      // Чат вернулся в общий список: его доделает исполнитель, оставшийся после лимита
      REQUEUE: "requeue"
    }),
    FATAL_ERRORS = ["no-auth", "timeout", "unknown-action", "exception"],
    FATAL_STATUSES = [401, 403],
    NOT_FOUND_SUSPICIOUS = 3,
    RETRIABLE_ERRORS = ["network", "slow"],
    RETRIABLE_STATUSES = [429, 500, 502, 503, 504],
    isFatalResult = result => FATAL_ERRORS.includes(result.error) || FATAL_STATUSES.includes(result.status),
    isRetriableResult = result => RETRIABLE_ERRORS.includes(result.error) || RETRIABLE_STATUSES.includes(result.status),
    useBulkActionsStore = /* @__PURE__ */defineStore("dac-bulk-actions", () => {
      const notificationStore = useNotificationsStore(),
        i18n2 = useI18n(),
        isBulkActionsModeEnable = ref(!1),
        isAllChatsSelected = ref(!1),
        countChatsSelected = ref(0),
        bulkStatus = ref(BULK_STATUS.IDLE),
        bulkAction = ref(null),
        bulkTotal = ref(0),
        bulkDone = ref(0),
        bulkFailed = ref(0),
        cooldownLeft = ref(0),
        pendingCount = ref(0),
        isStopping = ref(!1),
        isRunning2 = computed(() => bulkStatus.value !== BULK_STATUS.IDLE),
        isBackground = ref(!1),
        isElsewhere = ref(!1),
        runPercent = computed(() => bulkTotal.value ? Math.min(100, Math.round((bulkDone.value + bulkFailed.value) / bulkTotal.value * 100)) : 0),
        runStartedAt = ref(0),
        runStartProcessed = ref(0),
        etaMinutes = computed(() => {
          const processed = bulkDone.value + bulkFailed.value,
            processedThisRun = processed - runStartProcessed.value,
            perChat = processedThisRun >= PARALLEL ? (Date.now() - runStartedAt.value) / processedThisRun : ESTIMATE_PER_CHAT;
          return Math.max(1, Math.ceil((bulkTotal.value - processed) * perChat / 6e4));
        }),
        isCooldown = computed(() => bulkStatus.value === BULK_STATUS.COOLDOWN),
        isDeleting = computed(() => isRunning2.value && bulkAction.value === ACTIONS.DELETING),
        hasPendingQueue = computed(() => !isRunning2.value && pendingCount.value > 0);
      let queue2 = null,
        mirrored = null,
        isClaiming = !1,
        stopRequested = !1,
        isInterrupted = !1,
        isRateLimitReported = !1,
        fatalReason = null,
        fatalDetail = null,
        runSucceeded = 0,
        runNotFound = 0,
        runFailed = 0,
        lastFailure = null,
        cooldownUntil = 0,
        parallel = PARALLEL;
      const configStore = useConfigStore(),
        stateStore = useStateStore(),
        hasRun = () => stateStore.hasRun || configStore.hasUsedActions();
      watch(isBulkActionsModeEnable, async newValue => {
        newValue === !0 ? (syncHistory(), observePage(), checkChatGptMarkup()) : (isBackground.value || stopBulkAction(), stopObservingPage(), removeCheckboxesFromChats(), removeCheckboxesToTimestamps(), reset()), checkAllChatsSelected();
      });
      const checkChatGptMarkup = () => {
        setTimeout(() => {
          if (!isBulkActionsModeEnable.value || findHistory()) return;
          const chatLinks = countHistoryChatLinks();
          chatLinks !== 0 && reportError("chatgpt.history_missing", null, {
            chatLinks,
            page: getPageKind(),
            width: window.innerWidth,
            ...describeChatRows()
          });
        }, MARKUP_CHECK_DELAY);
      };
      let pageObserver = null,
        historySyncTimer = null;
      const syncHistory = () => {
          historySyncTimer = null, isBulkActionsModeEnable.value && (addCheckboxesToChats(), addCheckboxesToProjects(), addProjectPageCheckbox(), addCheckboxesToTimestamps(), checkAllChatsSelected());
        },
        scheduleHistorySync = () => {
          historySyncTimer || (historySyncTimer = setTimeout(syncHistory, HISTORY_SYNC_DELAY));
        },
        observePage = () => {
          pageObserver = new MutationObserver(scheduleHistorySync), pageObserver.observe(document.body, {
            childList: !0,
            subtree: !0
          });
        },
        stopObservingPage = () => {
          pageObserver?.disconnect(), pageObserver = null, clearTimeout(historySyncTimer), historySyncTimer = null;
        },
        reset = () => {
          isAllChatsSelected.value = !1, countChatsSelected.value = 0;
        },
        getChatKey = chatItem => chatItem?.getAttribute("href") ?? null,
        getConversationId = key => {
          const match = /\/c\/([^/?#]+)/.exec(key ?? "");
          return match ? match[1] : null;
        },
        getLinkId = link => getConversationId(getChatKey(link)),
        getCheckboxId = checkbox => getLinkId(checkbox.closest("a")),
        findChatCheckboxes = () => findChatLists().flatMap(list => Array.from(list.querySelectorAll(".dac-dialog-checkbox"))),
        findCheckedIds = () => new Set(findChatCheckboxes().filter(checkbox => checkbox.checked).map(getCheckboxId).filter(Boolean)),
        findChatLinks = key => findChatLists().flatMap(list => Array.from(list.querySelectorAll(CHAT_LINK))).filter(link => getLinkId(link) === getConversationId(key));
      let isProjectPageAllSelected = !1;
      const checkAllChatsSelected = () => {
          var _a;
          const historyCheckboxes = Array.from(((_a = findHistory()) == null ? void 0 : _a.querySelectorAll(".dac-dialog-checkbox")) ?? []);
          isAllChatsSelected.value = historyCheckboxes.length > 0 && historyCheckboxes.every(checkbox => checkbox.checked), countChatsSelected.value = findCheckedIds().size, syncProjectCheckboxes(), syncProjectPageCheckbox();
        },
        setChatsChecked = (ids, checked) => {
          findChatCheckboxes().filter(checkbox => ids.has(getCheckboxId(checkbox))).forEach(checkbox => {
            checkbox.checked = checked;
          }), checkAllChatsSelected();
        },
        setAllChatsChecked = checked => {
          var _a;
          const ids = checked ? new Set(Array.from(((_a = findHistory()) == null ? void 0 : _a.querySelectorAll(CHAT_LINK)) ?? [], getLinkId)) : findCheckedIds();
          setChatsChecked(ids, checked);
        },
        addCheckboxesToTimestamps = () => {
          const history2 = findHistory();
          if (!history2) return;
          history2.querySelectorAll("h2").forEach((timestamp, index) => {
            if (timestamp.querySelector(".dac-timestamp-checkbox")) return;
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox", checkbox.classList.add("dac-timestamp-checkbox"), checkbox.dataset.timestampId = index, checkbox.addEventListener("change", () => {
              selectChatsByTimestamp(checkbox);
            }), timestamp.prepend(checkbox);
          });
        },
        removeCheckboxesToTimestamps = () => {
          const historyBlock = findHistory();
          if (!historyBlock) return;
          historyBlock.querySelectorAll(".dac-timestamp-checkbox").forEach(checkbox => {
            checkbox.remove();
          });
        },
        selectChatsByTimestamp = timestampCheckbox => {
          const history2 = findHistory(),
            heading = timestampCheckbox.closest("h2");
          if (!history2 || !heading) return;
          const headings = Array.from(history2.querySelectorAll("h2")),
            nextHeading = headings[headings.indexOf(heading) + 1] ?? null,
            checkboxes = Array.from(history2.querySelectorAll(".dac-dialog-checkbox")).filter(checkbox => heading.compareDocumentPosition(checkbox) & Node.DOCUMENT_POSITION_FOLLOWING && (!nextHeading || nextHeading.compareDocumentPosition(checkbox) & Node.DOCUMENT_POSITION_PRECEDING));
          checkboxes.length === 0 && reportError("chatgpt.date_group_empty", null, {
            groups: headings.length
          }), checkboxes.forEach(dialog => {
            dialog.checked = timestampCheckbox.checked;
          }), checkAllChatsSelected();
        },
        addCheckboxesToChats = () => {
          const history2 = findHistory(),
            projectPageList = findProjectPageList(),
            checkedIds = findCheckedIds();
          findChatLists().forEach(list => {
            list.querySelectorAll(CHAT_LINK).forEach(dialog => {
              if (dialog.dataset.dacRemoved === "true" || dialog.querySelector(".dac-dialog-checkbox")) return;
              const checkbox = document.createElement("input");
              checkbox.type = "checkbox", checkbox.classList.add("dac-dialog-checkbox"), checkbox.checked = isAllChatsSelected.value && list === history2 || isProjectPageAllSelected && list === projectPageList || checkedIds.has(getLinkId(dialog)), checkbox.addEventListener("change", () => {
                setChatsChecked(/* @__PURE__ */new Set([getCheckboxId(checkbox)]), checkbox.checked);
              }), checkbox.addEventListener("click", e => {
                e.stopPropagation();
              }), findCheckboxSlot(dialog).prepend(checkbox), dialog.dataset.hasCheckboxListener || (dialog.addEventListener("click", handleCheckboxClick), dialog.dataset.hasCheckboxListener = "true");
            });
          });
        },
        removeCheckboxesFromChats = () => {
          document.querySelectorAll(".dac-dialog-checkbox").forEach(checkbox => {
            checkbox.remove();
          }), document.querySelectorAll("[data-has-checkbox-listener]").forEach(dialog => {
            dialog.style.pointerEvents = "", dialog.style.cursor = "", dialog.removeEventListener("click", handleCheckboxClick), delete dialog.dataset.hasCheckboxListener;
          }), removeCheckboxesFromProjects();
        },
        loadingProjects = /* @__PURE__ */new Set(),
        waitFor = async check => {
          const deadline = Date.now() + PROJECT_LOAD_TIMEOUT;
          for (; Date.now() < deadline;) {
            if (check()) return !0;
            await sleep$1(PROJECT_LOAD_POLL);
          }
          return !1;
        },
        findProjectChatLinks = projectId => {
          const row = findProjectRow(projectId),
            list = row ? findProjectList(row) : null;
          return Array.from(list?.querySelectorAll(CHAT_LINK) ?? []).filter(link => link.dataset.dacRemoved !== "true");
        },
        findProjectShowMore = projectId => {
          const row = findProjectRow(projectId),
            list = row ? findProjectList(row) : null;
          return list ? findShowMore(list) : null;
        },
        loadProjectChats = async projectId => {
          const row = findProjectRow(projectId);
          if (row?.getAttribute("aria-expanded") === "false" && row.click(), !!(await waitFor(() => findProjectChatLinks(projectId).length > 0))) for (; isBulkActionsModeEnable.value;) {
            const showMore = findProjectShowMore(projectId);
            if (!showMore) return;
            const loaded = findProjectChatLinks(projectId).length;
            if (showMore.click(), !(await waitFor(() => findProjectChatLinks(projectId).length > loaded))) return;
          }
        },
        selectProjectChats = async (projectId, checked) => {
          if (checked) {
            loadingProjects.add(projectId), syncProjectCheckboxes();
            try {
              await loadProjectChats(projectId);
            } finally {
              loadingProjects.delete(projectId);
            }
            if (!isBulkActionsModeEnable.value) return;
            addCheckboxesToChats();
          }
          setChatsChecked(new Set(findProjectChatLinks(projectId).map(getLinkId)), checked);
        },
        addCheckboxesToProjects = () => {
          document.querySelectorAll(SHELL_PROJECT_ROW).forEach(row => {
            var _a;
            if (row.querySelector(".dac-project-checkbox")) return;
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox", checkbox.classList.add("dac-project-checkbox"), checkbox.addEventListener("click", e => {
              e.stopPropagation();
            }), checkbox.addEventListener("keydown", e => {
              e.stopPropagation();
            }), checkbox.addEventListener("change", () => {
              var _a2;
              const projectId = (_a2 = checkbox.closest(SHELL_PROJECT_ROW)) == null ? void 0 : _a2.dataset.appActionSidebarProjectId;
              projectId && selectProjectChats(projectId, checkbox.checked).catch(e => reportError("project.select", e));
            }), (_a = row.firstElementChild) == null || _a.prepend(checkbox);
          });
        },
        removeCheckboxesFromProjects = () => {
          document.querySelectorAll(".dac-project-checkbox").forEach(checkbox => {
            checkbox.remove();
          }), loadingProjects.clear();
        },
        syncProjectCheckboxes = () => {
          document.querySelectorAll(`${SHELL_PROJECT_ROW} .dac-project-checkbox`).forEach(checkbox => {
            var _a;
            const projectId = ((_a = checkbox.closest(SHELL_PROJECT_ROW)) == null ? void 0 : _a.dataset.appActionSidebarProjectId) ?? "",
              isLoading = loadingProjects.has(projectId),
              chats = findProjectChatLinks(projectId).map(link => link.querySelector(".dac-dialog-checkbox")).filter(Boolean),
              checkedCount = chats.filter(chat => chat.checked).length;
            checkbox.classList.toggle("dac-checkbox--busy", isLoading), checkbox.disabled = isLoading, checkbox.checked = checkedCount > 0 && checkedCount === chats.length && !findProjectShowMore(projectId), checkbox.indeterminate = checkedCount > 0 && !checkbox.checked;
          });
        },
        findProjectPageCheckboxes = () => {
          var _a;
          return Array.from(((_a = findProjectPageList()) == null ? void 0 : _a.querySelectorAll(".dac-dialog-checkbox")) ?? []);
        },
        addProjectPageCheckbox = () => {
          const header = findProjectPageHeader();
          if (!header || !findProjectPageList() || header.querySelector(":scope > .dac-project-checkbox")) return;
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox", checkbox.classList.add("dac-project-checkbox"), checkbox.addEventListener("change", () => {
            setChatsChecked(new Set(findProjectPageCheckboxes().map(getCheckboxId)), checkbox.checked);
          }), header.prepend(checkbox);
        },
        syncProjectPageCheckbox = () => {
          var _a;
          const chats = findProjectPageCheckboxes(),
            checkedCount = chats.filter(chat => chat.checked).length;
          isProjectPageAllSelected = checkedCount > 0 && checkedCount === chats.length;
          const checkbox = (_a = findProjectPageHeader()) == null ? void 0 : _a.querySelector(":scope > .dac-project-checkbox");
          checkbox && (checkbox.checked = isProjectPageAllSelected, checkbox.indeterminate = checkedCount > 0 && !isProjectPageAllSelected);
        };
      function handleCheckboxClick(e) {
        e.preventDefault();
        const checkbox = this.querySelector(".dac-dialog-checkbox");
        checkbox && (checkbox.checked = !checkbox.checked, checkbox.dispatchEvent(new Event("change")));
      }
      const collectSelectedKeys = () => {
          const checked = findChatCheckboxes().filter(checkbox => checkbox.checked),
            keys = /* @__PURE__ */new Map();
          return checked.forEach(checkbox => {
            const id2 = getCheckboxId(checkbox);
            id2 && !keys.has(id2) && keys.set(id2, getChatKey(checkbox.closest("a")));
          }), checked.length > 0 && keys.size === 0 && reportError("chatgpt.conversation_id_missing", null, {
            selected: checked.length
          }), Array.from(keys.values());
        },
        hideLink = chatItem => {
          var _a;
          chatItem.dataset.dacRemoved = "true", findChatRow(chatItem).style.display = "none", (_a = chatItem.querySelector(".dac-dialog-checkbox")) == null || _a.remove();
        },
        hideChatItem = key => {
          findChatLinks(key).forEach(hideLink);
        },
        hiddenKeys = /* @__PURE__ */new Set();
      let hiddenObserver = null,
        hiddenSyncTimer = null;
      const rehideChats = () => {
          hiddenSyncTimer = null;
          const ids = new Set(Array.from(hiddenKeys, getConversationId));
          findChatLists().flatMap(list => Array.from(list.querySelectorAll(CHAT_LINK))).filter(link => link.dataset.dacRemoved !== "true" && ids.has(getLinkId(link))).forEach(hideLink);
        },
        watchHiddenChats = () => {
          hiddenObserver || (hiddenObserver = new MutationObserver(() => {
            hiddenSyncTimer ?? (hiddenSyncTimer = setTimeout(rehideChats, HISTORY_SYNC_DELAY));
          }), hiddenObserver.observe(document.body, {
            childList: !0,
            subtree: !0
          }));
        },
        stopWatchingHiddenChats = () => {
          hiddenObserver?.disconnect(), hiddenObserver = null, clearTimeout(hiddenSyncTimer), hiddenSyncTimer = null;
        },
        showChat = key => {
          hiddenKeys.delete(key) && (findChatLinks(key).forEach(chatItem => {
            delete chatItem.dataset.dacRemoved, findChatRow(chatItem).style.display = "";
          }), hiddenKeys.size === 0 && stopWatchingHiddenChats(), scheduleHistorySync());
        },
        hidePending = keys => {
          keys.forEach(key => {
            hiddenKeys.add(key), hideChatItem(key);
          }), watchHiddenChats();
        },
        sendToBackground = () => {
          isRunning2.value && (hidePending((isElsewhere.value ? mirrored : queue2).pending), isBackground.value = !0, isBulkActionsModeEnable.value = !1);
        },
        setChatBusy = (key, isBusy) => {
          findChatLinks(key).forEach(chatItem => {
            var _a;
            (_a = chatItem.querySelector(".dac-dialog-checkbox")) == null || _a.classList.toggle("dac-checkbox--busy", isBusy);
          });
        },
        waitForCooldown = async () => {
          for (; !stopRequested && Date.now() < cooldownUntil;) {
            const left = cooldownUntil - Date.now();
            bulkStatus.value = BULK_STATUS.COOLDOWN, cooldownLeft.value = Math.ceil(left / 1e3), await sleep$1(Math.min(250, left));
          }
          cooldownLeft.value = 0, bulkStatus.value === BULK_STATUS.COOLDOWN && (bulkStatus.value = BULK_STATUS.RUNNING);
        },
        coolDown = async ms => {
          cooldownUntil = Math.max(cooldownUntil, Date.now() + ms), await waitForCooldown();
        },
        reportRateLimit = () => {
          isRateLimitReported || (isRateLimitReported = !0, notificationStore.addNotification(i18n2.t("notification.bulk_rate_limited"), NOTIFICATION_TYPE.NOTE, 8e3));
        },
        runConversationAction = conversationId => bulkAction.value === ACTIONS.DELETING ? deleteConversation(conversationId) : archiveConversation(conversationId),
        processChat = async (key, workerIndex) => {
          const conversationId = getConversationId(key);
          if (!conversationId) return CHAT_RESULT.FAILED;
          for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            if (await waitForCooldown(), stopRequested || isInterrupted) return CHAT_RESULT.STOPPED;
            const result = await runConversationAction(conversationId);
            if (result.ok || result.status === 404) return hideChatItem(key), hiddenKeys.add(key), result.ok ? runSucceeded++ : runNotFound++, CHAT_RESULT.SUCCESS;
            lastFailure = result;
            const isChatForbidden = result.status === 403 && runSucceeded > 0;
            if (isFatalResult(result) && !isChatForbidden) return fatalReason = result.error ?? `status-${result.status}`, fatalDetail = result.detail ?? null, CHAT_RESULT.FATAL;
            if (isChatForbidden || !isRetriableResult(result)) return CHAT_RESULT.FAILED;
            if (attempt === MAX_ATTEMPTS) break;
            if (stopRequested) return CHAT_RESULT.STOPPED;
            result.status === 429 && (parallel = 1, reportRateLimit());
            const delay = RETRY_DELAYS[Math.min(attempt - 1, RETRY_DELAYS.length - 1)];
            if (workerIndex >= parallel) return cooldownUntil = Math.max(cooldownUntil, Date.now() + delay), CHAT_RESULT.REQUEUE;
            await coolDown(delay);
          }
          return CHAT_RESULT.FAILED;
        },
        persistQueue = async () => {
          pendingCount.value = queue2.pending.length, bulkDone.value = queue2.done, bulkFailed.value = queue2.failed, await saveQueue(queue2);
        },
        runChat = async (key, workerIndex) => {
          let result;
          setChatBusy(key, !0);
          try {
            result = await processChat(key, workerIndex);
          } finally {
            setChatBusy(key, !1);
          }
          if (result === CHAT_RESULT.STOPPED || result === CHAT_RESULT.REQUEUE) return result;
          if (result === CHAT_RESULT.FATAL) {
            isInterrupted = !0;
            return;
          }
          queue2.pending = queue2.pending.filter(item => item !== key), queue2.lastDone = result === CHAT_RESULT.SUCCESS ? key : null, result === CHAT_RESULT.SUCCESS ? (queue2.done++, leaveConversation(getConversationId(key))) : (queue2.failed++, runFailed++, showChat(key)), await persistQueue();
        },
        runQueue = async () => {
          const keys = [...queue2.pending];
          let next = 0;
          const runWorker = async index => {
            for (; index < parallel && next < keys.length && !stopRequested && !isInterrupted;) {
              const key = keys[next++];
              (await runChat(key, index)) === CHAT_RESULT.REQUEUE && keys.push(key);
            }
          };
          await Promise.all(Array.from({
            length: PARALLEL
          }, (_2, index) => runWorker(index))), await runWorker(0);
        },
        notifyResult = ({
          action,
          isStopped,
          isFatal,
          done,
          total
        }) => {
          if (isFatal) {
            notificationStore.addNotification(i18n2.t("notification.bulk_interrupted", {
              done,
              total
            }), NOTIFICATION_TYPE.ERROR, 0);
            return;
          }
          const type = done === total ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.NOTE;
          if (isStopped) {
            notificationStore.addNotification(i18n2.t("notification.bulk_stopped", {
              done,
              total
            }), type, 5e3);
            return;
          }
          notificationStore.addNotification(i18n2.t(action === ACTIONS.DELETING ? "notification.bulk_deleted" : "notification.bulk_archived", {
            done,
            total
          }), type, RESULT_TTL);
        },
        finishBulkAction = async () => {
          const {
              action,
              done,
              total
            } = queue2,
            isStopped = stopRequested,
            isFatal = isInterrupted;
          if (queue2.pending.forEach(showChat), isBackground.value = !1, done > 0 && (await logAction(action, {
            count: done,
            seconds: Math.round((Date.now() - runStartedAt.value) / 1e3)
          }), configStore.incrementUsage(action), stateStore.hasRun = !0), runFailed > 0 && reportError("bulk.failed", null, {
            bulkAction: action,
            failed: runFailed,
            total,
            reason: lastFailure ? lastFailure.error ?? `status-${lastFailure.status}` : "no-conversation-id",
            detail: lastFailure?.detail ?? null
          }), runNotFound >= NOT_FOUND_SUSPICIOUS && runSucceeded === 0) {
            const {
              planType = null,
              structure = null,
              accountSource = null,
              accountMatch = null
            } = await getAccountInfo();
            reportError("bulk.not_found", null, {
              bulkAction: action,
              notFound: runNotFound,
              total,
              planType,
              structure,
              accountSource,
              accountMatch,
              foreignBridge: isForeignBridgeSeen()
            });
          }
          isFatal ? (reportError("bulk.fatal", null, {
            bulkAction: action,
            reason: fatalReason ?? "unknown",
            detail: fatalDetail,
            done,
            total
          }), queue2.interruptedAt = Date.now(), await saveQueue(queue2), pendingCount.value = queue2.pending.length) : (await clearQueue(), queue2 = null, pendingCount.value = 0), stopRequested = !1, isInterrupted = !1, isRateLimitReported = !1, isStopping.value = !1, bulkStatus.value = BULK_STATUS.IDLE, bulkAction.value = null, cooldownLeft.value = 0, checkAllChatsSelected(), !isStopped && !isFatal && markTabDone(), notifyResult({
            action,
            isStopped,
            isFatal,
            done,
            total
          });
        },
        startBulkAction = async () => {
          stopRequested = !1, isInterrupted = !1, isRateLimitReported = !1, fatalReason = null, fatalDetail = null, runSucceeded = 0, runNotFound = 0, runFailed = 0, lastFailure = null, runStartedAt.value = Date.now(), runStartProcessed.value = queue2.done + queue2.failed, cooldownUntil = 0, parallel = PARALLEL, bulkAction.value = queue2.action, bulkTotal.value = queue2.total, bulkDone.value = queue2.done, bulkFailed.value = queue2.failed, pendingCount.value = queue2.pending.length, bulkStatus.value = BULK_STATUS.RUNNING, sendToBackground(), notificationStore.addNotification(i18n2.t(queue2.action === ACTIONS.DELETING ? "notification.bulk_background_delete" : "notification.bulk_background_archive", {
            minutes: etaMinutes.value
          }), NOTIFICATION_TYPE.NOTE, BACKGROUND_NOTICE_TTL), queue2.runner = TAB_ID, delete queue2.interruptedAt, await saveQueue(queue2);
          try {
            await runQueue();
          } catch (e) {
            reportError("bulk.crash", e, {
              bulkAction: queue2?.action
            }), notificationStore.addNotification(i18n2.t("notification.error_generic"), NOTIFICATION_TYPE.ERROR);
          } finally {
            await finishBulkAction();
          }
        },
        isExtensionAlive = () => {
          var _a;
          return (_a = chrome.runtime) != null && _a.id ? !0 : (notificationStore.addNotification(i18n2.t("notification.error_reload_page"), NOTIFICATION_TYPE.ERROR, 8e3), !1);
        },
        startBulkActionForSelection = async action => {
          if (isRunning2.value || !isExtensionAlive()) return;
          const keys = collectSelectedKeys();
          keys.length !== 0 && (await navigator.locks.request(QUEUE_LOCK, {
            ifAvailable: !0
          }, async lock => {
            lock && (queue2 = createQueue(action, keys), await startBulkAction());
          }));
        },
        deleteSelectedChats = async () => startBulkActionForSelection(ACTIONS.DELETING),
        archiveSelectedChats = async () => startBulkActionForSelection(ACTIONS.ARCHIVING),
        stopBulkAction = () => {
          if (isRunning2.value) {
            if (isStopping.value = !0, isElsewhere.value) {
              requestStop(mirrored.startedAt);
              return;
            }
            stopRequested = !0;
          }
        },
        onStopRequest = startedAt => {
          !isElsewhere.value && isRunning2.value && queue2?.startedAt === startedAt && stopBulkAction();
        },
        adoptQueue = saved => {
          queue2 = saved, bulkAction.value = saved.action, bulkTotal.value = saved.total, bulkDone.value = saved.done, bulkFailed.value = saved.failed, pendingCount.value = saved.pending.length;
        },
        dropQueue = () => {
          queue2 = null, pendingCount.value = 0;
        },
        resumeBulkAction = () => {
          isRunning2.value || !queue2 || !isExtensionAlive() || claimQueue();
        },
        discardQueue = async () => {
          dropQueue(), await clearQueue();
        },
        mirrorQueue = saved => {
          isElsewhere.value || (isElsewhere.value = !0, isBackground.value = !0, bulkStatus.value = BULK_STATUS.RUNNING, runStartedAt.value = Date.now(), runStartProcessed.value = saved.done + saved.failed), mirrored = saved, bulkAction.value = saved.action, bulkTotal.value = saved.total, bulkDone.value = saved.done, bulkFailed.value = saved.failed, pendingCount.value = saved.pending.length, hidePending(saved.pending), leaveConversation(getConversationId(saved.lastDone));
        },
        countMirroredRun = (action, done) => {
          done > 0 && (configStore.incrementUsage(action), stateStore.hasRun = !0);
        },
        resetMirror = () => {
          isElsewhere.value = !1, isBackground.value = !1, isStopping.value = !1, bulkStatus.value = BULK_STATUS.IDLE, bulkAction.value = null, pendingCount.value = 0, mirrored = null;
        },
        finishMirror = () => {
          const {
              action,
              done,
              total,
              pending: pending2
            } = mirrored,
            isStoppedHere = isStopping.value;
          pending2.forEach(showChat), resetMirror(), countMirroredRun(action, done), pending2.length === 0 ? (markTabDone(), notifyResult({
            action,
            isStopped: !1,
            isFatal: !1,
            done,
            total
          })) : isStoppedHere && notifyResult({
            action,
            isStopped: !0,
            isFatal: !1,
            done,
            total
          });
        },
        interruptMirror = saved => {
          saved.pending.forEach(showChat), resetMirror(), adoptQueue(saved), countMirroredRun(saved.action, saved.done), notifyResult({
            action: saved.action,
            isStopped: !1,
            isFatal: !0,
            done: saved.done,
            total: saved.total
          });
        },
        onStoredQueue = saved => {
          if (saved?.runner !== TAB_ID) {
            if (!saved) {
              isElsewhere.value ? finishMirror() : isRunning2.value || dropQueue();
              return;
            }
            if (saved.interruptedAt) {
              isElsewhere.value ? interruptMirror(saved) : isRunning2.value || adoptQueue(saved);
              return;
            }
            !isElsewhere.value && (isRunning2.value || saved.pending.length === 0) || (mirrorQueue(saved), claimQueue());
          }
        },
        claimQueue = () => {
          if (isClaiming) return;
          isClaiming = !0;
          const claimedAt = Date.now();
          navigator.locks.request(QUEUE_LOCK, async () => {
            const saved = await loadQueue();
            if (!(!saved || saved.interruptedAt > claimedAt || !isExtensionAlive())) {
              if (isElsewhere.value && isStopping.value) {
                mirrored = saved, finishMirror(), await clearQueue();
                return;
              }
              isElsewhere.value = !1, mirrored = null, queue2 = saved, await startBulkAction();
            }
          }).catch(e => reportError("queue.claim", e)).finally(() => {
            isClaiming = !1;
          });
        };
      return {
        hasRun,
        isBulkActionsModeEnable,
        isAllChatsSelected,
        countChatsSelected,
        isDeleting,
        isRunning: isRunning2,
        isCooldown,
        bulkTotal,
        bulkDone,
        bulkFailed,
        cooldownLeft,
        etaMinutes,
        isBackground,
        runPercent,
        sendToBackground,
        pendingCount,
        isStopping,
        hasPendingQueue,
        setAllChatsChecked,
        deleteSelectedChats,
        archiveSelectedChats,
        stopBulkAction,
        resumeBulkAction,
        discardQueue,
        connectQueue: async () => {
          listenQueue({
            onQueue: onStoredQueue,
            onStop: onStopRequest
          });
          const saved = await loadQueue();
          !saved || isRunning2.value || (saved.interruptedAt || mirrorQueue(saved), claimQueue());
        }
      };
    }),
    _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) target[key] = val;
      return target;
    },
    _hoisted_1$9 = ["stroke-dashoffset"],
    _hoisted_2$9 = {
      class: "dac-entry__busy"
    },
    _hoisted_3$9 = ["title", "aria-label"],
    _hoisted_4$8 = ["stroke-dashoffset"],
    _hoisted_5$7 = {
      key: 1,
      viewBox: "0 0 14 15"
    },
    SYNC_DELAY = 200,
    VISIBILITY_CHECK_INTERVAL = 1e3,
    TRASH_PATH = "M6.26389 0.0142253C5.82591 0.0444507 5.63376 0.095834 5.33424 0.265096C4.92451 0.49481 4.55999 0.957259 4.41305 1.4318C4.37915 1.53759 4.33959 1.77939 4.32263 1.96679L4.29155 2.31136H2.35311C0.52205 2.31136 0.409022 2.31438 0.298819 2.36879C-0.0996063 2.56223 -0.0996063 3.20905 0.298819 3.4025C0.397719 3.45086 0.488142 3.45993 0.91765 3.45993H1.4178V6.73032C1.4178 10.9649 1.43475 11.3216 1.66081 12.0167C1.86709 12.6575 2.18357 13.1925 2.64698 13.6912C3.23473 14.323 3.95246 14.734 4.75497 14.9003C5.40488 15.0332 8.53294 15.0332 9.23089 14.9003C10.0193 14.7522 10.7624 14.326 11.3643 13.6791C11.8164 13.1925 12.1244 12.6666 12.3392 12.0137C12.5624 11.3246 12.5794 10.9649 12.5794 6.73032V3.45993H13.0795C13.5288 3.45993 13.591 3.45388 13.7012 3.39645C14.0968 3.19092 14.0996 2.58641 13.7096 2.37181C13.6023 2.31438 13.5401 2.31136 11.6525 2.31136H9.70561L9.67453 1.96981C9.65757 1.78544 9.61801 1.54363 9.58693 1.43482C9.38631 0.751726 8.74769 0.159307 8.08648 0.0474733C7.83499 0.00515763 6.71318 -0.0160002 6.26389 0.0142253ZM7.94519 1.19604C8.13452 1.23836 8.33514 1.38646 8.44534 1.56479C8.55272 1.73405 8.58663 1.85798 8.60076 2.12094L8.61206 2.31136H6.99858H5.3851L5.3964 2.12094C5.41053 1.85798 5.44444 1.73405 5.55182 1.56781C5.66202 1.38948 5.83156 1.25951 6.01523 1.20511C6.19043 1.15675 7.73326 1.14768 7.94519 1.19604ZM5.49813 5.09512C5.55747 5.13744 5.63094 5.23114 5.6705 5.31577L5.74114 5.4669V8.25066C5.74114 10.2486 5.73266 11.0677 5.71006 11.1402C5.63941 11.3639 5.42183 11.5301 5.20425 11.5301C4.98102 11.5301 4.75214 11.3548 4.69563 11.1402C4.67302 11.0677 4.66737 10.1216 4.67302 8.2023L4.6815 5.37622L4.75779 5.25229C4.9132 5.00142 5.26642 4.92586 5.49813 5.09512ZM9.10091 5.10419C9.1659 5.15255 9.23937 5.24625 9.27328 5.31577C9.32979 5.44271 9.32979 5.48805 9.32979 8.25973C9.32979 11.3185 9.33544 11.1886 9.17438 11.3639C8.90593 11.648 8.47077 11.5573 8.30971 11.1825C8.25885 11.0677 8.25602 10.9226 8.25602 8.26577C8.25602 5.61198 8.25885 5.46387 8.30971 5.34902C8.41143 5.11628 8.59228 4.99538 8.82681 5.01049C8.94549 5.01654 9.01614 5.04072 9.10091 5.10419Z",
    RING_RADIUS$1 = 5.5,
    DacSidebarEntry = /* @__PURE__ */_export_sfc({
      __name: "DacSidebarEntry",
      setup(__props) {
        const bulkActionsStore = useBulkActionsStore(),
          RING_LENGTH = 2 * Math.PI * RING_RADIUS$1,
          ringOffset = computed(() => RING_LENGTH * (1 - bulkActionsStore.runPercent / 100)),
          isBackgroundShown = computed(() => bulkActionsStore.isBackground && !bulkActionsStore.isBulkActionsModeEnable),
          target = ref(null),
          railTarget = ref(null),
          syncMount = (container, id2) => {
            if (!container || !isVisible(container)) return null;
            let mount = container.querySelector(`#${id2}`);
            return mount || (mount = document.createElement("div"), mount.id = id2, container.append(mount)), mount;
          },
          canSelect = header => bulkActionsStore.isBulkActionsModeEnable || bulkActionsStore.isBackground || hasChats() || isChatsCollapsed(header),
          sync = () => {
            const header = findHeader();
            target.value = canSelect(header) ? syncMount(header, ENTRY_MOUNT_ID) : null, railTarget.value = target.value ? null : syncMount(findRailGroup(), RAIL_ENTRY_MOUNT_ID);
          };
        let isMarkupReported = !1;
        const checkMarkup = () => {
          const history2 = findHistory();
          if (isMarkupReported || target.value || !history2 || !isVisible(history2)) return;
          const chatLinks = history2.querySelectorAll(CHAT_LINK).length;
          chatLinks !== 0 && (isMarkupReported = !0, reportError("chatgpt.header_missing", null, {
            chatLinks,
            page: getPageKind(),
            width: window.innerWidth
          }));
        };
        let syncTimer = null;
        const scheduleSync = () => {
          syncTimer || (syncTimer = setTimeout(() => {
            syncTimer = null, sync();
          }, SYNC_DELAY));
        };
        let observer = null,
          visibilityTimer = null;
        onMounted(() => {
          sync(), observer = new MutationObserver(scheduleSync), observer.observe(document.body, {
            childList: !0,
            subtree: !0
          }), visibilityTimer = setInterval(() => {
            sync(), checkMarkup();
          }, VISIBILITY_CHECK_INTERVAL), window.addEventListener("resize", scheduleSync);
        }), onBeforeUnmount(() => {
          var _a, _b;
          observer?.disconnect(), clearTimeout(syncTimer), clearInterval(visibilityTimer), window.removeEventListener("resize", scheduleSync), (_a = document.getElementById(ENTRY_MOUNT_ID)) == null || _a.remove(), (_b = document.getElementById(RAIL_ENTRY_MOUNT_ID)) == null || _b.remove();
        });
        const toggle = () => {
            const isEnabling = !bulkActionsStore.isBulkActionsModeEnable;
            isEnabling && expandChats(), bulkActionsStore.isBulkActionsModeEnable = isEnabling;
          },
          openFromRail = () => {
            openSidebar(), expandChats(), bulkActionsStore.isBulkActionsModeEnable = !0;
          };
        return (_ctx, _cache) => target.value ? (openBlock(), createBlock(Teleport, {
          key: 0,
          to: target.value
        }, [isBackgroundShown.value ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "dac-entry dac-entry--progress",
          onClick: withModifiers(toggle, ["stop", "prevent"])
        }, [(openBlock(), createElementBlock("svg", {
          class: normalizeClass(["dac-entry__ring", {
            "dac-entry__ring--archive": !unref(bulkActionsStore).isDeleting
          }]),
          viewBox: "0 0 14 14"
        }, [createBaseVNode("circle", {
          class: "dac-entry__ring-track",
          cx: "7",
          cy: "7",
          r: RING_RADIUS$1
        }), createBaseVNode("circle", {
          class: "dac-entry__ring-value",
          cx: "7",
          cy: "7",
          r: RING_RADIUS$1,
          "stroke-dasharray": RING_LENGTH,
          "stroke-dashoffset": ringOffset.value
        }, null, 8, _hoisted_1$9)], 2)), createBaseVNode("span", _hoisted_2$9, toDisplayString$1(unref(bulkActionsStore).isDeleting ? _ctx.$t("button_bulk_deleting") : _ctx.$t("button_bulk_archiving")), 1), createTextVNode(" " + toDisplayString$1(unref(bulkActionsStore).runPercent) + "% ", 1)])) : (openBlock(), createElementBlock("button", {
          key: 1,
          type: "button",
          class: normalizeClass(["dac-entry", {
            "dac-entry--on": unref(bulkActionsStore).isBulkActionsModeEnable
          }]),
          onClick: withModifiers(toggle, ["stop", "prevent"])
        }, [createBaseVNode("svg", {
          viewBox: "0 0 14 15"
        }, [createBaseVNode("path", {
          d: TRASH_PATH
        })]), createTextVNode(" " + toDisplayString$1(unref(bulkActionsStore).isBulkActionsModeEnable ? _ctx.$t("button_done") : _ctx.$t("button_select_chats")), 1)], 2))], 8, ["to"])) : railTarget.value ? (openBlock(), createBlock(Teleport, {
          key: 1,
          to: railTarget.value
        }, [createBaseVNode("button", {
          type: "button",
          class: normalizeClass(["dac-rail-entry", {
            "dac-rail-entry--on": unref(bulkActionsStore).isBulkActionsModeEnable
          }]),
          title: _ctx.$t("bulk_delete_description"),
          "aria-label": _ctx.$t("bulk_delete_description"),
          onClick: withModifiers(openFromRail, ["stop", "prevent"])
        }, [isBackgroundShown.value ? (openBlock(), createElementBlock("svg", {
          key: 0,
          class: normalizeClass(["dac-entry__ring", {
            "dac-entry__ring--archive": !unref(bulkActionsStore).isDeleting
          }]),
          viewBox: "0 0 14 14"
        }, [createBaseVNode("circle", {
          class: "dac-entry__ring-track",
          cx: "7",
          cy: "7",
          r: RING_RADIUS$1
        }), createBaseVNode("circle", {
          class: "dac-entry__ring-value",
          cx: "7",
          cy: "7",
          r: RING_RADIUS$1,
          "stroke-dasharray": RING_LENGTH,
          "stroke-dashoffset": ringOffset.value
        }, null, 8, _hoisted_4$8)], 2)) : (openBlock(), createElementBlock("svg", _hoisted_5$7, [createBaseVNode("path", {
          d: TRASH_PATH
        })]))], 10, _hoisted_3$9)], 8, ["to"])) : createCommentVNode("", !0);
      }
    }, [["__scopeId", "data-v-bb3b90ab"]]),
    findChatAreaRect = () => {
      for (const area of document.querySelectorAll("#main, main")) {
        const rect = area.getBoundingClientRect();
        if (rect.width > 0) return rect;
      }
      return null;
    };
  function getChatAreaCenter() {
    const rect = findChatAreaRect();
    return rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  }
  const HEADER_HEIGHT = 52;
  function getChatAreaCorner() {
    const rect = findChatAreaRect();
    return rect ? {
      left: rect.left,
      top: rect.top
    } : {
      left: 0,
      top: HEADER_HEIGHT
    };
  }
  function getChatAreaTopRight() {
    const rect = findChatAreaRect();
    return rect ? {
      right: rect.right,
      top: rect.top + HEADER_HEIGHT
    } : {
      right: window.innerWidth,
      top: HEADER_HEIGHT
    };
  }
  const _hoisted_1$7 = {
      key: 0,
      class: "dac-card__reason"
    },
    _hoisted_2$7 = {
      class: "dac-card__progress"
    },
    _hoisted_3$7 = {
      viewBox: "0 0 76 76"
    },
    _hoisted_4$6 = ["stroke-dashoffset"],
    _hoisted_5$5 = {
      class: "dac-ring__label"
    },
    _hoisted_6$5 = {
      class: "dac-card__title dac-card__title--busy"
    },
    _hoisted_7$3 = {
      key: 0,
      class: "dac-card__note dac-card__note--warning"
    },
    _hoisted_8$2 = {
      class: "dac-card__note"
    },
    _hoisted_9$2 = {
      class: "dac-card__note"
    },
    _hoisted_10$2 = {
      class: "dac-card__note dac-card__hint"
    },
    _hoisted_11$2 = {
      class: "dac-card__actions"
    },
    _hoisted_12$1 = ["disabled"],
    _hoisted_13$1 = ["disabled"],
    _hoisted_14 = {
      class: "dac-card__progress"
    },
    _hoisted_15 = {
      class: "dac-ring"
    },
    _hoisted_16 = {
      viewBox: "0 0 76 76"
    },
    _hoisted_17 = ["stroke-dashoffset"],
    _hoisted_18 = {
      class: "dac-ring__label"
    },
    _hoisted_19 = {
      class: "dac-card__title"
    },
    _hoisted_20 = {
      class: "dac-card__actions"
    },
    _hoisted_21 = {
      key: 0,
      viewBox: "0 0 20 20"
    },
    _hoisted_22 = {
      key: 1,
      viewBox: "0 0 20 20"
    },
    _hoisted_23 = {
      class: "dac-card__question"
    },
    _hoisted_24 = {
      class: "dac-card__count"
    },
    _hoisted_25 = {
      class: "dac-card__note"
    },
    _hoisted_26 = {
      class: "dac-card__actions"
    },
    _hoisted_27 = ["aria-label"],
    _hoisted_28 = {
      class: "dac-card__number"
    },
    _hoisted_29 = {
      class: "dac-card__caption"
    },
    _hoisted_30 = {
      class: "dac-card__links"
    },
    _hoisted_31 = {
      class: "dac-card__actions"
    },
    _hoisted_32 = ["disabled"],
    _hoisted_33 = ["disabled"],
    CARD_OFFSET_LEFT = 16,
    CARD_OFFSET_RIGHT = 16,
    CARD_OFFSET_TOP = 12,
    CARD_GAP = 16,
    POSITION_REFRESH = 500,
    RING_RADIUS = 31.5,
    DacSelectionBar = /* @__PURE__ */_export_sfc({
      __name: "DacSelectionBar",
      setup(__props) {
        const RING_LENGTH = 2 * Math.PI * RING_RADIUS,
          bulkActionsStore = useBulkActionsStore(),
          configStore = useConfigStore(),
          confirmAction = ref(null),
          state = computed(() => bulkActionsStore.isRunning ? "running" : bulkActionsStore.hasPendingQueue ? "resume" : confirmAction.value ? "confirm" : "select"),
          isConfirmDelete = computed(() => confirmAction.value === ACTIONS.DELETING);
        watch(() => bulkActionsStore.countChatsSelected, count => {
          count === 0 && (confirmAction.value = null);
        });
        const runProcessed = computed(() => bulkActionsStore.bulkDone + bulkActionsStore.bulkFailed),
          resumeTotal = computed(() => Math.max(bulkActionsStore.bulkTotal, bulkActionsStore.pendingCount)),
          resumeProcessed = computed(() => resumeTotal.value - bulkActionsStore.pendingCount),
          toPercent = (processed, total) => total ? Math.min(100, Math.round(processed / total * 100)) : 0,
          runPercent = computed(() => toPercent(runProcessed.value, bulkActionsStore.bulkTotal)),
          resumePercent = computed(() => toPercent(resumeProcessed.value, resumeTotal.value)),
          ringOffset = percent => RING_LENGTH * (1 - percent / 100),
          askDelete = () => {
            confirmAction.value = ACTIONS.DELETING;
          },
          askArchive = () => {
            confirmAction.value = ACTIONS.ARCHIVING;
          },
          confirm = () => {
            const action = confirmAction.value;
            confirmAction.value = null, action === ACTIONS.DELETING ? bulkActionsStore.deleteSelectedChats() : bulkActionsStore.archiveSelectedChats();
          },
          close = () => {
            bulkActionsStore.isBulkActionsModeEnable = !1;
          },
          position = ref({
            left: `${CARD_OFFSET_LEFT}px`,
            top: `${CARD_OFFSET_TOP}px`
          }),
          card = ref(null),
          updatePosition = () => {
            var _a;
            const corner = getChatAreaCorner(),
              left = corner.left + CARD_OFFSET_LEFT,
              width = ((_a = card.value) == null ? void 0 : _a.offsetWidth) ?? 0,
              projectHeader = findProjectPageHeader();
            if (projectHeader && projectHeader.getBoundingClientRect().left < left + width + CARD_GAP) {
              const topRight = getChatAreaTopRight();
              position.value = {
                left: `${Math.round(topRight.right - width - CARD_OFFSET_RIGHT)}px`,
                top: `${Math.round(topRight.top + CARD_OFFSET_TOP)}px`
              };
              return;
            }
            position.value = {
              left: `${Math.round(left)}px`,
              top: `${Math.round(corner.top + CARD_OFFSET_TOP)}px`
            };
          };
        let positionTimer = null;
        return onMounted(() => {
          updatePosition(), positionTimer = setInterval(updatePosition, POSITION_REFRESH), window.addEventListener("resize", updatePosition);
        }), onBeforeUnmount(() => {
          clearInterval(positionTimer), window.removeEventListener("resize", updatePosition);
        }), (_ctx, _cache) => (openBlock(), createElementBlock("div", {
          ref_key: "card",
          ref: card,
          class: normalizeClass(["dac-card", `dac-card--${state.value}`]),
          style: normalizeStyle(position.value),
          role: "toolbar"
        }, [state.value === "running" ? (openBlock(), createElementBlock(Fragment, {
          key: 0
        }, [unref(bulkActionsStore).isDeleting ? (openBlock(), createElementBlock("div", _hoisted_1$7, [_cache[8] || (_cache[8] = createBaseVNode("svg", {
          viewBox: "0 0 20 20",
          "aria-hidden": "true"
        }, [createBaseVNode("circle", {
          cx: "10",
          cy: "10",
          r: "7.5"
        }), createBaseVNode("path", {
          d: "M10 9v4.5M10 6.5v.01"
        })], -1)), createTextVNode(" " + toDisplayString$1(_ctx.$t("bulk.slow_reason")), 1)])) : createCommentVNode("", !0), createBaseVNode("div", _hoisted_2$7, [createBaseVNode("div", {
          class: normalizeClass(["dac-ring", unref(bulkActionsStore).isDeleting ? "dac-ring--delete" : "dac-ring--archive"])
        }, [(openBlock(), createElementBlock("svg", _hoisted_3$7, [createBaseVNode("circle", {
          class: "dac-ring__track",
          cx: "38",
          cy: "38",
          r: RING_RADIUS
        }), createBaseVNode("circle", {
          class: "dac-ring__value",
          cx: "38",
          cy: "38",
          r: RING_RADIUS,
          "stroke-dasharray": RING_LENGTH,
          "stroke-dashoffset": ringOffset(runPercent.value)
        }, null, 8, _hoisted_4$6)])), createBaseVNode("span", _hoisted_5$5, toDisplayString$1(runPercent.value) + "%", 1)], 2), createBaseVNode("div", null, [createBaseVNode("div", _hoisted_6$5, [_cache[9] || (_cache[9] = createBaseVNode("span", {
          class: "dac-spinner",
          "aria-hidden": "true"
        }, null, -1)), createTextVNode(" " + toDisplayString$1(unref(bulkActionsStore).isDeleting ? _ctx.$t("button_bulk_deleting") : _ctx.$t("button_bulk_archiving")), 1)]), unref(bulkActionsStore).isCooldown ? (openBlock(), createElementBlock("div", _hoisted_7$3, toDisplayString$1(_ctx.$t("bulk.cooldown", {
          seconds: unref(bulkActionsStore).cooldownLeft
        })), 1)) : (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createBaseVNode("div", _hoisted_8$2, toDisplayString$1(_ctx.$t("bulk.progress", {
          done: runProcessed.value,
          total: unref(bulkActionsStore).bulkTotal
        })), 1), createBaseVNode("div", _hoisted_9$2, toDisplayString$1(_ctx.$t("bulk.eta", {
          minutes: unref(bulkActionsStore).etaMinutes
        })), 1)], 64))])]), createBaseVNode("div", _hoisted_10$2, toDisplayString$1(_ctx.$t("bulk.background_hint")), 1), createBaseVNode("div", _hoisted_11$2, [createBaseVNode("button", {
          class: "dac-button",
          disabled: unref(bulkActionsStore).isStopping,
          onClick: _cache[0] || (_cache[0] = (...args) => unref(bulkActionsStore).stopBulkAction && unref(bulkActionsStore).stopBulkAction(...args))
        }, [_cache[10] || (_cache[10] = createBaseVNode("svg", {
          viewBox: "0 0 20 20"
        }, [createBaseVNode("rect", {
          x: "6",
          y: "6",
          width: "8",
          height: "8",
          rx: "1.5"
        })], -1)), createTextVNode(" " + toDisplayString$1(_ctx.$t("bulk.button_stop")), 1)], 8, _hoisted_12$1), createBaseVNode("button", {
          class: "dac-button dac-button--primary",
          disabled: unref(bulkActionsStore).isStopping,
          onClick: _cache[1] || (_cache[1] = (...args) => unref(bulkActionsStore).sendToBackground && unref(bulkActionsStore).sendToBackground(...args))
        }, toDisplayString$1(_ctx.$t("bulk.button_background")), 9, _hoisted_13$1)])], 64)) : state.value === "resume" ? (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createBaseVNode("div", _hoisted_14, [createBaseVNode("div", _hoisted_15, [(openBlock(), createElementBlock("svg", _hoisted_16, [createBaseVNode("circle", {
          class: "dac-ring__track",
          cx: "38",
          cy: "38",
          r: RING_RADIUS
        }), createBaseVNode("circle", {
          class: "dac-ring__value",
          cx: "38",
          cy: "38",
          r: RING_RADIUS,
          "stroke-dasharray": RING_LENGTH,
          "stroke-dashoffset": ringOffset(resumePercent.value)
        }, null, 8, _hoisted_17)])), createBaseVNode("span", _hoisted_18, [createTextVNode(toDisplayString$1(resumePercent.value) + "% ", 1), createBaseVNode("small", null, toDisplayString$1(resumeProcessed.value) + "/" + toDisplayString$1(resumeTotal.value), 1)])]), createBaseVNode("div", _hoisted_19, toDisplayString$1(_ctx.$t("bulk.resume_question", {
          count: unref(bulkActionsStore).pendingCount
        })), 1)]), createBaseVNode("div", _hoisted_20, [createBaseVNode("button", {
          class: "dac-button",
          onClick: _cache[2] || (_cache[2] = (...args) => unref(bulkActionsStore).discardQueue && unref(bulkActionsStore).discardQueue(...args))
        }, toDisplayString$1(_ctx.$t("bulk.button_discard")), 1), createBaseVNode("button", {
          class: "dac-button dac-button--primary",
          onClick: _cache[3] || (_cache[3] = (...args) => unref(bulkActionsStore).resumeBulkAction && unref(bulkActionsStore).resumeBulkAction(...args))
        }, toDisplayString$1(_ctx.$t("bulk.button_resume")), 1)])], 64)) : state.value === "confirm" ? (openBlock(), createElementBlock(Fragment, {
          key: 2
        }, [createBaseVNode("span", {
          class: normalizeClass(["dac-card__badge", isConfirmDelete.value ? "dac-card__badge--delete" : "dac-card__badge--archive"])
        }, [isConfirmDelete.value ? (openBlock(), createElementBlock("svg", _hoisted_21, _cache[11] || (_cache[11] = [createBaseVNode("path", {
          d: "M4 6h12M8 6V4.5A.5.5 0 0 1 8.5 4h3a.5.5 0 0 1 .5.5V6M5.5 6l.7 9.1a1 1 0 0 0 1 .9h5.6a1 1 0 0 0 1-.9L14.5 6M8.5 9v4.5M11.5 9v4.5"
        }, null, -1)]))) : (openBlock(), createElementBlock("svg", _hoisted_22, _cache[12] || (_cache[12] = [createBaseVNode("rect", {
          x: "3",
          y: "4",
          width: "14",
          height: "4",
          rx: "1"
        }, null, -1), createBaseVNode("path", {
          d: "M4.5 8v7a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8M8 11h4"
        }, null, -1)])))], 2), createBaseVNode("div", _hoisted_23, [createTextVNode(toDisplayString$1(isConfirmDelete.value ? _ctx.$t("window_confirmation_delete_question") : _ctx.$t("window_confirmation_archive_question")) + " ", 1), createBaseVNode("span", _hoisted_24, toDisplayString$1(unref(bulkActionsStore).countChatsSelected), 1)]), createBaseVNode("div", _hoisted_25, toDisplayString$1(isConfirmDelete.value ? _ctx.$t("bulk.delete_hint") : _ctx.$t("bulk.archive_hint")), 1), createBaseVNode("div", _hoisted_26, [createBaseVNode("button", {
          class: "dac-button",
          onClick: _cache[4] || (_cache[4] = $event => confirmAction.value = null)
        }, toDisplayString$1(_ctx.$t("window_confirmation_button_cancel")), 1), isConfirmDelete.value ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "dac-button dac-button--danger-solid",
          onClick: confirm
        }, toDisplayString$1(_ctx.$t("button_bulk_delete")), 1)) : (openBlock(), createElementBlock("button", {
          key: 1,
          class: "dac-button dac-button--archive",
          onClick: confirm
        }, toDisplayString$1(_ctx.$t("button_bulk_archive")), 1))])], 64)) : (openBlock(), createElementBlock(Fragment, {
          key: 3
        }, [createBaseVNode("button", {
          class: "dac-icon-button dac-card__close",
          type: "button",
          "aria-label": _ctx.$t("button_done"),
          onClick: close
        }, _cache[13] || (_cache[13] = [createBaseVNode("svg", {
          viewBox: "0 0 20 20"
        }, [createBaseVNode("path", {
          d: "M5 5l10 10M15 5L5 15"
        })], -1)]), 8, _hoisted_27), createBaseVNode("div", _hoisted_28, toDisplayString$1(unref(bulkActionsStore).countChatsSelected), 1), createBaseVNode("div", _hoisted_29, toDisplayString$1(_ctx.$t("count_selected_chats")), 1), createBaseVNode("div", _hoisted_30, [unref(bulkActionsStore).isAllChatsSelected ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "dac-link",
          onClick: _cache[5] || (_cache[5] = $event => unref(bulkActionsStore).setAllChatsChecked(!1))
        }, toDisplayString$1(_ctx.$t("button_deselect_all_chats")), 1)) : (openBlock(), createElementBlock("button", {
          key: 1,
          class: "dac-link",
          onClick: _cache[6] || (_cache[6] = $event => unref(bulkActionsStore).setAllChatsChecked(!0))
        }, toDisplayString$1(_ctx.$t("button_select_all_chats")), 1)), _cache[14] || (_cache[14] = createBaseVNode("span", null, "\xB7", -1)), createBaseVNode("span", {
          class: "dac-free-label"
        }, "Free")]), createBaseVNode("div", _hoisted_31, [createBaseVNode("button", {
          class: "dac-button dac-button--archive",
          disabled: unref(bulkActionsStore).countChatsSelected === 0,
          onClick: askArchive
        }, [_cache[15] || (_cache[15] = createBaseVNode("svg", {
          viewBox: "0 0 20 20"
        }, [createBaseVNode("rect", {
          x: "3",
          y: "4",
          width: "14",
          height: "4",
          rx: "1"
        }), createBaseVNode("path", {
          d: "M4.5 8v7a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8M8 11h4"
        })], -1)), createTextVNode(" " + toDisplayString$1(_ctx.$t("button_bulk_archive")), 1)], 8, _hoisted_32), createBaseVNode("button", {
          class: "dac-button dac-button--danger-solid",
          disabled: unref(bulkActionsStore).countChatsSelected === 0,
          onClick: askDelete
        }, [_cache[16] || (_cache[16] = createBaseVNode("svg", {
          viewBox: "0 0 20 20"
        }, [createBaseVNode("path", {
          d: "M4 6h12M8 6V4.5A.5.5 0 0 1 8.5 4h3a.5.5 0 0 1 .5.5V6M5.5 6l.7 9.1a1 1 0 0 0 1 .9h5.6a1 1 0 0 0 1-.9L14.5 6M8.5 9v4.5M11.5 9v4.5"
        })], -1)), createTextVNode(" " + toDisplayString$1(_ctx.$t("button_bulk_delete")), 1)], 8, _hoisted_33)]), createCommentVNode("", !0)], 64))], 6));
      }
    }, [["__scopeId", "data-v-a869dcbc"]]),
    DacToastTimer = /* @__PURE__ */_export_sfc({
      __name: "DacToastTimer",
      props: {
        ttl: {
          type: Number,
          required: !0
        },
        isTicking: {
          type: Boolean,
          required: !0
        }
      },
      setup(__props) {
        const props = __props,
          bar = ref(null);
        let animation = null;
        return onMounted(() => {
          animation = bar.value.animate([{
            transform: "scaleX(1)"
          }, {
            transform: "scaleX(0)"
          }], {
            duration: props.ttl,
            easing: "linear",
            fill: "forwards"
          }), props.isTicking || animation.pause();
        }), watch(() => props.isTicking, isTicking => {
          isTicking ? animation?.play() : animation?.pause();
        }), onBeforeUnmount(() => {
          animation?.cancel();
        }), (_ctx, _cache) => (openBlock(), createElementBlock("span", {
          ref_key: "bar",
          ref: bar,
          class: "dac-toast-timer",
          "aria-hidden": "true"
        }, null, 512));
      }
    }, [["__scopeId", "data-v-65dffb14"]]),
    _hoisted_1 = ["onMouseenter", "onMouseleave"],
    _hoisted_2 = {
      key: 0,
      class: "dac-toast__icon",
      viewBox: "0 0 20 20"
    },
    _hoisted_3 = {
      key: 1,
      class: "dac-toast__icon",
      viewBox: "0 0 20 20"
    },
    _hoisted_4 = {
      key: 2,
      class: "dac-toast__icon",
      viewBox: "0 0 20 20"
    },
    _hoisted_5 = {
      class: "dac-toast__body"
    },
    _hoisted_6 = {
      class: "dac-toast__text"
    },
    _hoisted_7 = ["onClick"],
    DacNotifications = /* @__PURE__ */_export_sfc({
      __name: "DacNotifications",
      setup(__props) {
        const notificationStore = useNotificationsStore(),
          left = ref("50%");
        return watch(() => notificationStore.notifications.length, () => {
          left.value = `${Math.round(getChatAreaCenter())}px`;
        }, {
          immediate: !0
        }), (_ctx, _cache) => (openBlock(), createElementBlock("div", {
          class: "dac-toasts",
          style: normalizeStyle({
            left: left.value
          })
        }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(unref(notificationStore).notifications, notification2 => (openBlock(), createElementBlock("div", {
          class: normalizeClass(["dac-toast", `dac-toast--${notification2.type}`]),
          key: notification2.id,
          role: "status",
          onMouseenter: $event => unref(notificationStore).setHovered(notification2, !0),
          onMouseleave: $event => unref(notificationStore).setHovered(notification2, !1)
        }, [notification2.type === "success" ? (openBlock(), createElementBlock("svg", _hoisted_2, _cache[0] || (_cache[0] = [createBaseVNode("circle", {
          cx: "10",
          cy: "10",
          r: "7.5"
        }, null, -1), createBaseVNode("path", {
          d: "M6.8 10.2l2.2 2.2 4.2-4.4"
        }, null, -1)]))) : notification2.type === "error" ? (openBlock(), createElementBlock("svg", _hoisted_3, _cache[1] || (_cache[1] = [createBaseVNode("circle", {
          cx: "10",
          cy: "10",
          r: "7.5"
        }, null, -1), createBaseVNode("path", {
          d: "M10 6.5v4.5M10 13.5v.01"
        }, null, -1)]))) : (openBlock(), createElementBlock("svg", _hoisted_4, _cache[2] || (_cache[2] = [createBaseVNode("circle", {
          cx: "10",
          cy: "10",
          r: "7.5"
        }, null, -1), createBaseVNode("path", {
          d: "M10 9v4.5M10 6.5v.01"
        }, null, -1)]))), createBaseVNode("span", _hoisted_5, [createBaseVNode("span", _hoisted_6, toDisplayString$1(notification2.text), 1)]), notification2.isClosable ? (openBlock(), createElementBlock("button", {
          key: 3,
          class: "dac-toast__close",
          type: "button",
          "aria-label": "Close",
          onClick: $event => unref(notificationStore).removeNotification(notification2.id)
        }, _cache[3] || (_cache[3] = [createBaseVNode("svg", {
          viewBox: "0 0 20 20"
        }, [createBaseVNode("path", {
          d: "M5 5l10 10M15 5L5 15"
        })], -1)]), 8, _hoisted_7)) : createCommentVNode("", !0), notification2.ttl > 0 ? (openBlock(), createBlock(DacToastTimer, {
          key: 4,
          ttl: notification2.ttl,
          "is-ticking": notification2.isTicking
        }, null, 8, ["ttl", "is-ticking"])) : createCommentVNode("", !0)], 42, _hoisted_1))), 128))], 4));
      }
    }, [["__scopeId", "data-v-fb369c09"]]),
    _sfc_main = {
      __name: "App",
      setup(__props) {
        const userStore = useUserStore(),
          configStore = useConfigStore(),
          bulkActionsStore = useBulkActionsStore();
        return onMounted(async () => {
          bulkActionsStore.connectQueue().catch(e => reportError("queue.restore", e));
          try {
            await userStore.initUser(), await configStore.initConfig();
          } catch (e) {
            reportError("app.init", e);
          }
        }), onUnmounted(() => {
          bulkActionsStore.isBulkActionsModeEnable = !1;
        }), (_ctx, _cache) => (openBlock(), createElementBlock(Fragment, null, [createVNode(DacSidebarEntry), unref(bulkActionsStore).isBulkActionsModeEnable ? (openBlock(), createBlock(DacSelectionBar, {
          key: 0
        })) : createCommentVNode("", !0), createCommentVNode("", !0), createVNode(DacNotifications)], 64));
      }
    };
  const i18n = createI18n({
      legacy: !1,
      locale: "en",
      fallbackLocale: "en",
      messages: {
        en: {
          bulk_delete: "Bulk delete",
          bulk_delete_description: "Select multiple chats and perform a bulk action",
          count_selected_chats: "Selected",
          button_select_all_chats: "Select all",
          button_deselect_all_chats: "Deselect all",
          button_select_chats: "Select",
          button_done: "Done",
          button_bulk_archive: "Archive",
          button_bulk_archiving: "Archiving",
          button_bulk_delete: "Delete",
          button_bulk_deleting: "Deleting",
          window_confirmation_button_confirm: "Confirm",
          window_confirmation_button_cancel: "Cancel",
          window_confirmation_archive_question: "Are you sure you want to archive chats?",
          window_confirmation_delete_question: "Are you sure you want to delete chats?",
          bulk: {
            progress: "Processed {done} of {total}",
            eta: "~{minutes} min left",
            slow_reason: "ChatGPT deletes chats one at a time, about 7 s each",
            background_hint: "Keep using ChatGPT as usual. Close the tab and we\u2019ll continue when you open ChatGPT again.",
            cooldown: "ChatGPT is limiting requests. Resuming in {seconds} s",
            button_stop: "Stop",
            button_background: "In background",
            resume_question: "Unfinished action: {count} chats left",
            button_resume: "Resume",
            button_discard: "Discard",
            delete_hint: "This can\u2019t be undone.",
            archive_hint: "You\u2019ll find them in Archived chats."
          },
          notification: {
            bulk_interrupted: "Stopped: the ChatGPT session is unavailable. Reload the page and resume. Processed {done} of {total}.",
            bulk_rate_limited: "ChatGPT limited the request rate. The extension slowed down and will continue automatically.",
            bulk_stopped: "Stopped. Processed {done} of {total}",
            bulk_deleted: "Chats deleted: {done} of {total}",
            bulk_archived: "Chats archived: {done} of {total}",
            bulk_background_delete: "Deleting in the background, about {minutes} min. Keep using ChatGPT as usual \u2014 close the tab and we\u2019ll continue when you open it again.",
            bulk_background_archive: "Archiving in the background, about {minutes} min. Keep using ChatGPT as usual \u2014 close the tab and we\u2019ll continue when you open it again.",
            error_generic: "Something went wrong. Please try again.",
            error_reload_page: "The extension was updated. Reload the page to continue."
          }
        },
        ar: {
          bulk_delete: "\u062D\u0630\u0641 \u062C\u0645\u0627\u0639\u064A",
          bulk_delete_description: "\u062D\u062F\u062F \u0639\u062F\u0629 \u0645\u062D\u0627\u062F\u062B\u0627\u062A \u0648\u0646\u0641\u0651\u0630 \u0625\u062C\u0631\u0627\u0621\u064B \u062C\u0645\u0627\u0639\u064A\u064B\u0627",
          count_selected_chats: "\u0627\u0644\u0645\u062D\u062F\u062F",
          button_select_all_chats: "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644",
          button_deselect_all_chats: "\u0625\u0644\u063A\u0627\u0621 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644",
          button_select_chats: "\u062A\u062D\u062F\u064A\u062F",
          button_done: "\u062A\u0645",
          button_bulk_archive: "\u0623\u0631\u0634\u0641\u0629",
          button_bulk_archiving: "\u062C\u0627\u0631\u064D \u0627\u0644\u0623\u0631\u0634\u0641\u0629",
          button_bulk_delete: "\u062D\u0630\u0641",
          button_bulk_deleting: "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0630\u0641",
          window_confirmation_button_confirm: "\u062A\u0623\u0643\u064A\u062F",
          window_confirmation_button_cancel: "\u0625\u0644\u063A\u0627\u0621",
          window_confirmation_archive_question: "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0623\u0646\u0643 \u062A\u0631\u064A\u062F \u0623\u0631\u0634\u0641\u0629 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0627\u062A\u061F",
          window_confirmation_delete_question: "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0623\u0646\u0643 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0627\u062A\u061F",
          bulk: {
            progress: "\u062A\u0645\u062A \u0645\u0639\u0627\u0644\u062C\u0629 {done} \u0645\u0646 {total}",
            eta: "\u062A\u0628\u0642\u0651\u0649 \u0646\u062D\u0648 {minutes} \u062F",
            slow_reason: "\u064A\u062D\u0630\u0641 ChatGPT \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0627\u062A \u0648\u0627\u062D\u062F\u0629 \u062A\u0644\u0648 \u0627\u0644\u0623\u062E\u0631\u0649\u060C \u0646\u062D\u0648 7 \u062B\u0648\u0627\u0646\u064D \u0644\u0643\u0644 \u0645\u062D\u0627\u062F\u062B\u0629",
            background_hint: "\u0627\u0633\u062A\u062E\u062F\u0645 ChatGPT \u0643\u0627\u0644\u0645\u0639\u062A\u0627\u062F. \u0625\u0630\u0627 \u0623\u063A\u0644\u0642\u062A \u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u060C \u0641\u0633\u0646\u062A\u0627\u0628\u0639 \u0639\u0646\u062F\u0645\u0627 \u062A\u0641\u062A\u062D ChatGPT \u0645\u062C\u062F\u062F\u064B\u0627.",
            cooldown: "\u064A\u0642\u0648\u0645 ChatGPT \u0628\u062A\u0642\u064A\u064A\u062F \u0627\u0644\u0637\u0644\u0628\u0627\u062A. \u0633\u0646\u062A\u0627\u0628\u0639 \u062E\u0644\u0627\u0644 {seconds} \u062B\u0627\u0646\u064A\u0629",
            button_stop: "\u0625\u064A\u0642\u0627\u0641",
            button_background: "\u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629",
            resume_question: "\u0625\u062C\u0631\u0627\u0621 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644: \u0628\u0642\u064A {count}",
            button_resume: "\u0645\u062A\u0627\u0628\u0639\u0629",
            button_discard: "\u062A\u062C\u0627\u0647\u0644",
            delete_hint: "\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621.",
            archive_hint: "\u0633\u062A\u062C\u062F\u0647\u0627 \u0641\u064A \xAB\u0627\u0644\u062F\u0631\u062F\u0634\u0627\u062A \u0627\u0644\u0645\u0624\u0631\u0634\u0641\u0629\xBB."
          },
          notification: {
            bulk_interrupted: "\u062A\u0648\u0642\u0641\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0629: \u062C\u0644\u0633\u0629 ChatGPT \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u0623\u0639\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u062B\u0645 \u062A\u0627\u0628\u0639. \u062A\u0645\u062A \u0645\u0639\u0627\u0644\u062C\u0629 {done} \u0645\u0646 {total}.",
            bulk_rate_limited: "\u0642\u0627\u0645 ChatGPT \u0628\u062A\u0642\u064A\u064A\u062F \u0645\u0639\u062F\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A. \u0623\u0628\u0637\u0623\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0633\u0631\u0639\u062A\u0647\u0627 \u0648\u0633\u062A\u062A\u0627\u0628\u0639 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627.",
            bulk_stopped: "\u062A\u0645 \u0627\u0644\u0625\u064A\u0642\u0627\u0641. \u062A\u0645\u062A \u0645\u0639\u0627\u0644\u062C\u0629 {done} \u0645\u0646 {total}",
            bulk_deleted: "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0627\u062A: {done} \u0645\u0646 {total}",
            bulk_archived: "\u062A\u0645\u062A \u0623\u0631\u0634\u0641\u0629 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0627\u062A: {done} \u0645\u0646 {total}",
            bulk_background_delete: "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0630\u0641 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629\u060C \u0646\u062D\u0648 {minutes} \u062F. \u0627\u0633\u062A\u062E\u062F\u0645 ChatGPT \u0643\u0627\u0644\u0645\u0639\u062A\u0627\u062F\u060C \u0648\u0625\u0630\u0627 \u0623\u063A\u0644\u0642\u062A \u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0641\u0633\u0646\u062A\u0627\u0628\u0639 \u0639\u0646\u062F\u0645\u0627 \u062A\u0641\u062A\u062D\u0647 \u0645\u062C\u062F\u062F\u064B\u0627.",
            bulk_background_archive: "\u062C\u0627\u0631\u064D \u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629\u060C \u0646\u062D\u0648 {minutes} \u062F. \u0627\u0633\u062A\u062E\u062F\u0645 ChatGPT \u0643\u0627\u0644\u0645\u0639\u062A\u0627\u062F\u060C \u0648\u0625\u0630\u0627 \u0623\u063A\u0644\u0642\u062A \u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0641\u0633\u0646\u062A\u0627\u0628\u0639 \u0639\u0646\u062F\u0645\u0627 \u062A\u0641\u062A\u062D\u0647 \u0645\u062C\u062F\u062F\u064B\u0627.",
            error_generic: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0645\u0627. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",
            error_reload_page: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u0636\u0627\u0641\u0629. \u0623\u0639\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629."
          }
        },
        de: {
          bulk_delete: "Massenl\xF6schung",
          bulk_delete_description: "W\xE4hle mehrere Chats aus und f\xFChre eine Massenaktion aus",
          count_selected_chats: "Ausgew\xE4hlt",
          button_select_all_chats: "Alle ausw\xE4hlen",
          button_deselect_all_chats: "Auswahl aufheben",
          button_select_chats: "Ausw\xE4hlen",
          button_done: "Fertig",
          button_bulk_archive: "Archivieren",
          button_bulk_archiving: "Wird archiviert",
          button_bulk_delete: "L\xF6schen",
          button_bulk_deleting: "Wird gel\xF6scht",
          window_confirmation_button_confirm: "Best\xE4tigen",
          window_confirmation_button_cancel: "Abbrechen",
          window_confirmation_archive_question: "M\xF6chtest du die Chats wirklich archivieren?",
          window_confirmation_delete_question: "M\xF6chtest du die Chats wirklich l\xF6schen?",
          bulk: {
            progress: "Verarbeitet: {done} von {total}",
            eta: "noch ~{minutes} Min.",
            slow_reason: "ChatGPT l\xF6scht Chats einzeln, etwa 7 s pro Chat",
            background_hint: "Nutzen Sie ChatGPT ganz normal weiter. Schlie\xDFen Sie den Tab, machen wir weiter, sobald Sie ChatGPT wieder \xF6ffnen.",
            cooldown: "ChatGPT begrenzt die Anfragen. Fortsetzung in {seconds} s",
            button_stop: "Stoppen",
            button_background: "Im Hintergrund",
            resume_question: "Unerledigte Aktion: {count} verbleibend",
            button_resume: "Fortsetzen",
            button_discard: "Verwerfen",
            delete_hint: "Das l\xE4sst sich nicht r\xFCckg\xE4ngig machen.",
            archive_hint: "Du findest sie unter \u201EArchivierte Chats\u201C."
          },
          notification: {
            bulk_interrupted: "Abgebrochen: Die ChatGPT-Sitzung ist nicht verf\xFCgbar. Seite neu laden und fortsetzen. Verarbeitet: {done} von {total}.",
            bulk_rate_limited: "ChatGPT hat die Anfragerate begrenzt. Die Erweiterung wurde verlangsamt und macht automatisch weiter.",
            bulk_stopped: "Gestoppt. Verarbeitet: {done} von {total}",
            bulk_deleted: "Chats gel\xF6scht: {done} von {total}",
            bulk_archived: "Chats archiviert: {done} von {total}",
            bulk_background_delete: "Wird im Hintergrund gel\xF6scht, etwa {minutes} Min. Nutzen Sie ChatGPT ganz normal weiter \u2013 schlie\xDFen Sie den Tab, machen wir weiter, sobald Sie es wieder \xF6ffnen.",
            bulk_background_archive: "Wird im Hintergrund archiviert, etwa {minutes} Min. Nutzen Sie ChatGPT ganz normal weiter \u2013 schlie\xDFen Sie den Tab, machen wir weiter, sobald Sie es wieder \xF6ffnen.",
            error_generic: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
            error_reload_page: "Die Erweiterung wurde aktualisiert. Lade die Seite neu, um fortzufahren."
          }
        },
        es: {
          bulk_delete: "Eliminaci\xF3n masiva",
          bulk_delete_description: "Selecciona varios chats y realiza una acci\xF3n masiva",
          count_selected_chats: "Seleccionados",
          button_select_all_chats: "Seleccionar todo",
          button_deselect_all_chats: "Deseleccionar todo",
          button_select_chats: "Seleccionar",
          button_done: "Listo",
          button_bulk_archive: "Archivar",
          button_bulk_archiving: "Archivando",
          button_bulk_delete: "Eliminar",
          button_bulk_deleting: "Eliminando",
          window_confirmation_button_confirm: "Confirmar",
          window_confirmation_button_cancel: "Cancelar",
          window_confirmation_archive_question: "\xBFSeguro que quieres archivar los chats?",
          window_confirmation_delete_question: "\xBFSeguro que quieres eliminar los chats?",
          bulk: {
            progress: "Procesados {done} de {total}",
            eta: "quedan ~{minutes} min",
            slow_reason: "ChatGPT borra los chats de uno en uno, unos 7 s cada uno",
            background_hint: "Sigue usando ChatGPT con normalidad. Si cierras la pesta\xF1a, continuaremos cuando vuelvas a abrir ChatGPT.",
            cooldown: "ChatGPT est\xE1 limitando las solicitudes. Se reanudar\xE1 en {seconds} s",
            button_stop: "Detener",
            button_background: "En segundo plano",
            resume_question: "Acci\xF3n sin terminar: quedan {count}",
            button_resume: "Reanudar",
            button_discard: "Descartar",
            delete_hint: "Esta acci\xF3n no se puede deshacer.",
            archive_hint: "Los encontrar\xE1s en \xABChats archivados\xBB."
          },
          notification: {
            bulk_interrupted: "Interrumpido: la sesi\xF3n de ChatGPT no est\xE1 disponible. Recarga la p\xE1gina y reanuda. Procesados {done} de {total}.",
            bulk_rate_limited: "ChatGPT limit\xF3 la frecuencia de solicitudes. La extensi\xF3n redujo la velocidad y continuar\xE1 autom\xE1ticamente.",
            bulk_stopped: "Detenido. Procesados {done} de {total}",
            bulk_deleted: "Chats eliminados: {done} de {total}",
            bulk_archived: "Chats archivados: {done} de {total}",
            bulk_background_delete: "Eliminando en segundo plano, unos {minutes} min. Sigue usando ChatGPT con normalidad: si cierras la pesta\xF1a, continuaremos cuando vuelvas a abrirlo.",
            bulk_background_archive: "Archivando en segundo plano, unos {minutes} min. Sigue usando ChatGPT con normalidad: si cierras la pesta\xF1a, continuaremos cuando vuelvas a abrirlo.",
            error_generic: "Algo sali\xF3 mal. Int\xE9ntalo de nuevo.",
            error_reload_page: "La extensi\xF3n se actualiz\xF3. Recarga la p\xE1gina para continuar."
          }
        },
        fil: {
          bulk_delete: "Maramihang pagtanggal",
          bulk_delete_description: "Pumili ng maraming chat at magsagawa ng maramihang aksyon",
          count_selected_chats: "Napili",
          button_select_all_chats: "Piliin lahat",
          button_deselect_all_chats: "Alisin lahat",
          button_select_chats: "Pumili",
          button_done: "Tapos",
          button_bulk_archive: "I-archive",
          button_bulk_archiving: "Ina-archive",
          button_bulk_delete: "Tanggalin",
          button_bulk_deleting: "Tinatanggal",
          window_confirmation_button_confirm: "Kumpirmahin",
          window_confirmation_button_cancel: "Kanselahin",
          window_confirmation_archive_question: "Sigurado ka bang gusto mong i-archive ang mga chat?",
          window_confirmation_delete_question: "Sigurado ka bang gusto mong tanggalin ang mga chat?",
          bulk: {
            progress: "Naproseso {done} sa {total}",
            eta: "~{minutes} min na lang",
            slow_reason: "Isa-isang binubura ng ChatGPT ang mga chat, mga 7 seg bawat isa",
            background_hint: "Gamitin ang ChatGPT gaya ng dati. Kung isasara mo ang tab, itutuloy namin kapag binuksan mo ulit ang ChatGPT.",
            cooldown: "Nililimitahan ng ChatGPT ang mga kahilingan. Magpapatuloy sa {seconds} s",
            button_stop: "Ihinto",
            button_background: "Sa background",
            resume_question: "Hindi natapos na aksyon: {count} ang natitira",
            button_resume: "Ipagpatuloy",
            button_discard: "Itapon",
            delete_hint: "Hindi na ito maibabalik.",
            archive_hint: "Makikita mo ang mga ito sa \u201CMga naka-archive na chat\u201D."
          },
          notification: {
            bulk_interrupted: "Natigil: hindi available ang ChatGPT session. I-reload ang page at magpatuloy. Naproseso {done} sa {total}.",
            bulk_rate_limited: "Nilimitahan ng ChatGPT ang bilis ng mga kahilingan. Bumagal ang extension at awtomatikong magpapatuloy.",
            bulk_stopped: "Itinigil. Naproseso {done} sa {total}",
            bulk_deleted: "Natanggal ang mga chat: {done} sa {total}",
            bulk_archived: "Na-archive ang mga chat: {done} sa {total}",
            bulk_background_delete: "Tinatanggal sa background, mga {minutes} min. Gamitin ang ChatGPT gaya ng dati \u2014 kung isasara mo ang tab, itutuloy namin kapag binuksan mo ito ulit.",
            bulk_background_archive: "Ina-archive sa background, mga {minutes} min. Gamitin ang ChatGPT gaya ng dati \u2014 kung isasara mo ang tab, itutuloy namin kapag binuksan mo ito ulit.",
            error_generic: "May nangyaring mali. Pakisubukang muli.",
            error_reload_page: "Na-update ang extension. I-reload ang pahina para magpatuloy."
          }
        },
        fr: {
          bulk_delete: "Suppression en masse",
          bulk_delete_description: "S\xE9lectionnez plusieurs discussions et effectuez une action group\xE9e",
          count_selected_chats: "S\xE9lectionn\xE9s",
          button_select_all_chats: "Tout s\xE9lectionner",
          button_deselect_all_chats: "Tout d\xE9s\xE9lectionner",
          button_select_chats: "S\xE9lectionner",
          button_done: "Termin\xE9",
          button_bulk_archive: "Archiver",
          button_bulk_archiving: "Archivage",
          button_bulk_delete: "Supprimer",
          button_bulk_deleting: "Suppression",
          window_confirmation_button_confirm: "Confirmer",
          window_confirmation_button_cancel: "Annuler",
          window_confirmation_archive_question: "Voulez-vous vraiment archiver les discussions ?",
          window_confirmation_delete_question: "Voulez-vous vraiment supprimer les discussions ?",
          bulk: {
            progress: "Trait\xE9s {done} sur {total}",
            eta: "encore ~{minutes} min",
            slow_reason: "ChatGPT supprime les chats un par un, environ 7 s chacun",
            background_hint: "Continuez \xE0 utiliser ChatGPT normalement. Si vous fermez l\u2019onglet, nous reprendrons \xE0 la prochaine ouverture de ChatGPT.",
            cooldown: "ChatGPT limite les requ\xEAtes. Reprise dans {seconds} s",
            button_stop: "Arr\xEAter",
            button_background: "En arri\xE8re-plan",
            resume_question: "Action inachev\xE9e : {count} restants",
            button_resume: "Reprendre",
            button_discard: "Abandonner",
            delete_hint: "Cette action est irr\xE9versible.",
            archive_hint: "Vous les retrouverez dans \xAB Chats archiv\xE9s \xBB."
          },
          notification: {
            bulk_interrupted: "Interrompu : la session ChatGPT est indisponible. Rechargez la page et reprenez. Trait\xE9s {done} sur {total}.",
            bulk_rate_limited: "ChatGPT a limit\xE9 la fr\xE9quence des requ\xEAtes. L'extension a ralenti et continuera automatiquement.",
            bulk_stopped: "Arr\xEAt\xE9. Trait\xE9s {done} sur {total}",
            bulk_deleted: "Chats supprim\xE9s : {done} sur {total}",
            bulk_archived: "Chats archiv\xE9s : {done} sur {total}",
            bulk_background_delete: "Suppression en arri\xE8re-plan, environ {minutes} min. Continuez \xE0 utiliser ChatGPT normalement : si vous fermez l\u2019onglet, nous reprendrons \xE0 sa prochaine ouverture.",
            bulk_background_archive: "Archivage en arri\xE8re-plan, environ {minutes} min. Continuez \xE0 utiliser ChatGPT normalement : si vous fermez l\u2019onglet, nous reprendrons \xE0 sa prochaine ouverture.",
            error_generic: "Une erreur s'est produite. Veuillez r\xE9essayer.",
            error_reload_page: "L'extension a \xE9t\xE9 mise \xE0 jour. Rechargez la page pour continuer."
          }
        },
        id: {
          bulk_delete: "Hapus massal",
          bulk_delete_description: "Pilih beberapa chat dan lakukan aksi massal",
          count_selected_chats: "Dipilih",
          button_select_all_chats: "Pilih semua",
          button_deselect_all_chats: "Batal pilih semua",
          button_select_chats: "Pilih",
          button_done: "Selesai",
          button_bulk_archive: "Arsipkan",
          button_bulk_archiving: "Mengarsipkan",
          button_bulk_delete: "Hapus",
          button_bulk_deleting: "Menghapus",
          window_confirmation_button_confirm: "Konfirmasi",
          window_confirmation_button_cancel: "Batal",
          window_confirmation_archive_question: "Yakin ingin mengarsipkan chat?",
          window_confirmation_delete_question: "Yakin ingin menghapus chat?",
          bulk: {
            progress: "Diproses {done} dari {total}",
            eta: "sisa ~{minutes} mnt",
            slow_reason: "ChatGPT menghapus chat satu per satu, sekitar 7 dtk per chat",
            background_hint: "Tetap gunakan ChatGPT seperti biasa. Jika tab ditutup, kami lanjutkan saat Anda membuka ChatGPT lagi.",
            cooldown: "ChatGPT sedang membatasi permintaan. Dilanjutkan dalam {seconds} detik",
            button_stop: "Hentikan",
            button_background: "Di latar belakang",
            resume_question: "Tindakan belum selesai: tersisa {count}",
            button_resume: "Lanjutkan",
            button_discard: "Buang",
            delete_hint: "Tindakan ini tidak dapat dibatalkan.",
            archive_hint: "Anda dapat menemukannya di \u201CObrolan yang diarsipkan\u201D."
          },
          notification: {
            bulk_interrupted: "Terhenti: sesi ChatGPT tidak tersedia. Muat ulang halaman lalu lanjutkan. Diproses {done} dari {total}.",
            bulk_rate_limited: "ChatGPT membatasi frekuensi permintaan. Ekstensi memperlambat dan akan melanjutkan secara otomatis.",
            bulk_stopped: "Dihentikan. Diproses {done} dari {total}",
            bulk_deleted: "Chat dihapus: {done} dari {total}",
            bulk_archived: "Chat diarsipkan: {done} dari {total}",
            bulk_background_delete: "Menghapus di latar belakang, sekitar {minutes} mnt. Tetap gunakan ChatGPT seperti biasa \u2014 jika tab ditutup, kami lanjutkan saat Anda membukanya lagi.",
            bulk_background_archive: "Mengarsipkan di latar belakang, sekitar {minutes} mnt. Tetap gunakan ChatGPT seperti biasa \u2014 jika tab ditutup, kami lanjutkan saat Anda membukanya lagi.",
            error_generic: "Terjadi kesalahan. Silakan coba lagi.",
            error_reload_page: "Ekstensi telah diperbarui. Muat ulang halaman untuk melanjutkan."
          }
        },
        it: {
          bulk_delete: "Eliminazione di massa",
          bulk_delete_description: "Seleziona pi\xF9 chat ed esegui un'azione di massa",
          count_selected_chats: "Selezionati",
          button_select_all_chats: "Seleziona tutto",
          button_deselect_all_chats: "Deseleziona tutto",
          button_select_chats: "Seleziona",
          button_done: "Fine",
          button_bulk_archive: "Archivia",
          button_bulk_archiving: "Archiviazione",
          button_bulk_delete: "Elimina",
          button_bulk_deleting: "Eliminazione",
          window_confirmation_button_confirm: "Conferma",
          window_confirmation_button_cancel: "Annulla",
          window_confirmation_archive_question: "Sei sicuro di voler archiviare le chat?",
          window_confirmation_delete_question: "Sei sicuro di voler eliminare le chat?",
          bulk: {
            progress: "Elaborati {done} di {total}",
            eta: "ancora ~{minutes} min",
            slow_reason: "ChatGPT elimina le chat una alla volta, circa 7 s ciascuna",
            background_hint: "Continua a usare ChatGPT come sempre. Se chiudi la scheda, riprenderemo quando riaprirai ChatGPT.",
            cooldown: "ChatGPT sta limitando le richieste. Ripresa tra {seconds} s",
            button_stop: "Ferma",
            button_background: "In background",
            resume_question: "Azione incompiuta: {count} rimasti",
            button_resume: "Riprendi",
            button_discard: "Annulla",
            delete_hint: "Questa azione non pu\xF2 essere annullata.",
            archive_hint: "Li troverai in \xABChat archiviate\xBB."
          },
          notification: {
            bulk_interrupted: "Interrotto: la sessione ChatGPT non \xE8 disponibile. Ricarica la pagina e riprendi. Elaborati {done} di {total}.",
            bulk_rate_limited: "ChatGPT ha limitato la frequenza delle richieste. L'estensione ha rallentato e continuer\xE0 automaticamente.",
            bulk_stopped: "Interrotto. Elaborati {done} di {total}",
            bulk_deleted: "Chat eliminate: {done} di {total}",
            bulk_archived: "Chat archiviate: {done} di {total}",
            bulk_background_delete: "Eliminazione in background, circa {minutes} min. Continua a usare ChatGPT come sempre: se chiudi la scheda, riprenderemo quando lo riaprirai.",
            bulk_background_archive: "Archiviazione in background, circa {minutes} min. Continua a usare ChatGPT come sempre: se chiudi la scheda, riprenderemo quando lo riaprirai.",
            error_generic: "Si \xE8 verificato un errore. Riprova.",
            error_reload_page: "L'estensione \xE8 stata aggiornata. Ricarica la pagina per continuare."
          }
        },
        ja: {
          bulk_delete: "\u4E00\u62EC\u524A\u9664",
          bulk_delete_description: "\u8907\u6570\u306E\u30C1\u30E3\u30C3\u30C8\u3092\u9078\u629E\u3057\u3066\u4E00\u62EC\u64CD\u4F5C\u3092\u5B9F\u884C",
          count_selected_chats: "\u9078\u629E\u6E08\u307F",
          button_select_all_chats: "\u3059\u3079\u3066\u9078\u629E",
          button_deselect_all_chats: "\u3059\u3079\u3066\u89E3\u9664",
          button_select_chats: "\u9078\u629E",
          button_done: "\u5B8C\u4E86",
          button_bulk_archive: "\u30A2\u30FC\u30AB\u30A4\u30D6",
          button_bulk_archiving: "\u30A2\u30FC\u30AB\u30A4\u30D6\u4E2D",
          button_bulk_delete: "\u524A\u9664",
          button_bulk_deleting: "\u524A\u9664\u4E2D",
          window_confirmation_button_confirm: "\u78BA\u8A8D",
          window_confirmation_button_cancel: "\u30AD\u30E3\u30F3\u30BB\u30EB",
          window_confirmation_archive_question: "\u30C1\u30E3\u30C3\u30C8\u3092\u30A2\u30FC\u30AB\u30A4\u30D6\u3057\u307E\u3059\u304B\uFF1F",
          window_confirmation_delete_question: "\u30C1\u30E3\u30C3\u30C8\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F",
          bulk: {
            progress: "{total} \u4EF6\u4E2D {done} \u4EF6\u3092\u51E6\u7406\u3057\u307E\u3057\u305F",
            eta: "\u6B8B\u308A\u7D04{minutes}\u5206",
            slow_reason: "ChatGPT\u306F\u30C1\u30E3\u30C3\u30C8\u30921\u4EF6\u305A\u3064\u524A\u9664\u3057\u307E\u3059\uFF081\u4EF6\u3042\u305F\u308A\u7D047\u79D2\uFF09",
            background_hint: "ChatGPT\u306F\u3044\u3064\u3082\u901A\u308A\u4F7F\u3048\u307E\u3059\u3002\u30BF\u30D6\u3092\u9589\u3058\u3066\u3082\u3001\u6B21\u306BChatGPT\u3092\u958B\u3044\u305F\u3068\u304D\u306B\u7D9A\u304D\u304B\u3089\u518D\u958B\u3057\u307E\u3059\u3002",
            cooldown: "ChatGPT \u304C\u30EA\u30AF\u30A8\u30B9\u30C8\u3092\u5236\u9650\u3057\u3066\u3044\u307E\u3059\u3002{seconds} \u79D2\u5F8C\u306B\u518D\u958B\u3057\u307E\u3059",
            button_stop: "\u505C\u6B62",
            button_background: "\u30D0\u30C3\u30AF\u30B0\u30E9\u30A6\u30F3\u30C9\u3067",
            resume_question: "\u672A\u5B8C\u4E86\u306E\u64CD\u4F5C: \u6B8B\u308A {count} \u4EF6",
            button_resume: "\u518D\u958B",
            button_discard: "\u7834\u68C4",
            delete_hint: "\u3053\u306E\u64CD\u4F5C\u306F\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002",
            archive_hint: "\u300C\u30A2\u30FC\u30AB\u30A4\u30D6\u6E08\u307F\u306E\u30C1\u30E3\u30C3\u30C8\u300D\u3067\u78BA\u8A8D\u3067\u304D\u307E\u3059\u3002"
          },
          notification: {
            bulk_interrupted: "\u4E2D\u65AD\u3057\u307E\u3057\u305F: ChatGPT \u306E\u30BB\u30C3\u30B7\u30E7\u30F3\u3092\u5229\u7528\u3067\u304D\u307E\u305B\u3093\u3002\u30DA\u30FC\u30B8\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u518D\u958B\u3057\u3066\u304F\u3060\u3055\u3044\u3002{total} \u4EF6\u4E2D {done} \u4EF6\u3092\u51E6\u7406\u3057\u307E\u3057\u305F\u3002",
            bulk_rate_limited: "ChatGPT \u304C\u30EA\u30AF\u30A8\u30B9\u30C8\u983B\u5EA6\u3092\u5236\u9650\u3057\u307E\u3057\u305F\u3002\u62E1\u5F35\u6A5F\u80FD\u306F\u901F\u5EA6\u3092\u843D\u3068\u3057\u3066\u81EA\u52D5\u7684\u306B\u7D9A\u884C\u3057\u307E\u3059\u3002",
            bulk_stopped: "\u505C\u6B62\u3057\u307E\u3057\u305F\u3002{total} \u4EF6\u4E2D {done} \u4EF6\u3092\u51E6\u7406\u3057\u307E\u3057\u305F",
            bulk_deleted: "\u30C1\u30E3\u30C3\u30C8\u3092\u524A\u9664\u3057\u307E\u3057\u305F: {total} \u4EF6\u4E2D {done} \u4EF6",
            bulk_archived: "\u30C1\u30E3\u30C3\u30C8\u3092\u30A2\u30FC\u30AB\u30A4\u30D6\u3057\u307E\u3057\u305F: {total} \u4EF6\u4E2D {done} \u4EF6",
            bulk_background_delete: "\u30D0\u30C3\u30AF\u30B0\u30E9\u30A6\u30F3\u30C9\u3067\u524A\u9664\u4E2D\u3067\u3059\uFF08\u7D04{minutes}\u5206\uFF09\u3002ChatGPT\u306F\u3044\u3064\u3082\u901A\u308A\u4F7F\u3048\u307E\u3059\u3002\u30BF\u30D6\u3092\u9589\u3058\u3066\u3082\u3001\u6B21\u306B\u958B\u3044\u305F\u3068\u304D\u306B\u7D9A\u304D\u304B\u3089\u518D\u958B\u3057\u307E\u3059\u3002",
            bulk_background_archive: "\u30D0\u30C3\u30AF\u30B0\u30E9\u30A6\u30F3\u30C9\u3067\u30A2\u30FC\u30AB\u30A4\u30D6\u4E2D\u3067\u3059\uFF08\u7D04{minutes}\u5206\uFF09\u3002ChatGPT\u306F\u3044\u3064\u3082\u901A\u308A\u4F7F\u3048\u307E\u3059\u3002\u30BF\u30D6\u3092\u9589\u3058\u3066\u3082\u3001\u6B21\u306B\u958B\u3044\u305F\u3068\u304D\u306B\u7D9A\u304D\u304B\u3089\u518D\u958B\u3057\u307E\u3059\u3002",
            error_generic: "\u554F\u984C\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002",
            error_reload_page: "\u62E1\u5F35\u6A5F\u80FD\u304C\u66F4\u65B0\u3055\u308C\u307E\u3057\u305F\u3002\u7D9A\u884C\u3059\u308B\u306B\u306F\u30DA\u30FC\u30B8\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
          }
        },
        ko: {
          bulk_delete: "\uC77C\uAD04 \uC0AD\uC81C",
          bulk_delete_description: "\uC5EC\uB7EC \uCC44\uD305\uC744 \uC120\uD0DD\uD558\uACE0 \uC77C\uAD04 \uC791\uC5C5\uC744 \uC218\uD589\uD558\uC138\uC694",
          count_selected_chats: "\uC120\uD0DD\uB428",
          button_select_all_chats: "\uBAA8\uB450 \uC120\uD0DD",
          button_deselect_all_chats: "\uBAA8\uB450 \uD574\uC81C",
          button_select_chats: "\uC120\uD0DD",
          button_done: "\uC644\uB8CC",
          button_bulk_archive: "\uBCF4\uAD00",
          button_bulk_archiving: "\uBCF4\uAD00 \uC911",
          button_bulk_delete: "\uC0AD\uC81C",
          button_bulk_deleting: "\uC0AD\uC81C \uC911",
          window_confirmation_button_confirm: "\uD655\uC778",
          window_confirmation_button_cancel: "\uCDE8\uC18C",
          window_confirmation_archive_question: "\uCC44\uD305\uC744 \uBCF4\uAD00\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
          window_confirmation_delete_question: "\uCC44\uD305\uC744 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
          bulk: {
            progress: "{total}\uAC1C \uC911 {done}\uAC1C \uCC98\uB9AC\uB428",
            eta: "\uC57D {minutes}\uBD84 \uB0A8\uC74C",
            slow_reason: "ChatGPT\uB294 \uCC44\uD305\uC744 \uD558\uB098\uC529 \uC0AD\uC81C\uD574\uC694. \uCC44\uD305\uB2F9 \uC57D 7\uCD08",
            background_hint: "ChatGPT\uB97C \uD3C9\uC18C\uCC98\uB7FC \uC0AC\uC6A9\uD558\uC138\uC694. \uD0ED\uC744 \uB2EB\uC544\uB3C4 ChatGPT\uB97C \uB2E4\uC2DC \uC5F4\uBA74 \uC774\uC5B4\uC11C \uC9C4\uD589\uD574\uC694.",
            cooldown: "ChatGPT\uAC00 \uC694\uCCAD\uC744 \uC81C\uD55C\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4. {seconds}\uCD08 \uD6C4\uC5D0 \uACC4\uC18D\uD569\uB2C8\uB2E4",
            button_stop: "\uC911\uC9C0",
            button_background: "\uBC31\uADF8\uB77C\uC6B4\uB4DC\uB85C",
            resume_question: "\uC644\uB8CC\uB418\uC9C0 \uC54A\uC740 \uC791\uC5C5: {count}\uAC1C \uB0A8\uC74C",
            button_resume: "\uACC4\uC18D",
            button_discard: "\uCDE8\uC18C",
            delete_hint: "\uC774 \uC791\uC5C5\uC740 \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
            archive_hint: "\u2018\uBCF4\uAD00\uB41C \uCC44\uD305\u2019\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
          },
          notification: {
            bulk_interrupted: "\uC911\uB2E8\uB428: ChatGPT \uC138\uC158\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C \uACE0\uCE5C \uD6C4 \uACC4\uC18D\uD558\uC138\uC694. {total}\uAC1C \uC911 {done}\uAC1C \uCC98\uB9AC\uB428.",
            bulk_rate_limited: "ChatGPT\uAC00 \uC694\uCCAD \uBE48\uB3C4\uB97C \uC81C\uD55C\uD588\uC2B5\uB2C8\uB2E4. \uD655\uC7A5 \uD504\uB85C\uADF8\uB7A8\uC774 \uC18D\uB3C4\uB97C \uB0AE\uCD94\uACE0 \uC790\uB3D9\uC73C\uB85C \uACC4\uC18D\uD569\uB2C8\uB2E4.",
            bulk_stopped: "\uC911\uC9C0\uB428. {total}\uAC1C \uC911 {done}\uAC1C \uCC98\uB9AC\uB428",
            bulk_deleted: "\uCC44\uD305 \uC0AD\uC81C \uC644\uB8CC: {total}\uAC1C \uC911 {done}\uAC1C",
            bulk_archived: "\uCC44\uD305 \uBCF4\uAD00 \uC644\uB8CC: {total}\uAC1C \uC911 {done}\uAC1C",
            bulk_background_delete: "\uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC0AD\uC81C \uC911\uC774\uC5D0\uC694. \uC57D {minutes}\uBD84 \uAC78\uB824\uC694. ChatGPT\uB97C \uD3C9\uC18C\uCC98\uB7FC \uC0AC\uC6A9\uD558\uC138\uC694. \uD0ED\uC744 \uB2EB\uC544\uB3C4 \uB2E4\uC2DC \uC5F4\uBA74 \uC774\uC5B4\uC11C \uC9C4\uD589\uD574\uC694.",
            bulk_background_archive: "\uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uBCF4\uAD00 \uC911\uC774\uC5D0\uC694. \uC57D {minutes}\uBD84 \uAC78\uB824\uC694. ChatGPT\uB97C \uD3C9\uC18C\uCC98\uB7FC \uC0AC\uC6A9\uD558\uC138\uC694. \uD0ED\uC744 \uB2EB\uC544\uB3C4 \uB2E4\uC2DC \uC5F4\uBA74 \uC774\uC5B4\uC11C \uC9C4\uD589\uD574\uC694.",
            error_generic: "\uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.",
            error_reload_page: "\uD655\uC7A5 \uD504\uB85C\uADF8\uB7A8\uC774 \uC5C5\uB370\uC774\uD2B8\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD558\uB824\uBA74 \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C \uACE0\uCE58\uC138\uC694."
          }
        },
        nl: {
          bulk_delete: "Massaal verwijderen",
          bulk_delete_description: "Selecteer meerdere chats en voer een bulkactie uit",
          count_selected_chats: "Geselecteerd",
          button_select_all_chats: "Alles selecteren",
          button_deselect_all_chats: "Alles deselecteren",
          button_select_chats: "Selecteren",
          button_done: "Klaar",
          button_bulk_archive: "Archiveren",
          button_bulk_archiving: "Archiveren",
          button_bulk_delete: "Verwijderen",
          button_bulk_deleting: "Verwijderen",
          window_confirmation_button_confirm: "Bevestigen",
          window_confirmation_button_cancel: "Annuleren",
          window_confirmation_archive_question: "Weet je zeker dat je de chats wilt archiveren?",
          window_confirmation_delete_question: "Weet je zeker dat je de chats wilt verwijderen?",
          bulk: {
            progress: "Verwerkt {done} van {total}",
            eta: "nog ~{minutes} min",
            slow_reason: "ChatGPT verwijdert chats \xE9\xE9n voor \xE9\xE9n, ongeveer 7 s per chat",
            background_hint: "Gebruik ChatGPT gewoon verder. Sluit je het tabblad, dan gaan we verder zodra je ChatGPT weer opent.",
            cooldown: "ChatGPT beperkt de verzoeken. Hervatten over {seconds} s",
            button_stop: "Stoppen",
            button_background: "Op de achtergrond",
            resume_question: "Onafgeronde actie: nog {count}",
            button_resume: "Hervatten",
            button_discard: "Verwerpen",
            delete_hint: "Dit kan niet ongedaan worden gemaakt.",
            archive_hint: "Je vindt ze bij \u2018Gearchiveerde chats\u2019."
          },
          notification: {
            bulk_interrupted: "Onderbroken: de ChatGPT-sessie is niet beschikbaar. Herlaad de pagina en hervat. Verwerkt {done} van {total}.",
            bulk_rate_limited: "ChatGPT heeft de aanvraagsnelheid beperkt. De extensie is vertraagd en gaat automatisch verder.",
            bulk_stopped: "Gestopt. Verwerkt {done} van {total}",
            bulk_deleted: "Chats verwijderd: {done} van {total}",
            bulk_archived: "Chats gearchiveerd: {done} van {total}",
            bulk_background_delete: "Wordt op de achtergrond verwijderd, ongeveer {minutes} min. Gebruik ChatGPT gewoon verder \u2013 sluit je het tabblad, dan gaan we verder zodra je het weer opent.",
            bulk_background_archive: "Wordt op de achtergrond gearchiveerd, ongeveer {minutes} min. Gebruik ChatGPT gewoon verder \u2013 sluit je het tabblad, dan gaan we verder zodra je het weer opent.",
            error_generic: "Er ging iets mis. Probeer het opnieuw.",
            error_reload_page: "De extensie is bijgewerkt. Herlaad de pagina om verder te gaan."
          }
        },
        pl: {
          bulk_delete: "Usuwanie zbiorcze",
          bulk_delete_description: "Wybierz wiele czat\xF3w i wykonaj operacj\u0119 zbiorcz\u0105",
          count_selected_chats: "Wybrane",
          button_select_all_chats: "Zaznacz wszystko",
          button_deselect_all_chats: "Odznacz wszystko",
          button_select_chats: "Zaznacz",
          button_done: "Gotowe",
          button_bulk_archive: "Archiwizuj",
          button_bulk_archiving: "Archiwizowanie",
          button_bulk_delete: "Usu\u0144",
          button_bulk_deleting: "Usuwanie",
          window_confirmation_button_confirm: "Potwierd\u017A",
          window_confirmation_button_cancel: "Anuluj",
          window_confirmation_archive_question: "Czy na pewno chcesz archiwizowa\u0107 czaty?",
          window_confirmation_delete_question: "Czy na pewno chcesz usun\u0105\u0107 czaty?",
          bulk: {
            progress: "Przetworzono {done} z {total}",
            eta: "zosta\u0142o ~{minutes} min",
            slow_reason: "ChatGPT usuwa czaty pojedynczo, oko\u0142o 7 s na czat",
            background_hint: "Korzystaj z ChatGPT jak zwykle. Je\u015Bli zamkniesz kart\u0119, wznowimy, gdy zn\xF3w otworzysz ChatGPT.",
            cooldown: "ChatGPT ogranicza liczb\u0119 \u017C\u0105da\u0144. Wznowienie za {seconds} s",
            button_stop: "Zatrzymaj",
            button_background: "W tle",
            resume_question: "Niedoko\u0144czone dzia\u0142anie: pozosta\u0142o {count}",
            button_resume: "Wzn\xF3w",
            button_discard: "Odrzu\u0107",
            delete_hint: "Tej operacji nie mo\u017Cna cofn\u0105\u0107.",
            archive_hint: "Znajdziesz je w sekcji \u201EZarchiwizowane czaty\u201D."
          },
          notification: {
            bulk_interrupted: "Przerwano: sesja ChatGPT jest niedost\u0119pna. Od\u015Bwie\u017C stron\u0119 i wzn\xF3w. Przetworzono {done} z {total}.",
            bulk_rate_limited: "ChatGPT ograniczy\u0142 cz\u0119stotliwo\u015B\u0107 \u017C\u0105da\u0144. Rozszerzenie zwolni\u0142o i b\u0119dzie kontynuowa\u0107 automatycznie.",
            bulk_stopped: "Zatrzymano. Przetworzono {done} z {total}",
            bulk_deleted: "Usuni\u0119te czaty: {done} z {total}",
            bulk_archived: "Zarchiwizowane czaty: {done} z {total}",
            bulk_background_delete: "Usuwamy w tle, oko\u0142o {minutes} min. Korzystaj z ChatGPT jak zwykle, a je\u015Bli zamkniesz kart\u0119, wznowimy, gdy zn\xF3w go otworzysz.",
            bulk_background_archive: "Archiwizujemy w tle, oko\u0142o {minutes} min. Korzystaj z ChatGPT jak zwykle, a je\u015Bli zamkniesz kart\u0119, wznowimy, gdy zn\xF3w go otworzysz.",
            error_generic: "Co\u015B posz\u0142o nie tak. Spr\xF3buj ponownie.",
            error_reload_page: "Rozszerzenie zosta\u0142o zaktualizowane. Od\u015Bwie\u017C stron\u0119, aby kontynuowa\u0107."
          }
        },
        pt: {
          bulk_delete: "Exclus\xE3o em massa",
          bulk_delete_description: "Selecione v\xE1rias conversas e execute uma a\xE7\xE3o em massa",
          count_selected_chats: "Selecionadas",
          button_select_all_chats: "Selecionar tudo",
          button_deselect_all_chats: "Desmarcar tudo",
          button_select_chats: "Selecionar",
          button_done: "Conclu\xEDdo",
          button_bulk_archive: "Arquivar",
          button_bulk_archiving: "Arquivando",
          button_bulk_delete: "Excluir",
          button_bulk_deleting: "Excluindo",
          window_confirmation_button_confirm: "Confirmar",
          window_confirmation_button_cancel: "Cancelar",
          window_confirmation_archive_question: "Tem certeza de que deseja arquivar as conversas?",
          window_confirmation_delete_question: "Tem certeza de que deseja excluir as conversas?",
          bulk: {
            progress: "Processados {done} de {total}",
            eta: "faltam ~{minutes} min",
            slow_reason: "O ChatGPT apaga as conversas uma a uma, cerca de 7 s cada",
            background_hint: "Continue usando o ChatGPT normalmente. Se fechar a aba, continuaremos quando voc\xEA abrir o ChatGPT de novo.",
            cooldown: "O ChatGPT est\xE1 limitando as solicita\xE7\xF5es. Retomando em {seconds} s",
            button_stop: "Parar",
            button_background: "Em segundo plano",
            resume_question: "A\xE7\xE3o inacabada: {count} restantes",
            button_resume: "Retomar",
            button_discard: "Descartar",
            delete_hint: "Esta a\xE7\xE3o n\xE3o pode ser desfeita.",
            archive_hint: "Voc\xEA vai encontr\xE1-los em \u201CChats arquivados\u201D."
          },
          notification: {
            bulk_interrupted: "Interrompido: a sess\xE3o do ChatGPT est\xE1 indispon\xEDvel. Recarregue a p\xE1gina e retome. Processados {done} de {total}.",
            bulk_rate_limited: "O ChatGPT limitou a frequ\xEAncia das solicita\xE7\xF5es. A extens\xE3o reduziu a velocidade e continuar\xE1 automaticamente.",
            bulk_stopped: "Interrompido. Processados {done} de {total}",
            bulk_deleted: "Chats exclu\xEDdos: {done} de {total}",
            bulk_archived: "Chats arquivados: {done} de {total}",
            bulk_background_delete: "Excluindo em segundo plano, cerca de {minutes} min. Continue usando o ChatGPT normalmente: se fechar a aba, continuaremos quando voc\xEA o abrir de novo.",
            bulk_background_archive: "Arquivando em segundo plano, cerca de {minutes} min. Continue usando o ChatGPT normalmente: se fechar a aba, continuaremos quando voc\xEA o abrir de novo.",
            error_generic: "Algo deu errado. Tente novamente.",
            error_reload_page: "A extens\xE3o foi atualizada. Recarregue a p\xE1gina para continuar."
          }
        },
        ru: {
          bulk_delete: "\u041C\u0430\u0441\u0441\u043E\u0432\u043E\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435",
          bulk_delete_description: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0447\u0430\u0442\u043E\u0432 \u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043C\u0430\u0441\u0441\u043E\u0432\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435",
          count_selected_chats: "\u0412\u044B\u0431\u0440\u0430\u043D\u043E",
          button_select_all_chats: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435",
          button_deselect_all_chats: "\u0421\u043D\u044F\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435",
          button_select_chats: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C",
          button_done: "\u0413\u043E\u0442\u043E\u0432\u043E",
          button_bulk_archive: "\u0410\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
          button_bulk_archiving: "\u0410\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
          button_bulk_delete: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
          button_bulk_deleting: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435",
          window_confirmation_button_confirm: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",
          window_confirmation_button_cancel: "\u041E\u0442\u043C\u0435\u043D\u0430",
          window_confirmation_archive_question: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0430\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0447\u0430\u0442\u044B?",
          window_confirmation_delete_question: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0447\u0430\u0442\u044B?",
          bulk: {
            progress: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E {done} \u0438\u0437 {total}",
            eta: "\u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ~{minutes} \u043C\u0438\u043D",
            slow_reason: "ChatGPT \u0443\u0434\u0430\u043B\u044F\u0435\u0442 \u0447\u0430\u0442\u044B \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443, \u043E\u043A\u043E\u043B\u043E 7 \u0441 \u043D\u0430 \u0447\u0430\u0442",
            background_hint: "\u041F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435\u0441\u044C ChatGPT \u043A\u0430\u043A \u043E\u0431\u044B\u0447\u043D\u043E. \u0417\u0430\u043A\u0440\u043E\u0435\u0442\u0435 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \u2014 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u043C, \u043A\u043E\u0433\u0434\u0430 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0435 ChatGPT \u0441\u043D\u043E\u0432\u0430.",
            cooldown: "ChatGPT \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0438\u043B \u0447\u0430\u0441\u0442\u043E\u0442\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u043C \u0447\u0435\u0440\u0435\u0437 {seconds} \u0441",
            button_stop: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",
            button_background: "\u0412 \u0444\u043E\u043D\u0435",
            resume_question: "\u041D\u0435\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435: \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C {count}",
            button_resume: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",
            button_discard: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",
            delete_hint: "\u042D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C.",
            archive_hint: "\u041E\u043D\u0438 \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \xAB\u0410\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0447\u0430\u0442\u044B\xBB."
          },
          notification: {
            bulk_interrupted: "\u041F\u0440\u0435\u0440\u0432\u0430\u043D\u043E: \u0441\u0435\u0441\u0441\u0438\u044F ChatGPT \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430. \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435. \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E {done} \u0438\u0437 {total}.",
            bulk_rate_limited: "ChatGPT \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0438\u043B \u0447\u0430\u0441\u0442\u043E\u0442\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432. \u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435 \u0441\u0431\u0430\u0432\u0438\u043B\u043E \u0442\u0435\u043C\u043F \u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438.",
            bulk_stopped: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E. \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E {done} \u0438\u0437 {total}",
            bulk_deleted: "\u0427\u0430\u0442\u044B \u0443\u0434\u0430\u043B\u0435\u043D\u044B: {done} \u0438\u0437 {total}",
            bulk_archived: "\u0427\u0430\u0442\u044B \u0432 \u0430\u0440\u0445\u0438\u0432\u0435: {done} \u0438\u0437 {total}",
            bulk_background_delete: "\u0423\u0434\u0430\u043B\u044F\u0435\u043C \u0432 \u0444\u043E\u043D\u0435, \u043E\u043A\u043E\u043B\u043E {minutes} \u043C\u0438\u043D. \u041F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435\u0441\u044C ChatGPT \u043A\u0430\u043A \u043E\u0431\u044B\u0447\u043D\u043E, \u0430 \u0437\u0430\u043A\u0440\u043E\u0435\u0442\u0435 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \u2014 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u043C, \u043A\u043E\u0433\u0434\u0430 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0435 \u0435\u0433\u043E \u0441\u043D\u043E\u0432\u0430.",
            bulk_background_archive: "\u0410\u0440\u0445\u0438\u0432\u0438\u0440\u0443\u0435\u043C \u0432 \u0444\u043E\u043D\u0435, \u043E\u043A\u043E\u043B\u043E {minutes} \u043C\u0438\u043D. \u041F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435\u0441\u044C ChatGPT \u043A\u0430\u043A \u043E\u0431\u044B\u0447\u043D\u043E, \u0430 \u0437\u0430\u043A\u0440\u043E\u0435\u0442\u0435 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \u2014 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u043C, \u043A\u043E\u0433\u0434\u0430 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0435 \u0435\u0433\u043E \u0441\u043D\u043E\u0432\u0430.",
            error_generic: "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.",
            error_reload_page: "\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435 \u043E\u0431\u043D\u043E\u0432\u0438\u043B\u043E\u0441\u044C. \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C."
          }
        },
        th: {
          bulk_delete: "\u0E25\u0E1A\u0E41\u0E1A\u0E1A\u0E01\u0E25\u0E38\u0E48\u0E21",
          bulk_delete_description: "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2B\u0E25\u0E32\u0E22\u0E41\u0E0A\u0E15\u0E41\u0E25\u0E30\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E41\u0E1A\u0E1A\u0E01\u0E25\u0E38\u0E48\u0E21",
          count_selected_chats: "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27",
          button_select_all_chats: "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
          button_deselect_all_chats: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E01\u0E32\u0E23\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
          button_select_chats: "\u0E40\u0E25\u0E37\u0E2D\u0E01",
          button_done: "\u0E40\u0E2A\u0E23\u0E47\u0E08",
          button_bulk_archive: "\u0E40\u0E01\u0E47\u0E1A\u0E16\u0E32\u0E27\u0E23",
          button_bulk_archiving: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E01\u0E47\u0E1A\u0E16\u0E32\u0E27\u0E23",
          button_bulk_delete: "\u0E25\u0E1A",
          button_bulk_deleting: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E25\u0E1A",
          window_confirmation_button_confirm: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19",
          window_confirmation_button_cancel: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01",
          window_confirmation_archive_question: "\u0E04\u0E38\u0E13\u0E41\u0E19\u0E48\u0E43\u0E08\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E27\u0E48\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E40\u0E01\u0E47\u0E1A\u0E16\u0E32\u0E27\u0E23\u0E41\u0E0A\u0E15?",
          window_confirmation_delete_question: "\u0E04\u0E38\u0E13\u0E41\u0E19\u0E48\u0E43\u0E08\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E27\u0E48\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E41\u0E0A\u0E15?",
          bulk: {
            progress: "\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E41\u0E25\u0E49\u0E27 {done} \u0E08\u0E32\u0E01 {total}",
            eta: "\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E2D\u0E35\u0E01\u0E23\u0E32\u0E27 {minutes} \u0E19\u0E32\u0E17\u0E35",
            slow_reason: "ChatGPT \u0E25\u0E1A\u0E41\u0E0A\u0E15\u0E17\u0E35\u0E25\u0E30\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 7 \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35\u0E15\u0E48\u0E2D\u0E41\u0E0A\u0E15",
            background_hint: "\u0E43\u0E0A\u0E49 ChatGPT \u0E15\u0E48\u0E2D\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E1B\u0E01\u0E15\u0E34 \u0E16\u0E49\u0E32\u0E1B\u0E34\u0E14\u0E41\u0E17\u0E47\u0E1A \u0E40\u0E23\u0E32\u0E08\u0E30\u0E17\u0E33\u0E15\u0E48\u0E2D\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E04\u0E38\u0E13\u0E40\u0E1B\u0E34\u0E14 ChatGPT \u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07",
            cooldown: "ChatGPT \u0E01\u0E33\u0E25\u0E31\u0E07\u0E08\u0E33\u0E01\u0E31\u0E14\u0E04\u0E33\u0E02\u0E2D \u0E08\u0E30\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D\u0E43\u0E19 {seconds} \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35",
            button_stop: "\u0E2B\u0E22\u0E38\u0E14",
            button_background: "\u0E17\u0E33\u0E07\u0E32\u0E19\u0E40\u0E1A\u0E37\u0E49\u0E2D\u0E07\u0E2B\u0E25\u0E31\u0E07",
            resume_question: "\u0E01\u0E32\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E2A\u0E23\u0E47\u0E08: \u0E40\u0E2B\u0E25\u0E37\u0E2D {count}",
            button_resume: "\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D",
            button_discard: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01",
            delete_hint: "\u0E01\u0E32\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E19\u0E35\u0E49\u0E22\u0E49\u0E2D\u0E19\u0E01\u0E25\u0E31\u0E1A\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49",
            archive_hint: "\u0E14\u0E39\u0E44\u0E14\u0E49\u0E43\u0E19 \u201C\u0E41\u0E0A\u0E17\u0E17\u0E35\u0E48\u0E40\u0E01\u0E47\u0E1A\u0E16\u0E32\u0E27\u0E23\u201D"
          },
          notification: {
            bulk_interrupted: "\u0E2B\u0E22\u0E38\u0E14\u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27: \u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E43\u0E0A\u0E49\u0E40\u0E0B\u0E2A\u0E0A\u0E31\u0E19 ChatGPT \u0E44\u0E14\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E25\u0E49\u0E27\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D \u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E41\u0E25\u0E49\u0E27 {done} \u0E08\u0E32\u0E01 {total}",
            bulk_rate_limited: "ChatGPT \u0E08\u0E33\u0E01\u0E31\u0E14\u0E04\u0E27\u0E32\u0E21\u0E16\u0E35\u0E48\u0E02\u0E2D\u0E07\u0E04\u0E33\u0E02\u0E2D \u0E2A\u0E48\u0E27\u0E19\u0E02\u0E22\u0E32\u0E22\u0E44\u0E14\u0E49\u0E0A\u0E30\u0E25\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E47\u0E27\u0E41\u0E25\u0E30\u0E08\u0E30\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34",
            bulk_stopped: "\u0E2B\u0E22\u0E38\u0E14\u0E41\u0E25\u0E49\u0E27 \u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E41\u0E25\u0E49\u0E27 {done} \u0E08\u0E32\u0E01 {total}",
            bulk_deleted: "\u0E25\u0E1A\u0E41\u0E0A\u0E15\u0E41\u0E25\u0E49\u0E27: {done} \u0E08\u0E32\u0E01 {total}",
            bulk_archived: "\u0E40\u0E01\u0E47\u0E1A\u0E16\u0E32\u0E27\u0E23\u0E41\u0E0A\u0E15\u0E41\u0E25\u0E49\u0E27: {done} \u0E08\u0E32\u0E01 {total}",
            bulk_background_delete: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E25\u0E1A\u0E43\u0E19\u0E40\u0E1A\u0E37\u0E49\u0E2D\u0E07\u0E2B\u0E25\u0E31\u0E07 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 {minutes} \u0E19\u0E32\u0E17\u0E35 \u0E43\u0E0A\u0E49 ChatGPT \u0E15\u0E48\u0E2D\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E1B\u0E01\u0E15\u0E34 \u0E16\u0E49\u0E32\u0E1B\u0E34\u0E14\u0E41\u0E17\u0E47\u0E1A \u0E40\u0E23\u0E32\u0E08\u0E30\u0E17\u0E33\u0E15\u0E48\u0E2D\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E04\u0E38\u0E13\u0E40\u0E1B\u0E34\u0E14\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07",
            bulk_background_archive: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E01\u0E47\u0E1A\u0E16\u0E32\u0E27\u0E23\u0E43\u0E19\u0E40\u0E1A\u0E37\u0E49\u0E2D\u0E07\u0E2B\u0E25\u0E31\u0E07 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 {minutes} \u0E19\u0E32\u0E17\u0E35 \u0E43\u0E0A\u0E49 ChatGPT \u0E15\u0E48\u0E2D\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E1B\u0E01\u0E15\u0E34 \u0E16\u0E49\u0E32\u0E1B\u0E34\u0E14\u0E41\u0E17\u0E47\u0E1A \u0E40\u0E23\u0E32\u0E08\u0E30\u0E17\u0E33\u0E15\u0E48\u0E2D\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E04\u0E38\u0E13\u0E40\u0E1B\u0E34\u0E14\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07",
            error_generic: "\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14 \u0E42\u0E1B\u0E23\u0E14\u0E25\u0E2D\u0E07\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07",
            error_reload_page: "\u0E2A\u0E48\u0E27\u0E19\u0E02\u0E22\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A\u0E2B\u0E19\u0E49\u0E32\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D"
          }
        },
        tr: {
          bulk_delete: "Toplu silme",
          bulk_delete_description: "Birden fazla sohbet se\xE7 ve toplu i\u015Flem ger\xE7ekle\u015Ftir",
          count_selected_chats: "Se\xE7ildi",
          button_select_all_chats: "T\xFCm\xFCn\xFC se\xE7",
          button_deselect_all_chats: "T\xFCm\xFCn\xFC kald\u0131r",
          button_select_chats: "Se\xE7",
          button_done: "Bitti",
          button_bulk_archive: "Ar\u015Fivle",
          button_bulk_archiving: "Ar\u015Fivleniyor",
          button_bulk_delete: "Sil",
          button_bulk_deleting: "Siliniyor",
          window_confirmation_button_confirm: "Onayla",
          window_confirmation_button_cancel: "\u0130ptal",
          window_confirmation_archive_question: "Sohbetleri ar\u015Fivlemek istedi\u011Fine emin misin?",
          window_confirmation_delete_question: "Sohbetleri silmek istedi\u011Fine emin misin?",
          bulk: {
            progress: "{total} sohbetten {done} tanesi i\u015Flendi",
            eta: "~{minutes} dk kald\u0131",
            slow_reason: "ChatGPT sohbetleri tek tek siler, her biri yakla\u015F\u0131k 7 sn",
            background_hint: "ChatGPT'yi her zamanki gibi kullan\u0131n. Sekmeyi kapat\u0131rsan\u0131z ChatGPT'yi yeniden a\xE7t\u0131\u011F\u0131n\u0131zda devam ederiz.",
            cooldown: "ChatGPT istekleri s\u0131n\u0131rl\u0131yor. {seconds} sn i\xE7inde devam edilecek",
            button_stop: "Durdur",
            button_background: "Arka planda",
            resume_question: "Tamamlanmam\u0131\u015F i\u015Flem: {count} kald\u0131",
            button_resume: "Devam et",
            button_discard: "Vazge\xE7",
            delete_hint: "Bu i\u015Flem geri al\u0131namaz.",
            archive_hint: "Onlar\u0131 \u201CAr\u015Fivlenmi\u015F sohbetler\u201D b\xF6l\xFCm\xFCnde bulabilirsin."
          },
          notification: {
            bulk_interrupted: "Durduruldu: ChatGPT oturumu kullan\u0131lam\u0131yor. Sayfay\u0131 yenileyip devam edin. {total} sohbetten {done} tanesi i\u015Flendi.",
            bulk_rate_limited: "ChatGPT istek h\u0131z\u0131n\u0131 s\u0131n\u0131rlad\u0131. Uzant\u0131 yava\u015Flad\u0131 ve otomatik olarak devam edecek.",
            bulk_stopped: "Durduruldu. {total} sohbetten {done} tanesi i\u015Flendi",
            bulk_deleted: "Sohbetler silindi: {total} sohbetten {done} tanesi",
            bulk_archived: "Sohbetler ar\u015Fivlendi: {total} sohbetten {done} tanesi",
            bulk_background_delete: "Arka planda siliniyor, yakla\u015F\u0131k {minutes} dk. ChatGPT'yi her zamanki gibi kullan\u0131n; sekmeyi kapat\u0131rsan\u0131z yeniden a\xE7t\u0131\u011F\u0131n\u0131zda devam ederiz.",
            bulk_background_archive: "Arka planda ar\u015Fivleniyor, yakla\u015F\u0131k {minutes} dk. ChatGPT'yi her zamanki gibi kullan\u0131n; sekmeyi kapat\u0131rsan\u0131z yeniden a\xE7t\u0131\u011F\u0131n\u0131zda devam ederiz.",
            error_generic: "Bir \u015Feyler ters gitti. L\xFCtfen tekrar dene.",
            error_reload_page: "Uzant\u0131 g\xFCncellendi. Devam etmek i\xE7in sayfay\u0131 yenile."
          }
        },
        uk: {
          bulk_delete: "\u041C\u0430\u0441\u043E\u0432\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F",
          bulk_delete_description: "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u0456\u043B\u044C\u043A\u0430 \u0447\u0430\u0442\u0456\u0432 \u0456 \u0432\u0438\u043A\u043E\u043D\u0430\u0439\u0442\u0435 \u043C\u0430\u0441\u043E\u0432\u0443 \u0434\u0456\u044E",
          count_selected_chats: "\u0412\u0438\u0431\u0440\u0430\u043D\u043E",
          button_select_all_chats: "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0432\u0441\u0435",
          button_deselect_all_chats: "\u0417\u043D\u044F\u0442\u0438 \u0432\u0438\u0431\u0456\u0440",
          button_select_chats: "\u0412\u0438\u0431\u0440\u0430\u0442\u0438",
          button_done: "\u0413\u043E\u0442\u043E\u0432\u043E",
          button_bulk_archive: "\u0410\u0440\u0445\u0456\u0432\u0443\u0432\u0430\u0442\u0438",
          button_bulk_archiving: "\u0410\u0440\u0445\u0456\u0432\u0443\u0432\u0430\u043D\u043D\u044F",
          button_bulk_delete: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
          button_bulk_deleting: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F",
          window_confirmation_button_confirm: "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438",
          window_confirmation_button_cancel: "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438",
          window_confirmation_archive_question: "\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0430\u0440\u0445\u0456\u0432\u0443\u0432\u0430\u0442\u0438 \u0447\u0430\u0442\u0438?",
          window_confirmation_delete_question: "\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0447\u0430\u0442\u0438?",
          bulk: {
            progress: "\u041E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u043E {done} \u0437 {total}",
            eta: "\u0437\u0430\u043B\u0438\u0448\u0438\u043B\u043E\u0441\u044C ~{minutes} \u0445\u0432",
            slow_reason: "ChatGPT \u0432\u0438\u0434\u0430\u043B\u044F\u0454 \u0447\u0430\u0442\u0438 \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443, \u0431\u043B\u0438\u0437\u044C\u043A\u043E 7 \u0441 \u043D\u0430 \u0447\u0430\u0442",
            background_hint: "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0439\u0442\u0435\u0441\u044F ChatGPT \u044F\u043A \u0437\u0430\u0437\u0432\u0438\u0447\u0430\u0439. \u0417\u0430\u043A\u0440\u0438\u0454\u0442\u0435 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \u2014 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u043C\u043E, \u043A\u043E\u043B\u0438 \u0437\u043D\u043E\u0432\u0443 \u0432\u0456\u0434\u043A\u0440\u0438\u0454\u0442\u0435 ChatGPT.",
            cooldown: "ChatGPT \u043E\u0431\u043C\u0435\u0436\u0438\u0432 \u0447\u0430\u0441\u0442\u043E\u0442\u0443 \u0437\u0430\u043F\u0438\u0442\u0456\u0432. \u041F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u043C\u043E \u0447\u0435\u0440\u0435\u0437 {seconds} \u0441",
            button_stop: "\u0417\u0443\u043F\u0438\u043D\u0438\u0442\u0438",
            button_background: "\u0423 \u0444\u043E\u043D\u0456",
            resume_question: "\u041D\u0435\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430 \u0434\u0456\u044F: \u0437\u0430\u043B\u0438\u0448\u0438\u043B\u043E\u0441\u044C {count}",
            button_resume: "\u041F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438",
            button_discard: "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438",
            delete_hint: "\u0426\u044E \u0434\u0456\u044E \u043D\u0435 \u043C\u043E\u0436\u043D\u0430 \u0441\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438.",
            archive_hint: "\u0412\u043E\u043D\u0438 \u0437\u2019\u044F\u0432\u043B\u044F\u0442\u044C\u0441\u044F \u0432 \u0440\u043E\u0437\u0434\u0456\u043B\u0456 \xAB\u0410\u0440\u0445\u0456\u0432\u043E\u0432\u0430\u043D\u0456 \u0447\u0430\u0442\u0438\xBB."
          },
          notification: {
            bulk_interrupted: "\u041F\u0435\u0440\u0435\u0440\u0432\u0430\u043D\u043E: \u0441\u0435\u0441\u0456\u044F ChatGPT \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430. \u041E\u043D\u043E\u0432\u0456\u0442\u044C \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0443 \u0442\u0430 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0442\u0435. \u041E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u043E {done} \u0437 {total}.",
            bulk_rate_limited: "ChatGPT \u043E\u0431\u043C\u0435\u0436\u0438\u0432 \u0447\u0430\u0441\u0442\u043E\u0442\u0443 \u0437\u0430\u043F\u0438\u0442\u0456\u0432. \u0420\u043E\u0437\u0448\u0438\u0440\u0435\u043D\u043D\u044F \u0441\u043F\u043E\u0432\u0456\u043B\u044C\u043D\u0438\u043B\u043E\u0441\u044C \u0456 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E.",
            bulk_stopped: "\u0417\u0443\u043F\u0438\u043D\u0435\u043D\u043E. \u041E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u043E {done} \u0437 {total}",
            bulk_deleted: "\u0427\u0430\u0442\u0438 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E: {done} \u0437 {total}",
            bulk_archived: "\u0427\u0430\u0442\u0438 \u0432 \u0430\u0440\u0445\u0456\u0432\u0456: {done} \u0437 {total}",
            bulk_background_delete: "\u0412\u0438\u0434\u0430\u043B\u044F\u0454\u043C\u043E \u0443 \u0444\u043E\u043D\u0456, \u0431\u043B\u0438\u0437\u044C\u043A\u043E {minutes} \u0445\u0432. \u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0439\u0442\u0435\u0441\u044F ChatGPT \u044F\u043A \u0437\u0430\u0437\u0432\u0438\u0447\u0430\u0439, \u0430 \u0437\u0430\u043A\u0440\u0438\u0454\u0442\u0435 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \u2014 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u043C\u043E, \u043A\u043E\u043B\u0438 \u0432\u0456\u0434\u043A\u0440\u0438\u0454\u0442\u0435 \u0439\u043E\u0433\u043E \u0437\u043D\u043E\u0432\u0443.",
            bulk_background_archive: "\u0410\u0440\u0445\u0456\u0432\u0443\u0454\u043C\u043E \u0443 \u0444\u043E\u043D\u0456, \u0431\u043B\u0438\u0437\u044C\u043A\u043E {minutes} \u0445\u0432. \u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0439\u0442\u0435\u0441\u044F ChatGPT \u044F\u043A \u0437\u0430\u0437\u0432\u0438\u0447\u0430\u0439, \u0430 \u0437\u0430\u043A\u0440\u0438\u0454\u0442\u0435 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \u2014 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u043C\u043E, \u043A\u043E\u043B\u0438 \u0432\u0456\u0434\u043A\u0440\u0438\u0454\u0442\u0435 \u0439\u043E\u0433\u043E \u0437\u043D\u043E\u0432\u0443.",
            error_generic: "\u0429\u043E\u0441\u044C \u043F\u0456\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A. \u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437.",
            error_reload_page: "\u0420\u043E\u0437\u0448\u0438\u0440\u0435\u043D\u043D\u044F \u043E\u043D\u043E\u0432\u0438\u043B\u043E\u0441\u044F. \u041E\u043D\u043E\u0432\u0456\u0442\u044C \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0443, \u0449\u043E\u0431 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438."
          }
        },
        vi: {
          bulk_delete: "X\xF3a h\xE0ng lo\u1EA1t",
          bulk_delete_description: "Ch\u1ECDn nhi\u1EC1u cu\u1ED9c tr\xF2 chuy\u1EC7n v\xE0 th\u1EF1c hi\u1EC7n h\xE0nh \u0111\u1ED9ng h\xE0ng lo\u1EA1t",
          count_selected_chats: "\u0110\xE3 ch\u1ECDn",
          button_select_all_chats: "Ch\u1ECDn t\u1EA5t c\u1EA3",
          button_deselect_all_chats: "B\u1ECF ch\u1ECDn t\u1EA5t c\u1EA3",
          button_select_chats: "Ch\u1ECDn",
          button_done: "Xong",
          button_bulk_archive: "L\u01B0u tr\u1EEF",
          button_bulk_archiving: "\u0110ang l\u01B0u tr\u1EEF",
          button_bulk_delete: "X\xF3a",
          button_bulk_deleting: "\u0110ang x\xF3a",
          window_confirmation_button_confirm: "X\xE1c nh\u1EADn",
          window_confirmation_button_cancel: "H\u1EE7y",
          window_confirmation_archive_question: "B\u1EA1n c\xF3 ch\u1EAFc mu\u1ED1n l\u01B0u tr\u1EEF c\xE1c cu\u1ED9c tr\xF2 chuy\u1EC7n kh\xF4ng?",
          window_confirmation_delete_question: "B\u1EA1n c\xF3 ch\u1EAFc mu\u1ED1n x\xF3a c\xE1c cu\u1ED9c tr\xF2 chuy\u1EC7n kh\xF4ng?",
          bulk: {
            progress: "\u0110\xE3 x\u1EED l\xFD {done} tr\xEAn {total}",
            eta: "c\xF2n kho\u1EA3ng {minutes} ph\xFAt",
            slow_reason: "ChatGPT x\xF3a t\u1EEBng cu\u1ED9c tr\xF2 chuy\u1EC7n m\u1ED9t, m\u1ED7i cu\u1ED9c kho\u1EA3ng 7 gi\xE2y",
            background_hint: "C\u1EE9 d\xF9ng ChatGPT nh\u01B0 b\xECnh th\u01B0\u1EDDng. N\u1EBFu \u0111\xF3ng tab, ch\xFAng t\xF4i s\u1EBD ti\u1EBFp t\u1EE5c khi b\u1EA1n m\u1EDF l\u1EA1i ChatGPT.",
            cooldown: "ChatGPT \u0111ang gi\u1EDBi h\u1EA1n y\xEAu c\u1EA7u. Ti\u1EBFp t\u1EE5c sau {seconds} gi\xE2y",
            button_stop: "D\u1EEBng",
            button_background: "Ch\u1EA1y n\u1EC1n",
            resume_question: "Thao t\xE1c ch\u01B0a ho\xE0n t\u1EA5t: c\xF2n {count}",
            button_resume: "Ti\u1EBFp t\u1EE5c",
            button_discard: "B\u1ECF qua",
            delete_hint: "Kh\xF4ng th\u1EC3 ho\xE0n t\xE1c thao t\xE1c n\xE0y.",
            archive_hint: "B\u1EA1n c\xF3 th\u1EC3 t\xECm th\u1EA5y ch\xFAng trong \u201C\u0110o\u1EA1n chat \u0111\xE3 l\u01B0u tr\u1EEF\u201D."
          },
          notification: {
            bulk_interrupted: "\u0110\xE3 d\u1EEBng: phi\xEAn ChatGPT kh\xF4ng kh\u1EA3 d\u1EE5ng. H\xE3y t\u1EA3i l\u1EA1i trang v\xE0 ti\u1EBFp t\u1EE5c. \u0110\xE3 x\u1EED l\xFD {done} tr\xEAn {total}.",
            bulk_rate_limited: "ChatGPT \u0111\xE3 gi\u1EDBi h\u1EA1n t\u1EA7n su\u1EA5t y\xEAu c\u1EA7u. Ti\u1EC7n \xEDch \u0111\xE3 gi\u1EA3m t\u1ED1c \u0111\u1ED9 v\xE0 s\u1EBD ti\u1EBFp t\u1EE5c t\u1EF1 \u0111\u1ED9ng.",
            bulk_stopped: "\u0110\xE3 d\u1EEBng. \u0110\xE3 x\u1EED l\xFD {done} tr\xEAn {total}",
            bulk_deleted: "\u0110\xE3 x\xF3a \u0111o\u1EA1n chat: {done} tr\xEAn {total}",
            bulk_archived: "\u0110\xE3 l\u01B0u tr\u1EEF \u0111o\u1EA1n chat: {done} tr\xEAn {total}",
            bulk_background_delete: "\u0110ang x\xF3a trong n\u1EC1n, kho\u1EA3ng {minutes} ph\xFAt. C\u1EE9 d\xF9ng ChatGPT nh\u01B0 b\xECnh th\u01B0\u1EDDng \u2014 n\u1EBFu \u0111\xF3ng tab, ch\xFAng t\xF4i s\u1EBD ti\u1EBFp t\u1EE5c khi b\u1EA1n m\u1EDF l\u1EA1i.",
            bulk_background_archive: "\u0110ang l\u01B0u tr\u1EEF trong n\u1EC1n, kho\u1EA3ng {minutes} ph\xFAt. C\u1EE9 d\xF9ng ChatGPT nh\u01B0 b\xECnh th\u01B0\u1EDDng \u2014 n\u1EBFu \u0111\xF3ng tab, ch\xFAng t\xF4i s\u1EBD ti\u1EBFp t\u1EE5c khi b\u1EA1n m\u1EDF l\u1EA1i.",
            error_generic: "\u0110\xE3 x\u1EA3y ra l\u1ED7i. Vui l\xF2ng th\u1EED l\u1EA1i.",
            error_reload_page: "Ti\u1EC7n \xEDch \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt. H\xE3y t\u1EA3i l\u1EA1i trang \u0111\u1EC3 ti\u1EBFp t\u1EE5c."
          }
        },
        zh: {
          bulk_delete: "\u6279\u91CF\u5220\u9664",
          bulk_delete_description: "\u9009\u62E9\u591A\u4E2A\u804A\u5929\u5E76\u6267\u884C\u6279\u91CF\u64CD\u4F5C",
          count_selected_chats: "\u5DF2\u9009\u62E9",
          button_select_all_chats: "\u5168\u9009",
          button_deselect_all_chats: "\u53D6\u6D88\u5168\u9009",
          button_select_chats: "\u9009\u62E9",
          button_done: "\u5B8C\u6210",
          button_bulk_archive: "\u5F52\u6863",
          button_bulk_archiving: "\u5F52\u6863\u4E2D",
          button_bulk_delete: "\u5220\u9664",
          button_bulk_deleting: "\u5220\u9664\u4E2D",
          window_confirmation_button_confirm: "\u786E\u8BA4",
          window_confirmation_button_cancel: "\u53D6\u6D88",
          window_confirmation_archive_question: "\u786E\u5B9A\u8981\u5F52\u6863\u8FD9\u4E9B\u804A\u5929\u5417\uFF1F",
          window_confirmation_delete_question: "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E9B\u804A\u5929\u5417\uFF1F",
          bulk: {
            progress: "\u5DF2\u5904\u7406 {done} / {total}",
            eta: "\u5269\u4F59\u7EA6 {minutes} \u5206\u949F",
            slow_reason: "ChatGPT \u9010\u4E2A\u5220\u9664\u804A\u5929\uFF0C\u6BCF\u4E2A\u7EA6 7 \u79D2",
            background_hint: "\u53EF\u4EE5\u7167\u5E38\u4F7F\u7528 ChatGPT\u3002\u5173\u95ED\u6807\u7B7E\u9875\u540E\uFF0C\u4E0B\u6B21\u6253\u5F00 ChatGPT \u65F6\u4F1A\u7EE7\u7EED\u3002",
            cooldown: "ChatGPT \u6B63\u5728\u9650\u5236\u8BF7\u6C42\u3002\u5C06\u5728 {seconds} \u79D2\u540E\u7EE7\u7EED",
            button_stop: "\u505C\u6B62",
            button_background: "\u540E\u53F0\u8FDB\u884C",
            resume_question: "\u672A\u5B8C\u6210\u7684\u64CD\u4F5C\uFF1A\u8FD8\u5269 {count} \u4E2A",
            button_resume: "\u7EE7\u7EED",
            button_discard: "\u653E\u5F03",
            delete_hint: "\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002",
            archive_hint: "\u53EF\u5728\u201C\u5DF2\u5F52\u6863\u7684\u804A\u5929\u201D\u4E2D\u627E\u5230\u5B83\u4EEC\u3002"
          },
          notification: {
            bulk_interrupted: "\u5DF2\u4E2D\u65AD\uFF1AChatGPT \u4F1A\u8BDD\u4E0D\u53EF\u7528\u3002\u8BF7\u5237\u65B0\u9875\u9762\u540E\u7EE7\u7EED\u3002\u5DF2\u5904\u7406 {done} / {total}\u3002",
            bulk_rate_limited: "ChatGPT \u9650\u5236\u4E86\u8BF7\u6C42\u9891\u7387\u3002\u6269\u5C55\u5DF2\u653E\u6162\u901F\u5EA6\uFF0C\u5C06\u81EA\u52A8\u7EE7\u7EED\u3002",
            bulk_stopped: "\u5DF2\u505C\u6B62\u3002\u5DF2\u5904\u7406 {done} / {total}",
            bulk_deleted: "\u5DF2\u5220\u9664\u804A\u5929\uFF1A{done} / {total}",
            bulk_archived: "\u5DF2\u5F52\u6863\u804A\u5929\uFF1A{done} / {total}",
            bulk_background_delete: "\u6B63\u5728\u540E\u53F0\u5220\u9664\uFF0C\u7EA6 {minutes} \u5206\u949F\u3002\u53EF\u4EE5\u7167\u5E38\u4F7F\u7528 ChatGPT\uFF0C\u5173\u95ED\u6807\u7B7E\u9875\u540E\uFF0C\u4E0B\u6B21\u6253\u5F00\u65F6\u4F1A\u7EE7\u7EED\u3002",
            bulk_background_archive: "\u6B63\u5728\u540E\u53F0\u5F52\u6863\uFF0C\u7EA6 {minutes} \u5206\u949F\u3002\u53EF\u4EE5\u7167\u5E38\u4F7F\u7528 ChatGPT\uFF0C\u5173\u95ED\u6807\u7B7E\u9875\u540E\uFF0C\u4E0B\u6B21\u6253\u5F00\u65F6\u4F1A\u7EE7\u7EED\u3002",
            error_generic: "\u51FA\u73B0\u95EE\u9898\uFF0C\u8BF7\u91CD\u8BD5\u3002",
            error_reload_page: "\u6269\u5C55\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u540E\u7EE7\u7EED\u3002"
          }
        }
      }
    }),
    isStorageAvailable = () => {
      try {
        return window.localStorage !== null;
      } catch {
        return !1;
      }
    };
  function start() {
    listenUncaughtErrors();
    const appDiv = document.createElement("div");
    appDiv.id = "dac-app", appDiv.style.position = "fixed", appDiv.style.top = "0", appDiv.style.left = "0", appDiv.style.width = "0", appDiv.style.height = "0", appDiv.style.zIndex = "49";
    const pinia = createPinia();
    pinia.use(src_default);
    const app = createApp(_sfc_main);
    app.config.errorHandler = reportVueError, app.use(pinia).use(i18n).mount(appDiv);
    const ensureAppInserted = () => {
      !document.body || document.body.contains(appDiv) || document.body.append(appDiv);
    };
    ensureAppInserted(), new MutationObserver(() => {
      ensureAppInserted();
    }).observe(document.documentElement, {
      childList: !0,
      subtree: !0
    });
  }
  return isStorageAvailable() && start(), exports.i18n = i18n, Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module"
  }), exports;
}({});
