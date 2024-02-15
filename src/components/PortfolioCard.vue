<template>
    <div class="portfolio-card">
        <div class="portfolio-card__header">
            <img
                class="portfolio-card__avatar"
                src="../assets/avatar.jpg"
                alt=""
            />
            <div class="portfolio-card__info">
                <h1 class="portfolio-card__name">{{ name }}</h1>
                <h2 class="portfolio-card__job-title">{{ jobTitle }}</h2>
            </div>
            <div class="portfolio-card__header-buttons">
                <button
                    class="portfolio-card__button"
                    type="button"
                    @click="goToGithub"
                >
                    <lv-icon
                        name="github"
                        push=".25"
                    />
                    GitHub
                </button>
            </div>
        </div>
        <div class="portfolio-card__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { LvIcon } from "@libvue/core";

export default {
    components: {
        LvIcon,
    },
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
        },
    },

    methods: {
        goToGithub() {
            window.open(this.githubUrl, "_blank");
        },
    },
    emits: ["mounted"],
    mounted() {
        this.$emit("mounted");
    },
};
</script>

<style lang="scss">
.portfolio-card {
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.07);
    transform: perspective(1000px) translateZ(0);
    backface-visibility: visible;
    transition: all 0.1s ease;
    color: var(--text-color);

    &__header {
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        align-items: center;
    }

    &__avatar {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        user-select: none;
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
        font-size: 0.75rem;
    }

    &__content {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: var(--border-color-light);
        border-radius: 0 0 8px 8px;
    }

    &__header-buttons {
        margin-left: 2rem;
    }

    &__button {
        all: unset;
        border: 1px solid var(--border-color);
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 0.875rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: 0.1s all;

        &-icon {
            width: 0.875rem;
            height: 0.875rem;
            margin-right: 0.25rem;
        }

        &:hover {
            border: 1px solid #676767;
            box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
        }
    }
}
</style>
