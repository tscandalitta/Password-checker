class Parametro {
    constructor(id, descripcion, valor) {
        this.id = id;
        this.descripcion = descripcion;
        this.valor = valor;
    }

    getId(){
        return this.id;
    }

    getDescripcion(){
        return this.descripcion;
    }

    getValor(){
        return this.valor;
    }
}

class ParametroEntero extends Parametro{
    getClaseIcono(){
        var claseIcono = iconoPorDefecto;
        if(this.valor > 0){
            if(this.valor <= 2)
            claseIcono = iconoCheck;
            else 
            claseIcono = iconoCheckDoble;    
        }
        return claseIcono;
    }

    getColorIcono(){
        var colorIcono = "";
        if(this.valor > 0){
            if(this.valor == 1)
                colorIcono = iconoAmarillo;
            else
                colorIcono = iconoVerde;    
        }
        return colorIcono;
    }
}

class ParametroBooleano extends Parametro{
    getClaseIcono(){
        var claseIcono = iconoPorDefecto;
        if(this.valor == true){
        claseIcono = iconoCruz;    
        }
        return claseIcono;
    }

    getColorIcono(){
        var colorIcono = "";
        if(this.valor == true){
            colorIcono = iconoRojo;    
        }
        return colorIcono;
    }
}

class ParametroLongitud extends ParametroEntero{
    getClaseIcono(){
        var claseIcono = iconoPorDefecto;
        if(this.valor > 0){
            if(this.valor <= 12)
            claseIcono = iconoCheck;
            else 
            claseIcono = iconoCheckDoble;    
        }
        return claseIcono;
    }

    getColorIcono(){
        var colorIcono = "";
        if(this.valor > 0){
            if(this.valor <= 6)
                colorIcono = iconoAmarillo;
            else
                colorIcono = iconoVerde;    
        }
        return colorIcono;
    }
}
