import * as menuRepo from '../../repo/menu.repo';
import { searchMenuByPriceRange, searchMenu } from '../../service/menu.service';

jest.mock('../../repo/menu.repo');
const menuRepoMock = jest.mocked(menuRepo, true);

const searchMenuResp = [
  {
    dishName: 'Chicken Soup',
    price: 15,
    restaurant: {
      id: 1,
      name: 'ABC resrestaurant'
    }
  }
];

describe('menu service - searchMenuByPriceRange', () => {
  it('should return menu based on price', async () => {
    menuRepoMock.searchMenuByPrice.mockResolvedValue(searchMenuResp);

    const params = {
      minPrice: 10,
      maxPrice: 20
    };

    const details = await searchMenuByPriceRange(params);
    expect(details).toMatchObject(searchMenuResp);
  });

  it('should return blank resp when record does not exists', async () => {
    menuRepoMock.searchMenuByPrice.mockResolvedValue([]);

    const params = {
      minPrice: 1000,
      maxPrice: 2000
    };

    const details = await searchMenuByPriceRange(params);
    expect(details).toMatchObject([]);
  });
});

describe('menu service - searchMenu', () => {
  it('should return menu details based on search term', async () => {
    menuRepoMock.search.mockResolvedValue(searchMenuResp);

    const params = {
      query: 'chi'
    };

    const details = await searchMenu(params);
    expect(details).toMatchObject(searchMenuResp);
  });

  it('should return blank respo when record record is not found', async () => {
    menuRepoMock.search.mockResolvedValue([]);

    const params = {
      query: 'sample'
    };

    const details = await searchMenu(params);
    expect(details).toMatchObject([]);
  });
});
