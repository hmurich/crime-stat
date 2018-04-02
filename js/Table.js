class CrimeTable{
    constructor(body_selector){
        this.body_dom = document.querySelector(body_selector);
        this.body_dom.innerHTML = '';
    }
    init(){
        this.obl_id = MAP.obl_id;

        this.data_1 = MAIN_DATA.data_total;
        this.data_2 = MAIN_DATA.data_total_last_1;
        this.data_3 = MAIN_DATA.data_total_last_2;

        this.parseData();
    }
    parseData(){
        let data = [];

        for (let region_id in this.data_1){
            if (this.obl_id == 0){
                if (region_id.length != 4)
                    continue;

                data.push([DICT['area'+region_id], this.data_1[region_id], this.data_2[region_id], this.data_3[region_id]]);
            }
            else {

                if (region_id.indexOf(this.obl_id.toString()) < 0)
                    continue;

                if (DICT['reg'+region_id] != undefined)
                    data.push([DICT['reg'+region_id], this.data_1[region_id], this.data_2[region_id], this.data_3[region_id]]);
            }
        }

        data.sort(function(a, b) {
            return b[1] - a[1];
        });

        this.buildTable(data);
    }
    buildTable(data){
        for (let key in data){
            let prir_1 = (100 - (100 * parseInt(data[key][2]) / parseInt(data[key][1]))).toFixed(2);
            let prir_2 = (100 - (100 * parseInt(data[key][3]) / parseInt(data[key][2]))).toFixed(2);
            this.body_dom.innerHTML += "<tr>"+
                                            "<td >"+data[key][0]+"</td>"+
                                            "<td >"+data[key][1]+"</td>"+
                                            "<td >"+prir_1+"</td>"+
                                            "<td >"+data[key][2]+"</td>"+
                                            "<td >"+prir_2+"</td>"+
                                            "<td >"+data[key][3]+"</td>"+
                                        "</tr>";
        }

        console.log(this.body_dom);
    }

}

CRIME_TABLE = new CrimeTable('#crime_table_body');
