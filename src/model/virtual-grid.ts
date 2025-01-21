// @ts-expect-error Old lib
import createIntervalTree from "interval-tree-1d";
import { VirtualGridColumn } from "./virtual-grid-column";
import { GridItemContent, VirtualGridItem } from "./virtual-grid-item";

export type Interval = [number, number];

export class VirtualGrid<T extends GridItemContent> {
  protected readonly _columns: VirtualGridColumn<T>[];
  protected readonly _columnWidth: number;
  protected readonly _intervals = new Map<string, VirtualGridItem<T>[]>();
  protected readonly _tree;

  constructor(windowWidth: number, numberOfCol = 3) {
    this._columnWidth = Math.round(windowWidth / numberOfCol);
    this._columns = [...Array(numberOfCol)].map(
      (_, index) => new VirtualGridColumn(index * this._columnWidth),
    );
    this._tree = createIntervalTree();
  }

  async getVisibleItems(
    top: number,
    bottom: number,
  ): Promise<VirtualGridItem<T>[]> {
    const newItems: VirtualGridItem<T>[] = [];

    const items = this.getItemsInInterval([top, bottom]);
    items.forEach((item) => {
      newItems.push(item);
    });

    return newItems;
  }

  getHeight(): number {
    const tops = this._columns.map((column) => column.top);

    return Math.max(...tops);
  }

  addItem(item: VirtualGridItem<T>): number {
    const column = this.getColumnWithMinTop();
    column.addItem(item);

    const intervalKey = this.getKeyForItem(item);
    const interval = this._intervals.get(intervalKey) || [];
    interval.push(item);
    this._intervals.set(intervalKey, interval);

    this._tree.insert([item.top, item.top + item.size.height]);

    return column.top;
  }

  getItemsInInterval(interval: Interval): VirtualGridItem<T>[] {
    const getIntervals = (interval: Interval): Interval[] => {
      const result: Interval[] = [];
      this._tree.queryInterval(
        interval[0],
        interval[1],
        (interval: Interval) => {
          result.push(interval);
        },
      );

      return result || [];
    };

    const intervals = getIntervals(interval);
    const items = intervals.map((interval) => {
      return this._intervals.get(this.getKeyForInterval(interval)) || [];
    });

    return items.flat();
  }

  private getColumnWithMinTop(): VirtualGridColumn<T> {
    let minColumn = this._columns[0];
    this._columns.forEach((column) => {
      if (column.top < minColumn.top) {
        minColumn = column;
      }
    });

    return minColumn;
  }

  private getKeyForInterval(interval: Interval) {
    return `${interval[0]}-${interval[1]}`;
  }

  private getKeyForItem(item: VirtualGridItem<T>) {
    return `${item.top}-${item.top + item.size.height}`;
  }
}
