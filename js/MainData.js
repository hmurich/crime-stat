class MainData {
    constructor(){
        this.type = 'all';
        this.data = {};
    }
    getData(date, type, ar_art){
        date = new Date(date);
        let d = addZeros(date.getDate(), 2);
        let m = addZeros((date.getMonth() + 1), 2);
        let y = date.getFullYear();

        let where = ""
        if (type != 45){
            where += "CRIME_CODE ='"+type+"' ";
        }
        else if (ar_art.length > 0){
            where += 'CRIME_CODE IN (';
            for (let k in ar_art){
                where += "'"+ar_art[k]+"',";
            }
            where = where.substring(0, where.length - 1);
            where += ') ';
        }
       

        where += "AND DATE_REP = DATE '"+y+"-"+m+"-"+d+"'";


        this.data = {};
        this.data_total = {};
        this.data_10 = {};
        this.data_total_last_1 = {};
        this.data_total_last_2 = {};

        let obj = this;
        $.get( "http://infopublic.pravstat.kz:8399/arcgis/rest/services/stat/MapServer/1/query?f=pjson&where="+where+"&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=K%2CK10%2CCODE%2CNAME%2CLAST_K%2CBEFORE_LAST_K&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&returnDistinctValues=false", function( data ) {
            data = JSON.parse(data);
            //console.log(data);
            if (data.features.length == 0){
                alert('Нету данных');
                return false;
            }
            obj.parseData(data.features);
        });

    }
    parseData(data){
        for (let k in data){
            let point = data[k]['attributes'];
            let obl_code = point.CODE;
            obl_code = obl_code.substr(0, 4);

            if (this.data_total[point.CODE] != undefined){
                this.data_total[point.CODE] += parseInt(point.K);
                this.data_total_last_1[point.CODE] += parseInt(point.LAST_K);
                this.data_total_last_2[point.CODE] += parseInt(point.BEFORE_LAST_K);
            }
            else {
                this.data_total[point.CODE] = parseInt(point.K);
                this.data_total_last_1[point.CODE] = parseInt(point.LAST_K);
                this.data_total_last_2[point.CODE] = parseInt(point.BEFORE_LAST_K);
            }


            if (this.data_10[point.CODE] != undefined)
                this.data_10[point.CODE] += parseInt(point.K10);
            else
                this.data_10[point.CODE] = parseInt(point.K10);


            if (this.data_total[obl_code] != undefined){
                this.data_total[obl_code] += parseInt(point.K);
                this.data_total_last_1[obl_code] += parseInt(point.LAST_K);
                this.data_total_last_2[obl_code] += parseInt(point.BEFORE_LAST_K);
            }
            else{
                this.data_total[obl_code] = parseInt(point.K);
                this.data_total_last_1[obl_code] = parseInt(point.LAST_K);
                this.data_total_last_2[obl_code] = parseInt(point.BEFORE_LAST_K);
            }

            if (this.data_10[obl_code] != undefined)
                this.data_10[obl_code] += parseInt(point.K10);
            else
                this.data_10[obl_code] = parseInt(point.K10);
        }

        this.setFinishData();

        //console.log(this.data_total, this.data_total_last_1, this.data_total_last_2);
    }
    changeType(type){
        if (type == 'all')
            this.type = 'all';
        else
            this.type = '10';

        this.setFinishData();
    }
    setFinishData(){
        if (this.type == 'all')
            this.data = Object.assign({}, this.data_total);
        else
            this.data = Object.assign({}, this.data_10);

        MAP.init();
    }

}

MAIN_DATA = new MainData();

function addZeros(n, needLength) {
    needLength = needLength || 2;
    n = String(n);
    while (n.length < needLength) {
        n = "0" + n;
    }
    return n
}
