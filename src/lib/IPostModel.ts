

export  interface IPostModel {
    type:"text" | "image" | "video",
    createdAt:string,
    updatedAt:string,
    content:any,
    uid:string,
    ownerName:string,
    ownerPhotoURL:string
}

export interface IImagePostModel extends IPostModel{
    imageURL:string
}