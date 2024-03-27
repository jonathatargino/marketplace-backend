import { HttpError } from "../../domain/error/HttpError";

export default class Params {
  private _page: string;
  private _page_size: string;
  private _order: "ASC" | "DESC";

  constructor() {
    this._page = "0";
    this._page_size = "20";
    this._order = "ASC";
  }

  public get page() {
    return this._page;
  }

  public set page(value: string) {
    if (!value) {
      return;
    }

    if (isNaN(Number(value))) {
      throw new HttpError(400, "Número de página inválido ou mal formatado");
    }

    this._page = value;
  }

  public get page_size() {
    return this._page_size;
  }

  public set page_size(value: string) {
    if (!value) {
      return;
    }

    if (isNaN(Number(value))) {
      throw new HttpError(400, "Tamanho de página inválido ou mal formatado");
    }

    this._page_size = value;
  }

  public get order(): "ASC" | "DESC" {
    return this._order;
  }

  public set order(value: string) {
    if (!value) {
      return;
    }

    if (value !== "ASC" && value !== "DESC") {
      throw new HttpError(400, "Parâmetro de ordenação inválido ou mal formatado");
    }

    this._order = value;
  }
}
