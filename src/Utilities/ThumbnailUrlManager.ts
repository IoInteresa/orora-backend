class ThumbnailUrlManager {
    public generateUrl = (url: string): string => {
        const parsedUrl = new URL(url);
    
        switch (true) {
            case parsedUrl.hostname.includes('youtube'):
                return this.generateThumbnailUrl(url);
            case parsedUrl.hostname.includes('instagram'):
                return 'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-512.png';
            case parsedUrl.hostname.includes('soundcloud'):
                return 'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Soundcloud-512.png';
            case parsedUrl.hostname.includes('pornhub') || parsedUrl.hostname.includes('xvideos'):
                return 'https://cdn2.iconfinder.com/data/icons/prohibited-forbidden-signs/100/Prohibited-90-512.png'
            default:
                return 'https://cdn1.iconfinder.com/data/icons/iconoir-vol-3/24/question-mark-circle-512.png';
        }
    };

    private extractYouTubeVideoID(url: string): string | null {
        const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:[?&]|$)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    private generateThumbnailUrl(url: string): string {
        const videoID = this.extractYouTubeVideoID(url);
        return videoID ? 
            `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg` 
            : 
            'https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Youtube-512.png';
    }
}

export default ThumbnailUrlManager;
