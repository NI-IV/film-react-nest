import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from './films.repository';
import { CreateFilmDto } from './dto/create-film.dto';

describe('FilmsService', () => {
  let service: FilmsService;

  const mockFilmsRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        { provide: FilmsRepository, useValue: mockFilmsRepository },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a film and return it', async () => {
    const createFilmDto: CreateFilmDto = {
      title: 'title',
      director: 'director',
      rating: 5,
      tags: ['tag'],
      image: 'image',
      cover: 'cover',
      about: 'about',
      description: 'description',
      schedule: [
        {
          daytime: new Date(),
          hall: 1,
          rows: 10,
          seats: 100,
          price: 150,
        },
      ],
    };

    const result = { id: 1, ...createFilmDto };
    mockFilmsRepository.create.mockResolvedValue(result);

    expect(await service.create(createFilmDto)).toEqual(result);
    expect(mockFilmsRepository.create).toHaveBeenCalledWith(createFilmDto);
  });

  it('should return an array of films', async () => {
    const result = [
      {
        id: 1,
        title: 'title',
        director: 'director',
        rating: 5,
        tags: ['tag'],
        image: 'image',
        cover: 'cover',
        about: 'about',
        description: 'description',
        schedule: [],
      },
    ];

    mockFilmsRepository.findAll.mockResolvedValue(result);

    expect(await service.findAll()).toEqual(result);
    expect(mockFilmsRepository.findAll).toHaveBeenCalled();
  });

  it('should return a film by ID', async () => {
    const result = {
      id: 1,
      title: 'title',
      director: 'director',
      rating: 5,
      tags: ['tag'],
      image: 'image',
      cover: 'cover',
      about: 'about',
      description: 'description',
      schedule: [],
    };

    mockFilmsRepository.findOne.mockResolvedValue(result);

    expect(await service.findOne('1')).toEqual(result);
    expect(mockFilmsRepository.findOne).toHaveBeenCalledWith('1');
  });
});
