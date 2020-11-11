/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["src_components_pages_PageLoginBasic_index_js"],{

/***/ "./src/actions/authActions.js":
/*!************************************!*\
  !*** ./src/actions/authActions.js ***!
  \************************************/
/*! namespace exports */
/*! export logOut [provided] [no usage info] [missing usage info prevents renaming] */
/*! export signIn [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"signIn\": () => /* binding */ signIn,\n/* harmony export */   \"logOut\": () => /* binding */ logOut\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar signIn = function signIn(credentials) {\n  var _JSON$parse = JSON.parse(credentials),\n      email = _JSON$parse.email;\n\n  console.log(email);\n  var myHeaders = new Headers();\n  myHeaders.append('Content-Type', 'application/json');\n  myHeaders.append('Cookie', 'csrftoken=4bI7Q82EiKpReY68yzqnVcfokOMQlUUiEXBCnywbyrFMRNEHIUkWH0sQgVARbRz5');\n  var requestOptions = {\n    method: 'POST',\n    headers: myHeaders,\n    body: credentials,\n    redirect: 'follow'\n  };\n  return function (dispatch) {\n    dispatch({\n      type: 'LOGIN_LOADING',\n      state: {\n        token: 'loading'\n      }\n    });\n    fetch(\"\".concat(process.env.REACT_APP_LOGIN_URL), requestOptions).then(function (response) {\n      return response.json();\n    }).then(function (resp) {\n      if (resp.message) {\n        dispatch({\n          type: 'LOGIN_ERROR',\n          errorDetails: resp.message\n        });\n      } else {\n        axios__WEBPACK_IMPORTED_MODULE_0___default()({\n          method: 'GET',\n          url: \"\".concat(process.env.REACT_APP_API_PROFILES),\n          headers: {\n            Authorization: 'Token '.concat(resp.token)\n          }\n        }).then(function (res) {\n          var loginState = _objectSpread(_objectSpread({}, res.data.results[0]), {}, {\n            email: email,\n            token: resp.token\n          });\n\n          console.log(loginState.token, loginState.email);\n          localStorage.setItem('auth', JSON.stringify(loginState));\n          dispatch({\n            type: 'LOGIN_SUCCESS',\n            state: _objectSpread({}, loginState)\n          });\n        })[\"catch\"](function (err) {\n          console.log(err);\n          dispatch({\n            type: 'LOGIN_ERROR',\n            err: err\n          });\n        });\n      }\n    });\n  };\n};\nvar logOut = function logOut(token) {\n  return function (dispatch) {\n    axios__WEBPACK_IMPORTED_MODULE_0___default()({\n      method: 'POST',\n      url: \"\".concat(process.env.REACT_APP_LOGOUT_URL),\n      headers: {\n        Authorization: 'Token '.concat(token)\n      }\n    }).then(function (res) {\n      dispatch({\n        type: 'LOG_OUT',\n        state: {\n          firstname: null,\n          lastname: null,\n          useremail: null,\n          token: null,\n          image: null\n        }\n      });\n    })[\"catch\"](function (err) {\n      dispatch({\n        type: 'LOGIN_ERROR',\n        state: {\n          firstname: null,\n          lastname: null,\n          useremail: null,\n          token: null,\n          image: null\n        }\n      });\n    });\n  };\n};\n\n//# sourceURL=webpack:///./src/actions/authActions.js?");

/***/ }),

