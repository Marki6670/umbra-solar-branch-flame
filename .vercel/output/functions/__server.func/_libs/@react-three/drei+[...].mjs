import { i as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import { B as SRGBColorSpace, C as IcosahedronGeometry, E as LinearSRGBColorSpace, F as Plane, H as ShaderMaterial, I as RGBAFormat, J as Vector2, L as Raycaster, N as OrthographicCamera, O as Matrix4, P as PerspectiveCamera, R as RedFormat, S as HalfFloatType, T as LinearFilter, V as Scene, W as Uniform, X as Vector4, Y as Vector3, Z as WebGLRenderTarget, _ as DepthFormat, a as three_module_exports, c as BufferGeometry, d as Clock, f as Color, g as DataUtils, h as DataTextureLoader, i as WebGLRenderer, j as MeshStandardMaterial, k as Mesh, l as Camera, m as CubeTextureLoader, n as HDRJPGLoader, p as ColorManagement, q as UnsignedShortType, r as WebGLCubeRenderTarget, s as BufferAttribute, t as GainMapLoader, w as Layers, x as FloatType, y as DepthTexture } from "../monogrid__gainmap-js+three.mjs";
import { t as _extends } from "../babel__runtime.mjs";
import { createRequire } from "module";
//#region node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var assign = Object.assign;
	var emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result, thenable = ctor();
			thenable.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			});
			-1 === payload._status && (payload._status = 0, payload._result = thenable);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	function startTransition(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		currentTransition.types = null !== prevTransition ? prevTransition.types : null;
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	}
	function addTransitionType(type) {
		var transition = ReactSharedInternals.T;
		if (null !== transition) {
			var transitionTypes = transition.types;
			null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
		} else startTransition(addTransitionType.bind(null, type));
	}
	var Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.addTransitionType = addTransitionType;
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = startTransition;
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.3.0";
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
}));
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useState = React.useState;
	var useEffect = React.useEffect;
	var useLayoutEffect = React.useLayoutEffect;
	var useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
//#endregion
//#region node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production();
}));
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	var shim = require_shim();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useSyncExternalStore = shim.useSyncExternalStore;
	var useRef = React.useRef;
	var useEffect = React.useEffect;
	var useMemo = React.useMemo;
	var useDebugValue = React.useDebugValue;
	exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
		var instRef = useRef(null);
		if (null === instRef.current) {
			var inst = {
				hasValue: !1,
				value: null
			};
			instRef.current = inst;
		} else inst = instRef.current;
		instRef = useMemo(function() {
			function memoizedSelector(nextSnapshot) {
				if (!hasMemo) {
					hasMemo = !0;
					memoizedSnapshot = nextSnapshot;
					nextSnapshot = selector(nextSnapshot);
					if (void 0 !== isEqual && inst.hasValue) {
						var currentSelection = inst.value;
						if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
					}
					return memoizedSelection = nextSnapshot;
				}
				currentSelection = memoizedSelection;
				if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
				var nextSelection = selector(nextSnapshot);
				if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
				memoizedSnapshot = nextSnapshot;
				return memoizedSelection = nextSelection;
			}
			var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
			return [function() {
				return memoizedSelector(getSnapshot());
			}, null === maybeGetServerSnapshot ? void 0 : function() {
				return memoizedSelector(maybeGetServerSnapshot());
			}];
		}, [
			getSnapshot,
			getServerSnapshot,
			selector,
			isEqual
		]);
		var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
		useEffect(function() {
			inst.hasValue = !0;
			inst.value = value;
		}, [value]);
		useDebugValue(value);
		return value;
	};
}));
//#endregion
//#region node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_with_selector_production();
}));
//#endregion
//#region node_modules/zustand/esm/vanilla.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var import_with_selector = /* @__PURE__ */ __toESM(require_with_selector(), 1);
var createStoreImpl = (createState) => {
	let state;
	const listeners = /* @__PURE__ */ new Set();
	const setState = (partial, replace) => {
		const nextState = typeof partial === "function" ? partial(state) : partial;
		if (!Object.is(nextState, state)) {
			const previousState = state;
			state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
			listeners.forEach((listener) => listener(state, previousState));
		}
	};
	const getState = () => state;
	const getInitialState = () => initialState;
	const subscribe = (listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const api = {
		setState,
		getState,
		getInitialState,
		subscribe
	};
	const initialState = state = createState(setState, getState, api);
	return api;
};
var createStore$1 = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
//#endregion
//#region node_modules/zustand/esm/traditional.mjs
var { useSyncExternalStoreWithSelector } = import_with_selector.default;
var identity = (arg) => arg;
function useStoreWithEqualityFn(api, selector = identity, equalityFn) {
	const slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getInitialState, selector, equalityFn);
	import_react.useDebugValue(slice);
	return slice;
}
var createWithEqualityFnImpl = (createState, defaultEqualityFn) => {
	const api = createStore$1(createState);
	const useBoundStoreWithEqualityFn = (selector, equalityFn = defaultEqualityFn) => useStoreWithEqualityFn(api, selector, equalityFn);
	Object.assign(useBoundStoreWithEqualityFn, api);
	return useBoundStoreWithEqualityFn;
};
var createWithEqualityFn = ((createState, defaultEqualityFn) => createState ? createWithEqualityFnImpl(createState, defaultEqualityFn) : createWithEqualityFnImpl);
//#endregion
//#region node_modules/suspend-react/index.js
var isPromise = (promise) => typeof promise === "object" && typeof promise.then === "function";
var globalCache = [];
function shallowEqualArrays(arrA, arrB, equal = (a, b) => a === b) {
	if (arrA === arrB) return true;
	if (!arrA || !arrB) return false;
	const len = arrA.length;
	if (arrB.length !== len) return false;
	for (let i = 0; i < len; i++) if (!equal(arrA[i], arrB[i])) return false;
	return true;
}
function query(fn, keys = null, preload = false, config = {}) {
	if (keys === null) keys = [fn];
	for (const entry of globalCache) if (shallowEqualArrays(keys, entry.keys, entry.equal)) {
		if (preload) return void 0;
		if (Object.prototype.hasOwnProperty.call(entry, "error")) throw entry.error;
		if (Object.prototype.hasOwnProperty.call(entry, "response")) {
			if (config.lifespan && config.lifespan > 0) {
				if (entry.timeout) clearTimeout(entry.timeout);
				entry.timeout = setTimeout(entry.remove, config.lifespan);
			}
			return entry.response;
		}
		if (!preload) throw entry.promise;
	}
	const entry = {
		keys,
		equal: config.equal,
		remove: () => {
			const index = globalCache.indexOf(entry);
			if (index !== -1) globalCache.splice(index, 1);
		},
		promise: (isPromise(fn) ? fn : fn(...keys)).then((response) => {
			entry.response = response;
			if (config.lifespan && config.lifespan > 0) entry.timeout = setTimeout(entry.remove, config.lifespan);
		}).catch((error) => entry.error = error)
	};
	globalCache.push(entry);
	if (!preload) throw entry.promise;
}
var suspend = (fn, keys, config) => query(fn, keys, false, config);
var preload = (fn, keys, config) => void query(fn, keys, true, config);
var clear = (keys) => {
	if (keys === void 0 || keys.length === 0) globalCache.splice(0, globalCache.length);
	else {
		const entry = globalCache.find((entry) => shallowEqualArrays(keys, entry.keys, entry.equal));
		if (entry) entry.remove();
	}
};
/* @__PURE__ */ (() => {
	var e, t;
	return typeof window != "undefined" && (((e = window.document) == null ? void 0 : e.createElement) || ((t = window.navigator) == null ? void 0 : t.product) === "ReactNative");
})() ? import_react.useLayoutEffect : import_react.useEffect;
function l(e, t, i) {
	if (!e) return;
	if (i(e) === !0) return e;
	let n = t ? e.return : e.child;
	for (; n;) {
		const o = l(n, t, i);
		if (o) return o;
		n = t ? null : n.sibling;
	}
}
function b(e) {
	try {
		return Object.defineProperties(e, {
			_currentRenderer: {
				get() {
					return null;
				},
				set() {}
			},
			_currentRenderer2: {
				get() {
					return null;
				},
				set() {}
			}
		});
	} catch (t) {
		return e;
	}
}
var p$1 = /* @__PURE__ */ b(/* @__PURE__ */ import_react.createContext(null));
var h = class extends import_react.Component {
	render() {
		return /* @__PURE__ */ import_react.createElement(p$1.Provider, { value: this._reactInternals }, this.props.children);
	}
};
function m() {
	const e = import_react.useContext(p$1);
	if (e === null) throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
	const t = import_react.useId();
	return import_react.useMemo(() => {
		for (const n of [e, e == null ? void 0 : e.alternate]) {
			if (!n) continue;
			const o = l(n, !1, (d) => {
				let s = d.memoizedState;
				for (; s;) {
					if (s.memoizedState === t) return !0;
					s = s.next;
				}
			});
			if (o) return o;
		}
	}, [e, t]);
}
var w = Symbol.for("react.context");
var E$1 = (e) => e !== null && typeof e == "object" && "$$typeof" in e && e.$$typeof === w;
function g$1() {
	const e = m(), [t] = import_react.useState(() => /* @__PURE__ */ new Map());
	t.clear();
	let i = e;
	for (; i;) {
		const n = i.type;
		E$1(n) && n !== p$1 && !t.has(n) && t.set(n, import_react.use(b(n))), i = i.return;
	}
	return t;
}
function M$1() {
	const e = g$1();
	return import_react.useMemo(() => Array.from(e.keys()).reduce((t, i) => (n) => /* @__PURE__ */ import_react.createElement(t, null, /* @__PURE__ */ import_react.createElement(i.Provider, {
		...n,
		value: e.get(i)
	})), (t) => /* @__PURE__ */ import_react.createElement(h, { ...t })), [e]);
}
function x$1(e) {
	if (typeof requestAnimationFrame == "function") {
		const i = requestAnimationFrame(e);
		return () => cancelAnimationFrame(i);
	}
	const t = setTimeout(e, 16);
	return () => clearTimeout(t);
}
function N() {
	if (!import_react.Activity) throw new Error("its-fine: useActivityBridge requires React 19.2 or later!");
	const e = m(), [t] = import_react.useState(() => {
		const i = [];
		let n = !1;
		l(e, !0, (u) => {
			var c, a;
			if (u.elementType === import_react.Activity) {
				const y = ((c = u.child) == null ? void 0 : c.tag) === 22 ? u.child.stateNode : null;
				if (typeof (y == null ? void 0 : y._visibility) != "number") throw new Error("its-fine: unsupported React Activity internals!");
				i.push(y);
			} else u.tag === 22 && ((a = u.return) == null ? void 0 : a.elementType) !== import_react.Activity && (n = !0);
		});
		let o = "hidden";
		const d = /* @__PURE__ */ new Set();
		let s;
		const f = {
			mounted: !1,
			connected: !1,
			subscribe(u) {
				return d.add(u), () => {
					d.delete(u);
				};
			},
			sync(u) {
				f.mounted && !f.connected && n && i.length > 0 ? s || (s = x$1(() => {
					s = void 0, f.sync(!0);
				})) : (s?.(), s = void 0);
				let c = o;
				if (f.mounted ? f.connected ? c = "visible" : u && (c = i.every((a) => (a._visibility & 1) !== 0) ? "visible" : "hidden") : c = "hidden", o !== c) {
					o = c;
					for (const a of d) a();
				}
			},
			Bridge({ children: u }) {
				return /* @__PURE__ */ import_react.createElement(import_react.Activity, { mode: import_react.useSyncExternalStore(f.subscribe, () => o, () => "hidden") }, u);
			}
		};
		return f;
	});
	return import_react.useInsertionEffect(() => (t.mounted = !0, queueMicrotask(() => t.sync(!1)), () => {
		t.mounted = !1, queueMicrotask(() => t.sync(!1));
	}), [t]), import_react.useLayoutEffect(() => (t.connected = !0, t.sync(!1), () => {
		t.connected = !1, t.sync(!0);
	}), [t]), t.Bridge;
}
//#endregion
//#region node_modules/scheduler/cjs/scheduler.production.js
/**
* @license React
* scheduler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_scheduler_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	function push(heap, node) {
		var index = heap.length;
		heap.push(node);
		a: for (; 0 < index;) {
			var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
			if (0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
			else break a;
		}
	}
	function peek(heap) {
		return 0 === heap.length ? null : heap[0];
	}
	function pop(heap) {
		if (0 === heap.length) return null;
		var first = heap[0], last = heap.pop();
		if (last !== first) {
			heap[0] = last;
			a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength;) {
				var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
				if (0 > compare(left, last)) rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
				else if (rightIndex < length && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;
				else break a;
			}
		}
		return first;
	}
	function compare(a, b) {
		var diff = a.sortIndex - b.sortIndex;
		return 0 !== diff ? diff : a.id - b.id;
	}
	exports.unstable_now = void 0;
	if ("object" === typeof performance && "function" === typeof performance.now) {
		var localPerformance = performance;
		exports.unstable_now = function() {
			return localPerformance.now();
		};
	} else {
		var localDate = Date, initialTime = localDate.now();
		exports.unstable_now = function() {
			return localDate.now() - initialTime;
		};
	}
	var taskQueue = [];
	var timerQueue = [];
	var taskIdCounter = 1;
	var currentTask = null;
	var currentPriorityLevel = 3;
	var isPerformingWork = !1;
	var isHostCallbackScheduled = !1;
	var isHostTimeoutScheduled = !1;
	var needsPaint = !1;
	var localSetTimeout = "function" === typeof setTimeout ? setTimeout : null;
	var localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null;
	var localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
	function advanceTimers(currentTime) {
		for (var timer = peek(timerQueue); null !== timer;) {
			if (null === timer.callback) pop(timerQueue);
			else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
			else break;
			timer = peek(timerQueue);
		}
	}
	function handleTimeout(currentTime) {
		isHostTimeoutScheduled = !1;
		advanceTimers(currentTime);
		if (!isHostCallbackScheduled) if (null !== peek(taskQueue)) isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline());
		else {
			var firstTimer = peek(timerQueue);
			null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
		}
	}
	var isMessageLoopRunning = !1;
	var taskTimeoutID = -1;
	var frameInterval = 5;
	var startTime = -1;
	function shouldYieldToHost() {
		return needsPaint ? !0 : exports.unstable_now() - startTime < frameInterval ? !1 : !0;
	}
	function performWorkUntilDeadline() {
		needsPaint = !1;
		if (isMessageLoopRunning) {
			var currentTime = exports.unstable_now();
			startTime = currentTime;
			var hasMoreWork = !0;
			try {
				a: {
					isHostCallbackScheduled = !1;
					isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
					isPerformingWork = !0;
					var previousPriorityLevel = currentPriorityLevel;
					try {
						b: {
							advanceTimers(currentTime);
							for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost());) {
								var callback = currentTask.callback;
								if ("function" === typeof callback) {
									currentTask.callback = null;
									currentPriorityLevel = currentTask.priorityLevel;
									var continuationCallback = callback(currentTask.expirationTime <= currentTime);
									currentTime = exports.unstable_now();
									if ("function" === typeof continuationCallback) {
										currentTask.callback = continuationCallback;
										advanceTimers(currentTime);
										hasMoreWork = !0;
										break b;
									}
									currentTask === peek(taskQueue) && pop(taskQueue);
									advanceTimers(currentTime);
								} else pop(taskQueue);
								currentTask = peek(taskQueue);
							}
							if (null !== currentTask) hasMoreWork = !0;
							else {
								var firstTimer = peek(timerQueue);
								null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
								hasMoreWork = !1;
							}
						}
						break a;
					} finally {
						currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
					}
					hasMoreWork = void 0;
				}
			} finally {
				hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = !1;
			}
		}
	}
	var schedulePerformWorkUntilDeadline;
	if ("function" === typeof localSetImmediate) schedulePerformWorkUntilDeadline = function() {
		localSetImmediate(performWorkUntilDeadline);
	};
	else if ("undefined" !== typeof MessageChannel) {
		var channel = new MessageChannel(), port = channel.port2;
		channel.port1.onmessage = performWorkUntilDeadline;
		schedulePerformWorkUntilDeadline = function() {
			port.postMessage(null);
		};
	} else schedulePerformWorkUntilDeadline = function() {
		localSetTimeout(performWorkUntilDeadline, 0);
	};
	function requestHostTimeout(callback, ms) {
		taskTimeoutID = localSetTimeout(function() {
			callback(exports.unstable_now());
		}, ms);
	}
	exports.unstable_IdlePriority = 5;
	exports.unstable_ImmediatePriority = 1;
	exports.unstable_LowPriority = 4;
	exports.unstable_NormalPriority = 3;
	exports.unstable_Profiling = null;
	exports.unstable_UserBlockingPriority = 2;
	exports.unstable_cancelCallback = function(task) {
		task.callback = null;
	};
	exports.unstable_forceFrameRate = function(fps) {
		0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
	};
	exports.unstable_getCurrentPriorityLevel = function() {
		return currentPriorityLevel;
	};
	exports.unstable_next = function(eventHandler) {
		switch (currentPriorityLevel) {
			case 1:
			case 2:
			case 3:
				var priorityLevel = 3;
				break;
			default: priorityLevel = currentPriorityLevel;
		}
		var previousPriorityLevel = currentPriorityLevel;
		currentPriorityLevel = priorityLevel;
		try {
			return eventHandler();
		} finally {
			currentPriorityLevel = previousPriorityLevel;
		}
	};
	exports.unstable_requestPaint = function() {
		needsPaint = !0;
	};
	exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
		switch (priorityLevel) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: priorityLevel = 3;
		}
		var previousPriorityLevel = currentPriorityLevel;
		currentPriorityLevel = priorityLevel;
		try {
			return eventHandler();
		} finally {
			currentPriorityLevel = previousPriorityLevel;
		}
	};
	exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
		var currentTime = exports.unstable_now();
		"object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
		switch (priorityLevel) {
			case 1:
				var timeout = -1;
				break;
			case 2:
				timeout = 250;
				break;
			case 5:
				timeout = 1073741823;
				break;
			case 4:
				timeout = 1e4;
				break;
			default: timeout = 5e3;
		}
		timeout = options + timeout;
		priorityLevel = {
			id: taskIdCounter++,
			callback,
			priorityLevel,
			startTime: options,
			expirationTime: timeout,
			sortIndex: -1
		};
		options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline())));
		return priorityLevel;
	};
	exports.unstable_shouldYield = shouldYieldToHost;
	exports.unstable_wrapCallback = function(callback) {
		var parentPriorityLevel = currentPriorityLevel;
		return function() {
			var previousPriorityLevel = currentPriorityLevel;
			currentPriorityLevel = parentPriorityLevel;
			try {
				return callback.apply(this, arguments);
			} finally {
				currentPriorityLevel = previousPriorityLevel;
			}
		};
	};
}));
//#endregion
//#region node_modules/@react-three/fiber/dist/events-e51d7528.esm.js
var import_scheduler = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_scheduler_production();
})))());
/**
* An SSR-friendly useLayoutEffect.
*
* React currently throws a warning when using useLayoutEffect on the server.
* To get around it, we can conditionally useEffect on the server (no-op) and
* useLayoutEffect elsewhere.
*
* @see https://github.com/facebook/react/issues/14927
*/
var useIsomorphicLayoutEffect = /* @__PURE__ */ ((_window$document, _window$navigator) => typeof window !== "undefined" && (((_window$document = window.document) == null ? void 0 : _window$document.createElement) || ((_window$navigator = window.navigator) == null ? void 0 : _window$navigator.product) === "ReactNative"))() ? import_react.useLayoutEffect : import_react.useEffect;
function useMutableCallback(fn) {
	const ref = import_react.useRef(fn);
	useIsomorphicLayoutEffect(() => void (ref.current = fn), [fn]);
	return ref;
}
function Gate({ promise, onSettled }) {
	import_react.use(promise);
	useIsomorphicLayoutEffect(onSettled, [onSettled]);
	return null;
}
/** Waits for a promise in a null subtree, re-rendering the caller once it settles either way. */
function useGate() {
	const [promise, setPromise] = import_react.useState(null);
	const onSettled = import_react.useCallback(() => setPromise(null), []);
	const waitFor = import_react.useCallback((next) => setPromise((current) => current != null ? current : Promise.resolve(next).then(() => {}, () => {})), []);
	return [promise ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Gate, {
			promise,
			onSettled
		})
	}) : null, waitFor];
}
var useActivityBridge = import_react.Activity ? N : () => import_react.Fragment;
/**
* Bridges Context, StrictMode, and Activity visibility from a primary renderer.
*/
function useBridge() {
	const fiber = m();
	const ContextBridge = M$1();
	const ActivityBridge = useActivityBridge();
	return import_react.useMemo(() => ({ children }) => {
		const Root = !!l(fiber, true, (node) => node.type === import_react.StrictMode) ? import_react.StrictMode : import_react.Fragment;
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Root, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ActivityBridge, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ContextBridge, { children }) }) });
	}, [
		fiber,
		ContextBridge,
		ActivityBridge
	]);
}
function Block({ set }) {
	useIsomorphicLayoutEffect(() => {
		set(new Promise(() => null));
		return () => set(false);
	}, [set]);
	return null;
}
var ErrorBoundary = /* @__PURE__ */ ((_ErrorBoundary) => (_ErrorBoundary = class ErrorBoundary extends import_react.Component {
	constructor(...args) {
		super(...args);
		this.state = { error: false };
	}
	componentDidCatch(err) {
		this.props.set(err);
	}
	render() {
		return this.state.error ? null : this.props.children;
	}
}, _ErrorBoundary.getDerivedStateFromError = () => ({ error: true }), _ErrorBoundary))();
/**
* Returns the instance's initial (outmost) root.
*/
function findInitialRoot(instance) {
	let root = instance.root;
	while (root.getState().previousRoot) root = root.getState().previousRoot;
	return root;
}
var isOrthographicCamera = (def) => def && def.isOrthographicCamera;
var isRef$1 = (obj) => obj && obj.hasOwnProperty("current");
var isColorRepresentation = (value) => value != null && (typeof value === "string" || typeof value === "number" || value.isColor);
var noop = () => {};
function calculateDpr(dpr) {
	var _window$devicePixelRa;
	const target = typeof window !== "undefined" ? (_window$devicePixelRa = window.devicePixelRatio) != null ? _window$devicePixelRa : 2 : 1;
	return Array.isArray(dpr) ? Math.min(Math.max(dpr[0], target), dpr[1]) : dpr;
}
/**
* Calls `onChange` whenever window.devicePixelRatio changes: moving to another display or zooming.
* Neither resizes the canvas, so resize observers won't see it. A resolution query only matches the
* current ratio, so it is re-created after every change. Returns the unsubscribe function.
*/
function watchDpr(onChange) {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function" || !window.devicePixelRatio) return () => {};
	let query;
	const listen = () => {
		try {
			var _query, _query2;
			query = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
			if (typeof ((_query = query) == null ? void 0 : _query.addEventListener) === "function") query.addEventListener("change", handleChange);
			else (_query2 = query) == null || _query2.addListener == null || _query2.addListener(handleChange);
		} catch {
			query = void 0;
		}
	};
	const unlisten = () => {
		var _query3, _query4;
		if (typeof ((_query3 = query) == null ? void 0 : _query3.removeEventListener) === "function") query.removeEventListener("change", handleChange);
		else (_query4 = query) == null || _query4.removeListener == null || _query4.removeListener(handleChange);
		query = void 0;
	};
	const handleChange = () => {
		unlisten();
		listen();
		onChange();
	};
	listen();
	return unlisten;
}
/**
* Returns instance root state
*/
function getRootState(obj) {
	var _r3f;
	return (_r3f = obj.__r3f) == null ? void 0 : _r3f.root.getState();
}
var is = {
	obj: (a) => a === Object(a) && !is.arr(a) && typeof a !== "function",
	fun: (a) => typeof a === "function",
	str: (a) => typeof a === "string",
	num: (a) => typeof a === "number",
	boo: (a) => typeof a === "boolean",
	und: (a) => a === void 0,
	nul: (a) => a === null,
	arr: (a) => Array.isArray(a),
	equ(a, b, { arrays = "shallow", objects = "reference", strict = true } = {}) {
		if (typeof a !== typeof b || !!a !== !!b) return false;
		if (is.str(a) || is.num(a) || is.boo(a)) return a === b;
		const isObj = is.obj(a);
		if (isObj && objects === "reference") return a === b;
		const isArr = is.arr(a);
		if (isArr && arrays === "reference") return a === b;
		if ((isArr || isObj) && a === b) return true;
		let i;
		for (i in a) if (!(i in b)) return false;
		if (isObj && arrays === "shallow" && objects === "shallow") {
			for (i in strict ? b : a) if (!is.equ(a[i], b[i], {
				strict,
				objects: "reference"
			})) return false;
		} else for (i in strict ? b : a) if (a[i] !== b[i]) return false;
		if (is.und(i)) {
			if (isArr && a.length === 0 && b.length === 0) return true;
			if (isObj && Object.keys(a).length === 0 && Object.keys(b).length === 0) return true;
			if (a !== b) return false;
		}
		return true;
	}
};
function buildGraph(object) {
	const data = {
		nodes: {},
		materials: {},
		meshes: {}
	};
	if (object) object.traverse((obj) => {
		if (obj.name) data.nodes[obj.name] = obj;
		if (obj.material && !data.materials[obj.material.name]) data.materials[obj.material.name] = obj.material;
		if (obj.isMesh && !data.meshes[obj.name]) data.meshes[obj.name] = obj;
	});
	return data;
}
function dispose(obj) {
	if (obj.type !== "Scene") obj.dispose == null || obj.dispose();
	for (const p in obj) {
		const prop = obj[p];
		if ((prop == null ? void 0 : prop.type) !== "Scene") prop == null || prop.dispose == null || prop.dispose();
	}
}
var REACT_INTERNAL_PROPS = [
	"children",
	"key",
	"ref"
];
function getInstanceProps(pendingProps) {
	const props = {};
	for (const key in pendingProps) if (!REACT_INTERNAL_PROPS.includes(key)) props[key] = pendingProps[key];
	return props;
}
function prepare(target, root, type, props) {
	const object = target;
	let instance = object == null ? void 0 : object.__r3f;
	if (!instance) {
		instance = {
			root,
			type,
			parent: null,
			children: [],
			props: getInstanceProps(props),
			object,
			eventCount: 0,
			handlers: {},
			previousVisible: void 0,
			isHidden: false
		};
		if (object) object.__r3f = instance;
	}
	return instance;
}
function resolve(root, key) {
	if (!key.includes("-")) return {
		root,
		key,
		target: root[key]
	};
	if (key in root) return {
		root,
		key,
		target: root[key]
	};
	let target = root;
	const parts = key.split("-");
	for (const part of parts) {
		if (typeof target !== "object" || target === null) {
			if (target !== void 0) {
				const remaining = parts.slice(parts.indexOf(part)).join("-");
				return {
					root: target,
					key: remaining,
					target: void 0
				};
			}
			return {
				root,
				key,
				target: void 0
			};
		}
		key = part;
		root = target;
		target = target[key];
	}
	return {
		root,
		key,
		target
	};
}
var INDEX_REGEX = /-\d+$/;
function attach(parent, child) {
	if (is.str(child.props.attach)) {
		if (INDEX_REGEX.test(child.props.attach)) {
			const index = child.props.attach.replace(INDEX_REGEX, "");
			const { root, key } = resolve(parent.object, index);
			if (!Array.isArray(root[key])) root[key] = [];
		}
		const { root, key } = resolve(parent.object, child.props.attach);
		child.previousAttach = root[key];
		root[key] = child.object;
	} else if (is.fun(child.props.attach)) child.previousAttach = child.props.attach(parent.object, child.object);
}
function detach(parent, child) {
	if (is.str(child.props.attach)) {
		const { root, key } = resolve(parent.object, child.props.attach);
		const previous = child.previousAttach;
		if (previous === void 0) delete root[key];
		else root[key] = previous;
	} else child.previousAttach == null || child.previousAttach(parent.object, child.object);
	delete child.previousAttach;
}
var RESERVED_PROPS = [
	...REACT_INTERNAL_PROPS,
	"args",
	"dispose",
	"attach",
	"object",
	"onUpdate",
	"dispose"
];
var MEMOIZED_PROTOTYPES = /* @__PURE__ */ new Map();
function getMemoizedPrototype(root) {
	let ctor = MEMOIZED_PROTOTYPES.get(root.constructor);
	try {
		if (!ctor) {
			ctor = new root.constructor();
			MEMOIZED_PROTOTYPES.set(root.constructor, ctor);
		}
	} catch (e) {}
	return ctor;
}
function diffProps(instance, newProps) {
	const changedProps = {};
	for (const prop in newProps) {
		if (RESERVED_PROPS.includes(prop)) continue;
		if (is.equ(newProps[prop], instance.props[prop])) continue;
		changedProps[prop] = newProps[prop];
		for (const other in newProps) if (other.startsWith(`${prop}-`)) changedProps[other] = newProps[other];
	}
	for (const prop in instance.props) {
		if (RESERVED_PROPS.includes(prop) || newProps.hasOwnProperty(prop)) continue;
		const { root, key } = resolve(instance.object, prop);
		if (root.constructor && root.constructor.length === 0) {
			const ctor = getMemoizedPrototype(root);
			if (!is.und(ctor)) changedProps[prop] = ctor[key];
		} else changedProps[prop] = 0;
	}
	return changedProps;
}
var colorMaps = [
	"map",
	"emissiveMap",
	"sheenColorMap",
	"specularColorMap",
	"envMap"
];
var EVENT_REGEX = /^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/;
function applyProps(object, props) {
	var _instance$object;
	const instance = object.__r3f;
	const rootState = instance && findInitialRoot(instance).getState();
	const prevHandlers = instance == null ? void 0 : instance.eventCount;
	for (const prop in props) {
		let value = props[prop];
		if (RESERVED_PROPS.includes(prop)) continue;
		if (instance && EVENT_REGEX.test(prop)) {
			if (typeof value === "function") instance.handlers[prop] = value;
			else delete instance.handlers[prop];
			instance.eventCount = Object.keys(instance.handlers).length;
			continue;
		}
		if (value === void 0) continue;
		if (prop === "visible" && instance != null && instance.isHidden && instance.previousVisible !== void 0) {
			instance.previousVisible = value;
			continue;
		}
		let { root, key, target } = resolve(object, prop);
		if (target === void 0 && (typeof root !== "object" || root === null)) throw Error(`R3F: Cannot set "${prop}". Ensure it is an object before setting "${key}".`);
		if (target instanceof Layers && value instanceof Layers) target.mask = value.mask;
		else if (target instanceof Color && isColorRepresentation(value)) target.set(value);
		else if (target !== null && typeof target === "object" && typeof target.set === "function" && typeof target.copy === "function" && value != null && value.constructor && target.constructor === value.constructor) target.copy(value);
		else if (target !== null && typeof target === "object" && typeof target.set === "function" && Array.isArray(value)) {
			if (typeof target.fromArray === "function") target.fromArray(value);
			else target.set(...value);
		} else if (target !== null && typeof target === "object" && typeof target.set === "function" && typeof value === "number") {
			if (typeof target.setScalar === "function") target.setScalar(value);
			else target.set(value);
		} else if (root instanceof ShaderMaterial && key === "uniforms" && is.obj(value)) {
			if (!is.obj(root.uniforms)) root.uniforms = {};
			const uniforms = root.uniforms;
			const nextUniforms = value;
			for (const name in nextUniforms) {
				const uniform = nextUniforms[name];
				const targetUniform = uniforms[name];
				if (targetUniform) Object.assign(targetUniform, uniform);
				else uniforms[name] = { ...uniform };
			}
		} else {
			var _root$key;
			root[key] = value;
			if (rootState && !rootState.linear && colorMaps.includes(key) && (_root$key = root[key]) != null && _root$key.isTexture && root[key].format === 1023 && root[key].type === 1009) root[key].colorSpace = SRGBColorSpace;
		}
	}
	if (instance != null && instance.parent && rootState != null && rootState.internal && (_instance$object = instance.object) != null && _instance$object.isObject3D && prevHandlers !== instance.eventCount) {
		const object = instance.object;
		const index = rootState.internal.interaction.indexOf(object);
		if (index > -1) rootState.internal.interaction.splice(index, 1);
		if (instance.eventCount && object.raycast !== null) rootState.internal.interaction.push(object);
	}
	if (instance && instance.props.attach === void 0) {
		if (instance.object.isBufferGeometry) instance.props.attach = "geometry";
		else if (instance.object.isMaterial) instance.props.attach = "material";
	}
	if (instance) invalidateInstance(instance);
	return object;
}
function invalidateInstance(instance) {
	var _instance$root;
	if (!instance.parent) return;
	instance.props.onUpdate == null || instance.props.onUpdate(instance.object);
	const state = (_instance$root = instance.root) == null ? void 0 : _instance$root.getState == null ? void 0 : _instance$root.getState();
	if (state && state.internal.frames === 0) state.invalidate();
}
function updateCamera(camera, size) {
	if (camera.manual) return;
	if (isOrthographicCamera(camera)) {
		camera.left = size.width / -2;
		camera.right = size.width / 2;
		camera.top = size.height / 2;
		camera.bottom = size.height / -2;
	} else camera.aspect = size.width / size.height;
	camera.updateProjectionMatrix();
}
var isObject3D = (object) => object == null ? void 0 : object.isObject3D;
function makeId(event) {
	return (event.eventObject || event.object).uuid + "/" + event.index + event.instanceId;
}
/**
* Release pointer captures.
* This is called by releasePointerCapture in the API, and when an object is removed.
*/
function releaseInternalPointerCapture(capturedMap, obj, captures, pointerId) {
	const captureData = captures.get(obj);
	if (captureData) {
		captures.delete(obj);
		if (captures.size === 0) {
			capturedMap.delete(pointerId);
			captureData.target.releasePointerCapture(pointerId);
		}
	}
}
/** This function transfers all interactivity state from one object instance to another. Used when swapping instances due to reconstruction. */
function swapInteractivity(store, object, newObject) {
	const { internal } = store.getState();
	for (let i = 0; i < internal.interaction.length; i++) if (internal.interaction[i] === object) internal.interaction[i] = newObject;
	for (let i = 0; i < internal.initialHits.length; i++) if (internal.initialHits[i] === object) internal.initialHits[i] = newObject;
	internal.hovered.forEach((value, key) => {
		if (value.eventObject === object || value.object === object) {
			internal.hovered.delete(key);
			const next = {
				...value,
				eventObject: value.eventObject === object ? newObject : value.eventObject,
				object: value.object === object ? newObject : value.object
			};
			internal.hovered.set(makeId(next), next);
		}
	});
	internal.capturedMap.forEach((captures) => {
		for (const [key, captureData] of Array.from(captures)) {
			const { intersection } = captureData;
			if (key !== object && intersection.object !== object && intersection.eventObject !== object) continue;
			if (key === object) captures.delete(key);
			captures.set(key === object ? newObject : key, {
				...captureData,
				intersection: {
					...intersection,
					object: intersection.object === object ? newObject : intersection.object,
					eventObject: intersection.eventObject === object ? newObject : intersection.eventObject
				}
			});
		}
	});
}
function removeInteractivity(store, object) {
	const { internal } = store.getState();
	internal.interaction = internal.interaction.filter((o) => o !== object);
	internal.initialHits = internal.initialHits.filter((o) => o !== object);
	internal.hovered.forEach((value, key) => {
		if (value.eventObject === object || value.object === object) internal.hovered.delete(key);
	});
	internal.capturedMap.forEach((captures, pointerId) => {
		releaseInternalPointerCapture(internal.capturedMap, object, captures, pointerId);
	});
}
function createEvents(store) {
	/** Calculates delta */
	function calculateDistance(event) {
		const { internal } = store.getState();
		const dx = event.offsetX - internal.initialClick[0];
		const dy = event.offsetY - internal.initialClick[1];
		return Math.round(Math.sqrt(dx * dx + dy * dy));
	}
	/** Returns true if an instance has a valid pointer-event registered, this excludes scroll, clicks etc */
	function filterPointerEvents(objects) {
		return objects.filter((obj) => [
			"Move",
			"Over",
			"Enter",
			"Out",
			"Leave"
		].some((name) => {
			var _r3f;
			return (_r3f = obj.__r3f) == null ? void 0 : _r3f.handlers["onPointer" + name];
		}));
	}
	function intersect(event, filter) {
		const state = store.getState();
		const duplicates = /* @__PURE__ */ new Set();
		const intersections = [];
		const eventsObjects = filter ? filter(state.internal.interaction) : state.internal.interaction;
		for (let i = 0; i < eventsObjects.length; i++) {
			const state = getRootState(eventsObjects[i]);
			if (state) state.raycaster.camera = void 0;
		}
		if (!state.previousRoot) state.events.compute == null || state.events.compute(event, state);
		function handleRaycast(obj) {
			const state = getRootState(obj);
			if (!state || !state.events.enabled || state.raycaster.camera === null) return [];
			if (state.raycaster.camera === void 0) {
				var _state$previousRoot;
				state.events.compute == null || state.events.compute(event, state, (_state$previousRoot = state.previousRoot) == null ? void 0 : _state$previousRoot.getState());
				if (state.raycaster.camera === void 0) state.raycaster.camera = null;
			}
			return state.raycaster.camera ? state.raycaster.intersectObject(obj, true) : [];
		}
		let hits = eventsObjects.flatMap(handleRaycast).sort((a, b) => {
			const aState = getRootState(a.object);
			const bState = getRootState(b.object);
			if (!aState || !bState) return a.distance - b.distance;
			return bState.events.priority - aState.events.priority || a.distance - b.distance;
		}).filter((item) => {
			const id = makeId(item);
			if (duplicates.has(id)) return false;
			duplicates.add(id);
			return true;
		});
		if (state.events.filter) hits = state.events.filter(hits, state);
		for (const hit of hits) {
			let eventObject = hit.object;
			while (eventObject) {
				var _r3f2;
				if ((_r3f2 = eventObject.__r3f) != null && _r3f2.eventCount) intersections.push({
					...hit,
					eventObject
				});
				eventObject = eventObject.parent;
			}
		}
		if ("pointerId" in event && state.internal.capturedMap.has(event.pointerId)) {
			for (let captureData of state.internal.capturedMap.get(event.pointerId).values()) if (!duplicates.has(makeId(captureData.intersection))) intersections.push(captureData.intersection);
		}
		return intersections;
	}
	/**  Handles intersections by forwarding them to handlers */
	function handleIntersects(intersections, event, delta, callback) {
		if (intersections.length) {
			const localState = { stopped: false };
			for (const hit of intersections) {
				let state = getRootState(hit.object);
				if (!state) hit.object.traverseAncestors((obj) => {
					const parentState = getRootState(obj);
					if (parentState) {
						state = parentState;
						return false;
					}
				});
				if (state) {
					const { raycaster, pointer, camera, internal } = state;
					const unprojectedPoint = new Vector3(pointer.x, pointer.y, 0).unproject(camera);
					const hasPointerCapture = (id) => {
						var _internal$capturedMap, _internal$capturedMap2;
						return (_internal$capturedMap = (_internal$capturedMap2 = internal.capturedMap.get(id)) == null ? void 0 : _internal$capturedMap2.has(hit.eventObject)) != null ? _internal$capturedMap : false;
					};
					const setPointerCapture = (id) => {
						const captureData = {
							intersection: hit,
							target: event.target
						};
						if (internal.capturedMap.has(id)) internal.capturedMap.get(id).set(hit.eventObject, captureData);
						else internal.capturedMap.set(id, /* @__PURE__ */ new Map([[hit.eventObject, captureData]]));
						event.target.setPointerCapture(id);
					};
					const releasePointerCapture = (id) => {
						const captures = internal.capturedMap.get(id);
						if (captures) releaseInternalPointerCapture(internal.capturedMap, hit.eventObject, captures, id);
					};
					let extractEventProps = {};
					for (let prop in event) {
						let property = event[prop];
						if (typeof property !== "function") extractEventProps[prop] = property;
					}
					let raycastEvent = {
						...hit,
						...extractEventProps,
						pointer,
						intersections,
						stopped: localState.stopped,
						delta,
						unprojectedPoint,
						ray: raycaster.ray,
						camera,
						stopPropagation() {
							const capturesForPointer = "pointerId" in event && internal.capturedMap.get(event.pointerId);
							if (!capturesForPointer || capturesForPointer.has(hit.eventObject)) {
								raycastEvent.stopped = localState.stopped = true;
								if (internal.hovered.size && Array.from(internal.hovered.values()).find((i) => i.eventObject === hit.eventObject)) cancelPointer([...intersections.slice(0, intersections.indexOf(hit)), hit]);
							}
						},
						target: {
							hasPointerCapture,
							setPointerCapture,
							releasePointerCapture
						},
						currentTarget: {
							hasPointerCapture,
							setPointerCapture,
							releasePointerCapture
						},
						nativeEvent: event
					};
					callback(raycastEvent);
					if (localState.stopped === true) break;
				}
			}
		}
		return intersections;
	}
	function cancelPointer(intersections) {
		const { internal } = store.getState();
		for (const hoveredObj of internal.hovered.values()) if (!intersections.length || !intersections.find((hit) => hit.object === hoveredObj.object && hit.index === hoveredObj.index && hit.instanceId === hoveredObj.instanceId)) {
			const instance = hoveredObj.eventObject.__r3f;
			internal.hovered.delete(makeId(hoveredObj));
			if (instance != null && instance.eventCount) {
				const handlers = instance.handlers;
				const data = {
					...hoveredObj,
					intersections
				};
				handlers.onPointerOut == null || handlers.onPointerOut(data);
				handlers.onPointerLeave == null || handlers.onPointerLeave(data);
			}
		}
	}
	function pointerMissed(event, objects) {
		for (let i = 0; i < objects.length; i++) {
			const instance = objects[i].__r3f;
			instance == null || instance.handlers.onPointerMissed == null || instance.handlers.onPointerMissed(event);
		}
	}
	function handlePointer(name) {
		switch (name) {
			case "onPointerLeave":
			case "onPointerCancel": return () => cancelPointer([]);
			case "onLostPointerCapture": return (event) => {
				const { internal } = store.getState();
				if ("pointerId" in event && internal.capturedMap.has(event.pointerId)) requestAnimationFrame(() => {
					if (internal.capturedMap.has(event.pointerId)) {
						internal.capturedMap.delete(event.pointerId);
						cancelPointer([]);
					}
				});
			};
		}
		return function handleEvent(event) {
			const { onPointerMissed, internal } = store.getState();
			internal.lastEvent.current = event;
			const isPointerMove = name === "onPointerMove";
			const isClickEvent = name === "onClick" || name === "onContextMenu" || name === "onDoubleClick";
			const hits = intersect(event, isPointerMove ? filterPointerEvents : void 0);
			const delta = isClickEvent ? calculateDistance(event) : 0;
			if (name === "onPointerDown") {
				internal.initialClick = [event.offsetX, event.offsetY];
				internal.initialHits = hits.map((hit) => hit.eventObject);
			}
			if (isClickEvent && !hits.length) {
				if (delta <= 2) {
					pointerMissed(event, internal.interaction);
					if (onPointerMissed) onPointerMissed(event);
				}
			}
			if (isPointerMove) cancelPointer(hits);
			function onIntersect(data) {
				const eventObject = data.eventObject;
				const instance = eventObject.__r3f;
				if (!(instance != null && instance.eventCount)) return;
				const handlers = instance.handlers;
				if (isPointerMove) {
					if (handlers.onPointerOver || handlers.onPointerEnter || handlers.onPointerOut || handlers.onPointerLeave) {
						const id = makeId(data);
						const hoveredItem = internal.hovered.get(id);
						if (!hoveredItem) {
							internal.hovered.set(id, data);
							handlers.onPointerOver == null || handlers.onPointerOver(data);
							handlers.onPointerEnter == null || handlers.onPointerEnter(data);
						} else if (hoveredItem.stopped) data.stopPropagation();
					}
					handlers.onPointerMove == null || handlers.onPointerMove(data);
				} else {
					const handler = handlers[name];
					if (handler) {
						if (!isClickEvent || internal.initialHits.includes(eventObject)) {
							pointerMissed(event, internal.interaction.filter((object) => !internal.initialHits.includes(object)));
							handler(data);
						}
					} else if (isClickEvent && internal.initialHits.includes(eventObject)) pointerMissed(event, internal.interaction.filter((object) => !internal.initialHits.includes(object)));
				}
			}
			handleIntersects(hits, event, delta, onIntersect);
		};
	}
	return { handlePointer };
}
var isPromiseLike = (value) => typeof (value == null ? void 0 : value.then) === "function";
/** A promise tagged with its state, the protocol React's `use` reads */
var fulfilled = (value) => Object.assign(Promise.resolve(value), {
	status: "fulfilled",
	value
});
var rejected = (reason) => {
	const promise = Promise.reject(reason);
	promise.catch(() => {});
	return Object.assign(promise, {
		status: "rejected",
		reason
	});
};
/** A pending promise, settled once from outside. Its `status` updates the moment it settles */
var deferred = () => {
	let resolve;
	let reject;
	const promise = new Promise((yes, no) => {
		resolve = (value) => {
			Object.assign(promise, {
				status: "fulfilled",
				value
			});
			yes(value);
		};
		reject = (reason) => {
			Object.assign(promise, {
				status: "rejected",
				reason
			});
			no(reason);
		};
	});
	promise.status = "pending";
	promise.catch(() => {});
	return {
		promise,
		resolve,
		reject
	};
};
/** Renderer creation and resource release. Root lifetime decides when release is safe. */
var isRenderer = (def) => !!(def != null && def.render);
/** The renderer to configure, or a promise for one from an async factory */
function createRenderer(canvas, gl) {
	const defaults = {
		canvas,
		powerPreference: "high-performance",
		antialias: true,
		alpha: true
	};
	if (typeof gl === "function") return gl(defaults);
	if (isRenderer(gl)) return gl;
	return new WebGLRenderer({
		...defaults,
		...gl
	});
}
/**
* Frees a renderer R3F built. WebGLRenderer.dispose() releases programs and caches but keeps its
* context until garbage collection, and browsers cap live WebGL contexts, so the context is lost
* after it. A WebGPURenderer (from a factory) releases its device and context inside dispose().
*/
function disposeRenderer(gl) {
	if ((gl.hasInitialized == null ? void 0 : gl.hasInitialized()) === false) return;
	const disposed = attempt$1(() => {
		var _gl$renderLists;
		return gl.dispose ? gl.dispose() : (_gl$renderLists = gl.renderLists) == null ? void 0 : _gl$renderLists.dispose == null ? void 0 : _gl$renderLists.dispose();
	});
	if (isPromiseLike(disposed)) return Promise.resolve(disposed).catch((error) => console.warn("[R3F] Error disposing renderer", error)).then(() => attempt$1(() => gl.forceContextLoss == null ? void 0 : gl.forceContextLoss()));
	attempt$1(() => gl.forceContextLoss == null ? void 0 : gl.forceContextLoss());
}
/** Owned renderers are disposed. Caller-provided renderers release caches and their context. */
function releaseRenderer(gl, owned) {
	if (!gl) return;
	if (owned) return disposeRenderer(gl);
	attempt$1(() => {
		var _gl$renderLists2;
		return (_gl$renderLists2 = gl.renderLists) == null ? void 0 : _gl$renderLists2.dispose == null ? void 0 : _gl$renderLists2.dispose();
	});
	attempt$1(() => gl.forceContextLoss == null ? void 0 : gl.forceContextLoss());
}
function attempt$1(step) {
	try {
		return step();
	} catch (error) {
		console.warn("[R3F] Error while unmounting root; teardown may be incomplete:", error);
	}
}
var context = /* @__PURE__ */ import_react.createContext(null);
var createStore = (invalidate, advance) => {
	const rootStore = createWithEqualityFn((set, get) => {
		const position = new Vector3();
		const defaultTarget = new Vector3();
		const tempTarget = new Vector3();
		function getCurrentViewport(camera = get().camera, target = defaultTarget, size = get().size) {
			const { width, height, top, left } = size;
			const aspect = width / height;
			if (target.isVector3) tempTarget.copy(target);
			else tempTarget.set(...target);
			const distance = camera.getWorldPosition(position).distanceTo(tempTarget);
			if (isOrthographicCamera(camera)) return {
				width: width / camera.zoom,
				height: height / camera.zoom,
				top,
				left,
				factor: 1,
				distance,
				aspect
			};
			else {
				const fov = camera.fov * Math.PI / 180;
				const h = 2 * Math.tan(fov / 2) * distance;
				const w = h * (width / height);
				return {
					width: w,
					height: h,
					top,
					left,
					factor: width / w,
					distance,
					aspect
				};
			}
		}
		let performanceTimeout = void 0;
		const setPerformanceCurrent = (current) => set((state) => ({ performance: {
			...state.performance,
			current
		} }));
		const pointer = new Vector2();
		return {
			set,
			get,
			gl: null,
			camera: null,
			raycaster: null,
			events: {
				priority: 1,
				enabled: true,
				connected: false
			},
			scene: null,
			xr: null,
			invalidate: (frames = 1) => invalidate(get(), frames),
			advance: (timestamp, runGlobalEffects) => advance(timestamp, runGlobalEffects, get()),
			legacy: false,
			linear: false,
			flat: false,
			controls: null,
			clock: new Clock(),
			pointer,
			mouse: pointer,
			frameloop: "always",
			onPointerMissed: void 0,
			performance: {
				current: 1,
				min: .5,
				max: 1,
				debounce: 200,
				regress: () => {
					const state = get();
					if (performanceTimeout) clearTimeout(performanceTimeout);
					if (state.performance.current !== state.performance.min) setPerformanceCurrent(state.performance.min);
					performanceTimeout = setTimeout(() => setPerformanceCurrent(get().performance.max), state.performance.debounce);
				}
			},
			size: {
				width: 0,
				height: 0,
				top: 0,
				left: 0
			},
			viewport: {
				initialDpr: 0,
				dpr: 0,
				width: 0,
				height: 0,
				top: 0,
				left: 0,
				aspect: 0,
				distance: 0,
				factor: 0,
				getCurrentViewport
			},
			setEvents: (events) => set((state) => ({
				...state,
				events: {
					...state.events,
					...events
				}
			})),
			setSize: (width, height, top = 0, left = 0) => {
				const camera = get().camera;
				const size = {
					width,
					height,
					top,
					left
				};
				set((state) => ({
					size,
					viewport: {
						...state.viewport,
						...getCurrentViewport(camera, defaultTarget, size)
					}
				}));
			},
			setDpr: (dpr) => set((state) => {
				const resolved = calculateDpr(dpr);
				return { viewport: {
					...state.viewport,
					dpr: resolved,
					initialDpr: state.viewport.initialDpr || resolved
				} };
			}),
			setFrameloop: (frameloop = "always") => {
				const clock = get().clock;
				clock.stop();
				clock.elapsedTime = 0;
				if (frameloop !== "never") {
					clock.start();
					clock.elapsedTime = 0;
				}
				set(() => ({ frameloop }));
			},
			previousRoot: void 0,
			internal: {
				interaction: [],
				hovered: /* @__PURE__ */ new Map(),
				subscribers: [],
				initialClick: [0, 0],
				initialHits: [],
				capturedMap: /* @__PURE__ */ new Map(),
				lastEvent: /*#__PURE__*/ import_react.createRef(),
				active: false,
				frames: 0,
				priority: 0,
				subscribe: (ref, priority, store) => {
					const internal = get().internal;
					internal.priority = internal.priority + (priority > 0 ? 1 : 0);
					internal.subscribers.push({
						ref,
						priority,
						store
					});
					internal.subscribers = internal.subscribers.sort((a, b) => a.priority - b.priority);
					return () => {
						const internal = get().internal;
						if (internal != null && internal.subscribers) {
							internal.priority = internal.priority - (priority > 0 ? 1 : 0);
							internal.subscribers = internal.subscribers.filter((s) => s.ref !== ref);
						}
					};
				}
			}
		};
	});
	const state = rootStore.getState();
	let oldSize = state.size;
	let oldDpr = state.viewport.dpr;
	let oldCamera = state.camera;
	rootStore.subscribe(() => {
		const { camera, size, viewport, gl, set } = rootStore.getState();
		if (size.width !== oldSize.width || size.height !== oldSize.height || viewport.dpr !== oldDpr) {
			oldSize = size;
			oldDpr = viewport.dpr;
			updateCamera(camera, size);
			if (viewport.dpr > 0) gl.setPixelRatio(viewport.dpr);
			const updateStyle = typeof HTMLCanvasElement !== "undefined" && gl.domElement instanceof HTMLCanvasElement;
			gl.setSize(size.width, size.height, updateStyle);
		}
		if (camera !== oldCamera) {
			oldCamera = camera;
			set((state) => ({ viewport: {
				...state.viewport,
				...state.viewport.getCurrentViewport(camera)
			} }));
		}
	});
	rootStore.subscribe((state) => invalidate(state));
	return rootStore;
};
/**
* Returns the R3F Canvas' Zustand store. Useful for [transient updates](https://github.com/pmndrs/zustand#transient-updates-for-often-occurring-state-changes).
* @see https://docs.pmnd.rs/react-three-fiber/api/hooks#usestore
*/
function useStore() {
	const store = import_react.useContext(context);
	if (!store) throw new Error("R3F: Hooks can only be used within the Canvas component!");
	return store;
}
/**
* Accesses R3F's internal state, containing renderer, canvas, scene, etc.
* @see https://docs.pmnd.rs/react-three-fiber/api/hooks#usethree
*/
function useThree(selector = (state) => state, equalityFn) {
	return useStore()(selector, equalityFn);
}
/**
* Executes a callback before render in a shared frame loop.
* Can order effects with render priority or manually render with a positive priority.
* @see https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe
*/
function useFrame(callback, renderPriority = 0) {
	const store = useStore();
	const subscribe = store.getState().internal.subscribe;
	const ref = useMutableCallback(callback);
	useIsomorphicLayoutEffect(() => subscribe(ref, renderPriority, store), [
		renderPriority,
		subscribe,
		store
	]);
	return null;
}
var memoizedLoaders = /* @__PURE__ */ new WeakMap();
var isConstructor = (value) => {
	var _value$prototype;
	return typeof value === "function" && (value == null ? void 0 : (_value$prototype = value.prototype) == null ? void 0 : _value$prototype.constructor) === value;
};
function loadingFn(extensions, onProgress) {
	return function(Proto, ...input) {
		let loader;
		if (isConstructor(Proto)) {
			loader = memoizedLoaders.get(Proto);
			if (!loader) {
				loader = new Proto();
				memoizedLoaders.set(Proto, loader);
			}
		} else loader = Proto;
		if (extensions) extensions(loader);
		return Promise.all(input.map((input) => new Promise((res, reject) => loader.load(input, (data) => {
			if (isObject3D(data == null ? void 0 : data.scene)) Object.assign(data, buildGraph(data.scene));
			res(data);
		}, onProgress, (error) => reject(/* @__PURE__ */ new Error(`Could not load ${input}: ${error == null ? void 0 : error.message}`))))));
	};
}
/**
* Synchronously loads and caches assets with a three loader.
*
* Note: this hook's caller must be wrapped with `React.Suspense`
* @see https://docs.pmnd.rs/react-three-fiber/api/hooks#useloader
*/
function useLoader(loader, input, extensions, onProgress) {
	const keys = Array.isArray(input) ? input : [input];
	const results = suspend(loadingFn(extensions, onProgress), [loader, ...keys], { equal: is.equ });
	return Array.isArray(input) ? results : results[0];
}
/**
* Preloads an asset into cache as a side-effect.
*/
useLoader.preload = function(loader, input, extensions) {
	const keys = Array.isArray(input) ? input : [input];
	return preload(loadingFn(extensions), [loader, ...keys]);
};
/**
* Removes a loaded asset from cache.
*/
useLoader.clear = function(loader, input) {
	return clear([loader, ...Array.isArray(input) ? input : [input]]);
};
/**
* @license React
* react-reconciler-constants.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/ var t = 1;
var o = 8;
var r = 32;
var e = 2;
var i$1 = 268435456;
/** What a root has applied, so its next configuration applies only what changed */
var shallow = { objects: "shallow" };
function computeInitialSize(canvas, size) {
	if (!size && typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement && canvas.parentElement) {
		const { width, height, top, left } = canvas.parentElement.getBoundingClientRect();
		return {
			width,
			height,
			top,
			left
		};
	} else if (!size && typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) return {
		width: canvas.width,
		height: canvas.height,
		top: 0,
		left: 0
	};
	return {
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		...size
	};
}
/**
* Applies the inputs that changed since the last configuration applied in full, to a root whose
* renderer is installed. A runtime change, such as setFrameloop or an edit to gl.shadowMap, lasts
* until its input changes. The pixel ratio instead follows the device on every call. Objects and
* arrays compare shallowly, so an equal inline value is unchanged.
*/
function applyRootConfiguration({ store, configuration }, canvas, props) {
	const { gl: glConfig, scene: sceneOptions, camera: cameraOptions, shadows = false, linear = false, flat = false, legacy = false, frameloop = "always", dpr = [1, 2], performance, onPointerMissed } = props;
	const size = computeInitialSize(canvas, props.size);
	const next = {
		...props,
		shadows,
		linear,
		flat,
		legacy,
		frameloop,
		size
	};
	const state = store.getState();
	const gl = state.gl;
	const last = configuration.previous;
	const changed = (key) => !last || !is.equ(next[key], last[key], shallow);
	configuration.previous = void 0;
	let raycaster = state.raycaster;
	if (!raycaster) state.set({ raycaster: raycaster = new Raycaster() });
	if (changed("raycaster")) {
		var _props$raycaster;
		const { params, ...options } = (_props$raycaster = props.raycaster) != null ? _props$raycaster : {};
		applyProps(raycaster, {
			...options,
			params: {
				...raycaster.params,
				...params
			}
		});
	}
	if (!state.camera || state.camera === configuration.camera && changed("camera")) {
		configuration.camera = cameraOptions;
		const isCamera = cameraOptions == null ? void 0 : cameraOptions.isCamera;
		const camera = isCamera ? cameraOptions : props.orthographic ? new OrthographicCamera(0, 0, 0, 0, .1, 1e3) : new PerspectiveCamera(75, 0, .1, 1e3);
		if (!isCamera) {
			camera.position.z = 5;
			if (cameraOptions) {
				applyProps(camera, cameraOptions);
				if (!camera.manual) {
					if ("aspect" in cameraOptions || "left" in cameraOptions || "right" in cameraOptions || "bottom" in cameraOptions || "top" in cameraOptions) {
						camera.manual = true;
						camera.updateProjectionMatrix();
					}
				}
			}
			if (!state.camera && !(cameraOptions != null && cameraOptions.rotation)) camera.lookAt(0, 0, 0);
		}
		state.set({ camera });
		raycaster.camera = camera;
	}
	if (!state.scene) {
		let scene;
		if (sceneOptions != null && sceneOptions.isScene) {
			scene = sceneOptions;
			prepare(scene, store, "", {});
		} else {
			scene = new Scene();
			prepare(scene, store, "", {});
			if (sceneOptions) applyProps(scene, sceneOptions);
		}
		state.set({ scene });
	}
	if (props.events && !state.events.handlers) state.set({ events: props.events(store) });
	if (changed("size")) state.setSize(size.width, size.height, size.top, size.left);
	if (state.viewport.dpr !== calculateDpr(dpr)) state.setDpr(dpr);
	if (changed("frameloop")) state.setFrameloop(frameloop);
	if (changed("onPointerMissed")) state.set({ onPointerMissed });
	if (performance && changed("performance")) state.set((state) => ({ performance: {
		...state.performance,
		...performance
	} }));
	if (!state.xr) {
		var _gl$xr;
		const handleXRFrame = (timestamp, frame) => {
			const state = store.getState();
			if (state.frameloop === "never") return;
			advance(timestamp, true, state, frame);
		};
		const handleSessionChange = () => {
			const state = store.getState();
			state.gl.xr.enabled = state.gl.xr.isPresenting;
			state.gl.xr.setAnimationLoop(state.gl.xr.isPresenting ? handleXRFrame : null);
			if (!state.gl.xr.isPresenting) invalidate(state);
		};
		const xr = {
			connect() {
				const gl = store.getState().gl;
				gl.xr.addEventListener("sessionstart", handleSessionChange);
				gl.xr.addEventListener("sessionend", handleSessionChange);
			},
			disconnect() {
				const gl = store.getState().gl;
				gl.xr.removeEventListener("sessionstart", handleSessionChange);
				gl.xr.removeEventListener("sessionend", handleSessionChange);
			}
		};
		if (typeof ((_gl$xr = gl.xr) == null ? void 0 : _gl$xr.addEventListener) === "function") xr.connect();
		state.set({ xr });
	}
	if (gl.shadowMap && changed("shadows")) {
		const oldEnabled = gl.shadowMap.enabled;
		const oldType = gl.shadowMap.type;
		gl.shadowMap.enabled = !!shadows;
		if (is.boo(shadows)) gl.shadowMap.type = 2;
		else if (is.str(shadows)) {
			var _types$shadows;
			const types = {
				basic: 0,
				percentage: 1,
				soft: 2,
				variance: 3
			};
			gl.shadowMap.type = (_types$shadows = types[shadows]) != null ? _types$shadows : 2;
		} else if (is.obj(shadows)) Object.assign(gl.shadowMap, shadows);
		if (oldEnabled !== gl.shadowMap.enabled || oldType !== gl.shadowMap.type) gl.shadowMap.needsUpdate = true;
	}
	const glProps = glConfig && !is.fun(glConfig) && !isRenderer(glConfig) ? glConfig : void 0;
	if (changed("legacy")) {
		ColorManagement.enabled = !legacy;
		state.set({ legacy });
	}
	if (changed("linear")) {
		if ((glProps == null ? void 0 : glProps.outputColorSpace) === void 0) gl.outputColorSpace = linear ? LinearSRGBColorSpace : SRGBColorSpace;
		state.set({ linear });
	}
	if (changed("flat")) {
		if ((glProps == null ? void 0 : glProps.toneMapping) === void 0) gl.toneMapping = flat ? 0 : 4;
		state.set({ flat });
	}
	if (glProps && changed("gl")) applyProps(gl, glProps);
	configuration.previous = next;
}
/**
* Moving to another display or zooming changes window.devicePixelRatio without resizing the canvas,
* so nothing configures the root again. Resolves the ratio the way configuration does, from the last
* applied dpr. Returns the function that stops following.
*/
function followDpr(root) {
	const xr = () => {
		var _root$store$getState$;
		return (_root$store$getState$ = root.store.getState().gl) == null ? void 0 : _root$store$getState$.xr;
	};
	const follow = () => {
		var _xr, _xr2, _xr3, _last$dpr;
		const state = root.store.getState();
		if ((_xr = xr()) != null && _xr.isPresenting || (_xr2 = xr()) != null && _xr2.getSession != null && _xr2.getSession()) {
			xr().addEventListener("sessionend", follow);
			return;
		}
		(_xr3 = xr()) == null || _xr3.removeEventListener == null || _xr3.removeEventListener("sessionend", follow);
		const last = root.configuration.previous;
		if (!last) return;
		const dpr = (_last$dpr = last.dpr) != null ? _last$dpr : [1, 2];
		if (state.viewport.dpr !== calculateDpr(dpr)) state.setDpr(dpr);
	};
	const unwatch = watchDpr(follow);
	return () => {
		var _xr4;
		unwatch();
		(_xr4 = xr()) == null || _xr4.removeEventListener == null || _xr4.removeEventListener("sessionend", follow);
	};
}
var packageData = {
	name: "@react-three/fiber",
	version: "9.8.2",
	description: "A React renderer for Threejs",
	keywords: [
		"react",
		"renderer",
		"fiber",
		"three",
		"threejs"
	],
	author: "Paul Henschel (https://github.com/drcmda)",
	license: "MIT",
	maintainers: [
		"Josh Ellis (https://github.com/joshuaellis)",
		"Cody Bennett (https://github.com/codyjasonbennett)",
		"Kris Baumgarter (https://github.com/krispya)"
	],
	bugs: { url: "https://github.com/pmndrs/react-three-fiber/issues" },
	homepage: "https://github.com/pmndrs/react-three-fiber#readme",
	repository: {
		type: "git",
		url: "git+https://github.com/pmndrs/react-three-fiber.git"
	},
	collective: {
		type: "opencollective",
		url: "https://opencollective.com/react-three-fiber"
	},
	main: "dist/react-three-fiber.cjs.js",
	module: "dist/react-three-fiber.esm.js",
	types: "dist/react-three-fiber.cjs.d.ts",
	"react-native": "native/dist/react-three-fiber-native.cjs.js",
	files: [
		"dist",
		"native",
		"react-reconciler",
		"CHANGELOG.md"
	],
	sideEffects: false,
	preconstruct: { entrypoints: ["index.tsx", "native.tsx"] },
	scripts: { prebuild: "cp ../../readme.md readme.md" },
	devDependencies: {
		"@types/react-reconciler": "^0.33.0",
		"react-reconciler": "^0.34.0"
	},
	dependencies: {
		"@babel/runtime": "^7.17.8",
		"@types/webxr": "*",
		"base64-js": "^1.5.1",
		buffer: "^6.0.3",
		"its-fine": "^2.1.1",
		"react-use-measure": "^2.1.7",
		scheduler: "^0.28.0",
		"suspend-react": "^0.1.3",
		"use-sync-external-store": "^1.4.0",
		zustand: "^5.0.3"
	},
	peerDependencies: {
		expo: ">=43.0",
		"expo-asset": ">=8.4",
		"expo-file-system": ">=11.0",
		"expo-gl": ">=11.0",
		react: ">=19 <19.4",
		"react-dom": ">=19 <19.4",
		"react-native": ">=0.78",
		three: ">=0.156"
	},
	peerDependenciesMeta: {
		"react-dom": { optional: true },
		"react-native": { optional: true },
		expo: { optional: true },
		"expo-asset": { optional: true },
		"expo-file-system": { optional: true },
		"expo-gl": { optional: true }
	}
};
function $1(Ut) {
	return Ut && Ut.__esModule && Object.prototype.hasOwnProperty.call(Ut, "default") ? Ut.default : Ut;
}
var S0 = { exports: {} };
var Ob = { exports: {} };
/**
* @license React
* react-reconciler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
Ob.exports;
var P1;
function Q1() {
	return P1 || (P1 = 1, function(Ut) {
		Ut.exports = function(m) {
			function et(t, r, a, l) {
				return new Fe(t, r, a, l);
			}
			function zf() {}
			function F(t) {
				var r = "https://react.dev/errors/" + t;
				if (1 < arguments.length) {
					r += "?args[]=" + encodeURIComponent(arguments[1]);
					for (var a = 2; a < arguments.length; a++) r += "&args[]=" + encodeURIComponent(arguments[a]);
				}
				return "Minified React error #" + t + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
			}
			function Ef(t) {
				for (var r = t, a = r; a && !a.alternate;) r = a, r.flags & 4098 && (t = r.return), a = r.return;
				for (; r.return;) r = r.return;
				return r.tag === 3 ? t : null;
			}
			function pc(t) {
				if (Ef(t) !== t) throw Error(F(188));
			}
			function hc(t) {
				var r = t.alternate;
				if (!r) {
					if (r = Ef(t), r === null) throw Error(F(188));
					return r !== t ? null : t;
				}
				for (var a = t, l = r;;) {
					var c = a.return;
					if (c === null) break;
					var d = c.alternate;
					if (d === null) {
						if (l = c.return, l !== null) {
							a = l;
							continue;
						}
						break;
					}
					if (c.child === d.child) {
						for (d = c.child; d;) {
							if (d === a) return pc(c), t;
							if (d === l) return pc(c), r;
							d = d.sibling;
						}
						throw Error(F(188));
					}
					if (a.return !== l.return) a = c, l = d;
					else {
						for (var h = !1, y = c.child; y;) {
							if (y === a) {
								h = !0, a = c, l = d;
								break;
							}
							if (y === l) {
								h = !0, l = c, a = d;
								break;
							}
							y = y.sibling;
						}
						if (!h) {
							for (y = d.child; y;) {
								if (y === a) {
									h = !0, a = d, l = c;
									break;
								}
								if (y === l) {
									h = !0, l = d, a = c;
									break;
								}
								y = y.sibling;
							}
							if (!h) throw Error(F(189));
						}
					}
					if (a.alternate !== l) throw Error(F(190));
				}
				if (a.tag !== 3) throw Error(F(188));
				return a.stateNode.current === a ? t : r;
			}
			function mc(t) {
				var r = t.tag;
				if (r === 5 || r === 26 || r === 27 || r === 6) return t;
				for (t = t.child; t !== null;) {
					if (r = mc(t), r !== null) return r;
					t = t.sibling;
				}
				return null;
			}
			function ht(t) {
				var r = t.tag;
				if (r === 5 || r === 26 || r === 27 || r === 6) return t;
				for (t = t.child; t !== null;) {
					if (t.tag !== 4 && (r = ht(t), r !== null)) return r;
					t = t.sibling;
				}
				return null;
			}
			function Ss(t) {
				return t === null || typeof t != "object" ? null : (t = ki && t[ki] || t["@@iterator"], typeof t == "function" ? t : null);
			}
			function gc(t) {
				if (t == null) return null;
				if (typeof t == "function") return t.$$typeof === Po ? null : t.displayName || t.name || null;
				if (typeof t == "string") return t;
				switch (t) {
					case wo: return "Fragment";
					case Pu: return "Profiler";
					case md: return "StrictMode";
					case xu: return "Suspense";
					case Cu: return "SuspenseList";
					case zu: return "Activity";
					case yd: return "ViewTransition";
				}
				if (typeof t == "object") switch (t.$$typeof) {
					case Si: return "Portal";
					case Vr: return t.displayName || "Context";
					case gd: return (t._context.displayName || "Context") + ".Consumer";
					case bd:
						var r = t.render;
						return t = t.displayName, t || (t = r.displayName || r.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
					case Fl: return r = t.displayName || null, r !== null ? r : gc(t.type) || "Memo";
					case Ra:
						r = t._payload, t = t._init;
						try {
							return gc(t(r));
						} catch {}
				}
				return null;
			}
			function oo(t) {
				return { current: t };
			}
			function W(t) {
				0 > Wa || (t.current = Ml[Wa], Ml[Wa] = null, Wa--);
			}
			function Te(t, r) {
				Wa++, Ml[Wa] = t.current, t.current = r;
			}
			function k0(t) {
				return t >>>= 0, t === 0 ? 32 : 31 - (Fd(t) / lh | 0) | 0;
			}
			function ma(t) {
				var r = t & 42;
				if (r !== 0) return r;
				switch (t & -t) {
					case 1: return 1;
					case 2: return 2;
					case 4: return 4;
					case 8: return 8;
					case 16: return 16;
					case 32: return 32;
					case 64: return 64;
					case 128: return 128;
					case 256:
					case 512:
					case 1024:
					case 2048:
					case 4096:
					case 8192:
					case 16384:
					case 32768:
					case 65536:
					case 131072: return t & -t;
					case 262144:
					case 524288:
					case 1048576:
					case 2097152: return t & 3932160;
					case 4194304:
					case 8388608:
					case 16777216:
					case 33554432: return t & 62914560;
					case 67108864: return 67108864;
					case 134217728: return 134217728;
					case 268435456: return 268435456;
					case 536870912: return 536870912;
					case 1073741824: return 0;
					default: return t;
				}
			}
			function ao(t, r, a) {
				var l = t.pendingLanes;
				if (l === 0) return 0;
				var c = 0, d = t.suspendedLanes, h = t.pingedLanes;
				t = t.warmLanes;
				var y = l & 134217727;
				return y !== 0 ? (l = y & ~d, l !== 0 ? c = ma(l) : (h &= y, h !== 0 ? c = ma(h) : a || (a = y & ~t, a !== 0 && (c = ma(a))))) : (y = l & ~d, y !== 0 ? c = ma(y) : h !== 0 ? c = ma(h) : a || (a = l & ~t, a !== 0 && (c = ma(a)))), c === 0 ? 0 : r !== 0 && r !== c && (r & d) === 0 && (d = c & -c, a = r & -r, d >= a || d === 32 && (a & 4194048) !== 0) ? r : c;
			}
			function Yi(t, r) {
				return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & r) === 0;
			}
			function _f(t, r) {
				r & 8 && (r |= r & 32);
				var a = t.entangledLanes;
				if (a !== 0) for (t = t.entanglements, a &= r; 0 < a;) {
					var l = 31 - sn(a), c = 1 << l;
					r |= t[l], a &= ~c;
				}
				return r;
			}
			function am(t, r) {
				switch (t) {
					case 1:
					case 2:
					case 4:
					case 8:
					case 64: return r + 250;
					case 16:
					case 32:
					case 128:
					case 256:
					case 512:
					case 1024:
					case 2048:
					case 4096:
					case 8192:
					case 16384:
					case 32768:
					case 65536:
					case 131072:
					case 262144:
					case 524288:
					case 1048576:
					case 2097152: return r + 5e3;
					case 4194304:
					case 8388608:
					case 16777216:
					case 33554432: return -1;
					case 67108864:
					case 134217728:
					case 268435456:
					case 536870912:
					case 1073741824: return -1;
					default: return -1;
				}
			}
			function Nf() {
				var t = qn;
				return qn <<= 1, !(qn & 62914560) && (qn = 4194304), t;
			}
			function bc(t) {
				for (var r = [], a = 0; 31 > a; a++) r.push(t);
				return r;
			}
			function Ki(t, r) {
				t.pendingLanes |= r, r !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
			}
			function ti(t, r, a, l, c, d) {
				var h = t.pendingLanes;
				t.pendingLanes = a, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= a, t.entangledLanes &= a, t.errorRecoveryDisabledLanes &= a, t.shellSuspendCounter = 0;
				var y = t.entanglements, C = t.expirationTimes, R = t.hiddenUpdates;
				for (a = h & ~a; 0 < a;) {
					var D = 31 - sn(a), U = 1 << D;
					y[D] = 0, C[D] = -1;
					var A = R[D];
					if (A !== null) for (R[D] = null, D = 0; D < A.length; D++) {
						var fe = A[D];
						fe !== null && (fe.lane &= -536870913);
					}
					a &= ~U;
				}
				l !== 0 && en(t, l, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(h & ~r));
			}
			function en(t, r, a) {
				t.pendingLanes |= r, t.suspendedLanes &= ~r;
				var l = 31 - sn(r);
				t.entangledLanes |= r, t.entanglements[l] = t.entanglements[l] | 1073741824 | a & 261930;
			}
			function G(t, r) {
				var a = t.entangledLanes |= r;
				for (t = t.entanglements; a;) {
					var l = 31 - sn(a), c = 1 << l;
					c & r | t[l] & r && (t[l] |= r), a &= ~c;
				}
			}
			function Wt(t, r) {
				var a = r & -r;
				return a = (a & 42) !== 0 ? 1 : mn(a), (a & (t.suspendedLanes | r)) !== 0 ? 0 : a;
			}
			function mn(t) {
				switch (t) {
					case 2:
						t = 1;
						break;
					case 8:
						t = 4;
						break;
					case 32:
						t = 16;
						break;
					case 256:
					case 512:
					case 1024:
					case 2048:
					case 4096:
					case 8192:
					case 16384:
					case 32768:
					case 65536:
					case 131072:
					case 262144:
					case 524288:
					case 1048576:
					case 2097152:
					case 4194304:
					case 8388608:
					case 16777216:
					case 33554432:
						t = 128;
						break;
					case 268435456:
						t = 134217728;
						break;
					default: t = 0;
				}
				return t;
			}
			function ze(t) {
				return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
			}
			function ga(t) {
				if (typeof N == "function" && U0(t), It && typeof It.setStrictMode == "function") try {
					It.setStrictMode(Lu, t);
				} catch {}
			}
			function mt(t, r) {
				if (t.name != null && t.name !== "auto") return t.name;
				if (r.autoName !== null) return r.autoName;
				t = qt.identifierPrefix;
				var a = Ql++;
				return t = "_" + t + "t_" + a.toString(32) + "_", r.autoName = t;
			}
			function ks(t) {
				var _r2;
				if (t == null || typeof t == "string") return t;
				var r = null, a = ts;
				if (a !== null) for (var l = 0; l < a.length; l++) {
					var c = t[a[l]];
					if (c != null) {
						if (c === "none") return "none";
						r = r == null ? c : r + (" " + c);
					}
				}
				return (_r2 = r) != null ? _r2 : t.default;
			}
			function At(t, r) {
				return t = ks(t), r = ks(r), r == null ? t === "auto" ? null : t : r === "auto" ? null : r;
			}
			function im(t, r) {
				return t === r && (t !== 0 || 1 / t === 1 / r) || t !== t && r !== r;
			}
			function ba(t) {
				if (fh === void 0) try {
					throw Error();
				} catch (a) {
					var r = a.stack.trim().match(/\n( *(at )?)/);
					fh = r && r[1] || "", wg = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
				}
				return `
` + fh + t + wg;
			}
			function ws(t, r) {
				if (!t || Fu) return "";
				Fu = !0;
				var a = Error.prepareStackTrace;
				Error.prepareStackTrace = void 0;
				try {
					var l = { DetermineComponentFrameRoot: function() {
						try {
							if (r) {
								var U = function() {
									throw Error();
								};
								if (Object.defineProperty(U.prototype, "props", { set: function() {
									throw Error();
								} }), typeof Reflect == "object" && Reflect.construct) {
									try {
										Reflect.construct(U, []);
									} catch (Ne) {
										var A = Ne;
									}
									Reflect.construct(t, [], U);
								} else {
									try {
										U.call();
									} catch (Ne) {
										A = Ne;
									}
									U = !1;
									try {
										var fe = Object.getOwnPropertyDescriptor(t.prototype, "props");
										Object.defineProperty(t.prototype, "props", {
											configurable: !0,
											set: function() {
												throw Error();
											}
										}), U = !0, new t();
									} finally {
										U && (fe !== void 0 ? Object.defineProperty(t.prototype, "props", fe) : delete t.prototype.props);
									}
								}
							} else {
								try {
									throw Error();
								} catch (Ne) {
									A = Ne;
								}
								(U = t()) && typeof U.catch == "function" && U.catch(function() {});
							}
						} catch (Ne) {
							if (Ne && A && typeof Ne.stack == "string") return [Ne.stack, A.stack];
						}
						return [null, null];
					} };
					l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
					var c = Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot, "name");
					c && c.configurable && Object.defineProperty(l.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
					var d = l.DetermineComponentFrameRoot(), h = d[0], y = d[1];
					if (h && y) {
						var C = h.split(`
`), R = y.split(`
`);
						for (c = l = 0; l < C.length && !C[l].includes("DetermineComponentFrameRoot");) l++;
						for (; c < R.length && !R[c].includes("DetermineComponentFrameRoot");) c++;
						if (l === C.length || c === R.length) for (l = C.length - 1, c = R.length - 1; 1 <= l && 0 <= c && C[l] !== R[c];) c--;
						for (; 1 <= l && 0 <= c; l--, c--) if (C[l] !== R[c]) {
							if (l !== 1 || c !== 1) do
								if (l--, c--, 0 > c || C[l] !== R[c]) {
									var D = `
` + C[l].replace(" at new ", " at ");
									return t.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", t.displayName)), D;
								}
							while (1 <= l && 0 <= c);
							break;
						}
					}
				} finally {
					Fu = !1, Error.prepareStackTrace = a;
				}
				return (a = t ? t.displayName || t.name : "") ? ba(a) : "";
			}
			function Tf(t, r) {
				switch (t.tag) {
					case 26:
					case 27:
					case 5: return ba(t.type);
					case 16: return ba("Lazy");
					case 13: return t.child !== r && r !== null ? ba("Suspense Fallback") : ba("Suspense");
					case 19: return ba("SuspenseList");
					case 0:
					case 15: return ws(t.type, !1);
					case 11: return ws(t.type.render, !1);
					case 1: return ws(t.type, !0);
					case 31: return ba("Activity");
					case 30: return ba("ViewTransition");
					default: return "";
				}
			}
			function el(t) {
				try {
					var r = "", a = null;
					do
						r += Tf(t, a), a = t, t = t.return;
					while (t);
					return r;
				} catch (l) {
					return `
Error generating stack: ` + l.message + `
` + l.stack;
				}
			}
			function Kt(t, r) {
				if (typeof t == "object" && t !== null) {
					var a = ph.get(t);
					return a !== void 0 ? a : (r = {
						value: t,
						source: r,
						stack: el(r)
					}, ph.set(t, r), r);
				}
				return {
					value: t,
					source: r,
					stack: el(r)
				};
			}
			function io(t, r) {
				ea[_i++] = Du, ea[_i++] = Dd, Dd = t, Du = r;
			}
			function If(t, r, a) {
				Wn[yn++] = _n, Wn[yn++] = $e, Wn[yn++] = _e, _e = t;
				var l = _n;
				t = $e;
				var c = 32 - sn(l) - 1;
				l &= ~(1 << c), a += 1;
				var d = 32 - sn(r) + c;
				if (30 < d) {
					var h = c - c % 5;
					d = (l & (1 << h) - 1).toString(32), l >>= h, c -= h, _n = 1 << 32 - sn(r) + c | a << c | l, $e = d + t;
				} else _n = 1 << d | a << c | l, $e = t;
			}
			function Ps(t) {
				t.return !== null && (io(t, 1), If(t, 1, 0));
			}
			function xs(t) {
				for (; t === Dd;) Dd = ea[--_i], ea[_i] = null, Du = ea[--_i], ea[_i] = null;
				for (; t === _e;) _e = Wn[--yn], Wn[yn] = null, $e = Wn[--yn], Wn[yn] = null, _n = Wn[--yn], Wn[yn] = null;
			}
			function Rf(t, r) {
				Wn[yn++] = _n, Wn[yn++] = $e, Wn[yn++] = _e, _n = r.id, $e = r.overflow, _e = t;
			}
			function Cs(t, r) {
				Te(Je, r), Te(ju, t), Te(Jn, null), t = vd(r), W(Jn), Te(Jn, t);
			}
			function ya() {
				W(Jn), W(ju), W(Je);
			}
			function Lf(t) {
				var r = t.memoizedState;
				r !== null && (r = r.memoizedState, lr ? $r._currentValue = r : $r._currentValue2 = r, Te(fr, t)), r = Jn.current;
				var a = Rm(r, t.type);
				r !== a && (Te(ju, t), Te(Jn, a));
			}
			function Oe(t) {
				ju.current === t && (W(Jn), W(ju)), fr.current === t && (W(fr), lr ? $r._currentValue = Fa : $r._currentValue2 = Fa);
			}
			function Mn(t) {
				throw va(Kt(Error(F(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)), hh;
			}
			function Ff(t, r) {
				if (!En) throw Error(F(175));
				N0(t.stateNode, t.type, t.memoizedProps, r, t) || Mn(t, !0);
			}
			function er(t) {
				for (Nn = t.return; Nn;) switch (Nn.tag) {
					case 5:
					case 31:
					case 13:
						hr = !1;
						return;
					case 27:
					case 3:
						hr = !0;
						return;
					default: Nn = Nn.return;
				}
			}
			function nl(t) {
				if (!En || t !== Nn) return !1;
				if (!ne) return er(t), ne = !0, !1;
				var r = t.tag;
				if (be ? r !== 3 && r !== 27 && (r !== 5 || Td(t.type) && !kd(t.type, t.memoizedProps)) && Qe && Mn(t) : r !== 3 && (r !== 5 || Td(t.type) && !kd(t.type, t.memoizedProps)) && Qe && Mn(t), er(t), r === 13) {
					if (!En) throw Error(F(316));
					if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(F(317));
					Qe = Ru(t);
				} else if (r === 31) {
					if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(F(317));
					Qe = pg(t);
				} else Qe = be && r === 27 ? lg(t.type, Qe) : Nn ? Nd(t.stateNode) : null;
				return !0;
			}
			function ri() {
				En && (Qe = Nn = null, ne = !1);
			}
			function zs() {
				var t = pr;
				return t !== null && (Ze === null ? Ze = t : Ze.push.apply(Ze, t), pr = null), t;
			}
			function va(t) {
				pr === null ? pr = [t] : pr.push(t);
			}
			function Rn(t, r, a) {
				lr ? (Te(jd, r._currentValue), r._currentValue = a) : (Te(jd, r._currentValue2), r._currentValue2 = a);
			}
			function lo(t) {
				var r = jd.current;
				lr ? t._currentValue = r : t._currentValue2 = r, W(jd);
			}
			function zn(t, r, a) {
				for (; t !== null;) {
					var l = t.alternate;
					if ((t.childLanes & r) !== r ? (t.childLanes |= r, l !== null && (l.childLanes |= r)) : l !== null && (l.childLanes & r) !== r && (l.childLanes |= r), t === a) break;
					t = t.return;
				}
			}
			function nr(t, r, a, l) {
				var c = t.child;
				for (c !== null && (c.return = t); c !== null;) {
					var d = c.dependencies;
					if (d !== null) {
						var h = c.child;
						d = d.firstContext;
						e: for (; d !== null;) {
							var y = d;
							d = c;
							for (var C = 0; C < r.length; C++) if (y.context === r[C]) {
								d.lanes |= a, y = d.alternate, y !== null && (y.lanes |= a), zn(d.return, a, t), l || (h = null);
								break e;
							}
							d = y.next;
						}
					} else if (c.tag === 18) {
						if (h = c.return, h === null) throw Error(F(341));
						h.lanes |= a, d = h.alternate, d !== null && (d.lanes |= a), zn(h, a, t), h = null;
					} else c.tag === 13 && c.memoizedState !== null && c.memoizedState.dehydrated === null ? (c.lanes |= a, h = c.alternate, h !== null && (h.lanes |= a), zn(c.return, a, t), h = c.child, h = h !== null ? h.sibling : null) : h = c.child;
					if (h !== null) h.return = c;
					else for (h = c; h !== null;) {
						if (h === t) {
							h = null;
							break;
						}
						if (c = h.sibling, c !== null) {
							c.return = h.return, h = c;
							break;
						}
						h = h.return;
					}
					c = h;
				}
			}
			function so(t, r, a, l) {
				t = null;
				for (var c = r, d = !1; c !== null;) {
					if (!d) {
						if ((c.flags & 524288) !== 0) d = !0;
						else if ((c.flags & 262144) !== 0) break;
					}
					if (c.tag === 10) {
						var h = c.alternate;
						if (h === null) throw Error(F(387));
						if (h = h.memoizedProps, h !== null) {
							var y = c.type;
							$t(c.pendingProps.value, h.value) || (t !== null ? t.push(y) : t = [y]);
						}
					} else if (c === fr.current) {
						if (h = c.alternate, h === null) throw Error(F(387));
						h.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push($r) : t = [$r]);
					}
					c = c.return;
				}
				return t !== null && nr(r, t, a, l), r.flags |= 262144, t !== null;
			}
			function oi(t) {
				for (t = t.firstContext; t !== null;) {
					var r = t.context;
					if (!$t(lr ? r._currentValue : r._currentValue2, t.memoizedValue)) return !0;
					t = t.next;
				}
				return !1;
			}
			function Do(t) {
				Ni = t, qr = null, t = t.dependencies, t !== null && (t.firstContext = null);
			}
			function Me(t) {
				return Df(Ni, t);
			}
			function Es(t, r) {
				return Ni === null && Do(t), Df(t, r);
			}
			function Df(t, r) {
				var a = lr ? r._currentValue : r._currentValue2;
				if (r = {
					context: r,
					memoizedValue: a,
					next: null
				}, qr === null) {
					if (t === null) throw Error(F(308));
					qr = r, t.dependencies = {
						lanes: 0,
						firstContext: r
					}, t.flags |= 524288;
				} else qr = qr.next = r;
				return a;
			}
			function _s() {
				return {
					controller: new Pg(),
					data: /* @__PURE__ */ new Map(),
					refCount: 0
				};
			}
			function Ns(t) {
				t.refCount--, t.refCount === 0 && A0(xg, function() {
					t.controller.abort();
				});
			}
			function jf(t, r) {
				if ((t.pendingLanes & 4194048) !== 0) {
					var a = t.transitionTypes;
					for (a === null && (a = t.transitionTypes = []), t = 0; t < r.length; t++) {
						var l = r[t];
						a.indexOf(l) === -1 && a.push(l);
					}
				}
			}
			function lm(t) {
				var r = t.transitionTypes;
				return t.transitionTypes = null, r;
			}
			function Pr() {}
			function xr(t) {
				t !== Gr && t.next === null && (Gr === null ? ql = Gr = t : Gr = Gr.next = t), Ud = !0, Jr || (Jr = !0, cm());
			}
			function tl(t, r) {
				if (!mh && Ud) {
					mh = !0;
					do
						for (var a = !1, l = ql; l !== null;) {
							if (!r) if (t !== 0) {
								var c = l.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var h = l.suspendedLanes, y = l.pingedLanes;
									d = (1 << 31 - sn(42 | t) + 1) - 1, d &= c & ~(h & ~y), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
								}
								d !== 0 && (a = !0, um(l, d));
							} else d = ye, d = ao(l, l === Be ? d : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== La), !(d & 3) || Yi(l, d) || (a = !0, um(l, d));
							l = l.next;
						}
					while (a);
					mh = !1;
				}
			}
			function sm() {
				yc();
			}
			function yc() {
				Ud = Jr = !1;
				var t = 0;
				Ti !== 0 && Wm() && (t = Ti);
				for (var r = Tt(), a = null, l = ql; l !== null;) {
					var c = l.next, d = nt(l, r);
					d === 0 ? (l.next = null, a === null ? ql = c : a.next = c, c === null && (Gr = a)) : (a = l, (t !== 0 || d & 3) && (Ud = !0)), l = c;
				}
				Xe !== 0 && Xe !== 5 || tl(t, !1), Ti !== 0 && (Ti = 0);
			}
			function nt(t, r) {
				for (var a = t.suspendedLanes, l = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561; 0 < d;) {
					var h = 31 - sn(d), y = 1 << h, C = c[h];
					C === -1 ? ((y & a) === 0 || (y & l) !== 0) && (c[h] = am(y, r)) : C <= r && (t.expiredLanes |= y), d &= ~y;
				}
				if (r = Be, a = ye, a = ao(t, t === r ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== La), l = t.callbackNode, a === 0 || t === r && (Ie === 2 || Ie === 9) || t.cancelPendingCommit !== null) return l !== null && l !== null && sh(l), t.callbackNode = null, t.callbackPriority = 0;
				if ((a & 3) === 0 || Yi(t, a)) {
					if (r = a & -a, r === t.callbackPriority) return r;
					switch (l !== null && sh(l), ze(a)) {
						case 2:
						case 8:
							a = Sg;
							break;
						case 32:
							a = dh;
							break;
						case 268435456:
							a = Gn;
							break;
						default: a = dh;
					}
					return l = vc.bind(null, t), a = $l(a, l), t.callbackPriority = r, t.callbackNode = a, r;
				}
				return l !== null && l !== null && sh(l), t.callbackPriority = 2, t.callbackNode = null, 2;
			}
			function vc(t, r) {
				if (Xe !== 0 && Xe !== 5) return t.callbackNode = null, t.callbackPriority = 0, null;
				var a = t.callbackNode;
				if (_a() && t.callbackNode !== a) return null;
				var l = ye;
				return l = ao(t, t === Be ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== La), l === 0 ? null : (Il(t, l, r), nt(t, Tt()), t.callbackNode != null && t.callbackNode === a ? vc.bind(null, t) : null);
			}
			function um(t, r) {
				if (_a()) return null;
				Il(t, r, !0);
			}
			function cm() {
				Hm ? jl(function() {
					(de & 6) !== 0 ? $l(ch, sm) : yc();
				}) : $l(ch, sm);
			}
			function Sc() {
				if (Ti === 0) {
					var t = Ii;
					t === 0 && (t = Vl, Vl <<= 1, !(Vl & 261888) && (Vl = 256)), Ti = t;
				}
				return Ti;
			}
			function Ot(t, r) {
				if (Wu === null) {
					var a = Wu = [];
					Oa = 0, Ii = Sc(), Gl = {
						status: "pending",
						value: void 0,
						then: function(l) {
							a.push(l);
						}
					};
				}
				return Oa++, r.then(uo, uo), r;
			}
			function uo() {
				if (--Oa === 0 && (Uu = null, Wu !== null)) {
					Gl !== null && (Gl.status = "fulfilled");
					var t = Wu;
					Wu = null, Ii = 0, Gl = null;
					for (var r = 0; r < t.length; r++) (0, t[r])();
				}
			}
			function dm(t, r) {
				var a = [], l = {
					status: "pending",
					value: null,
					reason: null,
					then: function(c) {
						a.push(c);
					}
				};
				return t.then(function() {
					l.status = "fulfilled", l.value = r;
					for (var c = 0; c < a.length; c++) (0, a[c])(r);
				}, function(c) {
					for (l.status = "rejected", l.reason = c, c = 0; c < a.length; c++) (0, a[c])(void 0);
				}), l;
			}
			function rl() {
				var t = Zr.current;
				return t !== null ? t : Be.pooledCache;
			}
			function ol(t, r) {
				r === null ? Te(Zr, Zr.current) : Te(Zr, r.pool);
			}
			function Uf() {
				var t = rl();
				return t === null ? null : {
					parent: lr ? tn._currentValue : tn._currentValue2,
					pool: t
				};
			}
			function Ts(t, r) {
				if ($t(t, r)) return !0;
				if (typeof t != "object" || t === null || typeof r != "object" || r === null) return !1;
				var a = Object.keys(t), l = Object.keys(r);
				if (a.length !== l.length) return !1;
				for (l = 0; l < a.length; l++) {
					var c = a[l];
					if (!W0.call(r, c) || !$t(t[c], r[c])) return !1;
				}
				return !0;
			}
			function jo(t) {
				return t = t.status, t === "fulfilled" || t === "rejected";
			}
			function Uo(t, r, a) {
				switch (a = t[a], a === void 0 ? t.push(r) : a !== r && (r.then(Pr, Pr), r = a), r.status) {
					case "fulfilled": return r.value;
					case "rejected": throw t = r.reason, Cr(t), t === void 0 && !("reason" in r) ? Error(F(600)) : t;
					default:
						if (typeof r.status == "string") r.then(Pr, Pr);
						else {
							if (t = Be, t !== null && 100 < t.shellSuspendCounter) throw Error(F(482));
							t = r, t.status = "pending", t.then(function(l) {
								if (r.status === "pending") {
									var c = r;
									c.status = "fulfilled", c.value = l;
								}
							}, function(l) {
								if (r.status === "pending") {
									var c = r;
									c.status = "rejected", c.reason = l;
								}
							});
						}
						switch (r.status) {
							case "fulfilled": return r.value;
							case "rejected": throw t = r.reason, Cr(t), t;
						}
						throw Ri = r, Jl;
				}
			}
			function co(t) {
				try {
					var r = t._init;
					return r(t._payload);
				} catch (a) {
					throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Ri = a, Jl) : a;
				}
			}
			function ai() {
				if (Ri === null) throw Error(F(459));
				var t = Ri;
				return Ri = null, t;
			}
			function Cr(t) {
				if (t === Jl || t === Wd) throw Error(F(483));
			}
			function al(t) {
				var r = Au;
				return Au += 1, Zl === null && (Zl = []), Uo(Zl, t, r);
			}
			function zr(t, r) {
				r = r.props.ref, t.ref = r !== void 0 ? r : null;
			}
			function Is(t, r) {
				throw r.$$typeof === _m ? Error(F(525)) : (t = Object.prototype.toString.call(r), Error(F(31, t === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : t)));
			}
			function wt(t) {
				function r(x, P) {
					if (t) {
						var E = x.deletions;
						E === null ? (x.deletions = [P], x.flags |= 16) : E.push(P);
					}
				}
				function a(x, P) {
					if (!t) return null;
					for (; P !== null;) r(x, P), P = P.sibling;
					return null;
				}
				function l(x) {
					for (var P = /* @__PURE__ */ new Map(); x !== null;) x.key === null ? P.set(x.index, x) : P.set(x.key, x), x = x.sibling;
					return P;
				}
				function c(x, P) {
					return x = Zo(x, P), x.index = 0, x.sibling = null, x;
				}
				function d(x, P, E) {
					return x.index = E, t ? (E = x.alternate, E !== null ? (E = E.index, E < P ? (x.flags |= 2, P) : E) : (x.flags |= 134217730, P)) : (x.flags |= 1048576, P);
				}
				function h(x) {
					return t && x.alternate === null && (x.flags |= 134217730), x;
				}
				function y(x, P, E, j) {
					return P === null || P.tag !== 6 ? (P = wu(E, x.mode, j), P.return = x, P) : (P = c(P, E), P.return = x, P);
				}
				function C(x, P, E, j) {
					var q = E.type;
					return q === wo ? (x = D(x, P, E.props.children, j, E.key), zr(x, E), x) : P !== null && (P.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Ra && co(q) === P.type) ? (P = c(P, E.props), zr(P, E), P.return = x, P) : (P = Vt(E.type, E.key, E.props, null, x.mode, j), zr(P, E), P.return = x, P);
				}
				function R(x, P, E, j) {
					return P === null || P.tag !== 4 || P.stateNode.containerInfo !== E.containerInfo || P.stateNode.implementation !== E.implementation ? (P = Ta(E, x.mode, j), P.return = x, P) : (P = c(P, E.children || []), P.return = x, P);
				}
				function D(x, P, E, j, q) {
					return P === null || P.tag !== 7 ? (P = Na(E, x.mode, j, q), P.return = x, P) : (P = c(P, E), P.return = x, P);
				}
				function U(x, P, E) {
					if (typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint") return P = wu("" + P, x.mode, E), P.return = x, P;
					if (typeof P == "object" && P !== null) {
						switch (P.$$typeof) {
							case Ia: return E = Vt(P.type, P.key, P.props, null, x.mode, E), zr(E, P), E.return = x, E;
							case Si: return P = Ta(P, x.mode, E), P.return = x, P;
							case Ra: return P = co(P), U(x, P, E);
						}
						if (wi(P) || Ss(P)) return P = Na(P, x.mode, E, null), P.return = x, P;
						if (typeof P.then == "function") return U(x, al(P), E);
						if (P.$$typeof === Vr) return U(x, Es(x, P), E);
						Is(x, P);
					}
					return null;
				}
				function A(x, P, E, j) {
					var q = P !== null ? P.key : null;
					if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint") return q !== null ? null : y(x, P, "" + E, j);
					if (typeof E == "object" && E !== null) {
						switch (E.$$typeof) {
							case Ia: return E.key === q ? C(x, P, E, j) : null;
							case Si: return E.key === q ? R(x, P, E, j) : null;
							case Ra: return E = co(E), A(x, P, E, j);
						}
						if (wi(E) || Ss(E)) return q !== null ? null : D(x, P, E, j, null);
						if (typeof E.then == "function") return A(x, P, al(E), j);
						if (E.$$typeof === Vr) return A(x, P, Es(x, E), j);
						Is(x, E);
					}
					return null;
				}
				function fe(x, P, E, j, q) {
					if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint") return x = x.get(E) || null, y(P, x, "" + j, q);
					if (typeof j == "object" && j !== null) {
						switch (j.$$typeof) {
							case Ia: return x = x.get(j.key === null ? E : j.key) || null, C(P, x, j, q);
							case Si: return x = x.get(j.key === null ? E : j.key) || null, R(P, x, j, q);
							case Ra: return j = co(j), fe(x, P, E, j, q);
						}
						if (wi(j) || Ss(j)) return x = x.get(E) || null, D(P, x, j, q, null);
						if (typeof j.then == "function") return fe(x, P, E, al(j), q);
						if (j.$$typeof === Vr) return fe(x, P, E, Es(P, j), q);
						Is(P, j);
					}
					return null;
				}
				function Ne(x, P, E, j) {
					for (var q = null, Ue = null, M = P, ie = P = 0, Le = null; M !== null && ie < E.length; ie++) {
						M.index > ie ? (Le = M, M = null) : Le = M.sibling;
						var Se = A(x, M, E[ie], j);
						if (Se === null) {
							M === null && (M = Le);
							break;
						}
						t && M && Se.alternate === null && r(x, M), P = d(Se, P, ie), Ue === null ? q = Se : Ue.sibling = Se, Ue = Se, M = Le;
					}
					if (ie === E.length) return a(x, M), ne && io(x, ie), q;
					if (M === null) {
						for (; ie < E.length; ie++) M = U(x, E[ie], j), M !== null && (P = d(M, P, ie), Ue === null ? q = M : Ue.sibling = M, Ue = M);
						return ne && io(x, ie), q;
					}
					for (M = l(M); ie < E.length; ie++) Le = fe(M, x, ie, E[ie], j), Le !== null && (t && (Se = Le.alternate, Se !== null && M.delete(Se.key === null ? ie : Se.key)), P = d(Le, P, ie), Ue === null ? q = Le : Ue.sibling = Le, Ue = Le);
					return t && M.forEach(function(la) {
						return r(x, la);
					}), ne && io(x, ie), q;
				}
				function Re(x, P, E, j) {
					if (E == null) throw Error(F(151));
					for (var q = null, Ue = null, M = P, ie = P = 0, Le = null, Se = E.next(); M !== null && !Se.done; ie++, Se = E.next()) {
						M.index > ie ? (Le = M, M = null) : Le = M.sibling;
						var la = A(x, M, Se.value, j);
						if (la === null) {
							M === null && (M = Le);
							break;
						}
						t && M && la.alternate === null && r(x, M), P = d(la, P, ie), Ue === null ? q = la : Ue.sibling = la, Ue = la, M = Le;
					}
					if (Se.done) return a(x, M), ne && io(x, ie), q;
					if (M === null) {
						for (; !Se.done; ie++, Se = E.next()) Se = U(x, Se.value, j), Se !== null && (P = d(Se, P, ie), Ue === null ? q = Se : Ue.sibling = Se, Ue = Se);
						return ne && io(x, ie), q;
					}
					for (M = l(M); !Se.done; ie++, Se = E.next()) Se = fe(M, x, ie, Se.value, j), Se !== null && (t && (Le = Se.alternate, Le !== null && M.delete(Le.key === null ? ie : Le.key)), P = d(Se, P, ie), Ue === null ? q = Se : Ue.sibling = Se, Ue = Se);
					return t && M.forEach(function(V0) {
						return r(x, V0);
					}), ne && io(x, ie), q;
				}
				function ia(x, P, E, j) {
					if (typeof E == "object" && E !== null && E.type === wo && E.key === null && E.props.ref === void 0 && (E = E.props.children), typeof E == "object" && E !== null) {
						switch (E.$$typeof) {
							case Ia:
								e: {
									for (var q = E.key; P !== null;) {
										if (P.key === q) {
											if (q = E.type, q === wo) {
												if (P.tag === 7) {
													a(x, P.sibling), j = c(P, E.props.children), zr(j, E), j.return = x, x = j;
													break e;
												}
											} else if (P.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Ra && co(q) === P.type) {
												a(x, P.sibling), j = c(P, E.props), zr(j, E), j.return = x, x = j;
												break e;
											}
											a(x, P);
											break;
										} else r(x, P);
										P = P.sibling;
									}
									E.type === wo ? (j = Na(E.props.children, x.mode, j, E.key), zr(j, E), j.return = x, x = j) : (j = Vt(E.type, E.key, E.props, null, x.mode, j), zr(j, E), j.return = x, x = j);
								}
								return h(x);
							case Si:
								e: {
									for (q = E.key; P !== null;) {
										if (P.key === q) {
											if (P.tag === 4 && P.stateNode.containerInfo === E.containerInfo && P.stateNode.implementation === E.implementation) {
												a(x, P.sibling), j = c(P, E.children || []), j.return = x, x = j;
												break e;
											} else {
												a(x, P);
												break;
											}
										} else r(x, P);
										P = P.sibling;
									}
									j = Ta(E, x.mode, j), j.return = x, x = j;
								}
								return h(x);
							case Ra: return E = co(E), ia(x, P, E, j);
						}
						if (wi(E)) return Ne(x, P, E, j);
						if (Ss(E)) {
							if (q = Ss(E), typeof q != "function") throw Error(F(150));
							return E = q.call(E), Re(x, P, E, j);
						}
						if (typeof E.then == "function") return ia(x, P, al(E), j);
						if (E.$$typeof === Vr) return ia(x, P, Es(x, E), j);
						Is(x, E);
					}
					return typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint" ? (E = "" + E, P !== null && P.tag === 6 ? (a(x, P.sibling), j = c(P, E), j.return = x, x = j) : (a(x, P), j = wu(E, x.mode, j), j.return = x, x = j), h(x)) : a(x, P);
				}
				return function(x, P, E, j) {
					try {
						Au = 0;
						var q = ia(x, P, E, j);
						return Zl = null, q;
					} catch (M) {
						if (M === Jl || M === Wd) throw M;
						var Ue = et(29, M, null, x.mode);
						return Ue.lanes = j, Ue.return = x, Ue;
					}
				};
			}
			function Wo() {
				for (var t = Xl, r = bh = Xl = 0; r < t;) {
					var a = mr[r];
					mr[r++] = null;
					var l = mr[r];
					mr[r++] = null;
					var c = mr[r];
					mr[r++] = null;
					var d = mr[r];
					if (mr[r++] = null, l !== null && c !== null) {
						var h = l.pending;
						h === null ? c.next = c : (c.next = h.next, h.next = c), l.pending = c;
					}
					d !== 0 && Rs(a, c, d);
				}
			}
			function fo(t, r, a, l) {
				mr[Xl++] = t, mr[Xl++] = r, mr[Xl++] = a, mr[Xl++] = l, bh |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
			}
			function kc(t, r, a, l) {
				return fo(t, r, a, l), il(t);
			}
			function Er(t, r) {
				return fo(t, null, null, r), il(t);
			}
			function Rs(t, r, a) {
				t.lanes |= a;
				var l = t.alternate;
				l !== null && (l.lanes |= a);
				for (var c = !1, d = t.return; d !== null;) d.childLanes |= a, l = d.alternate, l !== null && (l.childLanes |= a), d.tag === 22 && (t = d.stateNode, t === null || t._visibility & 1 || (c = !0)), t = d, d = d.return;
				return t.tag === 3 ? (d = t.stateNode, c && r !== null && (c = 31 - sn(a), t = d.hiddenUpdates, l = t[c], l === null ? t[c] = [r] : l.push(r), r.lane = a | 536870912), d) : null;
			}
			function il(t) {
				if (50 < rs) throw rs = 0, Qu = null, Error(F(185));
				for (var r = t.return; r !== null;) t = r, r = t.return;
				return t.tag === 3 ? t.stateNode : null;
			}
			function ii(t) {
				t.updateQueue = {
					baseState: t.memoizedState,
					firstBaseUpdate: null,
					lastBaseUpdate: null,
					shared: {
						pending: null,
						lanes: 0,
						hiddenCallbacks: null
					},
					callbacks: null
				};
			}
			function Sa(t, r) {
				t = t.updateQueue, r.updateQueue === t && (r.updateQueue = {
					baseState: t.baseState,
					firstBaseUpdate: t.firstBaseUpdate,
					lastBaseUpdate: t.lastBaseUpdate,
					shared: t.shared,
					callbacks: null
				});
			}
			function po(t) {
				return {
					lane: t,
					tag: 0,
					payload: null,
					callback: null,
					next: null
				};
			}
			function ka(t, r, a) {
				var l = t.updateQueue;
				if (l === null) return null;
				if (l = l.shared, (de & 2) !== 0) {
					var c = l.pending;
					return c === null ? r.next = r : (r.next = c.next, c.next = r), l.pending = r, r = il(t), Rs(t, null, a), r;
				}
				return fo(t, l, r, a), il(t);
			}
			function Ls(t, r, a) {
				if (r = r.updateQueue, r !== null && (r = r.shared, (a & 4194048) !== 0)) {
					var l = r.lanes;
					l &= t.pendingLanes, a |= l, r.lanes = a, G(t, a);
				}
			}
			function wc(t, r) {
				var a = t.updateQueue, l = t.alternate;
				if (l !== null && (l = l.updateQueue, a === l)) {
					var c = null, d = null;
					if (a = a.firstBaseUpdate, a !== null) {
						do {
							var h = {
								lane: a.lane,
								tag: a.tag,
								payload: a.payload,
								callback: null,
								next: null
							};
							d === null ? c = d = h : d = d.next = h, a = a.next;
						} while (a !== null);
						d === null ? c = d = r : d = d.next = r;
					} else c = d = r;
					a = {
						baseState: l.baseState,
						firstBaseUpdate: c,
						lastBaseUpdate: d,
						shared: l.shared,
						callbacks: l.callbacks
					}, t.updateQueue = a;
					return;
				}
				t = a.lastBaseUpdate, t === null ? a.firstBaseUpdate = r : t.next = r, a.lastBaseUpdate = r;
			}
			function li() {
				if (yh) {
					var t = Gl;
					if (t !== null) throw t;
				}
			}
			function ll(t, r, a, l) {
				yh = !1;
				var c = t.updateQueue;
				na = !1;
				var d = c.firstBaseUpdate, h = c.lastBaseUpdate, y = c.shared.pending;
				if (y !== null) {
					c.shared.pending = null;
					var C = y, R = C.next;
					C.next = null, h === null ? d = R : h.next = R, h = C;
					var D = t.alternate;
					D !== null && (D = D.updateQueue, y = D.lastBaseUpdate, y !== h && (y === null ? D.firstBaseUpdate = R : y.next = R, D.lastBaseUpdate = C));
				}
				if (d !== null) {
					var U = c.baseState;
					h = 0, D = R = C = null, y = d;
					do {
						var A = y.lane & -536870913, fe = A !== y.lane;
						if (fe ? (ye & A) === A : (l & A) === A) {
							A !== 0 && A === Ii && (yh = !0), D !== null && (D = D.next = {
								lane: 0,
								tag: y.tag,
								payload: y.payload,
								callback: null,
								next: null
							});
							e: {
								var Ne = t, Re = y;
								A = r;
								var ia = a;
								switch (Re.tag) {
									case 1:
										if (Ne = Re.payload, typeof Ne == "function") {
											U = Ne.call(ia, U, A);
											break e;
										}
										U = Ne;
										break e;
									case 3: Ne.flags = Ne.flags & -65537 | 128;
									case 0:
										if (Ne = Re.payload, A = typeof Ne == "function" ? Ne.call(ia, U, A) : Ne, A == null) break e;
										U = Lp({}, U, A);
										break e;
									case 2: na = !0;
								}
							}
							A = y.callback, A !== null && (t.flags |= 64, fe && (t.flags |= 8192), fe = c.callbacks, fe === null ? c.callbacks = [A] : fe.push(A));
						} else fe = {
							lane: A,
							tag: y.tag,
							payload: y.payload,
							callback: y.callback,
							next: null
						}, D === null ? (R = D = fe, C = U) : D = D.next = fe, h |= A;
						if (y = y.next, y === null) {
							if (y = c.shared.pending, y === null) break;
							fe = y, y = fe.next, fe.next = null, c.lastBaseUpdate = fe, c.shared.pending = null;
						}
					} while (!0);
					D === null && (C = U), c.baseState = C, c.firstBaseUpdate = R, c.lastBaseUpdate = D, d === null && (c.shared.lanes = 0), aa |= h, t.lanes = h, t.memoizedState = U;
				}
			}
			function fm(t, r) {
				if (typeof t != "function") throw Error(F(191, t));
				t.call(r);
			}
			function B(t, r) {
				var a = t.callbacks;
				if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) fm(a[t], r);
			}
			function Pc(t, r) {
				t = oa, Te(Od, t), Te(Ba, r), oa = t | r.baseLanes;
			}
			function Ao() {
				Te(Od, oa), Te(Ba, Ba.current);
			}
			function xc() {
				oa = Od.current, W(Ba), W(Od);
			}
			function _r(t) {
				var r = t.alternate;
				Te(Xn, Xn.current & 1), Te(Zn, t), lt === null && (r === null || Ba.current !== null || r.memoizedState !== null) && (lt = t);
			}
			function Nr(t) {
				Te(Xn, Xn.current), Te(Zn, t), lt === null && (lt = t);
			}
			function Wf(t) {
				t.tag === 22 ? (Te(Xn, Xn.current), Te(Zn, t), lt === null && (lt = t)) : Tr();
			}
			function Tr() {
				Te(Xn, Xn.current), Te(Zn, Zn.current);
			}
			function Ln(t) {
				W(Zn), lt === t && (lt = null), W(Xn);
			}
			function sl(t, r) {
				Te(Zn, Zn.current), Te(Xn, r);
			}
			function Oo(t) {
				W(Xn), W(Zn), lt === t && (lt = null);
			}
			function ul(t) {
				for (var r = t; r !== null;) {
					if (r.tag === 13) {
						var a = r.memoizedState;
						if (a !== null && (a = a.dehydrated, a === null || Gp(a) || Jp(a))) return r;
					} else if (r.tag === 19 && r.memoizedProps.revealOrder !== "independent") {
						if ((r.flags & 128) !== 0) return r;
					} else if (r.child !== null) {
						r.child.return = r, r = r.child;
						continue;
					}
					if (r === t) break;
					for (; r.sibling === null;) {
						if (r.return === null || r.return === t) return null;
						r = r.return;
					}
					r.sibling.return = r.return, r = r.sibling;
				}
				return null;
			}
			function Ve() {
				throw Error(F(321));
			}
			function Fs(t, r) {
				if (r === null) return !1;
				for (var a = 0; a < r.length && a < t.length; a++) if (!$t(t[a], r[a])) return !1;
				return !0;
			}
			function cl(t, r, a, l, c, d) {
				return ta = d, re = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, Q.H = t === null || t.memoizedState === null ? Eg : _g, Fi = !1, d = a(l, c), Fi = !1, ra && (d = ho(r, a, l, c)), Bo(t), d;
			}
			function Bo(t) {
				Q.H = Bu;
				var r = De !== null && De.next !== null;
				if (ta = 0, un = De = re = null, Bd = !1, Ou = 0, Yl = null, r) throw Error(F(300));
				t === null || Pn || (t = t.dependencies, t !== null && oi(t) && (Pn = !0));
			}
			function ho(t, r, a, l) {
				re = t;
				var c = 0;
				do {
					if (ra && (Yl = null), Ou = 0, ra = !1, 25 <= c) throw Error(F(301));
					if (c += 1, un = De = null, t.updateQueue != null) {
						var d = t.updateQueue;
						d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
					}
					Q.H = B0, d = r(a, l);
				} while (ra);
				return d;
			}
			function Cc() {
				var t = Q.H, r = t.useState()[0];
				return r = typeof r.then == "function" ? fl(r) : r, t = t.useState()[0], (De !== null ? De.memoizedState : null) !== t && (re.flags |= 1024), r;
			}
			function Ds() {
				var t = Hd !== 0;
				return Hd = 0, t;
			}
			function Ho(t, r, a) {
				r.updateQueue = t.updateQueue, r.flags &= -2053, t.lanes &= ~a;
			}
			function dl(t) {
				if (Bd) {
					for (t = t.memoizedState; t !== null;) {
						var r = t.queue;
						r !== null && (r.pending = null), t = t.next;
					}
					Bd = !1;
				}
				ta = 0, un = De = re = null, ra = !1, Ou = Hd = 0, Yl = null;
			}
			function gn() {
				var t = {
					memoizedState: null,
					baseState: null,
					baseQueue: null,
					queue: null,
					next: null
				};
				return un === null ? re.memoizedState = un = t : un = un.next = t, un;
			}
			function K() {
				if (De === null) {
					var t = re.alternate;
					t = t !== null ? t.memoizedState : null;
				} else t = De.next;
				var r = un === null ? re.memoizedState : un.next;
				if (r !== null) un = r, De = t;
				else {
					if (t === null) throw re.alternate === null ? Error(F(467)) : Error(F(310));
					De = t, t = {
						memoizedState: De.memoizedState,
						baseState: De.baseState,
						baseQueue: De.baseQueue,
						queue: De.queue,
						next: null
					}, un === null ? re.memoizedState = un = t : un = un.next = t;
				}
				return un;
			}
			function si() {
				return {
					lastEffect: null,
					events: null,
					stores: null,
					memoCache: null
				};
			}
			function fl(t) {
				var r = Ou;
				return Ou += 1, Yl === null && (Yl = []), t = Uo(Yl, t, r), r = re, (un === null ? r.memoizedState : un.next) === null && (r = r.alternate, Q.H = r === null || r.memoizedState === null ? Eg : _g), t;
			}
			function pl(t) {
				if (t !== null && typeof t == "object") {
					if (typeof t.then == "function") return fl(t);
					if (t.$$typeof === Im) return;
					if (t.$$typeof === Vr) return Me(t);
				}
				throw Error(F(438, String(t)));
			}
			function Mo(t) {
				var r = null, a = re.updateQueue;
				if (a !== null && (r = a.memoCache), r == null) {
					var l = re.alternate;
					l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (r = {
						data: l.data.map(function(c) {
							return c.slice();
						}),
						index: 0
					})));
				}
				if (r ??= {
					data: [],
					index: 0
				}, a === null && (a = si(), re.updateQueue = a), a.memoCache = r, a = r.data[r.index], a === void 0) for (a = r.data[r.index] = Array(t), l = 0; l < t; l++) a[l] = Tm;
				return r.index++, a;
			}
			function Bt(t, r) {
				return typeof r == "function" ? r(t) : r;
			}
			function js(t) {
				return Af(K(), De, t);
			}
			function Af(t, r, a) {
				var l = t.queue;
				if (l === null) throw Error(F(311));
				l.lastRenderedReducer = a;
				var c = t.baseQueue, d = l.pending;
				if (d !== null) {
					if (c !== null) {
						var h = c.next;
						c.next = d.next, d.next = h;
					}
					r.baseQueue = c = d, l.pending = null;
				}
				if (d = t.baseState, c === null) t.memoizedState = d;
				else {
					r = c.next;
					var y = h = null, C = null, R = r, D = !1;
					do {
						var U = R.lane & -536870913;
						if (U !== R.lane ? (ye & U) === U : (ta & U) === U) {
							var A = R.revertLane;
							if (A === 0) C !== null && (C = C.next = {
								lane: 0,
								revertLane: 0,
								gesture: null,
								action: R.action,
								hasEagerState: R.hasEagerState,
								eagerState: R.eagerState,
								next: null
							}), U === Ii && (D = !0);
							else if ((ta & A) === A) {
								R = R.next, A === Ii && (D = !0);
								continue;
							} else U = {
								lane: 0,
								revertLane: R.revertLane,
								gesture: null,
								action: R.action,
								hasEagerState: R.hasEagerState,
								eagerState: R.eagerState,
								next: null
							}, C === null ? (y = C = U, h = d) : C = C.next = U, re.lanes |= A, aa |= A;
							U = R.action, Fi && a(d, U), d = R.hasEagerState ? R.eagerState : a(d, U);
						} else A = {
							lane: U,
							revertLane: R.revertLane,
							gesture: R.gesture,
							action: R.action,
							hasEagerState: R.hasEagerState,
							eagerState: R.eagerState,
							next: null
						}, C === null ? (y = C = A, h = d) : C = C.next = A, re.lanes |= U, aa |= U;
						R = R.next;
					} while (R !== null && R !== r);
					if (C === null ? h = d : C.next = y, !$t(d, t.memoizedState) && (Pn = !0, D && (a = Gl, a !== null))) throw a;
					t.memoizedState = d, t.baseState = h, t.baseQueue = C, l.lastRenderedState = d;
				}
				return c === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
			}
			function tr(t) {
				var r = K(), a = r.queue;
				if (a === null) throw Error(F(311));
				a.lastRenderedReducer = t;
				var l = a.dispatch, c = a.pending, d = r.memoizedState;
				if (c !== null) {
					a.pending = null;
					var h = c = c.next;
					do
						d = t(d, h.action), h = h.next;
					while (h !== c);
					$t(d, r.memoizedState) || (Pn = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), a.lastRenderedState = d;
				}
				return [d, l];
			}
			function pm(t, r, a) {
				var l = re, c = K(), d = ne;
				if (d) {
					if (a === void 0) throw Error(F(407));
					a = a();
				} else a = r();
				var h = !$t((De || c).memoizedState, a);
				if (h && (c.memoizedState = a, Pn = !0), c = c.queue, _c(hl.bind(null, l, c, t), [t]), t = c.getSnapshot !== r || h || un !== null && (un.memoizedState.tag & 1) !== 0, Ur(t ? 9 : 8, { destroy: void 0 }, Us.bind(null, l, c, a, r), null), t) {
					if (l.flags |= 2048, Be === null) throw Error(F(349));
					d || ta & 127 || mo(l, r, a);
				}
				return a;
			}
			function mo(t, r, a) {
				t.flags |= 16384, t = {
					getSnapshot: r,
					value: a
				}, r = re.updateQueue, r === null ? (r = si(), re.updateQueue = r, r.stores = [t]) : (a = r.stores, a === null ? r.stores = [t] : a.push(t));
			}
			function Us(t, r, a, l) {
				r.value = a, r.getSnapshot = l, Ws(r) && Pt(t);
			}
			function hl(t, r, a) {
				return a(function() {
					Ws(r) && Pt(t);
				});
			}
			function Ws(t) {
				var r = t.getSnapshot;
				t = t.value;
				try {
					var a = r();
					return !$t(t, a);
				} catch {
					return !0;
				}
			}
			function Pt(t) {
				var r = Er(t, 2);
				r !== null && yt(r, t, 2);
			}
			function gt(t) {
				var r = gn();
				if (typeof t == "function") {
					var a = t;
					if (t = a(), Fi) {
						ga(!0);
						try {
							a();
						} finally {
							ga(!1);
						}
					}
				}
				return r.memoizedState = r.baseState = t, r.queue = {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Bt,
					lastRenderedState: t
				}, r;
			}
			function Ir(t, r, a, l) {
				return t.baseState = a, Af(t, De, typeof l == "function" ? l : Bt);
			}
			function go(t, r, a, l, c) {
				if (Wr(t)) throw Error(F(485));
				if (t = r.action, t !== null) {
					var d = {
						payload: c,
						action: t,
						next: null,
						isTransition: !0,
						status: "pending",
						value: null,
						reason: null,
						listeners: [],
						then: function(h) {
							d.listeners.push(h);
						}
					};
					Q.T !== null ? a(!0) : d.isTransition = !1, l(d), a = r.pending, a === null ? (d.next = r.pending = d, Rr(r, d)) : (d.next = a.next, r.pending = a.next = d);
				}
			}
			function Rr(t, r) {
				var a = r.action, l = r.payload, c = t.state;
				if (r.isTransition) {
					var d = Q.T, h = {};
					h.types = d !== null ? d.types : null, Q.T = h;
					try {
						var y = a(c, l), C = Q.S;
						C !== null && C(h, y), Lr(t, r, y);
					} catch (R) {
						As(t, r, R);
					} finally {
						d !== null && h.types !== null && (d.types = h.types), Q.T = d;
					}
				} else try {
					d = a(c, l), Lr(t, r, d);
				} catch (R) {
					As(t, r, R);
				}
			}
			function Lr(t, r, a) {
				a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(l) {
					zc(t, r, l);
				}, function(l) {
					return As(t, r, l);
				}) : zc(t, r, a);
			}
			function zc(t, r, a) {
				r.status = "fulfilled", r.value = a, Of(r), t.state = a, r = t.pending, r !== null && (a = r.next, a === r ? t.pending = null : (a = a.next, r.next = a, Rr(t, a)));
			}
			function As(t, r, a) {
				var l = t.pending;
				if (t.pending = null, l !== null) {
					l = l.next;
					do
						r.status = "rejected", r.reason = a, Of(r), r = r.next;
					while (r !== l);
				}
				t.action = null;
			}
			function Of(t) {
				t = t.listeners;
				for (var r = 0; r < t.length; r++) (0, t[r])();
			}
			function Fr(t, r) {
				return r;
			}
			function Bf(t, r) {
				if (ne) {
					var a = Be.formState;
					if (a !== null) {
						e: {
							var l = re;
							if (ne) {
								if (Qe) {
									var c = Zp(Qe, hr);
									if (c) {
										Qe = Nd(c), l = Xp(c);
										break e;
									}
								}
								Mn(l);
							}
							l = !1;
						}
						l && (r = a[0]);
					}
				}
				a = gn(), a.memoizedState = a.baseState = r, l = {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Fr,
					lastRenderedState: r
				}, a.queue = l, a = Tc.bind(null, re, l), l.dispatch = a, l = gt(!1);
				var d = yl.bind(null, re, !1, l.queue);
				return l = gn(), c = {
					state: r,
					dispatch: null,
					action: t,
					pending: null
				}, l.queue = c, a = go.bind(null, re, c, d, a), c.dispatch = a, l.memoizedState = t, [
					r,
					a,
					!1
				];
			}
			function Dr(t) {
				return ml(K(), De, t);
			}
			function ml(t, r, a) {
				if (r = Af(t, r, Fr)[0], t = js(Bt)[0], typeof r == "object" && r !== null && typeof r.then == "function") try {
					var l = fl(r);
				} catch (h) {
					throw h === Jl ? Wd : h;
				}
				else l = r;
				r = K();
				var c = r.queue, d = c.dispatch;
				return a !== r.memoizedState && (re.flags |= 2048, Ur(9, { destroy: void 0 }, Ec.bind(null, c, a), null)), [
					l,
					d,
					t
				];
			}
			function Ec(t, r) {
				t.action = r;
			}
			function jr(t) {
				var r = K(), a = De;
				if (a !== null) return ml(r, a, t);
				K(), r = r.memoizedState, a = K();
				var l = a.queue.dispatch;
				return a.memoizedState = t, [
					r,
					l,
					!1
				];
			}
			function Ur(t, r, a, l) {
				return t = {
					tag: t,
					create: a,
					deps: l,
					inst: r,
					next: null
				}, r = re.updateQueue, r === null && (r = si(), re.updateQueue = r), a = r.lastEffect, a === null ? r.lastEffect = t.next = t : (l = a.next, a.next = t, t.next = l, r.lastEffect = t), t;
			}
			function Hf() {
				return K().memoizedState;
			}
			function gl(t, r, a, l) {
				var c = gn();
				re.flags |= t, c.memoizedState = Ur(1 | r, { destroy: void 0 }, a, l === void 0 ? null : l);
			}
			function Os(t, r, a, l) {
				var c = K();
				l = l === void 0 ? null : l;
				var d = c.memoizedState.inst;
				De !== null && l !== null && Fs(l, De.memoizedState.deps) ? c.memoizedState = Ur(r, d, a, l) : (re.flags |= t, c.memoizedState = Ur(1 | r, d, a, l));
			}
			function Mf(t, r) {
				gl(8390656, 8, t, r);
			}
			function _c(t, r) {
				Os(2048, 8, t, r);
			}
			function Vf(t) {
				re.flags |= 4;
				var r = re.updateQueue;
				if (r === null) r = si(), re.updateQueue = r, r.events = [t];
				else {
					var a = r.events;
					a === null ? r.events = [t] : a.push(t);
				}
			}
			function $f(t) {
				var r = K().memoizedState;
				return Vf({
					ref: r,
					nextImpl: t
				}), function() {
					if ((de & 2) !== 0) throw Error(F(440));
					return r.impl.apply(void 0, arguments);
				};
			}
			function Nc(t, r) {
				return Os(4, 2, t, r);
			}
			function hm(t, r) {
				return Os(4, 4, t, r);
			}
			function Qf(t, r) {
				if (typeof r == "function") {
					t = t();
					var a = r(t);
					return function() {
						typeof a == "function" ? a() : r(null);
					};
				}
				if (r != null) return t = t(), r.current = t, function() {
					r.current = null;
				};
			}
			function mm(t, r, a) {
				a = a != null ? a.concat([t]) : null, Os(4, 4, Qf.bind(null, r, t), a);
			}
			function Bs() {}
			function Hs(t, r) {
				var a = K();
				r = r === void 0 ? null : r;
				var l = a.memoizedState;
				return r !== null && Fs(r, l[1]) ? l[0] : (a.memoizedState = [t, r], t);
			}
			function qf(t, r) {
				var a = K();
				r = r === void 0 ? null : r;
				var l = a.memoizedState;
				if (r !== null && Fs(r, l[1])) return l[0];
				if (l = t(), Fi) {
					ga(!0);
					try {
						t();
					} finally {
						ga(!1);
					}
				}
				return a.memoizedState = [l, r], l;
			}
			function bl(t, r, a) {
				return a === void 0 || (ta & 1073741824) !== 0 && (ye & 261930) === 0 ? t.memoizedState = r : (t.memoizedState = a, t = vp(), re.lanes |= t, aa |= t, a);
			}
			function Gf(t, r, a, l) {
				return $t(a, r) ? a : Ba.current !== null ? (t = bl(t, a, l), $t(t, r) || (Pn = !0), t) : (ta & 106) === 0 || (ta & 1073741824) !== 0 && (ye & 261930) === 0 ? (Pn = !0, t.memoizedState = a) : (t = vp(), re.lanes |= t, aa |= t, r);
			}
			function Jf(t, r, a, l, c) {
				var d = sr();
				jn(d !== 0 && 8 > d ? d : 8);
				var h = Q.T, y = {};
				y.types = h !== null ? h.types : null, Q.T = y, yl(t, !1, r, a);
				try {
					var C = c(), R = Q.S;
					if (R !== null && R(y, C), C !== null && typeof C == "object" && typeof C.then == "function") wa(t, r, dm(C, l), zt(t));
					else wa(t, r, l, zt(t));
				} catch (U) {
					wa(t, r, {
						then: function() {},
						status: "rejected",
						reason: U
					}, zt());
				} finally {
					jn(d), h !== null && y.types !== null && (h.types = y.types), Q.T = h;
				}
			}
			function Zf(t) {
				var r = t.memoizedState;
				if (r !== null) return r;
				r = {
					memoizedState: Fa,
					baseState: Fa,
					baseQueue: null,
					queue: {
						pending: null,
						lanes: 0,
						dispatch: null,
						lastRenderedReducer: Bt,
						lastRenderedState: Fa
					},
					next: null
				};
				var a = {};
				return r.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: {
						pending: null,
						lanes: 0,
						dispatch: null,
						lastRenderedReducer: Bt,
						lastRenderedState: a
					},
					next: null
				}, t.memoizedState = r, t = t.alternate, t !== null && (t.memoizedState = r), r;
			}
			function bo() {
				return Me($r);
			}
			function Xf() {
				return K().memoizedState;
			}
			function Yf() {
				return K().memoizedState;
			}
			function gm(t) {
				for (var r = t.return; r !== null;) {
					switch (r.tag) {
						case 24:
						case 3:
							var a = zt();
							t = po(a);
							var l = ka(r, t, a);
							l !== null && (yt(l, r, a), Ls(l, r, a)), r = { cache: _s() }, t.payload = r;
							return;
					}
					r = r.return;
				}
			}
			function bt(t, r, a) {
				var l = zt();
				a = {
					lane: l,
					revertLane: 0,
					gesture: null,
					action: a,
					hasEagerState: !1,
					eagerState: null,
					next: null
				}, Wr(t) ? Kf(r, a) : (a = kc(t, r, a, l), a !== null && (yt(a, t, l), Ms(a, r, l)));
			}
			function Tc(t, r, a) {
				wa(t, r, a, zt());
			}
			function wa(t, r, a, l) {
				var c = {
					lane: l,
					revertLane: 0,
					gesture: null,
					action: a,
					hasEagerState: !1,
					eagerState: null,
					next: null
				};
				if (Wr(t)) Kf(r, c);
				else {
					var d = t.alternate;
					if (t.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
						var h = r.lastRenderedState, y = d(h, a);
						if (c.hasEagerState = !0, c.eagerState = y, $t(y, h)) return fo(t, r, c, 0), Be === null && Wo(), !1;
					} catch {}
					if (a = kc(t, r, c, l), a !== null) return yt(a, t, l), Ms(a, r, l), !0;
				}
				return !1;
			}
			function yl(t, r, a, l) {
				if (l = {
					lane: 2,
					revertLane: Sc(),
					gesture: null,
					action: l,
					hasEagerState: !1,
					eagerState: null,
					next: null
				}, Wr(t)) {
					if (r) throw Error(F(479));
				} else r = kc(t, a, l, 2), r !== null && yt(r, t, 2);
			}
			function Wr(t) {
				var r = t.alternate;
				return t === re || r !== null && r === re;
			}
			function Kf(t, r) {
				ra = Bd = !0;
				var a = t.pending;
				a === null ? r.next = r : (r.next = a.next, a.next = r), t.pending = r;
			}
			function Ms(t, r, a) {
				if ((a & 4194048) !== 0) {
					var l = r.lanes;
					l &= t.pendingLanes, a |= l, r.lanes = a, G(t, a);
				}
			}
			function Ic(t, r, a, l) {
				r = t.memoizedState, a = a(l, r), a = a == null ? r : Lp({}, r, a), t.memoizedState = a, t.lanes === 0 && (t.updateQueue.baseState = a);
			}
			function Vs(t, r, a, l, c, d, h) {
				return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, d, h) : r.prototype && r.prototype.isPureReactComponent ? !Ts(a, l) || !Ts(c, d) : !0;
			}
			function ep(t, r, a, l) {
				t = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(a, l), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(a, l), r.state !== t && Md.enqueueReplaceState(r, r.state, null);
			}
			function yo(t, r) {
				var a = r;
				if ("ref" in r) {
					a = {};
					for (var l in r) l !== "ref" && (a[l] = r[l]);
				}
				if (t = t.defaultProps) {
					a === r && (a = Lp({}, a));
					for (var c in t) a[c] === void 0 && (a[c] = t[c]);
				}
				return a;
			}
			function $s(t, r) {
				try {
					var a = t.onUncaughtError;
					a(r.value, { componentStack: r.stack });
				} catch (l) {
					setTimeout(function() {
						throw l;
					});
				}
			}
			function np(t, r, a) {
				try {
					var l = t.onCaughtError;
					l(a.value, {
						componentStack: a.stack,
						errorBoundary: r.tag === 1 ? r.stateNode : null
					});
				} catch (c) {
					setTimeout(function() {
						throw c;
					});
				}
			}
			function vl(t, r, a) {
				return a = po(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
					$s(t, r);
				}, a;
			}
			function Qs(t) {
				return t = po(t), t.tag = 3, t;
			}
			function Rc(t, r, a, l) {
				var c = a.type.getDerivedStateFromError;
				if (typeof c == "function") {
					var d = l.value;
					t.payload = function() {
						return c(d);
					}, t.callback = function() {
						np(r, a, l);
					};
				}
				var h = a.stateNode;
				h !== null && typeof h.componentDidCatch == "function" && (t.callback = function() {
					np(r, a, l), typeof c != "function" && (Va === null ? Va = /* @__PURE__ */ new Set([this]) : Va.add(this));
					var y = l.stack;
					this.componentDidCatch(l.value, { componentStack: y !== null ? y : "" });
				});
			}
			function tt(t, r, a, l, c) {
				if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
					if (r = a.alternate, r !== null && so(r, a, c, !0), a = Zn.current, a !== null) {
						switch (a.tag) {
							case 31:
							case 13:
							case 19: return lt === null ? Rl() : a.alternate === null && cn === 0 && (cn = 3), a.flags &= -257, a.flags |= 65536, a.lanes = c, l === Ad ? a.flags |= 16384 : (r = a.updateQueue, r === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : r.add(l), dd(t, l, c)), !1;
							case 22: return a.flags |= 65536, l === Ad ? a.flags |= 16384 : (r = a.updateQueue, r === null ? (r = {
								transitions: null,
								markerInstances: null,
								retryQueue: /* @__PURE__ */ new Set([l])
							}, a.updateQueue = r) : (a = r.retryQueue, a === null ? r.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), dd(t, l, c)), !1;
						}
						throw Error(F(435, a.tag));
					}
					return dd(t, l, c), Rl(), !1;
				}
				if (ne) return r = Zn.current, r !== null ? (!(r.flags & 65536) && (r.flags |= 256), r.flags |= 65536, r.lanes = c, l !== hh && (t = Error(F(422), { cause: l }), va(Kt(t, a)))) : (l !== hh && (r = Error(F(423), { cause: l }), va(Kt(r, a))), t = t.current.alternate, t.flags |= 65536, c &= -c, t.lanes |= c, l = Kt(l, a), c = vl(t.stateNode, l, c), wc(t, c), cn !== 4 && (cn = 2)), !1;
				var d = Error(F(520), { cause: l });
				if (d = Kt(d, a), Vu === null ? Vu = [d] : Vu.push(d), cn !== 4 && (cn = 2), r === null) return !0;
				l = Kt(l, a), a = r;
				do {
					switch (a.tag) {
						case 3: return a.flags |= 65536, t = c & -c, a.lanes |= t, t = vl(a.stateNode, l, t), wc(a, t), !1;
						case 1:
							if (r = a.type, d = a.stateNode, (a.flags & 128) === 0 && (typeof r.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Va === null || !Va.has(d)))) return a.flags |= 65536, c &= -c, a.lanes |= c, c = Qs(c), Rc(c, t, a, l), wc(a, c), !1;
							break;
						case 22: if (a.memoizedState !== null) return a.flags |= 65536, !1;
					}
					a = a.return;
				} while (a !== null);
				return !1;
			}
			function wn(t, r, a, l) {
				r.child = t === null ? zg(r, null, a, l) : Li(r, t.child, a, l);
			}
			function qs(t, r, a, l, c) {
				a = a.render;
				var d = r.ref;
				if ("ref" in l) {
					var h = {};
					for (var y in l) y !== "ref" && (h[y] = l[y]);
				} else h = l;
				return Do(r), l = cl(t, r, a, h, d, c), y = Ds(), t !== null && !Pn ? (Ho(t, r, c), Ee(t, r, c)) : (ne && y && Ps(r), r.flags |= 1, wn(t, r, l, c), r.child);
			}
			function Lc(t, r, a, l, c) {
				if (t === null) {
					var d = a.type;
					return typeof d == "function" && !_p(d) && d.defaultProps === void 0 && a.compare === null ? (r.tag = 15, r.type = d, Fc(t, r, d, l, c)) : (t = Vt(a.type, null, l, r, r.mode, c), t.ref = r.ref, t.return = r, r.child = t);
				}
				if (d = t.child, !Ks(t, c)) {
					var h = d.memoizedProps;
					if (a = a.compare, a = a !== null ? a : Ts, a(h, l) && t.ref === r.ref) return Ee(t, r, c);
				}
				return r.flags |= 1, t = Zo(d, l), t.ref = r.ref, t.return = r, r.child = t;
			}
			function Fc(t, r, a, l, c) {
				if (t !== null) {
					var d = t.memoizedProps;
					if (Ts(d, l) && t.ref === r.ref) if (Pn = !1, r.pendingProps = l = d, Ks(t, c)) t.flags & 131072 && (Pn = !0);
					else return r.lanes = t.lanes, Ee(t, r, c);
				}
				return tp(t, r, a, l, c);
			}
			function Vo(t, r, a, l) {
				var c = l.children, d = t !== null ? t.memoizedState : null;
				if (t === null && r.stateNode === null && (r.stateNode = {
					_visibility: 1,
					_pendingMarkers: null,
					_retryCache: null,
					_transitions: null
				}), l.mode === "hidden") {
					if ((r.flags & 128) !== 0) {
						if (d = d !== null ? d.baseLanes | a : a, t !== null) {
							for (l = r.child = t.child, c = 0; l !== null;) c = c | l.lanes | l.childLanes, l = l.sibling;
							l = c & ~d;
						} else l = 0, r.child = null;
						return Sl(t, r, d, a, l);
					}
					if ((a & 536870912) !== 0) r.memoizedState = {
						baseLanes: 0,
						cachePool: null
					}, t !== null && ol(r, d !== null ? d.cachePool : null), d !== null ? Pc(r, d) : Ao(), Wf(r);
					else return l = r.lanes = 536870912, Sl(t, r, d !== null ? d.baseLanes | a : a, a, l);
				} else d !== null ? (ol(r, d.cachePool), Pc(r, d), Tr(), r.memoizedState = null) : (t !== null && ol(r, null), Ao(), Tr());
				return wn(t, r, c, a), r.child;
			}
			function rr(t, r) {
				return t !== null && t.tag === 22 || r.stateNode !== null || (r.stateNode = {
					_visibility: 1,
					_pendingMarkers: null,
					_retryCache: null,
					_transitions: null
				}), r.sibling;
			}
			function Sl(t, r, a, l, c) {
				var d = rl();
				return d = d === null ? null : {
					parent: lr ? tn._currentValue : tn._currentValue2,
					pool: d
				}, r.memoizedState = {
					baseLanes: a,
					cachePool: d
				}, t !== null && ol(r, null), Ao(), Wf(r), t !== null && so(t, r, l, !0), r.childLanes = c, null;
			}
			function ui(t, r) {
				return r = Ar({
					mode: r.mode,
					children: r.children
				}, t.mode), r.ref = t.ref, t.child = r, r.return = t, r;
			}
			function kl(t, r, a) {
				return Li(r, t.child, null, a), t = ui(r, r.pendingProps), t.flags |= 2, Ln(r), r.memoizedState = null, t;
			}
			function Gs(t, r, a) {
				var l = r.pendingProps, c = (r.flags & 128) !== 0;
				if (r.flags &= -129, t === null) {
					if (ne) {
						if (l.mode === "hidden") return t = ui(r, l), r.lanes = 536870912, t.memoizedState = {
							baseLanes: 0,
							cachePool: null
						}, rr(null, t);
						if (Nr(r), (t = Qe) ? (t = cg(t, hr), t !== null && (r.memoizedState = {
							dehydrated: t,
							treeContext: _e !== null ? {
								id: _n,
								overflow: $e
							} : null,
							retryLane: 536870912,
							hydrationErrors: null
						}, a = Ll(t), a.return = r, r.child = a, Nn = r, Qe = null)) : t = null, t === null) throw Mn(r);
						return r.lanes = 536870912, null;
					}
					return ui(r, l);
				}
				var d = t.memoizedState;
				if (d !== null) {
					var h = d.dehydrated;
					if (Nr(r), c) {
						if (r.flags & 256) r.flags &= -257, r = kl(t, r, a);
						else if (r.memoizedState !== null) r.child = t.child, r.flags |= 128, r = null;
						else throw Error(F(558));
					} else if (Pn || so(t, r, a, !1), c = (a & t.childLanes) !== 0, Pn || c) {
						if (Ba.current === null) {
							if (l = Be, l !== null && (h = Wt(l, a), h !== 0 && h !== d.retryLane)) throw d.retryLane = h, Er(t, h), yt(l, t, h), vh;
							Rl();
						}
						r = kl(t, r, a);
					} else t = d.treeContext, En && (Qe = Yp(h), Nn = r, ne = !0, pr = null, hr = !1, t !== null && Rf(r, t)), r = ui(r, l), r.flags |= 134221824;
					return r;
				}
				return t = Zo(t.child, {
					mode: l.mode,
					children: l.children
				}), t.ref = r.ref, r.child = t, t.return = r, t;
			}
			function ci(t, r) {
				var a = r.ref;
				if (a === null) t !== null && t.ref !== null && (r.flags |= 4194816);
				else {
					if (typeof a != "function" && typeof a != "object") throw Error(F(284));
					(t === null || t.ref !== a) && (r.flags |= 4194816);
				}
			}
			function tp(t, r, a, l, c) {
				return Do(r), a = cl(t, r, a, l, void 0, c), l = Ds(), t !== null && !Pn ? (Ho(t, r, c), Ee(t, r, c)) : (ne && l && Ps(r), r.flags |= 1, wn(t, r, a, c), r.child);
			}
			function rp(t, r, a, l, c, d) {
				return Do(r), r.updateQueue = null, a = ho(r, l, a, c), Bo(t), l = Ds(), t !== null && !Pn ? (Ho(t, r, d), Ee(t, r, d)) : (ne && l && Ps(r), r.flags |= 1, wn(t, r, a, d), r.child);
			}
			function op(t, r, a, l, c) {
				if (Do(r), r.stateNode === null) {
					var d = Aa, h = a.contextType;
					typeof h == "object" && h !== null && (d = Me(h)), d = new a(l, d), r.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = Md, r.stateNode = d, d._reactInternals = r, d = r.stateNode, d.props = l, d.state = r.memoizedState, d.refs = {}, ii(r), h = a.contextType, d.context = typeof h == "object" && h !== null ? Me(h) : Aa, d.state = r.memoizedState, h = a.getDerivedStateFromProps, typeof h == "function" && (Ic(r, a, h, l), d.state = r.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (h = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), h !== d.state && Md.enqueueReplaceState(d, d.state, null), ll(r, l, d, c), li(), d.state = r.memoizedState), typeof d.componentDidMount == "function" && (r.flags |= 4194308), l = !0;
				} else if (t === null) {
					d = r.stateNode;
					var y = r.memoizedProps, C = yo(a, y);
					d.props = C;
					var R = d.context, D = a.contextType;
					h = Aa, typeof D == "object" && D !== null && (h = Me(D));
					var U = a.getDerivedStateFromProps;
					D = typeof U == "function" || typeof d.getSnapshotBeforeUpdate == "function", y = r.pendingProps !== y, D || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (y || R !== h) && ep(r, d, l, h), na = !1;
					var A = r.memoizedState;
					d.state = A, ll(r, l, d, c), li(), R = r.memoizedState, y || A !== R || na ? (typeof U == "function" && (Ic(r, a, U, l), R = r.memoizedState), (C = na || Vs(r, a, C, l, A, R, h)) ? (D || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = l, r.memoizedState = R), d.props = l, d.state = R, d.context = h, l = C) : (typeof d.componentDidMount == "function" && (r.flags |= 4194308), l = !1);
				} else {
					d = r.stateNode, Sa(t, r), h = r.memoizedProps, D = yo(a, h), d.props = D, U = r.pendingProps, A = d.context, R = a.contextType, C = Aa, typeof R == "object" && R !== null && (C = Me(R)), y = a.getDerivedStateFromProps, (R = typeof y == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (h !== U || A !== C) && ep(r, d, l, C), na = !1, A = r.memoizedState, d.state = A, ll(r, l, d, c), li();
					var fe = r.memoizedState;
					h !== U || A !== fe || na || t !== null && t.dependencies !== null && oi(t.dependencies) ? (typeof y == "function" && (Ic(r, a, y, l), fe = r.memoizedState), (D = na || Vs(r, a, D, l, A, fe, C) || t !== null && t.dependencies !== null && oi(t.dependencies)) ? (R || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, fe, C), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(l, fe, C)), typeof d.componentDidUpdate == "function" && (r.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || h === t.memoizedProps && A === t.memoizedState || (r.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || h === t.memoizedProps && A === t.memoizedState || (r.flags |= 1024), r.memoizedProps = l, r.memoizedState = fe), d.props = l, d.state = fe, d.context = C, l = D) : (typeof d.componentDidUpdate != "function" || h === t.memoizedProps && A === t.memoizedState || (r.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || h === t.memoizedProps && A === t.memoizedState || (r.flags |= 1024), l = !1);
				}
				return d = l, ci(t, r), l = (r.flags & 128) !== 0, d || l ? (d = r.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : d.render(), r.flags |= 1, t !== null && l ? (r.child = Li(r, t.child, null, c), r.child = Li(r, null, a, c)) : wn(t, r, a, c), r.memoizedState = d.state, t = r.child) : t = Ee(t, r, c), t;
			}
			function Dc(t, r, a, l) {
				return ri(), r.flags |= 256, wn(t, r, a, l), r.child;
			}
			function Js(t) {
				return {
					baseLanes: t,
					cachePool: Uf()
				};
			}
			function vo(t, r, a) {
				return t = t !== null ? t.childLanes & ~a : 0, r && (t |= Ft), t;
			}
			function jc(t, r, a) {
				var l = r.pendingProps, c = !1, d = (r.flags & 128) !== 0, h;
				if ((h = d) || (h = t !== null && t.memoizedState === null ? !1 : (Xn.current & 2) !== 0), h && (c = !0, r.flags &= -129), h = (r.flags & 32) !== 0, r.flags &= -33, t === null) {
					if (ne) {
						if (c ? _r(r) : Tr(), (t = Qe) ? (t = _0(t, hr), t !== null && (r.memoizedState = {
							dehydrated: t,
							treeContext: _e !== null ? {
								id: _n,
								overflow: $e
							} : null,
							retryLane: 536870912,
							hydrationErrors: null
						}, a = Ll(t), a.return = r, r.child = a, Nn = r, Qe = null)) : t = null, t === null) throw Mn(r);
						return Jp(t) ? r.lanes = 32 : r.lanes = 536870912, null;
					}
					return d = l.children, l = l.fallback, c ? (Tr(), c = r.mode, d = Ar({
						mode: "hidden",
						children: d
					}, c), l = Na(l, c, a, null), d.return = r, l.return = r, d.sibling = l, r.child = d, l = r.child, l.memoizedState = Js(a), l.childLanes = vo(t, h, a), r.memoizedState = Vd, rr(null, l)) : (_r(r), Uc(r, d));
				}
				var y = t.memoizedState;
				if (y !== null) {
					var C = y.dehydrated;
					if (C !== null) return Zs(t, r, d, h, l, C, y, a);
				}
				return c ? (Tr(), c = l.fallback, d = r.mode, y = t.child, C = y.sibling, l = Zo(y, {
					mode: "hidden",
					children: l.children
				}), l.subtreeFlags = y.subtreeFlags & 1206910976, C !== null ? c = Zo(C, c) : (c = Na(c, d, a, null), c.flags |= 2), c.return = r, l.return = r, l.sibling = c, r.child = l, rr(null, l), l = r.child, c = t.child.memoizedState, c === null ? c = Js(a) : (d = c.cachePool, d !== null ? (y = lr ? tn._currentValue : tn._currentValue2, d = d.parent !== y ? {
					parent: y,
					pool: y
				} : d) : d = Uf(), c = {
					baseLanes: c.baseLanes | a,
					cachePool: d
				}), l.memoizedState = c, l.childLanes = vo(t, h, a), r.memoizedState = Vd, rr(t.child, l)) : (_r(r), a = t.child, t = a.sibling, a = Zo(a, {
					mode: "visible",
					children: l.children
				}), a.return = r, a.sibling = null, t !== null && (h = r.deletions, h === null ? (r.deletions = [t], r.flags |= 16) : h.push(t)), r.child = a, r.memoizedState = null, a);
			}
			function Uc(t, r) {
				return r = Ar({
					mode: "visible",
					children: r
				}, t.mode), r.return = t, t.child = r;
			}
			function Ar(t, r) {
				return t = et(22, t, null, r), t.lanes = 0, t;
			}
			function rt(t, r, a) {
				return Li(r, t.child, null, a), t = Uc(r, r.pendingProps.children), t.flags |= 2, r.memoizedState = null, t;
			}
			function Zs(t, r, a, l, c, d, h, y) {
				if (a) return r.flags & 256 ? (_r(r), r.flags &= -257, rt(t, r, y)) : r.memoizedState !== null ? (Tr(), r.child = t.child, r.flags |= 128, null) : (Tr(), d = c.fallback, h = r.mode, c = Ar({
					mode: "visible",
					children: c.children
				}, h), d = Na(d, h, y, null), d.flags |= 2, c.return = r, d.return = r, c.sibling = d, r.child = c, Li(r, t.child, null, y), c = r.child, c.memoizedState = Js(y), c.childLanes = vo(t, l, y), r.memoizedState = Vd, rr(null, c));
				if (_r(r), Jp(d)) return l = C0(d).digest, l !== "" && (c = Error(F(419)), c.stack = "", c.digest = l, va({
					value: c,
					source: null,
					stack: null
				})), rt(t, r, y);
				if (Pn || so(t, r, y, !1), l = (y & t.childLanes) !== 0, Pn || l) {
					if (Ba.current !== null) return rt(t, r, y);
					if (l = Be, l !== null && (c = Wt(l, y), c !== 0 && c !== h.retryLane)) throw h.retryLane = c, Er(t, c), yt(l, t, c), vh;
					return Gp(d) || Rl(), rt(t, r, y);
				}
				return Gp(d) ? (r.flags |= 192, r.child = t.child, null) : (t = h.treeContext, En && (Qe = ug(d), Nn = r, ne = !0, pr = null, hr = !1, t !== null && Rf(r, t)), r = Uc(r, c.children), r.flags |= 134221824, r);
			}
			function Wc(t, r, a) {
				t.lanes |= r;
				var l = t.alternate;
				l !== null && (l.lanes |= r), zn(t.return, r, a);
			}
			function Xs(t) {
				for (var r = null; t !== null;) {
					var a = t.alternate;
					a !== null && ul(a) === null && (r = t), t = t.sibling;
				}
				return r;
			}
			function ee(t, r, a, l, c, d) {
				var h = t.memoizedState;
				h === null ? t.memoizedState = {
					isBackwards: r,
					rendering: null,
					renderingStartTime: 0,
					last: l,
					tail: a,
					tailMode: c,
					treeForkCount: d
				} : (h.isBackwards = r, h.rendering = null, h.renderingStartTime = 0, h.last = l, h.tail = a, h.tailMode = c, h.treeForkCount = d);
			}
			function L(t) {
				var r = t.child;
				for (t.child = null; r !== null;) {
					var a = r.sibling;
					r.sibling = t.child, t.child = r, r = a;
				}
			}
			function Pa(t, r, a) {
				var l = r.pendingProps, c = l.revealOrder, d = l.tail;
				l = l.children;
				var h = Xn.current;
				if (r.flags & 128) return sl(r, h), null;
				var y = (h & 2) !== 0;
				if (y ? (h = h & 1 | 2, r.flags |= 128) : h &= 1, sl(r, h), c === "backwards" && t !== null ? (L(t), wn(t, r, l, a), L(t)) : wn(t, r, l, a), l = ne ? Du : 0, !y && t !== null && (t.flags & 128) !== 0) e: for (t = r.child; t !== null;) {
					if (t.tag === 13) t.memoizedState !== null && Wc(t, a, r);
					else if (t.tag === 19) Wc(t, a, r);
					else if (t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === r) break e;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === r) break e;
						t = t.return;
					}
					t.sibling.return = t.return, t = t.sibling;
				}
				switch (c) {
					case "backwards":
						a = Xs(r.child), a === null ? (c = r.child, r.child = null) : (c = a.sibling, a.sibling = null, L(r)), ee(r, !0, c, null, d, l);
						break;
					case "unstable_legacy-backwards":
						for (a = null, c = r.child, r.child = null; c !== null;) {
							if (t = c.alternate, t !== null && ul(t) === null) {
								r.child = c;
								break;
							}
							t = c.sibling, c.sibling = a, a = c, c = t;
						}
						ee(r, !0, a, null, d, l);
						break;
					case "together":
						ee(r, !1, null, null, void 0, l);
						break;
					case "independent":
						r.memoizedState = null;
						break;
					default: a = Xs(r.child), a === null ? (c = r.child, r.child = null) : (c = a.sibling, a.sibling = null), ee(r, !1, c, a, d, l);
				}
				return r.child;
			}
			function Ys(t, r, a) {
				var l = r.pendingProps;
				return Rn(r, r.type, l.value), wn(t, r, l.children, a), r.child;
			}
			function Ee(t, r, a) {
				if (t !== null && (r.dependencies = t.dependencies), aa |= r.lanes, (a & r.childLanes) === 0) if (t !== null) {
					if (so(t, r, a, !1), (a & r.childLanes) === 0) return null;
				} else return null;
				if (t !== null && r.child !== t.child) throw Error(F(153));
				if (r.child !== null) {
					for (t = r.child, a = Zo(t, t.pendingProps), r.child = a, a.return = r; t.sibling !== null;) t = t.sibling, a = a.sibling = Zo(t, t.pendingProps), a.return = r;
					a.sibling = null;
				}
				return r.child;
			}
			function Ks(t, r) {
				return (t.lanes & r) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && oi(t)));
			}
			function ap(t, r, a) {
				switch (r.tag) {
					case 3:
						Cs(r, r.stateNode.containerInfo), Rn(r, tn, t.memoizedState.cache), ri();
						break;
					case 27:
					case 5:
						Lf(r);
						break;
					case 4:
						Cs(r, r.stateNode.containerInfo);
						break;
					case 10:
						Rn(r, r.type, r.memoizedProps.value);
						break;
					case 31:
						if (r.memoizedState !== null) return r.flags |= 128, Nr(r), null;
						break;
					case 13:
						var l = r.memoizedState;
						if (l !== null) {
							if (l.dehydrated !== null) return _r(r), r.flags |= 128, null;
							l = so(t, r, a, !1);
							var c = r.child.childLanes;
							return l || (a & c) !== 0 ? jc(t, r, a) : (_r(r), t = Ee(t, r, a), t !== null ? t.sibling : null);
						}
						_r(r);
						break;
					case 19:
						if (r.flags & 128) return Pa(t, r, a);
						if (c = (t.flags & 128) !== 0, l = (a & r.childLanes) !== 0, l || (so(t, r, a, !1), l = (a & r.childLanes) !== 0), c) {
							if (l) return Pa(t, r, a);
							r.flags |= 128;
						}
						if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), sl(r, Xn.current), l) break;
						return null;
					case 22: return r.lanes = 0, Vo(t, r, a, r.pendingProps);
					case 24: Rn(r, tn, t.memoizedState.cache);
				}
				return Ee(t, r, a);
			}
			function ip(t, r, a) {
				if (t !== null) {
					if (t.memoizedProps !== r.pendingProps) Pn = !0;
					else {
						if (!Ks(t, a) && (r.flags & 128) === 0) return Pn = !1, ap(t, r, a);
						Pn = (t.flags & 131072) !== 0;
					}
				} else Pn = !1, ne && r.flags & 1048576 && If(r, Du, r.index);
				switch (r.lanes = 0, r.tag) {
					case 16:
						e: {
							var l = r.pendingProps;
							if (t = co(r.elementType), r.type = t, typeof t == "function") _p(t) ? (l = yo(t, l), r.tag = 1, r = op(null, r, t, l, a)) : (r.tag = 0, r = tp(null, r, t, l, a));
							else {
								if (t != null) {
									var c = t.$$typeof;
									if (c === bd) {
										r.tag = 11, r = qs(null, r, t, l, a);
										break e;
									} else if (c === Fl) {
										r.tag = 14, r = Lc(null, r, t, l, a);
										break e;
									} else if (c === Vr) {
										r.tag = 10, r.type = t, r = Ys(null, r, a);
										break e;
									}
								}
								throw r = gc(t) || t, Error(F(306, r, ""));
							}
						}
						return r;
					case 0: return tp(t, r, r.type, r.pendingProps, a);
					case 1: return l = r.type, c = yo(l, r.pendingProps), op(t, r, l, c, a);
					case 3:
						e: {
							if (Cs(r, r.stateNode.containerInfo), t === null) throw Error(F(387));
							var d = r.pendingProps;
							c = r.memoizedState, l = c.element, Sa(t, r), ll(r, d, null, a);
							var h = r.memoizedState;
							if (d = h.cache, Rn(r, tn, d), d !== c.cache && nr(r, [tn], a, !0), li(), d = h.element, En && c.isDehydrated) {
								if (c = {
									element: d,
									isDehydrated: !1,
									cache: h.cache
								}, r.updateQueue.baseState = c, r.memoizedState = c, r.flags & 256) {
									r = Dc(t, r, d, a);
									break e;
								} else if (d !== l) {
									l = Kt(Error(F(424)), r), va(l), r = Dc(t, r, d, a);
									break e;
								} else for (En && (Qe = Ol(r.stateNode.containerInfo), Nn = r, ne = !0, pr = null, hr = !0), a = zg(r, null, d, a), r.child = a; a;) a.flags = a.flags & -3 | 134221824, a = a.sibling;
							} else {
								if (ri(), d === l) {
									r = Ee(t, r, a);
									break e;
								}
								wn(t, r, d, a);
							}
							r = r.child;
						}
						return r;
					case 26: if (Nt) return ci(t, r), t === null ? (a = yg(r.type, null, r.pendingProps, null)) ? r.memoizedState = a : ne || (r.stateNode = ah(r.type, r.pendingProps, Je.current, r)) : r.memoizedState = yg(r.type, t.memoizedProps, r.pendingProps, t.memoizedState), null;
					case 27: if (be) return Lf(r), t === null && be && ne && (l = r.stateNode = Un(r.type, r.pendingProps, Je.current, Jn.current, !1), Nn = r, hr = !0, Qe = we(r.type, l, Qe)), wn(t, r, r.pendingProps.children, a), ci(t, r), t === null && (r.flags |= 4194304), r.child;
					case 5: return t === null && ne && (Id(r.type, r.pendingProps, Jn.current), (c = l = Qe) && (l = Kp(l, r.type, r.pendingProps, hr), l !== null ? (r.stateNode = l, Nn = r, Qe = sg(l), hr = !1, c = !0) : c = !1), c || Mn(r)), Lf(r), c = r.type, d = r.pendingProps, h = t !== null ? t.memoizedProps : null, l = d.children, kd(c, d) ? l = null : h !== null && kd(c, h) && (r.flags |= 32), r.memoizedState !== null && (c = cl(t, r, Cc, null, null, a), lr ? $r._currentValue = c : $r._currentValue2 = c), ci(t, r), wn(t, r, l, a), r.child;
					case 6: return t === null && ne && (zi(r.pendingProps, Jn.current), (t = a = Qe) && (a = E0(a, r.pendingProps, hr), a !== null ? (r.stateNode = a, Nn = r, Qe = null, t = !0) : t = !1), t || Mn(r)), null;
					case 13: return jc(t, r, a);
					case 4: return Cs(r, r.stateNode.containerInfo), l = r.pendingProps, t === null ? r.child = Li(r, null, l, a) : wn(t, r, l, a), r.child;
					case 11: return qs(t, r, r.type, r.pendingProps, a);
					case 7: return l = r.pendingProps, ci(t, r), wn(t, r, l, a), r.child;
					case 8: return wn(t, r, r.pendingProps.children, a), r.child;
					case 12: return wn(t, r, r.pendingProps.children, a), r.child;
					case 10: return Ys(t, r, a);
					case 9: return c = r.type._context, l = r.pendingProps.children, Do(r), c = Me(c), l = l(c), r.flags |= 1, wn(t, r, l, a), r.child;
					case 14: return Lc(t, r, r.type, r.pendingProps, a);
					case 15: return Fc(t, r, r.type, r.pendingProps, a);
					case 19: return Pa(t, r, a);
					case 31: return Gs(t, r, a);
					case 22: return Vo(t, r, a, r.pendingProps);
					case 24: return Do(r), l = Me(tn), t === null ? (c = rl(), c === null && (c = Be, d = _s(), c.pooledCache = d, d.refCount++, d !== null && (c.pooledCacheLanes |= a), c = d), r.memoizedState = {
						parent: l,
						cache: c
					}, ii(r), Rn(r, tn, c)) : ((t.lanes & a) !== 0 && (Sa(t, r), ll(r, null, null, a), li()), c = t.memoizedState, d = r.memoizedState, c.parent !== l ? (c = {
						parent: l,
						cache: l
					}, r.memoizedState = c, r.lanes === 0 && (r.memoizedState = r.updateQueue.baseState = c), Rn(r, tn, l)) : (l = d.cache, Rn(r, tn, l), l !== c.cache && nr(r, [tn], a, !0))), wn(t, r, r.pendingProps.children, a), r.child;
					case 30: return r.stateNode === null && (r.stateNode = {
						autoName: null,
						paired: null,
						clones: null,
						ref: null
					}), l = r.pendingProps, l.name != null && l.name !== "auto" ? r.flags |= t === null ? 18882560 : 18874368 : ne && Ps(r), t !== null && t.memoizedProps.name !== l.name ? r.flags |= 4194816 : ci(t, r), wn(t, r, l.children, a), r.child;
					case 29: throw r.pendingProps;
				}
				throw Error(F(156, r.tag));
			}
			function Ht(t) {
				t.flags |= 4;
			}
			function Ac(t) {
				ln && (t.flags |= 8);
			}
			function Oc(t, r) {
				if (t !== null && t.child === r.child) return !1;
				if ((r.flags & 16) !== 0) return !0;
				for (t = r.child; t !== null;) {
					if ((t.flags & 8218) !== 0 || (t.subtreeFlags & 8218) !== 0) return !0;
					t = t.sibling;
				}
				return !1;
			}
			function eu(t, r, a, l) {
				if (Ye) for (a = r.child; a !== null;) {
					if (a.tag === 5 || a.tag === 6) Sd(t, a.stateNode);
					else if (!(a.tag === 4 || be && a.tag === 27) && a.child !== null) {
						a.child.return = a, a = a.child;
						continue;
					}
					if (a === r) break;
					for (; a.sibling === null;) {
						if (a.return === null || a.return === r) return;
						a = a.return;
					}
					a.sibling.return = a.return, a = a.sibling;
				}
				else if (ln) for (var c = r.child; c !== null;) {
					if (c.tag === 5) {
						var d = c.stateNode;
						a && l && (d = _d(d, c.type, c.memoizedProps)), Sd(t, d);
					} else if (c.tag === 6) d = c.stateNode, a && l && (d = ig(d, c.memoizedProps)), Sd(t, d);
					else if (c.tag !== 4) {
						if (c.tag === 22 && c.memoizedState !== null) d = c.child, d !== null && (d.return = c), eu(t, c, !0, !0);
						else if (c.child !== null) {
							c.child.return = c, c = c.child;
							continue;
						}
					}
					if (c === r) break;
					for (; c.sibling === null;) {
						if (c.return === null || c.return === r) return;
						c = c.return;
					}
					c.sibling.return = c.return, c = c.sibling;
				}
			}
			function Bc(t, r, a, l) {
				var c = !1;
				if (ln) for (var d = r.child; d !== null;) {
					if (d.tag === 5) {
						var h = d.stateNode;
						a && l && (h = _d(h, d.type, d.memoizedProps)), Ci(t, h);
					} else if (d.tag === 6) h = d.stateNode, a && l && (h = ig(h, d.memoizedProps)), Ci(t, h);
					else if (d.tag !== 4) {
						if (d.tag === 22 && d.memoizedState !== null) c = d.child, c !== null && (c.return = d), Bc(t, d, !0, !0), c = !0;
						else if (d.child !== null) {
							d.child.return = d, d = d.child;
							continue;
						}
					}
					if (d === r) break;
					for (; d.sibling === null;) {
						if (d.return === null || d.return === r) return c;
						d = d.return;
					}
					d.sibling.return = d.return, d = d.sibling;
				}
				return c;
			}
			function ot(t, r) {
				if (ln && Oc(t, r)) {
					t = r.stateNode;
					var a = t.containerInfo, l = ag();
					Bc(l, r, !1, !1), t.pendingChildren = l, Ht(r), Ed(a, l);
				}
			}
			function xe(t, r, a, l) {
				if (Ye) t.memoizedProps !== l && Ht(r);
				else if (ln) {
					var c = t.stateNode, d = t.memoizedProps;
					if ((t = Oc(t, r)) || d !== l) {
						var h = Jn.current;
						d = og(c, a, d, l, !t, null), d === c ? r.stateNode = c : (Ac(r), Ap(d, a, l, h) && Ht(r), r.stateNode = d, t && eu(d, r, !1, !1));
					} else r.stateNode = c;
				}
			}
			function wl(t, r, a, l, c) {
				if ((t.mode & 32) !== 0 && (a === null ? Am(r, l) : Dl(r, a, l))) {
					if (t.flags |= 16777216, (c & 335544128) === c || wd(r, l)) if (ur(t.stateNode, r, l)) t.flags |= 8192;
					else if (wp()) t.flags |= 8192;
					else throw Ri = Ad, gh;
				} else t.flags &= -16777217;
			}
			function Pl(t, r) {
				if (L0(r)) {
					if (t.flags |= 16777216, !ce(r)) if (wp()) t.flags |= 8192;
					else throw Ri = Ad, gh;
				} else t.flags &= -16777217;
			}
			function Or(t, r) {
				r !== null && (t.flags |= 4), t.flags & 16384 && (r = t.tag !== 22 ? Nf() : 536870912, t.lanes |= r, es |= r);
			}
			function Br(t, r) {
				if (!ne) switch (t.tailMode) {
					case "visible": break;
					case "collapsed":
						for (var a = t.tail, l = null; a !== null;) a.alternate !== null && (l = a), a = a.sibling;
						l === null ? r || t.tail === null ? t.tail = null : t.tail.sibling = null : l.sibling = null;
						break;
					default:
						for (r = t.tail, a = null; r !== null;) r.alternate !== null && (a = r), r = r.sibling;
						a === null ? t.tail = null : a.sibling = null;
				}
			}
			function ge(t) {
				var r = t.alternate !== null && t.alternate.child === t.child, a = 0, l = 0;
				if (r) for (var c = t.child; c !== null;) a |= c.lanes | c.childLanes, l |= c.subtreeFlags & 1206910976, l |= c.flags & 1206910976, c.return = t, c = c.sibling;
				else for (c = t.child; c !== null;) a |= c.lanes | c.childLanes, l |= c.subtreeFlags, l |= c.flags, c.return = t, c = c.sibling;
				return t.subtreeFlags |= l, t.childLanes = a, r;
			}
			function lp(t, r, a) {
				var l = r.pendingProps;
				switch (xs(r), r.tag) {
					case 16:
					case 15:
					case 0:
					case 11:
					case 7:
					case 8:
					case 12:
					case 9:
					case 14: return ge(r), null;
					case 1: return ge(r), null;
					case 3: return a = r.stateNode, l = null, t !== null && (l = t.memoizedState.cache), r.memoizedState.cache !== l && (r.flags |= 2048), lo(tn), ya(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (t === null || t.child === null) && (nl(r) ? Ht(r) : t === null || t.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, zs())), ot(t, r), ge(r), null;
					case 26: if (Nt) {
						var c = r.type, d = r.memoizedState;
						return t === null ? (Ht(r), d !== null ? (ge(r), Pl(r, d)) : (ge(r), wl(r, c, null, l, a))) : d ? d !== t.memoizedState ? (Ht(r), ge(r), Pl(r, d)) : (ge(r), r.flags &= -16777217) : (d = t.memoizedProps, Ye ? d !== l && Ht(r) : xe(t, r, c, l), ge(r), wl(r, c, d, l, a)), null;
					}
					case 27: if (be) {
						if (Oe(r), a = Je.current, c = r.type, t !== null && r.stateNode != null) Ye ? t.memoizedProps !== l && Ht(r) : xe(t, r, c, l);
						else {
							if (!l) {
								if (r.stateNode === null) throw Error(F(166));
								return ge(r), r.subtreeFlags &= -33554433, null;
							}
							t = Jn.current, nl(r) ? Ff(r, t) : (t = Un(c, l, a, t, !0), r.stateNode = t, Ht(r));
						}
						return ge(r), r.subtreeFlags &= -33554433, null;
					}
					case 5:
						if (Oe(r), c = r.type, t !== null && r.stateNode != null) xe(t, r, c, l);
						else {
							if (!l) {
								if (r.stateNode === null) throw Error(F(166));
								return ge(r), r.subtreeFlags &= -33554433, null;
							}
							if (d = Jn.current, nl(r)) Ff(r, d), mg(r.stateNode, c, l, d) && (r.flags |= 64);
							else {
								var h = Fm(c, l, Je.current, d, r);
								Ac(r), eu(h, r, !1, !1), r.stateNode = h, Ap(h, c, l, d) && Ht(r);
							}
						}
						return ge(r), r.subtreeFlags &= -33554433, wl(r, r.type, t === null ? null : t.memoizedProps, r.pendingProps, a), null;
					case 6:
						if (t && r.stateNode != null) a = t.memoizedProps, Ye ? a !== l && Ht(r) : ln && (a !== l ? (t = Je.current, a = Jn.current, Ac(r), r.stateNode = Eu(l, t, a, r)) : r.stateNode = t.stateNode);
						else {
							if (typeof l != "string" && r.stateNode === null) throw Error(F(166));
							if (t = Je.current, a = Jn.current, nl(r)) {
								if (!En) throw Error(F(176));
								if (t = r.stateNode, a = r.memoizedProps, l = null, c = Nn, c !== null) switch (c.tag) {
									case 27:
									case 5: l = c.memoizedProps;
								}
								eh(t, a, r, l) || Mn(r, !0);
							} else Ac(r), r.stateNode = Eu(l, t, a, r);
						}
						return ge(r), null;
					case 31:
						if (a = r.memoizedState, t === null || t.memoizedState !== null) {
							if (l = nl(r), a !== null) {
								if (t === null) {
									if (!l) throw Error(F(318));
									if (!En) throw Error(F(556));
									if (t = r.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(F(557));
									dg(t, r);
								} else ri(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
								ge(r), t = !1;
							} else a = zs(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), t = !0;
							if (!t) return r.flags & 256 ? (Ln(r), r) : (Ln(r), null);
							if ((r.flags & 128) !== 0) throw Error(F(558));
						}
						return ge(r), null;
					case 13:
						if (l = r.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
							if (c = nl(r), l !== null && l.dehydrated !== null) {
								if (t === null) {
									if (!c) throw Error(F(318));
									if (!En) throw Error(F(344));
									if (c = r.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(F(317));
									fg(c, r);
								} else ri(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
								ge(r), c = !1;
							} else c = zs(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), c = !0;
							if (!c) return r.flags & 256 ? (Ln(r), r) : (Ln(r), null);
						}
						return Ln(r), (r.flags & 128) !== 0 ? (r.lanes = a, r) : (a = l !== null, t = t !== null && t.memoizedState !== null, a && (l = r.child, c = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (c = l.alternate.memoizedState.cachePool.pool), d = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (d = l.memoizedState.cachePool.pool), d !== c && (l.flags |= 2048)), a !== t && a && (r.child.flags |= 8192), Or(r, r.updateQueue), ge(r), null);
					case 4: return ya(), ot(t, r), t === null && Um(r.stateNode.containerInfo), r.flags |= 67108864, ge(r), null;
					case 10: return lo(r.type), ge(r), null;
					case 19:
						if (Oo(r), l = r.memoizedState, l === null) return ge(r), null;
						if (c = (r.flags & 128) !== 0, d = l.rendering, d === null) {
							if (c) Br(l, !1);
							else {
								if (cn !== 0 || t !== null && (t.flags & 128) !== 0) for (t = r.child; t !== null;) {
									if (d = ul(t), d !== null) {
										for (r.flags |= 128, Br(l, !1), t = d.updateQueue, r.updateQueue = t, Or(r, t), r.subtreeFlags = 0, t = a, a = r.child; a !== null;) Np(a, t), a = a.sibling;
										return sl(r, Xn.current & 1 | 2), ne && io(r, l.treeForkCount), r.child;
									}
									t = t.sibling;
								}
								l.tail !== null && Tt() > ns && (r.flags |= 128, c = !0, Br(l, !1), r.lanes = 4194304);
							}
						} else {
							if (!c) if (t = ul(d), t !== null) {
								if (r.flags |= 128, c = !0, t = t.updateQueue, r.updateQueue = t, Or(r, t), Br(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !d.alternate && !ne) return ge(r), null;
							} else 2 * Tt() - l.renderingStartTime > ns && a !== 536870912 && (r.flags |= 128, c = !0, Br(l, !1), r.lanes = 4194304);
							l.isBackwards ? (d.sibling = r.child, r.child = d) : (t = l.last, t !== null ? t.sibling = d : r.child = d, l.last = d);
						}
						if (l.tail !== null) {
							t = l.tail;
							e: {
								for (a = t; a !== null;) {
									if (a.alternate !== null) {
										a = !1;
										break e;
									}
									a = a.sibling;
								}
								a = !0;
							}
							return l.rendering = t, l.tail = t.sibling, l.renderingStartTime = Tt(), t.sibling = null, d = Xn.current, d = c ? d & 1 | 2 : d & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !a || ne ? sl(r, d) : (a = d, Te(Zn, r), Te(Xn, a), lt === null && (lt = r)), ne && io(r, l.treeForkCount), t;
						}
						return ge(r), null;
					case 22:
					case 23: return Ln(r), xc(), l = r.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (r.flags |= 8192) : l && (r.flags |= 8192), l ? a & 536870912 && !(r.flags & 128) && (ge(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : ge(r), a = r.updateQueue, a !== null && Or(r, a.retryQueue), a = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), l = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (l = r.memoizedState.cachePool.pool), l !== a && (r.flags |= 2048), t !== null && W(Zr), null;
					case 24: return a = null, t !== null && (a = t.memoizedState.cache), r.memoizedState.cache !== a && (r.flags |= 2048), lo(tn), ge(r), null;
					case 25: return null;
					case 30: return r.flags |= 33554432, ge(r), null;
				}
				throw Error(F(156, r.tag));
			}
			function xl(t, r) {
				switch (xs(r), r.tag) {
					case 1: return t = r.flags, t & 65536 ? (r.flags = t & -65537 | 128, r) : null;
					case 3: return lo(tn), ya(), t = r.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (r.flags = t & -65537 | 128, r) : null;
					case 26:
					case 27:
					case 5: return Oe(r), null;
					case 31:
						if (r.memoizedState !== null) {
							if (Ln(r), r.alternate === null) throw Error(F(340));
							ri();
						}
						return t = r.flags, t & 65536 ? (r.flags = t & -65537 | 128, r) : null;
					case 13:
						if (Ln(r), t = r.memoizedState, t !== null && t.dehydrated !== null) {
							if (r.alternate === null) throw Error(F(340));
							ri();
						}
						return t = r.flags, t & 65536 ? (r.flags = t & -65537 | 128, r) : null;
					case 19: return Oo(r), t = r.flags, t & 65536 ? (r.flags = t & -65537 | 128, t = r.memoizedState, t !== null && (t.rendering = null, t.tail = null), r.flags |= 4, r) : null;
					case 4: return ya(), null;
					case 10: return lo(r.type), null;
					case 22:
					case 23: return Ln(r), xc(), t !== null && W(Zr), t = r.flags, t & 65536 ? (r.flags = t & -65537 | 128, r) : null;
					case 24: return lo(tn), null;
					case 25: return null;
					default: return null;
				}
			}
			function Hc(t, r) {
				switch (xs(r), r.tag) {
					case 3:
						lo(tn), ya();
						break;
					case 26:
					case 27:
					case 5:
						Oe(r);
						break;
					case 4:
						ya();
						break;
					case 31:
						r.memoizedState !== null && Ln(r);
						break;
					case 13:
						Ln(r);
						break;
					case 19:
						Oo(r);
						break;
					case 10:
						lo(r.type);
						break;
					case 22:
					case 23:
						Ln(r), xc(), t !== null && W(Zr);
						break;
					case 24: lo(tn);
				}
			}
			function $o(t, r) {
				try {
					var a = r.updateQueue, l = a !== null ? a.lastEffect : null;
					if (l !== null) {
						var c = l.next;
						a = c;
						do {
							if ((a.tag & t) === t) {
								l = void 0;
								var d = a.create, h = a.inst;
								l = d(), h.destroy = l;
							}
							a = a.next;
						} while (a !== c);
					}
				} catch (y) {
					ke(r, r.return, y);
				}
			}
			function So(t, r, a) {
				try {
					var l = r.updateQueue, c = l !== null ? l.lastEffect : null;
					if (c !== null) {
						var d = c.next;
						l = d;
						do {
							if ((l.tag & t) === t) {
								var h = l.inst, y = h.destroy;
								if (y !== void 0) {
									h.destroy = void 0, c = r;
									var C = a, R = y;
									try {
										R();
									} catch (D) {
										ke(c, C, D);
									}
								}
							}
							l = l.next;
						} while (l !== d);
					}
				} catch (D) {
					ke(r, r.return, D);
				}
			}
			function nu(t) {
				var r = t.updateQueue;
				if (r !== null) {
					var a = t.stateNode;
					try {
						B(r, a);
					} catch (l) {
						ke(t, t.return, l);
					}
				}
			}
			function sp(t, r, a) {
				a.props = yo(t.type, t.memoizedProps), a.state = t.memoizedState;
				try {
					a.componentWillUnmount();
				} catch (l) {
					ke(t, r, l);
				}
			}
			function Hr(t, r) {
				try {
					var a = t.ref;
					if (a !== null) {
						switch (t.tag) {
							case 26:
							case 27:
							case 5:
								var l = Pi(t.stateNode);
								break;
							case 30:
								var c = t.stateNode, d = mt(t.memoizedProps, c);
								(c.ref === null || c.ref.name !== d) && (c.ref = Iu(d)), l = c.ref;
								break;
							case 7:
								t.stateNode === null && (t.stateNode = ng(t)), l = t.stateNode;
								break;
							default: l = t.stateNode;
						}
						typeof a == "function" ? t.refCleanup = a(l) : a.current = l;
					}
				} catch (h) {
					ke(t, r, h);
				}
			}
			function Fn(t, r) {
				var a = t.ref, l = t.refCleanup;
				if (a !== null) if (typeof l == "function") try {
					l();
				} catch (c) {
					ke(t, r, c);
				} finally {
					t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
				}
				else if (typeof a == "function") try {
					a(null);
				} catch (c) {
					ke(t, r, c);
				}
				else a.current = null;
			}
			function up() {
				var t = Yn;
				return Yn = !1, t;
			}
			function Cl(t, r) {
				if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && r !== null) for (var a = 0; a < r.length; a++) tg(t.stateNode, r[a]);
			}
			function Mc(t) {
				for (var r = t.return; r !== null && (Vc(r) && tg(t.stateNode, r.stateNode), !tu(r));) r = r.return;
			}
			function di(t) {
				for (var r = t.return; r !== null && (Vc(r) && rg(t.stateNode, r.stateNode), !tu(r));) r = r.return;
			}
			function tu(t) {
				return t.tag === 5 || t.tag === 3 || (be ? t.tag === 27 : !1);
			}
			function Vc(t) {
				return t && t.tag === 7 && t.stateNode !== null;
			}
			function $c(t) {
				var r = t.type, a = t.memoizedProps, l = t.stateNode;
				try {
					Hp(l, r, a, t);
				} catch (c) {
					ke(t, t.return, c);
				}
			}
			function Qc(t, r, a) {
				try {
					Mp(t.stateNode, t.type, a, r, t);
				} catch (l) {
					ke(t, t.return, l);
				}
			}
			function bm(t) {
				return t.tag === 5 || t.tag === 3 || (Nt ? t.tag === 26 : !1) || (be ? t.tag === 27 && Qr(t.type) : !1) || t.tag === 4;
			}
			function qc(t) {
				e: for (;;) {
					for (; t.sibling === null;) {
						if (t.return === null || bm(t.return)) return null;
						t = t.return;
					}
					for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18;) {
						if (be && t.tag === 27 && Qr(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
						t.child.return = t, t = t.child;
					}
					if (!(t.flags & 2)) return t.stateNode;
				}
			}
			function Gc(t, r, a, l) {
				var c = t.tag;
				if (c === 5 || c === 6) c = t.stateNode, r ? xd(a, c, r) : Qm(a, c), Cl(t, l), Yn = !0;
				else if (c !== 4 && (be && c === 27 && (Cl(t, l), l = null, Qr(t.type) && (a = t.stateNode, r = null)), t = t.child, t !== null)) for (Gc(t, r, a, l), t = t.sibling; t !== null;) Gc(t, r, a, l), t = t.sibling;
			}
			function ru(t, r, a, l) {
				var c = t.tag;
				if (c === 5 || c === 6) c = t.stateNode, r ? qm(a, c, r) : $m(a, c), Cl(t, l), Yn = !0;
				else if (c !== 4 && (be && c === 27 && (Cl(t, l), l = null, Qr(t.type) && (a = t.stateNode)), t = t.child, t !== null)) for (ru(t, r, a, l), t = t.sibling; t !== null;) ru(t, r, a, l), t = t.sibling;
			}
			function ou(t, r) {
				if (t.tag === 5 || be && t.tag === 27) Cl(t, r);
				else if (t.tag !== 4 && (t = t.child, t !== null)) for (ou(t, r), t = t.sibling; t !== null;) ou(t, r), t = t.sibling;
			}
			function cp(t, r, a) {
				t = t.containerInfo;
				try {
					qp(t, a);
				} catch (l) {
					ke(r, r.return, l);
				}
			}
			function dp(t) {
				var r = t.stateNode, a = t.memoizedProps;
				try {
					D0(t.type, a, r, t);
				} catch (l) {
					ke(t, t.return, l);
				}
			}
			function fi(t) {
				(t.tag === 30 || t.subtreeFlags & 33554432) && ($d = !0);
			}
			function au() {
				var t = Xr;
				return Xr = null, t;
			}
			function pi(t, r, a, l, c) {
				return vt = 0, ym(t.child, r, a, l, c);
			}
			function ym(t, r, a, l, c) {
				if (!Ye) return !1;
				for (var d = !1; t !== null;) {
					if (t.tag === 5) {
						var h = t.stateNode;
						if (l !== null) {
							var y = Tu(h);
							l.push(y), Yo(y) && (d = !0);
						} else d || Yo(Tu(h)) && (d = !0);
						$d = !0, Vp(h, vt === 0 ? r : r + "_" + vt, a), vt++;
					} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && c || ym(t.child, r, a, l, c) && (d = !0));
					t = t.sibling;
				}
				return d;
			}
			function Mt(t, r) {
				if (Ye) for (; t !== null;) t.tag === 5 ? P0(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && r || Mt(t.child, r)), t = t.sibling;
			}
			function Qo(t) {
				if ((t.subtreeFlags & 18874368) !== 0) for (t = t.child; t !== null;) {
					if ((t.tag !== 22 || t.memoizedState === null) && (Qo(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
						var r = t.memoizedProps;
						if (r.name == null || r.name === "auto") throw Error(F(544));
						var a = r.name;
						r = At(r.default, r.share), r !== "none" && (pi(t, a, r, null, !1) || Mt(t.child, !1));
					}
					t = t.sibling;
				}
			}
			function iu(t, r) {
				if (t.tag === 30) {
					var a = t.stateNode, l = t.memoizedProps, c = mt(l, a), d = At(l.default, a.paired ? l.share : l.enter);
					d !== "none" ? pi(t, c, d, null, !1) ? (Qo(t), a.paired || r || yi(t, l.onEnter)) : Mt(t.child, !1) : Qo(t);
				} else if ((t.subtreeFlags & 33554432) !== 0) for (t = t.child; t !== null;) iu(t, r), t = t.sibling;
				else Qo(t);
			}
			function qo(t) {
				if (Rt !== null && Rt.size !== 0) {
					var r = Rt;
					if ((t.subtreeFlags & 18874368) !== 0) for (t = t.child; t !== null;) {
						if (t.tag !== 22 || t.memoizedState === null) {
							if (t.tag === 30 && (t.flags & 18874368) !== 0) {
								var a = t.memoizedProps, l = a.name;
								if (l != null && l !== "auto") {
									var c = r.get(l);
									if (c !== void 0) {
										var d = At(a.default, a.share);
										if (d !== "none" && (pi(t, l, d, null, !1) ? (d = t.stateNode, c.paired = d, d.paired = c, yi(t, a.onShare)) : Mt(t.child, !1)), r.delete(l), r.size === 0) break;
									}
								}
							}
							qo(t);
						}
						t = t.sibling;
					}
				}
			}
			function at(t) {
				if (t.tag === 30) {
					var r = t.memoizedProps, a = mt(r, t.stateNode), l = Rt !== null ? Rt.get(a) : void 0, c = At(r.default, l !== void 0 ? r.share : r.exit);
					c !== "none" && (pi(t, a, c, null, !1) ? l !== void 0 ? (c = t.stateNode, l.paired = c, c.paired = l, Rt.delete(a), yi(t, r.onShare)) : yi(t, r.onExit) : Mt(t.child, !1)), Rt !== null && qo(t);
				} else if ((t.subtreeFlags & 33554432) !== 0) for (t = t.child; t !== null;) at(t), t = t.sibling;
				else Rt !== null && qo(t);
			}
			function lu(t) {
				for (t = t.child; t !== null;) {
					if (t.tag === 30) {
						var r = t.memoizedProps, a = mt(r, t.stateNode);
						r = At(r.default, r.update), t.flags &= -5, r !== "none" && pi(t, a, r, t.memoizedState = [], !1);
					} else t.subtreeFlags & 33554432 && lu(t);
					t = t.sibling;
				}
			}
			function fp(t) {
				if ((t.subtreeFlags & 18874368) !== 0) for (t = t.child; t !== null;) {
					if (t.tag !== 22 || t.memoizedState === null) {
						if (t.tag === 30 && (t.flags & 18874368) !== 0) {
							var r = t.stateNode;
							r.paired !== null && (r.paired = null, Mt(t.child, !1));
						}
						fp(t);
					}
					t = t.sibling;
				}
			}
			function zl(t) {
				if (t.tag === 30) t.stateNode.paired = null, Mt(t.child, !1), fp(t);
				else if ((t.subtreeFlags & 33554432) !== 0) for (t = t.child; t !== null;) zl(t), t = t.sibling;
				else fp(t);
			}
			function su(t) {
				for (t = t.child; t !== null;) t.tag === 30 ? Mt(t.child, !1) : t.subtreeFlags & 33554432 && su(t), t = t.sibling;
			}
			function uu(t, r, a, l, c, d, h) {
				if (!Ye) return !1;
				for (var y = !1; r !== null;) {
					if (r.tag === 5) {
						var C = r.stateNode;
						if (d !== null && vt < d.length) {
							var R = d[vt], D = Tu(C);
							(Yo(R) || Yo(D)) && (y = !0), !(t.flags & 4) && Xm(R, D) && (t.flags |= 4), Ym(R, D) && (t.flags |= 32);
						} else t.flags |= 32;
						t.flags & 4 && Vp(C, vt === 0 ? a : a + "_" + vt, c), y && t.flags & 4 || (Xr === null && (Xr = []), Xr.push(C, vt === 0 ? l : l + "_" + vt, r.memoizedProps)), vt++;
					} else (r.tag !== 22 || r.memoizedState === null) && (r.tag === 30 && h ? t.flags |= r.flags & 32 : uu(t, r.child, a, l, c, d, h) && (y = !0));
					r = r.sibling;
				}
				return y;
			}
			function pp(t, r) {
				for (t = t.child; t !== null;) {
					if (t.tag === 30) {
						var a = t.memoizedProps, l = t.stateNode, c = mt(a, l), d = At(a.default, a.update);
						if (r) {
							l = l.clones;
							var h = l === null ? null : l.map(xi);
						} else h = t.memoizedState, t.memoizedState = null;
						l = t;
						var y = t.child;
						vt = 0, c = uu(l, y, c, c, d, h, !1), t.flags & 4 && c && (r || yi(t, a.onUpdate));
					} else t.subtreeFlags & 33554432 && pp(t, r);
					t = t.sibling;
				}
			}
			function hp(t, r, a) {
				for (Wp(t.containerInfo), t = (a & 335544064) === a, An = r, r = t ? 9270 : 1024; An !== null;) {
					if (a = An, t) {
						var l = a.deletions;
						if (l !== null) for (var c = 0; c < l.length; c++) t && at(l[c]);
					}
					if (a.alternate === null && (a.flags & 2) !== 0) t && fi(a), hi(t);
					else {
						if (a.tag === 22) {
							if (l = a.alternate, a.memoizedState !== null) {
								l !== null && l.memoizedState === null && t && at(l), hi(t);
								continue;
							} else if (l !== null && l.memoizedState !== null) {
								t && fi(a), hi(t);
								continue;
							}
						}
						l = a.child, (a.subtreeFlags & r) !== 0 && l !== null ? (l.return = a, An = l) : (t && lu(a), hi(t));
					}
				}
				Rt = null;
			}
			function hi(t) {
				for (; An !== null;) {
					var r = An, a = t, l = r.alternate, c = r.flags;
					switch (r.tag) {
						case 0:
						case 11:
						case 15: break;
						case 1:
							if ((c & 1024) !== 0 && l !== null) {
								a = void 0, c = l.memoizedProps, l = l.memoizedState;
								var d = r.stateNode;
								try {
									var h = yo(r.type, c);
									a = d.getSnapshotBeforeUpdate(h, l), d.__reactInternalSnapshotBeforeUpdate = a;
								} catch (y) {
									ke(r, r.return, y);
								}
							}
							break;
						case 3:
							c & 1024 && Ye && Qp(r.stateNode.containerInfo);
							break;
						case 5:
						case 26:
						case 27:
						case 6:
						case 4:
						case 17: break;
						case 30:
							a && l !== null && (a = mt(l.memoizedProps, l.stateNode), c = r.memoizedProps, c = At(c.default, c.update), c !== "none" && pi(l, a, c, l.memoizedState = [], !0));
							break;
						default: if ((c & 1024) !== 0) throw Error(F(163));
					}
					if (l = r.sibling, l !== null) {
						l.return = r.return, An = l;
						break;
					}
					An = r.return;
				}
			}
			function Jc(t, r, a) {
				var l = a.flags;
				switch (a.tag) {
					case 0:
					case 11:
					case 15:
						ar(t, a), l & 4 && $o(5, a);
						break;
					case 1:
						if (ar(t, a), l & 4) if (t = a.stateNode, r === null) try {
							t.componentDidMount();
						} catch (h) {
							ke(a, a.return, h);
						}
						else {
							var c = yo(a.type, r.memoizedProps);
							r = r.memoizedState;
							try {
								t.componentDidUpdate(c, r, t.__reactInternalSnapshotBeforeUpdate);
							} catch (h) {
								ke(a, a.return, h);
							}
						}
						l & 64 && nu(a), l & 512 && Hr(a, a.return);
						break;
					case 3:
						if (ar(t, a), l & 64 && (l = a.updateQueue, l !== null)) {
							if (t = null, a.child !== null) switch (a.child.tag) {
								case 27:
								case 5:
									t = Pi(a.child.stateNode);
									break;
								case 1: t = a.child.stateNode;
							}
							try {
								B(l, t);
							} catch (h) {
								ke(a, a.return, h);
							}
						}
						break;
					case 27: be && r === null && l & 4 && dp(a);
					case 26:
					case 5:
						if (ar(t, a), r === null) {
							if (l & 4) $c(a);
							else if (l & 64) {
								t = a.type, r = a.memoizedProps, c = a.stateNode;
								try {
									T0(c, t, r, a);
								} catch (h) {
									ke(a, a.return, h);
								}
							}
						}
						l & 512 && Hr(a, a.return);
						break;
					case 12:
						ar(t, a);
						break;
					case 31:
						ar(t, a), l & 4 && Kc(t, a);
						break;
					case 13:
						ar(t, a), l & 4 && mp(t, a), l & 64 && (l = a.memoizedState, l !== null && (l = l.dehydrated, l !== null && (a = xm.bind(null, a), z0(l, a))));
						break;
					case 22:
						if (l = a.memoizedState !== null || xn, !l) {
							var d = r !== null && r.memoizedState !== null || Ce;
							r = xn, c = Ce, xn = l, (Ce = d) && !c ? (l = be ? 2 : 0, a.subtreeFlags & 8772 && (l |= 1), Mr(t, a, l)) : ar(t, a), xn = r, Ce = c;
						}
						break;
					case 30:
						ar(t, a), l & 512 && Hr(a, a.return);
						break;
					case 7: l & 512 && Hr(a, a.return);
					default: ar(t, a);
				}
			}
			function El(t, r) {
				if (Ye) for (t = t.child; t !== null;) Zc(t, r), t = t.sibling;
			}
			function Zc(t, r) {
				if (Ye) switch (t.tag) {
					case 5:
					case 26:
						try {
							var a = t.stateNode;
							r ? Jm(a) : nn(t.stateNode, t.memoizedProps);
						} catch (d) {
							ke(t, t.return, d);
						}
						_l(t, r);
						break;
					case 6:
						try {
							var l = t.stateNode;
							r ? Al(l) : Zm(l, t.memoizedProps), Yn = !0;
						} catch (d) {
							ke(t, t.return, d);
						}
						break;
					case 18:
						try {
							var c = t.stateNode;
							r ? Ko(c) : bg(t.stateNode);
						} catch (d) {
							ke(t, t.return, d);
						}
						break;
					case 22:
					case 23:
						t.memoizedState === null && El(t, r);
						break;
					default: El(t, r);
				}
			}
			function _l(t, r) {
				if (Ye && t.subtreeFlags & 67108864) for (t = t.child; t !== null;) {
					var a = t, l = r;
					if (Ye) switch (a.tag) {
						case 4:
							Zc(a, l);
							break;
						case 22:
							a.memoizedState === null && _l(a, l);
							break;
						default: _l(a, l);
					}
					t = t.sibling;
				}
			}
			function Xc(t) {
				var r = t.alternate;
				r !== null && (t.alternate = null, Xc(r)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (r = t.stateNode, r !== null && it(r)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
			}
			function xt(t, r, a) {
				for (a = a.child; a !== null;) Yc(t, r, a), a = a.sibling;
			}
			function Yc(t, r, a) {
				if (It && typeof It.onCommitFiberUnmount == "function") try {
					It.onCommitFiberUnmount(Lu, a);
				} catch {}
				switch (a.tag) {
					case 26: if (Nt) {
						Ce || Fn(a, r), xt(t, r, a), a.memoizedState ? oh(a.memoizedState) : a.stateNode && (Ce || Ld(a.stateNode));
						break;
					}
					case 27: if (be) {
						Ce || Fn(a, r), di(a);
						var l = Cn, c = Lt;
						Qr(a.type) && (Cn = a.stateNode, Lt = !1), xt(t, r, a), xo(a.stateNode, a.type, a.memoizedProps), Cn = l, Lt = c;
						break;
					}
					case 5: Ce || Fn(a, r), di(a);
					case 6:
						if (a.tag === 6 && di(a), Ye) {
							if (l = Cn, c = Lt, Cn = null, xt(t, r, a), Cn = l, Lt = c, Cn !== null) if (Lt) try {
								Gm(Cn, a.stateNode), Yn = !0;
							} catch (d) {
								ke(a, r, d);
							}
							else try {
								w0(Cn, a.stateNode), Yn = !0;
							} catch (d) {
								ke(a, r, d);
							}
						} else xt(t, r, a);
						break;
					case 18:
						Ye && Cn !== null && (Lt ? nh(Cn, a.stateNode) : R0(Cn, a.stateNode));
						break;
					case 4:
						Ye ? (l = Cn, c = Lt, Cn = a.stateNode.containerInfo, Lt = !0, xt(t, r, a), Cn = l, Lt = c) : (ln && cp(a.stateNode, a, ag()), xt(t, r, a));
						break;
					case 0:
					case 11:
					case 14:
					case 15:
						So(2, a, r), Ce || So(4, a, r), xt(t, r, a);
						break;
					case 1:
						Ce || (Fn(a, r), l = a.stateNode, typeof l.componentWillUnmount == "function" && sp(a, r, l)), xt(t, r, a);
						break;
					case 21:
						xt(t, r, a);
						break;
					case 22:
						Ce = (l = Ce) || a.memoizedState !== null, xt(t, r, a), Ce = l;
						break;
					case 30:
						Fn(a, r), xt(t, r, a);
						break;
					case 7:
						Ce || Fn(a, r), xt(t, r, a);
						break;
					default: xt(t, r, a);
				}
			}
			function Kc(t, r) {
				if (En && r.memoizedState === null && (t = r.alternate, t !== null && (t = t.memoizedState, t !== null))) {
					t = t.dehydrated;
					try {
						Bl(t);
					} catch (a) {
						ke(r, r.return, a);
					}
				}
			}
			function mp(t, r) {
				if (En && r.memoizedState === null && (t = r.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null)))) try {
					hg(t);
				} catch (a) {
					ke(r, r.return, a);
				}
			}
			function ed(t) {
				switch (t.tag) {
					case 31:
					case 13:
					case 19:
						var r = t.stateNode;
						return r === null && (r = t.stateNode = new Ng()), r;
					case 22: return t = t.stateNode, r = t._retryCache, r === null && (r = t._retryCache = new Ng()), r;
					default: throw Error(F(435, t.tag));
				}
			}
			function cu(t, r) {
				var a = ed(t);
				r.forEach(function(l) {
					if (!a.has(l)) {
						a.add(l);
						var c = pd.bind(null, t, l);
						l.then(c, c);
					}
				});
			}
			function Dn(t, r, a) {
				var l = r.deletions;
				if (l !== null) for (var c = 0; c < l.length; c++) {
					var d = l[c], h = t, y = r;
					if (Ye) {
						var C = y;
						e: for (; C !== null;) {
							switch (C.tag) {
								case 27: if (be) {
									if (Qr(C.type)) {
										Cn = C.stateNode, Lt = !1;
										break e;
									}
									break;
								}
								case 5:
									Cn = C.stateNode, Lt = !1;
									break e;
								case 3:
								case 4:
									Cn = C.stateNode.containerInfo, Lt = !0;
									break e;
							}
							C = C.return;
						}
						if (Cn === null) throw Error(F(160));
						Yc(h, y, d), Cn = null, Lt = !1;
					} else Yc(h, y, d);
					h = d.alternate, h !== null && (h.return = null), d.return = null;
				}
				if (r.subtreeFlags & 13886) for (r = r.child; r !== null;) nd(r, t, a), r = r.sibling;
			}
			function nd(t, r, a) {
				var l = t.alternate, c = t.flags;
				switch (t.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						if (c & 4 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null)) for (var d = 0; d < l.length; d++) {
							var h = l[d];
							h.ref.impl = h.nextImpl;
						}
						Dn(r, t, a), Vn(t), c & 4 && (So(3, t, t.return), $o(3, t), So(5, t, t.return));
						break;
					case 1:
						Dn(r, t, a), Vn(t), c & 512 && (Ce || l === null || Fn(l, l.return)), c & 64 && xn && (t = t.updateQueue, t !== null && (r = t.callbacks, r !== null && (c = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = c === null ? r : c.concat(r))));
						break;
					case 26: if (Nt) {
						d = Yr, Dn(r, t, a), Vn(t), c & 512 && (Ce || l === null || Fn(l, l.return)), c & 4 && (a = l !== null ? l.memoizedState : null, c = t.memoizedState, l === null ? c === null ? t.stateNode === null ? t.stateNode = xn ? ah(t.type, t.memoizedProps, r.containerInfo, t) : vg(d, t.type, t.memoizedProps, t) : xn || Rd(d, t.type, t.stateNode) : t.stateNode = rh(d, c, t.memoizedProps) : a !== c ? (a === null ? (r = l.stateNode, r === null || Ce || Ld(r)) : oh(a), c === null ? xn || Rd(d, t.type, t.stateNode) : rh(d, c, t.memoizedProps)) : c === null && t.stateNode !== null && Qc(t, t.memoizedProps, l.memoizedProps));
						break;
					}
					case 27: if (be) {
						Dn(r, t, a), Vn(t), c & 512 && (Ce || l === null || Fn(l, l.return)), l !== null && c & 4 && Qc(t, t.memoizedProps, l.memoizedProps);
						break;
					}
					case 5:
						if (d = Co, Co = !1, Dn(r, t, a), Co = d, Vn(t), c & 512 && (Ce || l === null || Fn(l, l.return)), Ye) {
							if (t.flags & 32) {
								r = t.stateNode;
								try {
									_t(r), Yn = !0;
								} catch (D) {
									ke(t, t.return, D);
								}
							}
							c & 4 && t.stateNode != null && (r = t.memoizedProps, Qc(t, r, l !== null ? l.memoizedProps : r)), c & 1024 && (Sh = !0);
						} else ln && t.alternate !== null && (t.alternate.stateNode = t.stateNode);
						break;
					case 6:
						if (Dn(r, t, a), Vn(t), c & 4 && Ye) {
							if (t.stateNode === null) throw Error(F(162));
							r = t.memoizedProps, c = l !== null ? l.memoizedProps : r, a = t.stateNode;
							try {
								Bp(a, c, r), Yn = !0;
							} catch (D) {
								ke(t, t.return, D);
							}
						}
						break;
					case 3:
						if (Yn = !1, Nt ? (ih(), d = Yr, Yr = Hl(r.containerInfo), Dn(r, t, a), Yr = d) : Dn(r, t, a), Vn(t), c & 4) {
							if (Ye && En && l !== null && l.memoizedState.isDehydrated) try {
								I0(r.containerInfo);
							} catch (D) {
								ke(t, t.return, D);
							}
							if (ln) {
								c = r.containerInfo, r = r.pendingChildren;
								try {
									qp(c, r), Yn = !0;
								} catch (D) {
									ke(t, t.return, D);
								}
							}
						}
						Sh && (Sh = !1, gp(t)), Yn = !1;
						break;
					case 4:
						l = Co, Co = xn, d = up(), Nt ? (h = Yr, Yr = Hl(t.stateNode.containerInfo), Dn(r, t, a), Vn(t), Yr = h) : (Dn(r, t, a), Vn(t)), Yn && Hu && (Qd = !0), Yn = d, Co = l, c & 4 && ln && cp(t.stateNode, t, t.stateNode.pendingChildren);
						break;
					case 12:
						Dn(r, t, a), Vn(t);
						break;
					case 31:
						Dn(r, t, a), Vn(t), c & 4 && (r = t.updateQueue, r !== null && (t.updateQueue = null, cu(t, r)));
						break;
					case 13:
						Dn(r, t, a), Vn(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ji = Tt()), c & 4 && (r = t.updateQueue, r !== null && (t.updateQueue = null, cu(t, r)));
						break;
					case 22:
						d = t.memoizedState !== null, h = l !== null && l.memoizedState !== null;
						var y = xn, C = Ce, R = Co;
						xn = y || d, Co = R || d, Ce = C || h, Dn(r, t, a), Ce = C, Co = R, xn = y, Vn(t), c & 8192 && (r = t.stateNode, r._visibility = d ? r._visibility & -2 : r._visibility | 1, !d || l === null || h || xn || Ce || (r = be ? 2 : 0, a = h || Ce, l = xn, h = Ce, xn = d || xn, Ce = a, xa(t, r), xn = l, Ce = h), Ye && (d || !Co) && El(t, d)), c & 4 && (r = t.updateQueue, r !== null && (c = r.retryQueue, c !== null && (r.retryQueue = null, cu(t, c))));
						break;
					case 19:
						Dn(r, t, a), Vn(t), c & 4 && (r = t.updateQueue, r !== null && (t.updateQueue = null, cu(t, r)));
						break;
					case 30:
						c & 512 && (Ce || l === null || Fn(l, l.return)), c = up(), d = Hu, h = (a & 335544064) === a, y = t.memoizedProps, Hu = h && At(y.default, y.update) !== "none", Dn(r, t, a), Vn(t), h && l !== null && Yn && (t.flags |= 4), Hu = d, Yn = c;
						break;
					case 21: break;
					case 7: c & 512 && (Ce || l === null || Fn(l, l.return)), l && l.stateNode !== null && x0(t, l.stateNode);
					default: Dn(r, t, a), Vn(t);
				}
			}
			function Vn(t) {
				var r = t.flags;
				if (r & 2) {
					try {
						for (var a, l = t.return; l !== null;) {
							if (bm(l)) {
								a = l;
								break;
							}
							l = l.return;
						}
						l = null;
						for (var c = t.return; c !== null;) {
							if (Vc(c)) {
								var d = c.stateNode;
								l === null ? l = [d] : l.push(d);
							}
							if (tu(c)) break;
							c = c.return;
						}
						var h = l;
						if (Ye) {
							if (a == null) throw Error(F(160));
							switch (a.tag) {
								case 27: if (be) {
									var y = a.stateNode;
									ru(t, qc(t), y, h);
									break;
								}
								case 5:
									var R = a.stateNode;
									a.flags & 32 && (_t(R), a.flags &= -33);
									ru(t, qc(t), R, h);
									break;
								case 3:
								case 4:
									var U = a.stateNode.containerInfo;
									Gc(t, qc(t), U, h);
									break;
								default: throw Error(F(161));
							}
						} else ou(t, h);
					} catch (fe) {
						ke(t, t.return, fe);
					}
					t.flags &= -3;
				}
				r & 4096 && (t.flags &= -4097);
			}
			function gp(t) {
				if (t.subtreeFlags & 1024) for (t = t.child; t !== null;) {
					var r = t;
					gp(r), r.tag === 5 && r.flags & 1024 && dr(r.stateNode), t = t.sibling;
				}
			}
			function or(t, r) {
				if (r.subtreeFlags & 9270) for (r = r.child; r !== null;) td(r, t), r = r.sibling;
				else pp(r, !1);
			}
			function td(t, r) {
				var a = t.alternate;
				if (a === null) iu(t, !1);
				else switch (t.tag) {
					case 3:
						if (kh = gr = !1, au(), or(r, t), !gr && !Qd) {
							if (t = Xr, t !== null) for (var l = 0; l < t.length; l += 3) ja(t[l], t[l + 1], t[l + 2]);
							Cd(r.containerInfo), kh = !0;
						}
						Xr = null;
						break;
					case 5:
						or(r, t);
						break;
					case 4:
						l = gr, gr = !1, or(r, t), gr && (Qd = !0), gr = l;
						break;
					case 22:
						t.memoizedState === null && (a.memoizedState !== null ? iu(t, !1) : or(r, t));
						break;
					case 30:
						l = gr;
						var c = au();
						gr = !1, or(r, t), gr && (t.flags |= 4);
						var d = t.memoizedProps, h = t.stateNode;
						r = mt(d, h), h = mt(a.memoizedProps, h);
						var y = At(d.default, d.update);
						y === "none" ? a = !1 : (d = a.memoizedState, a.memoizedState = null, a = t.child, vt = 0, a = uu(t, a, r, h, y, d, !0), vt !== (d === null ? 0 : d.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && a ? (yi(t, t.memoizedProps.onUpdate), Xr = c) : c !== null && (c.push.apply(c, Xr), Xr = c), gr = (t.flags & 32) !== 0 ? !0 : l;
						break;
					default: or(r, t);
				}
			}
			function ar(t, r) {
				if (r.subtreeFlags & 8772) for (r = r.child; r !== null;) Jc(t, r.alternate, r), r = r.sibling;
			}
			function xa(t, r) {
				for (t = t.child; t !== null;) {
					var a = t, l = r;
					switch (a.tag) {
						case 0:
						case 11:
						case 14:
						case 15:
							So(4, a, a.return), xa(a, l);
							break;
						case 1:
							Fn(a, a.return);
							var c = a.stateNode;
							typeof c.componentWillUnmount == "function" && sp(a, a.return, c), xa(a, l);
							break;
						case 27: be && l & 2 && xo(a.stateNode, a.type, a.memoizedProps);
						case 5:
							Fn(a, a.return), a.tag !== 5 && a.tag !== 27 || di(a), xa(a, l);
							break;
						case 6:
							di(a);
							break;
						case 26:
							Fn(a, a.return), Nt && (c = a.stateNode, a.memoizedState !== null || c === null || Ce || Ld(c)), xa(a, l);
							break;
						case 22:
							a.memoizedState === null && xa(a, l);
							break;
						case 30:
							Fn(a, a.return), xa(a, l);
							break;
						case 7: Fn(a, a.return);
						default: xa(a, l);
					}
					t = t.sibling;
				}
			}
			function Mr(t, r, a) {
				for (a = (r.subtreeFlags & 8772) !== 0 ? a : a & -2, r = r.child; r !== null;) {
					var l = r.alternate, c = t, d = r, h = d.flags, y = (a & 1) !== 0;
					switch (d.tag) {
						case 0:
						case 11:
						case 15:
							Mr(c, d, a), $o(4, d);
							break;
						case 1:
							if (Mr(c, d, a), l = d, c = l.stateNode, typeof c.componentDidMount == "function") try {
								c.componentDidMount();
							} catch (D) {
								ke(l, l.return, D);
							}
							if (l = d, c = l.updateQueue, c !== null) {
								var C = l.stateNode;
								try {
									var R = c.shared.hiddenCallbacks;
									if (R !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < R.length; c++) fm(R[c], C);
								} catch (D) {
									ke(l, l.return, D);
								}
							}
							y && h & 64 && nu(d), Hr(d, d.return);
							break;
						case 27: be && a & 2 && dp(d);
						case 5:
							d.tag !== 5 && d.tag !== 27 || Mc(d), Mr(c, d, a), y && l === null && h & 4 && $c(d), Hr(d, d.return);
							break;
						case 6:
							Mc(d);
							break;
						case 26:
							Nt && (C = d.stateNode, d.memoizedState !== null || C === null || xn || Rd(Hl(C.ownerDocument), d.type, C)), Mr(c, d, a), y && l === null && h & 4 && $c(d), Hr(d, d.return);
							break;
						case 12:
							Mr(c, d, a);
							break;
						case 31:
							Mr(c, d, a), y && h & 4 && Kc(c, d);
							break;
						case 13:
							Mr(c, d, a), y && h & 4 && mp(c, d);
							break;
						case 22:
							d.memoizedState === null && Mr(c, d, a), Hr(d, d.return);
							break;
						case 30:
							Mr(c, d, a), Hr(d, d.return);
							break;
						case 7: Hr(d, d.return);
						default: Mr(c, d, a);
					}
					r = r.sibling;
				}
			}
			function rd(t, r) {
				var a = null;
				t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), t = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (t = r.memoizedState.cachePool.pool), t !== a && (t != null && t.refCount++, a != null && Ns(a));
			}
			function mi(t, r) {
				t = null, r.alternate !== null && (t = r.alternate.memoizedState.cache), r = r.memoizedState.cache, r !== t && (r.refCount++, t != null && Ns(t));
			}
			function Ct(t, r, a, l) {
				var c = (a & 335544064) === a;
				if (r.subtreeFlags & (c ? 10262 : 10256)) for (r = r.child; r !== null;) du(t, r, a, l), r = r.sibling;
				else c && su(r);
			}
			function du(t, r, a, l) {
				var c = (a & 335544064) === a;
				c && r.alternate === null && r.return !== null && r.return.alternate !== null && zl(r);
				var d = r.flags;
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						Ct(t, r, a, l), d & 2048 && $o(9, r);
						break;
					case 1:
						Ct(t, r, a, l);
						break;
					case 3:
						Ct(t, r, a, l), c && Ye && kh && $p(t.containerInfo), d & 2048 && (t = null, r.alternate !== null && (t = r.alternate.memoizedState.cache), r = r.memoizedState.cache, r !== t && (r.refCount++, t != null && Ns(t)));
						break;
					case 12:
						if (d & 2048) {
							Ct(t, r, a, l), t = r.stateNode;
							try {
								var h = r.memoizedProps, y = h.id, C = h.onPostCommit;
								typeof C == "function" && C(y, r.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
							} catch (R) {
								ke(r, r.return, R);
							}
						} else Ct(t, r, a, l);
						break;
					case 31:
						Ct(t, r, a, l);
						break;
					case 13:
						Ct(t, r, a, l);
						break;
					case 23: break;
					case 22:
						h = r.stateNode, y = r.alternate, r.memoizedState !== null ? (c && y !== null && y.memoizedState === null && zl(y), h._visibility & 2 ? Ct(t, r, a, l) : Nl(t, r)) : (c && y !== null && y.memoizedState !== null && zl(r), h._visibility & 2 ? Ct(t, r, a, l) : (h._visibility |= 2, gi(t, r, a, l, (r.subtreeFlags & 10256) !== 0 || !1))), d & 2048 && rd(y, r);
						break;
					case 24:
						Ct(t, r, a, l), d & 2048 && mi(r.alternate, r);
						break;
					case 30:
						c && (c = r.alternate, c !== null && (Mt(c.child, !0), Mt(r.child, !0))), Ct(t, r, a, l);
						break;
					default: Ct(t, r, a, l);
				}
			}
			function gi(t, r, a, l, c) {
				for (c = c && ((r.subtreeFlags & 10256) !== 0 || !1), r = r.child; r !== null;) {
					var d = t, h = r, y = a, C = l, R = h.flags;
					switch (h.tag) {
						case 0:
						case 11:
						case 15:
							gi(d, h, y, C, c), $o(8, h);
							break;
						case 23: break;
						case 22:
							var D = h.stateNode;
							h.memoizedState !== null ? D._visibility & 2 ? gi(d, h, y, C, c) : Nl(d, h) : (D._visibility |= 2, gi(d, h, y, C, c)), c && R & 2048 && rd(h.alternate, h);
							break;
						case 24:
							gi(d, h, y, C, c), c && R & 2048 && mi(h.alternate, h);
							break;
						default: gi(d, h, y, C, c);
					}
					r = r.sibling;
				}
			}
			function Nl(t, r) {
				if (r.subtreeFlags & 10256) for (r = r.child; r !== null;) {
					var a = t, l = r, c = l.flags;
					switch (l.tag) {
						case 22:
							Nl(a, l), c & 2048 && rd(l.alternate, l);
							break;
						case 24:
							Nl(a, l), c & 2048 && mi(l.alternate, l);
							break;
						default: Nl(a, l);
					}
					r = r.sibling;
				}
			}
			function ko(t, r, a) {
				if (t.subtreeFlags & Di) for (t = t.child; t !== null;) od(t, r, a), t = t.sibling;
			}
			function od(t, r, a) {
				switch (t.tag) {
					case 26:
						if (ko(t, r, a), t.flags & Di) if (t.memoizedState !== null) F0(a, Yr, t.memoizedState, t.memoizedProps);
						else {
							var l = t.stateNode, c = t.type;
							t = t.memoizedProps, ((r & 335544128) === r || wd(c, t)) && Xo(a, l, c, t);
						}
						break;
					case 5:
						ko(t, r, a), t.flags & Di && (l = t.stateNode, c = t.type, t = t.memoizedProps, ((r & 335544128) === r || wd(c, t)) && Xo(a, l, c, t));
						break;
					case 3:
					case 4:
						Nt ? (l = Yr, Yr = Hl(t.stateNode.containerInfo), ko(t, r, a), Yr = l) : ko(t, r, a);
						break;
					case 22:
						t.memoizedState === null && (l = t.alternate, l !== null && l.memoizedState !== null ? (l = Di, Di = 16777216, ko(t, r, a), Di = l) : ko(t, r, a));
						break;
					case 30:
						(t.flags & Di) !== 0 && (l = t.memoizedProps.name, l != null && l !== "auto" && (c = t.stateNode, c.paired = null, Rt === null && (Rt = /* @__PURE__ */ new Map()), Rt.set(l, c))), ko(t, r, a);
						break;
					default: ko(t, r, a);
				}
			}
			function bp(t) {
				var r = t.alternate;
				if (r !== null && (t = r.child, t !== null)) {
					r.child = null;
					do
						r = t.sibling, t.sibling = null, t = r;
					while (t !== null);
				}
			}
			function Tl(t) {
				var r = t.deletions;
				if ((t.flags & 16) !== 0) {
					if (r !== null) for (var a = 0; a < r.length; a++) {
						var l = r[a];
						An = l, yp(l, t);
					}
					bp(t);
				}
				if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Ca(t), t = t.sibling;
			}
			function Ca(t) {
				switch (t.tag) {
					case 0:
					case 11:
					case 15:
						Tl(t), t.flags & 2048 && So(9, t, t.return);
						break;
					case 3:
						Tl(t);
						break;
					case 12:
						Tl(t);
						break;
					case 22:
						var r = t.stateNode;
						t.memoizedState !== null && r._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (r._visibility &= -3, bi(t)) : Tl(t);
						break;
					default: Tl(t);
				}
			}
			function bi(t) {
				var r = t.deletions;
				if ((t.flags & 16) !== 0) {
					if (r !== null) for (var a = 0; a < r.length; a++) {
						var l = r[a];
						An = l, yp(l, t);
					}
					bp(t);
				}
				for (t = t.child; t !== null;) {
					switch (r = t, r.tag) {
						case 0:
						case 11:
						case 15:
							So(8, r, r.return), bi(r);
							break;
						case 22:
							a = r.stateNode, a._visibility & 2 && (a._visibility &= -3, bi(r));
							break;
						default: bi(r);
					}
					t = t.sibling;
				}
			}
			function yp(t, r) {
				for (; An !== null;) {
					var a = An;
					switch (a.tag) {
						case 0:
						case 11:
						case 15:
							So(8, a, r);
							break;
						case 23:
						case 22:
							if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
								var l = a.memoizedState.cachePool.pool;
								l != null && l.refCount++;
							}
							break;
						case 24: Ns(a.memoizedState.cache);
					}
					if (l = a.child, l !== null) l.return = a, An = l;
					else e: for (a = t; An !== null;) {
						l = An;
						var c = l.sibling, d = l.return;
						if (Xc(l), l === a) {
							An = null;
							break e;
						}
						if (c !== null) {
							c.return = d, An = c;
							break e;
						}
						An = d;
					}
				}
			}
			function fu(t) {
				var r = jm(t);
				if (r != null) {
					if (typeof r.memoizedProps["data-testname"] != "string") throw Error(F(364));
					return r;
				}
				if (t = _u(t), t === null) throw Error(F(362));
				return t.stateNode.current;
			}
			function pu(t, r) {
				var a = t.tag;
				switch (r.$$typeof) {
					case qd:
						if (t.type === r.value) return !0;
						break;
					case Gd:
						e: {
							for (r = r.value, t = [t, 0], a = 0; a < t.length;) {
								var l = t[a++], c = l.tag, d = t[a++], h = r[d];
								if (c !== 5 && c !== 26 && c !== 27 || !Wl(l)) {
									for (; h != null && pu(l, h);) d++, h = r[d];
									if (d === r.length) {
										r = !0;
										break e;
									} else for (l = l.child; l !== null;) t.push(l, d), l = l.sibling;
								}
							}
							r = !1;
						}
						return r;
					case Jd:
						if ((a === 5 || a === 26 || a === 27) && Nu(t.stateNode, r.value)) return !0;
						break;
					case Xd:
						if ((a === 5 || a === 6 || a === 26 || a === 27) && (t = Mm(t), t !== null && 0 <= t.indexOf(r.value))) return !0;
						break;
					case Zd:
						if ((a === 5 || a === 26 || a === 27) && (t = t.memoizedProps["data-testname"], typeof t == "string" && t.toLowerCase() === r.value.toLowerCase())) return !0;
						break;
					default: throw Error(F(365));
				}
				return !1;
			}
			function hu(t) {
				switch (t.$$typeof) {
					case qd: return "<" + (gc(t.value) || "Unknown") + ">";
					case Gd: return ":has(" + (hu(t) || "") + ")";
					case Jd: return "[role=\"" + t.value + "\"]";
					case Xd: return "\"" + t.value + "\"";
					case Zd: return "[data-testname=\"" + t.value + "\"]";
					default: throw Error(F(365));
				}
			}
			function vm(t, r) {
				var a = [];
				t = [t, 0];
				for (var l = 0; l < t.length;) {
					var c = t[l++], d = c.tag, h = t[l++], y = r[h];
					if (d !== 5 && d !== 26 && d !== 27 || !Wl(c)) {
						for (; y != null && pu(c, y);) h++, y = r[h];
						if (h === r.length) a.push(c);
						else for (c = c.child; c !== null;) t.push(c, h), c = c.sibling;
					}
				}
				return a;
			}
			function bn(t, r) {
				if (!Ul) throw Error(F(363));
				t = fu(t), t = vm(t, r), r = [], t = Array.from(t);
				for (var a = 0; a < t.length;) {
					var l = t[a++], c = l.tag;
					if (c === 5 || c === 26 || c === 27) Wl(l) || r.push(l.stateNode);
					else for (l = l.child; l !== null;) t.push(l), l = l.sibling;
				}
				return r;
			}
			function zt() {
				return (de & 2) !== 0 && ye !== 0 ? ye & -ye : Q.T !== null ? Sc() : Qn();
			}
			function vp() {
				if (Ft === 0) if ((ye & 536870912) === 0 || ne) {
					var t = Ei;
					Ei <<= 1, !(Ei & 3932160) && (Ei = 262144), Ft = t;
				} else Ft = 536870912;
				return t = Zn.current, t !== null && (t.flags |= 32), Ft;
			}
			function yi(t, r) {
				if (r != null) {
					var a = t.stateNode, l = a.ref;
					l === null && (l = a.ref = Iu(mt(t.memoizedProps, a))), Ui === null && (Ui = []), Ui.push(r.bind(null, l));
				}
			}
			function yt(t, r, a) {
				(t === Be && (Ie === 2 || Ie === 9) || t.cancelPendingCommit !== null) && (Ea(t, 0), Go(t, ye, Ft, !1)), Ki(t, a), (!(de & 2) || t !== Be) && (t === Be && (!(de & 2) && (Ma |= a), cn === 4 && Go(t, ye, Ft, !1)), xr(t));
			}
			function Il(t, r, a) {
				if ((de & 6) !== 0) throw Error(F(327));
				var l = !a && (r & 127) === 0 && (r & t.expiredLanes) === 0 || Yi(t, r), c = l ? xp(t, r) : mu(t, r, !0), d = l;
				do {
					if (c === 0) {
						Kl && !l && Go(t, r, 0, !1);
						break;
					} else {
						if (a = t.current.alternate, d && !ad(a)) {
							c = mu(t, r, !1), d = !1;
							continue;
						}
						if (c === 2) {
							if (d = r, t.errorRecoveryDisabledLanes & d) var h = 0;
							else h = t.pendingLanes & -536870913, h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
							if (h !== 0) {
								r = h;
								e: {
									var y = t;
									c = Vu;
									var C = En && y.current.memoizedState.isDehydrated;
									if (C && (Ea(y, h).flags |= 256), h = mu(y, h, !1), h !== 2 && h !== 6) {
										if (wh && !C) {
											y.errorRecoveryDisabledLanes |= d, Ma |= d, c = 4;
											break e;
										}
										d = Ze, Ze = c, d !== null && (Ze === null ? Ze = d : Ze.push.apply(Ze, d));
									}
									c = h;
								}
								if (d = !1, c !== 2) continue;
							}
						}
						if (c === 1) {
							Ea(t, 0), Go(t, r, 0, !0);
							break;
						}
						e: {
							switch (l = t, d = c, d) {
								case 0:
								case 1: throw Error(F(345));
								case 4: if ((r & 4194048) !== r && (r & 62914560) !== r) break;
								case 6:
									Go(l, r, Ft, !Ha);
									break e;
								case 2:
									Ze = null;
									break;
								case 3:
								case 5: break;
								default: throw Error(F(329));
							}
							if ((r & 62914560) === r && (c = ji + 300 - Tt(), 10 < c)) {
								if (Go(l, r, Ft, !Ha), ao(l, 0, !0) !== 0) break e;
								zo = r, l.timeoutHandle = Dm(Sp.bind(null, l, a, Ze, $u, Kd, r, Ft, Ma, es, Ha, d, "Throttled", -0, 0), c);
								break e;
							}
							Sp(l, a, Ze, $u, Kd, r, Ft, Ma, es, Ha, d, null, -0, 0);
						}
					}
					break;
				} while (!0);
				xr(t);
			}
			function Sp(t, r, a, l, c, d, h, y, C, R, D, U, A, fe) {
				t.timeoutHandle = La;
				var Ne = r.subtreeFlags, Re = (d & 335544064) === d;
				if (U = null, (Re || Ne & 8192 || (Ne & 16785408) === 16785408) && (U = Om(), Rt = null, od(r, d, U), Re && Bm(U, t.containerInfo), Ne = (d & 62914560) === d ? ji - Tt() : (d & 4194048) === d ? Ph - Tt() : 0, Ne = cr(U, Ne), Ne !== null)) {
					zo = d, t.cancelPendingCommit = Ne(sd.bind(null, t, r, d, a, l, c, h, y, C, R, D, U, null, A, fe)), Go(t, d, h, !R);
					return;
				}
				sd(t, r, d, a, l, c, h, y, C, R, D, U);
			}
			function ad(t) {
				for (var r = t;;) {
					var a = r.tag;
					if ((a === 0 || a === 11 || a === 15) && r.flags & 16384 && (a = r.updateQueue, a !== null && (a = a.stores, a !== null))) for (var l = 0; l < a.length; l++) {
						var c = a[l], d = c.getSnapshot;
						c = c.value;
						try {
							if (!$t(d(), c)) return !1;
						} catch {
							return !1;
						}
					}
					if (a = r.child, r.subtreeFlags & 16384 && a !== null) a.return = r, r = a;
					else {
						if (r === t) break;
						for (; r.sibling === null;) {
							if (r.return === null || r.return === t) return !0;
							r = r.return;
						}
						r.sibling.return = r.return, r = r.sibling;
					}
				}
				return !0;
			}
			function Go(t, r, a, l) {
				r = _f(t, r), r &= ~Yd, r &= ~Ma, t.suspendedLanes |= r, t.pingedLanes &= ~r, l && (t.warmLanes |= r), l = t.expirationTimes;
				for (var c = r; 0 < c;) {
					var d = 31 - sn(c), h = 1 << d;
					l[d] = -1, c &= ~h;
				}
				a !== 0 && en(t, a, r);
			}
			function Sm() {
				return (de & 6) === 0 ? (tl(0, !1), !1) : !0;
			}
			function za() {
				if (he !== null) {
					if (Ie === 0) var t = he.return;
					else t = he, qr = Ni = null, dl(t), Zl = null, Au = 0, t = he;
					for (; t !== null;) Hc(t.alternate, t), t = t.return;
					he = null;
				}
			}
			function Ea(t, r) {
				var a = t.timeoutHandle;
				return a !== La && (t.timeoutHandle = La, Op(a)), a = t.cancelPendingCommit, a !== null && (t.cancelPendingCommit = null, a()), zo = 0, za(), Be = t, he = a = Zo(t.current, null), ye = r, Ie = 0, Qt = null, Ha = !1, Kl = Yi(t, r), wh = !1, es = Ft = Yd = Ma = aa = cn = 0, Ze = Vu = null, Kd = !1, oa = _f(t, r), Wo(), a;
			}
			function kp(t, r) {
				re = null, Q.H = Bu, r === Jl || r === Wd ? (r = ai(), Ie = 3) : r === gh ? (r = ai(), Ie = 4) : Ie = r === vh ? 8 : r !== null && typeof r == "object" && typeof r.then == "function" ? 6 : 1, Qt = r, he === null && (cn = 1, $s(t, Kt(r, t.current)));
			}
			function wp() {
				var t = Zn.current;
				return t === null ? !0 : (ye & 4194048) === ye ? lt === null : (ye & 62914560) === ye || (ye & 536870912) !== 0 ? t === lt : !1;
			}
			function Pp() {
				var t = Q.H;
				return Q.H = Bu, t === null ? Bu : t;
			}
			function id() {
				var t = Q.A;
				return Q.A = H0, t;
			}
			function Rl() {
				cn = 4, Ha || (ye & 4194048) !== ye && Zn.current !== null || (Kl = !0), !(aa & 134217727) && !(Ma & 134217727) || Be === null || Go(Be, ye, Ft, !1);
			}
			function mu(t, r, a) {
				var l = de;
				de |= 2;
				var c = Pp(), d = id();
				(Be !== t || ye !== r) && ($u = null, Ea(t, r)), r = !1;
				var h = cn;
				e: do
					try {
						if (Ie !== 0 && he !== null) {
							var y = he, C = Qt;
							switch (Ie) {
								case 8:
									za(), h = 6;
									break e;
								case 3:
								case 2:
								case 9:
								case 6:
									Zn.current === null && (r = !0);
									var R = Ie;
									if (Ie = 0, Qt = null, vi(t, y, C, R), a && Kl) {
										h = 0;
										break e;
									}
									break;
								default: R = Ie, Ie = 0, Qt = null, vi(t, y, C, R);
							}
						}
						km(), h = cn;
						break;
					} catch (D) {
						kp(t, D);
					}
				while (!0);
				return r && t.shellSuspendCounter++, qr = Ni = null, de = l, Q.H = c, Q.A = d, he === null && (Be = null, ye = 0, Wo()), h;
			}
			function km() {
				for (; he !== null;) gu(he);
			}
			function xp(t, r) {
				var a = de;
				de |= 2;
				var l = Pp(), c = id();
				Be !== t || ye !== r ? ($u = null, ns = Tt() + 500, Ea(t, r)) : Kl = Yi(t, r);
				e: do
					try {
						if (Ie !== 0 && he !== null) {
							r = he;
							var d = Qt;
							n: switch (Ie) {
								case 1:
									Ie = 0, Qt = null, vi(t, r, d, 1);
									break;
								case 2:
								case 9:
									if (jo(d)) {
										Ie = 0, Qt = null, wm(r);
										break;
									}
									r = function() {
										Ie !== 2 && Ie !== 9 || Be !== t || (Ie = 7), xr(t);
									}, d.then(r, r);
									break e;
								case 3:
									Ie = 7;
									break e;
								case 4:
									Ie = 5;
									break e;
								case 7:
									jo(d) ? (Ie = 0, Qt = null, wm(r)) : (Ie = 0, Qt = null, vi(t, r, d, 7));
									break;
								case 5:
									var h = null;
									switch (he.tag) {
										case 26: h = he.memoizedState;
										case 5:
										case 27:
											var y = he, C = y.type, R = y.pendingProps;
											if (h ? ce(h) : ur(y.stateNode, C, R)) {
												Ie = 0, Qt = null;
												var D = y.sibling;
												if (D !== null) he = D;
												else {
													var U = y.return;
													U !== null ? (he = U, bu(U)) : he = null;
												}
												break n;
											}
									}
									Ie = 0, Qt = null, vi(t, r, d, 5);
									break;
								case 6:
									Ie = 0, Qt = null, vi(t, r, d, 6);
									break;
								case 8:
									za(), cn = 6;
									break e;
								default: throw Error(F(462));
							}
						}
						ld();
						break;
					} catch (A) {
						kp(t, A);
					}
				while (!0);
				return qr = Ni = null, Q.H = l, Q.A = c, de = a, he !== null ? 0 : (Be = null, ye = 0, Wo(), cn);
			}
			function ld() {
				for (; he !== null && !j0();) gu(he);
			}
			function gu(t) {
				var r = ip(t.alternate, t, oa);
				t.memoizedProps = t.pendingProps, r === null ? bu(t) : he = r;
			}
			function wm(t) {
				var r = t, a = r.alternate;
				switch (r.tag) {
					case 15:
					case 0:
						r = rp(a, r, r.pendingProps, r.type, void 0, ye);
						break;
					case 11:
						r = rp(a, r, r.pendingProps, r.type.render, r.ref, ye);
						break;
					case 5:
						dl(r);
						var l = r;
						En && l === Nn && (ne ? (er(l), l.tag === 5 && l.stateNode != null && (Qe = l.stateNode)) : (er(l), ne = !0));
					default: Hc(a, r), r = he = Np(r, oa), r = ip(a, r, oa);
				}
				t.memoizedProps = t.pendingProps, r === null ? bu(t) : he = r;
			}
			function vi(t, r, a, l) {
				qr = Ni = null, dl(r), Zl = null, Au = 0;
				var c = r.return;
				try {
					if (tt(t, c, r, a, ye)) {
						cn = 1, $s(t, Kt(a, t.current)), he = null;
						return;
					}
				} catch (d) {
					if (c !== null) throw he = c, d;
					cn = 1, $s(t, Kt(a, t.current)), he = null;
					return;
				}
				r.flags & 32768 ? (ne || l === 1 ? t = !0 : Kl || (ye & 536870912) !== 0 ? t = !1 : (Ha = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Zn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), yu(r, t)) : bu(r);
			}
			function bu(t) {
				var r = t;
				do {
					if ((r.flags & 32768) !== 0) {
						yu(r, Ha);
						return;
					}
					t = r.return;
					var a = lp(r.alternate, r, oa);
					if (a !== null) {
						he = a;
						return;
					}
					if (r = r.sibling, r !== null) {
						he = r;
						return;
					}
					he = r = t;
				} while (r !== null);
				cn === 0 && (cn = 5);
			}
			function yu(t, r) {
				do {
					var a = xl(t.alternate, t);
					if (a !== null) {
						a.flags &= 32767, he = a;
						return;
					}
					if (a = t.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !r && (t = t.sibling, t !== null)) {
						he = t;
						return;
					}
					he = t = a;
				} while (t !== null);
				cn = 6, he = null;
			}
			function sd(t, r, a, l, c, d, h, y, C, R, D, U) {
				t.cancelPendingCommit = null;
				do
					_a();
				while (Xe !== 0);
				if ((de & 6) !== 0) throw Error(F(327));
				if (r !== null) {
					if (r === t.current) throw Error(F(177));
					t === Be && (he = Be = null, ye = 0), $a = r, qt = t, zo = a, ef = c, Tg = l, Cp(t, r, a, h, y, C, U);
				}
			}
			function Cp(t, r, a, l, c, d, h) {
				var y = r.lanes | r.childLanes;
				if (xh = y, y |= bh, ti(t, a, y, l, c, d), Ui = null, (a & 335544064) === a ? (ts = lm(t), l = 10262) : (ts = null, l = 10256), (r.subtreeFlags & l) !== 0 || (r.flags & l) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, ku(dh, function() {
					return ud(), null;
				})) : (t.callbackNode = null, t.callbackPriority = 0), $d = !1, l = (r.flags & 13878) !== 0, (r.subtreeFlags & 13878) !== 0 || l) {
					l = Q.T, Q.T = null, c = sr(), jn(2), d = de, de |= 4;
					try {
						hp(t, r, a);
					} finally {
						de = d, jn(c), Q.T = l;
					}
				}
				Xe = 1, $d ? je = Km(h, t.containerInfo, ts, vu, zp, Jo, Su, ud, Pm, null, null) : (vu(), zp(), Su());
			}
			function Pm(t) {
				if (Xe !== 0) {
					var r = qt.onRecoverableError;
					r(t, { componentStack: null });
				}
			}
			function Jo() {
				Xe === 3 && (Xe = 0, td($a, qt), Xe = 4);
			}
			function vu() {
				if (Xe === 1) {
					Xe = 0;
					var t = qt, r = $a, a = zo, l = (r.flags & 13878) !== 0;
					if ((r.subtreeFlags & 13878) !== 0 || l) {
						l = Q.T, Q.T = null;
						var c = sr();
						jn(2);
						var d = de;
						de |= 4;
						try {
							Hu = Qd = !1, nd(r, t, a), Lm(t.containerInfo);
						} finally {
							de = d, jn(c), Q.T = l;
						}
					}
					t.current = r, Xe = 2;
				}
			}
			function zp() {
				if (Xe === 2) {
					Xe = 0;
					var t = qt, r = $a, a = (r.flags & 8772) !== 0;
					if ((r.subtreeFlags & 8772) !== 0 || a) {
						a = Q.T, Q.T = null;
						var l = sr();
						jn(2);
						var c = de;
						de |= 4;
						try {
							Jc(t, r.alternate, r);
						} finally {
							de = c, jn(l), Q.T = a;
						}
					}
					Xe = 3;
				}
			}
			function Su() {
				if (Xe === 4 || Xe === 3) {
					Xe = 0;
					var t = je;
					je = null, uh();
					var r = qt, a = $a, l = zo, c = Tg, d = (l & 335544064) === l ? 10262 : 10256;
					if ((a.subtreeFlags & d) !== 0 || (a.flags & d) !== 0 ? Xe = 5 : (Xe = 0, $a = qt = null, ir(r, r.pendingLanes)), d = r.pendingLanes, d === 0 && (Va = null), ze(l), a = a.stateNode, It && typeof It.onCommitFiberRoot == "function") try {
						It.onCommitFiberRoot(Lu, a, void 0, (a.current.flags & 128) === 128);
					} catch {}
					if (c !== null) {
						a = Q.T, d = sr(), jn(2), Q.T = null;
						try {
							for (var h = r.onRecoverableError, y = 0; y < c.length; y++) {
								var C = c[y];
								h(C.value, { componentStack: C.stack });
							}
						} finally {
							Q.T = a, jn(d);
						}
					}
					if (c = Ui, h = ts, ts = null, c !== null && (Ui = null, h === null && (h = []), t !== null)) for (C = 0; C < c.length; C++) a = (0, c[C])(h), a !== void 0 && zd(t, a);
					zo & 3 && _a(), xr(r), d = r.pendingLanes, (l & 261930) !== 0 && (d & 42) !== 0 ? r === Qu ? rs++ : (rs = 0, Qu = r) : (rs = 0, Qu = null), En && gg(), tl(0, !1);
				}
			}
			function ir(t, r) {
				(t.pooledCacheLanes &= r) === 0 && (r = t.pooledCache, r != null && (t.pooledCache = null, Ns(r)));
			}
			function _a() {
				return je !== null && (eg(je), je = null), vu(), zp(), Su(), ud();
			}
			function ud() {
				if (Xe !== 5) return !1;
				var t = qt, r = xh;
				xh = 0;
				var a = ze(zo), l = 32 > a ? 32 : a;
				a = Q.T;
				var c = sr();
				try {
					jn(l), Q.T = null, l = ef, ef = null;
					var d = qt, h = zo;
					if (Xe = 0, $a = qt = null, zo = 0, (de & 6) !== 0) throw Error(F(331));
					var y = de;
					if (de |= 4, Ca(d.current), du(d, d.current, h, l), de = y, tl(0, !1), It && typeof It.onPostCommitFiberRoot == "function") try {
						It.onPostCommitFiberRoot(Lu, d);
					} catch {}
					return !0;
				} finally {
					jn(c), Q.T = a, ir(t, r);
				}
			}
			function cd(t, r, a) {
				r = Kt(a, r), r = vl(t.stateNode, r, 2), t = ka(t, r, 2), t !== null && (Ki(t, 2), xr(t));
			}
			function ke(t, r, a) {
				if (t.tag === 3) cd(t, t, a);
				else for (; r !== null;) {
					if (r.tag === 3) {
						cd(r, t, a);
						break;
					} else if (r.tag === 1) {
						var l = r.stateNode;
						if (typeof r.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Va === null || !Va.has(l))) {
							t = Kt(a, t), a = Qs(2), l = ka(r, a, 2), l !== null && (Rc(a, l, r, t), Ki(l, 2), xr(l));
							break;
						}
					}
					r = r.return;
				}
			}
			function dd(t, r, a) {
				var l = t.pingCache;
				if (l === null) {
					l = t.pingCache = new M0();
					var c = /* @__PURE__ */ new Set();
					l.set(r, c);
				} else c = l.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), l.set(r, c));
				c.has(a) || (wh = !0, c.add(a), t = Ep.bind(null, t, r, a), r.then(t, t));
			}
			function Ep(t, r, a) {
				var l = t.pingCache;
				l !== null && l.delete(r), t.pingedLanes |= t.suspendedLanes & a, t.warmLanes &= ~a, Be === t && (ye & a) === a && ((cn === 4 || cn === 3 && (ye & 62914560) === ye && 300 > Tt() - ji) && (de & 2) === 0 ? Ea(t, 0) : Yd |= a, es === ye && (es = 0)), xr(t);
			}
			function fd(t, r) {
				r === 0 && (r = Nf()), t = Er(t, r), t !== null && (Ki(t, r), xr(t));
			}
			function xm(t) {
				var r = t.memoizedState, a = 0;
				r !== null && (a = r.retryLane), fd(t, a);
			}
			function pd(t, r) {
				var a = 0;
				switch (t.tag) {
					case 31:
					case 13:
						var l = t.stateNode, c = t.memoizedState;
						c !== null && (a = c.retryLane);
						break;
					case 19:
						l = t.stateNode;
						break;
					case 22:
						l = t.stateNode._retryCache;
						break;
					default: throw Error(F(314));
				}
				l !== null && l.delete(r), fd(t, a);
			}
			function ku(t, r) {
				return $l(t, r);
			}
			function Fe(t, r, a, l) {
				this.tag = t, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
			}
			function _p(t) {
				return t = t.prototype, !(!t || !t.isReactComponent);
			}
			function Zo(t, r) {
				var a = t.alternate;
				return a === null ? (a = et(t.tag, r, t.key, t.mode), a.elementType = t.elementType, a.type = t.type, a.stateNode = t.stateNode, a.alternate = t, t.alternate = a) : (a.pendingProps = r, a.type = t.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = t.flags & 1206910976, a.childLanes = t.childLanes, a.lanes = t.lanes, a.child = t.child, a.memoizedProps = t.memoizedProps, a.memoizedState = t.memoizedState, a.updateQueue = t.updateQueue, r = t.dependencies, a.dependencies = r === null ? null : {
					lanes: r.lanes,
					firstContext: r.firstContext
				}, a.sibling = t.sibling, a.index = t.index, a.ref = t.ref, a.refCleanup = t.refCleanup, a;
			}
			function Np(t, r) {
				t.flags &= 1206910978;
				var a = t.alternate;
				return a === null ? (t.childLanes = 0, t.lanes = r, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = a.childLanes, t.lanes = a.lanes, t.child = a.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = a.memoizedProps, t.memoizedState = a.memoizedState, t.updateQueue = a.updateQueue, t.type = a.type, r = a.dependencies, t.dependencies = r === null ? null : {
					lanes: r.lanes,
					firstContext: r.firstContext
				}), t;
			}
			function Vt(t, r, a, l, c, d) {
				var h = 0;
				if (l = t, typeof l == "function") _p(l) && (h = 1);
				else if (typeof l == "string") h = Nt && be ? th(t, a, Jn.current) ? 26 : Ua(t) ? 27 : 5 : Nt ? th(t, a, Jn.current) ? 26 : 5 : be && Ua(t) ? 27 : 5;
				else e: switch (l) {
					case zu: return t = et(31, a, r, c), t.elementType = zu, t.lanes = d, t;
					case wo: return Na(a.children, c, d, r);
					case md:
						h = 8, c |= 24;
						break;
					case Pu: return t = et(12, a, r, c | 2), t.elementType = Pu, t.lanes = d, t;
					case xu: return t = et(13, a, r, c), t.elementType = xu, t.lanes = d, t;
					case Cu: return t = et(19, a, r, c), t.elementType = Cu, t.lanes = d, t;
					case Nm:
					case yd: return t = c | 32, t = et(30, a, r, t), t.elementType = yd, t.lanes = d, t.stateNode = {
						autoName: null,
						paired: null,
						clones: null,
						ref: null
					}, t;
					default:
						if (typeof l == "object" && l !== null) switch (l.$$typeof) {
							case Vr:
								h = 10;
								break e;
							case gd:
								h = 9;
								break e;
							case bd:
								h = 11;
								break e;
							case Fl:
								h = 14;
								break e;
							case Ra:
								h = 16, l = null;
								break e;
						}
						h = 29, a = Error(F(130, t === null ? "null" : typeof t, "")), l = null;
				}
				return r = et(h, a, r, c), r.elementType = t, r.type = l, r.lanes = d, r;
			}
			function Na(t, r, a, l) {
				return t = et(7, t, l, r), t.lanes = a, t;
			}
			function wu(t, r, a) {
				return t = et(6, t, null, r), t.lanes = a, t;
			}
			function Ll(t) {
				var r = et(18, null, null, 0);
				return r.stateNode = t, r;
			}
			function Ta(t, r, a) {
				return r = et(4, t.children !== null ? t.children : [], t.key, r), r.lanes = a, r.stateNode = {
					containerInfo: t.containerInfo,
					pendingChildren: null,
					implementation: t.implementation
				}, r;
			}
			function Cm(t, r, a, l, c, d, h, y, C) {
				this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = La, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = bc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = bc(0), this.hiddenUpdates = bc(null), this.identifierPrefix = l, this.onUncaughtError = c, this.onCaughtError = d, this.onRecoverableError = h, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = C, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
			}
			function hd(t, r, a, l, c, d, h, y, C, R, D, U) {
				return t = new Cm(t, r, a, h, C, R, D, U, y), r = 1, d === !0 && (r |= 24), d = et(3, null, null, r), t.current = d, d.stateNode = t, r = _s(), r.refCount++, t.pooledCache = r, r.refCount++, d.memoizedState = {
					element: l,
					isDehydrated: a,
					cache: r
				}, ii(d), t;
			}
			function Tp(t) {
				return t ? (t = Aa, t) : Aa;
			}
			function zm(t) {
				var r = t._reactInternals;
				if (r === void 0) throw typeof t.render == "function" ? Error(F(188)) : (t = Object.keys(t).join(","), Error(F(268, t)));
				return t = hc(r), t = t !== null ? mc(t) : null, t === null ? null : Pi(t.stateNode);
			}
			function Em(t, r, a, l, c, d) {
				c = Tp(c), l.context === null ? l.context = c : l.pendingContext = c, l = po(r), l.payload = { element: a }, d = d === void 0 ? null : d, d !== null && (l.callback = d), a = ka(t, l, r), a !== null && (yt(a, t, r), Ls(a, t, r));
			}
			function Ip(t, r) {
				if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
					var a = t.retryLane;
					t.retryLane = a !== 0 && a < r ? a : r;
				}
			}
			function Rp(t, r) {
				Ip(t, r), (t = t.alternate) && Ip(t, r);
			}
			var Y = {}, $n = import_react.default, Et = import_scheduler.default, Lp = Object.assign, _m = Symbol.for("react.element"), Ia = Symbol.for("react.transitional.element"), Si = Symbol.for("react.portal"), wo = Symbol.for("react.fragment"), md = Symbol.for("react.strict_mode"), Pu = Symbol.for("react.profiler"), gd = Symbol.for("react.consumer"), Vr = Symbol.for("react.context"), bd = Symbol.for("react.forward_ref"), xu = Symbol.for("react.suspense"), Cu = Symbol.for("react.suspense_list"), Fl = Symbol.for("react.memo"), Ra = Symbol.for("react.lazy");
			var zu = Symbol.for("react.activity"), Nm = Symbol.for("react.legacy_hidden");
			var Tm = Symbol.for("react.memo_cache_sentinel"), yd = Symbol.for("react.view_transition"), Im = Symbol.for("react.recoverable"), ki = Symbol.iterator, Fp = Symbol.for("react.optimistic_key"), Po = Symbol.for("react.client.reference"), wi = Array.isArray, Q = $n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Dp = m.rendererVersion, jp = m.rendererPackageName, Up = m.extraDevToolsConfig, Pi = m.getPublicInstance, vd = m.getRootHostContext, Rm = m.getChildHostContext, Wp = m.prepareForCommit, Lm = m.resetAfterCommit, Fm = m.createInstance;
			m.cloneMutableInstance;
			var Sd = m.appendInitialChild, Ap = m.finalizeInitialChildren, kd = m.shouldSetTextContent, Eu = m.createTextInstance;
			m.cloneMutableTextInstance;
			var Dm = m.scheduleTimeout, Op = m.cancelTimeout, La = m.noTimeout, lr = m.isPrimaryRenderer;
			m.warnsIfNotActing;
			var Ye = m.supportsMutation, ln = m.supportsPersistence, En = m.supportsHydration, jm = m.getInstanceFromNode;
			m.beforeActiveInstanceBlur;
			var Um = m.preparePortalMount;
			m.prepareScopeUpdate, m.getInstanceFromScope;
			var jn = m.setCurrentUpdatePriority, sr = m.getCurrentUpdatePriority, Qn = m.resolveUpdatePriority;
			m.trackSchedulerEvent, m.resolveEventType, m.resolveEventTimeStamp;
			var Wm = m.shouldAttemptEagerTransition, it = m.detachDeletedInstance;
			m.requestPostPaintCallback;
			var Am = m.maySuspendCommit, Dl = m.maySuspendCommitOnUpdate, wd = m.maySuspendCommitInSyncRender, ur = m.preloadInstance, Om = m.startSuspendingCommit, Xo = m.suspendInstance, Bm = m.suspendOnActiveViewTransition, cr = m.waitForCommitToBeReady;
			m.getSuspendedCommitReason;
			var Fa = m.NotPendingTransition, $r = m.HostTransitionContext, dr = m.resetFormInstance;
			m.bindToConsole;
			var Hm = m.supportsMicrotasks, jl = m.scheduleMicrotask, Ul = m.supportsTestSelectors, _u = m.findFiberRoot, Da = m.getBoundingRect, Mm = m.getTextContent, Wl = m.isHiddenSubtree, Nu = m.matchAccessibilityRole, Vm = m.setFocusIfFocusable, Pd = m.setupIntersectionObserver, $m = m.appendChild, Qm = m.appendChildToContainer, Bp = m.commitTextUpdate, Hp = m.commitMount, Mp = m.commitUpdate, qm = m.insertBefore, xd = m.insertInContainerBefore, w0 = m.removeChild, Gm = m.removeChildFromContainer, _t = m.resetTextContent, Jm = m.hideInstance, Al = m.hideTextInstance, nn = m.unhideInstance, Zm = m.unhideTextInstance, Vp = m.applyViewTransitionName, P0 = m.restoreViewTransitionName, ja = m.cancelViewTransitionName, Cd = m.cancelRootViewTransitionName, $p = m.restoreRootViewTransitionName;
			m.cloneRootViewTransitionContainer, m.removeRootViewTransitionClone;
			var Tu = m.measureInstance, xi = m.measureClonedInstance, Yo = m.wasInstanceInViewport, Xm = m.hasInstanceChanged, Ym = m.hasInstanceAffectedParent, Km = m.startViewTransition;
			m.startGestureTransition;
			var eg = m.stopViewTransition, zd = m.addViewTransitionFinishedListener;
			m.getCurrentGestureOffset;
			var Iu = m.createViewTransitionInstance, Qp = m.clearContainer, ng = m.createFragmentInstance, x0 = m.updateFragmentInstanceFiber, tg = m.commitNewChildToFragmentInstance, rg = m.deleteChildFromFragmentInstance, og = m.cloneInstance, ag = m.createContainerChildSet, Ci = m.appendChildToContainerChildSet, Ed = m.finalizeContainerChildren, qp = m.replaceContainerChildren, _d = m.cloneHiddenInstance, ig = m.cloneHiddenTextInstance, Gp = m.isSuspenseInstancePending, Jp = m.isSuspenseInstanceFallback, C0 = m.getSuspenseInstanceFallbackErrorDetails, z0 = m.registerSuspenseInstanceRetry, Zp = m.canHydrateFormStateMarker, Xp = m.isFormStateMarkerMatching, Nd = m.getNextHydratableSibling, lg = m.getNextHydratableSiblingAfterSingleton, sg = m.getFirstHydratableChild, Ol = m.getFirstHydratableChildWithinContainer, Yp = m.getFirstHydratableChildWithinActivityInstance, ug = m.getFirstHydratableChildWithinSuspenseInstance, we = m.getFirstHydratableChildWithinSingleton, Kp = m.canHydrateInstance, E0 = m.canHydrateTextInstance, cg = m.canHydrateActivityInstance, _0 = m.canHydrateSuspenseInstance, N0 = m.hydrateInstance, eh = m.hydrateTextInstance, dg = m.hydrateActivityInstance, fg = m.hydrateSuspenseInstance, pg = m.getNextHydratableInstanceAfterActivityInstance, Ru = m.getNextHydratableInstanceAfterSuspenseInstance, T0 = m.commitHydratedInstance, I0 = m.commitHydratedContainer, Bl = m.commitHydratedActivityInstance, hg = m.commitHydratedSuspenseInstance, mg = m.finalizeHydratedChildren, gg = m.flushHydrationEvents;
			m.clearActivityBoundary;
			var R0 = m.clearSuspenseBoundary;
			m.clearActivityBoundaryFromContainer;
			var nh = m.clearSuspenseBoundaryFromContainer, Ko = m.hideDehydratedBoundary, bg = m.unhideDehydratedBoundary, Td = m.shouldDeleteUnhydratedTailInstances;
			m.diffHydratedPropsForDevWarnings, m.diffHydratedTextForDevWarnings, m.describeHydratableInstanceForDevWarnings;
			var Id = m.validateHydratableInstance, zi = m.validateHydratableTextInstance, Nt = m.supportsResources, th = m.isHostHoistableType, Hl = m.getHoistableRoot, yg = m.getResource, rh = m.acquireResource, oh = m.releaseResource, vg = m.hydrateHoistable, Rd = m.mountHoistable, Ld = m.unmountHoistable, ah = m.createHoistableInstance, ih = m.prepareToCommitHoistables, L0 = m.mayResourceSuspendCommit, ce = m.preloadResource, F0 = m.suspendResource, be = m.supportsSingletons, Un = m.resolveSingletonInstance, D0 = m.acquireSingletonInstance, xo = m.releaseSingletonInstance, Ua = m.isHostSingletonType, Qr = m.isSingletonScope, Ml = [], Wa = -1, Aa = {}, sn = Math.clz32 ? Math.clz32 : k0, Fd = Math.log, lh = Math.LN2, Vl = 256, Ei = 262144, qn = 4194304, $l = Et.unstable_scheduleCallback, sh = Et.unstable_cancelCallback, j0 = Et.unstable_shouldYield, uh = Et.unstable_requestPaint, Tt = Et.unstable_now, ch = Et.unstable_ImmediatePriority, Sg = Et.unstable_UserBlockingPriority, dh = Et.unstable_NormalPriority, Gn = Et.unstable_IdlePriority, N = Et.log, U0 = Et.unstable_setDisableYieldValue, Lu = null, It = null, Ql = 0, $t = typeof Object.is == "function" ? Object.is : im, kg = typeof reportError == "function" ? reportError : function(t) {
				if (typeof window == "object" && typeof window.ErrorEvent == "function") {
					var r = new window.ErrorEvent("error", {
						bubbles: !0,
						cancelable: !0,
						message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
						error: t
					});
					if (!window.dispatchEvent(r)) return;
				} else if (typeof process == "object" && typeof process.emit == "function") {
					process.emit("uncaughtException", t);
					return;
				}
				console.error(t);
			}, W0 = Object.prototype.hasOwnProperty, fh, wg, Fu = !1, ph = /* @__PURE__ */ new WeakMap(), ea = [], _i = 0, Dd = null, Du = 0, Wn = [], yn = 0, _e = null, _n = 1, $e = "", Jn = oo(null), ju = oo(null), Je = oo(null), fr = oo(null), Nn = null, Qe = null, ne = !1, pr = null, hr = !1, hh = Error(F(519)), jd = oo(null), Ni = null, qr = null, Pg = typeof AbortController < "u" ? AbortController : function() {
				var t = [], r = this.signal = {
					aborted: !1,
					addEventListener: function(a, l) {
						t.push(l);
					}
				};
				this.abort = function() {
					r.aborted = !0, t.forEach(function(a) {
						return a();
					});
				};
			}, A0 = Et.unstable_scheduleCallback, xg = Et.unstable_NormalPriority, tn = {
				$$typeof: Vr,
				Consumer: null,
				Provider: null,
				_currentValue: null,
				_currentValue2: null,
				_threadCount: 0
			}, Uu = null, ql = null, Gr = null, Jr = !1, Ud = !1, mh = !1, Ti = 0, Wu = null, Oa = 0, Ii = 0, Gl = null, Cg = Q.S;
			Q.S = function(t, r) {
				if (Ph = Tt(), typeof r == "object" && r !== null && typeof r.then == "function" && Ot(t, r), Uu !== null) for (var a = ql; a !== null;) jf(a, Uu), a = a.next;
				if (a = t.types, a != null) {
					for (var l = ql; l !== null;) jf(l, a), l = l.next;
					if (Ii !== 0) {
						l = Uu, l === null && (l = Uu = []);
						for (var c = 0; c < a.length; c++) {
							var d = a[c];
							l.indexOf(d) === -1 && l.push(d);
						}
					}
				}
				Cg !== null && Cg(t, r);
			};
			var Zr = oo(null), Jl = Error(F(460)), gh = Error(F(474)), Wd = Error(F(542)), Ad = { then: function() {} }, Ri = null, Zl = null, Au = 0, Li = wt(!0), zg = wt(!1), mr = [], Xl = 0, bh = 0, na = !1, yh = !1, Ba = oo(null), Od = oo(0), Zn = oo(null), lt = null, Xn = oo(0), ta = 0, re = null, De = null, un = null, Bd = !1, ra = !1, Fi = !1, Hd = 0, Ou = 0, Yl = null, O0 = 0, Bu = {
				readContext: Me,
				use: pl,
				useCallback: Ve,
				useContext: Ve,
				useEffect: Ve,
				useImperativeHandle: Ve,
				useLayoutEffect: Ve,
				useInsertionEffect: Ve,
				useMemo: Ve,
				useReducer: Ve,
				useRef: Ve,
				useState: Ve,
				useDebugValue: Ve,
				useDeferredValue: Ve,
				useTransition: Ve,
				useSyncExternalStore: Ve,
				useId: Ve,
				useHostTransitionStatus: Ve,
				useFormState: Ve,
				useActionState: Ve,
				useOptimistic: Ve,
				useMemoCache: Ve,
				useCacheRefresh: Ve,
				useEffectEvent: Ve
			}, Eg = {
				readContext: Me,
				use: pl,
				useCallback: function(t, r) {
					return gn().memoizedState = [t, r === void 0 ? null : r], t;
				},
				useContext: Me,
				useEffect: Mf,
				useImperativeHandle: function(t, r, a) {
					a = a != null ? a.concat([t]) : null, gl(4194308, 4, Qf.bind(null, r, t), a);
				},
				useLayoutEffect: function(t, r) {
					return gl(4194308, 4, t, r);
				},
				useInsertionEffect: function(t, r) {
					gl(4, 2, t, r);
				},
				useMemo: function(t, r) {
					var a = gn();
					r = r === void 0 ? null : r;
					var l = t();
					if (Fi) {
						ga(!0);
						try {
							t();
						} finally {
							ga(!1);
						}
					}
					return a.memoizedState = [l, r], l;
				},
				useReducer: function(t, r, a) {
					var l = gn();
					if (a !== void 0) {
						var c = a(r);
						if (Fi) {
							ga(!0);
							try {
								a(r);
							} finally {
								ga(!1);
							}
						}
					} else c = r;
					return l.memoizedState = l.baseState = c, t = {
						pending: null,
						lanes: 0,
						dispatch: null,
						lastRenderedReducer: t,
						lastRenderedState: c
					}, l.queue = t, t = t.dispatch = bt.bind(null, re, t), [l.memoizedState, t];
				},
				useRef: function(t) {
					var r = gn();
					return t = { current: t }, r.memoizedState = t;
				},
				useState: function(t) {
					t = gt(t);
					var r = t.queue, a = Tc.bind(null, re, r);
					return r.dispatch = a, [t.memoizedState, a];
				},
				useDebugValue: Bs,
				useDeferredValue: function(t, r) {
					return bl(gn(), t, r);
				},
				useTransition: function() {
					var t = gt(!1);
					return t = Jf.bind(null, re, t.queue, !0, !1), gn().memoizedState = t, [!1, t];
				},
				useSyncExternalStore: function(t, r, a) {
					var l = re, c = gn();
					if (ne) {
						if (a === void 0) throw Error(F(407));
						a = a();
					} else {
						if (a = r(), Be === null) throw Error(F(349));
						ye & 127 || mo(l, r, a);
					}
					c.memoizedState = a;
					var d = {
						value: a,
						getSnapshot: r
					};
					return c.queue = d, Mf(hl.bind(null, l, d, t), [t]), l.flags |= 2048, Ur(9, { destroy: void 0 }, Us.bind(null, l, d, a, r), null), a;
				},
				useId: function() {
					var t = gn(), r = Be.identifierPrefix;
					if (ne) {
						var a = $e, l = _n;
						a = (l & ~(1 << 32 - sn(l) - 1)).toString(32) + a, r = "_" + r + "R_" + a, a = Hd++, 0 < a && (r += "H" + a.toString(32)), r += "_";
					} else a = O0++, r = "_" + r + "r_" + a.toString(32) + "_";
					return t.memoizedState = r;
				},
				useHostTransitionStatus: bo,
				useFormState: Bf,
				useActionState: Bf,
				useOptimistic: function(t) {
					var r = gn();
					r.memoizedState = r.baseState = t;
					var a = {
						pending: null,
						lanes: 0,
						dispatch: null,
						lastRenderedReducer: null,
						lastRenderedState: null
					};
					return r.queue = a, r = yl.bind(null, re, !0, a), a.dispatch = r, [t, r];
				},
				useMemoCache: Mo,
				useCacheRefresh: function() {
					return gn().memoizedState = gm.bind(null, re);
				},
				useEffectEvent: function(t) {
					var r = gn(), a = { impl: t };
					return r.memoizedState = a, function() {
						if ((de & 2) !== 0) throw Error(F(440));
						return a.impl.apply(void 0, arguments);
					};
				}
			}, _g = {
				readContext: Me,
				use: pl,
				useCallback: Hs,
				useContext: Me,
				useEffect: _c,
				useImperativeHandle: mm,
				useInsertionEffect: Nc,
				useLayoutEffect: hm,
				useMemo: qf,
				useReducer: js,
				useRef: Hf,
				useState: function() {
					return js(Bt);
				},
				useDebugValue: Bs,
				useDeferredValue: function(t, r) {
					return Gf(K(), De.memoizedState, t, r);
				},
				useTransition: function() {
					var t = js(Bt)[0], r = K().memoizedState;
					return [typeof t == "boolean" ? t : fl(t), r];
				},
				useSyncExternalStore: pm,
				useId: Xf,
				useHostTransitionStatus: bo,
				useFormState: Dr,
				useActionState: Dr,
				useOptimistic: function(t, r) {
					return Ir(K(), De, t, r);
				},
				useMemoCache: Mo,
				useCacheRefresh: Yf,
				useEffectEvent: $f
			}, B0 = {
				readContext: Me,
				use: pl,
				useCallback: Hs,
				useContext: Me,
				useEffect: _c,
				useImperativeHandle: mm,
				useInsertionEffect: Nc,
				useLayoutEffect: hm,
				useMemo: qf,
				useReducer: tr,
				useRef: Hf,
				useState: function() {
					return tr(Bt);
				},
				useDebugValue: Bs,
				useDeferredValue: function(t, r) {
					var a = K();
					return De === null ? bl(a, t, r) : Gf(a, De.memoizedState, t, r);
				},
				useTransition: function() {
					var t = tr(Bt)[0], r = K().memoizedState;
					return [typeof t == "boolean" ? t : fl(t), r];
				},
				useSyncExternalStore: pm,
				useId: Xf,
				useHostTransitionStatus: bo,
				useFormState: jr,
				useActionState: jr,
				useOptimistic: function(t, r) {
					var a = K();
					return De !== null ? Ir(a, De, t, r) : (a.baseState = t, [t, a.queue.dispatch]);
				},
				useMemoCache: Mo,
				useCacheRefresh: Yf,
				useEffectEvent: $f
			}, Md = {
				enqueueSetState: function(t, r, a) {
					t = t._reactInternals;
					var l = zt(), c = po(l);
					c.payload = r, a != null && (c.callback = a), r = ka(t, c, l), r !== null && (yt(r, t, l), Ls(r, t, l));
				},
				enqueueReplaceState: function(t, r, a) {
					t = t._reactInternals;
					var l = zt(), c = po(l);
					c.tag = 1, c.payload = r, a != null && (c.callback = a), r = ka(t, c, l), r !== null && (yt(r, t, l), Ls(r, t, l));
				},
				enqueueForceUpdate: function(t, r) {
					t = t._reactInternals;
					var a = zt(), l = po(a);
					l.tag = 2, r != null && (l.callback = r), r = ka(t, l, a), r !== null && (yt(r, t, a), Ls(r, t, a));
				}
			}, vh = Error(F(461)), Pn = !1, Vd = {
				dehydrated: null,
				treeContext: null,
				retryLane: 0,
				hydrationErrors: null
			}, Yn = !1, $d = !1, Rt = null, Xr = null, vt = 0, xn = !1, Ce = !1, Co = !1, Sh = !1, Ng = typeof WeakSet == "function" ? WeakSet : Set, An = null, gr = !1, Hu = !1, Qd = !1, kh = !1, Cn = null, Lt = !1, Yr = null, Di = 8192, H0 = {
				getCacheForType: function(t) {
					var r = Me(tn), a = r.data.get(t);
					return a === void 0 && (a = t(), r.data.set(t, a)), a;
				},
				cacheSignal: function() {
					return Me(tn).controller.signal;
				}
			}, qd = 0, Gd = 1, Jd = 2, Zd = 3, Xd = 4;
			if (typeof Symbol == "function" && Symbol.for) {
				var Mu = Symbol.for;
				qd = Mu("selector.component"), Gd = Mu("selector.has_pseudo_class"), Jd = Mu("selector.role"), Zd = Mu("selector.test_id"), Xd = Mu("selector.text");
			}
			var M0 = typeof WeakMap == "function" ? WeakMap : Map, de = 0, Be = null, he = null, ye = 0, Ie = 0, Qt = null, Ha = !1, Kl = !1, wh = !1, oa = 0, cn = 0, aa = 0, Ma = 0, Yd = 0, Ft = 0, es = 0, Vu = null, Ze = null, Kd = !1, ji = 0, Ph = 0, ns = 1 / 0, $u = null, Va = null, Xe = 0, qt = null, $a = null, zo = 0, xh = 0, ef = null, Tg = null, je = null, Ui = null, ts = null, rs = 0, Qu = null;
			return Y.attemptContinuousHydration = function(t) {
				if (t.tag === 13 || t.tag === 31) {
					var r = Er(t, 67108864);
					r !== null && yt(r, t, 67108864), Rp(t, 67108864);
				}
			}, Y.attemptHydrationAtCurrentPriority = function(t) {
				if (t.tag === 13 || t.tag === 31) {
					var r = zt();
					r = mn(r);
					var a = Er(t, r);
					a !== null && yt(a, t, r), Rp(t, r);
				}
			}, Y.attemptSynchronousHydration = function(t) {
				switch (t.tag) {
					case 3:
						if (t = t.stateNode, t.current.memoizedState.isDehydrated) {
							var r = ma(t.pendingLanes);
							if (r !== 0) {
								for (t.pendingLanes |= 2, t.entangledLanes |= 2; r;) {
									var a = 1 << 31 - sn(r);
									t.entanglements[1] |= a, r &= ~a;
								}
								xr(t), !(de & 6) && (ns = Tt() + 500, tl(0, !1));
							}
						}
						break;
					case 31:
					case 13: r = Er(t, 2), r !== null && yt(r, t, 2), Sm(), Rp(t, 2);
				}
			}, Y.batchedUpdates = function(t, r) {
				return t(r);
			}, Y.createComponentSelector = function(t) {
				return {
					$$typeof: qd,
					value: t
				};
			}, Y.createContainer = function(t, r, a, l, c, d, h, y, C, R) {
				return hd(t, r, !1, null, a, l, d, null, h, y, C, R);
			}, Y.createHasPseudoClassSelector = function(t) {
				return {
					$$typeof: Gd,
					value: t
				};
			}, Y.createHydrationContainer = function(t, r, a, l, c, d, h, y, C, R, D, U, A, fe) {
				var _r3;
				return t = hd(a, l, !0, t, c, d, y, fe, C, R, D, U), t.context = Tp(null), a = t.current, l = zt(), l = mn(l), c = po(l), c.callback = (_r3 = r) != null ? _r3 : null, ka(a, c, l), r = l, t.current.lanes = r, Ki(t, r), xr(t), t;
			}, Y.createPortal = function(t, r, a) {
				var l = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
				return {
					$$typeof: Si,
					key: l == null ? null : l === Fp ? Fp : "" + l,
					children: t,
					containerInfo: r,
					implementation: a
				};
			}, Y.createRoleSelector = function(t) {
				return {
					$$typeof: Jd,
					value: t
				};
			}, Y.createTestNameSelector = function(t) {
				return {
					$$typeof: Zd,
					value: t
				};
			}, Y.createTextSelector = function(t) {
				return {
					$$typeof: Xd,
					value: t
				};
			}, Y.defaultOnCaughtError = function(t) {
				console.error(t);
			}, Y.defaultOnRecoverableError = function(t) {
				kg(t);
			}, Y.defaultOnUncaughtError = function(t) {
				kg(t);
			}, Y.deferredUpdates = function(t) {
				var r = Q.T, a = sr();
				try {
					return jn(32), Q.T = null, t();
				} finally {
					jn(a), Q.T = r;
				}
			}, Y.discreteUpdates = function(t, r, a, l, c) {
				var d = Q.T, h = sr();
				try {
					return jn(2), Q.T = null, t(r, a, l, c);
				} finally {
					jn(h), Q.T = d, de === 0 && (ns = Tt() + 500);
				}
			}, Y.findAllNodes = bn, Y.findBoundingRects = function(t, r) {
				if (!Ul) throw Error(F(363));
				r = bn(t, r), t = [];
				for (var a = 0; a < r.length; a++) t.push(Da(r[a]));
				for (r = t.length - 1; 0 < r; r--) {
					a = t[r];
					for (var l = a.x, c = l + a.width, d = a.y, h = d + a.height, y = r - 1; 0 <= y; y--) if (r !== y) {
						var C = t[y], R = C.x, D = R + C.width, U = C.y, A = U + C.height;
						if (l >= R && d >= U && c <= D && h <= A) {
							t.splice(r, 1);
							break;
						} else if (l !== R || a.width !== C.width || A < d || U > h) {
							if (!(d !== U || a.height !== C.height || D < l || R > c)) {
								R > l && (C.width += R - l, C.x = l), D < c && (C.width = c - R), t.splice(r, 1);
								break;
							}
						} else {
							U > d && (C.height += U - d, C.y = d), A < h && (C.height = h - U), t.splice(r, 1);
							break;
						}
					}
				}
				return t;
			}, Y.findHostInstance = zm, Y.findHostInstanceWithNoPortals = function(t) {
				return t = hc(t), t = t !== null ? ht(t) : null, t === null ? null : Pi(t.stateNode);
			}, Y.findHostInstanceWithWarning = function(t) {
				return zm(t);
			}, Y.flushPassiveEffects = _a, Y.flushSyncFromReconciler = function(t) {
				var r = de;
				de |= 1;
				var a = Q.T, l = sr();
				try {
					if (jn(2), Q.T = null, t) return t();
				} finally {
					jn(l), Q.T = a, de = r, !(de & 6) && tl(0, !1);
				}
			}, Y.flushSyncWork = Sm, Y.focusWithin = function(t, r) {
				if (!Ul) throw Error(F(363));
				for (t = fu(t), r = vm(t, r), r = Array.from(r), t = 0; t < r.length;) {
					var a = r[t++], l = a.tag;
					if (!Wl(a)) {
						if ((l === 5 || l === 26 || l === 27) && Vm(a.stateNode)) return !0;
						for (a = a.child; a !== null;) r.push(a), a = a.sibling;
					}
				}
				return !1;
			}, Y.getFindAllNodesFailureDescription = function(t, r) {
				if (!Ul) throw Error(F(363));
				var a = 0, l = [];
				t = [fu(t), 0];
				for (var c = 0; c < t.length;) {
					var d = t[c++], h = d.tag, y = t[c++], C = r[y];
					if ((h !== 5 && h !== 26 && h !== 27 || !Wl(d)) && (pu(d, C) && (l.push(hu(C)), y++, y > a && (a = y)), y < r.length)) for (d = d.child; d !== null;) t.push(d, y), d = d.sibling;
				}
				if (a < r.length) {
					for (t = []; a < r.length; a++) t.push(hu(r[a]));
					return `findAllNodes was able to match part of the selector:
  ` + (l.join(" > ") + `

No matching component was found for:
  `) + t.join(" > ");
				}
				return null;
			}, Y.getPublicRootInstance = function(t) {
				if (t = t.current, !t.child) return null;
				switch (t.child.tag) {
					case 27:
					case 5: return Pi(t.child.stateNode);
					default: return t.child.stateNode;
				}
			}, Y.injectIntoDevTools = function() {
				var t = {
					bundleType: 0,
					version: Dp,
					rendererPackageName: jp,
					currentDispatcherRef: Q,
					reconcilerVersion: "19.3.0"
				};
				if (Up !== null && (t.rendererConfig = Up), typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") t = !1;
				else {
					var r = __REACT_DEVTOOLS_GLOBAL_HOOK__;
					if (r.isDisabled || !r.supportsFiber) t = !0;
					else {
						try {
							Lu = r.inject(t), It = r;
						} catch {}
						t = !!r.checkDCE;
					}
				}
				return t;
			}, Y.isAlreadyRendering = function() {
				return (de & 6) !== 0;
			}, Y.observeVisibleRects = function(t, r, a, l) {
				if (!Ul) throw Error(F(363));
				t = bn(t, r);
				var c = Pd(t, a, l).disconnect;
				return { disconnect: function() {
					c();
				} };
			}, Y.shouldError = function() {
				return null;
			}, Y.shouldSuspend = function() {
				return !1;
			}, Y.startHostTransition = function(t, r, a, l) {
				if (t.tag !== 5) throw Error(F(476));
				var c = Zf(t).queue;
				Jf(t, c, r, Fa, a === null ? zf : function() {
					var d = Zf(t);
					return d.next === null && (d = t.alternate.memoizedState), wa(t, d.next.queue, {}, zt()), a(l);
				});
			}, Y.updateContainer = function(t, r, a, l) {
				var c = r.current, d = zt();
				return Em(c, d, t, r, a, l), d;
			}, Y.updateContainerSync = function(t, r, a, l) {
				return Em(r.current, 2, t, r, a, l), 2;
			}, Y;
		}, Ut.exports.default = Ut.exports, Object.defineProperty(Ut.exports, "__esModule", { value: !0 });
	}(Ob)), Ob.exports;
}
/**
* @license React
* react-reconciler.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
({ exports: {} }).exports;
var C1;
function G1() {
	return C1 || (C1 = 1, S0.exports = Q1()), S0.exports;
}
var Z1 = $1(G1());
/** Constructor registration and lookup for JSX elements. */
var catalogue = {};
var i$2 = 0;
var toPascalCase = (type) => `${type[0].toUpperCase()}${type.slice(1)}`;
function hasConstructor(name) {
	return name in catalogue;
}
function resolveConstructor(name) {
	return catalogue[name];
}
function extend(objects) {
	if (typeof objects === "function") {
		const Component = `${i$2++}`;
		catalogue[Component] = objects;
		return Component;
	} else Object.assign(catalogue, objects);
}
function createReconciler(config) {
	const reconciler = Z1(config);
	reconciler.injectIntoDevTools();
	return reconciler;
}
var NoEventPriority = 0;
var PREFIX_REGEX = /^three(?=[A-Z])/;
function validateInstance(type, props) {
	const name = toPascalCase(type);
	const target = resolveConstructor(name);
	if (type !== "primitive" && !target) throw new Error(`R3F: ${name} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);
	if (type === "primitive" && !props.object) throw new Error(`R3F: Primitives without 'object' are invalid!`);
	if (props.args !== void 0 && !Array.isArray(props.args)) throw new Error("R3F: The args prop must be an array!");
}
function createInstance(type, props, root) {
	var _props$object;
	type = hasConstructor(toPascalCase(type)) ? type : type.replace(PREFIX_REGEX, "");
	validateInstance(type, props);
	if (type === "primitive" && (_props$object = props.object) != null && _props$object.__r3f) delete props.object.__r3f;
	return prepare(props.object, root, type, props);
}
function hideInstance(instance) {
	if (!instance.isHidden) {
		var _instance$parent;
		if (instance.props.attach && (_instance$parent = instance.parent) != null && _instance$parent.object) detach(instance.parent, instance);
		else if (isObject3D(instance.object)) {
			instance.previousVisible = instance.object.visible;
			instance.object.visible = false;
		}
		instance.isHidden = true;
		invalidateInstance(instance);
	}
}
function unhideInstance(instance) {
	if (instance.isHidden) {
		var _instance$parent2;
		if (instance.props.attach && (_instance$parent2 = instance.parent) != null && _instance$parent2.object) attach(instance.parent, instance);
		else if (isObject3D(instance.object)) {
			var _instance$previousVis;
			instance.object.visible = (_instance$previousVis = instance.previousVisible) != null ? _instance$previousVis : true;
		}
		instance.previousVisible = void 0;
		instance.isHidden = false;
		invalidateInstance(instance);
	}
}
function handleContainerEffects(parent, child, beforeChild) {
	const state = child.root.getState();
	if (!parent.parent && parent.object !== state.scene) return;
	if (!child.object) {
		var _child$props$object, _child$props$args;
		const target = resolveConstructor(toPascalCase(child.type));
		child.object = (_child$props$object = child.props.object) != null ? _child$props$object : new target(...(_child$props$args = child.props.args) != null ? _child$props$args : []);
		child.object.__r3f = child;
	}
	applyProps(child.object, child.props);
	if (child.props.attach) attach(parent, child);
	else if (isObject3D(child.object) && isObject3D(parent.object)) {
		const childIndex = parent.object.children.indexOf(beforeChild == null ? void 0 : beforeChild.object);
		if (beforeChild && childIndex !== -1) {
			const existingIndex = parent.object.children.indexOf(child.object);
			if (existingIndex !== -1) {
				parent.object.children.splice(existingIndex, 1);
				const adjustedIndex = existingIndex < childIndex ? childIndex - 1 : childIndex;
				parent.object.children.splice(adjustedIndex, 0, child.object);
			} else {
				child.object.parent = parent.object;
				parent.object.children.splice(childIndex, 0, child.object);
				child.object.dispatchEvent({ type: "added" });
				parent.object.dispatchEvent({
					type: "childadded",
					child: child.object
				});
			}
		} else parent.object.add(child.object);
	}
	for (const childInstance of child.children) handleContainerEffects(child, childInstance);
	invalidateInstance(child);
}
function appendChild(parent, child) {
	if (!child) return;
	if (child.parent === parent) {
		const childIndex = parent.children.indexOf(child);
		if (childIndex !== -1) parent.children.splice(childIndex, 1);
	}
	child.parent = parent;
	parent.children.push(child);
	handleContainerEffects(parent, child);
}
function insertBefore(parent, child, beforeChild) {
	if (!child || !beforeChild) return;
	if (child.parent === parent) {
		const childIndex = parent.children.indexOf(child);
		if (childIndex !== -1) parent.children.splice(childIndex, 1);
	}
	child.parent = parent;
	const childIndex = parent.children.indexOf(beforeChild);
	if (childIndex !== -1) parent.children.splice(childIndex, 0, child);
	else parent.children.push(child);
	handleContainerEffects(parent, child, beforeChild);
}
function disposeOnIdle(object) {
	if (typeof object.dispose === "function") {
		const handleDispose = () => {
			try {
				object.dispose();
			} catch {}
		};
		if (typeof IS_REACT_ACT_ENVIRONMENT !== "undefined") handleDispose();
		else (0, import_scheduler.unstable_scheduleCallback)(import_scheduler.unstable_IdlePriority, handleDispose);
	}
}
function removeChild(parent, child, dispose) {
	if (!child) return;
	const wasLinked = !!child.parent;
	child.parent = null;
	const childIndex = parent.children.indexOf(child);
	if (childIndex !== -1) parent.children.splice(childIndex, 1);
	if (child.props.attach) detach(parent, child);
	else if (isObject3D(child.object) && isObject3D(parent.object)) {
		parent.object.remove(child.object);
		removeInteractivity(findInitialRoot(child), child.object);
	}
	const shouldDispose = child.props.dispose !== null && dispose !== false;
	for (let i = child.children.length - 1; i >= 0; i--) {
		const node = child.children[i];
		removeChild(child, node, shouldDispose);
	}
	child.children.length = 0;
	delete child.object.__r3f;
	if (shouldDispose && child.type !== "primitive" && child.object.type !== "Scene") disposeOnIdle(child.object);
	if (dispose === void 0 && wasLinked) {
		var _child$root;
		const state = (_child$root = child.root) == null ? void 0 : _child$root.getState == null ? void 0 : _child$root.getState();
		if (state && state.internal.frames === 0) state.invalidate();
	}
}
function setFiberRef(fiber, publicInstance) {
	for (const _fiber of [fiber, fiber.alternate]) if (_fiber !== null) {
		if (typeof _fiber.ref === "function") {
			_fiber.refCleanup == null || _fiber.refCleanup();
			const cleanup = _fiber.ref(publicInstance);
			if (typeof cleanup === "function") _fiber.refCleanup = cleanup;
		} else if (_fiber.ref) _fiber.ref.current = publicInstance;
	}
}
var reconstructed = [];
function flushReconstructedInstances() {
	if (reconstructed.length === 0) return;
	try {
		swapReconstructedInstances();
	} finally {
		reconstructed.length = 0;
	}
}
function swapReconstructedInstances() {
	for (const [instance] of reconstructed) {
		const parent = instance.parent;
		if (parent) {
			if (instance.props.attach) detach(parent, instance);
			else if (isObject3D(instance.object) && isObject3D(parent.object)) parent.object.remove(instance.object);
			for (const child of instance.children) if (child.props.attach) detach(instance, child);
			else if (isObject3D(child.object) && isObject3D(instance.object)) instance.object.remove(child.object);
		}
		if (instance.isHidden) unhideInstance(instance);
		if (instance.object.__r3f) delete instance.object.__r3f;
		if (instance.type !== "primitive") disposeOnIdle(instance.object);
	}
	for (const [instance, props, fiber] of reconstructed) {
		instance.props = props;
		const parent = instance.parent;
		if (parent) {
			var _instance$props$objec, _instance$props$args;
			const target = resolveConstructor(toPascalCase(instance.type));
			const prevObject = instance.object;
			instance.object = (_instance$props$objec = instance.props.object) != null ? _instance$props$objec : new target(...(_instance$props$args = instance.props.args) != null ? _instance$props$args : []);
			instance.object.__r3f = instance;
			setFiberRef(fiber, instance.object);
			swapInteractivity(findInitialRoot(instance), prevObject, instance.object);
			applyProps(instance.object, instance.props);
			if (instance.props.attach) attach(parent, instance);
			else if (isObject3D(instance.object) && isObject3D(parent.object)) parent.object.add(instance.object);
			for (const child of instance.children) if (child.props.attach) attach(instance, child);
			else if (isObject3D(child.object) && isObject3D(instance.object)) instance.object.add(child.object);
			invalidateInstance(instance);
		}
	}
}
var handleTextInstance = () => {};
var NO_CONTEXT = {};
var currentUpdatePriority = NoEventPriority;
function getEventPriority(type) {
	switch (type) {
		case "beforetoggle":
		case "cancel":
		case "click":
		case "close":
		case "contextmenu":
		case "copy":
		case "cut":
		case "auxclick":
		case "dblclick":
		case "dragend":
		case "dragstart":
		case "drop":
		case "focusin":
		case "focusout":
		case "input":
		case "invalid":
		case "keydown":
		case "keypress":
		case "keyup":
		case "mousedown":
		case "mouseup":
		case "paste":
		case "pause":
		case "play":
		case "pointercancel":
		case "pointerdown":
		case "pointerup":
		case "ratechange":
		case "reset":
		case "resize":
		case "seeked":
		case "submit":
		case "touchcancel":
		case "touchend":
		case "touchstart":
		case "volumechange":
		case "change":
		case "selectionchange":
		case "compositionstart":
		case "compositionend":
		case "compositionupdate":
		case "beforeinput":
		case "blur":
		case "fullscreenchange":
		case "focus":
		case "hashchange":
		case "popstate":
		case "select":
		case "selectstart": return e;
		case "drag":
		case "dragenter":
		case "dragexit":
		case "dragleave":
		case "dragover":
		case "mousemove":
		case "mouseout":
		case "mouseover":
		case "pointermove":
		case "pointerout":
		case "pointerover":
		case "scroll":
		case "touchmove":
		case "wheel":
		case "mouseenter":
		case "mouseleave":
		case "pointerenter":
		case "pointerleave": return o;
		case "message": switch ((0, import_scheduler.unstable_getCurrentPriorityLevel)()) {
			case import_scheduler.unstable_ImmediatePriority: return e;
			case import_scheduler.unstable_UserBlockingPriority: return o;
			case import_scheduler.unstable_NormalPriority:
			case import_scheduler.unstable_LowPriority: return r;
			case import_scheduler.unstable_IdlePriority: return i$1;
			default: return r;
		}
		default: return r;
	}
}
function scheduleMicrotask(callback) {
	if (typeof queueMicrotask === "function") queueMicrotask(callback);
	else if (typeof Promise !== "undefined") Promise.resolve().then(callback).catch((error) => {
		setTimeout(() => {
			throw error;
		});
	});
	else setTimeout(callback);
}
var reconciler = /* @__PURE__ */ createReconciler({
	isPrimaryRenderer: false,
	warnsIfNotActing: false,
	supportsMutation: true,
	supportsPersistence: false,
	supportsHydration: false,
	createInstance,
	removeChild,
	appendChild,
	appendInitialChild: appendChild,
	insertBefore,
	appendChildToContainer(container, child) {
		const scene = container.getState().scene.__r3f;
		if (!child || !scene) return;
		appendChild(scene, child);
	},
	removeChildFromContainer(container, child) {
		const scene = container.getState().scene.__r3f;
		if (!child || !scene) return;
		removeChild(scene, child);
	},
	insertInContainerBefore(container, child, beforeChild) {
		const scene = container.getState().scene.__r3f;
		if (!child || !beforeChild || !scene) return;
		insertBefore(scene, child, beforeChild);
	},
	getRootHostContext: () => NO_CONTEXT,
	getChildHostContext: () => NO_CONTEXT,
	commitUpdate(instance, type, oldProps, newProps, fiber) {
		var _newProps$args, _oldProps$args, _newProps$args2;
		validateInstance(type, newProps);
		let reconstruct = false;
		if (instance.type === "primitive" && oldProps.object !== newProps.object) reconstruct = true;
		else if (((_newProps$args = newProps.args) == null ? void 0 : _newProps$args.length) !== ((_oldProps$args = oldProps.args) == null ? void 0 : _oldProps$args.length)) reconstruct = true;
		else if ((_newProps$args2 = newProps.args) != null && _newProps$args2.some((value, index) => {
			var _oldProps$args2;
			return value !== ((_oldProps$args2 = oldProps.args) == null ? void 0 : _oldProps$args2[index]);
		})) reconstruct = true;
		if (reconstruct) reconstructed.push([
			instance,
			getInstanceProps(newProps),
			fiber
		]);
		else {
			const changedProps = diffProps(instance, newProps);
			const attach = instance.props.attach;
			instance.props = getInstanceProps(newProps);
			if (attach !== void 0) instance.props.attach = attach;
			else delete instance.props.attach;
			if (Object.keys(changedProps).length) applyProps(instance.object, changedProps);
		}
	},
	finalizeInitialChildren: () => false,
	commitMount() {},
	getPublicInstance: (instance) => instance == null ? void 0 : instance.object,
	prepareForCommit: () => null,
	preparePortalMount: (container) => prepare(container.getState().scene, container, "", {}),
	resetAfterCommit: flushReconstructedInstances,
	shouldSetTextContent: () => false,
	clearContainer: () => false,
	hideInstance,
	unhideInstance,
	createTextInstance: handleTextInstance,
	hideTextInstance: handleTextInstance,
	unhideTextInstance: handleTextInstance,
	supportsMicrotasks: true,
	scheduleMicrotask,
	scheduleTimeout: typeof setTimeout === "function" ? setTimeout : void 0,
	cancelTimeout: typeof clearTimeout === "function" ? clearTimeout : void 0,
	noTimeout: -1,
	getInstanceFromNode: () => null,
	beforeActiveInstanceBlur() {},
	afterActiveInstanceBlur() {},
	detachDeletedInstance() {},
	prepareScopeUpdate() {},
	getInstanceFromScope: () => null,
	shouldAttemptEagerTransition: () => false,
	trackSchedulerEvent: () => {},
	resolveEventType: () => null,
	resolveEventTimeStamp: () => -1.1,
	requestPostPaintCallback() {},
	maySuspendCommit: () => false,
	preloadInstance: () => true,
	suspendInstance() {},
	waitForCommitToBeReady: () => null,
	NotPendingTransition: null,
	HostTransitionContext: /* @__PURE__ */ import_react.createContext(null),
	setCurrentUpdatePriority(newPriority) {
		currentUpdatePriority = newPriority;
	},
	getCurrentUpdatePriority() {
		return currentUpdatePriority;
	},
	resolveUpdatePriority() {
		var _window$event;
		if (currentUpdatePriority !== NoEventPriority) return currentUpdatePriority;
		const eventType = typeof window !== "undefined" ? (_window$event = window.event) == null ? void 0 : _window$event.type : void 0;
		if (eventType === void 0) return r;
		return getEventPriority(eventType);
	},
	resetFormInstance() {},
	rendererPackageName: "@react-three/fiber",
	rendererVersion: packageData.version,
	applyViewTransitionName(_instance, _name, _className) {},
	restoreViewTransitionName(_instance, _props) {},
	cancelViewTransitionName(_instance, _name, _props) {},
	cancelRootViewTransitionName(_rootContainer) {},
	restoreRootViewTransitionName(_rootContainer) {},
	InstanceMeasurement: null,
	measureInstance: (_instance) => null,
	wasInstanceInViewport: (_measurement) => true,
	hasInstanceChanged: (_oldMeasurement, _newMeasurement) => false,
	hasInstanceAffectedParent: (_oldMeasurement, _newMeasurement) => false,
	suspendOnActiveViewTransition(_state, _container) {},
	startViewTransition(_suspendedState, _rootContainer, _transitionTypes, mutationCallback, layoutCallback, _afterMutationCallback, spawnedWorkCallback, _passiveCallback, _errorCallback, _blockedCallback, finishedAnimation) {
		mutationCallback();
		layoutCallback();
		finishedAnimation?.();
		spawnedWorkCallback();
		return null;
	},
	startGestureTransition(_suspendedState, _rootContainer, _timeline, _rangeStart, _rangeEnd, _transitionTypes, mutationCallback, animateCallback, _errorCallback, finishedAnimation) {
		mutationCallback();
		animateCallback();
		finishedAnimation?.();
		return null;
	},
	stopViewTransition(_transition) {},
	addViewTransitionFinishedListener(_transition, callback) {
		callback();
	},
	createViewTransitionInstance: (_name) => null,
	getCurrentGestureOffset(_provider) {
		throw new Error("startGestureTransition is not yet supported in react-three-fiber.");
	},
	cloneMutableInstance(instance, _keepChildren) {
		return instance;
	},
	cloneMutableTextInstance(textInstance) {
		return textInstance;
	},
	cloneRootViewTransitionContainer(_rootContainer) {
		throw new Error("Not implemented.");
	},
	removeRootViewTransitionClone(_rootContainer, _clone) {
		throw new Error("Not implemented.");
	},
	createFragmentInstance: (_fiber) => null,
	updateFragmentInstanceFiber(_fiber, _instance) {},
	commitNewChildToFragmentInstance(_child, _fragmentInstance) {},
	deleteChildFromFragmentInstance(_child, _fragmentInstance) {},
	measureClonedInstance: (_instance) => null,
	maySuspendCommitOnUpdate: (_type, _oldProps, _newProps) => false,
	maySuspendCommitInSyncRender: (_type, _props) => false,
	startSuspendingCommit: () => null,
	getSuspendedCommitReason: (_state, _rootContainer) => null
});
var _roots = /* @__PURE__ */ new Map();
/**
* open -> closing -> disposed
*          | use
*          v
*         open
*
* Only closing can be cancelled. Each unmount carries a token, so only the latest one can dispose.
*/
function transitionRoot(root, event) {
	const state = root.state;
	switch (event.type) {
		case "use":
			if (state.status === "disposed") return false;
			root.state = { status: "open" };
			return true;
		case "unmount":
			if (state.status === "disposed") return false;
			root.state = {
				status: "closing",
				token: event.token
			};
			return true;
		case "dispose":
			if (state.status !== "closing" || state.token !== event.token) return false;
			root.state = { status: "disposed" };
			return true;
	}
}
function createRoot(canvas) {
	const prevRoot = _roots.get(canvas);
	const prevFiber = prevRoot == null ? void 0 : prevRoot.fiber;
	const prevStore = prevRoot == null ? void 0 : prevRoot.store;
	if (prevRoot) console.warn("R3F.createRoot should only be called once!");
	const logRecoverableError = typeof reportError === "function" ? reportError : console.error;
	const store = prevStore || createStore(invalidate, advance);
	const fiber = prevFiber || reconciler.createContainer(store, t, null, false, null, "", logRecoverableError, logRecoverableError, logRecoverableError, null);
	const root = prevRoot || {
		fiber,
		store,
		state: { status: "open" },
		ready: fulfilled(void 0),
		configuration: {},
		ownsRenderer: false
	};
	if (!prevRoot) _roots.set(canvas, root);
	let mounted = false;
	return {
		get ready() {
			return root.ready;
		},
		configure(props = {}) {
			if (!transitionRoot(root, { type: "use" })) return rejected(/* @__PURE__ */ new Error("R3F: Cannot configure a root after disposal has started."));
			const previous = root.ready;
			const { promise, resolve, reject } = deferred();
			root.ready = promise;
			const apply = (gl) => {
				const state = store.getState();
				if (!state.gl) {
					root.ownsRenderer = !isRenderer(props.gl);
					state.set({ gl });
				}
				applyRootConfiguration(root, canvas, props);
				if (!root.unwatchDpr && (props.dpr === void 0 || Array.isArray(props.dpr))) root.unwatchDpr = followDpr(root);
				resolve(this);
			};
			const run = () => {
				try {
					var _store$getState$gl;
					const gl = (_store$getState$gl = store.getState().gl) != null ? _store$getState$gl : createRenderer(canvas, props.gl);
					if (isPromiseLike(gl)) Promise.resolve(gl).then(apply).catch(reject);
					else apply(gl);
				} catch (error) {
					reject(error);
				}
			};
			if (previous.status === "pending") previous.then(run, reject);
			else run();
			return promise;
		},
		render(children) {
			if (!transitionRoot(root, { type: "use" })) return store;
			if (!store.getState().gl && root.ready.status === "fulfilled") this.configure();
			if (root.ready.status === "rejected") throw root.ready.reason;
			const commit = () => {
				var _root$configuration$p;
				if (root.state.status !== "open" || root.ready.status === "rejected") return;
				if (root.ready.status === "pending") {
					root.ready.then(commit, logRecoverableError);
					return;
				}
				const onCreated = (_root$configuration$p = root.configuration.previous) == null ? void 0 : _root$configuration$p.onCreated;
				const element = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Provider, {
					store,
					children,
					onCreated,
					rootElement: canvas
				});
				if (mounted) {
					reconciler.updateContainer(element, fiber, null, noop);
					return;
				}
				mounted = true;
				reconciler.updateContainerSync(element, fiber, null, noop);
				reconciler.flushSyncWork();
			};
			commit();
			return store;
		},
		unmount() {
			if (_roots.get(canvas) === root) unmountComponentAtNode(canvas);
		}
	};
}
function Provider({ store, children, onCreated, rootElement }) {
	useIsomorphicLayoutEffect(() => {
		const state = store.getState();
		state.set((state) => ({ internal: {
			...state.internal,
			active: true
		} }));
		if (onCreated) onCreated(state);
		if (!store.getState().events.connected) state.events.connect == null || state.events.connect(rootElement);
	}, []);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(context.Provider, {
		value: store,
		children
	});
}
function attempt(step) {
	try {
		return step();
	} catch (error) {
		console.warn("[R3F] Error while unmounting root; teardown may be incomplete:", error);
	}
}
function unmountComponentAtNode(canvas, callback) {
	const root = _roots.get(canvas);
	const token = Symbol("unmount");
	if (!root || !transitionRoot(root, {
		type: "unmount",
		token
	})) return;
	const teardown = () => {
		var _state$gl;
		if (root.ready.status === "pending") {
			root.ready.then(teardown, teardown);
			return;
		}
		if (!transitionRoot(root, {
			type: "dispose",
			token
		})) return;
		_roots.delete(canvas);
		const state = root.store.getState();
		state.internal.active = false;
		attempt(() => root.unwatchDpr == null ? void 0 : root.unwatchDpr());
		attempt(() => state.events.disconnect == null ? void 0 : state.events.disconnect());
		if ((_state$gl = state.gl) != null && _state$gl.xr) attempt(() => state.xr.disconnect());
		if (state.scene) attempt(() => dispose(state.scene));
		const disposal = attempt(() => releaseRenderer(state.gl, root.ownsRenderer));
		if (isPromiseLike(disposal)) disposal.then(() => callback == null ? void 0 : callback(canvas));
		else callback?.(canvas);
	};
	reconciler.updateContainer(null, root.fiber, null, () => {
		if (root.state.status !== "closing" || root.state.token !== token) return;
		reconciler.updateContainer(null, root.fiber, null, teardown);
	});
}
var globalEffects = /* @__PURE__ */ new Set();
var globalAfterEffects = /* @__PURE__ */ new Set();
var globalTailEffects = /* @__PURE__ */ new Set();
function run(effects, timestamp) {
	if (!effects.size) return;
	for (const { callback } of effects.values()) callback(timestamp);
}
function flushGlobalEffects(type, timestamp) {
	switch (type) {
		case "before": return run(globalEffects, timestamp);
		case "after": return run(globalAfterEffects, timestamp);
		case "tail": return run(globalTailEffects, timestamp);
	}
}
var subscribers;
var subscription;
function update(timestamp, state, frame) {
	let delta = state.clock.getDelta();
	if (state.frameloop === "never" && typeof timestamp === "number") {
		delta = timestamp - state.clock.elapsedTime;
		state.clock.oldTime = state.clock.elapsedTime;
		state.clock.elapsedTime = timestamp;
	}
	subscribers = state.internal.subscribers;
	for (let i = 0; i < subscribers.length; i++) {
		subscription = subscribers[i];
		subscription.ref.current(subscription.store.getState(), delta, frame);
	}
	if (!state.internal.priority && state.gl.render) state.gl.render(state.scene, state.camera);
	state.internal.frames = Math.max(0, state.internal.frames - 1);
	return state.frameloop === "always" ? 1 : state.internal.frames;
}
var running = false;
var useFrameInProgress = false;
var repeat;
var frame;
var state;
function loop(timestamp) {
	frame = requestAnimationFrame(loop);
	running = true;
	repeat = 0;
	flushGlobalEffects("before", timestamp);
	useFrameInProgress = true;
	for (const root of _roots.values()) {
		var _state$gl$xr;
		state = root.store.getState();
		if (state.internal.active && (state.frameloop === "always" || state.internal.frames > 0) && !((_state$gl$xr = state.gl.xr) != null && _state$gl$xr.isPresenting)) repeat += update(timestamp, state);
	}
	useFrameInProgress = false;
	flushGlobalEffects("after", timestamp);
	if (repeat === 0) {
		flushGlobalEffects("tail", timestamp);
		running = false;
		return cancelAnimationFrame(frame);
	}
}
/**
* Invalidates the view, requesting a frame to be rendered. Will globally invalidate unless passed a root's state.
* @see https://docs.pmnd.rs/react-three-fiber/api/additional-exports#invalidate
*/
function invalidate(state, frames = 1) {
	var _state$gl$xr2;
	if (!state) return _roots.forEach((root) => invalidate(root.store.getState(), frames));
	if ((_state$gl$xr2 = state.gl.xr) != null && _state$gl$xr2.isPresenting || !state.internal.active || state.frameloop === "never") return;
	if (frames > 1) state.internal.frames = Math.min(60, state.internal.frames + frames);
	else if (useFrameInProgress) state.internal.frames = 2;
	else state.internal.frames = 1;
	if (!running) {
		running = true;
		requestAnimationFrame(loop);
	}
}
/**
* Advances the frameloop and runs render effects, useful for when manually rendering via `frameloop="never"`.
* @see https://docs.pmnd.rs/react-three-fiber/api/additional-exports#advance
*/
function advance(timestamp, runGlobalEffects = true, state, frame) {
	if (runGlobalEffects) flushGlobalEffects("before", timestamp);
	if (!state) for (const root of _roots.values()) update(timestamp, root.store.getState());
	else update(timestamp, state, frame);
	if (runGlobalEffects) flushGlobalEffects("after", timestamp);
}
function createPortal(children, container, state) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Portal, {
		children,
		container,
		state
	});
}
function initializePortal(options, initialState) {
	const { parentStore, container } = options;
	const portalStore = createWithEqualityFn((set, get) => ({
		...initialState,
		set,
		get,
		setEvents: (events) => set((state) => ({
			...state,
			events: {
				...state.events,
				...events
			}
		}))
	}));
	const parentStateRef = { current: parentStore.getState() };
	portalStore.setState((portalState) => inject(parentStateRef.current, portalState, options));
	return {
		parentStore,
		container,
		portalStore,
		parentStateRef
	};
}
function Portal({ state = {}, children, container }) {
	const parentStore = useStore();
	const { events, size, ...rest } = state;
	const [raycaster] = import_react.useState(() => new Raycaster());
	const [pointer] = import_react.useState(() => new Vector2());
	const options = {
		parentStore,
		container,
		raycaster,
		pointer,
		events,
		size
	};
	const injectRef = useMutableCallback((parentState, portalState) => inject(parentState, portalState, options));
	const [portal, setPortal] = import_react.useState(() => initializePortal(options, rest));
	if (portal.parentStore !== parentStore || portal.container !== container) setPortal(initializePortal(options, rest));
	const { portalStore, parentStateRef } = portal;
	useIsomorphicLayoutEffect(() => {
		const update = (parentState) => {
			parentStateRef.current = parentState;
			portalStore.setState((portalState) => injectRef.current(parentState, portalState));
		};
		const unsubscribe = parentStore.subscribe(update);
		const parentState = parentStore.getState();
		if (parentState !== parentStateRef.current) update(parentState);
		return unsubscribe;
	}, [
		parentStore,
		portalStore,
		parentStateRef
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: reconciler.createPortal(/*#__PURE__*/ (0, import_jsx_runtime.jsx)(context.Provider, {
		value: portalStore,
		children
	}), portalStore, null) });
}
function inject(parentState, portalState, options) {
	const { parentStore, container, raycaster, pointer, events, size } = options;
	let viewport = void 0;
	if (portalState.camera && size) {
		const camera = portalState.camera;
		viewport = parentState.viewport.getCurrentViewport(camera, new Vector3(), size);
		if (camera !== parentState.camera) updateCamera(camera, size);
	}
	return {
		...parentState,
		...portalState,
		scene: container,
		raycaster,
		pointer,
		mouse: pointer,
		previousRoot: parentStore,
		events: {
			...parentState.events,
			...portalState.events,
			...events
		},
		size: {
			...parentState.size,
			...size
		},
		viewport: {
			...parentState.viewport,
			...viewport
		}
	};
}
var DOM_EVENTS = {
	onClick: ["click", false],
	onContextMenu: ["contextmenu", false],
	onDoubleClick: ["dblclick", false],
	onWheel: ["wheel", true],
	onPointerDown: ["pointerdown", true],
	onPointerUp: ["pointerup", true],
	onPointerLeave: ["pointerleave", true],
	onPointerMove: ["pointermove", true],
	onPointerCancel: ["pointercancel", true],
	onLostPointerCapture: ["lostpointercapture", true]
};
/** Default R3F event manager for web */
function createPointerEvents(store) {
	const { handlePointer } = createEvents(store);
	return {
		priority: 1,
		enabled: true,
		compute(event, state, previous) {
			state.pointer.set(event.offsetX / state.size.width * 2 - 1, -(event.offsetY / state.size.height) * 2 + 1);
			state.raycaster.setFromCamera(state.pointer, state.camera);
		},
		connected: void 0,
		handlers: Object.keys(DOM_EVENTS).reduce((acc, key) => ({
			...acc,
			[key]: handlePointer(key)
		}), {}),
		update: () => {
			var _internal$lastEvent;
			const { events, internal } = store.getState();
			if ((_internal$lastEvent = internal.lastEvent) != null && _internal$lastEvent.current && events.handlers) events.handlers.onPointerMove(internal.lastEvent.current);
		},
		connect: (target) => {
			const { set, events } = store.getState();
			events.disconnect == null || events.disconnect();
			set((state) => ({ events: {
				...state.events,
				connected: target
			} }));
			if (events.handlers) for (const name in events.handlers) {
				const event = events.handlers[name];
				const [eventName, passive] = DOM_EVENTS[name];
				target.addEventListener(eventName, event, { passive });
			}
		},
		disconnect: () => {
			const { set, events } = store.getState();
			if (events.connected) {
				if (events.handlers) for (const name in events.handlers) {
					const event = events.handlers[name];
					const [eventName] = DOM_EVENTS[name];
					events.connected.removeEventListener(eventName, event);
				}
				set((state) => ({ events: {
					...state.events,
					connected: void 0
				} }));
			}
		}
	};
}
//#endregion
//#region node_modules/react-use-measure/dist/index.js
function g(n, t) {
	let o;
	return (...i) => {
		window.clearTimeout(o), o = window.setTimeout(() => n(...i), t);
	};
}
function j({ debounce: n, scroll: t, polyfill: o, offsetSize: i } = {
	debounce: 0,
	scroll: !1,
	offsetSize: !1
}) {
	const a = o || (typeof window == "undefined" ? class {} : window.ResizeObserver);
	if (!a) throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");
	const [c, h] = (0, import_react.useState)({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		bottom: 0,
		right: 0,
		x: 0,
		y: 0
	}), e = (0, import_react.useRef)({
		element: null,
		scrollContainers: null,
		resizeObserver: null,
		lastBounds: c,
		orientationHandler: null
	}), d = n ? typeof n == "number" ? n : n.scroll : null, f = n ? typeof n == "number" ? n : n.resize : null, w = (0, import_react.useRef)(!1);
	(0, import_react.useEffect)(() => (w.current = !0, () => void (w.current = !1)));
	const [z, m, s] = (0, import_react.useMemo)(() => {
		const r = () => {
			if (!e.current.element) return;
			const { left: y, top: C, width: H, height: O, bottom: S, right: x, x: B, y: R } = e.current.element.getBoundingClientRect(), l = {
				left: y,
				top: C,
				width: H,
				height: O,
				bottom: S,
				right: x,
				x: B,
				y: R
			};
			e.current.element instanceof HTMLElement && i && (l.height = e.current.element.offsetHeight, l.width = e.current.element.offsetWidth), Object.freeze(l), w.current && !D(e.current.lastBounds, l) && h(e.current.lastBounds = l);
		};
		return [
			r,
			f ? g(r, f) : r,
			d ? g(r, d) : r
		];
	}, [
		h,
		i,
		d,
		f
	]);
	function v() {
		e.current.scrollContainers && (e.current.scrollContainers.forEach((r) => r.removeEventListener("scroll", s, !0)), e.current.scrollContainers = null), e.current.resizeObserver && (e.current.resizeObserver.disconnect(), e.current.resizeObserver = null), e.current.orientationHandler && ("orientation" in screen && "removeEventListener" in screen.orientation ? screen.orientation.removeEventListener("change", e.current.orientationHandler) : "onorientationchange" in window && window.removeEventListener("orientationchange", e.current.orientationHandler));
	}
	function b() {
		e.current.element && (e.current.resizeObserver = new a(s), e.current.resizeObserver.observe(e.current.element), t && e.current.scrollContainers && e.current.scrollContainers.forEach((r) => r.addEventListener("scroll", s, {
			capture: !0,
			passive: !0
		})), e.current.orientationHandler = () => {
			s();
		}, "orientation" in screen && "addEventListener" in screen.orientation ? screen.orientation.addEventListener("change", e.current.orientationHandler) : "onorientationchange" in window && window.addEventListener("orientationchange", e.current.orientationHandler));
	}
	const L = (r) => {
		!r || r === e.current.element || (v(), e.current.element = r, e.current.scrollContainers = E(r), b());
	};
	return X(s, !!t), W(m), (0, import_react.useEffect)(() => {
		v(), b();
	}, [
		t,
		s,
		m
	]), (0, import_react.useEffect)(() => v, []), [
		L,
		c,
		z
	];
}
function W(n) {
	(0, import_react.useEffect)(() => {
		const t = n;
		return window.addEventListener("resize", t), () => void window.removeEventListener("resize", t);
	}, [n]);
}
function X(n, t) {
	(0, import_react.useEffect)(() => {
		if (t) {
			const o = n;
			return window.addEventListener("scroll", o, {
				capture: !0,
				passive: !0
			}), () => void window.removeEventListener("scroll", o, !0);
		}
	}, [n, t]);
}
function E(n) {
	const t = [];
	if (!n || n === document.body) return t;
	const { overflow: o, overflowX: i, overflowY: a } = window.getComputedStyle(n);
	return [
		o,
		i,
		a
	].some((c) => c === "auto" || c === "scroll") && t.push(n), [...t, ...E(n.parentElement)];
}
var k = [
	"x",
	"y",
	"top",
	"bottom",
	"left",
	"right",
	"width",
	"height"
];
var D = (n, t) => k.every((o) => n[o] === t[o]);
//#endregion
//#region node_modules/@react-three/fiber/dist/react-three-fiber.esm.js
function CanvasImpl({ ref, children, fallback, resize, style, gl, events = createPointerEvents, eventSource, eventPrefix, shadows, linear, flat, legacy, orthographic, frameloop, dpr, performance, raycaster, camera, scene, onPointerMissed, onCreated, ...props }) {
	import_react.useMemo(() => extend(three_module_exports), []);
	const Bridge = useBridge();
	const [containerRef, containerRect] = j({
		scroll: true,
		debounce: {
			scroll: 50,
			resize: 0
		},
		...resize
	});
	const canvasRef = import_react.useRef(null);
	const divRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => canvasRef.current);
	const handlePointerMissed = useMutableCallback(onPointerMissed);
	const pointerMissed = import_react.useCallback((event) => handlePointerMissed.current == null ? void 0 : handlePointerMissed.current(event), [handlePointerMissed]);
	const [block, setBlock] = import_react.useState(false);
	const [error, setError] = import_react.useState(false);
	if (block) throw block;
	if (error) throw error;
	const root = import_react.useRef(null);
	const [gate, waitFor] = useGate();
	const rootState = import_react.useRef(null);
	const eventTarget = () => eventSource ? isRef$1(eventSource) ? eventSource.current : eventSource : divRef.current;
	import_react.useInsertionEffect(() => {
		return () => {
			const current = root.current;
			root.current = null;
			current?.unmount();
		};
	}, []);
	useIsomorphicLayoutEffect(() => {
		const canvas = canvasRef.current;
		if (containerRect.width > 0 && containerRect.height > 0 && canvas) {
			if (!root.current) root.current = createRoot(canvas);
			root.current.configure({
				gl,
				scene,
				events,
				shadows,
				linear,
				flat,
				legacy,
				orthographic,
				frameloop,
				dpr,
				performance,
				raycaster,
				camera,
				size: containerRect,
				onPointerMissed: pointerMissed,
				onCreated: (state) => {
					var _eventTarget;
					rootState.current = state;
					state.events.connect == null || state.events.connect((_eventTarget = eventTarget()) != null ? _eventTarget : divRef.current);
					if (eventPrefix) state.setEvents({ compute: (event, state) => {
						const x = event[eventPrefix + "X"];
						const y = event[eventPrefix + "Y"];
						state.pointer.set(x / state.size.width * 2 - 1, -(y / state.size.height) * 2 + 1);
						state.raycaster.setFromCamera(state.pointer, state.camera);
					} });
					onCreated?.(state);
				}
			}).catch(setError);
			if (root.current.ready.status === "fulfilled") root.current.render(/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Bridge, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
				set: setError,
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Block, { set: setBlock }),
					children: children != null ? children : null
				})
			}) }));
			else if (root.current.ready.status === "pending") waitFor(root.current.ready);
		}
	});
	import_react.useEffect(() => {
		var _rootState$current;
		const state = (_rootState$current = rootState.current) == null ? void 0 : _rootState$current.get();
		const target = eventTarget();
		if (state && target && state.events.connected !== target) state.events.connect == null || state.events.connect(target);
	});
	import_react.useEffect(() => {
		const canvas = canvasRef.current;
		return () => {
			var _root$current;
			if (!canvas.isConnected) (_root$current = root.current) == null || _root$current.unmount();
		};
	}, []);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		ref: divRef,
		style: {
			position: "relative",
			width: "100%",
			height: "100%",
			overflow: "hidden",
			pointerEvents: eventSource ? "none" : "auto",
			...style
		},
		...props,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			ref: containerRef,
			style: {
				width: "100%",
				height: "100%"
			},
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				style: { display: "block" },
				children: fallback
			})
		}), gate]
	});
}
/**
* A DOM canvas which accepts threejs elements as children.
* @see https://docs.pmnd.rs/react-three-fiber/api/canvas
*/
function Canvas(props) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(h, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CanvasImpl, { ...props }) });
}
//#endregion
//#region node_modules/three-stdlib/_polyfill/constants.js
var version$1 = /* @__PURE__ */ (() => parseInt("187".replace(/\D+/g, "")))();
//#endregion
//#region node_modules/three-stdlib/node_modules/fflate/esm/index.mjs
var require$1 = createRequire("/");
try {
	require$1("worker_threads").Worker;
} catch (e) {}
var u8 = Uint8Array;
var u16 = Uint16Array;
var u32 = Uint32Array;
var fleb = new u8([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]);
var fdeb = new u8([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]);
var clim = new u8([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]);
var freb = function(eb, start) {
	var b = new u16(31);
	for (var i = 0; i < 31; ++i) b[i] = start += 1 << eb[i - 1];
	var r = new u32(b[30]);
	for (var i = 1; i < 30; ++i) for (var j = b[i]; j < b[i + 1]; ++j) r[j] = j - b[i] << 5 | i;
	return [b, r];
};
var _a = freb(fleb, 2);
var fl = _a[0];
var revfl = _a[1];
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b[0];
_b[1];
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
	var x = (i & 43690) >>> 1 | (i & 21845) << 1;
	x = (x & 52428) >>> 2 | (x & 13107) << 2;
	x = (x & 61680) >>> 4 | (x & 3855) << 4;
	rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
var hMap = (function(cd, mb, r) {
	var s = cd.length;
	var i = 0;
	var l = new u16(mb);
	for (; i < s; ++i) ++l[cd[i] - 1];
	var le = new u16(mb);
	for (i = 0; i < mb; ++i) le[i] = le[i - 1] + l[i - 1] << 1;
	var co;
	if (r) {
		co = new u16(1 << mb);
		var rvb = 15 - mb;
		for (i = 0; i < s; ++i) if (cd[i]) {
			var sv = i << 4 | cd[i];
			var r_1 = mb - cd[i];
			var v = le[cd[i] - 1]++ << r_1;
			for (var m = v | (1 << r_1) - 1; v <= m; ++v) co[rev[v] >>> rvb] = sv;
		}
	} else {
		co = new u16(s);
		for (i = 0; i < s; ++i) if (cd[i]) co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
	}
	return co;
});
var flt = new u8(288);
for (var i = 0; i < 144; ++i) flt[i] = 8;
for (var i = 144; i < 256; ++i) flt[i] = 9;
for (var i = 256; i < 280; ++i) flt[i] = 7;
for (var i = 280; i < 288; ++i) flt[i] = 8;
var fdt = new u8(32);
for (var i = 0; i < 32; ++i) fdt[i] = 5;
var flrm = /*#__PURE__*/ hMap(flt, 9, 1);
var fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
var max = function(a) {
	var m = a[0];
	for (var i = 1; i < a.length; ++i) if (a[i] > m) m = a[i];
	return m;
};
var bits = function(d, p, m) {
	var o = p / 8 | 0;
	return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
	var o = p / 8 | 0;
	return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
	return (p / 8 | 0) + (p & 7 && 1);
};
var slc = function(v, s, e) {
	if (s == null || s < 0) s = 0;
	if (e == null || e > v.length) e = v.length;
	var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s);
	n.set(v.subarray(s, e));
	return n;
};
var inflt = function(dat, buf, st) {
	var sl = dat.length;
	if (!sl || st && !st.l && sl < 5) return buf || new u8(0);
	var noBuf = !buf || st;
	var noSt = !st || st.i;
	if (!st) st = {};
	if (!buf) buf = new u8(sl * 3);
	var cbuf = function(l) {
		var bl = buf.length;
		if (l > bl) {
			var nbuf = new u8(Math.max(bl * 2, l));
			nbuf.set(buf);
			buf = nbuf;
		}
	};
	var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
	var tbts = sl * 8;
	do {
		if (!lm) {
			st.f = final = bits(dat, pos, 1);
			var type = bits(dat, pos + 1, 3);
			pos += 3;
			if (!type) {
				var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
				if (t > sl) {
					if (noSt) throw "unexpected EOF";
					break;
				}
				if (noBuf) cbuf(bt + l);
				buf.set(dat.subarray(s, t), bt);
				st.b = bt += l, st.p = pos = t * 8;
				continue;
			} else if (type == 1) lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
			else if (type == 2) {
				var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
				var tl = hLit + bits(dat, pos + 5, 31) + 1;
				pos += 14;
				var ldt = new u8(tl);
				var clt = new u8(19);
				for (var i = 0; i < hcLen; ++i) clt[clim[i]] = bits(dat, pos + i * 3, 7);
				pos += hcLen * 3;
				var clb = max(clt), clbmsk = (1 << clb) - 1;
				var clm = hMap(clt, clb, 1);
				for (var i = 0; i < tl;) {
					var r = clm[bits(dat, pos, clbmsk)];
					pos += r & 15;
					var s = r >>> 4;
					if (s < 16) ldt[i++] = s;
					else {
						var c = 0, n = 0;
						if (s == 16) n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
						else if (s == 17) n = 3 + bits(dat, pos, 7), pos += 3;
						else if (s == 18) n = 11 + bits(dat, pos, 127), pos += 7;
						while (n--) ldt[i++] = c;
					}
				}
				var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
				lbt = max(lt);
				dbt = max(dt);
				lm = hMap(lt, lbt, 1);
				dm = hMap(dt, dbt, 1);
			} else throw "invalid block type";
			if (pos > tbts) {
				if (noSt) throw "unexpected EOF";
				break;
			}
		}
		if (noBuf) cbuf(bt + 131072);
		var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
		var lpos = pos;
		for (;; lpos = pos) {
			var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
			pos += c & 15;
			if (pos > tbts) {
				if (noSt) throw "unexpected EOF";
				break;
			}
			if (!c) throw "invalid length/literal";
			if (sym < 256) buf[bt++] = sym;
			else if (sym == 256) {
				lpos = pos, lm = null;
				break;
			} else {
				var add = sym - 254;
				if (sym > 264) {
					var i = sym - 257, b = fleb[i];
					add = bits(dat, pos, (1 << b) - 1) + fl[i];
					pos += b;
				}
				var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
				if (!d) throw "invalid distance";
				pos += d & 15;
				var dt = fd[dsym];
				if (dsym > 3) {
					var b = fdeb[dsym];
					dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
				}
				if (pos > tbts) {
					if (noSt) throw "unexpected EOF";
					break;
				}
				if (noBuf) cbuf(bt + 131072);
				var end = bt + add;
				for (; bt < end; bt += 4) {
					buf[bt] = buf[bt - dt];
					buf[bt + 1] = buf[bt + 1 - dt];
					buf[bt + 2] = buf[bt + 2 - dt];
					buf[bt + 3] = buf[bt + 3 - dt];
				}
				bt = end;
			}
		}
		st.l = lm, st.p = lpos, st.b = bt;
		if (lm) final = 1, st.m = lbt, st.d = dm, st.n = dbt;
	} while (!final);
	return bt == buf.length ? buf : slc(buf, 0, bt);
};
var et = /*#__PURE__*/ new u8(0);
var zlv = function(d) {
	if ((d[0] & 15) != 8 || d[0] >>> 4 > 7 || (d[0] << 8 | d[1]) % 31) throw "invalid zlib data";
	if (d[1] & 32) throw "invalid zlib data: preset dictionaries not supported";
};
/**
* Expands Zlib data
* @param data The data to decompress
* @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
* @returns The decompressed version of the data
*/
function unzlibSync(data, out) {
	return inflt((zlv(data), data.subarray(2, -4)), out);
}
var td = typeof TextDecoder != "undefined" && /*#__PURE__*/ new TextDecoder();
try {
	td.decode(et, { stream: true });
} catch (e) {}
//#endregion
//#region node_modules/three-stdlib/objects/GroundProjectedEnv.js
var isCubeTexture = (def) => def && def.isCubeTexture;
var GroundProjectedEnv = class extends Mesh {
	constructor(texture, options) {
		var _a, _b;
		const isCubeMap = isCubeTexture(texture);
		const cubeSize = ((_b = isCubeMap ? (_a = texture.image[0]) == null ? void 0 : _a.width : texture.image.width) != null ? _b : 1024) / 4;
		const _lodMax = Math.floor(Math.log2(cubeSize));
		const _cubeSize = Math.pow(2, _lodMax);
		const width = 3 * Math.max(_cubeSize, 112);
		const height = 4 * _cubeSize;
		const defines = [
			isCubeMap ? "#define ENVMAP_TYPE_CUBE" : "",
			`#define CUBEUV_TEXEL_WIDTH ${1 / width}`,
			`#define CUBEUV_TEXEL_HEIGHT ${1 / height}`,
			`#define CUBEUV_MAX_MIP ${_lodMax}.0`
		];
		const vertexShader = `
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `;
		const fragmentShader = defines.join("\n") + `
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${version$1 >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
        }
        `;
		const uniforms = {
			map: { value: texture },
			height: { value: (options == null ? void 0 : options.height) || 15 },
			radius: { value: (options == null ? void 0 : options.radius) || 100 }
		};
		const geometry = new IcosahedronGeometry(1, 16);
		const material = new ShaderMaterial({
			uniforms,
			fragmentShader,
			vertexShader,
			side: 2
		});
		super(geometry, material);
	}
	set radius(radius) {
		this.material.uniforms.radius.value = radius;
	}
	get radius() {
		return this.material.uniforms.radius.value;
	}
	set height(height) {
		this.material.uniforms.height.value = height;
	}
	get height() {
		return this.material.uniforms.height.value;
	}
};
//#endregion
//#region node_modules/three-stdlib/loaders/RGBELoader.js
var RGBELoader = class extends DataTextureLoader {
	constructor(manager) {
		super(manager);
		this.type = HalfFloatType;
	}
	parse(buffer) {
		const rgbe_read_error = 1, rgbe_write_error = 2, rgbe_format_error = 3, rgbe_memory_error = 4, rgbe_error = function(rgbe_error_code, msg) {
			switch (rgbe_error_code) {
				case rgbe_read_error: throw new Error("THREE.RGBELoader: Read Error: " + (msg || ""));
				case rgbe_write_error: throw new Error("THREE.RGBELoader: Write Error: " + (msg || ""));
				case rgbe_format_error: throw new Error("THREE.RGBELoader: Bad File Format: " + (msg || ""));
				default:
				case rgbe_memory_error: throw new Error("THREE.RGBELoader: Memory Error: " + (msg || ""));
			}
		}, RGBE_VALID_PROGRAMTYPE = 1, RGBE_VALID_FORMAT = 2, RGBE_VALID_DIMENSIONS = 4, NEWLINE = "\n", fgets = function(buffer2, lineLimit, consume) {
			const chunkSize = 128;
			lineLimit = !lineLimit ? 1024 : lineLimit;
			let p = buffer2.pos, i = -1, len = 0, s = "", chunk = String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
			while (0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer2.byteLength) {
				s += chunk;
				len += chunk.length;
				p += chunkSize;
				chunk += String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
			}
			if (-1 < i) {
				if (false !== consume) buffer2.pos += len + i + 1;
				return s + chunk.slice(0, i);
			}
			return false;
		}, RGBE_ReadHeader = function(buffer2) {
			const magic_token_re = /^#\?(\S+)/, gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, format_re = /^\s*FORMAT=(\S+)\s*$/, dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, header = {
				valid: 0,
				string: "",
				comments: "",
				programtype: "RGBE",
				format: "",
				gamma: 1,
				exposure: 1,
				width: 0,
				height: 0
			};
			let line, match;
			if (buffer2.pos >= buffer2.byteLength || !(line = fgets(buffer2))) rgbe_error(rgbe_read_error, "no header found");
			if (!(match = line.match(magic_token_re))) rgbe_error(rgbe_format_error, "bad initial token");
			header.valid |= RGBE_VALID_PROGRAMTYPE;
			header.programtype = match[1];
			header.string += line + "\n";
			while (true) {
				line = fgets(buffer2);
				if (false === line) break;
				header.string += line + "\n";
				if ("#" === line.charAt(0)) {
					header.comments += line + "\n";
					continue;
				}
				if (match = line.match(gamma_re)) header.gamma = parseFloat(match[1]);
				if (match = line.match(exposure_re)) header.exposure = parseFloat(match[1]);
				if (match = line.match(format_re)) {
					header.valid |= RGBE_VALID_FORMAT;
					header.format = match[1];
				}
				if (match = line.match(dimensions_re)) {
					header.valid |= RGBE_VALID_DIMENSIONS;
					header.height = parseInt(match[1], 10);
					header.width = parseInt(match[2], 10);
				}
				if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS) break;
			}
			if (!(header.valid & RGBE_VALID_FORMAT)) rgbe_error(rgbe_format_error, "missing format specifier");
			if (!(header.valid & RGBE_VALID_DIMENSIONS)) rgbe_error(rgbe_format_error, "missing image size specifier");
			return header;
		}, RGBE_ReadPixels_RLE = function(buffer2, w2, h2) {
			const scanline_width = w2;
			if (scanline_width < 8 || scanline_width > 32767 || 2 !== buffer2[0] || 2 !== buffer2[1] || buffer2[2] & 128) return new Uint8Array(buffer2);
			if (scanline_width !== (buffer2[2] << 8 | buffer2[3])) rgbe_error(rgbe_format_error, "wrong scanline width");
			const data_rgba = new Uint8Array(4 * w2 * h2);
			if (!data_rgba.length) rgbe_error(rgbe_memory_error, "unable to allocate buffer space");
			let offset = 0, pos = 0;
			const ptr_end = 4 * scanline_width;
			const rgbeStart = /* @__PURE__ */ new Uint8Array(4);
			const scanline_buffer = new Uint8Array(ptr_end);
			let num_scanlines = h2;
			while (num_scanlines > 0 && pos < buffer2.byteLength) {
				if (pos + 4 > buffer2.byteLength) rgbe_error(rgbe_read_error);
				rgbeStart[0] = buffer2[pos++];
				rgbeStart[1] = buffer2[pos++];
				rgbeStart[2] = buffer2[pos++];
				rgbeStart[3] = buffer2[pos++];
				if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) rgbe_error(rgbe_format_error, "bad rgbe scanline format");
				let ptr = 0, count;
				while (ptr < ptr_end && pos < buffer2.byteLength) {
					count = buffer2[pos++];
					const isEncodedRun = count > 128;
					if (isEncodedRun) count -= 128;
					if (0 === count || ptr + count > ptr_end) rgbe_error(rgbe_format_error, "bad scanline data");
					if (isEncodedRun) {
						const byteValue = buffer2[pos++];
						for (let i = 0; i < count; i++) scanline_buffer[ptr++] = byteValue;
					} else {
						scanline_buffer.set(buffer2.subarray(pos, pos + count), ptr);
						ptr += count;
						pos += count;
					}
				}
				const l = scanline_width;
				for (let i = 0; i < l; i++) {
					let off = 0;
					data_rgba[offset] = scanline_buffer[i + off];
					off += scanline_width;
					data_rgba[offset + 1] = scanline_buffer[i + off];
					off += scanline_width;
					data_rgba[offset + 2] = scanline_buffer[i + off];
					off += scanline_width;
					data_rgba[offset + 3] = scanline_buffer[i + off];
					offset += 4;
				}
				num_scanlines--;
			}
			return data_rgba;
		};
		const RGBEByteToRGBFloat = function(sourceArray, sourceOffset, destArray, destOffset) {
			const e = sourceArray[sourceOffset + 3];
			const scale = Math.pow(2, e - 128) / 255;
			destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale;
			destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale;
			destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale;
			destArray[destOffset + 3] = 1;
		};
		const RGBEByteToRGBHalf = function(sourceArray, sourceOffset, destArray, destOffset) {
			const e = sourceArray[sourceOffset + 3];
			const scale = Math.pow(2, e - 128) / 255;
			destArray[destOffset + 0] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 0] * scale, 65504));
			destArray[destOffset + 1] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 1] * scale, 65504));
			destArray[destOffset + 2] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 2] * scale, 65504));
			destArray[destOffset + 3] = DataUtils.toHalfFloat(1);
		};
		const byteArray = new Uint8Array(buffer);
		byteArray.pos = 0;
		const rgbe_header_info = RGBE_ReadHeader(byteArray);
		const w = rgbe_header_info.width, h = rgbe_header_info.height, image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);
		let data, type;
		let numElements;
		switch (this.type) {
			case FloatType:
				numElements = image_rgba_data.length / 4;
				const floatArray = new Float32Array(numElements * 4);
				for (let j = 0; j < numElements; j++) RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 4);
				data = floatArray;
				type = FloatType;
				break;
			case HalfFloatType:
				numElements = image_rgba_data.length / 4;
				const halfArray = new Uint16Array(numElements * 4);
				for (let j = 0; j < numElements; j++) RGBEByteToRGBHalf(image_rgba_data, j * 4, halfArray, j * 4);
				data = halfArray;
				type = HalfFloatType;
				break;
			default: throw new Error("THREE.RGBELoader: Unsupported type: " + this.type);
		}
		return {
			width: w,
			height: h,
			data,
			header: rgbe_header_info.string,
			gamma: rgbe_header_info.gamma,
			exposure: rgbe_header_info.exposure,
			type
		};
	}
	setDataType(value) {
		this.type = value;
		return this;
	}
	load(url, onLoad, onProgress, onError) {
		function onLoadCallback(texture, texData) {
			switch (texture.type) {
				case FloatType:
				case HalfFloatType:
					if ("colorSpace" in texture) texture.colorSpace = "srgb-linear";
					else texture.encoding = 3e3;
					texture.minFilter = LinearFilter;
					texture.magFilter = LinearFilter;
					texture.generateMipmaps = false;
					texture.flipY = true;
			}
			if (onLoad) onLoad(texture, texData);
		}
		return super.load(url, onLoadCallback, onProgress, onError);
	}
};
//#endregion
//#region node_modules/three-stdlib/loaders/EXRLoader.js
var hasColorSpace = version$1 >= 152;
var EXRLoader = class extends DataTextureLoader {
	constructor(manager) {
		super(manager);
		this.type = HalfFloatType;
	}
	parse(buffer) {
		const USHORT_RANGE = 65536;
		const BITMAP_SIZE = 8192;
		const HUF_DECBITS = 14;
		const HUF_ENCSIZE = 65537;
		const HUF_DECSIZE = 16384;
		const HUF_DECMASK = 16383;
		const A_OFFSET = 32768;
		const MOD_MASK = 65535;
		const SHORT_ZEROCODE_RUN = 59;
		const LONG_ZEROCODE_RUN = 63;
		const SHORTEST_LONG_RUN = 6;
		const ULONG_SIZE = 8;
		const FLOAT32_SIZE = 4;
		const INT32_SIZE = 4;
		const INT16_SIZE = 2;
		const INT8_SIZE = 1;
		const STATIC_HUFFMAN = 0;
		const DEFLATE = 1;
		const UNKNOWN = 0;
		const LOSSY_DCT = 1;
		const RLE = 2;
		const logBase = Math.pow(2.7182818, 2.2);
		function reverseLutFromBitmap(bitmap, lut) {
			var k = 0;
			for (var i = 0; i < USHORT_RANGE; ++i) if (i == 0 || bitmap[i >> 3] & 1 << (i & 7)) lut[k++] = i;
			var n = k - 1;
			while (k < USHORT_RANGE) lut[k++] = 0;
			return n;
		}
		function hufClearDecTable(hdec) {
			for (var i = 0; i < HUF_DECSIZE; i++) {
				hdec[i] = {};
				hdec[i].len = 0;
				hdec[i].lit = 0;
				hdec[i].p = null;
			}
		}
		const getBitsReturn = {
			l: 0,
			c: 0,
			lc: 0
		};
		function getBits(nBits, c, lc, uInt8Array2, inOffset) {
			while (lc < nBits) {
				c = c << 8 | parseUint8Array(uInt8Array2, inOffset);
				lc += 8;
			}
			lc -= nBits;
			getBitsReturn.l = c >> lc & (1 << nBits) - 1;
			getBitsReturn.c = c;
			getBitsReturn.lc = lc;
		}
		const hufTableBuffer = new Array(59);
		function hufCanonicalCodeTable(hcode) {
			for (var i = 0; i <= 58; ++i) hufTableBuffer[i] = 0;
			for (var i = 0; i < HUF_ENCSIZE; ++i) hufTableBuffer[hcode[i]] += 1;
			var c = 0;
			for (var i = 58; i > 0; --i) {
				var nc = c + hufTableBuffer[i] >> 1;
				hufTableBuffer[i] = c;
				c = nc;
			}
			for (var i = 0; i < HUF_ENCSIZE; ++i) {
				var l = hcode[i];
				if (l > 0) hcode[i] = l | hufTableBuffer[l]++ << 6;
			}
		}
		function hufUnpackEncTable(uInt8Array2, inDataView, inOffset, ni, im, iM, hcode) {
			var p = inOffset;
			var c = 0;
			var lc = 0;
			for (; im <= iM; im++) {
				if (p.value - inOffset.value > ni) return false;
				getBits(6, c, lc, uInt8Array2, p);
				var l = getBitsReturn.l;
				c = getBitsReturn.c;
				lc = getBitsReturn.lc;
				hcode[im] = l;
				if (l == LONG_ZEROCODE_RUN) {
					if (p.value - inOffset.value > ni) throw "Something wrong with hufUnpackEncTable";
					getBits(8, c, lc, uInt8Array2, p);
					var zerun = getBitsReturn.l + SHORTEST_LONG_RUN;
					c = getBitsReturn.c;
					lc = getBitsReturn.lc;
					if (im + zerun > iM + 1) throw "Something wrong with hufUnpackEncTable";
					while (zerun--) hcode[im++] = 0;
					im--;
				} else if (l >= SHORT_ZEROCODE_RUN) {
					var zerun = l - SHORT_ZEROCODE_RUN + 2;
					if (im + zerun > iM + 1) throw "Something wrong with hufUnpackEncTable";
					while (zerun--) hcode[im++] = 0;
					im--;
				}
			}
			hufCanonicalCodeTable(hcode);
		}
		function hufLength(code) {
			return code & 63;
		}
		function hufCode(code) {
			return code >> 6;
		}
		function hufBuildDecTable(hcode, im, iM, hdecod) {
			for (; im <= iM; im++) {
				var c = hufCode(hcode[im]);
				var l = hufLength(hcode[im]);
				if (c >> l) throw "Invalid table entry";
				if (l > HUF_DECBITS) {
					var pl = hdecod[c >> l - HUF_DECBITS];
					if (pl.len) throw "Invalid table entry";
					pl.lit++;
					if (pl.p) {
						var p = pl.p;
						pl.p = new Array(pl.lit);
						for (var i = 0; i < pl.lit - 1; ++i) pl.p[i] = p[i];
					} else pl.p = new Array(1);
					pl.p[pl.lit - 1] = im;
				} else if (l) {
					var plOffset = 0;
					for (var i = 1 << HUF_DECBITS - l; i > 0; i--) {
						var pl = hdecod[(c << HUF_DECBITS - l) + plOffset];
						if (pl.len || pl.p) throw "Invalid table entry";
						pl.len = l;
						pl.lit = im;
						plOffset++;
					}
				}
			}
			return true;
		}
		const getCharReturn = {
			c: 0,
			lc: 0
		};
		function getChar(c, lc, uInt8Array2, inOffset) {
			c = c << 8 | parseUint8Array(uInt8Array2, inOffset);
			lc += 8;
			getCharReturn.c = c;
			getCharReturn.lc = lc;
		}
		const getCodeReturn = {
			c: 0,
			lc: 0
		};
		function getCode(po, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outBufferOffset, outBufferEndOffset) {
			if (po == rlc) {
				if (lc < 8) {
					getChar(c, lc, uInt8Array2, inOffset);
					c = getCharReturn.c;
					lc = getCharReturn.lc;
				}
				lc -= 8;
				var cs = c >> lc;
				var cs = new Uint8Array([cs])[0];
				if (outBufferOffset.value + cs > outBufferEndOffset) return false;
				var s = outBuffer[outBufferOffset.value - 1];
				while (cs-- > 0) outBuffer[outBufferOffset.value++] = s;
			} else if (outBufferOffset.value < outBufferEndOffset) outBuffer[outBufferOffset.value++] = po;
			else return false;
			getCodeReturn.c = c;
			getCodeReturn.lc = lc;
		}
		function UInt16(value) {
			return value & 65535;
		}
		function Int16(value) {
			var ref = UInt16(value);
			return ref > 32767 ? ref - 65536 : ref;
		}
		const wdec14Return = {
			a: 0,
			b: 0
		};
		function wdec14(l, h) {
			var ls = Int16(l);
			var hi = Int16(h);
			var ai = ls + (hi & 1) + (hi >> 1);
			var as = ai;
			var bs = ai - hi;
			wdec14Return.a = as;
			wdec14Return.b = bs;
		}
		function wdec16(l, h) {
			var m = UInt16(l);
			var d = UInt16(h);
			var bb = m - (d >> 1) & MOD_MASK;
			var aa = d + bb - A_OFFSET & MOD_MASK;
			wdec14Return.a = aa;
			wdec14Return.b = bb;
		}
		function wav2Decode(buffer2, j, nx, ox, ny, oy, mx) {
			var w14 = mx < 16384;
			var n = nx > ny ? ny : nx;
			var p = 1;
			var p2;
			while (p <= n) p <<= 1;
			p >>= 1;
			p2 = p;
			p >>= 1;
			while (p >= 1) {
				var py = 0;
				var ey = py + oy * (ny - p2);
				var oy1 = oy * p;
				var oy2 = oy * p2;
				var ox1 = ox * p;
				var ox2 = ox * p2;
				var i00, i01, i10, i11;
				for (; py <= ey; py += oy2) {
					var px = py;
					var ex = py + ox * (nx - p2);
					for (; px <= ex; px += ox2) {
						var p01 = px + ox1;
						var p10 = px + oy1;
						var p11 = p10 + ox1;
						if (w14) {
							wdec14(buffer2[px + j], buffer2[p10 + j]);
							i00 = wdec14Return.a;
							i10 = wdec14Return.b;
							wdec14(buffer2[p01 + j], buffer2[p11 + j]);
							i01 = wdec14Return.a;
							i11 = wdec14Return.b;
							wdec14(i00, i01);
							buffer2[px + j] = wdec14Return.a;
							buffer2[p01 + j] = wdec14Return.b;
							wdec14(i10, i11);
							buffer2[p10 + j] = wdec14Return.a;
							buffer2[p11 + j] = wdec14Return.b;
						} else {
							wdec16(buffer2[px + j], buffer2[p10 + j]);
							i00 = wdec14Return.a;
							i10 = wdec14Return.b;
							wdec16(buffer2[p01 + j], buffer2[p11 + j]);
							i01 = wdec14Return.a;
							i11 = wdec14Return.b;
							wdec16(i00, i01);
							buffer2[px + j] = wdec14Return.a;
							buffer2[p01 + j] = wdec14Return.b;
							wdec16(i10, i11);
							buffer2[p10 + j] = wdec14Return.a;
							buffer2[p11 + j] = wdec14Return.b;
						}
					}
					if (nx & p) {
						var p10 = px + oy1;
						if (w14) wdec14(buffer2[px + j], buffer2[p10 + j]);
						else wdec16(buffer2[px + j], buffer2[p10 + j]);
						i00 = wdec14Return.a;
						buffer2[p10 + j] = wdec14Return.b;
						buffer2[px + j] = i00;
					}
				}
				if (ny & p) {
					var px = py;
					var ex = py + ox * (nx - p2);
					for (; px <= ex; px += ox2) {
						var p01 = px + ox1;
						if (w14) wdec14(buffer2[px + j], buffer2[p01 + j]);
						else wdec16(buffer2[px + j], buffer2[p01 + j]);
						i00 = wdec14Return.a;
						buffer2[p01 + j] = wdec14Return.b;
						buffer2[px + j] = i00;
					}
				}
				p2 = p;
				p >>= 1;
			}
			return py;
		}
		function hufDecode(encodingTable, decodingTable, uInt8Array2, inDataView, inOffset, ni, rlc, no, outBuffer, outOffset) {
			var c = 0;
			var lc = 0;
			var outBufferEndOffset = no;
			var inOffsetEnd = Math.trunc(inOffset.value + (ni + 7) / 8);
			while (inOffset.value < inOffsetEnd) {
				getChar(c, lc, uInt8Array2, inOffset);
				c = getCharReturn.c;
				lc = getCharReturn.lc;
				while (lc >= HUF_DECBITS) {
					var pl = decodingTable[c >> lc - HUF_DECBITS & HUF_DECMASK];
					if (pl.len) {
						lc -= pl.len;
						getCode(pl.lit, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
						c = getCodeReturn.c;
						lc = getCodeReturn.lc;
					} else {
						if (!pl.p) throw "hufDecode issues";
						var j = 0;
						for (; j < pl.lit; j++) {
							var l = hufLength(encodingTable[pl.p[j]]);
							while (lc < l && inOffset.value < inOffsetEnd) {
								getChar(c, lc, uInt8Array2, inOffset);
								c = getCharReturn.c;
								lc = getCharReturn.lc;
							}
							if (lc >= l) {
								if (hufCode(encodingTable[pl.p[j]]) == (c >> lc - l & (1 << l) - 1)) {
									lc -= l;
									getCode(pl.p[j], rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
									c = getCodeReturn.c;
									lc = getCodeReturn.lc;
									break;
								}
							}
						}
						if (j == pl.lit) throw "hufDecode issues";
					}
				}
			}
			var i = 8 - ni & 7;
			c >>= i;
			lc -= i;
			while (lc > 0) {
				var pl = decodingTable[c << HUF_DECBITS - lc & HUF_DECMASK];
				if (pl.len) {
					lc -= pl.len;
					getCode(pl.lit, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
					c = getCodeReturn.c;
					lc = getCodeReturn.lc;
				} else throw "hufDecode issues";
			}
			return true;
		}
		function hufUncompress(uInt8Array2, inDataView, inOffset, nCompressed, outBuffer, nRaw) {
			var outOffset = { value: 0 };
			var initialInOffset = inOffset.value;
			var im = parseUint32(inDataView, inOffset);
			var iM = parseUint32(inDataView, inOffset);
			inOffset.value += 4;
			var nBits = parseUint32(inDataView, inOffset);
			inOffset.value += 4;
			if (im < 0 || im >= HUF_ENCSIZE || iM < 0 || iM >= HUF_ENCSIZE) throw "Something wrong with HUF_ENCSIZE";
			var freq = new Array(HUF_ENCSIZE);
			var hdec = new Array(HUF_DECSIZE);
			hufClearDecTable(hdec);
			hufUnpackEncTable(uInt8Array2, inDataView, inOffset, nCompressed - (inOffset.value - initialInOffset), im, iM, freq);
			if (nBits > 8 * (nCompressed - (inOffset.value - initialInOffset))) throw "Something wrong with hufUncompress";
			hufBuildDecTable(freq, im, iM, hdec);
			hufDecode(freq, hdec, uInt8Array2, inDataView, inOffset, nBits, iM, nRaw, outBuffer, outOffset);
		}
		function applyLut(lut, data, nData) {
			for (var i = 0; i < nData; ++i) data[i] = lut[data[i]];
		}
		function predictor(source) {
			for (var t = 1; t < source.length; t++) {
				var d = source[t - 1] + source[t] - 128;
				source[t] = d;
			}
		}
		function interleaveScalar(source, out) {
			var t1 = 0;
			var t2 = Math.floor((source.length + 1) / 2);
			var s = 0;
			var stop = source.length - 1;
			while (true) {
				if (s > stop) break;
				out[s++] = source[t1++];
				if (s > stop) break;
				out[s++] = source[t2++];
			}
		}
		function decodeRunLength(source) {
			var size = source.byteLength;
			var out = new Array();
			var p = 0;
			var reader = new DataView(source);
			while (size > 0) {
				var l = reader.getInt8(p++);
				if (l < 0) {
					var count = -l;
					size -= count + 1;
					for (var i = 0; i < count; i++) out.push(reader.getUint8(p++));
				} else {
					var count = l;
					size -= 2;
					var value = reader.getUint8(p++);
					for (var i = 0; i < count + 1; i++) out.push(value);
				}
			}
			return out;
		}
		function lossyDctDecode(cscSet, rowPtrs, channelData, acBuffer, dcBuffer, outBuffer) {
			var dataView = new DataView(outBuffer.buffer);
			var width = channelData[cscSet.idx[0]].width;
			var height = channelData[cscSet.idx[0]].height;
			var numComp = 3;
			var numFullBlocksX = Math.floor(width / 8);
			var numBlocksX = Math.ceil(width / 8);
			var numBlocksY = Math.ceil(height / 8);
			var leftoverX = width - (numBlocksX - 1) * 8;
			var leftoverY = height - (numBlocksY - 1) * 8;
			var currAcComp = { value: 0 };
			var currDcComp = new Array(numComp);
			var dctData = new Array(numComp);
			var halfZigBlock = new Array(numComp);
			var rowBlock = new Array(numComp);
			var rowOffsets = new Array(numComp);
			for (let comp2 = 0; comp2 < numComp; ++comp2) {
				rowOffsets[comp2] = rowPtrs[cscSet.idx[comp2]];
				currDcComp[comp2] = comp2 < 1 ? 0 : currDcComp[comp2 - 1] + numBlocksX * numBlocksY;
				dctData[comp2] = /* @__PURE__ */ new Float32Array(64);
				halfZigBlock[comp2] = /* @__PURE__ */ new Uint16Array(64);
				rowBlock[comp2] = new Uint16Array(numBlocksX * 64);
			}
			for (let blocky = 0; blocky < numBlocksY; ++blocky) {
				var maxY = 8;
				if (blocky == numBlocksY - 1) maxY = leftoverY;
				var maxX = 8;
				for (let blockx = 0; blockx < numBlocksX; ++blockx) {
					if (blockx == numBlocksX - 1) maxX = leftoverX;
					for (let comp2 = 0; comp2 < numComp; ++comp2) {
						halfZigBlock[comp2].fill(0);
						halfZigBlock[comp2][0] = dcBuffer[currDcComp[comp2]++];
						unRleAC(currAcComp, acBuffer, halfZigBlock[comp2]);
						unZigZag(halfZigBlock[comp2], dctData[comp2]);
						dctInverse(dctData[comp2]);
					}
					csc709Inverse(dctData);
					for (let comp2 = 0; comp2 < numComp; ++comp2) convertToHalf(dctData[comp2], rowBlock[comp2], blockx * 64);
				}
				let offset2 = 0;
				for (let comp2 = 0; comp2 < numComp; ++comp2) {
					const type2 = channelData[cscSet.idx[comp2]].type;
					for (let y2 = 8 * blocky; y2 < 8 * blocky + maxY; ++y2) {
						offset2 = rowOffsets[comp2][y2];
						for (let blockx = 0; blockx < numFullBlocksX; ++blockx) {
							const src = blockx * 64 + (y2 & 7) * 8;
							dataView.setUint16(offset2 + 0 * type2, rowBlock[comp2][src + 0], true);
							dataView.setUint16(offset2 + 2 * type2, rowBlock[comp2][src + 1], true);
							dataView.setUint16(offset2 + 4 * type2, rowBlock[comp2][src + 2], true);
							dataView.setUint16(offset2 + 6 * type2, rowBlock[comp2][src + 3], true);
							dataView.setUint16(offset2 + 8 * type2, rowBlock[comp2][src + 4], true);
							dataView.setUint16(offset2 + 10 * type2, rowBlock[comp2][src + 5], true);
							dataView.setUint16(offset2 + 12 * type2, rowBlock[comp2][src + 6], true);
							dataView.setUint16(offset2 + 14 * type2, rowBlock[comp2][src + 7], true);
							offset2 += 16 * type2;
						}
					}
					if (numFullBlocksX != numBlocksX) for (let y2 = 8 * blocky; y2 < 8 * blocky + maxY; ++y2) {
						const offset3 = rowOffsets[comp2][y2] + 8 * numFullBlocksX * INT16_SIZE * type2;
						const src = numFullBlocksX * 64 + (y2 & 7) * 8;
						for (let x2 = 0; x2 < maxX; ++x2) dataView.setUint16(offset3 + x2 * INT16_SIZE * type2, rowBlock[comp2][src + x2], true);
					}
				}
			}
			var halfRow = new Uint16Array(width);
			var dataView = new DataView(outBuffer.buffer);
			for (var comp = 0; comp < numComp; ++comp) {
				channelData[cscSet.idx[comp]].decoded = true;
				var type = channelData[cscSet.idx[comp]].type;
				if (channelData[comp].type != 2) continue;
				for (var y = 0; y < height; ++y) {
					const offset2 = rowOffsets[comp][y];
					for (var x = 0; x < width; ++x) halfRow[x] = dataView.getUint16(offset2 + x * INT16_SIZE * type, true);
					for (var x = 0; x < width; ++x) dataView.setFloat32(offset2 + x * INT16_SIZE * type, decodeFloat16(halfRow[x]), true);
				}
			}
		}
		function unRleAC(currAcComp, acBuffer, halfZigBlock) {
			var acValue;
			var dctComp = 1;
			while (dctComp < 64) {
				acValue = acBuffer[currAcComp.value];
				if (acValue == 65280) dctComp = 64;
				else if (acValue >> 8 == 255) dctComp += acValue & 255;
				else {
					halfZigBlock[dctComp] = acValue;
					dctComp++;
				}
				currAcComp.value++;
			}
		}
		function unZigZag(src, dst) {
			dst[0] = decodeFloat16(src[0]);
			dst[1] = decodeFloat16(src[1]);
			dst[2] = decodeFloat16(src[5]);
			dst[3] = decodeFloat16(src[6]);
			dst[4] = decodeFloat16(src[14]);
			dst[5] = decodeFloat16(src[15]);
			dst[6] = decodeFloat16(src[27]);
			dst[7] = decodeFloat16(src[28]);
			dst[8] = decodeFloat16(src[2]);
			dst[9] = decodeFloat16(src[4]);
			dst[10] = decodeFloat16(src[7]);
			dst[11] = decodeFloat16(src[13]);
			dst[12] = decodeFloat16(src[16]);
			dst[13] = decodeFloat16(src[26]);
			dst[14] = decodeFloat16(src[29]);
			dst[15] = decodeFloat16(src[42]);
			dst[16] = decodeFloat16(src[3]);
			dst[17] = decodeFloat16(src[8]);
			dst[18] = decodeFloat16(src[12]);
			dst[19] = decodeFloat16(src[17]);
			dst[20] = decodeFloat16(src[25]);
			dst[21] = decodeFloat16(src[30]);
			dst[22] = decodeFloat16(src[41]);
			dst[23] = decodeFloat16(src[43]);
			dst[24] = decodeFloat16(src[9]);
			dst[25] = decodeFloat16(src[11]);
			dst[26] = decodeFloat16(src[18]);
			dst[27] = decodeFloat16(src[24]);
			dst[28] = decodeFloat16(src[31]);
			dst[29] = decodeFloat16(src[40]);
			dst[30] = decodeFloat16(src[44]);
			dst[31] = decodeFloat16(src[53]);
			dst[32] = decodeFloat16(src[10]);
			dst[33] = decodeFloat16(src[19]);
			dst[34] = decodeFloat16(src[23]);
			dst[35] = decodeFloat16(src[32]);
			dst[36] = decodeFloat16(src[39]);
			dst[37] = decodeFloat16(src[45]);
			dst[38] = decodeFloat16(src[52]);
			dst[39] = decodeFloat16(src[54]);
			dst[40] = decodeFloat16(src[20]);
			dst[41] = decodeFloat16(src[22]);
			dst[42] = decodeFloat16(src[33]);
			dst[43] = decodeFloat16(src[38]);
			dst[44] = decodeFloat16(src[46]);
			dst[45] = decodeFloat16(src[51]);
			dst[46] = decodeFloat16(src[55]);
			dst[47] = decodeFloat16(src[60]);
			dst[48] = decodeFloat16(src[21]);
			dst[49] = decodeFloat16(src[34]);
			dst[50] = decodeFloat16(src[37]);
			dst[51] = decodeFloat16(src[47]);
			dst[52] = decodeFloat16(src[50]);
			dst[53] = decodeFloat16(src[56]);
			dst[54] = decodeFloat16(src[59]);
			dst[55] = decodeFloat16(src[61]);
			dst[56] = decodeFloat16(src[35]);
			dst[57] = decodeFloat16(src[36]);
			dst[58] = decodeFloat16(src[48]);
			dst[59] = decodeFloat16(src[49]);
			dst[60] = decodeFloat16(src[57]);
			dst[61] = decodeFloat16(src[58]);
			dst[62] = decodeFloat16(src[62]);
			dst[63] = decodeFloat16(src[63]);
		}
		function dctInverse(data) {
			const a = .5 * Math.cos(3.14159 / 4);
			const b = .5 * Math.cos(3.14159 / 16);
			const c = .5 * Math.cos(3.14159 / 8);
			const d = .5 * Math.cos(3 * 3.14159 / 16);
			const e = .5 * Math.cos(15.70795 / 16);
			const f = .5 * Math.cos(3 * 3.14159 / 8);
			const g = .5 * Math.cos(21.99113 / 16);
			var alpha = new Array(4);
			var beta = new Array(4);
			var theta = new Array(4);
			var gamma = new Array(4);
			for (var row = 0; row < 8; ++row) {
				var rowPtr = row * 8;
				alpha[0] = c * data[rowPtr + 2];
				alpha[1] = f * data[rowPtr + 2];
				alpha[2] = c * data[rowPtr + 6];
				alpha[3] = f * data[rowPtr + 6];
				beta[0] = b * data[rowPtr + 1] + d * data[rowPtr + 3] + e * data[rowPtr + 5] + g * data[rowPtr + 7];
				beta[1] = d * data[rowPtr + 1] - g * data[rowPtr + 3] - b * data[rowPtr + 5] - e * data[rowPtr + 7];
				beta[2] = e * data[rowPtr + 1] - b * data[rowPtr + 3] + g * data[rowPtr + 5] + d * data[rowPtr + 7];
				beta[3] = g * data[rowPtr + 1] - e * data[rowPtr + 3] + d * data[rowPtr + 5] - b * data[rowPtr + 7];
				theta[0] = a * (data[rowPtr + 0] + data[rowPtr + 4]);
				theta[3] = a * (data[rowPtr + 0] - data[rowPtr + 4]);
				theta[1] = alpha[0] + alpha[3];
				theta[2] = alpha[1] - alpha[2];
				gamma[0] = theta[0] + theta[1];
				gamma[1] = theta[3] + theta[2];
				gamma[2] = theta[3] - theta[2];
				gamma[3] = theta[0] - theta[1];
				data[rowPtr + 0] = gamma[0] + beta[0];
				data[rowPtr + 1] = gamma[1] + beta[1];
				data[rowPtr + 2] = gamma[2] + beta[2];
				data[rowPtr + 3] = gamma[3] + beta[3];
				data[rowPtr + 4] = gamma[3] - beta[3];
				data[rowPtr + 5] = gamma[2] - beta[2];
				data[rowPtr + 6] = gamma[1] - beta[1];
				data[rowPtr + 7] = gamma[0] - beta[0];
			}
			for (var column = 0; column < 8; ++column) {
				alpha[0] = c * data[16 + column];
				alpha[1] = f * data[16 + column];
				alpha[2] = c * data[48 + column];
				alpha[3] = f * data[48 + column];
				beta[0] = b * data[8 + column] + d * data[24 + column] + e * data[40 + column] + g * data[56 + column];
				beta[1] = d * data[8 + column] - g * data[24 + column] - b * data[40 + column] - e * data[56 + column];
				beta[2] = e * data[8 + column] - b * data[24 + column] + g * data[40 + column] + d * data[56 + column];
				beta[3] = g * data[8 + column] - e * data[24 + column] + d * data[40 + column] - b * data[56 + column];
				theta[0] = a * (data[column] + data[32 + column]);
				theta[3] = a * (data[column] - data[32 + column]);
				theta[1] = alpha[0] + alpha[3];
				theta[2] = alpha[1] - alpha[2];
				gamma[0] = theta[0] + theta[1];
				gamma[1] = theta[3] + theta[2];
				gamma[2] = theta[3] - theta[2];
				gamma[3] = theta[0] - theta[1];
				data[0 + column] = gamma[0] + beta[0];
				data[8 + column] = gamma[1] + beta[1];
				data[16 + column] = gamma[2] + beta[2];
				data[24 + column] = gamma[3] + beta[3];
				data[32 + column] = gamma[3] - beta[3];
				data[40 + column] = gamma[2] - beta[2];
				data[48 + column] = gamma[1] - beta[1];
				data[56 + column] = gamma[0] - beta[0];
			}
		}
		function csc709Inverse(data) {
			for (var i = 0; i < 64; ++i) {
				var y = data[0][i];
				var cb = data[1][i];
				var cr = data[2][i];
				data[0][i] = y + 1.5747 * cr;
				data[1][i] = y - .1873 * cb - .4682 * cr;
				data[2][i] = y + 1.8556 * cb;
			}
		}
		function convertToHalf(src, dst, idx) {
			for (var i = 0; i < 64; ++i) dst[idx + i] = DataUtils.toHalfFloat(toLinear(src[i]));
		}
		function toLinear(float) {
			if (float <= 1) return Math.sign(float) * Math.pow(Math.abs(float), 2.2);
			else return Math.sign(float) * Math.pow(logBase, Math.abs(float) - 1);
		}
		function uncompressRAW(info) {
			return new DataView(info.array.buffer, info.offset.value, info.size);
		}
		function uncompressRLE(info) {
			var compressed = info.viewer.buffer.slice(info.offset.value, info.offset.value + info.size);
			var rawBuffer = new Uint8Array(decodeRunLength(compressed));
			var tmpBuffer = new Uint8Array(rawBuffer.length);
			predictor(rawBuffer);
			interleaveScalar(rawBuffer, tmpBuffer);
			return new DataView(tmpBuffer.buffer);
		}
		function uncompressZIP(info) {
			var rawBuffer = unzlibSync(info.array.slice(info.offset.value, info.offset.value + info.size));
			var tmpBuffer = new Uint8Array(rawBuffer.length);
			predictor(rawBuffer);
			interleaveScalar(rawBuffer, tmpBuffer);
			return new DataView(tmpBuffer.buffer);
		}
		function uncompressPIZ(info) {
			var inDataView = info.viewer;
			var inOffset = { value: info.offset.value };
			var outBuffer = new Uint16Array(info.width * info.scanlineBlockSize * (info.channels * info.type));
			var bitmap = new Uint8Array(BITMAP_SIZE);
			var outBufferEnd = 0;
			var pizChannelData = new Array(info.channels);
			for (var i = 0; i < info.channels; i++) {
				pizChannelData[i] = {};
				pizChannelData[i]["start"] = outBufferEnd;
				pizChannelData[i]["end"] = pizChannelData[i]["start"];
				pizChannelData[i]["nx"] = info.width;
				pizChannelData[i]["ny"] = info.lines;
				pizChannelData[i]["size"] = info.type;
				outBufferEnd += pizChannelData[i].nx * pizChannelData[i].ny * pizChannelData[i].size;
			}
			var minNonZero = parseUint16(inDataView, inOffset);
			var maxNonZero = parseUint16(inDataView, inOffset);
			if (maxNonZero >= BITMAP_SIZE) throw "Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";
			if (minNonZero <= maxNonZero) for (var i = 0; i < maxNonZero - minNonZero + 1; i++) bitmap[i + minNonZero] = parseUint8(inDataView, inOffset);
			var lut = new Uint16Array(USHORT_RANGE);
			var maxValue = reverseLutFromBitmap(bitmap, lut);
			var length = parseUint32(inDataView, inOffset);
			hufUncompress(info.array, inDataView, inOffset, length, outBuffer, outBufferEnd);
			for (var i = 0; i < info.channels; ++i) {
				var cd = pizChannelData[i];
				for (var j = 0; j < pizChannelData[i].size; ++j) wav2Decode(outBuffer, cd.start + j, cd.nx, cd.size, cd.ny, cd.nx * cd.size, maxValue);
			}
			applyLut(lut, outBuffer, outBufferEnd);
			var tmpOffset2 = 0;
			var tmpBuffer = new Uint8Array(outBuffer.buffer.byteLength);
			for (var y = 0; y < info.lines; y++) for (var c = 0; c < info.channels; c++) {
				var cd = pizChannelData[c];
				var n = cd.nx * cd.size;
				var cp = new Uint8Array(outBuffer.buffer, cd.end * INT16_SIZE, n * INT16_SIZE);
				tmpBuffer.set(cp, tmpOffset2);
				tmpOffset2 += n * INT16_SIZE;
				cd.end += n;
			}
			return new DataView(tmpBuffer.buffer);
		}
		function uncompressPXR(info) {
			var rawBuffer = unzlibSync(info.array.slice(info.offset.value, info.offset.value + info.size));
			const sz = info.lines * info.channels * info.width;
			const tmpBuffer = info.type == 1 ? new Uint16Array(sz) : new Uint32Array(sz);
			let tmpBufferEnd = 0;
			let writePtr = 0;
			const ptr = new Array(4);
			for (let y = 0; y < info.lines; y++) for (let c = 0; c < info.channels; c++) {
				let pixel = 0;
				switch (info.type) {
					case 1:
						ptr[0] = tmpBufferEnd;
						ptr[1] = ptr[0] + info.width;
						tmpBufferEnd = ptr[1] + info.width;
						for (let j = 0; j < info.width; ++j) {
							const diff = rawBuffer[ptr[0]++] << 8 | rawBuffer[ptr[1]++];
							pixel += diff;
							tmpBuffer[writePtr] = pixel;
							writePtr++;
						}
						break;
					case 2:
						ptr[0] = tmpBufferEnd;
						ptr[1] = ptr[0] + info.width;
						ptr[2] = ptr[1] + info.width;
						tmpBufferEnd = ptr[2] + info.width;
						for (let j = 0; j < info.width; ++j) {
							const diff = rawBuffer[ptr[0]++] << 24 | rawBuffer[ptr[1]++] << 16 | rawBuffer[ptr[2]++] << 8;
							pixel += diff;
							tmpBuffer[writePtr] = pixel;
							writePtr++;
						}
				}
			}
			return new DataView(tmpBuffer.buffer);
		}
		function uncompressDWA(info) {
			var inDataView = info.viewer;
			var inOffset = { value: info.offset.value };
			var outBuffer = new Uint8Array(info.width * info.lines * (info.channels * info.type * INT16_SIZE));
			var dwaHeader = {
				version: parseInt64(inDataView, inOffset),
				unknownUncompressedSize: parseInt64(inDataView, inOffset),
				unknownCompressedSize: parseInt64(inDataView, inOffset),
				acCompressedSize: parseInt64(inDataView, inOffset),
				dcCompressedSize: parseInt64(inDataView, inOffset),
				rleCompressedSize: parseInt64(inDataView, inOffset),
				rleUncompressedSize: parseInt64(inDataView, inOffset),
				rleRawSize: parseInt64(inDataView, inOffset),
				totalAcUncompressedCount: parseInt64(inDataView, inOffset),
				totalDcUncompressedCount: parseInt64(inDataView, inOffset),
				acCompression: parseInt64(inDataView, inOffset)
			};
			if (dwaHeader.version < 2) throw "EXRLoader.parse: " + EXRHeader.compression + " version " + dwaHeader.version + " is unsupported";
			var channelRules = new Array();
			var ruleSize = parseUint16(inDataView, inOffset) - INT16_SIZE;
			while (ruleSize > 0) {
				var name = parseNullTerminatedString(inDataView.buffer, inOffset);
				var value = parseUint8(inDataView, inOffset);
				var compression = value >> 2 & 3;
				var csc = (value >> 4) - 1;
				var index = new Int8Array([csc])[0];
				var type = parseUint8(inDataView, inOffset);
				channelRules.push({
					name,
					index,
					type,
					compression
				});
				ruleSize -= name.length + 3;
			}
			var channels = EXRHeader.channels;
			var channelData = new Array(info.channels);
			for (var i = 0; i < info.channels; ++i) {
				var cd = channelData[i] = {};
				var channel = channels[i];
				cd.name = channel.name;
				cd.compression = UNKNOWN;
				cd.decoded = false;
				cd.type = channel.pixelType;
				cd.pLinear = channel.pLinear;
				cd.width = info.width;
				cd.height = info.lines;
			}
			var cscSet = { idx: new Array(3) };
			for (var offset2 = 0; offset2 < info.channels; ++offset2) {
				var cd = channelData[offset2];
				for (var i = 0; i < channelRules.length; ++i) {
					var rule = channelRules[i];
					if (cd.name == rule.name) {
						cd.compression = rule.compression;
						if (rule.index >= 0) cscSet.idx[rule.index] = offset2;
						cd.offset = offset2;
					}
				}
			}
			if (dwaHeader.acCompressedSize > 0) switch (dwaHeader.acCompression) {
				case STATIC_HUFFMAN:
					var acBuffer = new Uint16Array(dwaHeader.totalAcUncompressedCount);
					hufUncompress(info.array, inDataView, inOffset, dwaHeader.acCompressedSize, acBuffer, dwaHeader.totalAcUncompressedCount);
					break;
				case DEFLATE:
					var compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.totalAcUncompressedCount);
					var data = unzlibSync(compressed);
					var acBuffer = new Uint16Array(data.buffer);
					inOffset.value += dwaHeader.totalAcUncompressedCount;
			}
			if (dwaHeader.dcCompressedSize > 0) {
				var zlibInfo = {
					array: info.array,
					offset: inOffset,
					size: dwaHeader.dcCompressedSize
				};
				var dcBuffer = new Uint16Array(uncompressZIP(zlibInfo).buffer);
				inOffset.value += dwaHeader.dcCompressedSize;
			}
			if (dwaHeader.rleRawSize > 0) {
				var compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.rleCompressedSize);
				var data = unzlibSync(compressed);
				var rleBuffer = decodeRunLength(data.buffer);
				inOffset.value += dwaHeader.rleCompressedSize;
			}
			var outBufferEnd = 0;
			var rowOffsets = new Array(channelData.length);
			for (var i = 0; i < rowOffsets.length; ++i) rowOffsets[i] = new Array();
			for (var y = 0; y < info.lines; ++y) for (var chan = 0; chan < channelData.length; ++chan) {
				rowOffsets[chan].push(outBufferEnd);
				outBufferEnd += channelData[chan].width * info.type * INT16_SIZE;
			}
			lossyDctDecode(cscSet, rowOffsets, channelData, acBuffer, dcBuffer, outBuffer);
			for (var i = 0; i < channelData.length; ++i) {
				var cd = channelData[i];
				if (cd.decoded) continue;
				switch (cd.compression) {
					case RLE:
						var row = 0;
						var rleOffset = 0;
						for (var y = 0; y < info.lines; ++y) {
							var rowOffsetBytes = rowOffsets[i][row];
							for (var x = 0; x < cd.width; ++x) {
								for (var byte = 0; byte < INT16_SIZE * cd.type; ++byte) outBuffer[rowOffsetBytes++] = rleBuffer[rleOffset + byte * cd.width * cd.height];
								rleOffset++;
							}
							row++;
						}
						break;
					case LOSSY_DCT:
					default: throw "EXRLoader.parse: unsupported channel compression";
				}
			}
			return new DataView(outBuffer.buffer);
		}
		function parseNullTerminatedString(buffer2, offset2) {
			var uintBuffer = new Uint8Array(buffer2);
			var endOffset = 0;
			while (uintBuffer[offset2.value + endOffset] != 0) endOffset += 1;
			var stringValue = new TextDecoder().decode(uintBuffer.slice(offset2.value, offset2.value + endOffset));
			offset2.value = offset2.value + endOffset + 1;
			return stringValue;
		}
		function parseFixedLengthString(buffer2, offset2, size) {
			var stringValue = new TextDecoder().decode(new Uint8Array(buffer2).slice(offset2.value, offset2.value + size));
			offset2.value = offset2.value + size;
			return stringValue;
		}
		function parseRational(dataView, offset2) {
			return [parseInt32(dataView, offset2), parseUint32(dataView, offset2)];
		}
		function parseTimecode(dataView, offset2) {
			return [parseUint32(dataView, offset2), parseUint32(dataView, offset2)];
		}
		function parseInt32(dataView, offset2) {
			var Int32 = dataView.getInt32(offset2.value, true);
			offset2.value = offset2.value + INT32_SIZE;
			return Int32;
		}
		function parseUint32(dataView, offset2) {
			var Uint32 = dataView.getUint32(offset2.value, true);
			offset2.value = offset2.value + INT32_SIZE;
			return Uint32;
		}
		function parseUint8Array(uInt8Array2, offset2) {
			var Uint8 = uInt8Array2[offset2.value];
			offset2.value = offset2.value + INT8_SIZE;
			return Uint8;
		}
		function parseUint8(dataView, offset2) {
			var Uint8 = dataView.getUint8(offset2.value);
			offset2.value = offset2.value + INT8_SIZE;
			return Uint8;
		}
		const parseInt64 = function(dataView, offset2) {
			let int;
			if ("getBigInt64" in DataView.prototype) int = Number(dataView.getBigInt64(offset2.value, true));
			else int = dataView.getUint32(offset2.value + 4, true) + Number(dataView.getUint32(offset2.value, true) << 32);
			offset2.value += ULONG_SIZE;
			return int;
		};
		function parseFloat32(dataView, offset2) {
			var float = dataView.getFloat32(offset2.value, true);
			offset2.value += FLOAT32_SIZE;
			return float;
		}
		function decodeFloat32(dataView, offset2) {
			return DataUtils.toHalfFloat(parseFloat32(dataView, offset2));
		}
		function decodeFloat16(binary) {
			var exponent = (binary & 31744) >> 10, fraction = binary & 1023;
			return (binary >> 15 ? -1 : 1) * (exponent ? exponent === 31 ? fraction ? NaN : Infinity : Math.pow(2, exponent - 15) * (1 + fraction / 1024) : 6103515625e-14 * (fraction / 1024));
		}
		function parseUint16(dataView, offset2) {
			var Uint16 = dataView.getUint16(offset2.value, true);
			offset2.value += INT16_SIZE;
			return Uint16;
		}
		function parseFloat16(buffer2, offset2) {
			return decodeFloat16(parseUint16(buffer2, offset2));
		}
		function parseChlist(dataView, buffer2, offset2, size) {
			var startOffset = offset2.value;
			var channels = [];
			while (offset2.value < startOffset + size - 1) {
				var name = parseNullTerminatedString(buffer2, offset2);
				var pixelType = parseInt32(dataView, offset2);
				var pLinear = parseUint8(dataView, offset2);
				offset2.value += 3;
				var xSampling = parseInt32(dataView, offset2);
				var ySampling = parseInt32(dataView, offset2);
				channels.push({
					name,
					pixelType,
					pLinear,
					xSampling,
					ySampling
				});
			}
			offset2.value += 1;
			return channels;
		}
		function parseChromaticities(dataView, offset2) {
			return {
				redX: parseFloat32(dataView, offset2),
				redY: parseFloat32(dataView, offset2),
				greenX: parseFloat32(dataView, offset2),
				greenY: parseFloat32(dataView, offset2),
				blueX: parseFloat32(dataView, offset2),
				blueY: parseFloat32(dataView, offset2),
				whiteX: parseFloat32(dataView, offset2),
				whiteY: parseFloat32(dataView, offset2)
			};
		}
		function parseCompression(dataView, offset2) {
			return [
				"NO_COMPRESSION",
				"RLE_COMPRESSION",
				"ZIPS_COMPRESSION",
				"ZIP_COMPRESSION",
				"PIZ_COMPRESSION",
				"PXR24_COMPRESSION",
				"B44_COMPRESSION",
				"B44A_COMPRESSION",
				"DWAA_COMPRESSION",
				"DWAB_COMPRESSION"
			][parseUint8(dataView, offset2)];
		}
		function parseBox2i(dataView, offset2) {
			return {
				xMin: parseUint32(dataView, offset2),
				yMin: parseUint32(dataView, offset2),
				xMax: parseUint32(dataView, offset2),
				yMax: parseUint32(dataView, offset2)
			};
		}
		function parseLineOrder(dataView, offset2) {
			return ["INCREASING_Y"][parseUint8(dataView, offset2)];
		}
		function parseV2f(dataView, offset2) {
			return [parseFloat32(dataView, offset2), parseFloat32(dataView, offset2)];
		}
		function parseV3f(dataView, offset2) {
			return [
				parseFloat32(dataView, offset2),
				parseFloat32(dataView, offset2),
				parseFloat32(dataView, offset2)
			];
		}
		function parseValue(dataView, buffer2, offset2, type, size) {
			if (type === "string" || type === "stringvector" || type === "iccProfile") return parseFixedLengthString(buffer2, offset2, size);
			else if (type === "chlist") return parseChlist(dataView, buffer2, offset2, size);
			else if (type === "chromaticities") return parseChromaticities(dataView, offset2);
			else if (type === "compression") return parseCompression(dataView, offset2);
			else if (type === "box2i") return parseBox2i(dataView, offset2);
			else if (type === "lineOrder") return parseLineOrder(dataView, offset2);
			else if (type === "float") return parseFloat32(dataView, offset2);
			else if (type === "v2f") return parseV2f(dataView, offset2);
			else if (type === "v3f") return parseV3f(dataView, offset2);
			else if (type === "int") return parseInt32(dataView, offset2);
			else if (type === "rational") return parseRational(dataView, offset2);
			else if (type === "timecode") return parseTimecode(dataView, offset2);
			else if (type === "preview") {
				offset2.value += size;
				return "skipped";
			} else {
				offset2.value += size;
				return;
			}
		}
		function parseHeader(dataView, buffer2, offset2) {
			const EXRHeader2 = {};
			if (dataView.getUint32(0, true) != 20000630) throw "THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";
			EXRHeader2.version = dataView.getUint8(4);
			const spec = dataView.getUint8(5);
			EXRHeader2.spec = {
				singleTile: !!(spec & 2),
				longName: !!(spec & 4),
				deepFormat: !!(spec & 8),
				multiPart: !!(spec & 16)
			};
			offset2.value = 8;
			var keepReading = true;
			while (keepReading) {
				var attributeName = parseNullTerminatedString(buffer2, offset2);
				if (attributeName == 0) keepReading = false;
				else {
					var attributeType = parseNullTerminatedString(buffer2, offset2);
					var attributeValue = parseValue(dataView, buffer2, offset2, attributeType, parseUint32(dataView, offset2));
					if (attributeValue === void 0) console.warn(`EXRLoader.parse: skipped unknown header attribute type '${attributeType}'.`);
					else EXRHeader2[attributeName] = attributeValue;
				}
			}
			if ((spec & -5) != 0) {
				console.error("EXRHeader:", EXRHeader2);
				throw "THREE.EXRLoader: provided file is currently unsupported.";
			}
			return EXRHeader2;
		}
		function setupDecoder(EXRHeader2, dataView, uInt8Array2, offset2, outputType) {
			const EXRDecoder2 = {
				size: 0,
				viewer: dataView,
				array: uInt8Array2,
				offset: offset2,
				width: EXRHeader2.dataWindow.xMax - EXRHeader2.dataWindow.xMin + 1,
				height: EXRHeader2.dataWindow.yMax - EXRHeader2.dataWindow.yMin + 1,
				channels: EXRHeader2.channels.length,
				bytesPerLine: null,
				lines: null,
				inputSize: null,
				type: EXRHeader2.channels[0].pixelType,
				uncompress: null,
				getter: null,
				format: null,
				[hasColorSpace ? "colorSpace" : "encoding"]: null
			};
			switch (EXRHeader2.compression) {
				case "NO_COMPRESSION":
					EXRDecoder2.lines = 1;
					EXRDecoder2.uncompress = uncompressRAW;
					break;
				case "RLE_COMPRESSION":
					EXRDecoder2.lines = 1;
					EXRDecoder2.uncompress = uncompressRLE;
					break;
				case "ZIPS_COMPRESSION":
					EXRDecoder2.lines = 1;
					EXRDecoder2.uncompress = uncompressZIP;
					break;
				case "ZIP_COMPRESSION":
					EXRDecoder2.lines = 16;
					EXRDecoder2.uncompress = uncompressZIP;
					break;
				case "PIZ_COMPRESSION":
					EXRDecoder2.lines = 32;
					EXRDecoder2.uncompress = uncompressPIZ;
					break;
				case "PXR24_COMPRESSION":
					EXRDecoder2.lines = 16;
					EXRDecoder2.uncompress = uncompressPXR;
					break;
				case "DWAA_COMPRESSION":
					EXRDecoder2.lines = 32;
					EXRDecoder2.uncompress = uncompressDWA;
					break;
				case "DWAB_COMPRESSION":
					EXRDecoder2.lines = 256;
					EXRDecoder2.uncompress = uncompressDWA;
					break;
				default: throw "EXRLoader.parse: " + EXRHeader2.compression + " is unsupported";
			}
			EXRDecoder2.scanlineBlockSize = EXRDecoder2.lines;
			if (EXRDecoder2.type == 1) switch (outputType) {
				case FloatType:
					EXRDecoder2.getter = parseFloat16;
					EXRDecoder2.inputSize = INT16_SIZE;
					break;
				case HalfFloatType:
					EXRDecoder2.getter = parseUint16;
					EXRDecoder2.inputSize = INT16_SIZE;
			}
			else if (EXRDecoder2.type == 2) switch (outputType) {
				case FloatType:
					EXRDecoder2.getter = parseFloat32;
					EXRDecoder2.inputSize = FLOAT32_SIZE;
					break;
				case HalfFloatType:
					EXRDecoder2.getter = decodeFloat32;
					EXRDecoder2.inputSize = FLOAT32_SIZE;
			}
			else throw "EXRLoader.parse: unsupported pixelType " + EXRDecoder2.type + " for " + EXRHeader2.compression + ".";
			EXRDecoder2.blockCount = (EXRHeader2.dataWindow.yMax + 1) / EXRDecoder2.scanlineBlockSize;
			for (var i = 0; i < EXRDecoder2.blockCount; i++) parseInt64(dataView, offset2);
			EXRDecoder2.outputChannels = EXRDecoder2.channels == 3 ? 4 : EXRDecoder2.channels;
			const size = EXRDecoder2.width * EXRDecoder2.height * EXRDecoder2.outputChannels;
			switch (outputType) {
				case FloatType:
					EXRDecoder2.byteArray = new Float32Array(size);
					if (EXRDecoder2.channels < EXRDecoder2.outputChannels) EXRDecoder2.byteArray.fill(1, 0, size);
					break;
				case HalfFloatType:
					EXRDecoder2.byteArray = new Uint16Array(size);
					if (EXRDecoder2.channels < EXRDecoder2.outputChannels) EXRDecoder2.byteArray.fill(15360, 0, size);
					break;
				default: console.error("THREE.EXRLoader: unsupported type: ", outputType);
			}
			EXRDecoder2.bytesPerLine = EXRDecoder2.width * EXRDecoder2.inputSize * EXRDecoder2.channels;
			if (EXRDecoder2.outputChannels == 4) EXRDecoder2.format = RGBAFormat;
			else EXRDecoder2.format = RedFormat;
			if (hasColorSpace) EXRDecoder2.colorSpace = "srgb-linear";
			else EXRDecoder2.encoding = 3e3;
			return EXRDecoder2;
		}
		const bufferDataView = new DataView(buffer);
		const uInt8Array = new Uint8Array(buffer);
		const offset = { value: 0 };
		const EXRHeader = parseHeader(bufferDataView, buffer, offset);
		const EXRDecoder = setupDecoder(EXRHeader, bufferDataView, uInt8Array, offset, this.type);
		const tmpOffset = { value: 0 };
		const channelOffsets = {
			R: 0,
			G: 1,
			B: 2,
			A: 3,
			Y: 0
		};
		for (let scanlineBlockIdx = 0; scanlineBlockIdx < EXRDecoder.height / EXRDecoder.scanlineBlockSize; scanlineBlockIdx++) {
			const line = parseUint32(bufferDataView, offset);
			EXRDecoder.size = parseUint32(bufferDataView, offset);
			EXRDecoder.lines = line + EXRDecoder.scanlineBlockSize > EXRDecoder.height ? EXRDecoder.height - line : EXRDecoder.scanlineBlockSize;
			const viewer = EXRDecoder.size < EXRDecoder.lines * EXRDecoder.bytesPerLine ? EXRDecoder.uncompress(EXRDecoder) : uncompressRAW(EXRDecoder);
			offset.value += EXRDecoder.size;
			for (let line_y = 0; line_y < EXRDecoder.scanlineBlockSize; line_y++) {
				const true_y = line_y + scanlineBlockIdx * EXRDecoder.scanlineBlockSize;
				if (true_y >= EXRDecoder.height) break;
				for (let channelID = 0; channelID < EXRDecoder.channels; channelID++) {
					const cOff = channelOffsets[EXRHeader.channels[channelID].name];
					for (let x = 0; x < EXRDecoder.width; x++) {
						tmpOffset.value = (line_y * (EXRDecoder.channels * EXRDecoder.width) + channelID * EXRDecoder.width + x) * EXRDecoder.inputSize;
						const outIndex = (EXRDecoder.height - 1 - true_y) * (EXRDecoder.width * EXRDecoder.outputChannels) + x * EXRDecoder.outputChannels + cOff;
						EXRDecoder.byteArray[outIndex] = EXRDecoder.getter(viewer, tmpOffset);
					}
				}
			}
		}
		return {
			header: EXRHeader,
			width: EXRDecoder.width,
			height: EXRDecoder.height,
			data: EXRDecoder.byteArray,
			format: EXRDecoder.format,
			[hasColorSpace ? "colorSpace" : "encoding"]: EXRDecoder[hasColorSpace ? "colorSpace" : "encoding"],
			type: this.type
		};
	}
	setDataType(value) {
		this.type = value;
		return this;
	}
	load(url, onLoad, onProgress, onError) {
		function onLoadCallback(texture, texData) {
			if (hasColorSpace) texture.colorSpace = texData.colorSpace;
			else texture.encoding = texData.encoding;
			texture.minFilter = LinearFilter;
			texture.magFilter = LinearFilter;
			texture.generateMipmaps = false;
			texture.flipY = false;
			if (onLoad) onLoad(texture, texData);
		}
		return super.load(url, onLoadCallback, onProgress, onError);
	}
};
//#endregion
//#region node_modules/@react-three/drei/helpers/constants.js
var getVersion = () => parseInt("187".replace(/\D+/g, ""));
var version = /* @__PURE__ */ getVersion();
//#endregion
//#region node_modules/@react-three/drei/materials/ConvolutionMaterial.js
var ConvolutionMaterial = class extends ShaderMaterial {
	constructor(texelSize = new Vector2()) {
		super({
			uniforms: {
				inputBuffer: new Uniform(null),
				depthBuffer: new Uniform(null),
				resolution: new Uniform(new Vector2()),
				texelSize: new Uniform(new Vector2()),
				halfTexelSize: new Uniform(new Vector2()),
				kernel: new Uniform(0),
				scale: new Uniform(1),
				cameraNear: new Uniform(0),
				cameraFar: new Uniform(1),
				minDepthThreshold: new Uniform(0),
				maxDepthThreshold: new Uniform(1),
				depthScale: new Uniform(0),
				depthToBlurRatioBias: new Uniform(.25)
			},
			fragmentShader: `#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
        }`,
			vertexShader: `uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,
			blending: 0,
			depthWrite: false,
			depthTest: false
		});
		this.toneMapped = false;
		this.setTexelSize(texelSize.x, texelSize.y);
		this.kernel = new Float32Array([
			0,
			1,
			2,
			2,
			3
		]);
	}
	setTexelSize(x, y) {
		this.uniforms.texelSize.value.set(x, y);
		this.uniforms.halfTexelSize.value.set(x, y).multiplyScalar(.5);
	}
	setResolution(resolution) {
		this.uniforms.resolution.value.copy(resolution);
	}
};
//#endregion
//#region node_modules/@react-three/drei/materials/BlurPass.js
var BlurPass = class {
	constructor({ gl, resolution, width = 500, height = 500, minDepthThreshold = 0, maxDepthThreshold = 1, depthScale = 0, depthToBlurRatioBias = .25 }) {
		this.renderToScreen = false;
		this.renderTargetA = new WebGLRenderTarget(resolution, resolution, {
			minFilter: LinearFilter,
			magFilter: LinearFilter,
			stencilBuffer: false,
			depthBuffer: false,
			type: HalfFloatType
		});
		this.renderTargetB = this.renderTargetA.clone();
		this.convolutionMaterial = new ConvolutionMaterial();
		this.convolutionMaterial.setTexelSize(1 / width, 1 / height);
		this.convolutionMaterial.setResolution(new Vector2(width, height));
		this.scene = new Scene();
		this.camera = new Camera();
		this.convolutionMaterial.uniforms.minDepthThreshold.value = minDepthThreshold;
		this.convolutionMaterial.uniforms.maxDepthThreshold.value = maxDepthThreshold;
		this.convolutionMaterial.uniforms.depthScale.value = depthScale;
		this.convolutionMaterial.uniforms.depthToBlurRatioBias.value = depthToBlurRatioBias;
		this.convolutionMaterial.defines.USE_DEPTH = depthScale > 0;
		const vertices = new Float32Array([
			-1,
			-1,
			0,
			3,
			-1,
			0,
			-1,
			3,
			0
		]);
		const uvs = new Float32Array([
			0,
			0,
			2,
			0,
			0,
			2
		]);
		const geometry = new BufferGeometry();
		geometry.setAttribute("position", new BufferAttribute(vertices, 3));
		geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
		this.screen = new Mesh(geometry, this.convolutionMaterial);
		this.screen.frustumCulled = false;
		this.scene.add(this.screen);
	}
	render(renderer, inputBuffer, outputBuffer) {
		const scene = this.scene;
		const camera = this.camera;
		const renderTargetA = this.renderTargetA;
		const renderTargetB = this.renderTargetB;
		let material = this.convolutionMaterial;
		let uniforms = material.uniforms;
		uniforms.depthBuffer.value = inputBuffer.depthTexture;
		const kernel = material.kernel;
		let lastRT = inputBuffer;
		let destRT;
		let i, l;
		for (i = 0, l = kernel.length - 1; i < l; ++i) {
			destRT = (i & 1) === 0 ? renderTargetA : renderTargetB;
			uniforms.kernel.value = kernel[i];
			uniforms.inputBuffer.value = lastRT.texture;
			renderer.setRenderTarget(destRT);
			renderer.render(scene, camera);
			lastRT = destRT;
		}
		uniforms.kernel.value = kernel[i];
		uniforms.inputBuffer.value = lastRT.texture;
		renderer.setRenderTarget(this.renderToScreen ? null : outputBuffer);
		renderer.render(scene, camera);
	}
};
//#endregion
//#region node_modules/@react-three/drei/materials/MeshReflectorMaterial.js
var MeshReflectorMaterial$1 = class extends MeshStandardMaterial {
	constructor(parameters = {}) {
		super(parameters);
		this._tDepth = { value: null };
		this._distortionMap = { value: null };
		this._tDiffuse = { value: null };
		this._tDiffuseBlur = { value: null };
		this._textureMatrix = { value: null };
		this._hasBlur = { value: false };
		this._mirror = { value: 0 };
		this._mixBlur = { value: 0 };
		this._blurStrength = { value: .5 };
		this._minDepthThreshold = { value: .9 };
		this._maxDepthThreshold = { value: 1 };
		this._depthScale = { value: 0 };
		this._depthToBlurRatioBias = { value: .25 };
		this._distortion = { value: 1 };
		this._mixContrast = { value: 1 };
		this.setValues(parameters);
	}
	onBeforeCompile(shader) {
		var _shader$defines;
		if (!((_shader$defines = shader.defines) != null && _shader$defines.USE_UV)) shader.defines.USE_UV = "";
		shader.uniforms.hasBlur = this._hasBlur;
		shader.uniforms.tDiffuse = this._tDiffuse;
		shader.uniforms.tDepth = this._tDepth;
		shader.uniforms.distortionMap = this._distortionMap;
		shader.uniforms.tDiffuseBlur = this._tDiffuseBlur;
		shader.uniforms.textureMatrix = this._textureMatrix;
		shader.uniforms.mirror = this._mirror;
		shader.uniforms.mixBlur = this._mixBlur;
		shader.uniforms.mixStrength = this._blurStrength;
		shader.uniforms.minDepthThreshold = this._minDepthThreshold;
		shader.uniforms.maxDepthThreshold = this._maxDepthThreshold;
		shader.uniforms.depthScale = this._depthScale;
		shader.uniforms.depthToBlurRatioBias = this._depthToBlurRatioBias;
		shader.uniforms.distortion = this._distortion;
		shader.uniforms.mixContrast = this._mixContrast;
		shader.vertexShader = `
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${shader.vertexShader}`;
		shader.vertexShader = shader.vertexShader.replace("#include <project_vertex>", `#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`);
		shader.fragmentShader = `
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${shader.fragmentShader}`;
		shader.fragmentShader = shader.fragmentShader.replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `);
	}
	get tDiffuse() {
		return this._tDiffuse.value;
	}
	set tDiffuse(v) {
		this._tDiffuse.value = v;
	}
	get tDepth() {
		return this._tDepth.value;
	}
	set tDepth(v) {
		this._tDepth.value = v;
	}
	get distortionMap() {
		return this._distortionMap.value;
	}
	set distortionMap(v) {
		this._distortionMap.value = v;
	}
	get tDiffuseBlur() {
		return this._tDiffuseBlur.value;
	}
	set tDiffuseBlur(v) {
		this._tDiffuseBlur.value = v;
	}
	get textureMatrix() {
		return this._textureMatrix.value;
	}
	set textureMatrix(v) {
		this._textureMatrix.value = v;
	}
	get hasBlur() {
		return this._hasBlur.value;
	}
	set hasBlur(v) {
		this._hasBlur.value = v;
	}
	get mirror() {
		return this._mirror.value;
	}
	set mirror(v) {
		this._mirror.value = v;
	}
	get mixBlur() {
		return this._mixBlur.value;
	}
	set mixBlur(v) {
		this._mixBlur.value = v;
	}
	get mixStrength() {
		return this._blurStrength.value;
	}
	set mixStrength(v) {
		this._blurStrength.value = v;
	}
	get minDepthThreshold() {
		return this._minDepthThreshold.value;
	}
	set minDepthThreshold(v) {
		this._minDepthThreshold.value = v;
	}
	get maxDepthThreshold() {
		return this._maxDepthThreshold.value;
	}
	set maxDepthThreshold(v) {
		this._maxDepthThreshold.value = v;
	}
	get depthScale() {
		return this._depthScale.value;
	}
	set depthScale(v) {
		this._depthScale.value = v;
	}
	get depthToBlurRatioBias() {
		return this._depthToBlurRatioBias.value;
	}
	set depthToBlurRatioBias(v) {
		this._depthToBlurRatioBias.value = v;
	}
	get distortion() {
		return this._distortion.value;
	}
	set distortion(v) {
		this._distortion.value = v;
	}
	get mixContrast() {
		return this._mixContrast.value;
	}
	set mixContrast(v) {
		this._mixContrast.value = v;
	}
};
//#endregion
//#region node_modules/@react-three/drei/core/MeshReflectorMaterial.js
var MeshReflectorMaterial = /* @__PURE__ */ import_react.forwardRef(({ mixBlur = 0, mixStrength = 1, resolution = 256, blur = [0, 0], minDepthThreshold = .9, maxDepthThreshold = 1, depthScale = 0, depthToBlurRatioBias = .25, mirror = 0, distortion = 1, mixContrast = 1, distortionMap, reflectorOffset = 0, ...props }, ref) => {
	extend({ MeshReflectorMaterialImpl: MeshReflectorMaterial$1 });
	const gl = useThree(({ gl }) => gl);
	const camera = useThree(({ camera }) => camera);
	const scene = useThree(({ scene }) => scene);
	blur = Array.isArray(blur) ? blur : [blur, blur];
	const hasBlur = blur[0] + blur[1] > 0;
	const blurX = blur[0];
	const blurY = blur[1];
	const materialRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => materialRef.current, []);
	const [reflectorPlane] = import_react.useState(() => new Plane());
	const [normal] = import_react.useState(() => new Vector3());
	const [reflectorWorldPosition] = import_react.useState(() => new Vector3());
	const [cameraWorldPosition] = import_react.useState(() => new Vector3());
	const [rotationMatrix] = import_react.useState(() => new Matrix4());
	const [lookAtPosition] = import_react.useState(() => new Vector3(0, 0, -1));
	const [clipPlane] = import_react.useState(() => new Vector4());
	const [view] = import_react.useState(() => new Vector3());
	const [target] = import_react.useState(() => new Vector3());
	const [q] = import_react.useState(() => new Vector4());
	const [textureMatrix] = import_react.useState(() => new Matrix4());
	const [virtualCamera] = import_react.useState(() => new PerspectiveCamera());
	const beforeRender = import_react.useCallback(() => {
		var _materialRef$current;
		const parent = materialRef.current.parent || ((_materialRef$current = materialRef.current) == null || (_materialRef$current = _materialRef$current.__r3f.parent) == null ? void 0 : _materialRef$current.object);
		if (!parent) return;
		reflectorWorldPosition.setFromMatrixPosition(parent.matrixWorld);
		cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
		rotationMatrix.extractRotation(parent.matrixWorld);
		normal.set(0, 0, 1);
		normal.applyMatrix4(rotationMatrix);
		reflectorWorldPosition.addScaledVector(normal, reflectorOffset);
		view.subVectors(reflectorWorldPosition, cameraWorldPosition);
		if (view.dot(normal) > 0) return;
		view.reflect(normal).negate();
		view.add(reflectorWorldPosition);
		rotationMatrix.extractRotation(camera.matrixWorld);
		lookAtPosition.set(0, 0, -1);
		lookAtPosition.applyMatrix4(rotationMatrix);
		lookAtPosition.add(cameraWorldPosition);
		target.subVectors(reflectorWorldPosition, lookAtPosition);
		target.reflect(normal).negate();
		target.add(reflectorWorldPosition);
		virtualCamera.position.copy(view);
		virtualCamera.up.set(0, 1, 0);
		virtualCamera.up.applyMatrix4(rotationMatrix);
		virtualCamera.up.reflect(normal);
		virtualCamera.lookAt(target);
		virtualCamera.far = camera.far;
		virtualCamera.updateMatrixWorld();
		virtualCamera.projectionMatrix.copy(camera.projectionMatrix);
		textureMatrix.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1);
		textureMatrix.multiply(virtualCamera.projectionMatrix);
		textureMatrix.multiply(virtualCamera.matrixWorldInverse);
		textureMatrix.multiply(parent.matrixWorld);
		reflectorPlane.setFromNormalAndCoplanarPoint(normal, reflectorWorldPosition);
		reflectorPlane.applyMatrix4(virtualCamera.matrixWorldInverse);
		clipPlane.set(reflectorPlane.normal.x, reflectorPlane.normal.y, reflectorPlane.normal.z, reflectorPlane.constant);
		const projectionMatrix = virtualCamera.projectionMatrix;
		q.x = (Math.sign(clipPlane.x) + projectionMatrix.elements[8]) / projectionMatrix.elements[0];
		q.y = (Math.sign(clipPlane.y) + projectionMatrix.elements[9]) / projectionMatrix.elements[5];
		q.z = -1;
		q.w = (1 + projectionMatrix.elements[10]) / projectionMatrix.elements[14];
		clipPlane.multiplyScalar(2 / clipPlane.dot(q));
		projectionMatrix.elements[2] = clipPlane.x;
		projectionMatrix.elements[6] = clipPlane.y;
		projectionMatrix.elements[10] = clipPlane.z + 1;
		projectionMatrix.elements[14] = clipPlane.w;
	}, [camera, reflectorOffset]);
	const [fbo1, fbo2, blurpass, reflectorProps] = import_react.useMemo(() => {
		const parameters = {
			minFilter: LinearFilter,
			magFilter: LinearFilter,
			type: HalfFloatType
		};
		const fbo1 = new WebGLRenderTarget(resolution, resolution, parameters);
		fbo1.depthBuffer = true;
		fbo1.depthTexture = new DepthTexture(resolution, resolution);
		fbo1.depthTexture.format = DepthFormat;
		fbo1.depthTexture.type = UnsignedShortType;
		const fbo2 = new WebGLRenderTarget(resolution, resolution, parameters);
		return [
			fbo1,
			fbo2,
			new BlurPass({
				gl,
				resolution,
				width: blurX,
				height: blurY,
				minDepthThreshold,
				maxDepthThreshold,
				depthScale,
				depthToBlurRatioBias
			}),
			{
				mirror,
				textureMatrix,
				mixBlur,
				tDiffuse: fbo1.texture,
				tDepth: fbo1.depthTexture,
				tDiffuseBlur: fbo2.texture,
				hasBlur,
				mixStrength,
				minDepthThreshold,
				maxDepthThreshold,
				depthScale,
				depthToBlurRatioBias,
				distortion,
				distortionMap,
				mixContrast,
				"defines-USE_BLUR": hasBlur ? "" : void 0,
				"defines-USE_DEPTH": depthScale > 0 ? "" : void 0,
				"defines-USE_DISTORTION": distortionMap ? "" : void 0
			}
		];
	}, [
		gl,
		blurX,
		blurY,
		textureMatrix,
		resolution,
		mirror,
		hasBlur,
		mixBlur,
		mixStrength,
		minDepthThreshold,
		maxDepthThreshold,
		depthScale,
		depthToBlurRatioBias,
		distortion,
		distortionMap,
		mixContrast
	]);
	useFrame(() => {
		var _materialRef$current2;
		const parent = materialRef.current.parent || ((_materialRef$current2 = materialRef.current) == null || (_materialRef$current2 = _materialRef$current2.__r3f.parent) == null ? void 0 : _materialRef$current2.object);
		if (!parent) return;
		parent.visible = false;
		const currentXrEnabled = gl.xr.enabled;
		const currentShadowAutoUpdate = gl.shadowMap.autoUpdate;
		beforeRender();
		gl.xr.enabled = false;
		gl.shadowMap.autoUpdate = false;
		gl.setRenderTarget(fbo1);
		gl.state.buffers.depth.setMask(true);
		if (!gl.autoClear) gl.clear();
		gl.render(scene, virtualCamera);
		if (hasBlur) blurpass.render(gl, fbo1, fbo2);
		gl.xr.enabled = currentXrEnabled;
		gl.shadowMap.autoUpdate = currentShadowAutoUpdate;
		parent.visible = true;
		gl.setRenderTarget(null);
	});
	return /*#__PURE__*/ import_react.createElement("meshReflectorMaterialImpl", _extends({
		attach: "material",
		key: "key" + reflectorProps["defines-USE_BLUR"] + reflectorProps["defines-USE_DEPTH"] + reflectorProps["defines-USE_DISTORTION"],
		ref: materialRef
	}, reflectorProps, props));
});
//#endregion
//#region node_modules/@react-three/drei/helpers/environment-assets.js
var presetsObj = {
	apartment: "lebombo_1k.hdr",
	city: "potsdamer_platz_1k.hdr",
	dawn: "kiara_1_dawn_1k.hdr",
	forest: "forest_slope_1k.hdr",
	lobby: "st_fagans_interior_1k.hdr",
	night: "dikhololo_night_1k.hdr",
	park: "rooitou_park_1k.hdr",
	studio: "studio_small_03_1k.hdr",
	sunset: "venice_sunset_1k.hdr",
	warehouse: "empty_warehouse_01_1k.hdr"
};
//#endregion
//#region node_modules/@react-three/drei/core/useEnvironment.js
var CUBEMAP_ROOT = "https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/";
var isArray = (arr) => Array.isArray(arr);
var defaultFiles = [
	"/px.png",
	"/nx.png",
	"/py.png",
	"/ny.png",
	"/pz.png",
	"/nz.png"
];
function useEnvironment({ files = defaultFiles, path = "", preset = void 0, colorSpace = void 0, extensions } = {}) {
	if (preset) {
		validatePreset(preset);
		files = presetsObj[preset];
		path = CUBEMAP_ROOT;
	}
	const multiFile = isArray(files);
	const { extension, isCubemap } = getExtension(files);
	const loader = getLoader(extension);
	if (!loader) throw new Error("useEnvironment: Unrecognized file extension: " + files);
	const gl = useThree((state) => state.gl);
	(0, import_react.useLayoutEffect)(() => {
		if (extension !== "webp" && extension !== "jpg" && extension !== "jpeg") return;
		function clearGainmapTexture() {
			useLoader.clear(loader, multiFile ? [files] : files);
		}
		gl.domElement.addEventListener("webglcontextlost", clearGainmapTexture, { once: true });
	}, [files, gl.domElement]);
	const loaderResult = useLoader(loader, multiFile ? [files] : files, (loader) => {
		if (extension === "webp" || extension === "jpg" || extension === "jpeg") loader.setRenderer(gl);
		loader.setPath == null || loader.setPath(path);
		if (extensions) extensions(loader);
	});
	let texture = multiFile ? loaderResult[0] : loaderResult;
	if (extension === "jpg" || extension === "jpeg" || extension === "webp") {
		var _renderTarget;
		texture = (_renderTarget = texture.renderTarget) == null ? void 0 : _renderTarget.texture;
	}
	texture.mapping = isCubemap ? 301 : 303;
	texture.colorSpace = colorSpace !== null && colorSpace !== void 0 ? colorSpace : isCubemap ? "srgb" : "srgb-linear";
	return texture;
}
var preloadDefaultOptions = {
	files: defaultFiles,
	path: "",
	preset: void 0,
	extensions: void 0
};
useEnvironment.preload = (preloadOptions) => {
	const options = {
		...preloadDefaultOptions,
		...preloadOptions
	};
	let { files, path = "" } = options;
	const { preset, extensions } = options;
	if (preset) {
		validatePreset(preset);
		files = presetsObj[preset];
		path = CUBEMAP_ROOT;
	}
	const { extension } = getExtension(files);
	if (extension === "webp" || extension === "jpg" || extension === "jpeg") throw new Error("useEnvironment: Preloading gainmaps is not supported");
	const loader = getLoader(extension);
	if (!loader) throw new Error("useEnvironment: Unrecognized file extension: " + files);
	useLoader.preload(loader, isArray(files) ? [files] : files, (loader) => {
		loader.setPath == null || loader.setPath(path);
		if (extensions) extensions(loader);
	});
};
var clearDefaultOptins = {
	files: defaultFiles,
	preset: void 0
};
useEnvironment.clear = (clearOptions) => {
	const options = {
		...clearDefaultOptins,
		...clearOptions
	};
	let { files } = options;
	const { preset } = options;
	if (preset) {
		validatePreset(preset);
		files = presetsObj[preset];
	}
	const { extension } = getExtension(files);
	const loader = getLoader(extension);
	if (!loader) throw new Error("useEnvironment: Unrecognized file extension: " + files);
	useLoader.clear(loader, isArray(files) ? [files] : files);
};
function validatePreset(preset) {
	if (!(preset in presetsObj)) throw new Error("Preset must be one of: " + Object.keys(presetsObj).join(", "));
}
function getExtension(files) {
	var _firstEntry$split$pop;
	const isCubemap = isArray(files) && files.length === 6;
	const isGainmap = isArray(files) && files.length === 3 && files.some((file) => file.endsWith("json"));
	const firstEntry = isArray(files) ? files[0] : files;
	return {
		extension: isCubemap ? "cube" : isGainmap ? "webp" : firstEntry.startsWith("data:application/exr") ? "exr" : firstEntry.startsWith("data:application/hdr") ? "hdr" : firstEntry.startsWith("data:image/jpeg") ? "jpg" : (_firstEntry$split$pop = firstEntry.split(".").pop()) == null || (_firstEntry$split$pop = _firstEntry$split$pop.split("?")) == null || (_firstEntry$split$pop = _firstEntry$split$pop.shift()) == null ? void 0 : _firstEntry$split$pop.toLowerCase(),
		isCubemap,
		isGainmap
	};
}
function getLoader(extension) {
	return extension === "cube" ? CubeTextureLoader : extension === "hdr" ? RGBELoader : extension === "exr" ? EXRLoader : extension === "jpg" || extension === "jpeg" ? HDRJPGLoader : extension === "webp" ? GainMapLoader : null;
}
//#endregion
//#region node_modules/@react-three/drei/core/Environment.js
var isRef = (obj) => obj.current && obj.current.isScene;
var resolveScene = (scene) => isRef(scene) ? scene.current : scene;
function setEnvProps(background, scene, defaultScene, texture, sceneProps = {}) {
	var _target$backgroundRot, _target$backgroundRot2, _target$environmentRo, _target$environmentRo2;
	sceneProps = {
		backgroundBlurriness: 0,
		backgroundIntensity: 1,
		backgroundRotation: [
			0,
			0,
			0
		],
		environmentIntensity: 1,
		environmentRotation: [
			0,
			0,
			0
		],
		...sceneProps
	};
	const target = resolveScene(scene || defaultScene);
	const oldbg = target.background;
	const oldenv = target.environment;
	const oldSceneProps = {
		backgroundBlurriness: target.backgroundBlurriness,
		backgroundIntensity: target.backgroundIntensity,
		backgroundRotation: (_target$backgroundRot = (_target$backgroundRot2 = target.backgroundRotation) == null || _target$backgroundRot2.clone == null ? void 0 : _target$backgroundRot2.clone()) !== null && _target$backgroundRot !== void 0 ? _target$backgroundRot : [
			0,
			0,
			0
		],
		environmentIntensity: target.environmentIntensity,
		environmentRotation: (_target$environmentRo = (_target$environmentRo2 = target.environmentRotation) == null || _target$environmentRo2.clone == null ? void 0 : _target$environmentRo2.clone()) !== null && _target$environmentRo !== void 0 ? _target$environmentRo : [
			0,
			0,
			0
		]
	};
	if (background !== "only") target.environment = texture;
	if (background) target.background = texture;
	applyProps(target, sceneProps);
	return () => {
		if (background !== "only") target.environment = oldenv;
		if (background) target.background = oldbg;
		applyProps(target, oldSceneProps);
	};
}
function EnvironmentMap({ scene, background = false, map, ...config }) {
	const defaultScene = useThree((state) => state.scene);
	import_react.useLayoutEffect(() => {
		if (map) return setEnvProps(background, scene, defaultScene, map, config);
	});
	return null;
}
function EnvironmentCube({ background = false, scene, blur, backgroundBlurriness, backgroundIntensity, backgroundRotation, environmentIntensity, environmentRotation, ...rest }) {
	const texture = useEnvironment(rest);
	const defaultScene = useThree((state) => state.scene);
	import_react.useLayoutEffect(() => {
		return setEnvProps(background, scene, defaultScene, texture, {
			backgroundBlurriness: blur !== null && blur !== void 0 ? blur : backgroundBlurriness,
			backgroundIntensity,
			backgroundRotation,
			environmentIntensity,
			environmentRotation
		});
	});
	import_react.useEffect(() => {
		return () => {
			texture.dispose();
		};
	}, [texture]);
	return null;
}
function EnvironmentPortal({ children, near = .1, far = 1e3, resolution = 256, frames = 1, map, background = false, blur, backgroundBlurriness, backgroundIntensity, backgroundRotation, environmentIntensity, environmentRotation, scene, files, path, preset = void 0, extensions }) {
	const gl = useThree((state) => state.gl);
	const defaultScene = useThree((state) => state.scene);
	const camera = import_react.useRef(null);
	const [virtualScene] = import_react.useState(() => new Scene());
	const fbo = import_react.useMemo(() => {
		const fbo = new WebGLCubeRenderTarget(resolution);
		fbo.texture.type = HalfFloatType;
		return fbo;
	}, [resolution]);
	import_react.useEffect(() => {
		return () => {
			fbo.dispose();
		};
	}, [fbo]);
	import_react.useLayoutEffect(() => {
		if (frames === 1) {
			const autoClear = gl.autoClear;
			gl.autoClear = true;
			camera.current.update(gl, virtualScene);
			gl.autoClear = autoClear;
		}
		return setEnvProps(background, scene, defaultScene, fbo.texture, {
			backgroundBlurriness: blur !== null && blur !== void 0 ? blur : backgroundBlurriness,
			backgroundIntensity,
			backgroundRotation,
			environmentIntensity,
			environmentRotation
		});
	}, [
		children,
		virtualScene,
		fbo.texture,
		scene,
		defaultScene,
		background,
		frames,
		gl
	]);
	let count = 1;
	useFrame(() => {
		if (frames === Infinity || count < frames) {
			const autoClear = gl.autoClear;
			gl.autoClear = true;
			camera.current.update(gl, virtualScene);
			gl.autoClear = autoClear;
			count++;
		}
	});
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, createPortal(/*#__PURE__*/ import_react.createElement(import_react.Fragment, null, children, /*#__PURE__*/ import_react.createElement("cubeCamera", {
		ref: camera,
		args: [
			near,
			far,
			fbo
		]
	}), files || preset ? /*#__PURE__*/ import_react.createElement(EnvironmentCube, {
		background: true,
		files,
		preset,
		path,
		extensions
	}) : map ? /*#__PURE__*/ import_react.createElement(EnvironmentMap, {
		background: true,
		map,
		extensions
	}) : null), virtualScene));
}
function EnvironmentGround(props) {
	var _props$ground, _props$ground2, _scale, _props$ground3;
	const textureDefault = useEnvironment(props);
	const texture = props.map || textureDefault;
	import_react.useMemo(() => extend({ GroundProjectedEnvImpl: GroundProjectedEnv }), []);
	import_react.useEffect(() => {
		return () => {
			textureDefault.dispose();
		};
	}, [textureDefault]);
	const args = import_react.useMemo(() => [texture], [texture]);
	const height = (_props$ground = props.ground) == null ? void 0 : _props$ground.height;
	const radius = (_props$ground2 = props.ground) == null ? void 0 : _props$ground2.radius;
	const scale = (_scale = (_props$ground3 = props.ground) == null ? void 0 : _props$ground3.scale) !== null && _scale !== void 0 ? _scale : 1e3;
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(EnvironmentMap, _extends({}, props, { map: texture })), /*#__PURE__*/ import_react.createElement("groundProjectedEnvImpl", {
		args,
		scale,
		height,
		radius
	}));
}
function Environment(props) {
	return props.ground ? /*#__PURE__*/ import_react.createElement(EnvironmentGround, props) : props.map ? /*#__PURE__*/ import_react.createElement(EnvironmentMap, props) : props.children ? /*#__PURE__*/ import_react.createElement(EnvironmentPortal, props) : /*#__PURE__*/ import_react.createElement(EnvironmentCube, props);
}
//#endregion
//#region node_modules/@react-three/drei/core/Lightformer.js
var Lightformer = /* @__PURE__ */ import_react.forwardRef(({ light, args, map, toneMapped = false, color = "white", form: Form = "rect", intensity = 1, scale = 1, target = [
	0,
	0,
	0
], children, ...props }, forwardRef) => {
	const ref = import_react.useRef(null);
	import_react.useImperativeHandle(forwardRef, () => ref.current, []);
	import_react.useLayoutEffect(() => {
		if (!children && !props.material) {
			applyProps(ref.current.material, { color });
			ref.current.material.color.multiplyScalar(intensity);
		}
	}, [
		color,
		intensity,
		children,
		props.material
	]);
	import_react.useLayoutEffect(() => {
		if (!props.rotation) ref.current.quaternion.identity();
		if (target && !props.rotation) "boolean" === typeof target ? ref.current.lookAt(0, 0, 0) : ref.current.lookAt(Array.isArray(target) ? new Vector3(...target) : target);
	}, [target, props.rotation]);
	scale = Array.isArray(scale) && scale.length === 2 ? [
		scale[0],
		scale[1],
		1
	] : scale;
	return /*#__PURE__*/ import_react.createElement("mesh", _extends({
		ref,
		scale
	}, props), Form === "circle" ? /*#__PURE__*/ import_react.createElement("ringGeometry", { args: args ? args : [
		0,
		.5,
		64
	] }) : Form === "ring" ? /*#__PURE__*/ import_react.createElement("ringGeometry", { args: args ? args : [
		.25,
		.5,
		64
	] }) : Form === "rect" || Form === "plane" ? /*#__PURE__*/ import_react.createElement("planeGeometry", { args: args ? args : [1, 1] }) : Form === "box" ? /*#__PURE__*/ import_react.createElement("boxGeometry", { args: args ? args : [
		1,
		1,
		1
	] }) : /*#__PURE__*/ import_react.createElement(Form, { args }), children ? children : /*#__PURE__*/ import_react.createElement("meshBasicMaterial", {
		toneMapped,
		map,
		side: 2
	}), light && /*#__PURE__*/ import_react.createElement("pointLight", _extends({ castShadow: true }, light)));
});
//#endregion
export { extend as a, createStore$1 as c, require_react as d, Canvas as i, require_with_selector as l, Environment as n, useFrame as o, MeshReflectorMaterial as r, useThree as s, Lightformer as t, require_jsx_runtime as u };
