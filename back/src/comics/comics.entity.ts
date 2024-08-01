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
     * @example "The Amazing Spider-Man"
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,

    })
    title: string;

    /**
     * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
     * @example "The Amazing Spider-Man is a superhero comic book series published by Marvel Comics. It is the first series in the Marvel Universe and features the character Spider-Man, who was created by Stan Lee and Steve Ditko."
     */
    @Column({
        type: 'varchar',
        length: 1000,
        nullable: false,

    })
    description: string

    /**
     * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
     * @example "Stan Lee"
     */
    @Column({
        type: 'varchar',
        length: 25,
        unique: false,
        nullable: false,
    })
    author: string;


    /**
     * Es de tipo varchar, puede usar hasta 10 caracteres no puede ser null
     * @example "1963-03-01"
     */
    @Column({
        type: 'varchar',
        length: 10,
        nullable: true
    })
    date: string;

    /**
     * Es de tipo text y tiene que ser una URL
     * @example "https://m.media-amazon.com/images/I/81v72hqINaL._AC_UY327_FMwebp_QL65_.jpg"
     */
    @Column({
        type: 'varchar',
        nullable: false,
    })
    folderName: string;


    
    @ManyToOne(() => Users, (user) => user.comics, { eager: true, nullable: true })
    user: Users;
    
    
    /**
     * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
     * @example "Aventuras"
     */
    @ManyToOne(() => Categories, (category) => category.comics)
    @JoinColumn({name: 'category_id'})
    category: Categories;

    @OneToMany(() => Comments, (comment) => comment.comic)
    comment: Comments[];

}