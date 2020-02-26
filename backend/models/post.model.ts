import {model, Schema} from 'mongoose';

export interface PostModel {
    id: string;
    author: string;
    published: boolean;
    postDate: Date;
    title: string;
    title2: string;
    subtitle1: string;
    description1: string;
    subtitle2: string;
    description2: string;
    subtitle3: string;
    description3: string;
    quote1: string;
    quoter1: string;
    quote2: string;
    quoter2: string;
    category: string;
    likeCount: number;
    coverImg: {imageURL: string, data: Buffer, contentType: String};
    img1: {imageURL: string, data: Buffer, contentType: String};
    img2: {imageURL: string, data: Buffer, contentType: String};
    img3: {imageURL: string, data: Buffer, contentType: String};
}

// User Schema
export const PostSchema = new Schema<PostModel>({
    author: {
        type: String,
        ref: 'User',
        required: true
    },
    published: {
        type: Boolean
    },
    postDate: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    title2: {
        type: String
    },
    subtitle1: {
        type: String,
        required: true
    },
    description1: {
        type: String,
        required: true
    },
    subtitle2: {
        type: String
    },
    description2: {
        type: String
    },
    subtitle3: {
        type: String
    },
    description3: {
        type: String
    },
    quote1: {
        type: String
    },
    quoter1: {
        type: String
    },
    quote2: {
        type: String
    },
    quoter2: {
        type: String
    },
    category: {
        type: String
    },
    likeCount: {
        type: Number,
        default: 0
    },
    coverImg: {
        imageURL: String,
        data: Buffer,
        contentType: String
    },
    img1: {
        imageURL: String,
        data: Buffer,
        contentType: String
    },
    img2: {
        imageURL: String,
        data: Buffer,
        contentType: String
    },
    img3: {
        imageURL: String,
        data: Buffer,
        contentType: String
    }
});

export const Post = model('Post', PostSchema);
