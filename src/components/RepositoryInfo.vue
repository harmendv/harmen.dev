<template>
    <transition>
        <div class="repository-info">
            <img class="repository-info__icon" :src="imageUrl" alt="">
            <div class="repository-info__info">
                <h2 class="repository-info__title">{{ title }}</h2>
                <h3 class="repository-info__description">{{ description }}</h3>
            </div>
            <div class="repository-info__buttons">
                <button class="repository-info__button" @click="goToDocs" v-if="docsUrl">
                    <lv-icon name="book"/>
                </button>
                <button class="repository-info__button" @click="goToGithub" v-if="githubUrl">
                    <lv-icon name="github"/>
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
import { LvIcon } from '@libvue/core';

export default {
    components: {
        LvIcon,
    },
    props: {
        imageUrl: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        docsUrl: {
            type: String,
            required: true,
        },
        githubUrl: {
            type: String,
            default: '',
        }
    },
    methods: {
        goToGithub() {
            window.open(this.githubUrl, '_blank')
        },
        goToDocs() {
            window.open(this.docsUrl, '_blank')
        }
    }
};
</script>

<style lang="scss">
.repository-info {
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: .5rem;
    display: flex;
    align-items: center;
    transition: .1s all;
    background: var(--background-color);
    color: var(--text-color);

    &__icon {
        width: 30px;
        height: 30px;
        margin-right: .5rem;
        border-radius: 4px;
    }

    &__info {
        display: flex;
        flex-direction: column;
    }

    &__title {
        all: unset;
        font-weight: 600;
        font-size: .875rem;
    }

    &__description {
        all: unset;
        font-size: .75rem;
    }

    &__buttons {
        margin-left: auto;
        padding-left: 1rem;
        display: flex;
        gap: .25rem;
    }

    &__button {
        all: unset;
        border: 1px solid var(--border-color);
        padding: .5rem;
        border-radius: 5px;
        font-size: .875rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: .1s all;
        color: var(--text-color);

        &-icon {
            width: .875rem;
            height: .875rem;
        }

        &:hover {
            border: 1px solid #676767;
            box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
        }
    }

}
</style>
