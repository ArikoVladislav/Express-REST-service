const {v4:uuid}= require('uuid');

class Tour {
  constructor({ 
    id = uuid(), 
    title = 'Tour1- Stolbci', 
    slug = 'user', 
    description = 'a beautiful place' , 
    isActive=true , 
    createdAt =  new Date('21.05.2020') , 
    updatedAt =  new Date('30.09.2020') 
  } = {}) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static toResponse(tour) {
    const { id, title, slug, description, isActive, createdAt, updatedAt } = tour;
    return { id, title, slug, isActive, description, createdAt, updatedAt };
  }
}

module.exports = Tour;
