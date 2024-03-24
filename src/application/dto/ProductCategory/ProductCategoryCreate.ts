import { IsDefined, MaxLength, MinLength } from "class-validator";

export default class ProductCategoryCreate {
  @IsDefined({ message: "O nome de uma categoria de produto é obrigatório" })
  @MinLength(5, { message: "O nome de uma categoria de produto deve possuir no mínimo 5 caracteres" })
  @MaxLength(255, { message: "O nome de uma categoria de produto deve possuir no máxmio 255 caracteres" })
  public name: string;
}
