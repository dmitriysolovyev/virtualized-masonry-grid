import createIntervalTree from "interval-tree-1d";
import { GridItemContent, VirtualGridItem } from "./virtualGridItem";

export type Interval = [number, number]

export class VirtualGridColumn<T extends GridItemContent> {
  private readonly _items: VirtualGridItem<T>[] = [];
  private readonly _intervals = new Map<string, number>();
  private readonly _tree;
  
  constructor(private readonly _left = 0, private _top = 0) {
     this._tree = createIntervalTree();
  }

  addItem(item: VirtualGridItem<T>) {
    this._items.push(item);
    item.top = this._top;
    item.left = this._left;
    this._intervals.set(this.getKeyForItem(item), this._items.length - 1);
    console.log({
      addItem: '',
      top: item.top,
      bottom: item.top + item.size.height
    });
    this._tree.insert([item.top, item.top + item.size.height]);

    this._top += item.size.height;
  }

  getItemsInInterval(interval: Interval): VirtualGridItem<T>[] {
    console.log({
      getItemsInInterval: '',
      interval,
    });
    const getIntervals = (point: number): Interval => {
      let result: Interval = [0, 0];
      this._tree.queryPoint(point, (intervals: Interval) => {
        result = intervals;
      });
      return result || [];
    };

    const start = getIntervals(interval[0]);
    const finish = getIntervals(interval[1]);
    console.log({
      getItemsInInterval: '',
      start,
      finish
    });

    const indexFirst = this._intervals.get(this.getKeyForInterval(start)) ?? 0;
    const indexLast = this._intervals.get(this.getKeyForInterval(finish)) ?? 0;

    return this._items.slice(indexFirst, indexLast + 1);
  }

  get top(): number {
    return this._top;
  }

  private getKeyForItem(item: VirtualGridItem<T>) {
    return `${item.top}-${item.top + item.size.height}`;
  }

  private getKeyForInterval(interval: Interval) {
    console.log({
      getKeyForInterval: '',
      interval,
    });
    return `${interval[0]}-${interval[1]}`;
  }
}