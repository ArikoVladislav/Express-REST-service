import { IBaseSchedule, ISchedule } from './schedule.interface';
import Schedule from './schedule.model';
import pricesRepo from '../prices/price.memory.repository';

const Schedules:ISchedule[] = [];

const getAll = async (): Promise<ISchedule[]> => Schedules;

const getById = async (id: string): Promise<ISchedule | null> => Schedules.find((schedule) => schedule.id === id) || null;;

const getSchedulesByTourId = async (tourId: string): Promise<ISchedule[]| null> => {
    const schedules = Schedules.filter((schedule) => schedule.tourId === tourId);
    return schedules;
}

const createSchedule = async ({
    tourId,
    isActive,
    startDate,
    endDate,
    createdAt,
    updatedAt
}: IBaseSchedule): Promise<ISchedule> => {
    const schedule = new Schedule({
        tourId,
        isActive,
        startDate,
        endDate,
        createdAt,
        updatedAt
    })
    Schedules.push(schedule);
    return schedule;
}

const updateById = async ({
    id,
    tourId,
    isActive,
    startDate,
    endDate,
    createdAt,
    updatedAt
}: ISchedule): Promise<ISchedule | null> => {
    const schedulePos = Schedules.findIndex((schedule) => schedule.id === id);

    if (schedulePos === -1) return null;

    const oldSchedule = Schedules[schedulePos];

    const newSchedule = {
        ...oldSchedule,
        id,
        tourId,
        isActive,
        startDate,
        endDate,
        createdAt,
        updatedAt
    };

    Schedules.splice(schedulePos, 1, newSchedule);
    return newSchedule;
}
const deleteById = async (id: string): Promise<ISchedule| null>  => {
    const schedulePos = Schedules.findIndex((schedule) => schedule.id === id);

    if (schedulePos === -1) return null;

    const scheduleDeletable = Schedules[schedulePos];

    Schedules.splice(schedulePos, 1);
    return scheduleDeletable;
}

const deleteByTourId = async (tourId: string): Promise<void> => {
    const schedules = Schedules.filter((schedule) => schedule.tourId === tourId);

    await Promise.allSettled(schedules.map(async (schedule) => {
        deleteById(schedule.id);
        pricesRepo.deleteByScheduleId(schedule.id);
    }))
}

export default  {
    Schedules:Schedules,
    getAll,
    getById,
    getSchedulesByTourId,
    createSchedule,
    deleteById,
    updateById,
    deleteByTourId

} 