<template>
  <div class="menu">
    <slot />
  </div>
</template>

<style scoped>
  .menu {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 20px;
    background-color: var(--menu-background);
    color: var(--menu-color);
    font-size: 14px;
    font-weight: 200;
  }
</style>
