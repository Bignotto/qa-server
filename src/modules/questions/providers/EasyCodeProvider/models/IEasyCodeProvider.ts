export default interface IEasyCodeProvider {
  generateCode(payload: string): Promise<string>;
}
