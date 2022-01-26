import { DogRepository } from '../interfaces/DogRepository';
import { Dog } from '../models/Dog';

export class DogRepositoryMemory implements DogRepository {

  dogs: Dog[];
  lastId: number;

  constructor() {
    this.dogs = [];
    this.lastId = 1;
  }

  list(): Dog[] {
    return this.dogs;
  }

  get(id: number): Dog | null {
    return this.dogs.find(dog => dog.id == id) || null;
  }

  add(dog: Dog): Dog {
    dog.id = this.lastId++;
    this.dogs.push(dog);
    return dog;
  }

  delete(id: number): boolean {
    const sizeBefore = this.dogs.length;

    this.dogs = this.dogs.filter(dog => dog.id != id);

    return this.dogs.length < sizeBefore;
  }

  update(id: number, dog: Dog): Dog {
    this.dogs = this.dogs.map(_dog => {
      if (_dog.id == id) {
        _dog = dog;
      }
      return _dog;
    });
    const updated = this.dogs.find(_dog => _dog.id == id);
    if (!updated) {
      throw new Error('Dog not found!');
    }
    return updated;
  }

}