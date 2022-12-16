<template>
    <router-view #default="{ route, Component }">
        <transition :enter-active-class="`animate__animated ${ route.meta.transition }`">
            <component :is="Component"></component>
        </transition>
    </router-view>
</template>

<script>
export default {
    name: 'App'
}
</script>

<script setup>
import { watchEffect } from 'vue'
import { useSettingStore } from '@/store/setting.js'
import { storeToRefs } from 'pinia'
const Setting = useSettingStore()

const { theme } = storeToRefs(Setting)

watchEffect(() => {
    theme.value ? document.querySelector('html').classList.add('dark') : document.querySelector('html').classList.remove('dark')
}, {
    flush: 'post'
})
</script>

<style lang="less" scoped>
</style>