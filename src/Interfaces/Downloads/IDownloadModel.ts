import IDownload from './IDownload';

export default interface IDownloadModel {
    create: (download: Omit<IDownload, 'id' | 'created_at'>) => Promise<IDownload>;
    findOne: (id: string) => Promise<IDownload | undefined>;
    getAllByIdWithPagination: (id: string, offset: number, limit: number) => Promise<IDownload[] | undefined>;
    getAllCount: (id: string) => Promise<number>;
    delete: (id: string) => Promise<number>;
    clear: (id: string) => Promise<number>;
    search: (id: string, term: string) => Promise<IDownload[] | undefined>;
}
