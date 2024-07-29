import { Router } from 'express';

import IDownloadController from '../Interfaces/Downloads/IDownloadController';
import AuthMiddleware from '../Middlewares/AuthMiddleware';

export default (downloadController: IDownloadController) => {
    const router = Router();

    router.post('/', AuthMiddleware, downloadController.getAll);
    router.post('/create', AuthMiddleware, downloadController.create);
    router.delete('/', AuthMiddleware, downloadController.delete);
    router.delete('/clear', AuthMiddleware, downloadController.clear);
    router.post('/search', AuthMiddleware, downloadController.search);

    return router;
};
