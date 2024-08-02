import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMembershipDto } from './membership.dto';
import { PasswordInterceptor } from 'src/interceptors/password.interceptor';

@ApiTags('membership')
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  @HttpCode(201)
  addMembership(@Body() createMembership: CreateMembershipDto) {
    console.log('membershipController=', createMembership);
    return this.membershipService.addMembership(createMembership);
  }

  @Get()
  @HttpCode(200)
  @UseInterceptors(PasswordInterceptor)
  getMerberships() {
    return this.membershipService.getMerberships();
  }

  @Post('/prueba')
  Membership(@Body() data) {
    try {
      console.log('membershipController=', data);
      return data;
    } catch (error) {
      console.error;
    }
  }
}
