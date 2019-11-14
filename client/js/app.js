
class EventManager {
    constructor() {
        this.urlBase = "/events"
        //este es el usuario logueado
        
        if(localStorage.getItem('usuario')==''){
            window.location.href = "http://localhost:8082/index.html"
        }else{
            //console.log('Bienvenido: ' + localStorage.getItem('usuario'))
            this.usuario = localStorage.getItem('usuario')
            //console.log('el usuario es: ' + this.usuario)
            this.obtenerDataInicial()
            this.inicializarFormulario()
            this.guardarEvento()
        }
        
    }

    obtenerDataInicial() {
        //obtener todos los eventos del usuario logueado
        
        let url = this.urlBase + '/allEventsById/' + this.usuario
        let obj = this
        //console.log('la url es: ' + url)
        /*$.get(url, (response) => {
            console.log("Evento de obtenerDataInicial: " + response.titulo + response.message)
            this.inicializarCalendario(response)
        })*/

        $.ajax({
                url: url,               
                type: 'GET',
                dataType: 'json' ,
                success: function(response){
                    if(response.message == 'Datos obtenidos correctamente'){
                      //alert('Bienvenido')
                      //console.log("La data inicial es ")
                      //console.log(response)
                      obj.inicializarCalendario(response)
                      //console.log("Evento de obtenerDataInicial: " + response.data['0'].titulo + " " + response.message)

                    }
                }    
               })
    }

    eliminarEvento(evento) {
       // console.log('eliminar evento')
        //console.log(evento)
        let eventId = evento._id
        $.get('/events/deleteEvent/'+eventId, (response) => {
            alert(response.message)
            //console.log(response.message)
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            //se guarda un nuevo  evento
            let url = this.urlBase + "/newEvent"
            if (title != "" && start != "") {
                let ev = {
                    nombre: nombre,
                    start: start,
                    title: title,
                    end: end,
                    start_hour: start_hour,
                    end_hour: end_hour,
                    usuario: this.usuario 
                    
                }
                $.post(url, ev, (response) => {
                    alert(response.message)
                    //console.log('nuevo evento')
                    //console.log(response.message)
                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    actualizarEvento(evento){
        //aqui voy hay un problema con el id
        //console.log(evento)
        //console.log('El id es: ' + evento._id)
       let id = evento._id,
            start_date_complete = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
            end_date_complete = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
            start,
            end,
            form_data = new FormData(),            
            start_hour,
            end_hour

            form_data = {
                id: id,
                start: start_date_complete.substr(0,10),
                end : end_date_complete.substr(0,10),
                start_hour : start_date_complete.substr(11,8),
                end_hour : end_date_complete.substr(11,8),
            }
    

        $.post('/events/updateEvent',form_data, response => {
            alert(response);
        })
        //console.log("Evento de actualizar: " + evento)
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }
   //me falta eliminar
    inicializarCalendario(evento){
        //console.log('inicializar calendario')
        //console.log(evento)
        $('.calendario').fullCalendar({ 
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            //defaultDate: '2019-03-29',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: evento.data,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "img/delete.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event._id);
                    }
                }
        });
    }

   
}

    const Manager = new EventManager()
