"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMatchController = void 0;
class CreateMatchController {
    constructor(createMatchUseCase) {
        this.createMatchUseCase = createMatchUseCase;
    }
    handle(request, response) {
        const { authorization } = request.headers;
        if (!authorization) {
            return response.status(401).send('No authorization id');
        }
        const { player, match } = this.createMatchUseCase.execute({
            userId: authorization,
        });
        return response.status(201).json({ player, match });
    }
}
exports.CreateMatchController = CreateMatchController;
//# sourceMappingURL=CreateMatchController.js.map