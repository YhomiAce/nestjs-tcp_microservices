import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './events/create-user.event';

@Injectable()
export class AppService {
  private readonly users: User[] = [];
  constructor(
    @Inject('COMMUNICATION')
    private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS')
    private readonly analyticsClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateUserDto) {
    this.users.push(createUserRequest);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.name, createUserRequest.email),
    );
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.name, createUserRequest.email),
    );
  }

  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
