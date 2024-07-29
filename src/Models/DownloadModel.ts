import db from '../Database/db';
import IDownload from '../Interfaces/Downloads/IDownload';
import IDownloadModel from '../Interfaces/Downloads/IDownloadModel';

class DownloadModel implements IDownloadModel {
    private readonly tableName = 'downloads';

    public create = async (download: Omit<IDownload, 'id' | 'created_at'>): Promise<IDownload> => {
        const [newDownload] = await db(this.tableName).insert(download).returning<IDownload[]>('*');
        return newDownload;
    };

    public findOne = async (id: string) => {
        return await db(this.tableName).select('*').where({ id }).first();
    };

    public getAllByIdWithPagination = async (id: string, offset: number, limit: number) => {
        return await db(this.tableName)
            .select('*')
            .limit(limit)
            .offset(offset)
            .where({ user_id: id })
            .orderBy('created_at', 'desc');
    };

    public delete = async (id: string) => {
        return await db(this.tableName).select('*').where({ id }).del();
    };

    public getAllCount = async (id: string): Promise<number> => {
        const result = await db(this.tableName).count('id as count').where({ user_id: id}).first();
        return result ? Number(result.count) : 0;
    };

    public clear = async (id: string) => {
        return await db(this.tableName).where({ user_id: id }).del();
    };

    public search = async (id: string, term: string) => {
        return await db(this.tableName)
           .select('*')
           .where({ user_id: id })
           .andWhere(function() {
               this.where('title', 'ILIKE', `%${term}%`)
                   .orWhere('url', 'ILIKE', `%${term}%`);
           })
           .limit(4)
           .orderBy('created_at', 'desc');
    };
}

export default DownloadModel;
