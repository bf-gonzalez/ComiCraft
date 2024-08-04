import { Injectable } from '@nestjs/common';
import { CreateMembershipDto, UpdateMembershipDto } from './membership.dto';
import { MembershipsRepository } from './membership.repository';
import { Membership } from './membership.entity';

@Injectable()
export class MembershipService {
  constructor(private readonly membershipsRepository: MembershipsRepository) {}

  addMembership(createMembership: CreateMembershipDto) {
    return this.membershipsRepository.addMembership(createMembership);
  }

  getMerberships() {
    return this.membershipsRepository.getMerberships();
  }

  getMembershipById(id: string) {
    return this.membershipsRepository.getMembershipById(id);
  }

  deletedMembership(id: string) {
    return this.membershipsRepository.deletedMembership(id);
  }

  updateMembership(id: string, updateMembershipDto: UpdateMembershipDto) {
    return this.membershipsRepository.updateMembership(id, updateMembershipDto);
  }
}
