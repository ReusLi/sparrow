import { observable } from 'mobx';

export class MatrixMobx {
    @observable id:number = 1;
  
    constructor () {
      
    }

    get idVal() {
      return this.id
    }

  }