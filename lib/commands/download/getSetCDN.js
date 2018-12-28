"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CDN_1 = __importDefault(require("./CDN"));
// Get set CDN
async function getSetCDN(api, id) {
    const url = `/${id}/`;
    if (id < 0) {
        throw new Error("Set numbers cannot be below 0");
    }
    return api.get(url).then((response) => {
        return response.data;
    }).then((data) => {
        return new CDN_1.default(Object.assign({}, data, { setId: id }));
    });
}
exports.getSetCDN = getSetCDN;
//# sourceMappingURL=getSetCDN.js.map