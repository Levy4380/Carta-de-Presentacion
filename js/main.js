//Hola esto es un cambio
//Cuando la pagina este cargada, ejecuta el programa
$(document).ready(function(){

//--------------------------------------------------------------
//---Creando objetos enlazando propiedades con elementos HTML---
//--------------------------------------------------------------
   
//Banner imagenes
    var banner = {
        padre:$('#banner'),
        numeroSlide:$('#banner').children('.slide').length,
        posicion: 1
    }
    //Coloca primer slide visible
    banner.padre.children('.slide').first().css({
        'left': '0%'
    });

    //Banner de informacion
    var info = {
        padre: $('#info'),
        numeroSlide:$('#info').children('.slide').length,
        slideActual :$('#info .active').height,
        posicion: 1
    }

    //Coloca primer slide visible
    info.padre.children('.slide').first().css({
        'left': '0%'
    });

//--------------------------------------------------------------
//---------------------Declarando funciones---------------------
//--------------------------------------------------------------

    let altoSlides = function(tipoBanner,action){
        //Almacena como variable la altura de la foto
        let alto = tipoBanner.padre.children('.active').outerHeight();
        if (tipoBanner == banner){
        tipoBanner.padre.css({
            'height': alto + 'px'
        });
        } else{
            tipoBanner.padre.animate({
                'height': alto + 'px'
            });
        }

    }

    //Llamando funciones al inicio del programa
    altoSlides(banner);
    altoSlides(info);
    
    //Ejecutando funciones cada vez que cambio el tamaño de la ventana
    $(window).resize(function(){
        altoSlides(banner);
        altoSlides(info);
    });

//--------------------------------------------------------------
//----------------------------Banner----------------------------
//--------------------------------------------------------------

    //Boton siguiente
    $("#banner_next").on('click',function(e){

        //Previene agregar un # en el link
        e.preventDefault();

        if(banner.posicion < banner.numeroSlide){
            //Clases no activas van a la derecha
            banner.padre.children().not('active').css({
                'left':'100%'
            });
            //Le quitamos la clase activa a la 1era y se la colocamos a la 2da. Luego la movemos hacia adelante
            $('#banner .active').removeClass('active').next().addClass('active').animate({
                'left': 0
            });
            //Corregimos la posicion de la slide y la animamos hacia la izquierda
            $('#banner .active').prev().css({
                'left':0
            }).animate({
                'left':'-100%'
            });
            //Cambiamos la posicion de la variable posicion
            banner.posicion += 1;
        }
        //Cuando estamos en la slide 4
        else {
            //Quitamos la clase activa a la 1era
            $('#banner .active').removeClass('active');
            //A la primera slide de la lista (1era Imagen) le colocamos la clase active
            banner.padre.children('.slide').first().addClass('active').animate({
                'left':'0'
            });
            //Llevamos la ultima slide (4ta Imagen) y la animamos hacia la derecha
            banner.padre.children('.slide').last().animate({
                'left' : '-100%'
            });
            //Volvemos a la posicion anterior
            banner.posicion = 1;
        }

        altoSlides(banner);

        //Delay para las imagenes
        $("#banner_next").css("pointer-events", "none");
        setTimeout(function(){
           // enable click after 1 second
           $("#banner_next").css("pointer-events", "auto");
        },400); // 1 second delay
    });

    //Boton anterior
    $("#banner_prev").on('click',function(e){

        //Previene agregar un # en el link
        e.preventDefault();

        if(banner.posicion >= 2){

            $('#banner .active').removeClass('active').prev().addClass('active').css({
                'left': '-100%'
            }).animate({
                'left': 0
            });
            $('#banner .active').next().animate({
                'left':'100%'
            });

            banner.posicion -= 1; 
        }

        else {
            $('#banner .active').removeClass('active');

            banner.padre.children('.slide').last().addClass('active').css({
                'left':'-100%'
            }).animate({
                'left':'0'
            });
    
            banner.padre.children('.slide').first().animate({
                'left' : '100%'
            });

            banner.posicion = banner.numeroSlide;
        }
        altoSlides(banner);

        //Delay para las imagenes
        $("#banner_prev").css("pointer-events", "none");
        setTimeout(function(){
           // enable click after 1 second
           $("#banner_prev").css("pointer-events", "auto");
        },400); // 1 second delay
    });

//--------------------------------------------------------------
//-----------------------------Info-----------------------------
//--------------------------------------------------------------

    //Boton siguiente
    $("#info_next").on('click',function(e){
        //Previene agregar un # en el link
        e.preventDefault();

        if(info.posicion < info.numeroSlide){

            info.padre.children().not('active').css({
                'left':'100%'
            });

            $('#info .active').removeClass('active').next().addClass('active').animate({
                'left': 0
            });
        
            $('#info .active').prev().css({
                'left':0
            }).animate({
                'left':'-100%'
            });

            $('#botones .active').removeClass('active').next().addClass('active');

            info.posicion += 1;
        }

        else {
            $('#info .active').removeClass('active');

            info.padre.children('.slide').first().addClass('active').animate({
                'left':'0'
            });

            info.padre.children('.slide').last().animate({
                'left' : '-100%'
            });

            info.posicion = 1;
            
            //Ilumina boton actual
            $('#botones .active').removeClass('active');
            $('#botones .first').addClass('active');
        }

        altoSlides(info);

        //Delay para las imagenes
        $("#info_next").css("pointer-events", "none");
        setTimeout(function(){
           // enable click after 1 second
           $("#info_next").css("pointer-events", "auto");
        },400); // 1 second delay
    });

    //Boton Anterior
    $("#info_prev").on('click',function(e){

        //Previene agregar un # en el link
        e.preventDefault();

        if(info.posicion >= 2){

            $('#info .active').removeClass('active').prev().addClass('active').css({
                'left': '-100%'
            }).animate({
                'left': 0
            });

            $('#info .active').next().animate({
                'left':'100%'
            });

            $('#botones .active').removeClass('active').prev().addClass('active');

            info.posicion -= 1;
        }

        else {
            $('#info .active').removeClass('active');

            info.padre.children('.slide').last().addClass('active').css({
                'left':'-100%'
            }).animate({
                'left':'0'
            });
    
        
            info.padre.children('.slide').first().animate({
                'left' : '100%'
            });

            info.posicion = info.numeroSlide;

            //Ilumina boton actual
            $('#botones .active').removeClass('active');
            $('#botones .last').addClass('active')
        }

        altoSlides(info);

        $("#info_prev").css("pointer-events", "none");
        setTimeout(function(){
           // enable click after 1 second
           $("#info_prev").css("pointer-events", "auto");
        },400); // 1 second delay
    });
});
