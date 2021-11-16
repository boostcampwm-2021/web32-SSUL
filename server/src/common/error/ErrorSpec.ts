export class ErrorSpec {
  code: number;
  description: string;

  constructor(code: number, description: string) {
    this.code = code;
    this.description = description;
  }
}
