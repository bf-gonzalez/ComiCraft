import { Categories } from "src/categories/categories.entity";
import { Comments } from "src/comment/comment.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Comics{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
     * @example "Marvel"
     */
    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
        unique: false,
    })
    title: string;

    /**
     * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
     * @example "Este comic tiene mucha accion, peleas y cuanta con un gran gion"
     */
    @Column({
        type: 'varchar',
        length: 150,
        nullable: false,

    })
    description: string

    /**
     * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
     * @example "Batman"
     */
    @Column({
        type: 'varchar',
        length: 40,
        unique: false,
        nullable: false,
    })
    username: string;

    /**
     * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
     * @example "1990-07-25"
     */
    @Column({
        type: 'date',
        nullable: false
    })
    data_post: Date;

    /**
     * Es de tipo text y tiene que ser una URL
     * @example "https://res.cloudinary.com/dyeji7bvg/image/upload/v1720248068/uhzzius1h9lbjc8k3hd9.webp"
     */
    @Column({
        type: 'varchar',
        nullable: false,
    })
    nombrecarpeta: string;

    @ManyToOne(() => Users, (user) => user.comics, { eager: true, nullable: false })
    user: Users;

    @ManyToOne(() => Categories, (category) => category.comics)
    @JoinColumn({name: 'category_id'})
    category: Categories;

    @OneToMany(() => Comments, (comment) => comment.comic)
    comment: Comments[];
}