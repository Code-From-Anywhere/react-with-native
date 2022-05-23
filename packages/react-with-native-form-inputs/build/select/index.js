"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectInputType = exports.SelectInput = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_with_native_select_1 = __importDefault(require("react-with-native-select"));
var react_with_native_ui_1 = __importDefault(require("react-with-native-ui"));
var SelectInput = function (_a) {
    var value = _a.value, extra = _a.extra, onChange = _a.onChange;
    //console.log({ value, extraOptions: extra.options });
    return ((0, jsx_runtime_1.jsx)(react_with_native_select_1.default
    // containerClassName={UI.input}
    , { 
        // containerClassName={UI.input}
        className: react_with_native_ui_1.default.selectInput, title: extra.title || "", options: extra.options, value: value, onChange: function (value) {
            if (value) {
                onChange(value);
            }
        } }));
};
exports.SelectInput = SelectInput;
exports.SelectInput.defaultInitialValue = null;
var SelectInputType = /** @class */ (function () {
    function SelectInputType() {
    }
    return SelectInputType;
}());
exports.SelectInputType = SelectInputType;
exports.default = exports.SelectInput;
//# sourceMappingURL=index.js.map