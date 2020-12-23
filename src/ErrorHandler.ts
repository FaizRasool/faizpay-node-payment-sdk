class ErrorHandler {
  private code;
  private message;

  constructor(code: (string | number)[]) {
    this.code = code[0];
    this.message = code[1];
  }

  public getCode(): string | number {
    return this.code;
  }

  public getMessage(): string | number {
    return this.message;
  }
}

export { ErrorHandler };
