import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Profile extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  name: string

  @Column({
    type: 'varchar',
    nullable: false,
    default:"https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
  })
  avatar: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  lastname: string

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100
  })
   instagram: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  phonenumber: string

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100
  })
   telegram: string

  @Column({
    type: 'boolean',
    nullable: false,
    default: true
  })
  gender: boolean

  @Column({
    type: 'timestamp',
    nullable: false
  })
  birthday: Date

  @CreateDateColumn()
   CREATED_AT: string

}
