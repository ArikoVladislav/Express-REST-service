import { IPrice } from '../prices/price.interface';
import scheduleRepo  from './schedule.memory.repository';
import pricesRepo  from '../prices/price.memory.repository';

import { IBaseSchedule, ISchedule } from './schedule.interface';

const getAll =async (): Promise<ISchedule[]> => scheduleRepo.getAll();

const getById = async (id: string): Promise<ISchedule | null> => scheduleRepo.getById(id);

const getPricesByScheduleId = async (id: string): Promise<IPrice[] | null> => pricesRepo.getPriceIdByScheduleId(id);

const createSchedule = async (schedule: IBaseSchedule): Promise<ISchedule> => scheduleRepo.createSchedule(schedule);


const updateById = async (schedule: ISchedule): Promise<ISchedule | null> => scheduleRepo.updateById(schedule);


const deleteById = async (id: string): Promise<ISchedule| null>  => {
    const scheduleDeletable = await getById(id);
    scheduleRepo.deleteById(id);
    pricesRepo.deleteByScheduleId(id);
    return scheduleDeletable;
}


export default  {
    getAll,
    getById,
    getPricesByScheduleId,
    createSchedule,
    updateById,
    deleteById
}