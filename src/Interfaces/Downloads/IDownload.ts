export default interface IDownload {
    id: string;
    title: string;
    format: string;
    size: number;
    url: string;
    user_id: string;
    thumbnail_url: string;
    created_at: Date;
}
