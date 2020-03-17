import {BaseKernel} from "@carbonfrog/kernel/BaseKernel";
import {Server} from "@carbonfrog/kernel/http/Server";
import path from "path";

export default class BaseRouter {

    private _server: Server;

    public async setServer(kernel: BaseKernel, routerConfig: any[]){
        this._server = kernel.getServer();
        for (let routeName in routerConfig) {
            let [controllerFile, controllerMethod] = routerConfig[routeName].controller.split("::");
            let controllerFullPath = path.join(kernel.getRootDir(), controllerFile);
            let controllerName = controllerFile.split("/").pop();
            let controller = await import(controllerFullPath);
            let controllerInstance = new controller[controllerName]();
            controllerInstance.setContainer(kernel.getContainer());
            this._server.registerRoute(
                routerConfig[routeName].method,
                routerConfig[routeName].path,
                controllerInstance,
                controllerMethod
            );
        }
    }

    public get(path: string, controller: object, controllerMethod: string){
        this._server.registerRoute("GET", path, controller, controllerMethod);
    }

    public post(path: string, controller: object, controllerMethod: string){
        this._server.registerRoute("POST", path, controller, controllerMethod);
    }

    public put(path: string, controller: object, controllerMethod: string){
        this._server.registerRoute("PUT", path, controller, controllerMethod);
    }

    public delete(path: string, controller: object, controllerMethod: string){
        this._server.registerRoute("DELETE", path, controller, controllerMethod);
    }

    public patch(path: string, controller: object, controllerMethod: string){
        this._server.registerRoute("PATCH", path, controller, controllerMethod);
    }

    public head(path: string, controller: object, controllerMethod: string){
        this._server.registerRoute("HEAD", path, controller, controllerMethod);
    }

    public options(path: string, controller: object, controllerMethod: string){
        this._server.registerRoute("OPTIONS", path, controller, controllerMethod);
    }

    public trace(path: string, controller: object, controllerMethod: string){
        this._server.registerRoute("TRACE", path, controller, controllerMethod);
    }

    public connect(path: string, controller: object, controllerMethod: string){
        this._server.registerRoute("CONNECT", path, controller, controllerMethod);
    }

    private registerRoute(method: string, path: string, controller: object, controllerMethod: string){
        this._server.registerRoute(method, path, controller, controllerMethod);
    }
}
