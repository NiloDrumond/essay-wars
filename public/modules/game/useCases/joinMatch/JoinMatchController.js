"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinMatchController = void 0;
class JoinMatchController {
    constructor(joinMatchUseCase) {
        this.joinMatchUseCase = joinMatchUseCase;
    }
    handle(request, response) {
        const { authorization } = request.headers;
        const { code } = request.params;
        if (!authorization) {
            return response.status(401).send('No authorization id');
        }
        const { match, player } = this.joinMatchUseCase.execute({
            userId: authorization,
            code,
        });
        return response.status(201).json({ match, player });
    }
}
exports.JoinMatchController = JoinMatchController;
//# sourceMappingURL=JoinMatchController.js.map