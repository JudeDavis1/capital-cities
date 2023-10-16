"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryInfoSchema = void 0;
const zod_1 = require("zod");
exports.countryInfoSchema = zod_1.z.object({
    name: zod_1.z.string(),
    capital: zod_1.z.string(),
});
