"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// #!/usr/bin/env node
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const routes_1 = require("./routes");
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => { });
app.use(routes_1.router);
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map