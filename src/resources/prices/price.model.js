const {v4:uuid} = require('uuid');

class Price {
    constructor({
        id = uuid(),
        scheduleId = null,
        priceValue = '565',
        priceCurrency = '$',
        createdAt = Date('21.05.2020'),
        updatedAt = Date('30.09.2020')


    }={})
    {
        this.id = id;
        this.scheduleId = scheduleId;
        this.priceValue = priceValue;
        this.priceCurrency = priceCurrency;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static toResponse(price){
        const{
            id,
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt
        } = price;
        return{
            id,
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt

        };
    }
}
module.exports = Price;