const supabaseUrl = 'https://pfcosqxprkgkghqcxojg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmY29zcXhwcmtna2docWN4b2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NTQ2NTgsImV4cCI6MjA2OTEzMDY1OH0.EtVQtocKLAPqNhw51LWeASNgfnuKe1eaw9Lf63h4BLw';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
const materiaporaño = [];
const añotope = 3;

async function cargar() {
      // Cargar archivos
      archivos = await _supabase
        .from('archivo')
        .select('codmateria, url, unidad, tipo, nombre_archivo')
      console.log('Archivos cargados:', archivos.data);
      //Cargar materias por año
      for(let i = 0;i<añotope;i++){
        materiaporaño[i] = (
          await _supabase
            .from('materia')
            .select('nombre, codmateria')
            .eq('anio', i + 1)
            .eq('codpropuesta', 'E010')
            .order('nombre', { ascending: true })
        ).data;
      }
      console.log('Conectando a Supabase...');
      // Generar contenedor de años
      const contenedor_años = document.getElementById('años-container');
      contenedor_años.innerHTML = '';
      // Crear botones para cada año
      for( let h = 0; h< añotope;h++){
          const año = document.createElement('div');
          año.className = 'mb-4 rounded-md border border-[#3D0814]' 
          año.setAttribute('data-aos', 'fade-up');
          año.innerHTML = `
<button onclick="toggleSection('anio${h+1}')" class="w-full rounded-t-md bg-[#3D0814] px-4 py-2 text-left poppins-black text-[#E7F9A9] lg:text-[30px]">📘 ${h+1}º Año</button>
<div id="anio${h+1}" class="year-section space-y-2 bg-[#C6B38E]/30 px-4  poppins-bold" >
          `
          contenedor_años.appendChild(año);
        }
      // Cargar materias en cada año
      for(let j = 0; j<añotope;j++){
        const contenedor_materias = document.getElementById('anio'+(j+1));
        contenedor_materias.innerHTML = '';
        materiaporaño[j].forEach(materia => {
        const card = document.createElement('div');
        // Generar HTML de archivos correspondientes a la materia
        const archivosHTML = archivos.data
          .filter(a => a.codmateria === materia.codmateria)
          .map(a =>{
            const icono = (a.tipo === "practica") ? "📝" : "📄";
            return `<a href="${a.url}" target="_blank" class="block hover:underline ">${icono} ${a.nombre_archivo}</a>`;
          })
          .join('');

        card.innerHTML = `
          <details class="poppins-bold text-[#3D0814] lg:text-[20px] w-full">
          <summary class="cursor-pointer hover:underline"> ${materia.nombre}</summary>
          <div class="mt-1 ml-4 space-y-1 text-sm text-[#442F38] lg:text-[18px]">
            ${archivosHTML || '<p class="text-gray-500 lg:text-[18px]">No hay archivos.</p>'}
          </div>
        </details>
          `;
        contenedor_materias.appendChild(card);
        
      });
      }
    }
    document.addEventListener('DOMContentLoaded', async () => {
    await cargar();      // tu función que genera contenido dinámico
    AOS.init();          // Inicializa AOS
    AOS.refresh();       // Refresca por si acaso
  });