/***/ "./src/components/components/PageLoginBasic1/index.js":
/*!************************************************************!*\
  !*** ./src/components/components/PageLoginBasic1/index.js ***!
  \************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\n/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ \"./node_modules/reactstrap/es/Col.js\");\n/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reactstrap */ \"./node_modules/reactstrap/es/Button.js\");\n/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reactstrap */ \"./node_modules/reactstrap/es/Input.js\");\n/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! reactstrap */ \"./node_modules/reactstrap/es/FormGroup.js\");\n/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! reactstrap */ \"./node_modules/reactstrap/es/Alert.js\");\n/* harmony import */ var _actions_authActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../actions/authActions */ \"./src/actions/authActions.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\nvar LivePreviewExample = function LivePreviewExample(props) {\n  var authError = props.authError;\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),\n      _useState2 = _slicedToArray(_useState, 2),\n      password = _useState2[0],\n      setPassword = _useState2[1];\n\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),\n      _useState4 = _slicedToArray(_useState3, 2),\n      email = _useState4[0],\n      setEmail = _useState4[1];\n\n  localStorage.removeItem('state');\n\n  var loginUser = function loginUser(e) {\n    e.preventDefault();\n    var raw = JSON.stringify({\n      email: email,\n      password: password\n    });\n    props.signIn(raw);\n  };\n\n  if (props.auth && props.auth.isAuthenticated) {\n    window.location = '/DashboardCommerce';\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"app-wrapper bg-white min-vh-100\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"app-main min-vh-100\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"app-content p-0\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"app-content--inner d-flex align-items-center\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"flex-grow-1 w-100 d-flex align-items-center\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"bg-composed-wrapper--content py-5\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__.default, {\n    md: \"10\",\n    lg: \"8\",\n    xl: \"4\",\n    className: \"mx-auto\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"text-center\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"h1\", {\n    className: \"display-4 mb-1 font-weight-bold\"\n  }, \"Login\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"p\", {\n    className: \"font-size-lg mb-0 text-black-50\"\n  }, \"Fill in the fields below to login to your account\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"text-center py-4 rounded bg-secondary my-4\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__.default, {\n    className: \"m-2 btn-pill px-4 font-weight-bold\",\n    size: \"sm\",\n    color: \"google\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", {\n    className: \"btn-wrapper--icon\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {\n    icon: ['fab', 'google']\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", {\n    className: \"btn-wrapper--label\"\n  }, \"Login with Google\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__.default, {\n    className: \"m-2 btn-pill px-4 font-weight-bold\",\n    size: \"sm\",\n    color: \"facebook\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", {\n    className: \"btn-wrapper--icon\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {\n    icon: ['fab', 'facebook']\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", {\n    className: \"btn-wrapper--label\"\n  }, \"Login with Facebook\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"text-center text-black-50 mb-4\"\n  }, \"or sign in with credentials\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"form-group mb-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_6__.default, {\n    placeholder: \"Email\",\n    type: \"email\",\n    value: email,\n    onChange: function onChange(e) {\n      return setEmail(e.target.value);\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.default, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_6__.default, {\n    placeholder: \"Password\",\n    type: \"password\",\n    value: password,\n    onChange: function onChange(e) {\n      return setPassword(e.target.value);\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"d-flex justify-content-between\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"custom-control custom-control-alternative d-flex align-items-center custom-checkbox\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"input\", {\n    className: \"custom-control-input\",\n    id: \" customCheckLogin55\",\n    type: \"checkbox\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"label\", {\n    className: \"custom-control-label\",\n    htmlFor: \" customCheckLogin55\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", null, \"Remember me\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"a\", {\n    href: \"#/\",\n    onClick: function onClick(e) {\n      return e.preventDefault();\n    },\n    className: \"text-first\"\n  }, \"Recover password\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"text-center py-4\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__.default, {\n    color: \"second\",\n    onClick: function onClick(e) {\n      return loginUser(e);\n    },\n    className: \"font-weight-bold w-50 my-2\"\n  }, props.auth.token === 'loading' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", {\n    className: \"btn-wrapper--icon spinner-border spinner-border-sm\",\n    role: \"status\",\n    \"aria-hidden\": \"true\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", {\n    className: \"\"\n  }, '   ', \"Loggin in...\"), ' ') : 'Sign in')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, authError ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__.default, {\n    className: \"alerts-alternate\",\n    color: \"danger\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"d-flex align-items-center align-content-start\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", null, authError))) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"text-center text-black-50 mt-3\"\n  }, \"Don't have an account?\", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"a\", {\n    href: \"#/\",\n    onClick: function onClick(e) {\n      return e.preventDefault();\n    },\n    className: \"text-first\"\n  }, \"Sign up\")))))))))));\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  // console.log('Login', state);\n  return _objectSpread(_objectSpread({}, state), {}, {\n    authError: state.auth.authError\n  });\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    signIn: function signIn(creds) {\n      return dispatch((0,_actions_authActions__WEBPACK_IMPORTED_MODULE_3__.signIn)(creds));\n    }\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, mapDispatchToProps)(LivePreviewExample));\n\n//# sourceURL=webpack:///./src/components/components/PageLoginBasic1/index.js?");

/***/ }),

/***/ "./src/components/pages/PageLoginBasic/index.js":
/*!******************************************************!*\
  !*** ./src/components/pages/PageLoginBasic/index.js ***!
  \******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ PageLoginBasic\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _components_PageLoginBasic1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/PageLoginBasic1 */ \"./src/components/components/PageLoginBasic1/index.js\");\n;\n\nfunction PageLoginBasic() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_PageLoginBasic1__WEBPACK_IMPORTED_MODULE_1__.default, null));\n}\n\n//# sourceURL=webpack:///./src/components/pages/PageLoginBasic/index.js?");

/***/ })

}]);