import {Component, Input} from '@angular/core';

@Component({
    selector: 'data-table',
    template: `
    <div [class.table-responsive]="isResponsive">
        <table class="table table-striped table-bordered  dataTable" role="grid">
            <thead><th *ngFor="let col of columns">{{col.header}}</th></thead>
            <tbody>
            <tr *ngFor="let item of data" role="row" attr.data-index="{{data.indexOf(item)}}" >
                <td *ngFor="let col of columns">{{renderCell(item, col)}}</td>
            </tr>
            </tbody>
        </table>
    </div>`
})

export class DataTableComponent{

    @Input() isResponsive: boolean = true;
    @Input() data: object[];
    @Input() columns: object[];

    renderCell(item:any, col:any){
        const index = this.data.indexOf(item);
        let data;
        if("class" in col){

            if(col.class === 'serial'){
                data = index+1;
            }

        }else if("value" in col){
            data = typeof col.value == "function" ? col.value(item, index) : col.value;
        }else if("attribute" in col && col.attribute in item){
            // get data
            data = DataTableComponent.getData(item[col.attribute], col);
        }else{
            data = "نامشخص";
        }
        //format data
        if("format" in col){
            // todo : implement this method
            // data = this.formatData(data, col.format);
        }

        return "suffix" in col ? data+" "+col.suffix : data;
    }

    static getData(data:string, col:any){
        if("labels" in col && data in col.labels){
            if(typeof col.labels[data] == "string"){
                return col.labels[data];
            }else{
                return "color" in col.labels[data] ? `<span class="label label-${col.labels[data].color}">${col.labels[data].label}</span>` : col.labels[data].label ;
            }
        }else{
            return data;
        }
    }

    // formatData(data, format){
    //     if(typeof format == "string"){
    //
    //         switch (format){
    //             case "boolean" : return data == 1 ? "بله" : "خیر";
    //             case "currency" : return <FormattedNumber value={data} />; break;
    //             case "longDateTime" : return <FormattedDate value={data} format="longDateTime" />;
    //             case "shortDate" : return <FormattedDate value={data} format="shortDate" />;
    //         }
    //
    //     }
    // }

}