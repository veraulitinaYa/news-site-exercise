export interface News {
    id: number;
    date: string;
    title: string;
    announce: string;
    content: string;
    image: string;
}

export type TNewsCardBanner = Pick<News, 'id' | 'title' | 'announce' | 'image'>;
export type TNewsCardItem  = Pick<News, 'id' | 'date' | 'title' | 'announce'>;
export type TNewsCardDetails = Pick<News, 'id' | 'date' | 'title' | 'announce' | 'content' | 'image'>;  