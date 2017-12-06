import { Component, Injectable, Input, Output, OnInit, EventEmitter  } from '@angular/core';

import { InteractionService }      from './shared/interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    buttonRun: string = 'START';
    buttonStop: string = 'STOP';
    buttonLabel: string = this.buttonRun;
    intervalId = null;
    timerId = null;
    timerCountDefault: string = '0.0';
    timerCount: string = '0.0';
    time: number = 20;
    requestIsActive: boolean = false;

    constructor(private interactionService: InteractionService) {
        interactionService.runRequestIsActive.subscribe(isActive => (this.requestIsActive = isActive));
    }

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

        /*if(this.buttonLabel === this.buttonStop){
            this.runCheckInterval();
        }*/
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
            if(!me.timerCount || !parseFloat(me.timerCount)) me.timerCount = me.timerInterval.toFixed(1);
            me.timerCount = (parseFloat(me.timerCount) - 100/1000).toFixed(1) ;
            if(parseFloat(me.timerCount) < 0.3){
                me.stopTimer();
            }
        }, 100);

        console.info('runTimer - ',this.timerId);
    }

    stopTimer(){
        console.info('stopTimer - ',this.timerId);
        clearInterval(this.timerId);
        this.timerCount = this.timerCountDefault;
    }

    restartTimer(){
        this.stopTimer();
        this.runTimer();
    }

    runCheckInterval(){
        let me = this;

        this.stopCheckInterval();
        this.checkFunction();
        this.restartTimer();

        this.intervalId = setInterval(function(){
            me.restartTimer();
            me.checkFunction()
        }, this.timerInterval*1000);
    }

    stopCheckInterval(){
        this.stopTimer();
        clearInterval(this.intervalId);
    }

    checkFunction(){
        this.interactionService.getActivityFromMain(this.time);
    }
}
