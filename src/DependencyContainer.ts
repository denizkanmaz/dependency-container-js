//  Copyright (c) 2019-present, Deniz Kanmaz. All rights reserved.
//  This source code is licensed under the MIT Licence.
//  Use of this source code is governed by a license
//  that can be found in the LICENSE file.

//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  LICENSE file for more details.

/**
 * DependencyContainer is a simple IOC container.
 * Allows to set dependent services and get them lazily when they needed.
 * @class DependencyContainer
 */
export default class DependencyContainer {

	/**
	 * Initializes an instance of the DependencyContainer.
	 */
	constructor() { }

	private services: Service[];
	private instances: any[];

	/**
	 * Adds given service to the container as specified type of dependency.
	 * @param {string} name - Name of the service.
	 * @param {string} type - Dependency type (singleton, transient).
	 * @param {function} constructor - Constructor to be executed at resolve operation.
	 */
	private addService(name: string, type: string, constructor: (ioc: DependencyContainer) => any) {

		if (this.services.filter(x => x.name === name).length === 0) {
			throw new Error(`There is already a registered service with name "${name}".`);
		}

		this.services.push(new Service(name, type, constructor));
	}

	/**
	 * Adds given service to the container as singleton.
	 * @param {string} name - Name of the service.
	 * @param {function} constructor - Constructor to be executed at resolve operation.
	 */
	singleton(name: string, constructor: (ioc: DependencyContainer) => any) {
		this.addService(name, 'singleton', constructor);
		return this;
	}

	/**
	 * Adds given service to the container as transient.
	 * @param {string} name - Name of the service.
	 * @param {function} constructor - Constructor to be executed at resolve operation.
	 */
	transient(name: string, constructor: (ioc: DependencyContainer) => any) {
		this.addService(name, 'transient', constructor);
		return this;
	}

	/**
	 * Resolves desired service with given name.
	 * @param {string} name - Name of the desired service.
	 */
	resolve(name: string) {
		let serv = this.services.filter(x => x.name === name)[0];

		if (!serv) {
			throw new Error(`There is no service registered with name "${name}".`);
		}

		let inst = this.instances.filter(x => x.name === name)[0];

		if (inst && serv.type === 'singleton') {
			return inst;
		}

		inst = serv.initializer(this);
		this.instances.push(new Instance(name, inst));

		return inst;
	}
}

class Service {

	constructor(name: string, type: string, initializer: (ioc: DependencyContainer) => any) {
		this._name = name;
		this._initializer = initializer;
		this._type = type;
	}

	private _name: string;
	private _initializer: (ioc: DependencyContainer) => any;
	private _type: string;

	public get name(): string {
		return this._name;
	}

	public get initializer(): (ioc: DependencyContainer) => any {
		return this._initializer;
	}

	public get type(): string {
		return this._type;
	}
}

class Instance {
	constructor(name: string, objectInstance: any) {
		this._name = name;
		this._objectInstance = objectInstance;
	}

	private _name: string;
	private _objectInstance: any;

	public get name(): string {
		return this._name;
	}

	public get objectInstance(): any {
		return this._objectInstance;
	}
}
