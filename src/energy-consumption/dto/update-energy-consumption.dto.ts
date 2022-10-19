import { PartialType } from '@nestjs/mapped-types';
import { CreateEnergyConsumptionDto } from './create-energy-consumption.dto';

export class UpdateEnergyConsumptionDto extends PartialType(CreateEnergyConsumptionDto) {}
