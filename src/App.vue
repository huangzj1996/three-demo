<script setup lang="ts">
// import CanvaBoard from './components/CanvaBoard.vue'
// import Board from './components/Board.vue'
import BaseOne from './views/baseone/index.vue';
import BaseTwo from './views/basetwo/index.vue';
import BaseThree from './views/baseThree/index.vue';
</script>

<template>
    <main>
        <!-- <Board></Board>
        <CanvaBoard></CanvaBoard> -->
        <!-- <BaseOne></BaseOne> -->
        <!-- <BaseTwo></BaseTwo> -->
        <BaseThree></BaseThree>
    </main>
</template>

<style scoped>
main {
    min-height: calc(100vh - 100px);
}
</style>
