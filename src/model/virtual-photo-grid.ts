import { Photo } from "pexels";
import { GridItemSource } from "./grid-item-source.interface";
import { VirtualGridItem } from "./virtual-grid-item";
import { VirtualGrid } from "./virtual-grid";

export class VirtualPhotoGrid extends VirtualGrid<Photo> {
  private _init: Promise<void>;
  private _page = 1;
  private _pageSize = 20;

  constructor(
    private _gridItemSource: GridItemSource<Photo>,
    windowWidth: number,
    numberOfCol = 3,
  ) {
    super(windowWidth, numberOfCol);
    this._init = this.build();
  }

  async getVisibleItems(
    top: number,
    bottom: number,
  ): Promise<VirtualGridItem<Photo>[]> {
    const uniqueItems = new Set<number>();

    await this._init;

    const visibleItems = await super.getVisibleItems(top, bottom);
    const itemsNextPage = await super.getVisibleItems(
      bottom + 300,
      bottom + 600,
    );

    if (itemsNextPage.length === 0) {
      this._page++;
      this._init = this.build();
    }

    return visibleItems.filter((item) => {
      if (uniqueItems.has(item.id)) {
        return false;
      }
      uniqueItems.add(item.id);
      return true;
    });
  }

  private async build(page = this._page) {
    const photos = await this._gridItemSource.getPage({
      page,
      size: this._pageSize,
    });
    photos.forEach((photo) => {
      this.addItem(new VirtualGridItem<Photo>(photo, this._columnWidth));
    });
  }
}
