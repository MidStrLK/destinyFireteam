import { Component, Injectable, Input, Output, OnInit, EventEmitter  } from '@angular/core';

import { InteractionService }      from './shared/interaction.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    buttonRun: string = 'START';
    buttonStop: string = 'STOP';
    buttonClearLabel: string = 'Очистить';
    buttonReviewLabel: string = 'Отзыв';
    buttonLabel: string = this.buttonRun;
    intervalId = null;
    timerId = null;
    timerCountDefault: string = '0.0';
    timerCount: string = '0.0';
    time: number = parseInt(localStorage.getItem('time')) || 20;
    requestIsActive: boolean = false;
    isReviewButtonDisabled: boolean = true;

    constructor(private interactionService: InteractionService,
                private  http: HttpClient) {
        interactionService.runRequestIsActive.subscribe(isActive => (this.requestIsActive = isActive));
    }

    @Input() timerInterval: number = parseInt(localStorage.getItem('timerInterval')) || 10;

    onButtonRunClick($event: any, data: any){
        if(this.buttonLabel === this.buttonRun){
            this.runCheckInterval();
        }else{
            this.stopCheckInterval();
        }

        this.changeButtonLabel(false);
    }

    onButtonClearClick($event: any){
        this.stopCheckInterval();
        this.changeButtonLabel(this.buttonRun);
        this.clearFunction();
    }


    onChangeTimer(count){
        this.timerInterval = count;
        localStorage.setItem('timerInterval', count);
    }

    onChangeTimeCount(time){
        this.time = time;
        localStorage.setItem('time', time);
    }

    onChangeReview(text){
        this.isReviewButtonDisabled = !text;
    }

    onButtonReviewClick(event, inputElem){
        const value = inputElem.value;

        inputElem.value = '';
        this.isReviewButtonDisabled = true;

        if(value){
            console.info('value - ',value);
            this.http.post('/api/review', {text: value}).subscribe((data) => {
                console.log('data - ', data);
            });
        }
    }

    changeButtonLabel(label){
        this.buttonLabel = label || ((this.buttonLabel === this.buttonRun) ? this.buttonStop : this.buttonRun);
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

    clearFunction(){
        this.interactionService.clearActivityFromMain();
    }
}
