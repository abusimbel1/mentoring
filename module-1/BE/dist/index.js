"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = 3333;
const sayHello = () => console.log('Hello');
app.get('/', (req, res, next) => {
    sayHello();
    res.send('Hello!');
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
