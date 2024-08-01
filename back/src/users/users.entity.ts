import { Comics } from 'src/comics/comics.entity';
import { Comments } from 'src/comment/comment.entity';
import { Membership } from 'src/membership/membership.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/enum/role.enum';

@Entity({
  name: 'users',
})
export class Users {
  /**
   * uuid v4 generado por la BBDD
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
   * @example "Tester"
   */
  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 17,
    unique: true,
    nullable: false,
  })
  username: string;

  /**
   * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
   * @example "1990-07-25"
   */
  @Column({
    nullable: false,
    type: 'date',
  })
  dob: Date;

  /**
   * Es de tipo varchar, es unico y no puede ser null
   * @example "calle falsa 123"
   */
  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  address: string;

  /**
   * Es de tipo int
   * @example 123456789
   */
  @Column({
    type: 'bigint',
    unique: true,
  })
  phone: number;

  /**
   * Es de tipo varchar, es unico y no puede ser null
   * @example tester@example.com
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  /**
   * Es de tipo varchar y no puede ser null y estar hashado
   * @example "***********"
   */
  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: [Role.Free],
    array: true,
  })
  role?: Role[];

  @OneToOne(() => Membership, (membership) => membership.user)
  @JoinColumn({ name: 'membership_id' })
  memberships: Membership;

  @OneToMany(() => Comics, (comic) => comic.user)
  comics: Comics[];

  @OneToMany(() => Comments, (comment) => comment.user)
  @JoinColumn({ name: 'comment_id' })
  comments: Comments[];
}
