<template>
    <div class="repository-info">
        asd
    </div>
</template>

<script>
export default {
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
    }
};
</script>

<style lang="scss">
.repository-info {
    border: 1px solid #DCDCDC;
    border-radius: 3px;
    padding: .5rem;
}
</style>
