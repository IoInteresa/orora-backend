import DownloadDTO from "../../Dto/DownloadDto";

export interface GetDownloadsServiceResponse {
    data: DownloadDTO[],
    total: number,
    page: number,
    limit: number
}