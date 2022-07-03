

export  interface IPostModel {
    type:"text" | "image" | "video",
    createdAt:Date,
    updatedAt:Date,
    content:any,
    uid:string,
    ownerName:string,
    ownerPhotoURL:string
}

export interface IImagePostModel extends IPostModel{
    imageURL:string
}