import {BaseComponent} from "@carbonfrog/kernel/commonjs/BaseComponent";
import {BaseComponentInterface} from "@carbonfrog/kernel/commonjs/BaseComponentInterface";
import * as path from "path";
import {ContainerBuilder, YamlFileLoader, JsFileLoader, JsonFileLoader, FileLoader} from "node-dependency-injection";

export class RouterComponent extends BaseComponent implements BaseComponentInterface{
    public load(containerBuilder: ContainerBuilder): void {
        this._componentConfigDir = "config";
        this._componentName = "router";
        this._componentDir = path.resolve(__dirname);
        this._componentConfigFilesFormat = "yml";
        this._fileLoader = new YamlFileLoader(containerBuilder);
        this._fileLoader.load(path.join(this._componentDir, this._componentConfigDir, "services.yml"));
    }
}
