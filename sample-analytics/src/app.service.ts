import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './events/create-user.event';

@Injectable()
export class AppService {
  private readonly analytics: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('handlerUserCreated-  ANALYTICS', data);
    this.analytics.push({
      ...data,
      timestamps: new Date(),
    });
  }

  getAnalytics() {
    return this.analytics;
  }
}
