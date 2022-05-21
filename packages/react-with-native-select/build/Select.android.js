"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_with_native_1 = require("react-with-native");
var react_native_1 = require("react-native");
var util_1 = require("./util");
var Select = function (_a) {
    var options = _a.options, onChange = _a.onChange, value = _a.value, title = _a.title, className = _a.className, children = _a.children, selectFirstOption = _a.selectFirstOption, ios = _a.ios;
    var realValue = (0, util_1.getRealValue)({ value: value, selectFirstOption: selectFirstOption, options: options, title: title });
    var onClick = function () {
        //should implement this
        react_native_1.Alert.alert("Coming soon");
        console.log("Coming soon");
    };
    return ((0, jsx_runtime_1.jsx)(react_with_native_1.Div, __assign({ className: className }, { children: children ? (children({ onClick: onClick, className: className, value: realValue })) : ((0, jsx_runtime_1.jsx)(react_with_native_1.Button, { title: (value === null || value === void 0 ? void 0 : value.label) || "Select a value", onClick: onClick })) })));
};
exports.default = Select;
//# sourceMappingURL=Select.android.js.map