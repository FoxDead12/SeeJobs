import { IMapperFactory } from "../interfaces/mappers";

export abstract class AbstractMapper<I, O> {

  constructor(protected _mapperFactory: IMapperFactory){}

  public abstract Map(inObject: I): O;

  public MapAsync(inObject: I): Promise<O>{
    return new Promise<O>((resolve) => {
      resolve(this.Map(inObject));
    });
  }

  public MapMany(inObjects: I[]): O[] {
    return inObjects.map(obj => this.Map(obj));
  }

  public async MapManyAsync(inObjects: I[]): Promise<O[]> {
    const outObjects: O[] = [];

    for(const key in inObjects){
      outObjects.push(await this.MapAsync(inObjects[key]));
    }

    return outObjects;
  }
}
