import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamService } from './team.service';

@ApiTags('Teams')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Patch(':id/payment-status')
  @ApiOperation({ summary: 'Update team payment status' })
  @ApiResponse({
    status: 200,
    description: 'Payment status updated successfully',
  })
  async updatePaymentStatus(@Param('id') id: string) {
    return this.teamService.togglePaymentStatus(id);
  }

  @Patch(':id/presence-status')
  @ApiOperation({ summary: 'Update team presence status' })
  @ApiResponse({
    status: 200,
    description: 'Presence status updated successfully',
  })
  async updatePresenceStatus(@Param('id') id: string) {
    return this.teamService.togglePresenceStatus(id);
  }

  @Patch(':id/coffee-break-status')
  @ApiOperation({ summary: 'Update team coffee break status' })
  @ApiResponse({
    status: 200,
    description: 'Coffee break status updated successfully',
  })
  async updateCoffeeBreakStatus(@Param('id') id: string) {
    return this.teamService.toggleCoffeeBreakStatus(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teams' })
  @ApiResponse({ status: 200, description: 'Return all teams' })
  async findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get team by id' })
  @ApiResponse({ status: 200, description: 'Return team by id' })
  async findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new team' })
  @ApiResponse({ status: 201, description: 'Team created successfully' })
  async create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update team' })
  @ApiResponse({ status: 200, description: 'Team updated successfully' })
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete team' })
  @ApiResponse({ status: 200, description: 'Team deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
