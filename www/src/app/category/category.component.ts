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
    constructor(private interactionService:  InteractionService,
                private  http: HttpClient){
        interactionService.runGetActivity.subscribe(data => this.getActivity(data));
    }

    /*ngOnInit(){

    }*/

    public getActivity(data){
        this.http.get('/api/activity?time=' + data).subscribe((data) => {
            this.arrayCell = this.getArrayCell(data);
            this.activityData = data;
        });
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
