import { CellProps } from './interface'

// matrixStore mobx
import cellStore from 'store/cell/cellStore'

export class cellStyleJudge {
    public focusClass = {
        TOP: 'custom-focus-top',
        RIGHT: 'custom-focus-right',
        BOTTOM: 'custom-focus-bottom',
        LEFT: 'custom-focus-left'
    }

    constructor () {

    }

    public isTop(className: Array<string>, props: CellProps) {
        var myRow = props.cellKey.X,
            startRow = cellStore.selectInfo.startCell.X;

        if (myRow === startRow) {
            className.push(this.focusClass.TOP)
        }
        return className;
    }

    public isRight(className: Array<string>, props: CellProps) {
        var myCol = props.cellKey.Y,
            endCol = cellStore.selectInfo.endCell.Y;

        if (myCol === endCol) {
            className.push(this.focusClass.RIGHT)
        }
        return className;
    }

    public isBottom(className: Array<string>, props: CellProps) {
        var myRow = props.cellKey.X,
            endRow = cellStore.selectInfo.endCell.X;
        if (myRow === endRow) {
            className.push(this.focusClass.BOTTOM)
        }
        return className;
    }

    public isLeft(className: Array<string>, props: CellProps) {
        var myCol = props.cellKey.Y,
            startCol = cellStore.selectInfo.startCell.Y;

        if (myCol === startCol) {
            className.push(this.focusClass.LEFT)
        }

        return className;
    }

}