import { Test, TestingModule } from '@nestjs/testing';
import { EnergyConsumptionController } from './energy-consumption.controller';
import { EnergyConsumptionService } from './energy-consumption.service';

describe('EnergyConsumptionController', () => {
  let controller: EnergyConsumptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnergyConsumptionController],
      providers: [EnergyConsumptionService],
    }).compile();

    controller = module.get<EnergyConsumptionController>(EnergyConsumptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
