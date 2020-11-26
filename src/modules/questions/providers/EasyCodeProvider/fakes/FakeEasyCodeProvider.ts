import IEasyCodeProvider from "../models/IEasyCodeProvider";

export default class FakeEasyCodeProvider implements IEasyCodeProvider {
  generateCode(payload: string): string {
    return payload;
  }
}
