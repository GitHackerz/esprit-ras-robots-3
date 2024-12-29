import { Controller, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
}
