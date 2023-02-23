<template>
  <portfolio-card name="Harmen de Vries" job-title="front-end developer" github-url="https://github.com/harmendv">
      <repository-info />
      <repository-info />
  </portfolio-card>
</template>

<script>
import PortfolioCard from "./components/PortfolioCard.vue";
import RepositoryInfo from "./components/RepositoryInfo.vue";

export default {
    components: {
        PortfolioCard,
        RepositoryInfo
    }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

html {
    height: 100%;
    font-family: 'Inter', sans-serif;
}
body {
    margin: 0;
    padding: 0;
    background: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
}
</style>
