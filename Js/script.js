async function mostrarDatos() {
    try {
        // Hacemos la petición a nuestro Json.
        const response = await fetch('../Json/data.json');

        // Verificamos si la respuesta es correcta.
        if (!response.ok) {
            throw new Error('Error al cargar los datos: ' + response.status);
        }

        // Convertimos la respuesta a un objeto de JavaScript.
        const data = await response.json();


        // Recorremos el array de datos y creamos elementos HTML para mostrar la información.
        data.forEach((item, index) => {
            //calcula el num de box a mostrar            
            const boxNumber = index + 2;
            console.log(boxNumber);


            // Buscamos el contenedor correspondiente al boxNumber.
            let container = document.getElementById('box-' + boxNumber);

            // Por Default, mostramos la vista semanal:
            container.innerHTML = `
                <div class="item">
                <div class="item-header"><h3>${item.title}</h3> <img src="../imgs/icon-ellipsis.svg" alt="icon ellipsis"></img></div>
                <div class="item-body">
              <div class="item-body-content">
                <p class="current-time mb-2rem">${item.timeframes.weekly.current}hrs</p>
                <p class="last-time" >Last Week - ${item.timeframes.weekly.previous}hrs</p>
              </div>
                </div>
                </div> `;

            // Agregamos los botones para cambiar entre las vistas semanal, diaria y mensual: 

            document.getElementById('daily-btn').addEventListener('click', function () {
                document.getElementById('daily-btn').classList.add('activo');
                document.getElementById('weekly-btn').classList.remove('activo');
                document.getElementById('monthly-btn').classList.remove('activo');
                container.innerHTML = '';
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.innerHTML = `
                <div class="item">
                <div class="item-header">
                <h3>${item.title}</h3> 
                <img src="../imgs/icon-ellipsis.svg" alt="icon ellipsis"></img>
                </div>                
               <div class="item-body-content">
                <p class="current-time">${item.timeframes.daily.current}hrs</p>
                <p class="last-time" >Last Day - ${item.timeframes.daily.previous}hrs</p>   
               </div>             
                </div>            
            `;
                container.appendChild(itemElement);
            });


            document.getElementById('weekly-btn').addEventListener('click', function () {
                document.getElementById('daily-btn').classList.remove('activo');
                document.getElementById('weekly-btn').classList.add('activo');
                document.getElementById('monthly-btn').classList.remove('activo');
                container.innerHTML = '';
                // Creamos un elemento para mostrar la información del item.
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.innerHTML = `
                <div class="item">
                <div class="item-header">
                <h3>${item.title}</h3> <img src="../imgs/icon-ellipsis.svg" alt="icon ellipsis"></img>
                </div>
                <div class="item-body-content">
                <p class="current-time">${item.timeframes.weekly.current}hrs</p>
                <p class="last-time" >Last Week - ${item.timeframes.weekly.previous}hrs</p>
                </div>
                </div>            
            `;
                container.appendChild(itemElement);
            });

            document.getElementById('monthly-btn').addEventListener('click', function () {
                document.getElementById('daily-btn').classList.remove('activo');
                document.getElementById('weekly-btn').classList.remove('activo');
                document.getElementById('monthly-btn').classList.add('activo');
                container.innerHTML = '';
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.innerHTML = `
                <div class="item">
                <div class="item-header">
                <h3>${item.title}</h3> 
                <img src="../imgs/icon-ellipsis.svg" alt="icon ellipsis"></img>
                </div>
                <div class="item-body-content">
                <p class="current-time">${item.timeframes.monthly.current}hrs</p>
                <p class="last-time" >Last Month - ${item.timeframes.monthly.previous}hrs</p>
                </div>            
                </div>
            `;
                container.appendChild(itemElement);
            });
        });

    } catch (error) {
        console.log(error);
    }
}




// Llamamos a la función para mostrar los datos.
mostrarDatos();
