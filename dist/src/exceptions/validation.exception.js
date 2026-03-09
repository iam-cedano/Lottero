"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationException extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationException";
    }
}
exports.default = ValidationException;
