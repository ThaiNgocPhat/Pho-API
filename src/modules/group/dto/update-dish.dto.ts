// dto/update-dish.dto.ts
export class UpdateDishDto {
  quantity?: number;
  note?: string;
  toppings?: {
    toppingId: string;
    name: string;
    price: number;
  }[];
}
