/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var View = function () {
	  function View() {
	    _classCallCheck(this, View);
	
	    var canvasEl = document.getElementById("canvas");
	    this.ctx = canvasEl.getContext("2d");
	    this.game = new _game2.default(this.ctx);
	    this.stage = this.game.stage;
	    this.player = this.game.player;
	    this.keyLeft = false;
	    this.keyRight = false;
	    this.timer = 0;
	    this.pause = false;
	  }
	
	  _createClass(View, [{
	    key: "start",
	    value: function start() {
	      this.handleInput();
	      // setInterval(this.frame.bind(this), 1000/60);
	      requestAnimationFrame(this.frame.bind(this));
	    }
	  }, {
	    key: "handleInput",
	    value: function handleInput() {
	      var _this = this;
	
	      var player = this.player;
	      document.addEventListener("keydown", function (e) {
	        _this.handleKeyDown(e);
	      });
	      document.addEventListener("keyup", function (e) {
	        _this.handleKeyUp(e);
	      });
	
	      document.addEventListener("keypress", function (e) {
	        console.log(e);
	        if (e.code === "Space") {
	          console.log(_this.pause);
	          _this.pause = !_this.pause;
	          if (!_this.pause) {
	            requestAnimationFrame(_this.frame.bind(_this));
	          }
	        }
	      });
	    }
	  }, {
	    key: "handleKeyDown",
	    value: function handleKeyDown(e) {
	      if (e.key === "ArrowRight") {
	        this.keyRight = true;
	      } else if (e.key === "ArrowLeft") {
	        this.keyLeft = true;
	      }
	    }
	  }, {
	    key: "handleKeyUp",
	    value: function handleKeyUp(e) {
	      if (e.key === "ArrowRight") {
	        this.keyRight = false;
	      } else if (e.key === "ArrowLeft") {
	        this.keyLeft = false;
	      }
	    }
	  }, {
	    key: "frame",
	    value: function frame() {
	      if (this.keyLeft) {
	        this.player.handleMove(-9);
	      } else if (this.keyRight) {
	        this.player.handleMove(9);
	      }
	      this.timer += 1;
	      if (this.timer % 45 === 0) {
	        this.game.generateShape();
	      }
	      this.game.tick();
	      if (!this.game.gameOver && !this.pause) {
	        requestAnimationFrame(this.frame.bind(this));
	      }
	    }
	  }]);
	
	  return View;
	}();
	
	var view = new View();
	view.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _player = __webpack_require__(2);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _shape = __webpack_require__(3);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	var _vars = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(ctx) {
	    _classCallCheck(this, Game);
	
	    this.ctx = ctx;
	    this.player = new _player2.default();
	    this.shapes = [];
	    this.count = 0;
	    this.gameOver = false;
	  }
	
	  _createClass(Game, [{
	    key: 'generateShape',
	    value: function generateShape() {
	      var shape = new _shape2.default();
	      this.shapes.push(shape);
	    }
	  }, {
	    key: 'handleCollision',
	    value: function handleCollision() {
	      var _this = this;
	
	      this.shapes.forEach(function (shape) {
	        if (_this.player.radius - _vars.BALL_RADIUS <= shape.radius && _this.player.radius + _vars.BALL_RADIUS >= shape.radius) {
	          var end = shape.startAngle + shape.arcLength;
	          var start = shape.startAngle;
	          if (end >= 360) {
	            end -= 360;
	            start -= 360;
	          }
	          console.log(start, end, _this.player.angle);
	          if (_this.player.angle > start && _this.player.angle < end) {
	            _this.gameOver = true;
	          }
	        }
	      });
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      var _this2 = this;
	
	      this.shapes.forEach(function (shape) {
	        if (shape.radius < _vars.CENTER_RADIUS) {
	          _this2.shapes.splice(_this2.shapes.indexOf(shape), 1);
	          _this2.count += 1;
	        }
	      });
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var _this3 = this;
	
	      this.ctx.clearRect(0, 0, _vars.CANVAS_WIDTH, _vars.CANVAS_HEIGHT);
	      this.shapes.forEach(function (shape) {
	        shape.draw(_this3.ctx);
	        shape.shrink(_vars.SHAPE_SHRINK_RATE);
	        shape.rotate();
	      });
	      this.player.draw(this.ctx);
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      // this.generateShape();
	      this.draw();
	      this.handleCollision();
	      this.remove();
	      // if (this.player.clockwise) {
	      //   this.player.handleMove(1);
	      // } else {
	      //   this.player.handleMove(-1);
	      // }
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vars = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Player = function () {
	  function Player() {
	    _classCallCheck(this, Player);
	
	    this.angle = 0;
	    this.radius = 50;
	    this.clockwise = true;
	  }
	
	  _createClass(Player, [{
	    key: 'handleMove',
	    value: function handleMove(delta) {
	      if (delta > 0) {
	        this.clockwise = true;
	      } else {
	        this.clockwise = false;
	      }
	      if (this.angle + delta > 360) {
	        this.angle = delta;
	      } else if (this.angle + delta < 0) {
	        this.angle = 360 + delta;
	      } else {
	        this.angle += delta;
	      }
	    }
	  }, {
	    key: 'getPos',
	    value: function getPos() {
	      var x = _vars.CANVAS_WIDTH / 2 + this.radius * Math.cos(Math.PI * this.angle / 180);
	      var y = _vars.CANVAS_HEIGHT / 2 + this.radius * Math.sin(Math.PI * this.angle / 180);
	      return [x, y];
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.beginPath();
	      ctx.arc(this.getPos()[0], this.getPos()[1], _vars.BALL_RADIUS, 0, 2 * Math.PI);
	      ctx.fillStyle = 'red';
	      ctx.fill();
	
	      ctx.beginPath();
	      ctx.arc(_vars.CANVAS_WIDTH / 2, _vars.CANVAS_HEIGHT / 2, _vars.CENTER_RADIUS, 0, 2 * Math.PI);
	      ctx.fillStyle = 'black';
	      ctx.fill();
	    }
	  }]);
	
	  return Player;
	}();
	
	exports.default = Player;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vars = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Shape = function () {
	  function Shape() {
	    _classCallCheck(this, Shape);
	
	    this.radius = _vars.SHAPE_STARTING_RADIUS;
	    this.startAngle = this.handleMove(Math.random() * 360);
	    this.arcLength = 180;
	    // this.clockwise = Math.random() > 0.5 ? true : false;
	    this.clockwise = true;
	    this.color = 'black';
	  }
	
	  _createClass(Shape, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.beginPath();
	      ctx.arc(_vars.CANVAS_WIDTH / 2, _vars.CANVAS_HEIGHT / 2, this.radius, this.startAngle * Math.PI / 180, (this.startAngle + this.arcLength) * Math.PI / 180);
	      ctx.strokeStyle = this.color;
	      ctx.lineWidth = 5;
	      ctx.stroke();
	    }
	  }, {
	    key: 'shrink',
	    value: function shrink(num) {
	      this.radius -= num;
	    }
	  }, {
	    key: 'handleMove',
	    value: function handleMove(angle) {
	      if (angle > 360) {
	        angle -= 360;
	      } else if (angle < 0) {
	        angle += 360;
	      }
	      return angle;
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate() {
	      if (this.clockwise) {
	        this.startAngle = this.handleMove(this.startAngle + _vars.SHAPE_ANGLE_CHANGE);
	      } else {
	        this.startAngle = this.handleMove(this.startAngle - _vars.SHAPE_ANGLE_CHANGE);
	      }
	    }
	  }]);
	
	  return Shape;
	}();
	
	exports.default = Shape;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//canvas
	var CANVAS_HEIGHT = exports.CANVAS_HEIGHT = 400;
	var CANVAS_WIDTH = exports.CANVAS_WIDTH = 400;
	
	//player
	var BALL_RADIUS = exports.BALL_RADIUS = 7;
	var CENTER_RADIUS = exports.CENTER_RADIUS = 30;
	
	//shape
	var SHAPE_ANGLE_CHANGE = exports.SHAPE_ANGLE_CHANGE = 3;
	var SHAPE_STARTING_RADIUS = exports.SHAPE_STARTING_RADIUS = 300;
	var SHAPE_SHRINK_RATE = exports.SHAPE_SHRINK_RATE = 2;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map