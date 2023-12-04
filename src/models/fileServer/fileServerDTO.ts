export default class fileServerDTO {
    file: any;
    tagname: string;

    constructor(
        file: any,
        tagname: string,
    ){
        this.file = file;
        this.tagname = tagname;
    }
}