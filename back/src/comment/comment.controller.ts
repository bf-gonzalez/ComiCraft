import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @Get()
    getAllComment(){
        return this.commentService.getAllComment()
    }

    @Get(':id')
    getCommentById(@Param('id', ParseUUIDPipe)id: string){
        return this.commentService.getCommentById(id)
    }

    //@Post()

    // @Post(':id')
    // deleteComment(@Param('id', ParseUUIDPipe)id: string){
    //     return this.commentService.deleteComment(id)
    // }
}
