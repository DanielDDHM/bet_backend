"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressValidation = exports.getAddressValidation = void 0;
const z = __importStar(require("zod"));
exports.getAddressValidation = z.object({
    zipCode: z.string()
        .min(1, { message: 'NOT_EMPTY' }),
    streetNumber: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' })
        .min(3, { message: 'NOT_EMPTY' }),
    page: z.number()
        .nonnegative()
        .optional(),
    perPage: z.number()
        .nonnegative()
        .optional()
}).strict();
exports.createAddressValidation = z.object({
    zipCode: z.string()
        .min(3, { message: 'NOT_EMPTY' }),
    streetNumber: z.number()
        .nonnegative({ message: 'NON_NEGATIVE' })
        .min(1, { message: 'NOT_EMPTY' }),
    street: z.string()
        .min(3, { message: 'NOT_EMPTY' })
        .optional(),
    neighborhood: z.string()
        .min(3, { message: 'NOT_EMPTY' })
        .optional(),
    city: z.string()
        .min(3, { message: 'NOT_EMPTY' })
        .optional(),
    state: z.string()
        .min(1, { message: 'NOT_EMPTY' })
        .optional(),
}).strict();
//# sourceMappingURL=address.validation.js.map