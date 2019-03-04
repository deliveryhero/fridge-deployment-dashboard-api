import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import * as serverless from 'aws-serverless-express';
import {AppModule} from './src/app.module';
import { ValidationPipe} from '@nestjs/common';
const express = require('express')();
import * as bodyParser from 'body-parser';
// import {config} from './src/application-configuration-factory';
let cachedServer: Server;

export const handle: Handler = (event: AWSLambda.APIGatewayEvent, context: Context) => {
    if (!cachedServer) {
        bootstrapServer().then(server => {
            cachedServer = server;
            return handleRequest(event, cachedServer, context);
        });
    } else {
        return handleRequest(event, cachedServer, context);
    }
};

async function bootstrapServer(): Promise<Server> {
    const app = await NestFactory.create(AppModule, express);
    app.enableCors();
    app.use(bodyParser.text());
    app.useGlobalPipes(new ValidationPipe({
        forbidNonWhitelisted: true,
    }));

    await app.init();
    return serverless.createServer(express);
}

function handleRequest(event: AWSLambda.APIGatewayEvent, server, context: Context) {
    return serverless.proxy(
        server,
        event,
        context
    );
}
