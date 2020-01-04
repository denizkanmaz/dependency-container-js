# dependency-container-js v2.0.0-beta1

"dependency-container-js" is a simple IOC container pattern for NodeJS.

You can get the latest release from the official [npmjs.com feed](https://www.npmjs.com/package/dependency-container-js) or from the [github releases page](https://github.com/denizkanmaz/dependency-container-js/releases).

[![Build Status](https://travis-ci.org/denizkanmaz/dependency-container-js.svg?branch=master)](https://travis-ci.org/denizkanmaz/dependency-container-js)

## Getting Started

#### Importing the module and initializing an instance
```javascript
// Import the module.
const { DependencyContainer } = require('dependency-container-js');

// Initialize an instance
const diContainer = new DependencyContainer();
```

#### Registering services.
```javascript
// Registering a service as singleton.
diContainer.singleton('DummyService', () => new DummyService());

// Registering a service as transient.
diContainer.transient('DummyService', () => new DummyService());

```

#### Injecting IoC container to components.
```javascript
// Register component named 'DummyController'.
diContainer.transient('DummyController', ioc => new DummyController(ioc));

```

#### Resolving a service
```javascript
// Resolve service named 'DummyController'.
const dummyController = diContainer.resolve('DummyController');

```

### Full demonstration:

#### Content of DummyService.js:
```javascript
/**
 * DummyService is a dummy service to demonstrate how to register a service for an IoC
 * container.
 * @class DummyService
 */
class DummyService {

	/**
	 * Gets the necessary message.
	 */
	getMessage(){
		return 'Hello there!';
	}
}

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
     * @param {DependencyContainer} ioc - Instance of the IoC container (Mandatory).
     * @param {object} options - Initialization options (Optional).
     */
    constructor(ioc, options){
 
        // Resolve necessary dependencies.
        this.__dummyService = ioc.resolve('DummyService');
        // this.__myOtherLovelyService = ioc.resolve('OtherLovelyService');
 
        // Assign options to the local field.
        this.__options = options;
    }

    /**
     * Writes the necessary message to the console.
     */
    saySomething(){
        console.log(this.__dummyService.getMessage());
    }
}
 
module.exports = DummyController;
```

#### Content of index.js
```javascript
// Import the module.
const { DependencyContainer } = require('dependency-container-js');

// Import dependent modules.
const DummyController = require('./DummyController');
const DummyService = require('./DummyService');

// Initialize an instance of the DIController.
const diContainer = new DependencyContainer();

// Register.
diContainer.transient('DummyService', () => new DummyService())
	.transient('DummyController', ioc => new DummyController(ioc))


// Consider, this is another block of code from another js module.
const controller = diContainer.resolve('DummyController');
controller.saySomething();
```

## Versioning

Used [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/denizkanmaz/dependency-container-js/tags). 

## Authors

* **[Deniz Kanmaz (denizkanmaz@gmail.com)](https://github.com/denizkanmaz)** - *Initial work*

## License

This project is licensed under the MIT Licece - see the [LICENSE.md](LICENSE.md) file for details.

NOTICE: This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.