import { expect } from 'chai'

import util from 'store/matrix/util'

describe('Matrix store util 工具类', () => {

    describe('buildMatrixModel 构建n*n矩阵', () => {
        it('buildMatrixMergeCell方法', () => {
            const COL = 10,
                  ROW = 5;

            const cellModels = util.buildMatrixModel(COL, ROW)
            
            // 一共10列
            expect(cellModels.length).to.be.equal(COL)
            
            // 每一行长度都是5
            cellModels.forEach(row => {
                expect(row.length).to.be.equal(ROW)
            })
        })
    })
})