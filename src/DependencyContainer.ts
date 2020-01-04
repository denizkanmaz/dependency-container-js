//  Copyright (c) 2019-present, Deniz Kanmaz. All rights reserved.
//  This source code is licensed under the MIT Licence.
//  Use of this source code is governed by a license
//  that can be found in the LICENSE file.

//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  LICENSE file for more details.

import { Instance } from './Instance';
import { Service } from './Service';

/**
 * DependencyContainer is a simple IOC container.
 * Allows to set dependent services and get them lazily when they needed.
 * @class DependencyContainer
 */
export class DependencyContainer {

    private readonly TRANSIENT = 'transient';
    private readonly SINGLETON = 'singleton';

    private services: Service[] = [];
    private instances: Instance[] = [];

    /**
     * Adds given service to the container as singleton.
     * @param {string} name - Name of the service.
     * @param {function} constructor - Constructor to be executed at resolve operation.
     */
    public singleton(name: string, constructor: (ioc: DependencyContainer) => any) {
        this.addService(name, this.SINGLETON, constructor);
        return this;
    }

    /**
     * Adds given service to the container as transient.
     * @param {string} name - Name of the service.
     * @param {function} constructor - Constructor to be executed at resolve operation.
     */
    public transient(name: string, constructor: (ioc: DependencyContainer) => any) {
        this.addService(name, this.TRANSIENT, constructor);
        return this;
    }

    /**
     * Resolves desired service with given name.
     * @param {string} name - Name of the desired service.
     */
    public resolve(name: string) {
        const serv = this.services.filter(x => x.name === name)[0];

        if (!serv) {
            throw new Error(`There is no service registered with name "${name}".`);
        }

        let inst = this.instances.filter(x => x.name === name)[0];

        if (inst && serv.type === this.SINGLETON) {
            return inst.objectInstance;
        }

        inst = serv.initializer(this);
        this.instances.push(new Instance(name, inst));

        return inst;
    }

    /**
     * Adds given service to the container as specified type of dependency.
     * @param {string} name - Name of the service.
     * @param {string} type - Dependency type (singleton, transient).
     * @param {function} constructor - Constructor to be executed at resolve operation.
     */
    private addService(name: string, type: string, constructor: (ioc: DependencyContainer) => any) {

        if (this.services.filter(x => x.name === name).length > 0) {
            throw new Error(`There is already a registered service with name "${name}".`);
        }

        this.services.push(new Service(name, type, constructor));
    }
}
