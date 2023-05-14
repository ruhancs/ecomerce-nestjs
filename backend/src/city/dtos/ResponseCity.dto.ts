import { ResponseStateDto } from 'src/state/dtos/ResponseState.dto';
import { CityEntity } from '../entity/city.entity';

export class ResponseCityDto {
  name: string;
  state?: ResponseStateDto;

  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = city.state ? new ResponseStateDto(city.state) : undefined;
  }
}
