//  Copyright (c) 2019-present, Deniz Kanmaz. All rights reserved.
//  This source code is licensed under the MIT Licence.
//  Use of this source code is governed by a license
//  that can be found in the LICENSE file.

//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  LICENSE file for more details.

/**
 * Represents an instance of a service.
 * @class Instance
 */
export class Instance {

    private _name: string;
    private _objectInstance: any;

    /**
     * Initializes an instance of the [[Instance]]
     * @param name - Name of the service.
     * @param objectInstance - Object instance.
     */
    constructor(name: string, objectInstance: any) {
        this._name = name;
        this._objectInstance = objectInstance;
    }

    /**
     * Gets name of the service.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Gets object instance.
     */
    public get objectInstance(): any {
        return this._objectInstance;
    }
}
