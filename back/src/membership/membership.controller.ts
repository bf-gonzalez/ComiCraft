import { Body, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';
import { MembershipService } from './membership.service';
import IMembership from './membership.interface';

@Controller('membership')
export class MembershipController {
    constructor (private readonly membershipService: MembershipService){}

    @Get('memberships')
    getMemberships(): IMembership[]{
        return this.membershipService.getAllMembership();
    }
    @Get('users')
    getUsets(){
        return this.membershipService.getUsers();
    }

    @Put(':id')
    updateMemberships(
        @Param('id') id: string,
        @Body() updateMembership: Partial<IMembership>,
    ): IMembership {
        const updated = this.membershipService.updateMembership(id, updateMembership);
        if(!updated){
            throw new NotFoundException(`Membership with ID ${id} not found.`);
        }
        return updated;
    } 
}
