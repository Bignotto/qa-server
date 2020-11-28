import { container } from "tsyringe";
import IEasyCodeProvider from "./EasyCodeProvider/models/IEasyCodeProvider";
import EasyCodeProvider from "./EasyCodeProvider/implementations/EasyCodeProvider";

container.registerSingleton<IEasyCodeProvider>(
  "EasyCodeProvider",
  EasyCodeProvider
);
