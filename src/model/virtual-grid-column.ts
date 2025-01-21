import { GridItemContent, VirtualGridItem } from "./virtual-grid-item";

export class VirtualGridColumn<T extends GridItemContent> {
  private readonly _items: VirtualGridItem<T>[] = [];

  constructor(
    private readonly _left = 0,
    private _top = 0,
  ) {}

  addItem(item: VirtualGridItem<T>) {
    this._items.push(item);
    item.top = this._top;
    item.left = this._left;
    this._top += item.size.height;
  }

  get top(): number {
    return this._top;
  }
}
