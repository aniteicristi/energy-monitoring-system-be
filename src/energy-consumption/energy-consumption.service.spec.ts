import { Test, TestingModule } from '@nestjs/testing';
import { EnergyConsumptionService } from './energy-consumption.service';

describe('EnergyConsumptionService', () => {
  let service: EnergyConsumptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnergyConsumptionService],
    }).compile();

    service = module.get<EnergyConsumptionService>(EnergyConsumptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
