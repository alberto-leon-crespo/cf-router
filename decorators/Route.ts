import {BaseController} from "@carbonfrog/kernel/BaseController";
import * as path from "path";

export const Route = (method: string, httpPath: string) => {
    return async (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const kernel = await import(path.join(path.resolve("."), process.argv[1]));
        const router = kernel._Container.get("router");
        if (descriptor instanceof Promise) {
            descriptor = await descriptor;
        }
        if (descriptor && descriptor.value) {
            const controller = class extends BaseController {
                // @ts-ignore
                public [descriptor.value.name]: unknown = descriptor.value;
            };
            const controllerInstance = new controller();
            controllerInstance.setContainer(kernel._Container);
            router.registerRoute(method, httpPath, controllerInstance, descriptor.value.name);
            return descriptor;
        }
        return descriptor;
    };
};
