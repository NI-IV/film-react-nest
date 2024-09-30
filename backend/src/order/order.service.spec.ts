import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('OrderService', () => {
  let service: OrderService;

  const mockFilmRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: 'FilmRepository', useValue: mockFilmRepository },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully create an order', async () => {
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

    const filmDoc = {
      id: '1',
      schedule: [
        {
          id: '1',
          taken: '',
        },
      ],
    };

    mockFilmRepository.findOne.mockResolvedValue(filmDoc);
    mockFilmRepository.save.mockResolvedValue(filmDoc);

    const result = await service.createOrder(createOrderDto);

    expect(result).toBe('Successfully booked 1 tickets.');
    expect(mockFilmRepository.findOne).toHaveBeenCalledWith({
      where: { id: createOrderDto.tickets[0].film },
      relations: ['schedule'],
    });
    expect(mockFilmRepository.save).toHaveBeenCalledWith(filmDoc);
  });

  it('should throw NotFoundException if film is not found', async () => {
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

    mockFilmRepository.findOne.mockResolvedValue(null);

    await expect(service.createOrder(createOrderDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException if the seat is already taken', async () => {
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

    const filmDoc = {
      id: '1',
      schedule: [
        {
          id: '1',
          taken: '1:1',
        },
      ],
    };

    mockFilmRepository.findOne.mockResolvedValue(filmDoc);

    await expect(service.createOrder(createOrderDto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
