"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Transforms JSON response to an object.
 *
 * @param {string} data
 * @returns {Promise<object>}
 */
function transformToJSON(data) {
    return JSON.parse(data);
}
exports.transformToJSON = transformToJSON;
//# sourceMappingURL=transformToJSON.js.map