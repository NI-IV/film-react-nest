import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    findAll: jest.fn().mockReturnValue([{ id: '1', title: 'Test Film' }]),
    findOne: jest.fn().mockReturnValue({ id: '1', title: 'Test Film' }),
    create: jest.fn().mockImplementation((createFilmDto: CreateFilmDto) => {
      return { id: '2', ...createFilmDto }; // возвращаем созданный фильм
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllFilms', () => {
    it('should return an array of films', async () => {
      const result = await controller.getAllFilms();
      expect(result).toEqual([{ id: '1', title: 'Test Film' }]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getFilmSchedule', () => {
    it('should return a single film by id', async () => {
      const result = await controller.getFilmSchedule('1');
      expect(result).toEqual({ id: '1', title: 'Test Film' });
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('createFilm', () => {
    it('should create a new film', async () => {
      const createFilmDto: CreateFilmDto = {
        title: 'title',
        description: 'description',
        director: 'director',
        rating: 5,
        image: 'image',
        cover: 'cover',
        tags: ['tag'],
        about: 'about',
        schedule: [],
      };
      const result = await controller.createFilm(createFilmDto);
      expect(result).toEqual({ id: '2', ...createFilmDto });
      expect(service.create).toHaveBeenCalledWith(createFilmDto);
    });
  });
});
