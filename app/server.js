const express = require('express');
const path = require('path');
const { default: mongoose } = require('mongoose');
const { AllRoutes } = require('./routers/router');

module.exports = class Application {
	#app = express();
	#DB_URI;
	#PORT;
	constructor(port, db_uri) {
		this.#PORT = port;
		this.#DB_URI = db_uri;

		this.configApplication();
		this.connectToMongo();
		this.createServer();
		this.createRoutes();
		this.errorHandling();
	}

	configApplication() {
		this.#app.use(express.json());
		this.#app.use(express.urlencoded({ extended: true }));
		this.#app.use(express.static(path.join(__dirname, '..', 'public')));
	}

	createServer() {
		const http = require('http');
		http.createServer(this.#app).listen(this.#PORT, () => {
			console.info(`server started on http://localhost:${this.#PORT}`);
		});
	}

	connectToMongo() {
		mongoose.connect(this.#DB_URI, (error) => {
			if (!error) return console.info(`mongo started at ${this.#DB_URI}`);
			return console.info(`mongo failed to connect at ${this.#DB_URI}`);
		});
	}

	createRoutes() {
		this.#app.use(AllRoutes);
	}

	errorHandling() {
		this.#app.use((req, res, next) => {
			return res.status(404).json({
				statusCode: 404,
				message: 'آدرس مورد نظر یافت نشد',
			});
		});
		this.#app.use((err, req, res, next) => {
			const statusCode = err.status || 500;
			const message = err.message || 'Internal Server Error';

			return res.status(statusCode).json({
				statusCode,
				message,
			});
		});
	}
};
