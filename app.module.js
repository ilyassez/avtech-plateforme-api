"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const api_module_1 = require("./api/api.module");
const nest_router_1 = require("nest-router");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const mail_service_1 = require("./common/services/mail/mail.service");
const configuration_1 = require("./config/configuration");
const actions_module_1 = require("./actions/actions.module");
const routes = [
    {
        path: '/api',
        module: api_module_1.ApiModule,
    },
    {
        path: '/auth',
        module: auth_module_1.AuthModule,
    },
    {
        path: '/actions',
        module: actions_module_1.ActionsModule,
    },
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.configuration],
            }),
            nest_router_1.RouterModule.forRoutes(routes),
            api_module_1.ApiModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('mongodb.uri'),
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            actions_module_1.ActionsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, mail_service_1.MailService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map