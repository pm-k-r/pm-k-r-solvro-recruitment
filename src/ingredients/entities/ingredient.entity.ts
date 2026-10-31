import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 120, unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 2000, nullable: false })
  description: string;

  @Column({ name: 'is_alcohol', type: 'boolean', nullable: false })
  isAlcohol: boolean;

  @Column({ type: 'varchar', length: 500, nullable: false })
  photo: string;
}
