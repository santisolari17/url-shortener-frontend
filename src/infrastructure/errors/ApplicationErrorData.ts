export class ApplicationErrorData {
  public readonly type: string;
  public readonly messages: string[];
  public readonly statusCode: number;
  public readonly statusText: string;

  constructor(props: ApplicationErrorData) {
    this.type = props.type;
    this.messages = props.messages;
    this.statusCode = props.statusCode;
    this.statusText = props.statusText;
  }
}
