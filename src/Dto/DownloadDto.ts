import IDownload from '../Interfaces/Downloads/IDownload';

class DownloadDTO {
    public id: string;
    public title: string;
    public format: string;
    public size: number;
    public url: string;
    public thumbnailUrl: string;
    public createdAt: Date;

    constructor(user: IDownload) {
        this.id = user.id;
        this.title = user.title;
        this.format = user.format;
        this.size = user.size;
        this.url = user.url;
        this.thumbnailUrl = user.thumbnail_url;
        this.createdAt = user.created_at;
    }
}

export default DownloadDTO;
