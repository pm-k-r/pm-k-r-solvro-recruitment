import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from 'typeorm';
import { Cocktail } from './cocktail.entity.js';
import { Ingredient } from '../../ingredients/entities/ingredient.entity.js';

export enum Unit {
  ML = 'ml',
  DROP = 'drop',
  DASH = 'dash',
  G = 'g',
  PIECE = 'piece',
}

@Entity('cocktail_ingredients')
export class CocktailIngredient {
  @PrimaryColumn({ name: 'cocktail_id', type: 'int' })
  cocktailId: number;

  @PrimaryColumn({ name: 'ingredient_id', type: 'int' })
  ingredientId: number;

  @Column({ type: 'real', nullable: false })
  amount: number;

  @Column({ type: 'enum', enum: Unit, enumName: 'unit_enum' })
  unit: Unit;

  @ManyToOne(
    () => Cocktail,
    (cocktail: Cocktail) => cocktail.cocktailIngredients,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'cocktail_id' })
  cocktail?: Relation<Cocktail>;

  @ManyToOne(() => Ingredient, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient?: Ingredient;
}
