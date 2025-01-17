export type GridItemSize = {
  width: number
  height: number
}

export type GridItemPosition = {
  left: number;
  top: number;
}

export type GridItemContent = {
  id: number;
} & GridItemSize


export class VirtualGridItem<T extends GridItemContent> {
  private readonly _size: GridItemSize;
  private readonly _position: GridItemPosition;

  constructor(private readonly _content: T, width: number) {
    const coef = width / this._content.width;
    
    this._size = {
      width,
      height: Math.round(this._content.height * coef)
    };

    this._position = {
      left: 0,
      top: 0
    };

    console.log({
      VirtualGridItem: '',
      _content,
      width,
      size: this._size,
    });
  }

  get id() {
    return this._content.id;
  }

  get size(): GridItemSize {
    return this._size;
  }

  set left(left: number) {
    this._position.left = left;
  }

  get left(): number {
    return this._position.left;
  }

  set top(top: number) {
    this._position.top = top;
  }

  get top(): number {
    return this._position.top;
  }
}