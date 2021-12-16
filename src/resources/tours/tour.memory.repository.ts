import { IBaseTour, ITour } from './tour.interface';
import Tour from './tour.model';

const Tours: ITour[] = [];

const getAll = async (): Promise<ITour[]> => Tours;

const getById = async (id:string): Promise<ITour | null>   => Tours.find((tour) => tour.id === id) || null

const createTour = async ({
    title,
    slug,
    description,
    isActive,
    createdAt,
    updatedAt
  }: IBaseTour): Promise<ITour> => {
    const tour = new Tour({
      title,
      slug,
      description,
      isActive,
      createdAt,
      updatedAt
    })
    Tours.push(tour);
    return tour;
  }

  const updateById = async ({
    id,
    title,
    slug,
    description,
    isActive,
    createdAt,
    updatedAt
  }:ITour): Promise<ITour | null> => {
    const tourPos = Tours.findIndex((tour) => tour.id === id);
    if (tourPos === -1) return null;
  
    const oldTour = Tours[tourPos];
  
    const newTour = {
      ...oldTour,
      title,
      slug,
      description,
      isActive,
      createdAt,
      updatedAt
    };
  
    Tours.splice(tourPos, 1, newTour);
    return newTour;
  };
  const deleteById = async (id:string):Promise<ITour | null> => {
    const tourPos = Tours.findIndex((tour) => tour.id === id);
  
    if (tourPos === -1) return null;
  
    const tourDeletable = Tours[tourPos];
  
    Tours.splice(tourPos, 1);
    return tourDeletable;
  }

 export default  {
    Tours,
    getAll,
    getById,
    createTour,
    updateById,
    deleteById
  }