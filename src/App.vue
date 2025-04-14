<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const movies = ref([])
const selectedMovie = ref(null)

const fetchMovies = async () => {
  try {
    const res = await axios.get('https://api.kinopoisk.dev/v1.4/movie', {
      headers: {
        'X-API-KEY': 'NJV7PQW-TKHM192-Q79HHRG-G569562'
      },
      params: {
        year: 2023,
        'genres.name': 'криминал',
        'rating.kp': '7-10'
      }
    })
    movies.value = res.data.docs
  } catch (err) {
    console.error('Ката:', err)
  }
}

const selectMovie = (movie) => {
  selectedMovie.value = movie
}

onMounted(fetchMovies)
</script>

<template>
  <div class="home-wrapper">
    <aside class="home-sidebar">
      <h2>Фильмдер</h2>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <a href="#" @click.prevent="selectMovie(movie)">
            {{ movie.name }}
          </a>
        </li>
      </ul>
    </aside>

    <section class="home-content">
      <div v-if="selectedMovie" class="movie-card">
        <div class="movie-card-inner">
          <div class="movie-image-container">
            <img
              :src="selectedMovie.poster.previewUrl"
              v-if="selectedMovie.poster?.previewUrl"
              alt="Фильмдин постери"
              class="movie-poster"
            />
          </div>

          <div class="movie-details">
            <h2>{{ selectedMovie.name }}</h2>
            <div class="rating-and-duration">
              <span class="movie-year">{{ selectedMovie.year }}</span>
              <span class="movie-rating">{{ selectedMovie.rating.kp }} Рейтинг</span>
              <span class="movie-duration">{{ selectedMovie.duration }} мин</span>
            </div>
            <div class="movie-description">
              <p><strong>Описание:  <br></strong>{{ selectedMovie.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="placeholder-text">
        <p>Фильм тандаңыз.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-wrapper {
  display: flex;
  gap: 24px;
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.home-sidebar {
  width: 280px;
  background: linear-gradient(135deg, #4b6cb7, #182848);
  color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.home-sidebar h2 {
  margin-bottom: 16px;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
}

.home-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.home-sidebar li {
  margin-bottom: 12px;
}

.home-sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px 14px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.1);
}

.home-sidebar a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.home-content {
  flex: 1;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);

}

.movie-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 12px;
  padding: 16px;
  background-color: #f5f5f5;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.movie-card-inner {
  display: flex;
  align-items: stretch; 
  gap: 24px;
  margin-bottom: 20px;
}

.movie-image-container {
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center; 
}

.movie-poster {
  max-width: 100%;
  width: 200px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.movie-details {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between; 
}

.movie-details h2 {
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: 700;
  color: #2c3e50;
}

.rating-and-duration {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 15px;
}

.movie-year, .movie-rating, .movie-duration {
  font-size: 16px;
  font-weight: 600;
  color: #3498db;
}

.movie-description {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  text-align: left;
}

.placeholder-text {
  font-size: 18px;
  color: #888;
  text-align: center;
  padding-top: 40px;
}
</style>
