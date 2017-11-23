/**
 * Created by eds on 23.11.2017.
 */
import { Injectable, ViewChild }            from '@angular/core';
import { Subject }                          from 'rxjs/Subject'

@Injectable()

export class InteractionService{
    public runGetActivity = new Subject<any>();

    getActivityFromMain(id: number){
        this.runGetActivity.next(id)
    }

}