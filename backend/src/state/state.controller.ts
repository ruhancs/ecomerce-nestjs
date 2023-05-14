import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entity/state.entity';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async getAllStates(): Promise<StateEntity[]> {
    return this.stateService.getAllState();
  }
}