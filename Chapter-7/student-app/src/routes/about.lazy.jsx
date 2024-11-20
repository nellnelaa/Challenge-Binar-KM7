import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
  component: About,
})


function About() {
  return (
    <>
      <div id="mainsection" className="container">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 style={{ marginTop: "8px", marginBottom: "8px" }}>
              Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)
            </h1>
            <p
              style={{
                marginTop: "8px",
                marginBottom: "8px",
                textAlign: "justify",
              }}
            >
              Selamat datang di Binar Car Rental. Kami menyediakan mobil
              kualitas terbaik dengan harga terjangkau. Selalu siap melayani
              kebutuhanmu untuk sewa mobil selama 24 jam.
            </p>
            <div>
              <button
                type="button"
                className="btn text-white"
                style={{
                  backgroundColor: "#5cb85f",
                  marginTop: "8px",
                  width: "fit-content",
                }}
              >
                Mulai Sewa Mobil
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src="/image/img_car.png"
              className="img-fluid"
              alt="Mercedes"
              style={{ marginTop: "16px" }}
            />
          </div>
        </div>
      </div>
      <div id="ourservices" className="container">
        <div className="row">
          {/* Kolom kiri */}
          <div className="col-md-6 d-flex justify-content-center my-5">
            <img
              src="/image/img_service.png"
              className="img-fluid"
              alt="ourservice"
            />
          </div>
          {/* Kolom kanan */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 style={{ marginBottom: "24px" }}>
              Best Car Rental for any kind of trip in (Lokasimu)!
            </h2>
            <p style={{ textAlign: "justify" }}>
              Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga
              lebih murah dibandingkan yang lain, kondisi mobil baru, serta
              kualitas pelayanan terbaik untuk perjalanan wisata, bisnis,
              wedding, meeting, dll.
            </p>
            {[
              "Sewa Mobil Dengan Supir di Bali 12 Jam",
              "Sewa Mobil Lepas Kunci di Bali 24 Jam",
              "Sewa Mobil Jangka Panjang Bulanan",
              "Gratis Antar - Jemput Mobil di Bandara",
              "Layanan Airport Transfer / Drop In Out",
            ].map((text, index) => (
              <p key={index}>
                <img
                  src="/image/checklist.png"
                  alt="check"
                  style={{ marginRight: "8px" }}
                />
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
