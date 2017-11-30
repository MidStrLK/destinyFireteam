/**
 * Created by eds on 23.11.2017.
 */
import { Injectable, ViewChild }            from '@angular/core';
import { Subject }                          from 'rxjs/Subject'

@Injectable()

export class InteractionService{
    public runGetActivity = new Subject<any>();
    public runRequestIsActive = new Subject<any>();

    getActivityFromMain(time: number){
        this.runGetActivity.next(time)
    }


    setRequestIsActive(requestIsActive: boolean){
        this.runRequestIsActive.next(requestIsActive)
    }

}