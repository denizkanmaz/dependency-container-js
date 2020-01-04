//  Copyright (c) 2019-present, Deniz Kanmaz. All rights reserved.
//  This source code is licensed under the MIT Licence.
//  Use of this source code is governed by a license
//  that can be found in the LICENSE file.

//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  LICENSE file for more details.

import { DependencyContainer } from './DependencyContainer';

/**
 * Represents a service.
 * @class Service
 */
export class Service {

    private _name: string;
    private _initializer: (ioc: DependencyContainer) => any;
    private _type: string;

    /**
     * Initializes an instance of the [[Service]].
     * @param name - Name of the service.
     * @param type - Initialization type (singleton | transient).
     * @param initializer - Constructor
     */
    constructor(name: string, type: string, initializer: (ioc: DependencyContainer) => any) {
        this._name = name;
        this._type = type;
        this._initializer = initializer;
    }

    /**
     * Gets name of the service.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Gets initializer function.
     */
    public get initializer(): (ioc: DependencyContainer) => any {
        return this._initializer;
    }

    /**
     * Gets initialization type.
     */
    public get type(): string {
        return this._type;
    }
}
