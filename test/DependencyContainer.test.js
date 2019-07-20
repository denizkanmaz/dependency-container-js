const DependencyContainer = require('../src/DependencyContainer');
const DummyController = require('./DummyController');
const DummyService = require('./DummyService.js');

describe('DependencyContainer', () => {

	let diContainer = null;

	beforeEach(() => {
		diContainer = new DependencyContainer();
	});

	/* singleton */

	test('should register a service as singleton.', () => {
		diContainer.singleton('DummyService', () => new DummyService());
		const ds = diContainer.resolve('DummyService');

		expect(ds).toBeTruthy();
	});

	test('should get the same instance of singleton-registered service everytime.', () => {
		diContainer.singleton('DummyService', () => new DummyService());
		const ds1 = diContainer.resolve('DummyService');
		const ds2 = diContainer.resolve('DummyService');

		expect(ds1).toBe(ds2);
	});

	/* transient */

	test('should register a service as transient.', () => {
		diContainer.transient('DummyService', () => new DummyService());
		const ds = diContainer.resolve('DummyService');

		expect(ds).toBeTruthy();
	});

	test('should get new instance of transient-registered service everytime.', () => {
		diContainer.transient('DummyService', () => new DummyService());

		const ds1 = diContainer.resolve('DummyService');
		const ds2 = diContainer.resolve('DummyService');

		expect(ds1).not.toBe(ds2);
	});

	/* injection */

	test('should inject dependencies.', () => {
		diContainer.singleton('DummyController', ioc => new DummyController(ioc))
			.singleton('DummyService', () => new DummyService());

		const dc = diContainer.resolve('DummyController');
		const ds = diContainer.resolve('DummyService');

		expect(dc.__dummyService).toBe(ds);
	});

	/* Handled errors */

	test('should fails in case registering a service with same name.', () => {
		diContainer.transient('DummyService', () => new DummyService());

		expect(() => { diContainer.transient('DummyService', () => new DummyService()) })
			.toThrowError(new Error('There is already a registered service with name "DummyService".'));
	});

	test('should fails in case resolving an unregistered service.', () => {
		expect(() => diContainer.resolve('DummyService'))
			.toThrowError(new Error('There is no service registered with name "DummyService".'));
	});
})