# HUMIC Prototyping Landing Page API Documentation

[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

## Introduction
Project Intern HUMIC Batch 5 Website — Landing Page Humic Prototyping API.  
Backend service built to handle dynamic content such as projects, interns, announcements, staff profiles, and partnerships.

**Framework:** [Express.js](https://expressjs.com/)  
**Database:** MySQL

---

## Contributing
**Team Humic Intern Batch 4**

| **Nama** | **Role** |
|:----------|:----------:|
| DINAR MUHAMMAD AKBAR | FRONT END DEVELOPER |
| AKHTAR MUHAMMAD ACHSAN | BACK END DEVELOPER |
| SAYYIDUSY SYAUQI AL GHIFFARI | UI/UX WEBSITE |

---

## Database Structure 

![Entity Relationship Diagram](https://github.com/Macrune/HumicPrototypingLandingPage/blob/main/src/docs/ERD.png)

The database consists of the following tables:

1. **admin** — Menyimpan data akun admin untuk login dan aktivitas sistem.
2. **logs** — Mencatat setiap aktivitas admin, termasuk tindakan dan target yang diubah.
3. **news** — Berisi artikel berita atau informasi terbaru seputar kegiatan HUMIC.
4. **announcement** — Menyimpan pengumuman penting yang akan ditampilkan di halaman utama.
5. **agenda** — Menyimpan jadwal atau agenda kegiatan HUMIC.
6. **banner** — Menyimpan path gambar banner yang tampil di bagian utama landing page.
7. **staff** — Data staf HUMIC, termasuk posisi, deskripsi, pendidikan, dan kontak sosial.
8. **intern** — Data mahasiswa magang, termasuk peran, universitas, dan kontak pribadi.
9. **testimony** — Testimoni yang diberikan oleh mahasiswa magang terhadap pengalaman mereka.
10. **project** — Data proyek yang dikerjakan oleh tim, termasuk deskripsi, publikasi, dan tautan proyek.
11. **project_member** — Relasi antara proyek dan anggota (intern) yang terlibat.
12. **category** — Kategori proyek yang digunakan untuk pengelompokan.
13. **project_category** — Relasi antara proyek dan kategori.
14. **partnership** — Data mitra kerja sama HUMIC, termasuk deskripsi, tautan, dan logo.
15. **statistic_data** — Data statistik ringkas untuk ditampilkan di website.

---

## Installation
### Clone Repository
```
git clone https://github.com/Macrune/HumicPrototypingLandingPage.git
```
Jangan lupa untuk masuk ke direktori projectnya.
```
cd HumicPrototypingLandingPage
```
### Install Dependencies
```
npm install
```
### Setup Database
Untuk membuat struktur database awa:
```
npm run createDb
```
### Running the Backend
Gunakan printah berikut sesui mode yang diinginkan:
### Development Mode
```
npm run devStart
```
### Production Mode
```
npm start
```
### Testing the API
Untuk melihat seluruh endpoint dokumentasi API, akses endpoint:
```
/api-docs
```
Pastikan:
 - NODE_ENV bukan production
 - SWAGGER_ENABLED = true

---
## License
This API is licensed under the [MIT License](https://opensource.org/licenses/MIT).