const students = ["Naila", "Shanty", "Joe", "Moza", "Fariq"];
console.log(students[1]);

const naila = {
  name: "Naila Jinan Gaisani",
  nickName: "Naila",
  class: "FSW-1",
  address: {
    province: "East Java",
    city: "Surabaya",
  },
  education: {
    bechelor: "Universitas Pembangunan Nasional Veteran Jawa Timur",
  },
};
console.log(naila.address.city);

// My name is Naila Jinan Gaisani, used to called Naila. Now, I am student of Universitas Pembangunan Nasional Veteran Jawa Timur. I am from Surabaya, East Java

console.log(
  `My name is ${naila.name}, used to called ${naila.nickName}. Now, I am student of ${naila.education.bechelor}. I am from ${naila.address.city}, ${naila.address.province}`
);

const describeNaila =
  "My name is " +
  naila.name +
  ", used to called " +
  naila.nickName +
  ". Now, I am student of " +
  naila.education.bechelor +
  ". I am from " +
  naila.address.city +
  ", " +
  naila.address.province;
(".");
console.log(describeNaila);

const mahasiswa = [
  {
    name: "Naila Jinan Gaisani",
    nickName: "Naila",
    class: "FSW-1",
    address: {
      province: "East Java",
      city: "Surabaya",
    },
    education: {
      bachelor: "Universitas Pembangunan Nasional Veteran Jawa Timur",
    },
  },
  {
    name: "Bambang Suryono",
    nickName: "Bambang",
    class: "FSW-2",
    address: {
      province: "East Java",
      city: "Malang",
    },
    education: {
      bachelor: "Universitas Brawijaya",
    },
  },
  {
    name: "Joko Anwar",
    nickName: "Joko",
    class: "FSW-3",
    address: {
      province: "Central Java",
      city: "Solo",
    },
    education: {
      bachelor: "Universitas Sebelas Maret",
    },
  },
];

// There are three students, Naila, Bambang, and Joko. Naila is from Surabaya, East Java. Bambang is from Malang, East Java. And Joko is from Solo, Central Java.
console.log(`There are three students, ${mahasiswa[0].nickName}, ${mahasiswa[1].nickName}, and ${mahasiswa[2].nickName}. 
    ${mahasiswa[0].nickName} is from ${mahasiswa[0].address.city}, ${mahasiswa[0].address.province}. 
    ${mahasiswa[1].nickName} is from ${mahasiswa[1].address.city}, ${mahasiswa[1].address.province}. And 
    ${mahasiswa[2].nickName} is from ${mahasiswa[2].address.city}, ${mahasiswa[2].address.province}.`);

// My name is  ${mahasiswa[0].name}, used to called  ${mahasiswa[0].nickName}. I am from ${mahasiswa[0].address.city}, North ${mahasiswa[0].address.province}. And I am student of ${mahasiswa[0].aducation.bachelor}.
for (let i = 0; i < mahasiswa.length; i++) {
  console.log(
    `My name is ${mahasiswa[i].name}, used to be called ${mahasiswa[i].nickName}. I am from ${mahasiswa[i].address.city}, ${mahasiswa[i].address.province}. And I am a student of ${mahasiswa[i].education.bachelor}.`
  );
}

mahasiswa.map((mahasiswa) => {
  const hasilmahasiswa = `Versi baru : 
    My name is ${mahasiswa.name}, used to be called ${mahasiswa.nickName}. I am from ${mahasiswa.address.city}, ${mahasiswa.address.province}. And I am a student of ${mahasiswa.education.bachelor}.`;
  console.log(hasilmahasiswa);
});

//print all student from east java
mahasiswa.map((mahasiswa) => {
  if (mahasiswa.address.province == "East Java") {
    const hasilmahasiswa = `Mahasiswa Jatim : 
    My name is ${mahasiswa.name}, used to be called ${mahasiswa.nickName}. I am from ${mahasiswa.address.city}, ${mahasiswa.address.province}. And I am a student of ${mahasiswa.education.bachelor}.`;
    console.log(hasilmahasiswa);
  }
});

filteredMahasiswa = mahasiswa.filter((mahasiswa) => {
  return (
    mahasiswa.address.province == "East Java" && mahasiswa.nickName == "Naila"
  );
});

//to do : Filter berdasarkan nama
function dataBerdasarkanAbjad() {
  mahasiswa
    .filter((peserta) => /^[A-Z]/.test(peserta.name)) // Memfilter nama yang dimulai dengan huruf A-Z
    .sort((a, b) => a.name.localeCompare(b.name)) // Mengurutkan nama berdasarkan abjad
    .forEach((peserta) =>
      console.log(`I am ${peserta.name} from ${peserta.address.city}`)
    );
}
dataBerdasarkanAbjad();

function tampilkanMahasiswaBerdasarkanAbjadTerbalik() {
  mahasiswa
    .filter((peserta) => /^[A-Z]/.test(peserta.name)) // Memfilter nama yang dimulai dengan huruf A-Z
    .sort((a, b) => b.name.localeCompare(a.name)) // Mengurutkan nama dari Z ke A
    .forEach((peserta) =>
      console.log(`Saya ${peserta.nickName} dari ${peserta.address.city}`)
    );
}

// Panggil fungsi untuk menampilkan data
tampilkanMahasiswaBerdasarkanAbjadTerbalik();
