import IEasyCodeProvider from "../models/IEasyCodeProvider";

export default class FakeEasyCodeProvider implements IEasyCodeProvider {
  generateCode(payload: string): string {
    console.log("EASY CODE PROVIDER --------------------------");
    return payload;
  }
}
