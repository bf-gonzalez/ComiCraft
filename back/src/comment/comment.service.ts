import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comment.repository';

@Injectable()
export class CommentService {
    constructor (private readonly commentsRepository: CommentsRepository){}

    getAllComment(){
        return this.commentsRepository.getAllComments();
    }

    getCommentById(id: string){
        return this.commentsRepository.getCommentById(id)
    }

    createComment(id: string, comic: any){
        return this.commentsRepository.createComment(id, comic)
    }

    deleteComment(id: string){
        return this.commentsRepository.deleteComment(id)
    }

}
