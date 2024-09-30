import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderController', () => {
  let controller: OrderController;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('should call createOrder on OrderService and return the result', async () => {
      const createOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '1234567890',
        tickets: [
          {
            film: '1',
            session: '1',
            day: '2024-09-30',
            daytime: '18:00',
            row: 1,
            seat: 1,
            price: 150,
            time: 3600,
          },
        ],
      };

      mockOrderService.createOrder.mockResolvedValue(
        'Successfully booked 1 tickets.',
      );

      const result = await controller.createOrder(createOrderDto);

      expect(result).toBe('Successfully booked 1 tickets.');
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(createOrderDto);
    });
  });
});
