import { IPrice, IBasePrice } from './price.interface';
import Price from './price.model';

const Prices: IPrice[] = []

const getAll = async (): Promise<IPrice[]> => Prices;

const getById = async (id: string): Promise<IPrice | null> => Prices.find((price) => price.id === id)|| null;;

const getPriceIdByScheduleId = async (scheduleId: string): Promise<IPrice[] | null>  => {
    const prices = Prices.filter((price) => price.scheduleId === scheduleId);
    return prices;
}


const createPrice = async ({
    scheduleId,
    priceValue,
    priceCurrency,
    createdAt,
    updatedAt
}: IBasePrice): Promise<IPrice> => {
    const price = new Price({
    scheduleId,
    priceValue,
    priceCurrency,
    createdAt,
    updatedAt
    })
    Prices.push(price);
    return price;
}

const updateById = async  ({
    id,
    scheduleId,
    priceValue,
    priceCurrency,
    createdAt,
    updatedAt
}: IPrice): Promise<IPrice | null> => {
    const pricePos = Prices.findIndex((price) => price.id === id);

    if (pricePos === -1) return null;

    const oldPrice = Prices[pricePos]

    const newPrice = {
        ...oldPrice,
        scheduleId,
        priceValue,
        priceCurrency,
        createdAt,
        updatedAt
    };

    Prices.splice(pricePos, 1, newPrice);
    return newPrice;

};
const deleteById = async (id: string): Promise<IPrice | null> => {
    const pricePos = Prices.findIndex((price) => price.id === id);

    if (pricePos === -1) return null;

    const priceDeletable = Prices[pricePos];

    Prices.splice(pricePos, 1);
    return priceDeletable;
}

const deleteByScheduleId = async (scheduleId: string): Promise<void> => {
    const schedules = Prices.filter((price) => price.scheduleId === scheduleId);

    await Promise.allSettled(schedules.map(async (price) => deleteById(price.id)))
}


export default {
    Prices,
    getAll,
    getById,
    getPriceIdByScheduleId,
    createPrice,
    updateById,
    deleteById,
    deleteByScheduleId
}