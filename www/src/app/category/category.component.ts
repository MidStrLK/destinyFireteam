/**
 * Created by eds on 22.11.2017.
 */
import { Component } from '@angular/core'
import { HttpClient} from '@angular/common/http';

import { InteractionService }      from '../shared/interaction.service';

@Component({
    selector: 'category-table',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent {
    activityData: any;
    arrayCell:any[];
    hoveredArray: any[] = [];
    hoveredParameter: string = 'link';
    vizitedObject: any = {};
    vizitedClass: string[] = ['vizited-new', 'vizited-old', 'vizited-read'];

    constructor(private interactionService:  InteractionService,
                private  http: HttpClient){
        interactionService.runGetActivity.subscribe(time => this.getActivity(time));
        interactionService.clearActivity.subscribe(data => this.clearActivity(data));
    }

    /*ngOnInit(){

    }*/

    public getActivity(time){
        this.interactionService.setRequestIsActive(true);

        this.http.get('/api/activity?time=' + time).subscribe((data) => {
            this.setVizitedObject(data);
            this.arrayCell = this.getArrayCell(data);
            this.activityData = this.prepareActivityData(data);
            console.info('this.activityData - ',this.activityData);
            this.interactionService.setRequestIsActive(false);
        });
    }

    prepareActivityData(data: any){
        let arr = [];

        data.forEach(item => {
            if(item && item['activity'] && item['activity'].length) arr.push(item);
        });

        return arr;
    }

    clearActivity(data: any){
        this.arrayCell = null;
        this.activityData = null;
        this.vizitedObject = {};
    }

    setVizitedObject(data){
        data.forEach(cathegory => cathegory['activity'].forEach(val => {
            if(!this.vizitedObject[val.link]){
                this.vizitedObject[val.link] = this.vizitedClass[0];
            }else if(this.vizitedObject[val.link] !== this.vizitedClass[2]){
                this.vizitedObject[val.link] = this.vizitedClass[1];
            }
        }));
    }

    onMouseOver(event, data){
        if(!data || !data[this.hoveredParameter]) return;

        const hoveredParameter = data[this.hoveredParameter];

        this.vizitedObject[hoveredParameter] = this.vizitedClass[2];
    }

    getArrayCell(arr){
        let count = 0,
            result = [];

        arr.forEach(function(val){
            if(val.activity.length > count) count = val.activity.length;
        });

        for(var i = 0; i < count; i++){
            result.push(i);
        }

        return result
    }
}
