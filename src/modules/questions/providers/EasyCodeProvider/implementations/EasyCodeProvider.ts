import IEasyCodeProvider from "../models/IEasyCodeProvider";

class EasyCodeProvider implements IEasyCodeProvider {
  generateCode(payload: string): string {
    const code = ("00000" + Math.floor(Math.random() * 99999)).slice(-5);
    return code;
  }
}

export default EasyCodeProvider;
