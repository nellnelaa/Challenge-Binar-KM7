const searchBtn = document.getElementById("cari"); // ambil inputan
import cars from "./cars.json" with { type: "json" }; //import data
const hasilSearch = document.getElementById("car-content"); // variable nampilin hasi

// Function to generate a random future date within 1 month
const randomFutureDate = () => {
  const randomDays = Math.floor(Math.random() * 30) + 1; // Random number between 1 and 30
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() + randomDays); // Add random days to current date
  return randomDate.toISOString(); // Convert to ISO string format
};

searchBtn.addEventListener("click", (event) => {
    
  hasilSearch.innerHTML = "";
  const tipeDriver = document.getElementById("driver").value;
  const tanggalSewa = document.getElementById("tanggal").value;
  const waktuJemput = document.getElementById("waktu").value;

  const jumlahPenumpangInput = document.getElementById("jumlahPenumpang").value;
  const jumlahPenumpang = jumlahPenumpangInput
    ? parseInt(jumlahPenumpangInput, 10)
    : null;
  let carsFilter = [];
  const sewaDate = new Date(tanggalSewa);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const driverType = () => {
     return tipeDriver === "1" || tipeDriver === "2"; // Mengembalikan true untuk dengan sopir, false untuk tanpa sopir
  };

  cars.map((car) => {
    // Randomize availableAt date for each car
    const randomAvailableAt = randomFutureDate();
    car.availableAt = randomAvailableAt;

    const carAvailableDate = new Date(car.availableAt).getTime();
    const sewaTimestamp = sewaDate.getTime();

    // Filter berdasarkan ketersediaan mobil, jumlah penumpang, dan tipe driver
    if (
      carAvailableDate <= sewaTimestamp &&
      (jumlahPenumpang === null || car.capacity >= jumlahPenumpang) &&
      car.available === driverType()
    ) {
      carsFilter.push(car);
    }
  });

  const render = (template) => {
    hasilSearch.innerHTML += template;
  };

  if (carsFilter.length <= 0) {
    const template = `
    <h5 class="text-center msg">Data tidak ditemukan...</h5>
    `;
    render(template);
  } else {
    carsFilter.map((car) => {
      const template = `
      <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div class="card w-100" style="width: 20rem">
              <img src="${car.image}" class="card-img-top card-img img-fluid fixed-size-img" alt="..." />
              <div class="card-body">
                <h6 class="card-title">${car.manufacture}</h6>
                <h5>${formatRupiah(car.rentPerDay)}/hari</h5>
                <p class="card-text">
                  ${car.description}
                </p>
                <p>
                  <img src="Asset/fi_users.png" alt=""/>
                  ${car.capacity} Orang
                </p>
                <p>
                  <img src="Asset/fi_settings.png" alt=""/>
                  ${car.transmission}
                </p>
                <p>
                  <img src="Asset/fi_calendar.png" alt=""/>
                  Tahun ${car.year}
                </p>
                <a href="#" class="btn btn-success pilih-btn p-2">Pilih Mobil</a>
              </div>
            </div>
          </div>
    `;
      render(template);
    });
  }
});
