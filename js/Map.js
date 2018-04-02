class Map {
    init(){
        this.data = MAIN_DATA.data;
        this.dom = document.querySelector('.svg_obl.active');
        if (this.dom.getAttribute('id') == 'svg_all_rep')
            this.obl_id = 0;
        else{
            this.obl_id = parseInt(this.dom.getAttribute('data-id'));
        }

        this.setData();
    }
    setData(){
        let ar = this.dom.querySelectorAll('.land_name');
        for (let k in ar){
            let land_name = ar[k];
            if (!(land_name instanceof SVGTextElement))
                continue;

            let id = land_name.getAttribute('data-id');


            if (this.data[id] != undefined)
                land_name.querySelector('.number').innerHTML = this.data[id];
            else
                land_name.querySelector('.number').innerHTML = 0;
        }
    }
}

var MAP = new Map();
if (MAP.obl_id == 0)
    /*
    all rep
    */
else {
    
}
