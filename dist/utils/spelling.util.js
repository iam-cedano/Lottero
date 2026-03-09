"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Spelling {
    static capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}
exports.default = Spelling;
