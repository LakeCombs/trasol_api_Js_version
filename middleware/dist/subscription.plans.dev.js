"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Starter = function Starter(check_diagnosis, repairs, tow_service, alternative_free_ride, unlimited_support, choose_a_specialist, parts_sales_and_delivery, help_a_friend) {
  _classCallCheck(this, Starter);

  this.check_diagnosis = true;
  this.repairs = 4;
  this.tow_service = 2;
  this.alternative_free_ride = false;
  this.unlimited_support = false;
  this.choose_a_specialist = false;
  this.parts_sales_and_delivery = true;
  this.help_a_friend = false;
};

var Classic =
/*#__PURE__*/
function (_Starter) {
  _inherits(Classic, _Starter);

  function Classic(check_diagnosis, repairs, tow_service, alternative_free_ride, unlimited_support, choose_a_specialist, parts_sales_and_delivery, help_a_friend) {
    var _this;

    _classCallCheck(this, Classic);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Classic).call(this, check_diagnosis, repairs, tow_service, alternative_free_ride, unlimited_support, choose_a_specialist, parts_sales_and_delivery, help_a_friend));
    _this.check_diagnosis = true;
    _this.repairs = 8;
    _this.tow_service = 4;
    _this.alternative_free_ride = false;
    _this.unlimited_support = false;
    _this.choose_a_specialist = false;
    _this.parts_sales_and_delivery = true;
    _this.help_a_friend = false;
    return _this;
  }

  return Classic;
}(Starter);

var Luxuriates =
/*#__PURE__*/
function (_Classic) {
  _inherits(Luxuriates, _Classic);

  function Luxuriates(check_diagnosis, repairs, tow_service, alternative_free_ride, unlimited_support, choose_a_specialist, parts_sales_and_delivery, help_a_friend) {
    var _this2;

    _classCallCheck(this, Luxuriates);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Luxuriates).call(this, check_diagnosis, repairs, tow_service, alternative_free_ride, unlimited_support, choose_a_specialist, parts_sales_and_delivery, help_a_friend));
    _this2.check_diagnosis = true;
    _this2.repairs = 1000;
    _this2.tow_service = 1000;
    _this2.alternative_free_ride = true;
    _this2.unlimited_support = true;
    _this2.choose_a_specialist = true;
    _this2.parts_sales_and_delivery = true;
    _this2.help_a_friend = true;
    return _this2;
  }

  return Luxuriates;
}(Classic);

var starter = new Starter();
var classic = new Classic();
var luxuriates = new Luxuriates();
module.exports = {
  starter: starter,
  classic: classic,
  luxuriates: luxuriates
};