class MainData {
    constructor(){
        this.type = 'all';
    }
    getData(date, type, ar_art){
        date = new Date(date);
        let d = addZeros(date.getDate(), 2);
        let m = addZeros((date.getMonth() + 1), 2);
        let y = date.getFullYear();

        let where = ""
        if (type != 5){
            where += "CRIME_CODE ='"+type+"' ";
        }
        where += "AND DATE_REP = DATE '"+y+"-"+m+"-"+d+"'";

        this.data = {};
        this.data_total = {};
        this.data_10 = {};

        let obj = this;
        $.get( "http://infopublic.pravstat.kz:8399/arcgis/rest/services/stat/MapServer/1/query?f=pjson&where="+where+"&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=CRIME_CODE%2CREG_CODE%2CK10%2CK%2CCODE&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&returnDistinctValues=false", function( data ) {
            data = JSON.parse(data);

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

            this.data_total[point.CODE] = point.K;
            this.data_10[point.CODE] = point.K10;
        }

        this.setFinishData();
    }
    changeType(){
        if (this.type == 'all')
            this.type = '10';
        else
            this.type = 'all';

        this.setFinishData();
    }
    setFinishData(){
        if (this.type == 'all')
            this.data = Object.assign({}, this.data_total);
        else
            this.data = Object.assign({}, this.data_10);

        console.log(this.data);
        console.log(this.data_total);
        console.log(this.data_10);
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
