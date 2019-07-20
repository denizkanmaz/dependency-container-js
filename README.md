# @caffeekit/dependency-container-js v1.0.0-beta1

"@caffeekit/dependency-container-js" is a simple IOC container pattern for NodeJS.

You can get the latest release from the official [npmjs.com feed](https://www.npmjs.com/package/caffeekit/dependency-container-js) or from the [github releases page](https://github.com/caffeekit/dependency-container-js/releases).

[![Build Status](https://travis-ci.com/caffeekit/dependency-container-js.svg?branch=master)](https://travis-ci.com/caffeekit/dependency-container-js)

## Getting Started

#### Importing the module and initializing an instance
```javascript
// Import the module.
const DIContainer = require('@caffeekit/Dependency-container-js');

// Initialize an instance
const diContainer = new DIContainer();
```

#### Registering services.
```javascript
// Registering a service as singleton.
diContainer.singleton('DummyService', () => new DummyService());

// Registering a service as transient.
diConteiner.singleton('DummyService', () => new DummyService());

```

#### Injecting IoC container to components.
```javascript
// Register component named 'DummyController'.
diConteiner.transient('DummyController', ioc => new DummyController(ioc));

```

#### Resolving a service
```javascript
// Resolve service named 'DummyController'.
const dummyController = diConteiner.resolve('DummyController');

```

#### Full demonstration:
```javascript
// Import the module.
const DIContainer = require('@caffeekit/Dependency-container-js');

// Import dependent modules.
const DummyController = require('./DummyController');
const DummyService = require('DummyService');

// Initialize an instance of the DIController.
const diContainer = new DIContainer();

// Register.
diContainer.transient('DummyService', () => new DummyService())
.transient('DummyContainer', ioc => new DummyContoller(ioc))
```

#### Content of DummyService.js:
```javascript
/**
 * DummyService is a dummy to demonstrate how to register a service for an IoC
 * container.
 * @class DummyService
 */
class DummyService { }

module.exports = DummyService;
```
#### Content of DummyController.js:
```javascript
/**
 * DummyController is a dummy component to demonstrate how to resolve
 * registered dependencies.
 * @class DummyController
 */
class DummyController {
	
	/**
	 * Initializes an instance of the DummyController.
	 * @param {DIContainer} ioc - Instance of the IoC container (Mandatory).
	 * @param {object} options - Initialization options (Optional).
	 */
	constructor(ioc, options){

		// Resolve necessary dependencies.
		this.__dummyService = ioc.resolve('DummyService');
		// this.__myOtherLovelyService = ioc.resolve('OtherLovelyService');

		// Assign options to the local field.
		this.__options = options;
	}
}

module.exports = DummyController;
```

## Versioning

Used [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/denizkanmaz/vanil-stopwatch-js/tags). 

## Authors

* **[Deniz Kanmaz (denizkanmaz@gmail.com)](https://github.com/denizkanmaz)** - *Initial work*

## License

This project is licensed under the MIT Licece - see the [LICENSE.md](LICENSE.md) file for details.

NOTICE: This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.