import { HttpStatus, ResponseText } from '../Constants';
import DownloadDTO from '../Dto/DownloadDto';
import IDownloadModel from '../Interfaces/Downloads/IDownloadModel';
import IDownloadService from '../Interfaces/Downloads/IDownloadService';
import IUserModel from '../Interfaces/User/IUserModel';
import ThrowError from '../Responses/ThrowError';
import ThumbnailUrlManager from '../Utilities/ThumbnailUrlManager';
import { CreateDownloadData, DeleteDownloadData, GetDownloadsData, SearchDownloadData } from '../Validators/Data';

class DownloadService implements IDownloadService {
    private readonly userModel: IUserModel;
    private readonly downloadModel: IDownloadModel;
    private readonly thumbnailUrlManager: ThumbnailUrlManager;

    constructor(userModel: IUserModel, downloadModal: IDownloadModel) {
        this.userModel = userModel;
        this.downloadModel = downloadModal;
        this.thumbnailUrlManager = new ThumbnailUrlManager();
    }

    public create = async (id: string, data: CreateDownloadData) => {
        const { title, format, size, url } = data;

        const user = await this.userModel.findOne({ id });
        if (!user) {
            throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.USER_NOT_FOUND);
        }

        if (!user.verified) {
            throw new ThrowError(HttpStatus.FORBIDDEN, ResponseText.USER_NOT_VERIFIED_YET);
        }

        const thumbnailUrl = this.thumbnailUrlManager.generateUrl(url);

        const download = await this.downloadModel.create({
            title,
            format,
            size,
            url,
            user_id: user.id,
            thumbnail_url: thumbnailUrl,
        });
        if (!download) {
            throw new ThrowError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ResponseText.UNABLE_TO_CREATE_DOWNLOAD,
            );
        }

        return new DownloadDTO(download);
    };

    public getAll = async (id: string, data: GetDownloadsData) => {
        const { page, limit } = data;

        const user = await this.userModel.findOne({ id });
        if (!user) {
            throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.USER_NOT_FOUND);
        }

        if (!user.verified) {
            throw new ThrowError(HttpStatus.FORBIDDEN, ResponseText.USER_NOT_VERIFIED_YET);
        }

        const offset = (page - 1) * limit;

        const downloadsCount = await this.downloadModel.getAllCount(user.id)
        if(downloadsCount === 0) {
            return {
                data: [],
                total: 0,
                page,
                limit
            }
        }

        const downloads = await this.downloadModel.getAllByIdWithPagination(user.id, offset, limit);
        if (!downloads) {
            return {
                data: [],
                total: downloadsCount,
                page,
                limit
            }
        }

        const downloadsDto = downloads.map((download) => new DownloadDTO(download));
        return {
            data: downloadsDto,
            total: downloadsCount,
            limit,
            page
        }
    };

    public delete = async (id: string, data: DeleteDownloadData) => {
        const { id: downloadId } = data;

        const user = await this.userModel.findOne({ id });
        if (!user) {
            throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.USER_NOT_FOUND);
        }

        if (!user.verified) {
            throw new ThrowError(HttpStatus.FORBIDDEN, ResponseText.USER_NOT_VERIFIED_YET);
        }

        const download = await this.downloadModel.findOne(downloadId);
        if (!download) {
            throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.DOWNLOAD_NOT_FOUND);
        }

        const deletedDownload = await this.downloadModel.delete(downloadId);
        if (deletedDownload === 0) {
            throw new ThrowError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ResponseText.UNABLE_TO_DELETE_DOWNLOAD,
            );
        }

        return { status: HttpStatus.OK };
    };

    public clear = async (id: string) => {
        const user = await this.userModel.findOne({ id });
        if (!user) {
            throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.USER_NOT_FOUND);
        }

        if (!user.verified) {
            throw new ThrowError(HttpStatus.FORBIDDEN, ResponseText.USER_NOT_VERIFIED_YET);
        }

        const deletedDownload = await this.downloadModel.clear(user.id);
        if (deletedDownload === 0) {
            throw new ThrowError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ResponseText.UNABLE_TO_CLEAR_DOWNLOADS,
            );
        }

        return { status: HttpStatus.OK };
    }

    public search = async (id: string, data: SearchDownloadData) => {
        const { term } = data;

        const user = await this.userModel.findOne({ id });
        if (!user) {
            throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.USER_NOT_FOUND);
        }

        if (!user.verified) {
            throw new ThrowError(HttpStatus.FORBIDDEN, ResponseText.USER_NOT_VERIFIED_YET);
        }

        const foundedDownloads = await this.downloadModel.search(user.id, term);
        if (!foundedDownloads) {
            return [];
        }
        
        return foundedDownloads.map((download) => new DownloadDTO(download));
    }
}

export default DownloadService;
