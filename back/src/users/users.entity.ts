import { Comics } from 'src/comics/comics.entity';
import { Membership } from 'src/membership/membership.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];

  @OneToMany(() => Comics, (comic) => comic.user)
  comics: Comics[];
}
