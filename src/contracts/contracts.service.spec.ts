import { Test, TestingModule } from '@nestjs/testing';

import { ProductTransactionService } from './ProductTransaction.service';

describe('ContractsService', () => {
  let service: ProductTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductTransactionService],
    }).compile();

    service = module.get<ProductTransactionService>(ProductTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
