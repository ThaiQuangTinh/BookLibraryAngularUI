export class Book {

    public id: string;

    public title: string;
    
    public author: string;
    
    public publisher: string;
    
    public publishYear: Date;

    public categoryIds: string[];
    
    public totalCopies: number;

    public description: string;

    public imageUrl: string;
    

    constructor(data?: Partial<Book>) {
        this.id = data?.id || '';
        this.title = data?.title || '';
        this.author = data?.author || '';
        this.publisher = data?.publisher || '';
        this.publishYear = data?.publishYear || new Date();
        this.categoryIds = data?.categoryIds || [];
        this.totalCopies = data?.totalCopies || 0;
        this.description = data?.description || '';
        this.imageUrl = data?.imageUrl || '';
    }

}
