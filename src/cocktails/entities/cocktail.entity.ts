import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity.js';
import { CocktailIngredient } from '../../cocktail-ingredients/entities/cocktail-ingredient.entity.js';

@Entity('cocktails')
export class Cocktail {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 120, nullable: false })
  name: string;

  @Column({ name: 'category_id', type: 'integer', nullable: false })
  categoryId: number;

  @Column({ type: 'varchar', length: 8000, nullable: false })
  instructions: string;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Category, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @OneToMany(() => CocktailIngredient, (ci) => ci.cocktail)
  cocktailIngredients?: CocktailIngredient[];
}
