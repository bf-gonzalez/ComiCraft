import { Injectable } from '@nestjs/common';
import IMembership from './membership.interface';
import { CreateMembershipDto } from './membership.dto';
import { MembershipsRepository } from './membership.repository';

@Injectable()
export class MembershipService {
  constructor(private readonly membershipsRepository: MembershipsRepository) {}
  /*  private users = [
        {
          "id": "3fdb4763-e98a-4d3b-86d1-1a54629b6b4d",
          "name": "John Doe",
          "DOB": "1990-05-15",
          "email": "johndoe@example.com",
          "password": "securePassword123",
          "rol": true,
          "member_id": "08e0b693-2ece-4119-8f17-4ab7251a9195"
        },
        {
          "id": "c49f6729-d4c4-4e0b-9562-8f5f2469d60a",
          "name": "Jane Smith",
          "DOB": "1985-12-30",
          "email": "janesmith@example.com",
          "password": "password456",
          "rol": false,
          "member_id": "08e0b693-2ece-4119-8f17-4ab7251a9236"
        }
      ];

      private membership: IMembership[]=[
        {
        id: "08e0b693-2ece-4119-8f17-4ab7251a9195",
        user_id: "3fdb4763-e98a-4d3b-86d1-1a54629b6b4d",
        type: 'monthly',
        price: 49.99,
        created_at: new Date(),
        payment_date: new Date()
      },
      {
        id: "08e0b693-2ece-4119-8f17-4ab7251a9236",
        user_id: "c49f6729-d4c4-4e0b-9562-8f5f2469d60a",
        type: 'annual',
        price: 49.99,
        created_at: new Date(),
        payment_date: new Date()
      }
    
    ]; */

  addMembership(createMembership: CreateMembershipDto) {
    return this.membershipsRepository.addMembership(createMembership);
  }

  getMembershipById(id: string) {}

  getAllMembership() {}

  createMembership() {
    //No se si haga falta
  }
}
