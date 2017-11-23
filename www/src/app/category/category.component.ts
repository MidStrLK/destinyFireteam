/**
 * Created by eds on 22.11.2017.
 */
import { Component, OnInit } from '@angular/core'
import { HttpClient} from '@angular/common/http';

@Component({
    selector: 'category-table',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent  implements OnInit {
    activityData:any[];
    arrayCell:any[];

    constructor(private http: HttpClient){}

    ngOnInit(){
        this.http.get('/api/activity').subscribe((data) => {
            this.arrayCell = this.getArrayCell(data);
            this.activityData = data;

            console.info('this.arrayCell - ',this.arrayCell);
            console.info('this.activityData - ',this.activityData);
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
