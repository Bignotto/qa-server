import IEasyCodeProvider from "../models/IEasyCodeProvider";

export default class FakeEasyCodeProvider implements IEasyCodeProvider {
  async generateCode(payload: string): Promise<string> {
    return payload;
  }
}
