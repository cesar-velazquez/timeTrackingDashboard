// Creamos una función asincrona para mostrar los 
// datos de mi Json.

async function mostrarDatos() {


    try {
        // Hacemos la petición a nuestro Json.
        const response = await fetch('../Json/data.json');

        if (!response.ok) {
            throw new Error('Error al cargar los datos: ' + response.status);
        }

        // Convertimos la respuesta a un objeto de JavaScript.
        const data = await response.json();


        // Recorremos el array de datos y creamos elementos HTML para mostrar la información.
        data.forEach((item, index) => {
            //calcula el num de box a mostrar
            const boxNumber = index + 1;


            // Verificamos si el contenedor existe, si no, lo creamos.
            let container = document.getElementById('box-' + boxNumber);
            if (!container) {
                container = document.createElement('div');
                container.id = 'box-' + boxNumber;
                container.classList.add('box');
                document.body.appendChild(container);
            }

            // Limpiamos el contenido del contenedor antes de agregar nuevos elementos.
            container.innerHTML = '';
            document.getElementById('weekly-btn').addEventListener('click', function () {
                container.innerHTML = '';
                // Creamos un elemento para mostrar la información del item.
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.timeframes.weekly.current}hrs</p>
                <p>Last Week - ${item.timeframes.weekly.previous}hrs</p>
            `;
                container.appendChild(itemElement);
            });

            document.getElementById('daily-btn').addEventListener('click', function () {
                container.innerHTML = '';
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.timeframes.daily.current}hrs</p>
                <p>Last Day - ${item.timeframes.daily.previous}hrs</p>
            `;
                container.appendChild(itemElement);
            });

            document.getElementById('monthly-btn').addEventListener('click', function () {
                container.innerHTML = '';
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.timeframes.monthly.current}hrs</p>
                <p>Last Month - ${item.timeframes.monthly.previous}hrs</p>
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
