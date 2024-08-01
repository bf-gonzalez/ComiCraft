import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "./comment.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Users } from "src/users/users.entity";
import { Comics } from "src/comics/comics.entity";


@Injectable()
export class CommentsRepository{
    constructor(
        @InjectRepository(Comments) private commentsRepository: Repository<Comments>,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Comics) private comicsRepository: Repository<Comics>
    ){}

    async getAllComments (): Promise<Comments[]>{
        return await this.commentsRepository.find();
    }

    async getCommentById(id: string){
        const comment = await this.commentsRepository.findOneBy({id})

        if(!comment){
            return `Comentario con id ${id} no encontrado`
        }
        return comment;
    }

    async createComment(userId: string, comic: any){
        const user = await this.usersRepository.findOneBy({id: userId})

        if(!user){
            throw new NotFoundException(`Usuario con id ${userId} no encontrado`)
        }

        const comment = new Comments();
        comment.created_at = new Date();
        comment.user = user;

        const newComment = await this.commentsRepository.save(comment)
    }

    //  async deleteComment(id: string){
    //     const comment = await this.commentsRepository.findOne({
    //         where: {id},
    //         relations: {
    //             comic: true,
    //         }
    //     })

    //     if(!comment){
    //         throw new NotFoundException(`Comentario con id ${id} no encontrado`)
    //     }

    //     await this.commentsRepository.delete({id})
    // }

    

}