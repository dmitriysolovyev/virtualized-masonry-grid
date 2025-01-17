import { Photo } from "pexels";
import { GridItemSource } from "./gridItemSource";
import { VirtualGridColumn } from "./virtualGridColumn";
import { VirtualGridItem } from "./virtualGridItem";

export class VirtualPhotoGrid {
  private readonly _columns: VirtualGridColumn<Photo>[];
  private readonly _columnWidth: number;
  private readonly _init: Promise<void>;
  
  constructor(private _gridItemSource: GridItemSource<Photo>, windowWidth: number, numberOfCol = 3) {
    this._columnWidth = Math.round(windowWidth / numberOfCol);
    console.log({
      _columnWidth: this._columnWidth
    });
    this._columns = [...Array(numberOfCol)].map((_, index) => new VirtualGridColumn(index * this._columnWidth));
    this._init = this.build();
  }

  async getVisible(top: number, height: number): Promise<VirtualGridItem<Photo>[]> {
    console.log({
      top, height
    });
    await this._init;
    const items: VirtualGridItem<Photo>[] = [];
    this._columns.forEach(column => items.push(...column.getItemsInInterval([top, top + height]))); 
    console.log({
      getVisible: '',
      items,
    });
    return items;
  }

  private async build() {
    // restrict by 50 photos
    // TODO remove restriction
    const photos = await this._gridItemSource.getPage({ page: 1, size: 50 });
    photos.forEach(photo => {
      const column = this.getColumnWithMinTop();
      // width is hardcoded
      column.addItem(new VirtualGridItem<Photo>(photo, this._columnWidth));
    });
  }

  private getColumnWithMinTop(): VirtualGridColumn<Photo> {
    let minColumn = this._columns[0];
    this._columns.forEach((column) => {
      if(column.top < minColumn.top) {
        minColumn = column;
      }
    });

    return minColumn;
  }
}
