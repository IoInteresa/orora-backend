import { Router } from 'express';

import DownloadRoutes from './DownloadRoutes';
import UserRoutes from './UserRoutes';
import { downloadController, userController } from '../container';

const router = Router();

router.use('/user', UserRoutes(userController));
router.use('/download', DownloadRoutes(downloadController));

export default router;
