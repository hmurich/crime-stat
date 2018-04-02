class Map {
    init(){
        this.data = MAIN_DATA.data;
        this.setData();
    }
    setData(){
        this.dom = document.querySelector('.svg_obl.active');

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
