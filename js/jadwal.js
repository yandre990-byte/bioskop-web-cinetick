// jadwal.js

const filterFilm = document.getElementById('filterFilm');
const rows = document.querySelectorAll('#tbodyJadwal tr');

if (filterFilm) {
    filterFilm.addEventListener('change', () => {
        const val = filterFilm.value;

        rows.forEach(row => {
            const film = row.dataset.film;
            row.classList.remove('highlight');

            if (val === 'all' || film === val) {
                row.style.display = '';
                if (val !== 'all' && film === val) {
                    row.classList.add('highlight');
                }
            } else {
                row.style.display = 'none';
            }
        });
    });
}
