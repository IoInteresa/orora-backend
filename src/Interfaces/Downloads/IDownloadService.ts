import { GetDownloadsServiceResponse } from '.';
import DownloadDTO from '../../Dto/DownloadDto';
import { CreateDownloadData, DeleteDownloadData, GetDownloadsData, SearchDownloadData } from '../../Validators/Data';

export default interface IDownloadService {
    create: (id: string, data: CreateDownloadData) => Promise<DownloadDTO>;
    getAll: (id: string, data: GetDownloadsData) => Promise<GetDownloadsServiceResponse>;
    delete: (id: string, data: DeleteDownloadData) => Promise<{ status: number }>;
    clear: (id: string) => Promise<{status: number}>;
    search: (id: string, data: SearchDownloadData) => Promise<DownloadDTO[]>;
}
