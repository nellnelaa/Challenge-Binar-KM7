const carContent = document.getElementById("car-content");
const driverSelect = document.getElementById("driver");
const tanggalInput = document.getElementById("tanggal");
const waktuSelect = document.getElementById("waktu");
const jumlahPenumpangInput = document.getElementById("jumlahPenumpang");
const cariButton = document.getElementById("cari");

cariButton.addEventListener("click", (e) => {
  e.preventDefault();
  const driverValue = driverSelect.value;
  const tanggalValue = tanggalInput.value;
  const waktuValue = waktuSelect.value;
  const jumlahPenumpangValue = jumlahPenumpangInput.value;

  searchCarContent(driverValue, tanggalValue, waktuValue, jumlahPenumpangValue);
});

async function searchCarContent(driver, tanggal, waktu, jumlahPenumpang) {
  carContent.innerHTML = "<h1>Loading...</h1>";

  try {
    const data = await getCarData();

    // Combine date and time to a single datetime string for comparison
    const selectedDateTime = new Date(`${tanggal}T${waktu}`).toISOString();

    // Filter cars based on availability date and capacity
    const availableCars = data.filter((car) => {
      const availableAt = new Date(car.availableAt);
      return availableAt >= selectedDateTime && car.capacity >= jumlahPenumpang;
    });

    if (availableCars.length === 0) {
      carContent.innerHTML = `<h1>No cars found!</h1>`;
      return;
    }

    let carContentHTML = "";
    availableCars.forEach((car) => {
      if (
        car &&
        car.image &&
        car.manufacture &&
        car.type &&
        car.description &&
        car.capacity &&
        car.transmission &&
        car.year
      ) {
        const Content = `
          <div class="col-md-3">
            <div class="card" style="width: 18rem">
              <img src="${car.image}" class="card-img-top" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">${car.manufacture} / ${car.model}</h5>
                <h4><b>Harga per Hari: ${car.rentPerDay} IDR</b></h4>
                <p class="card-text">${car.description}</p>
                <h6>Kapasitas: ${car.capacity} Penumpang</h6>
                <h6>Transmisi: ${car.transmission}</h6>
                <h6>Tahun: ${car.year}</h6>
                <a href="#" class="btn btn-success">Pilih Mobil</a>
              </div>
            </div>
          </div>
        `;
        carContentHTML += Content;
      }
    });
    carContent.innerHTML = carContentHTML;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getCarData() {
  try {
    const response = await fetch("data/cars.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
