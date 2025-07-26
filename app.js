const supabaseUrl = 'https://pfcosqxprkgkghqcxojg.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmY29zcXhwcmtna2docWN4b2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NTQ2NTgsImV4cCI6MjA2OTEzMDY1OH0.EtVQtocKLAPqNhw51LWeASNgfnuKe1eaw9Lf63h4BLw';
    const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

    async function obtenerCarreras() {
      console.log('Conectando a Supabase...');
      const { data, error } = await _supabase
        .from('carrera')
        .select('*');

      if (error) {
        console.error('Error al consultar la tabla Carrera:', error.message);
        return;
      }

      console.log('Datos recibidos:', data);

      const contenedor = document.getElementById('lista-carreras');
      contenedor.innerHTML = '';
      data.forEach(carrera => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded shadow text-black';
        card.innerHTML = `
          <h2 class="text-xl font-semibold">${carrera.nombre}</h2>
<p class="text-gray-600">Código: ${carrera.codpropuesta}</p>

        `;
        contenedor.appendChild(card);
      });
    }

    document.addEventListener('DOMContentLoaded', obtenerCarreras);