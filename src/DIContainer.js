//  Copyright (c) 2019-present, Deniz Kanmaz. All rights reserved.
//  This source code is licensed under the MIT Licence.
//  Use of this source code is governed by a license
//  that can be found in the LICENSE file.

//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  LICENSE file for more details.

/**
 * DIContainer is a simple IOC container.
 * Allows to set dependent services and get them lazily when they needed.
 * @class DIContainer
 */
class DIContainer {

	/**
	 * Initializes an instance of the DIContainer.
	 */
	constructor() {
		this.__services = {};
		this.__instances = {};
	}

	/**
	 * Adds given service to the container as specified type of dependency.
	 * @param {string} name - Name of the service.
	 * @param {string} type - Dependency type (singleton, transient).
	 * @param {function} constructor - Constructor to be executed at resolve operation.
	 */
	__addService(name, type, constructor) {

		if (this.__services[name]) {
			throw new Error(`There is already a registered service with name "${name}".`);
		}

		this.__services[name] = {
			type,
			constructor
		}
	}

	/**
	 * Adds given service to the container as singleton.
	 * @param {string} name - Name of the service.
	 * @param {function} constructor - Constructor to be executed at resolve operation.
	 */
	singleton(name, constructor) {
		this.__addService(name, 'singleton', constructor);
		return this;
	}

	/**
	 * Adds given service to the container as transient.
	 * @param {string} name - Name of the service.
	 * @param {function} constructor - Constructor to be executed at resolve operation.
	 */
	transient(name, constructor) {
		this.__addService(name, 'transient', constructor);
		return this;
	}

	/**
	 * Resolves desired service with given name.
	 * @param {string} name - Name of the desired service.
	 */
	resolve(name) {
		let serv = this.__services[name];

		if (!serv) {
			throw new Error(`There is no service registered with name "${name}".`);
		}

		let inst = this.__instances[name];

		if (inst && serv.type === 'singleton') {
			return inst;
		}

		inst = serv.constructor(this);
		this.__instances[name] = inst;

		return inst;
	}
}


module.exports = DIContainer;