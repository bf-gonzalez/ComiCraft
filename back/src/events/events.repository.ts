import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './events.entity';
import { CreateEventDto } from './dto/events.dto';

export interface FormattedEvent extends Events {
    eventDate: string;
}

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
  ) {}

  async getEvents(): Promise<Events[]> {
    return await this.eventsRepository.find();
  }

  async getEventById(id: string): Promise<Events> {
    return await this.eventsRepository.findOneBy({ id });
  }

  async createEvent(createEventDto:CreateEventDto){
    const event = this.eventsRepository.create(createEventDto);
    const savedEvent = await this.eventsRepository.save(event);

    const formattedEvent = {...savedEvent,date: savedEvent.date.toISOString().split('T')[0],};
  
    
    return formattedEvent
  }

  async updateEvent(
    id: string,
    updateEventDto: CreateEventDto,
  ): Promise<Events> {
    await this.eventsRepository.update(id, updateEventDto);
    return await this.eventsRepository.findOneBy({ id });
  }

  async deleteEvent(id: string): Promise<Events> {
    const event = await this.eventsRepository.findOneBy({ id });
    if (event) {
      await this.eventsRepository.remove(event);
      return event;
    }
    return null;
  }
}