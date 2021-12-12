const uuid = require('uuid');

class Tour {
  constructor({ 
    id = uuid(), 
    title = 'Tour1- Stolbci', 
    slug = 'user', 
    description = 'a beautiful place' , 
    isActive=true , 
    createdAt =  Date('21.05.2020') , 
    updatedAt =  Date('30.09.2020') 
  } = {}) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static toResponse(user) {
    const { id, title, slug, description, createdAt } = tour;
    return { id, title, slug, description, createdAt };
  }
}

module.exports = Tour;
