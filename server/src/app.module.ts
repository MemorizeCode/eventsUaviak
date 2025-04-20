import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PrismaService } from './service/prisma.service';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TokenService } from './service/token.service';
import { MaxSecretModule } from './max-secret/max-secret.module';
import { OtchetModule } from './otchet/otchet.module';
import { RecordModule } from './record/record.module';
import { SpesialModule } from './spesial/spesial.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './service/logging.service';

@Module({
  imports: [
    AuthModule,
    EventsModule,
    ReviewsModule,
    MaxSecretModule,
    OtchetModule,
    RecordModule,
    SpesialModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, TokenService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [PrismaService, TokenService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/events/createEvent', method: RequestMethod.POST },
        { path: '/api/events/updateEvent', method: RequestMethod.PUT },
        { path: '/api/events/deleteEvent', method: RequestMethod.DELETE },
        { path: '/api/record/getRecords', method: RequestMethod.GET },
        { path: '/api/reviews/deleteReviews', method: RequestMethod.DELETE },
        { path: '/api/spesial/createSpesial', method: RequestMethod.POST },
        { path: '/api/spesial/deleteSpesial', method: RequestMethod.DELETE },
        { path: '/api/spesial/updateSpecial', method: RequestMethod.PUT },
        { path: '/api/spesial/newSpecial', method: RequestMethod.POST },
      );
  }
}
