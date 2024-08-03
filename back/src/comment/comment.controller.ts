import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
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

    @Post(':comicId')
    createComment(
        @Body('userId') userId: string,
        @Param('comicId') comicId: string,
        @Body('content') content: string,
    ){
        return this.commentService.createComment(userId, comicId, content);
    }

    @Post(':id')
    deleteComment(@Param('id', ParseUUIDPipe)id: string){
        return this.commentService.deleteComment(id)
    }
}
