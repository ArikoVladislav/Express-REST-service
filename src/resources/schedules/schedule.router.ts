import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';


import Price from '../prices/price.model';
import Schedule from './schedule.model';

import schedulesService from './schedule.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
    catchErrors(async (_req: Request, res: Response) => {
        const schedules = await schedulesService.getAll();

        res.json(schedules.map(Schedule.toResponse));
    })
);

router.route(':/:id').get(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const schedules = await schedulesService.getById(id);

        if (schedules) {
            res.json(Schedule.toResponse(schedules));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'SCHEDULE_NOT_FOUND',
                    msg: 'Schedule not found'
                });
        }
    })
);

router.route('/:id/prices').get(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const schedules = await schedulesService.getPricesByScheduleId(id);

        if (schedules) {
            res.json(schedules.map((ord) => Price.toResponse(ord)));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRICES_NOT_FOUND',
                    msg: 'Prices not found'
                });
        }
    })
);

router.route('/').post(
    catchErrors(async (req: Request, res: Response) => {
        const {
            tourId,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        } = req.body;

        const schedule = await schedulesService.createSchedule({
            tourId: tourId || '',
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        });

        if (schedule) {
            res.status(StatusCodes.CREATED).json(Schedule.toResponse(schedule));
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    code: 'SCHEDULE_NOT_CREATED',
                    msg: 'Schedule not created'
                });
        }
    })
);

router.route(':/:id').put(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;
        const {
            tourId,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        } = req.body;

        const schedule = await schedulesService.updateById({
            id: id || '',
            tourId: tourId || '',
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        });

        if (schedule) {
            res.status(StatusCodes.OK).json(Schedule.toResponse(schedule));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'SCHEDULES_NOT_FOUND',
                    msg: 'Schedule not found'
                });
        }
    })
);

router.route('/:id').delete(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const schedule = await schedulesService.deleteById(id || '');

        if (!schedule) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'SCHEDULE_NOT_FOUND',
                    msg: 'Schedule not found'
                });
        }

        return res
            .status(StatusCodes.NO_CONTENT)
            .json({
                code: 'SCHEDULE_DELETED',
                msg: 'The Schedule has been deleted'
            });
    })
);

export default router;