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
}

module.exports = DummyController;