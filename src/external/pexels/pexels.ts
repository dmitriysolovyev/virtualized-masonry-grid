import { createClient, Photo, Photos, ErrorResponse } from "pexels";
import { GridItemSource, Pagination } from "../../model/gridItemSource";

export class Pexels implements GridItemSource<Photo> {
  private static pexels: Pexels;
  
  private readonly _client;
  private readonly _cache = new Map<number, Photo>;
  private readonly _photos: Photo[] = [];

  private constructor() {
    // TODO Remove key from source code
    this._client = createClient('YCjHHMeti1JU05y2mg2rniJ1ZYZXTMPkpmkeTHwQ2z6WydpWL1yQ5jLd'); 
  }

  static get instance() {
    if(!this.pexels) {
      this.pexels = new Pexels();
    }

    return this.pexels;
  }

  async getItem(id: number): Promise<Photo> {
    const photo = this._cache.get(id);
    if(!photo) {
      throw new Error('Photo is not found in cache');
    }

    return photo;
  }

  async getPage(pagination: Pagination): Promise<Photo[]> {
    try {
      return this.getFromCache(pagination);
    }
    catch {
      console.debug('Cache Miss');
    } 
  
    const result = await this._client.photos.curated({
      per_page: pagination.size,
      page: pagination.page,
    });
  
    if(!this.isPhotos(result)) {
      throw new Error(result.error);
    }
  
    console.log({
      pagination, result
    });
    this.updateCache(pagination, result.photos);
  
    return result.photos;
  }

  private isPhotos(object: ErrorResponse | Photos): object is Photos {
    if((object as ErrorResponse).error) {
      return false;
    }

    return true;
  }

  private getFromCache(pagination: Pagination): Photo[] {
    if(this._photos.length >= pagination.page * pagination.size) {
      return this._photos.slice((pagination.page - 1) * pagination.size, pagination.page * pagination.size);
    }

    throw new Error('Cache Miss');
  }

  private updateCache(pagination: Pagination, photos: Photo[]): void {
    const overlap = pagination.page * pagination.size - this._photos.length;
    const photosToAdd = photos.slice(pagination.size - overlap);
    
    this._photos.concat(...photosToAdd);
    photosToAdd.forEach((photo) => this._cache.set(photo.id, photo));
  }
}
