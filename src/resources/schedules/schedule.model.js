const {v4:uuid} = require('uuid');

class Schedule {
    constructor({
        id = uuid(),
        Tourid = null,
        isActive = true,
        startDate =new Date('20.01.2020'),
        endDate = new Date ('31.12.2020'),
        createdAt =  new Date('21.05.2020'),
        updatedAt = new Date('30.09.2020')

    }={})
    {
        this.id = id;
        this.Tourid = Tourid;
        this.isActive = isActive;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdAt =createdAt;
        this.updatedAt =updatedAt;
    }

    static toResponse(schedule){
        const{
            id,
            Tourid,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        } = schedule;
        return{
            id,
            Tourid,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt

        };
    }
}
module.exports = Schedule;