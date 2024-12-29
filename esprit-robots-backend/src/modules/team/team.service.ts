import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../core/base.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService extends BaseService<
  Team,
  CreateTeamDto,
  UpdateTeamDto
> {
  constructor(@InjectModel(Team.name) private readonly teamModel: Model<Team>) {
    super(teamModel);
  }
}
