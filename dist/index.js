"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ? external imports
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// ? internal imports
const app = express_1.default();
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const setupMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = `${process.env.MONGO_CONNECTION_STRING}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    };
    try {
        yield mongoose_1.default.connect(uri, options);
        console.log("database connection successfully!");
        mongoose_1.default.Promise = global.Promise;
    }
    catch (error) {
        console.log(error);
    }
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    let app = express_1.default();
    // ? request parser
    app.use(body_parser_1.default.json());
    app.use(cors_1.default());
    // app.use('/api', routes);
    app.use("/", (req, res) => {
        res.send("RS Shonjoy Das" + new Date());
    });
    yield setupMongo();
    yield app.listen(5000);
    console.log(`app listing to port ${PORT}`);
});
init();
//# sourceMappingURL=index.js.map