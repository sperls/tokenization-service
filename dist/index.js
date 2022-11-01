"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = __importDefault(require("dotenv"));
const tokens_1 = __importDefault(require("./routes/tokens"));
const home_1 = __importDefault(require("./routes/home"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use('/', home_1.default);
app.use('/tokens', tokens_1.default);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});
