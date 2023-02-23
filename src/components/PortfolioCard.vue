<template>
    <div class="portfolio-card">
        <div class="portfolio-card__header">
            <img class="portfolio-card__avatar" src="../assets/avatar.jpg" alt="">
            <div class="portfolio-card__info">
                <h1 class="portfolio-card__name">{{ name }}</h1>
                <h2 class="portfolio-card__job-title">{{ jobTitle }}</h2>
            </div>
            <div class="portfolio-card__header-buttons">
                <button class="portfolio-card__button" type="button" @click="goToGithub">GitHub</button>
            </div>
        </div>
        <div class="portfolio-card__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        jobTitle: {
            type: String,
            required: true,
        },
        githubUrl: {
            type: String,
            required: true,
        }
    },
    methods: {
        goToGithub() {
            window.open(this.githubUrl, '_blank');
        }
    }
};
</script>

<style lang="scss">
.portfolio-card {
    background: #fff;
    border: 1px solid #e4e4e4;
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0,0,0,0.07);

    &__header {
        padding: 1rem;
        border-bottom: 1px solid #e4e4e4;
        display: flex;
        align-items: center;
    }
    &__avatar {
        width: 60px;
        height: 60px;
        border-radius: 100%;
    }
    &__info {
        margin: 0 1rem;
        margin-right: auto;
    }
    &__name {
        all: unset;
        display: block;
        font-weight: 700;
    }
    &__job-title {
        all: unset;
        display: block;
        font-size: .875rem;
    }
    &__content {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    &__header-buttons {
        margin-left: 2rem;
    }
    &__button {
        all: unset;
        border: 1px solid #BEBEBE;
        padding: .5rem;
        border-radius: 5px;
        font-size: .875rem;
        cursor: pointer;

        &:hover {
            border: 1px solid #676767;
        }
    }
}
</style>
