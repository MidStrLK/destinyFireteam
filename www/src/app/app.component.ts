import { Component, Injectable, Input, Output, OnInit, EventEmitter  } from '@angular/core';

import { InteractionService }      from './shared/interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    buttonRun: string = 'RUN';
    buttonStop: string = 'STOP';
    buttonLabel: string = this.buttonRun;
    intervalId = null;
    timerId = null;
    timerCount: string = '';
    time: number = 20;

    constructor(private InteractionService: InteractionService) {}

    @Input() timerInterval: number = 10;

    onButtonRunClick($event: any, data: any){
        if(this.buttonLabel === this.buttonRun){
            this.runCheckInterval();
        }else{
            this.stopCheckInterval();
        }
        this.changeButtonLabel();
    }

    onChangeTimer(count){
        this.timerInterval = count;

        if(this.buttonLabel === this.buttonStop){
            this.runCheckInterval();
        }


    }

    onChangeTimeCount(time){
        this.time = time;
    }

    changeButtonLabel(){
        this.buttonLabel = (this.buttonLabel === this.buttonRun) ? this.buttonStop : this.buttonRun;
    }

    runTimer(){
        let me = this;

        this.timerId = setInterval(function(){
            if(!me.timerCount) me.timerCount = me.timerInterval.toFixed(1);
            me.timerCount = (Number(me.timerCount) - 100/1000).toFixed(1) ;
            if(parseFloat(me.timerCount) < 0.3){
                me.stopTimer();
            }
        }, 100)
    }

    stopTimer(){
        clearInterval(this.timerId);
        this.timerCount = '';
    }

    runCheckInterval(){
        let me = this;
        this.stopCheckInterval();
        this.checkFunction();
        this.runTimer();
        this.intervalId = setInterval(function(){
            me.runTimer();
            me.checkFunction()
        }, this.timerInterval*1000);
    }

    stopCheckInterval(){
        this.stopTimer();
        clearInterval(this.intervalId);
    }

    checkFunction(){
        this.InteractionService.getActivityFromMain(this.time);
    }
}
