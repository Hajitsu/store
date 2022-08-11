const express = require('express');
const path = require('path');
const { default: mongoose } = require('mongoose');
const { AllRoutes } = require('./routers/router');
const morgan = require('morgan');
const createHttpError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');

module.exports = class Application {
	#app = express();
	#DB_URI;
	#PORT;
	constructor(port, db_uri) {
		this.#PORT = port;
		this.#DB_URI = db_uri;

		this.configApplication();
		this.connectToMongo();
		this.initRedis();
		this.createServer();
		this.createRoutes();
		this.errorHandling();
	}

	configApplication() {
		this.#app.use(cors());
		this.#app.use(morgan('dev'));
		this.#app.use(express.urlencoded({ extended: true }));
		this.#app.use(express.json());
		this.#app.use(express.static(path.join(__dirname, '..', 'public')));
		this.#app.use(
			'/api-doc',
			swaggerUI.serve,
			swaggerUI.setup(
				swaggerJSDoc({
					swaggerDefinition: {
						openapi: '3.0.0',
						info: {
							title: 'Hajitsu Store',
							version: '1.0.0',
							description: 'development store',
						},
						servers: [
							{
								url: 'http://localhost:1414',
							},
						],
					},

					apis: ['./app/routers/**/*.js'],
				})
			)
		);
	}

	createServer() {
		const http = require('http');
		http.createServer(this.#app).listen(this.#PORT, () => {
			console.info(`server started on http://localhost:${this.#PORT}`);
		});
	}

	connectToMongo() {
		mongoose.connect(this.#DB_URI);

		mongoose.connection.on('connected', () => {
			console.info(`mongo started at ${this.#DB_URI}`);
		});
		mongoose.connection.on('disconnected', () => {
			console.warn(`mongo disconnected from ${this.#DB_URI}`);
		});
		mongoose.connection.on('error', (error) => {
			console.error(`mongo failed to connect at ${this.#DB_URI}`);
			console.error(error.message);
		});

		process.on('SIGINT', () => {
			mongoose.connection.close(() => {
				console.log('Mongoose default connection disconnected through app termination');
				process.exit(0);
			});
		});
	}

	initRedis() {
		require('./utils/redisClient');
	}

	createRoutes() {
		this.#app.use(AllRoutes);
	}

	errorHandling() {
		this.#app.use((req, res, next) => {
			next(createHttpError.NotFound('آدرس مورد نظر یافت نشد'));
		});
		this.#app.use((err, req, res, next) => {
			const internalServerError = createHttpError.InternalServerError();
			const statusCode = err.status || internalServerError.status;
			const message = err.message || internalServerError.message;

			return res.status(statusCode).json({
				errors: {
					statusCode,
					message,
				},
			});
		});
	}
};
