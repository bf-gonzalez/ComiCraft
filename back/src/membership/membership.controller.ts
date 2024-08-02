import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import IMembership from './membership.interface';
import { ApiTags } from '@nestjs/swagger';
import { CreateMembershipDto } from './membership.dto';

@ApiTags('membership')
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  addMembership(@Body() createMembership: CreateMembershipDto) {
    console.log('membershipController=', createMembership);
    return this.membershipService.addMembership(createMembership);
  }

  @Get()
  getMerberships() {
    return this.membershipService.getMerberships();
  }
  /*  @Get('users')
  getUsets() {
    return this.membershipService.getUsers();
  } */

  /*   @Put(':id')
  updateMemberships(
    @Param('id') id: string,
    @Body() updateMembership: Partial<IMembership>,
  ): IMembership {
    const updated = this.membershipService.updateMembership(
      id,
      updateMembership,
    );
    if (!updated) {
      throw new NotFoundException(`Membership with ID ${id} not found.`);
    }
    return updated;
  }
} */
}
