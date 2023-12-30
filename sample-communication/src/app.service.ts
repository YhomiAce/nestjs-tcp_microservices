import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './event/create-user.event';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleCreateUserEvent(data: CreateUserEvent) {
    console.log('Handle User Created - COMMUNICATIONS', data);
  }
}
