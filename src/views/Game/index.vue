<template>
    <div id="game-page-wrap">
        <Interface v-model="currentKey"></Interface>
        <RockingBar v-model="currentKey" v-if="isMobile"></RockingBar>
    </div>
</template>

<script>
export default {
    name: 'gave-Page'
}
</script>

<script setup>
import Interface from './Interface/index.vue'
import RockingBar from './RockingBar/index.vue'

import { ref, computed } from 'vue'

const currentKey = ref(null)

const isMobile = computed(() => {
    return !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
})
</script>

<style lang="less" scoped>
#game-page-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>